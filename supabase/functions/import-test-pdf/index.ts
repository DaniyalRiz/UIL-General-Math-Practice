// Admin-only: extracts questions from a UIL/TMSCA test PDF via Claude and
// writes them to draft_questions for human review. Never touches `questions`
// and never sets review_status to anything but 'pending'.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const ANTHROPIC_MODEL = "claude-sonnet-4-6";
// TEMPORARY diagnostic value -- raised so we can see how long each call
// actually takes (via the timing logs in streamToolCall) instead of getting
// cut off again. Will be tuned back down once we have real numbers.
const CALL_TIMEOUT_MS = 140_000;

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

// Phase A: transcribe every question on the page -- no solving, so this stays
// fast no matter how many questions are on the page.
const BOUNDARIES_TOOL = {
  name: "extract_question_boundaries",
  description: "Transcribe every multiple-choice question from this math competition test page, without solving them.",
  strict: true,
  input_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            original_question_number: { type: "integer", description: "Question number as printed on the test" },
            title: { type: "string", description: "Short descriptive title, 3-8 words" },
            topic: { type: "string", description: "e.g. Algebra 1 & 2, Geometry, Precalculus, Number Sense" },
            difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
            question: { type: "string", description: "Full question text, transcribed exactly. Use LaTeX (\\(...\\)) for math notation." },
            choices: {
              type: "array",
              items: { type: "string" },
              description: "Exactly 5 answer choices, each formatted like '(A) 42'",
            },
            tags: { type: "array", items: { type: "string" } },
            needs_image: { type: "boolean", description: "True if a diagram/figure is essential to solving the question, not just decorative" },
            image_alt: { type: "string", description: "Alt text describing the needed diagram, empty string if needs_image is false" },
          },
          required: [
            "original_question_number", "title", "topic", "difficulty", "question",
            "choices", "tags", "needs_image", "image_alt",
          ],
          additionalProperties: false,
        },
      },
    },
    required: ["questions"],
    additionalProperties: false,
  },
};

// Phase B: solve exactly one already-transcribed question.
const SOLVE_TOOL = {
  name: "solve_question",
  description: "Solve this single math competition question and show the full worked solution.",
  strict: true,
  input_schema: {
    type: "object",
    properties: {
      extracted_answer: { type: "string", description: "The correct choice, exactly matching one entry in choices" },
      explanation: { type: "string", description: "Full worked solution in LaTeX" },
    },
    required: ["extracted_answer", "explanation"],
    additionalProperties: false,
  },
};

type QuestionBoundary = {
  original_question_number: number;
  title: string;
  topic: string;
  difficulty: string;
  question: string;
  choices: string[];
  tags: string[];
  needs_image: boolean;
  image_alt: string;
};

function parseAnswerKey(raw: string): Map<number, string> {
  const map = new Map<number, string>();
  // Accepts "1. C" / "1) C" / "1:C" / bare comma-separated list "C, C, D, ..."
  const numbered = [...raw.matchAll(/(\d+)[).:]\s*([A-E])\b/gi)];
  if (numbered.length > 0) {
    for (const m of numbered) map.set(parseInt(m[1], 10), m[2].toUpperCase());
    return map;
  }
  const bare = raw.match(/[A-E]/gi);
  if (bare) {
    bare.forEach((letter, idx) => map.set(idx + 1, letter.toUpperCase()));
  }
  return map;
}

function choiceLetter(choiceText: string): string | null {
  const m = choiceText.match(/^\(?([A-E])\)?/i);
  return m ? m[1].toUpperCase() : null;
}

// Streams a Messages API tool-forced response and returns the assembled tool
// input, instead of waiting for one blocking JSON reply. Raw SSE parsing (no
// SDK), matching the rest of this function's fetch-based style.
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
    throw new Error(`[${label}] Claude API error ${resp.status}: ${errText}`);
  }
  if (!resp.body) throw new Error(`[${label}] Claude API returned no response body for the streamed request`);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let partialJson = "";
  let stopReason = "end_turn";
  let parseFailures = 0;
  const eventTypesSeen: string[] = [];

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
      let evt: { type?: string; delta?: { type?: string; partial_json?: string; stop_reason?: string }; content_block?: { type?: string } };
      try {
        evt = JSON.parse(dataStr);
      } catch {
        parseFailures++;
        continue;
      }
      if (evt.type && eventTypesSeen.length < 20) {
        eventTypesSeen.push(evt.delta?.type ? `${evt.type}:${evt.delta.type}` : evt.type);
      }
      if (evt.type === "content_block_delta" && evt.delta?.type === "input_json_delta") {
        partialJson += evt.delta.partial_json ?? "";
      } else if (evt.type === "message_delta" && evt.delta?.stop_reason) {
        stopReason = evt.delta.stop_reason;
      }
    }
  }

  if (!partialJson) {
    throw new Error(
      `[${label}] Claude did not stream any tool input. stop_reason=${stopReason}, parseFailures=${parseFailures}, ` +
        `partialJsonLen=${partialJson.length}, eventTypes=${JSON.stringify(eventTypesSeen)}`,
    );
  }

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
// `limit` calls in flight at once. Firing all page/question calls at the same
// instant spikes both request rate and token throughput against the
// Anthropic API and reliably trips rate limits -- this keeps the burst small
// while still running mostly in parallel.
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

