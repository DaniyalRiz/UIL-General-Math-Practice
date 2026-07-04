function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function AnalyticsPage(_ref) {
  var authUser = _ref.authUser;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  useEffect(function () {
    if (!authUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    _supabase.from('attempts').select('topic,difficulty,is_correct,time_taken_ms,created_at').eq('user_id', authUser.id).order('created_at', {
      ascending: false
    }).then(function (_ref2) {
      var rows = _ref2.data,
        err = _ref2.error;
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      setData(rows || []);
      setLoading(false);
    });
  }, [authUser]);
  if (!authUser) return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-16 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 mx-auto mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "20",
    x2: "22",
    y2: "20"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2"
  }, "Analytics"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 mb-6"
  }, "Sign in to see your personal performance analytics."), /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
  }, "Sign In"));
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  }));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-12 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-rose-500 font-semibold"
  }, "Error loading analytics: ", error), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm mt-1"
  }, "Make sure the attempts table exists in Supabase."));
  if (!data || data.length === 0) return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-16 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 mx-auto mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "20",
    x2: "22",
    y2: "20"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2"
  }, "No data yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 max-w-xs mx-auto"
  }, "Answer some problems and your analytics will appear here."));

  // ── compute stats ──────────────────────────────────────────────────────────
  var total = data.length;
  var correct = data.filter(function (r) {
    return r.is_correct;
  }).length;
  var accuracy = total ? Math.round(100 * correct / total) : 0;
  var totalMs = data.reduce(function (s, r) {
    return s + (r.time_taken_ms || 0);
  }, 0);
  var avgMs = total ? Math.round(totalMs / total) : 0;

  // by topic
  var topicMap = {};
  data.forEach(function (r) {
    if (!topicMap[r.topic]) topicMap[r.topic] = {
      attempts: 0,
      correct: 0,
      totalMs: 0
    };
    topicMap[r.topic].attempts++;
    if (r.is_correct) topicMap[r.topic].correct++;
    topicMap[r.topic].totalMs += r.time_taken_ms || 0;
  });
  var byTopic = Object.entries(topicMap).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      topic = _ref4[0],
      v = _ref4[1];
    return {
      topic: topic,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: Math.round(100 * v.correct / v.attempts),
      avgMs: Math.round(v.totalMs / v.attempts)
    };
  }).sort(function (a, b) {
    return b.attempts - a.attempts;
  });

  // by difficulty
  var diffMap = {};
  data.forEach(function (r) {
    if (!diffMap[r.difficulty]) diffMap[r.difficulty] = {
      attempts: 0,
      correct: 0,
      totalMs: 0
    };
    diffMap[r.difficulty].attempts++;
    if (r.is_correct) diffMap[r.difficulty].correct++;
    diffMap[r.difficulty].totalMs += r.time_taken_ms || 0;
  });
  var byDiff = ['Easy', 'Medium', 'Hard'].map(function (d) {
    var v = diffMap[d] || {
      attempts: 0,
      correct: 0,
      totalMs: 0
    };
    return {
      difficulty: d,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? Math.round(100 * v.correct / v.attempts) : 0,
      avgMs: v.attempts ? Math.round(v.totalMs / v.attempts) : 0
    };
  });

  // by UIL column
  var columnMap = {};
  data.forEach(function (r) {
    var column = getColumnCategory(r);
    if (!column) return;
    if (!columnMap[column]) columnMap[column] = {
      attempts: 0,
      correct: 0,
      totalMs: 0
    };
    columnMap[column].attempts++;
    if (r.is_correct) columnMap[column].correct++;
    columnMap[column].totalMs += r.time_taken_ms || 0;
  });
  var byColumn = ['Column 1', 'Column 2', 'Column 3'].map(function (column) {
    var v = columnMap[column] || {
      attempts: 0,
      correct: 0,
      totalMs: 0
    };
    return {
      column: column,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? Math.round(100 * v.correct / v.attempts) : 0,
      avgMs: v.attempts ? Math.round(v.totalMs / v.attempts) : 0
    };
  });

  // insights
  var topicsWithData = byTopic.filter(function (t) {
    return t.attempts > 0;
  });
  var strongest = topicsWithData.length ? topicsWithData.reduce(function (a, b) {
    return a.accuracy >= b.accuracy ? a : b;
  }) : null;
  var weakest = topicsWithData.length ? topicsWithData.reduce(function (a, b) {
    return a.accuracy <= b.accuracy ? a : b;
  }) : null;
  var fastest = topicsWithData.length ? topicsWithData.reduce(function (a, b) {
    return a.avgMs <= b.avgMs ? a : b;
  }) : null;
  var slowest = topicsWithData.length ? topicsWithData.reduce(function (a, b) {
    return a.avgMs >= b.avgMs ? a : b;
  }) : null;

  // streak
  var days = _toConsumableArray(new Set(data.map(function (r) {
    return new Date(r.created_at).toDateString();
  })));
  var streak = 0;
  var today = new Date();
  for (var i = 0; i < 365; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.includes(d.toDateString())) streak++;else if (i > 0) break;
  }
  var DIFF_BAR = {
    Easy: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    Hard: 'bg-rose-500'
  };
  var COLUMN_BAR = {
    'Column 1': 'bg-blue-500',
    'Column 2': 'bg-violet-500',
    'Column 3': 'bg-fuchsia-500'
  };
  var exportAnalyticsPdf = function exportAnalyticsPdf() {
    var _window$jspdf;
    var jsPDF = (_window$jspdf = window.jspdf) === null || _window$jspdf === void 0 ? void 0 : _window$jspdf.jsPDF;
    if (!jsPDF) {
      alert('PDF exporter is still loading. Please try again in a few seconds.');
      return;
    }
    var doc = new jsPDF();
    var y = 18;
    var line = function line(text) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var bold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      var wrapped = doc.splitTextToSize(String(text), 180);
      wrapped.forEach(function (part) {
        if (y > 280) {
          doc.addPage();
          y = 18;
        }
        doc.text(part, 14, y);
        y += size * 0.45 + 3;
      });
    };
    var spacer = function spacer() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
      y += n;
    };
    line('UIL Math Practice Analytics Report', 18, true);
    line('Exported: ' + new Date().toLocaleString(), 9);
    spacer();
    line('Summary', 13, true);
    line("Total Attempts: ".concat(total));
    line("Correct: ".concat(correct));
    line("Accuracy: ".concat(accuracy, "%"));
    line("Average Time: ".concat(fmtTime(avgMs)));
    line("Total Time: ".concat(fmtTime(totalMs)));
    line("Day Streak: ".concat(streak));
    spacer();
    line('Performance by Column', 13, true);
    byColumn.forEach(function (c) {
      return line("".concat(c.column, ": ").concat(c.correct, "/").concat(c.attempts, " correct \xB7 ").concat(c.accuracy, "% \xB7 avg ").concat(fmtTime(c.avgMs)));
    });
    spacer();
    line('Performance by Topic', 13, true);
    byTopic.forEach(function (t) {
      return line("".concat(t.topic, ": ").concat(t.correct, "/").concat(t.attempts, " correct \xB7 ").concat(t.accuracy, "% \xB7 avg ").concat(fmtTime(t.avgMs)));
    });
    spacer();
    line('Performance by Difficulty', 13, true);
    byDiff.forEach(function (d) {
      return line("".concat(d.difficulty, ": ").concat(d.correct, "/").concat(d.attempts, " correct \xB7 ").concat(d.accuracy, "% \xB7 avg ").concat(fmtTime(d.avgMs)));
    });
    spacer();
    line('Recent Attempts', 13, true);
    data.slice(0, 50).forEach(function (r) {
      line("".concat(new Date(r.created_at).toLocaleDateString(), " \xB7 ").concat(r.is_correct ? 'Correct' : 'Incorrect', " \xB7 ").concat(fmtTime(r.time_taken_ms || 0), " \xB7 ").concat(r.question_title || 'Question #' + r.question_id), 9);
    });
    doc.save('uil-math-analytics.pdf');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Analytics"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, "Your personal performance across all practice sessions")), /*#__PURE__*/React.createElement("button", {
    onClick: exportAnalyticsPdf,
    className: "shrink-0 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
  }, "Export PDF")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
  }, [{
    label: 'Attempted',
    value: total,
    color: 'text-slate-700 dark:text-slate-200'
  }, {
    label: 'Correct',
    value: correct,
    color: 'text-emerald-600 dark:text-emerald-400'
  }, {
    label: 'Accuracy',
    value: accuracy + '%',
    color: accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : accuracy >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400',
    border: 'border-blue-200 dark:border-blue-800/60',
    large: true
  }, {
    label: 'Avg Time',
    value: fmtTime(avgMs),
    color: 'text-slate-600 dark:text-slate-300'
  }, {
    label: 'Total Time',
    value: fmtTime(totalMs),
    color: 'text-slate-600 dark:text-slate-300'
  }, {
    label: 'Day Streak',
    value: streak + (streak === 1 ? ' day' : ' days'),
    color: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800/60'
  }].map(function (_ref5) {
    var label = _ref5.label,
      value = _ref5.value,
      color = _ref5.color,
      border = _ref5.border,
      large = _ref5.large;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      className: "rounded-xl border ".concat(border || 'border-slate-200 dark:border-slate-800', " bg-white dark:bg-slate-900 p-4 text-center shadow-sm")
    }, /*#__PURE__*/React.createElement("p", {
      className: "".concat(large ? 'text-3xl' : 'text-2xl', " font-black ").concat(color)
    }, value), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-wide"
    }, label));
  })), topicsWithData.length > 1 && function () {
    var INSIGHT_STYLE = {
      'Strongest Topic': {
        dot: 'bg-emerald-500',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/60'
      },
      'Needs Work': {
        dot: 'bg-rose-500',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/60'
      },
      'Fastest Topic': {
        dot: 'bg-blue-500',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/60'
      },
      'Slowest Topic': {
        dot: 'bg-amber-500',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/60'
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
    }, [{
      label: 'Strongest Topic',
      value: strongest === null || strongest === void 0 ? void 0 : strongest.topic,
      sub: (strongest === null || strongest === void 0 ? void 0 : strongest.accuracy) + '% accuracy'
    }, {
      label: 'Needs Work',
      value: weakest === null || weakest === void 0 ? void 0 : weakest.topic,
      sub: (weakest === null || weakest === void 0 ? void 0 : weakest.accuracy) + '% accuracy'
    }, {
      label: 'Fastest Topic',
      value: fastest === null || fastest === void 0 ? void 0 : fastest.topic,
      sub: fmtTime(fastest === null || fastest === void 0 ? void 0 : fastest.avgMs) + ' avg'
    }, {
      label: 'Slowest Topic',
      value: slowest === null || slowest === void 0 ? void 0 : slowest.topic,
      sub: fmtTime(slowest === null || slowest === void 0 ? void 0 : slowest.avgMs) + ' avg'
    }].map(function (_ref6) {
      var label = _ref6.label,
        value = _ref6.value,
        sub = _ref6.sub;
      var s = INSIGHT_STYLE[label];
      return /*#__PURE__*/React.createElement("div", {
        key: label,
        className: "rounded-xl border ".concat(s.border, " bg-white dark:bg-slate-900 p-4 shadow-sm")
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1.5 mb-1.5"
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-2 h-2 rounded-full shrink-0 ".concat(s.dot)
      }), /*#__PURE__*/React.createElement("p", {
        className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
      }, label)), /*#__PURE__*/React.createElement("p", {
        className: "text-sm font-bold ".concat(s.text, " leading-tight")
      }, value || '—'), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
      }, sub));
    }));
  }(), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-slate-800 dark:text-slate-100 mb-5"
  }, "Performance by Topic"), byTopic.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "No data yet.") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, byTopic.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.topic
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-sm mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[t.topic] || 'bg-slate-400')
    }), t.topic), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500 dark:text-slate-400 text-xs tabular-nums"
    }, t.correct, "/", t.attempts, " \xB7 ", t.accuracy, "% \xB7 ", fmtTime(t.avgMs))), /*#__PURE__*/React.createElement("div", {
      className: "w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all ".concat(TOPIC_DOT[t.topic] || 'bg-slate-400'),
      style: {
        width: "".concat(t.accuracy, "%")
      }
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-slate-800 dark:text-slate-100 mb-2"
  }, "Performance by Column"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mb-5"
  }, "Column 1 = Algebra 1 & 2 + Geometry \xB7 Column 2 = Precalculus \xB7 Column 3 = AP Calculus + AP Statistics"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, byColumn.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.column
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-sm mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full ".concat(COLUMN_BAR[c.column] || 'bg-slate-400')
    }), c.column), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500 dark:text-slate-400 text-xs tabular-nums"
    }, c.attempts > 0 ? "".concat(c.correct, "/").concat(c.attempts, " \xB7 ").concat(c.accuracy, "% \xB7 ").concat(fmtTime(c.avgMs)) : 'No attempts yet')), /*#__PURE__*/React.createElement("div", {
      className: "w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all ".concat(COLUMN_BAR[c.column] || 'bg-slate-400'),
      style: {
        width: "".concat(c.accuracy, "%")
      }
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-slate-800 dark:text-slate-100 mb-5"
  }, "Performance by Difficulty"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, byDiff.map(function (d) {
    return /*#__PURE__*/React.createElement("div", {
      key: d.difficulty
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-sm mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(DiffPill, {
      d: d.difficulty
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500 dark:text-slate-400 text-xs tabular-nums"
    }, d.attempts > 0 ? "".concat(d.correct, "/").concat(d.attempts, " \xB7 ").concat(d.accuracy, "% \xB7 ").concat(fmtTime(d.avgMs)) : 'No attempts yet')), /*#__PURE__*/React.createElement("div", {
      className: "w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all ".concat(DIFF_BAR[d.difficulty]),
      style: {
        width: "".concat(d.accuracy, "%")
      }
    })));
  })))));
}
function HistoryPage(_ref7) {
  var authUser = _ref7.authUser,
    allQuestions = _ref7.allQuestions,
    onOpenQuestion = _ref7.onOpenQuestion;
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    rows = _useState8[0],
    setRows = _useState8[1];
  var _useState9 = useState(true),
    _useState0 = _slicedToArray(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    error = _useState10[0],
    setError = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    selected = _useState12[0],
    setSelected = _useState12[1];
  var _useState13 = useState('attempts'),
    _useState14 = _slicedToArray(_useState13, 2),
    historySubTab = _useState14[0],
    setHistorySubTab = _useState14[1];
  var _useState15 = useState([]),
    _useState16 = _slicedToArray(_useState15, 2),
    mySolutions = _useState16[0],
    setMySolutions = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    tooltipMeta = _useState18[0],
    setTooltipMeta = _useState18[1];
  var rowRefs = useRef({});
  var getSolutionQuestion = function getSolutionQuestion(solution) {
    return allQuestions.find(function (q) {
      return q.id === solution.question_id;
    });
  };

  // filters
  var _useState19 = useState('All'),
    _useState20 = _slicedToArray(_useState19, 2),
    filterCorrect = _useState20[0],
    setFilterCorrect = _useState20[1];
  var _useState21 = useState('All Topics'),
    _useState22 = _slicedToArray(_useState21, 2),
    filterTopic = _useState22[0],
    setFilterTopic = _useState22[1];
  var _useState23 = useState('All Difficulties'),
    _useState24 = _slicedToArray(_useState23, 2),
    filterDiff = _useState24[0],
    setFilterDiff = _useState24[1];
  var _useState25 = useState('Most Recent'),
    _useState26 = _slicedToArray(_useState25, 2),
    filterDate = _useState26[0],
    setFilterDate = _useState26[1];
  var _useState27 = useState('All Sources'),
    _useState28 = _slicedToArray(_useState27, 2),
    filterSource = _useState28[0],
    setFilterSource = _useState28[1];
  var _useState29 = useState('All Types'),
    _useState30 = _slicedToArray(_useState29, 2),
    filterType = _useState30[0],
    setFilterType = _useState30[1];
  var _useState31 = useState(''),
    _useState32 = _slicedToArray(_useState31, 2),
    search = _useState32[0],
    setSearch = _useState32[1];
  var questionSourceMap = useMemo(function () {
    var map = {};
    allQuestions.forEach(function (q) {
      map[q.id] = q.source || '';
    });
    return map;
  }, [allQuestions]);
  var historyUniqueSources = useMemo(function () {
    var srcs = new Set(rows.filter(function (r) {
      return filterType === 'All Types' || getSourceType(questionSourceMap[r.question_id] || '') === filterType;
    }).map(function (r) {
      return questionSourceMap[r.question_id] || '';
    }).filter(Boolean));
    return ['All Sources'].concat(_toConsumableArray(_toConsumableArray(srcs).sort()));
  }, [rows, questionSourceMap, filterType]);
  useEffect(function () {
    if (!authUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    _supabase.from('attempts').select('*').eq('user_id', authUser.id).order('created_at', {
      ascending: false
    }).then(function (_ref8) {
      var data = _ref8.data,
        err = _ref8.error;
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      setRows(data || []);
      setLoading(false);
    });
  }, [authUser]);
  useEffect(function () {
    if (!authUser) return;
    _supabase.from('community_solutions').select('id,user_id,question_id,solution_text,created_at,updated_at,hidden').eq('user_id', authUser.id).order('created_at', {
      ascending: false
    }).then(/*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref9) {
        var data, error, rows, ids, _yield$_supabase$from, voteRows, counts;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              data = _ref9.data, error = _ref9.error;
              if (!error) {
                _context.n = 1;
                break;
              }
              console.warn('Error loading community solutions:', error.message);
              setMySolutions([]);
              return _context.a(2);
            case 1:
              rows = data || [];
              if (rows.length) {
                _context.n = 2;
                break;
              }
              setMySolutions([]);
              return _context.a(2);
            case 2:
              ids = rows.map(function (s) {
                return s.id;
              });
              _context.n = 3;
              return _supabase.from('community_solution_votes').select('solution_id').in('solution_id', ids);
            case 3:
              _yield$_supabase$from = _context.v;
              voteRows = _yield$_supabase$from.data;
              counts = {};
              (voteRows || []).forEach(function (v) {
                counts[v.solution_id] = (counts[v.solution_id] || 0) + 1;
              });
              setMySolutions(rows.map(function (s) {
                return _objectSpread(_objectSpread({}, s), {}, {
                  upvotes: counts[s.id] || 0
                });
              }));
            case 4:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref0.apply(this, arguments);
      };
    }());
  }, [authUser]);
  if (!authUser) return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-16 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 mx-auto mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2"
  }, "History"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 mb-6"
  }, "Sign in to see your attempt history."), /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
  }, "Sign In"));
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  }));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-12 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-rose-500 font-semibold"
  }, "Error loading history: ", error), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm mt-1"
  }, "Make sure the attempts table exists in Supabase."));

  // ── filtering & sorting ────────────────────────────────────────────────────
  var now = new Date();
  var filtered = rows.filter(function (r) {
    if (filterCorrect === 'Correct Only' && !r.is_correct) return false;
    if (filterCorrect === 'Incorrect Only' && r.is_correct) return false;
    if (filterTopic !== 'All Topics') {
      var rowColumn = getColumnCategory(r);
      if (['Column 1', 'Column 2', 'Column 3'].includes(filterTopic)) {
        if (rowColumn !== filterTopic) return false;
      } else if (r.topic !== filterTopic) return false;
    }
    if (filterDiff !== 'All Difficulties' && r.difficulty !== filterDiff) return false;
    if (filterType !== 'All Types' && getSourceType(questionSourceMap[r.question_id] || '') !== filterType) return false;
    if (filterSource !== 'All Sources' && (questionSourceMap[r.question_id] || '') !== filterSource) return false;
    if (filterDate === 'Today') {
      if (new Date(r.created_at).toDateString() !== now.toDateString()) return false;
    } else if (filterDate === 'Last 7 Days') {
      var cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 7);
      if (new Date(r.created_at) < cutoff) return false;
    } else if (filterDate === 'Last 30 Days') {
      var _cutoff = new Date(now);
      _cutoff.setDate(_cutoff.getDate() - 30);
      if (new Date(r.created_at) < _cutoff) return false;
    }
    if (search.trim()) {
      var s = search.toLowerCase();
      return (r.question_title || '').toLowerCase().includes(s) || (r.question_text || '').toLowerCase().includes(s) || (r.topic || '').toLowerCase().includes(s) || (r.tags || []).some(function (t) {
        return t.toLowerCase().includes(s);
      }) || (questionSourceMap[r.question_id] || '').toLowerCase().includes(s);
    }
    return true;
  });
  var sorted = _toConsumableArray(filtered).sort(function (a, b) {
    if (filterDate === 'Oldest First') return new Date(a.created_at) - new Date(b.created_at);
    return new Date(b.created_at) - new Date(a.created_at);
  });
  var findQ = function findQ(row) {
    var q = allQuestions.find(function (x) {
      return x.id === row.question_id;
    });
    if (q) return q;
    return {
      id: row.question_id,
      title: row.question_title,
      question: row.question_text,
      topic: row.topic,
      difficulty: row.difficulty,
      answer: row.correct_answer,
      explanation: row.explanation,
      tags: row.tags || [],
      choices: []
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "History"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, historySubTab === 'attempts' ? "".concat(rows.length, " total attempt").concat(rows.length !== 1 ? 's' : '', " \xB7 showing ").concat(sorted.length) : "".concat(mySolutions.length, " community solution").concat(mySolutions.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex gap-0 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setHistorySubTab('attempts');
    },
    className: "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ".concat(historySubTab === 'attempts' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
  }, "Attempts"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setHistorySubTab('solutions');
    },
    className: "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ".concat(historySubTab === 'solutions' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
  }, "My Community Solutions"))), historySubTab === 'solutions' ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, mySolutions.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-20 text-center"
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
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300 mb-1"
  }, "No community solutions yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto"
  }, "Solutions you post under questions will appear here.")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, mySolutions.map(function (s) {
    var q = getSolutionQuestion(s);
    var preview = (q === null || q === void 0 ? void 0 : q.question) || '';
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      className: "relative px-4 py-4",
      ref: function ref(el) {
        if (el) rowRefs.current[s.id] = el;
      },
      onMouseEnter: function onMouseEnter() {
        var el = rowRefs.current[s.id];
        if (el) {
          var rect = el.getBoundingClientRect();
          var spaceBelow = window.innerHeight - rect.bottom;
          setTooltipMeta({
            id: s.id,
            rect: rect,
            showAbove: spaceBelow < 220
          });
        } else {
          setTooltipMeta({
            id: s.id,
            rect: null,
            showAbove: false
          });
        }
      },
      onMouseLeave: function onMouseLeave() {
        return setTooltipMeta(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3 mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        if (q && onOpenQuestion) onOpenQuestion(q.id);
      },
      className: "text-left text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
    }, (q === null || q === void 0 ? void 0 : q.title) || "Question #".concat(s.question_id)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, new Date(s.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }), " \xB7 ", s.upvotes || 0, " upvote", (s.upvotes || 0) !== 1 ? 's' : '')), q && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        if (onOpenQuestion) onOpenQuestion(q.id);
      },
      className: "shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
    }, "Open Question")), (tooltipMeta === null || tooltipMeta === void 0 ? void 0 : tooltipMeta.id) === s.id && q && tooltipMeta.rect && /*#__PURE__*/React.createElement("div", {
      className: "fixed z-[999] w-[min(32rem,calc(100vw-4rem))] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-2xl p-4 pointer-events-none",
      style: tooltipMeta.showAbove ? {
        left: tooltipMeta.rect.left + 16,
        bottom: window.innerHeight - tooltipMeta.rect.top + 8
      } : {
        left: tooltipMeta.rect.left + 16,
        top: tooltipMeta.rect.bottom + 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[q.topic] || 'bg-slate-400')
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-slate-500 dark:text-slate-400"
    }, q.topic), /*#__PURE__*/React.createElement(DiffPill, {
      d: q.difficulty
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-slate-900 dark:text-white mb-2"
    }, q.title), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-600 dark:text-slate-300"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: preview.slice(0, 260) + (preview.length > 260 ? '...' : '')
    }))), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: s.solution_text
    })));
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 min-w-[200px]"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search title, text, topic, tags\u2026",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    },
    className: "w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Result",
    value: filterCorrect,
    onChange: setFilterCorrect,
    options: ['All', 'Correct Only', 'Incorrect Only']
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Topic",
    value: filterTopic,
    onChange: setFilterTopic,
    options: ['All Topics', 'Column 1', 'Column 2', 'Column 3', 'Algebra 1 & 2', 'Geometry', 'Precalculus', 'AP Calculus', 'AP Statistics']
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Difficulty",
    value: filterDiff,
    onChange: setFilterDiff,
    options: ['All Difficulties', 'Easy', 'Medium', 'Hard']
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Type",
    value: filterType,
    onChange: function onChange(v) {
      setFilterType(v);
      setFilterSource('All Sources');
    },
    options: SOURCE_TYPES
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Source",
    value: filterSource,
    onChange: setFilterSource,
    options: historyUniqueSources
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Date",
    value: filterDate,
    onChange: setFilterDate,
    options: ['Most Recent', 'Oldest First', 'Today', 'Last 7 Days', 'Last 30 Days']
  })), sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-20 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300 mb-1"
  }, rows.length === 0 ? 'No attempts yet' : 'No results match your filters'), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto"
  }, rows.length === 0 ? 'Answer some problems and they will appear here.' : 'Try adjusting your filters or search.')) : /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:grid grid-cols-[1fr_8rem_6rem_6rem_6rem_6rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", null, "Problem"), /*#__PURE__*/React.createElement("span", null, "Topic"), /*#__PURE__*/React.createElement("span", null, "Difficulty"), /*#__PURE__*/React.createElement("span", null, "Result"), /*#__PURE__*/React.createElement("span", null, "Time"), /*#__PURE__*/React.createElement("span", null, "Date")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, sorted.map(function (row) {
    return /*#__PURE__*/React.createElement("button", {
      key: row.id,
      onClick: function onClick() {
        return setSelected(row);
      },
      className: "group w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1fr_8rem_6rem_6rem_6rem_6rem] gap-3 items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400"
    }, row.question_title || plainText(row.question_text) || 'Question #' + row.question_id), questionSourceMap[row.question_id] && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 truncate"
    }, questionSourceMap[row.question_id]), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 mt-0.5 md:hidden"
    }, row.topic, " \xB7 ", row.difficulty, " \xB7 ", new Date(row.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-1.5 h-1.5 rounded-full ".concat(TOPIC_DOT[row.topic] || 'bg-slate-400')
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, row.topic)), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:block"
    }, /*#__PURE__*/React.createElement(DiffPill, {
      d: row.difficulty
    })), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:block"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full\n                    ".concat(row.is_correct ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400')
    }, row.is_correct ? '✓ Correct' : '✗ Wrong')), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:block text-xs text-slate-500 dark:text-slate-400 tabular-nums"
    }, fmtTime(row.time_taken_ms)), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap"
    }, new Date(row.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })), /*#__PURE__*/React.createElement("div", {
      className: "md:hidden flex flex-col items-end gap-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold ".concat(row.is_correct ? 'text-emerald-500' : 'text-rose-500')
    }, row.is_correct ? '✓' : '✗'), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 tabular-nums"
    }, fmtTime(row.time_taken_ms))));
  })))), selected && /*#__PURE__*/React.createElement(HistoryDetailModal, {
    row: selected,
    q: findQ(selected),
    onClose: function onClose() {
      return setSelected(null);
    }
  }));
}
function HistoryDetailModal(_ref1) {
  var row = _ref1.row,
    q = _ref1.q,
    onClose = _ref1.onClose;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between p-5 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0 pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full ".concat(TOPIC_DOT[row.topic] || 'bg-slate-400')
  }), row.topic), /*#__PURE__*/React.createElement(DiffPill, {
    d: row.difficulty
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, new Date(row.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-lg font-black text-slate-900 dark:text-white leading-tight"
  }, q.title || plainText(q.question))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl leading-none"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line"
  }, /*#__PURE__*/React.createElement(MathText, {
    text: q.question || row.question_text || ''
  }))), q.choices && q.choices.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, q.choices.map(function (choice, i) {
    var letter = String.fromCharCode(65 + i);
    var isCorrect = choice === row.correct_answer || letter === row.correct_answer;
    var isSelected = choice === row.selected_answer || letter === row.selected_answer;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-sm font-medium\n                    ".concat(isCorrect ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300' : isSelected ? 'border-rose-400 bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/50 text-rose-800 dark:text-rose-300' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400')
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0"
    }, letter), /*#__PURE__*/React.createElement("span", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: choice
    })), isCorrect && /*#__PURE__*/React.createElement("span", {
      className: "ml-auto font-bold text-base"
    }, "\u2713"), isSelected && !isCorrect && /*#__PURE__*/React.createElement("span", {
      className: "ml-auto font-bold text-base"
    }, "\u2717"));
  })), (!q.choices || q.choices.length === 0) && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide"
  }, "Your Answer"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-lg ".concat(row.is_correct ? 'text-emerald-500' : 'text-rose-500')
  }, row.selected_answer || '—')), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 p-3 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide"
  }, "Correct Answer"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-lg text-emerald-600 dark:text-emerald-400"
  }, row.correct_answer || '—'))), (q.explanation || row.explanation) && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl p-4 border text-sm overflow-x-auto\n              ".concat(row.is_correct ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30' : 'bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30')
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold mb-1.5 ".concat(row.is_correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300')
  }, row.is_correct ? '✓ Correct' : '✗ Incorrect', " \xB7 Time: ", fmtTime(row.time_taken_ms)), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 dark:text-slate-300 leading-relaxed break-words"
  }, /*#__PURE__*/React.createElement(MathText, {
    text: q.explanation || row.explanation
  }))), (row.tags || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, row.tags.map(function (t) {
    return /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full"
    }, "#", t);
  })))));
}