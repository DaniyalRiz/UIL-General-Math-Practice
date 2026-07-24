// ── Problem list (row layout) ────────────────────────────────────────────────
import { useState, useEffect, useRef, useMemo } from 'react';
import { _supabase } from '../supabaseClient.js';
import { TOPIC_DOT, fmtTime, sourceDisplay, plainText } from '../constants.js';
import { MathText, DiffPill, useTimer } from './hooks.jsx';
import { ReportIssueModal, CommunitySolutions } from './community.jsx';

export function ProblemRow({ q, n, onOpen, status }) {
  const dotCls = status === "correct" ? "bg-emerald-500"
               : status === "incorrect" ? "bg-rose-500"
               : "bg-transparent";
  return (
    <button onClick={onOpen}
      className="group w-full grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] items-center gap-3 px-4 py-3 text-left
                 border-b border-slate-100 dark:border-slate-800
                 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
      <div className="flex items-center justify-end gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotCls}`}
          title={status === "correct" ? "Answered correctly" : status === "incorrect" ? "Answered incorrectly" : undefined}
          aria-label={status === "correct" ? "Answered correctly" : status === "incorrect" ? "Answered incorrectly" : undefined}></span>
        <span className="text-xs font-mono text-slate-400 dark:text-slate-600 text-right">{n}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {q.title || plainText(q.question)}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate hidden sm:block">{plainText(q.question)}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:hidden">{q.topic} · {q.difficulty}</p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[q.topic]||"bg-slate-400"}`}></span>{q.topic}
      </div>
      <div className="hidden sm:block"><DiffPill d={q.difficulty} /></div>
      <div className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{sourceDisplay(q)}</div>
      <div className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
        {q.date_added ? new Date(q.date_added).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : "—"}
      </div>
    </button>
  );
}

// ── Shared "History on this problem / My Notes / Similar Problems" widgets ───
// Rendered once here, then placed inside a mobile (lg:hidden) and a desktop
// (hidden lg:flex) wrapper by ProblemView, instead of being duplicated.
function ProblemSidebarSections({ stat, notes, authUser, noteText, setNoteText, saveNote, deleteNote, notesSaving, similarQuestions, onOpenQuestion }) {
  return (
    <>
      {/* History */}
      {stat && stat.attempts > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Your history on this problem</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{Math.round(100*stat.correct/stat.attempts)}%</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{stat.correct}/{stat.attempts} correct</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{fmtTime(stat.bestMs)}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">best time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{fmtTime(stat.lastMs)}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">last time</p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">My Notes</p>
          {!authUser && <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">Sign in to save notes</span>}
        </div>
        {notes.length > 0 && (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {notes.map(n => (
              <div key={n.id} className="px-4 py-3 flex items-start gap-3 group">
                <div className="flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{n.note_text}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">{new Date(n.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})}</p>
                </div>
                <button onClick={()=>deleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all text-lg leading-none shrink-0 mt-0.5">×</button>
              </div>
            ))}
          </div>
        )}
        {authUser ? (
          <div className="px-4 py-3">
            <textarea value={noteText} onChange={e=>setNoteText(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter' && (e.metaKey||e.ctrlKey)) saveNote(); }}
              placeholder="Add a note for this problem… (Cmd+Enter to save)" rows={3}
              className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button onClick={saveNote} disabled={!noteText.trim() || notesSaving}
              className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${noteText.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}`}>
              {notesSaving ? "Saving…" : "Save Note"}
            </button>
          </div>
        ) : (
          <div className="px-4 py-3">
            <p className="text-xs text-slate-400 dark:text-slate-500"><a href="./index.html" className="text-blue-500 hover:underline">Sign in</a> to add and save notes.</p>
          </div>
        )}
      </div>

      {/* Similar Problems */}
      {similarQuestions.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 rounded-t-2xl">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Practice Similar Problems</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Build speed by drilling the same question pattern.</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {similarQuestions.map(sq => (
              <div key={sq.id} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{sq.title || plainText(sq.question)}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className={`w-1.5 h-1.5 rounded-full ${TOPIC_DOT[sq.topic]||"bg-slate-400"}`}></span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{sq.topic}</span>
                    <DiffPill d={sq.difficulty} />
                    {sq.sharedTags && sq.sharedTags.slice(0,2).map(t =>
                      <span key={t} className="text-xs px-1.5 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">#{t}</span>
                    )}
                  </div>
                </div>
                <button onClick={()=>onOpenQuestion(sq.id)} className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors">Open</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function ProblemView({ q, onClose, onAnswered, prevAnswer, stat, onPrev, onNext, hasPrev, hasNext, isBookmarked, onToggleBookmark, authUser, allQuestions, onOpenQuestion }) {
  const [pending, setPending]   = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [crossed, setCrossed]   = useState({});
  // Notes state
  const [notes, setNotes]       = useState([]);
  const [noteText, setNoteText] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [attemptSessionId, setAttemptSessionId] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [serverResult, setServerResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const timer = useTimer();
  const startRef = useRef(Date.now());
  // Updated synchronously on every render so async RPC callbacks can detect stale results.
  const activeQuestionIdRef = useRef(q.id);
  activeQuestionIdRef.current = q.id;

  const dialogRef = useRef(null);

  // Move focus into the dialog when it opens so keyboard/screen-reader users
  // land inside it instead of staying on the (now hidden) page behind.
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  // Escape closes: the report modal first if it's open, otherwise the problem.
  // Ignored while a submission is in flight, matching the disabled Close button.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (showReportIssue) { setShowReportIssue(false); return; }
      if (!submitting) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showReportIssue, submitting, onClose]);

  // Keep Tab cycling inside the dialog -- without this, keyboard focus walks
  // out into the page hidden behind the full-screen problem view.
  const trapTab = (e) => {
    if (e.key !== 'Tab') return;
    const els = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
    if (!els) return;
    const list = Array.from(els).filter(el => el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };

  // Reset per-question interaction state whenever the question itself changes.
  useEffect(() => {
    setPending(null);
    setSelected(null);
    setAnswered(false);
    setCrossed({});
    setNoteText("");
    setAttemptSessionId(null);
    setSubmitError("");
    setServerResult(null);
    setSubmitting(false);
    timer.reset();
    timer.start(); startRef.current = Date.now();
  }, [q.id]);

  // Start the attempt session and fetch notes for this question. Depends on
  // authUser as well as q.id -- on a slow session restore, authUser can
  // resolve after this view already mounted, and without this dependency
  // notes/the attempt session would silently never load for that question.
  useEffect(() => {
    if (!authUser) { setNotes([]); return; }

    _supabase.rpc("start_question_attempt", { p_question_id: q.id })
      .then(({ data, error }) => {
        if (error) {
          console.warn("start_question_attempt error:", error.message);
          setSubmitError(error.message);
        } else {
          setAttemptSessionId(data);
        }
      });

    _supabase.from('notes')
      .select('*')
      .eq('user_id', authUser.id)
      .eq('question_id', q.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setNotes(data || []));
  }, [q.id, authUser?.id]);

  const saveNote = async () => {
    if (!noteText.trim() || !authUser) return;
    setNotesSaving(true);
    const { data, error } = await _supabase.from('notes').insert({
      user_id: authUser.id,
      question_id: q.id,
      note_text: noteText.trim(),
    }).select();
    if (!error && data) {
      setNotes(prev => [...prev, data[0]]);
      setNoteText("");
    }
    setNotesSaving(false);
  };

  const deleteNote = async (noteId) => {
    await _supabase.from('notes').delete().eq('id', noteId);
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  // Left-click: select/deselect a choice (pending, not yet submitted)
  const handlePick = (choice) => {
    if (answered) return;
    setPending(p => p === choice ? null : choice);
  };

  // Cross out / un-cross a choice -- reachable two ways: right-click on the
  // choice (the paper-test gesture) or the per-choice toggle button, which is
  // what keyboard and touch users actually have.
  const toggleCross = (choice) => {
    if (answered) return;
    setCrossed(prev => ({ ...prev, [choice]: !prev[choice] }));
  };
  const handleCross = (e, choice) => {
    e.preventDefault();
    toggleCross(choice);
  };

  // Submit button handler — answer checking happens securely in Supabase for signed-in users,
  // or client-side for guests (no persistence).
  const handleSubmit = async () => {
    if (answered || !pending || submitting) return;

    if (!authUser) {
      const timeMs = Date.now() - startRef.current;
      setSubmitting(true);
      setSubmitError("");
      const submittedForId = q.id;
      const { data, error } = await _supabase.rpc("guest_check_answer", {
        p_question_id: q.id,
        p_selected: pending,
      });
      if (activeQuestionIdRef.current !== submittedForId) return;
      setSubmitting(false);
      if (error) { setSubmitError(error.message || "Could not check answer."); return; }
      const result = Array.isArray(data) ? data[0] : data;
      if (!result || result.error) { setSubmitError(result?.error || "No result returned."); return; }
      setSelected(pending);
      setAnswered(true);
      timer.stop();
      setServerResult({ is_correct: result.is_correct, correct_answer: result.correct_answer, explanation: result.explanation || null });
      onAnswered && onAnswered({
        questionId:    q.id,
        questionTitle: q.title || null,
        questionText:  q.question || null,
        topic:         q.topic,
        difficulty:    q.difficulty,
        selected:      pending,
        correctAnswer: result.correct_answer,
        correct:       !!result.is_correct,
        timeMs,
        explanation:   result.explanation || null,
        tags:          q.tags || [],
      });
      return;
    }

    if (!attemptSessionId) {
      setSubmitError("Question session is not ready yet. Wait a moment and try again.");
      return;
    }

    const timeMs = Date.now() - startRef.current;
    setSubmitting(true);
    setSubmitError("");
    const submittedForId = q.id;

    const { data, error } = await _supabase.rpc("submit_answer", {
      p_session_id: attemptSessionId,
      p_question_id: q.id,
      p_selected_answer: pending,
      p_time_taken_ms: timeMs,
    });

    if (activeQuestionIdRef.current !== submittedForId) return;
    setSubmitting(false);

    if (error) {
      setSubmitError(error.message || "Could not submit answer.");
      return;
    }

    const result = Array.isArray(data) ? data[0] : data;
    if (!result) {
      setSubmitError("No result returned from Supabase.");
      return;
    }

    setSelected(pending);
    setAnswered(true);
    timer.stop();
    setServerResult(result);

    onAnswered && onAnswered({
      questionId:    q.id,
      questionTitle: q.title || null,
      questionText:  q.question || null,
      topic:         q.topic,
      difficulty:    q.difficulty,
      selected:      pending,
      correctAnswer: result.correct_answer,
      correct:       !!result.is_correct,
      timeMs,
      explanation:   result.explanation || null,
      tags:          q.tags || [],
    });
  };

  const correctAnswer = serverResult?.correct_answer || prevAnswer?.correctAnswer || null;
  const explanationText = serverResult?.explanation || prevAnswer?.explanation || null;
  const hasServerResult = answered && !!correctAnswer;

  const choiceLetter = (choice, idx = null) => {
    const s = String(choice || "").trim();
    const m = s.match(/^\(?([A-E])\)?[\s.)-]*/i);
    if (m) return m[1].toUpperCase();
    return idx != null ? String.fromCharCode(65 + idx) : "";
  };

  const normalizeAnswer = (value) => {
    const s = String(value || "").trim();
    const m = s.match(/^\(?([A-E])\)?(?:\s|\.|\)|-|$)/i);
    if (m) return m[1].toUpperCase();
    return s.toLowerCase();
  };

  const answerMatches = (choice, answer, idx = null) => {
    if (!choice || !answer) return false;
    const c = String(choice).trim();
    const a = String(answer).trim();
    const cLetter = choiceLetter(c, idx);
    const aNorm = normalizeAnswer(a);
    return c === a || c.toLowerCase() === a.toLowerCase() || cLetter === aNorm;
  };

  const selectedMatchesChoice = (choice, idx = null) => {
    return selected === choice || answerMatches(choice, selected, idx);
  };

  const isCorrect = answered && (
    serverResult?.is_correct === true ||
    prevAnswer?.correct === true ||
    (selected && correctAnswer && answerMatches(selected, correctAnswer))
  );

  const choiceClass = (choice, idx = null) => {
    const isCrossed = crossed[choice] && !answered;
    const isSelectedChoice = selectedMatchesChoice(choice, idx);
    const isCorrectChoice = (isCorrect && isSelectedChoice) || answerMatches(choice, correctAnswer, idx);

    if (!answered) {
      if (pending === choice) return "border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-400 cursor-pointer";
      if (isCrossed) return "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 opacity-40 cursor-pointer";
      return "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-600 dark:hover:bg-slate-800";
    }
    if (hasServerResult && isCorrectChoice) return "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300";
    if (isSelectedChoice && !isCorrect) return "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500/50 dark:bg-rose-500/10 dark:text-rose-300";
    return "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600";
  };

  // compute similar questions once
  const similarQuestions = useMemo(() => {
    const pool = allQuestions.length > 0 ? allQuestions : [];
    if (pool.length <= 1) return [];
    const others = pool.filter(x => x.id !== q.id);
    const scored = others.map(x => {
      let score = 0;
      const sharedTags = (q.tags || []).filter(t => (x.tags || []).includes(t));
      score += sharedTags.length * 10;
      if (x.topic === q.topic) score += 4;
      if (x.difficulty === q.difficulty) score += 2;
      return { x, score, sharedTags };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(s => ({ ...s.x, sharedTags: s.sharedTags }));
  }, [q.id, allQuestions]);

  return (
    <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true"
      aria-label={q.title || 'Practice problem'} onKeyDown={trapTab}
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 overflow-hidden outline-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden">

        {/* ── header ── */}
        <div className="border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-950 z-10 shadow-sm dark:shadow-slate-900">
          <div className="flex items-center justify-between px-3 sm:px-5 pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 gap-2 sm:gap-3">

            {/* Left: topic + diff + source + date */}
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${TOPIC_DOT[q.topic]}`}></span>
                {q.topic}
              </span>
              <DiffPill d={q.difficulty} />
              {q.source && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {sourceDisplay(q)}
                </span>
              )}
              {q.date_added && (
                <span className="hidden md:inline text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  Added {new Date(q.date_added).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                </span>
              )}
            </div>

            {/* Right: timer + bookmark + close */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Timer */}
              <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border font-mono text-sm font-bold tabular-nums transition-colors
                ${answered
                  ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                  : "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300"}`}>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"/>
                </svg>
                {timer.fmt}
              </div>
              <button onClick={()=>setShowReportIssue(true)} title="Report a question issue" aria-label="Report a question issue"
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border bg-slate-50 border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                <span className="hidden sm:inline">Report</span>
              </button>
              <button onClick={onToggleBookmark} title={isBookmarked ? "Remove bookmark" : "Bookmark for review"}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap
                  ${isBookmarked
                    ? "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-500/15 dark:border-amber-500/40 dark:text-amber-400"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-400"}`}>
                <span>{isBookmarked ? "Saved" : "Review Later"}</span>
              </button>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl leading-none transition-colors">×</button>
            </div>
          </div>

          {/* Title row */}
          {q.title && (
            <div className="px-3 sm:px-5 pb-2.5 sm:pb-3">
              <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{q.title}</h2>
            </div>
          )}
        </div>

        {/* ── two-column body after answering, single column before ── */}
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain ${answered ? "flex flex-col lg:flex-row pb-32 sm:pb-6" : "flex flex-col pb-3"}`}>

          {/* ── LEFT column: question + choices + explanation + tags ── */}
          <div className={answered ? "lg:flex-1 lg:min-w-0 flex flex-col overflow-y-auto" : "flex flex-col"}>

            {/* ── question ── */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-4">
              <p className="text-slate-800 dark:text-slate-100 font-medium text-base leading-relaxed whitespace-pre-line">
                <MathText text={q.question} />
              </p>
              {q.image && (
                <div className="mt-4 flex justify-center">
                  <img src={q.image} alt="Figure for problem"
                    className="max-w-full sm:max-w-md rounded-xl border border-slate-200 dark:border-slate-700 bg-white" />
                </div>
              )}
            </div>

            {/* ── hint ── */}
            {!answered && (
              <p className="px-4 sm:px-6 pb-2 text-xs text-slate-500 dark:text-slate-400">
                Click to select · Cross out with right-click or the ✕ at the right edge · Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">Submit</kbd> to check
              </p>
            )}

            {/* ── choices ── */}
            <div className="px-4 sm:px-6 pb-4 grid gap-2.5">
              {q.choices.map((choice, i) => (
                // Wrapper div, not nesting: the cross-out toggle must be a
                // sibling of the choice button -- a button inside a button is
                // invalid HTML and breaks keyboard activation.
                <div key={i} className="relative">
                  <button
                    onClick={() => handlePick(choice)}
                    onContextMenu={(e) => handleCross(e, choice)}
                    className={`w-full text-left px-3 sm:px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 select-none ${!answered ? "pr-12" : ""} ${choiceClass(choice, i)}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-black relative transition-all
                      ${answered && ((isCorrect && selectedMatchesChoice(choice, i)) || answerMatches(choice, correctAnswer, i))
                        ? "bg-emerald-500 text-white border-2 border-emerald-500"
                        : answered && selectedMatchesChoice(choice, i) && !isCorrect
                          ? "bg-rose-500 text-white border-2 border-rose-500"
                          : pending === choice && !answered
                            ? "bg-blue-500 text-white border-2 border-blue-500"
                            : "border-2 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500"}
                      ${crossed[choice] && !answered ? "opacity-30" : ""}`}>
                      {String.fromCharCode(65+i)}
                      {crossed[choice] && !answered && (
                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-full h-0.5 bg-current rotate-45 absolute"></span>
                        </span>
                      )}
                    </span>
                    <span className={crossed[choice] && !answered ? "line-through opacity-50" : ""}>
                      <MathText text={choice.replace(/^\([A-E]\)\s*/, '')} />
                    </span>
                    {answered && (((isCorrect && selectedMatchesChoice(choice, i)) || answerMatches(choice, correctAnswer, i))) && <span className="ml-auto text-emerald-600 dark:text-emerald-400 font-bold text-base">✓</span>}
                    {answered && selectedMatchesChoice(choice, i) && !isCorrect && <span className="ml-auto text-rose-500 font-bold text-base">✗</span>}
                  </button>
                  {!answered && (
                    <button type="button"
                      onClick={() => toggleCross(choice)}
                      aria-pressed={!!crossed[choice]}
                      aria-label={crossed[choice] ? `Undo cross out for choice ${String.fromCharCode(65+i)}` : `Cross out choice ${String.fromCharCode(65+i)}`}
                      title={crossed[choice] ? "Undo cross out" : "Cross out this choice"}
                      className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold transition-colors
                        ${crossed[choice]
                          ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10"
                          : "text-slate-300 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"}`}>
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ── submit button (pre-answer) ── */}
            {!answered && (
              <div className="sticky bottom-0 z-20 px-4 sm:px-6 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-100 dark:border-slate-800">
                {submitError && (
                  <p className="mb-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-lg px-3 py-2">
                    {submitError}
                  </p>
                )}
                <button onClick={handleSubmit} disabled={!pending || submitting}
                  className={`w-full py-3 rounded-lg text-sm font-bold transition-all
                    ${pending && !submitting
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"}`}>
                  {submitting ? "Submitting…" : pending ? "Submit Answer" : "Select an answer first"}
                </button>
              </div>
            )}

            {/* ── explanation (post-answer) ── */}
            {answered && (
              <div className={`mx-4 sm:mx-6 mb-5 rounded-2xl p-6 sm:p-8 border flex flex-col shrink-0
                ${isCorrect ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30"
                            : "bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30"}`}>
                <div className={`font-bold text-base mb-3 ${isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                  {isCorrect ? "✓ Correct!" : `✗ Incorrect — Correct: ${correctAnswer}`}{` · Time: ${timer.fmt}`}
                </div>
                <div className="mt-1 text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed whitespace-normal break-words">
                  <div className="overflow-x-auto max-w-full">
                    <MathText text={explanationText || ""} />
                  </div>
                </div>
              </div>
            )}

            {answered && <CommunitySolutions q={q} authUser={authUser} answered={answered} />}

            {/* ── tags ── */}
            <div className="px-4 sm:px-6 pb-4 flex flex-wrap gap-1.5">
              {q.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">#{t}</span>)}
            </div>

            {/* on mobile, show sidebar sections inline after answering */}
            {answered && (
              <div className="lg:hidden flex flex-col gap-4 px-6 pb-4">
                <ProblemSidebarSections stat={stat} notes={notes} authUser={authUser}
                  noteText={noteText} setNoteText={setNoteText} saveNote={saveNote} deleteNote={deleteNote}
                  notesSaving={notesSaving} similarQuestions={similarQuestions} onOpenQuestion={onOpenQuestion} />
              </div>
            )}

          </div>{/* end left column */}

          {/* ── RIGHT sidebar: only on desktop, only after answering ── */}
          {answered && (
            <div className="hidden lg:flex flex-col gap-4 w-80 xl:w-96 shrink-0 border-l border-slate-100 dark:border-slate-800 px-5 pt-5 pb-4 overflow-y-auto">
              <ProblemSidebarSections stat={stat} notes={notes} authUser={authUser}
                noteText={noteText} setNoteText={setNoteText} saveNote={saveNote} deleteNote={deleteNote}
                notesSaving={notesSaving} similarQuestions={similarQuestions} onOpenQuestion={onOpenQuestion} />
            </div>
          )}{/* end right sidebar */}

        </div>{/* end two-column body */}

        {showReportIssue && (
          <ReportIssueModal q={q} authUser={authUser} onClose={()=>setShowReportIssue(false)} />
        )}

        {/* ── nav footer ── */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-slate-950 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <button onClick={onPrev} disabled={!hasPrev || submitting}
            className={`w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ${hasPrev && !submitting
              ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              : "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed"}`}>← Prev</button>
          <button onClick={onClose} disabled={submitting} className={`w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ${submitting ? 'text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>Close</button>
          <button onClick={onNext} disabled={!hasNext || submitting}
            className={`w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ${hasNext && !submitting
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed"}`}>Next →</button>
        </div>
      </div>
    </div>
  );
}

