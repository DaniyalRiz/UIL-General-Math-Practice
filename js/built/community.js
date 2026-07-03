function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ReportIssueModal(_ref) {
  var q = _ref.q,
    authUser = _ref.authUser,
    onClose = _ref.onClose;
  var ISSUE_TYPES = ['Wrong answer', 'Wrong explanation', 'Typo', 'Image missing', 'Formatting issue', 'Other'];
  var _useState = useState('Wrong answer'),
    _useState2 = _slicedToArray(_useState, 2),
    issueType = _useState2[0],
    setIssueType = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    details = _useState4[0],
    setDetails = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    saving = _useState6[0],
    setSaving = _useState6[1];
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    message = _useState8[0],
    setMessage = _useState8[1];
  var submitReport = /*#__PURE__*/function () {
    var _submitReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _yield$_supabase$from, error;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (authUser) {
              _context.n = 1;
              break;
            }
            setMessage('Please sign in to report an issue.');
            return _context.a(2);
          case 1:
            setSaving(true);
            setMessage('');
            _context.n = 2;
            return _supabase.from('question_reports').insert({
              user_id: authUser.id,
              question_id: q.id,
              issue_type: issueType,
              details: details.trim() || null
            });
          case 2:
            _yield$_supabase$from = _context.v;
            error = _yield$_supabase$from.error;
            setSaving(false);
            if (!error) {
              _context.n = 3;
              break;
            }
            setMessage(error.message || 'Could not submit report.');
            return _context.a(2);
          case 3:
            setMessage('Report submitted. Thanks for helping improve the question bank.');
            setDetails('');
            setTimeout(onClose, 900);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    function submitReport() {
      return _submitReport.apply(this, arguments);
    }
    return submitReport;
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-xl font-black text-slate-900 dark:text-white"
  }, "Report Question Issue"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
  }, q.title || 'Question #' + q.id)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl"
  }, "\xD7")), /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
  }, "Issue type"), /*#__PURE__*/React.createElement("select", {
    value: issueType,
    onChange: function onChange(e) {
      return setIssueType(e.target.value);
    },
    className: "w-full mb-4 px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }, ISSUE_TYPES.map(function (t) {
    return /*#__PURE__*/React.createElement("option", {
      key: t,
      value: t
    }, t);
  })), /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
  }, "Details"), /*#__PURE__*/React.createElement("textarea", {
    value: details,
    onChange: function onChange(e) {
      return setDetails(e.target.value);
    },
    placeholder: "Briefly explain the issue. Example: answer key says C but calculation gives B.",
    rows: 4,
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  }), message && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm ".concat(message.startsWith('Report submitted') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
  }, message), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: submitReport,
    disabled: saving || !authUser,
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(authUser && !saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed')
  }, !authUser ? 'Sign in required' : saving ? 'Submitting…' : 'Submit Report'))));
}
function CommunitySolutions(_ref2) {
  var q = _ref2.q,
    authUser = _ref2.authUser,
    answered = _ref2.answered;
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    open = _useState0[0],
    setOpen = _useState0[1];
  var _useState1 = useState([]),
    _useState10 = _slicedToArray(_useState1, 2),
    solutions = _useState10[0],
    setSolutions = _useState10[1];
  var _useState11 = useState([]),
    _useState12 = _slicedToArray(_useState11, 2),
    votes = _useState12[0],
    setVotes = _useState12[1];
  var _useState13 = useState('Most Upvotes'),
    _useState14 = _slicedToArray(_useState13, 2),
    sortBy = _useState14[0],
    setSortBy = _useState14[1];
  var _useState15 = useState(''),
    _useState16 = _slicedToArray(_useState15, 2),
    text = _useState16[0],
    setText = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    saving = _useState18[0],
    setSaving = _useState18[1];
  var _useState19 = useState(''),
    _useState20 = _slicedToArray(_useState19, 2),
    message = _useState20[0],
    setMessage = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    loading = _useState22[0],
    setLoading = _useState22[1];

  // Auto-open after any submitted answer, correct or wrong.
  useEffect(function () {
    if (answered) setOpen(true);
  }, [answered]);
  var loadSolutions = /*#__PURE__*/function () {
    var _loadSolutions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _yield$_supabase$from2, data, error, visibleRows, ids, voteCounts, _yield$_supabase$from3, voteRows, _yield$_supabase$from4, myVotes;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (q !== null && q !== void 0 && q.id) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setLoading(true);

            // Use the base table first. This is more reliable than relying only on the view.
            _context2.n = 2;
            return _supabase.from('community_solutions').select('id,user_id,question_id,solution_text,display_name,created_at,hidden').eq('question_id', q.id).order('created_at', {
              ascending: false
            });
          case 2:
            _yield$_supabase$from2 = _context2.v;
            data = _yield$_supabase$from2.data;
            error = _yield$_supabase$from2.error;
            if (!error) {
              _context2.n = 3;
              break;
            }
            console.warn('community_solutions load error:', error.message);
            setSolutions([]);
            setLoading(false);
            return _context2.a(2);
          case 3:
            visibleRows = (data || []).filter(function (s) {
              return !s.hidden;
            });
            ids = visibleRows.map(function (s) {
              return s.id;
            });
            voteCounts = {};
            if (!ids.length) {
              _context2.n = 5;
              break;
            }
            _context2.n = 4;
            return _supabase.from('community_solution_votes').select('solution_id').in('solution_id', ids);
          case 4:
            _yield$_supabase$from3 = _context2.v;
            voteRows = _yield$_supabase$from3.data;
            (voteRows || []).forEach(function (v) {
              voteCounts[v.solution_id] = (voteCounts[v.solution_id] || 0) + 1;
            });
          case 5:
            if (!(authUser && ids.length)) {
              _context2.n = 7;
              break;
            }
            _context2.n = 6;
            return _supabase.from('community_solution_votes').select('solution_id').eq('user_id', authUser.id).in('solution_id', ids);
          case 6:
            _yield$_supabase$from4 = _context2.v;
            myVotes = _yield$_supabase$from4.data;
            setVotes((myVotes || []).map(function (v) {
              return v.solution_id;
            }));
            _context2.n = 8;
            break;
          case 7:
            setVotes([]);
          case 8:
            setSolutions(visibleRows.map(function (s) {
              return _objectSpread(_objectSpread({}, s), {}, {
                upvotes: voteCounts[s.id] || 0
              });
            }));
            setLoading(false);
          case 9:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function loadSolutions() {
      return _loadSolutions.apply(this, arguments);
    }
    return loadSolutions;
  }();
  useEffect(function () {
    if (open) loadSolutions();
  }, [open, q.id, authUser === null || authUser === void 0 ? void 0 : authUser.id]);
  var sorted = _toConsumableArray(solutions).sort(function (a, b) {
    if (sortBy === 'Most Recent') return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === 'Oldest First') return new Date(a.created_at) - new Date(b.created_at);
    return (b.upvotes || 0) - (a.upvotes || 0) || new Date(b.created_at) - new Date(a.created_at);
  });
  var saveSolution = /*#__PURE__*/function () {
    var _saveSolution = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _authUser$user_metada, _authUser$email;
      var newSolution, _yield$_supabase$from5, data, error;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (authUser) {
              _context3.n = 1;
              break;
            }
            setMessage('Please sign in to post a solution.');
            return _context3.a(2);
          case 1:
            if (text.trim()) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            setSaving(true);
            setMessage('');
            newSolution = {
              user_id: authUser.id,
              question_id: q.id,
              solution_text: text.trim(),
              display_name: ((_authUser$user_metada = authUser.user_metadata) === null || _authUser$user_metada === void 0 ? void 0 : _authUser$user_metada.display_name) || ((_authUser$email = authUser.email) === null || _authUser$email === void 0 ? void 0 : _authUser$email.split('@')[0]) || 'User'
            };
            _context3.n = 3;
            return _supabase.from('community_solutions').insert(newSolution).select().single();
          case 3:
            _yield$_supabase$from5 = _context3.v;
            data = _yield$_supabase$from5.data;
            error = _yield$_supabase$from5.error;
            setSaving(false);
            if (!error) {
              _context3.n = 4;
              break;
            }
            setMessage(error.message || 'Could not post solution.');
            return _context3.a(2);
          case 4:
            setText('');
            setMessage('Solution posted.');
            setSolutions(function (prev) {
              return [_objectSpread(_objectSpread({}, data || newSolution), {}, {
                id: (data === null || data === void 0 ? void 0 : data.id) || "local-".concat(Date.now()),
                created_at: (data === null || data === void 0 ? void 0 : data.created_at) || new Date().toISOString(),
                upvotes: 0
              })].concat(_toConsumableArray(prev));
            });
          case 5:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    function saveSolution() {
      return _saveSolution.apply(this, arguments);
    }
    return saveSolution;
  }();
  var toggleVote = /*#__PURE__*/function () {
    var _toggleVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(solutionId) {
      var already;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!(!authUser || String(solutionId).startsWith('local-'))) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            already = votes.includes(solutionId);
            if (!already) {
              _context4.n = 3;
              break;
            }
            _context4.n = 2;
            return _supabase.from('community_solution_votes').delete().eq('user_id', authUser.id).eq('solution_id', solutionId);
          case 2:
            _context4.n = 4;
            break;
          case 3:
            _context4.n = 4;
            return _supabase.from('community_solution_votes').insert({
              user_id: authUser.id,
              solution_id: solutionId
            });
          case 4:
            _context4.n = 5;
            return loadSolutions();
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    function toggleVote(_x) {
      return _toggleVote.apply(this, arguments);
    }
    return toggleVote;
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "mx-4 sm:mx-6 mb-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-visible"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    },
    className: "w-full px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-slate-800 dark:text-slate-100"
  }, "Community Solutions"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, "View, post, and discuss solution methods. LaTeX works with \\\\( ... \\\\) and \\\\[ ... \\\\].")), /*#__PURE__*/React.createElement("span", {
    className: "shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400"
  }, open ? 'Hide' : 'Show')), open ? /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-white dark:bg-slate-900 rounded-b-2xl"
  }, !authUser ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "text-blue-600 dark:text-blue-400 hover:underline"
  }, "Sign in"), " to view or post community solutions.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pt-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2"
  }, "Add your solution or comment"), /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: function onChange(e) {
      return setText(e.target.value);
    },
    placeholder: "Type your method, shortcut, or question. Use \\\\(x^2\\\\), \\\\frac{a}{b}, \\\\sqrt{x}, etc. for math.",
    rows: 4,
    className: "w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 resize-y min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex flex-col sm:flex-row sm:items-center gap-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500 flex-1"
  }, "Tip: write math as ", /*#__PURE__*/React.createElement("code", null, "\\\\(x^2+1\\\\)"), "."), /*#__PURE__*/React.createElement("button", {
    onClick: saveSolution,
    disabled: saving || !text.trim(),
    className: "w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-semibold ".concat(text.trim() && !saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed')
  }, saving ? 'Posting…' : 'Post Solution')), message && /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-xs ".concat(message.includes('posted') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
  }, message)), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-200 dark:border-slate-800 pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, loading ? 'Loading solutions…' : "".concat(solutions.length, " solution").concat(solutions.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("select", {
    value: sortBy,
    onChange: function onChange(e) {
      return setSortBy(e.target.value);
    },
    className: "px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
  }, /*#__PURE__*/React.createElement("option", null, "Most Upvotes"), /*#__PURE__*/React.createElement("option", null, "Most Recent"), /*#__PURE__*/React.createElement("option", null, "Oldest First"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, loading ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 dark:text-slate-500 py-4 text-center"
  }, "Loading community solutions\u2026") : sorted.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 dark:text-slate-500 py-4 text-center"
  }, "No community solutions yet. Be the first to add one.") : sorted.map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return toggleVote(s.id);
      },
      className: "shrink-0 px-2 py-1 rounded-lg text-xs font-bold border transition-colors ".concat(votes.includes(s.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400')
    }, "\u25B2 ", s.upvotes || 0), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 mb-1"
    }, s.display_name || 'User', " \xB7 ", new Date(s.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: s.solution_text
    })))));
  }))))) : null);
}