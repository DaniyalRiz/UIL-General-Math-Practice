import { useState } from 'react';
import { TOPIC_DOT, initialsFor, avatarColorFor, MASTERY_LEVELS, getMasteryLevel } from '../constants.js';

const getAchievementsDef = (totalQuestions, topicTotals) => [
  {
    id: 'first_correct',
    name: 'First Correct Answer',
    icon: '✓',
    description: 'Get your first question right.',
    numeric: true, max: 1,
    val: (s) => s.total_mastered,
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    icon: '🚀',
    description: 'Master 10 unique questions.',
    numeric: true, max: 10,
    val: (s) => s.total_mastered,
  },
  {
    id: 'review_mindset',
    name: 'Review Mindset',
    icon: '🔖',
    description: 'Add at least one question to Review Later.',
    numeric: false,
    check: (_s, bm) => bm > 0,
  },
  {
    id: 'on_the_path',
    name: 'On the Path',
    icon: '🗺️',
    description: 'Use the Recommended Practice feature.',
    numeric: false,
    check: (s) => s.used_recommended_practice,
  },
  {
    id: 'accuracy_builder',
    name: 'Accuracy Builder',
    icon: '🎯',
    description: 'Master 20 unique questions.',
    numeric: true, max: 20,
    val: (s) => s.total_mastered,
  },
  {
    id: 'consistent',
    name: 'Consistent Practice',
    icon: '📅',
    description: 'Master 25 unique questions.',
    numeric: true, max: 25,
    val: (s) => s.total_mastered,
  },
  {
    id: 'serious_comp',
    name: 'Serious Competitor',
    icon: '⚡',
    description: 'Master 50 unique questions.',
    numeric: true, max: 50,
    val: (s) => s.total_mastered,
  },
  {
    id: 'uil_grinder',
    name: 'UIL Grinder',
    icon: '💪',
    description: 'Master 100 unique questions.',
    numeric: true, max: 100,
    val: (s) => s.total_mastered,
  },
  {
    id: 'district_ready',
    name: 'District Ready',
    icon: '🎓',
    description: 'Reach 15% overall mastery.',
    numeric: true, max: 15,
    val: (_s, pct) => pct,
  },
  {
    id: 'region_ready',
    name: 'Region Ready',
    icon: '🌟',
    description: 'Reach 25% overall mastery.',
    numeric: true, max: 25,
    val: (_s, pct) => pct,
  },
  {
    id: 'state_ready',
    name: 'State Ready',
    icon: '🏆',
    description: 'Reach 50% overall mastery.',
    numeric: true, max: 50,
    val: (_s, pct) => pct,
  },
  {
    id: 'medalist',
    name: 'Medalist Mindset',
    icon: '🥇',
    description: 'Reach 75% overall mastery.',
    numeric: true, max: 75,
    val: (_s, pct) => pct,
  },
  {
    id: 'state_champion',
    name: 'State Champion',
    icon: '🎖️',
    description: 'Reach 90% overall mastery.',
    numeric: true, max: 90,
    val: (_s, pct) => pct,
  },
  {
    id: 'full_mastery_ach',
    name: 'Full Mastery',
    icon: '👑',
    description: `Master all ${totalQuestions} questions.`,
    numeric: true, max: 100,
    val: (_s, pct) => pct,
  },
  {
    id: 'topic_specialist',
    name: 'Topic Specialist',
    icon: '🔬',
    description: 'Reach 50% mastery in any single topic.',
    numeric: false,
    check: (s) => Object.entries(topicTotals).some(([t, n]) => (s.mastered_by_topic[t] || 0) >= n * 0.5),
  },
  {
    id: 'sharp_eye',
    name: 'Sharp Eye',
    icon: '🔍',
    description: 'Submit a bug report that gets resolved.',
    numeric: false,
    check: (s) => s.has_resolved_bug_report,
  },
];

