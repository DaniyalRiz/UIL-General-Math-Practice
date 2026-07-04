// ─── TOPICS / FILTERS ────────────────────────────────────────────────────────
const TOPICS = ["All Topics","Column 1","Column 2","Column 3","Algebra 1 & 2","Geometry","Precalculus","AP Calculus","AP Statistics"];

const getColumnCategory = (q) => {
  const topic = typeof q === 'string' ? q : q.topic;
  if (topic === "Algebra 1 & 2" || topic === "Geometry") return "Column 1";
  if (topic === "Precalculus") return "Column 2";
  if (topic === "AP Calculus" || topic === "AP Statistics") return "Column 3";
  return null;
};

const DIFFICULTIES = ["All Difficulties","Easy","Medium","Hard"];
const PAGE_SIZE = 15;

// difficulty pill colors (light + dark)
const DIFF_PILL = {
  Easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Hard:   "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
};
const TOPIC_DOT = {
  "Algebra 1 & 2":"bg-violet-500","Geometry":"bg-sky-500","Precalculus":"bg-emerald-500",
  "AP Calculus":"bg-amber-500","AP Statistics":"bg-rose-500",
};
const TOPIC_BAR = TOPIC_DOT;

const fmtTime = ms => {
  const s = Math.round(ms/1000);
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
};

const SOURCE_TYPES = ['All Types', 'TMSCA', 'Invitationals', 'District', 'Region', 'State'];

const getSourceType = (source) => {
  if (!source) return '';
  const s = source.toLowerCase();
  if (s.includes('tmsca') || s.includes('hsma')) return 'TMSCA';
  if (s.includes('invitational')) return 'Invitationals';
  if (s.includes('district')) return 'District';
  if (s.includes('region')) return 'Region';
  if (s.includes('state')) return 'State';
  return '';
};

const sourceDisplay = (q) => {
  if (!q) return "";
  const source = q.source || q.original_test || "";
  const problemNumber =
    q.original_question_number ||
    q.answer_key_source?.problem_number ||
    q.problem_number ||
    null;
  return source && problemNumber ? `${source} • Problem ${problemNumber}` : source;
};

// Strip \(...\) and \[...\] delimiters for plain-text row previews
const plainText = (s) => String(s||"")
  .replace(/\\\[([\s\S]*?)\\\]/g, (_,m)=>m.trim())
  .replace(/\\\(([\s\S]*?)\\\)/g, (_,m)=>m.trim())
  .replace(/\s+/g," ").trim();

// Single-letter avatar fallback when no profile picture is set
const initialsFor = (user) => {
  const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'U';
  return name.trim().charAt(0).toUpperCase();
};

// Deterministic background color for the initials fallback -- same user always gets the
// same color, picked from the existing topic/difficulty accent palette (no new hues).
const AVATAR_COLORS = [
  { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400' },
  { bg: 'bg-violet-100 dark:bg-violet-500/20', text: 'text-violet-700 dark:text-violet-400' },
  { bg: 'bg-sky-100 dark:bg-sky-500/20', text: 'text-sky-700 dark:text-sky-400' },
  { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400' },
  { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400' },
  { bg: 'bg-rose-100 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400' },
];
const avatarColorFor = (user) => {
  const key = String(user?.id || user?.email || 'u');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

// ─── MASTERY ──────────────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 400;

const TOPIC_TOTALS = {
  'Algebra 1 & 2': 85,
  'AP Calculus':   89,
  'AP Statistics': 57,
  'Geometry':      102,
  'Precalculus':   67,
};

const MASTERY_LEVELS = [
  { min: 100, name: 'Full Mastery',      color: 'text-yellow-500' },
  { min: 75,  name: 'State Medalist',    color: 'text-violet-500' },
  { min: 50,  name: 'State Qualifier',   color: 'text-blue-500'   },
  { min: 25,  name: 'Region Qualifier',  color: 'text-emerald-500'},
  { min: 10,  name: 'Competitor',        color: 'text-amber-500'  },
  { min: 0,   name: 'Beginner',          color: 'text-slate-400'  },
];

const getMasteryLevel = (pct) =>
  MASTERY_LEVELS.find(l => pct >= l.min) || MASTERY_LEVELS[MASTERY_LEVELS.length - 1];

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ['daniyalrizvi10@gmail.com'];

// ─── IMAGE / AVATAR UPLOAD LIMITS ────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGE_DIMENSION = 1280; // longest side, in px, after resize

const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_AVATAR_DIMENSION = 320; // avatars only ever render small
