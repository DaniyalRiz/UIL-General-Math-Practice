function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function AdminUserActivity(_ref) {
  var authUser = _ref.authUser;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    attempts = _useState4[0],
    setAttempts = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    solutions = _useState6[0],
    setSolutions = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    reports = _useState8[0],
    setReports = _useState8[1];
  var _useState9 = useState([]),
    _useState0 = _slicedToArray(_useState9, 2),
    questions = _useState0[0],
    setQuestions = _useState0[1];
  var _useState1 = useState(''),
    _useState10 = _slicedToArray(_useState1, 2),
    error = _useState10[0],
    setError = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedQuestion = _useState12[0],
    setSelectedQuestion = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedUser = _useState14[0],
    setSelectedUser = _useState14[1];
  var isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  useEffect(function () {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([_supabase.rpc('admin_attempts_with_users'), _supabase.from('community_solutions_with_votes').select('*').order('created_at', {
      ascending: false
    }).limit(1000), _supabase.from('question_reports').select('*').order('created_at', {
      ascending: false
    }).limit(1000), _supabase.from('public_questions').select('id,title,topic,difficulty,source').limit(5000)]).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 4),
        a = _ref3[0],
        s = _ref3[1],
        r = _ref3[2],
        q = _ref3[3];
      if (a.error || s.error || r.error || q.error) {
        var _a$error, _s$error, _r$error, _q$error;
        setError(((_a$error = a.error) === null || _a$error === void 0 ? void 0 : _a$error.message) || ((_s$error = s.error) === null || _s$error === void 0 ? void 0 : _s$error.message) || ((_r$error = r.error) === null || _r$error === void 0 ? void 0 : _r$error.message) || ((_q$error = q.error) === null || _q$error === void 0 ? void 0 : _q$error.message));
      }
      setAttempts(a.data || []);
      setSolutions(s.data || []);
      setReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);
  if (!isAdmin) return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-slate-800 dark:text-slate-100"
  }, "Admin only"));
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  }));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300"
  }, "Error loading admin activity: ", error, /*#__PURE__*/React.createElement("p", {
    className: "text-sm mt-2"
  }, "Make sure you ran ", /*#__PURE__*/React.createElement("code", null, "admin_activity_rpc.sql"), " in Supabase."));
  var now = new Date();
  var sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  var qMap = {};
  questions.forEach(function (q) {
    return qMap[q.id] = q;
  });
  var displayUser = function displayUser(u) {
    return u.display_name || u.user_email || u.user_id;
  };
  var users = {};
  attempts.forEach(function (a) {
    var id = a.user_id || 'unknown';
    if (!users[id]) users[id] = {
      user_id: id,
      user_email: a.user_email || '',
      display_name: a.display_name || '',
      attempts: 0,
      correct: 0,
      totalMs: 0,
      lastActive: null,
      rows: []
    };
    users[id].attempts++;
    if (a.is_correct) users[id].correct++;
    users[id].totalMs += a.time_taken_ms || 0;
    users[id].rows.push(a);
    var d = new Date(a.created_at);
    if (!users[id].lastActive || d > users[id].lastActive) users[id].lastActive = d;
  });
  var userRows = Object.values(users).map(function (u) {
    return _objectSpread(_objectSpread({}, u), {}, {
      accuracy: u.attempts ? Math.round(100 * u.correct / u.attempts) : 0,
      avgMs: u.attempts ? Math.round(u.totalMs / u.attempts) : 0
    });
  }).sort(function (a, b) {
    return b.attempts - a.attempts;
  });
  var active7 = userRows.filter(function (u) {
    return u.lastActive && u.lastActive >= sevenDaysAgo;
  }).length;
  attempts.forEach(function (a) {
    var id = a.question_id;
    if (!qMap[id]) qMap[id] = {
      id: id,
      title: a.question_title || 'Question #' + id,
      topic: a.topic,
      difficulty: a.difficulty
    };
    if (!qMap[id].stats) qMap[id].stats = {
      attempts: 0,
      wrong: 0,
      correct: 0,
      totalMs: 0,
      rows: []
    };
    qMap[id].stats.attempts++;
    if (!a.is_correct) qMap[id].stats.wrong++;
    if (a.is_correct) qMap[id].stats.correct++;
    qMap[id].stats.totalMs += a.time_taken_ms || 0;
    qMap[id].stats.rows.push(a);
  });
  var questionStats = Object.values(qMap).filter(function (q) {
    return q.stats && q.stats.attempts > 0;
  }).map(function (q) {
    return _objectSpread(_objectSpread({}, q), {}, {
      attempts: q.stats.attempts,
      wrong: q.stats.wrong,
      correct: q.stats.correct,
      missRate: Math.round(100 * q.stats.wrong / q.stats.attempts),
      accuracy: Math.round(100 * q.stats.correct / q.stats.attempts),
      avgMs: Math.round(q.stats.totalMs / q.stats.attempts),
      rows: q.stats.rows
    });
  });
  var mostAttempted = _toConsumableArray(questionStats).sort(function (a, b) {
    return b.attempts - a.attempts;
  }).slice(0, 10);
  var mostMissed = _toConsumableArray(questionStats).filter(function (q) {
    return q.attempts >= 2;
  }).sort(function (a, b) {
    return b.missRate - a.missRate || b.wrong - a.wrong;
  }).slice(0, 10);
  var slowest = _toConsumableArray(questionStats).filter(function (q) {
    return q.attempts >= 2;
  }).sort(function (a, b) {
    return b.avgMs - a.avgMs;
  }).slice(0, 10);
  var recentAttempts = attempts.slice(0, 25);
  var updateReportStatus = /*#__PURE__*/function () {
    var _updateReportStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(reportId, status) {
      var _yield$_supabase$from, error;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _supabase.from('question_reports').update({
              status: status
            }).eq('id', reportId);
          case 1:
            _yield$_supabase$from = _context.v;
            error = _yield$_supabase$from.error;
            if (!error) {
              _context.n = 2;
              break;
            }
            alert(error.message || 'Could not update report.');
            return _context.a(2);
          case 2:
            setReports(function (prev) {
              return prev.map(function (r) {
                return r.id === reportId ? _objectSpread(_objectSpread({}, r), {}, {
                  status: status
                }) : r;
              });
            });
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    function updateReportStatus(_x, _x2) {
      return _updateReportStatus.apply(this, arguments);
    }
    return updateReportStatus;
  }();
  var deleteReport = /*#__PURE__*/function () {
    var _deleteReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(reportId) {
      var _yield$_supabase$from2, error;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (confirm('Delete this report?')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.n = 2;
            return _supabase.from('question_reports').delete().eq('id', reportId);
          case 2:
            _yield$_supabase$from2 = _context2.v;
            error = _yield$_supabase$from2.error;
            if (!error) {
              _context2.n = 3;
              break;
            }
            alert(error.message || 'Could not delete report.');
            return _context2.a(2);
          case 3:
            setReports(function (prev) {
              return prev.filter(function (r) {
                return r.id !== reportId;
              });
            });
          case 4:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function deleteReport(_x3) {
      return _deleteReport.apply(this, arguments);
    }
    return deleteReport;
  }();
  var Card = function Card(_ref4) {
    var label = _ref4.label,
      value = _ref4.value,
      sub = _ref4.sub;
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-2xl font-black text-slate-900 dark:text-white"
    }, value), /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1"
    }, label), sub && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
    }, sub));
  };
  var QuestionLink = function QuestionLink(_ref5) {
    var q = _ref5.q,
      children = _ref5.children;
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedQuestion(q);
      },
      className: "text-left font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors truncate"
    }, children || q.title || 'Question #' + q.id);
  };
  var UserLink = function UserLink(_ref6) {
    var u = _ref6.u;
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedUser(u);
      },
      className: "text-left font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors truncate"
    }, displayUser(u));
  };
  var MiniTable = function MiniTable(_ref7) {
    var title = _ref7.title,
      rows = _ref7.rows,
      type = _ref7.type;
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-4 py-3 border-b border-slate-200 dark:border-slate-800"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-slate-800 dark:text-slate-100"
    }, title)), /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-slate-100 dark:divide-slate-800"
    }, rows.length === 0 ? /*#__PURE__*/React.createElement("p", {
      className: "p-4 text-sm text-slate-400"
    }, "No data yet.") : rows.map(function (row, i) {
      var _row$missRate;
      return /*#__PURE__*/React.createElement("div", {
        key: row.id || row.user_id || i,
        className: "px-4 py-3"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-sm truncate"
      }, type === 'user' ? /*#__PURE__*/React.createElement(UserLink, {
        u: row
      }) : /*#__PURE__*/React.createElement(QuestionLink, {
        q: row
      })), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
      }, type === 'user' ? "".concat(row.attempts, " attempts \xB7 ").concat(row.accuracy, "% accuracy \xB7 avg ").concat(fmtTime(row.avgMs), " \xB7 last ").concat(row.lastActive ? row.lastActive.toLocaleDateString() : '—') : "".concat(row.attempts, " attempts \xB7 ").concat((_row$missRate = row.missRate) !== null && _row$missRate !== void 0 ? _row$missRate : 0, "% missed \xB7 avg ").concat(fmtTime(row.avgMs || 0), " \xB7 ").concat(row.topic || '')));
    })));
  };
  var UserModal = function UserModal(_ref8) {
    var u = _ref8.u,
      onClose = _ref8.onClose;
    var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      deleting = _useState16[0],
      setDeleting = _useState16[1];
    var _useState17 = useState(''),
      _useState18 = _slicedToArray(_useState17, 2),
      deleteMessage = _useState18[0],
      setDeleteMessage = _useState18[1];
    var _useState19 = useState(''),
      _useState20 = _slicedToArray(_useState19, 2),
      rangeStart = _useState20[0],
      setRangeStart = _useState20[1];
    var _useState21 = useState(''),
      _useState22 = _slicedToArray(_useState21, 2),
      rangeEnd = _useState22[0],
      setRangeEnd = _useState22[1];
    var topicMap = {};
    var colMap = {};
    u.rows.forEach(function (r) {
      if (!topicMap[r.topic]) topicMap[r.topic] = {
        attempts: 0,
        correct: 0
      };
      topicMap[r.topic].attempts++;
      if (r.is_correct) topicMap[r.topic].correct++;
      var col = getColumnCategory(r);
      if (col) {
        if (!colMap[col]) colMap[col] = {
          attempts: 0,
          correct: 0
        };
        colMap[col].attempts++;
        if (r.is_correct) colMap[col].correct++;
      }
    });
    var topicRows = Object.entries(topicMap).map(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 2),
        topic = _ref0[0],
        v = _ref0[1];
      return _objectSpread(_objectSpread({
        topic: topic
      }, v), {}, {
        accuracy: Math.round(100 * v.correct / v.attempts)
      });
    }).sort(function (a, b) {
      return a.accuracy - b.accuracy;
    });
    var colRows = ['Column 1', 'Column 2', 'Column 3'].map(function (c) {
      var v = colMap[c] || {
        attempts: 0,
        correct: 0
      };
      return _objectSpread(_objectSpread({
        column: c
      }, v), {}, {
        accuracy: v.attempts ? Math.round(100 * v.correct / v.attempts) : 0
      });
    });
    var deleteAttempts = /*#__PURE__*/function () {
      var _deleteAttempts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var ok, _yield$_supabase$rpc, data, error;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              ok = confirm("Delete ALL attempts for ".concat(displayUser(u), "? This cannot be undone."));
              if (ok) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              setDeleting(true);
              setDeleteMessage('');
              _context3.n = 2;
              return _supabase.rpc('admin_delete_user_attempts', {
                p_user_id: u.user_id
              });
            case 2:
              _yield$_supabase$rpc = _context3.v;
              data = _yield$_supabase$rpc.data;
              error = _yield$_supabase$rpc.error;
              setDeleting(false);
              if (!error) {
                _context3.n = 3;
                break;
              }
              setDeleteMessage(error.message || 'Could not delete attempts.');
              return _context3.a(2);
            case 3:
              setDeleteMessage("Deleted ".concat(data, " attempts. Refreshing\u2026"));
              setTimeout(function () {
                return window.location.reload();
              }, 800);
            case 4:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function deleteAttempts() {
        return _deleteAttempts.apply(this, arguments);
      }
      return deleteAttempts;
    }();
    var deleteAllSiteData = /*#__PURE__*/function () {
      var _deleteAllSiteData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var ok, _yield$_supabase$rpc2, data, error;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              ok = confirm("Delete ALL site data for ".concat(displayUser(u), "? This includes attempts, notes, reports, votes, and community solutions. This cannot be undone."));
              if (ok) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              setDeleting(true);
              setDeleteMessage('');
              _context4.n = 2;
              return _supabase.rpc('admin_delete_user_site_data', {
                p_user_id: u.user_id
              });
            case 2:
              _yield$_supabase$rpc2 = _context4.v;
              data = _yield$_supabase$rpc2.data;
              error = _yield$_supabase$rpc2.error;
              setDeleting(false);
              if (!error) {
                _context4.n = 3;
                break;
              }
              setDeleteMessage(error.message || 'Could not delete user data.');
              return _context4.a(2);
            case 3:
              setDeleteMessage("Deleted user site data: ".concat(JSON.stringify(data), ". Refreshing\u2026"));
              setTimeout(function () {
                return window.location.reload();
              }, 1000);
            case 4:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      function deleteAllSiteData() {
        return _deleteAllSiteData.apply(this, arguments);
      }
      return deleteAllSiteData;
    }();
    var deleteRange = /*#__PURE__*/function () {
      var _deleteRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var ok, _yield$_supabase$rpc3, data, error;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!rangeStart || !rangeEnd)) {
                _context5.n = 1;
                break;
              }
              setDeleteMessage('Choose both start and end times.');
              return _context5.a(2);
            case 1:
              ok = confirm("Delete attempts by ".concat(displayUser(u), " from ").concat(rangeStart, " to ").concat(rangeEnd, "?"));
              if (ok) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2);
            case 2:
              setDeleting(true);
              setDeleteMessage('');
              _context5.n = 3;
              return _supabase.rpc('admin_delete_user_attempts_between', {
                p_user_id: u.user_id,
                p_start: new Date(rangeStart).toISOString(),
                p_end: new Date(rangeEnd).toISOString()
              });
            case 3:
              _yield$_supabase$rpc3 = _context5.v;
              data = _yield$_supabase$rpc3.data;
              error = _yield$_supabase$rpc3.error;
              setDeleting(false);
              if (!error) {
                _context5.n = 4;
                break;
              }
              setDeleteMessage(error.message || 'Could not delete attempts in range.');
              return _context5.a(2);
            case 4:
              setDeleteMessage("Deleted ".concat(data, " attempts in that time range. Refreshing\u2026"));
              setTimeout(function () {
                return window.location.reload();
              }, 900);
            case 5:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function deleteRange() {
        return _deleteRange.apply(this, arguments);
      }
      return deleteRange;
    }();
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[70] flex items-center justify-center p-4",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between gap-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-display text-2xl font-black text-slate-900 dark:text-white"
    }, displayUser(u)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400"
    }, u.user_email || u.user_id)), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      className: "w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl"
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "p-5 space-y-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 md:grid-cols-4 gap-3"
    }, /*#__PURE__*/React.createElement(Card, {
      label: "Attempts",
      value: u.attempts
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Accuracy",
      value: u.accuracy + '%'
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Avg Time",
      value: fmtTime(u.avgMs)
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Last Active",
      value: u.lastActive ? u.lastActive.toLocaleDateString() : '—'
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-rose-800 dark:text-rose-300 mb-2"
    }, "Admin Data Management"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-rose-700 dark:text-rose-300 mb-3"
    }, "Use this to clean spam data. It does not delete the user's Supabase Auth account; it deletes stored site activity."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-2 mb-4"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: deleteAttempts,
      disabled: deleting,
      className: "px-3 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
    }, "Delete All Attempts"), /*#__PURE__*/React.createElement("button", {
      onClick: deleteAllSiteData,
      disabled: deleting,
      className: "px-3 py-2 rounded-lg text-xs font-bold bg-red-700 hover:bg-red-800 text-white disabled:opacity-50"
    }, "Delete All User Site Data")), /*#__PURE__*/React.createElement("div", {
      className: "grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-1"
    }, "Start"), /*#__PURE__*/React.createElement("input", {
      type: "datetime-local",
      value: rangeStart,
      onChange: function onChange(e) {
        return setRangeStart(e.target.value);
      },
      className: "w-full px-2 py-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-1"
    }, "End"), /*#__PURE__*/React.createElement("input", {
      type: "datetime-local",
      value: rangeEnd,
      onChange: function onChange(e) {
        return setRangeEnd(e.target.value);
      },
      className: "w-full px-2 py-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: deleteRange,
      disabled: deleting,
      className: "px-3 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
    }, "Delete Range")), deleteMessage && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-rose-700 dark:text-rose-300 mt-3"
    }, deleteMessage)), /*#__PURE__*/React.createElement("div", {
      className: "grid md:grid-cols-2 gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 p-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold mb-3"
    }, "Column Performance"), colRows.map(function (c) {
      return /*#__PURE__*/React.createElement("p", {
        key: c.column,
        className: "text-sm text-slate-600 dark:text-slate-300 mb-1"
      }, c.column, ": ", c.correct, "/", c.attempts, " \xB7 ", c.accuracy, "%");
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 p-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold mb-3"
    }, "Weakest Topics"), topicRows.slice(0, 5).map(function (t) {
      return /*#__PURE__*/React.createElement("p", {
        key: t.topic,
        className: "text-sm text-slate-600 dark:text-slate-300 mb-1"
      }, t.topic, ": ", t.correct, "/", t.attempts, " \xB7 ", t.accuracy, "%");
    }))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold p-4 border-b border-slate-200 dark:border-slate-800"
    }, "Recent Activity"), /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-slate-100 dark:divide-slate-800"
    }, u.rows.slice(0, 25).map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.id,
        className: "px-4 py-3"
      }, /*#__PURE__*/React.createElement(QuestionLink, {
        q: qMap[r.question_id] || {
          id: r.question_id,
          title: r.question_title
        }
      }), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
      }, r.is_correct ? 'Correct' : 'Wrong', " \xB7 ", fmtTime(r.time_taken_ms || 0), " \xB7 ", new Date(r.created_at).toLocaleString()));
    }))))));
  };
  var QuestionModal = function QuestionModal(_ref1) {
    var q = _ref1.q,
      onClose = _ref1.onClose;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[70] flex items-center justify-center p-4",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between gap-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-display text-2xl font-black text-slate-900 dark:text-white"
    }, q.title || 'Question #' + q.id), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400"
    }, q.topic, " \xB7 ", q.difficulty)), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      className: "w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl"
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "p-5 space-y-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 md:grid-cols-4 gap-3"
    }, /*#__PURE__*/React.createElement(Card, {
      label: "Attempts",
      value: q.attempts
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Accuracy",
      value: q.accuracy + '%'
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Miss Rate",
      value: q.missRate + '%'
    }), /*#__PURE__*/React.createElement(Card, {
      label: "Avg Time",
      value: fmtTime(q.avgMs)
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold p-4 border-b border-slate-200 dark:border-slate-800"
    }, "Recent Attempts"), /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-slate-100 dark:divide-slate-800"
    }, (q.rows || []).slice(0, 30).map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.id,
        className: "px-4 py-3"
      }, /*#__PURE__*/React.createElement(UserLink, {
        u: users[r.user_id] || {
          user_id: r.user_id,
          user_email: r.user_email,
          display_name: r.display_name
        }
      }), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
      }, r.is_correct ? 'Correct' : 'Wrong', " \xB7 ", fmtTime(r.time_taken_ms || 0), " \xB7 ", new Date(r.created_at).toLocaleString()));
    }))))));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-5 gap-3"
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Total Users",
    value: userRows.length
  }), /*#__PURE__*/React.createElement(Card, {
    label: "Active 7 Days",
    value: active7
  }), /*#__PURE__*/React.createElement(Card, {
    label: "Total Attempts",
    value: attempts.length
  }), /*#__PURE__*/React.createElement(Card, {
    label: "Community Solutions",
    value: solutions.length
  }), /*#__PURE__*/React.createElement(Card, {
    label: "Question Reports",
    value: reports.length,
    sub: "".concat(reports.filter(function (r) {
      return r.status === 'open';
    }).length, " open")
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    title: "Users by Practice Volume",
    rows: userRows.slice(0, 15),
    type: "user"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-slate-800 dark:text-slate-100"
  }, "Recent Attempts")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, recentAttempts.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "p-4 text-sm text-slate-400"
  }, "No attempts yet.") : recentAttempts.map(function (a) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.id,
      className: "px-4 py-3"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm truncate"
    }, /*#__PURE__*/React.createElement(QuestionLink, {
      q: qMap[a.question_id] || {
        id: a.question_id,
        title: a.question_title
      }
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
    }, /*#__PURE__*/React.createElement(UserLink, {
      u: users[a.user_id] || {
        user_id: a.user_id,
        user_email: a.user_email,
        display_name: a.display_name
      }
    }), " \xB7 ", a.is_correct ? 'Correct' : 'Wrong', " \xB7 ", fmtTime(a.time_taken_ms || 0), " \xB7 ", new Date(a.created_at).toLocaleString()));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    title: "Most Attempted Questions",
    rows: mostAttempted
  }), /*#__PURE__*/React.createElement(MiniTable, {
    title: "Most Missed Questions",
    rows: mostMissed
  }), /*#__PURE__*/React.createElement(MiniTable, {
    title: "Slowest Questions",
    rows: slowest
  })), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-slate-800 dark:text-slate-100"
  }, "Question Issue Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, reports.length, " total \xB7 ", reports.filter(function (r) {
    return r.status === 'open';
  }).length, " open"))), reports.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "p-6 text-sm text-slate-400"
  }, "No issue reports yet.") : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, reports.slice(0, 50).map(function (r) {
    var q = qMap[r.question_id] || {
      id: r.question_id,
      title: 'Question #' + r.question_id
    };
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "px-4 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedQuestion(q);
      },
      className: "text-left text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    }, q.title || 'Question #' + r.question_id), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
    }, r.issue_type, " \xB7 ", r.status, " \xB7 ", new Date(r.created_at).toLocaleString()), r.details && /*#__PURE__*/React.createElement("p", {
      className: "mt-2 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
    }, r.details)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, /*#__PURE__*/React.createElement("select", {
      value: r.status || 'open',
      onChange: function onChange(e) {
        return updateReportStatus(r.id, e.target.value);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
    }, /*#__PURE__*/React.createElement("option", {
      value: "open"
    }, "open"), /*#__PURE__*/React.createElement("option", {
      value: "reviewing"
    }, "reviewing"), /*#__PURE__*/React.createElement("option", {
      value: "resolved"
    }, "resolved"), /*#__PURE__*/React.createElement("option", {
      value: "dismissed"
    }, "dismissed")), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteReport(r.id);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10"
    }, "Delete"))));
  }))), selectedUser && /*#__PURE__*/React.createElement(UserModal, {
    u: selectedUser,
    onClose: function onClose() {
      return setSelectedUser(null);
    }
  }), selectedQuestion && /*#__PURE__*/React.createElement(QuestionModal, {
    q: selectedQuestion,
    onClose: function onClose() {
      return setSelectedQuestion(null);
    }
  }));
}
function AdminReports(_ref10) {
  var authUser = _ref10.authUser;
  var _useState23 = useState([]),
    _useState24 = _slicedToArray(_useState23, 2),
    reports = _useState24[0],
    setReports = _useState24[1];
  var _useState25 = useState([]),
    _useState26 = _slicedToArray(_useState25, 2),
    questions = _useState26[0],
    setQuestions = _useState26[1];
  var _useState27 = useState(true),
    _useState28 = _slicedToArray(_useState27, 2),
    loading = _useState28[0],
    setLoading = _useState28[1];
  var _useState29 = useState(''),
    _useState30 = _slicedToArray(_useState29, 2),
    error = _useState30[0],
    setError = _useState30[1];
  var isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  useEffect(function () {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([_supabase.from('question_reports').select('*').order('created_at', {
      ascending: false
    }).limit(500), _supabase.from('public_questions').select('id,title,topic,difficulty').limit(5000)]).then(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
        r = _ref12[0],
        q = _ref12[1];
      if (r.error || q.error) {
        var _r$error2, _q$error2;
        setError(((_r$error2 = r.error) === null || _r$error2 === void 0 ? void 0 : _r$error2.message) || ((_q$error2 = q.error) === null || _q$error2 === void 0 ? void 0 : _q$error2.message));
      }
      setReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);
  var updateStatus = /*#__PURE__*/function () {
    var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(reportId, status) {
      var _yield$_supabase$from3, error;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return _supabase.from('question_reports').update({
              status: status
            }).eq('id', reportId);
          case 1:
            _yield$_supabase$from3 = _context6.v;
            error = _yield$_supabase$from3.error;
            if (!error) {
              _context6.n = 2;
              break;
            }
            alert(error.message);
            return _context6.a(2);
          case 2:
            setReports(function (prev) {
              return prev.map(function (r) {
                return r.id === reportId ? _objectSpread(_objectSpread({}, r), {}, {
                  status: status
                }) : r;
              });
            });
          case 3:
            return _context6.a(2);
        }
      }, _callee6);
    }));
    function updateStatus(_x4, _x5) {
      return _updateStatus.apply(this, arguments);
    }
    return updateStatus;
  }();
  var deleteReport = /*#__PURE__*/function () {
    var _deleteReport2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(reportId) {
      var _yield$_supabase$from4, error;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (confirm('Delete this report?')) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            _context7.n = 2;
            return _supabase.from('question_reports').delete().eq('id', reportId);
          case 2:
            _yield$_supabase$from4 = _context7.v;
            error = _yield$_supabase$from4.error;
            if (!error) {
              _context7.n = 3;
              break;
            }
            alert(error.message);
            return _context7.a(2);
          case 3:
            setReports(function (prev) {
              return prev.filter(function (r) {
                return r.id !== reportId;
              });
            });
          case 4:
            return _context7.a(2);
        }
      }, _callee7);
    }));
    function deleteReport(_x6) {
      return _deleteReport2.apply(this, arguments);
    }
    return deleteReport;
  }();
  if (!isAdmin) return null;
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  }));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300"
  }, "Error: ", error);
  var qMap = {};
  questions.forEach(function (q) {
    return qMap[q.id] = q;
  });
  var openCount = reports.filter(function (r) {
    return r.status === 'open';
  }).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg text-slate-800 dark:text-slate-100"
  }, "Question Issue Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, reports.length, " total \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "text-rose-600 dark:text-rose-400 font-semibold"
  }, openCount, " open"))), openCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold"
  }, openCount, " need review")), reports.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-16 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300"
  }, "No issue reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1"
  }, "Reports submitted by users will appear here.")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, reports.map(function (r) {
    var q = qMap[r.question_id] || {
      id: r.question_id,
      title: 'Question #' + r.question_id
    };
    var statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "px-5 py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold uppercase tracking-wider ".concat(statusColor)
    }, r.status || 'open'), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, "\xB7"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
    }, r.issue_type), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, new Date(r.created_at).toLocaleString())), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-slate-800 dark:text-slate-100 mb-1"
    }, q.title || 'Question #' + r.question_id), q.topic && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 mb-2"
    }, q.topic, " \xB7 ", q.difficulty), r.details && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap"
    }, r.details))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, /*#__PURE__*/React.createElement("select", {
      value: r.status || 'open',
      onChange: function onChange(e) {
        return updateStatus(r.id, e.target.value);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
    }, /*#__PURE__*/React.createElement("option", {
      value: "open"
    }, "open"), /*#__PURE__*/React.createElement("option", {
      value: "reviewing"
    }, "reviewing"), /*#__PURE__*/React.createElement("option", {
      value: "resolved"
    }, "resolved"), /*#__PURE__*/React.createElement("option", {
      value: "dismissed"
    }, "dismissed")), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteReport(r.id);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10"
    }, "Delete"))));
  })));
}
function AdminBugReports(_ref13) {
  var authUser = _ref13.authUser;
  var _useState31 = useState([]),
    _useState32 = _slicedToArray(_useState31, 2),
    reports = _useState32[0],
    setReports = _useState32[1];
  var _useState33 = useState([]),
    _useState34 = _slicedToArray(_useState33, 2),
    questionReports = _useState34[0],
    setQuestionReports = _useState34[1];
  var _useState35 = useState([]),
    _useState36 = _slicedToArray(_useState35, 2),
    questions = _useState36[0],
    setQuestions = _useState36[1];
  var _useState37 = useState(true),
    _useState38 = _slicedToArray(_useState37, 2),
    loading = _useState38[0],
    setLoading = _useState38[1];
  var _useState39 = useState(''),
    _useState40 = _slicedToArray(_useState39, 2),
    error = _useState40[0],
    setError = _useState40[1];
  var isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  useEffect(function () {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([_supabase.from('bug_reports').select('*').order('created_at', {
      ascending: false
    }).limit(500), _supabase.from('question_reports').select('*').order('created_at', {
      ascending: false
    }).limit(500), _supabase.from('public_questions').select('id,title,topic,difficulty').limit(5000)]).then(function (_ref14) {
      var _b$error, _r$error3, _q$error3;
      var _ref15 = _slicedToArray(_ref14, 3),
        b = _ref15[0],
        r = _ref15[1],
        q = _ref15[2];
      if (b.error || r.error || q.error) setError(((_b$error = b.error) === null || _b$error === void 0 ? void 0 : _b$error.message) || ((_r$error3 = r.error) === null || _r$error3 === void 0 ? void 0 : _r$error3.message) || ((_q$error3 = q.error) === null || _q$error3 === void 0 ? void 0 : _q$error3.message));
      setReports(b.data || []);
      setQuestionReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);
  var updateBugStatus = /*#__PURE__*/function () {
    var _updateBugStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(reportId, status) {
      var _yield$_supabase$from5, error;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return _supabase.from('bug_reports').update({
              status: status
            }).eq('id', reportId);
          case 1:
            _yield$_supabase$from5 = _context8.v;
            error = _yield$_supabase$from5.error;
            if (!error) {
              _context8.n = 2;
              break;
            }
            alert(error.message);
            return _context8.a(2);
          case 2:
            setReports(function (prev) {
              return prev.map(function (r) {
                return r.id === reportId ? _objectSpread(_objectSpread({}, r), {}, {
                  status: status
                }) : r;
              });
            });
          case 3:
            return _context8.a(2);
        }
      }, _callee8);
    }));
    function updateBugStatus(_x7, _x8) {
      return _updateBugStatus.apply(this, arguments);
    }
    return updateBugStatus;
  }();
  var deleteBugReport = /*#__PURE__*/function () {
    var _deleteBugReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(reportId) {
      var _yield$_supabase$from6, error;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            if (confirm('Delete this report?')) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            _context9.n = 2;
            return _supabase.from('bug_reports').delete().eq('id', reportId);
          case 2:
            _yield$_supabase$from6 = _context9.v;
            error = _yield$_supabase$from6.error;
            if (!error) {
              _context9.n = 3;
              break;
            }
            alert(error.message);
            return _context9.a(2);
          case 3:
            setReports(function (prev) {
              return prev.filter(function (r) {
                return r.id !== reportId;
              });
            });
          case 4:
            return _context9.a(2);
        }
      }, _callee9);
    }));
    function deleteBugReport(_x9) {
      return _deleteBugReport.apply(this, arguments);
    }
    return deleteBugReport;
  }();
  var updateQuestionReportStatus = /*#__PURE__*/function () {
    var _updateQuestionReportStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(reportId, status) {
      var _yield$_supabase$from7, error;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            _context0.n = 1;
            return _supabase.from('question_reports').update({
              status: status
            }).eq('id', reportId);
          case 1:
            _yield$_supabase$from7 = _context0.v;
            error = _yield$_supabase$from7.error;
            if (!error) {
              _context0.n = 2;
              break;
            }
            alert(error.message);
            return _context0.a(2);
          case 2:
            setQuestionReports(function (prev) {
              return prev.map(function (r) {
                return r.id === reportId ? _objectSpread(_objectSpread({}, r), {}, {
                  status: status
                }) : r;
              });
            });
          case 3:
            return _context0.a(2);
        }
      }, _callee0);
    }));
    function updateQuestionReportStatus(_x0, _x1) {
      return _updateQuestionReportStatus.apply(this, arguments);
    }
    return updateQuestionReportStatus;
  }();
  var deleteQuestionReport = /*#__PURE__*/function () {
    var _deleteQuestionReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(reportId) {
      var _yield$_supabase$from8, error;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            if (confirm('Delete this report?')) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2);
          case 1:
            _context1.n = 2;
            return _supabase.from('question_reports').delete().eq('id', reportId);
          case 2:
            _yield$_supabase$from8 = _context1.v;
            error = _yield$_supabase$from8.error;
            if (!error) {
              _context1.n = 3;
              break;
            }
            alert(error.message);
            return _context1.a(2);
          case 3:
            setQuestionReports(function (prev) {
              return prev.filter(function (r) {
                return r.id !== reportId;
              });
            });
          case 4:
            return _context1.a(2);
        }
      }, _callee1);
    }));
    function deleteQuestionReport(_x10) {
      return _deleteQuestionReport.apply(this, arguments);
    }
    return deleteQuestionReport;
  }();
  if (!isAdmin) return null;
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
  }));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300"
  }, "Error: ", error);
  var openCount = reports.filter(function (r) {
    return r.status === 'open';
  }).length;
  var qrOpenCount = questionReports.filter(function (r) {
    return r.status === 'open';
  }).length;
  var qMap = {};
  questions.forEach(function (q) {
    return qMap[q.id] = q;
  });
  var StatusSelect = function StatusSelect(_ref16) {
    var value = _ref16.value,
      onChange = _ref16.onChange;
    return /*#__PURE__*/React.createElement("select", {
      value: value || 'open',
      onChange: onChange,
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
    }, /*#__PURE__*/React.createElement("option", {
      value: "open"
    }, "open"), /*#__PURE__*/React.createElement("option", {
      value: "reviewing"
    }, "reviewing"), /*#__PURE__*/React.createElement("option", {
      value: "resolved"
    }, "resolved"), /*#__PURE__*/React.createElement("option", {
      value: "dismissed"
    }, "dismissed"));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg text-slate-800 dark:text-slate-100"
  }, "Bug Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, reports.length, " total \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "text-rose-600 dark:text-rose-400 font-semibold"
  }, openCount, " open"))), openCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold"
  }, openCount, " need review")), reports.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-16 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300"
  }, "No bug reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1"
  }, "Reports submitted from the profile menu will appear here.")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, reports.map(function (r) {
    var statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "px-5 py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold uppercase tracking-wider ".concat(statusColor)
    }, r.status || 'open'), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, new Date(r.created_at).toLocaleString())), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-slate-800 dark:text-slate-100 mb-1"
    }, r.subject), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap"
    }, r.description))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, /*#__PURE__*/React.createElement(StatusSelect, {
      value: r.status,
      onChange: function onChange(e) {
        return updateBugStatus(r.id, e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteBugReport(r.id);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10"
    }, "Delete"))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg text-slate-800 dark:text-slate-100"
  }, "Question Issue Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, questionReports.length, " total \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "text-rose-600 dark:text-rose-400 font-semibold"
  }, qrOpenCount, " open"))), qrOpenCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold"
  }, qrOpenCount, " need review")), questionReports.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-16 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300"
  }, "No issue reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1"
  }, "Reports submitted by users will appear here.")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, questionReports.map(function (r) {
    var q = qMap[r.question_id] || {
      id: r.question_id,
      title: 'Question #' + r.question_id
    };
    var statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "px-5 py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold uppercase tracking-wider ".concat(statusColor)
    }, r.status || 'open'), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
    }, r.issue_type), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, new Date(r.created_at).toLocaleString())), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-slate-800 dark:text-slate-100 mb-1"
    }, q.title || 'Question #' + r.question_id), q.topic && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 mb-2"
    }, q.topic, " \xB7 ", q.difficulty), r.details && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap"
    }, r.details))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, /*#__PURE__*/React.createElement(StatusSelect, {
      value: r.status,
      onChange: function onChange(e) {
        return updateQuestionReportStatus(r.id, e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteQuestionReport(r.id);
      },
      className: "px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10"
    }, "Delete"))));
  }))));
}

