function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// ── Problem list (row layout) ────────────────────────────────────────────────
function ProblemRow(_ref) {
  var q = _ref.q,
    n = _ref.n,
    onOpen = _ref.onOpen,
    status = _ref.status;
  var dotCls = status === "correct" ? "bg-emerald-500" : status === "incorrect" ? "bg-rose-500" : "bg-transparent";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    className: "group w-full grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] items-center gap-3 px-4 py-3 text-left border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full shrink-0 ".concat(dotCls),
    title: status === "correct" ? "Answered correctly" : status === "incorrect" ? "Answered incorrectly" : undefined,
    "aria-label": status === "correct" ? "Answered correctly" : status === "incorrect" ? "Answered incorrectly" : undefined
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400 dark:text-slate-600 text-right"
  }, n)), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400"
  }, q.title || plainText(q.question)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate hidden sm:block"
  }, plainText(q.question)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:hidden"
  }, q.topic, " \xB7 ", q.difficulty)), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[q.topic] || "bg-slate-400")
  }), q.topic), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block"
  }, /*#__PURE__*/React.createElement(DiffPill, {
    d: q.difficulty
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap"
  }, sourceDisplay(q)), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap"
  }, q.date_added ? new Date(q.date_added).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : "—"));
}

// ── Shared "History on this problem / My Notes / Similar Problems" widgets ───
// Rendered once here, then placed inside a mobile (lg:hidden) and a desktop
// (hidden lg:flex) wrapper by ProblemView, instead of being duplicated.
function ProblemSidebarSections(_ref2) {
  var stat = _ref2.stat,
    notes = _ref2.notes,
    authUser = _ref2.authUser,
    noteText = _ref2.noteText,
    setNoteText = _ref2.setNoteText,
    saveNote = _ref2.saveNote,
    deleteNote = _ref2.deleteNote,
    notesSaving = _ref2.notesSaving,
    similarQuestions = _ref2.similarQuestions,
    onOpenQuestion = _ref2.onOpenQuestion;
  return /*#__PURE__*/React.createElement(React.Fragment, null, stat && stat.attempts > 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2"
  }, "Your history on this problem"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 text-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-slate-800 dark:text-slate-100"
  }, Math.round(100 * stat.correct / stat.attempts), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 dark:text-slate-500"
  }, stat.correct, "/", stat.attempts, " correct")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-slate-800 dark:text-slate-100"
  }, fmtTime(stat.bestMs)), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 dark:text-slate-500"
  }, "best time")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-slate-800 dark:text-slate-100"
  }, fmtTime(stat.lastMs)), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 dark:text-slate-500"
  }, "last time")))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-slate-700 dark:text-slate-200"
  }, "My Notes"), !authUser && /*#__PURE__*/React.createElement("span", {
    className: "ml-auto text-xs text-slate-400 dark:text-slate-500"
  }, "Sign in to save notes")), notes.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-200 dark:divide-slate-800"
  }, notes.map(function (n) {
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      className: "px-4 py-3 flex items-start gap-3 group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap"
    }, n.note_text), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-600 mt-1"
    }, new Date(n.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteNote(n.id);
      },
      className: "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all text-lg leading-none shrink-0 mt-0.5"
    }, "\xD7"));
  })), authUser ? /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("textarea", {
    value: noteText,
    onChange: function onChange(e) {
      return setNoteText(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveNote();
    },
    placeholder: "Add a note for this problem\u2026 (Cmd+Enter to save)",
    rows: 3,
    className: "w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: saveNote,
    disabled: !noteText.trim() || notesSaving,
    className: "mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ".concat(noteText.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed")
  }, notesSaving ? "Saving…" : "Save Note")) : /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "text-blue-500 hover:underline"
  }, "Sign in"), " to add and save notes."))), similarQuestions.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 rounded-t-2xl"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-slate-700 dark:text-slate-200"
  }, "Practice Similar Problems"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500 mt-0.5"
  }, "Build speed by drilling the same question pattern.")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, similarQuestions.map(function (sq) {
    return /*#__PURE__*/React.createElement("div", {
      key: sq.id,
      className: "px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold text-slate-800 dark:text-slate-100 truncate"
    }, sq.title || plainText(sq.question)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 mt-1 flex-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-1.5 h-1.5 rounded-full ".concat(TOPIC_DOT[sq.topic] || "bg-slate-400")
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-500 dark:text-slate-400"
    }, sq.topic), /*#__PURE__*/React.createElement(DiffPill, {
      d: sq.difficulty
    }), sq.sharedTags && sq.sharedTags.slice(0, 2).map(function (t) {
      return /*#__PURE__*/React.createElement("span", {
        key: t,
        className: "text-xs px-1.5 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full"
      }, "#", t);
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return onOpenQuestion(sq.id);
      },
      className: "shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
    }, "Open"));
  }))));
}
function ProblemView(_ref3) {
  var q = _ref3.q,
    onClose = _ref3.onClose,
    onAnswered = _ref3.onAnswered,
    prevAnswer = _ref3.prevAnswer,
    stat = _ref3.stat,
    onPrev = _ref3.onPrev,
    onNext = _ref3.onNext,
    hasPrev = _ref3.hasPrev,
    hasNext = _ref3.hasNext,
    isBookmarked = _ref3.isBookmarked,
    onToggleBookmark = _ref3.onToggleBookmark,
    authUser = _ref3.authUser,
    allQuestions = _ref3.allQuestions,
    onOpenQuestion = _ref3.onOpenQuestion;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    pending = _useState2[0],
    setPending = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selected = _useState4[0],
    setSelected = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    answered = _useState6[0],
    setAnswered = _useState6[1];
  var _useState7 = useState({}),
    _useState8 = _slicedToArray(_useState7, 2),
    crossed = _useState8[0],
    setCrossed = _useState8[1];
  // Notes state
  var _useState9 = useState([]),
    _useState0 = _slicedToArray(_useState9, 2),
    notes = _useState0[0],
    setNotes = _useState0[1];
  var _useState1 = useState(""),
    _useState10 = _slicedToArray(_useState1, 2),
    noteText = _useState10[0],
    setNoteText = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    notesSaving = _useState12[0],
    setNotesSaving = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    attemptSessionId = _useState14[0],
    setAttemptSessionId = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    submitError = _useState16[0],
    setSubmitError = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    serverResult = _useState18[0],
    setServerResult = _useState18[1];
  var _useState19 = useState(false),
    _useState20 = _slicedToArray(_useState19, 2),
    submitting = _useState20[0],
    setSubmitting = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    showReportIssue = _useState22[0],
    setShowReportIssue = _useState22[1];
  var timer = useTimer();
  var startRef = useRef(Date.now());
  // Updated synchronously on every render so async RPC callbacks can detect stale results.
  var activeQuestionIdRef = useRef(q.id);
  activeQuestionIdRef.current = q.id;
  var dialogRef = useRef(null);

  // Move focus into the dialog when it opens so keyboard/screen-reader users
  // land inside it instead of staying on the (now hidden) page behind.
  useEffect(function () {
    var _dialogRef$current;
    (_dialogRef$current = dialogRef.current) === null || _dialogRef$current === void 0 || _dialogRef$current.focus();
  }, []);

  // Escape closes: the report modal first if it's open, otherwise the problem.
  // Ignored while a submission is in flight, matching the disabled Close button.
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.key !== 'Escape') return;
      if (showReportIssue) {
        setShowReportIssue(false);
        return;
      }
      if (!submitting) onClose();
    };
    document.addEventListener('keydown', onKey);
    return function () {
      return document.removeEventListener('keydown', onKey);
    };
  }, [showReportIssue, submitting, onClose]);

  // Keep Tab cycling inside the dialog -- without this, keyboard focus walks
  // out into the page hidden behind the full-screen problem view.
  var trapTab = function trapTab(e) {
    var _dialogRef$current2;
    if (e.key !== 'Tab') return;
    var els = (_dialogRef$current2 = dialogRef.current) === null || _dialogRef$current2 === void 0 ? void 0 : _dialogRef$current2.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
    if (!els) return;
    var list = Array.from(els).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Reset per-question interaction state whenever the question itself changes.
  useEffect(function () {
    setPending(null);
    setSelected(null);
    setAnswered(false);
    setCrossed({});
    setNoteText("");
    setAttemptSessionId(null);
    setSubmitError("");
    setServerResult(null);
    setSubmitting(false);
    timer.reset();
    timer.start();
    startRef.current = Date.now();
  }, [q.id]);

  // Start the attempt session and fetch notes for this question. Depends on
  // authUser as well as q.id -- on a slow session restore, authUser can
  // resolve after this view already mounted, and without this dependency
  // notes/the attempt session would silently never load for that question.
  useEffect(function () {
    if (!authUser) {
      setNotes([]);
      return;
    }
    _supabase.rpc("start_question_attempt", {
      p_question_id: q.id
    }).then(function (_ref4) {
      var data = _ref4.data,
        error = _ref4.error;
      if (error) {
        console.warn("start_question_attempt error:", error.message);
        setSubmitError(error.message);
      } else {
        setAttemptSessionId(data);
      }
    });
    _supabase.from('notes').select('*').eq('user_id', authUser.id).eq('question_id', q.id).order('created_at', {
      ascending: true
    }).then(function (_ref5) {
      var data = _ref5.data;
      return setNotes(data || []);
    });
  }, [q.id, authUser === null || authUser === void 0 ? void 0 : authUser.id]);
  var saveNote = /*#__PURE__*/function () {
    var _saveNote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _yield$_supabase$from, data, error;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(!noteText.trim() || !authUser)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setNotesSaving(true);
            _context.n = 2;
            return _supabase.from('notes').insert({
              user_id: authUser.id,
              question_id: q.id,
              note_text: noteText.trim()
            }).select();
          case 2:
            _yield$_supabase$from = _context.v;
            data = _yield$_supabase$from.data;
            error = _yield$_supabase$from.error;
            if (!error && data) {
              setNotes(function (prev) {
                return [].concat(_toConsumableArray(prev), [data[0]]);
              });
              setNoteText("");
            }
            setNotesSaving(false);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    function saveNote() {
      return _saveNote.apply(this, arguments);
    }
    return saveNote;
  }();
  var deleteNote = /*#__PURE__*/function () {
    var _deleteNote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(noteId) {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _supabase.from('notes').delete().eq('id', noteId);
          case 1:
            setNotes(function (prev) {
              return prev.filter(function (n) {
                return n.id !== noteId;
              });
            });
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function deleteNote(_x) {
      return _deleteNote.apply(this, arguments);
    }
    return deleteNote;
  }();

  // Left-click: select/deselect a choice (pending, not yet submitted)
  var handlePick = function handlePick(choice) {
    if (answered) return;
    setPending(function (p) {
      return p === choice ? null : choice;
    });
  };

  // Cross out / un-cross a choice -- reachable two ways: right-click on the
  // choice (the paper-test gesture) or the per-choice toggle button, which is
  // what keyboard and touch users actually have.
  var toggleCross = function toggleCross(choice) {
    if (answered) return;
    setCrossed(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, choice, !prev[choice]));
    });
  };
  var handleCross = function handleCross(e, choice) {
    e.preventDefault();
    toggleCross(choice);
  };

  // Submit button handler — answer checking happens securely in Supabase for signed-in users,
  // or client-side for guests (no persistence).
  var handleSubmit = /*#__PURE__*/function () {
    var _handleSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _timeMs, _submittedForId, _yield$_supabase$rpc, _data, _error, _result, timeMs, submittedForId, _yield$_supabase$rpc2, data, error, result;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(answered || !pending || submitting)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            if (authUser) {
              _context3.n = 6;
              break;
            }
            _timeMs = Date.now() - startRef.current;
            setSubmitting(true);
            setSubmitError("");
            _submittedForId = q.id;
            _context3.n = 2;
            return _supabase.rpc("guest_check_answer", {
              p_question_id: q.id,
              p_selected: pending
            });
          case 2:
            _yield$_supabase$rpc = _context3.v;
            _data = _yield$_supabase$rpc.data;
            _error = _yield$_supabase$rpc.error;
            if (!(activeQuestionIdRef.current !== _submittedForId)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2);
          case 3:
            setSubmitting(false);
            if (!_error) {
              _context3.n = 4;
              break;
            }
            setSubmitError(_error.message || "Could not check answer.");
            return _context3.a(2);
          case 4:
            _result = Array.isArray(_data) ? _data[0] : _data;
            if (!(!_result || _result.error)) {
              _context3.n = 5;
              break;
            }
            setSubmitError((_result === null || _result === void 0 ? void 0 : _result.error) || "No result returned.");
            return _context3.a(2);
          case 5:
            setSelected(pending);
            setAnswered(true);
            timer.stop();
            setServerResult({
              is_correct: _result.is_correct,
              correct_answer: _result.correct_answer,
              explanation: _result.explanation || null
            });
            onAnswered && onAnswered({
              questionId: q.id,
              questionTitle: q.title || null,
              questionText: q.question || null,
              topic: q.topic,
              difficulty: q.difficulty,
              selected: pending,
              correctAnswer: _result.correct_answer,
              correct: !!_result.is_correct,
              timeMs: _timeMs,
              explanation: _result.explanation || null,
              tags: q.tags || []
            });
            return _context3.a(2);
          case 6:
            if (attemptSessionId) {
              _context3.n = 7;
              break;
            }
            setSubmitError("Question session is not ready yet. Wait a moment and try again.");
            return _context3.a(2);
          case 7:
            timeMs = Date.now() - startRef.current;
            setSubmitting(true);
            setSubmitError("");
            submittedForId = q.id;
            _context3.n = 8;
            return _supabase.rpc("submit_answer", {
              p_session_id: attemptSessionId,
              p_question_id: q.id,
              p_selected_answer: pending,
              p_time_taken_ms: timeMs
            });
          case 8:
            _yield$_supabase$rpc2 = _context3.v;
            data = _yield$_supabase$rpc2.data;
            error = _yield$_supabase$rpc2.error;
            if (!(activeQuestionIdRef.current !== submittedForId)) {
              _context3.n = 9;
              break;
            }
            return _context3.a(2);
          case 9:
            setSubmitting(false);
            if (!error) {
              _context3.n = 10;
              break;
            }
            setSubmitError(error.message || "Could not submit answer.");
            return _context3.a(2);
          case 10:
            result = Array.isArray(data) ? data[0] : data;
            if (result) {
              _context3.n = 11;
              break;
            }
            setSubmitError("No result returned from Supabase.");
            return _context3.a(2);
          case 11:
            setSelected(pending);
            setAnswered(true);
            timer.stop();
            setServerResult(result);
            onAnswered && onAnswered({
              questionId: q.id,
              questionTitle: q.title || null,
              questionText: q.question || null,
              topic: q.topic,
              difficulty: q.difficulty,
              selected: pending,
              correctAnswer: result.correct_answer,
              correct: !!result.is_correct,
              timeMs: timeMs,
              explanation: result.explanation || null,
              tags: q.tags || []
            });
          case 12:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    function handleSubmit() {
      return _handleSubmit.apply(this, arguments);
    }
    return handleSubmit;
  }();
  var correctAnswer = (serverResult === null || serverResult === void 0 ? void 0 : serverResult.correct_answer) || (prevAnswer === null || prevAnswer === void 0 ? void 0 : prevAnswer.correctAnswer) || null;
  var explanationText = (serverResult === null || serverResult === void 0 ? void 0 : serverResult.explanation) || (prevAnswer === null || prevAnswer === void 0 ? void 0 : prevAnswer.explanation) || null;
  var hasServerResult = answered && !!correctAnswer;
  var choiceLetter = function choiceLetter(choice) {
    var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var s = String(choice || "").trim();
    var m = s.match(/^\(?([A-E])\)?[\s.)-]*/i);
    if (m) return m[1].toUpperCase();
    return idx != null ? String.fromCharCode(65 + idx) : "";
  };
  var normalizeAnswer = function normalizeAnswer(value) {
    var s = String(value || "").trim();
    var m = s.match(/^\(?([A-E])\)?(?:\s|\.|\)|-|$)/i);
    if (m) return m[1].toUpperCase();
    return s.toLowerCase();
  };
  var answerMatches = function answerMatches(choice, answer) {
    var idx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (!choice || !answer) return false;
    var c = String(choice).trim();
    var a = String(answer).trim();
    var cLetter = choiceLetter(c, idx);
    var aNorm = normalizeAnswer(a);
    return c === a || c.toLowerCase() === a.toLowerCase() || cLetter === aNorm;
  };
  var selectedMatchesChoice = function selectedMatchesChoice(choice) {
    var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return selected === choice || answerMatches(choice, selected, idx);
  };
  var isCorrect = answered && ((serverResult === null || serverResult === void 0 ? void 0 : serverResult.is_correct) === true || (prevAnswer === null || prevAnswer === void 0 ? void 0 : prevAnswer.correct) === true || selected && correctAnswer && answerMatches(selected, correctAnswer));
  var choiceClass = function choiceClass(choice) {
    var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var isCrossed = crossed[choice] && !answered;
    var isSelectedChoice = selectedMatchesChoice(choice, idx);
    var isCorrectChoice = isCorrect && isSelectedChoice || answerMatches(choice, correctAnswer, idx);
    if (!answered) {
      if (pending === choice) return "border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-400 cursor-pointer";
      if (isCrossed) return "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 opacity-40 cursor-pointer";
      return "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-600 dark:hover:bg-slate-800";
    }
    if (hasServerResult && isCorrectChoice) return "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300";
    if (isSelectedChoice && !isCorrect) return "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500/50 dark:bg-rose-500/10 dark:text-rose-300";
    return "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600";
  };

  // compute similar questions once
  var similarQuestions = React.useMemo(function () {
    var pool = allQuestions.length > 0 ? allQuestions : [];
    if (pool.length <= 1) return [];
    var others = pool.filter(function (x) {
      return x.id !== q.id;
    });
    var scored = others.map(function (x) {
      var score = 0;
      var sharedTags = (q.tags || []).filter(function (t) {
        return (x.tags || []).includes(t);
      });
      score += sharedTags.length * 10;
      if (x.topic === q.topic) score += 4;
      if (x.difficulty === q.difficulty) score += 2;
      return {
        x: x,
        score: score,
        sharedTags: sharedTags
      };
    });
    scored.sort(function (a, b) {
      return b.score - a.score;
    });
    return scored.slice(0, 3).map(function (s) {
      return _objectSpread(_objectSpread({}, s.x), {}, {
        sharedTags: s.sharedTags
      });
    });
  }, [q.id, allQuestions]);
  return /*#__PURE__*/React.createElement("div", {
    ref: dialogRef,
    tabIndex: -1,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": q.title || 'Practice problem',
    onKeyDown: trapTab,
    className: "fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 overflow-hidden outline-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-7xl mx-auto flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-950 z-10 shadow-sm dark:shadow-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-3 sm:px-5 pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 gap-2 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap min-w-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full flex-shrink-0 ".concat(TOPIC_DOT[q.topic])
  }), q.topic), /*#__PURE__*/React.createElement(DiffPill, {
    d: q.difficulty
  }), q.source && /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
  }, sourceDisplay(q)), q.date_added && /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap"
  }, "Added ", new Date(q.date_added).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 px-3 py-2 rounded-lg border font-mono text-sm font-bold tabular-nums transition-colors\n                ".concat(answered ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500" : "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300")
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 flex-shrink-0",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeWidth: "2",
    d: "M12 6v6l4 2"
  })), timer.fmt), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowReportIssue(true);
    },
    title: "Report a question issue",
    "aria-label": "Report a question issue",
    className: "flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border bg-slate-50 border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-all"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "22",
    x2: "4",
    y2: "15"
  })), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Report")), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleBookmark,
    title: isBookmarked ? "Remove bookmark" : "Bookmark for review",
    className: "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap\n                  ".concat(isBookmarked ? "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-500/15 dark:border-amber-500/40 dark:text-amber-400" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-400")
  }, /*#__PURE__*/React.createElement("span", null, isBookmarked ? "Saved" : "Review Later")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl leading-none transition-colors"
  }, "\xD7"))), q.title && /*#__PURE__*/React.createElement("div", {
    className: "px-3 sm:px-5 pb-2.5 sm:pb-3"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
  }, q.title))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-h-0 overflow-y-auto overscroll-contain ".concat(answered ? "flex flex-col lg:flex-row pb-32 sm:pb-6" : "flex flex-col pb-3")
  }, /*#__PURE__*/React.createElement("div", {
    className: answered ? "lg:flex-1 lg:min-w-0 flex flex-col overflow-y-auto" : "flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 sm:px-6 pt-4 sm:pt-5 pb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-800 dark:text-slate-100 font-medium text-base leading-relaxed whitespace-pre-line"
  }, /*#__PURE__*/React.createElement(MathText, {
    text: q.question
  })), q.image && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex justify-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: q.image,
    alt: "Figure for problem",
    className: "max-w-full sm:max-w-md rounded-xl border border-slate-200 dark:border-slate-700 bg-white"
  }))), !answered && /*#__PURE__*/React.createElement("p", {
    className: "px-4 sm:px-6 pb-2 text-xs text-slate-500 dark:text-slate-400"
  }, "Click to select \xB7 Cross out with right-click or the \u2715 at the right edge \xB7 Press ", /*#__PURE__*/React.createElement("kbd", {
    className: "px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs"
  }, "Submit"), " to check"), /*#__PURE__*/React.createElement("div", {
    className: "px-4 sm:px-6 pb-4 grid gap-2.5"
  }, q.choices.map(function (choice, i) {
    return (
      /*#__PURE__*/
      // Wrapper div, not nesting: the cross-out toggle must be a
      // sibling of the choice button -- a button inside a button is
      // invalid HTML and breaks keyboard activation.
      React.createElement("div", {
        key: i,
        className: "relative"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return handlePick(choice);
        },
        onContextMenu: function onContextMenu(e) {
          return handleCross(e, choice);
        },
        className: "w-full text-left px-3 sm:px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 select-none ".concat(!answered ? "pr-12" : "", " ").concat(choiceClass(choice, i))
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-black relative transition-all\n                      ".concat(answered && (isCorrect && selectedMatchesChoice(choice, i) || answerMatches(choice, correctAnswer, i)) ? "bg-emerald-500 text-white border-2 border-emerald-500" : answered && selectedMatchesChoice(choice, i) && !isCorrect ? "bg-rose-500 text-white border-2 border-rose-500" : pending === choice && !answered ? "bg-blue-500 text-white border-2 border-blue-500" : "border-2 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500", "\n                      ").concat(crossed[choice] && !answered ? "opacity-30" : "")
      }, String.fromCharCode(65 + i), crossed[choice] && !answered && /*#__PURE__*/React.createElement("span", {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none"
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-full h-0.5 bg-current rotate-45 absolute"
      }))), /*#__PURE__*/React.createElement("span", {
        className: crossed[choice] && !answered ? "line-through opacity-50" : ""
      }, /*#__PURE__*/React.createElement(MathText, {
        text: choice.replace(/^\([A-E]\)\s*/, '')
      })), answered && (isCorrect && selectedMatchesChoice(choice, i) || answerMatches(choice, correctAnswer, i)) && /*#__PURE__*/React.createElement("span", {
        className: "ml-auto text-emerald-600 dark:text-emerald-400 font-bold text-base"
      }, "\u2713"), answered && selectedMatchesChoice(choice, i) && !isCorrect && /*#__PURE__*/React.createElement("span", {
        className: "ml-auto text-rose-500 font-bold text-base"
      }, "\u2717")), !answered && /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return toggleCross(choice);
        },
        "aria-pressed": !!crossed[choice],
        "aria-label": crossed[choice] ? "Undo cross out for choice ".concat(String.fromCharCode(65 + i)) : "Cross out choice ".concat(String.fromCharCode(65 + i)),
        title: crossed[choice] ? "Undo cross out" : "Cross out this choice",
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold transition-colors\n                        ".concat(crossed[choice] ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10" : "text-slate-300 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10")
      }, "\u2715"))
    );
  })), !answered && /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-0 z-20 px-4 sm:px-6 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-100 dark:border-slate-800"
  }, submitError && /*#__PURE__*/React.createElement("p", {
    className: "mb-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-lg px-3 py-2"
  }, submitError), /*#__PURE__*/React.createElement("button", {
    onClick: handleSubmit,
    disabled: !pending || submitting,
    className: "w-full py-3 rounded-lg text-sm font-bold transition-all\n                    ".concat(pending && !submitting ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed")
  }, submitting ? "Submitting…" : pending ? "Submit Answer" : "Select an answer first")), answered && /*#__PURE__*/React.createElement("div", {
    className: "mx-4 sm:mx-6 mb-5 rounded-2xl p-6 sm:p-8 border flex flex-col shrink-0\n                ".concat(isCorrect ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30" : "bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30")
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-base mb-3 ".concat(isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300")
  }, isCorrect ? "✓ Correct!" : "\u2717 Incorrect \u2014 Correct: ".concat(correctAnswer), " \xB7 Time: ".concat(timer.fmt)), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed whitespace-normal break-words"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto max-w-full"
  }, /*#__PURE__*/React.createElement(MathText, {
    text: explanationText || ""
  })))), answered && /*#__PURE__*/React.createElement(CommunitySolutions, {
    q: q,
    authUser: authUser,
    answered: answered
  }), /*#__PURE__*/React.createElement("div", {
    className: "px-4 sm:px-6 pb-4 flex flex-wrap gap-1.5"
  }, q.tags.map(function (t) {
    return /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full"
    }, "#", t);
  })), answered && /*#__PURE__*/React.createElement("div", {
    className: "lg:hidden flex flex-col gap-4 px-6 pb-4"
  }, /*#__PURE__*/React.createElement(ProblemSidebarSections, {
    stat: stat,
    notes: notes,
    authUser: authUser,
    noteText: noteText,
    setNoteText: setNoteText,
    saveNote: saveNote,
    deleteNote: deleteNote,
    notesSaving: notesSaving,
    similarQuestions: similarQuestions,
    onOpenQuestion: onOpenQuestion
  }))), answered && /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex flex-col gap-4 w-80 xl:w-96 shrink-0 border-l border-slate-100 dark:border-slate-800 px-5 pt-5 pb-4 overflow-y-auto"
  }, /*#__PURE__*/React.createElement(ProblemSidebarSections, {
    stat: stat,
    notes: notes,
    authUser: authUser,
    noteText: noteText,
    setNoteText: setNoteText,
    saveNote: saveNote,
    deleteNote: deleteNote,
    notesSaving: notesSaving,
    similarQuestions: similarQuestions,
    onOpenQuestion: onOpenQuestion
  }))), showReportIssue && /*#__PURE__*/React.createElement(ReportIssueModal, {
    q: q,
    authUser: authUser,
    onClose: function onClose() {
      return setShowReportIssue(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-slate-950 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onPrev,
    disabled: !hasPrev || submitting,
    className: "w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ".concat(hasPrev && !submitting ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700" : "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed")
  }, "\u2190 Prev"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    disabled: submitting,
    className: "w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ".concat(submitting ? 'text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700')
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    disabled: !hasNext || submitting,
    className: "w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ".concat(hasNext && !submitting ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed")
  }, "Next \u2192"))));
}