type SupabaseClient = ReturnType<typeof createClient>;

async function markFailed(db: SupabaseClient, batchId: string, message: string) {
  await db
    .from("import_batches")
    .update({ status: "failed", error_message: message, finished_at: new Date().toISOString() })
    .eq("id", batchId);
}

// Cheap, no-Claude-call estimate of the PDF's real page count, by counting
// "/Type /Page" leaf-object declarations in the raw PDF structure. Drives the
// per-page chunking below -- a 60-question test can span 8+ dense pages, far
// too much to transcribe reliably (or within any output-token budget) in a
// single call.
function countPdfPages(pdf_base64: string): number {
  try {
    const raw = atob(pdf_base64);
    const matches = raw.match(/\/Type\s*\/Page(?!s)/g);
    return matches && matches.length > 0 ? matches.length : 1;
  } catch {
    return 1;
  }
}

// Transcribes only the questions on one specific page. Splitting by page
// (rather than one call for the whole document) keeps every call's output
// small regardless of how many questions the overall test has, and lets
// non-content pages (cover, instructions, blank filler, answer key, worked
// solutions) cheaply return zero questions instead of derailing the batch.
async function extractBoundariesForPage(
  pdf_base64: string,
  pageNumber: number,
  pageCount: number,
): Promise<QuestionBoundary[]> {
  const { stopReason, toolInput } = await withTimeout((signal) =>
    streamToolCall(
      {
        model: ANTHROPIC_MODEL,
        max_tokens: 6000,
        stream: true,
        tools: [BOUNDARIES_TOOL],
        tool_choice: { type: "tool", name: "extract_question_boundaries" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "base64", media_type: "application/pdf", data: pdf_base64 },
                // Same PDF bytes are sent on every one of the (up to) 13 per-page
                // calls -- caching it means only the first call pays full price/rate
                // cost for those ~30k input tokens, the rest are cheap cache reads.
                cache_control: { type: "ephemeral" },
              },
              {
                type: "text",
                text:
                  `This PDF document has ${pageCount} pages total. Look ONLY at page ${pageNumber} ` +
                  `(page 1 is the very first page of the document). Transcribe every multiple-choice math ` +
                  `question whose number label and answer choices appear on page ${pageNumber}, exactly as printed. ` +
                  `Do not solve them yet. Preserve LaTeX-worthy math notation using \\(...\\) inline math. ` +
                  `Set needs_image:true only when a diagram is essential to solving the question, not just decorative. ` +
                  `If page ${pageNumber} has no multiple-choice math questions on it (e.g. it is a cover page, ` +
                  `instructions, a blank/filler page, an answer key, or worked solutions), return an empty questions array.`,
              },
            ],
          },
        ],
      },
      signal,
      `boundaries-p${pageNumber}`,
    )
  );

  if (stopReason === "refusal") throw new Error(`Claude declined to process page ${pageNumber} (refusal)`);
  return (toolInput.questions as QuestionBoundary[] | undefined) ?? [];
}

