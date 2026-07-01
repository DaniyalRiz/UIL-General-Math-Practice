// Admin-only: cheap verification pass for Review Imports' manual-extraction
// path (questions transcribed outside this app, e.g. by Claude in a separate
// chat, then loaded as a draft JSON). Unlike solve-pdf-questions, this never
// touches import_batches or draft_questions -- the rows being checked here
// don't exist in the database yet, they're still local React state in the
// browser. Each question gets exactly one independent solve attempt (no
// mismatch-retry loop) and the result is compared against the answer the
// admin already extracted, so the cost is one bounded call per question
// instead of full transcription + retried solving.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const ANTHROPIC_MODEL = "claude-sonnet-4-6";
const CALL_TIMEOUT_MS = 120_000;
const MAX_QUESTIONS_PER_CALL = 60;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...CORS_HEADERS },
  });
}

const SOLVE_TOOL = {
  name: "solve_question",
  description: "Solve this single math competition question and give a brief worked solution.",
  strict: true,
  input_schema: {
    type: "object",
    properties: {
      extracted_answer: { type: "string", description: "The correct choice, exactly matching one entry in choices" },
      explanation: {
        type: "string",
        maxLength: 500,
        description:
          "Concise worked solution, at most 2-3 sentences -- the key steps and final answer only, not a full essay. " +
          "Use \\( ... \\) for inline math and \\[ ... \\] for display math (never $ or $$) -- the renderer only recognizes backslash delimiters.",
      },
    },
    required: ["extracted_answer", "explanation"],
    additionalProperties: false,
  },
};

function choiceLetter(choiceText: string): string | null {
  const m = choiceText.match(/^\(?([A-E])\)?/i);
  return m ? m[1].toUpperCase() : null;
}

