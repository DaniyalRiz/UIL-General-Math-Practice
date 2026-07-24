import { useState, useEffect, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { DIFF_PILL } from '../constants.js';

// Runs a single Supabase query and tracks { data, loading, error }, guarding
// against a stale response when deps change or the component unmounts. For
// simple single-query loads only -- effects that fan out to several queries or
// set multiple pieces of state stay hand-written.
export function useSupabaseQuery(queryFn, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    setState(s => (s.loading ? s : { ...s, loading: true }));
    Promise.resolve(queryFn()).then(({ data, error }) => {
      if (cancelled) return;
      setState({ data: data ?? null, loading: false, error: error ? (error.message || String(error)) : null });
    });
    return () => { cancelled = true; };
    // deps is the caller-supplied dependency array for the query.
  }, deps);
  return state;
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Math rendering ────────────────────────────────────────────────────────────
// Renders text containing LaTeX as an HTML string in one pass: no flash of raw
// LaTeX on first paint, and React's virtual DOM stays in agreement with the
// real DOM. Plain segments are escaped; KaTeX output is safe by construction.
export function MathText({ text, className }) {
  const html = useMemo(() => {
    // Split on \[...\] (display) and \(...\) (inline). Money uses a plain $, which
    // we leave untouched so it never collides with math.
    const parts = String(text ?? "").split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
    return parts.map(part => {
      if (!part) return "";
      const display = part.startsWith("\\[") && part.endsWith("\\]");
      const inline = part.startsWith("\\(") && part.endsWith("\\)");
      if (display || inline) {
        const tex = part.slice(2, part.length - 2);
        try {
          return katex.renderToString(tex, { displayMode: display, throwOnError: false });
        } catch(e) { return escapeHtml(tex); }
      }
      return escapeHtml(part);
    }).join("");
  }, [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── localStorage hook (JSON-backed, survives refresh on this device) ──────────
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch(e) { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){}
  }, [key, value]);
  return [value, setValue];
}

// ── Theme hook (persists to localStorage) ────────────────────────────────────
export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("uilmath-theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch(e) { return false; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("uilmath-theme", dark ? "dark" : "light"); } catch(e){}
  }, [dark]);
  return [dark, () => setDark(d => !d)];
}

// Holds only start/stop timestamps, so the host component re-renders on
// start/stop/reset -- not once per second. The tick lives in TimerDisplay,
// which re-renders alone.
export function useTimer() {
  const [span, setSpan] = useState({ startedAt: null, stoppedAt: null });
  const start = () => setSpan(s => {
    if (s.startedAt !== null && s.stoppedAt === null) return s;
    if (s.startedAt !== null) return { startedAt: Date.now() - (s.stoppedAt - s.startedAt), stoppedAt: null };
    return { startedAt: Date.now(), stoppedAt: null };
  });
  const stop  = () => setSpan(s => (s.startedAt === null || s.stoppedAt !== null) ? s : { ...s, stoppedAt: Date.now() });
  const reset = () => setSpan({ startedAt: null, stoppedAt: null });
  return { startedAt: span.startedAt, stoppedAt: span.stoppedAt, start, stop, reset };
}

export function TimerDisplay({ startedAt, stoppedAt }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (startedAt === null || stoppedAt !== null) return;
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [startedAt, stoppedAt]);
  const secs = startedAt === null ? 0 : Math.max(0, Math.floor(((stoppedAt ?? Date.now()) - startedAt) / 1000));
  return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
}

// ── Small UI components ───────────────────────────────────────────────────────
export function DiffPill({ d }) {
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${DIFF_PILL[d]||""}`}>{d}</span>;
}

export const SunIcon = () => (<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>);
export const MoonIcon = () => (<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>);

export function Dropdown({ label, value, options, onChange }) {
  return (
    <div className="relative">
      <select value={value} onChange={e=>onChange(e.target.value)} aria-label={label}
        className="appearance-none pl-3 pr-9 py-2 rounded-lg text-sm font-medium border
                   bg-white border-slate-200 text-slate-700
                   dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
    </div>
  );
}