async function solveQuestion(
  pdf_base64: string,
  q: QuestionBoundary,
): Promise<{ extracted_answer: string; explanation: string }> {
  const content: unknown[] = [];
  // Only re-attach the PDF for questions that genuinely need the diagram --
  // keeps every other solve call cheap and fast.
  if (q.needs_image) {
    content.push({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: pdf_base64 },
      cache_control: { type: "ephemeral" },
    });
  }
  content.push({
    type: "text",
    text:
      `Solve this math competition question and show your real work.\n\n` +
      `Question ${q.original_question_number}: ${q.question}\n\n` +
      `Choices:\n${q.choices.join("\n")}\n\n` +
      (q.needs_image ? "The PDF page is attached above because this question depends on a diagram -- look at it carefully.\n" : "") +
      `Set extracted_answer to exactly one of the choices above, and explanation to the full worked solution in LaTeX.`,
  });

  const { stopReason, toolInput } = await withTimeout((signal) =>
    streamToolCall(
      {
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        stream: true,
        tools: [SOLVE_TOOL],
        tool_choice: { type: "tool", name: "solve_question" },
        messages: [{ role: "user", content }],
      },
      signal,
      `solve#${q.original_question_number}`,
    )
  );

  if (stopReason === "refusal") throw new Error("Claude declined to solve this question (refusal)");
  const extracted_answer = toolInput.extracted_answer as string | undefined;
  const explanation = toolInput.explanation as string | undefined;
  if (!extracted_answer || !explanation) throw new Error("Claude did not return a complete solution");
  return { extracted_answer, explanation };
}

