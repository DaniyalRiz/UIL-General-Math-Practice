function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// ── Leaderboard ───────────────────────────────────────────────────────────────

var LB_DAY_OPTIONS = ['All Time', 'Last 30 Days', 'Last 7 Days'];
var LB_TOPIC_OPTIONS = ['All Topics', 'Column 1', 'Column 2', 'Column 3'];
var LB_DIFF_OPTIONS = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

// 5 distinct topics in the question bank
var LB_TOTAL_TOPICS = 5;
function lbRelTime(ts) {
  if (!ts) return '—';
  var diff = Date.now() - new Date(ts).getTime();
  var m = Math.floor(diff / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return "".concat(m, "m ago");
  var h = Math.floor(m / 60);
  if (h < 24) return "".concat(h, "h ago");
  return "".concat(Math.floor(h / 24), "d ago");
}
function LBAvatar(_ref) {
  var name = _ref.name;
  var str = name || 'U';
  var initial = str.trim().charAt(0).toUpperCase();
  var hash = 0;
  for (var i = 0; i < str.length; i++) hash = hash * 31 + str.charCodeAt(i) >>> 0;
  var c = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  return /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ".concat(c.bg, " ").concat(c.text)
  }, initial);
}
function LBRankBadge(_ref2) {
  var rank = _ref2.rank;
  if (rank === 1) return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black"
  }, "1");
  if (rank === 2) return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-black"
  }, "2");
  if (rank === 3) return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-xs font-black"
  }, "3");
  return /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-slate-400 dark:text-slate-500"
  }, "#", rank);
}
function LeaderboardPage(_ref3) {
  var authUser = _ref3.authUser;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    entries = _useState2[0],
    setEntries = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = useState('All Time'),
    _useState8 = _slicedToArray(_useState7, 2),
    dayFilter = _useState8[0],
    setDayFilter = _useState8[1];
  var _useState9 = useState('All Topics'),
    _useState0 = _slicedToArray(_useState9, 2),
    topicFilter = _useState0[0],
    setTopicFilter = _useState0[1];
  var _useState1 = useState('All Difficulties'),
    _useState10 = _slicedToArray(_useState1, 2),
    diffFilter = _useState10[0],
    setDiffFilter = _useState10[1];
  useEffect(function () {
    var cancelled = false;
    setLoading(true);
    setError(null);
    var pDays = dayFilter === 'Last 30 Days' ? 30 : dayFilter === 'Last 7 Days' ? 7 : null;
    var pTopic = topicFilter === 'All Topics' ? null : topicFilter;
    var pDiff = diffFilter === 'All Difficulties' ? null : diffFilter;
    _supabase.rpc('get_leaderboard', {
      p_days: pDays,
      p_topic: pTopic,
      p_difficulty: pDiff
    }).then(function (_ref4) {
      var data = _ref4.data,
        err = _ref4.error;
      if (cancelled) return;
      if (err) {
        setError(err.message);
      } else {
        setEntries(data || []);
      }
      setLoading(false);
    });
    return function () {
      cancelled = true;
    };
  }, [dayFilter, topicFilter, diffFilter]);
  var myEntry = entries.find(function (e) {
    return e.is_current_user;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Leaderboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, "UIL Math Practice \xB7 ranked by practice performance")), !authUser && /*#__PURE__*/React.createElement("div", {
    className: "mb-5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-3 flex items-center justify-between gap-4 flex-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-800 dark:text-blue-200"
  }, "Sign in to appear on the leaderboard and track your rank."), /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "mb-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 space-y-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-700 dark:text-slate-200"
  }, "How scoring works"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-slate-600 dark:text-slate-300"
  }, "Score"), " = difficulty-weighted correct answers \xD7 topic variety. Each question counts once. Easy = 1 pt, Medium = 2 pts, Hard = 3 pts. The variety multiplier ranges from 0.6\xD7 (1 topic) to 1.0\xD7 (all 5 topics) \u2014 so with equal difficulty performance, a well-rounded practitioner ranks higher. Requires at least 5 correct answers to appear.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    value: dayFilter,
    options: LB_DAY_OPTIONS,
    onChange: setDayFilter
  }), /*#__PURE__*/React.createElement(Dropdown, {
    value: topicFilter,
    options: LB_TOPIC_OPTIONS,
    onChange: setTopicFilter
  }), /*#__PURE__*/React.createElement(Dropdown, {
    value: diffFilter,
    options: LB_DIFF_OPTIONS,
    onChange: setDiffFilter
  })), myEntry && /*#__PURE__*/React.createElement("div", {
    className: "mb-5 flex items-center gap-3 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white shrink-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold leading-none opacity-80"
  }, "RANK"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-black leading-tight"
  }, "#", myEntry.rank)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-blue-800 dark:text-blue-200"
  }, "Your current rank"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-600 dark:text-blue-400 mt-0.5"
  }, "Score ", myEntry.score, " \xB7 ", myEntry.correct_count, " correct \xB7 ", myEntry.topic_count, "/", LB_TOTAL_TOPICS, " topics"))), loading ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  })) : error ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-rose-600 dark:text-rose-400 text-sm font-semibold mb-1"
  }, "Could not load leaderboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 dark:text-slate-500 text-xs"
  }, error)) : entries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 22h16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300 mb-1"
  }, "No entries yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto"
  }, "Answer at least 5 questions correctly to appear on the leaderboard.")) : /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:grid grid-cols-[2.5rem_1fr_5.5rem_8rem_6rem_5.5rem_6rem] gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "Score"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "Correct / Total"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "Accuracy"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "Topics"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "Last Active")), entries.map(function (e, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_1fr_5.5rem_8rem_6rem_5.5rem_6rem] gap-2 px-4 py-3 items-center border-b border-slate-100 dark:border-slate-800/60 last:border-0\n                ".concat(e.is_current_user ? 'bg-blue-50 dark:bg-blue-500/10' : 'bg-white dark:bg-slate-900')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/React.createElement(LBRankBadge, {
      rank: Number(e.rank)
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2.5 min-w-0"
    }, /*#__PURE__*/React.createElement(LBAvatar, {
      name: e.display_name
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold truncate ".concat(e.is_current_user ? 'text-blue-700 dark:text-blue-300' : 'text-slate-800 dark:text-slate-100')
    }, e.display_name, e.is_current_user && /*#__PURE__*/React.createElement("span", {
      className: "ml-1.5 text-xs font-normal text-blue-500 dark:text-blue-400"
    }, "(you)")), /*#__PURE__*/React.createElement("p", {
      className: "sm:hidden text-xs text-slate-400 dark:text-slate-500 mt-0.5"
    }, "Score ", e.score, " \xB7 ", e.correct_count, "/", e.total_questions, " correct \xB7 ", e.accuracy_percent, "% \xB7 ", e.topic_count, "/", LB_TOTAL_TOPICS, " topics"))), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex justify-end"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-bold text-slate-800 dark:text-slate-100"
    }, e.score)), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex justify-end"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-slate-700 dark:text-slate-200"
    }, e.correct_count, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 dark:text-slate-500"
    }, "/", e.total_questions))), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex justify-end"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium ".concat(Number(e.accuracy_percent) >= 80 ? 'text-emerald-600 dark:text-emerald-400' : Number(e.accuracy_percent) >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')
    }, e.accuracy_percent, "%")), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex justify-end items-center gap-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium ".concat(Number(e.topic_count) >= 4 ? 'text-emerald-600 dark:text-emerald-400' : Number(e.topic_count) >= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400')
    }, e.topic_count), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, "/", LB_TOTAL_TOPICS)), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex justify-end"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, lbRelTime(e.latest_attempt))));
  })), authUser && !loading && !error && entries.length > 0 && !myEntry && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400"
  }, "You're not on this board yet \u2014 answer at least 5 questions correctly to appear.")));
}