function AchievementCard({ a, state }) {
  const earned = state === 'earned';
  const inProgress = state === 'inProgress';
  return (
    <div className={`rounded-xl border p-4 ${
      earned
        ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
        : inProgress
          ? 'border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5'
          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-50'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
          earned ? 'bg-emerald-100 dark:bg-emerald-500/20' :
          inProgress ? 'bg-amber-100 dark:bg-amber-500/20' :
          'bg-slate-100 dark:bg-slate-800'
        }`}>
          {a.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <p className={`text-sm font-bold leading-tight ${
              earned ? 'text-emerald-800 dark:text-emerald-200' :
              inProgress ? 'text-amber-800 dark:text-amber-200' :
              'text-slate-600 dark:text-slate-400'
            }`}>{a.name}</p>
            {earned && (
              <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide whitespace-nowrap">
                Earned
              </span>
            )}
          </div>
          <p className={`text-xs leading-snug ${
            earned ? 'text-emerald-700/80 dark:text-emerald-300/80' :
            'text-slate-400 dark:text-slate-500'
          }`}>{a.description}</p>
          {inProgress && a.numeric && (
            <div className="mt-2">
              <div className="flex justify-between text-[10px] tabular-nums text-amber-600 dark:text-amber-400 mb-1 font-medium">
                <span>{a.current}</span><span>{a.max}</span>
              </div>
              <div className="h-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 dark:bg-amber-500 rounded-full"
                  style={{ width: `${Math.round((a.current / a.max) * 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MasteryPage({ authUser, masteryStats, bookmarksCount, navigateTab, totalQuestions, topicTotals }) {
  const [subtab, setSubtab] = useState('overview');

  if (!masteryStats || !totalQuestions) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-slate-400 text-sm">Loading mastery data…</p>
        </div>
      </div>
    );
  }

  const s = masteryStats;
  const masteryPct = Math.min(100, Math.round((s.total_mastered / totalQuestions) * 100));
  const level = getMasteryLevel(s.total_mastered);

  const levelIdx = MASTERY_LEVELS.findIndex(l => l.name === level.name);
  const nextLevel = levelIdx < MASTERY_LEVELS.length - 1 ? MASTERY_LEVELS[levelIdx + 1] : null;
  const toNextLevel = nextLevel ? Math.max(0, nextLevel.minQuestions - s.total_mastered) : 0;

  const achievementsData = getAchievementsDef(totalQuestions, topicTotals).map(a => {
    let earned, current, hasProgress;
    if (a.numeric) {
      current = Math.min(a.val(s, masteryPct), a.max);
      earned = current >= a.max;
      hasProgress = current > 0 && !earned;
    } else {
      earned = a.check(s, bookmarksCount);
      current = earned ? 1 : 0;
      hasProgress = false;
    }
    return { ...a, earned, current, hasProgress };
  });

  const earnedAch = achievementsData.filter(a => a.earned);
  const inProgressAch = achievementsData.filter(a => !a.earned && a.hasProgress);
  const lockedAch = achievementsData.filter(a => !a.earned && !a.hasProgress);

  const displayName = authUser?.user_metadata?.display_name || authUser?.email?.split('@')[0] || 'You';
  const avatarUrl = authUser?.user_metadata?.custom_avatar_url || null;
  const avatarColor = avatarColorFor(authUser);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white">My Mastery</h1>
        <button onClick={() => navigateTab('problems')} title="Close"
          className="mt-1 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex gap-0 mb-8 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => setSubtab('overview')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${subtab === 'overview' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
          Overview
        </button>
        <button onClick={() => setSubtab('achievements')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${subtab === 'achievements' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
          Achievements
          <span className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{earnedAch.length}/{achievementsData.length}</span>
        </button>
      </div>

      {subtab === 'overview' ? (
        <div className="space-y-6">
          {/* Profile + progress card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shrink-0 ${avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text}`}>
                {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : <span>{initialsFor(authUser)}</span>}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg leading-snug">{displayName}</p>
                <span className={`text-sm font-bold ${level.color}`}>{level.name}</span>
              </div>
            </div>

            <div className="flex items-end justify-between mb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-black text-2xl text-blue-600 dark:text-blue-400 tabular-nums">{s.total_mastered}</span>
                <span className="font-semibold text-base text-slate-500 dark:text-slate-400 tabular-nums"> / {totalQuestions}</span>
                <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">questions mastered</span>
              </span>
              <span className="text-3xl font-black tabular-nums text-slate-900 dark:text-white leading-none">{masteryPct}%</span>
            </div>

            <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2.5">
              <div className={`h-full rounded-full transition-all duration-700 ${level.bar}`}
                style={{ width: `${masteryPct}%` }} />
            </div>

            {nextLevel ? (
              <p className="text-xs text-slate-400 dark:text-slate-500">
                <span className="tabular-nums font-semibold text-slate-600 dark:text-slate-400">{toNextLevel}</span> more question{toNextLevel !== 1 ? 's' : ''} to reach <span className="font-semibold">{nextLevel.name}</span>
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-500">You have mastered the complete question bank.</p>
            )}
          </div>

          {/* Topic breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-5">Progress by Topic</h2>
            <div className="space-y-5">
              {Object.entries(topicTotals).map(([topic, total]) => {
                const mastered = s.mastered_by_topic[topic] || 0;
                const pct = Math.round((mastered / total) * 100);
                const dotClass = TOPIC_DOT[topic] || 'bg-slate-400';
                return (
                  <div key={topic}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotClass}`} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{topic}</span>
                      </div>
                      <span className="text-sm tabular-nums">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{mastered}</span><span className="text-slate-400 dark:text-slate-600">/{total}</span>
                        <span className="ml-1.5 font-semibold text-slate-600 dark:text-slate-400">{pct}%</span>
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${dotClass}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mastery Levels ladder */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-5">Mastery Levels</h2>
            <div className="space-y-3">
              {MASTERY_LEVELS.map((lvl, idx) => {
                const status = idx < levelIdx ? 'completed' : idx === levelIdx ? 'current' : idx === levelIdx + 1 ? 'next' : 'locked';
                const livePct = totalQuestions > 0 ? Math.round((lvl.minQuestions / totalQuestions) * 100) : lvl.percentage;
                const remaining = Math.max(0, lvl.minQuestions - s.total_mastered);
                return (
                  <div key={lvl.name} className={`flex items-center gap-4 rounded-xl border p-3.5 transition-colors ${
                    status === 'current'
                      ? 'border-blue-300 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10'
                      : status === 'locked'
                        ? 'border-slate-100 dark:border-slate-800 opacity-50'
                        : 'border-slate-100 dark:border-slate-800'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      status === 'current' ? `${lvl.bar} text-white` :
                      'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}>
                      {status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className={`text-sm font-bold ${status === 'current' ? lvl.color : status === 'locked' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                          {lvl.name}
                        </span>
                        <span className="text-xs font-semibold tabular-nums text-slate-400 dark:text-slate-500 flex-shrink-0">
                          {lvl.minQuestions} questions · {livePct}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">{lvl.description}</p>
                      {status === 'next' && (
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">{remaining} more question{remaining !== 1 ? 's' : ''} needed</p>
                      )}
                    </div>
                    {status === 'current' && (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 uppercase tracking-wide">Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {earnedAch.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Earned · {earnedAch.length}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {earnedAch.map(a => <AchievementCard key={a.id} a={a} state="earned" />)}
              </div>
            </div>
          )}
          {inProgressAch.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">In Progress · {inProgressAch.length}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {inProgressAch.map(a => <AchievementCard key={a.id} a={a} state="inProgress" />)}
              </div>
            </div>
          )}
          {lockedAch.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Locked · {lockedAch.length}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lockedAch.map(a => <AchievementCard key={a.id} a={a} state="locked" />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
