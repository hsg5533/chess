/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 */ !(function (e, t) {
  var n,
    r,
    i = "undefined",
    o = e.document,
    a = e.location,
    s = e.jQuery,
    u = e.$,
    l = {},
    c = [],
    f = "1.9.1",
    p = c.concat,
    d = c.push,
    h = c.slice,
    m = c.indexOf,
    g = l.toString,
    y = l.hasOwnProperty,
    v = f.trim,
    $ = function (e, t) {
      return new $.fn.init(e, t, r);
    },
    b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    x = /\S+/g,
    _ = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    T = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    N = /^[\],:{}\s]*$/,
    C = /(?:^|:|,)(?:\s*\[)+/g,
    k = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    S = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    E = /^-ms-/,
    A = /-([\da-z])/gi,
    j = function (e, t) {
      return t.toUpperCase();
    },
    D = function (e) {
      (o.addEventListener ||
        "load" === e.type ||
        "complete" === o.readyState) &&
        (L(), $.ready());
    },
    L = function () {
      o.addEventListener
        ? (o.removeEventListener("DOMContentLoaded", D, !1),
          e.removeEventListener("load", D, !1))
        : (o.detachEvent("onreadystatechange", D), e.detachEvent("onload", D));
    };
  function H(e) {
    var t = e.length,
      n = $.type(e);
    return (
      !$.isWindow(e) &&
      ((1 === e.nodeType && !!t) ||
        "array" === n ||
        ("function" !== n &&
          (0 === t || ("number" == typeof t && t > 0 && t - 1 in e))))
    );
  }
  ($.fn = $.prototype =
    {
      jquery: f,
      constructor: $,
      init: function (e, n, r) {
        var i, a;
        if (!e) return this;
        if ("string" == typeof e) {
          if (
            (i =
              "<" === e.charAt(0) &&
              ">" === e.charAt(e.length - 1) &&
              e.length >= 3
                ? [null, e, null]
                : T.exec(e)) &&
            (i[1] || !n)
          ) {
            if (i[1]) {
              if (
                ((n = n instanceof $ ? n[0] : n),
                $.merge(
                  this,
                  $.parseHTML(
                    i[1],
                    n && n.nodeType ? n.ownerDocument || n : o,
                    !0
                  )
                ),
                w.test(i[1]) && $.isPlainObject(n))
              )
                for (i in n)
                  $.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
              return this;
            }
            if ((a = o.getElementById(i[2])) && a.parentNode) {
              if (a.id !== i[2]) return r.find(e);
              (this.length = 1), (this[0] = a);
            }
            return (this.context = o), (this.selector = e), this;
          }
          return !n || n.jquery
            ? (n || r).find(e)
            : this.constructor(n).find(e);
        }
        return e.nodeType
          ? ((this.context = this[0] = e), (this.length = 1), this)
          : $.isFunction(e)
          ? r.ready(e)
          : (t !== e.selector &&
              ((this.selector = e.selector), (this.context = e.context)),
            $.makeArray(e, this));
      },
      selector: "",
      length: 0,
      size: function () {
        return this.length;
      },
      toArray: function () {
        return h.call(this);
      },
      get: function (e) {
        return null == e
          ? this.toArray()
          : e < 0
          ? this[this.length + e]
          : this[e];
      },
      pushStack: function (e) {
        var t = $.merge(this.constructor(), e);
        return (t.prevObject = this), (t.context = this.context), t;
      },
      each: function (e, t) {
        return $.each(this, e, t);
      },
      ready: function (e) {
        return $.ready.promise().done(e), this;
      },
      slice: function () {
        return this.pushStack(h.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
      },
      map: function (e) {
        return this.pushStack(
          $.map(this, function (t, n) {
            return e.call(t, n, t);
          })
        );
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: d,
      sort: [].sort,
      splice: [].splice,
    }),
    ($.fn.init.prototype = $.fn),
    ($.extend = $.fn.extend =
      function () {
        var e,
          n,
          r,
          i,
          o,
          a,
          s = arguments[0] || {},
          u = 1,
          l = arguments.length,
          c = !1;
        for (
          "boolean" == typeof s && ((c = s), (s = arguments[1] || {}), (u = 2)),
            "object" == typeof s || $.isFunction(s) || (s = {}),
            l === u && ((s = this), --u);
          u < l;
          u++
        )
          if (null != (o = arguments[u]))
            for (i in o)
              (e = s[i]),
                s !== (r = o[i]) &&
                  (c && r && ($.isPlainObject(r) || (n = $.isArray(r)))
                    ? (n
                        ? ((n = !1), (a = e && $.isArray(e) ? e : []))
                        : (a = e && $.isPlainObject(e) ? e : {}),
                      (s[i] = $.extend(c, a, r)))
                    : r !== t && (s[i] = r));
        return s;
      }),
    $.extend({
      noConflict: function (t) {
        return e.$ === $ && (e.$ = u), t && e.jQuery === $ && (e.jQuery = s), $;
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function (e) {
        e ? $.readyWait++ : $.ready(!0);
      },
      ready: function (e) {
        if (!(!0 === e ? --$.readyWait : $.isReady)) {
          if (!o.body) return setTimeout($.ready);
          ($.isReady = !0),
            !(!0 !== e && --$.readyWait > 0) &&
              (n.resolveWith(o, [$]),
              $.fn.trigger && $(o).trigger("ready").off("ready"));
        }
      },
      isFunction: function (e) {
        return "function" === $.type(e);
      },
      isArray:
        Array.isArray ||
        function (e) {
          return "array" === $.type(e);
        },
      isWindow: function (e) {
        return null != e && e == e.window;
      },
      isNumeric: function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      },
      type: function (e) {
        return null == e
          ? String(e)
          : "object" == typeof e || "function" == typeof e
          ? l[g.call(e)] || "object"
          : typeof e;
      },
      isPlainObject: function (e) {
        var n;
        if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e))
          return !1;
        try {
          if (
            e.constructor &&
            !y.call(e, "constructor") &&
            !y.call(e.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (r) {
          return !1;
        }
        for (n in e);
        return n === t || y.call(e, n);
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      error: function (e) {
        throw Error(e);
      },
      parseHTML: function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && ((n = t), (t = !1)), (t = t || o);
        var r = w.exec(e),
          i = !n && [];
        return r
          ? [t.createElement(r[1])]
          : ((r = $.buildFragment([e], t, i)),
            i && $(i).remove(),
            $.merge([], r.childNodes));
      },
      parseJSON: function (t) {
        return e.JSON && e.JSON.parse
          ? e.JSON.parse(t)
          : null === t
          ? t
          : "string" == typeof t &&
            (t = $.trim(t)) &&
            N.test(t.replace(k, "@").replace(S, "]").replace(C, ""))
          ? Function("return " + t)()
          : void $.error("Invalid JSON: " + t);
      },
      parseXML: function (n) {
        var r, i;
        if (!n || "string" != typeof n) return null;
        try {
          e.DOMParser
            ? (r = (i = new DOMParser()).parseFromString(n, "text/xml"))
            : (((r = new ActiveXObject("Microsoft.XMLDOM")).async = "false"),
              r.loadXML(n));
        } catch (o) {
          r = t;
        }
        return (
          (r &&
            r.documentElement &&
            !r.getElementsByTagName("parsererror").length) ||
            $.error("Invalid XML: " + n),
          r
        );
      },
      noop: function () {},
      globalEval: function (t) {
        t &&
          $.trim(t) &&
          (
            e.execScript ||
            function (t) {
              e.eval.call(e, t);
            }
          )(t);
      },
      camelCase: function (e) {
        return e.replace(E, "ms-").replace(A, j);
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function (e, t, n) {
        var r,
          i = 0,
          o = e.length,
          a = H(e);
        if (n) {
          if (a) for (; i < o && !1 !== (r = t.apply(e[i], n)); i++);
          else for (i in e) if (!1 === (r = t.apply(e[i], n))) break;
        } else if (a) for (; i < o && !1 !== (r = t.call(e[i], i, e[i])); i++);
        else for (i in e) if (!1 === (r = t.call(e[i], i, e[i]))) break;
        return e;
      },
      trim:
        v && !v.call("\uFEFF\xa0")
          ? function (e) {
              return null == e ? "" : v.call(e);
            }
          : function (e) {
              return null == e ? "" : (e + "").replace(_, "");
            },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (H(Object(e))
              ? $.merge(n, "string" == typeof e ? [e] : e)
              : d.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        var r;
        if (t) {
          if (m) return m.call(t, e, n);
          for (
            r = t.length, n = n ? (n < 0 ? Math.max(0, r + n) : n) : 0;
            n < r;
            n++
          )
            if (n in t && t[n] === e) return n;
        }
        return -1;
      },
      merge: function (e, n) {
        var r = n.length,
          i = e.length,
          o = 0;
        if ("number" == typeof r) for (; o < r; o++) e[i++] = n[o];
        else for (; t !== n[o]; ) e[i++] = n[o++];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        var r,
          i = [],
          o = 0,
          a = e.length;
        for (n = !!n; o < a; o++) n !== (r = !!t(e[o], o)) && i.push(e[o]);
        return i;
      },
      map: function (e, t, n) {
        var r,
          i = 0,
          o = e.length,
          a = H(e),
          s = [];
        if (a)
          for (; i < o; i++) null != (r = t(e[i], i, n)) && (s[s.length] = r);
        else for (i in e) null != (r = t(e[i], i, n)) && (s[s.length] = r);
        return p.apply([], s);
      },
      guid: 1,
      proxy: function (e, t) {
        var n, r, i;
        if (
          ("string" == typeof t && ((i = e[t]), (t = e), (e = i)),
          $.isFunction(e))
        )
          return (
            (n = h.call(arguments, 2)),
            ((r = function () {
              return e.apply(t || this, n.concat(h.call(arguments)));
            }).guid = e.guid =
              e.guid || $.guid++),
            r
          );
      },
      access: function (e, n, r, i, o, a, s) {
        var u = 0,
          l = e.length,
          c = null == r;
        if ("object" === $.type(r))
          for (u in ((o = !0), r)) $.access(e, n, u, r[u], !0, a, s);
        else if (
          i !== t &&
          ((o = !0),
          $.isFunction(i) || (s = !0),
          c &&
            (s
              ? (n.call(e, i), (n = null))
              : ((c = n),
                (n = function (e, t, n) {
                  return c.call($(e), n);
                }))),
          n)
        )
          for (; u < l; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
        return o ? e : c ? n.call(e) : l ? n(e[0], r) : a;
      },
      now: function () {
        return new Date().getTime();
      },
    }),
    ($.ready.promise = function (t) {
      if (!n) {
        if (((n = $.Deferred()), "complete" === o.readyState))
          setTimeout($.ready);
        else if (o.addEventListener)
          o.addEventListener("DOMContentLoaded", D, !1),
            e.addEventListener("load", D, !1);
        else {
          o.attachEvent("onreadystatechange", D), e.attachEvent("onload", D);
          var r = !1;
          try {
            r = null == e.frameElement && o.documentElement;
          } catch (i) {}
          r &&
            r.doScroll &&
            (function e() {
              if (!$.isReady) {
                try {
                  r.doScroll("left");
                } catch (t) {
                  return setTimeout(e, 50);
                }
                L(), $.ready();
              }
            })();
        }
      }
      return n.promise(t);
    }),
    $.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
      }
    ),
    (r = $(o));
  var q = {};
  ($.Callbacks = function (e) {
    e =
      "string" == typeof e
        ? q[e] ||
          ((r = q[(n = e)] = {}),
          $.each(n.match(x) || [], function (e, t) {
            r[t] = !0;
          }),
          r)
        : $.extend({}, e);
    var n,
      r,
      i,
      o,
      a,
      s,
      u,
      l,
      c = [],
      f = !e.once && [],
      p = function (t) {
        for (
          o = e.memory && t, a = !0, u = l || 0, l = 0, s = c.length, i = !0;
          c && u < s;
          u++
        )
          if (!1 === c[u].apply(t[0], t[1]) && e.stopOnFalse) {
            o = !1;
            break;
          }
        (i = !1),
          c && (f ? f.length && p(f.shift()) : o ? (c = []) : d.disable());
      },
      d = {
        add: function () {
          if (c) {
            var t = c.length;
            (function t(n) {
              $.each(n, function (n, r) {
                var i = $.type(r);
                "function" === i
                  ? (e.unique && d.has(r)) || c.push(r)
                  : r && r.length && "string" !== i && t(r);
              });
            })(arguments),
              i ? (s = c.length) : o && ((l = t), p(o));
          }
          return this;
        },
        remove: function () {
          return (
            c &&
              $.each(arguments, function (e, t) {
                for (var n; (n = $.inArray(t, c, n)) > -1; )
                  c.splice(n, 1), i && (n <= s && s--, n <= u && u--);
              }),
            this
          );
        },
        has: function (e) {
          return e ? $.inArray(e, c) > -1 : !!(c && c.length);
        },
        empty: function () {
          return (c = []), this;
        },
        disable: function () {
          return (c = f = o = t), this;
        },
        disabled: function () {
          return !c;
        },
        lock: function () {
          return (f = t), o || d.disable(), this;
        },
        locked: function () {
          return !f;
        },
        fireWith: function (e, t) {
          return (
            (t = [e, (t = t || []).slice ? t.slice() : t]),
            c && (!a || f) && (i ? f.push(t) : p(t)),
            this
          );
        },
        fire: function () {
          return d.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!a;
        },
      };
    return d;
  }),
    $.extend({
      Deferred: function (e) {
        var t = [
            ["resolve", "done", $.Callbacks("once memory"), "resolved"],
            ["reject", "fail", $.Callbacks("once memory"), "rejected"],
            ["notify", "progress", $.Callbacks("memory")],
          ],
          n = "pending",
          r = {
            state: function () {
              return n;
            },
            always: function () {
              return i.done(arguments).fail(arguments), this;
            },
            then: function () {
              var e = arguments;
              return $.Deferred(function (n) {
                $.each(t, function (t, o) {
                  var a = o[0],
                    s = $.isFunction(e[t]) && e[t];
                  i[o[1]](function () {
                    var e = s && s.apply(this, arguments);
                    e && $.isFunction(e.promise)
                      ? e
                          .promise()
                          .done(n.resolve)
                          .fail(n.reject)
                          .progress(n.notify)
                      : n[a + "With"](
                          this === r ? n.promise() : this,
                          s ? [e] : arguments
                        );
                  });
                }),
                  (e = null);
              }).promise();
            },
            promise: function (e) {
              return null != e ? $.extend(e, r) : r;
            },
          },
          i = {};
        return (
          (r.pipe = r.then),
          $.each(t, function (e, o) {
            var a = o[2],
              s = o[3];
            (r[o[1]] = a.add),
              s &&
                a.add(
                  function () {
                    n = s;
                  },
                  t[1 ^ e][2].disable,
                  t[2][2].lock
                ),
              (i[o[0]] = function () {
                return i[o[0] + "With"](this === i ? r : this, arguments), this;
              }),
              (i[o[0] + "With"] = a.fireWith);
          }),
          r.promise(i),
          e && e.call(i, i),
          i
        );
      },
      when: function (e) {
        var t,
          n,
          r,
          i = 0,
          o = h.call(arguments),
          a = o.length,
          s = 1 !== a || (e && $.isFunction(e.promise)) ? a : 0,
          u = 1 === s ? e : $.Deferred(),
          l = function (e, n, r) {
            return function (i) {
              (n[e] = this),
                (r[e] = arguments.length > 1 ? h.call(arguments) : i),
                r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r);
            };
          };
        if (a > 1)
          for (t = Array(a), n = Array(a), r = Array(a); i < a; i++)
            o[i] && $.isFunction(o[i].promise)
              ? o[i]
                  .promise()
                  .done(l(i, r, o))
                  .fail(u.reject)
                  .progress(l(i, n, t))
              : --s;
        return s || u.resolveWith(r, o), u.promise();
      },
    }),
    ($.support = (function () {
      var t,
        n,
        r,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d = o.createElement("div");
      if (
        (d.setAttribute("className", "t"),
        (d.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (n = d.getElementsByTagName("*")),
        (r = d.getElementsByTagName("a")[0]),
        !n || !r || !n.length)
      )
        return {};
      (l = (s = o.createElement("select")).appendChild(
        o.createElement("option")
      )),
        (a = d.getElementsByTagName("input")[0]),
        (r.style.cssText = "top:1px;float:left;opacity:.5"),
        (t = {
          getSetAttribute: "t" !== d.className,
          leadingWhitespace: 3 === d.firstChild.nodeType,
          tbody: !d.getElementsByTagName("tbody").length,
          htmlSerialize: !!d.getElementsByTagName("link").length,
          style: /top/.test(r.getAttribute("style")),
          hrefNormalized: "/a" === r.getAttribute("href"),
          opacity: /^0.5/.test(r.style.opacity),
          cssFloat: !!r.style.cssFloat,
          checkOn: !!a.value,
          optSelected: l.selected,
          enctype: !!o.createElement("form").enctype,
          html5Clone:
            "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML,
          boxModel: "CSS1Compat" === o.compatMode,
          deleteExpando: !0,
          noCloneEvent: !0,
          inlineBlockNeedsLayout: !1,
          shrinkWrapBlocks: !1,
          reliableMarginRight: !0,
          boxSizingReliable: !0,
          pixelPosition: !1,
        }),
        (a.checked = !0),
        (t.noCloneChecked = a.cloneNode(!0).checked),
        (s.disabled = !0),
        (t.optDisabled = !l.disabled);
      try {
        delete d.test;
      } catch (h) {
        t.deleteExpando = !1;
      }
      for (p in ((a = o.createElement("input")).setAttribute("value", ""),
      (t.input = "" === a.getAttribute("value")),
      (a.value = "t"),
      a.setAttribute("type", "radio"),
      (t.radioValue = "t" === a.value),
      a.setAttribute("checked", "t"),
      a.setAttribute("name", "t"),
      (u = o.createDocumentFragment()).appendChild(a),
      (t.appendChecked = a.checked),
      (t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked),
      d.attachEvent &&
        (d.attachEvent("onclick", function () {
          t.noCloneEvent = !1;
        }),
        d.cloneNode(!0).click()),
      { submit: !0, change: !0, focusin: !0 }))
        d.setAttribute((c = "on" + p), "t"),
          (t[p + "Bubbles"] = c in e || !1 === d.attributes[c].expando);
      return (
        (d.style.backgroundClip = "content-box"),
        (d.cloneNode(!0).style.backgroundClip = ""),
        (t.clearCloneStyle = "content-box" === d.style.backgroundClip),
        $(function () {
          var n,
            r,
            a,
            s =
              "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            u = o.getElementsByTagName("body")[0];
          u &&
            (((n = o.createElement("div")).style.cssText =
              "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"),
            u.appendChild(n).appendChild(d),
            (d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            ((a = d.getElementsByTagName("td"))[0].style.cssText =
              "padding:0;margin:0;border:0;display:none"),
            (f = 0 === a[0].offsetHeight),
            (a[0].style.display = ""),
            (a[1].style.display = "none"),
            (t.reliableHiddenOffsets = f && 0 === a[0].offsetHeight),
            (d.innerHTML = ""),
            (d.style.cssText =
              "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;"),
            (t.boxSizing = 4 === d.offsetWidth),
            (t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop),
            e.getComputedStyle &&
              ((t.pixelPosition =
                "1%" !== (e.getComputedStyle(d, null) || {}).top),
              (t.boxSizingReliable =
                "4px" ===
                (e.getComputedStyle(d, null) || { width: "4px" }).width),
              ((r = d.appendChild(o.createElement("div"))).style.cssText =
                d.style.cssText =
                  s),
              (r.style.marginRight = r.style.width = "0"),
              (d.style.width = "1px"),
              (t.reliableMarginRight = !parseFloat(
                (e.getComputedStyle(r, null) || {}).marginRight
              ))),
            typeof d.style.zoom !== i &&
              ((d.innerHTML = ""),
              (d.style.cssText =
                s + "width:1px;padding:1px;display:inline;zoom:1"),
              (t.inlineBlockNeedsLayout = 3 === d.offsetWidth),
              (d.style.display = "block"),
              (d.innerHTML = "<div></div>"),
              (d.firstChild.style.width = "5px"),
              (t.shrinkWrapBlocks = 3 !== d.offsetWidth),
              t.inlineBlockNeedsLayout && (u.style.zoom = 1)),
            u.removeChild(n),
            (n = d = a = r = null));
        }),
        (n = s = u = l = r = a = null),
        t
      );
    })());
  var M = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    O = /([A-Z])/g;
  function B(e, n, r, i) {
    if ($.acceptData(e)) {
      var o,
        a,
        s = $.expando,
        u = "string" == typeof n,
        l = e.nodeType,
        f = l ? $.cache : e,
        p = l ? e[s] : e[s] && s;
      if ((p && f[p] && (i || f[p].data)) || !u || r !== t)
        return (
          p || (l ? (e[s] = p = c.pop() || $.guid++) : (p = s)),
          f[p] || ((f[p] = {}), l || (f[p].toJSON = $.noop)),
          ("object" == typeof n || "function" == typeof n) &&
            (i
              ? (f[p] = $.extend(f[p], n))
              : (f[p].data = $.extend(f[p].data, n))),
          (o = f[p]),
          i || (o.data || (o.data = {}), (o = o.data)),
          r !== t && (o[$.camelCase(n)] = r),
          u ? null == (a = o[n]) && (a = o[$.camelCase(n)]) : (a = o),
          a
        );
    }
  }
  function F(e, t, n) {
    if ($.acceptData(e)) {
      var r,
        i,
        o,
        a = e.nodeType,
        s = a ? $.cache : e,
        u = a ? e[$.expando] : $.expando;
      if (s[u]) {
        if (t && (o = n ? s[u] : s[u].data)) {
          for (
            r = 0,
              i = (t = $.isArray(t)
                ? t.concat($.map(t, $.camelCase))
                : (t in o)
                ? [t]
                : ((t = $.camelCase(t)) in o)
                ? [t]
                : t.split(" ")).length;
            r < i;
            r++
          )
            delete o[t[r]];
          if (!(n ? W : $.isEmptyObject)(o)) return;
        }
        (n || (delete s[u].data, W(s[u]))) &&
          (a
            ? $.cleanData([e], !0)
            : $.support.deleteExpando || s != s.window
            ? delete s[u]
            : (s[u] = null));
      }
    }
  }
  function P(e, n, r) {
    if (r === t && 1 === e.nodeType) {
      var i = "data-" + n.replace(O, "-$1").toLowerCase();
      if ("string" == typeof (r = e.getAttribute(i))) {
        try {
          r =
            "true" === r ||
            ("false" !== r &&
              ("null" === r
                ? null
                : +r + "" === r
                ? +r
                : M.test(r)
                ? $.parseJSON(r)
                : r));
        } catch (o) {}
        $.data(e, n, r);
      } else r = t;
    }
    return r;
  }
  function W(e) {
    var t;
    for (t in e)
      if (!("data" === t && $.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0;
  }
  $.extend({
    cache: {},
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0,
    },
    hasData: function (e) {
      return !!(e = e.nodeType ? $.cache[e[$.expando]] : e[$.expando]) && !W(e);
    },
    data: function (e, t, n) {
      return B(e, t, n);
    },
    removeData: function (e, t) {
      return F(e, t);
    },
    _data: function (e, t, n) {
      return B(e, t, n, !0);
    },
    _removeData: function (e, t) {
      return F(e, t, !0);
    },
    acceptData: function (e) {
      if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
      var t = e.nodeName && $.noData[e.nodeName.toLowerCase()];
      return !t || (!0 !== t && e.getAttribute("classid") === t);
    },
  }),
    $.fn.extend({
      data: function (e, n) {
        var r,
          i,
          o = this[0],
          a = 0,
          s = null;
        if (e === t) {
          if (
            this.length &&
            ((s = $.data(o)), 1 === o.nodeType && !$._data(o, "parsedAttrs"))
          ) {
            for (r = o.attributes; a < r.length; a++)
              (i = r[a].name).indexOf("data-") ||
                P(o, (i = $.camelCase(i.slice(5))), s[i]);
            $._data(o, "parsedAttrs", !0);
          }
          return s;
        }
        return "object" == typeof e
          ? this.each(function () {
              $.data(this, e);
            })
          : $.access(
              this,
              function (n) {
                if (n === t) return o ? P(o, e, $.data(o, e)) : null;
                this.each(function () {
                  $.data(this, e, n);
                });
              },
              null,
              n,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          $.removeData(this, e);
        });
      },
    }),
    $.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = $._data(e, t)),
            n &&
              (!r || $.isArray(n)
                ? (r = $._data(e, t, $.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = $.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = $._queueHooks(e, t),
          a = function () {
            $.dequeue(e, t);
          };
        "inprogress" === i && ((i = n.shift()), r--),
          (o.cur = i),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, a, o)),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          $._data(e, n) ||
          $._data(e, n, {
            empty: $.Callbacks("once memory").add(function () {
              $._removeData(e, t + "queue"), $._removeData(e, n);
            }),
          })
        );
      },
    }),
    $.fn.extend({
      queue: function (e, n) {
        var r = 2;
        return ("string" != typeof e && ((n = e), (e = "fx"), r--),
        arguments.length < r)
          ? $.queue(this[0], e)
          : n === t
          ? this
          : this.each(function () {
              var t = $.queue(this, e, n);
              $._queueHooks(this, e),
                "fx" === e && "inprogress" !== t[0] && $.dequeue(this, e);
            });
      },
      dequeue: function (e) {
        return this.each(function () {
          $.dequeue(this, e);
        });
      },
      delay: function (e, t) {
        return (
          (e = ($.fx && $.fx.speeds[e]) || e),
          (t = t || "fx"),
          this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
              clearTimeout(r);
            };
          })
        );
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, n) {
        var r,
          i = 1,
          o = $.Deferred(),
          a = this,
          s = this.length,
          u = function () {
            --i || o.resolveWith(a, [a]);
          };
        for ("string" != typeof e && ((n = e), (e = t)), e = e || "fx"; s--; )
          (r = $._data(a[s], e + "queueHooks")) &&
            r.empty &&
            (i++, r.empty.add(u));
        return u(), o.promise(n);
      },
    });
  var I,
    z,
    R = /[\t\r\n]/g,
    X = /\r/g,
    U = /^(?:input|select|textarea|button|object)$/i,
    V = /^(?:a|area)$/i,
    Y =
      /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
    J = /^(?:checked|selected)$/i,
    G = $.support.getSetAttribute,
    Q = $.support.input;
  $.fn.extend({
    attr: function (e, t) {
      return $.access(this, $.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        $.removeAttr(this, e);
      });
    },
    prop: function (e, t) {
      return $.access(this, $.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return (
        (e = $.propFix[e] || e),
        this.each(function () {
          try {
            (this[e] = t), delete this[e];
          } catch (n) {}
        })
      );
    },
    addClass: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a = 0,
        s = this.length;
      if ($.isFunction(e))
        return this.each(function (t) {
          $(this).addClass(e.call(this, t, this.className));
        });
      if ("string" == typeof e && e) {
        for (t = (e || "").match(x) || []; a < s; a++)
          if (
            (r =
              1 === (n = this[a]).nodeType &&
              (n.className ? (" " + n.className + " ").replace(R, " ") : " "))
          ) {
            for (o = 0; (i = t[o++]); )
              0 > r.indexOf(" " + i + " ") && (r += i + " ");
            n.className = $.trim(r);
          }
      }
      return this;
    },
    removeClass: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a = 0,
        s = this.length,
        u = 0 === arguments.length || ("string" == typeof e && e);
      if ($.isFunction(e))
        return this.each(function (t) {
          $(this).removeClass(e.call(this, t, this.className));
        });
      if (u) {
        for (t = (e || "").match(x) || []; a < s; a++)
          if (
            (r =
              1 === (n = this[a]).nodeType &&
              (n.className ? (" " + n.className + " ").replace(R, " ") : ""))
          ) {
            for (o = 0; (i = t[o++]); )
              for (; r.indexOf(" " + i + " ") >= 0; )
                r = r.replace(" " + i + " ", " ");
            n.className = e ? $.trim(r) : "";
          }
      }
      return this;
    },
    toggleClass: function (e, t) {
      var n = typeof e,
        r = "boolean" == typeof t;
      return $.isFunction(e)
        ? this.each(function (n) {
            $(this).toggleClass(e.call(this, n, this.className, t), t);
          })
        : this.each(function () {
            if ("string" === n)
              for (
                var o, a = 0, s = $(this), u = t, l = e.match(x) || [];
                (o = l[a++]);

              )
                s[(u = r ? u : !s.hasClass(o)) ? "addClass" : "removeClass"](o);
            else
              (n === i || "boolean" === n) &&
                (this.className &&
                  $._data(this, "__className__", this.className),
                (this.className =
                  this.className || !1 === e
                    ? ""
                    : $._data(this, "__className__") || ""));
          });
    },
    hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
        if (
          1 === this[n].nodeType &&
          (" " + this[n].className + " ").replace(R, " ").indexOf(t) >= 0
        )
          return !0;
      return !1;
    },
    val: function (e) {
      var n,
        r,
        i,
        o = this[0];
      return arguments.length
        ? ((i = $.isFunction(e)),
          this.each(function (n) {
            var o,
              a = $(this);
            1 === this.nodeType &&
              (null == (o = i ? e.call(this, n, a.val()) : e)
                ? (o = "")
                : "number" == typeof o
                ? (o += "")
                : $.isArray(o) &&
                  (o = $.map(o, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((r =
                $.valHooks[this.type] ||
                $.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in r &&
                t !== r.set(this, o, "value")) ||
                (this.value = o));
          }))
        : o
        ? (r = $.valHooks[o.type] || $.valHooks[o.nodeName.toLowerCase()]) &&
          "get" in r &&
          t !== (n = r.get(o, "value"))
          ? n
          : "string" == typeof (n = o.value)
          ? n.replace(X, "")
          : null == n
          ? ""
          : n
        : void 0;
    },
  }),
    $.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = e.attributes.value;
            return !t || t.specified ? e.value : e.text;
          },
        },
        select: {
          get: function (e) {
            for (
              var t,
                n,
                r = e.options,
                i = e.selectedIndex,
                o = "select-one" === e.type || i < 0,
                a = o ? null : [],
                s = o ? i + 1 : r.length,
                u = i < 0 ? s : o ? i : 0;
              u < s;
              u++
            )
              if (
                ((n = r[u]).selected || u === i) &&
                ($.support.optDisabled
                  ? !n.disabled
                  : null === n.getAttribute("disabled")) &&
                (!n.parentNode.disabled ||
                  !$.nodeName(n.parentNode, "optgroup"))
              ) {
                if (((t = $(n).val()), o)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            var n = $.makeArray(t);
            return (
              $(e)
                .find("option")
                .each(function () {
                  this.selected = $.inArray($(this).val(), n) >= 0;
                }),
              n.length || (e.selectedIndex = -1),
              n
            );
          },
        },
      },
      attr: function (e, n, r) {
        var o,
          a,
          s,
          u = e.nodeType;
        if (e && 3 !== u && 8 !== u && 2 !== u) {
          if (typeof e.getAttribute === i) return $.prop(e, n, r);
          if (
            ((a = 1 !== u || !$.isXMLDoc(e)) &&
              ((n = n.toLowerCase()),
              (o = $.attrHooks[n] || (Y.test(n) ? z : I))),
            r !== t)
          ) {
            if (null === r) $.removeAttr(e, n);
            else if (o && a && "set" in o && t !== (s = o.set(e, r, n)))
              return s;
            else return e.setAttribute(n, r + ""), r;
          } else if (o && a && "get" in o && null !== (s = o.get(e, n)))
            return s;
          else
            return (
              typeof e.getAttribute !== i && (s = e.getAttribute(n)),
              null == s ? t : s
            );
        }
      },
      removeAttr: function (e, t) {
        var n,
          r,
          i = 0,
          o = t && t.match(x);
        if (o && 1 === e.nodeType)
          for (; (n = o[i++]); )
            (r = $.propFix[n] || n),
              Y.test(n)
                ? !G && J.test(n)
                  ? (e[$.camelCase("default-" + n)] = e[r] = !1)
                  : (e[r] = !1)
                : $.attr(e, n, ""),
              e.removeAttribute(G ? n : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (
              !$.support.radioValue &&
              "radio" === t &&
              $.nodeName(e, "input")
            ) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        for: "htmlFor",
        class: "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable",
      },
      prop: function (e, n, r) {
        var i,
          o,
          a,
          s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)
          return ((a = 1 !== s || !$.isXMLDoc(e)) &&
            ((n = $.propFix[n] || n), (o = $.propHooks[n])),
          r !== t)
            ? o && "set" in o && t !== (i = o.set(e, r, n))
              ? i
              : (e[n] = r)
            : o && "get" in o && null !== (i = o.get(e, n))
            ? i
            : e[n];
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var n = e.getAttributeNode("tabindex");
            return n && n.specified
              ? parseInt(n.value, 10)
              : U.test(e.nodeName) || (V.test(e.nodeName) && e.href)
              ? 0
              : t;
          },
        },
      },
    }),
    (z = {
      get: function (e, n) {
        var r = $.prop(e, n),
          i = "boolean" == typeof r && e.getAttribute(n),
          o =
            "boolean" == typeof r
              ? Q && G
                ? null != i
                : J.test(n)
                ? e[$.camelCase("default-" + n)]
                : !!i
              : e.getAttributeNode(n);
        return o && !1 !== o.value ? n.toLowerCase() : t;
      },
      set: function (e, t, n) {
        return (
          !1 === t
            ? $.removeAttr(e, n)
            : (Q && G) || !J.test(n)
            ? e.setAttribute((!G && $.propFix[n]) || n, n)
            : (e[$.camelCase("default-" + n)] = e[n] = !0),
          n
        );
      },
    }),
    (Q && G) ||
      ($.attrHooks.value = {
        get: function (e, n) {
          var r = e.getAttributeNode(n);
          return $.nodeName(e, "input")
            ? e.defaultValue
            : r && r.specified
            ? r.value
            : t;
        },
        set: function (e, t, n) {
          if (!$.nodeName(e, "input")) return I && I.set(e, t, n);
          e.defaultValue = t;
        },
      }),
    G ||
      ((I = $.valHooks.button =
        {
          get: function (e, n) {
            var r = e.getAttributeNode(n);
            return r &&
              ("id" === n || "name" === n || "coords" === n
                ? "" !== r.value
                : r.specified)
              ? r.value
              : t;
          },
          set: function (e, n, r) {
            var i = e.getAttributeNode(r);
            return (
              i || e.setAttributeNode((i = e.ownerDocument.createAttribute(r))),
              (i.value = n += ""),
              "value" === r || n === e.getAttribute(r) ? n : t
            );
          },
        }),
      ($.attrHooks.contenteditable = {
        get: I.get,
        set: function (e, t, n) {
          I.set(e, "" !== t && t, n);
        },
      }),
      $.each(["width", "height"], function (e, t) {
        $.attrHooks[t] = $.extend($.attrHooks[t], {
          set: function (e, n) {
            if ("" === n) return e.setAttribute(t, "auto"), n;
          },
        });
      })),
    $.support.hrefNormalized ||
      ($.each(["href", "src", "width", "height"], function (e, n) {
        $.attrHooks[n] = $.extend($.attrHooks[n], {
          get: function (e) {
            var r = e.getAttribute(n, 2);
            return null == r ? t : r;
          },
        });
      }),
      $.each(["href", "src"], function (e, t) {
        $.propHooks[t] = {
          get: function (e) {
            return e.getAttribute(t, 4);
          },
        };
      })),
    $.support.style ||
      ($.attrHooks.style = {
        get: function (e) {
          return e.style.cssText || t;
        },
        set: function (e, t) {
          return (e.style.cssText = t + "");
        },
      }),
    $.support.optSelected ||
      ($.propHooks.selected = $.extend($.propHooks.selected, {
        get: function (e) {
          var t = e.parentNode;
          return (
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
          );
        },
      })),
    $.support.enctype || ($.propFix.enctype = "encoding"),
    $.support.checkOn ||
      $.each(["radio", "checkbox"], function () {
        $.valHooks[this] = {
          get: function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          },
        };
      }),
    $.each(["radio", "checkbox"], function () {
      $.valHooks[this] = $.extend($.valHooks[this], {
        set: function (e, t) {
          if ($.isArray(t)) return (e.checked = $.inArray($(e).val(), t) >= 0);
        },
      });
    });
  var K = /^(?:input|select|textarea)$/i,
    Z = /^key/,
    ee = /^(?:mouse|contextmenu)|click/,
    et = /^(?:focusinfocus|focusoutblur)$/,
    en = /^([^.]*)(?:\.(.+)|)$/;
  function er() {
    return !0;
  }
  function ei() {
    return !1;
  }
  ($.event = {
    global: {},
    add: function (e, n, r, o, a) {
      var s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        m,
        g,
        y,
        v = $._data(e);
      if (v) {
        for (
          r.handler && ((r = (c = r).handler), (a = c.selector)),
            r.guid || (r.guid = $.guid++),
            (u = v.events) || (u = v.events = {}),
            (p = v.handle) ||
              ((p = v.handle =
                function (e) {
                  return "function" === i || (e && $.event.triggered === e.type)
                    ? t
                    : $.event.dispatch.apply(p.elem, arguments);
                }).elem = e),
            l = (n = (n || "").match(x) || [""]).length;
          l--;

        )
          (m = y = (s = en.exec(n[l]) || [])[1]),
            (g = (s[2] || "").split(".").sort()),
            (f = $.event.special[m] || {}),
            (m = (a ? f.delegateType : f.bindType) || m),
            (f = $.event.special[m] || {}),
            (d = $.extend(
              {
                type: m,
                origType: y,
                data: o,
                handler: r,
                guid: r.guid,
                selector: a,
                needsContext: a && $.expr.match.needsContext.test(a),
                namespace: g.join("."),
              },
              c
            )),
            (h = u[m]) ||
              (((h = u[m] = []).delegateCount = 0),
              (!f.setup || !1 === f.setup.call(e, o, g, p)) &&
                (e.addEventListener
                  ? e.addEventListener(m, p, !1)
                  : e.attachEvent && e.attachEvent("on" + m, p))),
            f.add &&
              (f.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)),
            a ? h.splice(h.delegateCount++, 0, d) : h.push(d),
            ($.event.global[m] = !0);
        e = null;
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        m,
        g = $.hasData(e) && $._data(e);
      if (g && (c = g.events)) {
        for (l = (t = (t || "").match(x) || [""]).length; l--; ) {
          if (
            ((d = m = (s = en.exec(t[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            !d)
          ) {
            for (d in c) $.event.remove(e, d + t[l], n, r, !0);
            continue;
          }
          for (
            f = $.event.special[d] || {},
              p = c[(d = (r ? f.delegateType : f.bindType) || d)] || [],
              s =
                s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
              u = o = p.length;
            o--;

          )
            (a = p[o]),
              (i || m === a.origType) &&
                (!n || n.guid === a.guid) &&
                (!s || s.test(a.namespace)) &&
                (!r || r === a.selector || ("**" === r && a.selector)) &&
                (p.splice(o, 1),
                a.selector && p.delegateCount--,
                f.remove && f.remove.call(e, a));
          u &&
            !p.length &&
            ((f.teardown && !1 !== f.teardown.call(e, h, g.handle)) ||
              $.removeEvent(e, d, g.handle),
            delete c[d]);
        }
        $.isEmptyObject(c) && (delete g.handle, $._removeData(e, "events"));
      }
    },
    trigger: function (n, r, i, a) {
      var s,
        u,
        l,
        c,
        f,
        p,
        d,
        h = [i || o],
        m = y.call(n, "type") ? n.type : n,
        g = y.call(n, "namespace") ? n.namespace.split(".") : [];
      if (
        ((l = p = i = i || o),
        !(
          3 === i.nodeType ||
          8 === i.nodeType ||
          et.test(m + $.event.triggered)
        ) &&
          (m.indexOf(".") >= 0 && ((m = (g = m.split(".")).shift()), g.sort()),
          (u = 0 > m.indexOf(":") && "on" + m),
          ((n = n[$.expando]
            ? n
            : new $.Event(m, "object" == typeof n && n)).isTrigger = !0),
          (n.namespace = g.join(".")),
          (n.namespace_re = n.namespace
            ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (n.result = t),
          n.target || (n.target = i),
          (r = null == r ? [n] : $.makeArray(r, [n])),
          (f = $.event.special[m] || {}),
          a || !f.trigger || !1 !== f.trigger.apply(i, r)))
      ) {
        if (!a && !f.noBubble && !$.isWindow(i)) {
          for (
            c = f.delegateType || m, et.test(c + m) || (l = l.parentNode);
            l;
            l = l.parentNode
          )
            h.push(l), (p = l);
          p === (i.ownerDocument || o) &&
            h.push(p.defaultView || p.parentWindow || e);
        }
        for (d = 0; (l = h[d++]) && !n.isPropagationStopped(); )
          (n.type = d > 1 ? c : f.bindType || m),
            (s =
              ($._data(l, "events") || {})[n.type] && $._data(l, "handle")) &&
              s.apply(l, r),
            (s = u && l[u]) &&
              $.acceptData(l) &&
              s.apply &&
              !1 === s.apply(l, r) &&
              n.preventDefault();
        if (
          ((n.type = m),
          !a &&
            !n.isDefaultPrevented() &&
            (!f._default || !1 === f._default.apply(i.ownerDocument, r)) &&
            !("click" === m && $.nodeName(i, "a")) &&
            $.acceptData(i) &&
            u &&
            i[m] &&
            !$.isWindow(i))
        ) {
          (p = i[u]) && (i[u] = null), ($.event.triggered = m);
          try {
            i[m]();
          } catch (v) {}
          ($.event.triggered = t), p && (i[u] = p);
        }
        return n.result;
      }
    },
    dispatch: function (e) {
      e = $.event.fix(e);
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = h.call(arguments),
        l = ($._data(this, "events") || {})[e.type] || [],
        c = $.event.special[e.type] || {};
      if (
        ((u[0] = e),
        (e.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, e))
      ) {
        for (
          s = $.event.handlers.call(this, e, l), n = 0;
          (o = s[n++]) && !e.isPropagationStopped();

        )
          for (
            e.currentTarget = o.elem, a = 0;
            (i = o.handlers[a++]) && !e.isImmediatePropagationStopped();

          )
            (!e.namespace_re || e.namespace_re.test(i.namespace)) &&
              ((e.handleObj = i),
              (e.data = i.data),
              t !==
                (r = (
                  ($.event.special[i.origType] || {}).handle || i.handler
                ).apply(o.elem, u)) &&
                !1 === (e.result = r) &&
                (e.preventDefault(), e.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function (e, n) {
      var r,
        i,
        o,
        a,
        s = [],
        u = n.delegateCount,
        l = e.target;
      if (u && l.nodeType && (!e.button || "click" !== e.type)) {
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
            for (a = 0, o = []; a < u; a++)
              t === o[(r = (i = n[a]).selector + " ")] &&
                (o[r] = i.needsContext
                  ? $(r, this).index(l) >= 0
                  : $.find(r, this, null, [l]).length),
                o[r] && o.push(i);
            o.length && s.push({ elem: l, handlers: o });
          }
      }
      return u < n.length && s.push({ elem: this, handlers: n.slice(u) }), s;
    },
    fix: function (e) {
      if (e[$.expando]) return e;
      var t,
        n,
        r,
        i = e.type,
        a = e,
        s = this.fixHooks[i];
      for (
        s ||
          (this.fixHooks[i] = s =
            ee.test(i) ? this.mouseHooks : Z.test(i) ? this.keyHooks : {}),
          r = s.props ? this.props.concat(s.props) : this.props,
          e = new $.Event(a),
          t = r.length;
        t--;

      )
        e[(n = r[t])] = a[n];
      return (
        e.target || (e.target = a.srcElement || o),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        (e.metaKey = !!e.metaKey),
        s.filter ? s.filter(e, a) : e
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (e, n) {
        var r,
          i,
          a,
          s = n.button,
          u = n.fromElement;
        return (
          null == e.pageX &&
            null != n.clientX &&
            ((a = (i = e.target.ownerDocument || o).documentElement),
            (r = i.body),
            (e.pageX =
              n.clientX +
              ((a && a.scrollLeft) || (r && r.scrollLeft) || 0) -
              ((a && a.clientLeft) || (r && r.clientLeft) || 0)),
            (e.pageY =
              n.clientY +
              ((a && a.scrollTop) || (r && r.scrollTop) || 0) -
              ((a && a.clientTop) || (r && r.clientTop) || 0))),
          !e.relatedTarget &&
            u &&
            (e.relatedTarget = u === e.target ? n.toElement : u),
          e.which ||
            s === t ||
            (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
          e
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      click: {
        trigger: function () {
          if (
            $.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
          )
            return this.click(), !1;
        },
      },
      focus: {
        trigger: function () {
          if (this !== o.activeElement && this.focus)
            try {
              return this.focus(), !1;
            } catch (e) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === o.activeElement && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout",
      },
      beforeunload: {
        postDispatch: function (e) {
          t !== e.result && (e.originalEvent.returnValue = e.result);
        },
      },
    },
    simulate: function (e, t, n, r) {
      var i = $.extend(new $.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {},
      });
      r ? $.event.trigger(i, null, t) : $.event.dispatch.call(t, i),
        i.isDefaultPrevented() && n.preventDefault();
    },
  }),
    ($.removeEvent = o.removeEventListener
      ? function (e, t, n) {
          e.removeEventListener && e.removeEventListener(t, n, !1);
        }
      : function (e, t, n) {
          var r = "on" + t;
          e.detachEvent &&
            (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
        }),
    ($.Event = function (e, t) {
      if (!(this instanceof $.Event)) return new $.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            !1 === e.returnValue ||
            (e.getPreventDefault && e.getPreventDefault())
              ? er
              : ei))
        : (this.type = e),
        t && $.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || $.now()),
        (this[$.expando] = !0);
    }),
    ($.Event.prototype = {
      isDefaultPrevented: ei,
      isPropagationStopped: ei,
      isImmediatePropagationStopped: ei,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = er),
          e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = er),
          e &&
            (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        (this.isImmediatePropagationStopped = er), this.stopPropagation();
      },
    }),
    $.each(
      { mouseenter: "mouseover", mouseleave: "mouseout" },
      function (e, t) {
        $.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n,
              r = e.relatedTarget,
              i = e.handleObj;
            return (
              (r && (r === this || $.contains(this, r))) ||
                ((e.type = i.origType),
                (n = i.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          },
        };
      }
    ),
    $.support.submitBubbles ||
      ($.event.special.submit = {
        setup: function () {
          if ($.nodeName(this, "form")) return !1;
          $.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target,
              r =
                $.nodeName(n, "input") || $.nodeName(n, "button") ? n.form : t;
            r &&
              !$._data(r, "submitBubbles") &&
              ($.event.add(r, "submit._submit", function (e) {
                e._submit_bubble = !0;
              }),
              $._data(r, "submitBubbles", !0));
          });
        },
        postDispatch: function (e) {
          e._submit_bubble &&
            (delete e._submit_bubble,
            this.parentNode &&
              !e.isTrigger &&
              $.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function () {
          if ($.nodeName(this, "form")) return !1;
          $.event.remove(this, "._submit");
        },
      }),
    $.support.changeBubbles ||
      ($.event.special.change = {
        setup: function () {
          if (K.test(this.nodeName))
            return (
              ("checkbox" === this.type || "radio" === this.type) &&
                ($.event.add(this, "propertychange._change", function (e) {
                  "checked" === e.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                $.event.add(this, "click._change", function (e) {
                  this._just_changed &&
                    !e.isTrigger &&
                    (this._just_changed = !1),
                    $.event.simulate("change", this, e, !0);
                })),
              !1
            );
          $.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            K.test(t.nodeName) &&
              !$._data(t, "changeBubbles") &&
              ($.event.add(t, "change._change", function (e) {
                !this.parentNode ||
                  e.isSimulated ||
                  e.isTrigger ||
                  $.event.simulate("change", this.parentNode, e, !0);
              }),
              $._data(t, "changeBubbles", !0));
          });
        },
        handle: function (e) {
          var t = e.target;
          if (
            this !== t ||
            e.isSimulated ||
            e.isTrigger ||
            ("radio" !== t.type && "checkbox" !== t.type)
          )
            return e.handleObj.handler.apply(this, arguments);
        },
        teardown: function () {
          return $.event.remove(this, "._change"), !K.test(this.nodeName);
        },
      }),
    $.support.focusinBubbles ||
      $.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = 0,
          r = function (e) {
            $.event.simulate(t, e.target, $.event.fix(e), !0);
          };
        $.event.special[t] = {
          setup: function () {
            0 == n++ && o.addEventListener(e, r, !0);
          },
          teardown: function () {
            0 == --n && o.removeEventListener(e, r, !0);
          },
        };
      }),
    $.fn.extend({
      on: function (e, n, r, i, o) {
        var a, s;
        if ("object" == typeof e) {
          for (a in ("string" != typeof n && ((r = r || n), (n = t)), e))
            this.on(a, n, r, e[a], o);
          return this;
        }
        if (
          (null == r && null == i
            ? ((i = n), (r = n = t))
            : null == i &&
              ("string" == typeof n
                ? ((i = r), (r = t))
                : ((i = r), (r = n), (n = t))),
          !1 === i)
        )
          i = ei;
        else if (!i) return this;
        return (
          1 === o &&
            ((s = i),
            ((i = function (e) {
              return $().off(e), s.apply(this, arguments);
            }).guid = s.guid || (s.guid = $.guid++))),
          this.each(function () {
            $.event.add(this, e, i, r, n);
          })
        );
      },
      one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1);
      },
      off: function (e, n, r) {
        var i, o;
        if (e && e.preventDefault && e.handleObj)
          return (
            (i = e.handleObj),
            $(e.delegateTarget).off(
              i.namespace ? i.origType + "." + i.namespace : i.origType,
              i.selector,
              i.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (o in e) this.off(o, n, e[o]);
          return this;
        }
        return (
          (!1 === n || "function" == typeof n) && ((r = n), (n = t)),
          !1 === r && (r = ei),
          this.each(function () {
            $.event.remove(this, e, r, n);
          })
        );
      },
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
      trigger: function (e, t) {
        return this.each(function () {
          $.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return $.event.trigger(e, t, n, !0);
      },
    }),
    /*!
     * Sizzle CSS Selector Engine
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license
     * http://sizzlejs.com/
     */ (function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        m,
        g,
        y,
        v,
        b = "sizzle" + -new Date(),
        x = e.document,
        _ = {},
        T = 0,
        w = 0,
        N = en(),
        C = en(),
        k = en(),
        S = "undefined",
        E = [],
        A = E.pop,
        j = E.push,
        D = E.slice,
        L =
          E.indexOf ||
          function (e) {
            for (var t = 0, n = this.length; t < n; t++)
              if (this[t] === e) return t;
            return -1;
          },
        H = "[\\x20\\t\\r\\n\\f]",
        q = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        M = q.replace("w", "w#"),
        O =
          "\\[" +
          H +
          "*(" +
          q +
          ")" +
          H +
          "*(?:([*^$|!~]?=)" +
          H +
          "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
          M +
          ")|)|)" +
          H +
          "*\\]",
        B =
          ":(" +
          q +
          ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
          O.replace(3, 8) +
          ")*)|.*)\\)|)",
        F = RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
        P = RegExp("^" + H + "*," + H + "*"),
        W = RegExp("^" + H + "*([\\x20\\t\\r\\n\\f>+~])" + H + "*"),
        I = RegExp(B),
        z = RegExp("^" + M + "$"),
        R = {
          ID: RegExp("^#(" + q + ")"),
          CLASS: RegExp("^\\.(" + q + ")"),
          NAME: RegExp("^\\[name=['\"]?(" + q + ")['\"]?\\]"),
          TAG: RegExp("^(" + q.replace("w", "w*") + ")"),
          ATTR: RegExp("^" + O),
          PSEUDO: RegExp("^" + B),
          CHILD: RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              H +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              H +
              "*(?:([+-]|)" +
              H +
              "*(\\d+)|))" +
              H +
              "*\\)|)",
            "i"
          ),
          needsContext: RegExp(
            "^" +
              H +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              H +
              "*((?:-\\d)?\\d*)" +
              H +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        X = /[\x20\t\r\n\f]*[+~]/,
        U = /^[^{]+\{\s*\[native code/,
        V = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Y = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        G = /'|\\/g,
        Q = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
        K = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
        Z = function (e, t) {
          var n = "0x" + t - 65536;
          return n != n
            ? t
            : n < 0
            ? String.fromCharCode(n + 65536)
            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
        };
      try {
        D.call(x.documentElement.childNodes, 0)[0].nodeType;
      } catch (ee) {
        D = function (e) {
          for (var t, n = []; (t = this[e++]); ) n.push(t);
          return n;
        };
      }
      function et(e) {
        return U.test(e + "");
      }
      function en() {
        var e,
          t = [];
        return (e = function (n, r) {
          return (
            t.push((n += " ")) > i.cacheLength && delete e[t.shift()],
            (e[n] = r)
          );
        });
      }
      function er(e) {
        return (e[b] = !0), e;
      }
      function ei(e) {
        var t = f.createElement("div");
        try {
          return e(t);
        } catch (n) {
          return !1;
        } finally {
          t = null;
        }
      }
      function eo(e, t, n, r) {
        var o, a, u, l, p, m, g, v, $, T;
        if (
          ((t ? t.ownerDocument || t : x) !== f && c(t),
          (t = t || f),
          (n = n || []),
          !e || "string" != typeof e)
        )
          return n;
        if (1 !== (l = t.nodeType) && 9 !== l) return [];
        if (!d && !r) {
          if ((o = V.exec(e))) {
            if ((u = o[1])) {
              if (9 === l) {
                if (!(a = t.getElementById(u)) || !a.parentNode) return n;
                if (a.id === u) return n.push(a), n;
              } else if (
                t.ownerDocument &&
                (a = t.ownerDocument.getElementById(u)) &&
                y(t, a) &&
                a.id === u
              )
                return n.push(a), n;
            } else if (o[2])
              return j.apply(n, D.call(t.getElementsByTagName(e), 0)), n;
            else if ((u = o[3]) && _.getByClassName && t.getElementsByClassName)
              return j.apply(n, D.call(t.getElementsByClassName(u), 0)), n;
          }
          if (_.qsa && !h.test(e)) {
            if (
              ((g = !0),
              (v = b),
              ($ = t),
              (T = 9 === l && e),
              1 === l && "object" !== t.nodeName.toLowerCase())
            ) {
              for (
                m = ec(e),
                  (g = t.getAttribute("id"))
                    ? (v = g.replace(G, "\\$&"))
                    : t.setAttribute("id", v),
                  v = "[id='" + v + "'] ",
                  p = m.length;
                p--;

              )
                m[p] = v + ef(m[p]);
              ($ = (X.test(e) && t.parentNode) || t), (T = m.join(","));
            }
            if (T)
              try {
                return j.apply(n, D.call($.querySelectorAll(T), 0)), n;
              } catch (w) {
              } finally {
                g || t.removeAttribute("id");
              }
          }
        }
        return (function e(t, n, r, o) {
          var a,
            u,
            l,
            c,
            f,
            p = ec(t);
          if (!o && 1 === p.length) {
            if (
              (u = p[0] = p[0].slice(0)).length > 2 &&
              "ID" === (l = u[0]).type &&
              9 === n.nodeType &&
              !d &&
              i.relative[u[1].type]
            ) {
              if (!(n = i.find.ID(l.matches[0].replace(K, Z), n)[0])) return r;
              t = t.slice(u.shift().value.length);
            }
            for (
              a = R.needsContext.test(t) ? 0 : u.length;
              a-- && ((l = u[a]), !i.relative[(c = l.type)]);

            )
              if (
                (f = i.find[c]) &&
                (o = f(
                  l.matches[0].replace(K, Z),
                  (X.test(u[0].type) && n.parentNode) || n
                ))
              ) {
                if ((u.splice(a, 1), !(t = o.length && ef(u))))
                  return j.apply(r, D.call(o, 0)), r;
                break;
              }
          }
          return s(t, p)(o, n, d, r, X.test(t)), r;
        })(e.replace(F, "$1"), t, n, r);
      }
      function ea(e, t) {
        var n = t && e,
          r =
            n &&
            (~t.sourceIndex || -2147483648) - (~e.sourceIndex || -2147483648);
        if (r) return r;
        if (n) {
          for (; (n = n.nextSibling); ) if (n === t) return -1;
        }
        return e ? 1 : -1;
      }
      function es(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function eu(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e;
        };
      }
      function el(e) {
        return er(function (t) {
          return (
            (t = +t),
            er(function (n, r) {
              for (var i, o = e([], n.length, t), a = o.length; a--; )
                n[(i = o[a])] && (n[i] = !(r[i] = n[i]));
            })
          );
        });
      }
      for (n in ((a = eo.isXML =
        function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return !!t && "HTML" !== t.nodeName;
        }),
      (c = eo.setDocument =
        function (e) {
          var t = e ? e.ownerDocument || e : x;
          return (
            t !== f &&
              9 === t.nodeType &&
              t.documentElement &&
              ((f = t),
              (p = t.documentElement),
              (d = a(t)),
              (_.tagNameNoComments = ei(function (e) {
                return (
                  e.appendChild(t.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (_.attributes = ei(function (e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t;
              })),
              (_.getByClassName = ei(function (e) {
                return (
                  (e.innerHTML =
                    "<div class='hidden e'></div><div class='hidden'></div>"),
                  !!e.getElementsByClassName &&
                    !!e.getElementsByClassName("e").length &&
                    ((e.lastChild.className = "e"),
                    2 === e.getElementsByClassName("e").length)
                );
              })),
              (_.getByName = ei(function (e) {
                (e.id = b + 0),
                  (e.innerHTML =
                    "<a name='" + b + "'></a><div name='" + b + "'></div>"),
                  p.insertBefore(e, p.firstChild);
                var n =
                  t.getElementsByName &&
                  t.getElementsByName(b).length ===
                    2 + t.getElementsByName(b + 0).length;
                return (
                  (_.getIdNotName = !t.getElementById(b)), p.removeChild(e), n
                );
              })),
              (i.attrHandle = ei(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"),
                  e.firstChild &&
                    typeof e.firstChild.getAttribute !== S &&
                    "#" === e.firstChild.getAttribute("href")
                );
              })
                ? {}
                : {
                    href: function (e) {
                      return e.getAttribute("href", 2);
                    },
                    type: function (e) {
                      return e.getAttribute("type");
                    },
                  }),
              _.getIdNotName
                ? ((i.find.ID = function (e, t) {
                    if (typeof t.getElementById !== S && !d) {
                      var n = t.getElementById(e);
                      return n && n.parentNode ? [n] : [];
                    }
                  }),
                  (i.filter.ID = function (e) {
                    var t = e.replace(K, Z);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }))
                : ((i.find.ID = function (e, t) {
                    if (typeof t.getElementById !== S && !d) {
                      var n = t.getElementById(e);
                      return n
                        ? n.id === e ||
                          (typeof n.getAttributeNode !== S &&
                            n.getAttributeNode("id").value === e)
                          ? [n]
                          : void 0
                        : [];
                    }
                  }),
                  (i.filter.ID = function (e) {
                    var t = e.replace(K, Z);
                    return function (e) {
                      var n =
                        typeof e.getAttributeNode !== S &&
                        e.getAttributeNode("id");
                      return n && n.value === t;
                    };
                  })),
              (i.find.TAG = _.tagNameNoComments
                ? function (e, t) {
                    if (typeof t.getElementsByTagName !== S)
                      return t.getElementsByTagName(e);
                  }
                : function (e, t) {
                    var n,
                      r = [],
                      i = 0,
                      o = t.getElementsByTagName(e);
                    if ("*" === e) {
                      for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                      return r;
                    }
                    return o;
                  }),
              (i.find.NAME =
                _.getByName &&
                function (e, t) {
                  if (typeof t.getElementsByName !== S)
                    return t.getElementsByName(name);
                }),
              (i.find.CLASS =
                _.getByClassName &&
                function (e, t) {
                  if (typeof t.getElementsByClassName !== S && !d)
                    return t.getElementsByClassName(e);
                }),
              (m = []),
              (h = [":focus"]),
              (_.qsa = et(t.querySelectorAll)) &&
                (ei(function (e) {
                  (e.innerHTML =
                    "<select><option selected=''></option></select>"),
                    e.querySelectorAll("[selected]").length ||
                      h.push(
                        "\\[" +
                          H +
                          "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"
                      ),
                    e.querySelectorAll(":checked").length || h.push(":checked");
                }),
                ei(function (e) {
                  (e.innerHTML = "<input type='hidden' i=''/>"),
                    e.querySelectorAll("[i^='']").length &&
                      h.push("[*^$]=" + H + "*(?:\"\"|'')"),
                    e.querySelectorAll(":enabled").length ||
                      h.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    h.push(",.*:");
                })),
              (_.matchesSelector = et(
                (g =
                  p.matchesSelector ||
                  p.mozMatchesSelector ||
                  p.webkitMatchesSelector ||
                  p.oMatchesSelector ||
                  p.msMatchesSelector)
              )) &&
                ei(function (e) {
                  (_.disconnectedMatch = g.call(e, "div")),
                    g.call(e, "[s!='']:x"),
                    m.push("!=", B);
                }),
              (h = RegExp(h.join("|"))),
              (m = RegExp(m.join("|"))),
              (y =
                et(p.contains) || p.compareDocumentPosition
                  ? function (e, t) {
                      var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                      return (
                        e === r ||
                        !!(
                          r &&
                          1 === r.nodeType &&
                          (n.contains
                            ? n.contains(r)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(r))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t) {
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      }
                      return !1;
                    }),
              (v = p.compareDocumentPosition
                ? function (e, n) {
                    var r;
                    return e === n
                      ? ((u = !0), 0)
                      : (r =
                          n.compareDocumentPosition &&
                          e.compareDocumentPosition &&
                          e.compareDocumentPosition(n))
                      ? 1 & r || (e.parentNode && 11 === e.parentNode.nodeType)
                        ? e === t || y(x, e)
                          ? -1
                          : n === t || y(x, n)
                          ? 1
                          : 0
                        : 4 & r
                        ? -1
                        : 1
                      : e.compareDocumentPosition
                      ? -1
                      : 1;
                  }
                : function (e, n) {
                    var r,
                      i = 0,
                      o = e.parentNode,
                      a = n.parentNode,
                      s = [e],
                      l = [n];
                    if (e === n) return (u = !0), 0;
                    if (!o || !a)
                      return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : 0;
                    if (o === a) return ea(e, n);
                    for (r = e; (r = r.parentNode); ) s.unshift(r);
                    for (r = n; (r = r.parentNode); ) l.unshift(r);
                    for (; s[i] === l[i]; ) i++;
                    return i
                      ? ea(s[i], l[i])
                      : s[i] === x
                      ? -1
                      : l[i] === x
                      ? 1
                      : 0;
                  }),
              (u = !1),
              [0, 0].sort(v),
              (_.detectDuplicates = u)),
            f
          );
        }),
      (eo.matches = function (e, t) {
        return eo(e, null, null, t);
      }),
      (eo.matchesSelector = function (e, t) {
        if (
          ((e.ownerDocument || e) !== f && c(e),
          (t = t.replace(Q, "='$1']")),
          _.matchesSelector && !d && (!m || !m.test(t)) && !h.test(t))
        )
          try {
            var n = g.call(e, t);
            if (
              n ||
              _.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return n;
          } catch (r) {}
        return eo(t, f, null, [e]).length > 0;
      }),
      (eo.contains = function (e, t) {
        return (e.ownerDocument || e) !== f && c(e), y(e, t);
      }),
      (eo.attr = function (e, t) {
        var n;
        return ((e.ownerDocument || e) !== f && c(e),
        d || (t = t.toLowerCase()),
        (n = i.attrHandle[t]))
          ? n(e)
          : d || _.attributes
          ? e.getAttribute(t)
          : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && !0 === e[t]
          ? t
          : n && n.specified
          ? n.value
          : null;
      }),
      (eo.error = function (e) {
        throw Error("Syntax error, unrecognized expression: " + e);
      }),
      (eo.uniqueSort = function (e) {
        var t,
          n = [],
          r = 1,
          i = 0;
        if (((u = !_.detectDuplicates), e.sort(v), u)) {
          for (; (t = e[r]); r++) t === e[r - 1] && (i = n.push(r));
          for (; i--; ) e.splice(n[i], 1);
        }
        return e;
      }),
      (o = eo.getText =
        function (e) {
          var t,
            n = "",
            r = 0,
            i = e.nodeType;
          if (i) {
            if (1 === i || 9 === i || 11 === i) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
            } else if (3 === i || 4 === i) return e.nodeValue;
          } else for (; (t = e[r]); r++) n += o(t);
          return n;
        }),
      (i = eo.selectors =
        {
          cacheLength: 50,
          createPseudo: er,
          match: R,
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(K, Z)),
                (e[3] = (e[4] || e[5] || "").replace(K, Z)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || eo.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && eo.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                n = !e[5] && e[2];
              return R.CHILD.test(e[0])
                ? null
                : (e[4]
                    ? (e[2] = e[4])
                    : n &&
                      I.test(n) &&
                      (t = ec(n, !0)) &&
                      (t = n.indexOf(")", n.length - t) - n.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              return "*" === e
                ? function () {
                    return !0;
                  }
                : ((e = e.replace(K, Z).toLowerCase()),
                  function (t) {
                    return t.nodeName && t.nodeName.toLowerCase() === e;
                  });
            },
            CLASS: function (e) {
              var t = N[e + " "];
              return (
                t ||
                ((t = RegExp("(^|" + H + ")" + e + "(" + H + "|$)")),
                N(e, function (e) {
                  return t.test(
                    e.className ||
                      (typeof e.getAttribute !== S &&
                        e.getAttribute("class")) ||
                      ""
                  );
                }))
              );
            },
            ATTR: function (e, t, n) {
              return function (r) {
                var i = eo.attr(r, e);
                return null == i
                  ? "!=" === t
                  : !t ||
                      ((i += ""),
                      "=" === t
                        ? i === n
                        : "!=" === t
                        ? i !== n
                        : "^=" === t
                        ? n && 0 === i.indexOf(n)
                        : "*=" === t
                        ? n && i.indexOf(n) > -1
                        : "$=" === t
                        ? n && i.slice(-n.length) === n
                        : "~=" === t
                        ? (" " + i + " ").indexOf(n) > -1
                        : "|=" === t &&
                          (i === n || i.slice(0, n.length + 1) === n + "-"));
              };
            },
            CHILD: function (e, t, n, r, i) {
              var o = "nth" !== e.slice(0, 3),
                a = "last" !== e.slice(-4),
                s = "of-type" === t;
              return 1 === r && 0 === i
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (t, n, u) {
                    var l,
                      c,
                      f,
                      p,
                      d,
                      h,
                      m = o !== a ? "nextSibling" : "previousSibling",
                      g = t.parentNode,
                      y = s && t.nodeName.toLowerCase(),
                      v = !u && !s;
                    if (g) {
                      if (o) {
                        for (; m; ) {
                          for (f = t; (f = f[m]); )
                            if (
                              s
                                ? f.nodeName.toLowerCase() === y
                                : 1 === f.nodeType
                            )
                              return !1;
                          h = m = "only" === e && !h && "nextSibling";
                        }
                        return !0;
                      }
                      if (((h = [a ? g.firstChild : g.lastChild]), a && v)) {
                        for (
                          d =
                            (l = (c = g[b] || (g[b] = {}))[e] || [])[0] === T &&
                            l[1],
                            p = l[0] === T && l[2],
                            f = d && g.childNodes[d];
                          (f = (++d && f && f[m]) || (p = d = 0) || h.pop());

                        )
                          if (1 === f.nodeType && ++p && f === t) {
                            c[e] = [T, d, p];
                            break;
                          }
                      } else if (
                        v &&
                        (l = (t[b] || (t[b] = {}))[e]) &&
                        l[0] === T
                      )
                        p = l[1];
                      else
                        for (
                          ;
                          (f = (++d && f && f[m]) || (p = d = 0) || h.pop()) &&
                          (!(
                            (s
                              ? f.nodeName.toLowerCase() === y
                              : 1 === f.nodeType) && ++p
                          ) ||
                            (v && ((f[b] || (f[b] = {}))[e] = [T, p]),
                            f !== t));

                        );
                      return (p -= i) === r || (p % r == 0 && p / r >= 0);
                    }
                  };
            },
            PSEUDO: function (e, t) {
              var n,
                r =
                  i.pseudos[e] ||
                  i.setFilters[e.toLowerCase()] ||
                  eo.error("unsupported pseudo: " + e);
              return r[b]
                ? r(t)
                : r.length > 1
                ? ((n = [e, e, "", t]),
                  i.setFilters.hasOwnProperty(e.toLowerCase())
                    ? er(function (e, n) {
                        for (var i, o = r(e, t), a = o.length; a--; )
                          e[(i = L.call(e, o[a]))] = !(n[i] = o[a]);
                      })
                    : function (e) {
                        return r(e, 0, n);
                      })
                : r;
            },
          },
          pseudos: {
            not: er(function (e) {
              var t = [],
                n = [],
                r = s(e.replace(F, "$1"));
              return r[b]
                ? er(function (e, t, n, i) {
                    for (var o, a = r(e, null, i, []), s = e.length; s--; )
                      (o = a[s]) && (e[s] = !(t[s] = o));
                  })
                : function (e, i, o) {
                    return (t[0] = e), r(t, null, o, n), !n.pop();
                  };
            }),
            has: er(function (e) {
              return function (t) {
                return eo(e, t).length > 0;
              };
            }),
            contains: er(function (e) {
              return function (t) {
                return (t.textContent || t.innerText || o(t)).indexOf(e) > -1;
              };
            }),
            lang: er(function (e) {
              return (
                z.test(e || "") || eo.error("unsupported lang: " + e),
                (e = e.replace(K, Z).toLowerCase()),
                function (t) {
                  var n;
                  do
                    if (
                      (n = d
                        ? t.getAttribute("xml:lang") || t.getAttribute("lang")
                        : t.lang)
                    )
                      return (
                        (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                      );
                  while ((t = t.parentNode) && 1 === t.nodeType);
                  return !1;
                }
              );
            }),
            target: function (t) {
              var n = e.location && e.location.hash;
              return n && n.slice(1) === t.id;
            },
            root: function (e) {
              return e === p;
            },
            focus: function (e) {
              return (
                e === f.activeElement &&
                (!f.hasFocus || f.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: function (e) {
              return !1 === e.disabled;
            },
            disabled: function (e) {
              return !0 === e.disabled;
            },
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)
                  return !1;
              return !0;
            },
            parent: function (e) {
              return !i.pseudos.empty(e);
            },
            header: function (e) {
              return J.test(e.nodeName);
            },
            input: function (e) {
              return Y.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  t.toLowerCase() === e.type)
              );
            },
            first: el(function () {
              return [0];
            }),
            last: el(function (e, t) {
              return [t - 1];
            }),
            eq: el(function (e, t, n) {
              return [n < 0 ? n + t : n];
            }),
            even: el(function (e, t) {
              for (var n = 0; n < t; n += 2) e.push(n);
              return e;
            }),
            odd: el(function (e, t) {
              for (var n = 1; n < t; n += 2) e.push(n);
              return e;
            }),
            lt: el(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; --r >= 0; ) e.push(r);
              return e;
            }),
            gt: el(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
              return e;
            }),
          },
        }),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        i.pseudos[n] = es(n);
      for (n in { submit: !0, reset: !0 }) i.pseudos[n] = eu(n);
      function ec(e, t) {
        var n,
          r,
          o,
          a,
          s,
          u,
          l,
          c = C[e + " "];
        if (c) return t ? 0 : c.slice(0);
        for (s = e, u = [], l = i.preFilter; s; ) {
          for (a in ((!n || (r = P.exec(s))) &&
            (r && (s = s.slice(r[0].length) || s), u.push((o = []))),
          (n = !1),
          (r = W.exec(s)) &&
            ((n = r.shift()),
            o.push({ value: n, type: r[0].replace(F, " ") }),
            (s = s.slice(n.length))),
          i.filter))
            (r = R[a].exec(s)) &&
              (!l[a] || (r = l[a](r))) &&
              ((n = r.shift()),
              o.push({ value: n, type: a, matches: r }),
              (s = s.slice(n.length)));
          if (!n) break;
        }
        return t ? s.length : s ? eo.error(e) : C(e, u).slice(0);
      }
      function ef(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
        return r;
      }
      function ep(e, t, n) {
        var i = t.dir,
          o = n && "parentNode" === i,
          a = w++;
        return t.first
          ? function (t, n, r) {
              for (; (t = t[i]); ) if (1 === t.nodeType || o) return e(t, n, r);
            }
          : function (t, n, s) {
              var u,
                l,
                c,
                f = T + " " + a;
              if (s) {
                for (; (t = t[i]); )
                  if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
              } else
                for (; (t = t[i]); )
                  if (1 === t.nodeType || o) {
                    if ((l = (c = t[b] || (t[b] = {}))[i]) && l[0] === f) {
                      if (!0 === (u = l[1]) || u === r) return !0 === u;
                    } else if (
                      (((l = c[i] = [f])[1] = e(t, n, s) || r), !0 === l[1])
                    )
                      return !0;
                  }
            };
      }
      function ed(e) {
        return e.length > 1
          ? function (t, n, r) {
              for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
              return !0;
            }
          : e[0];
      }
      function eh(e, t, n, r, i) {
        for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
          (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
        return a;
      }
      function em(e, t, n, r, i, o) {
        return (
          r && !r[b] && (r = em(r)),
          i && !i[b] && (i = em(i, o)),
          er(function (o, a, s, u) {
            var l,
              c,
              f,
              p = [],
              d = [],
              h = a.length,
              m =
                o ||
                (function e(t, n, r) {
                  for (var i = 0, o = n.length; i < o; i++) eo(t, n[i], r);
                  return r;
                })(t || "*", s.nodeType ? [s] : s, []),
              g = e && (o || !t) ? eh(m, p, e, s, u) : m,
              y = n ? (i || (o ? e : h || r) ? [] : a) : g;
            if ((n && n(g, y, s, u), r))
              for (l = eh(y, d), r(l, [], s, u), c = l.length; c--; )
                (f = l[c]) && (y[d[c]] = !(g[d[c]] = f));
            if (o) {
              if (i || e) {
                if (i) {
                  for (l = [], c = y.length; c--; )
                    (f = y[c]) && l.push((g[c] = f));
                  i(null, (y = []), l, u);
                }
                for (c = y.length; c--; )
                  (f = y[c]) &&
                    (l = i ? L.call(o, f) : p[c]) > -1 &&
                    (o[l] = !(a[l] = f));
              }
            } else (y = eh(y === a ? y.splice(h, y.length) : y)), i ? i(null, a, y, u) : j.apply(a, y);
          })
        );
      }
      function eg(e) {
        for (
          var t,
            n,
            r,
            o = e.length,
            a = i.relative[e[0].type],
            s = a || i.relative[" "],
            u = a ? 1 : 0,
            c = ep(
              function (e) {
                return e === t;
              },
              s,
              !0
            ),
            f = ep(
              function (e) {
                return L.call(t, e) > -1;
              },
              s,
              !0
            ),
            p = [
              function (e, n, r) {
                return (
                  (!a && (r || n !== l)) ||
                  ((t = n).nodeType ? c(e, n, r) : f(e, n, r))
                );
              },
            ];
          u < o;
          u++
        )
          if ((n = i.relative[e[u].type])) p = [ep(ed(p), n)];
          else {
            if ((n = i.filter[e[u].type].apply(null, e[u].matches))[b]) {
              for (r = ++u; r < o && !i.relative[e[r].type]; r++);
              return em(
                u > 1 && ed(p),
                u > 1 && ef(e.slice(0, u - 1)).replace(F, "$1"),
                n,
                u < r && eg(e.slice(u, r)),
                r < o && eg((e = e.slice(r))),
                r < o && ef(e)
              );
            }
            p.push(n);
          }
        return ed(p);
      }
      function ey() {}
      (s = eo.compile =
        function (e, t) {
          var n,
            o,
            a,
            s,
            u,
            c,
            p,
            d = [],
            h = [],
            m = k[e + " "];
          if (!m) {
            for (t || (t = ec(e)), p = t.length; p--; )
              (m = eg(t[p]))[b] ? d.push(m) : h.push(m);
            m = k(
              e,
              ((n = h),
              (a = 0),
              (s = (o = d).length > 0),
              (u = n.length > 0),
              (c = function (e, t, c, p, d) {
                var h,
                  m,
                  g,
                  y = [],
                  v = 0,
                  $ = "0",
                  b = e && [],
                  x = null != d,
                  _ = l,
                  w = e || (u && i.find.TAG("*", (d && t.parentNode) || t)),
                  N = (T += null == _ ? 1 : Math.random() || 0.1);
                for (
                  x && ((l = t !== f && t), (r = a));
                  null != (h = w[$]);
                  $++
                ) {
                  if (u && h) {
                    for (m = 0; (g = n[m++]); )
                      if (g(h, t, c)) {
                        p.push(h);
                        break;
                      }
                    x && ((T = N), (r = ++a));
                  }
                  s && ((h = !g && h) && v--, e && b.push(h));
                }
                if (((v += $), s && $ !== v)) {
                  for (m = 0; (g = o[m++]); ) g(b, y, t, c);
                  if (e) {
                    if (v > 0) for (; $--; ) b[$] || y[$] || (y[$] = A.call(p));
                    y = eh(y);
                  }
                  j.apply(p, y),
                    x &&
                      !e &&
                      y.length > 0 &&
                      v + o.length > 1 &&
                      eo.uniqueSort(p);
                }
                return x && ((T = N), (l = _)), b;
              }),
              s ? er(c) : c)
            );
          }
          return m;
        }),
        (i.pseudos.nth = i.pseudos.eq),
        (i.filters = ey.prototype = i.pseudos),
        (i.setFilters = new ey()),
        c(),
        (eo.attr = $.attr),
        ($.find = eo),
        ($.expr = eo.selectors),
        ($.expr[":"] = $.expr.pseudos),
        ($.unique = eo.uniqueSort),
        ($.text = eo.getText),
        ($.isXMLDoc = eo.isXML),
        ($.contains = eo.contains);
    })(e);
  var eo = /Until$/,
    ea = /^(?:parents|prev(?:Until|All))/,
    es = /^.[^:#\[\.,]*$/,
    eu = $.expr.match.needsContext,
    el = { children: !0, contents: !0, next: !0, prev: !0 };
  function ec(e, t) {
    do e = e[t];
    while (e && 1 !== e.nodeType);
    return e;
  }
  function ef(e, t, n) {
    if (((t = t || 0), $.isFunction(t)))
      return $.grep(e, function (e, r) {
        return !!t.call(e, r, e) === n;
      });
    if (t.nodeType)
      return $.grep(e, function (e) {
        return (e === t) === n;
      });
    if ("string" == typeof t) {
      var r = $.grep(e, function (e) {
        return 1 === e.nodeType;
      });
      if (es.test(t)) return $.filter(t, r, !n);
      t = $.filter(t, r);
    }
    return $.grep(e, function (e) {
      return $.inArray(e, t) >= 0 === n;
    });
  }
  function ep(e) {
    var t = ed.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) for (; t.length; ) n.createElement(t.pop());
    return n;
  }
  $.fn.extend({
    find: function (e) {
      var t,
        n,
        r,
        i = this.length;
      if ("string" != typeof e)
        return (
          (r = this),
          this.pushStack(
            $(e).filter(function () {
              for (t = 0; t < i; t++) if ($.contains(r[t], this)) return !0;
            })
          )
        );
      for (t = 0, n = []; t < i; t++) $.find(e, this[t], n);
      return (
        ((n = this.pushStack(i > 1 ? $.unique(n) : n)).selector =
          (this.selector ? this.selector + " " : "") + e),
        n
      );
    },
    has: function (e) {
      var t,
        n = $(e, this),
        r = n.length;
      return this.filter(function () {
        for (t = 0; t < r; t++) if ($.contains(this, n[t])) return !0;
      });
    },
    not: function (e) {
      return this.pushStack(ef(this, e, !1));
    },
    filter: function (e) {
      return this.pushStack(ef(this, e, !0));
    },
    is: function (e) {
      return (
        !!e &&
        ("string" == typeof e
          ? eu.test(e)
            ? $(e, this.context).index(this[0]) >= 0
            : $.filter(e, this).length > 0
          : this.filter(e).length > 0)
      );
    },
    closest: function (e, t) {
      for (
        var n,
          r = 0,
          i = this.length,
          o = [],
          a = eu.test(e) || "string" != typeof e ? $(e, t || this.context) : 0;
        r < i;
        r++
      )
        for (
          n = this[r];
          n && n.ownerDocument && n !== t && 11 !== n.nodeType;

        ) {
          if (a ? a.index(n) > -1 : $.find.matchesSelector(n, e)) {
            o.push(n);
            break;
          }
          n = n.parentNode;
        }
      return this.pushStack(o.length > 1 ? $.unique(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? $.inArray(this[0], $(e))
          : $.inArray(e.jquery ? e[0] : e, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      var n =
          "string" == typeof e
            ? $(e, t)
            : $.makeArray(e && e.nodeType ? [e] : e),
        r = $.merge(this.get(), n);
      return this.pushStack($.unique(r));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    ($.fn.andSelf = $.fn.addBack),
    $.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return $.dir(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return $.dir(e, "parentNode", n);
        },
        next: function (e) {
          return ec(e, "nextSibling");
        },
        prev: function (e) {
          return ec(e, "previousSibling");
        },
        nextAll: function (e) {
          return $.dir(e, "nextSibling");
        },
        prevAll: function (e) {
          return $.dir(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return $.dir(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return $.dir(e, "previousSibling", n);
        },
        siblings: function (e) {
          return $.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return $.sibling(e.firstChild);
        },
        contents: function (e) {
          return $.nodeName(e, "iframe")
            ? e.contentDocument || e.contentWindow.document
            : $.merge([], e.childNodes);
        },
      },
      function (e, t) {
        $.fn[e] = function (n, r) {
          var i = $.map(this, t, n);
          return (
            eo.test(e) || (r = n),
            r && "string" == typeof r && (i = $.filter(r, i)),
            (i = this.length > 1 && !el[e] ? $.unique(i) : i),
            this.length > 1 && ea.test(e) && (i = i.reverse()),
            this.pushStack(i)
          );
        };
      }
    ),
    $.extend({
      filter: function (e, t, n) {
        return (
          n && (e = ":not(" + e + ")"),
          1 === t.length
            ? $.find.matchesSelector(t[0], e)
              ? [t[0]]
              : []
            : $.find.matches(e, t)
        );
      },
      dir: function (e, n, r) {
        for (
          var i = [], o = e[n];
          o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !$(o).is(r));

        )
          1 === o.nodeType && i.push(o), (o = o[n]);
        return i;
      },
      sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e);
        return n;
      },
    });
  var ed =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    eh = / jQuery\d+="(?:null|\d+)"/g,
    em = RegExp("<(?:" + ed + ")[\\s/>]", "i"),
    eg = /^\s+/,
    ey =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ev = /<([\w:]+)/,
    e$ = /<tbody/i,
    eb = /<|&#?\w+;/,
    ex = /<(?:script|style|link)/i,
    e_ = /^(?:checkbox|radio)$/i,
    eT = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ew = /^$|\/(?:java|ecma)script/i,
    eN = /^true\/(.*)/,
    eC = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ek = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: $.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    eS = ep(o).appendChild(o.createElement("div"));
  function eE(e, t) {
    return (
      e.getElementsByTagName(t)[0] ||
      e.appendChild(e.ownerDocument.createElement(t))
    );
  }
  function eA(e) {
    var t = e.getAttributeNode("type");
    return (e.type = (t && t.specified) + "/" + e.type), e;
  }
  function ej(e) {
    var t = eN.exec(e.type);
    return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
  }
  function eD(e, t) {
    for (var n, r = 0; null != (n = e[r]); r++)
      $._data(n, "globalEval", !t || $._data(t[r], "globalEval"));
  }
  function eL(e, t) {
    if (1 === t.nodeType && $.hasData(e)) {
      var n,
        r,
        i,
        o = $._data(e),
        a = $._data(t, o),
        s = o.events;
      if (s)
        for (n in (delete a.handle, (a.events = {}), s))
          for (r = 0, i = s[n].length; r < i; r++) $.event.add(t, n, s[n][r]);
      a.data && (a.data = $.extend({}, a.data));
    }
  }
  function eH(e, t) {
    var n, r, i;
    if (1 === t.nodeType) {
      if (
        ((n = t.nodeName.toLowerCase()),
        !$.support.noCloneEvent && t[$.expando])
      ) {
        for (r in (i = $._data(t)).events) $.removeEvent(t, r, i.handle);
        t.removeAttribute($.expando);
      }
      "script" === n && t.text !== e.text
        ? ((eA(t).text = e.text), ej(t))
        : "object" === n
        ? (t.parentNode && (t.outerHTML = e.outerHTML),
          $.support.html5Clone &&
            e.innerHTML &&
            !$.trim(t.innerHTML) &&
            (t.innerHTML = e.innerHTML))
        : "input" === n && e_.test(e.type)
        ? ((t.defaultChecked = t.checked = e.checked),
          t.value !== e.value && (t.value = e.value))
        : "option" === n
        ? (t.defaultSelected = t.selected = e.defaultSelected)
        : ("input" === n || "textarea" === n) &&
          (t.defaultValue = e.defaultValue);
    }
  }
  function eq(e, n) {
    var r,
      o,
      a = 0,
      s =
        typeof e.getElementsByTagName !== i
          ? e.getElementsByTagName(n || "*")
          : typeof e.querySelectorAll !== i
          ? e.querySelectorAll(n || "*")
          : t;
    if (!s)
      for (s = [], r = e.childNodes || e; null != (o = r[a]); a++)
        !n || $.nodeName(o, n) ? s.push(o) : $.merge(s, eq(o, n));
    return n === t || (n && $.nodeName(e, n)) ? $.merge([e], s) : s;
  }
  function e8(e) {
    e_.test(e.type) && (e.defaultChecked = e.checked);
  }
  (ek.optgroup = ek.option),
    (ek.tbody = ek.tfoot = ek.colgroup = ek.caption = ek.thead),
    (ek.th = ek.td),
    $.fn.extend({
      text: function (e) {
        return $.access(
          this,
          function (e) {
            return e === t
              ? $.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || o).createTextNode(e)
                );
          },
          null,
          e,
          arguments.length
        );
      },
      wrapAll: function (e) {
        if ($.isFunction(e))
          return this.each(function (t) {
            $(this).wrapAll(e.call(this, t));
          });
        if (this[0]) {
          var t = $(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (
                  var e = this;
                  e.firstChild && 1 === e.firstChild.nodeType;

                )
                  e = e.firstChild;
                return e;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (e) {
        return $.isFunction(e)
          ? this.each(function (t) {
              $(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = $(this),
                n = t.contents();
              n.length ? n.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = $.isFunction(e);
        return this.each(function (n) {
          $(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            $.nodeName(this, "body") || $(this).replaceWith(this.childNodes);
          })
          .end();
      },
      append: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType) &&
            this.appendChild(e);
        });
      },
      prepend: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType) &&
            this.insertBefore(e, this.firstChild);
        });
      },
      before: function () {
        return this.domManip(arguments, !1, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return this.domManip(arguments, !1, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      remove: function (e, t) {
        for (var n, r = 0; null != (n = this[r]); r++)
          (!e || $.filter(e, [n]).length > 0) &&
            (t || 1 !== n.nodeType || $.cleanData(eq(n)),
            n.parentNode &&
              (t && $.contains(n.ownerDocument, n) && eD(eq(n, "script")),
              n.parentNode.removeChild(n)));
        return this;
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++) {
          for (1 === e.nodeType && $.cleanData(eq(e, !1)); e.firstChild; )
            e.removeChild(e.firstChild);
          e.options && $.nodeName(e, "select") && (e.options.length = 0);
        }
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return $.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return $.access(
          this,
          function (e) {
            var n = this[0] || {},
              r = 0,
              i = this.length;
            if (e === t)
              return 1 === n.nodeType ? n.innerHTML.replace(eh, "") : t;
            if (
              "string" == typeof e &&
              !ex.test(e) &&
              ($.support.htmlSerialize || !em.test(e)) &&
              ($.support.leadingWhitespace || !eg.test(e)) &&
              !ek[(ev.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = e.replace(ey, "<$1></$2>");
              try {
                for (; r < i; r++)
                  (n = this[r] || {}),
                    1 === n.nodeType &&
                      ($.cleanData(eq(n, !1)), (n.innerHTML = e));
                n = 0;
              } catch (o) {}
            }
            n && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function (e) {
        return (
          $.isFunction(e) ||
            "string" == typeof e ||
            (e = $(e).not(this).detach()),
          this.domManip([e], !0, function (e) {
            var t = this.nextSibling,
              n = this.parentNode;
            n && ($(this).remove(), n.insertBefore(e, t));
          })
        );
      },
      detach: function (e) {
        return this.remove(e, !0);
      },
      domManip: function (e, n, r) {
        e = p.apply([], e);
        var i,
          o,
          a,
          s,
          u,
          l,
          c = 0,
          f = this.length,
          d = this,
          h = f - 1,
          m = e[0],
          g = $.isFunction(m);
        if (
          g ||
          !(
            f <= 1 ||
            "string" != typeof m ||
            $.support.checkClone ||
            !eT.test(m)
          )
        )
          return this.each(function (i) {
            var o = d.eq(i);
            g && (e[0] = m.call(this, i, n ? o.html() : t)),
              o.domManip(e, n, r);
          });
        if (
          f &&
          ((i = (l = $.buildFragment(e, this[0].ownerDocument, !1, this))
            .firstChild),
          1 === l.childNodes.length && (l = i),
          i)
        ) {
          for (
            n = n && $.nodeName(i, "tr"),
              a = (s = $.map(eq(l, "script"), eA)).length;
            c < f;
            c++
          )
            (o = l),
              c !== h &&
                ((o = $.clone(o, !0, !0)), a && $.merge(s, eq(o, "script"))),
              r.call(
                n && $.nodeName(this[c], "table")
                  ? eE(this[c], "tbody")
                  : this[c],
                o,
                c
              );
          if (a)
            for (
              u = s[s.length - 1].ownerDocument, $.map(s, ej), c = 0;
              c < a;
              c++
            )
              (o = s[c]),
                ew.test(o.type || "") &&
                  !$._data(o, "globalEval") &&
                  $.contains(u, o) &&
                  (o.src
                    ? $.ajax({
                        url: o.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0,
                      })
                    : $.globalEval(
                        (o.text || o.textContent || o.innerHTML || "").replace(
                          eC,
                          ""
                        )
                      ));
          l = i = null;
        }
        return this;
      },
    }),
    $.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        $.fn[e] = function (e) {
          for (var n, r = 0, i = [], o = $(e), a = o.length - 1; r <= a; r++)
            (n = r === a ? this : this.clone(!0)),
              $(o[r])[t](n),
              d.apply(i, n.get());
          return this.pushStack(i);
        };
      }
    ),
    $.extend({
      clone: function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u = $.contains(e.ownerDocument, e);
        if (
          ($.support.html5Clone ||
          $.isXMLDoc(e) ||
          !em.test("<" + e.nodeName + ">")
            ? (o = e.cloneNode(!0))
            : ((eS.innerHTML = e.outerHTML),
              eS.removeChild((o = eS.firstChild))),
          (!$.support.noCloneEvent || !$.support.noCloneChecked) &&
            (1 === e.nodeType || 11 === e.nodeType) &&
            !$.isXMLDoc(e))
        )
          for (a = 0, r = eq(o), s = eq(e); null != (i = s[a]); ++a)
            r[a] && eH(i, r[a]);
        if (t) {
          if (n)
            for (a = 0, s = s || eq(e), r = r || eq(o); null != (i = s[a]); a++)
              eL(i, r[a]);
          else eL(e, o);
        }
        return (
          (r = eq(o, "script")).length > 0 && eD(r, !u && eq(e, "script")),
          (r = s = i = null),
          o
        );
      },
      buildFragment: function (e, t, n, r) {
        for (
          var i, o, a, s, u, l, c, f = e.length, p = ep(t), d = [], h = 0;
          h < f;
          h++
        )
          if ((o = e[h]) || 0 === o) {
            if ("object" === $.type(o)) $.merge(d, o.nodeType ? [o] : o);
            else if (eb.test(o)) {
              for (
                s = s || p.appendChild(t.createElement("div")),
                  c =
                    ek[(u = (ev.exec(o) || ["", ""])[1].toLowerCase())] ||
                    ek._default,
                  s.innerHTML = c[1] + o.replace(ey, "<$1></$2>") + c[2],
                  i = c[0];
                i--;

              )
                s = s.lastChild;
              if (
                (!$.support.leadingWhitespace &&
                  eg.test(o) &&
                  d.push(t.createTextNode(eg.exec(o)[0])),
                !$.support.tbody)
              )
                for (
                  i =
                    (o =
                      "table" !== u || e$.test(o)
                        ? "<table>" !== c[1] || e$.test(o)
                          ? 0
                          : s
                        : s.firstChild) && o.childNodes.length;
                  i--;

                )
                  $.nodeName((l = o.childNodes[i]), "tbody") &&
                    !l.childNodes.length &&
                    o.removeChild(l);
              for ($.merge(d, s.childNodes), s.textContent = ""; s.firstChild; )
                s.removeChild(s.firstChild);
              s = p.lastChild;
            } else d.push(t.createTextNode(o));
          }
        for (
          s && p.removeChild(s),
            $.support.appendChecked || $.grep(eq(d, "input"), e8),
            h = 0;
          (o = d[h++]);

        )
          if (
            (!r || -1 === $.inArray(o, r)) &&
            ((a = $.contains(o.ownerDocument, o)),
            (s = eq(p.appendChild(o), "script")),
            a && eD(s),
            n)
          )
            for (i = 0; (o = s[i++]); ) ew.test(o.type || "") && n.push(o);
        return (s = null), p;
      },
      cleanData: function (e, t) {
        for (
          var n,
            r,
            o,
            a,
            s = 0,
            u = $.expando,
            l = $.cache,
            f = $.support.deleteExpando,
            p = $.event.special;
          null != (n = e[s]);
          s++
        )
          if ((t || $.acceptData(n)) && (a = (o = n[u]) && l[o])) {
            if (a.events)
              for (r in a.events)
                p[r] ? $.event.remove(n, r) : $.removeEvent(n, r, a.handle);
            l[o] &&
              (delete l[o],
              f
                ? delete n[u]
                : typeof n.removeAttribute !== i
                ? n.removeAttribute(u)
                : (n[u] = null),
              c.push(o));
          }
      },
    });
  var eM,
    eO,
    eB,
    eF = /alpha\([^)]*\)/i,
    e0 = /opacity\s*=\s*([^)]*)/,
    eP = /^(top|right|bottom|left)$/,
    eW = /^(none|table(?!-c[ea]).+)/,
    e9 = /^margin/,
    e2 = RegExp("^(" + b + ")(.*)$", "i"),
    eI = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
    e1 = RegExp("^([+-])=(" + b + ")", "i"),
    ez = { BODY: "block" },
    eR = { position: "absolute", visibility: "hidden", display: "block" },
    eX = { letterSpacing: 0, fontWeight: 400 },
    e3 = ["Top", "Right", "Bottom", "Left"],
    e7 = ["Webkit", "O", "Moz", "ms"];
  function e4(e, t) {
    if (t in e) return t;
    for (
      var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = e7.length;
      i--;

    )
      if ((t = e7[i] + n) in e) return t;
    return r;
  }
  function e6(e, t) {
    return (
      (e = t || e),
      "none" === $.css(e, "display") || !$.contains(e.ownerDocument, e)
    );
  }
  function eU(e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)
      (r = e[a]).style &&
        ((o[a] = $._data(r, "olddisplay")),
        (n = r.style.display),
        t
          ? (o[a] || "none" !== n || (r.style.display = ""),
            "" === r.style.display &&
              e6(r) &&
              (o[a] = $._data(r, "olddisplay", eG(r.nodeName))))
          : o[a] ||
            ((i = e6(r)),
            ((n && "none" !== n) || !i) &&
              $._data(r, "olddisplay", i ? n : $.css(r, "display"))));
    for (a = 0; a < s; a++)
      (r = e[a]).style &&
        ((t && "none" !== r.style.display && "" !== r.style.display) ||
          (r.style.display = t ? o[a] || "" : "none"));
    return e;
  }
  function eV(e, t, n) {
    var r = e2.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }
  function eY(e, t, n, r, i) {
    for (
      var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
        a = 0;
      o < 4;
      o += 2
    )
      "margin" === n && (a += $.css(e, n + e3[o], !0, i)),
        r
          ? ("content" === n && (a -= $.css(e, "padding" + e3[o], !0, i)),
            "margin" !== n &&
              (a -= $.css(e, "border" + e3[o] + "Width", !0, i)))
          : ((a += $.css(e, "padding" + e3[o], !0, i)),
            "padding" !== n &&
              (a += $.css(e, "border" + e3[o] + "Width", !0, i)));
    return a;
  }
  function eJ(e, t, n) {
    var r = !0,
      i = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = eO(e),
      a = $.support.boxSizing && "border-box" === $.css(e, "boxSizing", !1, o);
    if (i <= 0 || null == i) {
      if (
        (((i = eB(e, t, o)) < 0 || null == i) && (i = e.style[t]), eI.test(i))
      )
        return i;
      (r = a && ($.support.boxSizingReliable || i === e.style[t])),
        (i = parseFloat(i) || 0);
    }
    return i + eY(e, t, n || (a ? "border" : "content"), r, o) + "px";
  }
  function eG(e) {
    var t = o,
      n = ez[e];
    return (
      n ||
        (("none" !== (n = eQ(e, t)) && n) ||
          ((t = (
            (eM = (
              eM ||
              $("<iframe frameborder='0' width='0' height='0'/>").css(
                "cssText",
                "display:block !important"
              )
            ).appendTo(t.documentElement))[0].contentWindow ||
            eM[0].contentDocument
          ).document).write("<!doctype html><html><body>"),
          t.close(),
          (n = eQ(e, t)),
          eM.detach()),
        (ez[e] = n)),
      n
    );
  }
  function eQ(e, t) {
    var n = $(t.createElement(e)).appendTo(t.body),
      r = $.css(n[0], "display");
    return n.remove(), r;
  }
  $.fn.extend({
    css: function (e, n) {
      return $.access(
        this,
        function (e, n, r) {
          var i,
            o,
            a = {},
            s = 0;
          if ($.isArray(n)) {
            for (o = eO(e), i = n.length; s < i; s++)
              a[n[s]] = $.css(e, n[s], !1, o);
            return a;
          }
          return r !== t ? $.style(e, n, r) : $.css(e, n);
        },
        e,
        n,
        arguments.length > 1
      );
    },
    show: function () {
      return eU(this, !0);
    },
    hide: function () {
      return eU(this);
    },
    toggle: function (e) {
      var t = "boolean" == typeof e;
      return this.each(function () {
        (t ? e : e6(this)) ? $(this).show() : $(this).hide();
      });
    },
  }),
    $.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = eB(e, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: $.support.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (e, n, r, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o,
            a,
            s,
            u = $.camelCase(n),
            l = e.style;
          if (
            ((n = $.cssProps[u] || ($.cssProps[u] = e4(l, u))),
            (s = $.cssHooks[n] || $.cssHooks[u]),
            r === t)
          )
            return s && "get" in s && t !== (o = s.get(e, !1, i)) ? o : l[n];
          if (
            ("string" == (a = typeof r) &&
              (o = e1.exec(r)) &&
              ((r = (o[1] + 1) * o[2] + parseFloat($.css(e, n))),
              (a = "number")),
            !(null == r || ("number" === a && isNaN(r))) &&
              ("number" !== a || $.cssNumber[u] || (r += "px"),
              $.support.clearCloneStyle ||
                "" !== r ||
                0 !== n.indexOf("background") ||
                (l[n] = "inherit"),
              !s || !("set" in s) || t !== (r = s.set(e, r, i))))
          )
            try {
              l[n] = r;
            } catch (c) {}
        }
      },
      css: function (e, n, r, i) {
        var o,
          a,
          s,
          u = $.camelCase(n);
        return ((n = $.cssProps[u] || ($.cssProps[u] = e4(e.style, u))),
        (s = $.cssHooks[n] || $.cssHooks[u]) &&
          "get" in s &&
          (a = s.get(e, !0, r)),
        a === t && (a = eB(e, n, i)),
        "normal" === a && n in eX && (a = eX[n]),
        "" === r || r)
          ? ((o = parseFloat(a)), !0 === r || $.isNumeric(o) ? o || 0 : a)
          : a;
      },
      swap: function (e, t, n, r) {
        var i,
          o,
          a = {};
        for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
        for (o in ((i = n.apply(e, r || [])), t)) e.style[o] = a[o];
        return i;
      },
    }),
    e.getComputedStyle
      ? ((eO = function (t) {
          return e.getComputedStyle(t, null);
        }),
        (eB = function (e, n, r) {
          var i,
            o,
            a,
            s = r || eO(e),
            u = s ? s.getPropertyValue(n) || s[n] : t,
            l = e.style;
          return (
            s &&
              ("" !== u ||
                $.contains(e.ownerDocument, e) ||
                (u = $.style(e, n)),
              eI.test(u) &&
                e9.test(n) &&
                ((i = l.width),
                (o = l.minWidth),
                (a = l.maxWidth),
                (l.minWidth = l.maxWidth = l.width = u),
                (u = s.width),
                (l.width = i),
                (l.minWidth = o),
                (l.maxWidth = a))),
            u
          );
        }))
      : o.documentElement.currentStyle &&
        ((eO = function (e) {
          return e.currentStyle;
        }),
        (eB = function (e, n, r) {
          var i,
            o,
            a,
            s = r || eO(e),
            u = s ? s[n] : t,
            l = e.style;
          return (
            null == u && l && l[n] && (u = l[n]),
            eI.test(u) &&
              !eP.test(n) &&
              ((i = l.left),
              (a = (o = e.runtimeStyle) && o.left) &&
                (o.left = e.currentStyle.left),
              (l.left = "fontSize" === n ? "1em" : u),
              (u = l.pixelLeft + "px"),
              (l.left = i),
              a && (o.left = a)),
            "" === u ? "auto" : u
          );
        })),
    $.each(["height", "width"], function (e, t) {
      $.cssHooks[t] = {
        get: function (e, n, r) {
          if (n)
            return 0 === e.offsetWidth && eW.test($.css(e, "display"))
              ? $.swap(e, eR, function () {
                  return eJ(e, t, r);
                })
              : eJ(e, t, r);
        },
        set: function (e, n, r) {
          var i = r && eO(e);
          return eV(
            e,
            n,
            r
              ? eY(
                  e,
                  t,
                  r,
                  $.support.boxSizing &&
                    "border-box" === $.css(e, "boxSizing", !1, i),
                  i
                )
              : 0
          );
        },
      };
    }),
    $.support.opacity ||
      ($.cssHooks.opacity = {
        get: function (e, t) {
          return e0.test(
            (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : t
            ? "1"
            : "";
        },
        set: function (e, t) {
          var n = e.style,
            r = e.currentStyle,
            i = $.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
            o = (r && r.filter) || n.filter || "";
          (n.zoom = 1),
            ((t >= 1 || "" === t) &&
              "" === $.trim(o.replace(eF, "")) &&
              n.removeAttribute &&
              (n.removeAttribute("filter"), "" === t || (r && !r.filter))) ||
              (n.filter = eF.test(o) ? o.replace(eF, i) : o + " " + i);
        },
      }),
    $(function () {
      $.support.reliableMarginRight ||
        ($.cssHooks.marginRight = {
          get: function (e, t) {
            if (t)
              return $.swap(e, { display: "inline-block" }, eB, [
                e,
                "marginRight",
              ]);
          },
        }),
        !$.support.pixelPosition &&
          $.fn.position &&
          $.each(["top", "left"], function (e, t) {
            $.cssHooks[t] = {
              get: function (e, n) {
                if (n)
                  return (
                    (n = eB(e, t)), eI.test(n) ? $(e).position()[t] + "px" : n
                  );
              },
            };
          });
    }),
    $.expr &&
      $.expr.filters &&
      (($.expr.filters.hidden = function (e) {
        return (
          (e.offsetWidth <= 0 && e.offsetHeight <= 0) ||
          (!$.support.reliableHiddenOffsets &&
            "none" === ((e.style && e.style.display) || $.css(e, "display")))
        );
      }),
      ($.expr.filters.visible = function (e) {
        return !$.expr.filters.hidden(e);
      })),
    $.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      ($.cssHooks[e + t] = {
        expand: function (n) {
          for (
            var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
            r < 4;
            r++
          )
            i[e + e3[r] + t] = o[r] || o[r - 2] || o[0];
          return i;
        },
      }),
        e9.test(e) || ($.cssHooks[e + t].set = eV);
    });
  var eK = /%20/g,
    e5 = /\[\]$/,
    eZ = /\r?\n/g,
    te = /^(?:submit|button|image|reset|file)$/i,
    tt = /^(?:input|select|textarea|keygen)/i;
  function tn(e, t, n, r) {
    var i;
    if ($.isArray(t))
      $.each(t, function (t, i) {
        n || e5.test(e)
          ? r(e, i)
          : tn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
      });
    else if (n || "object" !== $.type(t)) r(e, t);
    else for (i in t) tn(e + "[" + i + "]", t[i], n, r);
  }
  $.fn.extend({
    serialize: function () {
      return $.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var e = $.prop(this, "elements");
        return e ? $.makeArray(e) : this;
      })
        .filter(function () {
          var e = this.type;
          return (
            this.name &&
            !$(this).is(":disabled") &&
            tt.test(this.nodeName) &&
            !te.test(e) &&
            (this.checked || !e_.test(e))
          );
        })
        .map(function (e, t) {
          var n = $(this).val();
          return null == n
            ? null
            : $.isArray(n)
            ? $.map(n, function (e) {
                return { name: t.name, value: e.replace(eZ, "\r\n") };
              })
            : { name: t.name, value: n.replace(eZ, "\r\n") };
        })
        .get();
    },
  }),
    ($.param = function (e, n) {
      var r,
        i = [],
        o = function (e, t) {
          (t = $.isFunction(t) ? t() : null == t ? "" : t),
            (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
        };
      if (
        (n === t && (n = $.ajaxSettings && $.ajaxSettings.traditional),
        $.isArray(e) || (e.jquery && !$.isPlainObject(e)))
      )
        $.each(e, function () {
          o(this.name, this.value);
        });
      else for (r in e) tn(r, e[r], n, o);
      return i.join("&").replace(eK, "+");
    }),
    $.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (e, t) {
        $.fn[t] = function (e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    ),
    ($.fn.hover = function (e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    });
  var tr,
    ti,
    to = $.now(),
    ta = /\?/,
    ts = /#.*$/,
    tu = /([?&])_=[^&]*/,
    tl = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    tc = /^(?:GET|HEAD)$/,
    tf = /^\/\//,
    tp = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    td = $.fn.load,
    th = {},
    tm = {},
    tg = "*/".concat("*");
  try {
    ti = a.href;
  } catch (ty) {
    ((ti = o.createElement("a")).href = ""), (ti = ti.href);
  }
  function tv(e) {
    return function (t, n) {
      "string" != typeof t && ((n = t), (t = "*"));
      var r,
        i = 0,
        o = t.toLowerCase().match(x) || [];
      if ($.isFunction(n))
        for (; (r = o[i++]); )
          "+" === r[0]
            ? (e[(r = r.slice(1) || "*")] = e[r] || []).unshift(n)
            : (e[r] = e[r] || []).push(n);
    };
  }
  function t$(e, t, n, r) {
    var i = {},
      o = e === tm;
    function a(s) {
      var u;
      return (
        (i[s] = !0),
        $.each(e[s] || [], function (e, s) {
          var l = s(t, n, r);
          return "string" != typeof l || o || i[l]
            ? o
              ? !(u = l)
              : void 0
            : (t.dataTypes.unshift(l), a(l), !1);
        }),
        u
      );
    }
    return a(t.dataTypes[0]) || (!i["*"] && a("*"));
  }
  function tb(e, n) {
    var r,
      i,
      o = $.ajaxSettings.flatOptions || {};
    for (i in n) t !== n[i] && ((o[i] ? e : r || (r = {}))[i] = n[i]);
    return r && $.extend(!0, e, r), e;
  }
  (tr = tp.exec(ti.toLowerCase()) || []),
    ($.fn.load = function (e, n, r) {
      if ("string" != typeof e && td) return td.apply(this, arguments);
      var i,
        o,
        a,
        s = this,
        u = e.indexOf(" ");
      return (
        u >= 0 && ((i = e.slice(u, e.length)), (e = e.slice(0, u))),
        $.isFunction(n)
          ? ((r = n), (n = t))
          : n && "object" == typeof n && (a = "POST"),
        s.length > 0 &&
          $.ajax({ url: e, type: a, dataType: "html", data: n })
            .done(function (e) {
              (o = arguments),
                s.html(i ? $("<div>").append($.parseHTML(e)).find(i) : e);
            })
            .complete(
              r &&
                function (e, t) {
                  s.each(r, o || [e.responseText, t, e]);
                }
            ),
        this
      );
    }),
    $.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        $.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    $.each(["get", "post"], function (e, n) {
      $[n] = function (e, r, i, o) {
        return (
          $.isFunction(r) && ((o = o || i), (i = r), (r = t)),
          $.ajax({ url: e, type: n, dataType: o, data: r, success: i })
        );
      };
    }),
    $.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ti,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            tr[1]
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": tg,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /xml/, html: /html/, json: /json/ },
        responseFields: { xml: "responseXML", text: "responseText" },
        converters: {
          "* text": e.String,
          "text html": !0,
          "text json": $.parseJSON,
          "text xml": $.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? tb(tb(e, $.ajaxSettings), t) : tb($.ajaxSettings, e);
      },
      ajaxPrefilter: tv(th),
      ajaxTransport: tv(tm),
      ajax: function (e, n) {
        "object" == typeof e && ((n = e), (e = t)), (n = n || {});
        var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = $.ajaxSetup({}, n),
          p = f.context || f,
          d = f.context && (p.nodeType || p.jquery) ? $(p) : $.event,
          h = $.Deferred(),
          m = $.Callbacks("once memory"),
          g = f.statusCode || {},
          y = {},
          v = {},
          b = 0,
          _ = "canceled",
          T = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (2 === b) {
                if (!c)
                  for (c = {}; (t = tl.exec(a)); ) c[t[1].toLowerCase()] = t[2];
                t = c[e.toLowerCase()];
              }
              return null == t ? null : t;
            },
            getAllResponseHeaders: function () {
              return 2 === b ? a : null;
            },
            setRequestHeader: function (e, t) {
              var n = e.toLowerCase();
              return b || (y[(e = v[n] = v[n] || e)] = t), this;
            },
            overrideMimeType: function (e) {
              return b || (f.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e) {
                if (b < 2) for (t in e) g[t] = [g[t], e[t]];
                else T.always(e[T.status]);
              }
              return this;
            },
            abort: function (e) {
              var t = e || _;
              return l && l.abort(t), N(0, t), this;
            },
          };
        if (
          ((h.promise(T).complete = m.add),
          (T.success = T.done),
          (T.error = T.fail),
          (f.url = ((e || f.url || ti) + "")
            .replace(ts, "")
            .replace(tf, tr[1] + "//")),
          (f.type = n.method || n.type || f.method || f.type),
          (f.dataTypes = $.trim(f.dataType || "*")
            .toLowerCase()
            .match(x) || [""]),
          null == f.crossDomain &&
            ((r = tp.exec(f.url.toLowerCase())),
            (f.crossDomain = !!(
              r &&
              (r[1] !== tr[1] ||
                r[2] !== tr[2] ||
                (r[3] || ("http:" === r[1] ? 80 : 443)) !=
                  (tr[3] || ("http:" === tr[1] ? 80 : 443)))
            ))),
          f.data &&
            f.processData &&
            "string" != typeof f.data &&
            (f.data = $.param(f.data, f.traditional)),
          t$(th, f, n, T),
          2 === b)
        )
          return T;
        for (i in ((u = f.global) &&
          0 == $.active++ &&
          $.event.trigger("ajaxStart"),
        (f.type = f.type.toUpperCase()),
        (f.hasContent = !tc.test(f.type)),
        (o = f.url),
        f.hasContent ||
          (f.data &&
            ((o = f.url += (ta.test(o) ? "&" : "?") + f.data), delete f.data),
          !1 === f.cache &&
            (f.url = tu.test(o)
              ? o.replace(tu, "$1_=" + to++)
              : o + (ta.test(o) ? "&" : "?") + "_=" + to++)),
        f.ifModified &&
          ($.lastModified[o] &&
            T.setRequestHeader("If-Modified-Since", $.lastModified[o]),
          $.etag[o] && T.setRequestHeader("If-None-Match", $.etag[o])),
        ((f.data && f.hasContent && !1 !== f.contentType) || n.contentType) &&
          T.setRequestHeader("Content-Type", f.contentType),
        T.setRequestHeader(
          "Accept",
          f.dataTypes[0] && f.accepts[f.dataTypes[0]]
            ? f.accepts[f.dataTypes[0]] +
                ("*" !== f.dataTypes[0] ? ", " + tg + "; q=0.01" : "")
            : f.accepts["*"]
        ),
        f.headers))
          T.setRequestHeader(i, f.headers[i]);
        if (f.beforeSend && (!1 === f.beforeSend.call(p, T, f) || 2 === b))
          return T.abort();
        for (i in ((_ = "abort"), { success: 1, error: 1, complete: 1 }))
          T[i](f[i]);
        if ((l = t$(tm, f, n, T))) {
          (T.readyState = 1),
            u && d.trigger("ajaxSend", [T, f]),
            f.async &&
              f.timeout > 0 &&
              (s = setTimeout(function () {
                T.abort("timeout");
              }, f.timeout));
          try {
            (b = 1), l.send(y, N);
          } catch (w) {
            if (b < 2) N(-1, w);
            else throw w;
          }
        } else N(-1, "No Transport");
        function N(e, n, r, i) {
          var c,
            y,
            v,
            x,
            _,
            w = n;
          2 !== b &&
            ((b = 2),
            s && clearTimeout(s),
            (l = t),
            (a = i || ""),
            (T.readyState = e > 0 ? 4 : 0),
            r &&
              (x = (function e(n, r, i) {
                var o,
                  a,
                  s,
                  u,
                  l = n.contents,
                  c = n.dataTypes,
                  f = n.responseFields;
                for (u in f) u in i && (r[f[u]] = i[u]);
                for (; "*" === c[0]; )
                  c.shift(),
                    a === t &&
                      (a = n.mimeType || r.getResponseHeader("Content-Type"));
                if (a) {
                  for (u in l)
                    if (l[u] && l[u].test(a)) {
                      c.unshift(u);
                      break;
                    }
                }
                if (c[0] in i) s = c[0];
                else {
                  for (u in i) {
                    if (!c[0] || n.converters[u + " " + c[0]]) {
                      s = u;
                      break;
                    }
                    o || (o = u);
                  }
                  s = s || o;
                }
                if (s) return s !== c[0] && c.unshift(s), i[s];
              })(f, T, r)),
            (e >= 200 && e < 300) || 304 === e
              ? (f.ifModified &&
                  ((_ = T.getResponseHeader("Last-Modified")) &&
                    ($.lastModified[o] = _),
                  (_ = T.getResponseHeader("etag")) && ($.etag[o] = _)),
                204 === e
                  ? ((c = !0), (w = "nocontent"))
                  : 304 === e
                  ? ((c = !0), (w = "notmodified"))
                  : ((w = (c = (function e(t, n) {
                      var r,
                        i,
                        o,
                        a,
                        s = {},
                        u = 0,
                        l = t.dataTypes.slice(),
                        c = l[0];
                      if (
                        (t.dataFilter && (n = t.dataFilter(n, t.dataType)),
                        l[1])
                      )
                        for (o in t.converters)
                          s[o.toLowerCase()] = t.converters[o];
                      for (; (i = l[++u]); )
                        if ("*" !== i) {
                          if ("*" !== c && c !== i) {
                            if (!(o = s[c + " " + i] || s["* " + i])) {
                              for (r in s)
                                if (
                                  (a = r.split(" "))[1] === i &&
                                  (o = s[c + " " + a[0]] || s["* " + a[0]])
                                ) {
                                  !0 === o
                                    ? (o = s[r])
                                    : !0 !== s[r] &&
                                      ((i = a[0]), l.splice(u--, 0, i));
                                  break;
                                }
                            }
                            if (!0 !== o) {
                              if (o && t.throws) n = o(n);
                              else
                                try {
                                  n = o(n);
                                } catch (f) {
                                  return {
                                    state: "parsererror",
                                    error: o
                                      ? f
                                      : "No conversion from " + c + " to " + i,
                                  };
                                }
                            }
                          }
                          c = i;
                        }
                      return { state: "success", data: n };
                    })(f, x)).state),
                    (y = c.data),
                    (c = !(v = c.error))))
              : ((v = w), (e || !w) && ((w = "error"), e < 0 && (e = 0))),
            (T.status = e),
            (T.statusText = (n || w) + ""),
            c ? h.resolveWith(p, [y, w, T]) : h.rejectWith(p, [T, w, v]),
            T.statusCode(g),
            (g = t),
            u && d.trigger(c ? "ajaxSuccess" : "ajaxError", [T, f, c ? y : v]),
            m.fireWith(p, [T, w]),
            !u ||
              (d.trigger("ajaxComplete", [T, f]),
              --$.active || $.event.trigger("ajaxStop")));
        }
        return T;
      },
      getScript: function (e, n) {
        return $.get(e, t, n, "script");
      },
      getJSON: function (e, t, n) {
        return $.get(e, t, n, "json");
      },
    }),
    $.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /(?:java|ecma)script/ },
      converters: {
        "text script": function (e) {
          return $.globalEval(e), e;
        },
      },
    }),
    $.ajaxPrefilter("script", function (e) {
      t === e.cache && (e.cache = !1),
        e.crossDomain && ((e.type = "GET"), (e.global = !1));
    }),
    $.ajaxTransport("script", function (e) {
      if (e.crossDomain) {
        var n,
          r = o.head || $("head")[0] || o.documentElement;
        return {
          send: function (t, i) {
            ((n = o.createElement("script")).async = !0),
              e.scriptCharset && (n.charset = e.scriptCharset),
              (n.src = e.url),
              (n.onload = n.onreadystatechange =
                function (e, t) {
                  (t ||
                    !n.readyState ||
                    /loaded|complete/.test(n.readyState)) &&
                    ((n.onload = n.onreadystatechange = null),
                    n.parentNode && n.parentNode.removeChild(n),
                    (n = null),
                    t || i(200, "success"));
                }),
              r.insertBefore(n, r.firstChild);
          },
          abort: function () {
            n && n.onload(t, !0);
          },
        };
      }
    });
  var tx = [],
    t_ = /(=)\?(?=&|$)|\?\?/;
  $.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = tx.pop() || $.expando + "_" + to++;
      return (this[e] = !0), e;
    },
  }),
    $.ajaxPrefilter("json jsonp", function (n, r, i) {
      var o,
        a,
        s,
        u =
          !1 !== n.jsonp &&
          (t_.test(n.url)
            ? "url"
            : "string" == typeof n.data &&
              !(n.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              t_.test(n.data) &&
              "data");
      if (u || "jsonp" === n.dataTypes[0])
        return (
          (o = n.jsonpCallback =
            $.isFunction(n.jsonpCallback)
              ? n.jsonpCallback()
              : n.jsonpCallback),
          u
            ? (n[u] = n[u].replace(t_, "$1" + o))
            : !1 !== n.jsonp &&
              (n.url += (ta.test(n.url) ? "&" : "?") + n.jsonp + "=" + o),
          (n.converters["script json"] = function () {
            return s || $.error(o + " was not called"), s[0];
          }),
          (n.dataTypes[0] = "json"),
          (a = e[o]),
          (e[o] = function () {
            s = arguments;
          }),
          i.always(function () {
            (e[o] = a),
              n[o] && ((n.jsonpCallback = r.jsonpCallback), tx.push(o)),
              s && $.isFunction(a) && a(s[0]),
              (s = a = t);
          }),
          "script"
        );
    });
  var tT,
    tw,
    tN = 0,
    tC =
      e.ActiveXObject &&
      function () {
        var e;
        for (e in tT) tT[e](t, !0);
      };
  function tk() {
    try {
      return new e.XMLHttpRequest();
    } catch (t) {}
  }
  ($.ajaxSettings.xhr = e.ActiveXObject
    ? function () {
        return (
          (!this.isLocal && tk()) ||
          (function t() {
            try {
              return new e.ActiveXObject("Microsoft.XMLHTTP");
            } catch (n) {}
          })()
        );
      }
    : tk),
    (tw = $.ajaxSettings.xhr()),
    ($.support.cors = !!tw && "withCredentials" in tw),
    (tw = $.support.ajax = !!tw) &&
      $.ajaxTransport(function (n) {
        if (!n.crossDomain || $.support.cors) {
          var r;
          return {
            send: function (i, o) {
              var a,
                s,
                u = n.xhr();
              if (
                (n.username
                  ? u.open(n.type, n.url, n.async, n.username, n.password)
                  : u.open(n.type, n.url, n.async),
                n.xhrFields)
              )
                for (s in n.xhrFields) u[s] = n.xhrFields[s];
              n.mimeType &&
                u.overrideMimeType &&
                u.overrideMimeType(n.mimeType),
                n.crossDomain ||
                  i["X-Requested-With"] ||
                  (i["X-Requested-With"] = "XMLHttpRequest");
              try {
                for (s in i) u.setRequestHeader(s, i[s]);
              } catch (l) {}
              u.send((n.hasContent && n.data) || null),
                (r = function (e, i) {
                  var s, l, c, f;
                  try {
                    if (r && (i || 4 === u.readyState)) {
                      if (
                        ((r = t),
                        a &&
                          ((u.onreadystatechange = $.noop), tC && delete tT[a]),
                        i)
                      )
                        4 !== u.readyState && u.abort();
                      else {
                        (f = {}),
                          (s = u.status),
                          (l = u.getAllResponseHeaders()),
                          "string" == typeof u.responseText &&
                            (f.text = u.responseText);
                        try {
                          c = u.statusText;
                        } catch (p) {
                          c = "";
                        }
                        s || !n.isLocal || n.crossDomain
                          ? 1223 === s && (s = 204)
                          : (s = f.text ? 200 : 404);
                      }
                    }
                  } catch (d) {
                    i || o(-1, d);
                  }
                  f && o(s, c, f, l);
                }),
                n.async
                  ? 4 === u.readyState
                    ? setTimeout(r)
                    : ((a = ++tN),
                      tC && (tT || ((tT = {}), $(e).unload(tC)), (tT[a] = r)),
                      (u.onreadystatechange = r))
                  : r();
            },
            abort: function () {
              r && r(t, !0);
            },
          };
        }
      });
  var tS,
    tE,
    tA = /^(?:toggle|show|hide)$/,
    tj = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
    tD = /queueHooks$/,
    tL = [
      function e(t, n, r) {
        var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d = this,
          h = t.style,
          m = {},
          g = [],
          y = t.nodeType && e6(t);
        for (o in (r.queue ||
          (null == (f = $._queueHooks(t, "fx")).unqueued &&
            ((f.unqueued = 0),
            (p = f.empty.fire),
            (f.empty.fire = function () {
              f.unqueued || p();
            })),
          f.unqueued++,
          d.always(function () {
            d.always(function () {
              f.unqueued--, $.queue(t, "fx").length || f.empty.fire();
            });
          })),
        1 === t.nodeType &&
          ("height" in n || "width" in n) &&
          ((r.overflow = [h.overflow, h.overflowX, h.overflowY]),
          "inline" === $.css(t, "display") &&
            "none" === $.css(t, "float") &&
            ($.support.inlineBlockNeedsLayout && "inline" !== eG(t.nodeName)
              ? (h.zoom = 1)
              : (h.display = "inline-block"))),
        r.overflow &&
          ((h.overflow = "hidden"),
          $.support.shrinkWrapBlocks ||
            d.always(function () {
              (h.overflow = r.overflow[0]),
                (h.overflowX = r.overflow[1]),
                (h.overflowY = r.overflow[2]);
            })),
        n))
          if (((s = n[o]), tA.exec(s))) {
            if (
              (delete n[o],
              (l = l || "toggle" === s),
              s === (y ? "hide" : "show"))
            )
              continue;
            g.push(o);
          }
        if ((a = g.length))
          for (
            ("hidden" in
              (u = $._data(t, "fxshow") || $._data(t, "fxshow", {}))) &&
              (y = u.hidden),
              l && (u.hidden = !y),
              y
                ? $(t).show()
                : d.done(function () {
                    $(t).hide();
                  }),
              d.done(function () {
                var e;
                for (e in ($._removeData(t, "fxshow"), m)) $.style(t, e, m[e]);
              }),
              o = 0;
            o < a;
            o++
          )
            (i = g[o]),
              (c = d.createTween(i, y ? u[i] : 0)),
              (m[i] = u[i] || $.style(t, i)),
              i in u ||
                ((u[i] = c.start),
                y &&
                  ((c.end = c.start),
                  (c.start = "width" === i || "height" === i ? 1 : 0)));
      },
    ],
    tH = {
      "*": [
        function (e, t) {
          var n,
            r,
            i = this.createTween(e, t),
            o = tj.exec(t),
            a = i.cur(),
            s = +a || 0,
            u = 1,
            l = 20;
          if (o) {
            if (
              ((n = +o[2]),
              "px" !== (r = o[3] || ($.cssNumber[e] ? "" : "px")) && s)
            ) {
              s = $.css(i.elem, e, !0) || n || 1;
              do (s /= u = u || ".5"), $.style(i.elem, e, s + r);
              while (u !== (u = i.cur() / a) && 1 !== u && --l);
            }
            (i.unit = r),
              (i.start = s),
              (i.end = o[1] ? s + (o[1] + 1) * n : n);
          }
          return i;
        },
      ],
    };
  function tq() {
    return (
      setTimeout(function () {
        tS = t;
      }),
      (tS = $.now())
    );
  }
  function t8(e, t, n) {
    var r,
      i,
      o,
      a,
      s = 0,
      u = tL.length,
      l = $.Deferred().always(function () {
        delete c.elem;
      }),
      c = function () {
        if (a) return !1;
        for (
          var t = tS || tq(),
            n = Math.max(0, f.startTime + f.duration - t),
            r = 1 - (n / f.duration || 0),
            i = 0,
            o = f.tweens.length;
          i < o;
          i++
        )
          f.tweens[i].run(r);
        return (l.notifyWith(e, [f, r, n]), r < 1 && o)
          ? n
          : (l.resolveWith(e, [f]), !1);
      },
      f = l.promise({
        elem: e,
        props: $.extend({}, t),
        opts: $.extend(!0, { specialEasing: {} }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: tS || tq(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var r = $.Tween(
            e,
            f.opts,
            t,
            n,
            f.opts.specialEasing[t] || f.opts.easing
          );
          return f.tweens.push(r), r;
        },
        stop: function (t) {
          var n = 0,
            r = t ? f.tweens.length : 0;
          if (a) return this;
          for (a = !0; n < r; n++) f.tweens[n].run(1);
          return t ? l.resolveWith(e, [f, t]) : l.rejectWith(e, [f, t]), this;
        },
      }),
      p = f.props;
    for (
      (function e(t, n) {
        var r, i, o, a, s;
        for (o in t)
          if (
            ((a = n[(i = $.camelCase(o))]),
            (r = t[o]),
            $.isArray(r) && ((a = r[1]), (r = t[o] = r[0])),
            o !== i && ((t[i] = r), delete t[o]),
            (s = $.cssHooks[i]) && ("expand" in s))
          )
            for (o in ((r = s.expand(r)), delete t[i], r))
              (o in t) || ((t[o] = r[o]), (n[o] = a));
          else n[i] = a;
      })(p, f.opts.specialEasing);
      s < u;
      s++
    )
      if ((o = tL[s].call(f, e, p, f.opts))) return o;
    return (
      (r = f),
      (i = p),
      $.each(i, function (e, t) {
        for (
          var n = (tH[e] || []).concat(tH["*"]), i = 0, o = n.length;
          i < o;
          i++
        )
          if (n[i].call(r, e, t)) return;
      }),
      $.isFunction(f.opts.start) && f.opts.start.call(e, f),
      $.fx.timer($.extend(c, { elem: e, anim: f, queue: f.opts.queue })),
      f
        .progress(f.opts.progress)
        .done(f.opts.done, f.opts.complete)
        .fail(f.opts.fail)
        .always(f.opts.always)
    );
  }
  function tM(e, t, n, r, i) {
    return new tM.prototype.init(e, t, n, r, i);
  }
  function tO(e, t) {
    var n,
      r = { height: e },
      i = 0;
    for (t = t ? 1 : 0; i < 4; i += 2 - t)
      r["margin" + (n = e3[i])] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e), r;
  }
  function tB(e) {
    return $.isWindow(e)
      ? e
      : 9 === e.nodeType && (e.defaultView || e.parentWindow);
  }
  ($.Animation = $.extend(t8, {
    tweener: function (e, t) {
      $.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
      for (var n, r = 0, i = e.length; r < i; r++)
        (tH[(n = e[r])] = tH[n] || []), tH[n].unshift(t);
    },
    prefilter: function (e, t) {
      t ? tL.unshift(e) : tL.push(e);
    },
  })),
    ($.Tween = tM),
    (tM.prototype = {
      constructor: tM,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || "swing"),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || ($.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = tM.propHooks[this.prop];
        return e && e.get ? e.get(this) : tM.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = tM.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                $.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : tM.propHooks._default.set(this),
          this
        );
      },
    }),
    (tM.prototype.init.prototype = tM.prototype),
    (tM.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return null == e.elem[e.prop] ||
            (e.elem.style && null != e.elem.style[e.prop])
            ? (t = $.css(e.elem, e.prop, "")) && "auto" !== t
              ? t
              : 0
            : e.elem[e.prop];
        },
        set: function (e) {
          $.fx.step[e.prop]
            ? $.fx.step[e.prop](e)
            : e.elem.style &&
              (null != e.elem.style[$.cssProps[e.prop]] || $.cssHooks[e.prop])
            ? $.style(e.elem, e.prop, e.now + e.unit)
            : (e.elem[e.prop] = e.now);
        },
      },
    }),
    (tM.propHooks.scrollTop = tM.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    $.each(["toggle", "show", "hide"], function (e, t) {
      var n = $.fn[t];
      $.fn[t] = function (e, r, i) {
        return null == e || "boolean" == typeof e
          ? n.apply(this, arguments)
          : this.animate(tO(t, !0), e, r, i);
      };
    }),
    $.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(e6)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (e, t, n, r) {
        var i = $.isEmptyObject(e),
          o = $.speed(t, n, r),
          a = function () {
            var t = t8(this, $.extend({}, e), o);
            (a.finish = function () {
              t.stop(!0);
            }),
              (i || $._data(this, "finish")) && t.stop(!0);
          };
        return (
          (a.finish = a),
          i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (e, n, r) {
        var i = function (e) {
          var t = e.stop;
          delete e.stop, t(r);
        };
        return (
          "string" != typeof e && ((r = n), (n = e), (e = t)),
          n && !1 !== e && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              n = null != e && e + "queueHooks",
              o = $.timers,
              a = $._data(this);
            if (n) a[n] && a[n].stop && i(a[n]);
            else for (n in a) a[n] && a[n].stop && tD.test(n) && i(a[n]);
            for (n = o.length; n--; )
              o[n].elem === this &&
                (null == e || o[n].queue === e) &&
                (o[n].anim.stop(r), (t = !1), o.splice(n, 1));
            (t || !r) && $.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          !1 !== e && (e = e || "fx"),
          this.each(function () {
            var t,
              n = $._data(this),
              r = n[e + "queue"],
              i = n[e + "queueHooks"],
              o = $.timers,
              a = r ? r.length : 0;
            for (
              n.finish = !0,
                $.queue(this, e, []),
                i && i.cur && i.cur.finish && i.cur.finish.call(this),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; t < a; t++)
              r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    $.each(
      {
        slideDown: tO("show"),
        slideUp: tO("hide"),
        slideToggle: tO("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        $.fn[e] = function (e, n, r) {
          return this.animate(t, e, n, r);
        };
      }
    ),
    ($.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? $.extend({}, e)
          : {
              complete: n || (!n && t) || ($.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !$.isFunction(t) && t),
            };
      return (
        (r.duration = $.fx.off
          ? 0
          : "number" == typeof r.duration
          ? r.duration
          : r.duration in $.fx.speeds
          ? $.fx.speeds[r.duration]
          : $.fx.speeds._default),
        (null == r.queue || !0 === r.queue) && (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          $.isFunction(r.old) && r.old.call(this),
            r.queue && $.dequeue(this, r.queue);
        }),
        r
      );
    }),
    ($.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
    }),
    ($.timers = []),
    ($.fx = tM.prototype.init),
    ($.fx.tick = function () {
      var e,
        n = $.timers,
        r = 0;
      for (tS = $.now(); r < n.length; r++)
        (e = n[r])() || n[r] !== e || n.splice(r--, 1);
      n.length || $.fx.stop(), (tS = t);
    }),
    ($.fx.timer = function (e) {
      e() && $.timers.push(e) && $.fx.start();
    }),
    ($.fx.interval = 13),
    ($.fx.start = function () {
      tE || (tE = setInterval($.fx.tick, $.fx.interval));
    }),
    ($.fx.stop = function () {
      clearInterval(tE), (tE = null);
    }),
    ($.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    ($.fx.step = {}),
    $.expr &&
      $.expr.filters &&
      ($.expr.filters.animated = function (e) {
        return $.grep($.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
    ($.fn.offset = function (e) {
      if (arguments.length)
        return e === t
          ? this
          : this.each(function (t) {
              $.offset.setOffset(this, e, t);
            });
      var n,
        r,
        o = { top: 0, left: 0 },
        a = this[0],
        s = a && a.ownerDocument;
      return s
        ? ((n = s.documentElement), $.contains(n, a))
          ? (typeof a.getBoundingClientRect !== i &&
              (o = a.getBoundingClientRect()),
            (r = tB(s)),
            {
              top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
              left:
                o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0),
            })
          : o
        : void 0;
    }),
    ($.offset = {
      setOffset: function (e, t, n) {
        var r = $.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i,
          o,
          a = $(e),
          s = a.offset(),
          u = $.css(e, "top"),
          l = $.css(e, "left"),
          c =
            ("absolute" === r || "fixed" === r) &&
            $.inArray("auto", [u, l]) > -1,
          f = {},
          p = {};
        c
          ? ((i = (p = a.position()).top), (o = p.left))
          : ((i = parseFloat(u) || 0), (o = parseFloat(l) || 0)),
          $.isFunction(t) && (t = t.call(e, n, s)),
          null != t.top && (f.top = t.top - s.top + i),
          null != t.left && (f.left = t.left - s.left + o),
          "using" in t ? t.using.call(e, f) : a.css(f);
      },
    }),
    $.fn.extend({
      position: function () {
        if (this[0]) {
          var e,
            t,
            n = { top: 0, left: 0 },
            r = this[0];
          return (
            "fixed" === $.css(r, "position")
              ? (t = r.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                $.nodeName(e[0], "html") || (n = e.offset()),
                (n.top += $.css(e[0], "borderTopWidth", !0)),
                (n.left += $.css(e[0], "borderLeftWidth", !0))),
            {
              top: t.top - n.top - $.css(r, "marginTop", !0),
              left: t.left - n.left - $.css(r, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent || o.documentElement;
            e && !$.nodeName(e, "html") && "static" === $.css(e, "position");

          )
            e = e.offsetParent;
          return e || o.documentElement;
        });
      },
    }),
    $.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, n) {
        var r = /Y/.test(n);
        $.fn[e] = function (i) {
          return $.access(
            this,
            function (e, i, o) {
              var a = tB(e);
              if (o === t)
                return a
                  ? n in a
                    ? a[n]
                    : a.document.documentElement[i]
                  : e[i];
              a
                ? a.scrollTo(
                    r ? $(a).scrollLeft() : o,
                    r ? o : $(a).scrollTop()
                  )
                : (e[i] = o);
            },
            e,
            i,
            arguments.length,
            null
          );
        };
      }
    ),
    $.each({ Height: "height", Width: "width" }, function (e, n) {
      $.each(
        { padding: "inner" + e, content: n, "": "outer" + e },
        function (r, i) {
          $.fn[i] = function (i, o) {
            var a = arguments.length && (r || "boolean" != typeof i),
              s = r || (!0 === i || !0 === o ? "margin" : "border");
            return $.access(
              this,
              function (n, r, i) {
                var o;
                return $.isWindow(n)
                  ? n.document.documentElement["client" + e]
                  : 9 === n.nodeType
                  ? ((o = n.documentElement),
                    Math.max(
                      n.body["scroll" + e],
                      o["scroll" + e],
                      n.body["offset" + e],
                      o["offset" + e],
                      o["client" + e]
                    ))
                  : i === t
                  ? $.css(n, r, s)
                  : $.style(n, r, i, s);
              },
              n,
              a ? i : t,
              a,
              null
            );
          };
        }
      );
    }),
    (e.jQuery = e.$ = $),
    "function" == typeof define &&
      define.amd &&
      define.amd.jQuery &&
      define("jquery", [], function () {
        return $;
      });
})(window);
