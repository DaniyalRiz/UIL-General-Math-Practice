// ─── TOPICS / FILTERS ────────────────────────────────────────────────────────
export const TOPICS = ["All Topics","Column 1","Column 2","Column 3","Algebra 1 & 2","Geometry","Precalculus","AP Calculus","AP Statistics"];

export const getColumnCategory = (q) => {
  const topic = typeof q === 'string' ? q : q.topic;
  if (topic === "Algebra 1 & 2" || topic === "Geometry") return "Column 1";
  if (topic === "Precalculus") return "Column 2";
  if (topic === "AP Calculus" || topic === "AP Statistics") return "Column 3";
  return null;
};

export const DIFFICULTIES = ["All Difficulties","Easy","Medium","Hard"];
export const PAGE_SIZE = 15;

// difficulty pill colors (light + dark)
export const DIFF_PILL = {
  Easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Hard:   "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
};
export const TOPIC_DOT = {
  "Algebra 1 & 2":"bg-violet-500","Geometry":"bg-sky-500","Precalculus":"bg-emerald-500",
  "AP Calculus":"bg-amber-500","AP Statistics":"bg-rose-500",
};
export const TOPIC_BAR = TOPIC_DOT;

export const fmtTime = ms => {
  const s = Math.round(ms/1000);
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
};

export const SOURCE_TYPES = ['All Types', 'TMSCA', 'Invitationals', 'District', 'Region', 'State'];

export const getSourceType = (source) => {
  if (!source) return '';
  const s = source.toLowerCase();
  if (s.includes('tmsca') || s.includes('hsma')) return 'TMSCA';
  if (s.includes('invitational')) return 'Invitationals';
  if (s.includes('district')) return 'District';
  if (s.includes('region')) return 'Region';
  if (s.includes('state')) return 'State';
  return '';
};

// Orders source names the way tests are actually organized: TMSCA, then
// Invitationals, District, Region, State (matching SOURCE_TYPES), and
// numeric-aware alphabetically within each group (so "TMSCA 2" sorts before
// "TMSCA 10").
export const SOURCE_CATEGORY_ORDER = ['TMSCA', 'Invitationals', 'District', 'Region', 'State'];
export const sortSources = (sources) => {
  return [...sources].sort((a, b) => {
    const rankA = SOURCE_CATEGORY_ORDER.indexOf(getSourceType(a));
    const rankB = SOURCE_CATEGORY_ORDER.indexOf(getSourceType(b));
    const orderA = rankA === -1 ? SOURCE_CATEGORY_ORDER.length : rankA;
    const orderB = rankB === -1 ? SOURCE_CATEGORY_ORDER.length : rankB;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
};

export const sourceDisplay = (q) => {
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
export const plainText = (s) => String(s||"")
  .replace(/\\\[([\s\S]*?)\\\]/g, (_,m)=>m.trim())
  .replace(/\\\(([\s\S]*?)\\\)/g, (_,m)=>m.trim())
  .replace(/\s+/g," ").trim();

// Single-letter avatar fallback when no profile picture is set
export const initialsFor = (user) => {
  const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'U';
  return name.trim().charAt(0).toUpperCase();
};

// Deterministic background color for the initials fallback -- same user always gets the
// same color, picked from the existing topic/difficulty accent palette (no new hues).
export const AVATAR_COLORS = [
  { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400' },
  { bg: 'bg-violet-100 dark:bg-violet-500/20', text: 'text-violet-700 dark:text-violet-400' },
  { bg: 'bg-sky-100 dark:bg-sky-500/20', text: 'text-sky-700 dark:text-sky-400' },
  { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400' },
  { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400' },
  { bg: 'bg-rose-100 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400' },
];
export const avatarColorFor = (user) => {
  const key = String(user?.id || user?.email || 'u');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

// ─── MASTERY ──────────────────────────────────────────────────────────────────
// Total question count and per-topic totals are computed live from the loaded
// questions list (see app.jsx) instead of being hardcoded here, so they can't
// drift out of sync with what's actually in the Problems section.

// Ladder is keyed off mastered-question COUNT (minQuestions), not percentage --
// the platform has a fixed catalog of thresholds (1,000 questions today) that
// shouldn't shift if the question bank grows. `percentage` is the reference
// figure at the current 1,000-question bank size; anywhere it's displayed in
// the UI it's recomputed live as minQuestions / totalQuestions so it stays
// accurate if the bank size changes.
export const MASTERY_LEVELS = [
  { name: 'Beginner',       minQuestions: 0,    percentage: 0,   color: 'text-teal-500 dark:text-teal-400',     bar: 'bg-teal-500',   description: 'Just getting started on your mastery journey.' },
  { name: 'Learner',        minQuestions: 20,   percentage: 2,   color: 'text-cyan-500 dark:text-cyan-400',     bar: 'bg-cyan-500',   description: 'Building foundational skills across topics.' },
  { name: 'Competitor',     minQuestions: 50,   percentage: 5,   color: 'text-orange-500 dark:text-orange-400', bar: 'bg-orange-500', description: 'Sharpening skills for competition-level problems.' },
  { name: 'District Ready', minQuestions: 150,  percentage: 15,  color: 'text-sky-500 dark:text-sky-400',       bar: 'bg-sky-500',    description: 'Prepared to compete at the district level.' },
  { name: 'Region Ready',   minQuestions: 250,  percentage: 25,  color: 'text-green-500 dark:text-green-400',   bar: 'bg-green-500',  description: 'Prepared to compete at the region level.' },
  { name: 'State Ready',    minQuestions: 500,  percentage: 50,  color: 'text-blue-500 dark:text-blue-400',     bar: 'bg-blue-500',   description: 'Prepared to compete at the state level.' },
  { name: 'Medalist',       minQuestions: 750,  percentage: 75,  color: 'text-indigo-500 dark:text-indigo-400', bar: 'bg-indigo-500', description: 'Performing at a medal-worthy level.' },
  { name: 'State Champion', minQuestions: 900,  percentage: 90,  color: 'text-violet-500 dark:text-violet-400', bar: 'bg-violet-500', description: 'Elite mastery — championship-caliber performance.' },
  { name: 'Full Mastery',   minQuestions: 1000, percentage: 100, color: 'text-amber-500 dark:text-amber-400',   bar: 'bg-amber-400',  description: 'Complete mastery of the entire question bank.' },
];

// Resolves the level for a mastered-question count. Levels are ordered
// ascending, so we walk from the top down and return the first threshold met.
export const getMasteryLevel = (masteredCount) => {
  for (let i = MASTERY_LEVELS.length - 1; i >= 0; i--) {
    if (masteredCount >= MASTERY_LEVELS[i].minQuestions) return MASTERY_LEVELS[i];
  }
  return MASTERY_LEVELS[0];
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
export const ADMIN_EMAILS = ['daniyalrizvi10@gmail.com'];

// ─── IMAGE / AVATAR UPLOAD LIMITS ────────────────────────────────────────────
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGE_DIMENSION = 1280; // longest side, in px, after resize

export const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_AVATAR_DIMENSION = 320; // avatars only ever render small
