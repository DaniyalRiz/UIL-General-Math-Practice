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
function SettingsPage(_ref) {
  var _authUser$app_metadat, _authUser$user_metada;
  var authUser = _ref.authUser,
    navigateTab = _ref.navigateTab;
  var providers = (authUser === null || authUser === void 0 || (_authUser$app_metadat = authUser.app_metadata) === null || _authUser$app_metadat === void 0 ? void 0 : _authUser$app_metadat.providers) || [];
  var hasPasswordAuth = providers.includes('email');
  var avatarColor = avatarColorFor(authUser);

  // Stored as custom_avatar_url, not avatar_url -- Google OAuth sign-ins make Supabase
  // re-populate user_metadata.avatar_url from the Google profile photo on every sign-in,
  // which would silently overwrite a custom upload stored under that key.
  var _useState = useState((authUser === null || authUser === void 0 || (_authUser$user_metada = authUser.user_metadata) === null || _authUser$user_metada === void 0 ? void 0 : _authUser$user_metada.custom_avatar_url) || null),
    _useState2 = _slicedToArray(_useState, 2),
    avatarUrl = _useState2[0],
    setAvatarUrl = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    avatarUploading = _useState4[0],
    setAvatarUploading = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    avatarMsg = _useState6[0],
    setAvatarMsg = _useState6[1];
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    currentPw = _useState8[0],
    setCurrentPw = _useState8[1];
  var _useState9 = useState(''),
    _useState0 = _slicedToArray(_useState9, 2),
    newPw = _useState0[0],
    setNewPw = _useState0[1];
  var _useState1 = useState(''),
    _useState10 = _slicedToArray(_useState1, 2),
    confirmPw = _useState10[0],
    setConfirmPw = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    pwSaving = _useState12[0],
    setPwSaving = _useState12[1];
  var _useState13 = useState(''),
    _useState14 = _slicedToArray(_useState13, 2),
    pwMsg = _useState14[0],
    setPwMsg = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    pwConfirming = _useState16[0],
    setPwConfirming = _useState16[1];
  var _useState17 = useState(''),
    _useState18 = _slicedToArray(_useState17, 2),
    toast = _useState18[0],
    setToast = _useState18[1];
  var showToast = function showToast(msg) {
    setToast(msg);
    setTimeout(function () {
      return setToast('');
    }, 2500);
  };
  var uploadAvatar = /*#__PURE__*/function () {
    var _uploadAvatar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
      var cropped, path, _yield$_supabase$stor, uploadErr, _supabase$storage$fro, pub, bustedUrl, _yield$_supabase$auth, updateErr;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (file) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (ALLOWED_AVATAR_TYPES.includes(file.type)) {
              _context.n = 2;
              break;
            }
            setAvatarMsg('Please choose a PNG, JPEG, or WEBP image.');
            return _context.a(2);
          case 2:
            if (!(file.size > MAX_AVATAR_BYTES)) {
              _context.n = 3;
              break;
            }
            setAvatarMsg('Image is too large. Please use a file under 5 MB.');
            return _context.a(2);
          case 3:
            setAvatarUploading(true);
            setAvatarMsg('');
            _context.n = 4;
            return cropAndResizeAvatar(file);
          case 4:
            cropped = _context.v;
            path = "".concat(authUser.id, "/avatar.jpg");
            _context.n = 5;
            return _supabase.storage.from('avatars').upload(path, cropped, {
              upsert: true,
              contentType: cropped.type
            });
          case 5:
            _yield$_supabase$stor = _context.v;
            uploadErr = _yield$_supabase$stor.error;
            if (!uploadErr) {
              _context.n = 6;
              break;
            }
            setAvatarUploading(false);
            setAvatarMsg(uploadErr.message || 'Upload failed.');
            return _context.a(2);
          case 6:
            _supabase$storage$fro = _supabase.storage.from('avatars').getPublicUrl(path), pub = _supabase$storage$fro.data; // Cache-bust: the filename never changes between uploads, so the URL string
            // wouldn't otherwise change and the browser could keep showing the old image.
            bustedUrl = "".concat(pub.publicUrl, "?t=").concat(Date.now());
            _context.n = 7;
            return _supabase.auth.updateUser({
              data: {
                custom_avatar_url: bustedUrl
              }
            });
          case 7:
            _yield$_supabase$auth = _context.v;
            updateErr = _yield$_supabase$auth.error;
            setAvatarUploading(false);
            if (!updateErr) {
              _context.n = 8;
              break;
            }
            setAvatarMsg(updateErr.message || 'Could not save profile picture.');
            return _context.a(2);
          case 8:
            setAvatarUrl(bustedUrl);
            setAvatarMsg('');
            showToast('Profile picture updated.');
          case 9:
            return _context.a(2);
        }
      }, _callee);
    }));
    function uploadAvatar(_x) {
      return _uploadAvatar.apply(this, arguments);
    }
    return uploadAvatar;
  }();
  var removeAvatar = /*#__PURE__*/function () {
    var _removeAvatar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _yield$_supabase$stor2, files, _yield$_supabase$auth2, updateErr;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setAvatarUploading(true);
            setAvatarMsg('');
            _context2.n = 1;
            return _supabase.storage.from('avatars').list(authUser.id);
          case 1:
            _yield$_supabase$stor2 = _context2.v;
            files = _yield$_supabase$stor2.data;
            if (!(files && files.length)) {
              _context2.n = 2;
              break;
            }
            _context2.n = 2;
            return _supabase.storage.from('avatars').remove(files.map(function (f) {
              return "".concat(authUser.id, "/").concat(f.name);
            }));
          case 2:
            _context2.n = 3;
            return _supabase.auth.updateUser({
              data: {
                custom_avatar_url: null
              }
            });
          case 3:
            _yield$_supabase$auth2 = _context2.v;
            updateErr = _yield$_supabase$auth2.error;
            setAvatarUploading(false);
            if (!updateErr) {
              _context2.n = 4;
              break;
            }
            setAvatarMsg(updateErr.message || 'Could not remove profile picture.');
            return _context2.a(2);
          case 4:
            setAvatarUrl(null);
            showToast('Profile picture removed.');
          case 5:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function removeAvatar() {
      return _removeAvatar.apply(this, arguments);
    }
    return removeAvatar;
  }();
  var requestPasswordChange = function requestPasswordChange() {
    setPwMsg('');
    if (!currentPw || !newPw || !confirmPw) {
      setPwMsg('Fill in all three fields.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg('New passwords do not match.');
      return;
    }
    if (newPw.length < 8) {
      setPwMsg('New password must be at least 8 characters.');
      return;
    }
    setPwConfirming(true);
  };
  var confirmPasswordChange = /*#__PURE__*/function () {
    var _confirmPasswordChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _yield$_supabase$auth3, verifyErr, _yield$_supabase$auth4, updateErr;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            setPwConfirming(false);
            setPwSaving(true);
            // Re-verify the current password is actually correct before changing anything --
            // Supabase has no dedicated "verify password" call, so re-authenticating against
            // the live session's email is the standard way to do this safely.
            _context3.n = 1;
            return _supabase.auth.signInWithPassword({
              email: authUser.email,
              password: currentPw
            });
          case 1:
            _yield$_supabase$auth3 = _context3.v;
            verifyErr = _yield$_supabase$auth3.error;
            if (!verifyErr) {
              _context3.n = 2;
              break;
            }
            setPwSaving(false);
            setPwMsg('Current password is incorrect.');
            return _context3.a(2);
          case 2:
            _context3.n = 3;
            return _supabase.auth.updateUser({
              password: newPw
            });
          case 3:
            _yield$_supabase$auth4 = _context3.v;
            updateErr = _yield$_supabase$auth4.error;
            setPwSaving(false);
            if (!updateErr) {
              _context3.n = 4;
              break;
            }
            setPwMsg(updateErr.message || 'Could not update password.');
            return _context3.a(2);
          case 4:
            setPwMsg('');
            setCurrentPw('');
            setNewPw('');
            setConfirmPw('');
            showToast('Password updated successfully.');
          case 5:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    function confirmPasswordChange() {
      return _confirmPasswordChange.apply(this, arguments);
    }
    return confirmPasswordChange;
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white"
  }, "Settings"), /*#__PURE__*/React.createElement("button", {
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
    className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
  }, "Profile picture"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shrink-0 ".concat(avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text)
  }, avatarUrl ? /*#__PURE__*/React.createElement("img", {
    src: avatarUrl,
    alt: "",
    className: "w-full h-full object-cover"
  }) : /*#__PURE__*/React.createElement("span", null, initialsFor(authUser))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center"
  }, avatarUploading ? 'Uploading…' : 'Upload new photo', /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/png,image/jpeg,image/webp",
    className: "hidden",
    disabled: avatarUploading,
    onChange: function onChange(e) {
      var _e$target$files;
      return uploadAvatar((_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0]);
    }
  })), avatarUrl && /*#__PURE__*/React.createElement("button", {
    onClick: removeAvatar,
    disabled: avatarUploading,
    className: "px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
  }, "Remove photo"))), avatarMsg && /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-xs text-rose-600 dark:text-rose-400"
  }, avatarMsg)), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 dark:border-slate-800 pt-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
  }, "Change password"), !hasPasswordAuth ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5"
  }, "You signed in with Google, so there's no password to change here. Manage your password through your Google account.") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: currentPw,
    onChange: function onChange(e) {
      return setCurrentPw(e.target.value);
    },
    placeholder: "Current password",
    disabled: pwConfirming,
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: newPw,
    onChange: function onChange(e) {
      return setNewPw(e.target.value);
    },
    placeholder: "New password",
    disabled: pwConfirming,
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: confirmPw,
    onChange: function onChange(e) {
      return setConfirmPw(e.target.value);
    },
    placeholder: "Confirm new password",
    disabled: pwConfirming,
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60"
  }), pwMsg && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-600 dark:text-rose-400"
  }, pwMsg), pwConfirming ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-800 dark:text-amber-300 mb-2"
  }, "Change your password now? You'll need the new password next time you sign in."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPwConfirming(false);
    },
    className: "flex-1 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmPasswordChange,
    disabled: pwSaving,
    className: "flex-1 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
  }, pwSaving ? 'Updating…' : 'Yes, change it'))) : /*#__PURE__*/React.createElement("button", {
    onClick: requestPasswordChange,
    className: "w-full py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
  }, "Update Password")))), toast && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-[70] bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg"
  }, toast));
}
function ReportBugPage(_ref2) {
  var authUser = _ref2.authUser,
    navigateTab = _ref2.navigateTab;
  var _useState19 = useState(''),
    _useState20 = _slicedToArray(_useState19, 2),
    subject = _useState20[0],
    setSubject = _useState20[1];
  var _useState21 = useState(''),
    _useState22 = _slicedToArray(_useState21, 2),
    description = _useState22[0],
    setDescription = _useState22[1];
  var _useState23 = useState(false),
    _useState24 = _slicedToArray(_useState23, 2),
    saving = _useState24[0],
    setSaving = _useState24[1];
  var _useState25 = useState(''),
    _useState26 = _slicedToArray(_useState25, 2),
    message = _useState26[0],
    setMessage = _useState26[1];
  var submitReport = /*#__PURE__*/function () {
    var _submitReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _yield$_supabase$from, error;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (subject.trim()) {
              _context4.n = 1;
              break;
            }
            setMessage('Please enter a subject.');
            return _context4.a(2);
          case 1:
            if (description.trim()) {
              _context4.n = 2;
              break;
            }
            setMessage('Please describe the problem.');
            return _context4.a(2);
          case 2:
            setSaving(true);
            setMessage('');
            _context4.n = 3;
            return _supabase.from('bug_reports').insert({
              user_id: authUser.id,
              subject: subject.trim(),
              description: description.trim()
            });
          case 3:
            _yield$_supabase$from = _context4.v;
            error = _yield$_supabase$from.error;
            setSaving(false);
            if (!error) {
              _context4.n = 4;
              break;
            }
            setMessage(error.message || 'Could not submit report.');
            return _context4.a(2);
          case 4:
            setMessage('Thanks — your report was submitted.');
            setSubject('');
            setDescription('');
            setTimeout(function () {
              return navigateTab('problems');
            }, 1200);
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    function submitReport() {
      return _submitReport.apply(this, arguments);
    }
    return submitReport;
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white"
  }, "Report a Bug"), /*#__PURE__*/React.createElement("button", {
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
    className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
  }, "Subject"), /*#__PURE__*/React.createElement("input", {
    value: subject,
    onChange: function onChange(e) {
      return setSubject(e.target.value);
    },
    placeholder: "Briefly summarize the problem",
    className: "w-full mb-4 px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }), /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    value: description,
    onChange: function onChange(e) {
      return setDescription(e.target.value);
    },
    rows: 6,
    placeholder: "What happened? What did you expect instead?",
    className: "w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  }), message && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm ".concat(message.startsWith('Thanks') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
  }, message), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: submitReport,
    disabled: saving,
    className: "px-4 py-2 rounded-lg text-sm font-semibold ".concat(!saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed')
  }, saving ? 'Submitting…' : 'Submit'))));
}
function ProfileMenu(_ref3) {
  var _authUser$user_metada2;
  var authUser = _ref3.authUser,
    dark = _ref3.dark,
    toggleTheme = _ref3.toggleTheme,
    signOut = _ref3.signOut,
    view = _ref3.view,
    setView = _ref3.setView,
    tab = _ref3.tab,
    setTab = _ref3.setTab,
    recommendedMode = _ref3.recommendedMode,
    setRecommendedMode = _ref3.setRecommendedMode,
    bookmarksCount = _ref3.bookmarksCount,
    setPage = _ref3.setPage,
    navigateTab = _ref3.navigateTab,
    onUsedRecommendedPractice = _ref3.onUsedRecommendedPractice,
    masteryStats = _ref3.masteryStats;
  var _useState27 = useState(false),
    _useState28 = _slicedToArray(_useState27, 2),
    open = _useState28[0],
    setOpen = _useState28[1];
  var avatarUrl = (authUser === null || authUser === void 0 || (_authUser$user_metada2 = authUser.user_metadata) === null || _authUser$user_metada2 === void 0 ? void 0 : _authUser$user_metada2.custom_avatar_url) || null;
  var menuRef = useRef(null);
  var avatarColor = avatarColorFor(authUser);
  useEffect(function () {
    if (!open) return;
    var handlePointer = function handlePointer(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    var handleKey = function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return function () {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative",
    ref: menuRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 shrink-0"
  }, masteryStats && function () {
    var pct = Math.min(100, Math.round(masteryStats.total_mastered / TOTAL_QUESTIONS * 100));
    var lvl = getMasteryLevel(pct);
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setOpen(false);
        navigateTab('mastery');
      },
      className: "hidden md:flex flex-col items-end gap-1 hover:opacity-75 transition-opacity"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] font-bold uppercase tracking-wide leading-none ".concat(lvl.color)
    }, lvl.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all duration-500 ".concat(lvl.bar),
      style: {
        width: "".concat(pct, "%")
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold tabular-nums ".concat(lvl.color)
    }, pct, "%")));
  }(), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return tab === 'settings' || tab === 'reportBug' ? navigateTab('problems') : setOpen(function (o) {
        return !o;
      });
    },
    title: tab === 'settings' || tab === 'reportBug' ? 'Back to Problems' : 'Account menu',
    className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs hover:border-blue-400 transition-colors shrink-0 ".concat(avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text)
  }, avatarUrl ? /*#__PURE__*/React.createElement("img", {
    src: avatarUrl,
    alt: "",
    className: "w-full h-full object-cover"
  }) : /*#__PURE__*/React.createElement("span", null, initialsFor(authUser)))), open && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg py-1.5 z-40 text-sm"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setOpen(false);
      navigateTab('mastery');
    },
    className: "w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ".concat(tab === "mastery" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300")
  }, "My Mastery"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var next = view !== "recommended" || tab !== "problems";
      setTab("problems");
      setRecommendedMode(next);
      setView(next ? "recommended" : "list");
      setPage(1);
      if (next) onUsedRecommendedPractice === null || onUsedRecommendedPractice === void 0 || onUsedRecommendedPractice();
      setOpen(false);
    },
    className: "w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ".concat(view === "recommended" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300")
  }, "Recommended Practice"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setTab("problems");
      setRecommendedMode(false);
      setView(function (v) {
        return v === "review" && tab === "problems" ? "list" : "review";
      });
      setPage(1);
      setOpen(false);
    },
    className: "w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ".concat(view === "review" ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-slate-700 dark:text-slate-300")
  }, /*#__PURE__*/React.createElement("span", null, "Review Later"), bookmarksCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
  }, bookmarksCount)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setOpen(false);
      navigateTab('reportBug');
    },
    className: "w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ".concat(tab === "reportBug" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300")
  }, "Report a Bug"), /*#__PURE__*/React.createElement("div", {
    className: "my-1 border-t border-slate-100 dark:border-slate-800"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: toggleTheme,
    className: "w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("span", null, "Appearance"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500"
  }, dark ? /*#__PURE__*/React.createElement(SunIcon, null) : /*#__PURE__*/React.createElement(MoonIcon, null), dark ? 'Dark' : 'Light')), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setOpen(false);
      navigateTab('settings');
    },
    className: "w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ".concat(tab === "settings" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300")
  }, "Settings"), /*#__PURE__*/React.createElement("div", {
    className: "my-1 border-t border-slate-100 dark:border-slate-800"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setOpen(false);
      signOut();
    },
    className: "w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400"
  }, "Sign Out")));
}
function App() {
  var _useTheme = useTheme(),
    _useTheme2 = _slicedToArray(_useTheme, 2),
    dark = _useTheme2[0],
    toggleTheme = _useTheme2[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    authUser = _useState30[0],
    setAuthUser = _useState30[1];
  var _useLocalStorage = useLocalStorage('current_tab', 'problems'),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    tab = _useLocalStorage2[0],
    setTab = _useLocalStorage2[1]; // 'problems' | 'analytics' | 'history' | 'admin'

  // Auth state listener — use getSession() which reliably restores persisted sessions
  useEffect(function () {
    _supabase.auth.getSession().then(function (_ref4) {
      var _session$user;
      var session = _ref4.data.session;
      setAuthUser((_session$user = session === null || session === void 0 ? void 0 : session.user) !== null && _session$user !== void 0 ? _session$user : null);
    });
    var _supabase$auth$onAuth = _supabase.auth.onAuthStateChange(function (_e, session) {
        var _session$user2;
        setAuthUser((_session$user2 = session === null || session === void 0 ? void 0 : session.user) !== null && _session$user2 !== void 0 ? _session$user2 : null);
      }),
      subscription = _supabase$auth$onAuth.data.subscription;
    return function () {
      return subscription.unsubscribe();
    };
  }, []);
  var signOut = /*#__PURE__*/function () {
    var _signOut = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return _supabase.auth.signOut();
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    function signOut() {
      return _signOut.apply(this, arguments);
    }
    return signOut;
  }();
  var _useState31 = useState("All Topics"),
    _useState32 = _slicedToArray(_useState31, 2),
    topic = _useState32[0],
    setTopic = _useState32[1];
  var _useState33 = useState("All Difficulties"),
    _useState34 = _slicedToArray(_useState33, 2),
    diff = _useState34[0],
    setDiff = _useState34[1];
  var _useState35 = useState(""),
    _useState36 = _slicedToArray(_useState35, 2),
    search = _useState36[0],
    setSearch = _useState36[1];
  var _useState37 = useState(1),
    _useState38 = _slicedToArray(_useState37, 2),
    page = _useState38[0],
    setPage = _useState38[1];
  var _useState39 = useState(null),
    _useState40 = _slicedToArray(_useState39, 2),
    openIdx = _useState40[0],
    setOpenIdx = _useState40[1];
  var _useState41 = useState("list"),
    _useState42 = _slicedToArray(_useState41, 2),
    view = _useState42[0],
    setView = _useState42[1];
  var answersRef = useRef({});
  var _useState43 = useState(0),
    _useState44 = _slicedToArray(_useState43, 2),
    answerVersion = _useState44[0],
    setAnswerVersion = _useState44[1];
  var _useLocalStorage3 = useLocalStorage("uilmath-qstats", {}),
    _useLocalStorage4 = _slicedToArray(_useLocalStorage3, 2),
    qStats = _useLocalStorage4[0],
    setQStats = _useLocalStorage4[1];
  var _useLocalStorage5 = useLocalStorage("uilmath-bookmarks", []),
    _useLocalStorage6 = _slicedToArray(_useLocalStorage5, 2),
    bookmarks = _useLocalStorage6[0],
    setBookmarks = _useLocalStorage6[1];
  var _useState45 = useState(null),
    _useState46 = _slicedToArray(_useState45, 2),
    masteryStats = _useState46[0],
    setMasteryStats = _useState46[1];
  var _useState47 = useState(false),
    _useState48 = _slicedToArray(_useState47, 2),
    recommendedMode = _useState48[0],
    setRecommendedMode = _useState48[1];
  var _useState49 = useState("All"),
    _useState50 = _slicedToArray(_useState49, 2),
    recStatus = _useState50[0],
    setRecStatus = _useState50[1];
  var _useState51 = useState("Most Recent"),
    _useState52 = _slicedToArray(_useState51, 2),
    recSort = _useState52[0],
    setRecSort = _useState52[1];
  var _useState53 = useState("All Types"),
    _useState54 = _slicedToArray(_useState53, 2),
    typeFilter = _useState54[0],
    setTypeFilter = _useState54[1];
  var _useState55 = useState("All Sources"),
    _useState56 = _slicedToArray(_useState55, 2),
    sourceFilter = _useState56[0],
    setSourceFilter = _useState56[1];

  // Rebuild per-question stats from the `attempts` table on login. Answers can only be
  // submitted while signed in, so server history is authoritative — this keeps the list's
  // status dots correct on a new device/browser instead of relying on local cache alone.
  useEffect(function () {
    if (!authUser) return;
    var cancelled = false;
    _supabase.from('attempts').select('question_id,is_correct,time_taken_ms,created_at').eq('user_id', authUser.id).order('created_at', {
      ascending: true
    }).then(function (_ref5) {
      var data = _ref5.data,
        error = _ref5.error;
      if (cancelled || error || !data) return;
      var agg = {};
      data.forEach(function (r) {
        var cur = agg[r.question_id] || {
          attempts: 0,
          correct: 0,
          bestMs: null,
          lastMs: null
        };
        var ms = r.time_taken_ms || 0;
        cur.attempts += 1;
        if (r.is_correct) cur.correct += 1;
        cur.bestMs = cur.bestMs == null ? ms : Math.min(cur.bestMs, ms);
        cur.lastMs = ms; // rows are ascending by created_at, so the last write is the most recent
        agg[r.question_id] = cur;
      });
      setQStats(agg);
    });
    return function () {
      cancelled = true;
    };
  }, [authUser === null || authUser === void 0 ? void 0 : authUser.id]);
  var loadMasteryStats = /*#__PURE__*/function () {
    var _loadMasteryStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var _yield$_supabase$rpc, data, error;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (authUser) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            _context6.n = 2;
            return _supabase.rpc('get_mastery_stats');
          case 2:
            _yield$_supabase$rpc = _context6.v;
            data = _yield$_supabase$rpc.data;
            error = _yield$_supabase$rpc.error;
            if (!error && data && data.length > 0) setMasteryStats(data[0]);
          case 3:
            return _context6.a(2);
        }
      }, _callee6);
    }));
    function loadMasteryStats() {
      return _loadMasteryStats.apply(this, arguments);
    }
    return loadMasteryStats;
  }();
  useEffect(function () {
    if (!authUser) {
      setMasteryStats(null);
      return;
    }
    loadMasteryStats();
  }, [authUser === null || authUser === void 0 ? void 0 : authUser.id]);
  var markUsedRecommendedPractice = /*#__PURE__*/function () {
    var _markUsedRecommendedPractice = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var _yield$_supabase$from2, error;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!(!authUser || masteryStats !== null && masteryStats !== void 0 && masteryStats.used_recommended_practice)) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            _context7.n = 2;
            return _supabase.from('user_stats').update({
              used_recommended_practice: true
            }).eq('user_id', authUser.id);
          case 2:
            _yield$_supabase$from2 = _context7.v;
            error = _yield$_supabase$from2.error;
            if (!error) setMasteryStats(function (prev) {
              return prev ? _objectSpread(_objectSpread({}, prev), {}, {
                used_recommended_practice: true
              }) : prev;
            });
          case 3:
            return _context7.a(2);
        }
      }, _callee7);
    }));
    function markUsedRecommendedPractice() {
      return _markUsedRecommendedPractice.apply(this, arguments);
    }
    return markUsedRecommendedPractice;
  }();

  // ── Browser back/forward history management ───────────────────────────────
  // Push a history entry when opening a problem or switching tabs so the
  // browser back button navigates within the SPA instead of leaving the page.
  var pushingHistory = useRef(false);
  var pushAppState = function pushAppState(state) {
    pushingHistory.current = true;
    window.history.pushState(state, '');
    setTimeout(function () {
      pushingHistory.current = false;
    }, 0);
  };

  // Seed the initial history entry on mount
  useEffect(function () {
    window.history.replaceState({
      tab: 'problems',
      openIdx: null,
      view: 'list',
      recommendedMode: false
    }, '');
  }, []);

  // Restore in-app state on browser back/forward
  useEffect(function () {
    var onPop = function onPop(e) {
      var _s$openIdx;
      if (pushingHistory.current) return;
      var s = e.state;
      if (!s) return;
      setTab(s.tab || 'problems');
      setView(s.view || 'list');
      setRecommendedMode(!!s.recommendedMode);
      setOpenIdx((_s$openIdx = s.openIdx) !== null && _s$openIdx !== void 0 ? _s$openIdx : null);
    };
    window.addEventListener('popstate', onPop);
    return function () {
      return window.removeEventListener('popstate', onPop);
    };
  }, []);

  // Navigation helpers that also push browser history
  var openProblem = function openProblem(idx) {
    pushAppState({
      tab: 'problems',
      openIdx: idx,
      view: view,
      recommendedMode: recommendedMode
    });
    setOpenIdx(idx);
  };
  var closeProblem = function closeProblem() {
    setOpenIdx(null);
    if (view === "recommended") {
      setRecommendedMode(false);
      setView("list");
    }
  };
  var navigateTab = function navigateTab(t) {
    pushAppState({
      tab: t,
      openIdx: null,
      view: 'list',
      recommendedMode: false
    });
    setTab(t);
    setOpenIdx(null);
    if (t === 'problems') {
      setRecommendedMode(false);
      setView('list');
      setTopic("All Topics");
      setDiff("All Difficulties");
      setSearch("");
      setPage(1);
    }
  };
  var _useState57 = useState([]),
    _useState58 = _slicedToArray(_useState57, 2),
    questions = _useState58[0],
    setQuestions = _useState58[1];
  var _useState59 = useState("loading"),
    _useState60 = _slicedToArray(_useState59, 2),
    loadState = _useState60[0],
    setLoadState = _useState60[1]; // "loading" | "ready" | "error"
  var _useState61 = useState(""),
    _useState62 = _slicedToArray(_useState61, 2),
    loadError = _useState62[0],
    setLoadError = _useState62[1];
  useEffect(function () {
    var cancelled = false;
    function loadQuestionsFromSupabase() {
      return _loadQuestionsFromSupabase.apply(this, arguments);
    }
    function _loadQuestionsFromSupabase() {
      _loadQuestionsFromSupabase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _yield$_supabase$from3, data, error, normalized, _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return _supabase.from("public_questions").select("*").order("id", {
                ascending: true
              });
            case 1:
              _yield$_supabase$from3 = _context8.v;
              data = _yield$_supabase$from3.data;
              error = _yield$_supabase$from3.error;
              if (!error) {
                _context8.n = 2;
                break;
              }
              throw error;
            case 2:
              normalized = (data || []).map(function (q) {
                return _objectSpread(_objectSpread({}, q), {}, {
                  imageAlt: q.image_alt || q.imageAlt || "Figure for problem",
                  date_added: q.date_added || null,
                  tags: q.tags || [],
                  choices: q.choices || []
                });
              });
              if (!cancelled) {
                setQuestions(normalized);
                setLoadState("ready");
              }
              _context8.n = 4;
              break;
            case 3:
              _context8.p = 3;
              _t = _context8.v;
              if (!cancelled) {
                setLoadError(_t.message || String(_t));
                setLoadState("error");
              }
            case 4:
              return _context8.a(2);
          }
        }, _callee8, null, [[0, 3]]);
      }));
      return _loadQuestionsFromSupabase.apply(this, arguments);
    }
    loadQuestionsFromSupabase();
    return function () {
      cancelled = true;
    };
  }, []);
  var toggleBookmark = function toggleBookmark(id) {
    setBookmarks(function (prev) {
      return prev.includes(id) ? prev.filter(function (x) {
        return x !== id;
      }) : [].concat(_toConsumableArray(prev), [id]);
    });
  };
  var recommendedIds = useMemo(function () {
    if (!questions.length) return new Set();
    var answeredEntries = Object.entries(qStats || {});
    if (!answeredEntries.length) {
      return new Set(questions.slice().sort(function (a, b) {
        var _rank$a$difficulty, _rank$b$difficulty;
        var rank = {
          Easy: 0,
          Medium: 1,
          Hard: 2
        };
        return ((_rank$a$difficulty = rank[a.difficulty]) !== null && _rank$a$difficulty !== void 0 ? _rank$a$difficulty : 1) - ((_rank$b$difficulty = rank[b.difficulty]) !== null && _rank$b$difficulty !== void 0 ? _rank$b$difficulty : 1);
      }).slice(0, 20).map(function (q) {
        return q.id;
      }));
    }
    var attemptedIds = new Set(answeredEntries.map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1),
        id = _ref7[0];
      return Number(id);
    }));
    var topicStats = {};
    var columnStats = {};
    questions.forEach(function (q) {
      var stat = qStats[q.id];
      if (!stat || !stat.attempts) return;
      if (!topicStats[q.topic]) topicStats[q.topic] = {
        attempts: 0,
        correct: 0
      };
      topicStats[q.topic].attempts += stat.attempts;
      topicStats[q.topic].correct += stat.correct || 0;
      var col = getColumnCategory(q);
      if (col) {
        if (!columnStats[col]) columnStats[col] = {
          attempts: 0,
          correct: 0
        };
        columnStats[col].attempts += stat.attempts;
        columnStats[col].correct += stat.correct || 0;
      }
    });
    var acc = function acc(obj, key) {
      return obj[key] && obj[key].attempts ? obj[key].correct / obj[key].attempts : 0.65;
    };
    var scored = questions.map(function (q) {
      var topicAccuracy = acc(topicStats, q.topic);
      var columnAccuracy = acc(columnStats, getColumnCategory(q));
      var unattemptedBoost = attemptedIds.has(q.id) ? 0 : 30;
      var weakTopicBoost = (1 - topicAccuracy) * 45;
      var weakColumnBoost = (1 - columnAccuracy) * 35;
      var difficultyBoost = q.difficulty === "Medium" ? 4 : q.difficulty === "Hard" ? 2 : 0;
      return {
        q: q,
        score: unattemptedBoost + weakTopicBoost + weakColumnBoost + difficultyBoost
      };
    });
    return new Set(scored.sort(function (a, b) {
      return b.score - a.score;
    }).slice(0, 25).map(function (x) {
      return x.q.id;
    }));
  }, [questions, qStats]);
  var filtered = useMemo(function () {
    return questions.filter(function (q) {
      if (recommendedMode && !recommendedIds.has(q.id)) return false;
      if (topic !== "All Topics") {
        var col = getColumnCategory(q);
        if (["Column 1", "Column 2", "Column 3"].includes(topic)) {
          if (col !== topic) return false;
        } else if (q.topic !== topic) return false;
      }
      if (diff !== "All Difficulties" && q.difficulty !== diff) return false;
      if (typeFilter !== "All Types" && getSourceType(q.source || '') !== typeFilter) return false;
      if (sourceFilter !== "All Sources" && (q.source || "") !== sourceFilter) return false;
      if (search.trim()) {
        var s = search.toLowerCase();
        return q.question.toLowerCase().includes(s) || q.tags.some(function (t) {
          return t.includes(s);
        }) || q.topic.toLowerCase().includes(s) || (q.source || "").toLowerCase().includes(s);
      }
      return true;
    });
  }, [questions, topic, diff, search, typeFilter, sourceFilter, recommendedMode, recommendedIds]);
  var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  var pageClamped = Math.min(page, totalPages);
  var pageItems = filtered.slice((pageClamped - 1) * PAGE_SIZE, pageClamped * PAGE_SIZE);
  var recordAnswer = function recordAnswer(rec) {
    answersRef.current[rec.questionId] = rec;
    setAnswerVersion(function (v) {
      return v + 1;
    });
    updateUserStatsOnly(authUser);
    if (rec.correct) loadMasteryStats();
    // Accumulate persistent per-question stats
    setQStats(function (prev) {
      var cur = prev[rec.questionId] || {
        attempts: 0,
        correct: 0,
        bestMs: null,
        lastMs: null
      };
      var next = {
        attempts: cur.attempts + 1,
        correct: cur.correct + (rec.correct ? 1 : 0),
        bestMs: cur.bestMs == null ? rec.timeMs : Math.min(cur.bestMs, rec.timeMs),
        lastMs: rec.timeMs
      };
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, rec.questionId, next));
    });
  };

  // Reset specific source when type changes so stale selections don't persist
  useEffect(function () {
    setSourceFilter("All Sources");
    setPage(1);
  }, [typeFilter]);
  var counts = useMemo(function () {
    var t = {},
      d = {};
    TOPICS.forEach(function (x) {
      if (x === "All Topics") t[x] = questions.length;else if (["Column 1", "Column 2", "Column 3"].includes(x)) t[x] = questions.filter(function (q) {
        return getColumnCategory(q) === x;
      }).length;else t[x] = questions.filter(function (q) {
        return q.topic === x;
      }).length;
    });
    DIFFICULTIES.forEach(function (x) {
      return d[x] = x === "All Difficulties" ? questions.length : questions.filter(function (q) {
        return q.difficulty === x;
      }).length;
    });
    return {
      t: t,
      d: d
    };
  }, [questions]);
  var uniqueSources = useMemo(function () {
    var srcs = new Set(questions.filter(function (q) {
      return typeFilter === 'All Types' || getSourceType(q.source || '') === typeFilter;
    }).map(function (q) {
      return q.source || '';
    }).filter(Boolean));
    return ['All Sources'].concat(_toConsumableArray(_toConsumableArray(srcs).sort()));
  }, [questions, typeFilter]);
  var onFilter = function onFilter(setter, val) {
    setter(val);
    setPage(1);
  };
  var statusFor = function statusFor(q) {
    var a = answersRef.current[q.id];
    if (!a) return undefined;
    return a.correct ? "correct" : "wrong";
  };
  var recommendedVisible = useMemo(function () {
    var arr = _toConsumableArray(filtered);
    if (recStatus !== "All") {
      arr = arr.filter(function (q) {
        var s = statusFor(q);
        if (recStatus === "Unattempted") return !s;
        if (recStatus === "Correct") return s === "correct";
        if (recStatus === "Missed") return s === "wrong";
        return true;
      });
    }
    arr.sort(function (a, b) {
      if (recSort === "Oldest") return new Date(a.date_added || 0) - new Date(b.date_added || 0);
      if (recSort === "Title") return String(a.title || "").localeCompare(String(b.title || ""));
      if (recSort === "Hardest") {
        var _rank$a$difficulty2, _rank$b$difficulty2;
        var rank = {
          Hard: 0,
          Medium: 1,
          Easy: 2
        };
        return ((_rank$a$difficulty2 = rank[a.difficulty]) !== null && _rank$a$difficulty2 !== void 0 ? _rank$a$difficulty2 : 3) - ((_rank$b$difficulty2 = rank[b.difficulty]) !== null && _rank$b$difficulty2 !== void 0 ? _rank$b$difficulty2 : 3);
      }
      return new Date(b.date_added || 0) - new Date(a.date_added || 0);
    });
    return arr;
  }, [filtered, recStatus, recSort, answerVersion]);

  // Loading / error screens — shown before the nav even renders
  if (loadState === "loading") {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center px-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-700 dark:text-slate-200 font-semibold text-lg"
    }, "Loading practice questions\u2026"), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-400 text-sm mt-1"
    }, "Fetching questions from Supabase")));
  }
  if (loadState === "error") {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center px-6 max-w-md"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-slate-800 dark:text-slate-100 font-bold text-lg mb-2"
    }, "Could not load questions"), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-500 dark:text-slate-400 text-sm mb-4"
    }, "The secure question database could not be reached. Check your Supabase connection and public_questions view."), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-400 text-xs font-mono"
    }, loadError), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return window.location.reload();
      },
      className: "mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
    }, "Retry")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-2 sm:px-4 h-14 flex items-center justify-between gap-1 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 min-w-0 overflow-x-auto no-scrollbar flex-1"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/logo-icon.svg",
    alt: "UIL Math Practice",
    className: "hidden lg:block h-7 w-auto flex-shrink-0 mr-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-0.5 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
  }, "Home"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      navigateTab('problems');
      setView('list');
      setRecommendedMode(false);
      setTopic("All Topics");
      setDiff("All Difficulties");
      setTypeFilter("All Types");
      setSourceFilter("All Sources");
      setSearch("");
      setPage(1);
    },
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap\n                  ".concat(tab === 'problems' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Problems"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return navigateTab('analytics');
    },
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap\n                  ".concat(tab === 'analytics' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Analytics"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return navigateTab('history');
    },
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap\n                  ".concat(tab === 'history' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "History"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return navigateTab('leaderboard');
    },
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap\n                  ".concat(tab === 'leaderboard' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Leaderboard"), authUser && ADMIN_EMAILS.includes(authUser.email || '') && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return navigateTab('admin');
    },
    className: "px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap\n                    ".concat(tab === 'admin' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800')
  }, "Admin"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2 flex-shrink-0"
  }, authUser ? /*#__PURE__*/React.createElement(ProfileMenu, {
    authUser: authUser,
    dark: dark,
    toggleTheme: toggleTheme,
    signOut: signOut,
    view: view,
    setView: setView,
    tab: tab,
    setTab: setTab,
    recommendedMode: recommendedMode,
    setRecommendedMode: setRecommendedMode,
    bookmarksCount: bookmarks.length,
    setPage: setPage,
    navigateTab: navigateTab,
    onUsedRecommendedPractice: markUsedRecommendedPractice,
    masteryStats: masteryStats
  }) : /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "text-xs px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors whitespace-nowrap"
  }, "Sign In")))), tab === 'mastery' ? /*#__PURE__*/React.createElement(MasteryPage, {
    authUser: authUser,
    masteryStats: masteryStats,
    bookmarksCount: bookmarks.length,
    navigateTab: navigateTab
  }) : tab === 'leaderboard' ? /*#__PURE__*/React.createElement(LeaderboardPage, {
    authUser: authUser
  }) : tab === 'analytics' ? /*#__PURE__*/React.createElement(AnalyticsPage, {
    authUser: authUser
  }) : tab === 'history' ? /*#__PURE__*/React.createElement(HistoryPage, {
    authUser: authUser,
    allQuestions: questions,
    onOpenQuestion: function onOpenQuestion(id) {
      navigateTab('problems');
      setRecommendedMode(false);
      setTopic("All Topics");
      setDiff("All Difficulties");
      setSearch("");
      setView("list");
      setPage(1);
      setTimeout(function () {
        var idx = filtered.findIndex(function (q) {
          return q.id === id;
        });
        if (idx !== -1) openProblem(idx);
      }, 80);
    }
  }) : tab === 'admin' ? /*#__PURE__*/React.createElement(AdminQuestionManager, {
    authUser: authUser
  }) : tab === 'settings' ? /*#__PURE__*/React.createElement(SettingsPage, {
    authUser: authUser,
    navigateTab: navigateTab
  }) : tab === 'reportBug' ? /*#__PURE__*/React.createElement(ReportBugPage, {
    authUser: authUser,
    navigateTab: navigateTab
  }) : view === "recommended" ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Recommended Practice"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, recommendedVisible.length, " recommended problem", recommendedVisible.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setRecommendedMode(false);
      setView('list');
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
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-blue-900 dark:text-blue-200 mb-1"
  }, "How recommendations work"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-800 dark:text-blue-300 leading-relaxed"
  }, "The site recommends questions by looking at your previous attempts. It prioritizes problems from your weakest topics and UIL columns, gives extra priority to questions you have not attempted yet, and slightly favors medium or hard problems when they are useful for growth."), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-wrap gap-2 text-xs font-semibold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
  }, "Weak topics"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
  }, "Weak columns"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
  }, "Unattempted questions"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
  }, "Appropriate difficulty"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 min-w-[220px]"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search title, text, topic, tags...",
    value: search,
    onChange: function onChange(e) {
      setSearch(e.target.value);
      setPage(1);
    },
    className: "w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Status",
    value: recStatus,
    options: ["All", "Unattempted", "Correct", "Missed"],
    onChange: function onChange(v) {
      setRecStatus(v);
      setPage(1);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Topic",
    value: topic,
    options: TOPICS,
    onChange: function onChange(v) {
      return onFilter(setTopic, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Difficulty",
    value: diff,
    options: DIFFICULTIES,
    onChange: function onChange(v) {
      return onFilter(setDiff, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Type",
    value: typeFilter,
    options: SOURCE_TYPES,
    onChange: function onChange(v) {
      return onFilter(setTypeFilter, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Source",
    value: sourceFilter,
    options: uniqueSources,
    onChange: function onChange(v) {
      return onFilter(setSourceFilter, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Sort",
    value: recSort,
    options: ["Most Recent", "Oldest", "Title", "Hardest"],
    onChange: function onChange(v) {
      setRecSort(v);
      setPage(1);
    }
  })), recommendedVisible.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300"
  }, "No recommendations yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1"
  }, "Answer a few problems first so the site can learn your weak areas.")) : /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Problem"), /*#__PURE__*/React.createElement("span", null, "Topic"), /*#__PURE__*/React.createElement("span", null, "Difficulty"), /*#__PURE__*/React.createElement("span", null, "Source"), /*#__PURE__*/React.createElement("span", null, "Date Added")), recommendedVisible.map(function (q, i) {
    return /*#__PURE__*/React.createElement(ProblemRow, {
      key: q.id,
      q: q,
      n: i + 1,
      onOpen: function onOpen() {
        return openProblem(filtered.findIndex(function (x) {
          return x.id === q.id;
        }));
      }
    });
  }))) : view === "review" ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Review Later"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, bookmarks.length, " bookmarked problem", bookmarks.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1 shrink-0"
  }, bookmarks.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setBookmarks([]);
    },
    className: "text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
  }, "Clear all"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setView('list');
    },
    title: "Close",
    className: "p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
  }))))), bookmarks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-700 dark:text-slate-300"
  }, "No bookmarks yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1"
  }, "Open any problem and click \"Review later\" to save it here.")) : /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Problem"), /*#__PURE__*/React.createElement("span", null, "Topic"), /*#__PURE__*/React.createElement("span", null, "Difficulty"), /*#__PURE__*/React.createElement("span", null, "Source"), /*#__PURE__*/React.createElement("span", null, "Date Added")), questions.filter(function (q) {
    return bookmarks.includes(q.id);
  }).map(function (q, i) {
    return /*#__PURE__*/React.createElement(ProblemRow, {
      key: q.id,
      q: q,
      n: i + 1,
      onOpen: function onOpen() {
        var idx = filtered.findIndex(function (x) {
          return x.id === q.id;
        });
        if (idx === -1) {
          setTopic("All Topics");
          setDiff("All Difficulties");
          setSearch("");
          setTimeout(function () {
            return openProblem(questions.findIndex(function (x) {
              return x.id === q.id;
            }));
          }, 50);
        } else openProblem(idx);
      }
    });
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1"
  }, "Problems"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 dark:text-slate-400 text-sm"
  }, "UIL General Mathematics \xB7 ", filtered.length, " problems")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 min-w-[200px]"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search problems\u2026",
    value: search,
    onChange: function onChange(e) {
      setSearch(e.target.value);
      setRecommendedMode(false);
      setView("list");
      setPage(1);
    },
    className: "w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Topic",
    value: topic,
    options: TOPICS,
    onChange: function onChange(v) {
      return onFilter(setTopic, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Difficulty",
    value: diff,
    options: DIFFICULTIES,
    onChange: function onChange(v) {
      return onFilter(setDiff, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Type",
    value: typeFilter,
    options: SOURCE_TYPES,
    onChange: function onChange(v) {
      return onFilter(setTypeFilter, v);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    label: "Source",
    value: sourceFilter,
    options: uniqueSources,
    onChange: function onChange(v) {
      return onFilter(setSourceFilter, v);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
  }, /*#__PURE__*/React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Problem"), /*#__PURE__*/React.createElement("span", null, "Topic"), /*#__PURE__*/React.createElement("span", null, "Difficulty"), /*#__PURE__*/React.createElement("span", null, "Source"), /*#__PURE__*/React.createElement("span", null, "Date Added")), pageItems.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "py-20 text-center text-slate-400 dark:text-slate-600"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold"
  }, "No problems found")) : pageItems.map(function (q, i) {
    var globalIdx = (pageClamped - 1) * PAGE_SIZE + i;
    return /*#__PURE__*/React.createElement(ProblemRow, {
      key: q.id,
      q: q,
      n: globalIdx + 1,
      onOpen: function onOpen() {
        return openProblem(globalIdx);
      }
    });
  })), totalPages > 1 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-1.5 mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPage(function (p) {
        return Math.max(1, p - 1);
      });
    },
    disabled: pageClamped === 1,
    className: "px-3 py-1.5 rounded-lg text-sm font-medium ".concat(pageClamped === 1 ? "text-slate-300 dark:text-slate-700 cursor-not-allowed" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
  }, "\u2039"), Array.from({
    length: totalPages
  }, function (_, i) {
    return i + 1;
  }).map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: function onClick() {
        return setPage(p);
      },
      className: "w-9 h-9 rounded-lg text-sm font-medium ".concat(p === pageClamped ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
    }, p);
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPage(function (p) {
        return Math.min(totalPages, p + 1);
      });
    },
    disabled: pageClamped === totalPages,
    className: "px-3 py-1.5 rounded-lg text-sm font-medium ".concat(pageClamped === totalPages ? "text-slate-300 dark:text-slate-700 cursor-not-allowed" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
  }, "\u203A"))), tab === 'problems' && openIdx !== null && filtered[openIdx] && /*#__PURE__*/React.createElement(ProblemView, {
    q: filtered[openIdx],
    prevAnswer: answersRef.current[filtered[openIdx].id],
    stat: qStats[filtered[openIdx].id],
    isBookmarked: bookmarks.includes(filtered[openIdx].id),
    onToggleBookmark: function onToggleBookmark() {
      return toggleBookmark(filtered[openIdx].id);
    },
    onClose: closeProblem,
    onAnswered: recordAnswer,
    hasPrev: openIdx > 0,
    hasNext: openIdx < filtered.length - 1,
    onPrev: function onPrev() {
      return openProblem(Math.max(0, openIdx - 1));
    },
    onNext: function onNext() {
      return openProblem(Math.min(filtered.length - 1, openIdx + 1));
    },
    authUser: authUser,
    allQuestions: questions,
    answeredIds: Object.keys(answersRef.current).map(Number),
    onOpenQuestion: function onOpenQuestion(id) {
      var idx = filtered.findIndex(function (x) {
        return x.id === id;
      });
      if (idx !== -1) {
        openProblem(idx);
      } else {
        setTopic("All Topics");
        setDiff("All Difficulties");
        setSearch("");
        var qIdx = questions.findIndex(function (x) {
          return x.id === id;
        });
        if (qIdx !== -1) setTimeout(function () {
          return openProblem(qIdx);
        }, 50);
      }
    }
  }));
}
function mountApp() {
  var root = document.getElementById("root");
  if (!root) return;
  root.dataset.loaded = "1";
  ReactDOM.createRoot(root).render(/*#__PURE__*/React.createElement(App, null));
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}