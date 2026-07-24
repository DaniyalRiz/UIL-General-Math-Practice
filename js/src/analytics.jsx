import { useState, useEffect, useRef, useMemo } from 'react';
import { _supabase } from '../supabaseClient.js';
import { getColumnCategory, TOPIC_DOT, fmtTime, SOURCE_TYPES, getSourceType, sortSources, plainText } from '../constants.js';
import { MathText, DiffPill, Dropdown } from './hooks.jsx';
import { computeDayStreak } from '../utils.js';

// ── Weekly trend: accuracy line over attempt-volume bars, last 8 weeks ───────
// Two stacked panels sharing the week axis instead of a dual-axis chart
// (accuracy % and attempt counts are different scales). Palette validated for
// CVD/contrast in both modes: blue-600/blue-500 line, teal-600 bars.
function WeeklyTrend({ attempts }) {
  const [hover, setHover] = useState(null);

  const weeks = useMemo(() => {
    const weekStartOf = (d) => {
      const dt = new Date(d);
      dt.setHours(0, 0, 0, 0);
      dt.setDate(dt.getDate() - ((dt.getDay() + 6) % 7)); // Monday start
      return dt;
    };
    const buckets = new Map();
    (attempts || []).forEach(r => {
      const key = weekStartOf(r.created_at).getTime();
      const b = buckets.get(key) || { attempts: 0, correct: 0 };
      b.attempts += 1;
      if (r.is_correct) b.correct += 1;
      buckets.set(key, b);
    });
    const thisWeek = weekStartOf(new Date());
    const out = [];
    for (let i = 7; i >= 0; i--) {
      const start = new Date(thisWeek);
      start.setDate(start.getDate() - 7 * i);
      const b = buckets.get(start.getTime()) || { attempts: 0, correct: 0 };
      out.push({
        label: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        attempts: b.attempts,
        correct: b.correct,
        accuracy: b.attempts ? Math.round(100 * b.correct / b.attempts) : null,
      });
    }
    return out;
  }, [attempts]);

  if (!weeks.some(w => w.attempts > 0)) return null;

  const n = weeks.length;
  const maxAttempts = Math.max(1, ...weeks.map(w => w.attempts));
  const pts = weeks.map((w, i) => w.accuracy === null ? null : { x: (i + 0.5) / n * 100, y: 100 - w.accuracy, i });
  // Split the line into segments across weeks with no attempts (gaps, not zeros).
  const segments = [];
  let run = [];
  pts.forEach(p => { if (p) run.push(p); else { if (run.length) segments.push(run); run = []; } });
  if (run.length) segments.push(run);
  const lastPt = [...pts].reverse().find(Boolean);
  const hoverAlign = (i) => i <= 1 ? 'left-0' : i >= n - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Weekly Trend</h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">Last 8 weeks</span>
      </div>

      <div className="relative">
        {/* Accuracy panel */}
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Accuracy</p>
        <div className="relative h-28 mb-1">
          {[0, 50, 100].map(v => (
            <div key={v} className="absolute inset-x-0 border-t border-slate-100 dark:border-slate-800" style={{ top: `${100 - v}%` }}>
              <span className={`absolute left-0 text-[10px] text-slate-400 dark:text-slate-500 tabular-nums ${v === 100 ? 'pt-px' : '-translate-y-full pb-px'}`}>{v}%</span>
            </div>
          ))}
          <svg aria-hidden="true" className="absolute inset-0 w-full h-full text-blue-600 dark:text-blue-500 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {segments.map((seg, si) => (
              <polyline key={si} points={seg.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="currentColor"
                strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
            ))}
          </svg>
          {pts.filter(Boolean).map(p => (
            <span key={p.i} aria-hidden="true"
              className={`absolute w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-900 ${hover === p.i ? 'bg-blue-700 dark:bg-blue-400 scale-125' : 'bg-blue-600 dark:bg-blue-500'}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }} />
          ))}
          {lastPt && (
            <span className="absolute -translate-x-1/2 text-xs font-bold text-slate-700 dark:text-slate-200 tabular-nums"
              style={{ left: `${lastPt.x}%`, top: `${lastPt.y}%`, marginTop: '-1.4rem' }}>
              {weeks[lastPt.i].accuracy}%
            </span>
          )}
        </div>

        {/* Attempts panel */}
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 mt-4">Attempts</p>
        <div className="flex items-end gap-0.5 h-16 border-b border-slate-100 dark:border-slate-800">
          {weeks.map((w, i) => (
            <div key={i} className="flex-1 flex items-end justify-center h-full">
              <div className={`w-full max-w-8 rounded-t ${hover === i ? 'bg-teal-700 dark:bg-teal-500' : 'bg-teal-600'}`}
                style={{ height: w.attempts ? `${Math.max(4, w.attempts / maxAttempts * 100)}%` : '0' }} />
            </div>
          ))}
        </div>

        {/* X labels */}
        <div className="flex mt-1.5">
          {weeks.map((w, i) => (
            <span key={i} className={`flex-1 text-center text-[10px] text-slate-400 dark:text-slate-500 ${i % 2 ? 'invisible sm:visible' : ''}`}>{w.label}</span>
          ))}
        </div>

        {/* Hover bands + tooltip, spanning both panels */}
        <div className="absolute inset-0 flex" onMouseLeave={() => setHover(null)}>
          {weeks.map((w, i) => (
            <div key={i} className={`flex-1 relative ${hover === i ? 'bg-slate-500/5 dark:bg-slate-400/5 rounded' : ''}`}
              onMouseEnter={() => setHover(i)}>
              {hover === i && (
                <div className={`absolute top-0 ${hoverAlign(i)} z-10 pointer-events-none whitespace-nowrap rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 shadow-lg text-xs`}>
                  <p className="font-bold text-slate-700 dark:text-slate-200 mb-0.5">Week of {w.label}</p>
                  {w.attempts
                    ? <>
                        <p className="text-slate-600 dark:text-slate-300">{w.accuracy}% accuracy ({w.correct}/{w.attempts})</p>
                        <p className="text-slate-400 dark:text-slate-500">{w.attempts} attempt{w.attempts !== 1 ? 's' : ''}</p>
                      </>
                    : <p className="text-slate-400 dark:text-slate-500">No attempts</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <table className="sr-only">
        <caption>Weekly accuracy and attempts, last 8 weeks</caption>
        <thead><tr><th>Week of</th><th>Accuracy</th><th>Correct</th><th>Attempts</th></tr></thead>
        <tbody>
          {weeks.map((w, i) => (
            <tr key={i}><td>{w.label}</td><td>{w.accuracy === null ? 'No attempts' : `${w.accuracy}%`}</td><td>{w.correct}</td><td>{w.attempts}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AnalyticsPage({ authUser, attempts, attemptsError }) {
  // Shared attempt history owned by App (one fetch per login). null = still loading.
  const data = attempts;

  // ── compute stats (memoized: only re-runs when the data itself changes) ────
  const stats = useMemo(() => {
    const rows = data || [];
    const total      = rows.length;
    const correct    = rows.filter(r => r.is_correct).length;
    const accuracy   = total ? Math.round(100 * correct / total) : 0;
    const totalMs    = rows.reduce((s, r) => s + (r.time_taken_ms || 0), 0);
    const avgMs      = total ? Math.round(totalMs / total) : 0;

    // by topic
    const topicMap = {};
    rows.forEach(r => {
      if (!topicMap[r.topic]) topicMap[r.topic] = { attempts:0, correct:0, totalMs:0 };
      topicMap[r.topic].attempts++;
      if (r.is_correct) topicMap[r.topic].correct++;
      topicMap[r.topic].totalMs += r.time_taken_ms || 0;
    });
    const byTopic = Object.entries(topicMap).map(([topic, v]) => ({
      topic, attempts: v.attempts, correct: v.correct,
      accuracy: Math.round(100 * v.correct / v.attempts),
      avgMs: Math.round(v.totalMs / v.attempts),
    })).sort((a,b) => b.attempts - a.attempts);

    // by difficulty
    const diffMap = {};
    rows.forEach(r => {
      if (!diffMap[r.difficulty]) diffMap[r.difficulty] = { attempts:0, correct:0, totalMs:0 };
      diffMap[r.difficulty].attempts++;
      if (r.is_correct) diffMap[r.difficulty].correct++;
      diffMap[r.difficulty].totalMs += r.time_taken_ms || 0;
    });
    const byDiff = ['Easy','Medium','Hard'].map(d => {
      const v = diffMap[d] || { attempts:0, correct:0, totalMs:0 };
      return { difficulty:d, attempts:v.attempts, correct:v.correct,
        accuracy: v.attempts ? Math.round(100 * v.correct / v.attempts) : 0,
        avgMs: v.attempts ? Math.round(v.totalMs / v.attempts) : 0 };
    });

    // by UIL column
    const columnMap = {};
    rows.forEach(r => {
      const column = getColumnCategory(r);
      if (!column) return;
      if (!columnMap[column]) columnMap[column] = { attempts:0, correct:0, totalMs:0 };
      columnMap[column].attempts++;
      if (r.is_correct) columnMap[column].correct++;
      columnMap[column].totalMs += r.time_taken_ms || 0;
    });
    const byColumn = ['Column 1','Column 2','Column 3'].map(column => {
      const v = columnMap[column] || { attempts:0, correct:0, totalMs:0 };
      return { column, attempts:v.attempts, correct:v.correct,
        accuracy: v.attempts ? Math.round(100 * v.correct / v.attempts) : 0,
        avgMs: v.attempts ? Math.round(v.totalMs / v.attempts) : 0 };
    });

    // insights
    const topicsWithData = byTopic.filter(t => t.attempts > 0);
    const strongest = topicsWithData.length ? topicsWithData.reduce((a,b) => a.accuracy>=b.accuracy?a:b) : null;
    const weakest   = topicsWithData.length ? topicsWithData.reduce((a,b) => a.accuracy<=b.accuracy?a:b) : null;
    const fastest   = topicsWithData.length ? topicsWithData.reduce((a,b) => a.avgMs<=b.avgMs?a:b) : null;
    const slowest   = topicsWithData.length ? topicsWithData.reduce((a,b) => a.avgMs>=b.avgMs?a:b) : null;

    const streak = computeDayStreak(rows);

    return { total, correct, accuracy, totalMs, avgMs, byTopic, byDiff, byColumn, topicsWithData, strongest, weakest, fastest, slowest, streak };
  }, [data]);

  if (authUser && data === null) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (attemptsError) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <p className="text-rose-500 font-semibold">Error loading analytics: {attemptsError}</p>
      <p className="text-slate-400 text-sm mt-1">Make sure the attempts table exists in Supabase.</p>
    </div>
  );

  if (!data || data.length === 0) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
      </div>
      <p className="font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No data yet</p>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Answer some problems and your analytics will appear here.</p>
    </div>
  );

  const { total, correct, accuracy, totalMs, avgMs, byTopic, byDiff, byColumn, topicsWithData, strongest, weakest, fastest, slowest, streak } = stats;

  const DIFF_BAR = { Easy:'bg-emerald-500', Medium:'bg-amber-500', Hard:'bg-rose-500' };
  const COLUMN_BAR = { 'Column 1':'bg-blue-500', 'Column 2':'bg-violet-500', 'Column 3':'bg-fuchsia-500' };

  const exportAnalyticsPdf = async () => {
    // Loaded on first click so the PDF library stays out of the main bundle.
    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF();
    let y = 18;
    const line = (text, size = 10, bold = false) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      const wrapped = doc.splitTextToSize(String(text), 180);
      wrapped.forEach(part => {
        if (y > 280) { doc.addPage(); y = 18; }
        doc.text(part, 14, y);
        y += size * 0.45 + 3;
      });
    };
    const spacer = (n = 4) => { y += n; };

    line('UIL Math Practice Analytics Report', 18, true);
    line('Exported: ' + new Date().toLocaleString(), 9);
    spacer();

    line('Summary', 13, true);
    line(`Total Attempts: ${total}`);
    line(`Correct: ${correct}`);
    line(`Accuracy: ${accuracy}%`);
    line(`Average Time: ${fmtTime(avgMs)}`);
    line(`Total Time: ${fmtTime(totalMs)}`);
    line(`Day Streak: ${streak}`);
    spacer();

    line('Performance by Column', 13, true);
    byColumn.forEach(c => line(`${c.column}: ${c.correct}/${c.attempts} correct · ${c.accuracy}% · avg ${fmtTime(c.avgMs)}`));
    spacer();

    line('Performance by Topic', 13, true);
    byTopic.forEach(t => line(`${t.topic}: ${t.correct}/${t.attempts} correct · ${t.accuracy}% · avg ${fmtTime(t.avgMs)}`));
    spacer();

    line('Performance by Difficulty', 13, true);
    byDiff.forEach(d => line(`${d.difficulty}: ${d.correct}/${d.attempts} correct · ${d.accuracy}% · avg ${fmtTime(d.avgMs)}`));
    spacer();

    line('Recent Attempts', 13, true);
    data.slice(0, 50).forEach(r => {
      line(`${new Date(r.created_at).toLocaleDateString()} · ${r.is_correct ? 'Correct' : 'Incorrect'} · ${fmtTime(r.time_taken_ms || 0)} · ${r.question_title || 'Question #' + r.question_id}`, 9);
    });

    doc.save('uil-math-analytics.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {!authUser && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl text-sm">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span className="text-blue-800 dark:text-blue-200">Showing this session only. <a href="./index.html" className="font-semibold underline">Sign in</a> to save your progress.</span>
        </div>
      )}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Your personal performance across all practice sessions</p>
        </div>
        <button onClick={exportAnalyticsPdf}
          className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          Export PDF
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label:'Attempted',  value: total,           color:'text-slate-700 dark:text-slate-200' },
          { label:'Correct',    value: correct,         color:'text-emerald-600 dark:text-emerald-400' },
          { label:'Accuracy',   value: accuracy + '%',  color: accuracy>=70?'text-emerald-600 dark:text-emerald-400':accuracy>=50?'text-amber-600 dark:text-amber-400':'text-rose-600 dark:text-rose-400',
            border:'border-blue-200 dark:border-blue-800/60', large: true },
          { label:'Avg Time',   value: fmtTime(avgMs),  color:'text-slate-600 dark:text-slate-300' },
          { label:'Total Time', value: fmtTime(totalMs),color:'text-slate-600 dark:text-slate-300' },
          { label:'Day Streak', value: streak + (streak===1?' day':' days'), color:'text-amber-600 dark:text-amber-400',
            border:'border-amber-200 dark:border-amber-800/60' },
        ].map(({ label, value, color, border, large }) => (
          <div key={label} className={`rounded-xl border ${border||'border-slate-200 dark:border-slate-800'} bg-white dark:bg-slate-900 p-4 text-center shadow-sm`}>
            <p className={`${large ? 'text-3xl' : 'text-2xl'} font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Insights row ── */}
      {topicsWithData.length > 1 && (() => {
        const INSIGHT_STYLE = {
          'Strongest Topic': { dot:'bg-emerald-500', text:'text-emerald-700 dark:text-emerald-400', border:'border-emerald-200 dark:border-emerald-800/60' },
          'Weakest Topic':      { dot:'bg-rose-500',    text:'text-rose-700 dark:text-rose-400',       border:'border-rose-200 dark:border-rose-800/60' },
          'Fastest Topic':   { dot:'bg-blue-500',    text:'text-blue-700 dark:text-blue-400',       border:'border-blue-200 dark:border-blue-800/60' },
          'Slowest Topic':   { dot:'bg-amber-500',   text:'text-amber-700 dark:text-amber-400',     border:'border-amber-200 dark:border-amber-800/60' },
        };
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { label:'Strongest Topic', value: strongest?.topic, sub: strongest?.accuracy + '% accuracy' },
              { label:'Weakest Topic',      value: weakest?.topic,   sub: weakest?.accuracy + '% accuracy' },
              { label:'Fastest Topic',   value: fastest?.topic,   sub: fmtTime(fastest?.avgMs) + ' avg' },
              { label:'Slowest Topic',   value: slowest?.topic,   sub: fmtTime(slowest?.avgMs) + ' avg' },
            ].map(({ label, value, sub }) => {
              const s = INSIGHT_STYLE[label];
              return (
                <div key={label} className={`rounded-xl border ${s.border} bg-white dark:bg-slate-900 p-4 shadow-sm`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`}></span>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
                  </div>
                  <p className={`text-sm font-bold ${s.text} leading-tight`}>{value || '—'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
                </div>
              );
            })}
          </div>
        );
      })()}

      <WeeklyTrend attempts={data} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── By Topic ── */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-5">Performance by Topic</h2>
          {byTopic.length === 0
            ? <p className="text-slate-400 text-sm">No data yet.</p>
            : <div className="space-y-5">
              {byTopic.map(t => (
                <div key={t.topic}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                      <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[t.topic]||'bg-slate-400'}`}></span>
                      {t.topic}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs tabular-nums">
                      {t.correct}/{t.attempts} · {t.accuracy}% · {fmtTime(t.avgMs)}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${TOPIC_DOT[t.topic]||'bg-slate-400'}`}
                      style={{width:`${t.accuracy}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        {/* ── By Column ── */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Performance by Column</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Column 1 = Algebra 1 & 2 + Geometry · Column 2 = Precalculus · Column 3 = AP Calculus + AP Statistics
          </p>
          <div className="space-y-5">
            {byColumn.map(c => (
              <div key={c.column}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                    <span className={`w-2 h-2 rounded-full ${COLUMN_BAR[c.column]||'bg-slate-400'}`}></span>
                    {c.column}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs tabular-nums">
                    {c.attempts > 0 ? `${c.correct}/${c.attempts} · ${c.accuracy}% · ${fmtTime(c.avgMs)}` : 'No attempts yet'}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${COLUMN_BAR[c.column]||'bg-slate-400'}`}
                    style={{width:`${c.accuracy}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── By Difficulty ── */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-5">Performance by Difficulty</h2>
          <div className="space-y-5">
            {byDiff.map(d => (
              <div key={d.difficulty}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-2">
                    <DiffPill d={d.difficulty} />
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs tabular-nums">
                    {d.attempts > 0 ? `${d.correct}/${d.attempts} · ${d.accuracy}% · ${fmtTime(d.avgMs)}` : 'No attempts yet'}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${DIFF_BAR[d.difficulty]}`}
                    style={{width:`${d.accuracy}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoryPage({ authUser, allQuestions, attempts, attemptsError, onOpenQuestion, navigateTab }) {
  // Shared attempt history owned by App (one fetch per login). null = still loading.
  const rows = attempts || [];
  const loading = authUser && attempts === null;
  const error = attemptsError || null;
  const [selected, setSelected] = useState(null);
  const [historySubTab, setHistorySubTab] = useState('attempts');
  const [mySolutions, setMySolutions] = useState([]);
  const [tooltipMeta, setTooltipMeta] = useState(null);
  const rowRefs = useRef({});

  const getSolutionQuestion = (solution) => allQuestions.find(q => q.id === solution.question_id);

  // filters
  const [filterCorrect, setFilterCorrect] = useState('All');
  const [filterTopic,   setFilterTopic]   = useState('All Topics');
  const [filterDiff,    setFilterDiff]    = useState('All Difficulties');
  const [filterDate,    setFilterDate]    = useState('Most Recent');
  const [filterSource,  setFilterSource]  = useState('All Sources');
  const [filterType,    setFilterType]    = useState('All Types');
  const [search, setSearch]               = useState('');

  const questionSourceMap = useMemo(() => {
    const map = {};
    allQuestions.forEach(q => { map[q.id] = q.source || ''; });
    return map;
  }, [allQuestions]);

  const historyUniqueSources = useMemo(() => {
    const srcs = new Set(
      rows
        .filter(r => filterType === 'All Types' || getSourceType(questionSourceMap[r.question_id] || '') === filterType)
        .map(r => questionSourceMap[r.question_id] || '')
        .filter(Boolean)
    );
    return ['All Sources', ...sortSources([...srcs])];
  }, [rows, questionSourceMap, filterType]);

  // ── filtering & sorting (memoized: re-runs only when data or filters change) ──
  const sorted = useMemo(() => {
    const now = new Date();
    const filtered = rows.filter(r => {
      if (filterCorrect === 'Correct Only'   && !r.is_correct) return false;
      if (filterCorrect === 'Incorrect Only' &&  r.is_correct) return false;
      if (filterTopic !== 'All Topics') {
        const rowColumn = getColumnCategory(r);
        if (['Column 1','Column 2','Column 3'].includes(filterTopic)) {
          if (rowColumn !== filterTopic) return false;
        } else if (r.topic !== filterTopic) return false;
      }
      if (filterDiff  !== 'All Difficulties' && r.difficulty !== filterDiff) return false;
      if (filterType !== 'All Types' && getSourceType(questionSourceMap[r.question_id] || '') !== filterType) return false;
      if (filterSource !== 'All Sources' && (questionSourceMap[r.question_id] || '') !== filterSource) return false;
      if (filterDate === 'Today') {
        if (new Date(r.created_at).toDateString() !== now.toDateString()) return false;
      } else if (filterDate === 'Last 7 Days') {
        const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 7);
        if (new Date(r.created_at) < cutoff) return false;
      } else if (filterDate === 'Last 30 Days') {
        const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 30);
        if (new Date(r.created_at) < cutoff) return false;
      }
      if (search.trim()) {
        const s = search.toLowerCase();
        return (
          (r.question_title || '').toLowerCase().includes(s) ||
          (r.question_text  || '').toLowerCase().includes(s) ||
          (r.topic          || '').toLowerCase().includes(s) ||
          (r.tags           || []).some(t => t.toLowerCase().includes(s)) ||
          (questionSourceMap[r.question_id] || '').toLowerCase().includes(s)
        );
      }
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (filterDate === 'Oldest First')
        return new Date(a.created_at) - new Date(b.created_at);
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [rows, filterCorrect, filterTopic, filterDiff, filterType, filterSource, filterDate, search, questionSourceMap]);

  useEffect(() => {
    if (!authUser) return;
    _supabase
      .from('community_solutions')
      .select('id,user_id,question_id,solution_text,created_at,updated_at,hidden')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: false })
      .then(async ({ data, error }) => {
        if (error) {
          console.warn('Error loading community solutions:', error.message);
          setMySolutions([]);
          return;
        }
        const solutionRows = data || [];
        if (!solutionRows.length) { setMySolutions([]); return; }
        const ids = solutionRows.map(s => s.id);
        const { data: voteRows } = await _supabase
          .from('community_solution_votes')
          .select('solution_id')
          .in('solution_id', ids);
        const counts = {};
        (voteRows || []).forEach(v => { counts[v.solution_id] = (counts[v.solution_id] || 0) + 1; });
        setMySolutions(solutionRows.map(s => ({ ...s, upvotes: counts[s.id] || 0 })));
      });
  }, [authUser?.id]);


  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <p className="text-rose-500 font-semibold">Error loading history: {error}</p>
      <p className="text-slate-400 text-sm mt-1">Make sure the attempts table exists in Supabase.</p>
    </div>
  );

  const findQ = (row) => {
    const q = allQuestions.find(x => x.id === row.question_id);
    if (q) return q;
    return {
      id: row.question_id,
      title: row.question_title,
      question: row.question_text,
      topic: row.topic,
      difficulty: row.difficulty,
      answer: row.correct_answer,
      explanation: row.explanation,
      tags: row.tags || [],
      choices: [],
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {!authUser && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl text-sm">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span className="text-blue-800 dark:text-blue-200">Showing this session only. <a href="./index.html" className="font-semibold underline">Sign in</a> to save your history.</span>
        </div>
      )}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">History</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{historySubTab === 'attempts' ? `${rows.length} total attempt${rows.length !== 1 ? 's' : ''} · showing ${sorted.length}` : `${mySolutions.length} community solution${mySolutions.length !== 1 ? 's' : ''}`}</p>
        <div className="mt-4 flex gap-0 border-b border-slate-200 dark:border-slate-800">
          <button onClick={()=>setHistorySubTab('attempts')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${historySubTab==='attempts' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
            Attempts
          </button>
          {authUser && (
          <button onClick={()=>setHistorySubTab('solutions')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${historySubTab==='solutions' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
            My Community Solutions
          </button>
          )}
        </div>
      </div>

      {historySubTab === 'solutions' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {mySolutions.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No community solutions yet</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">Solutions you post under questions will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {mySolutions.map(s => {
                const q = getSolutionQuestion(s);
                const preview = q?.question || '';
                return (
                  <div key={s.id}
                    className="relative px-4 py-4"
                    ref={el => { if (el) rowRefs.current[s.id] = el; }}
                    onMouseEnter={() => {
                      const el = rowRefs.current[s.id];
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - rect.bottom;
                        setTooltipMeta({ id: s.id, rect, showAbove: spaceBelow < 220 });
                      } else {
                        setTooltipMeta({ id: s.id, rect: null, showAbove: false });
                      }
                    }}
                    onMouseLeave={() => setTooltipMeta(null)}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <button
                          onClick={() => { if (q && onOpenQuestion) onOpenQuestion(q.id); }}
                          className="text-left text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          {q?.title || `Question #${s.question_id}`}
                        </button>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {new Date(s.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} · {s.upvotes || 0} upvote{(s.upvotes || 0) !== 1 ? 's' : ''}
                        </p>
                      </div>
                      {q && (
                        <button
                          onClick={() => { if (onOpenQuestion) onOpenQuestion(q.id); }}
                          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                          Open Question
                        </button>
                      )}
                    </div>

                    {tooltipMeta?.id === s.id && q && tooltipMeta.rect && (
                      <div
                        className="fixed z-[999] w-[min(32rem,calc(100vw-4rem))] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-2xl p-4 pointer-events-none"
                        style={tooltipMeta.showAbove
                          ? { left: tooltipMeta.rect.left + 16, bottom: window.innerHeight - tooltipMeta.rect.top + 8 }
                          : { left: tooltipMeta.rect.left + 16, top: tooltipMeta.rect.bottom + 8 }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[q.topic] || 'bg-slate-400'}`}></span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{q.topic}</span>
                          <DiffPill d={q.difficulty} />
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{q.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          <MathText text={preview.slice(0, 260) + (preview.length > 260 ? '...' : '')} />
                        </p>
                      </div>
                    )}

                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      <MathText text={s.solution_text} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
      <>
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <input type="text" placeholder="Search title, text, topic, tags…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <Dropdown label="Result" value={filterCorrect} onChange={setFilterCorrect}
          options={['All','Correct Only','Incorrect Only']} />
        <Dropdown label="Topic" value={filterTopic} onChange={setFilterTopic}
          options={['All Topics','Column 1','Column 2','Column 3','Algebra 1 & 2','Geometry','Precalculus','AP Calculus','AP Statistics']} />
        <Dropdown label="Difficulty" value={filterDiff} onChange={setFilterDiff}
          options={['All Difficulties','Easy','Medium','Hard']} />
        <Dropdown label="Type" value={filterType} onChange={v=>{setFilterType(v); setFilterSource('All Sources');}}
          options={SOURCE_TYPES} />
        <Dropdown label="Source" value={filterSource} onChange={setFilterSource}
          options={historyUniqueSources} />
        <Dropdown label="Date" value={filterDate} onChange={setFilterDate}
          options={['Most Recent','Oldest First','Today','Last 7 Days','Last 30 Days']} />
      </div>

      {/* ── Table ── */}
      {sorted.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${rows.length === 0 ? 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-500 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {rows.length === 0 ? 'No attempts yet' : 'No results match your filters'}
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto mb-5">
            {rows.length === 0 ? 'Answer some problems and your history will appear here.' : 'Try adjusting your filters or search.'}
          </p>
          {rows.length === 0 && navigateTab && (
            <button onClick={() => navigateTab('problems')}
              className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
              Start Practicing
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-[1fr_8rem_6rem_6rem_6rem_6rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>Problem</span><span>Topic</span><span>Difficulty</span><span>Result</span><span>Time</span><span>Date</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map(row => (
              <button key={row.id} onClick={() => setSelected(row)}
                className="group w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1fr_8rem_6rem_6rem_6rem_6rem] gap-3 items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {row.question_title || plainText(row.question_text) || 'Question #' + row.question_id}
                  </p>
                  {questionSourceMap[row.question_id] && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{questionSourceMap[row.question_id]}</p>
                  )}
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 md:hidden">
                    {row.topic} · {row.difficulty} · {new Date(row.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${TOPIC_DOT[row.topic]||'bg-slate-400'}`}></span>
                  <span className="truncate">{row.topic}</span>
                </div>
                <div className="hidden md:block"><DiffPill d={row.difficulty} /></div>
                <div className="hidden md:block">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                    ${row.is_correct
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400'}`}>
                    {row.is_correct ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>
                <div className="hidden md:block text-xs text-slate-500 dark:text-slate-400 tabular-nums">{fmtTime(row.time_taken_ms)}</div>
                <div className="hidden md:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {new Date(row.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                </div>
                <div className="md:hidden flex flex-col items-end gap-1">
                  <span className={`text-xs font-bold ${row.is_correct ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {row.is_correct ? '✓' : '✗'}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums">{fmtTime(row.time_taken_ms)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      </>
      )}

      {/* ── Detail Modal ── */}
      {selected && (
        <HistoryDetailModal row={selected} q={findQ(selected)} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function HistoryDetailModal({ row, q, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300`}>
                <span className={`w-1.5 h-1.5 rounded-full ${TOPIC_DOT[row.topic]||'bg-slate-400'}`}></span>
                {row.topic}
              </span>
              <DiffPill d={row.difficulty} />
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(row.created_at).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})}
              </span>
            </div>
            <h2 className="font-display text-lg font-black text-slate-900 dark:text-white leading-tight">
              {q.title || plainText(q.question)}
            </h2>
          </div>
          <button onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-4">
          {/* question text */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              <MathText text={q.question || row.question_text || ''} />
            </p>
          </div>

          {/* choices */}
          {q.choices && q.choices.length > 0 && (
            <div className="space-y-2">
              {q.choices.map((choice, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect  = choice === row.correct_answer || letter === row.correct_answer;
                const isSelected = choice === row.selected_answer || letter === row.selected_answer;
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-sm font-medium
                    ${isCorrect  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300'
                    : isSelected ? 'border-rose-400 bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/50 text-rose-800 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}>
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">{letter}</span>
                    <span className="flex-1"><MathText text={choice} /></span>
                    {isCorrect  && <span className="ml-auto font-bold text-base">✓</span>}
                    {isSelected && !isCorrect && <span className="ml-auto font-bold text-base">✗</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* no choices stored — show selected vs correct */}
          {(!q.choices || q.choices.length === 0) && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Your Answer</p>
                <p className={`font-bold text-lg ${row.is_correct ? 'text-emerald-500' : 'text-rose-500'}`}>{row.selected_answer || '—'}</p>
              </div>
              <div className="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 p-3 text-center">
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Correct Answer</p>
                <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{row.correct_answer || '—'}</p>
              </div>
            </div>
          )}

          {/* explanation */}
          {(q.explanation || row.explanation) && (
            <div className={`rounded-xl p-4 border text-sm overflow-x-auto
              ${row.is_correct
                ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30'
                : 'bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30'}`}>
              <p className={`font-semibold mb-1.5 ${row.is_correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                {row.is_correct ? '✓ Correct' : '✗ Incorrect'} · Time: {fmtTime(row.time_taken_ms)}
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                <MathText text={q.explanation || row.explanation} />
              </p>
            </div>
          )}

          {/* tags */}
          {(row.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {row.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">#{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
