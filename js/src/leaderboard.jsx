// ── Leaderboard ───────────────────────────────────────────────────────────────

const LB_DAY_OPTIONS   = ['All Time', 'Last 30 Days', 'Last 7 Days'];
const LB_TOPIC_OPTIONS = ['All Topics', 'Column 1', 'Column 2', 'Column 3'];
const LB_DIFF_OPTIONS  = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

// 5 distinct topics in the question bank
const LB_TOTAL_TOPICS = 5;

function lbRelTime(ts) {
  if (!ts) return '—';
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function LBAvatar({ name }) {
  const str = name || 'U';
  const initial = str.trim().charAt(0).toUpperCase();
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  const c = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${c.bg} ${c.text}`}>
      {initial}
    </div>
  );
}

function LBRankBadge({ rank }) {
  if (rank === 1) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black">1</span>
  );
  if (rank === 2) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-black">2</span>
  );
  if (rank === 3) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-xs font-black">3</span>
  );
  return <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">#{rank}</span>;
}

function LeaderboardPage({ authUser }) {
  const [entries, setEntries]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [dayFilter, setDayFilter]     = useState('All Time');
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [diffFilter, setDiffFilter]   = useState('All Difficulties');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const pDays  = dayFilter   === 'Last 30 Days'      ? 30 : dayFilter === 'Last 7 Days' ? 7 : null;
    const pTopic = topicFilter === 'All Topics'         ? null : topicFilter;
    const pDiff  = diffFilter  === 'All Difficulties'  ? null : diffFilter;

    _supabase.rpc('get_leaderboard', {
      p_days: pDays, p_topic: pTopic, p_difficulty: pDiff,
    }).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) { setError(err.message); }
      else     { setEntries(data || []); }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [dayFilter, topicFilter, diffFilter]);

  const myEntry = entries.find(e => e.is_current_user);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Leaderboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">UIL Math Practice · ranked by practice performance</p>
      </div>

      {/* Sign-in prompt */}
      {!authUser && (
        <div className="mb-5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-blue-800 dark:text-blue-200">Sign in to appear on the leaderboard and track your rank.</p>
          <a href="./index.html" className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold">Sign In</a>
        </div>
      )}

      {/* Scoring explanation */}
      <div className="mb-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 space-y-1">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">How scoring works</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <span className="font-medium text-slate-600 dark:text-slate-300">Score</span> = difficulty-weighted correct answers &times; topic variety.
          Each question counts once. Easy = 1 pt, Medium = 2 pts, Hard = 3 pts.
          The variety multiplier ranges from 0.6&times; (1 topic) to 1.0&times; (all 5 topics) —
          so with equal difficulty performance, a well-rounded practitioner ranks higher.
          Requires at least 5 correct answers to appear.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Dropdown value={dayFilter}   options={LB_DAY_OPTIONS}   onChange={setDayFilter}   />
        <Dropdown value={topicFilter} options={LB_TOPIC_OPTIONS} onChange={setTopicFilter} />
        <Dropdown value={diffFilter}  options={LB_DIFF_OPTIONS}  onChange={setDiffFilter}  />
      </div>

      {/* My rank badge */}
      {myEntry && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-3">
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white shrink-0">
            <span className="text-xs font-semibold leading-none opacity-80">RANK</span>
            <span className="text-xl font-black leading-tight">#{myEntry.rank}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Your current rank</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
              Score {myEntry.score} &middot; {myEntry.correct_count} correct &middot; {myEntry.topic_count}/{LB_TOTAL_TOPICS} topics
            </p>
          </div>
        </div>
      )}

      {/* States */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10">
          <p className="text-rose-600 dark:text-rose-400 text-sm font-semibold mb-1">Could not load leaderboard</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs">{error}</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </div>
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No entries yet</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
            Answer at least 5 questions correctly to appear on the leaderboard.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">

          {/* Desktop column header */}
          <div className="hidden sm:grid grid-cols-[2.5rem_1fr_5.5rem_8rem_6rem_5.5rem_6rem] gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>#</span>
            <span>Name</span>
            <span className="text-right">Score</span>
            <span className="text-right">Correct / Total</span>
            <span className="text-right">Accuracy</span>
            <span className="text-right">Topics</span>
            <span className="text-right">Last Active</span>
          </div>

          {entries.map((e, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_1fr_5.5rem_8rem_6rem_5.5rem_6rem] gap-2 px-4 py-3 items-center border-b border-slate-100 dark:border-slate-800/60 last:border-0
                ${e.is_current_user
                  ? 'bg-blue-50 dark:bg-blue-500/10'
                  : 'bg-white dark:bg-slate-900'
                }`}
            >
              {/* Rank */}
              <div className="flex items-center">
                <LBRankBadge rank={Number(e.rank)} />
              </div>

              {/* Name + mobile summary */}
              <div className="flex items-center gap-2.5 min-w-0">
                <LBAvatar name={e.display_name} />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${e.is_current_user ? 'text-blue-700 dark:text-blue-300' : 'text-slate-800 dark:text-slate-100'}`}>
                    {e.display_name}
                    {e.is_current_user && (
                      <span className="ml-1.5 text-xs font-normal text-blue-500 dark:text-blue-400">(you)</span>
                    )}
                  </p>
                  {/* Mobile: compact stats */}
                  <p className="sm:hidden text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    Score {e.score} &middot; {e.correct_count}/{e.total_questions} correct &middot; {e.accuracy_percent}% &middot; {e.topic_count}/{LB_TOTAL_TOPICS} topics
                  </p>
                </div>
              </div>

              {/* Score */}
              <div className="hidden sm:flex justify-end">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{e.score}</span>
              </div>

              {/* Correct / Total */}
              <div className="hidden sm:flex justify-end">
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {e.correct_count}
                  <span className="text-slate-400 dark:text-slate-500">/{e.total_questions}</span>
                </span>
              </div>

              {/* Accuracy */}
              <div className="hidden sm:flex justify-end">
                <span className={`text-sm font-medium ${
                  Number(e.accuracy_percent) >= 80 ? 'text-emerald-600 dark:text-emerald-400'
                  : Number(e.accuracy_percent) >= 60 ? 'text-amber-600 dark:text-amber-400'
                  : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {e.accuracy_percent}%
                </span>
              </div>

              {/* Topics */}
              <div className="hidden sm:flex justify-end items-center gap-1">
                <span className={`text-sm font-medium ${
                  Number(e.topic_count) >= 4 ? 'text-emerald-600 dark:text-emerald-400'
                  : Number(e.topic_count) >= 2 ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {e.topic_count}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">/{LB_TOTAL_TOPICS}</span>
              </div>

              {/* Last Active */}
              <div className="hidden sm:flex justify-end">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {lbRelTime(e.latest_attempt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Signed in but not on board */}
      {authUser && !loading && !error && entries.length > 0 && !myEntry && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You're not on this board yet — answer at least 5 questions correctly to appear.
          </p>
        </div>
      )}
    </div>
  );
}
