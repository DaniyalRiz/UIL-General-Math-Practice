function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

// ── Math rendering ────────────────────────────────────────────────────────────
// Renders text containing LaTeX. Falls back to plain text if KaTeX hasn't loaded.
function MathText(_ref) {
  var text = _ref.text,
    className = _ref.className;
  var ref = useRef(null);
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    if (!window.katex) {
      el.textContent = text;
      return;
    }
    // Split on \[...\] (display) and \(...\) (inline). Money uses a plain $, which
    // we leave untouched so it never collides with math.
    var parts = String(text).split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
    el.innerHTML = "";
    parts.forEach(function (part) {
      if (!part) return;
      var display = part.startsWith("\\[") && part.endsWith("\\]");
      var inline = part.startsWith("\\(") && part.endsWith("\\)");
      if (display || inline) {
        var tex = part.slice(2, part.length - 2);
        var span = document.createElement("span");
        try {
          window.katex.render(tex, span, {
            displayMode: display,
            throwOnError: false
          });
        } catch (e) {
          span.textContent = tex;
        }
        el.appendChild(span);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }, [text]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className
  }, text);
}

// ── localStorage hook (JSON-backed, survives refresh on this device) ──────────
function useLocalStorage(key, initial) {
  var _useState = useState(function () {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : initial;
      } catch (e) {
        return initial;
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  useEffect(function () {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }, [key, value]);
  return [value, setValue];
}

// ── Theme hook (persists to localStorage) ────────────────────────────────────
function useTheme() {
  var _useState3 = useState(function () {
      try {
        var saved = localStorage.getItem("uilmath-theme");
        if (saved) return saved === "dark";
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      } catch (e) {
        return false;
      }
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    dark = _useState4[0],
    setDark = _useState4[1];
  useEffect(function () {
    var root = document.documentElement;
    if (dark) root.classList.add("dark");else root.classList.remove("dark");
    try {
      localStorage.setItem("uilmath-theme", dark ? "dark" : "light");
    } catch (e) {}
  }, [dark]);
  return [dark, function () {
    return setDark(function (d) {
      return !d;
    });
  }];
}
function useTimer() {
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    elapsed = _useState6[0],
    setElapsed = _useState6[1];
  var ref = useRef(null);
  var start = function start() {
    if (!ref.current) ref.current = setInterval(function () {
      return setElapsed(function (e) {
        return e + 1;
      });
    }, 1000);
  };
  var stop = function stop() {
    clearInterval(ref.current);
    ref.current = null;
  };
  var reset = function reset() {
    stop();
    setElapsed(0);
  };
  useEffect(function () {
    return function () {
      return clearInterval(ref.current);
    };
  }, []);
  return {
    elapsed: elapsed,
    fmt: "".concat(String(Math.floor(elapsed / 60)).padStart(2, "0"), ":").concat(String(elapsed % 60).padStart(2, "0")),
    start: start,
    stop: stop,
    reset: reset
  };
}

// ── Small UI components ───────────────────────────────────────────────────────
function DiffPill(_ref2) {
  var d = _ref2.d;
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ".concat(DIFF_PILL[d] || "")
  }, d);
}
var SunIcon = function SunIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  }));
};
var MoonIcon = function MoonIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
  }));
};
function Dropdown(_ref3) {
  var label = _ref3.label,
    value = _ref3.value,
    options = _ref3.options,
    _onChange = _ref3.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    className: "appearance-none pl-3 pr-9 py-2 rounded-lg text-sm font-medium border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o,
      value: o
    }, o);
  })), /*#__PURE__*/React.createElement("span", {
    className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
  }, "\u25BE"));
}