// Runs after the kickoff response has already been sent to the browser (see
// EdgeRuntime.waitUntil below). Phase A transcribes every page in parallel
// (one small call per page); phase B solves each question independently and
// in parallel, inserting each draft_questions row as soon as it's ready so
// the review UI can show partial results live instead of waiting on the
// slowest question to finish.
async function runExtraction(
  db: SupabaseClient,
  batchId: string,
  pdf_base64: string,
  source_label: string | null,
  original_test: string | null,
  answer_key: string | null,
) {
  await db.from("import_batches").update({ status: "processing" }).eq("id", batchId);

  // Best-effort audit copy in the bucket provisioned for this in Phase 1 -- not
  // required for extraction (pdf_base64 is already in memory) so a failure
  // here must never block or fail the batch.
  try {
    const bytes = Uint8Array.from(atob(pdf_base64), (c) => c.charCodeAt(0));
    const path = `${batchId}.pdf`;
    await db.storage.from("test-pdfs").upload(path, bytes, { contentType: "application/pdf", upsert: true });
    await db.from("import_batches").update({ source_pdf_path: path }).eq("id", batchId);
  } catch {
    // Non-fatal -- proceed with extraction regardless.
  }

  const pageCount = countPdfPages(pdf_base64);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Concurrency-limited rather than all-at-once: every call resends the same
  // ~30k-token PDF, so firing all pages simultaneously spikes request rate and
  // token throughput enough to trip Anthropic rate limits on most of them.
  const pageResults = await runWithConcurrency(
    pageNumbers,
    4,
    (pageNumber) => extractBoundariesForPage(pdf_base64, pageNumber, pageCount),
  );

  const boundaries: QuestionBoundary[] = [];
  const pageErrors: string[] = [];
  pageResults.forEach((r, idx) => {
    if (r.status === "fulfilled") {
      boundaries.push(...r.value);
    } else {
      const reason = r.reason instanceof Error && r.reason.name === "AbortError"
        ? `timed out after ${CALL_TIMEOUT_MS / 1000}s`
        : r.reason instanceof Error
          ? r.reason.message
          : String(r.reason);
      pageErrors.push(`page ${idx + 1}: ${reason}`);
    }
  });

  if (boundaries.length === 0) {
    await markFailed(
      db,
      batchId,
      pageErrors.length > 0
        ? `No questions extracted from any page. Per-page errors: ${pageErrors.join(" | ")}`
        : "No multiple-choice questions found anywhere in this PDF.",
    );
    return;
  }

  await db.from("import_batches").update({ questions_total: boundaries.length }).eq("id", batchId);

  const answerKeyMap = answer_key ? parseAnswerKey(answer_key) : new Map<number, string>();

  const results = await runWithConcurrency(boundaries, 6, async (q) => {
      let extracted_answer = "";
      let explanation = "[Automatic solving failed -- please solve manually.]";
      let solveError: string | null = null;
      try {
        const solved = await solveQuestion(pdf_base64, q);
        extracted_answer = solved.extracted_answer;
        explanation = solved.explanation;
      } catch (err) {
        solveError = err instanceof Error && err.name === "AbortError"
          ? `Claude did not finish solving this question within ${CALL_TIMEOUT_MS / 1000}s.`
          : err instanceof Error
            ? err.message
            : String(err);
      }

      const extractedLetter = choiceLetter(extracted_answer) ?? choiceLetter(q.choices[0] ?? "");
      const keyLetter = answerKeyMap.get(q.original_question_number);
      let verification_status: "match" | "mismatch" | "unverified" | "no_answer_key" = "unverified";
      let verification_notes: string | null = solveError ? `Solving failed: ${solveError}` : null;
      if (solveError) {
        verification_status = "unverified";
      } else if (!answer_key) {
        verification_status = "no_answer_key";
      } else if (!keyLetter) {
        verification_status = "unverified";
        verification_notes = "Answer key did not include this question number";
      } else if (extractedLetter && extractedLetter === keyLetter) {
        verification_status = "match";
      } else {
        verification_status = "mismatch";
        verification_notes = `Claude solved (${extractedLetter ?? "?"}), answer key says (${keyLetter})`;
      }

      const matchedChoice = q.choices.find((c) => choiceLetter(c) === (keyLetter ?? extractedLetter));

      const row = {
        batch_id: batchId,
        title: q.title,
        topic: q.topic,
        difficulty: q.difficulty,
        source: source_label ?? null,
        question: q.question,
        choices: q.choices,
        tags: q.tags ?? [],
        extracted_answer,
        claude_solved_answer: extracted_answer,
        answer: matchedChoice ?? extracted_answer,
        explanation,
        needs_image: q.needs_image,
        image_alt: q.needs_image ? q.image_alt : null,
        verification_status,
        verification_notes,
        original_test: original_test ?? null,
        original_question_number: q.original_question_number,
        source_reference: source_label ? `${source_label} #${q.original_question_number}` : null,
        review_status: "pending",
      };

      // Insert immediately -- this is what makes results show up live in the
      // review UI instead of waiting for every question to finish.
      const { error: insertErr } = await db.from("draft_questions").insert(row);
      if (insertErr) throw new Error(`Failed to insert question ${q.original_question_number}: ${insertErr.message}`);
      return { verification_status, hadError: !!solveError };
  });

  const inserted = results.filter((r) => r.status === "fulfilled").length;
  const needsAttention = results.some(
    (r) => r.status === "rejected" || (r.status === "fulfilled" && (r.value.verification_status === "mismatch" || r.value.hadError)),
  );

  if (inserted === 0) {
    await markFailed(db, batchId, "All questions on this page failed to solve -- check individual question errors and retry.");
    return;
  }

  await db
    .from("import_batches")
    .update({
      status: pageErrors.length > 0 ? "needs_attention" : needsAttention ? "needs_attention" : "completed",
      questions_extracted: inserted,
      // Page-level failures (e.g. rate limits) don't fail the whole batch --
      // whatever pages succeeded still show up live -- but they must stay
      // visible instead of silently vanishing, since they mean some questions
      // are simply missing from this import.
      error_message: pageErrors.length > 0
        ? `${pageErrors.length} of ${pageCount} page(s) failed to extract and are missing from this import: ${pageErrors.join(" | ")}`
        : null,
      finished_at: new Date().toISOString(),
    })
    .eq("id", batchId);
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

  let payload: {
    pdf_base64?: string;
    source_label?: string;
    original_test?: string;
    answer_key?: string;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { pdf_base64, source_label, original_test, answer_key } = payload;
  if (!pdf_base64) return json({ error: "pdf_base64 is required" }, 400);

  // Service role for the actual writes -- RLS on these tables is admin-only anyway,
  // but we've already verified admin status above against the caller's own session.
  const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: batch, error: batchErr } = await db
    .from("import_batches")
    .insert({
      created_by: userData.user.id,
      source_label: source_label ?? null,
      status: "queued",
      started_at: new Date().toISOString(),
      answer_key_found: !!answer_key,
    })
    .select()
    .single();
  if (batchErr || !batch) return json({ error: `Failed to create import batch: ${batchErr?.message}` }, 500);

  // Respond immediately -- the browser polls import_batches/draft_questions
  // for progress instead of holding this request open. Extraction keeps
  // running in the background via EdgeRuntime.waitUntil, which is the
  // documented way to do work after the response has been sent without the
  // isolate being torn down early.
  // @ts-ignore -- EdgeRuntime is a Supabase Edge Functions global, typed by the
  // jsr:@supabase/functions-js/edge-runtime.d.ts import at the top of this file.
  EdgeRuntime.waitUntil(
    runExtraction(db, batch.id, pdf_base64, source_label ?? null, original_test ?? null, answer_key ?? null),
  );

  return json({ batch_id: batch.id, status: "queued" }, 202);
});
