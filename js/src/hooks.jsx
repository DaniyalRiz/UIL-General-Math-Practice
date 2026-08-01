import { useState, useEffect, useMemo, useRef } from 'react';
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

// Saved filter/sort selections. Stored as one object per list rather than a key
// per control, so a partially-written set can never leave a list half-filtered.
export function readSavedFilters(key) {
  try {
    const o = JSON.parse(localStorage.getItem(key));
    return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
  } catch (e) { return {}; }
}

export function saveFilters(key, values) {
  try { localStorage.setItem(key, JSON.stringify(values)); } catch (e) {}
}

// ── Recent searches ─────────────────────────────────────────────────────────
// One shared list across every search box. Problems, Recommended Practice and
// Redo Misses already share a single search state, so separate lists would be a
// fiction there; History gets the same list so a term searched once is offered
// everywhere.
const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 8;
const MIN_RECORDED_LENGTH = 2; // single characters are never a search worth keeping

function readRecentSearches() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY));
    return Array.isArray(raw) ? raw.filter(s => typeof s === 'string') : [];
  } catch (e) { return []; }
}

export function useRecentSearches() {
  const [recents, setRecents] = useState(readRecentSearches);

  // Re-read rather than trusting local state: another search box on another tab
  // may have written since this one mounted.
  const refresh = () => setRecents(readRecentSearches());

  const record = (raw) => {
    const term = String(raw || '').trim();
    if (term.length < MIN_RECORDED_LENGTH) return;
    const next = [term, ...readRecentSearches().filter(s => s.toLowerCase() !== term.toLowerCase())]
      .slice(0, MAX_RECENT_SEARCHES);
    setRecents(next);
    try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next)); } catch (e) {}
  };

  const remove = (term) => {
    const next = readRecentSearches().filter(s => s !== term);
    setRecents(next);
    try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next)); } catch (e) {}
  };

  const clear = () => {
    setRecents([]);
    try { localStorage.removeItem(RECENT_SEARCHES_KEY); } catch (e) {}
  };

  return { recents, record, remove, clear, refresh };
}

// ── Past sorts ──────────────────────────────────────────────────────────────
// Remembers filter/sort combinations the user settled on, so a view they built
// once can be reapplied in a click.
//
// One list per set of dropdowns, not per screen: Problems, Recommended Practice,
// Redo Misses and Review Later share a single filter state, so they physically
// cannot hold different values at the same time and separate lists would show
// identical entries. History and Leaderboard own their dropdowns, so they get
// their own lists.
const MAX_PAST_SORTS = 8;
const SORT_SETTLE_MS = 1000;

// A combination is stored as { values, label }. `values` is what gets reapplied;
// `label` is precomputed so a stored entry still reads correctly if the option
// lists change later.
function readPastSorts(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key));
    return Array.isArray(raw) ? raw.filter(e => e && e.values && e.label) : [];
  } catch (e) { return []; }
}

// Only the parts the user actually changed, so entries read "Geometry · Easy"
// rather than repeating every default back at them.
export function describeSort(values, defaults) {
  const parts = Object.entries(values)
    .filter(([k, v]) => v != null && v !== '' && v !== defaults[k])
    .map(([, v]) => String(v));
  return parts.join(' · ');
}

export function usePastSorts(key, values, defaults) {
  const [entries, setEntries] = useState(() => readPastSorts(key));
  const label = describeSort(values, defaults);

  // Auto-record the settled combination. The delay is what turns "changed three
  // dropdowns" into one entry instead of three partial ones; an all-default
  // combination is not a view worth remembering.
  useEffect(() => {
    if (!label) return;
    const t = setTimeout(() => {
      const next = [{ values, label }, ...readPastSorts(key).filter(e => e.label !== label)]
        .slice(0, MAX_PAST_SORTS);
      setEntries(next);
      try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) {}
    }, SORT_SETTLE_MS);
    return () => clearTimeout(t);
  }, [key, label]);

  const refresh = () => setEntries(readPastSorts(key));
  const remove = (l) => {
    const next = readPastSorts(key).filter(e => e.label !== l);
    setEntries(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) {}
  };
  const clear = () => {
    setEntries([]);
    try { localStorage.removeItem(key); } catch (e) {}
  };

  return { entries, remove, clear, refresh, currentLabel: label };
}