async function streamToolCall(
  body: Record<string, unknown>,
  signal: AbortSignal,
  label: string,
): Promise<{ stopReason: string; toolInput: Record<string, unknown> }> {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    signal,
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Claude API error ${resp.status}: ${errText}`);
  }
  if (!resp.body) throw new Error("Claude API returned no response body for the streamed request");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let partialJson = "";
  let stopReason = "end_turn";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const dataStr = line.slice(6).trim();
      if (!dataStr) continue;
      let evt: { type?: string; delta?: { type?: string; partial_json?: string; stop_reason?: string } };
      try {
        evt = JSON.parse(dataStr);
      } catch {
        continue;
      }
      if (evt.type === "content_block_delta" && evt.delta?.type === "input_json_delta") {
        partialJson += evt.delta.partial_json ?? "";
      } else if (evt.type === "message_delta" && evt.delta?.stop_reason) {
        stopReason = evt.delta.stop_reason;
      }
    }
  }

  if (!partialJson) throw new Error(`[${label}] Claude did not stream any tool input. stop_reason=${stopReason}`);

  let toolInput: Record<string, unknown>;
  try {
    toolInput = JSON.parse(partialJson);
  } catch (e) {
    throw new Error(`Failed to parse streamed tool input as JSON: ${e instanceof Error ? e.message : String(e)}`);
  }

  return { stopReason, toolInput };
}

function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS);
  return fn(controller.signal).finally(() => clearTimeout(timeoutId));
}

// Runs `fn` over every item like Promise.allSettled, but never more than
// `limit` calls in flight at once -- keeps the per-minute token/request burst
// against the Anthropic API small instead of firing everything at once.
async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      try {
        results[i] = { status: "fulfilled", value: await fn(items[i], i) };
      } catch (reason) {
        results[i] = { status: "rejected", reason };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

type IncomingQuestion = {
  key: string;
  question: string;
  choices: string[];
  answer: string;
  image_base64?: string;
  image_media_type?: string;
};

type VerifyResult = {
  key: string;
  verification_status: "match" | "mismatch" | "unverified";
  verification_notes: string | null;
  claude_answer: string | null;
  claude_explanation: string | null;
};

async function verifyOne(q: IncomingQuestion): Promise<VerifyResult> {
  const content: unknown[] = [];
  if (q.image_base64 && q.image_media_type) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: q.image_media_type, data: q.image_base64 },
    });
  }
  content.push({
    type: "text",
    text:
      `Solve this math competition question and show your real work.\n\n` +
      `Question: ${q.question}\n\n` +
      `Choices:\n${(q.choices ?? []).join("\n")}\n\n` +
      (q.image_base64 ? "An image is attached above because this question depends on a diagram -- look at it carefully.\n" : "") +
      `Set extracted_answer to exactly one of the choices above, and explanation to a brief worked solution -- ` +
      `at most 2-3 sentences covering the key steps and final answer, not a full essay. ` +
      `Write any math using \\( ... \\) for inline and \\[ ... \\] for display -- never $ or $$.`,
  });

  try {
    // Adaptive thinking + tool_choice "auto" gives Claude real scratch space
    // instead of forcing an immediate structured answer -- the same reason
    // solve-pdf-questions uses this shape. Only one attempt here, by design:
    // this is a spot-check on an extraction that's already believed correct,
    // not a from-scratch solve with retries.
    const { stopReason, toolInput } = await withTimeout((signal) =>
      streamToolCall(
        {
          model: ANTHROPIC_MODEL,
          max_tokens: 3000,
          stream: true,
          tools: [SOLVE_TOOL],
          tool_choice: { type: "auto" },
          messages: [{ role: "user", content }],
        },
        signal,
        `verify#${q.key}`,
      )
    );

    if (stopReason === "refusal") throw new Error("Claude declined to solve this question (refusal)");
    const extracted_answer = toolInput.extracted_answer as string | undefined;
    const explanation = toolInput.explanation as string | undefined;
    if (!extracted_answer || !explanation) throw new Error("Claude did not return a complete solution");

    const claudeLetter = choiceLetter(extracted_answer);
    const givenLetter = choiceLetter(q.answer ?? "");

    if (!givenLetter) {
      return {
        key: q.key,
        verification_status: "unverified",
        verification_notes: "Could not read a choice letter from the provided answer",
        claude_answer: extracted_answer,
        claude_explanation: explanation,
      };
    }
    if (claudeLetter && claudeLetter === givenLetter) {
      return {
        key: q.key,
        verification_status: "match",
        verification_notes: null,
        claude_answer: extracted_answer,
        claude_explanation: explanation,
      };
    }
    return {
      key: q.key,
      verification_status: "mismatch",
      verification_notes: `Claude solved (${claudeLetter ?? "?"}), you extracted (${givenLetter})`,
      claude_answer: extracted_answer,
      claude_explanation: explanation,
    };
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError"
      ? `Claude did not finish solving this question within ${CALL_TIMEOUT_MS / 1000}s.`
      : err instanceof Error
        ? err.message
        : String(err);
    return {
      key: q.key,
      verification_status: "unverified",
      verification_notes: `Verification failed: ${message}`,
      claude_answer: null,
      claude_explanation: null,
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!ANTHROPIC_API_KEY) {
    return json({ error: "ANTHROPIC_API_KEY is not configured for this project" }, 500);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Missing Authorization header" }, 401);

  // Verify the caller is an admin using THEIR OWN jwt -- never trust a client-claimed role.
  const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await callerClient.auth.getUser();
  if (userErr || !userData?.user) return json({ error: "Invalid session" }, 401);

  const { data: isAdmin, error: adminErr } = await callerClient.rpc("is_admin");
  if (adminErr || !isAdmin) return json({ error: "Admin access required" }, 403);

  let payload: { questions?: IncomingQuestion[] };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const questions = payload.questions;
  if (!Array.isArray(questions) || questions.length === 0) {
    return json({ error: "questions must be a non-empty array" }, 400);
  }
  if (questions.length > MAX_QUESTIONS_PER_CALL) {
    return json({ error: `Send at most ${MAX_QUESTIONS_PER_CALL} questions per call -- split into batches.` }, 400);
  }
  for (const q of questions) {
    if (!q.key || !q.question || !Array.isArray(q.choices) || !q.answer) {
      return json({ error: "Each question needs key, question, choices, and answer" }, 400);
    }
  }

  const results = await runWithConcurrency(questions, 8, verifyOne);
  return json({
    results: results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : {
            key: "unknown",
            verification_status: "unverified" as const,
            verification_notes: `Verification failed: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`,
            claude_answer: null,
            claude_explanation: null,
          }
    ),
  });
});
