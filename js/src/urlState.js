// URL as the source of truth for what the app is showing.
//
// Before this, every destination was stored in localStorage and the address bar
// never changed, so nothing in the app could be linked to, bookmarked, or
// reached with the back button. Each visible piece of state now maps to a query
// param, which is what makes a shared problem link possible at all.
//
// Defaults are omitted so URLs stay short and readable:
//   app.html?id=482
//   app.html?tab=problems&topic=Geometry&diff=Hard
//   app.html?tab=analytics
// rather than a wall of "All Topics&All Difficulties&All Sources".

export const URL_DEFAULTS = {
  tab: 'problems',
  view: 'list',
  topic: 'All Topics',
  diff: 'All Difficulties',
  type: 'All Types',
  source: 'All Sources',
  status: 'All Status',
  q: '',
  page: '1',
};

const VALID_TABS = ['problems','analytics','history','mastery','leaderboard','admin','settings','reportBug'];
const VALID_VIEWS = ['list','recommended','misses','review'];

// Anything typed into the address bar reaches this, so unknown values fall back
// to the default rather than putting the app into a state it cannot render.
const oneOf = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

export function readAppUrl(searchString = window.location.search) {
  const p = new URLSearchParams(searchString);
  const raw = (k) => p.get(k);
  const val = (k) => p.get(k) ?? URL_DEFAULTS[k];
  const idRaw = raw('id');
  const id = idRaw != null && /^\d+$/.test(idRaw) ? Number(idRaw) : null;
  const pageNum = parseInt(val('page'), 10);
  return {
    tab: oneOf(val('tab'), VALID_TABS, URL_DEFAULTS.tab),
    view: oneOf(val('view'), VALID_VIEWS, URL_DEFAULTS.view),
    topic: val('topic'),
    diff: val('diff'),
    type: val('type'),
    source: val('source'),
    status: val('status'),
    q: val('q'),
    page: Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1,
    id,
    // Whether the caller explicitly asked for a tab, so a link can override the
    // tab remembered in localStorage without a bare app.html resetting it.
    hasTab: raw('tab') != null,
  };
}

export function buildAppQuery(state) {
  const p = new URLSearchParams();
  Object.entries(state).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    const s = String(v);
    if (s === '' || s === URL_DEFAULTS[k]) return;
    p.set(k, s);
  });
  const qs = p.toString();
  return qs ? `?${qs}` : window.location.pathname;
}

// Absolute link to a single problem, for the Share button. Built from the
// current origin and path so it is correct on GitHub Pages, on a custom domain,
// and on localhost during development.
export function problemShareUrl(id) {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}?id=${id}`;
}