// Button plus panel, mirroring SearchWithHistory so the two read as one feature.
export function PastSortsButton({ entries, onApply, onRemove, onClear, onOpen, currentLabel }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button type="button" onClick={() => { onOpen?.(); setOpen(o => !o); }}
        title="Past sorts" aria-label="Past sorts" aria-haspopup="menu" aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap
          ${open ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-500/15 dark:border-blue-500/40 dark:text-blue-300'
                 : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3v5h5"/>
          <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
          <path d="M12 7v5l3 2"/>
        </svg>
        Past sorts
      </button>

      {open && (
        /* Left-anchored on narrow screens, where the wrapping filter bar puts
           this button at the start of its row and a right-anchored panel would
           run off the left edge. Right-anchored from sm up, where it is normally
           the last control in a wide row. */
        <div role="menu"
          className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1 z-40 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Past sorts</span>
            {entries.length > 0 && (
              <button type="button" onClick={onClear}
                className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 dark:text-slate-400">
                Clear all
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <p className="px-3 py-3 text-[15px] text-slate-500 dark:text-slate-400">
              No past sorts yet. Change any filter above and the combination is saved here.
            </p>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              {entries.map(e => (
                <div key={e.label} className="flex items-center">
                  <button type="button" role="menuitem"
                    onClick={() => { onApply(e.values); setOpen(false); }}
                    className={`flex-1 text-left px-3 py-2 text-sm truncate hover:bg-slate-100 dark:hover:bg-slate-800
                      ${e.label === currentLabel
                        ? 'text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-200'}`}>
                    {e.label}
                  </button>
                  <button type="button" aria-label={`Remove ${e.label} from past sorts`}
                    onClick={() => onRemove(e.label)}
                    className="px-2.5 py-2 text-slate-300 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Every search box in the app uses this styling; keeping it here stops the five
// call sites drifting apart. pr-10 leaves room for the history button.
const SEARCH_INPUT_CLS = "w-full pl-3 pr-10 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

// Search input with a past-searches button. Terms are recorded on Enter or on
// leaving the field, never per keystroke, so typing "geometry" stores one entry
// rather than eight prefixes of it.
//
// The list is behind an explicit, always-visible button. An earlier version only
// revealed it on focus and only once entries existed, which meant there was
// nothing to discover and the feature may as well not have been there.
export function SearchWithHistory({ value, onChange, placeholder, wrapperClassName = '' }) {
  const { recents, record, remove, clear, refresh } = useRecentSearches();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (term) => { onChange(term); record(term); setOpen(false); };

  return (
    <div className={`relative ${wrapperClassName}`} ref={wrapRef}>
      <input type="text" placeholder={placeholder} value={value} className={SEARCH_INPUT_CLS}
        onChange={e => onChange(e.target.value)}
        onBlur={() => record(value)}
        onKeyDown={e => { if (e.key === 'Enter') { record(value); setOpen(false); } }} />

      {/* Past searches */}
      <button type="button" onClick={() => { refresh(); setOpen(o => !o); }}
        title="Past searches" aria-label="Past searches"
        aria-haspopup="menu" aria-expanded={open}
        className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md transition-colors
          ${open ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/15'
                 : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3v5h5"/>
          <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
          <path d="M12 7v5l3 2"/>
        </svg>
      </button>

      {open && (
        <div role="menu"
          className="absolute left-0 right-0 top-full mt-1 z-40 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Past searches</span>
            {recents.length > 0 && (
              <button type="button" onClick={clear}
                className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 dark:text-slate-400">
                Clear all
              </button>
            )}
          </div>

          {recents.length === 0 ? (
            // Never show an empty popup: the button is always visible, so it has
            // to explain itself before anything has been searched.
            <p className="px-3 py-3 text-[15px] text-slate-500 dark:text-slate-400">
              No past searches yet. Search for something and press Enter to save it here.
            </p>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              {recents.map(term => (
                <div key={term} className="flex items-center">
                  <button type="button" role="menuitem" onClick={() => pick(term)}
                    className="flex-1 text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 truncate">
                    {term}
                  </button>
                  <button type="button" aria-label={`Remove ${term} from past searches`}
                    onClick={() => remove(term)}
                    className="px-2.5 py-2 text-slate-300 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">▾</span>
    </div>
  );
}
