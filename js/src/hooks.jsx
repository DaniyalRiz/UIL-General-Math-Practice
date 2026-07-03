const { useState, useEffect, useRef, useMemo } = React;

// ── Math rendering ────────────────────────────────────────────────────────────
// Renders text containing LaTeX. Falls back to plain text if KaTeX hasn't loaded.
function MathText({ text, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.katex) { el.textContent = text; return; }
    // Split on \[...\] (display) and \(...\) (inline). Money uses a plain $, which
    // we leave untouched so it never collides with math.
    const parts = String(text).split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
    el.innerHTML = "";
    parts.forEach(part => {
      if (!part) return;
      const display = part.startsWith("\\[") && part.endsWith("\\]");
      const inline = part.startsWith("\\(") && part.endsWith("\\)");
      if (display || inline) {
        const tex = part.slice(2, part.length - 2);
        const span = document.createElement("span");
        try {
          window.katex.render(tex, span, { displayMode: display, throwOnError: false });
        } catch(e) { span.textContent = tex; }
        el.appendChild(span);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }, [text]);
  return <span ref={ref} className={className}>{text}</span>;
}

// ── localStorage hook (JSON-backed, survives refresh on this device) ──────────
function useLocalStorage(key, initial) {
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
function useTheme() {
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

function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);
  const start = () => { if (!ref.current) ref.current = setInterval(() => setElapsed(e => e + 1), 1000); };
  const stop  = () => { clearInterval(ref.current); ref.current = null; };
  const reset = () => { stop(); setElapsed(0); };
  useEffect(() => () => clearInterval(ref.current), []);
  return { elapsed, fmt: `${String(Math.floor(elapsed/60)).padStart(2,"0")}:${String(elapsed%60).padStart(2,"0")}`, start, stop, reset };
}

// ── Small UI components ───────────────────────────────────────────────────────
function DiffPill({ d }) {
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${DIFF_PILL[d]||""}`}>{d}</span>;
}

const SunIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>);
const MoonIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>);

function Dropdown({ label, value, options, onChange }) {
  return (
    <div className="relative">
      <select value={value} onChange={e=>onChange(e.target.value)}
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