// Downscale an image to a sane max dimension before upload. Question diagrams only ever
// display at a few hundred px wide in the UI, so admin-uploaded screenshots/photos (which
// can easily be several thousand px and multiple MB) get shrunk client-side, never upscaled.
// GIFs are passed through untouched — canvas would flatten an animated GIF to one frame.
function resizeImageForUpload(_x11) {
  return _resizeImageForUpload.apply(this, arguments);
} // Uploads via a raw fetch with a freshly-read access token instead of going through
// _supabase.storage -- the SDK's storage sub-client is created lazily on first access and
// can bake in whatever Authorization header existed at that moment (e.g. anon-only, if
// anything touches .storage before the session finishes loading from localStorage on page
// load), and never re-reads the session again afterward. Reading the token directly here
// every call sidesteps that entirely instead of trusting the cached client.
function _resizeImageForUpload() {
  _resizeImageForUpload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(file) {
    var _ref29,
      _ref29$maxDim,
      maxDim,
      _ref29$jpegQuality,
      jpegQuality,
      bitmap,
      scale,
      width,
      height,
      canvas,
      outputType,
      blob,
      ext,
      newName,
      _args27 = arguments,
      _t21;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _ref29 = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : {}, _ref29$maxDim = _ref29.maxDim, maxDim = _ref29$maxDim === void 0 ? MAX_IMAGE_DIMENSION : _ref29$maxDim, _ref29$jpegQuality = _ref29.jpegQuality, jpegQuality = _ref29$jpegQuality === void 0 ? 0.85 : _ref29$jpegQuality;
          if (!(file.type === 'image/gif')) {
            _context27.n = 1;
            break;
          }
          return _context27.a(2, file);
        case 1:
          _context27.p = 1;
          _context27.n = 2;
          return createImageBitmap(file);
        case 2:
          bitmap = _context27.v;
          _context27.n = 4;
          break;
        case 3:
          _context27.p = 3;
          _t21 = _context27.v;
          return _context27.a(2, file);
        case 4:
          scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
          width = Math.round(bitmap.width * scale);
          height = Math.round(bitmap.height * scale);
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);

          // PNG stays PNG (crisp lines + transparency for diagrams); everything else re-encodes
          // as JPEG at a controlled quality to keep file size down.
          outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          _context27.n = 5;
          return new Promise(function (resolve) {
            return canvas.toBlob(resolve, outputType, outputType === 'image/jpeg' ? jpegQuality : undefined);
          });
        case 5:
          blob = _context27.v;
          if (blob) {
            _context27.n = 6;
            break;
          }
          return _context27.a(2, file);
        case 6:
          ext = outputType === 'image/png' ? 'png' : 'jpg';
          newName = file.name.replace(/\.[^.]+$/, '') + "-resized.".concat(ext);
          return _context27.a(2, new File([blob], newName, {
            type: outputType
          }));
      }
    }, _callee27, null, [[1, 3]]);
  }));
  return _resizeImageForUpload.apply(this, arguments);
}
function uploadWithSessionRetry(_x12, _x13, _x14, _x15) {
  return _uploadWithSessionRetry.apply(this, arguments);
} // Avatars are always a small square photo, never need transparency or crisp vector lines,
// so unlike resizeImageForUpload above this always crops to a centered square and re-encodes
// as JPEG -- gives a small, predictable file size regardless of the source image's shape.
function _uploadWithSessionRetry() {
  _uploadWithSessionRetry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(bucket, path, file, options) {
    var _yield$_supabase$auth, session, headers, res, body;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.n) {
        case 0:
          _context28.n = 1;
          return _supabase.auth.getSession();
        case 1:
          _yield$_supabase$auth = _context28.v;
          session = _yield$_supabase$auth.data.session;
          if (session) {
            _context28.n = 2;
            break;
          }
          return _context28.a(2, {
            error: {
              message: 'Not signed in.'
            }
          });
        case 2:
          headers = {
            apikey: SUPABASE_ANON_KEY,
            Authorization: "Bearer ".concat(session.access_token),
            'Content-Type': (options === null || options === void 0 ? void 0 : options.contentType) || file.type || 'application/octet-stream'
          };
          if (options !== null && options !== void 0 && options.upsert) headers['x-upsert'] = 'true';
          _context28.n = 3;
          return fetch("".concat(SUPABASE_URL, "/storage/v1/object/").concat(bucket, "/").concat(path), {
            method: 'POST',
            headers: headers,
            body: file
          });
        case 3:
          res = _context28.v;
          if (!res.ok) {
            _context28.n = 4;
            break;
          }
          return _context28.a(2, {
            error: null
          });
        case 4:
          _context28.n = 5;
          return res.json().catch(function () {
            return {};
          });
        case 5:
          body = _context28.v;
          return _context28.a(2, {
            error: {
              message: body.message || body.error || "Upload failed (".concat(res.status, ")")
            }
          });
      }
    }, _callee28);
  }));
  return _uploadWithSessionRetry.apply(this, arguments);
}
function cropAndResizeAvatar(_x16) {
  return _cropAndResizeAvatar.apply(this, arguments);
} // supabase-js's FunctionsHttpError.message is always the hardcoded string
// "Edge Function returned a non-2xx status code" -- it never contains the
// function's actual error text, regardless of what the function returned.
// The real body lives on error.context (the raw Response), which has to be
// read and parsed separately to get anything useful to show or branch on.
function _cropAndResizeAvatar() {
  _cropAndResizeAvatar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(file) {
    var maxDim,
      bitmap,
      side,
      sx,
      sy,
      outSide,
      canvas,
      blob,
      _args29 = arguments,
      _t22;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          maxDim = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : MAX_AVATAR_DIMENSION;
          _context29.p = 1;
          _context29.n = 2;
          return createImageBitmap(file);
        case 2:
          bitmap = _context29.v;
          _context29.n = 4;
          break;
        case 3:
          _context29.p = 3;
          _t22 = _context29.v;
          return _context29.a(2, file);
        case 4:
          side = Math.min(bitmap.width, bitmap.height);
          sx = (bitmap.width - side) / 2;
          sy = (bitmap.height - side) / 2;
          outSide = Math.min(side, maxDim);
          canvas = document.createElement('canvas');
          canvas.width = outSide;
          canvas.height = outSide;
          canvas.getContext('2d').drawImage(bitmap, sx, sy, side, side, 0, 0, outSide, outSide);
          _context29.n = 5;
          return new Promise(function (resolve) {
            return canvas.toBlob(resolve, 'image/jpeg', 0.85);
          });
        case 5:
          blob = _context29.v;
          if (blob) {
            _context29.n = 6;
            break;
          }
          return _context29.a(2, file);
        case 6:
          return _context29.a(2, new File([blob], 'avatar.jpg', {
            type: 'image/jpeg'
          }));
      }
    }, _callee29, null, [[1, 3]]);
  }));
  return _cropAndResizeAvatar.apply(this, arguments);
}
function edgeFunctionErrorMessage(_x17) {
  return _edgeFunctionErrorMessage.apply(this, arguments);
} // ── Review Imports: load a locally-extracted draft JSON (questions pulled from a
// PDF by Claude in a separate session), preview each with real LaTeX, edit/approve/
// reject per question, then publish only the approved ones in one batched write.
// Nothing here ever touches Supabase until "Publish Approved" is clicked.
function _edgeFunctionErrorMessage() {
  _edgeFunctionErrorMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(error) {
    var body, _t23;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          if (!(error !== null && error !== void 0 && error.context && typeof error.context.json === 'function')) {
            _context30.n = 5;
            break;
          }
          _context30.p = 1;
          _context30.n = 2;
          return error.context.clone().json();
        case 2:
          body = _context30.v;
          if (!(body !== null && body !== void 0 && body.error)) {
            _context30.n = 3;
            break;
          }
          return _context30.a(2, body.error);
        case 3:
          _context30.n = 5;
          break;
        case 4:
          _context30.p = 4;
          _t23 = _context30.v;
        case 5:
          return _context30.a(2, (error === null || error === void 0 ? void 0 : error.message) || String(error));
      }
    }, _callee30, null, [[1, 4]]);
  }));
  return _edgeFunctionErrorMessage.apply(this, arguments);
}
function ReviewImportsPanel(_ref17) {
  var authUser = _ref17.authUser,
    onBatchReviewed = _ref17.onBatchReviewed;
  var _useState41 = useState([]),
    _useState42 = _slicedToArray(_useState41, 2),
    draftRows = _useState42[0],
    setDraftRows = _useState42[1];
  var _useState43 = useState(''),
    _useState44 = _slicedToArray(_useState43, 2),
    parseError = _useState44[0],
    setParseError = _useState44[1];
  var _useState45 = useState({}),
    _useState46 = _slicedToArray(_useState45, 2),
    imageMap = _useState46[0],
    setImageMap = _useState46[1]; // filename -> { file, url }
  var _useState47 = useState(false),
    _useState48 = _slicedToArray(_useState47, 2),
    publishing = _useState48[0],
    setPublishing = _useState48[1];
  var _useState49 = useState(''),
    _useState50 = _slicedToArray(_useState49, 2),
    publishMessage = _useState50[0],
    setPublishMessage = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    verifying = _useState52[0],
    setVerifying = _useState52[1];
  var _useState53 = useState(''),
    _useState54 = _slicedToArray(_useState53, 2),
    verifyMessage = _useState54[0],
    setVerifyMessage = _useState54[1];
  var _useState55 = useState(null),
    _useState56 = _slicedToArray(_useState55, 2),
    pdfFile = _useState56[0],
    setPdfFile = _useState56[1];
  var _useState57 = useState(''),
    _useState58 = _slicedToArray(_useState57, 2),
    pdfOriginalTest = _useState58[0],
    setPdfOriginalTest = _useState58[1];
  var _useState59 = useState(''),
    _useState60 = _slicedToArray(_useState59, 2),
    pdfAnswerKey = _useState60[0],
    setPdfAnswerKey = _useState60[1];
  var _useState61 = useState(false),
    _useState62 = _slicedToArray(_useState61, 2),
    answerKeyExtracting = _useState62[0],
    setAnswerKeyExtracting = _useState62[1];
  var _useState63 = useState(''),
    _useState64 = _slicedToArray(_useState63, 2),
    answerKeyExtractMsg = _useState64[0],
    setAnswerKeyExtractMsg = _useState64[1];
  var _useState65 = useState(false),
    _useState66 = _slicedToArray(_useState65, 2),
    pdfImporting = _useState66[0],
    setPdfImporting = _useState66[1];
  var _useState67 = useState(''),
    _useState68 = _slicedToArray(_useState67, 2),
    pdfImportMessage = _useState68[0],
    setPdfImportMessage = _useState68[1];
  // Set once step 1 (transcription) finishes -- non-null means there's a
  // batch sitting in 'transcribed' status waiting for "Generate Answers".
  var _useState69 = useState(null),
    _useState70 = _slicedToArray(_useState69, 2),
    pdfTranscribedBatchId = _useState70[0],
    setPdfTranscribedBatchId = _useState70[1];
  var pdfPollRef = useRef(null);

  // Mirrors localStorage so a reload can find an in-progress batch again --
  // null once a batch reaches a terminal state (completed/needs_attention/
  // failed/cancelled), set any time one is actively transcribing/solving or
  // sitting in 'transcribed' waiting for "Generate Answers".
  var ACTIVE_BATCH_KEY = 'active_import_batch_id';
  var _useState71 = useState(null),
    _useState72 = _slicedToArray(_useState71, 2),
    activeBatchId = _useState72[0],
    setActiveBatchIdState = _useState72[1];
  var setActiveBatchId = function setActiveBatchId(id) {
    setActiveBatchIdState(id);
    try {
      if (id) localStorage.setItem(ACTIVE_BATCH_KEY, id);else localStorage.removeItem(ACTIVE_BATCH_KEY);
    } catch (e) {}
  };
  // Populated only by the on-mount resume check below -- drives the
  // "Resume active import" banner. Distinct from activeBatchId so a fresh
  // import the admin just started in this same load doesn't also show a
  // redundant "resume" banner on top of its own inline progress message.
  var _useState73 = useState(null),
    _useState74 = _slicedToArray(_useState73, 2),
    resumeBannerInfo = _useState74[0],
    setResumeBannerInfo = _useState74[1];
  useEffect(function () {
    return function () {
      return clearTimeout(pdfPollRef.current);
    };
  }, []);

  // Async solving (background concurrency + one-at-a-time needs_image calls)
  // lands draft rows in whatever order they finish, not test order -- this
  // keeps the review cards sorted to match the actual printed test instead.
  var byOriginalQuestionNumber = function byOriginalQuestionNumber(a, b) {
    return (Number(a.original_question_number) || 0) - (Number(b.original_question_number) || 0);
  };
  var blankDraftRow = function blankDraftRow() {
    return {
      title: '',
      topic: 'Algebra 1 & 2',
      difficulty: 'Easy',
      source: '',
      question: '',
      choices: ['(A) ', '(B) ', '(C) ', '(D) ', '(E) '],
      answer: '',
      explanation: '',
      tags: [],
      original_test: '',
      original_question_number: '',
      source_reference: '',
      image_pending_filename: '',
      image_alt: ''
    };
  };
  var loadDraftFile = function loadDraftFile(file) {
    if (!file) return;
    setParseError('');
    setPublishMessage('');
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try {
        parsed = JSON.parse(reader.result);
      } catch (e) {
        setParseError('Could not parse that file as JSON: ' + e.message);
        return;
      }
      if (!Array.isArray(parsed)) {
        setParseError('Draft file must be a JSON array of question objects.');
        return;
      }
      setDraftRows(parsed.map(function (q) {
        return _objectSpread(_objectSpread(_objectSpread({}, blankDraftRow()), q), {}, {
          choices: Array.isArray(q.choices) && q.choices.length ? q.choices : blankDraftRow().choices,
          tags: Array.isArray(q.tags) ? q.tags : typeof q.tags === 'string' ? q.tags.split(',').map(function (t) {
            return t.trim();
          }).filter(Boolean) : [],
          _key: crypto.randomUUID(),
          _status: 'pending',
          // 'pending' | 'approved' | 'rejected' | 'published'
          _publishError: ''
        });
      }).sort(byOriginalQuestionNumber));
    };
    reader.readAsText(file);
  };
  var loadImageFiles = function loadImageFiles(fileList) {
    var files = Array.from(fileList || []);
    if (!files.length) return;
    setImageMap(function (prev) {
      var next = _objectSpread({}, prev);
      files.forEach(function (file) {
        if (next[file.name]) URL.revokeObjectURL(next[file.name].url);
        next[file.name] = {
          file: file,
          url: URL.createObjectURL(file)
        };
      });
      return next;
    });
  };
  var fileToBase64 = function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        return resolve(reader.result.split(',')[1]);
      };
      reader.onerror = function () {
        return reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  };
  var VERIFY_BATCH_SIZE = 60; // matches verify-draft-questions' MAX_QUESTIONS_PER_CALL

  // Spends a small, bounded amount of API credit re-solving each manually-extracted
  // question once (no thinking-retry loop) and comparing against the answer already
  // in the row -- the cheap alternative to running these through the full
  // transcribe+solve PDF pipeline. Writes verification_status/verification_notes onto
  // draftRows, which the existing match/mismatch badges already know how to render.
  var verifyDraftRows = /*#__PURE__*/function () {
    var _verifyDraftRows = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var candidates, payloadByKey, _iterator, _step, r, entry, matchedImage, allEntries, allResults, i, chunk, _yield$_supabase$func, data, error, resultByKey, matchCount, mismatchCount, unverifiedCount, _t, _t2, _t3, _t4;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.p = _context10.n) {
          case 0:
            candidates = draftRows.filter(function (r) {
              return r._status !== 'published' && r.question.trim() && r.answer.trim();
            });
            if (candidates.length) {
              _context10.n = 1;
              break;
            }
            setVerifyMessage('Nothing to verify -- load questions with a question and answer first.');
            return _context10.a(2);
          case 1:
            setVerifying(true);
            setVerifyMessage('Verifying…');
            _context10.p = 2;
            payloadByKey = {};
            _iterator = _createForOfIteratorHelper(candidates);
            _context10.p = 3;
            _iterator.s();
          case 4:
            if ((_step = _iterator.n()).done) {
              _context10.n = 8;
              break;
            }
            r = _step.value;
            entry = {
              key: r._key,
              question: r.question,
              choices: r.choices.filter(Boolean),
              answer: r.answer
            };
            matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
            if (!matchedImage) {
              _context10.n = 6;
              break;
            }
            _context10.n = 5;
            return fileToBase64(matchedImage.file);
          case 5:
            entry.image_base64 = _context10.v;
            entry.image_media_type = matchedImage.file.type;
          case 6:
            payloadByKey[r._key] = entry;
          case 7:
            _context10.n = 4;
            break;
          case 8:
            _context10.n = 10;
            break;
          case 9:
            _context10.p = 9;
            _t = _context10.v;
            _iterator.e(_t);
          case 10:
            _context10.p = 10;
            _iterator.f();
            return _context10.f(10);
          case 11:
            allEntries = Object.values(payloadByKey);
            allResults = [];
            i = 0;
          case 12:
            if (!(i < allEntries.length)) {
              _context10.n = 18;
              break;
            }
            chunk = allEntries.slice(i, i + VERIFY_BATCH_SIZE);
            _context10.n = 13;
            return _supabase.functions.invoke('verify-draft-questions', {
              body: {
                questions: chunk
              }
            });
          case 13:
            _yield$_supabase$func = _context10.v;
            data = _yield$_supabase$func.data;
            error = _yield$_supabase$func.error;
            if (!error) {
              _context10.n = 15;
              break;
            }
            _t2 = Error;
            _context10.n = 14;
            return edgeFunctionErrorMessage(error);
          case 14:
            _t3 = _context10.v;
            throw new _t2(_t3);
          case 15:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context10.n = 16;
              break;
            }
            throw new Error(data.error);
          case 16:
            allResults.push.apply(allResults, _toConsumableArray(data.results || []));
          case 17:
            i += VERIFY_BATCH_SIZE;
            _context10.n = 12;
            break;
          case 18:
            resultByKey = {};
            allResults.forEach(function (r) {
              resultByKey[r.key] = r;
            });
            setDraftRows(function (prev) {
              return prev.map(function (r) {
                var res = resultByKey[r._key];
                if (!res) return r;
                return _objectSpread(_objectSpread({}, r), {}, {
                  verification_status: res.verification_status,
                  verification_notes: res.verification_notes
                });
              });
            });
            matchCount = allResults.filter(function (r) {
              return r.verification_status === 'match';
            }).length;
            mismatchCount = allResults.filter(function (r) {
              return r.verification_status === 'mismatch';
            }).length;
            unverifiedCount = allResults.filter(function (r) {
              return r.verification_status === 'unverified';
            }).length;
            setVerifyMessage("Verified ".concat(allResults.length, " question(s): ").concat(matchCount, " match, ").concat(mismatchCount, " mismatch, ").concat(unverifiedCount, " unverified."));
            _context10.n = 20;
            break;
          case 19:
            _context10.p = 19;
            _t4 = _context10.v;
            setVerifyMessage('Verification failed: ' + (_t4.message || String(_t4)));
          case 20:
            _context10.p = 20;
            setVerifying(false);
            return _context10.f(20);
          case 21:
            return _context10.a(2);
        }
      }, _callee10, null, [[3, 9, 10, 11], [2, 19, 20, 21]]);
    }));
    function verifyDraftRows() {
      return _verifyDraftRows.apply(this, arguments);
    }
    return verifyDraftRows;
  }();

  // Maps a draft_questions table row (from the PDF import pipeline) into the same
  // shape blankDraftRow()-derived rows use, so the rest of the panel (editing,
  // approve/reject, live preview, publish) doesn't need to know where a row came from.
  var draftQuestionRowToLocal = function draftQuestionRowToLocal(row) {
    return _objectSpread(_objectSpread({}, blankDraftRow()), {}, {
      title: row.title || '',
      topic: row.topic,
      difficulty: row.difficulty,
      source: row.source || '',
      question: row.question,
      choices: Array.isArray(row.choices) && row.choices.length ? row.choices : blankDraftRow().choices,
      answer: row.answer || '',
      explanation: row.explanation || '',
      tags: Array.isArray(row.tags) ? row.tags : [],
      original_test: row.original_test || '',
      original_question_number: row.original_question_number != null ? String(row.original_question_number) : '',
      source_reference: row.source_reference || '',
      image_alt: row.image_alt || '',
      needs_image: !!row.needs_image,
      verification_status: row.verification_status || null,
      verification_notes: row.verification_notes || null,
      _key: row.id,
      _draftId: row.id,
      _status: ['approved', 'rejected', 'published'].includes(row.review_status) ? row.review_status : 'pending',
      _publishError: ''
    });
  };

  // Both steps now process one expensive unit of work (one PDF page, or one
  // needs_image question) per call, synchronously, and report progress back
  // immediately -- no more background EdgeRuntime.waitUntil + DB polling for
  // the rate-limited parts. The Anthropic account's 30,000-input-tokens/
  // minute limit means even one page/image-question at a time has to be
  // paced, so the browser re-invokes the same function after a safe delay
  // until the response says there's nothing left to do.
  var PACED_CALL_DELAY_MS = 65000;
  var _continueTranscription = /*#__PURE__*/function () {
    var _continueTranscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(batchId) {
      var _data$questions_so_fa2, _yield$_supabase$func2, data, error, _data$questions_so_fa, message, _yield$_supabase$from9, fresh, _yield$_supabase$from0, drafts, _t5, _t6, _t7;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            _context11.p = 0;
            _context11.n = 1;
            return _supabase.functions.invoke('import-test-pdf', {
              body: {
                batch_id: batchId
              }
            });
          case 1:
            _yield$_supabase$func2 = _context11.v;
            data = _yield$_supabase$func2.data;
            error = _yield$_supabase$func2.error;
            if (!error) {
              _context11.n = 3;
              break;
            }
            _t5 = Error;
            _context11.n = 2;
            return edgeFunctionErrorMessage(error);
          case 2:
            _t6 = _context11.v;
            throw new _t5(_t6);
          case 3:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context11.n = 4;
              break;
            }
            throw new Error(data.error);
          case 4:
            if (!(data.status === 'transcribed')) {
              _context11.n = 5;
              break;
            }
            setPdfImporting(false);
            setPdfTranscribedBatchId(batchId);
            setActiveBatchId(batchId); // still active -- waiting on "Generate Answers", not done yet
            setPdfImportMessage("Transcribed ".concat((_data$questions_so_fa = data.questions_so_far) !== null && _data$questions_so_fa !== void 0 ? _data$questions_so_fa : '?', " question(s) into JSON.") + (data.answer_key_found ? ' Answer key detected in the PDF — answers will be checked against it.' : '') + (data.error_message ? ' Note: ' + data.error_message : '') + ' Click "Generate Answers" below to solve them.');
            return _context11.a(2);
          case 5:
            if (!(data.status === 'failed')) {
              _context11.n = 6;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null);
            setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
            return _context11.a(2);
          case 6:
            setPdfImportMessage("Transcribed page ".concat(data.next_page_index, " of ").concat(data.pages_total, " ") + "(".concat((_data$questions_so_fa2 = data.questions_so_far) !== null && _data$questions_so_fa2 !== void 0 ? _data$questions_so_fa2 : 0, " question(s) so far)\u2026 next page in ~").concat(PACED_CALL_DELAY_MS / 1000, "s."));
            pdfPollRef.current = setTimeout(function () {
              return _continueTranscription(batchId);
            }, PACED_CALL_DELAY_MS);
            _context11.n = 14;
            break;
          case 7:
            _context11.p = 7;
            _t7 = _context11.v;
            message = _t7.message || String(_t7); // Don't trust the error message alone -- a concurrent cron tick can
            // advance (or even finish) this batch between this call firing and
            // its response landing, so re-check the batch's actual status and
            // branch on ground truth instead of guessing from error text. This
            // catches every "not really a failure" case in one place, not just
            // the one lease-conflict string this used to special-case.
            _context11.n = 8;
            return _supabase.from('import_batches').select('*').eq('id', batchId).single();
          case 8:
            _yield$_supabase$from9 = _context11.v;
            fresh = _yield$_supabase$from9.data;
            if (!fresh) {
              _context11.n = 13;
              break;
            }
            if (!(fresh.status === 'transcribed')) {
              _context11.n = 9;
              break;
            }
            setPdfImporting(false);
            setPdfTranscribedBatchId(batchId);
            setActiveBatchId(batchId);
            setPdfImportMessage("Transcription already finished (".concat((fresh.boundaries_json || []).length, " question(s)) \u2014 click \"Generate Answers\" below to solve them."));
            return _context11.a(2);
          case 9:
            if (!(fresh.status === 'processing')) {
              _context11.n = 10;
              break;
            }
            setPdfImportMessage('Background queue is working on this batch right now… checking again shortly.');
            pdfPollRef.current = setTimeout(function () {
              return _continueTranscription(batchId);
            }, PACED_CALL_DELAY_MS);
            return _context11.a(2);
          case 10:
            if (!(fresh.status === 'completed' || fresh.status === 'needs_attention')) {
              _context11.n = 12;
              break;
            }
            _context11.n = 11;
            return _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
          case 11:
            _yield$_supabase$from0 = _context11.v;
            drafts = _yield$_supabase$from0.data;
            setDraftRows((drafts || []).map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
            setPdfImporting(false);
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage("This batch already finished (".concat(drafts ? drafts.length : 0, " question(s) solved) \u2014 loaded for review."));
            return _context11.a(2);
          case 12:
            if (!(fresh.status === 'failed' || fresh.status === 'cancelled')) {
              _context11.n = 13;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null);
            setPdfImportMessage('Transcription failed: ' + (fresh.error_message || message));
            return _context11.a(2);
          case 13:
            setPdfImporting(false);
            setPdfImportMessage('Transcription failed: ' + message);
          case 14:
            return _context11.a(2);
        }
      }, _callee11, null, [[0, 7]]);
    }));
    function continueTranscription(_x18) {
      return _continueTranscription2.apply(this, arguments);
    }
    return continueTranscription;
  }();

  // Uploading the answer key as its own file (instead of relying on Claude to
  // spot it buried in the test PDF, or retyping it by hand) gives a cleaner,
  // dedicated OCR pass on just that page -- more reliable than detection
  // mid-batch. Just fills the existing answer-key textarea below so the
  // admin can still review/fix it before transcribing; the manual-key-wins
  // priority in import-test-pdf is unaffected either way.
  var extractAnswerKeyFile = /*#__PURE__*/function () {
    var _extractAnswerKeyFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(file) {
      var dataUrl, file_base64, _yield$_supabase$func3, data, error, _t8, _t9, _t0;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            if (file) {
              _context12.n = 1;
              break;
            }
            return _context12.a(2);
          case 1:
            if (!(file.type !== 'application/pdf' && !file.type.startsWith('image/'))) {
              _context12.n = 2;
              break;
            }
            setAnswerKeyExtractMsg('Please choose a PDF or image file.');
            return _context12.a(2);
          case 2:
            setAnswerKeyExtracting(true);
            setAnswerKeyExtractMsg('Reading answer key…');
            _context12.p = 3;
            _context12.n = 4;
            return new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onload = function () {
                return resolve(reader.result);
              };
              reader.onerror = function () {
                return reject(reader.error);
              };
              reader.readAsDataURL(file);
            });
          case 4:
            dataUrl = _context12.v;
            file_base64 = dataUrl.split(',')[1];
            _context12.n = 5;
            return _supabase.functions.invoke('extract-answer-key', {
              body: {
                file_base64: file_base64,
                media_type: file.type
              }
            });
          case 5:
            _yield$_supabase$func3 = _context12.v;
            data = _yield$_supabase$func3.data;
            error = _yield$_supabase$func3.error;
            if (!error) {
              _context12.n = 7;
              break;
            }
            _t8 = Error;
            _context12.n = 6;
            return edgeFunctionErrorMessage(error);
          case 6:
            _t9 = _context12.v;
            throw new _t8(_t9);
          case 7:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context12.n = 8;
              break;
            }
            throw new Error(data.error);
          case 8:
            setPdfAnswerKey(data.answer_key_text || '');
            setAnswerKeyExtractMsg('Answer key extracted — review it below before transcribing.');
            _context12.n = 10;
            break;
          case 9:
            _context12.p = 9;
            _t0 = _context12.v;
            setAnswerKeyExtractMsg('Could not read answer key: ' + (_t0.message || String(_t0)));
          case 10:
            _context12.p = 10;
            setAnswerKeyExtracting(false);
            return _context12.f(10);
          case 11:
            return _context12.a(2);
        }
      }, _callee12, null, [[3, 9, 10, 11]]);
    }));
    function extractAnswerKeyFile(_x19) {
      return _extractAnswerKeyFile.apply(this, arguments);
    }
    return extractAnswerKeyFile;
  }();
  var extractFromPdf = /*#__PURE__*/function () {
    var _extractFromPdf = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var dataUrl, pdf_base64, _yield$_supabase$func4, data, error, _data$questions_so_fa3, _t1, _t10, _t11;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            if (pdfFile) {
              _context13.n = 1;
              break;
            }
            setPdfImportMessage('Pick a PDF file first.');
            return _context13.a(2);
          case 1:
            if (!(pdfFile.type !== 'application/pdf')) {
              _context13.n = 2;
              break;
            }
            setPdfImportMessage('That file is not a PDF.');
            return _context13.a(2);
          case 2:
            if (!(pdfFile.size > 15 * 1024 * 1024)) {
              _context13.n = 3;
              break;
            }
            setPdfImportMessage('PDF is over 15 MB — split it into smaller page ranges first.');
            return _context13.a(2);
          case 3:
            clearTimeout(pdfPollRef.current);
            setPdfTranscribedBatchId(null);
            setSelectedReviewBatchId(null);
            setPdfImporting(true);
            setPdfImportMessage('Uploading PDF and transcribing page 1…');
            // Self-heal any batch abandoned mid-run (e.g. the admin closed this tab
            // partway through) -- otherwise it would sit in 'processing' forever and
            // permanently block the "one active import at a time" guardrail below.
            // Capped at 8s so a slow/hung reap call can never silently freeze the
            // whole import flow -- if it times out, the actual upload below still
            // proceeds, and the real guardrail error (if any) will surface normally.
            _context13.n = 4;
            return Promise.race([Promise.resolve(_supabase.rpc('reap_stale_import_batches')).catch(function () {}), new Promise(function (resolve) {
              return setTimeout(resolve, 8000);
            })]);
          case 4:
            _context13.p = 4;
            _context13.n = 5;
            return new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onload = function () {
                return resolve(reader.result);
              };
              reader.onerror = function () {
                return reject(reader.error);
              };
              reader.readAsDataURL(pdfFile);
            });
          case 5:
            dataUrl = _context13.v;
            pdf_base64 = dataUrl.split(',')[1];
            _context13.n = 6;
            return _supabase.functions.invoke('import-test-pdf', {
              body: {
                pdf_base64: pdf_base64,
                source_label: pdfOriginalTest || null,
                original_test: pdfOriginalTest || null,
                answer_key: pdfAnswerKey || null
              }
            });
          case 6:
            _yield$_supabase$func4 = _context13.v;
            data = _yield$_supabase$func4.data;
            error = _yield$_supabase$func4.error;
            if (!error) {
              _context13.n = 8;
              break;
            }
            _t1 = Error;
            _context13.n = 7;
            return edgeFunctionErrorMessage(error);
          case 7:
            _t10 = _context13.v;
            throw new _t1(_t10);
          case 8:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context13.n = 9;
              break;
            }
            throw new Error(data.error);
          case 9:
            // Set as soon as a batch exists, regardless of how far this first call
            // got -- this is what lets a reload find and resume it.
            setActiveBatchId(data.batch_id);
            if (!(data.status === 'transcribed')) {
              _context13.n = 10;
              break;
            }
            setPdfImporting(false);
            setPdfTranscribedBatchId(data.batch_id);
            setPdfImportMessage("Transcribed ".concat((_data$questions_so_fa3 = data.questions_so_far) !== null && _data$questions_so_fa3 !== void 0 ? _data$questions_so_fa3 : '?', " question(s) into JSON.") + (data.answer_key_found ? ' Answer key detected in the PDF — answers will be checked against it.' : '') + ' Click "Generate Answers" below to solve them.');
            return _context13.a(2);
          case 10:
            if (!(data.status === 'failed')) {
              _context13.n = 11;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null);
            setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
            return _context13.a(2);
          case 11:
            setPdfImportMessage("Transcribed page ".concat(data.next_page_index, " of ").concat(data.pages_total, "\u2026 next page in ~").concat(PACED_CALL_DELAY_MS / 1000, "s."));
            pdfPollRef.current = setTimeout(function () {
              return _continueTranscription(data.batch_id);
            }, PACED_CALL_DELAY_MS);
            _context13.n = 13;
            break;
          case 12:
            _context13.p = 12;
            _t11 = _context13.v;
            setPdfImporting(false);
            setPdfImportMessage('Transcription failed: ' + (_t11.message || String(_t11)));
          case 13:
            return _context13.a(2);
        }
      }, _callee13, null, [[4, 12]]);
    }));
    function extractFromPdf() {
      return _extractFromPdf.apply(this, arguments);
    }
    return extractFromPdf;
  }();

  // Merges any draft_questions rows that have landed since the last check --
  // both the cheap text-only background batch and the one-at-a-time
  // needs_image calls insert rows independently, so this is how new ones
  // show up live instead of waiting for the whole batch to finish.
  var mergeNewDraftRows = /*#__PURE__*/function () {
    var _mergeNewDraftRows = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(batchId) {
      var _yield$_supabase$from1, drafts;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            _context14.n = 1;
            return _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
          case 1:
            _yield$_supabase$from1 = _context14.v;
            drafts = _yield$_supabase$from1.data;
            if (drafts) {
              _context14.n = 2;
              break;
            }
            return _context14.a(2);
          case 2:
            setDraftRows(function (prev) {
              var known = new Set(prev.map(function (r) {
                return r._draftId;
              }).filter(Boolean));
              var fresh = drafts.filter(function (r) {
                return !known.has(r.id);
              }).map(draftQuestionRowToLocal);
              return fresh.length ? [].concat(_toConsumableArray(prev), _toConsumableArray(fresh)).sort(byOriginalQuestionNumber) : prev;
            });
          case 3:
            return _context14.a(2);
        }
      }, _callee14);
    }));
    function mergeNewDraftRows(_x20) {
      return _mergeNewDraftRows.apply(this, arguments);
    }
    return mergeNewDraftRows;
  }();

  // Step 2: takes the JSON already saved on the batch row (by step 1) and
  // solves every question from it -- no PDF re-upload needed. Text-only
  // questions finish in the background within a call or two; needs_image
  // questions are paced one per call like transcription.
  var _continueSolving = /*#__PURE__*/function () {
    var _continueSolving2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(batchId) {
      var _data$questions_solve2, _data$questions_solve3, _yield$_supabase$func5, data, error, _data$questions_solve, delay, message, _yield$_supabase$from10, fresh, _t12, _t13, _t14;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            _context15.p = 0;
            _context15.n = 1;
            return _supabase.functions.invoke('solve-pdf-questions', {
              body: {
                batch_id: batchId
              }
            });
          case 1:
            _yield$_supabase$func5 = _context15.v;
            data = _yield$_supabase$func5.data;
            error = _yield$_supabase$func5.error;
            if (!error) {
              _context15.n = 3;
              break;
            }
            _t12 = Error;
            _context15.n = 2;
            return edgeFunctionErrorMessage(error);
          case 2:
            _t13 = _context15.v;
            throw new _t12(_t13);
          case 3:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context15.n = 4;
              break;
            }
            throw new Error(data.error);
          case 4:
            _context15.n = 5;
            return mergeNewDraftRows(batchId);
          case 5:
            if (!(data.status === 'completed' || data.status === 'needs_attention')) {
              _context15.n = 6;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null); // terminal -- nothing left to auto-resume, drafts are loaded for review
            setResumeBannerInfo(null);
            setPdfImportMessage("Solved ".concat((_data$questions_solve = data.questions_solved) !== null && _data$questions_solve !== void 0 ? _data$questions_solve : '?', " question(s)") + (data.status === 'needs_attention' ? ' — some need review (answer mismatch, duplicate, or a solve failure), check the badges below.' : ' — all answers matched the key.'));
            return _context15.a(2);
          case 6:
            if (!(data.status === 'failed')) {
              _context15.n = 7;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
            return _context15.a(2);
          case 7:
            // No rate-limit risk left to wait out if there's no needs_image work
            // pending -- just poll quickly until the background text-only batch finishes.
            delay = data.needs_image_remaining > 0 ? PACED_CALL_DELAY_MS : 4000;
            setPdfImportMessage(data.needs_image_remaining > 0 ? "Solved ".concat((_data$questions_solve2 = data.questions_solved) !== null && _data$questions_solve2 !== void 0 ? _data$questions_solve2 : 0, " question(s) so far (").concat(data.needs_image_total - data.needs_image_remaining, " of ").concat(data.needs_image_total, " image question(s) done)\u2026 next one in ~").concat(delay / 1000, "s.") : "Solved ".concat((_data$questions_solve3 = data.questions_solved) !== null && _data$questions_solve3 !== void 0 ? _data$questions_solve3 : 0, " question(s) so far\u2026 finishing up."));
            pdfPollRef.current = setTimeout(function () {
              return _continueSolving(batchId);
            }, delay);
            _context15.n = 14;
            break;
          case 8:
            _context15.p = 8;
            _t14 = _context15.v;
            message = _t14.message || String(_t14); // Same reasoning as continueTranscription's catch block -- re-check
            // ground truth instead of guessing from error text, since a
            // concurrent cron tick can finish solving this batch between this
            // call firing and its response landing.
            _context15.n = 9;
            return _supabase.from('import_batches').select('*').eq('id', batchId).single();
          case 9:
            _yield$_supabase$from10 = _context15.v;
            fresh = _yield$_supabase$from10.data;
            if (!fresh) {
              _context15.n = 13;
              break;
            }
            if (!(fresh.status === 'completed' || fresh.status === 'needs_attention')) {
              _context15.n = 11;
              break;
            }
            _context15.n = 10;
            return mergeNewDraftRows(batchId);
          case 10:
            setPdfImporting(false);
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage('Solving already finished' + (fresh.status === 'needs_attention' ? ' — some need review (answer mismatch, duplicate, or a solve failure), check the badges below.' : ' — all answers matched the key.'));
            return _context15.a(2);
          case 11:
            if (!(fresh.status === 'processing' || fresh.status === 'transcribed')) {
              _context15.n = 12;
              break;
            }
            setPdfImportMessage('Background queue is working on this batch right now… checking again shortly.');
            pdfPollRef.current = setTimeout(function () {
              return _continueSolving(batchId);
            }, PACED_CALL_DELAY_MS);
            return _context15.a(2);
          case 12:
            if (!(fresh.status === 'failed' || fresh.status === 'cancelled')) {
              _context15.n = 13;
              break;
            }
            setPdfImporting(false);
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage('Failed to generate answers: ' + (fresh.error_message || message));
            return _context15.a(2);
          case 13:
            setPdfImporting(false);
            setPdfImportMessage('Failed to generate answers: ' + message);
          case 14:
            return _context15.a(2);
        }
      }, _callee15, null, [[0, 8]]);
    }));
    function continueSolving(_x21) {
      return _continueSolving2.apply(this, arguments);
    }
    return continueSolving;
  }();
  var generateAnswers = function generateAnswers() {
    var batchId = pdfTranscribedBatchId;
    if (!batchId) return;
    clearTimeout(pdfPollRef.current);
    setPdfTranscribedBatchId(null);
    setResumeBannerInfo(null);
    setPdfImporting(true);
    setPdfImportMessage('Solving text-only questions and the first image question…');
    _continueSolving(batchId);
  };

  // On mount: if a batch was left active by a previous load (tab reload,
  // crash, accidental close), find it and pick back up exactly where the
  // database says it left off -- never from page 1 / question 1, and never
  // re-calling Claude for anything already in boundaries_json or already
  // a draft_questions row, since both continuation functions already key
  // off DB state (next_page_index / which original_question_numbers exist)
  // rather than anything the browser remembers locally.
  useEffect(function () {
    var stale = false;
    var resume = /*#__PURE__*/function () {
      var _resume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var batchId, _yield$_supabase$from11, batch, _yield$_supabase$from12, drafts, testName, _batch$pages_total, _batch$next_page_inde, _batch$pages_total2, stillTranscribing, _batch$next_page_inde2, _batch$next_page_inde3, _t15;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              batchId = localStorage.getItem(ACTIVE_BATCH_KEY);
              _context16.n = 2;
              break;
            case 1:
              _context16.p = 1;
              _t15 = _context16.v;
              return _context16.a(2);
            case 2:
              if (batchId) {
                _context16.n = 3;
                break;
              }
              return _context16.a(2);
            case 3:
              _context16.n = 4;
              return Promise.race([Promise.resolve(_supabase.rpc('reap_stale_import_batches')).catch(function () {}), new Promise(function (resolve) {
                return setTimeout(resolve, 8000);
              })]);
            case 4:
              if (!stale) {
                _context16.n = 5;
                break;
              }
              return _context16.a(2);
            case 5:
              _context16.n = 6;
              return _supabase.from('import_batches').select('*').eq('id', batchId).single();
            case 6:
              _yield$_supabase$from11 = _context16.v;
              batch = _yield$_supabase$from11.data;
              if (!stale) {
                _context16.n = 7;
                break;
              }
              return _context16.a(2);
            case 7:
              if (!(!batch || ['failed', 'cancelled'].includes(batch.status))) {
                _context16.n = 8;
                break;
              }
              setActiveBatchId(null);
              return _context16.a(2);
            case 8:
              _context16.n = 9;
              return _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
            case 9:
              _yield$_supabase$from12 = _context16.v;
              drafts = _yield$_supabase$from12.data;
              if (!stale) {
                _context16.n = 10;
                break;
              }
              return _context16.a(2);
            case 10:
              if (drafts && drafts.length) {
                setDraftRows(drafts.map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
              }
              testName = batch.original_test || batch.source_label || '';
              setPdfOriginalTest(testName);
              setPdfAnswerKey(batch.answer_key || '');
              setActiveBatchIdState(batchId); // already in localStorage; just sync React state

              if (batch.status === 'transcribed') {
                setPdfTranscribedBatchId(batchId);
                setResumeBannerInfo({
                  batchId: batchId,
                  testName: testName,
                  stage: 'Ready to solve'
                });
                setPdfImportMessage("Resumed: transcription finished (".concat((batch.boundaries_json || []).length, " question(s)). Click \"Generate Answers\" to continue."));
              } else if (batch.status === 'processing') {
                stillTranscribing = ((_batch$pages_total = batch.pages_total) !== null && _batch$pages_total !== void 0 ? _batch$pages_total : 0) > 0 && ((_batch$next_page_inde = batch.next_page_index) !== null && _batch$next_page_inde !== void 0 ? _batch$next_page_inde : 0) < ((_batch$pages_total2 = batch.pages_total) !== null && _batch$pages_total2 !== void 0 ? _batch$pages_total2 : 0);
                setPdfImporting(true);
                if (stillTranscribing) {
                  setResumeBannerInfo({
                    batchId: batchId,
                    testName: testName,
                    stage: "Resuming transcription (page ".concat(((_batch$next_page_inde2 = batch.next_page_index) !== null && _batch$next_page_inde2 !== void 0 ? _batch$next_page_inde2 : 0) + 1, " of ").concat(batch.pages_total, ")")
                  });
                  setPdfImportMessage("Resuming transcription from page ".concat(((_batch$next_page_inde3 = batch.next_page_index) !== null && _batch$next_page_inde3 !== void 0 ? _batch$next_page_inde3 : 0) + 1, " of ").concat(batch.pages_total, "\u2026"));
                  _continueTranscription(batchId);
                } else {
                  setResumeBannerInfo({
                    batchId: batchId,
                    testName: testName,
                    stage: 'Resuming solving'
                  });
                  setPdfImportMessage('Resuming solving…');
                  _continueSolving(batchId);
                }
              } else if (batch.status === 'completed' || batch.status === 'needs_attention') {
                // Nothing left to auto-resume -- just surface what's already staged.
                setActiveBatchId(null);
                setPdfImportMessage("Loaded ".concat(drafts ? drafts.length : 0, " previously-solved question(s) for review."));
              }
            case 11:
              return _context16.a(2);
          }
        }, _callee16, null, [[0, 1]]);
      }));
      function resume() {
        return _resume.apply(this, arguments);
      }
      return resume;
    }();
    resume();
    return function () {
      stale = true;
    };
  }, []);

  // Batches the background queue finished that nobody has actually opened
  // yet -- distinct from the single localStorage-tracked "active" batch
  // above, since those handle only the admin's own in-flight import. This
  // is what the Review Imports tab's notification badge actually points
  // to: every other finished batch only ever existed as a DB row with no
  // way to browse into it from here.
  var _useState75 = useState([]),
    _useState76 = _slicedToArray(_useState75, 2),
    pastBatches = _useState76[0],
    setPastBatches = _useState76[1];
  var refreshPastBatches = function refreshPastBatches() {
    _supabase.from('import_batches').select('id, source_label, original_test, status, started_at, questions_extracted').in('status', ['completed', 'needs_attention']).is('notified_at', null).order('started_at', {
      ascending: false
    }).then(function (_ref18) {
      var data = _ref18.data;
      return setPastBatches(data || []);
    });
  };
  useEffect(function () {
    refreshPastBatches();
  }, []);

  // Loads one finished batch's questions into the review grid below, marks
  // just that batch notified (never the whole list at once), and tells the
  // parent dashboard to refresh its badge count immediately rather than
  // waiting for its own 30s poll.
  // Tracks which list entry is currently loaded below, so it can stay
  // visible in its list (instead of vanishing the moment it's clicked) with
  // a highlight showing which one is on screen right now.
  var _useState77 = useState(null),
    _useState78 = _slicedToArray(_useState77, 2),
    selectedReviewBatchId = _useState78[0],
    setSelectedReviewBatchId = _useState78[1];
  var loadBatchForReview = /*#__PURE__*/function () {
    var _loadBatchForReview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(batchId) {
      var _yield$_supabase$from13, batch, _yield$_supabase$from14, drafts;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.n) {
          case 0:
            _context17.n = 1;
            return _supabase.from('import_batches').select('*').eq('id', batchId).single();
          case 1:
            _yield$_supabase$from13 = _context17.v;
            batch = _yield$_supabase$from13.data;
            if (batch) {
              _context17.n = 2;
              break;
            }
            return _context17.a(2);
          case 2:
            _context17.n = 3;
            return _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
          case 3:
            _yield$_supabase$from14 = _context17.v;
            drafts = _yield$_supabase$from14.data;
            setDraftRows((drafts || []).map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
            setPdfOriginalTest(batch.original_test || batch.source_label || '');
            setPdfAnswerKey(batch.answer_key || '');
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage("Loaded ".concat(drafts ? drafts.length : 0, " question(s) from \"").concat(batch.source_label || batch.original_test || batchId, "\" for review."));
            setSelectedReviewBatchId(batchId);
            _context17.n = 4;
            return _supabase.from('import_batches').update({
              notified_at: new Date().toISOString()
            }).eq('id', batchId);
          case 4:
            if (onBatchReviewed) onBatchReviewed();
          case 5:
            return _context17.a(2);
        }
      }, _callee17);
    }));
    function loadBatchForReview(_x22) {
      return _loadBatchForReview.apply(this, arguments);
    }
    return loadBatchForReview;
  }();

  // Permanently removes a batch and its draft_questions (cascades via FK) --
  // for duplicate/unwanted imports cluttering this list. Never touches the
  // published questions table, regardless of batch status.
  var deleteBatch = /*#__PURE__*/function () {
    var _deleteBatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(batchId, label) {
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            if (confirm("Permanently delete \"".concat(label, "\" and all its draft questions? This cannot be undone."))) {
              _context18.n = 1;
              break;
            }
            return _context18.a(2);
          case 1:
            _context18.n = 2;
            return _supabase.from('import_batches').delete().eq('id', batchId);
          case 2:
            setPastBatches(function (prev) {
              return prev.filter(function (b) {
                return b.id !== batchId;
              });
            });
            setAllBatches(function (prev) {
              return prev.filter(function (b) {
                return b.id !== batchId;
              });
            });
            if (selectedReviewBatchId === batchId) setSelectedReviewBatchId(null);
            if (onBatchReviewed) onBatchReviewed();
          case 3:
            return _context18.a(2);
        }
      }, _callee18);
    }));
    function deleteBatch(_x23, _x24) {
      return _deleteBatch.apply(this, arguments);
    }
    return deleteBatch;
  }();

  // Full history, regardless of notified_at -- a fallback for finding any
  // batch whose "needs review" flag got cleared without ever actually being
  // opened (e.g. a past bug that marked everything notified on tab-click).
  // Collapsed by default since pastBatches above already covers the normal
  // case; this is for digging up something that fell through that signal.
  var _useState79 = useState([]),
    _useState80 = _slicedToArray(_useState79, 2),
    allBatches = _useState80[0],
    setAllBatches = _useState80[1];
  var _useState81 = useState(false),
    _useState82 = _slicedToArray(_useState81, 2),
    showAllBatches = _useState82[0],
    setShowAllBatches = _useState82[1];
  var toggleAllBatches = function toggleAllBatches() {
    if (!showAllBatches && allBatches.length === 0) {
      _supabase.from('import_batches').select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path').in('status', ['completed', 'needs_attention']).order('started_at', {
        ascending: false
      }).then(function (_ref19) {
        var data = _ref19.data;
        return setAllBatches(data || []);
      });
    }
    setShowAllBatches(function (s) {
      return !s;
    });
  };

  // Cancel marks the batch 'cancelled' (never deletes draft_questions) and
  // stops the local poll loop -- anything already solved stays staged for
  // review exactly as if the batch had completed normally.
  var cancelActiveImport = /*#__PURE__*/function () {
    var _cancelActiveImport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
      var batchId;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            batchId = activeBatchId;
            if (batchId) {
              _context19.n = 1;
              break;
            }
            return _context19.a(2);
          case 1:
            clearTimeout(pdfPollRef.current);
            setPdfImporting(false);
            setPdfTranscribedBatchId(null);
            _context19.n = 2;
            return _supabase.from('import_batches').update({
              status: 'cancelled',
              finished_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }).eq('id', batchId);
          case 2:
            setActiveBatchId(null);
            setResumeBannerInfo(null);
            setPdfImportMessage('Import cancelled. Already-solved questions remain below for review.');
          case 3:
            return _context19.a(2);
        }
      }, _callee19);
    }));
    function cancelActiveImport() {
      return _cancelActiveImport.apply(this, arguments);
    }
    return cancelActiveImport;
  }();

  // Warns before closing/reloading while a transcribe/solve poll loop is
  // actually in flight -- progress itself is never lost (it's durable in
  // import_batches/draft_questions either way), this is purely so the
  // admin doesn't lose track of where things stood without meaning to.
  useEffect(function () {
    if (!pdfImporting) return;
    var handler = function handler(e) {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return function () {
      return window.removeEventListener('beforeunload', handler);
    };
  }, [pdfImporting]);
  var updateRow = function updateRow(key, field, value) {
    setDraftRows(function (prev) {
      return prev.map(function (r) {
        return r._key === key ? _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, field, value)) : r;
      });
    });
  };
  var updateChoice = function updateChoice(key, idx, value) {
    setDraftRows(function (prev) {
      return prev.map(function (r) {
        if (r._key !== key) return r;
        var choices = _toConsumableArray(r.choices);
        choices[idx] = value;
        return _objectSpread(_objectSpread({}, r), {}, {
          choices: choices
        });
      });
    });
  };

  // Lets the admin attach a diagram directly on a needs_image card instead of
  // publishing first and switching to the question editor's upload. Uploads
  // straight to question-images under a draft-scoped path (rowKey, not a
  // final question id, since drafts don't have one yet) -- publishing later
  // just reads r.image as-is, same as any other manually attached image.
  var uploadDraftDiagram = /*#__PURE__*/function () {
    var _uploadDraftDiagram = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(rowKey, file) {
      var resized, ext, path, _yield$uploadWithSess, error, _supabase$storage$fro, data;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.n) {
          case 0:
            if (file) {
              _context20.n = 1;
              break;
            }
            return _context20.a(2);
          case 1:
            if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
              _context20.n = 2;
              break;
            }
            updateRow(rowKey, '_imageUploadMsg', 'Please choose a PNG, JPEG, WEBP, or GIF image.');
            return _context20.a(2);
          case 2:
            if (!(file.size > MAX_IMAGE_BYTES)) {
              _context20.n = 3;
              break;
            }
            updateRow(rowKey, '_imageUploadMsg', 'Image is too large. Please use a file under 5 MB.');
            return _context20.a(2);
          case 3:
            updateRow(rowKey, '_imageUploading', true);
            updateRow(rowKey, '_imageUploadMsg', '');
            _context20.n = 4;
            return resizeImageForUpload(file);
          case 4:
            resized = _context20.v;
            if (!(resized.size > MAX_IMAGE_BYTES)) {
              _context20.n = 5;
              break;
            }
            updateRow(rowKey, '_imageUploading', false);
            updateRow(rowKey, '_imageUploadMsg', 'Image is still too large after resizing. Please use a smaller file.');
            return _context20.a(2);
          case 5:
            ext = (resized.name.split('.').pop() || 'png').toLowerCase();
            path = "draft-".concat(rowKey, "/diagram-").concat(Date.now(), ".").concat(ext);
            _context20.n = 6;
            return uploadWithSessionRetry('question-images', path, resized, {
              upsert: true,
              contentType: resized.type
            });
          case 6:
            _yield$uploadWithSess = _context20.v;
            error = _yield$uploadWithSess.error;
            updateRow(rowKey, '_imageUploading', false);
            if (!error) {
              _context20.n = 7;
              break;
            }
            updateRow(rowKey, '_imageUploadMsg', error.message || 'Image upload failed.');
            return _context20.a(2);
          case 7:
            _supabase$storage$fro = _supabase.storage.from('question-images').getPublicUrl(path), data = _supabase$storage$fro.data;
            updateRow(rowKey, 'image', data.publicUrl);
            updateRow(rowKey, '_imageUploadMsg', 'Diagram uploaded and attached.');
          case 8:
            return _context20.a(2);
        }
      }, _callee20);
    }));
    function uploadDraftDiagram(_x25, _x26) {
      return _uploadDraftDiagram.apply(this, arguments);
    }
    return uploadDraftDiagram;
  }();
  var removeDraftDiagram = function removeDraftDiagram(rowKey) {
    updateRow(rowKey, 'image', '');
    updateRow(rowKey, '_imageUploadMsg', 'Diagram removed.');
  };

  // Re-solves exactly one question in place (e.g. to fix a bad LaTeX
  // delimiter or an answer-key mismatch) without rerunning the whole batch.
  // Only applies to rows that came from the automatic PDF pipeline -- only
  // those have a real draft_questions id and batch data backing them. The
  // mismatch-retry loop lives server-side now (solve-pdf-questions retries
  // internally up to 5x on its own before responding), so this is a single
  // call -- looping here too would compound into way more attempts than
  // intended. The mismatch badge above clears on its own once
  // verification_status flips to 'match', since it just reads this row state.
  var redoQuestion = /*#__PURE__*/function () {
    var _redoQuestion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(key, draftId) {
      var _yield$_supabase$func6, data, error, _t16, _t17, _t18;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.p = _context21.n) {
          case 0:
            if (draftId) {
              _context21.n = 1;
              break;
            }
            return _context21.a(2);
          case 1:
            updateRow(key, '_redoing', true);
            updateRow(key, '_redoMsg', '');
            _context21.p = 2;
            _context21.n = 3;
            return _supabase.functions.invoke('solve-pdf-questions', {
              body: {
                redo_draft_id: draftId
              }
            });
          case 3:
            _yield$_supabase$func6 = _context21.v;
            data = _yield$_supabase$func6.data;
            error = _yield$_supabase$func6.error;
            if (!error) {
              _context21.n = 5;
              break;
            }
            _t16 = Error;
            _context21.n = 4;
            return edgeFunctionErrorMessage(error);
          case 4:
            _t17 = _context21.v;
            throw new _t16(_t17);
          case 5:
            if (!(data !== null && data !== void 0 && data.error)) {
              _context21.n = 6;
              break;
            }
            throw new Error(data.error);
          case 6:
            updateRow(key, 'answer', data.answer);
            updateRow(key, 'explanation', data.explanation);
            updateRow(key, 'verification_status', data.verification_status);
            updateRow(key, 'verification_notes', data.verification_notes);
            if (data.verification_status === 'match') {
              updateRow(key, '_redoMsg', 'Now matches the answer key.');
            } else if (data.verification_status === 'mismatch') {
              updateRow(key, '_redoMsg', 'Still mismatched after several automatic attempts — may need manual review.');
            } else {
              updateRow(key, '_redoMsg', 'Redone — review the new answer/explanation below.');
            }
            _context21.n = 8;
            break;
          case 7:
            _context21.p = 7;
            _t18 = _context21.v;
            updateRow(key, '_redoMsg', 'Redo failed: ' + (_t18.message || String(_t18)));
          case 8:
            _context21.p = 8;
            updateRow(key, '_redoing', false);
            return _context21.f(8);
          case 9:
            return _context21.a(2);
        }
      }, _callee21, null, [[2, 7, 8, 9]]);
    }));
    function redoQuestion(_x27, _x28) {
      return _redoQuestion.apply(this, arguments);
    }
    return redoQuestion;
  }();
  var setStatus = function setStatus(key, status) {
    updateRow(key, '_status', status);
    var row = draftRows.find(function (r) {
      return r._key === key;
    });
    if (row !== null && row !== void 0 && row._draftId) {
      _supabase.from('draft_questions').update({
        review_status: status
      }).eq('id', row._draftId).then(function (_ref20) {
        var error = _ref20.error;
        if (error) console.error('Failed to persist review status:', error.message);
      });
    }
  };
  var counts = useMemo(function () {
    return {
      pending: draftRows.filter(function (r) {
        return r._status === 'pending';
      }).length,
      approved: draftRows.filter(function (r) {
        return r._status === 'approved';
      }).length,
      rejected: draftRows.filter(function (r) {
        return r._status === 'rejected';
      }).length,
      published: draftRows.filter(function (r) {
        return r._status === 'published';
      }).length,
      mismatch: draftRows.filter(function (r) {
        return r.verification_status === 'mismatch';
      }).length,
      needsImage: draftRows.filter(function (r) {
        return r.needs_image;
      }).length
    };
  }, [draftRows]);
  var publishApproved = /*#__PURE__*/function () {
    var _publishApproved = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
      var approved, errors, _yield$_supabase$from15, idRows, nextId, rowsToUpsert, idByKey, _iterator2, _step2, r, id, imageUrl, imageAlt, matchedImage, resizedImage, ext, path, _yield$uploadWithSess2, uploadErr, _supabase$storage$fro2, pub, _yield$_supabase$from16, error, publishedDraftIds, manualRows, label, now, _t19;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            approved = draftRows.filter(function (r) {
              return r._status === 'approved';
            });
            if (approved.length) {
              _context22.n = 1;
              break;
            }
            setPublishMessage('No approved questions to publish.');
            return _context22.a(2);
          case 1:
            // Validate before writing anything.
            errors = [];
            approved.forEach(function (r) {
              if (!r.question.trim()) errors.push("\"".concat(r.title || 'Untitled', "\": missing question text."));
              var filledChoices = r.choices.filter(function (c) {
                return c && c.trim();
              });
              if (filledChoices.length < 2) errors.push("\"".concat(r.title || 'Untitled', "\": needs at least 2 choices."));
              if (!r.answer.trim()) errors.push("\"".concat(r.title || 'Untitled', "\": missing correct answer."));
              if (!r.topic) errors.push("\"".concat(r.title || 'Untitled', "\": missing topic."));
            });
            if (!errors.length) {
              _context22.n = 2;
              break;
            }
            setPublishMessage('Fix these before publishing: ' + errors.join(' '));
            return _context22.a(2);
          case 2:
            setPublishing(true);
            setPublishMessage('');
            _context22.n = 3;
            return _supabase.from('questions').select('id').order('id', {
              ascending: false
            }).limit(1);
          case 3:
            _yield$_supabase$from15 = _context22.v;
            idRows = _yield$_supabase$from15.data;
            nextId = idRows && idRows.length > 0 ? idRows[0].id + 1 : 1;
            rowsToUpsert = [];
            idByKey = {};
            _iterator2 = _createForOfIteratorHelper(approved);
            _context22.p = 4;
            _iterator2.s();
          case 5:
            if ((_step2 = _iterator2.n()).done) {
              _context22.n = 14;
              break;
            }
            r = _step2.value;
            id = nextId++;
            idByKey[r._key] = id;
            imageUrl = r.image || null;
            imageAlt = r.image_alt || null;
            matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
            if (!matchedImage) {
              _context22.n = 12;
              break;
            }
            if (ALLOWED_IMAGE_TYPES.includes(matchedImage.file.type)) {
              _context22.n = 6;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image must be PNG, JPEG, WEBP, or GIF."));
            return _context22.a(2);
          case 6:
            if (!(matchedImage.file.size > MAX_IMAGE_BYTES)) {
              _context22.n = 7;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image is over 5 MB."));
            return _context22.a(2);
          case 7:
            _context22.n = 8;
            return resizeImageForUpload(matchedImage.file);
          case 8:
            resizedImage = _context22.v;
            if (!(resizedImage.size > MAX_IMAGE_BYTES)) {
              _context22.n = 9;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image is still too large after resizing."));
            return _context22.a(2);
          case 9:
            ext = (resizedImage.name.split('.').pop() || 'png').toLowerCase();
            path = "".concat(id, "/question-").concat(id, "-").concat(Date.now(), ".").concat(ext);
            _context22.n = 10;
            return uploadWithSessionRetry('question-images', path, resizedImage, {
              upsert: true,
              contentType: resizedImage.type
            });
          case 10:
            _yield$uploadWithSess2 = _context22.v;
            uploadErr = _yield$uploadWithSess2.error;
            if (!uploadErr) {
              _context22.n = 11;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": image upload failed \u2014 ").concat(uploadErr.message));
            return _context22.a(2);
          case 11:
            _supabase$storage$fro2 = _supabase.storage.from('question-images').getPublicUrl(path), pub = _supabase$storage$fro2.data;
            imageUrl = pub.publicUrl;
            imageAlt = imageAlt || (r.title ? "Image for ".concat(r.title) : "Image for question ".concat(id));
          case 12:
            rowsToUpsert.push({
              id: id,
              title: r.title || null,
              topic: r.topic,
              difficulty: r.difficulty,
              source: r.source || null,
              question: r.question,
              choices: r.choices.filter(Boolean),
              answer: r.answer,
              explanation: r.explanation || null,
              tags: r.tags,
              date_added: new Date().toISOString().slice(0, 10),
              original_test: r.original_test || r.source || null,
              original_question_number: r.original_question_number ? Number(r.original_question_number) : null,
              source_reference: r.source_reference || null,
              image: imageUrl,
              image_alt: imageAlt
            });
          case 13:
            _context22.n = 5;
            break;
          case 14:
            _context22.n = 16;
            break;
          case 15:
            _context22.p = 15;
            _t19 = _context22.v;
            _iterator2.e(_t19);
          case 16:
            _context22.p = 16;
            _iterator2.f();
            return _context22.f(16);
          case 17:
            _context22.n = 18;
            return _supabase.from('questions').upsert(rowsToUpsert, {
              onConflict: 'id'
            });
          case 18:
            _yield$_supabase$from16 = _context22.v;
            error = _yield$_supabase$from16.error;
            setPublishing(false);
            if (!error) {
              _context22.n = 19;
              break;
            }
            setPublishMessage('Publish failed — nothing was saved: ' + error.message);
            return _context22.a(2);
          case 19:
            // Keep the source draft_questions rows in sync so a page refresh doesn't
            // show already-published drafts as pending again.
            publishedDraftIds = approved.filter(function (r) {
              return r._draftId;
            }).map(function (r) {
              return r._draftId;
            });
            if (!publishedDraftIds.length) {
              _context22.n = 20;
              break;
            }
            _context22.n = 20;
            return _supabase.from('draft_questions').update({
              review_status: 'published'
            }).in('id', publishedDraftIds);
          case 20:
            setDraftRows(function (prev) {
              return prev.map(function (r) {
                return idByKey[r._key] != null ? _objectSpread(_objectSpread({}, r), {}, {
                  _status: 'published',
                  id: idByKey[r._key]
                }) : r;
              });
            });
            setPublishMessage("Published ".concat(rowsToUpsert.length, " question(s)."));

            // Rows with no _draftId came from a manually-loaded JSON, not the automatic
            // PDF pipeline, so there's no import_batches row tracking them anywhere --
            // write one now purely as a publish receipt so it shows up under "View all
            // past imports" instead of leaving no trace at all. notified_at is set
            // immediately since the admin just reviewed and published this themselves.
            manualRows = approved.filter(function (r) {
              return !r._draftId;
            });
            if (!manualRows.length) {
              _context22.n = 22;
              break;
            }
            label = manualRows[0].original_test || manualRows[0].source || 'Manual import';
            now = new Date().toISOString();
            _context22.n = 21;
            return _supabase.from('import_batches').insert({
              source_label: label,
              original_test: label,
              status: 'completed',
              questions_extracted: manualRows.length,
              started_at: now,
              finished_at: now,
              notified_at: now,
              created_by: (authUser === null || authUser === void 0 ? void 0 : authUser.id) || null
            });
          case 21:
            if (showAllBatches) {
              _supabase.from('import_batches').select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path').in('status', ['completed', 'needs_attention']).order('started_at', {
                ascending: false
              }).then(function (_ref21) {
                var data = _ref21.data;
                return setAllBatches(data || []);
              });
            }
          case 22:
            return _context22.a(2);
        }
      }, _callee22, null, [[4, 15, 16, 17]]);
    }));
    function publishApproved() {
      return _publishApproved.apply(this, arguments);
    }
    return publishApproved;
  }();
  var publishAll = /*#__PURE__*/function () {
    var _publishAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
      var toPublish, errors, _yield$_supabase$from17, idRows, nextId, rowsToUpsert, idByKey, _iterator3, _step3, r, id, imageUrl, imageAlt, matchedImage, resizedImage, ext, path, _yield$uploadWithSess3, uploadErr, _supabase$storage$fro3, pub, _yield$_supabase$from18, error, publishedDraftIds, manualRows, label, now, _t20;
      return _regenerator().w(function (_context23) {
        while (1) switch (_context23.p = _context23.n) {
          case 0:
            toPublish = draftRows.filter(function (r) {
              return r._status !== 'published';
            });
            if (toPublish.length) {
              _context23.n = 1;
              break;
            }
            setPublishMessage('No questions to publish.');
            return _context23.a(2);
          case 1:
            errors = [];
            toPublish.forEach(function (r) {
              if (!r.question.trim()) errors.push("\"".concat(r.title || 'Untitled', "\": missing question text."));
              var filledChoices = r.choices.filter(function (c) {
                return c && c.trim();
              });
              if (filledChoices.length < 2) errors.push("\"".concat(r.title || 'Untitled', "\": needs at least 2 choices."));
              if (!r.answer.trim()) errors.push("\"".concat(r.title || 'Untitled', "\": missing correct answer."));
              if (!r.topic) errors.push("\"".concat(r.title || 'Untitled', "\": missing topic."));
            });
            if (!errors.length) {
              _context23.n = 2;
              break;
            }
            setPublishMessage('Fix these before publishing: ' + errors.join(' '));
            return _context23.a(2);
          case 2:
            setPublishing(true);
            setPublishMessage('');
            _context23.n = 3;
            return _supabase.from('questions').select('id').order('id', {
              ascending: false
            }).limit(1);
          case 3:
            _yield$_supabase$from17 = _context23.v;
            idRows = _yield$_supabase$from17.data;
            nextId = idRows && idRows.length > 0 ? idRows[0].id + 1 : 1;
            rowsToUpsert = [];
            idByKey = {};
            _iterator3 = _createForOfIteratorHelper(toPublish);
            _context23.p = 4;
            _iterator3.s();
          case 5:
            if ((_step3 = _iterator3.n()).done) {
              _context23.n = 14;
              break;
            }
            r = _step3.value;
            id = nextId++;
            idByKey[r._key] = id;
            imageUrl = r.image || null;
            imageAlt = r.image_alt || null;
            matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
            if (!matchedImage) {
              _context23.n = 12;
              break;
            }
            if (ALLOWED_IMAGE_TYPES.includes(matchedImage.file.type)) {
              _context23.n = 6;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image must be PNG, JPEG, WEBP, or GIF."));
            return _context23.a(2);
          case 6:
            if (!(matchedImage.file.size > MAX_IMAGE_BYTES)) {
              _context23.n = 7;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image is over 5 MB."));
            return _context23.a(2);
          case 7:
            _context23.n = 8;
            return resizeImageForUpload(matchedImage.file);
          case 8:
            resizedImage = _context23.v;
            if (!(resizedImage.size > MAX_IMAGE_BYTES)) {
              _context23.n = 9;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": attached image is still too large after resizing."));
            return _context23.a(2);
          case 9:
            ext = (resizedImage.name.split('.').pop() || 'png').toLowerCase();
            path = "".concat(id, "/question-").concat(id, "-").concat(Date.now(), ".").concat(ext);
            _context23.n = 10;
            return uploadWithSessionRetry('question-images', path, resizedImage, {
              upsert: true,
              contentType: resizedImage.type
            });
          case 10:
            _yield$uploadWithSess3 = _context23.v;
            uploadErr = _yield$uploadWithSess3.error;
            if (!uploadErr) {
              _context23.n = 11;
              break;
            }
            setPublishing(false);
            setPublishMessage("\"".concat(r.title || 'Untitled', "\": image upload failed \u2014 ").concat(uploadErr.message));
            return _context23.a(2);
          case 11:
            _supabase$storage$fro3 = _supabase.storage.from('question-images').getPublicUrl(path), pub = _supabase$storage$fro3.data;
            imageUrl = pub.publicUrl;
            imageAlt = imageAlt || (r.title ? "Image for ".concat(r.title) : "Image for question ".concat(id));
          case 12:
            rowsToUpsert.push({
              id: id,
              title: r.title || null,
              topic: r.topic,
              difficulty: r.difficulty,
              source: r.source || null,
              question: r.question,
              choices: r.choices.filter(Boolean),
              answer: r.answer,
              explanation: r.explanation || null,
              tags: r.tags,
              date_added: new Date().toISOString().slice(0, 10),
              original_test: r.original_test || r.source || null,
              original_question_number: r.original_question_number ? Number(r.original_question_number) : null,
              source_reference: r.source_reference || null,
              image: imageUrl,
              image_alt: imageAlt
            });
          case 13:
            _context23.n = 5;
            break;
          case 14:
            _context23.n = 16;
            break;
          case 15:
            _context23.p = 15;
            _t20 = _context23.v;
            _iterator3.e(_t20);
          case 16:
            _context23.p = 16;
            _iterator3.f();
            return _context23.f(16);
          case 17:
            _context23.n = 18;
            return _supabase.from('questions').upsert(rowsToUpsert, {
              onConflict: 'id'
            });
          case 18:
            _yield$_supabase$from18 = _context23.v;
            error = _yield$_supabase$from18.error;
            setPublishing(false);
            if (!error) {
              _context23.n = 19;
              break;
            }
            setPublishMessage('Publish failed — nothing was saved: ' + error.message);
            return _context23.a(2);
          case 19:
            publishedDraftIds = toPublish.filter(function (r) {
              return r._draftId;
            }).map(function (r) {
              return r._draftId;
            });
            if (!publishedDraftIds.length) {
              _context23.n = 20;
              break;
            }
            _context23.n = 20;
            return _supabase.from('draft_questions').update({
              review_status: 'published'
            }).in('id', publishedDraftIds);
          case 20:
            setDraftRows(function (prev) {
              return prev.map(function (r) {
                return idByKey[r._key] != null ? _objectSpread(_objectSpread({}, r), {}, {
                  _status: 'published',
                  id: idByKey[r._key]
                }) : r;
              });
            });
            setPublishMessage("Published ".concat(rowsToUpsert.length, " question(s)."));
            manualRows = toPublish.filter(function (r) {
              return !r._draftId;
            });
            if (!manualRows.length) {
              _context23.n = 22;
              break;
            }
            label = manualRows[0].original_test || manualRows[0].source || 'Manual import';
            now = new Date().toISOString();
            _context23.n = 21;
            return _supabase.from('import_batches').insert({
              source_label: label,
              original_test: label,
              status: 'completed',
              questions_extracted: manualRows.length,
              started_at: now,
              finished_at: now,
              notified_at: now,
              created_by: (authUser === null || authUser === void 0 ? void 0 : authUser.id) || null
            });
          case 21:
            if (showAllBatches) {
              _supabase.from('import_batches').select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path').in('status', ['completed', 'needs_attention']).order('started_at', {
                ascending: false
              }).then(function (_ref22) {
                var data = _ref22.data;
                return setAllBatches(data || []);
              });
            }
          case 22:
            return _context23.a(2);
        }
      }, _callee23, null, [[4, 15, 16, 17]]);
    }));
    function publishAll() {
      return _publishAll.apply(this, arguments);
    }
    return publishAll;
  }();
  var isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  if (!isAdmin) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-6xl mx-auto px-4 py-16 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2"
    }, "Admin Only"), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-500 dark:text-slate-400"
    }, "Review Imports is only available to the Rizvi admin account."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-black text-slate-900 dark:text-white mb-1"
  }, "Review Imports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400 mb-4"
  }, "Load a draft JSON file (extracted from a PDF), review/edit each question with a live preview, then approve and publish only the ones you've checked. Nothing is saved to Supabase until you click Publish Approved."), resumeBannerInfo && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-500/10 p-4 flex items-center justify-between gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-amber-800 dark:text-amber-300"
  }, "Resume active import", resumeBannerInfo.testName ? " \u2014 ".concat(resumeBannerInfo.testName) : ''), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-700 dark:text-amber-400 mt-0.5"
  }, resumeBannerInfo.stage, " \u2014 picked up automatically from where it left off.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setResumeBannerInfo(null);
    },
    className: "px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20"
  }, "Dismiss"), /*#__PURE__*/React.createElement("button", {
    onClick: cancelActiveImport,
    className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
  }, "Cancel active import"))), pastBatches.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-500/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-blue-800 dark:text-blue-300 mb-2"
  }, pastBatches.length, " import", pastBatches.length === 1 ? '' : 's', " finished and waiting for review"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, pastBatches.map(function (b) {
    var _b$questions_extracte;
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-lg border px-3 py-2 ".concat(b.id === selectedReviewBatchId ? 'border-blue-500 ring-2 ring-blue-400/50' : 'border-slate-200 dark:border-slate-700')
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold text-slate-800 dark:text-slate-100 truncate"
    }, b.source_label || b.original_test || b.id), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, b.status === 'needs_attention' ? '⚠ needs attention' : '✓ completed', " \xB7 ", (_b$questions_extracte = b.questions_extracted) !== null && _b$questions_extracte !== void 0 ? _b$questions_extracte : '?', " question(s)", b.started_at ? " \xB7 ".concat(new Date(b.started_at).toLocaleDateString()) : '')), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return loadBatchForReview(b.id);
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
    }, "Review"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteBatch(b.id, b.source_label || b.original_test || b.id);
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
    }, "Delete")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggleAllBatches,
    className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "transition-transform ".concat(showAllBatches ? 'rotate-90' : '')
  }, "\u25B8"), showAllBatches ? 'Hide all past imports' : 'View all past imports'), showAllBatches && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
  }, "All past imports (", allBatches.length, ") \u2014 includes ones already marked reviewed"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-80 overflow-y-auto"
  }, allBatches.map(function (b) {
    var _b$questions_extracte2;
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-lg border px-3 py-2 ".concat(b.id === selectedReviewBatchId ? 'border-blue-500 ring-2 ring-blue-400/50' : 'border-slate-200 dark:border-slate-700')
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold text-slate-800 dark:text-slate-100 truncate"
    }, b.source_label || b.original_test || b.id), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, b.source_pdf_path == null ? 'manual extraction' : b.status === 'needs_attention' ? '⚠ needs attention' : '✓ completed', " \xB7 ", (_b$questions_extracte2 = b.questions_extracted) !== null && _b$questions_extracte2 !== void 0 ? _b$questions_extracte2 : '?', " question(s)", b.started_at ? " \xB7 ".concat(new Date(b.started_at).toLocaleDateString()) : '')), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, b.source_pdf_path != null && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return loadBatchForReview(b.id);
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
    }, "Review"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteBatch(b.id, b.source_label || b.original_test || b.id);
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
    }, "Delete")));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
  }, "Import from PDF (automatic)"), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "application/pdf",
    onChange: function onChange(e) {
      var _e$target$files;
      return setPdfFile(((_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0]) || null);
    },
    className: "text-sm text-slate-600 dark:text-slate-300 sm:col-span-2"
  }), /*#__PURE__*/React.createElement("input", {
    value: pdfOriginalTest,
    onChange: function onChange(e) {
      return setPdfOriginalTest(e.target.value);
    },
    placeholder: "Original test, e.g. 2025-2026 TMSCA Mathematics Test 5",
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm sm:col-span-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2 flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
  }, answerKeyExtracting ? 'Reading…' : 'Upload answer key (PDF or image, optional)', /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "application/pdf,image/*",
    className: "hidden",
    disabled: answerKeyExtracting,
    onChange: function onChange(e) {
      var _e$target$files2;
      return extractAnswerKeyFile((_e$target$files2 = e.target.files) === null || _e$target$files2 === void 0 ? void 0 : _e$target$files2[0]);
    }
  })), answerKeyExtractMsg && /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, answerKeyExtractMsg)), /*#__PURE__*/React.createElement("textarea", {
    value: pdfAnswerKey,
    onChange: function onChange(e) {
      return setPdfAnswerKey(e.target.value);
    },
    rows: 2,
    placeholder: "Answer key (optional), e.g. 1.C 2.C 3.D 4.E or just C, C, D, E",
    className: "w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none sm:col-span-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-center gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: extractFromPdf,
    disabled: pdfImporting || !pdfFile,
    className: "px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white"
  }, pdfImporting ? 'Working…' : 'Step 1: Transcribe to JSON'), pdfTranscribedBatchId && /*#__PURE__*/React.createElement("button", {
    onClick: generateAnswers,
    disabled: pdfImporting,
    className: "px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white"
  }, "Step 2: Generate Answers"), activeBatchId && !resumeBannerInfo && /*#__PURE__*/React.createElement("button", {
    onClick: cancelActiveImport,
    className: "px-4 py-2 rounded-lg text-sm font-semibold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
  }, "Cancel active import"), pdfImportMessage && /*#__PURE__*/React.createElement("p", {
    className: "text-sm ".concat(/failed/i.test(pdfImportMessage) ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300')
  }, pdfImportMessage)), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-xs text-slate-400 dark:text-slate-500"
  }, "Diagrams aren't auto-cropped yet \u2014 questions that need one are flagged below for manual follow-up before publishing.")), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex flex-col gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "Or load a draft questions JSON (manual extraction)"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "application/json",
    onChange: function onChange(e) {
      var _e$target$files3;
      return loadDraftFile((_e$target$files3 = e.target.files) === null || _e$target$files3 === void 0 ? void 0 : _e$target$files3[0]);
    },
    className: "text-sm text-slate-600 dark:text-slate-300"
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex flex-col gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "Diagram images for the manual path (optional, can pick multiple)"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    multiple: true,
    onChange: function onChange(e) {
      return loadImageFiles(e.target.files);
    },
    className: "text-sm text-slate-600 dark:text-slate-300"
  }))), parseError && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm text-rose-600 dark:text-rose-400"
  }, parseError), draftRows.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
  }, draftRows.length, " loaded"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400"
  }, counts.pending, " pending"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  }, counts.approved, " approved"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400"
  }, counts.rejected, " rejected"), counts.published > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400"
  }, counts.published, " published"), counts.mismatch > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400"
  }, "\u26A0 ", counts.mismatch, " answer key mismatch", counts.mismatch === 1 ? '' : 'es'), counts.needsImage > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400"
  }, "\u26A0 ", counts.needsImage, " needs diagram"), /*#__PURE__*/React.createElement("button", {
    onClick: verifyDraftRows,
    disabled: verifying || publishing,
    title: "Spend a small amount of API credit re-solving each question once and flagging any answer that doesn't match",
    className: "ml-auto px-4 py-2 rounded-lg text-sm font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
  }, verifying ? 'Verifying…' : 'Verify Answers'), /*#__PURE__*/React.createElement("button", {
    onClick: publishApproved,
    disabled: publishing || counts.approved === 0,
    className: "px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white"
  }, publishing ? 'Publishing…' : "Publish Approved (".concat(counts.approved, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: publishAll,
    disabled: publishing || draftRows.filter(function (r) {
      return r._status !== 'published';
    }).length === 0,
    className: "px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white"
  }, publishing ? 'Publishing…' : "Publish All (".concat(draftRows.filter(function (r) {
    return r._status !== 'published';
  }).length, ")"))), verifyMessage && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm ".concat(/failed/i.test(verifyMessage) ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300')
  }, verifyMessage), publishMessage && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm ".concat(publishMessage.startsWith('Published') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
  }, publishMessage)), draftRows.map(function (r) {
    var borderClass = r._status === 'approved' ? 'border-emerald-300 dark:border-emerald-600' : r._status === 'rejected' ? 'border-rose-300 dark:border-rose-700 opacity-60' : r._status === 'published' ? 'border-blue-300 dark:border-blue-600' : 'border-slate-200 dark:border-slate-800';
    var matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
    return /*#__PURE__*/React.createElement("div", {
      key: r._key,
      className: "rounded-2xl border-2 ".concat(borderClass, " bg-white dark:bg-slate-900 p-5")
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3 flex-wrap mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider\n                  ".concat(r._status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : r._status === 'rejected' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400' : r._status === 'published' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300')
    }, r._status, r.id != null ? " \xB7 #".concat(r.id) : ''), /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[r.topic] || 'bg-slate-400')
    }), /*#__PURE__*/React.createElement(DiffPill, {
      d: r.difficulty
    }), r.verification_status === 'match' && /*#__PURE__*/React.createElement("span", {
      className: "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
    }, "\u2713 answer key match"), r.verification_status === 'mismatch' && /*#__PURE__*/React.createElement("span", {
      title: r.verification_notes || '',
      className: "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
    }, "\u26A0 answer key mismatch"), r.needs_image && /*#__PURE__*/React.createElement("span", {
      className: "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
    }, "\u26A0 needs diagram")), r._status !== 'published' && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setStatus(r._key, 'approved');
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
    }, "Approve"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setStatus(r._key, 'rejected');
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
    }, "Reject"), r._status !== 'pending' && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setStatus(r._key, 'pending');
      },
      className: "px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
    }, "Reset"), r._draftId && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return redoQuestion(r._key, r._draftId);
      },
      disabled: r._redoing,
      title: "Re-solve this question with Claude (fixes bad LaTeX, answer mismatches, etc.)",
      className: "px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
    }, r._redoing ? 'Redoing…' : 'Redo'))), r._redoMsg && /*#__PURE__*/React.createElement("p", {
      className: "text-xs mt-1 ".concat(/failed/i.test(r._redoMsg) ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400')
    }, r._redoMsg), /*#__PURE__*/React.createElement("div", {
      className: "grid lg:grid-cols-2 gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("input", {
      value: r.title,
      onChange: function onChange(e) {
        return updateRow(r._key, 'title', e.target.value);
      },
      placeholder: "Title",
      className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-2"
    }, /*#__PURE__*/React.createElement("select", {
      value: r.topic,
      onChange: function onChange(e) {
        return updateRow(r._key, 'topic', e.target.value);
      },
      className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }, TOPICS.filter(function (t) {
      return t !== 'All Topics' && !t.startsWith('Column');
    }).map(function (t) {
      return /*#__PURE__*/React.createElement("option", {
        key: t
      }, t);
    })), /*#__PURE__*/React.createElement("select", {
      value: r.difficulty,
      onChange: function onChange(e) {
        return updateRow(r._key, 'difficulty', e.target.value);
      },
      className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }, /*#__PURE__*/React.createElement("option", null, "Easy"), /*#__PURE__*/React.createElement("option", null, "Medium"), /*#__PURE__*/React.createElement("option", null, "Hard"))), /*#__PURE__*/React.createElement("input", {
      value: r.source,
      onChange: function onChange(e) {
        return updateRow(r._key, 'source', e.target.value);
      },
      placeholder: "Source, e.g. 2026 UIL District",
      className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }), /*#__PURE__*/React.createElement("textarea", {
      value: r.question,
      onChange: function onChange(e) {
        return updateRow(r._key, 'question', e.target.value);
      },
      rows: 3,
      placeholder: "Question text, use \\\\( ... \\\\) for math",
      className: "w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none"
    }), r.choices.map(function (c, i) {
      return /*#__PURE__*/React.createElement("input", {
        key: i,
        value: c,
        onChange: function onChange(e) {
          return updateChoice(r._key, i, e.target.value);
        },
        placeholder: "Choice ".concat(String.fromCharCode(65 + i)),
        className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
      });
    }), /*#__PURE__*/React.createElement("input", {
      value: r.answer,
      onChange: function onChange(e) {
        return updateRow(r._key, 'answer', e.target.value);
      },
      placeholder: "Correct answer, exactly as stored, e.g. (C) 8",
      className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }), /*#__PURE__*/React.createElement("textarea", {
      value: r.explanation,
      onChange: function onChange(e) {
        return updateRow(r._key, 'explanation', e.target.value);
      },
      rows: 3,
      placeholder: "Worked explanation",
      className: "w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none"
    }), /*#__PURE__*/React.createElement("input", {
      value: r.tags.join(', '),
      onChange: function onChange(e) {
        return updateRow(r._key, 'tags', e.target.value.split(',').map(function (t) {
          return t.trim();
        }).filter(Boolean));
      },
      placeholder: "Tags separated by commas",
      className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"
    }), r.image_pending_filename && /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-3"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2"
    }, "Needs image: ", /*#__PURE__*/React.createElement("code", null, r.image_pending_filename)), matchedImage ? /*#__PURE__*/React.createElement("img", {
      src: matchedImage.url,
      alt: "Attached diagram preview",
      className: "max-w-full max-h-40 rounded-lg border border-slate-200 dark:border-slate-700"
    }) : /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-rose-600 dark:text-rose-400"
    }, "Not attached yet \u2014 pick this file in the image picker above.")), !r.image_pending_filename && (r.image ? /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-emerald-300 dark:border-emerald-700 p-3 bg-emerald-50 dark:bg-emerald-500/10"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2"
    }, "\u2713 Diagram attached"), /*#__PURE__*/React.createElement("img", {
      src: r.image,
      alt: r.image_alt || 'Diagram preview',
      className: "max-w-full max-h-40 rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
    }, "Replace image", /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: "image/*",
      className: "hidden",
      onChange: function onChange(e) {
        var _e$target$files4;
        return uploadDraftDiagram(r._key, (_e$target$files4 = e.target.files) === null || _e$target$files4 === void 0 ? void 0 : _e$target$files4[0]);
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return removeDraftDiagram(r._key);
      },
      className: "text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
    }, "Remove image")), r._imageUploadMsg && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
    }, r._imageUploadMsg)) : r.needs_image ? /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-dashed border-amber-300 dark:border-amber-700 p-3 bg-amber-50 dark:bg-amber-500/10"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1"
    }, "\u26A0 Diagram needed (not auto-cropped yet)"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-amber-700 dark:text-amber-400 mb-2"
    }, r.image_alt || 'No description provided.'), /*#__PURE__*/React.createElement("label", {
      className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
    }, r._imageUploading ? 'Uploading…' : 'Upload diagram', /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: "image/*",
      className: "hidden",
      disabled: r._imageUploading,
      onChange: function onChange(e) {
        var _e$target$files5;
        return uploadDraftDiagram(r._key, (_e$target$files5 = e.target.files) === null || _e$target$files5 === void 0 ? void 0 : _e$target$files5[0]);
      }
    })), r._imageUploadMsg && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
    }, r._imageUploadMsg)) : /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
    }, r._imageUploading ? 'Uploading…' : 'Add diagram (optional)', /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: "image/*",
      className: "hidden",
      disabled: r._imageUploading,
      onChange: function onChange(e) {
        var _e$target$files6;
        return uploadDraftDiagram(r._key, (_e$target$files6 = e.target.files) === null || _e$target$files6 === void 0 ? void 0 : _e$target$files6[0]);
      }
    })), r._imageUploadMsg && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
    }, r._imageUploadMsg)))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 overflow-x-auto"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2"
    }, "Live Preview"), /*#__PURE__*/React.createElement("p", {
      className: "font-display text-base font-black text-slate-900 dark:text-white mb-2 break-words"
    }, r.title || 'Untitled Question'), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: r.question || 'Question preview will appear here.'
    })), matchedImage && /*#__PURE__*/React.createElement("img", {
      src: matchedImage.url,
      alt: "Diagram",
      className: "mt-3 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 space-y-1.5"
    }, r.choices.filter(Boolean).map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 break-words"
      }, /*#__PURE__*/React.createElement(MathText, {
        text: c
      }));
    })), r.answer && /*#__PURE__*/React.createElement("p", {
      className: "mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400 break-words"
    }, "Answer: ", /*#__PURE__*/React.createElement(MathText, {
      text: r.answer
    })), r.explanation && /*#__PURE__*/React.createElement("p", {
      className: "mt-2 text-sm text-slate-600 dark:text-slate-300 break-words"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: r.explanation
    })))));
  }));
}
function AdminQuestionManager(_ref23) {
  var authUser = _ref23.authUser;
  var blank = {
    id: '',
    title: '',
    topic: 'Algebra 1 & 2',
    difficulty: 'Easy',
    source: '',
    question: '',
    choices: ['(A) ', '(B) ', '(C) ', '(D) ', '(E) '],
    answer: '',
    explanation: '',
    tags: '',
    date_added: new Date().toISOString().slice(0, 10),
    original_test: '',
    original_question_number: '',
    source_reference: '',
    image: '',
    image_alt: ''
  };
  var _useState83 = useState(blank),
    _useState84 = _slicedToArray(_useState83, 2),
    form = _useState84[0],
    setForm = _useState84[1];
  var _useState85 = useState(''),
    _useState86 = _slicedToArray(_useState85, 2),
    message = _useState86[0],
    setMessage = _useState86[1];
  var _useState87 = useState(false),
    _useState88 = _slicedToArray(_useState87, 2),
    saving = _useState88[0],
    setSaving = _useState88[1];
  var _useState89 = useState(false),
    _useState90 = _slicedToArray(_useState89, 2),
    imageUploading = _useState90[0],
    setImageUploading = _useState90[1];
  var _useLocalStorage = useLocalStorage('admin_panel_tab', 'activity'),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    adminPanelTab = _useLocalStorage2[0],
    setAdminPanelTab = _useLocalStorage2[1];
  var _useState91 = useState(false),
    _useState92 = _slicedToArray(_useState91, 2),
    showDateOverride = _useState92[0],
    setShowDateOverride = _useState92[1];
  var _useState93 = useState(false),
    _useState94 = _slicedToArray(_useState93, 2),
    idLoading = _useState94[0],
    setIdLoading = _useState94[1];
  var _useState95 = useState([]),
    _useState96 = _slicedToArray(_useState95, 2),
    questionList = _useState96[0],
    setQuestionList = _useState96[1];
  var _useState97 = useState(false),
    _useState98 = _slicedToArray(_useState97, 2),
    questionListLoading = _useState98[0],
    setQuestionListLoading = _useState98[1];
  var _useState99 = useState(''),
    _useState100 = _slicedToArray(_useState99, 2),
    questionSearch = _useState100[0],
    setQuestionSearch = _useState100[1];
  var _useState101 = useState('All Topics'),
    _useState102 = _slicedToArray(_useState101, 2),
    filterTopic = _useState102[0],
    setFilterTopic = _useState102[1];
  var _useState103 = useState('All Difficulties'),
    _useState104 = _slicedToArray(_useState103, 2),
    filterDiff = _useState104[0],
    setFilterDiff = _useState104[1];
  var _useState105 = useState('All Types'),
    _useState106 = _slicedToArray(_useState105, 2),
    filterType = _useState106[0],
    setFilterType = _useState106[1];
  var _useState107 = useState('All Sources'),
    _useState108 = _slicedToArray(_useState107, 2),
    filterSource = _useState108[0],
    setFilterSource = _useState108[1];
  var _useState109 = useState(false),
    _useState110 = _slicedToArray(_useState109, 2),
    editingExisting = _useState110[0],
    setEditingExisting = _useState110[1];

  // Auto-generate next question ID when switching to Question Manager tab
  useEffect(function () {
    if (adminPanelTab !== 'questions' || editingExisting || form.id) return;
    setIdLoading(true);
    _supabase.from('questions').select('id').order('id', {
      ascending: false
    }).limit(1).then(function (_ref24) {
      var data = _ref24.data;
      var nextId = data && data.length > 0 ? data[0].id + 1 : 1;
      setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          id: String(nextId)
        });
      });
      setIdLoading(false);
    });
  }, [adminPanelTab, editingExisting]);
  useEffect(function () {
    if (adminPanelTab !== 'editQuestions') return;
    setQuestionListLoading(true);
    _supabase.from('questions').select('*').order('id', {
      ascending: true
    }).then(function (_ref25) {
      var data = _ref25.data,
        error = _ref25.error;
      if (error) {
        setMessage(error.message || 'Could not load questions to edit.');
        setQuestionList([]);
      } else {
        setQuestionList(data || []);
      }
      setQuestionListLoading(false);
    });
  }, [adminPanelTab]);

  // Notification badge for import batches the background queue has finished
  // (completed/needs_attention) that nobody has opened Review Imports for
  // yet. Polled so it stays current even if this dashboard tab is left open
  // while the cron-driven pipeline finishes work in the background.
  var _useState111 = useState(0),
    _useState112 = _slicedToArray(_useState111, 2),
    pendingReviewCount = _useState112[0],
    setPendingReviewCount = _useState112[1];
  var refreshPendingReviewCount = function refreshPendingReviewCount() {
    if (!authUser) return;
    _supabase.from('import_batches').select('id', {
      count: 'exact',
      head: true
    }).in('status', ['completed', 'needs_attention']).is('notified_at', null).then(function (_ref26) {
      var count = _ref26.count;
      return setPendingReviewCount(count || 0);
    });
  };
  useEffect(function () {
    refreshPendingReviewCount();
    var interval = setInterval(refreshPendingReviewCount, 30000);
    return function () {
      return clearInterval(interval);
    };
  }, [authUser]);
  var openReviewImports = function openReviewImports() {
    setAdminPanelTab('reviewImports');
  };
  var normalizeQuestionForForm = function normalizeQuestionForForm(q) {
    var choices = Array.isArray(q.choices) ? _toConsumableArray(q.choices) : [];
    while (choices.length < 5) choices.push("(".concat(String.fromCharCode(65 + choices.length), ") "));
    return {
      id: q.id != null ? String(q.id) : '',
      title: q.title || '',
      topic: q.topic || 'Algebra 1 & 2',
      difficulty: q.difficulty || 'Easy',
      source: q.source || q.original_test || '',
      question: q.question || '',
      choices: choices.slice(0, 5),
      answer: q.answer || '',
      explanation: q.explanation || '',
      tags: Array.isArray(q.tags) ? q.tags.join(', ') : q.tags || '',
      date_added: q.date_added || new Date().toISOString().slice(0, 10),
      original_test: q.original_test || q.source || '',
      original_question_number: q.original_question_number != null ? String(q.original_question_number) : '',
      source_reference: q.source_reference || '',
      image: q.image || '',
      image_alt: q.image_alt || q.imageAlt || ''
    };
  };
  var loadQuestionForEditing = function loadQuestionForEditing(q) {
    setForm(normalizeQuestionForForm(q));
    setEditingExisting(true);
    setAdminPanelTab('questions');
    setShowDateOverride(false);
    setMessage("Editing question #".concat(q.id, ". Make changes and click Save Changes."));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  var startNewQuestion = /*#__PURE__*/function () {
    var _startNewQuestion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
      var _yield$_supabase$from19, data, nextId;
      return _regenerator().w(function (_context24) {
        while (1) switch (_context24.n) {
          case 0:
            setEditingExisting(false);
            setShowDateOverride(false);
            setMessage('');
            setAdminPanelTab('questions');
            setIdLoading(true);
            _context24.n = 1;
            return _supabase.from('questions').select('id').order('id', {
              ascending: false
            }).limit(1);
          case 1:
            _yield$_supabase$from19 = _context24.v;
            data = _yield$_supabase$from19.data;
            nextId = data && data.length > 0 ? data[0].id + 1 : 1;
            setForm(_objectSpread(_objectSpread({}, blank), {}, {
              id: String(nextId),
              date_added: new Date().toISOString().slice(0, 10)
            }));
            setIdLoading(false);
          case 2:
            return _context24.a(2);
        }
      }, _callee24);
    }));
    function startNewQuestion() {
      return _startNewQuestion.apply(this, arguments);
    }
    return startNewQuestion;
  }();
  var isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  if (!isAdmin) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-6xl mx-auto px-4 py-16 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2"
    }, "Admin Only"), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-500 dark:text-slate-400"
    }, "This question manager is only available to the Rizvi admin account."));
  }
  var set = function set(key, value) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, key, value));
    });
  };
  var setChoice = function setChoice(i, value) {
    return setForm(function (f) {
      var choices = _toConsumableArray(f.choices);
      choices[i] = value;
      return _objectSpread(_objectSpread({}, f), {}, {
        choices: choices
      });
    });
  };
  var insertLatex = function insertLatex(snippet) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'question';
    set(target, (form[target] || '') + snippet);
  };
  var uploadImage = /*#__PURE__*/function () {
    var _uploadImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(file) {
      var resized, ext, safeName, path, _yield$_supabase$stor, error, _supabase$storage$fro4, data;
      return _regenerator().w(function (_context25) {
        while (1) switch (_context25.n) {
          case 0:
            if (file) {
              _context25.n = 1;
              break;
            }
            return _context25.a(2);
          case 1:
            if (form.id) {
              _context25.n = 2;
              break;
            }
            setMessage('Question ID not yet generated. Wait a moment and try again.');
            return _context25.a(2);
          case 2:
            if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
              _context25.n = 3;
              break;
            }
            setMessage('Please choose a PNG, JPEG, WEBP, or GIF image.');
            return _context25.a(2);
          case 3:
            if (!(file.size > MAX_IMAGE_BYTES)) {
              _context25.n = 4;
              break;
            }
            setMessage('Image is too large. Please use a file under 5 MB.');
            return _context25.a(2);
          case 4:
            setImageUploading(true);
            setMessage('');
            _context25.n = 5;
            return resizeImageForUpload(file);
          case 5:
            resized = _context25.v;
            if (!(resized.size > MAX_IMAGE_BYTES)) {
              _context25.n = 6;
              break;
            }
            setImageUploading(false);
            setMessage('Image is still too large after resizing. Please use a smaller file.');
            return _context25.a(2);
          case 6:
            ext = (resized.name.split('.').pop() || 'png').toLowerCase();
            safeName = "question-".concat(form.id, "-").concat(Date.now(), ".").concat(ext);
            path = "".concat(form.id, "/").concat(safeName);
            _context25.n = 7;
            return _supabase.storage.from('question-images').upload(path, resized, {
              upsert: true,
              contentType: resized.type
            });
          case 7:
            _yield$_supabase$stor = _context25.v;
            error = _yield$_supabase$stor.error;
            setImageUploading(false);
            if (!error) {
              _context25.n = 8;
              break;
            }
            setMessage(error.message || 'Image upload failed.');
            return _context25.a(2);
          case 8:
            _supabase$storage$fro4 = _supabase.storage.from('question-images').getPublicUrl(path), data = _supabase$storage$fro4.data;
            set('image', data.publicUrl);
            if (!form.image_alt) set('image_alt', form.title ? "Image for ".concat(form.title) : "Image for question ".concat(form.id));
            setMessage('Image uploaded and attached to this question.');
          case 9:
            return _context25.a(2);
        }
      }, _callee25);
    }));
    function uploadImage(_x29) {
      return _uploadImage.apply(this, arguments);
    }
    return uploadImage;
  }();
  var saveQuestion = /*#__PURE__*/function () {
    var _saveQuestion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
      var row, _yield$_supabase$from20, error, nextId;
      return _regenerator().w(function (_context26) {
        while (1) switch (_context26.n) {
          case 0:
            setSaving(true);
            setMessage('');
            row = {
              id: Number(form.id),
              title: form.title || null,
              topic: form.topic,
              difficulty: form.difficulty,
              source: form.source || null,
              question: form.question,
              choices: form.choices.filter(Boolean),
              answer: form.answer,
              explanation: form.explanation || null,
              tags: form.tags.split(',').map(function (t) {
                return t.trim();
              }).filter(Boolean),
              date_added: form.date_added || null,
              original_test: form.original_test || form.source || null,
              original_question_number: form.original_question_number ? Number(form.original_question_number) : null,
              original_question_reference: form.original_test && form.original_question_number ? "".concat(form.original_test, ", Question ").concat(form.original_question_number) : null,
              source_reference: form.source_reference || (form.source && form.original_question_number ? "".concat(form.source, " #").concat(form.original_question_number) : null),
              image: form.image || null,
              image_alt: form.image_alt || null
            };
            if (!(!row.id || !row.question || row.choices.length < 2 || !row.answer)) {
              _context26.n = 1;
              break;
            }
            setSaving(false);
            setMessage('Please fill in the question text, choices, and correct answer.');
            return _context26.a(2);
          case 1:
            _context26.n = 2;
            return _supabase.from('questions').upsert(row, {
              onConflict: 'id'
            });
          case 2:
            _yield$_supabase$from20 = _context26.v;
            error = _yield$_supabase$from20.error;
            setSaving(false);
            if (!error) {
              _context26.n = 3;
              break;
            }
            setMessage(error.message || 'Could not save question.');
            return _context26.a(2);
          case 3:
            setShowDateOverride(false);
            if (editingExisting) {
              setMessage("Question #".concat(row.id, " updated successfully."));
              setQuestionList(function (prev) {
                return prev.map(function (q) {
                  return q.id === row.id ? _objectSpread(_objectSpread({}, q), row) : q;
                });
              });
            } else {
              nextId = String(row.id + 1);
              setForm(_objectSpread(_objectSpread({}, blank), {}, {
                id: nextId,
                date_added: new Date().toISOString().slice(0, 10)
              }));
              setMessage("Question #".concat(row.id, " saved! Ready to add question #").concat(nextId, "."));
            }
          case 4:
            return _context26.a(2);
        }
      }, _callee26);
    }));
    function saveQuestion() {
      return _saveQuestion.apply(this, arguments);
    }
    return saveQuestion;
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Admin"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, "Monitor usage and manage the question bank."), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setAdminPanelTab('activity');
    },
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(adminPanelTab === 'activity' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "User Activity"), /*#__PURE__*/React.createElement("button", {
    onClick: startNewQuestion,
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(adminPanelTab === 'questions' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Add Question"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setAdminPanelTab('editQuestions');
    },
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(adminPanelTab === 'editQuestions' ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Edit Questions"), /*#__PURE__*/React.createElement("button", {
    onClick: openReviewImports,
    className: "px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 ".concat(adminPanelTab === 'reviewImports' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Review Imports", pendingReviewCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold"
  }, pendingReviewCount)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setAdminPanelTab('bugReports');
    },
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(adminPanelTab === 'bugReports' ? 'bg-rose-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Bug Reports"))), adminPanelTab === 'activity' ? /*#__PURE__*/React.createElement(AdminUserActivity, {
    authUser: authUser
  }) : adminPanelTab === 'bugReports' ? /*#__PURE__*/React.createElement(AdminBugReports, {
    authUser: authUser
  }) : adminPanelTab === 'reviewImports' ? /*#__PURE__*/React.createElement(ReviewImportsPanel, {
    authUser: authUser,
    onBatchReviewed: refreshPendingReviewCount
  }) : adminPanelTab === 'editQuestions' ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-5 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-black text-slate-900 dark:text-white mb-1"
  }, "Edit Existing Questions"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400 mb-4"
  }, "Search/select a question. It will open in the same question manager form with all fields filled in."), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    value: questionSearch,
    onChange: function onChange(e) {
      return setQuestionSearch(e.target.value);
    },
    placeholder: "Search by title, question text, topic, source, tags, or ID...",
    className: "w-full pl-3 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-3"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    value: filterTopic,
    options: ['All Topics', 'Algebra 1 & 2', 'Geometry', 'Precalculus', 'AP Calculus', 'AP Statistics'],
    onChange: setFilterTopic
  }), /*#__PURE__*/React.createElement(Dropdown, {
    value: filterDiff,
    options: DIFFICULTIES,
    onChange: setFilterDiff
  }), /*#__PURE__*/React.createElement(Dropdown, {
    value: filterType,
    options: SOURCE_TYPES,
    onChange: setFilterType
  }), /*#__PURE__*/React.createElement(Dropdown, {
    value: filterSource,
    options: ['All Sources'].concat(_toConsumableArray(_toConsumableArray(new Set(questionList.map(function (q) {
      return q.source;
    }).filter(Boolean))).sort())),
    onChange: setFilterSource
  }))), questionListLoading ? /*#__PURE__*/React.createElement("div", {
    className: "py-20 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400"
  }, "Loading questions...")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800 max-h-[70vh] overflow-y-auto"
  }, questionList.filter(function (q) {
    var s = questionSearch.toLowerCase().trim();
    var textMatch = !s || String(q.id || '').includes(s) || String(q.title || '').toLowerCase().includes(s) || String(q.question || '').toLowerCase().includes(s) || String(q.topic || '').toLowerCase().includes(s) || String(q.source || '').toLowerCase().includes(s) || (q.tags || []).some(function (t) {
      return String(t).toLowerCase().includes(s);
    });
    var topicMatch = filterTopic === 'All Topics' || q.topic === filterTopic;
    var diffMatch = filterDiff === 'All Difficulties' || q.difficulty === filterDiff;
    var typeMatch = filterType === 'All Types' || getSourceType(q.source) === filterType;
    var sourceMatch = filterSource === 'All Sources' || q.source === filterSource;
    return textMatch && topicMatch && diffMatch && typeMatch && sourceMatch;
  }).map(function (q) {
    return /*#__PURE__*/React.createElement("button", {
      key: q.id,
      onClick: function onClick() {
        return loadQuestionForEditing(q);
      },
      className: "group w-full text-left px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-mono text-slate-400"
    }, "#", q.id), /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[q.topic] || 'bg-slate-400')
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-semibold text-slate-500 dark:text-slate-400"
    }, q.topic), /*#__PURE__*/React.createElement(DiffPill, {
      d: q.difficulty
    }), q.source && /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 dark:text-slate-500"
    }, q.source)), /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate"
    }, q.title || plainText(q.question) || 'Untitled Question'), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2"
    }, plainText(q.question))), /*#__PURE__*/React.createElement("span", {
      className: "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
    }, "Edit")));
  }), questionList.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-20 text-center text-sm text-slate-400"
  }, "No questions found."))) : /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-[1fr_22rem] gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, "Question ID"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm font-bold text-slate-700 dark:text-slate-200"
  }, idLoading ? /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u2026") : form.id || '—'), editingExisting && /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
  }, "Editing")), editingExisting && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: startNewQuestion,
    className: "text-xs px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 font-semibold"
  }, "+ Add New Instead"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, "Date added: ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-600 dark:text-slate-300"
  }, form.date_added || 'today')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setShowDateOverride(function (v) {
        return !v;
      });
    },
    className: "text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
  }, showDateOverride ? 'Use today' : 'Change date')), showDateOverride && /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.date_added,
    onChange: function onChange(e) {
      return set('date_added', e.target.value);
    },
    className: "px-3 py-1.5 rounded-lg border border-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    value: form.title,
    onChange: function onChange(e) {
      return set('title', e.target.value);
    },
    placeholder: "Title",
    className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }), /*#__PURE__*/React.createElement("select", {
    value: form.topic,
    onChange: function onChange(e) {
      return set('topic', e.target.value);
    },
    className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }, TOPICS.filter(function (t) {
    return t !== 'All Topics' && !t.startsWith('Column');
  }).map(function (t) {
    return /*#__PURE__*/React.createElement("option", {
      key: t
    }, t);
  })), /*#__PURE__*/React.createElement("select", {
    value: form.difficulty,
    onChange: function onChange(e) {
      return set('difficulty', e.target.value);
    },
    className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("option", null, "Easy"), /*#__PURE__*/React.createElement("option", null, "Medium"), /*#__PURE__*/React.createElement("option", null, "Hard")), /*#__PURE__*/React.createElement("input", {
    value: form.source,
    onChange: function onChange(e) {
      return set('source', e.target.value);
    },
    placeholder: "Source, e.g. 2026 UIL District",
    className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }), /*#__PURE__*/React.createElement("input", {
    value: form.original_question_number,
    onChange: function onChange(e) {
      return set('original_question_number', e.target.value);
    },
    placeholder: "Original problem #",
    className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
  }, "Question"), /*#__PURE__*/React.createElement("textarea", {
    value: form.question,
    onChange: function onChange(e) {
      return set('question', e.target.value);
    },
    rows: 5,
    placeholder: "Type the question. Use \\\\( ... \\\\) for inline math.",
    className: "w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 resize-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 space-y-2"
  }, [['Basics', ['\\(x^2\\)', '\\(x_n\\)', '\\(\\frac{a}{b}\\)', '\\(\\sqrt{x}\\)', '\\(\\pi\\)', '\\(\\theta\\)', '\\(\\pm\\)', '\\(\\le\\)', '\\(\\ge\\)', '\\(\\neq\\)']], ['Algebra / Functions', ['\\(f(x)\\)', '\\(f^{-1}(x)\\)', '\\(|x|\\)', '\\(\\log_b x\\)', '\\(\\ln x\\)', '\\(a_n=a_1+(n-1)d\\)', '\\(S_n=\\frac{n}{2}(a_1+a_n)\\)']], ['Geometry / Trig', ['\\(\\sin x\\)', '\\(\\cos x\\)', '\\(\\tan x\\)', '\\(\\sin^2 x+\\cos^2 x=1\\)', '\\(A=\\pi r^2\\)', '\\(a^2+b^2=c^2\\)', '\\(\\angle ABC\\)']], ['Calculus', ['\\(\\lim_{x\\to a}\\)', '\\(\\frac{dy}{dx}\\)', '\\(f\\prime(x)\\)', '\\(f\\prime\\prime(x)\\)', '\\(\\int f(x)\\,dx\\)', '\\(\\int_a^b f(x)\\,dx\\)', '\\(\\frac{d}{dx}\\)', '\\(\\frac{d}{dx}[\\sin x]=\\cos x\\)']], ['Statistics', ['\\(\\bar{x}\\)', '\\(s^2\\)', '\\(\\sigma\\)', '\\(z=\\frac{x-\\mu}{\\sigma}\\)', '\\(P(A)\\)', '\\(P(A\\cap B)\\)', '\\(P(A\\cup B)\\)']], ['Display', ['\\[ y = mx+b \\]', '\\[ ax^2+bx+c=0 \\]', '\\[ \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a} \\]']]].map(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      group = _ref28[0],
      items = _ref28[1];
    return /*#__PURE__*/React.createElement("div", {
      key: group
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1"
    }, group), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-1.5"
    }, items.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s,
        onClick: function onClick() {
          return insertLatex(s);
        },
        className: "px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors"
      }, s);
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2"
  }, form.choices.map(function (c, i) {
    return /*#__PURE__*/React.createElement("input", {
      key: i,
      value: c,
      onChange: function onChange(e) {
        return setChoice(i, e.target.value);
      },
      placeholder: "Choice ".concat(String.fromCharCode(65 + i)),
      className: "px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
    });
  })), /*#__PURE__*/React.createElement("input", {
    value: form.answer,
    onChange: function onChange(e) {
      return set('answer', e.target.value);
    },
    placeholder: "Correct answer exactly as stored, e.g. (C) 8",
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }), /*#__PURE__*/React.createElement("textarea", {
    value: form.explanation,
    onChange: function onChange(e) {
      return set('explanation', e.target.value);
    },
    rows: 4,
    placeholder: "Official explanation. Use LaTeX with \\\\( ... \\\\).",
    className: "w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 resize-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, ['\\(\\frac{a}{b}\\)', '\\(x^2\\)', '\\(\\sqrt{x}\\)', '\\(\\lim_{x\\to a}\\)', '\\(\\frac{dy}{dx}\\)', '\\(\\int_a^b f(x)\\,dx\\)'].map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: function onClick() {
        return insertLatex(s, 'explanation');
      },
      className: "px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors"
    }, s);
  })), /*#__PURE__*/React.createElement("input", {
    value: form.tags,
    onChange: function onChange(e) {
      return set('tags', e.target.value);
    },
    placeholder: "Tags separated by commas, e.g. sequences, arithmetic series",
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
  }, "Question Image"), /*#__PURE__*/React.createElement("label", {
    onDragOver: function onDragOver(e) {
      e.preventDefault();
      e.currentTarget.classList.add('ring-2', 'ring-blue-500');
    },
    onDragLeave: function onDragLeave(e) {
      return e.currentTarget.classList.remove('ring-2', 'ring-blue-500');
    },
    onDrop: function onDrop(e) {
      var _e$dataTransfer$files;
      e.preventDefault();
      e.currentTarget.classList.remove('ring-2', 'ring-blue-500');
      uploadImage((_e$dataTransfer$files = e.dataTransfer.files) === null || _e$dataTransfer$files === void 0 ? void 0 : _e$dataTransfer$files[0]);
    },
    className: "flex flex-col items-center justify-center gap-2 min-h-[140px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors text-center px-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-slate-700 dark:text-slate-200"
  }, "Drag image here"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 dark:text-slate-500"
  }, "or click to upload a screenshot/graph"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: function onChange(e) {
      var _e$target$files7;
      return uploadImage((_e$target$files7 = e.target.files) === null || _e$target$files7 === void 0 ? void 0 : _e$target$files7[0]);
    },
    className: "hidden"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500 mt-2"
  }, "Screenshots work best as PNG/JPG. The question ID is auto-assigned."), imageUploading && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-600 dark:text-blue-400 mt-2"
  }, "Uploading image\u2026"), form.image && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: form.image,
    alt: form.image_alt || 'Question image preview',
    className: "max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 dark:text-slate-500 mt-1 break-all"
  }, form.image)), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("input", {
    value: form.image_alt,
    onChange: function onChange(e) {
      return set('image_alt', e.target.value);
    },
    placeholder: "Image description for accessibility, e.g. graph of hyperbola with asymptotes",
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500 mt-1"
  }, "Image description helps screen readers and gives fallback text if the image fails to load."))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: saveQuestion,
    disabled: saving,
    className: "px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white"
  }, saving ? 'Saving…' : editingExisting ? 'Save Changes' : 'Save Question'), message && /*#__PURE__*/React.createElement("p", {
    className: "text-sm ".concat(message.includes('saved') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
  }, message))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3"
  }, editingExisting ? 'Editing Preview' : 'Live Preview'), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 font-mono"
  }, "#", form.id || '…'), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full ".concat(TOPIC_DOT[form.topic] || 'bg-slate-400')
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-slate-700 dark:text-slate-200"
  }, form.topic), /*#__PURE__*/React.createElement(DiffPill, {
    d: form.difficulty
  })), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 font-display text-lg font-black text-slate-900 dark:text-white"
  }, form.title || 'Untitled Question'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 dark:text-slate-500 mt-1"
  }, form.source || 'Source', " ", form.original_question_number ? "\xB7 Problem ".concat(form.original_question_number) : '')), /*#__PURE__*/React.createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
  }, /*#__PURE__*/React.createElement(MathText, {
    text: form.question || 'Question preview will appear here.'
  })), form.image && /*#__PURE__*/React.createElement("img", {
    src: form.image,
    alt: form.image_alt || 'Question image preview',
    className: "mt-3 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 space-y-2"
  }, form.choices.filter(Boolean).map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300"
    }, /*#__PURE__*/React.createElement(MathText, {
      text: c
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 text-xs text-slate-500 dark:text-slate-400 space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-slate-600 dark:text-slate-300"
  }, "LaTeX quick guide"), /*#__PURE__*/React.createElement("p", null, "Inline math: ", /*#__PURE__*/React.createElement("code", null, "\\\\(x^2+1\\\\)")), /*#__PURE__*/React.createElement("p", null, "Fraction: ", /*#__PURE__*/React.createElement("code", null, "\\\\(\\\\frac{a}{b}\\\\)")), /*#__PURE__*/React.createElement("p", null, "Square root: ", /*#__PURE__*/React.createElement("code", null, "\\\\(\\\\sqrt{x}\\\\)")), /*#__PURE__*/React.createElement("p", null, "Derivative: ", /*#__PURE__*/React.createElement("code", null, "\\\\(\\\\frac{dy}{dx}\\\\)")), /*#__PURE__*/React.createElement("p", null, "Limit: ", /*#__PURE__*/React.createElement("code", null, "\\\\(\\\\lim_{x\\\\to a} f(x)\\\\)")), /*#__PURE__*/React.createElement("p", null, "Integral: ", /*#__PURE__*/React.createElement("code", null, "\\\\(\\\\int_a^b f(x)\\\\,dx\\\\)")), /*#__PURE__*/React.createElement("p", null, "Display equation: ", /*#__PURE__*/React.createElement("code", null, "\\\\[ y=mx+b \\\\]"))))));
}