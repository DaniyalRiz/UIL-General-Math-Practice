function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ACHIEVEMENTS_DEF = [{
  id: 'first_correct',
  name: 'First Correct Answer',
  icon: '✓',
  description: 'Get your first question right.',
  numeric: true,
  max: 1,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'getting_started',
  name: 'Getting Started',
  icon: '🚀',
  description: 'Master 10 unique questions.',
  numeric: true,
  max: 10,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'review_mindset',
  name: 'Review Mindset',
  icon: '🔖',
  description: 'Bookmark at least one question for later.',
  numeric: false,
  check: function check(_s, bm) {
    return bm > 0;
  }
}, {
  id: 'on_the_path',
  name: 'On the Path',
  icon: '🗺️',
  description: 'Use the Recommended Practice feature.',
  numeric: false,
  check: function check(s) {
    return s.used_recommended_practice;
  }
}, {
  id: 'accuracy_builder',
  name: 'Accuracy Builder',
  icon: '🎯',
  description: 'Master 20 unique questions.',
  numeric: true,
  max: 20,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'consistent',
  name: 'Consistent Practice',
  icon: '📅',
  description: 'Master 25 unique questions.',
  numeric: true,
  max: 25,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'serious_comp',
  name: 'Serious Competitor',
  icon: '⚡',
  description: 'Master 50 unique questions.',
  numeric: true,
  max: 50,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'uil_grinder',
  name: 'UIL Grinder',
  icon: '💪',
  description: 'Master 100 unique questions.',
  numeric: true,
  max: 100,
  val: function val(s) {
    return s.total_mastered;
  }
}, {
  id: 'region_ready',
  name: 'Region Ready',
  icon: '🌟',
  description: 'Reach 25% overall mastery.',
  numeric: true,
  max: 25,
  val: function val(_s, pct) {
    return pct;
  }
}, {
  id: 'state_ready',
  name: 'State Ready',
  icon: '🏆',
  description: 'Reach 50% overall mastery.',
  numeric: true,
  max: 50,
  val: function val(_s, pct) {
    return pct;
  }
}, {
  id: 'medalist',
  name: 'Medalist Mindset',
  icon: '🥇',
  description: 'Reach 75% overall mastery.',
  numeric: true,
  max: 75,
  val: function val(_s, pct) {
    return pct;
  }
}, {
  id: 'full_mastery_ach',
  name: 'Full Mastery',
  icon: '👑',
  description: 'Master all 400 questions.',
  numeric: true,
  max: 100,
  val: function val(_s, pct) {
    return pct;
  }
}, {
  id: 'topic_specialist',
  name: 'Topic Specialist',
  icon: '🔬',
  description: 'Reach 50% mastery in any single topic.',
  numeric: false,
  check: function check(s) {
    return Object.entries(TOPIC_TOTALS).some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        t = _ref2[0],
        n = _ref2[1];
      return (s.mastered_by_topic[t] || 0) >= n * 0.5;
    });
  }
}, {
  id: 'sharp_eye',
  name: 'Sharp Eye',
  icon: '🔍',
  description: 'Submit a bug report that gets resolved.',
  numeric: false,
  check: function check(s) {
    return s.has_resolved_bug_report;
  }
}];
function AchievementCard(_ref3) {
  var a = _ref3.a,
    state = _ref3.state;
  var earned = state === 'earned';
  var inProgress = state === 'inProgress';
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border p-4 ".concat(earned ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10' : inProgress ? 'border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-50')
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ".concat(earned ? 'bg-emerald-100 dark:bg-emerald-500/20' : inProgress ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-slate-100 dark:bg-slate-800')
  }, a.icon), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-2 mb-0.5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold leading-tight ".concat(earned ? 'text-emerald-800 dark:text-emerald-200' : inProgress ? 'text-amber-800 dark:text-amber-200' : 'text-slate-600 dark:text-slate-400')
  }, a.name), earned && /*#__PURE__*/React.createElement("span", {
    className: "flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide whitespace-nowrap"
  }, "Earned")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-snug ".concat(earned ? 'text-emerald-700/80 dark:text-emerald-300/80' : 'text-slate-400 dark:text-slate-500')
  }, a.description), inProgress && a.numeric && /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] tabular-nums text-amber-600 dark:text-amber-400 mb-1 font-medium"
  }, /*#__PURE__*/React.createElement("span", null, a.current), /*#__PURE__*/React.createElement("span", null, a.max)), /*#__PURE__*/React.createElement("div", {
    className: "h-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-amber-400 dark:bg-amber-500 rounded-full",
    style: {
      width: "".concat(Math.round(a.current / a.max * 100), "%")
    }
  }))))));
}
function MasteryPage(_ref4) {
  var _authUser$user_metada, _authUser$email, _authUser$user_metada2;
  var authUser = _ref4.authUser,
    masteryStats = _ref4.masteryStats,
    bookmarksCount = _ref4.bookmarksCount,
    navigateTab = _ref4.navigateTab;
  var _useState = useState('overview'),
    _useState2 = _slicedToArray(_useState, 2),
    subtab = _useState2[0],
    setSubtab = _useState2[1];
  if (!masteryStats) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-[50vh] flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-400 text-sm"
    }, "Loading mastery data\u2026")));
  }
  var s = masteryStats;
  var masteryPct = Math.min(100, Math.round(s.total_mastered / TOTAL_QUESTIONS * 100));
  var level = getMasteryLevel(masteryPct);
  var levelIdx = MASTERY_LEVELS.findIndex(function (l) {
    return l.name === level.name;
  });
  var nextLevel = levelIdx > 0 ? MASTERY_LEVELS[levelIdx - 1] : null;
  var nextLevelNeeded = nextLevel ? Math.ceil(nextLevel.min * TOTAL_QUESTIONS / 100) : null;
  var toNextLevel = nextLevelNeeded ? Math.max(0, nextLevelNeeded - s.total_mastered) : 0;
  var achievementsData = ACHIEVEMENTS_DEF.map(function (a) {
    var earned, current, hasProgress;
    if (a.numeric) {
      current = Math.min(a.val(s, masteryPct), a.max);
      earned = current >= a.max;
      hasProgress = current > 0 && !earned;
    } else {
      earned = a.check(s, bookmarksCount);
      current = earned ? 1 : 0;
      hasProgress = false;
    }
    return _objectSpread(_objectSpread({}, a), {}, {
      earned: earned,
      current: current,
      hasProgress: hasProgress
    });
  });
  var earnedAch = achievementsData.filter(function (a) {
    return a.earned;
  });
  var inProgressAch = achievementsData.filter(function (a) {
    return !a.earned && a.hasProgress;
  });
  var lockedAch = achievementsData.filter(function (a) {
    return !a.earned && !a.hasProgress;
  });
  var displayName = (authUser === null || authUser === void 0 || (_authUser$user_metada = authUser.user_metadata) === null || _authUser$user_metada === void 0 ? void 0 : _authUser$user_metada.display_name) || (authUser === null || authUser === void 0 || (_authUser$email = authUser.email) === null || _authUser$email === void 0 ? void 0 : _authUser$email.split('@')[0]) || 'You';
  var avatarUrl = (authUser === null || authUser === void 0 || (_authUser$user_metada2 = authUser.user_metadata) === null || _authUser$user_metada2 === void 0 ? void 0 : _authUser$user_metada2.custom_avatar_url) || null;
  var avatarColor = avatarColorFor(authUser);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white"
  }, "My Mastery"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return navigateTab('problems');
    },
    title: "Close",
    className: "mt-1 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-0 mb-8 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setSubtab('overview');
    },
    className: "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ".concat(subtab === 'overview' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
  }, "Overview"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setSubtab('achievements');
    },
    className: "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ".concat(subtab === 'achievements' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
  }, "Achievements", /*#__PURE__*/React.createElement("span", {
    className: "ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
  }, earnedAch.length, "/", achievementsData.length))), subtab === 'overview' ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shrink-0 ".concat(avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text)
  }, avatarUrl ? /*#__PURE__*/React.createElement("img", {
    src: avatarUrl,
    alt: "",
    className: "w-full h-full object-cover"
  }) : /*#__PURE__*/React.createElement("span", null, initialsFor(authUser))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-slate-900 dark:text-white text-lg leading-snug"
  }, displayName), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold ".concat(level.color)
  }, level.name))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-slate-500 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-900 dark:text-white tabular-nums text-lg"
  }, s.total_mastered), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 dark:text-slate-600"
  }, " / ", TOTAL_QUESTIONS), /*#__PURE__*/React.createElement("span", {
    className: "ml-1"
  }, "questions mastered")), /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black tabular-nums text-slate-900 dark:text-white leading-none"
  }, masteryPct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-blue-500 rounded-full transition-all duration-700",
    style: {
      width: "".concat(masteryPct, "%")
    }
  })), nextLevel ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabular-nums font-semibold text-slate-600 dark:text-slate-400"
  }, toNextLevel), " more question", toNextLevel !== 1 ? 's' : '', " to reach ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, nextLevel.name)) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-emerald-500"
  }, "You've reached Full Mastery \u2014 all 400 questions!")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-5"
  }, "Progress by Topic"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, Object.entries(TOPIC_TOTALS).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      topic = _ref6[0],
      total = _ref6[1];
    var mastered = s.mastered_by_topic[topic] || 0;
    var pct = Math.round(mastered / total * 100);
    var dotClass = TOPIC_DOT[topic] || 'bg-slate-400';
    return /*#__PURE__*/React.createElement("div", {
      key: topic
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full flex-shrink-0 ".concat(dotClass)
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium text-slate-700 dark:text-slate-300"
    }, topic)), /*#__PURE__*/React.createElement("span", {
      className: "text-xs tabular-nums text-slate-400 dark:text-slate-500"
    }, mastered, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-300 dark:text-slate-700"
    }, "/", total), /*#__PURE__*/React.createElement("span", {
      className: "ml-1.5 font-semibold text-slate-600 dark:text-slate-400"
    }, pct, "%"))), /*#__PURE__*/React.createElement("div", {
      className: "h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all duration-500 ".concat(dotClass),
      style: {
        width: "".concat(pct, "%")
      }
    })));
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, earnedAch.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
  }, "Earned \xB7 ", earnedAch.length), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
  }, earnedAch.map(function (a) {
    return /*#__PURE__*/React.createElement(AchievementCard, {
      key: a.id,
      a: a,
      state: "earned"
    });
  }))), inProgressAch.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
  }, "In Progress \xB7 ", inProgressAch.length), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
  }, inProgressAch.map(function (a) {
    return /*#__PURE__*/React.createElement(AchievementCard, {
      key: a.id,
      a: a,
      state: "inProgress"
    });
  }))), lockedAch.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
  }, "Locked \xB7 ", lockedAch.length), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
  }, lockedAch.map(function (a) {
    return /*#__PURE__*/React.createElement(AchievementCard, {
      key: a.id,
      a: a,
      state: "locked"
    });
  })))));
}