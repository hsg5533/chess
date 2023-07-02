"use strict";
var THREE = THREE || { REVISION: "58" };
(self.console = self.console || {
  info: function () {},
  log: function () {},
  debug: function () {},
  warn: function () {},
  error: function () {},
}),
  (self.Int32Array = self.Int32Array || Array),
  (self.Float32Array = self.Float32Array || Array),
  (String.prototype.trim =
    String.prototype.trim ||
    function () {
      return this.replace(/^\s+|\s+$/g, "");
    }),
  (THREE.extend = function (e, t) {
    if (Object.keys)
      for (var i = Object.keys(t), r = 0, n = i.length; r < n; r++) {
        var o = i[r];
        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(t, o));
      }
    else for (o in ((i = {}.hasOwnProperty), t)) i.call(t, o) && (e[o] = t[o]);
    return e;
  }),
  (function () {
    for (
      var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0;
      i < t.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[t[i] + "CancelAnimationFrame"] ||
          window[t[i] + "CancelRequestAnimationFrame"]);
    void 0 === window.requestAnimationFrame &&
      (window.requestAnimationFrame = function (t) {
        var i = Date.now(),
          r = Math.max(0, 16 - (i - e)),
          n = window.setTimeout(function () {
            t(i + r);
          }, r);
        return (e = i + r), n;
      }),
      (window.cancelAnimationFrame =
        window.cancelAnimationFrame ||
        function (e) {
          window.clearTimeout(e);
        });
  })(),
  (THREE.CullFaceNone = 0),
  (THREE.CullFaceBack = 1),
  (THREE.CullFaceFront = 2),
  (THREE.CullFaceFrontBack = 3),
  (THREE.FrontFaceDirectionCW = 0),
  (THREE.FrontFaceDirectionCCW = 1),
  (THREE.BasicShadowMap = 0),
  (THREE.PCFShadowMap = 1),
  (THREE.PCFSoftShadowMap = 2),
  (THREE.FrontSide = 0),
  (THREE.BackSide = 1),
  (THREE.DoubleSide = 2),
  (THREE.NoShading = 0),
  (THREE.FlatShading = 1),
  (THREE.SmoothShading = 2),
  (THREE.NoColors = 0),
  (THREE.FaceColors = 1),
  (THREE.VertexColors = 2),
  (THREE.NoBlending = 0),
  (THREE.NormalBlending = 1),
  (THREE.AdditiveBlending = 2),
  (THREE.SubtractiveBlending = 3),
  (THREE.MultiplyBlending = 4),
  (THREE.CustomBlending = 5),
  (THREE.AddEquation = 100),
  (THREE.SubtractEquation = 101),
  (THREE.ReverseSubtractEquation = 102),
  (THREE.ZeroFactor = 200),
  (THREE.OneFactor = 201),
  (THREE.SrcColorFactor = 202),
  (THREE.OneMinusSrcColorFactor = 203),
  (THREE.SrcAlphaFactor = 204),
  (THREE.OneMinusSrcAlphaFactor = 205),
  (THREE.DstAlphaFactor = 206),
  (THREE.OneMinusDstAlphaFactor = 207),
  (THREE.DstColorFactor = 208),
  (THREE.OneMinusDstColorFactor = 209),
  (THREE.SrcAlphaSaturateFactor = 210),
  (THREE.MultiplyOperation = 0),
  (THREE.MixOperation = 1),
  (THREE.AddOperation = 2),
  (THREE.UVMapping = function () {}),
  (THREE.CubeReflectionMapping = function () {}),
  (THREE.CubeRefractionMapping = function () {}),
  (THREE.SphericalReflectionMapping = function () {}),
  (THREE.SphericalRefractionMapping = function () {}),
  (THREE.RepeatWrapping = 1e3),
  (THREE.ClampToEdgeWrapping = 1001),
  (THREE.MirroredRepeatWrapping = 1002),
  (THREE.NearestFilter = 1003),
  (THREE.NearestMipMapNearestFilter = 1004),
  (THREE.NearestMipMapLinearFilter = 1005),
  (THREE.LinearFilter = 1006),
  (THREE.LinearMipMapNearestFilter = 1007),
  (THREE.LinearMipMapLinearFilter = 1008),
  (THREE.UnsignedByteType = 1009),
  (THREE.ByteType = 1010),
  (THREE.ShortType = 1011),
  (THREE.UnsignedShortType = 1012),
  (THREE.IntType = 1013),
  (THREE.UnsignedIntType = 1014),
  (THREE.FloatType = 1015),
  (THREE.UnsignedShort4444Type = 1016),
  (THREE.UnsignedShort5551Type = 1017),
  (THREE.UnsignedShort565Type = 1018),
  (THREE.AlphaFormat = 1019),
  (THREE.RGBFormat = 1020),
  (THREE.RGBAFormat = 1021),
  (THREE.LuminanceFormat = 1022),
  (THREE.LuminanceAlphaFormat = 1023),
  (THREE.RGB_S3TC_DXT1_Format = 2001),
  (THREE.RGBA_S3TC_DXT1_Format = 2002),
  (THREE.RGBA_S3TC_DXT3_Format = 2003),
  (THREE.RGBA_S3TC_DXT5_Format = 2004),
  (THREE.Color = function (e) {
    return void 0 !== e && this.set(e), this;
  }),
  (THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    set: function (e) {
      return (
        e instanceof THREE.Color
          ? this.copy(e)
          : "number" == typeof e
          ? this.setHex(e)
          : "string" == typeof e && this.setStyle(e),
        this
      );
    },
    setHex: function (e) {
      return (
        (e = Math.floor(e)),
        (this.r = ((e >> 16) & 255) / 255),
        (this.g = ((e >> 8) & 255) / 255),
        (this.b = (255 & e) / 255),
        this
      );
    },
    setRGB: function (e, t, i) {
      return (this.r = e), (this.g = t), (this.b = i), this;
    },
    setHSL: function (e, t, i) {
      if (0 === t) this.r = this.g = this.b = i;
      else {
        var r = function (e, t, i) {
            return (
              0 > i && (i += 1),
              1 < i && (i -= 1),
              i < 1 / 6
                ? e + 6 * (t - e) * i
                : 0.5 > i
                ? t
                : i < 2 / 3
                ? e + 6 * (t - e) * (2 / 3 - i)
                : e
            );
          },
          t = 0.5 >= i ? i * (1 + t) : i + t - i * t,
          i = 2 * i - t;
        (this.r = r(i, t, e + 1 / 3)),
          (this.g = r(i, t, e)),
          (this.b = r(i, t, e - 1 / 3));
      }
      return this;
    },
    setStyle: function (e) {
      return /^rgb\((\d+),(\d+),(\d+)\)$/i.test(e)
        ? ((e = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(e)),
          (this.r = Math.min(255, parseInt(e[1], 10)) / 255),
          (this.g = Math.min(255, parseInt(e[2], 10)) / 255),
          (this.b = Math.min(255, parseInt(e[3], 10)) / 255),
          this)
        : /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(e)
        ? ((e = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(e)),
          (this.r = Math.min(100, parseInt(e[1], 10)) / 100),
          (this.g = Math.min(100, parseInt(e[2], 10)) / 100),
          (this.b = Math.min(100, parseInt(e[3], 10)) / 100),
          this)
        : /^\#([0-9a-f]{6})$/i.test(e)
        ? ((e = /^\#([0-9a-f]{6})$/i.exec(e)),
          this.setHex(parseInt(e[1], 16)),
          this)
        : /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e)
        ? ((e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e)),
          this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)),
          this)
        : /^(\w+)$/i.test(e)
        ? (this.setHex(THREE.ColorKeywords[e]), this)
        : void 0;
    },
    copy: function (e) {
      return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
    },
    copyGammaToLinear: function (e) {
      return (
        (this.r = e.r * e.r), (this.g = e.g * e.g), (this.b = e.b * e.b), this
      );
    },
    copyLinearToGamma: function (e) {
      return (
        (this.r = Math.sqrt(e.r)),
        (this.g = Math.sqrt(e.g)),
        (this.b = Math.sqrt(e.b)),
        this
      );
    },
    convertGammaToLinear: function () {
      var e = this.r,
        t = this.g,
        i = this.b;
      return (this.r = e * e), (this.g = t * t), (this.b = i * i), this;
    },
    convertLinearToGamma: function () {
      return (
        (this.r = Math.sqrt(this.r)),
        (this.g = Math.sqrt(this.g)),
        (this.b = Math.sqrt(this.b)),
        this
      );
    },
    getHex: function () {
      return (
        ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
      );
    },
    getHexString: function () {
      return ("000000" + this.getHex().toString(16)).slice(-6);
    },
    getHSL: (function () {
      var e = { h: 0, s: 0, l: 0 };
      return function () {
        var t,
          i = this.r,
          r = this.g,
          n = this.b,
          o = Math.max(i, r, n),
          a = Math.min(i, r, n),
          s = (a + o) / 2;
        if (a === o) a = t = 0;
        else {
          var h = o - a,
            a = 0.5 >= s ? h / (o + a) : h / (2 - o - a);
          switch (o) {
            case i:
              t = (r - n) / h + (r < n ? 6 : 0);
              break;
            case r:
              t = (n - i) / h + 2;
              break;
            case n:
              t = (i - r) / h + 4;
          }
          t /= 6;
        }
        return (e.h = t), (e.s = a), (e.l = s), e;
      };
    })(),
    getStyle: function () {
      return (
        "rgb(" +
        ((255 * this.r) | 0) +
        "," +
        ((255 * this.g) | 0) +
        "," +
        ((255 * this.b) | 0) +
        ")"
      );
    },
    offsetHSL: function (e, t, i) {
      var r = this.getHSL();
      return (
        (r.h += e), (r.s += t), (r.l += i), this.setHSL(r.h, r.s, r.l), this
      );
    },
    add: function (e) {
      return (this.r += e.r), (this.g += e.g), (this.b += e.b), this;
    },
    addColors: function (e, t) {
      return (
        (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this
      );
    },
    addScalar: function (e) {
      return (this.r += e), (this.g += e), (this.b += e), this;
    },
    multiply: function (e) {
      return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this;
    },
    multiplyScalar: function (e) {
      return (this.r *= e), (this.g *= e), (this.b *= e), this;
    },
    lerp: function (e, t) {
      return (
        (this.r += (e.r - this.r) * t),
        (this.g += (e.g - this.g) * t),
        (this.b += (e.b - this.b) * t),
        this
      );
    },
    equals: function (e) {
      return e.r === this.r && e.g === this.g && e.b === this.b;
    },
    clone: function () {
      return new THREE.Color().setRGB(this.r, this.g, this.b);
    },
  }),
  (THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  }),
  (THREE.Quaternion = function (e, t, i, r) {
    (this.x = e || 0),
      (this.y = t || 0),
      (this.z = i || 0),
      (this.w = void 0 !== r ? r : 1);
  }),
  (THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (e, t, i, r) {
      return (this.x = e), (this.y = t), (this.z = i), (this.w = r), this;
    },
    copy: function (e) {
      return (
        (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = e.w), this
      );
    },
    setFromEuler: function (e, t) {
      var i = Math.cos(e.x / 2),
        r = Math.cos(e.y / 2),
        n = Math.cos(e.z / 2),
        o = Math.sin(e.x / 2),
        a = Math.sin(e.y / 2),
        s = Math.sin(e.z / 2);
      return (
        void 0 === t || "XYZ" === t
          ? ((this.x = o * r * n + i * a * s),
            (this.y = i * a * n - o * r * s),
            (this.z = i * r * s + o * a * n),
            (this.w = i * r * n - o * a * s))
          : "YXZ" === t
          ? ((this.x = o * r * n + i * a * s),
            (this.y = i * a * n - o * r * s),
            (this.z = i * r * s - o * a * n),
            (this.w = i * r * n + o * a * s))
          : "ZXY" === t
          ? ((this.x = o * r * n - i * a * s),
            (this.y = i * a * n + o * r * s),
            (this.z = i * r * s + o * a * n),
            (this.w = i * r * n - o * a * s))
          : "ZYX" === t
          ? ((this.x = o * r * n - i * a * s),
            (this.y = i * a * n + o * r * s),
            (this.z = i * r * s - o * a * n),
            (this.w = i * r * n + o * a * s))
          : "YZX" === t
          ? ((this.x = o * r * n + i * a * s),
            (this.y = i * a * n + o * r * s),
            (this.z = i * r * s - o * a * n),
            (this.w = i * r * n - o * a * s))
          : "XZY" === t &&
            ((this.x = o * r * n - i * a * s),
            (this.y = i * a * n - o * r * s),
            (this.z = i * r * s + o * a * n),
            (this.w = i * r * n + o * a * s)),
        this
      );
    },
    setFromAxisAngle: function (e, t) {
      var i = t / 2,
        r = Math.sin(i);
      return (
        (this.x = e.x * r),
        (this.y = e.y * r),
        (this.z = e.z * r),
        (this.w = Math.cos(i)),
        this
      );
    },
    setFromRotationMatrix: function (e) {
      var t = e.elements,
        i = t[0],
        e = t[4],
        r = t[8],
        n = t[1],
        o = t[5],
        a = t[9],
        s = t[2],
        h = t[6],
        t = t[10],
        l = i + o + t;
      return (
        0 < l
          ? ((i = 0.5 / Math.sqrt(l + 1)),
            (this.w = 0.25 / i),
            (this.x = (h - a) * i),
            (this.y = (r - s) * i),
            (this.z = (n - e) * i))
          : i > o && i > t
          ? ((i = 2 * Math.sqrt(1 + i - o - t)),
            (this.w = (h - a) / i),
            (this.x = 0.25 * i),
            (this.y = (e + n) / i),
            (this.z = (r + s) / i))
          : o > t
          ? ((i = 2 * Math.sqrt(1 + o - i - t)),
            (this.w = (r - s) / i),
            (this.x = (e + n) / i),
            (this.y = 0.25 * i),
            (this.z = (a + h) / i))
          : ((i = 2 * Math.sqrt(1 + t - i - o)),
            (this.w = (n - e) / i),
            (this.x = (r + s) / i),
            (this.y = (a + h) / i),
            (this.z = 0.25 * i)),
        this
      );
    },
    inverse: function () {
      return this.conjugate().normalize(), this;
    },
    conjugate: function () {
      return (this.x *= -1), (this.y *= -1), (this.z *= -1), this;
    },
    lengthSq: function () {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    },
    length: function () {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    },
    normalize: function () {
      var e = this.length();
      return (
        0 === e
          ? ((this.z = this.y = this.x = 0), (this.w = 1))
          : ((e = 1 / e),
            (this.x *= e),
            (this.y *= e),
            (this.z *= e),
            (this.w *= e)),
        this
      );
    },
    multiply: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
          ),
          this.multiplyQuaternions(e, t))
        : this.multiplyQuaternions(this, e);
    },
    multiplyQuaternions: function (e, t) {
      var i = e.x,
        r = e.y,
        n = e.z,
        o = e.w,
        a = t.x,
        s = t.y,
        h = t.z,
        l = t.w;
      return (
        (this.x = i * l + o * a + r * h - n * s),
        (this.y = r * l + o * s + n * a - i * h),
        (this.z = n * l + o * h + i * s - r * a),
        (this.w = o * l - i * a - r * s - n * h),
        this
      );
    },
    multiplyVector3: function (e) {
      return (
        console.warn(
          "DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."
        ),
        e.applyQuaternion(this)
      );
    },
    slerp: function (e, t) {
      var i = this.x,
        r = this.y,
        n = this.z,
        o = this.w,
        a = o * e.w + i * e.x + r * e.y + n * e.z;
      if (
        (0 > a
          ? ((this.w = -e.w),
            (this.x = -e.x),
            (this.y = -e.y),
            (this.z = -e.z),
            (a = -a))
          : this.copy(e),
        1 <= a)
      )
        return (this.w = o), (this.x = i), (this.y = r), (this.z = n), this;
      var s = Math.acos(a),
        h = Math.sqrt(1 - a * a);
      return 0.001 > Math.abs(h)
        ? ((this.w = 0.5 * (o + this.w)),
          (this.x = 0.5 * (i + this.x)),
          (this.y = 0.5 * (r + this.y)),
          (this.z = 0.5 * (n + this.z)),
          this)
        : ((a = Math.sin((1 - t) * s) / h),
          (s = Math.sin(t * s) / h),
          (this.w = o * a + this.w * s),
          (this.x = i * a + this.x * s),
          (this.y = r * a + this.y * s),
          (this.z = n * a + this.z * s),
          this);
    },
    equals: function (e) {
      return (
        e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
      );
    },
    fromArray: function (e) {
      return (
        (this.x = e[0]), (this.y = e[1]), (this.z = e[2]), (this.w = e[3]), this
      );
    },
    toArray: function () {
      return [this.x, this.y, this.z, this.w];
    },
    clone: function () {
      return new THREE.Quaternion(this.x, this.y, this.z, this.w);
    },
  }),
  (THREE.Quaternion.slerp = function (e, t, i, r) {
    return i.copy(e).slerp(t, r);
  }),
  (THREE.Vector2 = function (e, t) {
    (this.x = e || 0), (this.y = t || 0);
  }),
  (THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (e, t) {
      return (this.x = e), (this.y = t), this;
    },
    setX: function (e) {
      return (this.x = e), this;
    },
    setY: function (e) {
      return (this.y = e), this;
    },
    setComponent: function (e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    getComponent: function (e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    copy: function (e) {
      return (this.x = e.x), (this.y = e.y), this;
    },
    add: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(e, t))
        : ((this.x += e.x), (this.y += e.y), this);
    },
    addVectors: function (e, t) {
      return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
    },
    addScalar: function (e) {
      return (this.x += e), (this.y += e), this;
    },
    sub: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(e, t))
        : ((this.x -= e.x), (this.y -= e.y), this);
    },
    subVectors: function (e, t) {
      return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
    },
    multiplyScalar: function (e) {
      return (this.x *= e), (this.y *= e), this;
    },
    divideScalar: function (e) {
      return 0 !== e ? ((this.x /= e), (this.y /= e)) : this.set(0, 0), this;
    },
    min: function (e) {
      return (
        this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
      );
    },
    max: function (e) {
      return (
        this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
      );
    },
    clamp: function (e, t) {
      return (
        this.x < e.x ? (this.x = e.x) : this.x > t.x && (this.x = t.x),
        this.y < e.y ? (this.y = e.y) : this.y > t.y && (this.y = t.y),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y;
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y;
    },
    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    distanceTo: function (e) {
      return Math.sqrt(this.distanceToSquared(e));
    },
    distanceToSquared: function (e) {
      var t = this.x - e.x,
        e = this.y - e.y;
      return t * t + e * e;
    },
    setLength: function (e) {
      var t = this.length();
      return 0 !== t && e !== t && this.multiplyScalar(e / t), this;
    },
    lerp: function (e, t) {
      return (
        (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this
      );
    },
    equals: function (e) {
      return e.x === this.x && e.y === this.y;
    },
    fromArray: function (e) {
      return (this.x = e[0]), (this.y = e[1]), this;
    },
    toArray: function () {
      return [this.x, this.y];
    },
    clone: function () {
      return new THREE.Vector2(this.x, this.y);
    },
  }),
  (THREE.Vector3 = function (e, t, i) {
    (this.x = e || 0), (this.y = t || 0), (this.z = i || 0);
  }),
  (THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (e, t, i) {
      return (this.x = e), (this.y = t), (this.z = i), this;
    },
    setX: function (e) {
      return (this.x = e), this;
    },
    setY: function (e) {
      return (this.y = e), this;
    },
    setZ: function (e) {
      return (this.z = e), this;
    },
    setComponent: function (e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        case 2:
          this.z = t;
          break;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    getComponent: function (e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    copy: function (e) {
      return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
    },
    add: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(e, t))
        : ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
    },
    addScalar: function (e) {
      return (this.x += e), (this.y += e), (this.z += e), this;
    },
    addVectors: function (e, t) {
      return (
        (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this
      );
    },
    sub: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(e, t))
        : ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
    },
    subVectors: function (e, t) {
      return (
        (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this
      );
    },
    multiply: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
          ),
          this.multiplyVectors(e, t))
        : ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
    },
    multiplyScalar: function (e) {
      return (this.x *= e), (this.y *= e), (this.z *= e), this;
    },
    multiplyVectors: function (e, t) {
      return (
        (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this
      );
    },
    applyMatrix3: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        e = e.elements;
      return (
        (this.x = e[0] * t + e[3] * i + e[6] * r),
        (this.y = e[1] * t + e[4] * i + e[7] * r),
        (this.z = e[2] * t + e[5] * i + e[8] * r),
        this
      );
    },
    applyMatrix4: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        e = e.elements;
      return (
        (this.x = e[0] * t + e[4] * i + e[8] * r + e[12]),
        (this.y = e[1] * t + e[5] * i + e[9] * r + e[13]),
        (this.z = e[2] * t + e[6] * i + e[10] * r + e[14]),
        this
      );
    },
    applyProjection: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        e = e.elements,
        n = 1 / (e[3] * t + e[7] * i + e[11] * r + e[15]);
      return (
        (this.x = (e[0] * t + e[4] * i + e[8] * r + e[12]) * n),
        (this.y = (e[1] * t + e[5] * i + e[9] * r + e[13]) * n),
        (this.z = (e[2] * t + e[6] * i + e[10] * r + e[14]) * n),
        this
      );
    },
    applyQuaternion: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        n = e.x,
        o = e.y,
        a = e.z,
        e = e.w,
        s = e * t + o * r - a * i,
        h = e * i + a * t - n * r,
        l = e * r + n * i - o * t,
        t = -n * t - o * i - a * r;
      return (
        (this.x = s * e + -(t * n) + -(h * a) - -(l * o)),
        (this.y = h * e + -(t * o) + -(l * n) - -(s * a)),
        (this.z = l * e + -(t * a) + -(s * o) - -(h * n)),
        this
      );
    },
    transformDirection: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        e = e.elements;
      return (
        (this.x = e[0] * t + e[4] * i + e[8] * r),
        (this.y = e[1] * t + e[5] * i + e[9] * r),
        (this.z = e[2] * t + e[6] * i + e[10] * r),
        this.normalize(),
        this
      );
    },
    divide: function (e) {
      return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this;
    },
    divideScalar: function (e) {
      return (
        0 !== e
          ? ((this.x /= e), (this.y /= e), (this.z /= e))
          : (this.z = this.y = this.x = 0),
        this
      );
    },
    min: function (e) {
      return (
        this.x > e.x && (this.x = e.x),
        this.y > e.y && (this.y = e.y),
        this.z > e.z && (this.z = e.z),
        this
      );
    },
    max: function (e) {
      return (
        this.x < e.x && (this.x = e.x),
        this.y < e.y && (this.y = e.y),
        this.z < e.z && (this.z = e.z),
        this
      );
    },
    clamp: function (e, t) {
      return (
        this.x < e.x ? (this.x = e.x) : this.x > t.x && (this.x = t.x),
        this.y < e.y ? (this.y = e.y) : this.y > t.y && (this.y = t.y),
        this.z < e.z ? (this.z = e.z) : this.z > t.z && (this.z = t.z),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y + this.z * e.z;
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    lengthManhattan: function () {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    setLength: function (e) {
      var t = this.length();
      return 0 !== t && e !== t && this.multiplyScalar(e / t), this;
    },
    lerp: function (e, t) {
      return (
        (this.x += (e.x - this.x) * t),
        (this.y += (e.y - this.y) * t),
        (this.z += (e.z - this.z) * t),
        this
      );
    },
    cross: function (e, t) {
      if (void 0 !== t)
        return (
          console.warn(
            "DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."
          ),
          this.crossVectors(e, t)
        );
      var i = this.x,
        r = this.y,
        n = this.z;
      return (
        (this.x = r * e.z - n * e.y),
        (this.y = n * e.x - i * e.z),
        (this.z = i * e.y - r * e.x),
        this
      );
    },
    crossVectors: function (e, t) {
      return (
        (this.x = e.y * t.z - e.z * t.y),
        (this.y = e.z * t.x - e.x * t.z),
        (this.z = e.x * t.y - e.y * t.x),
        this
      );
    },
    angleTo: function (e) {
      return (
        (e = this.dot(e) / (this.length() * e.length())),
        Math.acos(THREE.Math.clamp(e, -1, 1))
      );
    },
    distanceTo: function (e) {
      return Math.sqrt(this.distanceToSquared(e));
    },
    distanceToSquared: function (e) {
      var t = this.x - e.x,
        i = this.y - e.y,
        e = this.z - e.z;
      return t * t + i * i + e * e;
    },
    setEulerFromRotationMatrix: function (e, t) {
      function i(e) {
        return Math.min(Math.max(e, -1), 1);
      }
      var r = e.elements,
        n = r[0],
        o = r[4],
        a = r[8],
        s = r[1],
        h = r[5],
        l = r[9],
        c = r[2],
        p = r[6],
        r = r[10];
      return (
        void 0 === t || "XYZ" === t
          ? ((this.y = Math.asin(i(a))),
            0.99999 > Math.abs(a)
              ? ((this.x = Math.atan2(-l, r)), (this.z = Math.atan2(-o, n)))
              : ((this.x = Math.atan2(p, h)), (this.z = 0)))
          : "YXZ" === t
          ? ((this.x = Math.asin(-i(l))),
            0.99999 > Math.abs(l)
              ? ((this.y = Math.atan2(a, r)), (this.z = Math.atan2(s, h)))
              : ((this.y = Math.atan2(-c, n)), (this.z = 0)))
          : "ZXY" === t
          ? ((this.x = Math.asin(i(p))),
            0.99999 > Math.abs(p)
              ? ((this.y = Math.atan2(-c, r)), (this.z = Math.atan2(-o, h)))
              : ((this.y = 0), (this.z = Math.atan2(s, n))))
          : "ZYX" === t
          ? ((this.y = Math.asin(-i(c))),
            0.99999 > Math.abs(c)
              ? ((this.x = Math.atan2(p, r)), (this.z = Math.atan2(s, n)))
              : ((this.x = 0), (this.z = Math.atan2(-o, h))))
          : "YZX" === t
          ? ((this.z = Math.asin(i(s))),
            0.99999 > Math.abs(s)
              ? ((this.x = Math.atan2(-l, h)), (this.y = Math.atan2(-c, n)))
              : ((this.x = 0), (this.y = Math.atan2(a, r))))
          : "XZY" === t &&
            ((this.z = Math.asin(-i(o))),
            0.99999 > Math.abs(o)
              ? ((this.x = Math.atan2(p, h)), (this.y = Math.atan2(a, n)))
              : ((this.x = Math.atan2(-l, r)), (this.y = 0))),
        this
      );
    },
    setEulerFromQuaternion: function (e, t) {
      function i(e) {
        return Math.min(Math.max(e, -1), 1);
      }
      var r = e.x * e.x,
        n = e.y * e.y,
        o = e.z * e.z,
        a = e.w * e.w;
      return (
        void 0 === t || "XYZ" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w - e.y * e.z), a - r - n + o)),
            (this.y = Math.asin(i(2 * (e.x * e.z + e.y * e.w)))),
            (this.z = Math.atan2(2 * (e.z * e.w - e.x * e.y), a + r - n - o)))
          : "YXZ" === t
          ? ((this.x = Math.asin(i(2 * (e.x * e.w - e.y * e.z)))),
            (this.y = Math.atan2(2 * (e.x * e.z + e.y * e.w), a - r - n + o)),
            (this.z = Math.atan2(2 * (e.x * e.y + e.z * e.w), a - r + n - o)))
          : "ZXY" === t
          ? ((this.x = Math.asin(i(2 * (e.x * e.w + e.y * e.z)))),
            (this.y = Math.atan2(2 * (e.y * e.w - e.z * e.x), a - r - n + o)),
            (this.z = Math.atan2(2 * (e.z * e.w - e.x * e.y), a - r + n - o)))
          : "ZYX" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w + e.z * e.y), a - r - n + o)),
            (this.y = Math.asin(i(2 * (e.y * e.w - e.x * e.z)))),
            (this.z = Math.atan2(2 * (e.x * e.y + e.z * e.w), a + r - n - o)))
          : "YZX" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w - e.z * e.y), a - r + n - o)),
            (this.y = Math.atan2(2 * (e.y * e.w - e.x * e.z), a + r - n - o)),
            (this.z = Math.asin(i(2 * (e.x * e.y + e.z * e.w)))))
          : "XZY" === t &&
            ((this.x = Math.atan2(2 * (e.x * e.w + e.y * e.z), a - r + n - o)),
            (this.y = Math.atan2(2 * (e.x * e.z + e.y * e.w), a + r - n - o)),
            (this.z = Math.asin(i(2 * (e.z * e.w - e.x * e.y))))),
        this
      );
    },
    getPositionFromMatrix: function (e) {
      return (
        (this.x = e.elements[12]),
        (this.y = e.elements[13]),
        (this.z = e.elements[14]),
        this
      );
    },
    getScaleFromMatrix: function (e) {
      var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
        i = this.set(e.elements[4], e.elements[5], e.elements[6]).length(),
        e = this.set(e.elements[8], e.elements[9], e.elements[10]).length();
      return (this.x = t), (this.y = i), (this.z = e), this;
    },
    getColumnFromMatrix: function (e, t) {
      var i = 4 * e,
        r = t.elements;
      return (this.x = r[i]), (this.y = r[i + 1]), (this.z = r[i + 2]), this;
    },
    equals: function (e) {
      return e.x === this.x && e.y === this.y && e.z === this.z;
    },
    fromArray: function (e) {
      return (this.x = e[0]), (this.y = e[1]), (this.z = e[2]), this;
    },
    toArray: function () {
      return [this.x, this.y, this.z];
    },
    clone: function () {
      return new THREE.Vector3(this.x, this.y, this.z);
    },
  }),
  THREE.extend(THREE.Vector3.prototype, {
    applyEuler: (function () {
      var e = new THREE.Quaternion();
      return function (t, i) {
        var r = e.setFromEuler(t, i);
        return this.applyQuaternion(r), this;
      };
    })(),
    applyAxisAngle: (function () {
      var e = new THREE.Quaternion();
      return function (t, i) {
        var r = e.setFromAxisAngle(t, i);
        return this.applyQuaternion(r), this;
      };
    })(),
    projectOnVector: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return (
          e.copy(t).normalize(),
          (t = this.dot(e)),
          this.copy(e).multiplyScalar(t)
        );
      };
    })(),
    projectOnPlane: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return e.copy(this).projectOnVector(t), this.sub(e);
      };
    })(),
    reflect: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return (
          e.copy(this).projectOnVector(t).multiplyScalar(2),
          this.subVectors(e, this)
        );
      };
    })(),
  }),
  (THREE.Vector4 = function (e, t, i, r) {
    (this.x = e || 0),
      (this.y = t || 0),
      (this.z = i || 0),
      (this.w = void 0 !== r ? r : 1);
  }),
  (THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (e, t, i, r) {
      return (this.x = e), (this.y = t), (this.z = i), (this.w = r), this;
    },
    setX: function (e) {
      return (this.x = e), this;
    },
    setY: function (e) {
      return (this.y = e), this;
    },
    setZ: function (e) {
      return (this.z = e), this;
    },
    setW: function (e) {
      return (this.w = e), this;
    },
    setComponent: function (e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        case 2:
          this.z = t;
          break;
        case 3:
          this.w = t;
          break;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    getComponent: function (e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw Error("index is out of range: " + e);
      }
    },
    copy: function (e) {
      return (
        (this.x = e.x),
        (this.y = e.y),
        (this.z = e.z),
        (this.w = void 0 !== e.w ? e.w : 1),
        this
      );
    },
    add: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(e, t))
        : ((this.x += e.x),
          (this.y += e.y),
          (this.z += e.z),
          (this.w += e.w),
          this);
    },
    addScalar: function (e) {
      return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this;
    },
    addVectors: function (e, t) {
      return (
        (this.x = e.x + t.x),
        (this.y = e.y + t.y),
        (this.z = e.z + t.z),
        (this.w = e.w + t.w),
        this
      );
    },
    sub: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(e, t))
        : ((this.x -= e.x),
          (this.y -= e.y),
          (this.z -= e.z),
          (this.w -= e.w),
          this);
    },
    subVectors: function (e, t) {
      return (
        (this.x = e.x - t.x),
        (this.y = e.y - t.y),
        (this.z = e.z - t.z),
        (this.w = e.w - t.w),
        this
      );
    },
    multiplyScalar: function (e) {
      return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this;
    },
    applyMatrix4: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        n = this.w,
        e = e.elements;
      return (
        (this.x = e[0] * t + e[4] * i + e[8] * r + e[12] * n),
        (this.y = e[1] * t + e[5] * i + e[9] * r + e[13] * n),
        (this.z = e[2] * t + e[6] * i + e[10] * r + e[14] * n),
        (this.w = e[3] * t + e[7] * i + e[11] * r + e[15] * n),
        this
      );
    },
    divideScalar: function (e) {
      return (
        0 !== e
          ? ((this.x /= e), (this.y /= e), (this.z /= e), (this.w /= e))
          : ((this.z = this.y = this.x = 0), (this.w = 1)),
        this
      );
    },
    setAxisAngleFromQuaternion: function (e) {
      this.w = 2 * Math.acos(e.w);
      var t = Math.sqrt(1 - e.w * e.w);
      return (
        1e-4 > t
          ? ((this.x = 1), (this.z = this.y = 0))
          : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
        this
      );
    },
    setAxisAngleFromRotationMatrix: function (e) {
      var t,
        i,
        r,
        e = e.elements,
        n = e[0];
      r = e[4];
      var o = e[8],
        a = e[1],
        s = e[5],
        h = e[9];
      (i = e[2]), (t = e[6]);
      var l = e[10];
      return 0.01 > Math.abs(r - a) &&
        0.01 > Math.abs(o - i) &&
        0.01 > Math.abs(h - t)
        ? 0.1 > Math.abs(r + a) &&
          0.1 > Math.abs(o + i) &&
          0.1 > Math.abs(h + t) &&
          0.1 > Math.abs(n + s + l - 3)
          ? (this.set(1, 0, 0, 0), this)
          : ((e = Math.PI),
            (n = (n + 1) / 2),
            (s = (s + 1) / 2),
            (l = (l + 1) / 2),
            (r = (r + a) / 4),
            (o = (o + i) / 4),
            (h = (h + t) / 4),
            n > s && n > l
              ? 0.01 > n
                ? ((t = 0), (r = i = 0.707106781))
                : ((i = r / (t = Math.sqrt(n))), (r = o / t))
              : s > l
              ? 0.01 > s
                ? ((t = 0.707106781), (i = 0), (r = 0.707106781))
                : ((t = r / (i = Math.sqrt(s))), (r = h / i))
              : 0.01 > l
              ? ((i = t = 0.707106781), (r = 0))
              : ((t = o / (r = Math.sqrt(l))), (i = h / r)),
            this.set(t, i, r, e),
            this)
        : (0.001 >
            Math.abs(
              (e = Math.sqrt(
                (t - h) * (t - h) + (o - i) * (o - i) + (a - r) * (a - r)
              ))
            ) && (e = 1),
          (this.x = (t - h) / e),
          (this.y = (o - i) / e),
          (this.z = (a - r) / e),
          (this.w = Math.acos((n + s + l - 1) / 2)),
          this);
    },
    min: function (e) {
      return (
        this.x > e.x && (this.x = e.x),
        this.y > e.y && (this.y = e.y),
        this.z > e.z && (this.z = e.z),
        this.w > e.w && (this.w = e.w),
        this
      );
    },
    max: function (e) {
      return (
        this.x < e.x && (this.x = e.x),
        this.y < e.y && (this.y = e.y),
        this.z < e.z && (this.z = e.z),
        this.w < e.w && (this.w = e.w),
        this
      );
    },
    clamp: function (e, t) {
      return (
        this.x < e.x ? (this.x = e.x) : this.x > t.x && (this.x = t.x),
        this.y < e.y ? (this.y = e.y) : this.y > t.y && (this.y = t.y),
        this.z < e.z ? (this.z = e.z) : this.z > t.z && (this.z = t.z),
        this.w < e.w ? (this.w = e.w) : this.w > t.w && (this.w = t.w),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
    },
    lengthSq: function () {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    },
    length: function () {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    },
    lengthManhattan: function () {
      return (
        Math.abs(this.x) +
        Math.abs(this.y) +
        Math.abs(this.z) +
        Math.abs(this.w)
      );
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    setLength: function (e) {
      var t = this.length();
      return 0 !== t && e !== t && this.multiplyScalar(e / t), this;
    },
    lerp: function (e, t) {
      return (
        (this.x += (e.x - this.x) * t),
        (this.y += (e.y - this.y) * t),
        (this.z += (e.z - this.z) * t),
        (this.w += (e.w - this.w) * t),
        this
      );
    },
    equals: function (e) {
      return (
        e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
      );
    },
    fromArray: function (e) {
      return (
        (this.x = e[0]), (this.y = e[1]), (this.z = e[2]), (this.w = e[3]), this
      );
    },
    toArray: function () {
      return [this.x, this.y, this.z, this.w];
    },
    clone: function () {
      return new THREE.Vector4(this.x, this.y, this.z, this.w);
    },
  }),
  (THREE.Line3 = function (e, t) {
    (this.start = void 0 !== e ? e : new THREE.Vector3()),
      (this.end = void 0 !== t ? t : new THREE.Vector3());
  }),
  (THREE.Line3.prototype = {
    constructor: THREE.Line3,
    set: function (e, t) {
      return this.start.copy(e), this.end.copy(t), this;
    },
    copy: function (e) {
      return this.start.copy(e.start), this.end.copy(e.end), this;
    },
    center: function (e) {
      return (e || new THREE.Vector3())
        .addVectors(this.start, this.end)
        .multiplyScalar(0.5);
    },
    delta: function (e) {
      return (e || new THREE.Vector3()).subVectors(this.end, this.start);
    },
    distanceSq: function () {
      return this.start.distanceToSquared(this.end);
    },
    distance: function () {
      return this.start.distanceTo(this.end);
    },
    at: function (e, t) {
      var i = t || new THREE.Vector3();
      return this.delta(i).multiplyScalar(e).add(this.start);
    },
    closestPointToPointParameter: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3();
      return function (i, r) {
        e.subVectors(i, this.start), t.subVectors(this.end, this.start);
        var n = t.dot(t),
          n = t.dot(e) / n;
        return r && (n = THREE.Math.clamp(n, 0, 1)), n;
      };
    })(),
    closestPointToPoint: function (e, t, i) {
      return (
        (e = this.closestPointToPointParameter(e, t)),
        (i = i || new THREE.Vector3()),
        this.delta(i).multiplyScalar(e).add(this.start)
      );
    },
    applyMatrix4: function (e) {
      return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this;
    },
    equals: function (e) {
      return e.start.equals(this.start) && e.end.equals(this.end);
    },
    clone: function () {
      return new THREE.Line3().copy(this);
    },
  }),
  (THREE.Box2 = function (e, t) {
    (this.min = void 0 !== e ? e : new THREE.Vector2(1 / 0, 1 / 0)),
      (this.max = void 0 !== t ? t : new THREE.Vector2(-1 / 0, -1 / 0));
  }),
  (THREE.Box2.prototype = {
    constructor: THREE.Box2,
    set: function (e, t) {
      return this.min.copy(e), this.max.copy(t), this;
    },
    setFromPoints: function (e) {
      if (0 < e.length) {
        var t = e[0];
        this.min.copy(t), this.max.copy(t);
        for (var i = 1, r = e.length; i < r; i++)
          (t = e[i]).x < this.min.x
            ? (this.min.x = t.x)
            : t.x > this.max.x && (this.max.x = t.x),
            t.y < this.min.y
              ? (this.min.y = t.y)
              : t.y > this.max.y && (this.max.y = t.y);
      } else this.makeEmpty();
      return this;
    },
    setFromCenterAndSize: (function () {
      var e = new THREE.Vector2();
      return function (t, i) {
        var r = e.copy(i).multiplyScalar(0.5);
        return this.min.copy(t).sub(r), this.max.copy(t).add(r), this;
      };
    })(),
    copy: function (e) {
      return this.min.copy(e.min), this.max.copy(e.max), this;
    },
    makeEmpty: function () {
      return (
        (this.min.x = this.min.y = 1 / 0),
        (this.max.x = this.max.y = -1 / 0),
        this
      );
    },
    empty: function () {
      return this.max.x < this.min.x || this.max.y < this.min.y;
    },
    center: function (e) {
      return (e || new THREE.Vector2())
        .addVectors(this.min, this.max)
        .multiplyScalar(0.5);
    },
    size: function (e) {
      return (e || new THREE.Vector2()).subVectors(this.max, this.min);
    },
    expandByPoint: function (e) {
      return this.min.min(e), this.max.max(e), this;
    },
    expandByVector: function (e) {
      return this.min.sub(e), this.max.add(e), this;
    },
    expandByScalar: function (e) {
      return this.min.addScalar(-e), this.max.addScalar(e), this;
    },
    containsPoint: function (e) {
      return (
        !(e.x < this.min.x) &&
        !(e.x > this.max.x) &&
        !(e.y < this.min.y) &&
        !(e.y > this.max.y)
      );
    },
    containsBox: function (e) {
      return (
        this.min.x <= e.min.x &&
        e.max.x <= this.max.x &&
        this.min.y <= e.min.y &&
        e.max.y <= this.max.y
      );
    },
    getParameter: function (e) {
      return new THREE.Vector2(
        (e.x - this.min.x) / (this.max.x - this.min.x),
        (e.y - this.min.y) / (this.max.y - this.min.y)
      );
    },
    isIntersectionBox: function (e) {
      return (
        !(e.max.x < this.min.x) &&
        !(e.min.x > this.max.x) &&
        !(e.max.y < this.min.y) &&
        !(e.min.y > this.max.y)
      );
    },
    clampPoint: function (e, t) {
      return (t || new THREE.Vector2()).copy(e).clamp(this.min, this.max);
    },
    distanceToPoint: (function () {
      var e = new THREE.Vector2();
      return function (t) {
        return e.copy(t).clamp(this.min, this.max).sub(t).length();
      };
    })(),
    intersect: function (e) {
      return this.min.max(e.min), this.max.min(e.max), this;
    },
    union: function (e) {
      return this.min.min(e.min), this.max.max(e.max), this;
    },
    translate: function (e) {
      return this.min.add(e), this.max.add(e), this;
    },
    equals: function (e) {
      return e.min.equals(this.min) && e.max.equals(this.max);
    },
    clone: function () {
      return new THREE.Box2().copy(this);
    },
  }),
  (THREE.Box3 = function (e, t) {
    (this.min = void 0 !== e ? e : new THREE.Vector3(1 / 0, 1 / 0, 1 / 0)),
      (this.max = void 0 !== t ? t : new THREE.Vector3(-1 / 0, -1 / 0, -1 / 0));
  }),
  (THREE.Box3.prototype = {
    constructor: THREE.Box3,
    set: function (e, t) {
      return this.min.copy(e), this.max.copy(t), this;
    },
    setFromPoints: function (e) {
      if (0 < e.length) {
        var t = e[0];
        this.min.copy(t), this.max.copy(t);
        for (var i = 1, r = e.length; i < r; i++)
          (t = e[i]).x < this.min.x
            ? (this.min.x = t.x)
            : t.x > this.max.x && (this.max.x = t.x),
            t.y < this.min.y
              ? (this.min.y = t.y)
              : t.y > this.max.y && (this.max.y = t.y),
            t.z < this.min.z
              ? (this.min.z = t.z)
              : t.z > this.max.z && (this.max.z = t.z);
      } else this.makeEmpty();
      return this;
    },
    setFromCenterAndSize: (function () {
      var e = new THREE.Vector3();
      return function (t, i) {
        var r = e.copy(i).multiplyScalar(0.5);
        return this.min.copy(t).sub(r), this.max.copy(t).add(r), this;
      };
    })(),
    copy: function (e) {
      return this.min.copy(e.min), this.max.copy(e.max), this;
    },
    makeEmpty: function () {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    },
    empty: function () {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      );
    },
    center: function (e) {
      return (e || new THREE.Vector3())
        .addVectors(this.min, this.max)
        .multiplyScalar(0.5);
    },
    size: function (e) {
      return (e || new THREE.Vector3()).subVectors(this.max, this.min);
    },
    expandByPoint: function (e) {
      return this.min.min(e), this.max.max(e), this;
    },
    expandByVector: function (e) {
      return this.min.sub(e), this.max.add(e), this;
    },
    expandByScalar: function (e) {
      return this.min.addScalar(-e), this.max.addScalar(e), this;
    },
    containsPoint: function (e) {
      return (
        !(e.x < this.min.x) &&
        !(e.x > this.max.x) &&
        !(e.y < this.min.y) &&
        !(e.y > this.max.y) &&
        !(e.z < this.min.z) &&
        !(e.z > this.max.z)
      );
    },
    containsBox: function (e) {
      return (
        this.min.x <= e.min.x &&
        e.max.x <= this.max.x &&
        this.min.y <= e.min.y &&
        e.max.y <= this.max.y &&
        this.min.z <= e.min.z &&
        e.max.z <= this.max.z
      );
    },
    getParameter: function (e) {
      return new THREE.Vector3(
        (e.x - this.min.x) / (this.max.x - this.min.x),
        (e.y - this.min.y) / (this.max.y - this.min.y),
        (e.z - this.min.z) / (this.max.z - this.min.z)
      );
    },
    isIntersectionBox: function (e) {
      return (
        !(e.max.x < this.min.x) &&
        !(e.min.x > this.max.x) &&
        !(e.max.y < this.min.y) &&
        !(e.min.y > this.max.y) &&
        !(e.max.z < this.min.z) &&
        !(e.min.z > this.max.z)
      );
    },
    clampPoint: function (e, t) {
      return (t || new THREE.Vector3()).copy(e).clamp(this.min, this.max);
    },
    distanceToPoint: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return e.copy(t).clamp(this.min, this.max).sub(t).length();
      };
    })(),
    getBoundingSphere: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return (
          ((t = t || new THREE.Sphere()).center = this.center()),
          (t.radius = 0.5 * this.size(e).length()),
          t
        );
      };
    })(),
    intersect: function (e) {
      return this.min.max(e.min), this.max.min(e.max), this;
    },
    union: function (e) {
      return this.min.min(e.min), this.max.max(e.max), this;
    },
    applyMatrix4: (function () {
      var e = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ];
      return function (t) {
        return (
          e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.makeEmpty(),
          this.setFromPoints(e),
          this
        );
      };
    })(),
    translate: function (e) {
      return this.min.add(e), this.max.add(e), this;
    },
    equals: function (e) {
      return e.min.equals(this.min) && e.max.equals(this.max);
    },
    clone: function () {
      return new THREE.Box3().copy(this);
    },
  }),
  (THREE.Matrix3 = function (e, t, i, r, n, o, a, s, h) {
    (this.elements = new Float32Array(9)),
      this.set(
        void 0 !== e ? e : 1,
        t || 0,
        i || 0,
        r || 0,
        void 0 !== n ? n : 1,
        o || 0,
        a || 0,
        s || 0,
        void 0 !== h ? h : 1
      );
  }),
  (THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    set: function (e, t, i, r, n, o, a, s, h) {
      var l = this.elements;
      return (
        (l[0] = e),
        (l[3] = t),
        (l[6] = i),
        (l[1] = r),
        (l[4] = n),
        (l[7] = o),
        (l[2] = a),
        (l[5] = s),
        (l[8] = h),
        this
      );
    },
    identity: function () {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    },
    copy: function (e) {
      return (
        (e = e.elements),
        this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]),
        this
      );
    },
    multiplyVector3: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."
        ),
        e.applyMatrix3(this)
      );
    },
    multiplyVector3Array: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        for (var i = 0, r = t.length; i < r; i += 3)
          (e.x = t[i]),
            (e.y = t[i + 1]),
            (e.z = t[i + 2]),
            e.applyMatrix3(this),
            (t[i] = e.x),
            (t[i + 1] = e.y),
            (t[i + 2] = e.z);
        return t;
      };
    })(),
    multiplyScalar: function (e) {
      var t = this.elements;
      return (
        (t[0] *= e),
        (t[3] *= e),
        (t[6] *= e),
        (t[1] *= e),
        (t[4] *= e),
        (t[7] *= e),
        (t[2] *= e),
        (t[5] *= e),
        (t[8] *= e),
        this
      );
    },
    determinant: function () {
      var e = this.elements,
        t = e[0],
        i = e[1],
        r = e[2],
        n = e[3],
        o = e[4],
        a = e[5],
        s = e[6],
        h = e[7],
        e = e[8];
      return (
        t * o * e - t * a * h - i * n * e + i * a * s + r * n * h - r * o * s
      );
    },
    getInverse: function (e, t) {
      var i = e.elements,
        r = this.elements;
      if (
        ((r[0] = i[10] * i[5] - i[6] * i[9]),
        (r[1] = -i[10] * i[1] + i[2] * i[9]),
        (r[2] = i[6] * i[1] - i[2] * i[5]),
        (r[3] = -i[10] * i[4] + i[6] * i[8]),
        (r[4] = i[10] * i[0] - i[2] * i[8]),
        (r[5] = -i[6] * i[0] + i[2] * i[4]),
        (r[6] = i[9] * i[4] - i[5] * i[8]),
        (r[7] = -i[9] * i[0] + i[1] * i[8]),
        (r[8] = i[5] * i[0] - i[1] * i[4]),
        0 == (i = i[0] * r[0] + i[1] * r[3] + i[2] * r[6]))
      ) {
        if (t)
          throw Error(
            "Matrix3.getInverse(): can't invert matrix, determinant is 0"
          );
        return (
          console.warn(
            "Matrix3.getInverse(): can't invert matrix, determinant is 0"
          ),
          this.identity(),
          this
        );
      }
      return this.multiplyScalar(1 / i), this;
    },
    transpose: function () {
      var e,
        t = this.elements;
      return (
        (e = t[1]),
        (t[1] = t[3]),
        (t[3] = e),
        (e = t[2]),
        (t[2] = t[6]),
        (t[6] = e),
        (e = t[5]),
        (t[5] = t[7]),
        (t[7] = e),
        this
      );
    },
    getNormalMatrix: function (e) {
      return this.getInverse(e).transpose(), this;
    },
    transposeIntoArray: function (e) {
      var t = this.elements;
      return (
        (e[0] = t[0]),
        (e[1] = t[3]),
        (e[2] = t[6]),
        (e[3] = t[1]),
        (e[4] = t[4]),
        (e[5] = t[7]),
        (e[6] = t[2]),
        (e[7] = t[5]),
        (e[8] = t[8]),
        this
      );
    },
    clone: function () {
      var e = this.elements;
      return new THREE.Matrix3(
        e[0],
        e[3],
        e[6],
        e[1],
        e[4],
        e[7],
        e[2],
        e[5],
        e[8]
      );
    },
  }),
  (THREE.Matrix4 = function (e, t, i, r, n, o, a, s, h, l, c, p, u, E, f, d) {
    var m = (this.elements = new Float32Array(16));
    (m[0] = void 0 !== e ? e : 1),
      (m[4] = t || 0),
      (m[8] = i || 0),
      (m[12] = r || 0),
      (m[1] = n || 0),
      (m[5] = void 0 !== o ? o : 1),
      (m[9] = a || 0),
      (m[13] = s || 0),
      (m[2] = h || 0),
      (m[6] = l || 0),
      (m[10] = void 0 !== c ? c : 1),
      (m[14] = p || 0),
      (m[3] = u || 0),
      (m[7] = E || 0),
      (m[11] = f || 0),
      (m[15] = void 0 !== d ? d : 1);
  }),
  (THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (e, t, i, r, n, o, a, s, h, l, c, p, u, E, f, d) {
      var m = this.elements;
      return (
        (m[0] = e),
        (m[4] = t),
        (m[8] = i),
        (m[12] = r),
        (m[1] = n),
        (m[5] = o),
        (m[9] = a),
        (m[13] = s),
        (m[2] = h),
        (m[6] = l),
        (m[10] = c),
        (m[14] = p),
        (m[3] = u),
        (m[7] = E),
        (m[11] = f),
        (m[15] = d),
        this
      );
    },
    identity: function () {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    },
    copy: function (e) {
      return (
        (e = e.elements),
        this.set(
          e[0],
          e[4],
          e[8],
          e[12],
          e[1],
          e[5],
          e[9],
          e[13],
          e[2],
          e[6],
          e[10],
          e[14],
          e[3],
          e[7],
          e[11],
          e[15]
        ),
        this
      );
    },
    extractPosition: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition()."
        ),
        this.copyPosition(e)
      );
    },
    copyPosition: function (e) {
      var t = this.elements,
        e = e.elements;
      return (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), this;
    },
    extractRotation: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        var i = this.elements,
          t = t.elements,
          r = 1 / e.set(t[0], t[1], t[2]).length(),
          n = 1 / e.set(t[4], t[5], t[6]).length(),
          o = 1 / e.set(t[8], t[9], t[10]).length();
        return (
          (i[0] = t[0] * r),
          (i[1] = t[1] * r),
          (i[2] = t[2] * r),
          (i[4] = t[4] * n),
          (i[5] = t[5] * n),
          (i[6] = t[6] * n),
          (i[8] = t[8] * o),
          (i[9] = t[9] * o),
          (i[10] = t[10] * o),
          this
        );
      };
    })(),
    setRotationFromEuler: function (e, t) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .setRotationFromEuler() has been deprecated in favor of makeRotationFromEuler.  Please update your code."
        ),
        this.makeRotationFromEuler(e, t)
      );
    },
    makeRotationFromEuler: function (e, t) {
      var i = this.elements,
        r = e.x,
        n = e.y,
        o = e.z,
        a = Math.cos(r),
        r = Math.sin(r),
        s = Math.cos(n),
        n = Math.sin(n),
        h = Math.cos(o),
        o = Math.sin(o);
      if (void 0 === t || "XYZ" === t) {
        var l = a * h,
          c = a * o,
          p = r * h,
          u = r * o;
        (i[0] = s * h),
          (i[4] = -s * o),
          (i[8] = n),
          (i[1] = c + p * n),
          (i[5] = l - u * n),
          (i[9] = -r * s),
          (i[2] = u - l * n),
          (i[6] = p + c * n),
          (i[10] = a * s);
      } else
        "YXZ" === t
          ? ((l = s * h),
            (c = s * o),
            (p = n * h),
            (u = n * o),
            (i[0] = l + u * r),
            (i[4] = p * r - c),
            (i[8] = a * n),
            (i[1] = a * o),
            (i[5] = a * h),
            (i[9] = -r),
            (i[2] = c * r - p),
            (i[6] = u + l * r),
            (i[10] = a * s))
          : "ZXY" === t
          ? ((l = s * h),
            (c = s * o),
            (p = n * h),
            (u = n * o),
            (i[0] = l - u * r),
            (i[4] = -a * o),
            (i[8] = p + c * r),
            (i[1] = c + p * r),
            (i[5] = a * h),
            (i[9] = u - l * r),
            (i[2] = -a * n),
            (i[6] = r),
            (i[10] = a * s))
          : "ZYX" === t
          ? ((l = a * h),
            (c = a * o),
            (p = r * h),
            (u = r * o),
            (i[0] = s * h),
            (i[4] = p * n - c),
            (i[8] = l * n + u),
            (i[1] = s * o),
            (i[5] = u * n + l),
            (i[9] = c * n - p),
            (i[2] = -n),
            (i[6] = r * s),
            (i[10] = a * s))
          : "YZX" === t
          ? ((l = a * s),
            (c = a * n),
            (p = r * s),
            (u = r * n),
            (i[0] = s * h),
            (i[4] = u - l * o),
            (i[8] = p * o + c),
            (i[1] = o),
            (i[5] = a * h),
            (i[9] = -r * h),
            (i[2] = -n * h),
            (i[6] = c * o + p),
            (i[10] = l - u * o))
          : "XZY" === t &&
            ((l = a * s),
            (c = a * n),
            (p = r * s),
            (u = r * n),
            (i[0] = s * h),
            (i[4] = -o),
            (i[8] = n * h),
            (i[1] = l * o + u),
            (i[5] = a * h),
            (i[9] = c * o - p),
            (i[2] = p * o - c),
            (i[6] = r * h),
            (i[10] = u * o + l));
      return (
        (i[3] = 0),
        (i[7] = 0),
        (i[11] = 0),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = 0),
        (i[15] = 1),
        this
      );
    },
    setRotationFromQuaternion: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code."
        ),
        this.makeRotationFromQuaternion(e)
      );
    },
    makeRotationFromQuaternion: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        n = e.z,
        o = e.w,
        a = i + i,
        s = r + r,
        h = n + n,
        e = i * a,
        l = i * s,
        i = i * h,
        c = r * s,
        r = r * h,
        n = n * h,
        a = o * a,
        s = o * s,
        o = o * h;
      return (
        (t[0] = 1 - (c + n)),
        (t[4] = l - o),
        (t[8] = i + s),
        (t[1] = l + o),
        (t[5] = 1 - (e + n)),
        (t[9] = r - a),
        (t[2] = i - s),
        (t[6] = r + a),
        (t[10] = 1 - (e + c)),
        (t[3] = 0),
        (t[7] = 0),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0),
        (t[15] = 1),
        this
      );
    },
    lookAt: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3(),
        i = new THREE.Vector3();
      return function (r, n, o) {
        var a = this.elements;
        return (
          i.subVectors(r, n).normalize(),
          0 === i.length() && (i.z = 1),
          e.crossVectors(o, i).normalize(),
          0 === e.length() && ((i.x += 1e-4), e.crossVectors(o, i).normalize()),
          t.crossVectors(i, e),
          (a[0] = e.x),
          (a[4] = t.x),
          (a[8] = i.x),
          (a[1] = e.y),
          (a[5] = t.y),
          (a[9] = i.y),
          (a[2] = e.z),
          (a[6] = t.z),
          (a[10] = i.z),
          this
        );
      };
    })(),
    multiply: function (e, t) {
      return void 0 !== t
        ? (console.warn(
            "DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
          ),
          this.multiplyMatrices(e, t))
        : this.multiplyMatrices(this, e);
    },
    multiplyMatrices: function (e, t) {
      var i = e.elements,
        r = t.elements,
        n = this.elements,
        o = i[0],
        a = i[4],
        s = i[8],
        h = i[12],
        l = i[1],
        c = i[5],
        p = i[9],
        u = i[13],
        E = i[2],
        f = i[6],
        d = i[10],
        m = i[14],
        g = i[3],
        T = i[7],
        v = i[11],
        i = i[15],
        $ = r[0],
        y = r[4],
        R = r[8],
        x = r[12],
        H = r[1],
        _ = r[5],
        w = r[9],
        S = r[13],
        b = r[2],
        M = r[6],
        C = r[10],
        A = r[14],
        L = r[3],
        P = r[7],
        D = r[11],
        r = r[15];
      return (
        (n[0] = o * $ + a * H + s * b + h * L),
        (n[4] = o * y + a * _ + s * M + h * P),
        (n[8] = o * R + a * w + s * C + h * D),
        (n[12] = o * x + a * S + s * A + h * r),
        (n[1] = l * $ + c * H + p * b + u * L),
        (n[5] = l * y + c * _ + p * M + u * P),
        (n[9] = l * R + c * w + p * C + u * D),
        (n[13] = l * x + c * S + p * A + u * r),
        (n[2] = E * $ + f * H + d * b + m * L),
        (n[6] = E * y + f * _ + d * M + m * P),
        (n[10] = E * R + f * w + d * C + m * D),
        (n[14] = E * x + f * S + d * A + m * r),
        (n[3] = g * $ + T * H + v * b + i * L),
        (n[7] = g * y + T * _ + v * M + i * P),
        (n[11] = g * R + T * w + v * C + i * D),
        (n[15] = g * x + T * S + v * A + i * r),
        this
      );
    },
    multiplyToArray: function (e, t, i) {
      var r = this.elements;
      return (
        this.multiplyMatrices(e, t),
        (i[0] = r[0]),
        (i[1] = r[1]),
        (i[2] = r[2]),
        (i[3] = r[3]),
        (i[4] = r[4]),
        (i[5] = r[5]),
        (i[6] = r[6]),
        (i[7] = r[7]),
        (i[8] = r[8]),
        (i[9] = r[9]),
        (i[10] = r[10]),
        (i[11] = r[11]),
        (i[12] = r[12]),
        (i[13] = r[13]),
        (i[14] = r[14]),
        (i[15] = r[15]),
        this
      );
    },
    multiplyScalar: function (e) {
      var t = this.elements;
      return (
        (t[0] *= e),
        (t[4] *= e),
        (t[8] *= e),
        (t[12] *= e),
        (t[1] *= e),
        (t[5] *= e),
        (t[9] *= e),
        (t[13] *= e),
        (t[2] *= e),
        (t[6] *= e),
        (t[10] *= e),
        (t[14] *= e),
        (t[3] *= e),
        (t[7] *= e),
        (t[11] *= e),
        (t[15] *= e),
        this
      );
    },
    multiplyVector3: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."
        ),
        e.applyProjection(this)
      );
    },
    multiplyVector4: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."
        ),
        e.applyMatrix4(this)
      );
    },
    multiplyVector3Array: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        for (var i = 0, r = t.length; i < r; i += 3)
          (e.x = t[i]),
            (e.y = t[i + 1]),
            (e.z = t[i + 2]),
            e.applyProjection(this),
            (t[i] = e.x),
            (t[i + 1] = e.y),
            (t[i + 2] = e.z);
        return t;
      };
    })(),
    rotateAxis: function (e) {
      console.warn(
        "DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."
      ),
        e.transformDirection(this);
    },
    crossVector: function (e) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."
        ),
        e.applyMatrix4(this)
      );
    },
    determinant: function () {
      var e = this.elements,
        t = e[0],
        i = e[4],
        r = e[8],
        n = e[12],
        o = e[1],
        a = e[5],
        s = e[9],
        h = e[13],
        l = e[2],
        c = e[6],
        p = e[10],
        u = e[14];
      return (
        e[3] *
          (+n * s * c -
            r * h * c -
            n * a * p +
            i * h * p +
            r * a * u -
            i * s * u) +
        e[7] *
          (+t * s * u -
            t * h * p +
            n * o * p -
            r * o * u +
            r * h * l -
            n * s * l) +
        e[11] *
          (+t * h * c -
            t * a * u -
            n * o * c +
            i * o * u +
            n * a * l -
            i * h * l) +
        e[15] *
          (-r * a * l -
            t * s * c +
            t * a * p +
            r * o * c -
            i * o * p +
            i * s * l)
      );
    },
    transpose: function () {
      var e,
        t = this.elements;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    },
    flattenToArray: function (e) {
      var t = this.elements;
      return (
        (e[0] = t[0]),
        (e[1] = t[1]),
        (e[2] = t[2]),
        (e[3] = t[3]),
        (e[4] = t[4]),
        (e[5] = t[5]),
        (e[6] = t[6]),
        (e[7] = t[7]),
        (e[8] = t[8]),
        (e[9] = t[9]),
        (e[10] = t[10]),
        (e[11] = t[11]),
        (e[12] = t[12]),
        (e[13] = t[13]),
        (e[14] = t[14]),
        (e[15] = t[15]),
        e
      );
    },
    flattenToArrayOffset: function (e, t) {
      var i = this.elements;
      return (
        (e[t] = i[0]),
        (e[t + 1] = i[1]),
        (e[t + 2] = i[2]),
        (e[t + 3] = i[3]),
        (e[t + 4] = i[4]),
        (e[t + 5] = i[5]),
        (e[t + 6] = i[6]),
        (e[t + 7] = i[7]),
        (e[t + 8] = i[8]),
        (e[t + 9] = i[9]),
        (e[t + 10] = i[10]),
        (e[t + 11] = i[11]),
        (e[t + 12] = i[12]),
        (e[t + 13] = i[13]),
        (e[t + 14] = i[14]),
        (e[t + 15] = i[15]),
        e
      );
    },
    getPosition: (function () {
      var e = new THREE.Vector3();
      return function () {
        console.warn(
          "DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead."
        );
        var t = this.elements;
        return e.set(t[12], t[13], t[14]);
      };
    })(),
    setPosition: function (e) {
      var t = this.elements;
      return (t[12] = e.x), (t[13] = e.y), (t[14] = e.z), this;
    },
    getInverse: function (e, t) {
      var i = this.elements,
        r = e.elements,
        n = r[0],
        o = r[4],
        a = r[8],
        s = r[12],
        h = r[1],
        l = r[5],
        c = r[9],
        p = r[13],
        u = r[2],
        E = r[6],
        f = r[10],
        d = r[14],
        m = r[3],
        g = r[7],
        T = r[11],
        v = r[15];
      if (
        ((i[0] =
          c * d * g -
          p * f * g +
          p * E * T -
          l * d * T -
          c * E * v +
          l * f * v),
        (i[4] =
          s * f * g -
          a * d * g -
          s * E * T +
          o * d * T +
          a * E * v -
          o * f * v),
        (i[8] =
          a * p * g -
          s * c * g +
          s * l * T -
          o * p * T -
          a * l * v +
          o * c * v),
        (i[12] =
          s * c * E -
          a * p * E -
          s * l * f +
          o * p * f +
          a * l * d -
          o * c * d),
        (i[1] =
          p * f * m -
          c * d * m -
          p * u * T +
          h * d * T +
          c * u * v -
          h * f * v),
        (i[5] =
          a * d * m -
          s * f * m +
          s * u * T -
          n * d * T -
          a * u * v +
          n * f * v),
        (i[9] =
          s * c * m -
          a * p * m -
          s * h * T +
          n * p * T +
          a * h * v -
          n * c * v),
        (i[13] =
          a * p * u -
          s * c * u +
          s * h * f -
          n * p * f -
          a * h * d +
          n * c * d),
        (i[2] =
          l * d * m -
          p * E * m +
          p * u * g -
          h * d * g -
          l * u * v +
          h * E * v),
        (i[6] =
          s * E * m -
          o * d * m -
          s * u * g +
          n * d * g +
          o * u * v -
          n * E * v),
        (i[10] =
          o * p * m -
          s * l * m +
          s * h * g -
          n * p * g -
          o * h * v +
          n * l * v),
        (i[14] =
          s * l * u -
          o * p * u -
          s * h * E +
          n * p * E +
          o * h * d -
          n * l * d),
        (i[3] =
          c * E * m -
          l * f * m -
          c * u * g +
          h * f * g +
          l * u * T -
          h * E * T),
        (i[7] =
          o * f * m -
          a * E * m +
          a * u * g -
          n * f * g -
          o * u * T +
          n * E * T),
        (i[11] =
          a * l * m -
          o * c * m -
          a * h * g +
          n * c * g +
          o * h * T -
          n * l * T),
        (i[15] =
          o * c * u -
          a * l * u +
          a * h * E -
          n * c * E -
          o * h * f +
          n * l * f),
        0 == (i = r[0] * i[0] + r[1] * i[4] + r[2] * i[8] + r[3] * i[12]))
      ) {
        if (t)
          throw Error(
            "Matrix4.getInverse(): can't invert matrix, determinant is 0"
          );
        return (
          console.warn(
            "Matrix4.getInverse(): can't invert matrix, determinant is 0"
          ),
          this.identity(),
          this
        );
      }
      return this.multiplyScalar(1 / i), this;
    },
    translate: function () {
      console.warn("DEPRECATED: Matrix4's .translate() has been removed.");
    },
    rotateX: function () {
      console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.");
    },
    rotateY: function () {
      console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.");
    },
    rotateZ: function () {
      console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.");
    },
    rotateByAxis: function () {
      console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.");
    },
    scale: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        e = e.z;
      return (
        (t[0] *= i),
        (t[4] *= r),
        (t[8] *= e),
        (t[1] *= i),
        (t[5] *= r),
        (t[9] *= e),
        (t[2] *= i),
        (t[6] *= r),
        (t[10] *= e),
        (t[3] *= i),
        (t[7] *= r),
        (t[11] *= e),
        this
      );
    },
    getMaxScaleOnAxis: function () {
      var e = this.elements;
      return Math.sqrt(
        Math.max(
          e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
          Math.max(
            e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
            e[8] * e[8] + e[9] * e[9] + e[10] * e[10]
          )
        )
      );
    },
    makeTranslation: function (e, t, i) {
      return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this;
    },
    makeRotationX: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this;
    },
    makeRotationY: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this;
    },
    makeRotationZ: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    },
    makeRotationAxis: function (e, t) {
      var i = Math.cos(t),
        r = Math.sin(t),
        n = 1 - i,
        o = e.x,
        a = e.y,
        s = e.z,
        h = n * o,
        l = n * a;
      return (
        this.set(
          h * o + i,
          h * a - r * s,
          h * s + r * a,
          0,
          h * a + r * s,
          l * a + i,
          l * s - r * o,
          0,
          h * s - r * a,
          l * s + r * o,
          n * s * s + i,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    },
    makeScale: function (e, t, i) {
      return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
    },
    compose: function (e, t, i) {
      return (
        console.warn(
          "DEPRECATED: Matrix4's .compose() has been deprecated in favor of makeFromPositionQuaternionScale. Please update your code."
        ),
        this.makeFromPositionQuaternionScale(e, t, i)
      );
    },
    makeFromPositionQuaternionScale: function (e, t, i) {
      return (
        this.makeRotationFromQuaternion(t),
        this.scale(i),
        this.setPosition(e),
        this
      );
    },
    makeFromPositionEulerScale: function (e, t, i, r) {
      return (
        this.makeRotationFromEuler(t, i),
        this.scale(r),
        this.setPosition(e),
        this
      );
    },
    makeFrustum: function (e, t, i, r, n, o) {
      var a = this.elements;
      return (
        (a[0] = (2 * n) / (t - e)),
        (a[4] = 0),
        (a[8] = (t + e) / (t - e)),
        (a[12] = 0),
        (a[1] = 0),
        (a[5] = (2 * n) / (r - i)),
        (a[9] = (r + i) / (r - i)),
        (a[13] = 0),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = -(o + n) / (o - n)),
        (a[14] = (-2 * o * n) / (o - n)),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = -1),
        (a[15] = 0),
        this
      );
    },
    makePerspective: function (e, t, i, r) {
      var e = i * Math.tan(THREE.Math.degToRad(0.5 * e)),
        n = -e;
      return this.makeFrustum(n * t, e * t, n, e, i, r);
    },
    makeOrthographic: function (e, t, i, r, n, o) {
      var a = this.elements,
        s = t - e,
        h = i - r,
        l = o - n;
      return (
        (a[0] = 2 / s),
        (a[4] = 0),
        (a[8] = 0),
        (a[12] = -((t + e) / s)),
        (a[1] = 0),
        (a[5] = 2 / h),
        (a[9] = 0),
        (a[13] = -((i + r) / h)),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = -2 / l),
        (a[14] = -((o + n) / l)),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = 0),
        (a[15] = 1),
        this
      );
    },
    clone: function () {
      var e = this.elements;
      return new THREE.Matrix4(
        e[0],
        e[4],
        e[8],
        e[12],
        e[1],
        e[5],
        e[9],
        e[13],
        e[2],
        e[6],
        e[10],
        e[14],
        e[3],
        e[7],
        e[11],
        e[15]
      );
    },
  }),
  THREE.extend(THREE.Matrix4.prototype, {
    decompose: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3(),
        i = new THREE.Vector3(),
        r = new THREE.Matrix4();
      return function (n, o, a) {
        var s = this.elements;
        return (
          e.set(s[0], s[1], s[2]),
          t.set(s[4], s[5], s[6]),
          i.set(s[8], s[9], s[10]),
          (n = n instanceof THREE.Vector3 ? n : new THREE.Vector3()),
          (o = o instanceof THREE.Quaternion ? o : new THREE.Quaternion()),
          ((a = a instanceof THREE.Vector3 ? a : new THREE.Vector3()).x =
            e.length()),
          (a.y = t.length()),
          (a.z = i.length()),
          (n.x = s[12]),
          (n.y = s[13]),
          (n.z = s[14]),
          r.copy(this),
          (r.elements[0] /= a.x),
          (r.elements[1] /= a.x),
          (r.elements[2] /= a.x),
          (r.elements[4] /= a.y),
          (r.elements[5] /= a.y),
          (r.elements[6] /= a.y),
          (r.elements[8] /= a.z),
          (r.elements[9] /= a.z),
          (r.elements[10] /= a.z),
          o.setFromRotationMatrix(r),
          [n, o, a]
        );
      };
    })(),
  }),
  (THREE.Ray = function (e, t) {
    (this.origin = void 0 !== e ? e : new THREE.Vector3()),
      (this.direction = void 0 !== t ? t : new THREE.Vector3());
  }),
  (THREE.Ray.prototype = {
    constructor: THREE.Ray,
    set: function (e, t) {
      return this.origin.copy(e), this.direction.copy(t), this;
    },
    copy: function (e) {
      return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
    },
    at: function (e, t) {
      return (t || new THREE.Vector3())
        .copy(this.direction)
        .multiplyScalar(e)
        .add(this.origin);
    },
    recast: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        return this.origin.copy(this.at(t, e)), this;
      };
    })(),
    closestPointToPoint: function (e, t) {
      var i = t || new THREE.Vector3();
      i.subVectors(e, this.origin);
      var r = i.dot(this.direction);
      return i.copy(this.direction).multiplyScalar(r).add(this.origin);
    },
    distanceToPoint: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        var i = e.subVectors(t, this.origin).dot(this.direction);
        return (
          e.copy(this.direction).multiplyScalar(i).add(this.origin),
          e.distanceTo(t)
        );
      };
    })(),
    isIntersectionSphere: function (e) {
      return this.distanceToPoint(e.center) <= e.radius;
    },
    isIntersectionPlane: function (e) {
      return (
        0 != e.normal.dot(this.direction) || 0 == e.distanceToPoint(this.origin)
      );
    },
    distanceToPlane: function (e) {
      var t = e.normal.dot(this.direction);
      return 0 != t
        ? -(this.origin.dot(e.normal) + e.constant) / t
        : 0 == e.distanceToPoint(this.origin)
        ? 0
        : void 0;
    },
    intersectPlane: function (e, t) {
      var i = this.distanceToPlane(e);
      return void 0 === i ? void 0 : this.at(i, t);
    },
    applyMatrix4: function (e) {
      return (
        this.direction.add(this.origin).applyMatrix4(e),
        this.origin.applyMatrix4(e),
        this.direction.sub(this.origin),
        this
      );
    },
    equals: function (e) {
      return e.origin.equals(this.origin) && e.direction.equals(this.direction);
    },
    clone: function () {
      return new THREE.Ray().copy(this);
    },
  }),
  (THREE.Sphere = function (e, t) {
    (this.center = void 0 !== e ? e : new THREE.Vector3()),
      (this.radius = void 0 !== t ? t : 0);
  }),
  (THREE.Sphere.prototype = {
    constructor: THREE.Sphere,
    set: function (e, t) {
      return this.center.copy(e), (this.radius = t), this;
    },
    setFromCenterAndPoints: function (e, t) {
      for (var i = 0, r = 0, n = t.length; r < n; r++)
        var o = e.distanceToSquared(t[r]), i = Math.max(i, o);
      return (this.center = e), (this.radius = Math.sqrt(i)), this;
    },
    copy: function (e) {
      return this.center.copy(e.center), (this.radius = e.radius), this;
    },
    empty: function () {
      return 0 >= this.radius;
    },
    containsPoint: function (e) {
      return e.distanceToSquared(this.center) <= this.radius * this.radius;
    },
    distanceToPoint: function (e) {
      return e.distanceTo(this.center) - this.radius;
    },
    intersectsSphere: function (e) {
      var t = this.radius + e.radius;
      return e.center.distanceToSquared(this.center) <= t * t;
    },
    clampPoint: function (e, t) {
      var i = this.center.distanceToSquared(e),
        r = t || new THREE.Vector3();
      return (
        r.copy(e),
        i > this.radius * this.radius &&
          (r.sub(this.center).normalize(),
          r.multiplyScalar(this.radius).add(this.center)),
        r
      );
    },
    getBoundingBox: function (e) {
      return (
        (e = e || new THREE.Box3()).set(this.center, this.center),
        e.expandByScalar(this.radius),
        e
      );
    },
    applyMatrix4: function (e) {
      return (
        this.center.applyMatrix4(e),
        (this.radius *= e.getMaxScaleOnAxis()),
        this
      );
    },
    translate: function (e) {
      return this.center.add(e), this;
    },
    equals: function (e) {
      return e.center.equals(this.center) && e.radius === this.radius;
    },
    clone: function () {
      return new THREE.Sphere().copy(this);
    },
  }),
  (THREE.Frustum = function (e, t, i, r, n, o) {
    this.planes = [
      void 0 !== e ? e : new THREE.Plane(),
      void 0 !== t ? t : new THREE.Plane(),
      void 0 !== i ? i : new THREE.Plane(),
      void 0 !== r ? r : new THREE.Plane(),
      void 0 !== n ? n : new THREE.Plane(),
      void 0 !== o ? o : new THREE.Plane(),
    ];
  }),
  (THREE.Frustum.prototype = {
    constructor: THREE.Frustum,
    set: function (e, t, i, r, n, o) {
      var a = this.planes;
      return (
        a[0].copy(e),
        a[1].copy(t),
        a[2].copy(i),
        a[3].copy(r),
        a[4].copy(n),
        a[5].copy(o),
        this
      );
    },
    copy: function (e) {
      for (var t = this.planes, i = 0; 6 > i; i++) t[i].copy(e.planes[i]);
      return this;
    },
    setFromMatrix: function (e) {
      var t = this.planes,
        i = e.elements,
        e = i[0],
        r = i[1],
        n = i[2],
        o = i[3],
        a = i[4],
        s = i[5],
        h = i[6],
        l = i[7],
        c = i[8],
        p = i[9],
        u = i[10],
        E = i[11],
        f = i[12],
        d = i[13],
        m = i[14],
        i = i[15];
      return (
        t[0].setComponents(o - e, l - a, E - c, i - f).normalize(),
        t[1].setComponents(o + e, l + a, E + c, i + f).normalize(),
        t[2].setComponents(o + r, l + s, E + p, i + d).normalize(),
        t[3].setComponents(o - r, l - s, E - p, i - d).normalize(),
        t[4].setComponents(o - n, l - h, E - u, i - m).normalize(),
        t[5].setComponents(o + n, l + h, E + u, i + m).normalize(),
        this
      );
    },
    intersectsObject: (function () {
      var e = new THREE.Vector3();
      return function (t) {
        var i = t.matrixWorld,
          r = this.planes,
          t = -t.geometry.boundingSphere.radius * i.getMaxScaleOnAxis();
        for (e.getPositionFromMatrix(i), i = 0; 6 > i; i++)
          if (r[i].distanceToPoint(e) < t) return !1;
        return !0;
      };
    })(),
    intersectsSphere: function (e) {
      for (var t = this.planes, i = e.center, e = -e.radius, r = 0; 6 > r; r++)
        if (t[r].distanceToPoint(i) < e) return !1;
      return !0;
    },
    containsPoint: function (e) {
      for (var t = this.planes, i = 0; 6 > i; i++)
        if (0 > t[i].distanceToPoint(e)) return !1;
      return !0;
    },
    clone: function () {
      return new THREE.Frustum().copy(this);
    },
  }),
  (THREE.Plane = function (e, t) {
    (this.normal = void 0 !== e ? e : new THREE.Vector3(1, 0, 0)),
      (this.constant = void 0 !== t ? t : 0);
  }),
  (THREE.Plane.prototype = {
    constructor: THREE.Plane,
    set: function (e, t) {
      return this.normal.copy(e), (this.constant = t), this;
    },
    setComponents: function (e, t, i, r) {
      return this.normal.set(e, t, i), (this.constant = r), this;
    },
    setFromNormalAndCoplanarPoint: function (e, t) {
      return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this;
    },
    setFromCoplanarPoints: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3();
      return function (i, r, n) {
        return (
          (r = e.subVectors(n, r).cross(t.subVectors(i, r)).normalize()),
          this.setFromNormalAndCoplanarPoint(r, i),
          this
        );
      };
    })(),
    copy: function (e) {
      return this.normal.copy(e.normal), (this.constant = e.constant), this;
    },
    normalize: function () {
      var e = 1 / this.normal.length();
      return this.normal.multiplyScalar(e), (this.constant *= e), this;
    },
    negate: function () {
      return (this.constant *= -1), this.normal.negate(), this;
    },
    distanceToPoint: function (e) {
      return this.normal.dot(e) + this.constant;
    },
    distanceToSphere: function (e) {
      return this.distanceToPoint(e.center) - e.radius;
    },
    projectPoint: function (e, t) {
      return this.orthoPoint(e, t).sub(e).negate();
    },
    orthoPoint: function (e, t) {
      var i = this.distanceToPoint(e);
      return (t || new THREE.Vector3()).copy(this.normal).multiplyScalar(i);
    },
    isIntersectionLine: function (e) {
      var t = this.distanceToPoint(e.start),
        e = this.distanceToPoint(e.end);
      return (0 > t && 0 < e) || (0 > e && 0 < t);
    },
    intersectLine: (function () {
      var e = new THREE.Vector3();
      return function (t, i) {
        var r = i || new THREE.Vector3(),
          n = t.delta(e),
          o = this.normal.dot(n);
        return 0 != o
          ? 0 > (o = -(t.start.dot(this.normal) + this.constant) / o) || 1 < o
            ? void 0
            : r.copy(n).multiplyScalar(o).add(t.start)
          : 0 == this.distanceToPoint(t.start)
          ? r.copy(t.start)
          : void 0;
      };
    })(),
    coplanarPoint: function (e) {
      return (e || new THREE.Vector3())
        .copy(this.normal)
        .multiplyScalar(-this.constant);
    },
    applyMatrix4: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3();
      return function (i, r) {
        var r = r || new THREE.Matrix3().getNormalMatrix(i),
          n = e.copy(this.normal).applyMatrix3(r),
          o = this.coplanarPoint(t);
        return (
          o.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(n, o), this
        );
      };
    })(),
    translate: function (e) {
      return (this.constant -= e.dot(this.normal)), this;
    },
    equals: function (e) {
      return e.normal.equals(this.normal) && e.constant == this.constant;
    },
    clone: function () {
      return new THREE.Plane().copy(this);
    },
  }),
  (THREE.Math = {
    clamp: function (e, t, i) {
      return e < t ? t : e > i ? i : e;
    },
    clampBottom: function (e, t) {
      return e < t ? t : e;
    },
    mapLinear: function (e, t, i, r, n) {
      return r + ((e - t) * (n - r)) / (i - t);
    },
    smoothstep: function (e, t, i) {
      return e <= t
        ? 0
        : e >= i
        ? 1
        : (e = (e - t) / (i - t)) * e * (3 - 2 * e);
    },
    smootherstep: function (e, t, i) {
      return e <= t
        ? 0
        : e >= i
        ? 1
        : (e = (e - t) / (i - t)) * e * e * (e * (6 * e - 15) + 10);
    },
    random16: function () {
      return (65280 * Math.random() + 255 * Math.random()) / 65535;
    },
    randInt: function (e, t) {
      return e + Math.floor(Math.random() * (t - e + 1));
    },
    randFloat: function (e, t) {
      return e + Math.random() * (t - e);
    },
    randFloatSpread: function (e) {
      return e * (0.5 - Math.random());
    },
    sign: function (e) {
      return 0 > e ? -1 : 0 < e ? 1 : 0;
    },
    degToRad: (function () {
      var e = Math.PI / 180;
      return function (t) {
        return t * e;
      };
    })(),
    radToDeg: (function () {
      var e = 180 / Math.PI;
      return function (t) {
        return t * e;
      };
    })(),
  }),
  (THREE.Spline = function (e) {
    function t(e, t, i, r, n, o, a) {
      return (
        (e = 0.5 * (i - e)),
        (r = 0.5 * (r - t)),
        (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * o + e * n + t
      );
    }
    this.points = e;
    var i,
      r,
      n,
      o,
      a,
      s,
      h,
      l,
      c,
      p = [],
      u = { x: 0, y: 0, z: 0 };
    (this.initFromArray = function (e) {
      this.points = [];
      for (var t = 0; t < e.length; t++)
        this.points[t] = { x: e[t][0], y: e[t][1], z: e[t][2] };
    }),
      (this.getPoint = function (e) {
        return (
          (r = Math.floor((i = (this.points.length - 1) * e))),
          (n = i - r),
          (p[0] = 0 === r ? r : r - 1),
          (p[1] = r),
          (p[2] = r > this.points.length - 2 ? this.points.length - 1 : r + 1),
          (p[3] = r > this.points.length - 3 ? this.points.length - 1 : r + 2),
          (s = this.points[p[0]]),
          (h = this.points[p[1]]),
          (l = this.points[p[2]]),
          (c = this.points[p[3]]),
          (o = n * n),
          (a = n * o),
          (u.x = t(s.x, h.x, l.x, c.x, n, o, a)),
          (u.y = t(s.y, h.y, l.y, c.y, n, o, a)),
          (u.z = t(s.z, h.z, l.z, c.z, n, o, a)),
          u
        );
      }),
      (this.getControlPointsArray = function () {
        var e,
          t,
          i = this.points.length,
          r = [];
        for (e = 0; e < i; e++) (t = this.points[e]), (r[e] = [t.x, t.y, t.z]);
        return r;
      }),
      (this.getLength = function (e) {
        var t,
          i,
          r,
          n = (t = t = 0),
          o = new THREE.Vector3(),
          a = new THREE.Vector3(),
          s = [],
          h = 0;
        for (
          s[0] = 0,
            e || (e = 100),
            i = this.points.length * e,
            o.copy(this.points[0]),
            e = 1;
          e < i;
          e++
        )
          (t = e / i),
            (r = this.getPoint(t)),
            a.copy(r),
            (h += a.distanceTo(o)),
            o.copy(r),
            (t *= this.points.length - 1),
            (t = Math.floor(t)) != n && ((s[t] = h), (n = t));
        return (s[s.length] = h), { chunks: s, total: h };
      }),
      (this.reparametrizeByArcLength = function (e) {
        var t,
          i,
          r,
          n,
          o,
          a,
          s = [],
          h = new THREE.Vector3(),
          l = this.getLength();
        for (
          s.push(h.copy(this.points[0]).clone()), t = 1;
          t < this.points.length;
          t++
        ) {
          for (
            a = Math.ceil((e * (i = l.chunks[t] - l.chunks[t - 1])) / l.total),
              n = (t - 1) / (this.points.length - 1),
              o = t / (this.points.length - 1),
              i = 1;
            i < a - 1;
            i++
          )
            (r = n + i * (1 / a) * (o - n)),
              (r = this.getPoint(r)),
              s.push(h.copy(r).clone());
          s.push(h.copy(this.points[t]).clone());
        }
        this.points = s;
      });
  }),
  (THREE.Triangle = function (e, t, i) {
    (this.a = void 0 !== e ? e : new THREE.Vector3()),
      (this.b = void 0 !== t ? t : new THREE.Vector3()),
      (this.c = void 0 !== i ? i : new THREE.Vector3());
  }),
  (THREE.Triangle.normal = (function () {
    var e = new THREE.Vector3();
    return function (t, i, r, n) {
      return (
        (n = n || new THREE.Vector3()).subVectors(r, i),
        e.subVectors(t, i),
        n.cross(e),
        0 < (t = n.lengthSq())
          ? n.multiplyScalar(1 / Math.sqrt(t))
          : n.set(0, 0, 0)
      );
    };
  })()),
  (THREE.Triangle.barycoordFromPoint = (function () {
    var e = new THREE.Vector3(),
      t = new THREE.Vector3(),
      i = new THREE.Vector3();
    return function (r, n, o, a, s) {
      e.subVectors(a, n), t.subVectors(o, n), i.subVectors(r, n);
      var r = e.dot(e),
        n = e.dot(t),
        o = e.dot(i),
        h = t.dot(t),
        a = t.dot(i),
        l = r * h - n * n,
        s = s || new THREE.Vector3();
      return 0 == l
        ? s.set(-2, -1, -1)
        : ((h = (h * o - n * a) * (l = 1 / l)),
          (r = (r * a - n * o) * l),
          s.set(1 - h - r, r, h));
    };
  })()),
  (THREE.Triangle.containsPoint = (function () {
    var e = new THREE.Vector3();
    return function (t, i, r, n) {
      return (
        0 <= (t = THREE.Triangle.barycoordFromPoint(t, i, r, n, e)).x &&
        0 <= t.y &&
        1 >= t.x + t.y
      );
    };
  })()),
  (THREE.Triangle.prototype = {
    constructor: THREE.Triangle,
    set: function (e, t, i) {
      return this.a.copy(e), this.b.copy(t), this.c.copy(i), this;
    },
    setFromPointsAndIndices: function (e, t, i, r) {
      return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this;
    },
    copy: function (e) {
      return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
    },
    area: (function () {
      var e = new THREE.Vector3(),
        t = new THREE.Vector3();
      return function () {
        return (
          e.subVectors(this.c, this.b),
          t.subVectors(this.a, this.b),
          0.5 * e.cross(t).length()
        );
      };
    })(),
    midpoint: function (e) {
      return (e || new THREE.Vector3())
        .addVectors(this.a, this.b)
        .add(this.c)
        .multiplyScalar(1 / 3);
    },
    normal: function (e) {
      return THREE.Triangle.normal(this.a, this.b, this.c, e);
    },
    plane: function (e) {
      return (e || new THREE.Plane()).setFromCoplanarPoints(
        this.a,
        this.b,
        this.c
      );
    },
    barycoordFromPoint: function (e, t) {
      return THREE.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t);
    },
    containsPoint: function (e) {
      return THREE.Triangle.containsPoint(e, this.a, this.b, this.c);
    },
    equals: function (e) {
      return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
    },
    clone: function () {
      return new THREE.Triangle().copy(this);
    },
  }),
  (THREE.Vertex = function (e) {
    return (
      console.warn(
        "THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."
      ),
      e
    );
  }),
  (THREE.UV = function (e, t) {
    return (
      console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead."),
      new THREE.Vector2(e, t)
    );
  }),
  (THREE.Clock = function (e) {
    (this.autoStart = void 0 === e || e),
      (this.elapsedTime = this.oldTime = this.startTime = 0),
      (this.running = !1);
  }),
  (THREE.Clock.prototype = {
    constructor: THREE.Clock,
    start: function () {
      (this.oldTime = this.startTime =
        void 0 !== window.performance && void 0 !== window.performance.now
          ? window.performance.now()
          : Date.now()),
        (this.running = !0);
    },
    stop: function () {
      this.getElapsedTime(), (this.running = !1);
    },
    getElapsedTime: function () {
      return this.getDelta(), this.elapsedTime;
    },
    getDelta: function () {
      var e = 0;
      if ((this.autoStart && !this.running && this.start(), this.running)) {
        var t =
            void 0 !== window.performance && void 0 !== window.performance.now
              ? window.performance.now()
              : Date.now(),
          e = 0.001 * (t - this.oldTime);
        (this.oldTime = t), (this.elapsedTime += e);
      }
      return e;
    },
  }),
  (THREE.EventDispatcher = function () {}),
  (THREE.EventDispatcher.prototype = {
    constructor: THREE.EventDispatcher,
    addEventListener: function (e, t) {
      void 0 === this._listeners && (this._listeners = {});
      var i = this._listeners;
      void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t);
    },
    hasEventListener: function (e, t) {
      if (void 0 === this._listeners) return !1;
      var i = this._listeners;
      return void 0 !== i[e] && -1 !== i[e].indexOf(t);
    },
    removeEventListener: function (e, t) {
      if (void 0 !== this._listeners) {
        var i = this._listeners,
          r = i[e].indexOf(t);
        -1 !== r && i[e].splice(r, 1);
      }
    },
    dispatchEvent: function (e) {
      if (void 0 !== this._listeners) {
        var t = this._listeners[e.type];
        if (void 0 !== t) {
          e.target = this;
          for (var i = 0, r = t.length; i < r; i++) t[i].call(this, e);
        }
      }
    },
  }),
  (function (e) {
    e.Raycaster = function (t, i, r, n) {
      (this.ray = new e.Ray(t, i)),
        0 < this.ray.direction.lengthSq() && this.ray.direction.normalize(),
        (this.near = r || 0),
        (this.far = n || 1 / 0);
    };
    var t = new e.Sphere(),
      i = new e.Ray(),
      r = new e.Plane(),
      n = new e.Vector3(),
      o = new e.Vector3(),
      a = new e.Matrix4(),
      s = function (e, t) {
        return e.distance - t.distance;
      },
      h = function (s, l, c) {
        if (s instanceof e.Particle) {
          o.getPositionFromMatrix(s.matrixWorld);
          var p = l.ray.distanceToPoint(o);
          if (p > s.scale.x) return c;
          c.push({ distance: p, point: s.position, face: null, object: s });
        } else if (s instanceof e.LOD)
          o.getPositionFromMatrix(s.matrixWorld),
            (p = l.ray.origin.distanceTo(o)),
            h(s.getObjectForDistance(p), l, c);
        else if (s instanceof e.Mesh) {
          if (
            (o.getPositionFromMatrix(s.matrixWorld),
            t.set(
              o,
              s.geometry.boundingSphere.radius *
                s.matrixWorld.getMaxScaleOnAxis()
            ),
            !l.ray.isIntersectionSphere(t))
          )
            return c;
          var u,
            E,
            f,
            p = s.geometry,
            d = p.vertices,
            m = s.material instanceof e.MeshFaceMaterial,
            g = !0 === m ? s.material.materials : null,
            T = s.material.side,
            v = l.precision;
          a.getInverse(s.matrixWorld), i.copy(l.ray).applyMatrix4(a);
          for (var $ = 0, y = p.faces.length; $ < y; $++) {
            var R = p.faces[$],
              T = !0 === m ? g[R.materialIndex] : s.material;
            if (void 0 !== T) {
              r.setFromNormalAndCoplanarPoint(R.normal, d[R.a]);
              var x = i.distanceToPlane(r);
              if (!(Math.abs(x) < v) && !(0 > x)) {
                if (
                  (T = T.side) !== e.DoubleSide &&
                  ((u = i.direction.dot(r.normal)),
                  !(T === e.FrontSide ? 0 > u : 0 < u))
                )
                  continue;
                if (!(x < l.near || x > l.far)) {
                  if (((n = i.at(x, n)), R instanceof e.Face3)) {
                    if (
                      ((T = d[R.a]),
                      (u = d[R.b]),
                      (E = d[R.c]),
                      !e.Triangle.containsPoint(n, T, u, E))
                    )
                      continue;
                  } else if (R instanceof e.Face4) {
                    if (
                      ((T = d[R.a]),
                      (u = d[R.b]),
                      (E = d[R.c]),
                      (f = d[R.d]),
                      !e.Triangle.containsPoint(n, T, u, f) &&
                        !e.Triangle.containsPoint(n, u, E, f))
                    )
                      continue;
                  } else throw Error("face type not supported");
                  c.push({
                    distance: x,
                    point: l.ray.at(x),
                    face: R,
                    faceIndex: $,
                    object: s,
                  });
                }
              }
            }
          }
        }
      },
      l = function (e, t, i) {
        for (var e = e.getDescendants(), r = 0, n = e.length; r < n; r++)
          h(e[r], t, i);
      };
    (e.Raycaster.prototype.precision = 1e-4),
      (e.Raycaster.prototype.set = function (e, t) {
        this.ray.set(e, t),
          0 < this.ray.direction.length() && this.ray.direction.normalize();
      }),
      (e.Raycaster.prototype.intersectObject = function (e, t) {
        var i = [];
        return !0 === t && l(e, this, i), h(e, this, i), i.sort(s), i;
      }),
      (e.Raycaster.prototype.intersectObjects = function (e, t) {
        for (var i = [], r = 0, n = e.length; r < n; r++)
          h(e[r], this, i), !0 === t && l(e[r], this, i);
        return i.sort(s), i;
      });
  })(THREE),
  (THREE.Object3D = function () {
    (this.id = THREE.Object3DIdCount++),
      (this.name = ""),
      (this.parent = void 0),
      (this.children = []),
      (this.up = new THREE.Vector3(0, 1, 0)),
      (this.position = new THREE.Vector3()),
      (this.rotation = new THREE.Vector3()),
      (this.eulerOrder = THREE.Object3D.defaultEulerOrder),
      (this.scale = new THREE.Vector3(1, 1, 1)),
      (this.renderDepth = null),
      (this.rotationAutoUpdate = !0),
      (this.matrix = new THREE.Matrix4()),
      (this.matrixWorld = new THREE.Matrix4()),
      (this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0),
      (this.quaternion = new THREE.Quaternion()),
      (this.useQuaternion = !1),
      (this.visible = !0),
      (this.receiveShadow = this.castShadow = !1),
      (this.frustumCulled = !0),
      (this.userData = {});
  }),
  (THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: (function () {
      var e = new THREE.Matrix4();
      return function (t) {
        this.matrix.multiplyMatrices(t, this.matrix),
          this.position.getPositionFromMatrix(this.matrix),
          this.scale.getScaleFromMatrix(this.matrix),
          e.extractRotation(this.matrix),
          !0 === this.useQuaternion
            ? this.quaternion.setFromRotationMatrix(e)
            : this.rotation.setEulerFromRotationMatrix(e, this.eulerOrder);
      };
    })(),
    rotateOnAxis: (function () {
      var e = new THREE.Quaternion(),
        t = new THREE.Quaternion();
      return function (i, r) {
        return (
          e.setFromAxisAngle(i, r),
          !0 === this.useQuaternion
            ? this.quaternion.multiply(e)
            : (t.setFromEuler(this.rotation, this.eulerOrder),
              t.multiply(e),
              this.rotation.setEulerFromQuaternion(t, this.eulerOrder)),
          this
        );
      };
    })(),
    translateOnAxis: (function () {
      var e = new THREE.Vector3();
      return function (t, i) {
        return (
          e.copy(t),
          !0 === this.useQuaternion
            ? e.applyQuaternion(this.quaternion)
            : e.applyEuler(this.rotation, this.eulerOrder),
          this.position.add(e.multiplyScalar(i)),
          this
        );
      };
    })(),
    translate: function (e, t) {
      return (
        console.warn(
          "DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed."
        ),
        this.translateOnAxis(t, e)
      );
    },
    translateX: (function () {
      var e = new THREE.Vector3(1, 0, 0);
      return function (t) {
        return this.translateOnAxis(e, t);
      };
    })(),
    translateY: (function () {
      var e = new THREE.Vector3(0, 1, 0);
      return function (t) {
        return this.translateOnAxis(e, t);
      };
    })(),
    translateZ: (function () {
      var e = new THREE.Vector3(0, 0, 1);
      return function (t) {
        return this.translateOnAxis(e, t);
      };
    })(),
    localToWorld: function (e) {
      return e.applyMatrix4(this.matrixWorld);
    },
    worldToLocal: (function () {
      var e = new THREE.Matrix4();
      return function (t) {
        return t.applyMatrix4(e.getInverse(this.matrixWorld));
      };
    })(),
    lookAt: (function () {
      var e = new THREE.Matrix4();
      return function (t) {
        e.lookAt(t, this.position, this.up),
          !0 === this.useQuaternion
            ? this.quaternion.setFromRotationMatrix(e)
            : this.rotation.setEulerFromRotationMatrix(e, this.eulerOrder);
      };
    })(),
    add: function (e) {
      if (e === this)
        console.warn(
          "THREE.Object3D.add: An object can't be added as a child of itself."
        );
      else if (e instanceof THREE.Object3D) {
        void 0 !== e.parent && e.parent.remove(e),
          (e.parent = this),
          this.children.push(e);
        for (var t = this; void 0 !== t.parent; ) t = t.parent;
        void 0 !== t && t instanceof THREE.Scene && t.__addObject(e);
      }
    },
    remove: function (e) {
      var t = this.children.indexOf(e);
      if (-1 !== t) {
        for (
          e.parent = void 0, this.children.splice(t, 1), t = this;
          void 0 !== t.parent;

        )
          t = t.parent;
        void 0 !== t && t instanceof THREE.Scene && t.__removeObject(e);
      }
    },
    traverse: function (e) {
      e(this);
      for (var t = 0, i = this.children.length; t < i; t++)
        this.children[t].traverse(e);
    },
    getObjectById: function (e, t) {
      for (var i = 0, r = this.children.length; i < r; i++) {
        var n = this.children[i];
        if (n.id === e || (!0 === t && void 0 !== (n = n.getObjectById(e, t))))
          return n;
      }
    },
    getObjectByName: function (e, t) {
      for (var i = 0, r = this.children.length; i < r; i++) {
        var n = this.children[i];
        if (
          n.name === e ||
          (!0 === t && void 0 !== (n = n.getObjectByName(e, t)))
        )
          return n;
      }
    },
    getChildByName: function (e, t) {
      return (
        console.warn(
          "DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName()."
        ),
        this.getObjectByName(e, t)
      );
    },
    getDescendants: function (e) {
      void 0 === e && (e = []), Array.prototype.push.apply(e, this.children);
      for (var t = 0, i = this.children.length; t < i; t++)
        this.children[t].getDescendants(e);
      return e;
    },
    updateMatrix: function () {
      !1 === this.useQuaternion
        ? this.matrix.makeFromPositionEulerScale(
            this.position,
            this.rotation,
            this.eulerOrder,
            this.scale
          )
        : this.matrix.makeFromPositionQuaternionScale(
            this.position,
            this.quaternion,
            this.scale
          ),
        (this.matrixWorldNeedsUpdate = !0);
    },
    updateMatrixWorld: function (e) {
      !0 === this.matrixAutoUpdate && this.updateMatrix(),
        (!0 === this.matrixWorldNeedsUpdate || !0 === e) &&
          (void 0 === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              ),
          (this.matrixWorldNeedsUpdate = !1),
          (e = !0));
      for (var t = 0, i = this.children.length; t < i; t++)
        this.children[t].updateMatrixWorld(e);
    },
    clone: function (e) {
      void 0 === e && (e = new THREE.Object3D()),
        (e.name = this.name),
        e.up.copy(this.up),
        e.position.copy(this.position),
        e.rotation instanceof THREE.Vector3 && e.rotation.copy(this.rotation),
        (e.eulerOrder = this.eulerOrder),
        e.scale.copy(this.scale),
        (e.renderDepth = this.renderDepth),
        (e.rotationAutoUpdate = this.rotationAutoUpdate),
        e.matrix.copy(this.matrix),
        e.matrixWorld.copy(this.matrixWorld),
        (e.matrixAutoUpdate = this.matrixAutoUpdate),
        (e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate),
        e.quaternion.copy(this.quaternion),
        (e.useQuaternion = this.useQuaternion),
        (e.visible = this.visible),
        (e.castShadow = this.castShadow),
        (e.receiveShadow = this.receiveShadow),
        (e.frustumCulled = this.frustumCulled),
        (e.userData = JSON.parse(JSON.stringify(this.userData)));
      for (var t = 0; t < this.children.length; t++)
        e.add(this.children[t].clone());
      return e;
    },
  }),
  (THREE.Object3D.defaultEulerOrder = "XYZ"),
  (THREE.Object3DIdCount = 0),
  (THREE.Projector = function () {
    function e() {
      if (o === g) {
        var e = new THREE.RenderableObject();
        return m.push(e), g++, o++, e;
      }
      return m[o++];
    }
    function t() {
      if (s === v) {
        var e = new THREE.RenderableVertex();
        return T.push(e), v++, s++, e;
      }
      return T[s++];
    }
    function i(e, t) {
      return t.z - e.z;
    }
    function r(e, t) {
      var i = 0,
        r = 1,
        n = e.z + e.w,
        o = t.z + t.w,
        a = -e.z + e.w,
        s = -t.z + t.w;
      return (
        (0 <= n && 0 <= o && 0 <= a && 0 <= s) ||
        ((!(0 > n) || !(0 > o)) &&
          (!(0 > a) || !(0 > s)) &&
          (0 > n
            ? (i = Math.max(i, n / (n - o)))
            : 0 > o && (r = Math.min(r, n / (n - o))),
          0 > a
            ? (i = Math.max(i, a / (a - s)))
            : 0 > s && (r = Math.min(r, a / (a - s))),
          !(r < i) && (e.lerp(t, i), t.lerp(e, 1 - r), !0)))
      );
    }
    var n,
      o,
      a,
      s,
      h,
      l,
      c,
      p,
      u,
      E,
      f,
      d,
      m = [],
      g = 0,
      T = [],
      v = 0,
      $ = [],
      y = 0,
      R = [],
      x = 0,
      H = [],
      _ = 0,
      w = [],
      S = 0,
      b = { objects: [], sprites: [], lights: [], elements: [] },
      M = new THREE.Vector3(),
      C = new THREE.Vector4(),
      A = new THREE.Box3(
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, 1, 1)
      ),
      L = new THREE.Box3(),
      P = [, , ,],
      D = [, , , ,],
      F = new THREE.Matrix4(),
      U = new THREE.Matrix4(),
      V = new THREE.Matrix4(),
      z = new THREE.Matrix3(),
      N = new THREE.Matrix3(),
      B = new THREE.Vector3(),
      I = new THREE.Frustum(),
      O = new THREE.Vector4(),
      k = new THREE.Vector4();
    (this.projectVector = function (e, t) {
      return (
        t.matrixWorldInverse.getInverse(t.matrixWorld),
        U.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
        e.applyProjection(U)
      );
    }),
      (this.unprojectVector = function (e, t) {
        return (
          t.projectionMatrixInverse.getInverse(t.projectionMatrix),
          U.multiplyMatrices(t.matrixWorld, t.projectionMatrixInverse),
          e.applyProjection(U)
        );
      }),
      (this.pickingRay = function (e, t) {
        e.z = -1;
        var i = new THREE.Vector3(e.x, e.y, 1);
        return (
          this.unprojectVector(e, t),
          this.unprojectVector(i, t),
          i.sub(e).normalize(),
          new THREE.Raycaster(e, i)
        );
      }),
      (this.projectScene = function (m, g, v, G) {
        var W,
          j,
          X,
          Y,
          q,
          K,
          Q,
          Z,
          J,
          ee,
          et,
          ei,
          er,
          en = !1;
        (f = u = c = l = 0),
          (b.elements.length = 0),
          !0 === m.autoUpdate && m.updateMatrixWorld(),
          void 0 === g.parent && g.updateMatrixWorld(),
          F.copy(g.matrixWorldInverse.getInverse(g.matrixWorld)),
          U.multiplyMatrices(g.projectionMatrix, F),
          N.getNormalMatrix(F),
          I.setFromMatrix(U),
          (o = 0),
          (b.objects.length = 0),
          (b.sprites.length = 0),
          (b.lights.length = 0);
        var eo = function (t) {
          for (var i = 0, r = t.children.length; i < r; i++) {
            var o = t.children[i];
            !1 !== o.visible &&
              (o instanceof THREE.Light
                ? b.lights.push(o)
                : o instanceof THREE.Mesh || o instanceof THREE.Line
                ? (!1 === o.frustumCulled || !0 === I.intersectsObject(o)) &&
                  (((n = e()).object = o),
                  null !== o.renderDepth
                    ? (n.z = o.renderDepth)
                    : (M.getPositionFromMatrix(o.matrixWorld),
                      M.applyProjection(U),
                      (n.z = M.z)),
                  b.objects.push(n))
                : o instanceof THREE.Sprite || o instanceof THREE.Particle
                ? (((n = e()).object = o),
                  null !== o.renderDepth
                    ? (n.z = o.renderDepth)
                    : (M.getPositionFromMatrix(o.matrixWorld),
                      M.applyProjection(U),
                      (n.z = M.z)),
                  b.sprites.push(n))
                : (((n = e()).object = o),
                  null !== o.renderDepth
                    ? (n.z = o.renderDepth)
                    : (M.getPositionFromMatrix(o.matrixWorld),
                      M.applyProjection(U),
                      (n.z = M.z)),
                  b.objects.push(n)),
              eo(o));
          }
        };
        for (
          eo(m), !0 === v && b.objects.sort(i), m = 0, v = b.objects.length;
          m < v;
          m++
        )
          if (
            ((d = (Z = b.objects[m].object).matrixWorld),
            (s = 0),
            Z instanceof THREE.Mesh)
          ) {
            for (
              X = (J = Z.geometry).vertices,
                ee = J.faces,
                J = J.faceVertexUvs,
                z.getNormalMatrix(d),
                er =
                  !0 == (ei = Z.material instanceof THREE.MeshFaceMaterial)
                    ? Z.material
                    : null,
                W = 0,
                j = X.length;
              W < j;
              W++
            )
              (a = t()).positionWorld.copy(X[W]).applyMatrix4(d),
                a.positionScreen.copy(a.positionWorld).applyMatrix4(U),
                (a.positionScreen.x /= a.positionScreen.w),
                (a.positionScreen.y /= a.positionScreen.w),
                (a.positionScreen.z /= a.positionScreen.w),
                (a.visible = !(
                  -1 > a.positionScreen.x ||
                  1 < a.positionScreen.x ||
                  -1 > a.positionScreen.y ||
                  1 < a.positionScreen.y ||
                  -1 > a.positionScreen.z ||
                  1 < a.positionScreen.z
                ));
            for (X = 0, W = ee.length; X < W; X++) {
              j = ee[X];
              var ea = !0 === ei ? er.materials[j.materialIndex] : Z.material;
              if (void 0 !== ea) {
                if (((K = ea.side), j instanceof THREE.Face3)) {
                  if (
                    ((Y = T[j.a]),
                    (q = T[j.b]),
                    (Q = T[j.c]),
                    (P[0] = Y.positionScreen),
                    (P[1] = q.positionScreen),
                    (P[2] = Q.positionScreen),
                    !(
                      !0 === Y.visible ||
                      !0 === q.visible ||
                      !0 === Q.visible ||
                      A.isIntersectionBox(L.setFromPoints(P))
                    ))
                  )
                    continue;
                  if (
                    ((en =
                      0 >
                      (Q.positionScreen.x - Y.positionScreen.x) *
                        (q.positionScreen.y - Y.positionScreen.y) -
                        (Q.positionScreen.y - Y.positionScreen.y) *
                          (q.positionScreen.x - Y.positionScreen.x)),
                    K !== THREE.DoubleSide && en !== (K === THREE.FrontSide))
                  )
                    continue;
                  l === y
                    ? ((et = new THREE.RenderableFace3()),
                      $.push(et),
                      y++,
                      l++,
                      (h = et))
                    : (h = $[l++]),
                    h.v1.copy(Y),
                    h.v2.copy(q),
                    h.v3.copy(Q);
                } else if (j instanceof THREE.Face4) {
                  if (
                    ((Y = T[j.a]),
                    (q = T[j.b]),
                    (Q = T[j.c]),
                    (et = T[j.d]),
                    (D[0] = Y.positionScreen),
                    (D[1] = q.positionScreen),
                    (D[2] = Q.positionScreen),
                    (D[3] = et.positionScreen),
                    !(
                      !0 === Y.visible ||
                      !0 === q.visible ||
                      !0 === Q.visible ||
                      !0 === et.visible ||
                      A.isIntersectionBox(L.setFromPoints(D))
                    ))
                  )
                    continue;
                  if (
                    ((en =
                      0 >
                        (et.positionScreen.x - Y.positionScreen.x) *
                          (q.positionScreen.y - Y.positionScreen.y) -
                          (et.positionScreen.y - Y.positionScreen.y) *
                            (q.positionScreen.x - Y.positionScreen.x) ||
                      0 >
                        (q.positionScreen.x - Q.positionScreen.x) *
                          (et.positionScreen.y - Q.positionScreen.y) -
                          (q.positionScreen.y - Q.positionScreen.y) *
                            (et.positionScreen.x - Q.positionScreen.x)),
                    K !== THREE.DoubleSide && en !== (K === THREE.FrontSide))
                  )
                    continue;
                  if (c === x) {
                    var es = new THREE.RenderableFace4();
                    R.push(es), x++, c++, (h = es);
                  } else h = R[c++];
                  h.v1.copy(Y), h.v2.copy(q), h.v3.copy(Q), h.v4.copy(et);
                }
                for (
                  h.normalModel.copy(j.normal),
                    !1 === en &&
                      (K === THREE.BackSide || K === THREE.DoubleSide) &&
                      h.normalModel.negate(),
                    h.normalModel.applyMatrix3(z).normalize(),
                    h.normalModelView.copy(h.normalModel).applyMatrix3(N),
                    h.centroidModel.copy(j.centroid).applyMatrix4(d),
                    Q = j.vertexNormals,
                    Y = 0,
                    q = Q.length;
                  Y < q;
                  Y++
                )
                  (et = h.vertexNormalsModel[Y]).copy(Q[Y]),
                    !1 === en &&
                      (K === THREE.BackSide || K === THREE.DoubleSide) &&
                      et.negate(),
                    et.applyMatrix3(z).normalize(),
                    h.vertexNormalsModelView[Y].copy(et).applyMatrix3(N);
                for (
                  h.vertexNormalsLength = Q.length, Y = 0, q = J.length;
                  Y < q;
                  Y++
                )
                  if (void 0 !== (et = J[Y][X]))
                    for (K = 0, Q = et.length; K < Q; K++) h.uvs[Y][K] = et[K];
                (h.color = j.color),
                  (h.material = ea),
                  B.copy(h.centroidModel).applyProjection(U),
                  (h.z = B.z),
                  b.elements.push(h);
              }
            }
          } else if (Z instanceof THREE.Line)
            for (
              V.multiplyMatrices(U, d),
                X = Z.geometry.vertices,
                (Y = t()).positionScreen.copy(X[0]).applyMatrix4(V),
                ee = Z.type === THREE.LinePieces ? 2 : 1,
                W = 1,
                j = X.length;
              W < j;
              W++
            )
              (Y = t()).positionScreen.copy(X[W]).applyMatrix4(V),
                0 < (W + 1) % ee ||
                  ((q = T[s - 2]),
                  O.copy(Y.positionScreen),
                  k.copy(q.positionScreen),
                  !0 === r(O, k) &&
                    (O.multiplyScalar(1 / O.w),
                    k.multiplyScalar(1 / k.w),
                    u === _
                      ? ((J = new THREE.RenderableLine()),
                        H.push(J),
                        _++,
                        u++,
                        (p = J))
                      : (p = H[u++]),
                    p.v1.positionScreen.copy(O),
                    p.v2.positionScreen.copy(k),
                    (p.z = Math.max(O.z, k.z)),
                    (p.material = Z.material),
                    Z.material.vertexColors === THREE.VertexColors &&
                      (p.vertexColors[0].copy(Z.geometry.colors[W]),
                      p.vertexColors[1].copy(Z.geometry.colors[W - 1])),
                    b.elements.push(p)));
        for (m = 0, v = b.sprites.length; m < v; m++)
          (d = (Z = b.sprites[m].object).matrixWorld),
            Z instanceof THREE.Particle &&
              (C.set(d.elements[12], d.elements[13], d.elements[14], 1),
              C.applyMatrix4(U),
              (C.z /= C.w),
              0 < C.z &&
                1 > C.z &&
                (f === S
                  ? ((en = new THREE.RenderableParticle()),
                    w.push(en),
                    S++,
                    f++,
                    (E = en))
                  : (E = w[f++]),
                (E.object = Z),
                (E.x = C.x / C.w),
                (E.y = C.y / C.w),
                (E.z = C.z),
                (E.rotation = Z.rotation.z),
                (E.scale.x =
                  Z.scale.x *
                  Math.abs(
                    E.x -
                      (C.x + g.projectionMatrix.elements[0]) /
                        (C.w + g.projectionMatrix.elements[12])
                  )),
                (E.scale.y =
                  Z.scale.y *
                  Math.abs(
                    E.y -
                      (C.y + g.projectionMatrix.elements[5]) /
                        (C.w + g.projectionMatrix.elements[13])
                  )),
                (E.material = Z.material),
                b.elements.push(E)));
        return !0 === G && b.elements.sort(i), b;
      });
  }),
  (THREE.Face3 = function (e, t, i, r, n, o) {
    (this.a = e),
      (this.b = t),
      (this.c = i),
      (this.normal = r instanceof THREE.Vector3 ? r : new THREE.Vector3()),
      (this.vertexNormals = r instanceof Array ? r : []),
      (this.color = n instanceof THREE.Color ? n : new THREE.Color()),
      (this.vertexColors = n instanceof Array ? n : []),
      (this.vertexTangents = []),
      (this.materialIndex = void 0 !== o ? o : 0),
      (this.centroid = new THREE.Vector3());
  }),
  (THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
      var e,
        t,
        i = new THREE.Face3(this.a, this.b, this.c);
      for (
        i.normal.copy(this.normal),
          i.color.copy(this.color),
          i.centroid.copy(this.centroid),
          i.materialIndex = this.materialIndex,
          e = 0,
          t = this.vertexNormals.length;
        e < t;
        e++
      )
        i.vertexNormals[e] = this.vertexNormals[e].clone();
      for (e = 0, t = this.vertexColors.length; e < t; e++)
        i.vertexColors[e] = this.vertexColors[e].clone();
      for (e = 0, t = this.vertexTangents.length; e < t; e++)
        i.vertexTangents[e] = this.vertexTangents[e].clone();
      return i;
    },
  }),
  (THREE.Face4 = function (e, t, i, r, n, o, a) {
    (this.a = e),
      (this.b = t),
      (this.c = i),
      (this.d = r),
      (this.normal = n instanceof THREE.Vector3 ? n : new THREE.Vector3()),
      (this.vertexNormals = n instanceof Array ? n : []),
      (this.color = o instanceof THREE.Color ? o : new THREE.Color()),
      (this.vertexColors = o instanceof Array ? o : []),
      (this.vertexTangents = []),
      (this.materialIndex = void 0 !== a ? a : 0),
      (this.centroid = new THREE.Vector3());
  }),
  (THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
      var e,
        t,
        i = new THREE.Face4(this.a, this.b, this.c, this.d);
      for (
        i.normal.copy(this.normal),
          i.color.copy(this.color),
          i.centroid.copy(this.centroid),
          i.materialIndex = this.materialIndex,
          e = 0,
          t = this.vertexNormals.length;
        e < t;
        e++
      )
        i.vertexNormals[e] = this.vertexNormals[e].clone();
      for (e = 0, t = this.vertexColors.length; e < t; e++)
        i.vertexColors[e] = this.vertexColors[e].clone();
      for (e = 0, t = this.vertexTangents.length; e < t; e++)
        i.vertexTangents[e] = this.vertexTangents[e].clone();
      return i;
    },
  }),
  (THREE.Geometry = function () {
    (this.id = THREE.GeometryIdCount++),
      (this.name = ""),
      (this.vertices = []),
      (this.colors = []),
      (this.normals = []),
      (this.faces = []),
      (this.faceUvs = [[]]),
      (this.faceVertexUvs = [[]]),
      (this.morphTargets = []),
      (this.morphColors = []),
      (this.morphNormals = []),
      (this.skinWeights = []),
      (this.skinIndices = []),
      (this.lineDistances = []),
      (this.boundingSphere = this.boundingBox = null),
      (this.hasTangents = !1),
      (this.dynamic = !0),
      (this.buffersNeedUpdate =
        this.lineDistancesNeedUpdate =
        this.colorsNeedUpdate =
        this.tangentsNeedUpdate =
        this.normalsNeedUpdate =
        this.uvsNeedUpdate =
        this.elementsNeedUpdate =
        this.verticesNeedUpdate =
          !1);
  }),
  (THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    applyMatrix: function (e) {
      for (
        var t = new THREE.Matrix3().getNormalMatrix(e),
          i = 0,
          r = this.vertices.length;
        i < r;
        i++
      )
        this.vertices[i].applyMatrix4(e);
      for (i = 0, r = this.faces.length; i < r; i++) {
        var n = this.faces[i];
        n.normal.applyMatrix3(t).normalize();
        for (var o = 0, a = n.vertexNormals.length; o < a; o++)
          n.vertexNormals[o].applyMatrix3(t).normalize();
        n.centroid.applyMatrix4(e);
      }
    },
    computeCentroids: function () {
      var e, t, i;
      for (e = 0, t = this.faces.length; e < t; e++)
        (i = this.faces[e]).centroid.set(0, 0, 0),
          i instanceof THREE.Face3
            ? (i.centroid.add(this.vertices[i.a]),
              i.centroid.add(this.vertices[i.b]),
              i.centroid.add(this.vertices[i.c]),
              i.centroid.divideScalar(3))
            : i instanceof THREE.Face4 &&
              (i.centroid.add(this.vertices[i.a]),
              i.centroid.add(this.vertices[i.b]),
              i.centroid.add(this.vertices[i.c]),
              i.centroid.add(this.vertices[i.d]),
              i.centroid.divideScalar(4));
    },
    computeFaceNormals: function () {
      for (
        var e = new THREE.Vector3(),
          t = new THREE.Vector3(),
          i = 0,
          r = this.faces.length;
        i < r;
        i++
      ) {
        var n = this.faces[i],
          o = this.vertices[n.a],
          a = this.vertices[n.b];
        e.subVectors(this.vertices[n.c], a),
          t.subVectors(o, a),
          e.cross(t),
          e.normalize(),
          n.normal.copy(e);
      }
    },
    computeVertexNormals: function (e) {
      var t, i, r, n;
      if (void 0 === this.__tmpVertices) {
        for (
          n = this.__tmpVertices = Array(this.vertices.length),
            t = 0,
            i = this.vertices.length;
          t < i;
          t++
        )
          n[t] = new THREE.Vector3();
        for (t = 0, i = this.faces.length; t < i; t++)
          (r = this.faces[t]) instanceof THREE.Face3
            ? (r.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ])
            : r instanceof THREE.Face4 &&
              (r.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ]);
      } else
        for (
          n = this.__tmpVertices, t = 0, i = this.vertices.length;
          t < i;
          t++
        )
          n[t].set(0, 0, 0);
      if (e) {
        var o,
          a,
          s,
          h = new THREE.Vector3(),
          l = new THREE.Vector3(),
          c = new THREE.Vector3(),
          p = new THREE.Vector3(),
          u = new THREE.Vector3();
        for (t = 0, i = this.faces.length; t < i; t++)
          (r = this.faces[t]) instanceof THREE.Face3
            ? ((e = this.vertices[r.a]),
              (o = this.vertices[r.b]),
              (a = this.vertices[r.c]),
              h.subVectors(a, o),
              l.subVectors(e, o),
              h.cross(l),
              n[r.a].add(h),
              n[r.b].add(h),
              n[r.c].add(h))
            : r instanceof THREE.Face4 &&
              ((e = this.vertices[r.a]),
              (o = this.vertices[r.b]),
              (a = this.vertices[r.c]),
              (s = this.vertices[r.d]),
              c.subVectors(s, o),
              l.subVectors(e, o),
              c.cross(l),
              n[r.a].add(c),
              n[r.b].add(c),
              n[r.d].add(c),
              p.subVectors(s, a),
              u.subVectors(o, a),
              p.cross(u),
              n[r.b].add(p),
              n[r.c].add(p),
              n[r.d].add(p));
      } else
        for (t = 0, i = this.faces.length; t < i; t++)
          (r = this.faces[t]) instanceof THREE.Face3
            ? (n[r.a].add(r.normal), n[r.b].add(r.normal), n[r.c].add(r.normal))
            : r instanceof THREE.Face4 &&
              (n[r.a].add(r.normal),
              n[r.b].add(r.normal),
              n[r.c].add(r.normal),
              n[r.d].add(r.normal));
      for (t = 0, i = this.vertices.length; t < i; t++) n[t].normalize();
      for (t = 0, i = this.faces.length; t < i; t++)
        (r = this.faces[t]) instanceof THREE.Face3
          ? (r.vertexNormals[0].copy(n[r.a]),
            r.vertexNormals[1].copy(n[r.b]),
            r.vertexNormals[2].copy(n[r.c]))
          : r instanceof THREE.Face4 &&
            (r.vertexNormals[0].copy(n[r.a]),
            r.vertexNormals[1].copy(n[r.b]),
            r.vertexNormals[2].copy(n[r.c]),
            r.vertexNormals[3].copy(n[r.d]));
    },
    computeMorphNormals: function () {
      for (r = 0, n = this.faces.length; r < n; r++)
        for (
          (o = this.faces[r]).__originalFaceNormal
            ? o.__originalFaceNormal.copy(o.normal)
            : (o.__originalFaceNormal = o.normal.clone()),
            o.__originalVertexNormals || (o.__originalVertexNormals = []),
            t = 0,
            i = o.vertexNormals.length;
          t < i;
          t++
        )
          o.__originalVertexNormals[t]
            ? o.__originalVertexNormals[t].copy(o.vertexNormals[t])
            : (o.__originalVertexNormals[t] = o.vertexNormals[t].clone());
      var e = new THREE.Geometry();
      for (
        e.faces = this.faces, t = 0, i = this.morphTargets.length;
        t < i;
        t++
      ) {
        if (!this.morphNormals[t]) {
          (this.morphNormals[t] = {}),
            (this.morphNormals[t].faceNormals = []),
            (this.morphNormals[t].vertexNormals = []);
          var t,
            i,
            r,
            n,
            o,
            a,
            s,
            h = this.morphNormals[t].faceNormals,
            l = this.morphNormals[t].vertexNormals;
          for (r = 0, n = this.faces.length; r < n; r++)
            (o = this.faces[r]),
              (a = new THREE.Vector3()),
              (s =
                o instanceof THREE.Face3
                  ? {
                      a: new THREE.Vector3(),
                      b: new THREE.Vector3(),
                      c: new THREE.Vector3(),
                    }
                  : {
                      a: new THREE.Vector3(),
                      b: new THREE.Vector3(),
                      c: new THREE.Vector3(),
                      d: new THREE.Vector3(),
                    }),
              h.push(a),
              l.push(s);
        }
        for (
          h = this.morphNormals[t],
            e.vertices = this.morphTargets[t].vertices,
            e.computeFaceNormals(),
            e.computeVertexNormals(),
            r = 0,
            n = this.faces.length;
          r < n;
          r++
        )
          (o = this.faces[r]),
            (a = h.faceNormals[r]),
            (s = h.vertexNormals[r]),
            a.copy(o.normal),
            o instanceof THREE.Face3
              ? (s.a.copy(o.vertexNormals[0]),
                s.b.copy(o.vertexNormals[1]),
                s.c.copy(o.vertexNormals[2]))
              : (s.a.copy(o.vertexNormals[0]),
                s.b.copy(o.vertexNormals[1]),
                s.c.copy(o.vertexNormals[2]),
                s.d.copy(o.vertexNormals[3]));
      }
      for (r = 0, n = this.faces.length; r < n; r++)
        ((o = this.faces[r]).normal = o.__originalFaceNormal),
          (o.vertexNormals = o.__originalVertexNormals);
    },
    computeTangents: function () {
      function e(e, t, i, r, n, o, H) {
        (s = e.vertices[t]),
          (h = e.vertices[i]),
          (l = e.vertices[r]),
          (c = a[n]),
          (p = a[o]),
          (u = a[H]),
          (E = h.x - s.x),
          (f = l.x - s.x),
          (d = h.y - s.y),
          (m = l.y - s.y),
          (g = h.z - s.z),
          (T = l.z - s.z),
          (v = p.x - c.x),
          ($ = u.x - c.x),
          (y = p.y - c.y),
          (x = 1 / (v * (R = u.y - c.y) - $ * y)),
          S.set((R * E - y * f) * x, (R * d - y * m) * x, (R * g - y * T) * x),
          b.set((v * f - $ * E) * x, (v * m - $ * d) * x, (v * T - $ * g) * x),
          _[t].add(S),
          _[i].add(S),
          _[r].add(S),
          w[t].add(b),
          w[i].add(b),
          w[r].add(b);
      }
      var t,
        i,
        r,
        n,
        o,
        a,
        s,
        h,
        l,
        c,
        p,
        u,
        E,
        f,
        d,
        m,
        g,
        T,
        v,
        $,
        y,
        R,
        x,
        H,
        _ = [],
        w = [],
        S = new THREE.Vector3(),
        b = new THREE.Vector3(),
        M = new THREE.Vector3(),
        C = new THREE.Vector3(),
        A = new THREE.Vector3();
      for (t = 0, i = this.vertices.length; t < i; t++)
        (_[t] = new THREE.Vector3()), (w[t] = new THREE.Vector3());
      for (t = 0, i = this.faces.length; t < i; t++)
        (o = this.faces[t]),
          (a = this.faceVertexUvs[0][t]),
          o instanceof THREE.Face3
            ? e(this, o.a, o.b, o.c, 0, 1, 2)
            : o instanceof THREE.Face4 &&
              (e(this, o.a, o.b, o.d, 0, 1, 3),
              e(this, o.b, o.c, o.d, 1, 2, 3));
      var L = ["a", "b", "c", "d"];
      for (t = 0, i = this.faces.length; t < i; t++)
        for (r = 0, o = this.faces[t]; r < o.vertexNormals.length; r++)
          A.copy(o.vertexNormals[r]),
            (H = _[(n = o[L[r]])]),
            M.copy(H),
            M.sub(A.multiplyScalar(A.dot(H))).normalize(),
            C.crossVectors(o.vertexNormals[r], H),
            (n = 0 > (n = C.dot(w[n])) ? -1 : 1),
            (o.vertexTangents[r] = new THREE.Vector4(M.x, M.y, M.z, n));
      this.hasTangents = !0;
    },
    computeLineDistances: function () {
      for (var e = 0, t = this.vertices, i = 0, r = t.length; i < r; i++)
        0 < i && (e += t[i].distanceTo(t[i - 1])), (this.lineDistances[i] = e);
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new THREE.Box3()),
        this.boundingBox.setFromPoints(this.vertices);
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere &&
        (this.boundingSphere = new THREE.Sphere()),
        this.boundingSphere.setFromCenterAndPoints(
          this.boundingSphere.center,
          this.vertices
        );
    },
    mergeVertices: function () {
      var e,
        t,
        i,
        r,
        n,
        o,
        a = {},
        s = [],
        h = [],
        l = 1e4;
      for (
        this.__tmpVertices = void 0, t = 0, i = this.vertices.length;
        t < i;
        t++
      )
        void 0 ===
        a[
          (e = [
            Math.round((e = this.vertices[t]).x * l),
            Math.round(e.y * l),
            Math.round(e.z * l),
          ].join("_"))
        ]
          ? ((a[e] = t), s.push(this.vertices[t]), (h[t] = s.length - 1))
          : (h[t] = h[a[e]]);
      for (l = [], t = 0, i = this.faces.length; t < i; t++)
        if ((a = this.faces[t]) instanceof THREE.Face3) {
          for (
            n = 0,
              a.a = h[a.a],
              a.b = h[a.b],
              a.c = h[a.c],
              r = [a.a, a.b, a.c],
              e = -1;
            3 > n;
            n++
          )
            if (r[n] == r[(n + 1) % 3]) {
              l.push(t);
              break;
            }
        } else if (a instanceof THREE.Face4) {
          for (
            n = 0,
              a.a = h[a.a],
              a.b = h[a.b],
              a.c = h[a.c],
              a.d = h[a.d],
              r = [a.a, a.b, a.c, a.d],
              e = -1;
            4 > n;
            n++
          )
            r[n] == r[(n + 1) % 4] && (0 <= e && l.push(t), (e = n));
          if (0 <= e) {
            r.splice(e, 1);
            var c = new THREE.Face3(
              r[0],
              r[1],
              r[2],
              a.normal,
              a.color,
              a.materialIndex
            );
            for (r = 0, n = this.faceVertexUvs.length; r < n; r++)
              (o = this.faceVertexUvs[r][t]) && o.splice(e, 1);
            a.vertexNormals &&
              0 < a.vertexNormals.length &&
              ((c.vertexNormals = a.vertexNormals),
              c.vertexNormals.splice(e, 1)),
              a.vertexColors &&
                0 < a.vertexColors.length &&
                ((c.vertexColors = a.vertexColors),
                c.vertexColors.splice(e, 1)),
              (this.faces[t] = c);
          }
        }
      for (t = l.length - 1; 0 <= t; t--)
        for (
          this.faces.splice(t, 1), r = 0, n = this.faceVertexUvs.length;
          r < n;
          r++
        )
          this.faceVertexUvs[r].splice(t, 1);
      return (h = this.vertices.length - s.length), (this.vertices = s), h;
    },
    clone: function () {
      for (
        var e = new THREE.Geometry(), t = this.vertices, i = 0, r = t.length;
        i < r;
        i++
      )
        e.vertices.push(t[i].clone());
      for (t = this.faces, i = 0, r = t.length; i < r; i++)
        e.faces.push(t[i].clone());
      for (t = this.faceVertexUvs[0], i = 0, r = t.length; i < r; i++) {
        for (var n = t[i], o = [], a = 0, s = n.length; a < s; a++)
          o.push(new THREE.Vector2(n[a].x, n[a].y));
        e.faceVertexUvs[0].push(o);
      }
      return e;
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  }),
  (THREE.GeometryIdCount = 0),
  (THREE.BufferGeometry = function () {
    (this.id = THREE.GeometryIdCount++),
      (this.attributes = {}),
      (this.dynamic = !1),
      (this.offsets = []),
      (this.boundingSphere = this.boundingBox = null),
      (this.hasTangents = !1),
      (this.morphTargets = []);
  }),
  (THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    applyMatrix: function (e) {
      var t, i;
      this.attributes.position && (t = this.attributes.position.array),
        this.attributes.normal && (i = this.attributes.normal.array),
        void 0 !== t &&
          (e.multiplyVector3Array(t), (this.verticesNeedUpdate = !0)),
        void 0 !== i &&
          (new THREE.Matrix3().getNormalMatrix(e).multiplyVector3Array(i),
          this.normalizeNormals(),
          (this.normalsNeedUpdate = !0));
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new THREE.Box3());
      var e = this.attributes.position.array;
      if (e) {
        var t,
          i,
          r,
          n = this.boundingBox;
        3 <= e.length &&
          ((n.min.x = n.max.x = e[0]),
          (n.min.y = n.max.y = e[1]),
          (n.min.z = n.max.z = e[2]));
        for (var o = 3, a = e.length; o < a; o += 3)
          (t = e[o]),
            (i = e[o + 1]),
            (r = e[o + 2]),
            t < n.min.x ? (n.min.x = t) : t > n.max.x && (n.max.x = t),
            i < n.min.y ? (n.min.y = i) : i > n.max.y && (n.max.y = i),
            r < n.min.z ? (n.min.z = r) : r > n.max.z && (n.max.z = r);
      }
      (void 0 === e || 0 === e.length) &&
        (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0));
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere &&
        (this.boundingSphere = new THREE.Sphere());
      var e = this.attributes.position.array;
      if (e) {
        for (var t, i, r, n = 0, o = 0, a = e.length; o < a; o += 3)
          (t = e[o]),
            (t = t * t + (i = e[o + 1]) * i + (r = e[o + 2]) * r) > n &&
              (n = t);
        this.boundingSphere.radius = Math.sqrt(n);
      }
    },
    computeVertexNormals: function () {
      if (this.attributes.position) {
        if (
          ((e = this.attributes.position.array.length),
          void 0 === this.attributes.normal)
        )
          this.attributes.normal = {
            itemSize: 3,
            array: new Float32Array(e),
            numItems: e,
          };
        else
          for (e = 0, t = this.attributes.normal.array.length; e < t; e++)
            this.attributes.normal.array[e] = 0;
        var e,
          t,
          i,
          r,
          n,
          o,
          a,
          s,
          h,
          l,
          c = this.attributes.position.array,
          p = this.attributes.normal.array,
          u = new THREE.Vector3(),
          E = new THREE.Vector3(),
          f = new THREE.Vector3(),
          d = new THREE.Vector3(),
          m = new THREE.Vector3();
        if (this.attributes.index) {
          var g = this.attributes.index.array,
            T = this.offsets;
          for (i = 0, r = T.length; i < r; ++i) {
            (t = T[i].start), (n = T[i].count);
            var v = T[i].index;
            for (e = t, t += n; e < t; e += 3)
              (n = v + g[e]),
                (o = v + g[e + 1]),
                (a = v + g[e + 2]),
                (s = c[3 * n]),
                (h = c[3 * n + 1]),
                (l = c[3 * n + 2]),
                u.set(s, h, l),
                (s = c[3 * o]),
                (h = c[3 * o + 1]),
                (l = c[3 * o + 2]),
                E.set(s, h, l),
                (s = c[3 * a]),
                (h = c[3 * a + 1]),
                (l = c[3 * a + 2]),
                f.set(s, h, l),
                d.subVectors(f, E),
                m.subVectors(u, E),
                d.cross(m),
                (p[3 * n] += d.x),
                (p[3 * n + 1] += d.y),
                (p[3 * n + 2] += d.z),
                (p[3 * o] += d.x),
                (p[3 * o + 1] += d.y),
                (p[3 * o + 2] += d.z),
                (p[3 * a] += d.x),
                (p[3 * a + 1] += d.y),
                (p[3 * a + 2] += d.z);
          }
        } else
          for (e = 0, t = c.length; e < t; e += 9)
            (s = c[e]),
              (h = c[e + 1]),
              (l = c[e + 2]),
              u.set(s, h, l),
              (s = c[e + 3]),
              (h = c[e + 4]),
              (l = c[e + 5]),
              E.set(s, h, l),
              (s = c[e + 6]),
              (h = c[e + 7]),
              (l = c[e + 8]),
              f.set(s, h, l),
              d.subVectors(f, E),
              m.subVectors(u, E),
              d.cross(m),
              (p[e] = d.x),
              (p[e + 1] = d.y),
              (p[e + 2] = d.z),
              (p[e + 3] = d.x),
              (p[e + 4] = d.y),
              (p[e + 5] = d.z),
              (p[e + 6] = d.x),
              (p[e + 7] = d.y),
              (p[e + 8] = d.z);
        this.normalizeNormals(), (this.normalsNeedUpdate = !0);
      }
    },
    normalizeNormals: function () {
      for (
        var e, t, i, r = this.attributes.normal.array, n = 0, o = r.length;
        n < o;
        n += 3
      )
        (e = r[n]),
          (e = 1 / Math.sqrt(e * e + (t = r[n + 1]) * t + (i = r[n + 2]) * i)),
          (r[n] *= e),
          (r[n + 1] *= e),
          (r[n + 2] *= e);
    },
    computeTangents: function () {
      function e(e) {
        (N.x = r[3 * e]),
          (N.y = r[3 * e + 1]),
          (N.z = r[3 * e + 2]),
          B.copy(N),
          (F = h[e]),
          V.copy(F),
          V.sub(N.multiplyScalar(N.dot(F))).normalize(),
          z.crossVectors(B, F),
          (D = 0 > (U = z.dot(l[e])) ? -1 : 1),
          (s[4 * e] = V.x),
          (s[4 * e + 1] = V.y),
          (s[4 * e + 2] = V.z),
          (s[4 * e + 3] = D);
      }
      if (
        void 0 === this.attributes.index ||
        void 0 === this.attributes.position ||
        void 0 === this.attributes.normal ||
        void 0 === this.attributes.uv
      )
        console.warn(
          "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
        );
      else {
        var t = this.attributes.index.array,
          i = this.attributes.position.array,
          r = this.attributes.normal.array,
          n = this.attributes.uv.array,
          o = i.length / 3;
        if (void 0 === this.attributes.tangent) {
          var a = 4 * o;
          this.attributes.tangent = {
            itemSize: 4,
            array: new Float32Array(a),
            numItems: a,
          };
        }
        for (
          var s = this.attributes.tangent.array, h = [], l = [], a = 0;
          a < o;
          a++
        )
          (h[a] = new THREE.Vector3()), (l[a] = new THREE.Vector3());
        var c,
          p,
          u,
          E,
          f,
          d,
          m,
          g,
          T,
          v,
          $,
          y,
          R,
          x,
          H,
          _,
          w,
          S,
          b,
          M,
          C,
          A,
          o = new THREE.Vector3(),
          a = new THREE.Vector3(),
          L = this.offsets;
        for (S = 0, b = L.length; S < b; ++S) {
          (w = L[S].start), (M = L[S].count);
          var P = L[S].index;
          for (_ = w, w += M; _ < w; _ += 3)
            (M = P + t[_]),
              (C = P + t[_ + 1]),
              (A = P + t[_ + 2]),
              (c = i[3 * M]),
              (p = i[3 * M + 1]),
              (u = i[3 * M + 2]),
              (E = i[3 * C]),
              (f = i[3 * C + 1]),
              (d = i[3 * C + 2]),
              (m = i[3 * A]),
              (g = i[3 * A + 1]),
              (T = i[3 * A + 2]),
              (v = n[2 * M]),
              ($ = n[2 * M + 1]),
              (y = n[2 * C]),
              (R = n[2 * C + 1]),
              (x = n[2 * A]),
              (H = n[2 * A + 1]),
              (E -= c),
              (c = m - c),
              (f -= p),
              (p = g - p),
              (d -= u),
              (u = T - u),
              (y -= v),
              (v = x - v),
              (R -= $),
              (H = 1 / (y * ($ = H - $) - v * R)),
              o.set(
                ($ * E - R * c) * H,
                ($ * f - R * p) * H,
                ($ * d - R * u) * H
              ),
              a.set(
                (y * c - v * E) * H,
                (y * p - v * f) * H,
                (y * u - v * d) * H
              ),
              h[M].add(o),
              h[C].add(o),
              h[A].add(o),
              l[M].add(a),
              l[C].add(a),
              l[A].add(a);
        }
        var D,
          F,
          U,
          V = new THREE.Vector3(),
          z = new THREE.Vector3(),
          N = new THREE.Vector3(),
          B = new THREE.Vector3();
        for (S = 0, b = L.length; S < b; ++S)
          for (
            w = L[S].start, M = L[S].count, P = L[S].index, _ = w, w += M;
            _ < w;
            _ += 3
          )
            (M = P + t[_]),
              (C = P + t[_ + 1]),
              (A = P + t[_ + 2]),
              e(M),
              e(C),
              e(A);
        this.tangentsNeedUpdate = this.hasTangents = !0;
      }
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  }),
  (THREE.Camera = function () {
    THREE.Object3D.call(this),
      (this.matrixWorldInverse = new THREE.Matrix4()),
      (this.projectionMatrix = new THREE.Matrix4()),
      (this.projectionMatrixInverse = new THREE.Matrix4());
  }),
  (THREE.Camera.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Camera.prototype.lookAt = (function () {
    var e = new THREE.Matrix4();
    return function (t) {
      e.lookAt(this.position, t, this.up),
        !0 === this.useQuaternion
          ? this.quaternion.setFromRotationMatrix(e)
          : this.rotation.setEulerFromRotationMatrix(e, this.eulerOrder);
    };
  })()),
  (THREE.OrthographicCamera = function (e, t, i, r, n, o) {
    THREE.Camera.call(this),
      (this.left = e),
      (this.right = t),
      (this.top = i),
      (this.bottom = r),
      (this.near = void 0 !== n ? n : 0.1),
      (this.far = void 0 !== o ? o : 2e3),
      this.updateProjectionMatrix();
  }),
  (THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(
      this.left,
      this.right,
      this.top,
      this.bottom,
      this.near,
      this.far
    );
  }),
  (THREE.PerspectiveCamera = function (e, t, i, r) {
    THREE.Camera.call(this),
      (this.fov = void 0 !== e ? e : 50),
      (this.aspect = void 0 !== t ? t : 1),
      (this.near = void 0 !== i ? i : 0.1),
      (this.far = void 0 !== r ? r : 2e3),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.PerspectiveCamera.prototype.setLens = function (e, t) {
    void 0 === t && (t = 24),
      (this.fov = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * e)))),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype.setViewOffset = function (
    e,
    t,
    i,
    r,
    n,
    o
  ) {
    (this.fullWidth = e),
      (this.fullHeight = t),
      (this.x = i),
      (this.y = r),
      (this.width = n),
      (this.height = o),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
      var e = this.fullWidth / this.fullHeight,
        t = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
        i = -t,
        r = e * i,
        e = Math.abs(e * t - r),
        i = Math.abs(t - i);
      this.projectionMatrix.makeFrustum(
        r + (this.x * e) / this.fullWidth,
        r + ((this.x + this.width) * e) / this.fullWidth,
        t - ((this.y + this.height) * i) / this.fullHeight,
        t - (this.y * i) / this.fullHeight,
        this.near,
        this.far
      );
    } else
      this.projectionMatrix.makePerspective(
        this.fov,
        this.aspect,
        this.near,
        this.far
      );
  }),
  (THREE.Light = function (e) {
    THREE.Object3D.call(this), (this.color = new THREE.Color(e));
  }),
  (THREE.Light.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Light.prototype.clone = function (e) {
    return (
      void 0 === e && (e = new THREE.Light()),
      THREE.Object3D.prototype.clone.call(this, e),
      e.color.copy(this.color),
      e
    );
  }),
  (THREE.AmbientLight = function (e) {
    THREE.Light.call(this, e);
  }),
  (THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.AmbientLight.prototype.clone = function () {
    var e = new THREE.AmbientLight();
    return THREE.Light.prototype.clone.call(this, e), e;
  }),
  (THREE.AreaLight = function (e, t) {
    THREE.Light.call(this, e),
      (this.normal = new THREE.Vector3(0, -1, 0)),
      (this.right = new THREE.Vector3(1, 0, 0)),
      (this.intensity = void 0 !== t ? t : 1),
      (this.height = this.width = 1),
      (this.constantAttenuation = 1.5),
      (this.linearAttenuation = 0.5),
      (this.quadraticAttenuation = 0.1);
  }),
  (THREE.AreaLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.DirectionalLight = function (e, t) {
    THREE.Light.call(this, e),
      this.position.set(0, 1, 0),
      (this.target = new THREE.Object3D()),
      (this.intensity = void 0 !== t ? t : 1),
      (this.onlyShadow = this.castShadow = !1),
      (this.shadowCameraNear = 50),
      (this.shadowCameraFar = 5e3),
      (this.shadowCameraLeft = -500),
      (this.shadowCameraTop = this.shadowCameraRight = 500),
      (this.shadowCameraBottom = -500),
      (this.shadowCameraVisible = !1),
      (this.shadowBias = 0),
      (this.shadowDarkness = 0.5),
      (this.shadowMapHeight = this.shadowMapWidth = 512),
      (this.shadowCascade = !1),
      (this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3)),
      (this.shadowCascadeCount = 2),
      (this.shadowCascadeBias = [0, 0, 0]),
      (this.shadowCascadeWidth = [512, 512, 512]),
      (this.shadowCascadeHeight = [512, 512, 512]),
      (this.shadowCascadeNearZ = [-1, 0.99, 0.998]),
      (this.shadowCascadeFarZ = [0.99, 0.998, 1]),
      (this.shadowCascadeArray = []),
      (this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
          null);
  }),
  (THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.DirectionalLight.prototype.clone = function () {
    var e = new THREE.DirectionalLight();
    return (
      THREE.Light.prototype.clone.call(this, e),
      (e.target = this.target.clone()),
      (e.intensity = this.intensity),
      (e.castShadow = this.castShadow),
      (e.onlyShadow = this.onlyShadow),
      e
    );
  }),
  (THREE.HemisphereLight = function (e, t, i) {
    THREE.Light.call(this, e),
      this.position.set(0, 100, 0),
      (this.groundColor = new THREE.Color(t)),
      (this.intensity = void 0 !== i ? i : 1);
  }),
  (THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.HemisphereLight.prototype.clone = function () {
    var e = new THREE.PointLight();
    return (
      THREE.Light.prototype.clone.call(this, e),
      e.groundColor.copy(this.groundColor),
      (e.intensity = this.intensity),
      e
    );
  }),
  (THREE.PointLight = function (e, t, i) {
    THREE.Light.call(this, e),
      (this.intensity = void 0 !== t ? t : 1),
      (this.distance = void 0 !== i ? i : 0);
  }),
  (THREE.PointLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.PointLight.prototype.clone = function () {
    var e = new THREE.PointLight();
    return (
      THREE.Light.prototype.clone.call(this, e),
      (e.intensity = this.intensity),
      (e.distance = this.distance),
      e
    );
  }),
  (THREE.SpotLight = function (e, t, i, r, n) {
    THREE.Light.call(this, e),
      this.position.set(0, 1, 0),
      (this.target = new THREE.Object3D()),
      (this.intensity = void 0 !== t ? t : 1),
      (this.distance = void 0 !== i ? i : 0),
      (this.angle = void 0 !== r ? r : Math.PI / 3),
      (this.exponent = void 0 !== n ? n : 10),
      (this.onlyShadow = this.castShadow = !1),
      (this.shadowCameraNear = 50),
      (this.shadowCameraFar = 5e3),
      (this.shadowCameraFov = 50),
      (this.shadowCameraVisible = !1),
      (this.shadowBias = 0),
      (this.shadowDarkness = 0.5),
      (this.shadowMapHeight = this.shadowMapWidth = 512),
      (this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
          null);
  }),
  (THREE.SpotLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.SpotLight.prototype.clone = function () {
    var e = new THREE.SpotLight();
    return (
      THREE.Light.prototype.clone.call(this, e),
      (e.target = this.target.clone()),
      (e.intensity = this.intensity),
      (e.distance = this.distance),
      (e.angle = this.angle),
      (e.exponent = this.exponent),
      (e.castShadow = this.castShadow),
      (e.onlyShadow = this.onlyShadow),
      e
    );
  }),
  (THREE.Loader = function (e) {
    (this.statusDomElement = (this.showStatus = e)
      ? THREE.Loader.prototype.addStatusElement()
      : null),
      (this.onLoadStart = function () {}),
      (this.onLoadProgress = function () {}),
      (this.onLoadComplete = function () {});
  }),
  (THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function () {
      var e = document.createElement("div");
      return (
        (e.style.position = "absolute"),
        (e.style.right = "0px"),
        (e.style.top = "0px"),
        (e.style.fontSize = "0.8em"),
        (e.style.textAlign = "left"),
        (e.style.background = "rgba(0,0,0,0.25)"),
        (e.style.color = "#fff"),
        (e.style.width = "120px"),
        (e.style.padding = "0.5em 0.5em 0.5em 0.5em"),
        (e.style.zIndex = 1e3),
        (e.innerHTML = "Loading ..."),
        e
      );
    },
    updateProgress: function (e) {
      var t = "Loaded ",
        t = e.total
          ? t + (((100 * e.loaded) / e.total).toFixed(0) + "%")
          : t + ((e.loaded / 1e3).toFixed(2) + " KB");
      this.statusDomElement.innerHTML = t;
    },
    extractUrlBase: function (e) {
      return (e = e.split("/")).pop(), (1 > e.length ? "." : e.join("/")) + "/";
    },
    initMaterials: function (e, t) {
      for (var i = [], r = 0; r < e.length; ++r)
        i[r] = THREE.Loader.prototype.createMaterial(e[r], t);
      return i;
    },
    needsTangents: function (e) {
      for (var t = 0, i = e.length; t < i; t++)
        if (e[t] instanceof THREE.ShaderMaterial) return !0;
      return !1;
    },
    createMaterial: function (e, t) {
      function i(e) {
        return Math.floor((e = Math.log(e) / Math.LN2)) == e;
      }
      function r(e) {
        return Math.pow(2, Math.round((e = Math.log(e) / Math.LN2)));
      }
      function n(e, n, o, s, h, l, c) {
        var p = /\.dds$/i.test(o),
          u = t + "/" + o;
        if (p) {
          var E = THREE.ImageUtils.loadCompressedTexture(u);
          e[n] = E;
        } else
          (E = document.createElement("canvas")), (e[n] = new THREE.Texture(E));
        if (
          ((e[n].sourceFile = o),
          s &&
            (e[n].repeat.set(s[0], s[1]),
            1 !== s[0] && (e[n].wrapS = THREE.RepeatWrapping),
            1 !== s[1] && (e[n].wrapT = THREE.RepeatWrapping)),
          h && e[n].offset.set(h[0], h[1]),
          l &&
            (void 0 !==
              (o = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping,
              })[l[0]] && (e[n].wrapS = o[l[0]]),
            void 0 !== o[l[1]] && (e[n].wrapT = o[l[1]])),
          c && (e[n].anisotropy = c),
          !p)
        ) {
          var f = e[n],
            e = new Image();
          (e.onload = function () {
            if (i(this.width) && i(this.height)) f.image = this;
            else {
              var e = r(this.width),
                t = r(this.height);
              (f.image.width = e),
                (f.image.height = t),
                f.image.getContext("2d").drawImage(this, 0, 0, e, t);
            }
            f.needsUpdate = !0;
          }),
            (e.crossOrigin = a.crossOrigin),
            (e.src = u);
        }
      }
      function o(e) {
        return ((255 * e[0]) << 16) + ((255 * e[1]) << 8) + 255 * e[2];
      }
      var a = this,
        s = "MeshLambertMaterial",
        h = {
          color: 15658734,
          opacity: 1,
          map: null,
          lightMap: null,
          normalMap: null,
          bumpMap: null,
          wireframe: !1,
        };
      if (e.shading) {
        var l = e.shading.toLowerCase();
        "phong" === l
          ? (s = "MeshPhongMaterial")
          : "basic" === l && (s = "MeshBasicMaterial");
      }
      return (
        void 0 !== e.blending &&
          void 0 !== THREE[e.blending] &&
          (h.blending = THREE[e.blending]),
        (void 0 !== e.transparent || 1 > e.opacity) &&
          (h.transparent = e.transparent),
        void 0 !== e.depthTest && (h.depthTest = e.depthTest),
        void 0 !== e.depthWrite && (h.depthWrite = e.depthWrite),
        void 0 !== e.visible && (h.visible = e.visible),
        void 0 !== e.flipSided && (h.side = THREE.BackSide),
        void 0 !== e.doubleSided && (h.side = THREE.DoubleSide),
        void 0 !== e.wireframe && (h.wireframe = e.wireframe),
        void 0 !== e.vertexColors &&
          ("face" === e.vertexColors
            ? (h.vertexColors = THREE.FaceColors)
            : e.vertexColors && (h.vertexColors = THREE.VertexColors)),
        e.colorDiffuse
          ? (h.color = o(e.colorDiffuse))
          : e.DbgColor && (h.color = e.DbgColor),
        e.colorSpecular && (h.specular = o(e.colorSpecular)),
        e.colorAmbient && (h.ambient = o(e.colorAmbient)),
        e.transparency && (h.opacity = e.transparency),
        e.specularCoef && (h.shininess = e.specularCoef),
        e.mapDiffuse &&
          t &&
          n(
            h,
            "map",
            e.mapDiffuse,
            e.mapDiffuseRepeat,
            e.mapDiffuseOffset,
            e.mapDiffuseWrap,
            e.mapDiffuseAnisotropy
          ),
        e.mapLight &&
          t &&
          n(
            h,
            "lightMap",
            e.mapLight,
            e.mapLightRepeat,
            e.mapLightOffset,
            e.mapLightWrap,
            e.mapLightAnisotropy
          ),
        e.mapBump &&
          t &&
          n(
            h,
            "bumpMap",
            e.mapBump,
            e.mapBumpRepeat,
            e.mapBumpOffset,
            e.mapBumpWrap,
            e.mapBumpAnisotropy
          ),
        e.mapNormal &&
          t &&
          n(
            h,
            "normalMap",
            e.mapNormal,
            e.mapNormalRepeat,
            e.mapNormalOffset,
            e.mapNormalWrap,
            e.mapNormalAnisotropy
          ),
        e.mapSpecular &&
          t &&
          n(
            h,
            "specularMap",
            e.mapSpecular,
            e.mapSpecularRepeat,
            e.mapSpecularOffset,
            e.mapSpecularWrap,
            e.mapSpecularAnisotropy
          ),
        e.mapBumpScale && (h.bumpScale = e.mapBumpScale),
        e.mapNormal
          ? ((s = THREE.ShaderLib.normalmap),
            ((l = THREE.UniformsUtils.clone(s.uniforms)).tNormal.value =
              h.normalMap),
            e.mapNormalFactor &&
              l.uNormalScale.value.set(e.mapNormalFactor, e.mapNormalFactor),
            h.map && ((l.tDiffuse.value = h.map), (l.enableDiffuse.value = !0)),
            h.specularMap &&
              ((l.tSpecular.value = h.specularMap),
              (l.enableSpecular.value = !0)),
            h.lightMap && ((l.tAO.value = h.lightMap), (l.enableAO.value = !0)),
            l.uDiffuseColor.value.setHex(h.color),
            l.uSpecularColor.value.setHex(h.specular),
            l.uAmbientColor.value.setHex(h.ambient),
            (l.uShininess.value = h.shininess),
            void 0 !== h.opacity && (l.uOpacity.value = h.opacity),
            (s = new THREE.ShaderMaterial({
              fragmentShader: s.fragmentShader,
              vertexShader: s.vertexShader,
              uniforms: l,
              lights: !0,
              fog: !0,
            })),
            h.transparent && (s.transparent = !0))
          : (s = new THREE[s](h)),
        void 0 !== e.DbgName && (s.name = e.DbgName),
        s
      );
    },
  }),
  (THREE.ImageLoader = function () {
    this.crossOrigin = null;
  }),
  (THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (e, t) {
      var i = this;
      void 0 === t && (t = new Image()),
        t.addEventListener(
          "load",
          function () {
            i.dispatchEvent({ type: "load", content: t });
          },
          !1
        ),
        t.addEventListener(
          "error",
          function () {
            i.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        i.crossOrigin && (t.crossOrigin = i.crossOrigin),
        (t.src = e);
    },
  }),
  (THREE.JSONLoader = function (e) {
    THREE.Loader.call(this, e), (this.withCredentials = !1);
  }),
  (THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype)),
  (THREE.JSONLoader.prototype.load = function (e, t, i) {
    (i = i && "string" == typeof i ? i : this.extractUrlBase(e)),
      this.onLoadStart(),
      this.loadAjaxJSON(this, e, t, i);
  }),
  (THREE.JSONLoader.prototype.loadAjaxJSON = function (e, t, i, r, n) {
    var o = new XMLHttpRequest(),
      a = 0;
    (o.onreadystatechange = function () {
      if (o.readyState === o.DONE) {
        if (200 === o.status || 0 === o.status) {
          if (o.responseText) {
            var s = JSON.parse(o.responseText),
              s = e.parse(s, r);
            i(s.geometry, s.materials);
          } else
            console.warn(
              "THREE.JSONLoader: [" +
                t +
                "] seems to be unreachable or file there is empty"
            );
          e.onLoadComplete();
        } else
          console.error(
            "THREE.JSONLoader: Couldn't load [" + t + "] [" + o.status + "]"
          );
      } else
        o.readyState === o.LOADING
          ? n &&
            (0 === a && (a = o.getResponseHeader("Content-Length")),
            n({ total: a, loaded: o.responseText.length }))
          : o.readyState === o.HEADERS_RECEIVED &&
            void 0 !== n &&
            (a = o.getResponseHeader("Content-Length"));
    }),
      o.open("GET", t, !0),
      (o.withCredentials = this.withCredentials),
      o.send(null);
  }),
  (THREE.JSONLoader.prototype.parse = function (e, t) {
    var i,
      r,
      n,
      o,
      a,
      s,
      h,
      l,
      c,
      p,
      u,
      E,
      f,
      d,
      m,
      g = new THREE.Geometry(),
      T = void 0 !== e.scale ? 1 / e.scale : 1,
      v = e.faces;
    p = e.vertices;
    var $ = e.normals,
      y = e.colors,
      R = 0;
    for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && R++;
    for (i = 0; i < R; i++) (g.faceUvs[i] = []), (g.faceVertexUvs[i] = []);
    for (o = 0, a = p.length; o < a; )
      ((s = new THREE.Vector3()).x = p[o++] * T),
        (s.y = p[o++] * T),
        (s.z = p[o++] * T),
        g.vertices.push(s);
    for (o = 0, a = v.length; o < a; ) {
      if (
        ((s = 1 & (p = v[o++])),
        (n = 2 & p),
        (i = 4 & p),
        (r = 8 & p),
        (l = 16 & p),
        (h = 32 & p),
        (u = 64 & p),
        (p &= 128),
        s
          ? (((E = new THREE.Face4()).a = v[o++]),
            (E.b = v[o++]),
            (E.c = v[o++]),
            (E.d = v[o++]),
            (s = 4))
          : (((E = new THREE.Face3()).a = v[o++]),
            (E.b = v[o++]),
            (E.c = v[o++]),
            (s = 3)),
        n && ((n = v[o++]), (E.materialIndex = n)),
        (n = g.faces.length),
        i)
      )
        for (i = 0; i < R; i++)
          (m = (f = e.uvs[i])[2 * (c = v[o++])]),
            (c = f[2 * c + 1]),
            (g.faceUvs[i][n] = new THREE.Vector2(m, c));
      if (r)
        for (i = 0; i < R; i++) {
          for (r = 0, f = e.uvs[i], d = []; r < s; r++)
            (m = f[2 * (c = v[o++])]),
              (c = f[2 * c + 1]),
              (d[r] = new THREE.Vector2(m, c));
          g.faceVertexUvs[i][n] = d;
        }
      if (
        (l &&
          ((l = 3 * v[o++]),
          ((r = new THREE.Vector3()).x = $[l++]),
          (r.y = $[l++]),
          (r.z = $[l]),
          (E.normal = r)),
        h)
      )
        for (i = 0; i < s; i++)
          (l = 3 * v[o++]),
            ((r = new THREE.Vector3()).x = $[l++]),
            (r.y = $[l++]),
            (r.z = $[l]),
            E.vertexNormals.push(r);
      if ((u && ((h = v[o++]), (h = new THREE.Color(y[h])), (E.color = h)), p))
        for (i = 0; i < s; i++)
          (h = v[o++]), (h = new THREE.Color(y[h])), E.vertexColors.push(h);
      g.faces.push(E);
    }
    if (e.skinWeights)
      for (o = 0, a = e.skinWeights.length; o < a; o += 2)
        (v = e.skinWeights[o]),
          ($ = e.skinWeights[o + 1]),
          g.skinWeights.push(new THREE.Vector4(v, $, 0, 0));
    if (e.skinIndices)
      for (o = 0, a = e.skinIndices.length; o < a; o += 2)
        (v = e.skinIndices[o]),
          ($ = e.skinIndices[o + 1]),
          g.skinIndices.push(new THREE.Vector4(v, $, 0, 0));
    if (
      ((g.bones = e.bones),
      (g.animation = e.animation),
      void 0 !== e.morphTargets)
    )
      for (o = 0, a = e.morphTargets.length; o < a; o++)
        for (
          g.morphTargets[o] = {},
            g.morphTargets[o].name = e.morphTargets[o].name,
            g.morphTargets[o].vertices = [],
            y = g.morphTargets[o].vertices,
            R = e.morphTargets[o].vertices,
            v = 0,
            $ = R.length;
          v < $;
          v += 3
        )
          ((p = new THREE.Vector3()).x = R[v] * T),
            (p.y = R[v + 1] * T),
            (p.z = R[v + 2] * T),
            y.push(p);
    if (void 0 !== e.morphColors)
      for (o = 0, a = e.morphColors.length; o < a; o++)
        for (
          g.morphColors[o] = {},
            g.morphColors[o].name = e.morphColors[o].name,
            g.morphColors[o].colors = [],
            $ = g.morphColors[o].colors,
            y = e.morphColors[o].colors,
            T = 0,
            v = y.length;
          T < v;
          T += 3
        )
          (R = new THREE.Color(16755200)).setRGB(y[T], y[T + 1], y[T + 2]),
            $.push(R);
    return (g.computeCentroids(),
    g.computeFaceNormals(),
    void 0 === e.materials)
      ? { geometry: g }
      : ((T = this.initMaterials(e.materials, t)),
        this.needsTangents(T) && g.computeTangents(),
        { geometry: g, materials: T });
  }),
  (THREE.LoadingMonitor = function () {
    var e = this,
      t = 0,
      i = 0,
      r = function () {
        t++,
          e.dispatchEvent({ type: "progress", loaded: t, total: i }),
          t === i && e.dispatchEvent({ type: "load" });
      };
    this.add = function (e) {
      i++, e.addEventListener("load", r, !1);
    };
  }),
  (THREE.LoadingMonitor.prototype = {
    constructor: THREE.LoadingMonitor,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
  }),
  (THREE.GeometryLoader = function () {}),
  (THREE.GeometryLoader.prototype = {
    constructor: THREE.GeometryLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (e) {
      var t = this,
        i = new XMLHttpRequest();
      i.addEventListener(
        "load",
        function (e) {
          (e = t.parse(JSON.parse(e.target.responseText))),
            t.dispatchEvent({ type: "load", content: e });
        },
        !1
      ),
        i.addEventListener(
          "progress",
          function (e) {
            t.dispatchEvent({
              type: "progress",
              loaded: e.loaded,
              total: e.total,
            });
          },
          !1
        ),
        i.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        i.open("GET", e, !0),
        i.send(null);
    },
    parse: function () {},
  }),
  (THREE.MaterialLoader = function () {}),
  (THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (e) {
      var t = this,
        i = new XMLHttpRequest();
      i.addEventListener(
        "load",
        function (e) {
          (e = t.parse(JSON.parse(e.target.responseText))),
            t.dispatchEvent({ type: "load", content: e });
        },
        !1
      ),
        i.addEventListener(
          "progress",
          function (e) {
            t.dispatchEvent({
              type: "progress",
              loaded: e.loaded,
              total: e.total,
            });
          },
          !1
        ),
        i.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        i.open("GET", e, !0),
        i.send(null);
    },
    parse: function (e) {
      var t;
      switch (e.type) {
        case "MeshBasicMaterial":
          t = new THREE.MeshBasicMaterial({
            color: e.color,
            opacity: e.opacity,
            transparent: e.transparent,
            wireframe: e.wireframe,
          });
          break;
        case "MeshLambertMaterial":
          t = new THREE.MeshLambertMaterial({
            color: e.color,
            ambient: e.ambient,
            emissive: e.emissive,
            opacity: e.opacity,
            transparent: e.transparent,
            wireframe: e.wireframe,
          });
          break;
        case "MeshPhongMaterial":
          t = new THREE.MeshPhongMaterial({
            color: e.color,
            ambient: e.ambient,
            emissive: e.emissive,
            specular: e.specular,
            shininess: e.shininess,
            opacity: e.opacity,
            transparent: e.transparent,
            wireframe: e.wireframe,
          });
          break;
        case "MeshNormalMaterial":
          t = new THREE.MeshNormalMaterial({
            opacity: e.opacity,
            transparent: e.transparent,
            wireframe: e.wireframe,
          });
          break;
        case "MeshDepthMaterial":
          t = new THREE.MeshDepthMaterial({
            opacity: e.opacity,
            transparent: e.transparent,
            wireframe: e.wireframe,
          });
      }
      return t;
    },
  }),
  (THREE.SceneLoader = function () {
    (this.onLoadStart = function () {}),
      (this.onLoadProgress = function () {}),
      (this.onLoadComplete = function () {}),
      (this.callbackSync = function () {}),
      (this.callbackProgress = function () {}),
      (this.geometryHandlerMap = {}),
      (this.hierarchyHandlerMap = {}),
      this.addGeometryHandler("ascii", THREE.JSONLoader);
  }),
  (THREE.SceneLoader.prototype.constructor = THREE.SceneLoader),
  (THREE.SceneLoader.prototype.load = function (e, t) {
    var i = this,
      r = new XMLHttpRequest();
    (r.onreadystatechange = function () {
      if (4 === r.readyState) {
        if (200 === r.status || 0 === r.status) {
          var n = JSON.parse(r.responseText);
          i.parse(n, t, e);
        } else
          console.error(
            "THREE.SceneLoader: Couldn't load [" + e + "] [" + r.status + "]"
          );
      }
    }),
      r.open("GET", e, !0),
      r.send(null);
  }),
  (THREE.SceneLoader.prototype.addGeometryHandler = function (e, t) {
    this.geometryHandlerMap[e] = { loaderClass: t };
  }),
  (THREE.SceneLoader.prototype.addHierarchyHandler = function (e, t) {
    this.hierarchyHandlerMap[e] = { loaderClass: t };
  }),
  (THREE.SceneLoader.prototype.parse = function (e, t, i) {
    function r(e, t) {
      return "relativeToHTML" == t ? e : w + "/" + e;
    }
    function n() {
      (function e(t, i) {
        var n, o, s, h, l, c, f;
        for (f in i)
          if (void 0 === x.objects[f]) {
            var d = i[f],
              v = null;
            if (d.type && d.type in _.hierarchyHandlerMap) {
              if (void 0 === d.loading) {
                for (var $ in ((o = {
                  type: 1,
                  url: 1,
                  material: 1,
                  position: 1,
                  rotation: 1,
                  scale: 1,
                  visible: 1,
                  children: 1,
                  userData: 1,
                  skin: 1,
                  morph: 1,
                  mirroredLoop: 1,
                  duration: 1,
                }),
                (s = {}),
                d))
                  $ in o || (s[$] = d[$]);
                (u = x.materials[d.material]),
                  (d.loading = !0),
                  (o = _.hierarchyHandlerMap[d.type].loaderObject).options
                    ? o.load(r(d.url, b.urlBaseType), a(f, t, u, d))
                    : o.load(r(d.url, b.urlBaseType), a(f, t, u, d), s);
              }
            } else if (void 0 !== d.geometry) {
              if ((p = x.geometries[d.geometry])) {
                if (
                  ((v = !1),
                  (v =
                    (u = x.materials[d.material]) instanceof
                    THREE.ShaderMaterial),
                  (s = d.position),
                  (h = d.rotation),
                  (l = d.scale),
                  (n = d.matrix),
                  (c = d.quaternion),
                  d.material ||
                    (u = new THREE.MeshFaceMaterial(
                      x.face_materials[d.geometry]
                    )),
                  u instanceof THREE.MeshFaceMaterial &&
                    0 === u.materials.length &&
                    (u = new THREE.MeshFaceMaterial(
                      x.face_materials[d.geometry]
                    )),
                  u instanceof THREE.MeshFaceMaterial)
                )
                  for (o = 0; o < u.materials.length; o++)
                    v = v || u.materials[o] instanceof THREE.ShaderMaterial;
                v && p.computeTangents(),
                  d.skin
                    ? (v = new THREE.SkinnedMesh(p, u))
                    : d.morph
                    ? ((v = new THREE.MorphAnimMesh(p, u)),
                      void 0 !== d.duration && (v.duration = d.duration),
                      void 0 !== d.time && (v.time = d.time),
                      void 0 !== d.mirroredLoop &&
                        (v.mirroredLoop = d.mirroredLoop),
                      u.morphNormals && p.computeMorphNormals())
                    : (v = new THREE.Mesh(p, u)),
                  (v.name = f),
                  n
                    ? ((v.matrixAutoUpdate = !1),
                      v.matrix.set(
                        n[0],
                        n[1],
                        n[2],
                        n[3],
                        n[4],
                        n[5],
                        n[6],
                        n[7],
                        n[8],
                        n[9],
                        n[10],
                        n[11],
                        n[12],
                        n[13],
                        n[14],
                        n[15]
                      ))
                    : (v.position.set(s[0], s[1], s[2]),
                      c
                        ? (v.quaternion.set(c[0], c[1], c[2], c[3]),
                          (v.useQuaternion = !0))
                        : v.rotation.set(h[0], h[1], h[2]),
                      v.scale.set(l[0], l[1], l[2])),
                  (v.visible = d.visible),
                  (v.castShadow = d.castShadow),
                  (v.receiveShadow = d.receiveShadow),
                  t.add(v),
                  (x.objects[f] = v);
              }
            } else
              "DirectionalLight" === d.type ||
              "PointLight" === d.type ||
              "AmbientLight" === d.type
                ? ((g = void 0 !== d.color ? d.color : 16777215),
                  (T = void 0 !== d.intensity ? d.intensity : 1),
                  "DirectionalLight" === d.type
                    ? ((s = d.direction),
                      (m = new THREE.DirectionalLight(g, T)).position.set(
                        s[0],
                        s[1],
                        s[2]
                      ),
                      d.target &&
                        (S.push({ object: m, targetName: d.target }),
                        (m.target = null)))
                    : "PointLight" === d.type
                    ? ((s = d.position),
                      (o = d.distance),
                      (m = new THREE.PointLight(g, T, o)).position.set(
                        s[0],
                        s[1],
                        s[2]
                      ))
                    : "AmbientLight" === d.type &&
                      (m = new THREE.AmbientLight(g)),
                  t.add(m),
                  (m.name = f),
                  (x.lights[f] = m),
                  (x.objects[f] = m))
                : "PerspectiveCamera" === d.type ||
                  "OrthographicCamera" === d.type
                ? ((s = d.position),
                  (h = d.rotation),
                  (c = d.quaternion),
                  "PerspectiveCamera" === d.type
                    ? (E = new THREE.PerspectiveCamera(
                        d.fov,
                        d.aspect,
                        d.near,
                        d.far
                      ))
                    : "OrthographicCamera" === d.type &&
                      (E = new THREE.OrthographicCamera(
                        d.left,
                        d.right,
                        d.top,
                        d.bottom,
                        d.near,
                        d.far
                      )),
                  (E.name = f),
                  E.position.set(s[0], s[1], s[2]),
                  void 0 !== c
                    ? (E.quaternion.set(c[0], c[1], c[2], c[3]),
                      (E.useQuaternion = !0))
                    : void 0 !== h && E.rotation.set(h[0], h[1], h[2]),
                  t.add(E),
                  (x.cameras[f] = E),
                  (x.objects[f] = E))
                : ((s = d.position),
                  (h = d.rotation),
                  (l = d.scale),
                  (c = d.quaternion),
                  ((v = new THREE.Object3D()).name = f),
                  v.position.set(s[0], s[1], s[2]),
                  c
                    ? (v.quaternion.set(c[0], c[1], c[2], c[3]),
                      (v.useQuaternion = !0))
                    : v.rotation.set(h[0], h[1], h[2]),
                  v.scale.set(l[0], l[1], l[2]),
                  (v.visible = void 0 !== d.visible && d.visible),
                  t.add(v),
                  (x.objects[f] = v),
                  (x.empties[f] = v));
            if (v) {
              if (void 0 !== d.userData)
                for (var y in d.userData) v.userData[y] = d.userData[y];
              if (void 0 !== d.groups)
                for (o = 0; o < d.groups.length; o++)
                  (s = d.groups[o]),
                    void 0 === x.groups[s] && (x.groups[s] = []),
                    x.groups[s].push(f);
              void 0 !== d.children && e(v, d.children);
            }
          }
      })(x.scene, b.objects);
    }
    function o(e) {
      return function (t, i) {
        (t.name = e),
          (x.geometries[e] = t),
          (x.face_materials[e] = i),
          n(),
          (v -= 1),
          _.onLoadComplete(),
          h();
      };
    }
    function a(e, t, i, r) {
      return function (o) {
        var o = o.content ? o.content : o.dae ? o.scene : o,
          a = r.position,
          s = r.rotation,
          l = r.quaternion,
          c = r.scale;
        o.position.set(a[0], a[1], a[2]),
          l
            ? (o.quaternion.set(l[0], l[1], l[2], l[3]), (o.useQuaternion = !0))
            : o.rotation.set(s[0], s[1], s[2]),
          o.scale.set(c[0], c[1], c[2]),
          i &&
            o.traverse(function (e) {
              e.material = i;
            });
        var p = void 0 === r.visible || r.visible;
        o.traverse(function (e) {
          e.visible = p;
        }),
          t.add(o),
          (o.name = e),
          (x.objects[e] = o),
          n(),
          (v -= 1),
          _.onLoadComplete(),
          h();
      };
    }
    function s(e) {
      return function (t, i) {
        (t.name = e), (x.geometries[e] = t), (x.face_materials[e] = i);
      };
    }
    function h() {
      if (
        (_.callbackProgress(
          {
            totalModels: y,
            totalTextures: R,
            loadedModels: y - v,
            loadedTextures: R - $,
          },
          x
        ),
        _.onLoadProgress(),
        0 === v && 0 === $)
      ) {
        for (var e = 0; e < S.length; e++) {
          var i = S[e],
            r = x.objects[i.targetName];
          r
            ? (i.object.target = r)
            : ((i.object.target = new THREE.Object3D()),
              x.scene.add(i.object.target)),
            (i.object.target.userData.targetInverse = i.object);
        }
        t(x);
      }
    }
    var l,
      c,
      p,
      u,
      E,
      f,
      d,
      m,
      g,
      T,
      v,
      $,
      y,
      R,
      x,
      H,
      _ = this,
      w = THREE.Loader.prototype.extractUrlBase(i),
      S = [],
      b = e;
    for (H in this.geometryHandlerMap)
      (e = this.geometryHandlerMap[H].loaderClass),
        (this.geometryHandlerMap[H].loaderObject = new e());
    for (H in this.hierarchyHandlerMap)
      (e = this.hierarchyHandlerMap[H].loaderClass),
        (this.hierarchyHandlerMap[H].loaderObject = new e());
    for (var M in (($ = v = 0),
    (x = {
      scene: new THREE.Scene(),
      geometries: {},
      face_materials: {},
      materials: {},
      textures: {},
      objects: {},
      cameras: {},
      lights: {},
      fogs: {},
      empties: {},
      groups: {},
    }),
    b.transform &&
      ((H = b.transform.position),
      (e = b.transform.rotation),
      (i = b.transform.scale),
      H && x.scene.position.set(H[0], H[1], H[2]),
      e && x.scene.rotation.set(e[0], e[1], e[2]),
      i && x.scene.scale.set(i[0], i[1], i[2]),
      H || e || i) &&
      (x.scene.updateMatrix(), x.scene.updateMatrixWorld()),
    (H = function (e) {
      return function () {
        ($ -= e), h(), _.onLoadComplete();
      };
    }),
    b.fogs))
      "linear" === (e = b.fogs[M]).type
        ? (f = new THREE.Fog(0, e.near, e.far))
        : "exp2" === e.type && (f = new THREE.FogExp2(0, e.density)),
        (e = e.color),
        f.color.setRGB(e[0], e[1], e[2]),
        (x.fogs[M] = f);
    for (var C in b.geometries)
      (f = b.geometries[C]).type in this.geometryHandlerMap &&
        ((v += 1), _.onLoadStart());
    for (var A in b.objects)
      (f = b.objects[A]).type &&
        f.type in this.hierarchyHandlerMap &&
        ((v += 1), _.onLoadStart());
    for (C in ((y = v), b.geometries))
      if ("cube" === (f = b.geometries[C]).type)
        ((p = new THREE.CubeGeometry(
          f.width,
          f.height,
          f.depth,
          f.widthSegments,
          f.heightSegments,
          f.depthSegments
        )).name = C),
          (x.geometries[C] = p);
      else if ("plane" === f.type)
        ((p = new THREE.PlaneGeometry(
          f.width,
          f.height,
          f.widthSegments,
          f.heightSegments
        )).name = C),
          (x.geometries[C] = p);
      else if ("sphere" === f.type)
        ((p = new THREE.SphereGeometry(
          f.radius,
          f.widthSegments,
          f.heightSegments
        )).name = C),
          (x.geometries[C] = p);
      else if ("cylinder" === f.type)
        ((p = new THREE.CylinderGeometry(
          f.topRad,
          f.botRad,
          f.height,
          f.radSegs,
          f.heightSegs
        )).name = C),
          (x.geometries[C] = p);
      else if ("torus" === f.type)
        ((p = new THREE.TorusGeometry(
          f.radius,
          f.tube,
          f.segmentsR,
          f.segmentsT
        )).name = C),
          (x.geometries[C] = p);
      else if ("icosahedron" === f.type)
        ((p = new THREE.IcosahedronGeometry(f.radius, f.subdivisions)).name =
          C),
          (x.geometries[C] = p);
      else if (f.type in this.geometryHandlerMap) {
        for (d in ((A = {}), f)) "type" !== d && "url" !== d && (A[d] = f[d]);
        this.geometryHandlerMap[f.type].loaderObject.load(
          r(f.url, b.urlBaseType),
          o(C),
          A
        );
      } else
        "embedded" === f.type &&
          (((A = b.embeds[f.id]).metadata = b.metadata),
          A &&
            ((A = this.geometryHandlerMap.ascii.loaderObject.parse(A, "")),
            s(C)(A.geometry, A.materials)));
    for (var L in b.textures)
      if ((C = b.textures[L]).url instanceof Array)
        for ($ += C.url.length, d = 0; d < C.url.length; d++) _.onLoadStart();
      else ($ += 1), _.onLoadStart();
    for (L in ((R = $), b.textures)) {
      if (
        (void 0 !== (C = b.textures[L]).mapping &&
          void 0 !== THREE[C.mapping] &&
          (C.mapping = new THREE[C.mapping]()),
        C.url instanceof Array)
      ) {
        for (d = 0, A = C.url.length, f = []; d < A; d++)
          f[d] = r(C.url[d], b.urlBaseType);
        d = (d = /\.dds$/i.test(f[0]))
          ? THREE.ImageUtils.loadCompressedTextureCube(f, C.mapping, H(A))
          : THREE.ImageUtils.loadTextureCube(f, C.mapping, H(A));
      } else
        (d = /\.dds$/i.test(C.url)),
          (A = r(C.url, b.urlBaseType)),
          (f = H(1)),
          (d = d
            ? THREE.ImageUtils.loadCompressedTexture(A, C.mapping, f)
            : THREE.ImageUtils.loadTexture(A, C.mapping, f)),
          void 0 !== THREE[C.minFilter] && (d.minFilter = THREE[C.minFilter]),
          void 0 !== THREE[C.magFilter] && (d.magFilter = THREE[C.magFilter]),
          C.anisotropy && (d.anisotropy = C.anisotropy),
          C.repeat &&
            (d.repeat.set(C.repeat[0], C.repeat[1]),
            1 !== C.repeat[0] && (d.wrapS = THREE.RepeatWrapping),
            1 !== C.repeat[1] && (d.wrapT = THREE.RepeatWrapping)),
          C.offset && d.offset.set(C.offset[0], C.offset[1]),
          C.wrap &&
            (void 0 !==
              (A = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping,
              })[C.wrap[0]] && (d.wrapS = A[C.wrap[0]]),
            void 0 !== A[C.wrap[1]] && (d.wrapT = A[C.wrap[1]]));
      x.textures[L] = d;
    }
    for (l in b.materials) {
      for (c in (L = b.materials[l]).parameters)
        "envMap" === c || "map" === c || "lightMap" === c || "bumpMap" === c
          ? (L.parameters[c] = x.textures[L.parameters[c]])
          : "shading" === c
          ? (L.parameters[c] =
              "flat" === L.parameters[c]
                ? THREE.FlatShading
                : THREE.SmoothShading)
          : "side" === c
          ? (L.parameters[c] =
              "double" == L.parameters[c]
                ? THREE.DoubleSide
                : "back" == L.parameters[c]
                ? THREE.BackSide
                : THREE.FrontSide)
          : "blending" === c
          ? (L.parameters[c] =
              L.parameters[c] in THREE
                ? THREE[L.parameters[c]]
                : THREE.NormalBlending)
          : "combine" === c
          ? (L.parameters[c] =
              L.parameters[c] in THREE
                ? THREE[L.parameters[c]]
                : THREE.MultiplyOperation)
          : "vertexColors" === c
          ? "face" == L.parameters[c]
            ? (L.parameters[c] = THREE.FaceColors)
            : L.parameters[c] && (L.parameters[c] = THREE.VertexColors)
          : "wrapRGB" === c &&
            ((H = L.parameters[c]),
            (L.parameters[c] = new THREE.Vector3(H[0], H[1], H[2])));
      void 0 !== L.parameters.opacity &&
        1 > L.parameters.opacity &&
        (L.parameters.transparent = !0),
        L.parameters.normalMap
          ? ((H = THREE.ShaderLib.normalmap),
            (C = THREE.UniformsUtils.clone(H.uniforms)),
            (d = L.parameters.color),
            (A = L.parameters.specular),
            (f = L.parameters.ambient),
            (M = L.parameters.shininess),
            (C.tNormal.value = x.textures[L.parameters.normalMap]),
            L.parameters.normalScale &&
              C.uNormalScale.value.set(
                L.parameters.normalScale[0],
                L.parameters.normalScale[1]
              ),
            L.parameters.map &&
              ((C.tDiffuse.value = L.parameters.map),
              (C.enableDiffuse.value = !0)),
            L.parameters.envMap &&
              ((C.tCube.value = L.parameters.envMap),
              (C.enableReflection.value = !0),
              (C.uReflectivity.value = L.parameters.reflectivity)),
            L.parameters.lightMap &&
              ((C.tAO.value = L.parameters.lightMap), (C.enableAO.value = !0)),
            L.parameters.specularMap &&
              ((C.tSpecular.value = x.textures[L.parameters.specularMap]),
              (C.enableSpecular.value = !0)),
            L.parameters.displacementMap &&
              ((C.tDisplacement.value =
                x.textures[L.parameters.displacementMap]),
              (C.enableDisplacement.value = !0),
              (C.uDisplacementBias.value = L.parameters.displacementBias),
              (C.uDisplacementScale.value = L.parameters.displacementScale)),
            C.uDiffuseColor.value.setHex(d),
            C.uSpecularColor.value.setHex(A),
            C.uAmbientColor.value.setHex(f),
            (C.uShininess.value = M),
            L.parameters.opacity && (C.uOpacity.value = L.parameters.opacity),
            (u = new THREE.ShaderMaterial({
              fragmentShader: H.fragmentShader,
              vertexShader: H.vertexShader,
              uniforms: C,
              lights: !0,
              fog: !0,
            })))
          : (u = new THREE[L.type](L.parameters)),
        (u.name = l),
        (x.materials[l] = u);
    }
    for (l in b.materials)
      if ((L = b.materials[l]).parameters.materials) {
        for (d = 0, c = []; d < L.parameters.materials.length; d++)
          c.push(x.materials[L.parameters.materials[d]]);
        x.materials[l].materials = c;
      }
    n(),
      x.cameras &&
        b.defaults.camera &&
        (x.currentCamera = x.cameras[b.defaults.camera]),
      x.fogs && b.defaults.fog && (x.scene.fog = x.fogs[b.defaults.fog]),
      _.callbackSync(x),
      h();
  }),
  (THREE.TextureLoader = function () {
    this.crossOrigin = null;
  }),
  (THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (e) {
      var t = this,
        i = new Image();
      i.addEventListener(
        "load",
        function () {
          var e = new THREE.Texture(i);
          (e.needsUpdate = !0), t.dispatchEvent({ type: "load", content: e });
        },
        !1
      ),
        i.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        t.crossOrigin && (i.crossOrigin = t.crossOrigin),
        (i.src = e);
    },
  }),
  (THREE.Material = function () {
    (this.id = THREE.MaterialIdCount++),
      (this.name = ""),
      (this.side = THREE.FrontSide),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.blending = THREE.NormalBlending),
      (this.blendSrc = THREE.SrcAlphaFactor),
      (this.blendDst = THREE.OneMinusSrcAlphaFactor),
      (this.blendEquation = THREE.AddEquation),
      (this.depthWrite = this.depthTest = !0),
      (this.polygonOffset = !1),
      (this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0),
      (this.overdraw = !1),
      (this.needsUpdate = this.visible = !0);
  }),
  (THREE.Material.prototype = {
    constructor: THREE.Material,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    setValues: function (e) {
      if (void 0 !== e)
        for (var t in e) {
          var i = e[t];
          if (void 0 === i)
            console.warn("THREE.Material: '" + t + "' parameter is undefined.");
          else if (t in this) {
            var r = this[t];
            r instanceof THREE.Color
              ? r.set(i)
              : r instanceof THREE.Vector3 && i instanceof THREE.Vector3
              ? r.copy(i)
              : (this[t] = i);
          }
        }
    },
    clone: function (e) {
      return (
        void 0 === e && (e = new THREE.Material()),
        (e.name = this.name),
        (e.side = this.side),
        (e.opacity = this.opacity),
        (e.transparent = this.transparent),
        (e.blending = this.blending),
        (e.blendSrc = this.blendSrc),
        (e.blendDst = this.blendDst),
        (e.blendEquation = this.blendEquation),
        (e.depthTest = this.depthTest),
        (e.depthWrite = this.depthWrite),
        (e.polygonOffset = this.polygonOffset),
        (e.polygonOffsetFactor = this.polygonOffsetFactor),
        (e.polygonOffsetUnits = this.polygonOffsetUnits),
        (e.alphaTest = this.alphaTest),
        (e.overdraw = this.overdraw),
        (e.visible = this.visible),
        e
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  }),
  (THREE.MaterialIdCount = 0),
  (THREE.LineBasicMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.linewidth = 1),
      (this.linejoin = this.linecap = "round"),
      (this.vertexColors = !1),
      (this.fog = !0),
      this.setValues(e);
  }),
  (THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.LineBasicMaterial.prototype.clone = function () {
    var e = new THREE.LineBasicMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.linewidth = this.linewidth),
      (e.linecap = this.linecap),
      (e.linejoin = this.linejoin),
      (e.vertexColors = this.vertexColors),
      (e.fog = this.fog),
      e
    );
  }),
  (THREE.LineDashedMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.scale = this.linewidth = 1),
      (this.dashSize = 3),
      (this.gapSize = 1),
      (this.vertexColors = !1),
      (this.fog = !0),
      this.setValues(e);
  }),
  (THREE.LineDashedMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.LineDashedMaterial.prototype.clone = function () {
    var e = new THREE.LineDashedMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.linewidth = this.linewidth),
      (e.scale = this.scale),
      (e.dashSize = this.dashSize),
      (e.gapSize = this.gapSize),
      (e.vertexColors = this.vertexColors),
      (e.fog = this.fog),
      e
    );
  }),
  (THREE.MeshBasicMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.envMap = this.specularMap = this.lightMap = this.map = null),
      (this.combine = THREE.MultiplyOperation),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.fog = !0),
      (this.shading = THREE.SmoothShading),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinejoin = this.wireframeLinecap = "round"),
      (this.vertexColors = THREE.NoColors),
      (this.morphTargets = this.skinning = !1),
      this.setValues(e);
  }),
  (THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshBasicMaterial.prototype.clone = function () {
    var e = new THREE.MeshBasicMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.map = this.map),
      (e.lightMap = this.lightMap),
      (e.specularMap = this.specularMap),
      (e.envMap = this.envMap),
      (e.combine = this.combine),
      (e.reflectivity = this.reflectivity),
      (e.refractionRatio = this.refractionRatio),
      (e.fog = this.fog),
      (e.shading = this.shading),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      (e.wireframeLinecap = this.wireframeLinecap),
      (e.wireframeLinejoin = this.wireframeLinejoin),
      (e.vertexColors = this.vertexColors),
      (e.skinning = this.skinning),
      (e.morphTargets = this.morphTargets),
      e
    );
  }),
  (THREE.MeshLambertMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.ambient = new THREE.Color(16777215)),
      (this.emissive = new THREE.Color(0)),
      (this.wrapAround = !1),
      (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
      (this.envMap = this.specularMap = this.lightMap = this.map = null),
      (this.combine = THREE.MultiplyOperation),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.fog = !0),
      (this.shading = THREE.SmoothShading),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinejoin = this.wireframeLinecap = "round"),
      (this.vertexColors = THREE.NoColors),
      (this.morphNormals = this.morphTargets = this.skinning = !1),
      this.setValues(e);
  }),
  (THREE.MeshLambertMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.MeshLambertMaterial.prototype.clone = function () {
    var e = new THREE.MeshLambertMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      e.ambient.copy(this.ambient),
      e.emissive.copy(this.emissive),
      (e.wrapAround = this.wrapAround),
      e.wrapRGB.copy(this.wrapRGB),
      (e.map = this.map),
      (e.lightMap = this.lightMap),
      (e.specularMap = this.specularMap),
      (e.envMap = this.envMap),
      (e.combine = this.combine),
      (e.reflectivity = this.reflectivity),
      (e.refractionRatio = this.refractionRatio),
      (e.fog = this.fog),
      (e.shading = this.shading),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      (e.wireframeLinecap = this.wireframeLinecap),
      (e.wireframeLinejoin = this.wireframeLinejoin),
      (e.vertexColors = this.vertexColors),
      (e.skinning = this.skinning),
      (e.morphTargets = this.morphTargets),
      (e.morphNormals = this.morphNormals),
      e
    );
  }),
  (THREE.MeshPhongMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.ambient = new THREE.Color(16777215)),
      (this.emissive = new THREE.Color(0)),
      (this.specular = new THREE.Color(1118481)),
      (this.shininess = 30),
      (this.metal = !1),
      (this.perPixel = !0),
      (this.wrapAround = !1),
      (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
      (this.bumpMap = this.lightMap = this.map = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalScale = new THREE.Vector2(1, 1)),
      (this.envMap = this.specularMap = null),
      (this.combine = THREE.MultiplyOperation),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.fog = !0),
      (this.shading = THREE.SmoothShading),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinejoin = this.wireframeLinecap = "round"),
      (this.vertexColors = THREE.NoColors),
      (this.morphNormals = this.morphTargets = this.skinning = !1),
      this.setValues(e);
  }),
  (THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshPhongMaterial.prototype.clone = function () {
    var e = new THREE.MeshPhongMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      e.ambient.copy(this.ambient),
      e.emissive.copy(this.emissive),
      e.specular.copy(this.specular),
      (e.shininess = this.shininess),
      (e.metal = this.metal),
      (e.perPixel = this.perPixel),
      (e.wrapAround = this.wrapAround),
      e.wrapRGB.copy(this.wrapRGB),
      (e.map = this.map),
      (e.lightMap = this.lightMap),
      (e.bumpMap = this.bumpMap),
      (e.bumpScale = this.bumpScale),
      (e.normalMap = this.normalMap),
      e.normalScale.copy(this.normalScale),
      (e.specularMap = this.specularMap),
      (e.envMap = this.envMap),
      (e.combine = this.combine),
      (e.reflectivity = this.reflectivity),
      (e.refractionRatio = this.refractionRatio),
      (e.fog = this.fog),
      (e.shading = this.shading),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      (e.wireframeLinecap = this.wireframeLinecap),
      (e.wireframeLinejoin = this.wireframeLinejoin),
      (e.vertexColors = this.vertexColors),
      (e.skinning = this.skinning),
      (e.morphTargets = this.morphTargets),
      (e.morphNormals = this.morphNormals),
      e
    );
  }),
  (THREE.MeshDepthMaterial = function (e) {
    THREE.Material.call(this),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(e);
  }),
  (THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshDepthMaterial.prototype.clone = function () {
    var e = new THREE.MeshDepthMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      e
    );
  }),
  (THREE.MeshNormalMaterial = function (e) {
    THREE.Material.call(this, e),
      (this.shading = THREE.FlatShading),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.morphTargets = !1),
      this.setValues(e);
  }),
  (THREE.MeshNormalMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.MeshNormalMaterial.prototype.clone = function () {
    var e = new THREE.MeshNormalMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      (e.shading = this.shading),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      e
    );
  }),
  (THREE.MeshFaceMaterial = function (e) {
    this.materials = e instanceof Array ? e : [];
  }),
  (THREE.MeshFaceMaterial.prototype.clone = function () {
    return new THREE.MeshFaceMaterial(this.materials.slice(0));
  }),
  (THREE.ParticleBasicMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.map = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.vertexColors = !1),
      (this.fog = !0),
      this.setValues(e);
  }),
  (THREE.ParticleBasicMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.ParticleBasicMaterial.prototype.clone = function () {
    var e = new THREE.ParticleBasicMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.map = this.map),
      (e.size = this.size),
      (e.sizeAttenuation = this.sizeAttenuation),
      (e.vertexColors = this.vertexColors),
      (e.fog = this.fog),
      e
    );
  }),
  (THREE.ParticleCanvasMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.program = function () {}),
      this.setValues(e);
  }),
  (THREE.ParticleCanvasMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.ParticleCanvasMaterial.prototype.clone = function () {
    var e = new THREE.ParticleCanvasMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.program = this.program),
      e
    );
  }),
  (THREE.ShaderMaterial = function (e) {
    THREE.Material.call(this),
      (this.vertexShader = this.fragmentShader = "void main() {}"),
      (this.uniforms = {}),
      (this.defines = {}),
      (this.attributes = null),
      (this.shading = THREE.SmoothShading),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.lights = this.fog = !1),
      (this.vertexColors = THREE.NoColors),
      (this.morphNormals = this.morphTargets = this.skinning = !1),
      this.setValues(e);
  }),
  (THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.ShaderMaterial.prototype.clone = function () {
    var e = new THREE.ShaderMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      (e.fragmentShader = this.fragmentShader),
      (e.vertexShader = this.vertexShader),
      (e.uniforms = THREE.UniformsUtils.clone(this.uniforms)),
      (e.attributes = this.attributes),
      (e.defines = this.defines),
      (e.shading = this.shading),
      (e.wireframe = this.wireframe),
      (e.wireframeLinewidth = this.wireframeLinewidth),
      (e.fog = this.fog),
      (e.lights = this.lights),
      (e.vertexColors = this.vertexColors),
      (e.skinning = this.skinning),
      (e.morphTargets = this.morphTargets),
      (e.morphNormals = this.morphNormals),
      e
    );
  }),
  (THREE.SpriteMaterial = function (e) {
    THREE.Material.call(this),
      (this.color = new THREE.Color(16777215)),
      (this.map = new THREE.Texture()),
      (this.useScreenCoordinates = !0),
      (this.depthTest = !this.useScreenCoordinates),
      (this.sizeAttenuation = !this.useScreenCoordinates),
      (this.scaleByViewport = !this.sizeAttenuation),
      (this.alignment = THREE.SpriteAlignment.center.clone()),
      (this.fog = !1),
      (this.uvOffset = new THREE.Vector2(0, 0)),
      (this.uvScale = new THREE.Vector2(1, 1)),
      this.setValues(e),
      void 0 === (e = e || {}).depthTest &&
        (this.depthTest = !this.useScreenCoordinates),
      void 0 === e.sizeAttenuation &&
        (this.sizeAttenuation = !this.useScreenCoordinates),
      void 0 === e.scaleByViewport &&
        (this.scaleByViewport = !this.sizeAttenuation);
  }),
  (THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.SpriteMaterial.prototype.clone = function () {
    var e = new THREE.SpriteMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.map = this.map),
      (e.useScreenCoordinates = this.useScreenCoordinates),
      (e.sizeAttenuation = this.sizeAttenuation),
      (e.scaleByViewport = this.scaleByViewport),
      e.alignment.copy(this.alignment),
      e.uvOffset.copy(this.uvOffset),
      e.uvScale.copy(this.uvScale),
      (e.fog = this.fog),
      e
    );
  }),
  (THREE.SpriteAlignment = {}),
  (THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1)),
  (THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1)),
  (THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1)),
  (THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0)),
  (THREE.SpriteAlignment.center = new THREE.Vector2(0, 0)),
  (THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0)),
  (THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1)),
  (THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1)),
  (THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1)),
  (THREE.Texture = function (e, t, i, r, n, o, a, s, h) {
    (this.id = THREE.TextureIdCount++),
      (this.name = ""),
      (this.image = e),
      (this.mipmaps = []),
      (this.mapping = void 0 !== t ? t : new THREE.UVMapping()),
      (this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping),
      (this.wrapT = void 0 !== r ? r : THREE.ClampToEdgeWrapping),
      (this.magFilter = void 0 !== n ? n : THREE.LinearFilter),
      (this.minFilter = void 0 !== o ? o : THREE.LinearMipMapLinearFilter),
      (this.anisotropy = void 0 !== h ? h : 1),
      (this.format = void 0 !== a ? a : THREE.RGBAFormat),
      (this.type = void 0 !== s ? s : THREE.UnsignedByteType),
      (this.offset = new THREE.Vector2(0, 0)),
      (this.repeat = new THREE.Vector2(1, 1)),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.needsUpdate = !1),
      (this.onUpdate = null);
  }),
  (THREE.Texture.prototype = {
    constructor: THREE.Texture,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    clone: function (e) {
      return (
        void 0 === e && (e = new THREE.Texture()),
        (e.image = this.image),
        (e.mipmaps = this.mipmaps.slice(0)),
        (e.mapping = this.mapping),
        (e.wrapS = this.wrapS),
        (e.wrapT = this.wrapT),
        (e.magFilter = this.magFilter),
        (e.minFilter = this.minFilter),
        (e.anisotropy = this.anisotropy),
        (e.format = this.format),
        (e.type = this.type),
        e.offset.copy(this.offset),
        e.repeat.copy(this.repeat),
        (e.generateMipmaps = this.generateMipmaps),
        (e.premultiplyAlpha = this.premultiplyAlpha),
        (e.flipY = this.flipY),
        (e.unpackAlignment = this.unpackAlignment),
        e
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  }),
  (THREE.TextureIdCount = 0),
  (THREE.CompressedTexture = function (e, t, i, r, n, o, a, s, h, l, c) {
    THREE.Texture.call(this, null, o, a, s, h, l, r, n, c),
      (this.image = { width: t, height: i }),
      (this.mipmaps = e),
      (this.generateMipmaps = !1);
  }),
  (THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype)),
  (THREE.CompressedTexture.prototype.clone = function () {
    var e = new THREE.CompressedTexture();
    return THREE.Texture.prototype.clone.call(this, e), e;
  }),
  (THREE.DataTexture = function (e, t, i, r, n, o, a, s, h, l, c) {
    THREE.Texture.call(this, null, o, a, s, h, l, r, n, c),
      (this.image = { data: e, width: t, height: i });
  }),
  (THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype)),
  (THREE.DataTexture.prototype.clone = function () {
    var e = new THREE.DataTexture();
    return THREE.Texture.prototype.clone.call(this, e), e;
  }),
  (THREE.Particle = function (e) {
    THREE.Object3D.call(this), (this.material = e);
  }),
  (THREE.Particle.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Particle.prototype.clone = function (e) {
    return (
      void 0 === e && (e = new THREE.Particle(this.material)),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.ParticleSystem = function (e, t) {
    THREE.Object3D.call(this),
      (this.geometry = e),
      (this.material =
        void 0 !== t
          ? t
          : new THREE.ParticleBasicMaterial({
              color: 16777215 * Math.random(),
            })),
      (this.sortParticles = !1),
      this.geometry &&
        null === this.geometry.boundingSphere &&
        this.geometry.computeBoundingSphere(),
      (this.frustumCulled = !1);
  }),
  (THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.ParticleSystem.prototype.clone = function (e) {
    return (
      void 0 === e &&
        (e = new THREE.ParticleSystem(this.geometry, this.material)),
      (e.sortParticles = this.sortParticles),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.Line = function (e, t, i) {
    THREE.Object3D.call(this),
      (this.geometry = e),
      (this.material =
        void 0 !== t
          ? t
          : new THREE.LineBasicMaterial({ color: 16777215 * Math.random() })),
      (this.type = void 0 !== i ? i : THREE.LineStrip),
      this.geometry &&
        (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
  }),
  (THREE.LineStrip = 0),
  (THREE.LinePieces = 1),
  (THREE.Line.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Line.prototype.clone = function (e) {
    return (
      void 0 === e &&
        (e = new THREE.Line(this.geometry, this.material, this.type)),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.Mesh = function (e, t) {
    THREE.Object3D.call(this),
      (this.material = this.geometry = null),
      this.setGeometry(e),
      this.setMaterial(t);
  }),
  (THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Mesh.prototype.setGeometry = function (e) {
    void 0 !== e &&
      ((this.geometry = e),
      null === this.geometry.boundingSphere &&
        this.geometry.computeBoundingSphere(),
      this.updateMorphTargets());
  }),
  (THREE.Mesh.prototype.setMaterial = function (e) {
    this.material =
      void 0 !== e
        ? e
        : new THREE.MeshBasicMaterial({
            color: 16777215 * Math.random(),
            wireframe: !0,
          });
  }),
  (THREE.Mesh.prototype.updateMorphTargets = function () {
    if (0 < this.geometry.morphTargets.length) {
      (this.morphTargetBase = -1),
        (this.morphTargetForcedOrder = []),
        (this.morphTargetInfluences = []),
        (this.morphTargetDictionary = {});
      for (var e = 0, t = this.geometry.morphTargets.length; e < t; e++)
        this.morphTargetInfluences.push(0),
          (this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e);
    }
  }),
  (THREE.Mesh.prototype.getMorphTargetIndexByName = function (e) {
    return void 0 !== this.morphTargetDictionary[e]
      ? this.morphTargetDictionary[e]
      : (console.log(
          "THREE.Mesh.getMorphTargetIndexByName: morph target " +
            e +
            " does not exist. Returning 0."
        ),
        0);
  }),
  (THREE.Mesh.prototype.clone = function (e) {
    return (
      void 0 === e && (e = new THREE.Mesh(this.geometry, this.material)),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.Bone = function (e) {
    THREE.Object3D.call(this),
      (this.skin = e),
      (this.skinMatrix = new THREE.Matrix4());
  }),
  (THREE.Bone.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Bone.prototype.update = function (e, t) {
    this.matrixAutoUpdate && (t |= this.updateMatrix()),
      (t || this.matrixWorldNeedsUpdate) &&
        (e
          ? this.skinMatrix.multiplyMatrices(e, this.matrix)
          : this.skinMatrix.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0));
    var i,
      r = this.children.length;
    for (i = 0; i < r; i++) this.children[i].update(this.skinMatrix, t);
  }),
  (THREE.SkinnedMesh = function (e, t, i) {
    var r, n, o;
    if (
      (THREE.Mesh.call(this, e, t),
      (this.useVertexTexture = void 0 === i || i),
      (this.identityMatrix = new THREE.Matrix4()),
      (this.bones = []),
      (this.boneMatrices = []),
      this.geometry && void 0 !== this.geometry.bones)
    ) {
      for (e = 0; e < this.geometry.bones.length; e++)
        (r = (i = this.geometry.bones[e]).pos),
          (n = i.rotq),
          (o = i.scl),
          ((t = this.addBone()).name = i.name),
          t.position.set(r[0], r[1], r[2]),
          t.quaternion.set(n[0], n[1], n[2], n[3]),
          (t.useQuaternion = !0),
          void 0 !== o ? t.scale.set(o[0], o[1], o[2]) : t.scale.set(1, 1, 1);
      for (e = 0; e < this.bones.length; e++)
        (i = this.geometry.bones[e]),
          (t = this.bones[e]),
          -1 === i.parent ? this.add(t) : this.bones[i.parent].add(t);
      (e = this.bones.length),
        this.useVertexTexture
          ? ((this.boneTextureHeight =
              this.boneTextureWidth =
              e =
                256 < e ? 64 : 64 < e ? 32 : 16 < e ? 16 : 8),
            (this.boneMatrices = new Float32Array(
              4 * this.boneTextureWidth * this.boneTextureHeight
            )),
            (this.boneTexture = new THREE.DataTexture(
              this.boneMatrices,
              this.boneTextureWidth,
              this.boneTextureHeight,
              THREE.RGBAFormat,
              THREE.FloatType
            )),
            (this.boneTexture.minFilter = THREE.NearestFilter),
            (this.boneTexture.magFilter = THREE.NearestFilter),
            (this.boneTexture.generateMipmaps = !1),
            (this.boneTexture.flipY = !1))
          : (this.boneMatrices = new Float32Array(16 * e)),
        this.pose();
    }
  }),
  (THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.SkinnedMesh.prototype.addBone = function (e) {
    return void 0 === e && (e = new THREE.Bone(this)), this.bones.push(e), e;
  }),
  (THREE.SkinnedMesh.prototype.updateMatrixWorld = function (e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.parent
          ? this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix
            )
          : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1));
    for (var e = 0, t = this.children.length; e < t; e++) {
      var i = this.children[e];
      i instanceof THREE.Bone
        ? i.update(this.identityMatrix, !1)
        : i.updateMatrixWorld(!0);
    }
    if (void 0 == this.boneInverses)
      for (this.boneInverses = [], e = 0, t = this.bones.length; e < t; e++)
        (i = new THREE.Matrix4()).getInverse(this.bones[e].skinMatrix),
          this.boneInverses.push(i);
    for (e = 0, t = this.bones.length; e < t; e++)
      THREE.SkinnedMesh.offsetMatrix.multiplyMatrices(
        this.bones[e].skinMatrix,
        this.boneInverses[e]
      ),
        THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(
          this.boneMatrices,
          16 * e
        );
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0);
  }),
  (THREE.SkinnedMesh.prototype.pose = function () {
    this.updateMatrixWorld(!0);
    for (var e = 0; e < this.geometry.skinIndices.length; e++) {
      var t = this.geometry.skinWeights[e],
        i = 1 / t.lengthManhattan();
      1 / 0 !== i ? t.multiplyScalar(i) : t.set(1);
    }
  }),
  (THREE.SkinnedMesh.prototype.clone = function (e) {
    return (
      void 0 === e &&
        (e = new THREE.SkinnedMesh(
          this.geometry,
          this.material,
          this.useVertexTexture
        )),
      THREE.Mesh.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4()),
  (THREE.MorphAnimMesh = function (e, t) {
    THREE.Mesh.call(this, e, t),
      (this.duration = 1e3),
      (this.mirroredLoop = !1),
      (this.currentKeyframe = this.lastKeyframe = this.time = 0),
      (this.direction = 1),
      (this.directionBackwards = !1),
      this.setFrameRange(0, this.geometry.morphTargets.length - 1);
  }),
  (THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.MorphAnimMesh.prototype.setFrameRange = function (e, t) {
    (this.startKeyframe = e),
      (this.endKeyframe = t),
      (this.length = this.endKeyframe - this.startKeyframe + 1);
  }),
  (THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    (this.direction = 1), (this.directionBackwards = !1);
  }),
  (THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    (this.direction = -1), (this.directionBackwards = !0);
  }),
  (THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var e = this.geometry;
    e.animations || (e.animations = {});
    for (
      var t,
        i = e.animations,
        r = /([a-z]+)(\d+)/,
        n = 0,
        o = e.morphTargets.length;
      n < o;
      n++
    ) {
      var a = e.morphTargets[n].name.match(r);
      if (a && 1 < a.length) {
        i[(a = a[1])] || (i[a] = { start: 1 / 0, end: -1 / 0 });
        var s = i[a];
        n < s.start && (s.start = n), n > s.end && (s.end = n), t || (t = a);
      }
    }
    e.firstAnimation = t;
  }),
  (THREE.MorphAnimMesh.prototype.setAnimationLabel = function (e, t, i) {
    this.geometry.animations || (this.geometry.animations = {}),
      (this.geometry.animations[e] = { start: t, end: i });
  }),
  (THREE.MorphAnimMesh.prototype.playAnimation = function (e, t) {
    var i = this.geometry.animations[e];
    i
      ? (this.setFrameRange(i.start, i.end),
        (this.duration = 1e3 * ((i.end - i.start) / t)),
        (this.time = 0))
      : console.warn("animation[" + e + "] undefined");
  }),
  (THREE.MorphAnimMesh.prototype.updateAnimation = function (e) {
    var t = this.duration / this.length;
    (this.time += this.direction * e),
      this.mirroredLoop
        ? (this.time > this.duration || 0 > this.time) &&
          ((this.direction *= -1),
          this.time > this.duration &&
            ((this.time = this.duration), (this.directionBackwards = !0)),
          0 > this.time && ((this.time = 0), (this.directionBackwards = !1)))
        : ((this.time %= this.duration),
          0 > this.time && (this.time += this.duration)),
      (e =
        this.startKeyframe +
        THREE.Math.clamp(Math.floor(this.time / t), 0, this.length - 1)) !==
        this.currentKeyframe &&
        ((this.morphTargetInfluences[this.lastKeyframe] = 0),
        (this.morphTargetInfluences[this.currentKeyframe] = 1),
        (this.morphTargetInfluences[e] = 0),
        (this.lastKeyframe = this.currentKeyframe),
        (this.currentKeyframe = e)),
      (t = (this.time % t) / t),
      this.directionBackwards && (t = 1 - t),
      (this.morphTargetInfluences[this.currentKeyframe] = t),
      (this.morphTargetInfluences[this.lastKeyframe] = 1 - t);
  }),
  (THREE.MorphAnimMesh.prototype.clone = function (e) {
    return (
      void 0 === e &&
        (e = new THREE.MorphAnimMesh(this.geometry, this.material)),
      (e.duration = this.duration),
      (e.mirroredLoop = this.mirroredLoop),
      (e.time = this.time),
      (e.lastKeyframe = this.lastKeyframe),
      (e.currentKeyframe = this.currentKeyframe),
      (e.direction = this.direction),
      (e.directionBackwards = this.directionBackwards),
      THREE.Mesh.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.Ribbon = function (e, t) {
    THREE.Object3D.call(this), (this.geometry = e), (this.material = t);
  }),
  (THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Ribbon.prototype.clone = function (e) {
    return (
      void 0 === e && (e = new THREE.Ribbon(this.geometry, this.material)),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.LOD = function () {
    THREE.Object3D.call(this), (this.objects = []);
  }),
  (THREE.LOD.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.LOD.prototype.addLevel = function (e, t) {
    void 0 === t && (t = 0);
    for (
      var t = Math.abs(t), i = 0;
      i < this.objects.length && !(t < this.objects[i].distance);
      i++
    );
    this.objects.splice(i, 0, { distance: t, object: e }), this.add(e);
  }),
  (THREE.LOD.prototype.getObjectForDistance = function (e) {
    for (
      var t = 1, i = this.objects.length;
      t < i && !(e < this.objects[t].distance);
      t++
    );
    return this.objects[t - 1].object;
  }),
  (THREE.LOD.prototype.update = (function () {
    var e = new THREE.Vector3(),
      t = new THREE.Vector3();
    return function (i) {
      if (1 < this.objects.length) {
        e.getPositionFromMatrix(i.matrixWorld),
          t.getPositionFromMatrix(this.matrixWorld),
          (i = e.distanceTo(t)),
          (this.objects[0].object.visible = !0);
        for (var r = 1, n = this.objects.length; r < n; r++)
          if (i >= this.objects[r].distance)
            (this.objects[r - 1].object.visible = !1),
              (this.objects[r].object.visible = !0);
          else break;
        for (; r < n; r++) this.objects[r].object.visible = !1;
      }
    };
  })()),
  (THREE.LOD.prototype.clone = function () {}),
  (THREE.Sprite = function (e) {
    THREE.Object3D.call(this),
      (this.material = void 0 !== e ? e : new THREE.SpriteMaterial()),
      (this.rotation3d = this.rotation),
      (this.rotation = 0);
  }),
  (THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Sprite.prototype.updateMatrix = function () {
    this.rotation3d.set(0, 0, this.rotation),
      this.quaternion.setFromEuler(this.rotation3d, this.eulerOrder),
      this.matrix.makeFromPositionQuaternionScale(
        this.position,
        this.quaternion,
        this.scale
      ),
      (this.matrixWorldNeedsUpdate = !0);
  }),
  (THREE.Sprite.prototype.clone = function (e) {
    return (
      void 0 === e && (e = new THREE.Sprite(this.material)),
      THREE.Object3D.prototype.clone.call(this, e),
      e
    );
  }),
  (THREE.Scene = function () {
    THREE.Object3D.call(this),
      (this.overrideMaterial = this.fog = null),
      (this.autoUpdate = !0),
      (this.matrixAutoUpdate = !1),
      (this.__objects = []),
      (this.__lights = []),
      (this.__objectsAdded = []),
      (this.__objectsRemoved = []);
  }),
  (THREE.Scene.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Scene.prototype.__addObject = function (e) {
    if (e instanceof THREE.Light)
      -1 === this.__lights.indexOf(e) && this.__lights.push(e),
        e.target && void 0 === e.target.parent && this.add(e.target);
    else if (
      !(e instanceof THREE.Camera || e instanceof THREE.Bone) &&
      -1 === this.__objects.indexOf(e)
    ) {
      this.__objects.push(e), this.__objectsAdded.push(e);
      var t = this.__objectsRemoved.indexOf(e);
      -1 !== t && this.__objectsRemoved.splice(t, 1);
    }
    for (t = 0; t < e.children.length; t++) this.__addObject(e.children[t]);
  }),
  (THREE.Scene.prototype.__removeObject = function (e) {
    if (e instanceof THREE.Light) {
      var t = this.__lights.indexOf(e);
      -1 !== t && this.__lights.splice(t, 1);
    } else
      e instanceof THREE.Camera ||
        (-1 !== (t = this.__objects.indexOf(e)) &&
          (this.__objects.splice(t, 1),
          this.__objectsRemoved.push(e),
          -1 !== (t = this.__objectsAdded.indexOf(e)) &&
            this.__objectsAdded.splice(t, 1)));
    for (t = 0; t < e.children.length; t++) this.__removeObject(e.children[t]);
  }),
  (THREE.Fog = function (e, t, i) {
    (this.name = ""),
      (this.color = new THREE.Color(e)),
      (this.near = void 0 !== t ? t : 1),
      (this.far = void 0 !== i ? i : 1e3);
  }),
  (THREE.Fog.prototype.clone = function () {
    return new THREE.Fog(this.color.getHex(), this.near, this.far);
  }),
  (THREE.FogExp2 = function (e, t) {
    (this.name = ""),
      (this.color = new THREE.Color(e)),
      (this.density = void 0 !== t ? t : 25e-5);
  }),
  (THREE.FogExp2.prototype.clone = function () {
    return new THREE.FogExp2(this.color.getHex(), this.density);
  }),
  (THREE.CanvasRenderer = function (e) {
    function t(e) {
      et !== e && (et = Z.globalAlpha = e);
    }
    function i(e) {
      ei !== e &&
        (e === THREE.NormalBlending
          ? (Z.globalCompositeOperation = "source-over")
          : e === THREE.AdditiveBlending
          ? (Z.globalCompositeOperation = "lighter")
          : e === THREE.SubtractiveBlending &&
            (Z.globalCompositeOperation = "darker"),
        (ei = e));
    }
    function r(e) {
      eo !== e && (eo = Z.lineWidth = e);
    }
    function n(e) {
      ea !== e && (ea = Z.lineCap = e);
    }
    function o(e) {
      es !== e && (es = Z.lineJoin = e);
    }
    function a(e) {
      er !== e && (er = Z.strokeStyle = e);
    }
    function s(e) {
      en !== e && (en = Z.fillStyle = e);
    }
    function h(e, t) {
      (eh !== e || el !== t) && (Z.setLineDash([e, t]), (eh = e), (el = t));
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION);
    var l,
      c,
      p,
      u,
      E,
      f,
      d,
      m,
      g,
      T,
      v,
      $,
      y,
      R,
      x,
      H,
      _,
      w,
      S,
      b,
      M,
      C,
      A,
      L,
      P,
      D,
      F,
      U,
      V,
      z,
      N,
      B,
      I,
      O,
      k,
      G,
      W,
      j,
      X,
      Y = THREE.Math.smoothstep,
      e = e || {},
      q = this,
      K = new THREE.Projector(),
      Q = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      Z = Q.getContext("2d"),
      J = new THREE.Color(0),
      ee = 0,
      et = 1,
      ei = 0,
      er = null,
      en = null,
      eo = null,
      ea = null,
      es = null,
      eh = null,
      el = 0,
      ec = new THREE.RenderableVertex(),
      ep = new THREE.RenderableVertex(),
      eu = new THREE.Color(),
      eE = new THREE.Color(),
      ef = new THREE.Color(),
      ed = new THREE.Color(),
      em = new THREE.Color(),
      eg = new THREE.Color(),
      eT = new THREE.Color(),
      ev = new THREE.Color(),
      e$ = {},
      ey = {},
      eR = new THREE.Box2(),
      ex = new THREE.Box2(),
      eH = new THREE.Box2(),
      e_ = new THREE.Color(),
      ew = new THREE.Color(),
      e8 = new THREE.Color(),
      eS = new THREE.Vector3(),
      eb = 16;
    ((O = document.createElement("canvas")).width = O.height = 2),
      ((k = O.getContext("2d")).fillStyle = "rgba(0,0,0,1)"),
      k.fillRect(0, 0, 2, 2),
      (W = (G = k.getImageData(0, 0, 2, 2)).data),
      ((j = document.createElement("canvas")).width = j.height = eb),
      (X = j.getContext("2d")).translate(-eb / 2, -eb / 2),
      X.scale(eb, eb),
      eb--,
      void 0 === Z.setLineDash &&
        (Z.setLineDash =
          void 0 !== Z.mozDash
            ? function (e) {
                Z.mozDash = null !== e[0] ? e : null;
              }
            : function () {}),
      (this.domElement = Q),
      (this.devicePixelRatio =
        void 0 !== e.devicePixelRatio
          ? e.devicePixelRatio
          : void 0 !== window.devicePixelRatio
          ? window.devicePixelRatio
          : 1),
      (this.sortElements = this.sortObjects = this.autoClear = !0),
      (this.info = { render: { vertices: 0, faces: 0 } }),
      (this.supportsVertexTextures = function () {}),
      (this.setFaceCulling = function () {}),
      (this.setSize = function (e, t, i) {
        (u = e * this.devicePixelRatio),
          (E = t * this.devicePixelRatio),
          (f = Math.floor(u / 2)),
          (d = Math.floor(E / 2)),
          (Q.width = u),
          (Q.height = E),
          1 !== this.devicePixelRatio &&
            !1 !== i &&
            ((Q.style.width = e + "px"), (Q.style.height = t + "px")),
          eR.set(new THREE.Vector2(-f, -d), new THREE.Vector2(f, d)),
          ex.set(new THREE.Vector2(-f, -d), new THREE.Vector2(f, d)),
          (et = 1),
          (ei = 0),
          (es = ea = eo = en = er = null);
      }),
      (this.setClearColor = function (e, t) {
        J.set(e),
          (ee = void 0 !== t ? t : 1),
          ex.set(new THREE.Vector2(-f, -d), new THREE.Vector2(f, d));
      }),
      (this.setClearColorHex = function (e, t) {
        console.warn(
          "DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."
        ),
          this.setClearColor(e, t);
      }),
      (this.getMaxAnisotropy = function () {
        return 0;
      }),
      (this.clear = function () {
        Z.setTransform(1, 0, 0, -1, f, d),
          !1 === ex.empty() &&
            (ex.intersect(eR),
            ex.expandByScalar(2),
            1 > ee &&
              Z.clearRect(
                0 | ex.min.x,
                0 | ex.min.y,
                (ex.max.x - ex.min.x) | 0,
                (ex.max.y - ex.min.y) | 0
              ),
            0 < ee &&
              (i(THREE.NormalBlending),
              t(1),
              s(
                "rgba(" +
                  Math.floor(255 * J.r) +
                  "," +
                  Math.floor(255 * J.g) +
                  "," +
                  Math.floor(255 * J.b) +
                  "," +
                  ee +
                  ")"
              ),
              Z.fillRect(
                0 | ex.min.x,
                0 | ex.min.y,
                (ex.max.x - ex.min.x) | 0,
                (ex.max.y - ex.min.y) | 0
              )),
            ex.makeEmpty());
      }),
      (this.render = function (e, u) {
        function E(e, t, i) {
          for (var r = 0, n = p.length; r < n; r++) {
            var o = p[r];
            if ((ev.copy(o.color), o instanceof THREE.DirectionalLight)) {
              var a = eS.getPositionFromMatrix(o.matrixWorld).normalize(),
                s = t.dot(a);
              0 >= s || ((s *= o.intensity), i.add(ev.multiplyScalar(s)));
            } else
              o instanceof THREE.PointLight &&
                ((a = eS.getPositionFromMatrix(o.matrixWorld)),
                0 >= (s = t.dot(eS.subVectors(a, e).normalize())) ||
                  (0 !=
                    (s *=
                      0 == o.distance
                        ? 1
                        : 1 - Math.min(e.distanceTo(a) / o.distance, 1)) &&
                    ((s *= o.intensity), i.add(ev.multiplyScalar(s)))));
          }
        }
        function Q(e, r, n, o, a, s, h, l) {
          (q.info.render.vertices += 3),
            q.info.render.faces++,
            t(l.opacity),
            i(l.blending),
            ($ = e.positionScreen.x),
            (y = e.positionScreen.y),
            (R = r.positionScreen.x),
            (x = r.positionScreen.y),
            J($, y, R, x, (H = n.positionScreen.x), (_ = n.positionScreen.y)),
            (l instanceof THREE.MeshLambertMaterial ||
              l instanceof THREE.MeshPhongMaterial) &&
            null === l.map
              ? (eg.copy(l.color),
                eT.copy(l.emissive),
                l.vertexColors === THREE.FaceColors && eg.multiply(h.color),
                !1 === l.wireframe &&
                l.shading == THREE.SmoothShading &&
                3 == h.vertexNormalsLength
                  ? (eE.copy(e_),
                    ef.copy(e_),
                    ed.copy(e_),
                    E(h.v1.positionWorld, h.vertexNormalsModel[0], eE),
                    E(h.v2.positionWorld, h.vertexNormalsModel[1], ef),
                    E(h.v3.positionWorld, h.vertexNormalsModel[2], ed),
                    eE.multiply(eg).add(eT),
                    ef.multiply(eg).add(eT),
                    ed.multiply(eg).add(eT),
                    em.addColors(ef, ed).multiplyScalar(0.5),
                    en(
                      $,
                      y,
                      R,
                      x,
                      H,
                      _,
                      0,
                      0,
                      1,
                      0,
                      0,
                      1,
                      (D = eo(eE, ef, ed, em))
                    ))
                  : (eu.copy(e_),
                    E(h.centroidModel, h.normalModel, eu),
                    eu.multiply(eg).add(eT),
                    !0 === l.wireframe
                      ? et(
                          eu,
                          l.wireframeLinewidth,
                          l.wireframeLinecap,
                          l.wireframeLinejoin
                        )
                      : ei(eu)))
              : l instanceof THREE.MeshBasicMaterial ||
                l instanceof THREE.MeshLambertMaterial ||
                l instanceof THREE.MeshPhongMaterial
              ? null !== l.map
                ? l.map.mapping instanceof THREE.UVMapping &&
                  er(
                    $,
                    y,
                    R,
                    x,
                    H,
                    _,
                    (F = h.uvs[0])[o].x,
                    F[o].y,
                    F[a].x,
                    F[a].y,
                    F[s].x,
                    F[s].y,
                    l.map
                  )
                : null !== l.envMap
                ? l.envMap.mapping instanceof
                    THREE.SphericalReflectionMapping &&
                  (eS.copy(h.vertexNormalsModelView[o]),
                  (U = 0.5 * eS.x + 0.5),
                  (V = 0.5 * eS.y + 0.5),
                  eS.copy(h.vertexNormalsModelView[a]),
                  (z = 0.5 * eS.x + 0.5),
                  (N = 0.5 * eS.y + 0.5),
                  eS.copy(h.vertexNormalsModelView[s]),
                  er(
                    $,
                    y,
                    R,
                    x,
                    H,
                    _,
                    U,
                    V,
                    z,
                    N,
                    (B = 0.5 * eS.x + 0.5),
                    (I = 0.5 * eS.y + 0.5),
                    l.envMap
                  ))
                : (eu.copy(l.color),
                  l.vertexColors === THREE.FaceColors && eu.multiply(h.color),
                  !0 === l.wireframe
                    ? et(
                        eu,
                        l.wireframeLinewidth,
                        l.wireframeLinecap,
                        l.wireframeLinejoin
                      )
                    : ei(eu))
              : l instanceof THREE.MeshDepthMaterial
              ? ((L = u.near),
                (P = u.far),
                (eE.r =
                  eE.g =
                  eE.b =
                    1 - Y(e.positionScreen.z * e.positionScreen.w, L, P)),
                (ef.r =
                  ef.g =
                  ef.b =
                    1 - Y(r.positionScreen.z * r.positionScreen.w, L, P)),
                (ed.r =
                  ed.g =
                  ed.b =
                    1 - Y(n.positionScreen.z * n.positionScreen.w, L, P)),
                em.addColors(ef, ed).multiplyScalar(0.5),
                en(
                  $,
                  y,
                  R,
                  x,
                  H,
                  _,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  (D = eo(eE, ef, ed, em))
                ))
              : l instanceof THREE.MeshNormalMaterial &&
                (l.shading == THREE.FlatShading
                  ? ((e = h.normalModelView),
                    eu.setRGB(e.x, e.y, e.z).multiplyScalar(0.5).addScalar(0.5),
                    !0 === l.wireframe
                      ? et(
                          eu,
                          l.wireframeLinewidth,
                          l.wireframeLinecap,
                          l.wireframeLinejoin
                        )
                      : ei(eu))
                  : l.shading == THREE.SmoothShading &&
                    ((e = h.vertexNormalsModelView[o]),
                    eE.setRGB(e.x, e.y, e.z).multiplyScalar(0.5).addScalar(0.5),
                    (e = h.vertexNormalsModelView[a]),
                    ef.setRGB(e.x, e.y, e.z).multiplyScalar(0.5).addScalar(0.5),
                    (e = h.vertexNormalsModelView[s]),
                    ed.setRGB(e.x, e.y, e.z).multiplyScalar(0.5).addScalar(0.5),
                    em.addColors(ef, ed).multiplyScalar(0.5),
                    en(
                      $,
                      y,
                      R,
                      x,
                      H,
                      _,
                      0,
                      0,
                      1,
                      0,
                      0,
                      1,
                      (D = eo(eE, ef, ed, em))
                    )));
        }
        function J(e, t, i, r, n, o) {
          Z.beginPath(),
            Z.moveTo(e, t),
            Z.lineTo(i, r),
            Z.lineTo(n, o),
            Z.closePath();
        }
        function ee(e, t, i, r, n, o, a, s) {
          Z.beginPath(),
            Z.moveTo(e, t),
            Z.lineTo(i, r),
            Z.lineTo(n, o),
            Z.lineTo(a, s),
            Z.closePath();
        }
        function et(e, t, i, s) {
          r(t),
            n(i),
            o(s),
            a(e.getStyle()),
            Z.stroke(),
            eH.expandByScalar(2 * t);
        }
        function ei(e) {
          s(e.getStyle()), Z.fill();
        }
        function er(e, t, i, r, n, o, a, h, l, c, p, u, E) {
          if (
            !(
              E instanceof THREE.DataTexture ||
              void 0 === E.image ||
              0 == E.image.width
            )
          ) {
            if (!0 === E.needsUpdate) {
              var f = E.wrapS == THREE.RepeatWrapping,
                d = E.wrapT == THREE.RepeatWrapping;
              (e$[E.id] = Z.createPattern(
                E.image,
                !0 === f && !0 === d
                  ? "repeat"
                  : !0 === f && !1 === d
                  ? "repeat-x"
                  : !1 === f && !0 === d
                  ? "repeat-y"
                  : "no-repeat"
              )),
                (E.needsUpdate = !1);
            }
            void 0 === e$[E.id] ? s("rgba(0,0,0,1)") : s(e$[E.id]);
            var f = E.offset.x / E.repeat.x,
              d = E.offset.y / E.repeat.y,
              m = E.image.width * E.repeat.x,
              g = E.image.height * E.repeat.y,
              a = (a + f) * m,
              h = (1 - h + d) * g,
              i = i - e,
              r = r - t,
              n = n - e,
              o = o - t,
              l = (l + f) * m - a,
              c = (1 - c + d) * g - h,
              p = (p + f) * m - a,
              u = (1 - u + d) * g - h,
              f = l * u - p * c;
            0 === f
              ? (void 0 === ey[E.id] &&
                  (((t = document.createElement("canvas")).width =
                    E.image.width),
                  (t.height = E.image.height),
                  (t = t.getContext("2d")).drawImage(E.image, 0, 0),
                  (ey[E.id] = t.getImageData(
                    0,
                    0,
                    E.image.width,
                    E.image.height
                  ).data)),
                (t = ey[E.id]),
                (a = 4 * (Math.floor(a) + Math.floor(h) * E.image.width)),
                eu.setRGB(t[a] / 255, t[a + 1] / 255, t[a + 2] / 255),
                ei(eu))
              : ((E = (u * i - c * n) * (f = 1 / f)),
                (c = (u * r - c * o) * f),
                (i = (l * n - p * i) * f),
                (r = (l * o - p * r) * f),
                (e = e - E * a - i * h),
                (a = t - c * a - r * h),
                Z.save(),
                Z.transform(E, c, i, r, e, a),
                Z.fill(),
                Z.restore());
          }
        }
        function en(e, t, i, r, n, o, a, s, h, l, c, p, u) {
          var E, f;
          (E = u.width - 1),
            (f = u.height - 1),
            (a *= E),
            (s *= f),
            (i -= e),
            (r -= t),
            (n -= e),
            (o -= t),
            (h = h * E - a),
            (l = l * f - s),
            (c = c * E - a),
            (f = 1 / (h * (p = p * f - s) - c * l)),
            (E = (p * i - l * n) * f),
            (l = (p * r - l * o) * f),
            (i = (h * n - c * i) * f),
            (r = (h * o - c * r) * f),
            (e = e - E * a - i * s),
            (t = t - l * a - r * s),
            Z.save(),
            Z.transform(E, l, i, r, e, t),
            Z.clip(),
            Z.drawImage(u, 0, 0),
            Z.restore();
        }
        function eo(e, t, i, r) {
          return (
            (W[0] = (255 * e.r) | 0),
            (W[1] = (255 * e.g) | 0),
            (W[2] = (255 * e.b) | 0),
            (W[4] = (255 * t.r) | 0),
            (W[5] = (255 * t.g) | 0),
            (W[6] = (255 * t.b) | 0),
            (W[8] = (255 * i.r) | 0),
            (W[9] = (255 * i.g) | 0),
            (W[10] = (255 * i.b) | 0),
            (W[12] = (255 * r.r) | 0),
            (W[13] = (255 * r.g) | 0),
            (W[14] = (255 * r.b) | 0),
            k.putImageData(G, 0, 0),
            X.drawImage(O, 0, 0),
            j
          );
        }
        function ea(e, t) {
          var i = t.x - e.x,
            r = t.y - e.y,
            n = i * i + r * r;
          0 !== n &&
            ((i *= n = 1 / Math.sqrt(n)),
            (r *= n),
            (t.x += i),
            (t.y += r),
            (e.x -= i),
            (e.y -= r));
        }
        if (!1 == u instanceof THREE.Camera)
          console.error(
            "THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."
          );
        else {
          !0 === this.autoClear && this.clear(),
            Z.setTransform(1, 0, 0, -1, f, d),
            (q.info.render.vertices = 0),
            (q.info.render.faces = 0),
            (c = (l = K.projectScene(e, u, this.sortObjects, this.sortElements))
              .elements),
            (p = l.lights),
            e_.setRGB(0, 0, 0),
            ew.setRGB(0, 0, 0),
            e8.setRGB(0, 0, 0);
          for (var es = 0, eh = p.length; es < eh; es++) {
            var el = p[es],
              eb = el.color;
            el instanceof THREE.AmbientLight
              ? e_.add(eb)
              : el instanceof THREE.DirectionalLight
              ? ew.add(eb)
              : el instanceof THREE.PointLight && e8.add(eb);
          }
          for (es = 0, eh = c.length; es < eh; es++) {
            var eM = c[es],
              el = eM.material;
            if (!(void 0 === el || !1 === el.visible)) {
              if ((eH.makeEmpty(), eM instanceof THREE.RenderableParticle)) {
                (m = eM),
                  (m.x *= f),
                  (m.y *= d),
                  (eb = m),
                  t(el.opacity),
                  i(el.blending);
                var eC = void 0,
                  e0 = void 0,
                  eA = void 0,
                  e1 = void 0,
                  eL = void 0,
                  eP = void 0,
                  eD = void 0;
                el instanceof THREE.ParticleBasicMaterial
                  ? null === el.map
                    ? ((eA = eM.object.scale.x),
                      (e1 = eM.object.scale.y),
                      (eA *= eM.scale.x * f),
                      (e1 *= eM.scale.y * d),
                      eH.min.set(eb.x - eA, eb.y - e1),
                      eH.max.set(eb.x + eA, eb.y + e1),
                      !1 === eR.isIntersectionBox(eH)
                        ? eH.makeEmpty()
                        : (s(el.color.getStyle()),
                          Z.save(),
                          Z.translate(eb.x, eb.y),
                          Z.rotate(-eM.rotation),
                          Z.scale(eA, e1),
                          Z.fillRect(-1, -1, 2, 2),
                          Z.restore()))
                    : ((eP = (eL = el.map.image).width >> 1),
                      (eD = eL.height >> 1),
                      (eA = eM.scale.x * f),
                      (e1 = eM.scale.y * d),
                      (eC = eA * eP),
                      (e0 = e1 * eD),
                      eH.min.set(eb.x - eC, eb.y - e0),
                      eH.max.set(eb.x + eC, eb.y + e0),
                      !1 === eR.isIntersectionBox(eH)
                        ? eH.makeEmpty()
                        : (Z.save(),
                          Z.translate(eb.x, eb.y),
                          Z.rotate(-eM.rotation),
                          Z.scale(eA, -e1),
                          Z.translate(-eP, -eD),
                          Z.drawImage(eL, 0, 0),
                          Z.restore()))
                  : el instanceof THREE.ParticleCanvasMaterial &&
                    ((eC = eM.scale.x * f),
                    (e0 = eM.scale.y * d),
                    eH.min.set(eb.x - eC, eb.y - e0),
                    eH.max.set(eb.x + eC, eb.y + e0),
                    !1 === eR.isIntersectionBox(eH)
                      ? eH.makeEmpty()
                      : (a(el.color.getStyle()),
                        s(el.color.getStyle()),
                        Z.save(),
                        Z.translate(eb.x, eb.y),
                        Z.rotate(-eM.rotation),
                        Z.scale(eC, e0),
                        el.program(Z),
                        Z.restore()));
              } else if (eM instanceof THREE.RenderableLine)
                (m = eM.v1),
                  (g = eM.v2),
                  (m.positionScreen.x *= f),
                  (m.positionScreen.y *= d),
                  (g.positionScreen.x *= f),
                  (g.positionScreen.y *= d),
                  eH.setFromPoints([m.positionScreen, g.positionScreen]),
                  !0 === eR.isIntersectionBox(eH) &&
                    ((eb = m),
                    (eC = g),
                    (e0 = eM),
                    t(el.opacity),
                    i(el.blending),
                    Z.beginPath(),
                    Z.moveTo(eb.positionScreen.x, eb.positionScreen.y),
                    Z.lineTo(eC.positionScreen.x, eC.positionScreen.y),
                    el instanceof THREE.LineBasicMaterial
                      ? (r(el.linewidth),
                        n(el.linecap),
                        o(el.linejoin),
                        el.vertexColors !== THREE.VertexColors
                          ? a(el.color.getStyle())
                          : (eM = e0.vertexColors[0].getStyle()) ===
                            (e0 = e0.vertexColors[1].getStyle())
                          ? a(eM)
                          : ((eb = Z.createLinearGradient(
                              eb.positionScreen.x,
                              eb.positionScreen.y,
                              eC.positionScreen.x,
                              eC.positionScreen.y
                            )).addColorStop(0, eM),
                            eb.addColorStop(1, e0),
                            a(eb)),
                        Z.stroke(),
                        eH.expandByScalar(2 * el.linewidth))
                      : el instanceof THREE.LineDashedMaterial &&
                        (r(el.linewidth),
                        n(el.linecap),
                        o(el.linejoin),
                        a(el.color.getStyle()),
                        h(el.dashSize, el.gapSize),
                        Z.stroke(),
                        eH.expandByScalar(2 * el.linewidth),
                        h(null, null)));
              else if (eM instanceof THREE.RenderableFace3) {
                if (
                  ((m = eM.v1),
                  (g = eM.v2),
                  (T = eM.v3),
                  -1 > m.positionScreen.z ||
                    1 < m.positionScreen.z ||
                    -1 > g.positionScreen.z ||
                    1 < g.positionScreen.z ||
                    -1 > T.positionScreen.z ||
                    1 < T.positionScreen.z)
                )
                  continue;
                (m.positionScreen.x *= f),
                  (m.positionScreen.y *= d),
                  (g.positionScreen.x *= f),
                  (g.positionScreen.y *= d),
                  (T.positionScreen.x *= f),
                  (T.positionScreen.y *= d),
                  !0 === el.overdraw &&
                    (ea(m.positionScreen, g.positionScreen),
                    ea(g.positionScreen, T.positionScreen),
                    ea(T.positionScreen, m.positionScreen)),
                  eH.setFromPoints([
                    m.positionScreen,
                    g.positionScreen,
                    T.positionScreen,
                  ]),
                  !0 === eR.isIntersectionBox(eH) &&
                    Q(m, g, T, 0, 1, 2, eM, el);
              } else if (eM instanceof THREE.RenderableFace4) {
                if (
                  ((m = eM.v1),
                  (g = eM.v2),
                  (T = eM.v3),
                  (v = eM.v4),
                  -1 > m.positionScreen.z ||
                    1 < m.positionScreen.z ||
                    -1 > g.positionScreen.z ||
                    1 < g.positionScreen.z ||
                    -1 > T.positionScreen.z ||
                    1 < T.positionScreen.z ||
                    -1 > v.positionScreen.z ||
                    1 < v.positionScreen.z)
                )
                  continue;
                (m.positionScreen.x *= f),
                  (m.positionScreen.y *= d),
                  (g.positionScreen.x *= f),
                  (g.positionScreen.y *= d),
                  (T.positionScreen.x *= f),
                  (T.positionScreen.y *= d),
                  (v.positionScreen.x *= f),
                  (v.positionScreen.y *= d),
                  ec.positionScreen.copy(g.positionScreen),
                  ep.positionScreen.copy(v.positionScreen),
                  !0 === el.overdraw &&
                    (ea(m.positionScreen, g.positionScreen),
                    ea(g.positionScreen, v.positionScreen),
                    ea(v.positionScreen, m.positionScreen),
                    ea(T.positionScreen, ec.positionScreen),
                    ea(T.positionScreen, ep.positionScreen)),
                  eH.setFromPoints([
                    m.positionScreen,
                    g.positionScreen,
                    T.positionScreen,
                    v.positionScreen,
                  ]),
                  !0 === eR.isIntersectionBox(eH) &&
                    ((eb = m),
                    (eC = g),
                    (e0 = T),
                    (eA = v),
                    (e1 = ec),
                    (eL = ep),
                    (q.info.render.vertices += 4),
                    q.info.render.faces++,
                    t(el.opacity),
                    i(el.blending),
                    (void 0 !== el.map && null !== el.map) ||
                    (void 0 !== el.envMap && null !== el.envMap)
                      ? (Q(eb, eC, eA, 0, 1, 3, eM, el),
                        Q(e1, e0, eL, 1, 2, 3, eM, el))
                      : (($ = eb.positionScreen.x),
                        (y = eb.positionScreen.y),
                        (R = eC.positionScreen.x),
                        (x = eC.positionScreen.y),
                        (H = e0.positionScreen.x),
                        (_ = e0.positionScreen.y),
                        (w = eA.positionScreen.x),
                        (S = eA.positionScreen.y),
                        (b = e1.positionScreen.x),
                        (M = e1.positionScreen.y),
                        (C = eL.positionScreen.x),
                        (A = eL.positionScreen.y),
                        el instanceof THREE.MeshLambertMaterial ||
                        el instanceof THREE.MeshPhongMaterial
                          ? (eg.copy(el.color),
                            eT.copy(el.emissive),
                            el.vertexColors === THREE.FaceColors &&
                              eg.multiply(eM.color),
                            !1 === el.wireframe &&
                            el.shading == THREE.SmoothShading &&
                            4 == eM.vertexNormalsLength
                              ? (eE.copy(e_),
                                ef.copy(e_),
                                ed.copy(e_),
                                em.copy(e_),
                                E(
                                  eM.v1.positionWorld,
                                  eM.vertexNormalsModel[0],
                                  eE
                                ),
                                E(
                                  eM.v2.positionWorld,
                                  eM.vertexNormalsModel[1],
                                  ef
                                ),
                                E(
                                  eM.v4.positionWorld,
                                  eM.vertexNormalsModel[3],
                                  ed
                                ),
                                E(
                                  eM.v3.positionWorld,
                                  eM.vertexNormalsModel[2],
                                  em
                                ),
                                eE.multiply(eg).add(eT),
                                ef.multiply(eg).add(eT),
                                ed.multiply(eg).add(eT),
                                em.multiply(eg).add(eT),
                                (D = eo(eE, ef, ed, em)),
                                J($, y, R, x, w, S),
                                en($, y, R, x, w, S, 0, 0, 1, 0, 0, 1, D),
                                J(b, M, H, _, C, A),
                                en(b, M, H, _, C, A, 1, 0, 1, 1, 0, 1, D))
                              : (eu.copy(e_),
                                E(eM.centroidModel, eM.normalModel, eu),
                                eu.multiply(eg).add(eT),
                                ee($, y, R, x, H, _, w, S),
                                !0 === el.wireframe
                                  ? et(
                                      eu,
                                      el.wireframeLinewidth,
                                      el.wireframeLinecap,
                                      el.wireframeLinejoin
                                    )
                                  : ei(eu)))
                          : el instanceof THREE.MeshBasicMaterial
                          ? (eu.copy(el.color),
                            el.vertexColors === THREE.FaceColors &&
                              eu.multiply(eM.color),
                            ee($, y, R, x, H, _, w, S),
                            !0 === el.wireframe
                              ? et(
                                  eu,
                                  el.wireframeLinewidth,
                                  el.wireframeLinecap,
                                  el.wireframeLinejoin
                                )
                              : ei(eu))
                          : el instanceof THREE.MeshNormalMaterial
                          ? ((eb = void 0),
                            el.shading == THREE.FlatShading
                              ? ((eb = eM.normalModelView),
                                eu
                                  .setRGB(eb.x, eb.y, eb.z)
                                  .multiplyScalar(0.5)
                                  .addScalar(0.5),
                                ee($, y, R, x, H, _, w, S),
                                !0 === el.wireframe
                                  ? et(
                                      eu,
                                      el.wireframeLinewidth,
                                      el.wireframeLinecap,
                                      el.wireframeLinejoin
                                    )
                                  : ei(eu))
                              : el.shading == THREE.SmoothShading &&
                                ((eb = eM.vertexNormalsModelView[0]),
                                eE
                                  .setRGB(eb.x, eb.y, eb.z)
                                  .multiplyScalar(0.5)
                                  .addScalar(0.5),
                                (eb = eM.vertexNormalsModelView[1]),
                                ef
                                  .setRGB(eb.x, eb.y, eb.z)
                                  .multiplyScalar(0.5)
                                  .addScalar(0.5),
                                (eb = eM.vertexNormalsModelView[3]),
                                ed
                                  .setRGB(eb.x, eb.y, eb.z)
                                  .multiplyScalar(0.5)
                                  .addScalar(0.5),
                                (eb = eM.vertexNormalsModelView[2]),
                                em
                                  .setRGB(eb.x, eb.y, eb.z)
                                  .multiplyScalar(0.5)
                                  .addScalar(0.5),
                                (D = eo(eE, ef, ed, em)),
                                J($, y, R, x, w, S),
                                en($, y, R, x, w, S, 0, 0, 1, 0, 0, 1, D),
                                J(b, M, H, _, C, A),
                                en(b, M, H, _, C, A, 1, 0, 1, 1, 0, 1, D)))
                          : el instanceof THREE.MeshDepthMaterial &&
                            ((L = u.near),
                            (P = u.far),
                            (eE.r =
                              eE.g =
                              eE.b =
                                1 -
                                Y(
                                  eb.positionScreen.z * eb.positionScreen.w,
                                  L,
                                  P
                                )),
                            (ef.r =
                              ef.g =
                              ef.b =
                                1 -
                                Y(
                                  eC.positionScreen.z * eC.positionScreen.w,
                                  L,
                                  P
                                )),
                            (ed.r =
                              ed.g =
                              ed.b =
                                1 -
                                Y(
                                  eA.positionScreen.z * eA.positionScreen.w,
                                  L,
                                  P
                                )),
                            (em.r =
                              em.g =
                              em.b =
                                1 -
                                Y(
                                  e0.positionScreen.z * e0.positionScreen.w,
                                  L,
                                  P
                                )),
                            (D = eo(eE, ef, ed, em)),
                            J($, y, R, x, w, S),
                            en($, y, R, x, w, S, 0, 0, 1, 0, 0, 1, D),
                            J(b, M, H, _, C, A),
                            en(b, M, H, _, C, A, 1, 0, 1, 1, 0, 1, D))));
              }
              ex.union(eH);
            }
          }
          Z.setTransform(1, 0, 0, 1, 0, 0);
        }
      });
  }),
  (THREE.ShaderChunk = {
    fog_pars_fragment:
      "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment:
      "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment:
      "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
    envmap_fragment:
      "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
    envmap_pars_vertex:
      "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    worldpos_vertex:
      "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
    envmap_vertex:
      "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
    map_particle_pars_fragment:
      "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment:
      "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
    map_pars_vertex:
      "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment:
      "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_vertex:
      "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment:
      "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
    lightmap_pars_fragment:
      "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment:
      "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    bumpmap_pars_fragment:
      "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
    normalmap_pars_fragment:
      "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
    specularmap_pars_fragment:
      "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
    specularmap_fragment:
      "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
    lights_lambert_pars_vertex:
      "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex:
      "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex:
      "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex:
      "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
    lights_phong_pars_fragment:
      "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment:
      "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment:
      "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex:
      "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex:
      "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
    skinbase_vertex:
      "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
    skinning_vertex:
      "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\n#endif",
    morphtarget_pars_vertex:
      "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex:
      "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
    default_vertex:
      "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
    morphnormal_vertex:
      "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
    skinnormal_vertex:
      "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix 	+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
    defaultnormal_vertex:
      "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
    shadowmap_pars_fragment:
      "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment:
      "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nvec3 shadowZ = vec3( shadowCoord.z );\nshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\nshadowKernel[0] *= vec3(0.25);\nshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\nshadowKernel[1] *= vec3(0.25);\nshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\nshadowKernel[2] *= vec3(0.25);\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex:
      "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex:
      "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
    alphatest_fragment:
      "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment:
      "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",
  }),
  (THREE.UniformsUtils = {
    merge: function (e) {
      var t,
        i,
        r,
        n = {};
      for (t = 0; t < e.length; t++)
        for (i in (r = this.clone(e[t]))) n[i] = r[i];
      return n;
    },
    clone: function (e) {
      var t,
        i,
        r,
        n = {};
      for (t in e)
        for (i in ((n[t] = {}), e[t]))
          (r = e[t][i]),
            (n[t][i] =
              r instanceof THREE.Color ||
              r instanceof THREE.Vector2 ||
              r instanceof THREE.Vector3 ||
              r instanceof THREE.Vector4 ||
              r instanceof THREE.Matrix4 ||
              r instanceof THREE.Texture
                ? r.clone()
                : r instanceof Array
                ? r.slice()
                : r);
      return n;
    },
  }),
  (THREE.UniformsLib = {
    common: {
      diffuse: { type: "c", value: new THREE.Color(15658734) },
      opacity: { type: "f", value: 1 },
      map: { type: "t", value: null },
      offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
      lightMap: { type: "t", value: null },
      specularMap: { type: "t", value: null },
      envMap: { type: "t", value: null },
      flipEnvMap: { type: "f", value: -1 },
      useRefract: { type: "i", value: 0 },
      reflectivity: { type: "f", value: 1 },
      refractionRatio: { type: "f", value: 0.98 },
      combine: { type: "i", value: 0 },
      morphTargetInfluences: { type: "f", value: 0 },
    },
    bump: {
      bumpMap: { type: "t", value: null },
      bumpScale: { type: "f", value: 1 },
    },
    normalmap: {
      normalMap: { type: "t", value: null },
      normalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
    },
    fog: {
      fogDensity: { type: "f", value: 25e-5 },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      fogColor: { type: "c", value: new THREE.Color(16777215) },
    },
    lights: {
      ambientLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
      directionalLightColor: { type: "fv", value: [] },
      hemisphereLightDirection: { type: "fv", value: [] },
      hemisphereLightSkyColor: { type: "fv", value: [] },
      hemisphereLightGroundColor: { type: "fv", value: [] },
      pointLightColor: { type: "fv", value: [] },
      pointLightPosition: { type: "fv", value: [] },
      pointLightDistance: { type: "fv1", value: [] },
      spotLightColor: { type: "fv", value: [] },
      spotLightPosition: { type: "fv", value: [] },
      spotLightDirection: { type: "fv", value: [] },
      spotLightDistance: { type: "fv1", value: [] },
      spotLightAngleCos: { type: "fv1", value: [] },
      spotLightExponent: { type: "fv1", value: [] },
    },
    particle: {
      psColor: { type: "c", value: new THREE.Color(15658734) },
      opacity: { type: "f", value: 1 },
      size: { type: "f", value: 1 },
      scale: { type: "f", value: 1 },
      map: { type: "t", value: null },
      fogDensity: { type: "f", value: 25e-5 },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      fogColor: { type: "c", value: new THREE.Color(16777215) },
    },
    shadowmap: {
      shadowMap: { type: "tv", value: [] },
      shadowMapSize: { type: "v2v", value: [] },
      shadowBias: { type: "fv1", value: [] },
      shadowDarkness: { type: "fv1", value: [] },
      shadowMatrix: { type: "m4v", value: [] },
    },
  }),
  (THREE.ShaderLib = {
    basic: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.shadowmap,
      ]),
      vertexShader: [
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.color_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        "#ifdef USE_ENVMAP",
        THREE.ShaderChunk.morphnormal_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        THREE.ShaderChunk.defaultnormal_vertex,
        "#endif",
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.default_vertex,
        THREE.ShaderChunk.worldpos_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 diffuse;\nuniform float opacity;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.specularmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.specularmap_fragment,
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    lambert: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          ambient: { type: "c", value: new THREE.Color(16777215) },
          emissive: { type: "c", value: new THREE.Color(0) },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      vertexShader: [
        "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.lights_lambert_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.color_vertex,
        THREE.ShaderChunk.morphnormal_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        THREE.ShaderChunk.defaultnormal_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.default_vertex,
        THREE.ShaderChunk.worldpos_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.lights_lambert_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.specularmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.specularmap_fragment,
        "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    phong: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.bump,
        THREE.UniformsLib.normalmap,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          ambient: { type: "c", value: new THREE.Color(16777215) },
          emissive: { type: "c", value: new THREE.Color(0) },
          specular: { type: "c", value: new THREE.Color(1118481) },
          shininess: { type: "f", value: 30 },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      vertexShader: [
        "#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.lights_phong_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.color_vertex,
        THREE.ShaderChunk.morphnormal_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        THREE.ShaderChunk.defaultnormal_vertex,
        "vNormal = normalize( transformedNormal );",
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.default_vertex,
        "vViewPosition = -mvPosition.xyz;",
        THREE.ShaderChunk.worldpos_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.lights_phong_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.lights_phong_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.bumpmap_pars_fragment,
        THREE.ShaderChunk.normalmap_pars_fragment,
        THREE.ShaderChunk.specularmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.specularmap_fragment,
        THREE.ShaderChunk.lights_phong_fragment,
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    particle_basic: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.particle,
        THREE.UniformsLib.shadowmap,
      ]),
      vertexShader: [
        "uniform float size;\nuniform float scale;",
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.color_vertex,
        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
        THREE.ShaderChunk.worldpos_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 psColor;\nuniform float opacity;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_particle_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( psColor, opacity );",
        THREE.ShaderChunk.map_particle_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    dashed: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        {
          scale: { type: "f", value: 1 },
          dashSize: { type: "f", value: 1 },
          totalSize: { type: "f", value: 2 },
        },
      ]),
      vertexShader: [
        "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;",
        THREE.ShaderChunk.color_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.color_vertex,
        "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );",
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    depth: {
      uniforms: {
        mNear: { type: "f", value: 1 },
        mFar: { type: "f", value: 2e3 },
        opacity: { type: "f", value: 1 },
      },
      vertexShader:
        "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
    },
    normal: {
      uniforms: { opacity: { type: "f", value: 1 } },
      vertexShader: [
        "varying vec3 vNormal;",
        THREE.ShaderChunk.morphtarget_pars_vertex,
        "void main() {\nvNormal = normalize( normalMatrix * normal );",
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex,
        "}",
      ].join("\n"),
      fragmentShader:
        "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
    },
    normalmap: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          enableAO: { type: "i", value: 0 },
          enableDiffuse: { type: "i", value: 0 },
          enableSpecular: { type: "i", value: 0 },
          enableReflection: { type: "i", value: 0 },
          enableDisplacement: { type: "i", value: 0 },
          tDisplacement: { type: "t", value: null },
          tDiffuse: { type: "t", value: null },
          tCube: { type: "t", value: null },
          tNormal: { type: "t", value: null },
          tSpecular: { type: "t", value: null },
          tAO: { type: "t", value: null },
          uNormalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
          uDisplacementBias: { type: "f", value: 0 },
          uDisplacementScale: { type: "f", value: 1 },
          uDiffuseColor: { type: "c", value: new THREE.Color(16777215) },
          uSpecularColor: { type: "c", value: new THREE.Color(1118481) },
          uAmbientColor: { type: "c", value: new THREE.Color(16777215) },
          uShininess: { type: "f", value: 30 },
          uOpacity: { type: "f", value: 1 },
          useRefract: { type: "i", value: 0 },
          uRefractionRatio: { type: "f", value: 0.98 },
          uReflectivity: { type: "f", value: 0.5 },
          uOffset: { type: "v2", value: new THREE.Vector2(0, 0) },
          uRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      fragmentShader: [
        "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
      vertexShader: [
        "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}",
      ].join("\n"),
    },
    cube: {
      uniforms: {
        tCube: { type: "t", value: null },
        tFlip: { type: "f", value: -1 },
      },
      vertexShader:
        "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}",
    },
    depthRGBA: {
      uniforms: {},
      vertexShader: [
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.default_vertex,
        "}",
      ].join("\n"),
      fragmentShader:
        "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}",
    },
  }),
  (THREE.WebGLRenderer = function (e) {
    function t(e) {
      if (e.__webglCustomAttributesList)
        for (var t in e.__webglCustomAttributesList)
          I.deleteBuffer(e.__webglCustomAttributesList[t].buffer);
    }
    function i(e, t) {
      var i = e.vertices.length,
        r = t.material;
      if (r.attributes)
        for (var n in (void 0 === e.__webglCustomAttributesList &&
          (e.__webglCustomAttributesList = []),
        r.attributes)) {
          var o = r.attributes[n];
          if (!o.__webglInitialized || o.createUniqueBuffers) {
            o.__webglInitialized = !0;
            var a = 1;
            "v2" === o.type
              ? (a = 2)
              : "v3" === o.type
              ? (a = 3)
              : "v4" === o.type
              ? (a = 4)
              : "c" === o.type && (a = 3),
              (o.size = a),
              (o.array = new Float32Array(i * a)),
              (o.buffer = I.createBuffer()),
              (o.buffer.belongsToAttribute = n),
              (o.needsUpdate = !0);
          }
          e.__webglCustomAttributesList.push(o);
        }
    }
    function r(e, t) {
      var i = t.geometry,
        r = e.faces3,
        s = e.faces4,
        h = 3 * r.length + 4 * s.length,
        l = 1 * r.length + 2 * s.length,
        s = 3 * r.length + 4 * s.length,
        r = n(t, e),
        c = a(r),
        p = o(r),
        u = !!r.vertexColors && r.vertexColors;
      if (
        ((e.__vertexArray = new Float32Array(3 * h)),
        p && (e.__normalArray = new Float32Array(3 * h)),
        i.hasTangents && (e.__tangentArray = new Float32Array(4 * h)),
        u && (e.__colorArray = new Float32Array(3 * h)),
        c &&
          ((0 < i.faceUvs.length || 0 < i.faceVertexUvs.length) &&
            (e.__uvArray = new Float32Array(2 * h)),
          (1 < i.faceUvs.length || 1 < i.faceVertexUvs.length) &&
            (e.__uv2Array = new Float32Array(2 * h))),
        t.geometry.skinWeights.length &&
          t.geometry.skinIndices.length &&
          ((e.__skinIndexArray = new Float32Array(4 * h)),
          (e.__skinWeightArray = new Float32Array(4 * h))),
        (e.__faceArray = new Uint16Array(3 * l)),
        (e.__lineArray = new Uint16Array(2 * s)),
        e.numMorphTargets)
      )
        for (
          e.__morphTargetsArrays = [], i = 0, c = e.numMorphTargets;
          i < c;
          i++
        )
          e.__morphTargetsArrays.push(new Float32Array(3 * h));
      if (e.numMorphNormals)
        for (
          e.__morphNormalsArrays = [], i = 0, c = e.numMorphNormals;
          i < c;
          i++
        )
          e.__morphNormalsArrays.push(new Float32Array(3 * h));
      if (
        ((e.__webglFaceCount = 3 * l),
        (e.__webglLineCount = 2 * s),
        r.attributes)
      )
        for (var E in (void 0 === e.__webglCustomAttributesList &&
          (e.__webglCustomAttributesList = []),
        r.attributes)) {
          var f,
            l = r.attributes[E],
            i = {};
          for (f in l) i[f] = l[f];
          (!i.__webglInitialized || i.createUniqueBuffers) &&
            ((i.__webglInitialized = !0),
            (s = 1),
            "v2" === i.type
              ? (s = 2)
              : "v3" === i.type
              ? (s = 3)
              : "v4" === i.type
              ? (s = 4)
              : "c" === i.type && (s = 3),
            (i.size = s),
            (i.array = new Float32Array(h * s)),
            (i.buffer = I.createBuffer()),
            (i.buffer.belongsToAttribute = E),
            (l.needsUpdate = !0),
            (i.__original = l)),
            e.__webglCustomAttributesList.push(i);
        }
      e.__inittedArrays = !0;
    }
    function n(e, t) {
      return e.material instanceof THREE.MeshFaceMaterial
        ? e.material.materials[t.materialIndex]
        : e.material;
    }
    function o(e) {
      return (
        (!(e instanceof THREE.MeshBasicMaterial) || !!e.envMap) &&
        !(e instanceof THREE.MeshDepthMaterial) &&
        (e && void 0 !== e.shading && e.shading === THREE.SmoothShading
          ? THREE.SmoothShading
          : THREE.FlatShading)
      );
    }
    function a(e) {
      return (
        !!e.map ||
        !!e.lightMap ||
        !!e.bumpMap ||
        !!e.normalMap ||
        !!e.specularMap ||
        e instanceof THREE.ShaderMaterial
      );
    }
    function s(e) {
      e$[e] || (I.enableVertexAttribArray(e), (e$[e] = !0));
    }
    function h() {
      for (var e in e$) e$[e] && (I.disableVertexAttribArray(e), (e$[e] = !1));
    }
    function l(e, t) {
      return e.z !== t.z ? t.z - e.z : e.id - t.id;
    }
    function c(e, t) {
      return t[0] - e[0];
    }
    function p(e, t, i) {
      if (e.length)
        for (var r = 0, n = e.length; r < n; r++)
          (J = q = null),
            (Q = Z = er = ei = el = eh = en = -1),
            (ew = !0),
            e[r].render(t, i, eT, ev),
            (J = q = null),
            (Q = Z = er = ei = el = eh = en = -1),
            (ew = !0);
    }
    function u(e, t, i, r, n, o, a, s) {
      var h, l, c, p;
      t
        ? ((l = e.length - 1), (p = t = -1))
        : ((l = 0), (t = e.length), (p = 1));
      for (var u = l; u !== t; u += p)
        if ((h = e[u]).render) {
          if (((l = h.object), (c = h.buffer), s)) h = s;
          else {
            if (!(h = h[i])) continue;
            a &&
              j.setBlending(
                h.blending,
                h.blendEquation,
                h.blendSrc,
                h.blendDst
              ),
              j.setDepthTest(h.depthTest),
              j.setDepthWrite(h.depthWrite),
              w(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits);
          }
          j.setMaterialFaces(h),
            c instanceof THREE.BufferGeometry
              ? j.renderBufferDirect(r, n, o, h, c, l)
              : j.renderBuffer(r, n, o, h, c, l);
        }
    }
    function E(e, t, i, r, n, o, a) {
      for (var s, h, l = 0, c = e.length; l < c; l++)
        if ((h = (s = e[l]).object).visible) {
          if (a) s = a;
          else {
            if (!(s = s[t])) continue;
            o &&
              j.setBlending(
                s.blending,
                s.blendEquation,
                s.blendSrc,
                s.blendDst
              ),
              j.setDepthTest(s.depthTest),
              j.setDepthWrite(s.depthWrite),
              w(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits);
          }
          j.renderImmediateObject(i, r, n, s, h);
        }
    }
    function f(e, t) {
      if (
        void 0 === e.__webglInit &&
        ((e.__webglInit = !0),
        (e._modelViewMatrix = new THREE.Matrix4()),
        (e._normalMatrix = new THREE.Matrix3()),
        void 0 !== e.geometry &&
          void 0 === e.geometry.__webglInit &&
          ((e.geometry.__webglInit = !0),
          e.geometry.addEventListener("dispose", ez)),
        void 0 !== (o = e.geometry))
      ) {
        if (o instanceof THREE.BufferGeometry)
          for (h in o.attributes)
            (l = "index" === h ? I.ELEMENT_ARRAY_BUFFER : I.ARRAY_BUFFER),
              ((s = o.attributes[h]).buffer = I.createBuffer()),
              I.bindBuffer(l, s.buffer),
              I.bufferData(l, s.array, I.STATIC_DRAW);
        else if (e instanceof THREE.Mesh) {
          if (((a = e.material), void 0 === o.geometryGroups)) {
            l = {};
            var n,
              o,
              a,
              s,
              h,
              l,
              c,
              p,
              u,
              E,
              f,
              m = (h = o).morphTargets.length,
              g = h.morphNormals.length,
              T = a instanceof THREE.MeshFaceMaterial;
            for (h.geometryGroups = {}, a = 0, c = h.faces.length; a < c; a++)
              (p = h.faces[a]),
                void 0 === l[(u = T ? p.materialIndex : 0)] &&
                  (l[u] = { hash: u, counter: 0 }),
                (f = l[u].hash + "_" + l[u].counter),
                void 0 === h.geometryGroups[f] &&
                  (h.geometryGroups[f] = {
                    faces3: [],
                    faces4: [],
                    materialIndex: u,
                    vertices: 0,
                    numMorphTargets: m,
                    numMorphNormals: g,
                  }),
                (E = p instanceof THREE.Face3 ? 3 : 4),
                65535 < h.geometryGroups[f].vertices + E &&
                  ((l[u].counter += 1),
                  (f = l[u].hash + "_" + l[u].counter),
                  void 0 === h.geometryGroups[f] &&
                    (h.geometryGroups[f] = {
                      faces3: [],
                      faces4: [],
                      materialIndex: u,
                      vertices: 0,
                      numMorphTargets: m,
                      numMorphNormals: g,
                    })),
                p instanceof THREE.Face3
                  ? h.geometryGroups[f].faces3.push(a)
                  : h.geometryGroups[f].faces4.push(a),
                (h.geometryGroups[f].vertices += E);
            for (s in ((h.geometryGroupsList = []), h.geometryGroups))
              (h.geometryGroups[s].id = ee++),
                h.geometryGroupsList.push(h.geometryGroups[s]);
          }
          for (n in o.geometryGroups)
            if (!(s = o.geometryGroups[n]).__webglVertexBuffer) {
              if (
                (((h = s).__webglVertexBuffer = I.createBuffer()),
                (h.__webglNormalBuffer = I.createBuffer()),
                (h.__webglTangentBuffer = I.createBuffer()),
                (h.__webglColorBuffer = I.createBuffer()),
                (h.__webglUVBuffer = I.createBuffer()),
                (h.__webglUV2Buffer = I.createBuffer()),
                (h.__webglSkinIndicesBuffer = I.createBuffer()),
                (h.__webglSkinWeightsBuffer = I.createBuffer()),
                (h.__webglFaceBuffer = I.createBuffer()),
                (h.__webglLineBuffer = I.createBuffer()),
                (m = l = void 0),
                h.numMorphTargets)
              )
                for (
                  h.__webglMorphTargetsBuffers = [],
                    l = 0,
                    m = h.numMorphTargets;
                  l < m;
                  l++
                )
                  h.__webglMorphTargetsBuffers.push(I.createBuffer());
              if (h.numMorphNormals)
                for (
                  h.__webglMorphNormalsBuffers = [],
                    l = 0,
                    m = h.numMorphNormals;
                  l < m;
                  l++
                )
                  h.__webglMorphNormalsBuffers.push(I.createBuffer());
              j.info.memory.geometries++,
                r(s, e),
                (o.verticesNeedUpdate = !0),
                (o.morphTargetsNeedUpdate = !0),
                (o.elementsNeedUpdate = !0),
                (o.uvsNeedUpdate = !0),
                (o.normalsNeedUpdate = !0),
                (o.tangentsNeedUpdate = !0),
                (o.colorsNeedUpdate = !0);
            }
        } else
          e instanceof THREE.Ribbon
            ? o.__webglVertexBuffer ||
              (((s = o).__webglVertexBuffer = I.createBuffer()),
              (s.__webglColorBuffer = I.createBuffer()),
              (s.__webglNormalBuffer = I.createBuffer()),
              j.info.memory.geometries++,
              (h = (s = o).vertices.length),
              (s.__vertexArray = new Float32Array(3 * h)),
              (s.__colorArray = new Float32Array(3 * h)),
              (s.__normalArray = new Float32Array(3 * h)),
              (s.__webglVertexCount = h),
              i(s, e),
              (o.verticesNeedUpdate = !0),
              (o.colorsNeedUpdate = !0),
              (o.normalsNeedUpdate = !0))
            : e instanceof THREE.Line
            ? o.__webglVertexBuffer ||
              (((s = o).__webglVertexBuffer = I.createBuffer()),
              (s.__webglColorBuffer = I.createBuffer()),
              (s.__webglLineDistanceBuffer = I.createBuffer()),
              j.info.memory.geometries++,
              (h = (s = o).vertices.length),
              (s.__vertexArray = new Float32Array(3 * h)),
              (s.__colorArray = new Float32Array(3 * h)),
              (s.__lineDistanceArray = new Float32Array(1 * h)),
              (s.__webglLineCount = h),
              i(s, e),
              (o.verticesNeedUpdate = !0),
              (o.colorsNeedUpdate = !0),
              (o.lineDistancesNeedUpdate = !0))
            : e instanceof THREE.ParticleSystem &&
              !o.__webglVertexBuffer &&
              (((s = o).__webglVertexBuffer = I.createBuffer()),
              (s.__webglColorBuffer = I.createBuffer()),
              j.info.memory.geometries++,
              (h = (s = o).vertices.length),
              (s.__vertexArray = new Float32Array(3 * h)),
              (s.__colorArray = new Float32Array(3 * h)),
              (s.__sortArray = []),
              (s.__webglParticleCount = h),
              i(s, e),
              (o.verticesNeedUpdate = !0),
              (o.colorsNeedUpdate = !0));
      }
      if (void 0 === e.__webglActive) {
        if (e instanceof THREE.Mesh) {
          if ((o = e.geometry) instanceof THREE.BufferGeometry)
            d(t.__webglObjects, o, e);
          else if (o instanceof THREE.Geometry)
            for (n in o.geometryGroups)
              (s = o.geometryGroups[n]), d(t.__webglObjects, s, e);
        } else
          e instanceof THREE.Ribbon ||
          e instanceof THREE.Line ||
          e instanceof THREE.ParticleSystem
            ? ((o = e.geometry), d(t.__webglObjects, o, e))
            : e instanceof THREE.ImmediateRenderObject ||
              e.immediateRenderCallback
            ? t.__webglObjectsImmediate.push({
                object: e,
                opaque: null,
                transparent: null,
              })
            : e instanceof THREE.Sprite
            ? t.__webglSprites.push(e)
            : e instanceof THREE.LensFlare && t.__webglFlares.push(e);
        e.__webglActive = !0;
      }
    }
    function d(e, t, i) {
      e.push({ buffer: t, object: i, opaque: null, transparent: null });
    }
    function m(e) {
      for (var t in e.attributes) if (e.attributes[t].needsUpdate) return !0;
      return !1;
    }
    function g(e) {
      for (var t in e.attributes) e.attributes[t].needsUpdate = !1;
    }
    function T(e, t) {
      e instanceof THREE.Mesh ||
      e instanceof THREE.ParticleSystem ||
      e instanceof THREE.Ribbon ||
      e instanceof THREE.Line
        ? v(t.__webglObjects, e)
        : e instanceof THREE.Sprite
        ? $(t.__webglSprites, e)
        : e instanceof THREE.LensFlare
        ? $(t.__webglFlares, e)
        : (e instanceof THREE.ImmediateRenderObject ||
            e.immediateRenderCallback) &&
          v(t.__webglObjectsImmediate, e),
        delete e.__webglActive;
    }
    function v(e, t) {
      for (var i = e.length - 1; 0 <= i; i--)
        e[i].object === t && e.splice(i, 1);
    }
    function $(e, t) {
      for (var i = e.length - 1; 0 <= i; i--) e[i] === t && e.splice(i, 1);
    }
    function y(e, t, i, r, n) {
      (et = 0),
        r.needsUpdate &&
          (r.program && e2(r),
          j.initMaterial(r, t, i, n),
          (r.needsUpdate = !1)),
        r.morphTargets &&
          !n.__webglMorphTargetInfluences &&
          (n.__webglMorphTargetInfluences = new Float32Array(
            j.maxMorphTargets
          ));
      var o = !1,
        a = r.program,
        s = a.uniforms,
        h = r.uniforms;
      if (
        (a !== q && (I.useProgram(a), (q = a), (o = !0)),
        r.id !== Q && ((Q = r.id), (o = !0)),
        (o || e !== J) &&
          (I.uniformMatrix4fv(
            s.projectionMatrix,
            !1,
            e.projectionMatrix.elements
          ),
          e !== J && (J = e)),
        r.skinning)
      ) {
        if (e1 && n.useVertexTexture) {
          if (null !== s.boneTexture) {
            var l = R();
            I.uniform1i(s.boneTexture, l), j.setTexture(n.boneTexture, l);
          }
        } else
          null !== s.boneGlobalMatrices &&
            I.uniformMatrix4fv(s.boneGlobalMatrices, !1, n.boneMatrices);
      }
      if (o) {
        if (
          (i &&
            r.fog &&
            ((h.fogColor.value = i.color),
            i instanceof THREE.Fog
              ? ((h.fogNear.value = i.near), (h.fogFar.value = i.far))
              : i instanceof THREE.FogExp2 && (h.fogDensity.value = i.density)),
          r instanceof THREE.MeshPhongMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r.lights)
        ) {
          if (ew) {
            for (
              var c,
                p,
                u,
                E,
                f,
                d = (l = 0),
                m = 0,
                g = e8,
                T = g.directional.colors,
                v = g.directional.positions,
                $ = g.point.colors,
                y = g.point.positions,
                _ = g.point.distances,
                w = g.spot.colors,
                S = g.spot.positions,
                M = g.spot.distances,
                C = g.spot.directions,
                P = g.spot.anglesCos,
                D = g.spot.exponents,
                F = g.hemi.skyColors,
                U = g.hemi.groundColors,
                V = g.hemi.positions,
                z = 0,
                N = 0,
                B = 0,
                O = 0,
                k = 0,
                G = 0,
                W = 0,
                X = 0,
                Y = (p = 0),
                i = (f = Y = 0),
                o = t.length;
              i < o;
              i++
            )
              (p = t[i]).onlyShadow ||
                ((u = p.color),
                (E = p.intensity),
                (f = p.distance),
                p instanceof THREE.AmbientLight
                  ? p.visible &&
                    (j.gammaInput
                      ? ((l += u.r * u.r), (d += u.g * u.g), (m += u.b * u.b))
                      : ((l += u.r), (d += u.g), (m += u.b)))
                  : p instanceof THREE.DirectionalLight
                  ? ((k += 1),
                    p.visible &&
                      (e_.getPositionFromMatrix(p.matrixWorld),
                      eH.getPositionFromMatrix(p.target.matrixWorld),
                      e_.sub(eH),
                      e_.normalize(),
                      (0 === e_.x && 0 === e_.y && 0 === e_.z) ||
                        ((v[(p = 3 * z)] = e_.x),
                        (v[p + 1] = e_.y),
                        (v[p + 2] = e_.z),
                        j.gammaInput ? x(T, p, u, E * E) : H(T, p, u, E),
                        (z += 1))))
                  : p instanceof THREE.PointLight
                  ? ((G += 1),
                    p.visible &&
                      ((Y = 3 * N),
                      j.gammaInput ? x($, Y, u, E * E) : H($, Y, u, E),
                      eH.getPositionFromMatrix(p.matrixWorld),
                      (y[Y] = eH.x),
                      (y[Y + 1] = eH.y),
                      (y[Y + 2] = eH.z),
                      (_[N] = f),
                      (N += 1)))
                  : p instanceof THREE.SpotLight
                  ? ((W += 1),
                    p.visible &&
                      ((Y = 3 * B),
                      j.gammaInput ? x(w, Y, u, E * E) : H(w, Y, u, E),
                      eH.getPositionFromMatrix(p.matrixWorld),
                      (S[Y] = eH.x),
                      (S[Y + 1] = eH.y),
                      (S[Y + 2] = eH.z),
                      (M[B] = f),
                      e_.copy(eH),
                      eH.getPositionFromMatrix(p.target.matrixWorld),
                      e_.sub(eH),
                      e_.normalize(),
                      (C[Y] = e_.x),
                      (C[Y + 1] = e_.y),
                      (C[Y + 2] = e_.z),
                      (P[B] = Math.cos(p.angle)),
                      (D[B] = p.exponent),
                      (B += 1)))
                  : p instanceof THREE.HemisphereLight &&
                    ((X += 1),
                    p.visible &&
                      (e_.getPositionFromMatrix(p.matrixWorld),
                      e_.normalize(),
                      (0 === e_.x && 0 === e_.y && 0 === e_.z) ||
                        ((V[(f = 3 * O)] = e_.x),
                        (V[f + 1] = e_.y),
                        (V[f + 2] = e_.z),
                        (u = p.color),
                        (p = p.groundColor),
                        j.gammaInput
                          ? (x(F, f, u, (E *= E)), x(U, f, p, E))
                          : (H(F, f, u, E), H(U, f, p, E)),
                        (O += 1)))));
            for (i = 3 * z, o = Math.max(T.length, 3 * k); i < o; i++) T[i] = 0;
            for (i = 3 * N, o = Math.max($.length, 3 * G); i < o; i++) $[i] = 0;
            for (i = 3 * B, o = Math.max(w.length, 3 * W); i < o; i++) w[i] = 0;
            for (i = 3 * O, o = Math.max(F.length, 3 * X); i < o; i++) F[i] = 0;
            for (i = 3 * O, o = Math.max(U.length, 3 * X); i < o; i++) U[i] = 0;
            (g.directional.length = z),
              (g.point.length = N),
              (g.spot.length = B),
              (g.hemi.length = O),
              (g.ambient[0] = l),
              (g.ambient[1] = d),
              (g.ambient[2] = m),
              (ew = !1);
          }
          (i = e8),
            (h.ambientLightColor.value = i.ambient),
            (h.directionalLightColor.value = i.directional.colors),
            (h.directionalLightDirection.value = i.directional.positions),
            (h.pointLightColor.value = i.point.colors),
            (h.pointLightPosition.value = i.point.positions),
            (h.pointLightDistance.value = i.point.distances),
            (h.spotLightColor.value = i.spot.colors),
            (h.spotLightPosition.value = i.spot.positions),
            (h.spotLightDistance.value = i.spot.distances),
            (h.spotLightDirection.value = i.spot.directions),
            (h.spotLightAngleCos.value = i.spot.anglesCos),
            (h.spotLightExponent.value = i.spot.exponents),
            (h.hemisphereLightSkyColor.value = i.hemi.skyColors),
            (h.hemisphereLightGroundColor.value = i.hemi.groundColors),
            (h.hemisphereLightDirection.value = i.hemi.positions);
        }
        if (
          ((r instanceof THREE.MeshBasicMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r instanceof THREE.MeshPhongMaterial) &&
            ((h.opacity.value = r.opacity),
            j.gammaInput
              ? h.diffuse.value.copyGammaToLinear(r.color)
              : (h.diffuse.value = r.color),
            (h.map.value = r.map),
            (h.lightMap.value = r.lightMap),
            (h.specularMap.value = r.specularMap),
            r.bumpMap &&
              ((h.bumpMap.value = r.bumpMap),
              (h.bumpScale.value = r.bumpScale)),
            r.normalMap &&
              ((h.normalMap.value = r.normalMap),
              h.normalScale.value.copy(r.normalScale)),
            r.map
              ? (c = r.map)
              : r.specularMap
              ? (c = r.specularMap)
              : r.normalMap
              ? (c = r.normalMap)
              : r.bumpMap && (c = r.bumpMap),
            void 0 !== c &&
              ((i = c.offset),
              (c = c.repeat),
              h.offsetRepeat.value.set(i.x, i.y, c.x, c.y)),
            (h.envMap.value = r.envMap),
            (h.flipEnvMap.value =
              r.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1),
            (h.reflectivity.value = r.reflectivity),
            (h.refractionRatio.value = r.refractionRatio),
            (h.combine.value = r.combine),
            (h.useRefract.value =
              r.envMap &&
              r.envMap.mapping instanceof THREE.CubeRefractionMapping)),
          r instanceof THREE.LineBasicMaterial
            ? ((h.diffuse.value = r.color), (h.opacity.value = r.opacity))
            : r instanceof THREE.LineDashedMaterial
            ? ((h.diffuse.value = r.color),
              (h.opacity.value = r.opacity),
              (h.dashSize.value = r.dashSize),
              (h.totalSize.value = r.dashSize + r.gapSize),
              (h.scale.value = r.scale))
            : r instanceof THREE.ParticleBasicMaterial
            ? ((h.psColor.value = r.color),
              (h.opacity.value = r.opacity),
              (h.size.value = r.size),
              (h.scale.value = L.height / 2),
              (h.map.value = r.map))
            : r instanceof THREE.MeshPhongMaterial
            ? ((h.shininess.value = r.shininess),
              j.gammaInput
                ? (h.ambient.value.copyGammaToLinear(r.ambient),
                  h.emissive.value.copyGammaToLinear(r.emissive),
                  h.specular.value.copyGammaToLinear(r.specular))
                : ((h.ambient.value = r.ambient),
                  (h.emissive.value = r.emissive),
                  (h.specular.value = r.specular)),
              r.wrapAround && h.wrapRGB.value.copy(r.wrapRGB))
            : r instanceof THREE.MeshLambertMaterial
            ? (j.gammaInput
                ? (h.ambient.value.copyGammaToLinear(r.ambient),
                  h.emissive.value.copyGammaToLinear(r.emissive))
                : ((h.ambient.value = r.ambient),
                  (h.emissive.value = r.emissive)),
              r.wrapAround && h.wrapRGB.value.copy(r.wrapRGB))
            : r instanceof THREE.MeshDepthMaterial
            ? ((h.mNear.value = e.near),
              (h.mFar.value = e.far),
              (h.opacity.value = r.opacity))
            : r instanceof THREE.MeshNormalMaterial &&
              (h.opacity.value = r.opacity),
          n.receiveShadow && !r._shadowPass && h.shadowMatrix)
        )
          for (i = c = 0, o = t.length; i < o; i++)
            (l = t[i]).castShadow &&
              (l instanceof THREE.SpotLight ||
                (l instanceof THREE.DirectionalLight && !l.shadowCascade)) &&
              ((h.shadowMap.value[c] = l.shadowMap),
              (h.shadowMapSize.value[c] = l.shadowMapSize),
              (h.shadowMatrix.value[c] = l.shadowMatrix),
              (h.shadowDarkness.value[c] = l.shadowDarkness),
              (h.shadowBias.value[c] = l.shadowBias),
              c++);
        for (t = r.uniformsList, h = 0, c = t.length; h < c; h++)
          if ((o = a.uniforms[t[h][1]])) {
            if (((d = (i = t[h][0]).type), (l = i.value), "i" === d))
              I.uniform1i(o, l);
            else if ("f" === d) I.uniform1f(o, l);
            else if ("v2" === d) I.uniform2f(o, l.x, l.y);
            else if ("v3" === d) I.uniform3f(o, l.x, l.y, l.z);
            else if ("v4" === d) I.uniform4f(o, l.x, l.y, l.z, l.w);
            else if ("c" === d) I.uniform3f(o, l.r, l.g, l.b);
            else if ("iv1" === d) I.uniform1iv(o, l);
            else if ("iv" === d) I.uniform3iv(o, l);
            else if ("fv1" === d) I.uniform1fv(o, l);
            else if ("fv" === d) I.uniform3fv(o, l);
            else if ("v2v" === d) {
              for (
                void 0 === i._array &&
                  (i._array = new Float32Array(2 * l.length)),
                  d = 0,
                  m = l.length;
                d < m;
                d++
              )
                (g = 2 * d), (i._array[g] = l[d].x), (i._array[g + 1] = l[d].y);
              I.uniform2fv(o, i._array);
            } else if ("v3v" === d) {
              for (
                void 0 === i._array &&
                  (i._array = new Float32Array(3 * l.length)),
                  d = 0,
                  m = l.length;
                d < m;
                d++
              )
                (g = 3 * d),
                  (i._array[g] = l[d].x),
                  (i._array[g + 1] = l[d].y),
                  (i._array[g + 2] = l[d].z);
              I.uniform3fv(o, i._array);
            } else if ("v4v" === d) {
              for (
                void 0 === i._array &&
                  (i._array = new Float32Array(4 * l.length)),
                  d = 0,
                  m = l.length;
                d < m;
                d++
              )
                (g = 4 * d),
                  (i._array[g] = l[d].x),
                  (i._array[g + 1] = l[d].y),
                  (i._array[g + 2] = l[d].z),
                  (i._array[g + 3] = l[d].w);
              I.uniform4fv(o, i._array);
            } else if ("m4" === d)
              void 0 === i._array && (i._array = new Float32Array(16)),
                l.flattenToArray(i._array),
                I.uniformMatrix4fv(o, !1, i._array);
            else if ("m4v" === d) {
              for (
                void 0 === i._array &&
                  (i._array = new Float32Array(16 * l.length)),
                  d = 0,
                  m = l.length;
                d < m;
                d++
              )
                l[d].flattenToArrayOffset(i._array, 16 * d);
              I.uniformMatrix4fv(o, !1, i._array);
            } else if ("t" === d) {
              if (((g = l), (l = R()), I.uniform1i(o, l), g)) {
                if (g.image instanceof Array && 6 === g.image.length) {
                  if (((i = g), (o = l), 6 === i.image.length)) {
                    if (i.needsUpdate) {
                      for (
                        i.image.__webglTextureCube ||
                          ((i.image.__webglTextureCube = I.createTexture()),
                          j.info.memory.textures++),
                          I.activeTexture(I.TEXTURE0 + o),
                          I.bindTexture(
                            I.TEXTURE_CUBE_MAP,
                            i.image.__webglTextureCube
                          ),
                          I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, i.flipY),
                          o = i instanceof THREE.CompressedTexture,
                          l = [],
                          d = 0;
                        6 > d;
                        d++
                      )
                        j.autoScaleCubemaps && !o
                          ? ((m = l),
                            (g = d),
                            (T = i.image[d]),
                            ($ = eC),
                            (T.width <= $ && T.height <= $) ||
                              ((y = Math.max(T.width, T.height)),
                              (v = Math.floor((T.width * $) / y)),
                              ($ = Math.floor((T.height * $) / y)),
                              ((y = document.createElement("canvas")).width =
                                v),
                              (y.height = $),
                              y
                                .getContext("2d")
                                .drawImage(
                                  T,
                                  0,
                                  0,
                                  T.width,
                                  T.height,
                                  0,
                                  0,
                                  v,
                                  $
                                ),
                              (T = y)),
                            (m[g] = T))
                          : (l[d] = i.image[d]);
                      for (
                        m =
                          0 == ((d = l[0]).width & (d.width - 1)) &&
                          0 == (d.height & (d.height - 1)),
                          g = A(i.format),
                          T = A(i.type),
                          b(I.TEXTURE_CUBE_MAP, i, m),
                          d = 0;
                        6 > d;
                        d++
                      )
                        if (o)
                          for (
                            $ = l[d].mipmaps, y = 0, _ = $.length;
                            y < _;
                            y++
                          )
                            (v = $[y]),
                              I.compressedTexImage2D(
                                I.TEXTURE_CUBE_MAP_POSITIVE_X + d,
                                y,
                                g,
                                v.width,
                                v.height,
                                0,
                                v.data
                              );
                        else
                          I.texImage2D(
                            I.TEXTURE_CUBE_MAP_POSITIVE_X + d,
                            0,
                            g,
                            g,
                            T,
                            l[d]
                          );
                      i.generateMipmaps &&
                        m &&
                        I.generateMipmap(I.TEXTURE_CUBE_MAP),
                        (i.needsUpdate = !1),
                        i.onUpdate && i.onUpdate();
                    } else
                      I.activeTexture(I.TEXTURE0 + o),
                        I.bindTexture(
                          I.TEXTURE_CUBE_MAP,
                          i.image.__webglTextureCube
                        );
                  }
                } else
                  g instanceof THREE.WebGLRenderTargetCube
                    ? ((i = g),
                      I.activeTexture(I.TEXTURE0 + l),
                      I.bindTexture(I.TEXTURE_CUBE_MAP, i.__webglTexture))
                    : j.setTexture(g, l);
              }
            } else if ("tv" === d) {
              for (
                void 0 === i._array && (i._array = []),
                  d = 0,
                  m = i.value.length;
                d < m;
                d++
              )
                i._array[d] = R();
              for (
                I.uniform1iv(o, i._array), d = 0, m = i.value.length;
                d < m;
                d++
              )
                (g = i.value[d]), (l = i._array[d]), g && j.setTexture(g, l);
            }
          }
        (r instanceof THREE.ShaderMaterial ||
          r instanceof THREE.MeshPhongMaterial ||
          r.envMap) &&
          null !== s.cameraPosition &&
          (eH.getPositionFromMatrix(e.matrixWorld),
          I.uniform3f(s.cameraPosition, eH.x, eH.y, eH.z)),
          (r instanceof THREE.MeshPhongMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r instanceof THREE.ShaderMaterial ||
            r.skinning) &&
            null !== s.viewMatrix &&
            I.uniformMatrix4fv(s.viewMatrix, !1, e.matrixWorldInverse.elements);
      }
      return (
        I.uniformMatrix4fv(s.modelViewMatrix, !1, n._modelViewMatrix.elements),
        s.normalMatrix &&
          I.uniformMatrix3fv(s.normalMatrix, !1, n._normalMatrix.elements),
        null !== s.modelMatrix &&
          I.uniformMatrix4fv(s.modelMatrix, !1, n.matrixWorld.elements),
        a
      );
    }
    function R() {
      var e = et;
      return (
        e >= eb &&
          console.warn(
            "WebGLRenderer: trying to use " +
              e +
              " texture units while this GPU supports only " +
              eb
          ),
        (et += 1),
        e
      );
    }
    function x(e, t, i, r) {
      (e[t] = i.r * i.r * r),
        (e[t + 1] = i.g * i.g * r),
        (e[t + 2] = i.b * i.b * r);
    }
    function H(e, t, i, r) {
      (e[t] = i.r * r), (e[t + 1] = i.g * r), (e[t + 2] = i.b * r);
    }
    function _(e) {
      e !== eE && (I.lineWidth(e), (eE = e));
    }
    function w(e, t, i) {
      ec !== e &&
        (e ? I.enable(I.POLYGON_OFFSET_FILL) : I.disable(I.POLYGON_OFFSET_FILL),
        (ec = e)),
        e &&
          (ep !== t || eu !== i) &&
          (I.polygonOffset(t, i), (ep = t), (eu = i));
    }
    function S(e, t) {
      var i;
      return (
        "fragment" === e
          ? (i = I.createShader(I.FRAGMENT_SHADER))
          : "vertex" === e && (i = I.createShader(I.VERTEX_SHADER)),
        I.shaderSource(i, t),
        I.compileShader(i),
        I.getShaderParameter(i, I.COMPILE_STATUS)
          ? i
          : (console.error(I.getShaderInfoLog(i)),
            console.error(
              (function e(t) {
                for (var t = t.split("\n"), i = 0, r = t.length; i < r; i++)
                  t[i] = i + 1 + ": " + t[i];
                return t.join("\n");
              })(t)
            ),
            null)
      );
    }
    function b(e, t, i) {
      i
        ? (I.texParameteri(e, I.TEXTURE_WRAP_S, A(t.wrapS)),
          I.texParameteri(e, I.TEXTURE_WRAP_T, A(t.wrapT)),
          I.texParameteri(e, I.TEXTURE_MAG_FILTER, A(t.magFilter)),
          I.texParameteri(e, I.TEXTURE_MIN_FILTER, A(t.minFilter)))
        : (I.texParameteri(e, I.TEXTURE_WRAP_S, I.CLAMP_TO_EDGE),
          I.texParameteri(e, I.TEXTURE_WRAP_T, I.CLAMP_TO_EDGE),
          I.texParameteri(e, I.TEXTURE_MAG_FILTER, C(t.magFilter)),
          I.texParameteri(e, I.TEXTURE_MIN_FILTER, C(t.minFilter))),
        G &&
          t.type !== THREE.FloatType &&
          (1 < t.anisotropy || t.__oldAnisotropy) &&
          (I.texParameterf(
            e,
            G.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(t.anisotropy, e0)
          ),
          (t.__oldAnisotropy = t.anisotropy));
    }
    function M(e, t) {
      I.bindRenderbuffer(I.RENDERBUFFER, e),
        t.depthBuffer && !t.stencilBuffer
          ? (I.renderbufferStorage(
              I.RENDERBUFFER,
              I.DEPTH_COMPONENT16,
              t.width,
              t.height
            ),
            I.framebufferRenderbuffer(
              I.FRAMEBUFFER,
              I.DEPTH_ATTACHMENT,
              I.RENDERBUFFER,
              e
            ))
          : t.depthBuffer && t.stencilBuffer
          ? (I.renderbufferStorage(
              I.RENDERBUFFER,
              I.DEPTH_STENCIL,
              t.width,
              t.height
            ),
            I.framebufferRenderbuffer(
              I.FRAMEBUFFER,
              I.DEPTH_STENCIL_ATTACHMENT,
              I.RENDERBUFFER,
              e
            ))
          : I.renderbufferStorage(I.RENDERBUFFER, I.RGBA4, t.width, t.height);
    }
    function C(e) {
      return e === THREE.NearestFilter ||
        e === THREE.NearestMipMapNearestFilter ||
        e === THREE.NearestMipMapLinearFilter
        ? I.NEAREST
        : I.LINEAR;
    }
    function A(e) {
      if (e === THREE.RepeatWrapping) return I.REPEAT;
      if (e === THREE.ClampToEdgeWrapping) return I.CLAMP_TO_EDGE;
      if (e === THREE.MirroredRepeatWrapping) return I.MIRRORED_REPEAT;
      if (e === THREE.NearestFilter) return I.NEAREST;
      if (e === THREE.NearestMipMapNearestFilter)
        return I.NEAREST_MIPMAP_NEAREST;
      if (e === THREE.NearestMipMapLinearFilter) return I.NEAREST_MIPMAP_LINEAR;
      if (e === THREE.LinearFilter) return I.LINEAR;
      if (e === THREE.LinearMipMapNearestFilter) return I.LINEAR_MIPMAP_NEAREST;
      if (e === THREE.LinearMipMapLinearFilter) return I.LINEAR_MIPMAP_LINEAR;
      if (e === THREE.UnsignedByteType) return I.UNSIGNED_BYTE;
      if (e === THREE.UnsignedShort4444Type) return I.UNSIGNED_SHORT_4_4_4_4;
      if (e === THREE.UnsignedShort5551Type) return I.UNSIGNED_SHORT_5_5_5_1;
      if (e === THREE.UnsignedShort565Type) return I.UNSIGNED_SHORT_5_6_5;
      if (e === THREE.ByteType) return I.BYTE;
      if (e === THREE.ShortType) return I.SHORT;
      if (e === THREE.UnsignedShortType) return I.UNSIGNED_SHORT;
      if (e === THREE.IntType) return I.INT;
      if (e === THREE.UnsignedIntType) return I.UNSIGNED_INT;
      if (e === THREE.FloatType) return I.FLOAT;
      if (e === THREE.AlphaFormat) return I.ALPHA;
      if (e === THREE.RGBFormat) return I.RGB;
      if (e === THREE.RGBAFormat) return I.RGBA;
      if (e === THREE.LuminanceFormat) return I.LUMINANCE;
      if (e === THREE.LuminanceAlphaFormat) return I.LUMINANCE_ALPHA;
      if (e === THREE.AddEquation) return I.FUNC_ADD;
      if (e === THREE.SubtractEquation) return I.FUNC_SUBTRACT;
      if (e === THREE.ReverseSubtractEquation) return I.FUNC_REVERSE_SUBTRACT;
      if (e === THREE.ZeroFactor) return I.ZERO;
      if (e === THREE.OneFactor) return I.ONE;
      if (e === THREE.SrcColorFactor) return I.SRC_COLOR;
      if (e === THREE.OneMinusSrcColorFactor) return I.ONE_MINUS_SRC_COLOR;
      if (e === THREE.SrcAlphaFactor) return I.SRC_ALPHA;
      if (e === THREE.OneMinusSrcAlphaFactor) return I.ONE_MINUS_SRC_ALPHA;
      if (e === THREE.DstAlphaFactor) return I.DST_ALPHA;
      if (e === THREE.OneMinusDstAlphaFactor) return I.ONE_MINUS_DST_ALPHA;
      if (e === THREE.DstColorFactor) return I.DST_COLOR;
      if (e === THREE.OneMinusDstColorFactor) return I.ONE_MINUS_DST_COLOR;
      if (e === THREE.SrcAlphaSaturateFactor) return I.SRC_ALPHA_SATURATE;
      if (void 0 !== W) {
        if (e === THREE.RGB_S3TC_DXT1_Format)
          return W.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (e === THREE.RGBA_S3TC_DXT1_Format)
          return W.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (e === THREE.RGBA_S3TC_DXT3_Format)
          return W.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (e === THREE.RGBA_S3TC_DXT5_Format)
          return W.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      return 0;
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var e = e || {},
      L = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      P = void 0 !== e.precision ? e.precision : "highp",
      D = void 0 === e.alpha || e.alpha,
      F = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
      U = void 0 !== e.antialias && e.antialias,
      V = void 0 === e.stencil || e.stencil,
      z = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
      N = new THREE.Color(0),
      B = 0;
    void 0 !== e.clearColor &&
      (console.warn(
        "DEPRECATED: clearColor in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."
      ),
      N.setHex(e.clearColor)),
      void 0 !== e.clearAlpha &&
        (console.warn(
          "DEPRECATED: clearAlpha in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."
        ),
        (B = e.clearAlpha)),
      (this.domElement = L),
      (this.context = null),
      (this.devicePixelRatio =
        void 0 !== e.devicePixelRatio
          ? e.devicePixelRatio
          : void 0 !== window.devicePixelRatio
          ? window.devicePixelRatio
          : 1),
      (this.autoUpdateObjects =
        this.sortObjects =
        this.autoClearStencil =
        this.autoClearDepth =
        this.autoClearColor =
        this.autoClear =
          !0),
      (this.shadowMapEnabled =
        this.physicallyBasedShading =
        this.gammaOutput =
        this.gammaInput =
          !1),
      (this.shadowMapAutoUpdate = !0),
      (this.shadowMapType = THREE.PCFShadowMap),
      (this.shadowMapCullFace = THREE.CullFaceFront),
      (this.shadowMapCascade = this.shadowMapDebug = !1),
      (this.maxMorphTargets = 8),
      (this.maxMorphNormals = 4),
      (this.autoScaleCubemaps = !0),
      (this.renderPluginsPre = []),
      (this.renderPluginsPost = []),
      (this.info = {
        memory: { programs: 0, geometries: 0, textures: 0 },
        render: { calls: 0, vertices: 0, faces: 0, points: 0 },
      });
    var I,
      O,
      k,
      G,
      W,
      j = this,
      X = [],
      Y = 0,
      q = null,
      K = null,
      Q = -1,
      Z = null,
      J = null,
      ee = 0,
      et = 0,
      ei = -1,
      er = -1,
      en = -1,
      eo = -1,
      ea = -1,
      es = -1,
      eh = -1,
      el = -1,
      ec = null,
      ep = null,
      eu = null,
      eE = null,
      ef = 0,
      ed = 0,
      em = 0,
      eg = 0,
      eT = 0,
      ev = 0,
      e$ = {},
      ey = new THREE.Frustum(),
      eR = new THREE.Matrix4(),
      ex = new THREE.Matrix4(),
      eH = new THREE.Vector3(),
      e_ = new THREE.Vector3(),
      ew = !0,
      e8 = {
        ambient: [0, 0, 0],
        directional: { length: 0, colors: [], positions: [] },
        point: { length: 0, colors: [], positions: [], distances: [] },
        spot: {
          length: 0,
          colors: [],
          positions: [],
          distances: [],
          directions: [],
          anglesCos: [],
          exponents: [],
        },
        hemi: { length: 0, skyColors: [], groundColors: [], positions: [] },
      };
    try {
      if (
        !(I = L.getContext("experimental-webgl", {
          alpha: D,
          premultipliedAlpha: F,
          antialias: U,
          stencil: V,
          preserveDrawingBuffer: z,
        }))
      )
        throw "Error creating WebGL context.";
    } catch (eS) {
      console.error(eS);
    }
    (O = I.getExtension("OES_texture_float")),
      (k = I.getExtension("OES_standard_derivatives")),
      (G =
        I.getExtension("EXT_texture_filter_anisotropic") ||
        I.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
        I.getExtension("WEBKIT_EXT_texture_filter_anisotropic")),
      (W =
        I.getExtension("WEBGL_compressed_texture_s3tc") ||
        I.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
        I.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")),
      O || console.log("THREE.WebGLRenderer: Float textures not supported."),
      k ||
        console.log("THREE.WebGLRenderer: Standard derivatives not supported."),
      G ||
        console.log(
          "THREE.WebGLRenderer: Anisotropic texture filtering not supported."
        ),
      W ||
        console.log(
          "THREE.WebGLRenderer: S3TC compressed textures not supported."
        ),
      void 0 === I.getShaderPrecisionFormat &&
        (I.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        }),
      I.clearColor(0, 0, 0, 1),
      I.clearDepth(1),
      I.clearStencil(0),
      I.enable(I.DEPTH_TEST),
      I.depthFunc(I.LEQUAL),
      I.frontFace(I.CCW),
      I.cullFace(I.BACK),
      I.enable(I.CULL_FACE),
      I.enable(I.BLEND),
      I.blendEquation(I.FUNC_ADD),
      I.blendFunc(I.SRC_ALPHA, I.ONE_MINUS_SRC_ALPHA),
      I.clearColor(N.r, N.g, N.b, B),
      (this.context = I);
    var eb = I.getParameter(I.MAX_TEXTURE_IMAGE_UNITS),
      eM = I.getParameter(I.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    I.getParameter(I.MAX_TEXTURE_SIZE);
    var eC = I.getParameter(I.MAX_CUBE_MAP_TEXTURE_SIZE),
      e0 = G ? I.getParameter(G.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
      eA = 0 < eM,
      e1 = eA && O;
    W && I.getParameter(I.COMPRESSED_TEXTURE_FORMATS);
    var eL = I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.HIGH_FLOAT),
      eP = I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.MEDIUM_FLOAT);
    I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.LOW_FLOAT);
    var eD = I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.HIGH_FLOAT),
      eF = I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.MEDIUM_FLOAT);
    I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.LOW_FLOAT),
      I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.HIGH_INT),
      I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.MEDIUM_INT),
      I.getShaderPrecisionFormat(I.VERTEX_SHADER, I.LOW_INT),
      I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.HIGH_INT),
      I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.MEDIUM_INT),
      I.getShaderPrecisionFormat(I.FRAGMENT_SHADER, I.LOW_INT);
    var eU = 0 < eL.precision && 0 < eD.precision,
      eV = 0 < eP.precision && 0 < eF.precision;
    "highp" !== P ||
      eU ||
      (eV
        ? ((P = "mediump"),
          console.warn("WebGLRenderer: highp not supported, using mediump"))
        : ((P = "lowp"),
          console.warn(
            "WebGLRenderer: highp and mediump not supported, using lowp"
          ))),
      "mediump" !== P ||
        eV ||
        ((P = "lowp"),
        console.warn("WebGLRenderer: mediump not supported, using lowp")),
      (this.getContext = function () {
        return I;
      }),
      (this.supportsVertexTextures = function () {
        return eA;
      }),
      (this.supportsFloatTextures = function () {
        return O;
      }),
      (this.supportsStandardDerivatives = function () {
        return k;
      }),
      (this.supportsCompressedTextureS3TC = function () {
        return W;
      }),
      (this.getMaxAnisotropy = function () {
        return e0;
      }),
      (this.getPrecision = function () {
        return P;
      }),
      (this.setSize = function (e, t, i) {
        (L.width = e * this.devicePixelRatio),
          (L.height = t * this.devicePixelRatio),
          1 !== this.devicePixelRatio &&
            !1 !== i &&
            ((L.style.width = e + "px"), (L.style.height = t + "px")),
          this.setViewport(0, 0, L.width, L.height);
      }),
      (this.setViewport = function (e, t, i, r) {
        (ef = void 0 !== e ? e : 0),
          (ed = void 0 !== t ? t : 0),
          (em = void 0 !== i ? i : L.width),
          (eg = void 0 !== r ? r : L.height),
          I.viewport(ef, ed, em, eg);
      }),
      (this.setScissor = function (e, t, i, r) {
        I.scissor(e, t, i, r);
      }),
      (this.enableScissorTest = function (e) {
        e ? I.enable(I.SCISSOR_TEST) : I.disable(I.SCISSOR_TEST);
      }),
      (this.setClearColor = function (e, t) {
        N.set(e), (B = void 0 !== t ? t : 1), I.clearColor(N.r, N.g, N.b, B);
      }),
      (this.setClearColorHex = function (e, t) {
        console.warn(
          "DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."
        ),
          this.setClearColor(e, t);
      }),
      (this.getClearColor = function () {
        return N;
      }),
      (this.getClearAlpha = function () {
        return B;
      }),
      (this.clear = function (e, t, i) {
        var r = 0;
        (void 0 === e || e) && (r |= I.COLOR_BUFFER_BIT),
          (void 0 === t || t) && (r |= I.DEPTH_BUFFER_BIT),
          (void 0 === i || i) && (r |= I.STENCIL_BUFFER_BIT),
          I.clear(r);
      }),
      (this.clearTarget = function (e, t, i, r) {
        this.setRenderTarget(e), this.clear(t, i, r);
      }),
      (this.addPostPlugin = function (e) {
        e.init(this), this.renderPluginsPost.push(e);
      }),
      (this.addPrePlugin = function (e) {
        e.init(this), this.renderPluginsPre.push(e);
      }),
      (this.updateShadowMap = function (e, t) {
        (q = null),
          (Q = Z = el = eh = en = -1),
          (ew = !0),
          (er = ei = -1),
          this.shadowMapPlugin.update(e, t);
      });
    var ez = function (e) {
        if (
          ((e = e.target).removeEventListener("dispose", ez),
          (e.__webglInit = void 0),
          void 0 !== e.__webglVertexBuffer &&
            I.deleteBuffer(e.__webglVertexBuffer),
          void 0 !== e.__webglNormalBuffer &&
            I.deleteBuffer(e.__webglNormalBuffer),
          void 0 !== e.__webglTangentBuffer &&
            I.deleteBuffer(e.__webglTangentBuffer),
          void 0 !== e.__webglColorBuffer &&
            I.deleteBuffer(e.__webglColorBuffer),
          void 0 !== e.__webglUVBuffer && I.deleteBuffer(e.__webglUVBuffer),
          void 0 !== e.__webglUV2Buffer && I.deleteBuffer(e.__webglUV2Buffer),
          void 0 !== e.__webglSkinIndicesBuffer &&
            I.deleteBuffer(e.__webglSkinIndicesBuffer),
          void 0 !== e.__webglSkinWeightsBuffer &&
            I.deleteBuffer(e.__webglSkinWeightsBuffer),
          void 0 !== e.__webglFaceBuffer && I.deleteBuffer(e.__webglFaceBuffer),
          void 0 !== e.__webglLineBuffer && I.deleteBuffer(e.__webglLineBuffer),
          void 0 !== e.__webglLineDistanceBuffer &&
            I.deleteBuffer(e.__webglLineDistanceBuffer),
          void 0 !== e.geometryGroups)
        )
          for (var i in e.geometryGroups) {
            var r = e.geometryGroups[i];
            if (void 0 !== r.numMorphTargets)
              for (var n = 0, o = r.numMorphTargets; n < o; n++)
                I.deleteBuffer(r.__webglMorphTargetsBuffers[n]);
            if (void 0 !== r.numMorphNormals)
              for (n = 0, o = r.numMorphNormals; n < o; n++)
                I.deleteBuffer(r.__webglMorphNormalsBuffers[n]);
            t(r);
          }
        t(e), j.info.memory.geometries--;
      },
      eN = function (e) {
        (e = e.target).removeEventListener("dispose", eN),
          e.image && e.image.__webglTextureCube
            ? I.deleteTexture(e.image.__webglTextureCube)
            : e.__webglInit &&
              ((e.__webglInit = !1), I.deleteTexture(e.__webglTexture)),
          j.info.memory.textures--;
      },
      eB = function (e) {
        if (
          ((e = e.target).removeEventListener("dispose", eB),
          e && e.__webglTexture)
        ) {
          if (
            (I.deleteTexture(e.__webglTexture),
            e instanceof THREE.WebGLRenderTargetCube)
          )
            for (var t = 0; 6 > t; t++)
              I.deleteFramebuffer(e.__webglFramebuffer[t]),
                I.deleteRenderbuffer(e.__webglRenderbuffer[t]);
          else
            I.deleteFramebuffer(e.__webglFramebuffer),
              I.deleteRenderbuffer(e.__webglRenderbuffer);
        }
        j.info.memory.textures--;
      },
      eI = function (e) {
        (e = e.target).removeEventListener("dispose", eI), e2(e);
      },
      e2 = function (e) {
        var t = e.program;
        if (void 0 !== t) {
          e.program = void 0;
          var i,
            r,
            n = !1,
            e = 0;
          for (i = X.length; e < i; e++)
            if ((r = X[e]).program === t) {
              r.usedTimes--, 0 === r.usedTimes && (n = !0);
              break;
            }
          if (!0 === n) {
            for (n = [], e = 0, i = X.length; e < i; e++)
              (r = X[e]).program !== t && n.push(r);
            (X = n), I.deleteProgram(t), j.info.memory.programs--;
          }
        }
      };
    (this.renderBufferImmediate = function (e, t, i) {
      if (
        (e.hasPositions &&
          !e.__webglVertexBuffer &&
          (e.__webglVertexBuffer = I.createBuffer()),
        e.hasNormals &&
          !e.__webglNormalBuffer &&
          (e.__webglNormalBuffer = I.createBuffer()),
        e.hasUvs &&
          !e.__webglUvBuffer &&
          (e.__webglUvBuffer = I.createBuffer()),
        e.hasColors &&
          !e.__webglColorBuffer &&
          (e.__webglColorBuffer = I.createBuffer()),
        e.hasPositions &&
          (I.bindBuffer(I.ARRAY_BUFFER, e.__webglVertexBuffer),
          I.bufferData(I.ARRAY_BUFFER, e.positionArray, I.DYNAMIC_DRAW),
          I.enableVertexAttribArray(t.attributes.position),
          I.vertexAttribPointer(t.attributes.position, 3, I.FLOAT, !1, 0, 0)),
        e.hasNormals)
      ) {
        if (
          (I.bindBuffer(I.ARRAY_BUFFER, e.__webglNormalBuffer),
          i.shading === THREE.FlatShading)
        ) {
          var r,
            n,
            o,
            a,
            s,
            h,
            l,
            c,
            p,
            u,
            E,
            f = 3 * e.count;
          for (E = 0; E < f; E += 9)
            (r = (u = e.normalArray)[E]),
              (n = u[E + 1]),
              (o = u[E + 2]),
              (a = u[E + 3]),
              (h = u[E + 4]),
              (c = u[E + 5]),
              (s = u[E + 6]),
              (l = u[E + 7]),
              (p = u[E + 8]),
              (r = (r + a + s) / 3),
              (n = (n + h + l) / 3),
              (o = (o + c + p) / 3),
              (u[E] = r),
              (u[E + 1] = n),
              (u[E + 2] = o),
              (u[E + 3] = r),
              (u[E + 4] = n),
              (u[E + 5] = o),
              (u[E + 6] = r),
              (u[E + 7] = n),
              (u[E + 8] = o);
        }
        I.bufferData(I.ARRAY_BUFFER, e.normalArray, I.DYNAMIC_DRAW),
          I.enableVertexAttribArray(t.attributes.normal),
          I.vertexAttribPointer(t.attributes.normal, 3, I.FLOAT, !1, 0, 0);
      }
      e.hasUvs &&
        i.map &&
        (I.bindBuffer(I.ARRAY_BUFFER, e.__webglUvBuffer),
        I.bufferData(I.ARRAY_BUFFER, e.uvArray, I.DYNAMIC_DRAW),
        I.enableVertexAttribArray(t.attributes.uv),
        I.vertexAttribPointer(t.attributes.uv, 2, I.FLOAT, !1, 0, 0)),
        e.hasColors &&
          i.vertexColors !== THREE.NoColors &&
          (I.bindBuffer(I.ARRAY_BUFFER, e.__webglColorBuffer),
          I.bufferData(I.ARRAY_BUFFER, e.colorArray, I.DYNAMIC_DRAW),
          I.enableVertexAttribArray(t.attributes.color),
          I.vertexAttribPointer(t.attributes.color, 3, I.FLOAT, !1, 0, 0)),
        I.drawArrays(I.TRIANGLES, 0, e.count),
        (e.count = 0);
    }),
      (this.renderBufferDirect = function (e, t, i, r, n, o) {
        if (!1 !== r.visible) {
          var a, l, c;
          if (
            ((e = (a = y(e, t, i, r, o)).attributes),
            (t = n.attributes),
            (i = !1),
            (a = 16777215 * n.id + 2 * a.id + (r.wireframe ? 1 : 0)) !== Z &&
              ((Z = a), (i = !0)),
            i && h(),
            o instanceof THREE.Mesh)
          ) {
            if ((r = t.index)) {
              1 < (n = n.offsets).length && (i = !0);
              for (var p = 0, u = n.length; p < u; p++) {
                var E = n[p].index;
                if (i) {
                  for (l in t)
                    "index" !== l &&
                      ((a = e[l]),
                      (c = (o = t[l]).itemSize),
                      0 <= a &&
                        (I.bindBuffer(I.ARRAY_BUFFER, o.buffer),
                        s(a),
                        I.vertexAttribPointer(
                          a,
                          c,
                          I.FLOAT,
                          !1,
                          0,
                          4 * E * c
                        )));
                  I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, r.buffer);
                }
                I.drawElements(
                  I.TRIANGLES,
                  n[p].count,
                  I.UNSIGNED_SHORT,
                  2 * n[p].start
                ),
                  j.info.render.calls++,
                  (j.info.render.vertices += n[p].count),
                  (j.info.render.faces += n[p].count / 3);
              }
            } else {
              if (i)
                for (l in t)
                  "index" !== l &&
                    ((a = e[l]),
                    (c = (o = t[l]).itemSize),
                    0 <= a &&
                      (I.bindBuffer(I.ARRAY_BUFFER, o.buffer),
                      s(a),
                      I.vertexAttribPointer(a, c, I.FLOAT, !1, 0, 0)));
              (l = n.attributes.position),
                I.drawArrays(I.TRIANGLES, 0, l.numItems / 3),
                j.info.render.calls++,
                (j.info.render.vertices += l.numItems / 3),
                (j.info.render.faces += l.numItems / 3 / 3);
            }
          } else if (o instanceof THREE.ParticleSystem) {
            if (i) {
              for (l in t)
                (a = e[l]),
                  (c = (o = t[l]).itemSize),
                  0 <= a &&
                    (I.bindBuffer(I.ARRAY_BUFFER, o.buffer),
                    s(a),
                    I.vertexAttribPointer(a, c, I.FLOAT, !1, 0, 0));
              (l = t.position),
                I.drawArrays(I.POINTS, 0, l.numItems / 3),
                j.info.render.calls++,
                (j.info.render.points += l.numItems / 3);
            }
          } else if (o instanceof THREE.Line && i) {
            for (l in t)
              (a = e[l]),
                (c = (o = t[l]).itemSize),
                0 <= a &&
                  (I.bindBuffer(I.ARRAY_BUFFER, o.buffer),
                  s(a),
                  I.vertexAttribPointer(a, c, I.FLOAT, !1, 0, 0));
            _(r.linewidth),
              (l = t.position),
              I.drawArrays(I.LINE_STRIP, 0, l.numItems / 3),
              j.info.render.calls++,
              (j.info.render.points += l.numItems);
          }
        }
      }),
      (this.renderBuffer = function (e, t, i, r, n, o) {
        if (!1 !== r.visible) {
          var a,
            l,
            i = y(e, t, i, r, o),
            e = i.attributes,
            t = !1,
            i = 16777215 * n.id + 2 * i.id + (r.wireframe ? 1 : 0);
          if (
            (i !== Z && ((Z = i), (t = !0)),
            t && h(),
            !r.morphTargets && 0 <= e.position)
          )
            t &&
              (I.bindBuffer(I.ARRAY_BUFFER, n.__webglVertexBuffer),
              s(e.position),
              I.vertexAttribPointer(e.position, 3, I.FLOAT, !1, 0, 0));
          else if (o.morphTargetBase) {
            if (
              ((i = r.program.attributes),
              -1 !== o.morphTargetBase && 0 <= i.position
                ? (I.bindBuffer(
                    I.ARRAY_BUFFER,
                    n.__webglMorphTargetsBuffers[o.morphTargetBase]
                  ),
                  s(i.position),
                  I.vertexAttribPointer(i.position, 3, I.FLOAT, !1, 0, 0))
                : 0 <= i.position &&
                  (I.bindBuffer(I.ARRAY_BUFFER, n.__webglVertexBuffer),
                  s(i.position),
                  I.vertexAttribPointer(i.position, 3, I.FLOAT, !1, 0, 0)),
              o.morphTargetForcedOrder.length)
            ) {
              var p = 0;
              for (
                l = o.morphTargetForcedOrder, a = o.morphTargetInfluences;
                p < r.numSupportedMorphTargets && p < l.length;

              )
                0 <= i["morphTarget" + p] &&
                  (I.bindBuffer(
                    I.ARRAY_BUFFER,
                    n.__webglMorphTargetsBuffers[l[p]]
                  ),
                  s(i["morphTarget" + p]),
                  I.vertexAttribPointer(
                    i["morphTarget" + p],
                    3,
                    I.FLOAT,
                    !1,
                    0,
                    0
                  )),
                  0 <= i["morphNormal" + p] &&
                    r.morphNormals &&
                    (I.bindBuffer(
                      I.ARRAY_BUFFER,
                      n.__webglMorphNormalsBuffers[l[p]]
                    ),
                    s(i["morphNormal" + p]),
                    I.vertexAttribPointer(
                      i["morphNormal" + p],
                      3,
                      I.FLOAT,
                      !1,
                      0,
                      0
                    )),
                  (o.__webglMorphTargetInfluences[p] = a[l[p]]),
                  p++;
            } else {
              l = [];
              var u,
                E = (a = o.morphTargetInfluences).length;
              for (u = 0; u < E; u++) 0 < (p = a[u]) && l.push([p, u]);
              for (
                l.length > r.numSupportedMorphTargets
                  ? (l.sort(c), (l.length = r.numSupportedMorphTargets))
                  : l.length > r.numSupportedMorphNormals
                  ? l.sort(c)
                  : 0 === l.length && l.push([0, 0]),
                  p = 0;
                p < r.numSupportedMorphTargets;

              )
                l[p]
                  ? ((u = l[p][1]),
                    0 <= i["morphTarget" + p] &&
                      (I.bindBuffer(
                        I.ARRAY_BUFFER,
                        n.__webglMorphTargetsBuffers[u]
                      ),
                      s(i["morphTarget" + p]),
                      I.vertexAttribPointer(
                        i["morphTarget" + p],
                        3,
                        I.FLOAT,
                        !1,
                        0,
                        0
                      )),
                    0 <= i["morphNormal" + p] &&
                      r.morphNormals &&
                      (I.bindBuffer(
                        I.ARRAY_BUFFER,
                        n.__webglMorphNormalsBuffers[u]
                      ),
                      s(i["morphNormal" + p]),
                      I.vertexAttribPointer(
                        i["morphNormal" + p],
                        3,
                        I.FLOAT,
                        !1,
                        0,
                        0
                      )),
                    (o.__webglMorphTargetInfluences[p] = a[u]))
                  : (o.__webglMorphTargetInfluences[p] = 0),
                  p++;
            }
            null !== r.program.uniforms.morphTargetInfluences &&
              I.uniform1fv(
                r.program.uniforms.morphTargetInfluences,
                o.__webglMorphTargetInfluences
              );
          }
          if (t) {
            if (n.__webglCustomAttributesList)
              for (a = 0, l = n.__webglCustomAttributesList.length; a < l; a++)
                0 <=
                  e[
                    (i = n.__webglCustomAttributesList[a]).buffer
                      .belongsToAttribute
                  ] &&
                  (I.bindBuffer(I.ARRAY_BUFFER, i.buffer),
                  s(e[i.buffer.belongsToAttribute]),
                  I.vertexAttribPointer(
                    e[i.buffer.belongsToAttribute],
                    i.size,
                    I.FLOAT,
                    !1,
                    0,
                    0
                  ));
            0 <= e.color &&
              (I.bindBuffer(I.ARRAY_BUFFER, n.__webglColorBuffer),
              s(e.color),
              I.vertexAttribPointer(e.color, 3, I.FLOAT, !1, 0, 0)),
              0 <= e.normal &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglNormalBuffer),
                s(e.normal),
                I.vertexAttribPointer(e.normal, 3, I.FLOAT, !1, 0, 0)),
              0 <= e.tangent &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglTangentBuffer),
                s(e.tangent),
                I.vertexAttribPointer(e.tangent, 4, I.FLOAT, !1, 0, 0)),
              0 <= e.uv &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglUVBuffer),
                s(e.uv),
                I.vertexAttribPointer(e.uv, 2, I.FLOAT, !1, 0, 0)),
              0 <= e.uv2 &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglUV2Buffer),
                s(e.uv2),
                I.vertexAttribPointer(e.uv2, 2, I.FLOAT, !1, 0, 0)),
              r.skinning &&
                0 <= e.skinIndex &&
                0 <= e.skinWeight &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglSkinIndicesBuffer),
                s(e.skinIndex),
                I.vertexAttribPointer(e.skinIndex, 4, I.FLOAT, !1, 0, 0),
                I.bindBuffer(I.ARRAY_BUFFER, n.__webglSkinWeightsBuffer),
                s(e.skinWeight),
                I.vertexAttribPointer(e.skinWeight, 4, I.FLOAT, !1, 0, 0)),
              0 <= e.lineDistance &&
                (I.bindBuffer(I.ARRAY_BUFFER, n.__webglLineDistanceBuffer),
                s(e.lineDistance),
                I.vertexAttribPointer(e.lineDistance, 1, I.FLOAT, !1, 0, 0));
          }
          o instanceof THREE.Mesh
            ? (r.wireframe
                ? (_(r.wireframeLinewidth),
                  t &&
                    I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, n.__webglLineBuffer),
                  I.drawElements(
                    I.LINES,
                    n.__webglLineCount,
                    I.UNSIGNED_SHORT,
                    0
                  ))
                : (t &&
                    I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, n.__webglFaceBuffer),
                  I.drawElements(
                    I.TRIANGLES,
                    n.__webglFaceCount,
                    I.UNSIGNED_SHORT,
                    0
                  )),
              j.info.render.calls++,
              (j.info.render.vertices += n.__webglFaceCount),
              (j.info.render.faces += n.__webglFaceCount / 3))
            : o instanceof THREE.Line
            ? ((o = o.type === THREE.LineStrip ? I.LINE_STRIP : I.LINES),
              _(r.linewidth),
              I.drawArrays(o, 0, n.__webglLineCount),
              j.info.render.calls++)
            : o instanceof THREE.ParticleSystem
            ? (I.drawArrays(I.POINTS, 0, n.__webglParticleCount),
              j.info.render.calls++,
              (j.info.render.points += n.__webglParticleCount))
            : o instanceof THREE.Ribbon &&
              (I.drawArrays(I.TRIANGLE_STRIP, 0, n.__webglVertexCount),
              j.info.render.calls++);
        }
      }),
      (this.render = function (e, t, i, r) {
        if (!1 == t instanceof THREE.Camera)
          console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
          );
        else {
          var n,
            o,
            a,
            s,
            h = e.__lights,
            c = e.fog;
          for (
            Q = -1,
              ew = !0,
              !0 === e.autoUpdate && e.updateMatrixWorld(),
              void 0 === t.parent && t.updateMatrixWorld(),
              t.matrixWorldInverse.getInverse(t.matrixWorld),
              eR.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
              ey.setFromMatrix(eR),
              this.autoUpdateObjects && this.initWebGLObjects(e),
              p(this.renderPluginsPre, e, t),
              j.info.render.calls = 0,
              j.info.render.vertices = 0,
              j.info.render.faces = 0,
              j.info.render.points = 0,
              this.setRenderTarget(i),
              (this.autoClear || r) &&
                this.clear(
                  this.autoClearColor,
                  this.autoClearDepth,
                  this.autoClearStencil
                ),
              s = e.__webglObjects,
              r = 0,
              n = s.length;
            r < n;
            r++
          )
            if (
              ((a = (o = s[r]).object),
              (o.id = r),
              (o.render = !1),
              a.visible &&
                (!(
                  a instanceof THREE.Mesh || a instanceof THREE.ParticleSystem
                ) ||
                  !a.frustumCulled ||
                  ey.intersectsObject(a)))
            ) {
              var f = a;
              f._modelViewMatrix.multiplyMatrices(
                t.matrixWorldInverse,
                f.matrixWorld
              ),
                f._normalMatrix.getNormalMatrix(f._modelViewMatrix);
              var f = o,
                d = f.buffer,
                m = void 0,
                g = (m = void 0),
                g = f.object.material;
              g instanceof THREE.MeshFaceMaterial
                ? ((m = d.materialIndex),
                  (m = g.materials[m]).transparent
                    ? ((f.transparent = m), (f.opaque = null))
                    : ((f.opaque = m), (f.transparent = null)))
                : (m = g) &&
                  (m.transparent
                    ? ((f.transparent = m), (f.opaque = null))
                    : ((f.opaque = m), (f.transparent = null))),
                (o.render = !0),
                !0 === this.sortObjects &&
                  (null !== a.renderDepth
                    ? (o.z = a.renderDepth)
                    : (eH.getPositionFromMatrix(a.matrixWorld),
                      eH.applyProjection(eR),
                      (o.z = eH.z)));
            }
          for (
            this.sortObjects && s.sort(l),
              s = e.__webglObjectsImmediate,
              r = 0,
              n = s.length;
            r < n;
            r++
          )
            (a = (o = s[r]).object).visible &&
              (a._modelViewMatrix.multiplyMatrices(
                t.matrixWorldInverse,
                a.matrixWorld
              ),
              a._normalMatrix.getNormalMatrix(a._modelViewMatrix),
              (a = o.object.material).transparent
                ? ((o.transparent = a), (o.opaque = null))
                : ((o.opaque = a), (o.transparent = null)));
          e.overrideMaterial
            ? ((r = e.overrideMaterial),
              this.setBlending(
                r.blending,
                r.blendEquation,
                r.blendSrc,
                r.blendDst
              ),
              this.setDepthTest(r.depthTest),
              this.setDepthWrite(r.depthWrite),
              w(r.polygonOffset, r.polygonOffsetFactor, r.polygonOffsetUnits),
              u(e.__webglObjects, !1, "", t, h, c, !0, r),
              E(e.__webglObjectsImmediate, "", t, h, c, !1, r))
            : ((r = null),
              this.setBlending(THREE.NoBlending),
              u(e.__webglObjects, !0, "opaque", t, h, c, !1, r),
              E(e.__webglObjectsImmediate, "opaque", t, h, c, !1, r),
              u(e.__webglObjects, !1, "transparent", t, h, c, !0, r),
              E(e.__webglObjectsImmediate, "transparent", t, h, c, !0, r)),
            p(this.renderPluginsPost, e, t),
            i &&
              i.generateMipmaps &&
              i.minFilter !== THREE.NearestFilter &&
              i.minFilter !== THREE.LinearFilter &&
              (i instanceof THREE.WebGLRenderTargetCube
                ? (I.bindTexture(I.TEXTURE_CUBE_MAP, i.__webglTexture),
                  I.generateMipmap(I.TEXTURE_CUBE_MAP),
                  I.bindTexture(I.TEXTURE_CUBE_MAP, null))
                : (I.bindTexture(I.TEXTURE_2D, i.__webglTexture),
                  I.generateMipmap(I.TEXTURE_2D),
                  I.bindTexture(I.TEXTURE_2D, null))),
            this.setDepthTest(!0),
            this.setDepthWrite(!0);
        }
      }),
      (this.renderImmediateObject = function (e, t, i, r, n) {
        var o = y(e, t, i, r, n);
        (Z = -1),
          j.setMaterialFaces(r),
          n.immediateRenderCallback
            ? n.immediateRenderCallback(o, I, ey)
            : n.render(function (e) {
                j.renderBufferImmediate(e, o, r);
              });
      }),
      (this.initWebGLObjects = function (e) {
        for (
          e.__webglObjects ||
          ((e.__webglObjects = []),
          (e.__webglObjectsImmediate = []),
          (e.__webglSprites = []),
          (e.__webglFlares = []));
          e.__objectsAdded.length;

        )
          f(e.__objectsAdded[0], e), e.__objectsAdded.splice(0, 1);
        for (; e.__objectsRemoved.length; )
          T(e.__objectsRemoved[0], e), e.__objectsRemoved.splice(0, 1);
        for (var t = 0, i = e.__webglObjects.length; t < i; t++) {
          var s = e.__webglObjects[t].object;
          void 0 === s.__webglInit &&
            (void 0 !== s.__webglActive && T(s, e), f(s, e));
          var h = s,
            l = h.geometry,
            p = void 0,
            u = void 0,
            E = void 0;
          if (l instanceof THREE.BufferGeometry) {
            var d = I.DYNAMIC_DRAW,
              v = !l.dynamic,
              $ = l.attributes,
              y = void 0,
              R = void 0;
            for (y in $)
              (R = $[y]).needsUpdate &&
                ("index" === y
                  ? (I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, R.buffer),
                    I.bufferData(I.ELEMENT_ARRAY_BUFFER, R.array, d))
                  : (I.bindBuffer(I.ARRAY_BUFFER, R.buffer),
                    I.bufferData(I.ARRAY_BUFFER, R.array, d)),
                (R.needsUpdate = !1)),
                v && !R.dynamic && delete R.array;
          } else if (h instanceof THREE.Mesh) {
            for (var x = 0, H = l.geometryGroupsList.length; x < H; x++)
              if (
                ((E = n(h, (p = l.geometryGroupsList[x]))),
                l.buffersNeedUpdate && r(p, h),
                (u = E.attributes && m(E)),
                l.verticesNeedUpdate ||
                  l.morphTargetsNeedUpdate ||
                  l.elementsNeedUpdate ||
                  l.uvsNeedUpdate ||
                  l.normalsNeedUpdate ||
                  l.colorsNeedUpdate ||
                  l.tangentsNeedUpdate ||
                  u)
              ) {
                var _ = p,
                  w = h,
                  S = I.DYNAMIC_DRAW,
                  b = !l.dynamic,
                  M = E;
                if (_.__inittedArrays) {
                  var C,
                    A = o(M),
                    L = !!M.vertexColors && M.vertexColors,
                    P = a(M),
                    D = A === THREE.SmoothShading,
                    F = void 0,
                    U = void 0,
                    V = void 0,
                    z = void 0,
                    N = void 0,
                    B = void 0,
                    O = void 0,
                    k = void 0,
                    G = void 0,
                    W = void 0,
                    j = void 0,
                    X = void 0,
                    Y = void 0,
                    q = void 0,
                    K = void 0,
                    Q = void 0,
                    Z = void 0,
                    J = void 0,
                    ee = void 0,
                    et = void 0,
                    ei = void 0,
                    er = void 0,
                    en = void 0,
                    eo = void 0,
                    ea = void 0,
                    es = void 0,
                    eh = void 0,
                    el = void 0,
                    ec = void 0,
                    ep = void 0,
                    eu = void 0,
                    eE = void 0,
                    ef = void 0,
                    ed = void 0,
                    em = void 0,
                    eg = void 0,
                    eT = void 0,
                    ev = void 0,
                    e$ = void 0,
                    ey = void 0,
                    e_ = void 0,
                    ew = void 0,
                    e8 = void 0,
                    eS = void 0,
                    eb = void 0,
                    eM = void 0,
                    eC = 0,
                    e0 = 0,
                    eA = 0,
                    e1 = 0,
                    eL = 0,
                    eP = 0,
                    eD = 0,
                    eF = 0,
                    eU = 0,
                    eV = 0,
                    ez = 0,
                    eN = 0,
                    eB = void 0,
                    eI = _.__vertexArray,
                    e2 = _.__uvArray,
                    eO = _.__uv2Array,
                    e3 = _.__normalArray,
                    ek = _.__tangentArray,
                    eG = _.__colorArray,
                    eW = _.__skinIndexArray,
                    e4 = _.__skinWeightArray,
                    ej = _.__morphTargetsArrays,
                    e5 = _.__morphNormalsArrays,
                    eX = _.__webglCustomAttributesList,
                    e6 = void 0,
                    e7 = _.__faceArray,
                    eY = _.__lineArray,
                    eq = w.geometry,
                    eK = eq.elementsNeedUpdate,
                    eQ = eq.uvsNeedUpdate,
                    eZ = eq.normalsNeedUpdate,
                    eJ = eq.tangentsNeedUpdate,
                    e9 = eq.colorsNeedUpdate,
                    te = eq.morphTargetsNeedUpdate,
                    tt = eq.vertices,
                    ti = _.faces3,
                    tr = _.faces4,
                    tn = eq.faces,
                    to = eq.faceVertexUvs[0],
                    ta = eq.faceVertexUvs[1],
                    ts = eq.skinIndices,
                    th = eq.skinWeights,
                    tl = eq.morphTargets,
                    tc = eq.morphNormals;
                  if (eq.verticesNeedUpdate) {
                    for (F = 0, U = ti.length; F < U; F++)
                      (X = tt[(z = tn[ti[F]]).a]),
                        (Y = tt[z.b]),
                        (q = tt[z.c]),
                        (eI[e0] = X.x),
                        (eI[e0 + 1] = X.y),
                        (eI[e0 + 2] = X.z),
                        (eI[e0 + 3] = Y.x),
                        (eI[e0 + 4] = Y.y),
                        (eI[e0 + 5] = Y.z),
                        (eI[e0 + 6] = q.x),
                        (eI[e0 + 7] = q.y),
                        (eI[e0 + 8] = q.z),
                        (e0 += 9);
                    for (F = 0, U = tr.length; F < U; F++)
                      (X = tt[(z = tn[tr[F]]).a]),
                        (Y = tt[z.b]),
                        (q = tt[z.c]),
                        (K = tt[z.d]),
                        (eI[e0] = X.x),
                        (eI[e0 + 1] = X.y),
                        (eI[e0 + 2] = X.z),
                        (eI[e0 + 3] = Y.x),
                        (eI[e0 + 4] = Y.y),
                        (eI[e0 + 5] = Y.z),
                        (eI[e0 + 6] = q.x),
                        (eI[e0 + 7] = q.y),
                        (eI[e0 + 8] = q.z),
                        (eI[e0 + 9] = K.x),
                        (eI[e0 + 10] = K.y),
                        (eI[e0 + 11] = K.z),
                        (e0 += 12);
                    I.bindBuffer(I.ARRAY_BUFFER, _.__webglVertexBuffer),
                      I.bufferData(I.ARRAY_BUFFER, eI, S);
                  }
                  if (te)
                    for (e_ = 0, ew = tl.length; e_ < ew; e_++) {
                      for (F = ez = 0, U = ti.length; F < U; F++)
                        (z = tn[(eb = ti[F])]),
                          (X = tl[e_].vertices[z.a]),
                          (Y = tl[e_].vertices[z.b]),
                          (q = tl[e_].vertices[z.c]),
                          ((e8 = ej[e_])[ez] = X.x),
                          (e8[ez + 1] = X.y),
                          (e8[ez + 2] = X.z),
                          (e8[ez + 3] = Y.x),
                          (e8[ez + 4] = Y.y),
                          (e8[ez + 5] = Y.z),
                          (e8[ez + 6] = q.x),
                          (e8[ez + 7] = q.y),
                          (e8[ez + 8] = q.z),
                          M.morphNormals &&
                            (D
                              ? ((et = (eM = tc[e_].vertexNormals[eb]).a),
                                (ei = eM.b),
                                (er = eM.c))
                              : (er = ei = et = tc[e_].faceNormals[eb]),
                            ((eS = e5[e_])[ez] = et.x),
                            (eS[ez + 1] = et.y),
                            (eS[ez + 2] = et.z),
                            (eS[ez + 3] = ei.x),
                            (eS[ez + 4] = ei.y),
                            (eS[ez + 5] = ei.z),
                            (eS[ez + 6] = er.x),
                            (eS[ez + 7] = er.y),
                            (eS[ez + 8] = er.z)),
                          (ez += 9);
                      for (F = 0, U = tr.length; F < U; F++)
                        (z = tn[(eb = tr[F])]),
                          (X = tl[e_].vertices[z.a]),
                          (Y = tl[e_].vertices[z.b]),
                          (q = tl[e_].vertices[z.c]),
                          (K = tl[e_].vertices[z.d]),
                          ((e8 = ej[e_])[ez] = X.x),
                          (e8[ez + 1] = X.y),
                          (e8[ez + 2] = X.z),
                          (e8[ez + 3] = Y.x),
                          (e8[ez + 4] = Y.y),
                          (e8[ez + 5] = Y.z),
                          (e8[ez + 6] = q.x),
                          (e8[ez + 7] = q.y),
                          (e8[ez + 8] = q.z),
                          (e8[ez + 9] = K.x),
                          (e8[ez + 10] = K.y),
                          (e8[ez + 11] = K.z),
                          M.morphNormals &&
                            (D
                              ? ((et = (eM = tc[e_].vertexNormals[eb]).a),
                                (ei = eM.b),
                                (er = eM.c),
                                (en = eM.d))
                              : (en = er = ei = et = tc[e_].faceNormals[eb]),
                            ((eS = e5[e_])[ez] = et.x),
                            (eS[ez + 1] = et.y),
                            (eS[ez + 2] = et.z),
                            (eS[ez + 3] = ei.x),
                            (eS[ez + 4] = ei.y),
                            (eS[ez + 5] = ei.z),
                            (eS[ez + 6] = er.x),
                            (eS[ez + 7] = er.y),
                            (eS[ez + 8] = er.z),
                            (eS[ez + 9] = en.x),
                            (eS[ez + 10] = en.y),
                            (eS[ez + 11] = en.z)),
                          (ez += 12);
                      I.bindBuffer(
                        I.ARRAY_BUFFER,
                        _.__webglMorphTargetsBuffers[e_]
                      ),
                        I.bufferData(I.ARRAY_BUFFER, ej[e_], S),
                        M.morphNormals &&
                          (I.bindBuffer(
                            I.ARRAY_BUFFER,
                            _.__webglMorphNormalsBuffers[e_]
                          ),
                          I.bufferData(I.ARRAY_BUFFER, e5[e_], S));
                    }
                  if (th.length) {
                    for (F = 0, U = ti.length; F < U; F++)
                      (el = th[(z = tn[ti[F]]).a]),
                        (ec = th[z.b]),
                        (ep = th[z.c]),
                        (e4[eV] = el.x),
                        (e4[eV + 1] = el.y),
                        (e4[eV + 2] = el.z),
                        (e4[eV + 3] = el.w),
                        (e4[eV + 4] = ec.x),
                        (e4[eV + 5] = ec.y),
                        (e4[eV + 6] = ec.z),
                        (e4[eV + 7] = ec.w),
                        (e4[eV + 8] = ep.x),
                        (e4[eV + 9] = ep.y),
                        (e4[eV + 10] = ep.z),
                        (e4[eV + 11] = ep.w),
                        (eE = ts[z.a]),
                        (ef = ts[z.b]),
                        (ed = ts[z.c]),
                        (eW[eV] = eE.x),
                        (eW[eV + 1] = eE.y),
                        (eW[eV + 2] = eE.z),
                        (eW[eV + 3] = eE.w),
                        (eW[eV + 4] = ef.x),
                        (eW[eV + 5] = ef.y),
                        (eW[eV + 6] = ef.z),
                        (eW[eV + 7] = ef.w),
                        (eW[eV + 8] = ed.x),
                        (eW[eV + 9] = ed.y),
                        (eW[eV + 10] = ed.z),
                        (eW[eV + 11] = ed.w),
                        (eV += 12);
                    for (F = 0, U = tr.length; F < U; F++)
                      (el = th[(z = tn[tr[F]]).a]),
                        (ec = th[z.b]),
                        (ep = th[z.c]),
                        (eu = th[z.d]),
                        (e4[eV] = el.x),
                        (e4[eV + 1] = el.y),
                        (e4[eV + 2] = el.z),
                        (e4[eV + 3] = el.w),
                        (e4[eV + 4] = ec.x),
                        (e4[eV + 5] = ec.y),
                        (e4[eV + 6] = ec.z),
                        (e4[eV + 7] = ec.w),
                        (e4[eV + 8] = ep.x),
                        (e4[eV + 9] = ep.y),
                        (e4[eV + 10] = ep.z),
                        (e4[eV + 11] = ep.w),
                        (e4[eV + 12] = eu.x),
                        (e4[eV + 13] = eu.y),
                        (e4[eV + 14] = eu.z),
                        (e4[eV + 15] = eu.w),
                        (eE = ts[z.a]),
                        (ef = ts[z.b]),
                        (ed = ts[z.c]),
                        (em = ts[z.d]),
                        (eW[eV] = eE.x),
                        (eW[eV + 1] = eE.y),
                        (eW[eV + 2] = eE.z),
                        (eW[eV + 3] = eE.w),
                        (eW[eV + 4] = ef.x),
                        (eW[eV + 5] = ef.y),
                        (eW[eV + 6] = ef.z),
                        (eW[eV + 7] = ef.w),
                        (eW[eV + 8] = ed.x),
                        (eW[eV + 9] = ed.y),
                        (eW[eV + 10] = ed.z),
                        (eW[eV + 11] = ed.w),
                        (eW[eV + 12] = em.x),
                        (eW[eV + 13] = em.y),
                        (eW[eV + 14] = em.z),
                        (eW[eV + 15] = em.w),
                        (eV += 16);
                    0 < eV &&
                      (I.bindBuffer(I.ARRAY_BUFFER, _.__webglSkinIndicesBuffer),
                      I.bufferData(I.ARRAY_BUFFER, eW, S),
                      I.bindBuffer(I.ARRAY_BUFFER, _.__webglSkinWeightsBuffer),
                      I.bufferData(I.ARRAY_BUFFER, e4, S));
                  }
                  if (e9 && L) {
                    for (F = 0, U = ti.length; F < U; F++)
                      (O = (z = tn[ti[F]]).vertexColors),
                        (k = z.color),
                        3 === O.length && L === THREE.VertexColors
                          ? ((eo = O[0]), (ea = O[1]), (es = O[2]))
                          : (es = ea = eo = k),
                        (eG[eU] = eo.r),
                        (eG[eU + 1] = eo.g),
                        (eG[eU + 2] = eo.b),
                        (eG[eU + 3] = ea.r),
                        (eG[eU + 4] = ea.g),
                        (eG[eU + 5] = ea.b),
                        (eG[eU + 6] = es.r),
                        (eG[eU + 7] = es.g),
                        (eG[eU + 8] = es.b),
                        (eU += 9);
                    for (F = 0, U = tr.length; F < U; F++)
                      (O = (z = tn[tr[F]]).vertexColors),
                        (k = z.color),
                        4 === O.length && L === THREE.VertexColors
                          ? ((eo = O[0]), (ea = O[1]), (es = O[2]), (eh = O[3]))
                          : (eh = es = ea = eo = k),
                        (eG[eU] = eo.r),
                        (eG[eU + 1] = eo.g),
                        (eG[eU + 2] = eo.b),
                        (eG[eU + 3] = ea.r),
                        (eG[eU + 4] = ea.g),
                        (eG[eU + 5] = ea.b),
                        (eG[eU + 6] = es.r),
                        (eG[eU + 7] = es.g),
                        (eG[eU + 8] = es.b),
                        (eG[eU + 9] = eh.r),
                        (eG[eU + 10] = eh.g),
                        (eG[eU + 11] = eh.b),
                        (eU += 12);
                    0 < eU &&
                      (I.bindBuffer(I.ARRAY_BUFFER, _.__webglColorBuffer),
                      I.bufferData(I.ARRAY_BUFFER, eG, S));
                  }
                  if (eJ && eq.hasTangents) {
                    for (F = 0, U = ti.length; F < U; F++)
                      (Q = (G = (z = tn[ti[F]]).vertexTangents)[0]),
                        (Z = G[1]),
                        (J = G[2]),
                        (ek[eD] = Q.x),
                        (ek[eD + 1] = Q.y),
                        (ek[eD + 2] = Q.z),
                        (ek[eD + 3] = Q.w),
                        (ek[eD + 4] = Z.x),
                        (ek[eD + 5] = Z.y),
                        (ek[eD + 6] = Z.z),
                        (ek[eD + 7] = Z.w),
                        (ek[eD + 8] = J.x),
                        (ek[eD + 9] = J.y),
                        (ek[eD + 10] = J.z),
                        (ek[eD + 11] = J.w),
                        (eD += 12);
                    for (F = 0, U = tr.length; F < U; F++)
                      (Q = (G = (z = tn[tr[F]]).vertexTangents)[0]),
                        (Z = G[1]),
                        (J = G[2]),
                        (ee = G[3]),
                        (ek[eD] = Q.x),
                        (ek[eD + 1] = Q.y),
                        (ek[eD + 2] = Q.z),
                        (ek[eD + 3] = Q.w),
                        (ek[eD + 4] = Z.x),
                        (ek[eD + 5] = Z.y),
                        (ek[eD + 6] = Z.z),
                        (ek[eD + 7] = Z.w),
                        (ek[eD + 8] = J.x),
                        (ek[eD + 9] = J.y),
                        (ek[eD + 10] = J.z),
                        (ek[eD + 11] = J.w),
                        (ek[eD + 12] = ee.x),
                        (ek[eD + 13] = ee.y),
                        (ek[eD + 14] = ee.z),
                        (ek[eD + 15] = ee.w),
                        (eD += 16);
                    I.bindBuffer(I.ARRAY_BUFFER, _.__webglTangentBuffer),
                      I.bufferData(I.ARRAY_BUFFER, ek, S);
                  }
                  if (eZ && A) {
                    for (F = 0, U = ti.length; F < U; F++)
                      if (
                        ((N = (z = tn[ti[F]]).vertexNormals),
                        (B = z.normal),
                        3 === N.length && D)
                      )
                        for (eg = 0; 3 > eg; eg++)
                          (ev = N[eg]),
                            (e3[eP] = ev.x),
                            (e3[eP + 1] = ev.y),
                            (e3[eP + 2] = ev.z),
                            (eP += 3);
                      else
                        for (eg = 0; 3 > eg; eg++)
                          (e3[eP] = B.x),
                            (e3[eP + 1] = B.y),
                            (e3[eP + 2] = B.z),
                            (eP += 3);
                    for (F = 0, U = tr.length; F < U; F++)
                      if (
                        ((N = (z = tn[tr[F]]).vertexNormals),
                        (B = z.normal),
                        4 === N.length && D)
                      )
                        for (eg = 0; 4 > eg; eg++)
                          (ev = N[eg]),
                            (e3[eP] = ev.x),
                            (e3[eP + 1] = ev.y),
                            (e3[eP + 2] = ev.z),
                            (eP += 3);
                      else
                        for (eg = 0; 4 > eg; eg++)
                          (e3[eP] = B.x),
                            (e3[eP + 1] = B.y),
                            (e3[eP + 2] = B.z),
                            (eP += 3);
                    I.bindBuffer(I.ARRAY_BUFFER, _.__webglNormalBuffer),
                      I.bufferData(I.ARRAY_BUFFER, e3, S);
                  }
                  if (eQ && to && P) {
                    for (F = 0, U = ti.length; F < U; F++)
                      if (void 0 !== (W = to[(V = ti[F])]))
                        for (eg = 0; 3 > eg; eg++)
                          (e$ = W[eg]),
                            (e2[eA] = e$.x),
                            (e2[eA + 1] = e$.y),
                            (eA += 2);
                    for (F = 0, U = tr.length; F < U; F++)
                      if (void 0 !== (W = to[(V = tr[F])]))
                        for (eg = 0; 4 > eg; eg++)
                          (e$ = W[eg]),
                            (e2[eA] = e$.x),
                            (e2[eA + 1] = e$.y),
                            (eA += 2);
                    0 < eA &&
                      (I.bindBuffer(I.ARRAY_BUFFER, _.__webglUVBuffer),
                      I.bufferData(I.ARRAY_BUFFER, e2, S));
                  }
                  if (eQ && ta && P) {
                    for (F = 0, U = ti.length; F < U; F++)
                      if (void 0 !== (j = ta[(V = ti[F])]))
                        for (eg = 0; 3 > eg; eg++)
                          (ey = j[eg]),
                            (eO[e1] = ey.x),
                            (eO[e1 + 1] = ey.y),
                            (e1 += 2);
                    for (F = 0, U = tr.length; F < U; F++)
                      if (void 0 !== (j = ta[(V = tr[F])]))
                        for (eg = 0; 4 > eg; eg++)
                          (ey = j[eg]),
                            (eO[e1] = ey.x),
                            (eO[e1 + 1] = ey.y),
                            (e1 += 2);
                    0 < e1 &&
                      (I.bindBuffer(I.ARRAY_BUFFER, _.__webglUV2Buffer),
                      I.bufferData(I.ARRAY_BUFFER, eO, S));
                  }
                  if (eK) {
                    for (F = 0, U = ti.length; F < U; F++)
                      (e7[eL] = eC),
                        (e7[eL + 1] = eC + 1),
                        (e7[eL + 2] = eC + 2),
                        (eL += 3),
                        (eY[eF] = eC),
                        (eY[eF + 1] = eC + 1),
                        (eY[eF + 2] = eC),
                        (eY[eF + 3] = eC + 2),
                        (eY[eF + 4] = eC + 1),
                        (eY[eF + 5] = eC + 2),
                        (eF += 6),
                        (eC += 3);
                    for (F = 0, U = tr.length; F < U; F++)
                      (e7[eL] = eC),
                        (e7[eL + 1] = eC + 1),
                        (e7[eL + 2] = eC + 3),
                        (e7[eL + 3] = eC + 1),
                        (e7[eL + 4] = eC + 2),
                        (e7[eL + 5] = eC + 3),
                        (eL += 6),
                        (eY[eF] = eC),
                        (eY[eF + 1] = eC + 1),
                        (eY[eF + 2] = eC),
                        (eY[eF + 3] = eC + 3),
                        (eY[eF + 4] = eC + 1),
                        (eY[eF + 5] = eC + 2),
                        (eY[eF + 6] = eC + 2),
                        (eY[eF + 7] = eC + 3),
                        (eF += 8),
                        (eC += 4);
                    I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, _.__webglFaceBuffer),
                      I.bufferData(I.ELEMENT_ARRAY_BUFFER, e7, S),
                      I.bindBuffer(I.ELEMENT_ARRAY_BUFFER, _.__webglLineBuffer),
                      I.bufferData(I.ELEMENT_ARRAY_BUFFER, eY, S);
                  }
                  if (eX) {
                    for (eg = 0, eT = eX.length; eg < eT; eg++)
                      if ((e6 = eX[eg]).__original.needsUpdate) {
                        if (((eN = 0), 1 === e6.size)) {
                          if (
                            void 0 === e6.boundTo ||
                            "vertices" === e6.boundTo
                          ) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (z = tn[ti[F]]),
                                (e6.array[eN] = e6.value[z.a]),
                                (e6.array[eN + 1] = e6.value[z.b]),
                                (e6.array[eN + 2] = e6.value[z.c]),
                                (eN += 3);
                            for (F = 0, U = tr.length; F < U; F++)
                              (z = tn[tr[F]]),
                                (e6.array[eN] = e6.value[z.a]),
                                (e6.array[eN + 1] = e6.value[z.b]),
                                (e6.array[eN + 2] = e6.value[z.c]),
                                (e6.array[eN + 3] = e6.value[z.d]),
                                (eN += 4);
                          } else if ("faces" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (eB = e6.value[ti[F]]),
                                (e6.array[eN] = eB),
                                (e6.array[eN + 1] = eB),
                                (e6.array[eN + 2] = eB),
                                (eN += 3);
                            for (F = 0, U = tr.length; F < U; F++)
                              (eB = e6.value[tr[F]]),
                                (e6.array[eN] = eB),
                                (e6.array[eN + 1] = eB),
                                (e6.array[eN + 2] = eB),
                                (e6.array[eN + 3] = eB),
                                (eN += 4);
                          }
                        } else if (2 === e6.size) {
                          if (
                            void 0 === e6.boundTo ||
                            "vertices" === e6.boundTo
                          ) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (z = tn[ti[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = Y.x),
                                (e6.array[eN + 3] = Y.y),
                                (e6.array[eN + 4] = q.x),
                                (e6.array[eN + 5] = q.y),
                                (eN += 6);
                            for (F = 0, U = tr.length; F < U; F++)
                              (z = tn[tr[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (K = e6.value[z.d]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = Y.x),
                                (e6.array[eN + 3] = Y.y),
                                (e6.array[eN + 4] = q.x),
                                (e6.array[eN + 5] = q.y),
                                (e6.array[eN + 6] = K.x),
                                (e6.array[eN + 7] = K.y),
                                (eN += 8);
                          } else if ("faces" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (q = Y = X = eB = e6.value[ti[F]]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = Y.x),
                                (e6.array[eN + 3] = Y.y),
                                (e6.array[eN + 4] = q.x),
                                (e6.array[eN + 5] = q.y),
                                (eN += 6);
                            for (F = 0, U = tr.length; F < U; F++)
                              (K = q = Y = X = eB = e6.value[tr[F]]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = Y.x),
                                (e6.array[eN + 3] = Y.y),
                                (e6.array[eN + 4] = q.x),
                                (e6.array[eN + 5] = q.y),
                                (e6.array[eN + 6] = K.x),
                                (e6.array[eN + 7] = K.y),
                                (eN += 8);
                          }
                        } else if (3 === e6.size) {
                          if (
                            ((C =
                              "c" === e6.type
                                ? ["r", "g", "b"]
                                : ["x", "y", "z"]),
                            void 0 === e6.boundTo || "vertices" === e6.boundTo)
                          ) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (z = tn[ti[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (eN += 9);
                            for (F = 0, U = tr.length; F < U; F++)
                              (z = tn[tr[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (K = e6.value[z.d]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (e6.array[eN + 9] = K[C[0]]),
                                (e6.array[eN + 10] = K[C[1]]),
                                (e6.array[eN + 11] = K[C[2]]),
                                (eN += 12);
                          } else if ("faces" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (q = Y = X = eB = e6.value[ti[F]]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (eN += 9);
                            for (F = 0, U = tr.length; F < U; F++)
                              (K = q = Y = X = eB = e6.value[tr[F]]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (e6.array[eN + 9] = K[C[0]]),
                                (e6.array[eN + 10] = K[C[1]]),
                                (e6.array[eN + 11] = K[C[2]]),
                                (eN += 12);
                          } else if ("faceVertices" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (X = (eB = e6.value[ti[F]])[0]),
                                (Y = eB[1]),
                                (q = eB[2]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (eN += 9);
                            for (F = 0, U = tr.length; F < U; F++)
                              (X = (eB = e6.value[tr[F]])[0]),
                                (Y = eB[1]),
                                (q = eB[2]),
                                (K = eB[3]),
                                (e6.array[eN] = X[C[0]]),
                                (e6.array[eN + 1] = X[C[1]]),
                                (e6.array[eN + 2] = X[C[2]]),
                                (e6.array[eN + 3] = Y[C[0]]),
                                (e6.array[eN + 4] = Y[C[1]]),
                                (e6.array[eN + 5] = Y[C[2]]),
                                (e6.array[eN + 6] = q[C[0]]),
                                (e6.array[eN + 7] = q[C[1]]),
                                (e6.array[eN + 8] = q[C[2]]),
                                (e6.array[eN + 9] = K[C[0]]),
                                (e6.array[eN + 10] = K[C[1]]),
                                (e6.array[eN + 11] = K[C[2]]),
                                (eN += 12);
                          }
                        } else if (4 === e6.size) {
                          if (
                            void 0 === e6.boundTo ||
                            "vertices" === e6.boundTo
                          ) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (z = tn[ti[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (eN += 12);
                            for (F = 0, U = tr.length; F < U; F++)
                              (z = tn[tr[F]]),
                                (X = e6.value[z.a]),
                                (Y = e6.value[z.b]),
                                (q = e6.value[z.c]),
                                (K = e6.value[z.d]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (e6.array[eN + 12] = K.x),
                                (e6.array[eN + 13] = K.y),
                                (e6.array[eN + 14] = K.z),
                                (e6.array[eN + 15] = K.w),
                                (eN += 16);
                          } else if ("faces" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (q = Y = X = eB = e6.value[ti[F]]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (eN += 12);
                            for (F = 0, U = tr.length; F < U; F++)
                              (K = q = Y = X = eB = e6.value[tr[F]]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (e6.array[eN + 12] = K.x),
                                (e6.array[eN + 13] = K.y),
                                (e6.array[eN + 14] = K.z),
                                (e6.array[eN + 15] = K.w),
                                (eN += 16);
                          } else if ("faceVertices" === e6.boundTo) {
                            for (F = 0, U = ti.length; F < U; F++)
                              (X = (eB = e6.value[ti[F]])[0]),
                                (Y = eB[1]),
                                (q = eB[2]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (eN += 12);
                            for (F = 0, U = tr.length; F < U; F++)
                              (X = (eB = e6.value[tr[F]])[0]),
                                (Y = eB[1]),
                                (q = eB[2]),
                                (K = eB[3]),
                                (e6.array[eN] = X.x),
                                (e6.array[eN + 1] = X.y),
                                (e6.array[eN + 2] = X.z),
                                (e6.array[eN + 3] = X.w),
                                (e6.array[eN + 4] = Y.x),
                                (e6.array[eN + 5] = Y.y),
                                (e6.array[eN + 6] = Y.z),
                                (e6.array[eN + 7] = Y.w),
                                (e6.array[eN + 8] = q.x),
                                (e6.array[eN + 9] = q.y),
                                (e6.array[eN + 10] = q.z),
                                (e6.array[eN + 11] = q.w),
                                (e6.array[eN + 12] = K.x),
                                (e6.array[eN + 13] = K.y),
                                (e6.array[eN + 14] = K.z),
                                (e6.array[eN + 15] = K.w),
                                (eN += 16);
                          }
                        }
                        I.bindBuffer(I.ARRAY_BUFFER, e6.buffer),
                          I.bufferData(I.ARRAY_BUFFER, e6.array, S);
                      }
                  }
                  b &&
                    (delete _.__inittedArrays,
                    delete _.__colorArray,
                    delete _.__normalArray,
                    delete _.__tangentArray,
                    delete _.__uvArray,
                    delete _.__uv2Array,
                    delete _.__faceArray,
                    delete _.__vertexArray,
                    delete _.__lineArray,
                    delete _.__skinIndexArray,
                    delete _.__skinWeightArray);
                }
              }
            (l.verticesNeedUpdate = !1),
              (l.morphTargetsNeedUpdate = !1),
              (l.elementsNeedUpdate = !1),
              (l.uvsNeedUpdate = !1),
              (l.normalsNeedUpdate = !1),
              (l.colorsNeedUpdate = !1),
              (l.tangentsNeedUpdate = !1),
              (l.buffersNeedUpdate = !1),
              E.attributes && g(E);
          } else if (h instanceof THREE.Ribbon) {
            if (
              ((u = (E = n(h, l)).attributes && m(E)),
              l.verticesNeedUpdate ||
                l.colorsNeedUpdate ||
                l.normalsNeedUpdate ||
                u)
            ) {
              var tp = l,
                tu = I.DYNAMIC_DRAW,
                tE = void 0,
                tf = void 0,
                td = void 0,
                tm = void 0,
                tg = void 0,
                tT = void 0,
                tv = void 0,
                t$ = void 0,
                ty = void 0,
                tR = void 0,
                tx = void 0,
                tH = void 0,
                t_ = void 0,
                tw = tp.vertices,
                t8 = tp.colors,
                tS = tp.normals,
                tb = tw.length,
                tM = t8.length,
                tC = tS.length,
                t0 = tp.__vertexArray,
                tA = tp.__colorArray,
                t1 = tp.__normalArray,
                tL = tp.colorsNeedUpdate,
                tP = tp.normalsNeedUpdate,
                tD = tp.__webglCustomAttributesList;
              if (tp.verticesNeedUpdate) {
                for (tE = 0; tE < tb; tE++)
                  (tm = tw[tE]),
                    (t0[(tg = 3 * tE)] = tm.x),
                    (t0[tg + 1] = tm.y),
                    (t0[tg + 2] = tm.z);
                I.bindBuffer(I.ARRAY_BUFFER, tp.__webglVertexBuffer),
                  I.bufferData(I.ARRAY_BUFFER, t0, tu);
              }
              if (tL) {
                for (tf = 0; tf < tM; tf++)
                  (tT = t8[tf]),
                    (tA[(tg = 3 * tf)] = tT.r),
                    (tA[tg + 1] = tT.g),
                    (tA[tg + 2] = tT.b);
                I.bindBuffer(I.ARRAY_BUFFER, tp.__webglColorBuffer),
                  I.bufferData(I.ARRAY_BUFFER, tA, tu);
              }
              if (tP) {
                for (td = 0; td < tC; td++)
                  (tv = tS[td]),
                    (t1[(tg = 3 * td)] = tv.x),
                    (t1[tg + 1] = tv.y),
                    (t1[tg + 2] = tv.z);
                I.bindBuffer(I.ARRAY_BUFFER, tp.__webglNormalBuffer),
                  I.bufferData(I.ARRAY_BUFFER, t1, tu);
              }
              if (tD) {
                for (t$ = 0, ty = tD.length; t$ < ty; t$++)
                  if (
                    (tH = tD[t$]).needsUpdate &&
                    (void 0 === tH.boundTo || "vertices" === tH.boundTo)
                  ) {
                    if (((tg = 0), (tx = tH.value.length), 1 === tH.size))
                      for (tR = 0; tR < tx; tR++) tH.array[tR] = tH.value[tR];
                    else if (2 === tH.size)
                      for (tR = 0; tR < tx; tR++)
                        (t_ = tH.value[tR]),
                          (tH.array[tg] = t_.x),
                          (tH.array[tg + 1] = t_.y),
                          (tg += 2);
                    else if (3 === tH.size) {
                      if ("c" === tH.type)
                        for (tR = 0; tR < tx; tR++)
                          (t_ = tH.value[tR]),
                            (tH.array[tg] = t_.r),
                            (tH.array[tg + 1] = t_.g),
                            (tH.array[tg + 2] = t_.b),
                            (tg += 3);
                      else
                        for (tR = 0; tR < tx; tR++)
                          (t_ = tH.value[tR]),
                            (tH.array[tg] = t_.x),
                            (tH.array[tg + 1] = t_.y),
                            (tH.array[tg + 2] = t_.z),
                            (tg += 3);
                    } else if (4 === tH.size)
                      for (tR = 0; tR < tx; tR++)
                        (t_ = tH.value[tR]),
                          (tH.array[tg] = t_.x),
                          (tH.array[tg + 1] = t_.y),
                          (tH.array[tg + 2] = t_.z),
                          (tH.array[tg + 3] = t_.w),
                          (tg += 4);
                    I.bindBuffer(I.ARRAY_BUFFER, tH.buffer),
                      I.bufferData(I.ARRAY_BUFFER, tH.array, tu);
                  }
              }
            }
            (l.verticesNeedUpdate = !1),
              (l.colorsNeedUpdate = !1),
              (l.normalsNeedUpdate = !1),
              E.attributes && g(E);
          } else if (h instanceof THREE.Line) {
            if (
              ((u = (E = n(h, l)).attributes && m(E)),
              l.verticesNeedUpdate ||
                l.colorsNeedUpdate ||
                l.lineDistancesNeedUpdate ||
                u)
            ) {
              var tF = l,
                tU = I.DYNAMIC_DRAW,
                tV = void 0,
                tz = void 0,
                tN = void 0,
                tB = void 0,
                tI = void 0,
                t2 = void 0,
                tO = tF.vertices,
                t3 = tF.colors,
                tk = tF.lineDistances,
                tG = tO.length,
                tW = t3.length,
                t4 = tk.length,
                tj = tF.__vertexArray,
                t5 = tF.__colorArray,
                tX = tF.__lineDistanceArray,
                t6 = tF.colorsNeedUpdate,
                t7 = tF.lineDistancesNeedUpdate,
                tY = tF.__webglCustomAttributesList,
                tq = void 0,
                tK = void 0,
                tQ = void 0,
                tZ = void 0,
                tJ = void 0,
                t9 = void 0;
              if (tF.verticesNeedUpdate) {
                for (tV = 0; tV < tG; tV++)
                  (tB = tO[tV]),
                    (tj[(tI = 3 * tV)] = tB.x),
                    (tj[tI + 1] = tB.y),
                    (tj[tI + 2] = tB.z);
                I.bindBuffer(I.ARRAY_BUFFER, tF.__webglVertexBuffer),
                  I.bufferData(I.ARRAY_BUFFER, tj, tU);
              }
              if (t6) {
                for (tz = 0; tz < tW; tz++)
                  (t2 = t3[tz]),
                    (t5[(tI = 3 * tz)] = t2.r),
                    (t5[tI + 1] = t2.g),
                    (t5[tI + 2] = t2.b);
                I.bindBuffer(I.ARRAY_BUFFER, tF.__webglColorBuffer),
                  I.bufferData(I.ARRAY_BUFFER, t5, tU);
              }
              if (t7) {
                for (tN = 0; tN < t4; tN++) tX[tN] = tk[tN];
                I.bindBuffer(I.ARRAY_BUFFER, tF.__webglLineDistanceBuffer),
                  I.bufferData(I.ARRAY_BUFFER, tX, tU);
              }
              if (tY) {
                for (tq = 0, tK = tY.length; tq < tK; tq++)
                  if (
                    (t9 = tY[tq]).needsUpdate &&
                    (void 0 === t9.boundTo || "vertices" === t9.boundTo)
                  ) {
                    if (((tI = 0), (tZ = t9.value.length), 1 === t9.size))
                      for (tQ = 0; tQ < tZ; tQ++) t9.array[tQ] = t9.value[tQ];
                    else if (2 === t9.size)
                      for (tQ = 0; tQ < tZ; tQ++)
                        (tJ = t9.value[tQ]),
                          (t9.array[tI] = tJ.x),
                          (t9.array[tI + 1] = tJ.y),
                          (tI += 2);
                    else if (3 === t9.size) {
                      if ("c" === t9.type)
                        for (tQ = 0; tQ < tZ; tQ++)
                          (tJ = t9.value[tQ]),
                            (t9.array[tI] = tJ.r),
                            (t9.array[tI + 1] = tJ.g),
                            (t9.array[tI + 2] = tJ.b),
                            (tI += 3);
                      else
                        for (tQ = 0; tQ < tZ; tQ++)
                          (tJ = t9.value[tQ]),
                            (t9.array[tI] = tJ.x),
                            (t9.array[tI + 1] = tJ.y),
                            (t9.array[tI + 2] = tJ.z),
                            (tI += 3);
                    } else if (4 === t9.size)
                      for (tQ = 0; tQ < tZ; tQ++)
                        (tJ = t9.value[tQ]),
                          (t9.array[tI] = tJ.x),
                          (t9.array[tI + 1] = tJ.y),
                          (t9.array[tI + 2] = tJ.z),
                          (t9.array[tI + 3] = tJ.w),
                          (tI += 4);
                    I.bindBuffer(I.ARRAY_BUFFER, t9.buffer),
                      I.bufferData(I.ARRAY_BUFFER, t9.array, tU);
                  }
              }
            }
            (l.verticesNeedUpdate = !1),
              (l.colorsNeedUpdate = !1),
              (l.lineDistancesNeedUpdate = !1),
              E.attributes && g(E);
          } else if (h instanceof THREE.ParticleSystem) {
            if (
              ((u = (E = n(h, l)).attributes && m(E)),
              l.verticesNeedUpdate ||
                l.colorsNeedUpdate ||
                h.sortParticles ||
                u)
            ) {
              var ie = l,
                it = I.DYNAMIC_DRAW,
                ii = h,
                ir = void 0,
                io = void 0,
                ia = void 0,
                is = void 0,
                ih = void 0,
                il = void 0,
                ic = ie.vertices,
                ip = ic.length,
                iu = ie.colors,
                iE = iu.length,
                id = ie.__vertexArray,
                im = ie.__colorArray,
                ig = ie.__sortArray,
                iT = ie.verticesNeedUpdate,
                iv = ie.colorsNeedUpdate,
                i$ = ie.__webglCustomAttributesList,
                iy = void 0,
                iR = void 0,
                ix = void 0,
                iH = void 0,
                i_ = void 0,
                iw = void 0;
              if (ii.sortParticles) {
                for (
                  ex.copy(eR), ex.multiply(ii.matrixWorld), ir = 0;
                  ir < ip;
                  ir++
                )
                  (ia = ic[ir]),
                    eH.copy(ia),
                    eH.applyProjection(ex),
                    (ig[ir] = [eH.z, ir]);
                for (ig.sort(c), ir = 0; ir < ip; ir++)
                  (ia = ic[ig[ir][1]]),
                    (id[(is = 3 * ir)] = ia.x),
                    (id[is + 1] = ia.y),
                    (id[is + 2] = ia.z);
                for (io = 0; io < iE; io++)
                  (is = 3 * io),
                    (il = iu[ig[io][1]]),
                    (im[is] = il.r),
                    (im[is + 1] = il.g),
                    (im[is + 2] = il.b);
                if (i$) {
                  for (iy = 0, iR = i$.length; iy < iR; iy++)
                    if (
                      void 0 === (iw = i$[iy]).boundTo ||
                      "vertices" === iw.boundTo
                    ) {
                      if (((is = 0), (iH = iw.value.length), 1 === iw.size))
                        for (ix = 0; ix < iH; ix++)
                          (ih = ig[ix][1]), (iw.array[ix] = iw.value[ih]);
                      else if (2 === iw.size)
                        for (ix = 0; ix < iH; ix++)
                          (ih = ig[ix][1]),
                            (i_ = iw.value[ih]),
                            (iw.array[is] = i_.x),
                            (iw.array[is + 1] = i_.y),
                            (is += 2);
                      else if (3 === iw.size) {
                        if ("c" === iw.type)
                          for (ix = 0; ix < iH; ix++)
                            (ih = ig[ix][1]),
                              (i_ = iw.value[ih]),
                              (iw.array[is] = i_.r),
                              (iw.array[is + 1] = i_.g),
                              (iw.array[is + 2] = i_.b),
                              (is += 3);
                        else
                          for (ix = 0; ix < iH; ix++)
                            (ih = ig[ix][1]),
                              (i_ = iw.value[ih]),
                              (iw.array[is] = i_.x),
                              (iw.array[is + 1] = i_.y),
                              (iw.array[is + 2] = i_.z),
                              (is += 3);
                      } else if (4 === iw.size)
                        for (ix = 0; ix < iH; ix++)
                          (ih = ig[ix][1]),
                            (i_ = iw.value[ih]),
                            (iw.array[is] = i_.x),
                            (iw.array[is + 1] = i_.y),
                            (iw.array[is + 2] = i_.z),
                            (iw.array[is + 3] = i_.w),
                            (is += 4);
                    }
                }
              } else {
                if (iT)
                  for (ir = 0; ir < ip; ir++)
                    (ia = ic[ir]),
                      (id[(is = 3 * ir)] = ia.x),
                      (id[is + 1] = ia.y),
                      (id[is + 2] = ia.z);
                if (iv)
                  for (io = 0; io < iE; io++)
                    (il = iu[io]),
                      (im[(is = 3 * io)] = il.r),
                      (im[is + 1] = il.g),
                      (im[is + 2] = il.b);
                if (i$) {
                  for (iy = 0, iR = i$.length; iy < iR; iy++)
                    if (
                      (iw = i$[iy]).needsUpdate &&
                      (void 0 === iw.boundTo || "vertices" === iw.boundTo)
                    ) {
                      if (((iH = iw.value.length), (is = 0), 1 === iw.size))
                        for (ix = 0; ix < iH; ix++) iw.array[ix] = iw.value[ix];
                      else if (2 === iw.size)
                        for (ix = 0; ix < iH; ix++)
                          (i_ = iw.value[ix]),
                            (iw.array[is] = i_.x),
                            (iw.array[is + 1] = i_.y),
                            (is += 2);
                      else if (3 === iw.size) {
                        if ("c" === iw.type)
                          for (ix = 0; ix < iH; ix++)
                            (i_ = iw.value[ix]),
                              (iw.array[is] = i_.r),
                              (iw.array[is + 1] = i_.g),
                              (iw.array[is + 2] = i_.b),
                              (is += 3);
                        else
                          for (ix = 0; ix < iH; ix++)
                            (i_ = iw.value[ix]),
                              (iw.array[is] = i_.x),
                              (iw.array[is + 1] = i_.y),
                              (iw.array[is + 2] = i_.z),
                              (is += 3);
                      } else if (4 === iw.size)
                        for (ix = 0; ix < iH; ix++)
                          (i_ = iw.value[ix]),
                            (iw.array[is] = i_.x),
                            (iw.array[is + 1] = i_.y),
                            (iw.array[is + 2] = i_.z),
                            (iw.array[is + 3] = i_.w),
                            (is += 4);
                    }
                }
              }
              if (
                ((iT || ii.sortParticles) &&
                  (I.bindBuffer(I.ARRAY_BUFFER, ie.__webglVertexBuffer),
                  I.bufferData(I.ARRAY_BUFFER, id, it)),
                (iv || ii.sortParticles) &&
                  (I.bindBuffer(I.ARRAY_BUFFER, ie.__webglColorBuffer),
                  I.bufferData(I.ARRAY_BUFFER, im, it)),
                i$)
              )
                for (iy = 0, iR = i$.length; iy < iR; iy++)
                  ((iw = i$[iy]).needsUpdate || ii.sortParticles) &&
                    (I.bindBuffer(I.ARRAY_BUFFER, iw.buffer),
                    I.bufferData(I.ARRAY_BUFFER, iw.array, it));
            }
            (l.verticesNeedUpdate = !1),
              (l.colorsNeedUpdate = !1),
              E.attributes && g(E);
          }
        }
      }),
      (this.initMaterial = function (e, t, i, r) {
        if (
          (e.addEventListener("dispose", eI),
          e instanceof THREE.MeshDepthMaterial
            ? (E = "depth")
            : e instanceof THREE.MeshNormalMaterial
            ? (E = "normal")
            : e instanceof THREE.MeshBasicMaterial
            ? (E = "basic")
            : e instanceof THREE.MeshLambertMaterial
            ? (E = "lambert")
            : e instanceof THREE.MeshPhongMaterial
            ? (E = "phong")
            : e instanceof THREE.LineBasicMaterial
            ? (E = "basic")
            : e instanceof THREE.LineDashedMaterial
            ? (E = "dashed")
            : e instanceof THREE.ParticleBasicMaterial &&
              (E = "particle_basic"),
          E)
        ) {
          var n = THREE.ShaderLib[E];
          (e.uniforms = THREE.UniformsUtils.clone(n.uniforms)),
            (e.vertexShader = n.vertexShader),
            (e.fragmentShader = n.fragmentShader);
        }
        for (o = s = d = m = n = 0, a = t.length; o < a; o++)
          (f = t[o]).onlyShadow ||
            (f instanceof THREE.DirectionalLight && s++,
            f instanceof THREE.PointLight && d++,
            f instanceof THREE.SpotLight && m++,
            f instanceof THREE.HemisphereLight && n++);
        for (o = s, a = d, s = m, h = n, n = f = 0, m = t.length; n < m; n++)
          (d = t[n]).castShadow &&
            (d instanceof THREE.SpotLight && f++,
            d instanceof THREE.DirectionalLight && !d.shadowCascade && f++);
        (u = f),
          e1 && r && r.useVertexTexture
            ? (p = 1024)
            : ((t = Math.floor(
                ((t = I.getParameter(I.MAX_VERTEX_UNIFORM_VECTORS)) - 20) / 4
              )),
              void 0 !== r &&
                r instanceof THREE.SkinnedMesh &&
                (t = Math.min(r.bones.length, t)) < r.bones.length &&
                console.warn(
                  "WebGLRenderer: too many bones - " +
                    r.bones.length +
                    ", this GPU supports just " +
                    t +
                    " (try OpenGL instead of ANGLE)"
                ),
              (p = t));
        a: {
          (m = e.fragmentShader),
            (d = e.vertexShader),
            (n = e.uniforms),
            (t = e.attributes),
            (f = e.defines);
          var o,
            a,
            s,
            h,
            l,
            c,
            p,
            u,
            E,
            f,
            d,
            m,
            g,
            T,
            v,
            $,
            i = {
              map: !!e.map,
              envMap: !!e.envMap,
              lightMap: !!e.lightMap,
              bumpMap: !!e.bumpMap,
              normalMap: !!e.normalMap,
              specularMap: !!e.specularMap,
              vertexColors: e.vertexColors,
              fog: i,
              useFog: e.fog,
              fogExp: i instanceof THREE.FogExp2,
              sizeAttenuation: e.sizeAttenuation,
              skinning: e.skinning,
              maxBones: p,
              useVertexTexture: e1 && r && r.useVertexTexture,
              boneTextureWidth: r && r.boneTextureWidth,
              boneTextureHeight: r && r.boneTextureHeight,
              morphTargets: e.morphTargets,
              morphNormals: e.morphNormals,
              maxMorphTargets: this.maxMorphTargets,
              maxMorphNormals: this.maxMorphNormals,
              maxDirLights: o,
              maxPointLights: a,
              maxSpotLights: s,
              maxHemiLights: h,
              maxShadows: u,
              shadowMapEnabled: this.shadowMapEnabled && r.receiveShadow,
              shadowMapType: this.shadowMapType,
              shadowMapDebug: this.shadowMapDebug,
              shadowMapCascade: this.shadowMapCascade,
              alphaTest: e.alphaTest,
              metal: e.metal,
              perPixel: e.perPixel,
              wrapAround: e.wrapAround,
              doubleSided: e.side === THREE.DoubleSide,
              flipSided: e.side === THREE.BackSide,
            },
            r = [];
          for (v in (E ? r.push(E) : (r.push(m), r.push(d)), f))
            r.push(v), r.push(f[v]);
          for (T in i) r.push(T), r.push(i[T]);
          for (E = r.join(), T = 0, v = X.length; T < v; T++)
            if ((r = X[T]).code === E) {
              r.usedTimes++, (c = r.program);
              break a;
            }
          for ($ in ((T = "SHADOWMAP_TYPE_BASIC"),
          i.shadowMapType === THREE.PCFShadowMap
            ? (T = "SHADOWMAP_TYPE_PCF")
            : i.shadowMapType === THREE.PCFSoftShadowMap &&
              (T = "SHADOWMAP_TYPE_PCF_SOFT"),
          (v = []),
          f))
            !1 !== (r = f[$]) && ((r = "#define " + $ + " " + r), v.push(r));
          for (g in ((r = v.join("\n")),
          ($ = I.createProgram()),
          (v = [
            "precision " + P + " float;",
            r,
            eA ? "#define VERTEX_TEXTURES" : "",
            j.gammaInput ? "#define GAMMA_INPUT" : "",
            j.gammaOutput ? "#define GAMMA_OUTPUT" : "",
            j.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
            "#define MAX_DIR_LIGHTS " + i.maxDirLights,
            "#define MAX_POINT_LIGHTS " + i.maxPointLights,
            "#define MAX_SPOT_LIGHTS " + i.maxSpotLights,
            "#define MAX_HEMI_LIGHTS " + i.maxHemiLights,
            "#define MAX_SHADOWS " + i.maxShadows,
            "#define MAX_BONES " + i.maxBones,
            i.map ? "#define USE_MAP" : "",
            i.envMap ? "#define USE_ENVMAP" : "",
            i.lightMap ? "#define USE_LIGHTMAP" : "",
            i.bumpMap ? "#define USE_BUMPMAP" : "",
            i.normalMap ? "#define USE_NORMALMAP" : "",
            i.specularMap ? "#define USE_SPECULARMAP" : "",
            i.vertexColors ? "#define USE_COLOR" : "",
            i.skinning ? "#define USE_SKINNING" : "",
            i.useVertexTexture ? "#define BONE_TEXTURE" : "",
            i.boneTextureWidth
              ? "#define N_BONE_PIXEL_X " + i.boneTextureWidth.toFixed(1)
              : "",
            i.boneTextureHeight
              ? "#define N_BONE_PIXEL_Y " + i.boneTextureHeight.toFixed(1)
              : "",
            i.morphTargets ? "#define USE_MORPHTARGETS" : "",
            i.morphNormals ? "#define USE_MORPHNORMALS" : "",
            i.perPixel ? "#define PHONG_PER_PIXEL" : "",
            i.wrapAround ? "#define WRAP_AROUND" : "",
            i.doubleSided ? "#define DOUBLE_SIDED" : "",
            i.flipSided ? "#define FLIP_SIDED" : "",
            i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
            i.shadowMapEnabled ? "#define " + T : "",
            i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
            i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
            i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
            "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n",
          ].join("\n")),
          (T = [
            "precision " + P + " float;",
            i.bumpMap || i.normalMap
              ? "#extension GL_OES_standard_derivatives : enable"
              : "",
            r,
            "#define MAX_DIR_LIGHTS " + i.maxDirLights,
            "#define MAX_POINT_LIGHTS " + i.maxPointLights,
            "#define MAX_SPOT_LIGHTS " + i.maxSpotLights,
            "#define MAX_HEMI_LIGHTS " + i.maxHemiLights,
            "#define MAX_SHADOWS " + i.maxShadows,
            i.alphaTest ? "#define ALPHATEST " + i.alphaTest : "",
            j.gammaInput ? "#define GAMMA_INPUT" : "",
            j.gammaOutput ? "#define GAMMA_OUTPUT" : "",
            j.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
            i.useFog && i.fog ? "#define USE_FOG" : "",
            i.useFog && i.fogExp ? "#define FOG_EXP2" : "",
            i.map ? "#define USE_MAP" : "",
            i.envMap ? "#define USE_ENVMAP" : "",
            i.lightMap ? "#define USE_LIGHTMAP" : "",
            i.bumpMap ? "#define USE_BUMPMAP" : "",
            i.normalMap ? "#define USE_NORMALMAP" : "",
            i.specularMap ? "#define USE_SPECULARMAP" : "",
            i.vertexColors ? "#define USE_COLOR" : "",
            i.metal ? "#define METAL" : "",
            i.perPixel ? "#define PHONG_PER_PIXEL" : "",
            i.wrapAround ? "#define WRAP_AROUND" : "",
            i.doubleSided ? "#define DOUBLE_SIDED" : "",
            i.flipSided ? "#define FLIP_SIDED" : "",
            i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
            i.shadowMapEnabled ? "#define " + T : "",
            i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
            i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
            "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n",
          ].join("\n")),
          (v = S("vertex", v + d)),
          (T = S("fragment", T + m)),
          I.attachShader($, v),
          I.attachShader($, T),
          I.linkProgram($),
          I.getProgramParameter($, I.LINK_STATUS) ||
            console.error(
              "Could not initialise shader\nVALIDATE_STATUS: " +
                I.getProgramParameter($, I.VALIDATE_STATUS) +
                ", gl error [" +
                I.getError() +
                "]"
            ),
          I.deleteShader(T),
          I.deleteShader(v),
          ($.uniforms = {}),
          ($.attributes = {}),
          (T =
            "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(
              " "
            )),
          i.useVertexTexture
            ? T.push("boneTexture")
            : T.push("boneGlobalMatrices"),
          n))
            T.push(g);
          for (g = T, T = 0, v = g.length; T < v; T++)
            (n = g[T]), ($.uniforms[n] = I.getUniformLocation($, n));
          for (
            g = 0,
              T =
                "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(
                  " "
                );
            g < i.maxMorphTargets;
            g++
          )
            T.push("morphTarget" + g);
          for (g = 0; g < i.maxMorphNormals; g++) T.push("morphNormal" + g);
          for (c in t) T.push(c);
          for (g = 0, t = (c = T).length; g < t; g++)
            (T = c[g]), ($.attributes[T] = I.getAttribLocation($, T));
          ($.id = Y++),
            X.push({ program: $, code: E, usedTimes: 1 }),
            (j.info.memory.programs = X.length),
            (c = $);
        }
        if (((e.program = c), (g = e.program.attributes), e.morphTargets))
          for (
            c = 0, e.numSupportedMorphTargets = 0, t = "morphTarget";
            c < this.maxMorphTargets;
            c++
          )
            0 <= g[($ = t + c)] && e.numSupportedMorphTargets++;
        if (e.morphNormals)
          for (
            c = 0, e.numSupportedMorphNormals = 0, t = "morphNormal";
            c < this.maxMorphNormals;
            c++
          )
            0 <= g[($ = t + c)] && e.numSupportedMorphNormals++;
        for (l in ((e.uniformsList = []), e.uniforms))
          e.uniformsList.push([e.uniforms[l], l]);
      }),
      (this.setFaceCulling = function (e, t) {
        e === THREE.CullFaceNone
          ? I.disable(I.CULL_FACE)
          : (t === THREE.FrontFaceDirectionCW
              ? I.frontFace(I.CW)
              : I.frontFace(I.CCW),
            e === THREE.CullFaceBack
              ? I.cullFace(I.BACK)
              : e === THREE.CullFaceFront
              ? I.cullFace(I.FRONT)
              : I.cullFace(I.FRONT_AND_BACK),
            I.enable(I.CULL_FACE));
      }),
      (this.setMaterialFaces = function (e) {
        var t = e.side === THREE.DoubleSide,
          e = e.side === THREE.BackSide;
        ei !== t &&
          (t ? I.disable(I.CULL_FACE) : I.enable(I.CULL_FACE), (ei = t)),
          er !== e && (e ? I.frontFace(I.CW) : I.frontFace(I.CCW), (er = e));
      }),
      (this.setDepthTest = function (e) {
        eh !== e &&
          (e ? I.enable(I.DEPTH_TEST) : I.disable(I.DEPTH_TEST), (eh = e));
      }),
      (this.setDepthWrite = function (e) {
        el !== e && (I.depthMask(e), (el = e));
      }),
      (this.setBlending = function (e, t, i, r) {
        e !== en &&
          (e === THREE.NoBlending
            ? I.disable(I.BLEND)
            : e === THREE.AdditiveBlending
            ? (I.enable(I.BLEND),
              I.blendEquation(I.FUNC_ADD),
              I.blendFunc(I.SRC_ALPHA, I.ONE))
            : e === THREE.SubtractiveBlending
            ? (I.enable(I.BLEND),
              I.blendEquation(I.FUNC_ADD),
              I.blendFunc(I.ZERO, I.ONE_MINUS_SRC_COLOR))
            : e === THREE.MultiplyBlending
            ? (I.enable(I.BLEND),
              I.blendEquation(I.FUNC_ADD),
              I.blendFunc(I.ZERO, I.SRC_COLOR))
            : e === THREE.CustomBlending
            ? I.enable(I.BLEND)
            : (I.enable(I.BLEND),
              I.blendEquationSeparate(I.FUNC_ADD, I.FUNC_ADD),
              I.blendFuncSeparate(
                I.SRC_ALPHA,
                I.ONE_MINUS_SRC_ALPHA,
                I.ONE,
                I.ONE_MINUS_SRC_ALPHA
              )),
          (en = e)),
          e === THREE.CustomBlending
            ? (t !== eo && (I.blendEquation(A(t)), (eo = t)),
              (i !== ea || r !== es) &&
                (I.blendFunc(A(i), A(r)), (ea = i), (es = r)))
            : (es = ea = eo = null);
      }),
      (this.setTexture = function (e, t) {
        if (e.needsUpdate) {
          e.__webglInit ||
            ((e.__webglInit = !0),
            e.addEventListener("dispose", eN),
            (e.__webglTexture = I.createTexture()),
            j.info.memory.textures++),
            I.activeTexture(I.TEXTURE0 + t),
            I.bindTexture(I.TEXTURE_2D, e.__webglTexture),
            I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, e.flipY),
            I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha),
            I.pixelStorei(I.UNPACK_ALIGNMENT, e.unpackAlignment);
          var i = e.image,
            r =
              0 == (i.width & (i.width - 1)) &&
              0 == (i.height & (i.height - 1)),
            n = A(e.format),
            o = A(e.type);
          b(I.TEXTURE_2D, e, r);
          var a = e.mipmaps;
          if (e instanceof THREE.DataTexture) {
            if (0 < a.length && r) {
              for (var s = 0, h = a.length; s < h; s++)
                (i = a[s]),
                  I.texImage2D(
                    I.TEXTURE_2D,
                    s,
                    n,
                    i.width,
                    i.height,
                    0,
                    n,
                    o,
                    i.data
                  );
              e.generateMipmaps = !1;
            } else
              I.texImage2D(
                I.TEXTURE_2D,
                0,
                n,
                i.width,
                i.height,
                0,
                n,
                o,
                i.data
              );
          } else if (e instanceof THREE.CompressedTexture)
            for (s = 0, h = a.length; s < h; s++)
              (i = a[s]),
                I.compressedTexImage2D(
                  I.TEXTURE_2D,
                  s,
                  n,
                  i.width,
                  i.height,
                  0,
                  i.data
                );
          else if (0 < a.length && r) {
            for (s = 0, h = a.length; s < h; s++)
              (i = a[s]), I.texImage2D(I.TEXTURE_2D, s, n, n, o, i);
            e.generateMipmaps = !1;
          } else I.texImage2D(I.TEXTURE_2D, 0, n, n, o, e.image);
          e.generateMipmaps && r && I.generateMipmap(I.TEXTURE_2D),
            (e.needsUpdate = !1),
            e.onUpdate && e.onUpdate();
        } else
          I.activeTexture(I.TEXTURE0 + t),
            I.bindTexture(I.TEXTURE_2D, e.__webglTexture);
      }),
      (this.setRenderTarget = function (e) {
        var t = e instanceof THREE.WebGLRenderTargetCube;
        if (e && !e.__webglFramebuffer) {
          void 0 === e.depthBuffer && (e.depthBuffer = !0),
            void 0 === e.stencilBuffer && (e.stencilBuffer = !0),
            e.addEventListener("dispose", eB),
            (e.__webglTexture = I.createTexture()),
            j.info.memory.textures++;
          var i =
              0 == (e.width & (e.width - 1)) &&
              0 == (e.height & (e.height - 1)),
            r = A(e.format),
            n = A(e.type);
          if (t) {
            (e.__webglFramebuffer = []),
              (e.__webglRenderbuffer = []),
              I.bindTexture(I.TEXTURE_CUBE_MAP, e.__webglTexture),
              b(I.TEXTURE_CUBE_MAP, e, i);
            for (var o = 0; 6 > o; o++) {
              (e.__webglFramebuffer[o] = I.createFramebuffer()),
                (e.__webglRenderbuffer[o] = I.createRenderbuffer()),
                I.texImage2D(
                  I.TEXTURE_CUBE_MAP_POSITIVE_X + o,
                  0,
                  r,
                  e.width,
                  e.height,
                  0,
                  r,
                  n,
                  null
                );
              var a = e,
                s = I.TEXTURE_CUBE_MAP_POSITIVE_X + o;
              I.bindFramebuffer(I.FRAMEBUFFER, e.__webglFramebuffer[o]),
                I.framebufferTexture2D(
                  I.FRAMEBUFFER,
                  I.COLOR_ATTACHMENT0,
                  s,
                  a.__webglTexture,
                  0
                ),
                M(e.__webglRenderbuffer[o], e);
            }
            i && I.generateMipmap(I.TEXTURE_CUBE_MAP);
          } else
            (e.__webglFramebuffer = I.createFramebuffer()),
              (e.__webglRenderbuffer = e.shareDepthFrom
                ? e.shareDepthFrom.__webglRenderbuffer
                : I.createRenderbuffer()),
              I.bindTexture(I.TEXTURE_2D, e.__webglTexture),
              b(I.TEXTURE_2D, e, i),
              I.texImage2D(
                I.TEXTURE_2D,
                0,
                r,
                e.width,
                e.height,
                0,
                r,
                n,
                null
              ),
              (r = I.TEXTURE_2D),
              I.bindFramebuffer(I.FRAMEBUFFER, e.__webglFramebuffer),
              I.framebufferTexture2D(
                I.FRAMEBUFFER,
                I.COLOR_ATTACHMENT0,
                r,
                e.__webglTexture,
                0
              ),
              e.shareDepthFrom
                ? e.depthBuffer && !e.stencilBuffer
                  ? I.framebufferRenderbuffer(
                      I.FRAMEBUFFER,
                      I.DEPTH_ATTACHMENT,
                      I.RENDERBUFFER,
                      e.__webglRenderbuffer
                    )
                  : e.depthBuffer &&
                    e.stencilBuffer &&
                    I.framebufferRenderbuffer(
                      I.FRAMEBUFFER,
                      I.DEPTH_STENCIL_ATTACHMENT,
                      I.RENDERBUFFER,
                      e.__webglRenderbuffer
                    )
                : M(e.__webglRenderbuffer, e),
              i && I.generateMipmap(I.TEXTURE_2D);
          t
            ? I.bindTexture(I.TEXTURE_CUBE_MAP, null)
            : I.bindTexture(I.TEXTURE_2D, null),
            I.bindRenderbuffer(I.RENDERBUFFER, null),
            I.bindFramebuffer(I.FRAMEBUFFER, null);
        }
        e
          ? ((t = t
              ? e.__webglFramebuffer[e.activeCubeFace]
              : e.__webglFramebuffer),
            (i = e.width),
            (e = e.height),
            (n = r = 0))
          : ((t = null), (i = em), (e = eg), (r = ef), (n = ed)),
          t !== K &&
            (I.bindFramebuffer(I.FRAMEBUFFER, t),
            I.viewport(r, n, i, e),
            (K = t)),
          (eT = i),
          (ev = e);
      }),
      (this.shadowMapPlugin = new THREE.ShadowMapPlugin()),
      this.addPrePlugin(this.shadowMapPlugin),
      this.addPostPlugin(new THREE.SpritePlugin()),
      this.addPostPlugin(new THREE.LensFlarePlugin());
  }),
  (THREE.WebGLRenderTarget = function (e, t, i) {
    (this.width = e),
      (this.height = t),
      (i = i || {}),
      (this.wrapS = void 0 !== i.wrapS ? i.wrapS : THREE.ClampToEdgeWrapping),
      (this.wrapT = void 0 !== i.wrapT ? i.wrapT : THREE.ClampToEdgeWrapping),
      (this.magFilter =
        void 0 !== i.magFilter ? i.magFilter : THREE.LinearFilter),
      (this.minFilter =
        void 0 !== i.minFilter ? i.minFilter : THREE.LinearMipMapLinearFilter),
      (this.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1),
      (this.offset = new THREE.Vector2(0, 0)),
      (this.repeat = new THREE.Vector2(1, 1)),
      (this.format = void 0 !== i.format ? i.format : THREE.RGBAFormat),
      (this.type = void 0 !== i.type ? i.type : THREE.UnsignedByteType),
      (this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer),
      (this.stencilBuffer = void 0 === i.stencilBuffer || i.stencilBuffer),
      (this.generateMipmaps = !0),
      (this.shareDepthFrom = null);
  }),
  (THREE.WebGLRenderTarget.prototype = {
    constructor: THREE.WebGLRenderTarget,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    clone: function () {
      var e = new THREE.WebGLRenderTarget(this.width, this.height);
      return (
        (e.wrapS = this.wrapS),
        (e.wrapT = this.wrapT),
        (e.magFilter = this.magFilter),
        (e.minFilter = this.minFilter),
        (e.anisotropy = this.anisotropy),
        e.offset.copy(this.offset),
        e.repeat.copy(this.repeat),
        (e.format = this.format),
        (e.type = this.type),
        (e.depthBuffer = this.depthBuffer),
        (e.stencilBuffer = this.stencilBuffer),
        (e.generateMipmaps = this.generateMipmaps),
        (e.shareDepthFrom = this.shareDepthFrom),
        e
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  }),
  (THREE.WebGLRenderTargetCube = function (e, t, i) {
    THREE.WebGLRenderTarget.call(this, e, t, i), (this.activeCubeFace = 0);
  }),
  (THREE.WebGLRenderTargetCube.prototype = Object.create(
    THREE.WebGLRenderTarget.prototype
  )),
  (THREE.RenderableVertex = function () {
    (this.positionWorld = new THREE.Vector3()),
      (this.positionScreen = new THREE.Vector4()),
      (this.visible = !0);
  }),
  (THREE.RenderableVertex.prototype.copy = function (e) {
    this.positionWorld.copy(e.positionWorld),
      this.positionScreen.copy(e.positionScreen);
  }),
  (THREE.RenderableFace3 = function () {
    (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.v3 = new THREE.RenderableVertex()),
      (this.centroidModel = new THREE.Vector3()),
      (this.normalModel = new THREE.Vector3()),
      (this.normalModelView = new THREE.Vector3()),
      (this.vertexNormalsLength = 0),
      (this.vertexNormalsModel = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.vertexNormalsModelView = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.material = this.color = null),
      (this.uvs = [[]]),
      (this.z = null);
  }),
  (THREE.RenderableFace4 = function () {
    (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.v3 = new THREE.RenderableVertex()),
      (this.v4 = new THREE.RenderableVertex()),
      (this.centroidModel = new THREE.Vector3()),
      (this.normalModel = new THREE.Vector3()),
      (this.normalModelView = new THREE.Vector3()),
      (this.vertexNormalsLength = 0),
      (this.vertexNormalsModel = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.vertexNormalsModelView = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.material = this.color = null),
      (this.uvs = [[]]),
      (this.z = null);
  }),
  (THREE.RenderableObject = function () {
    this.z = this.object = null;
  }),
  (THREE.RenderableParticle = function () {
    (this.rotation = this.z = this.y = this.x = this.object = null),
      (this.scale = new THREE.Vector2()),
      (this.material = null);
  }),
  (THREE.RenderableLine = function () {
    (this.z = null),
      (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.vertexColors = [new THREE.Color(), new THREE.Color()]),
      (this.material = null);
  }),
  (THREE.GeometryUtils = {
    merge: function (e, t, i) {
      var r,
        n,
        o = e.vertices.length,
        a = t instanceof THREE.Mesh ? t.geometry : t,
        s = e.vertices,
        h = a.vertices,
        l = e.faces,
        c = a.faces,
        e = e.faceVertexUvs[0],
        a = a.faceVertexUvs[0];
      void 0 === i && (i = 0),
        t instanceof THREE.Mesh &&
          (t.matrixAutoUpdate && t.updateMatrix(),
          (r = t.matrix),
          (n = new THREE.Matrix3().getNormalMatrix(r)));
      for (var t = 0, p = h.length; t < p; t++) {
        var u = h[t].clone();
        r && u.applyMatrix4(r), s.push(u);
      }
      for (t = 0, p = c.length; t < p; t++) {
        var E,
          f,
          u = c[t],
          d = u.vertexNormals,
          m = u.vertexColors;
        for (
          u instanceof THREE.Face3
            ? (E = new THREE.Face3(u.a + o, u.b + o, u.c + o))
            : u instanceof THREE.Face4 &&
              (E = new THREE.Face4(u.a + o, u.b + o, u.c + o, u.d + o)),
            E.normal.copy(u.normal),
            n && E.normal.applyMatrix3(n).normalize(),
            s = 0,
            h = d.length;
          s < h;
          s++
        )
          (f = d[s].clone()),
            n && f.applyMatrix3(n).normalize(),
            E.vertexNormals.push(f);
        for (E.color.copy(u.color), s = 0, h = m.length; s < h; s++)
          (f = m[s]), E.vertexColors.push(f.clone());
        (E.materialIndex = u.materialIndex + i),
          E.centroid.copy(u.centroid),
          r && E.centroid.applyMatrix4(r),
          l.push(E);
      }
      for (t = 0, p = a.length; t < p; t++) {
        for (i = a[t], r = [], s = 0, h = i.length; s < h; s++)
          r.push(new THREE.Vector2(i[s].x, i[s].y));
        e.push(r);
      }
    },
    removeMaterials: function (e, t) {
      for (var i = {}, r = 0, n = t.length; r < n; r++) i[t[r]] = !0;
      for (var o, a = [], r = 0, n = e.faces.length; r < n; r++)
        (o = e.faces[r]).materialIndex in i || a.push(o);
      e.faces = a;
    },
    randomPointInTriangle: function (e, t, i) {
      var r,
        n,
        o,
        a = new THREE.Vector3(),
        s = THREE.GeometryUtils.__v1;
      return (
        1 <
          (r = THREE.GeometryUtils.random()) +
            (n = THREE.GeometryUtils.random()) && ((r = 1 - r), (n = 1 - n)),
        (o = 1 - r - n),
        a.copy(e),
        a.multiplyScalar(r),
        s.copy(t),
        s.multiplyScalar(n),
        a.add(s),
        s.copy(i),
        s.multiplyScalar(o),
        a.add(s),
        a
      );
    },
    randomPointInFace: function (e, t, i) {
      var r, n, o;
      if (e instanceof THREE.Face3)
        return (
          (r = t.vertices[e.a]),
          (n = t.vertices[e.b]),
          (o = t.vertices[e.c]),
          THREE.GeometryUtils.randomPointInTriangle(r, n, o)
        );
      if (e instanceof THREE.Face4) {
        (r = t.vertices[e.a]), (n = t.vertices[e.b]), (o = t.vertices[e.c]);
        var a,
          t = t.vertices[e.d];
        return (
          i
            ? e._area1 && e._area2
              ? ((i = e._area1), (a = e._area2))
              : ((i = THREE.GeometryUtils.triangleArea(r, n, t)),
                (a = THREE.GeometryUtils.triangleArea(n, o, t)),
                (e._area1 = i),
                (e._area2 = a))
            : ((i = THREE.GeometryUtils.triangleArea(r, n, t)),
              (a = THREE.GeometryUtils.triangleArea(n, o, t))),
          THREE.GeometryUtils.random() * (i + a) < i
            ? THREE.GeometryUtils.randomPointInTriangle(r, n, t)
            : THREE.GeometryUtils.randomPointInTriangle(n, o, t)
        );
      }
    },
    randomPointsInGeometry: function (e, t) {
      function i(e) {
        return (function t(i, r) {
          if (r < i) return i;
          var n = i + Math.floor((r - i) / 2);
          return E[n] > e ? t(i, n - 1) : E[n] < e ? t(n + 1, r) : n;
        })(0, E.length - 1);
      }
      var r,
        n,
        o,
        a,
        s,
        h,
        l = e.faces,
        c = e.vertices,
        p = l.length,
        u = 0,
        E = [];
      for (n = 0; n < p; n++)
        (r = l[n]) instanceof THREE.Face3
          ? ((o = c[r.a]),
            (a = c[r.b]),
            (s = c[r.c]),
            (r._area = THREE.GeometryUtils.triangleArea(o, a, s)))
          : r instanceof THREE.Face4 &&
            ((o = c[r.a]),
            (a = c[r.b]),
            (s = c[r.c]),
            (h = c[r.d]),
            (r._area1 = THREE.GeometryUtils.triangleArea(o, a, h)),
            (r._area2 = THREE.GeometryUtils.triangleArea(a, s, h)),
            (r._area = r._area1 + r._area2)),
          (u += r._area),
          (E[n] = u);
      for (n = 0, r = []; n < t; n++)
        (c = i((c = THREE.GeometryUtils.random() * u))),
          (r[n] = THREE.GeometryUtils.randomPointInFace(l[c], e, !0));
      return r;
    },
    triangleArea: function (e, t, i) {
      var r = THREE.GeometryUtils.__v1,
        n = THREE.GeometryUtils.__v2;
      return (
        r.subVectors(t, e), n.subVectors(i, e), r.cross(n), 0.5 * r.length()
      );
    },
    center: function (e) {
      e.computeBoundingBox();
      var t = e.boundingBox,
        i = new THREE.Vector3();
      return (
        i.addVectors(t.min, t.max),
        i.multiplyScalar(-0.5),
        e.applyMatrix(new THREE.Matrix4().makeTranslation(i.x, i.y, i.z)),
        e.computeBoundingBox(),
        i
      );
    },
    normalizeUVs: function (e) {
      for (var e = e.faceVertexUvs[0], t = 0, i = e.length; t < i; t++)
        for (var r = e[t], n = 0, o = r.length; n < o; n++)
          1 !== r[n].x && (r[n].x -= Math.floor(r[n].x)),
            1 !== r[n].y && (r[n].y -= Math.floor(r[n].y));
    },
    triangulateQuads: function (e) {
      var t,
        i,
        r,
        n,
        o = [],
        a = [],
        s = [];
      for (t = 0, i = e.faceUvs.length; t < i; t++) a[t] = [];
      for (t = 0, i = e.faceVertexUvs.length; t < i; t++) s[t] = [];
      for (t = 0, i = e.faces.length; t < i; t++)
        if ((r = e.faces[t]) instanceof THREE.Face4) {
          n = r.a;
          var h = r.b,
            l = r.c,
            c = r.d,
            p = new THREE.Face3(),
            u = new THREE.Face3();
          for (
            p.color.copy(r.color),
              u.color.copy(r.color),
              p.materialIndex = r.materialIndex,
              u.materialIndex = r.materialIndex,
              p.a = n,
              p.b = h,
              p.c = c,
              u.a = h,
              u.b = l,
              u.c = c,
              4 === r.vertexColors.length &&
                ((p.vertexColors[0] = r.vertexColors[0].clone()),
                (p.vertexColors[1] = r.vertexColors[1].clone()),
                (p.vertexColors[2] = r.vertexColors[3].clone()),
                (u.vertexColors[0] = r.vertexColors[1].clone()),
                (u.vertexColors[1] = r.vertexColors[2].clone()),
                (u.vertexColors[2] = r.vertexColors[3].clone())),
              o.push(p, u),
              r = 0,
              n = e.faceVertexUvs.length;
            r < n;
            r++
          )
            e.faceVertexUvs[r].length &&
              ((h = (p = e.faceVertexUvs[r][t])[1]),
              (l = p[2]),
              (c = p[3]),
              (p = [p[0].clone(), h.clone(), c.clone()]),
              (h = [h.clone(), l.clone(), c.clone()]),
              s[r].push(p, h));
          for (r = 0, n = e.faceUvs.length; r < n; r++)
            e.faceUvs[r].length && ((h = e.faceUvs[r][t]), a[r].push(h, h));
        } else {
          for (o.push(r), r = 0, n = e.faceUvs.length; r < n; r++)
            a[r].push(e.faceUvs[r][t]);
          for (r = 0, n = e.faceVertexUvs.length; r < n; r++)
            s[r].push(e.faceVertexUvs[r][t]);
        }
      (e.faces = o),
        (e.faceUvs = a),
        (e.faceVertexUvs = s),
        e.computeCentroids(),
        e.computeFaceNormals(),
        e.computeVertexNormals(),
        e.hasTangents && e.computeTangents();
    },
    setMaterialIndex: function (e, t, i, r) {
      for (e = e.faces, r = r || e.length - 1, i = i || 0; i <= r; i++)
        e[i].materialIndex = t;
    },
  }),
  (THREE.GeometryUtils.random = THREE.Math.random16),
  (THREE.GeometryUtils.__v1 = new THREE.Vector3()),
  (THREE.GeometryUtils.__v2 = new THREE.Vector3()),
  (THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (e, t, i, r) {
      var n = new Image(),
        o = new THREE.Texture(n, t),
        t = new THREE.ImageLoader();
      return (
        t.addEventListener("load", function (e) {
          (o.image = e.content), (o.needsUpdate = !0), i && i(o);
        }),
        t.addEventListener("error", function (e) {
          r && r(e.message);
        }),
        (t.crossOrigin = this.crossOrigin),
        t.load(e, n),
        (o.sourceFile = e),
        o
      );
    },
    loadCompressedTexture: function (e, t, i, r) {
      var n = new THREE.CompressedTexture();
      n.mapping = t;
      var o = new XMLHttpRequest();
      return (
        (o.onload = function () {
          var e = THREE.ImageUtils.parseDDS(o.response, !0);
          (n.format = e.format),
            (n.mipmaps = e.mipmaps),
            (n.image.width = e.width),
            (n.image.height = e.height),
            (n.generateMipmaps = !1),
            (n.needsUpdate = !0),
            i && i(n);
        }),
        (o.onerror = r),
        o.open("GET", e, !0),
        (o.responseType = "arraybuffer"),
        o.send(null),
        n
      );
    },
    loadTextureCube: function (e, t, i, r) {
      var n = [];
      n.loadCount = 0;
      var o = new THREE.Texture();
      (o.image = n), void 0 !== t && (o.mapping = t), (o.flipY = !1);
      for (var t = 0, a = e.length; t < a; ++t) {
        var s = new Image();
        (n[t] = s),
          (s.onload = function () {
            (n.loadCount += 1),
              6 === n.loadCount && ((o.needsUpdate = !0), i && i(o));
          }),
          (s.onerror = r),
          (s.crossOrigin = this.crossOrigin),
          (s.src = e[t]);
      }
      return o;
    },
    loadCompressedTextureCube: function (e, t, i, r) {
      var n = [];
      n.loadCount = 0;
      var o = new THREE.CompressedTexture();
      if (
        ((o.image = n),
        void 0 !== t && (o.mapping = t),
        (o.flipY = !1),
        (o.generateMipmaps = !1),
        (t = function (e, t) {
          return function () {
            var r = THREE.ImageUtils.parseDDS(e.response, !0);
            (t.format = r.format),
              (t.mipmaps = r.mipmaps),
              (t.width = r.width),
              (t.height = r.height),
              (n.loadCount += 1),
              6 === n.loadCount &&
                ((o.format = r.format), (o.needsUpdate = !0), i && i(o));
          };
        }),
        e instanceof Array)
      )
        for (var a = 0, s = e.length; a < s; ++a) {
          var h = {};
          n[a] = h;
          var l = new XMLHttpRequest();
          (l.onload = t(l, h)),
            (l.onerror = r),
            (h = e[a]),
            l.open("GET", h, !0),
            (l.responseType = "arraybuffer"),
            l.send(null);
        }
      else
        ((l = new XMLHttpRequest()).onload = function () {
          var e = THREE.ImageUtils.parseDDS(l.response, !0);
          if (e.isCubemap) {
            for (var t = e.mipmaps.length / e.mipmapCount, r = 0; r < t; r++) {
              n[r] = { mipmaps: [] };
              for (var a = 0; a < e.mipmapCount; a++)
                n[r].mipmaps.push(e.mipmaps[r * e.mipmapCount + a]),
                  (n[r].format = e.format),
                  (n[r].width = e.width),
                  (n[r].height = e.height);
            }
            (o.format = e.format), (o.needsUpdate = !0), i && i(o);
          }
        }),
          (l.onerror = r),
          l.open("GET", e, !0),
          (l.responseType = "arraybuffer"),
          l.send(null);
      return o;
    },
    parseDDS: function (e, t) {
      function i(e) {
        return (
          e.charCodeAt(0) +
          (e.charCodeAt(1) << 8) +
          (e.charCodeAt(2) << 16) +
          (e.charCodeAt(3) << 24)
        );
      }
      var r = {
          mipmaps: [],
          width: 0,
          height: 0,
          format: null,
          mipmapCount: 1,
        },
        n = i("DXT1"),
        o = i("DXT3"),
        a = i("DXT5"),
        s = new Int32Array(e, 0, 31);
      if (542327876 !== s[0])
        return (
          console.error(
            "ImageUtils.parseDDS(): Invalid magic number in DDS header"
          ),
          r
        );
      if (4 & !s[20])
        return (
          console.error(
            "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"
          ),
          r
        );
      var h = s[21];
      switch (h) {
        case n:
          (n = 8), (r.format = THREE.RGB_S3TC_DXT1_Format);
          break;
        case o:
          (n = 16), (r.format = THREE.RGBA_S3TC_DXT3_Format);
          break;
        case a:
          (n = 16), (r.format = THREE.RGBA_S3TC_DXT5_Format);
          break;
        default:
          return (
            console.error(
              "ImageUtils.parseDDS(): Unsupported FourCC code: ",
              String.fromCharCode(
                255 & h,
                (h >> 8) & 255,
                (h >> 16) & 255,
                (h >> 24) & 255
              )
            ),
            r
          );
      }
      (r.mipmapCount = 1),
        131072 & s[2] && !1 !== t && (r.mipmapCount = Math.max(1, s[7])),
        (r.isCubemap = !!(512 & s[28])),
        (r.width = s[4]),
        (r.height = s[3]);
      for (
        var s = s[1] + 4,
          o = r.width,
          a = r.height,
          h = r.isCubemap ? 6 : 1,
          l = 0;
        l < h;
        l++
      ) {
        for (var c = 0; c < r.mipmapCount; c++) {
          var p = (((Math.max(4, o) / 4) * Math.max(4, a)) / 4) * n,
            u = { data: new Uint8Array(e, s, p), width: o, height: a };
          r.mipmaps.push(u),
            (s += p),
            (o = Math.max(0.5 * o, 1)),
            (a = Math.max(0.5 * a, 1));
        }
        (o = r.width), (a = r.height);
      }
      return r;
    },
    getNormalMap: function (e, t) {
      var t = 1 | t,
        i = e.width,
        r = e.height,
        n = document.createElement("canvas");
      (n.width = i), (n.height = r);
      var o = n.getContext("2d");
      o.drawImage(e, 0, 0);
      for (
        var a = o.getImageData(0, 0, i, r).data,
          s = o.createImageData(i, r),
          h = s.data,
          l = 0;
        l < i;
        l++
      )
        for (var c = 0; c < r; c++) {
          var p = 0 > c - 1 ? 0 : c - 1,
            u = c + 1 > r - 1 ? r - 1 : c + 1,
            E = 0 > l - 1 ? 0 : l - 1,
            f = l + 1 > i - 1 ? i - 1 : l + 1,
            d = [],
            m = [0, 0, (a[4 * (c * i + l)] / 255) * t];
          for (
            d.push([-1, 0, (a[4 * (c * i + E)] / 255) * t]),
              d.push([-1, -1, (a[4 * (p * i + E)] / 255) * t]),
              d.push([0, -1, (a[4 * (p * i + l)] / 255) * t]),
              d.push([1, -1, (a[4 * (p * i + f)] / 255) * t]),
              d.push([1, 0, (a[4 * (c * i + f)] / 255) * t]),
              d.push([1, 1, (a[4 * (u * i + f)] / 255) * t]),
              d.push([0, 1, (a[4 * (u * i + l)] / 255) * t]),
              d.push([-1, 1, (a[4 * (u * i + E)] / 255) * t]),
              p = [],
              E = d.length,
              u = 0;
            u < E;
            u++
          ) {
            var f = d[u],
              g = d[(u + 1) % E],
              f = [f[0] - m[0], f[1] - m[1], f[2] - m[2]],
              g = [g[0] - m[0], g[1] - m[1], g[2] - m[2]];
            p.push(
              (function (e) {
                var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                return [e[0] / t, e[1] / t, e[2] / t];
              })([
                f[1] * g[2] - f[2] * g[1],
                f[2] * g[0] - f[0] * g[2],
                f[0] * g[1] - f[1] * g[0],
              ])
            );
          }
          for (u = 0, d = [0, 0, 0]; u < p.length; u++)
            (d[0] += p[u][0]), (d[1] += p[u][1]), (d[2] += p[u][2]);
          (d[0] /= p.length),
            (d[1] /= p.length),
            (d[2] /= p.length),
            (h[(m = 4 * (c * i + l))] = (255 * ((d[0] + 1) / 2)) | 0),
            (h[m + 1] = (255 * ((d[1] + 1) / 2)) | 0),
            (h[m + 2] = (255 * d[2]) | 0),
            (h[m + 3] = 255);
        }
      return o.putImageData(s, 0, 0), n;
    },
    generateDataTexture: function (e, t, i) {
      for (
        var r = e * t,
          n = new Uint8Array(3 * r),
          o = Math.floor(255 * i.r),
          a = Math.floor(255 * i.g),
          i = Math.floor(255 * i.b),
          s = 0;
        s < r;
        s++
      )
        (n[3 * s] = o), (n[3 * s + 1] = a), (n[3 * s + 2] = i);
      return (
        ((e = new THREE.DataTexture(n, e, t, THREE.RGBFormat)).needsUpdate =
          !0),
        e
      );
    },
  }),
  (THREE.SceneUtils = {
    createMultiMaterialObject: function (e, t) {
      for (var i = new THREE.Object3D(), r = 0, n = t.length; r < n; r++)
        i.add(new THREE.Mesh(e, t[r]));
      return i;
    },
    detach: function (e, t, i) {
      e.applyMatrix(t.matrixWorld), t.remove(e), i.add(e);
    },
    attach: function (e, t, i) {
      var r = new THREE.Matrix4();
      r.getInverse(i.matrixWorld), e.applyMatrix(r), t.remove(e), i.add(e);
    },
  }),
  (THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
      return this.faces[this.face][this.weight][this.style];
    },
    loadFace: function (e) {
      var t = e.familyName.toLowerCase();
      return (
        (this.faces[t] = this.faces[t] || {}),
        (this.faces[t][e.cssFontWeight] = this.faces[t][e.cssFontWeight] || {}),
        (this.faces[t][e.cssFontWeight][e.cssFontStyle] = e),
        (this.faces[t][e.cssFontWeight][e.cssFontStyle] = e)
      );
    },
    drawText: function (e) {
      for (
        var t = this.getFace(),
          i = this.size / t.resolution,
          r = 0,
          n = String(e).split(""),
          o = n.length,
          a = [],
          e = 0;
        e < o;
        e++
      ) {
        var s = new THREE.Path(),
          s = this.extractGlyphPoints(n[e], t, i, r, s),
          r = r + s.offset;
        a.push(s.path);
      }
      return { paths: a, offset: r / 2 };
    },
    extractGlyphPoints: function (e, t, i, r, n) {
      var o,
        a,
        s,
        h,
        l,
        c,
        p,
        u,
        E,
        f,
        d,
        m = [],
        g = t.glyphs[e] || t.glyphs["?"];
      if (g) {
        if (g.o)
          for (
            e = 0,
              h = (t = g._cachedOutline || (g._cachedOutline = g.o.split(" ")))
                .length;
            e < h;

          )
            switch ((s = t[e++])) {
              case "m":
                (s = t[e++] * i + r), (l = t[e++] * i), n.moveTo(s, l);
                break;
              case "l":
                (s = t[e++] * i + r), (l = t[e++] * i), n.lineTo(s, l);
                break;
              case "q":
                if (
                  ((s = t[e++] * i + r),
                  (l = t[e++] * i),
                  (u = t[e++] * i + r),
                  (E = t[e++] * i),
                  n.quadraticCurveTo(u, E, s, l),
                  (o = m[m.length - 1]))
                )
                  for (
                    c = o.x, p = o.y, o = 1, a = this.divisions;
                    o <= a;
                    o++
                  ) {
                    var T = o / a;
                    THREE.Shape.Utils.b2(T, c, u, s),
                      THREE.Shape.Utils.b2(T, p, E, l);
                  }
                break;
              case "b":
                if (
                  ((s = t[e++] * i + r),
                  (l = t[e++] * i),
                  (u = t[e++] * i + r),
                  (E = -(t[e++] * i)),
                  (f = t[e++] * i + r),
                  (d = -(t[e++] * i)),
                  n.bezierCurveTo(s, l, u, E, f, d),
                  (o = m[m.length - 1]))
                )
                  for (c = o.x, p = o.y, o = 1, a = this.divisions; o <= a; o++)
                    (T = o / a),
                      THREE.Shape.Utils.b3(T, c, u, f, s),
                      THREE.Shape.Utils.b3(T, p, E, d, l);
            }
        return { offset: g.ha * i, path: n };
      }
    },
  }),
  (THREE.FontUtils.generateShapes = function (e, t) {
    var t = t || {},
      i = void 0 !== t.curveSegments ? t.curveSegments : 4,
      r = void 0 !== t.font ? t.font : "helvetiker",
      n = void 0 !== t.weight ? t.weight : "normal",
      o = void 0 !== t.style ? t.style : "normal";
    for (
      THREE.FontUtils.size = void 0 !== t.size ? t.size : 100,
        THREE.FontUtils.divisions = i,
        THREE.FontUtils.face = r,
        THREE.FontUtils.weight = n,
        THREE.FontUtils.style = o,
        i = THREE.FontUtils.drawText(e).paths,
        r = [],
        n = 0,
        o = i.length;
      n < o;
      n++
    )
      Array.prototype.push.apply(r, i[n].toShapes());
    return r;
  }),
  (function (e) {
    var t = function (e) {
      for (var t = e.length, i = 0, r = t - 1, n = 0; n < t; r = n++)
        i += e[r].x * e[n].y - e[n].x * e[r].y;
      return 0.5 * i;
    };
    (e.Triangulate = function (e, i) {
      var r = e.length;
      if (3 > r) return null;
      var n,
        o,
        a,
        s = [],
        h = [],
        l = [];
      if (0 < t(e)) for (o = 0; o < r; o++) h[o] = o;
      else for (o = 0; o < r; o++) h[o] = r - 1 - o;
      var c = 2 * r;
      for (o = r - 1; 2 < r; ) {
        if (0 >= c--) {
          console.log("Warning, unable to triangulate polygon!");
          break;
        }
        r <= (n = o) && (n = 0),
          r <= (o = n + 1) && (o = 0),
          r <= (a = o + 1) && (a = 0);
        a: {
          var p,
            u = (p = void 0),
            E = void 0,
            f = void 0,
            d = void 0,
            m = void 0,
            g = void 0,
            T = void 0,
            v = void 0,
            u = e[h[n]].x,
            E = e[h[n]].y,
            f = e[h[o]].x,
            d = e[h[o]].y,
            m = e[h[a]].x,
            g = e[h[a]].y;
          if (1e-10 > (f - u) * (g - E) - (d - E) * (m - u)) p = !1;
          else {
            var $ = void 0,
              y = void 0,
              R = void 0,
              x = void 0,
              H = void 0,
              _ = void 0,
              w = void 0,
              S = void 0,
              b = void 0,
              M = void 0,
              b = (S = w = v = T = void 0),
              $ = m - f,
              y = g - d,
              R = u - m,
              x = E - g,
              H = f - u,
              _ = d - E;
            for (p = 0; p < r; p++)
              if (
                !(p === n || p === o || p === a) &&
                ((T = e[h[p]].x),
                (v = e[h[p]].y),
                (w = T - u),
                (S = v - E),
                (b = T - f),
                (M = v - d),
                (T -= m),
                (v -= g),
                (b = $ * M - y * b),
                (w = H * S - _ * w),
                (S = R * v - x * T),
                0 <= b && 0 <= S && 0 <= w)
              ) {
                p = !1;
                break a;
              }
            p = !0;
          }
        }
        if (p) {
          for (
            s.push([e[h[n]], e[h[o]], e[h[a]]]),
              l.push([h[n], h[o], h[a]]),
              n = o,
              a = o + 1;
            a < r;
            n++, a++
          )
            h[n] = h[a];
          c = 2 * --r;
        }
      }
      return i ? l : s;
    }),
      (e.Triangulate.area = t);
  })(THREE.FontUtils),
  (self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace,
  }),
  (THREE.typeface_js = self._typeface_js),
  (THREE.Curve = function () {}),
  (THREE.Curve.prototype.getPoint = function () {
    return console.log("Warning, getPoint() not implemented!"), null;
  }),
  (THREE.Curve.prototype.getPointAt = function (e) {
    return (e = this.getUtoTmapping(e)), this.getPoint(e);
  }),
  (THREE.Curve.prototype.getPoints = function (e) {
    e || (e = 5);
    var t,
      i = [];
    for (t = 0; t <= e; t++) i.push(this.getPoint(t / e));
    return i;
  }),
  (THREE.Curve.prototype.getSpacedPoints = function (e) {
    e || (e = 5);
    var t,
      i = [];
    for (t = 0; t <= e; t++) i.push(this.getPointAt(t / e));
    return i;
  }),
  (THREE.Curve.prototype.getLength = function () {
    var e = this.getLengths();
    return e[e.length - 1];
  }),
  (THREE.Curve.prototype.getLengths = function (e) {
    if (
      (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
      this.cacheArcLengths &&
        this.cacheArcLengths.length == e + 1 &&
        !this.needsUpdate)
    )
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    var t,
      i,
      r = [],
      n = this.getPoint(0),
      o = 0;
    for (r.push(0), i = 1; i <= e; i++)
      r.push((o += (t = this.getPoint(i / e)).distanceTo(n))), (n = t);
    return (this.cacheArcLengths = r);
  }),
  (THREE.Curve.prototype.updateArcLengths = function () {
    (this.needsUpdate = !0), this.getLengths();
  }),
  (THREE.Curve.prototype.getUtoTmapping = function (e, t) {
    var i,
      r = this.getLengths(),
      n = 0,
      o = r.length;
    i = t || e * r[o - 1];
    for (var a, s = 0, h = o - 1; s <= h; )
      if (0 > (a = r[(n = Math.floor(s + (h - s) / 2))] - i)) s = n + 1;
      else if (0 < a) h = n - 1;
      else {
        h = n;
        break;
      }
    return r[(n = h)] == i
      ? n / (o - 1)
      : ((s = r[n]), (n + (i - s) / (r[n + 1] - s)) / (o - 1));
  }),
  (THREE.Curve.prototype.getTangent = function (e) {
    var t = e - 1e-4,
      e = e + 1e-4;
    return (
      0 > t && (t = 0),
      1 < e && (e = 1),
      (t = this.getPoint(t)),
      this.getPoint(e).clone().sub(t).normalize()
    );
  }),
  (THREE.Curve.prototype.getTangentAt = function (e) {
    return (e = this.getUtoTmapping(e)), this.getTangent(e);
  }),
  (THREE.LineCurve = function (e, t) {
    (this.v1 = e), (this.v2 = t);
  }),
  (THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.LineCurve.prototype.getPoint = function (e) {
    var t = this.v2.clone().sub(this.v1);
    return t.multiplyScalar(e).add(this.v1), t;
  }),
  (THREE.LineCurve.prototype.getPointAt = function (e) {
    return this.getPoint(e);
  }),
  (THREE.LineCurve.prototype.getTangent = function () {
    return this.v2.clone().sub(this.v1).normalize();
  }),
  (THREE.QuadraticBezierCurve = function (e, t, i) {
    (this.v0 = e), (this.v1 = t), (this.v2 = i);
  }),
  (THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.QuadraticBezierCurve.prototype.getPoint = function (e) {
    var t;
    return (
      (t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x)),
      (e = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y)),
      new THREE.Vector2(t, e)
    );
  }),
  (THREE.QuadraticBezierCurve.prototype.getTangent = function (e) {
    var t;
    return (
      (t = THREE.Curve.Utils.tangentQuadraticBezier(
        e,
        this.v0.x,
        this.v1.x,
        this.v2.x
      )),
      (e = THREE.Curve.Utils.tangentQuadraticBezier(
        e,
        this.v0.y,
        this.v1.y,
        this.v2.y
      )),
      (t = new THREE.Vector2(t, e)).normalize(),
      t
    );
  }),
  (THREE.CubicBezierCurve = function (e, t, i, r) {
    (this.v0 = e), (this.v1 = t), (this.v2 = i), (this.v3 = r);
  }),
  (THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.CubicBezierCurve.prototype.getPoint = function (e) {
    var t;
    return (
      (t = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x)),
      (e = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y)),
      new THREE.Vector2(t, e)
    );
  }),
  (THREE.CubicBezierCurve.prototype.getTangent = function (e) {
    var t;
    return (
      (t = THREE.Curve.Utils.tangentCubicBezier(
        e,
        this.v0.x,
        this.v1.x,
        this.v2.x,
        this.v3.x
      )),
      (e = THREE.Curve.Utils.tangentCubicBezier(
        e,
        this.v0.y,
        this.v1.y,
        this.v2.y,
        this.v3.y
      )),
      (t = new THREE.Vector2(t, e)).normalize(),
      t
    );
  }),
  (THREE.SplineCurve = function (e) {
    this.points = void 0 == e ? [] : e;
  }),
  (THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.SplineCurve.prototype.getPoint = function (e) {
    var t,
      i = new THREE.Vector2(),
      r = [],
      n = this.points;
    return (
      (e = Math.floor((t = (n.length - 1) * e))),
      (t -= e),
      (r[0] = 0 == e ? e : e - 1),
      (r[1] = e),
      (r[2] = e > n.length - 2 ? n.length - 1 : e + 1),
      (r[3] = e > n.length - 3 ? n.length - 1 : e + 2),
      (i.x = THREE.Curve.Utils.interpolate(
        n[r[0]].x,
        n[r[1]].x,
        n[r[2]].x,
        n[r[3]].x,
        t
      )),
      (i.y = THREE.Curve.Utils.interpolate(
        n[r[0]].y,
        n[r[1]].y,
        n[r[2]].y,
        n[r[3]].y,
        t
      )),
      i
    );
  }),
  (THREE.EllipseCurve = function (e, t, i, r, n, o, a) {
    (this.aX = e),
      (this.aY = t),
      (this.xRadius = i),
      (this.yRadius = r),
      (this.aStartAngle = n),
      (this.aEndAngle = o),
      (this.aClockwise = a);
  }),
  (THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.EllipseCurve.prototype.getPoint = function (e) {
    var t = this.aEndAngle - this.aStartAngle;
    return (
      this.aClockwise || (e = 1 - e),
      (t = this.aStartAngle + e * t),
      (e = this.aX + this.xRadius * Math.cos(t)),
      (t = this.aY + this.yRadius * Math.sin(t)),
      new THREE.Vector2(e, t)
    );
  }),
  (THREE.ArcCurve = function (e, t, i, r, n, o) {
    THREE.EllipseCurve.call(this, e, t, i, i, r, n, o);
  }),
  (THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype)),
  (THREE.Curve.Utils = {
    tangentQuadraticBezier: function (e, t, i, r) {
      return 2 * (1 - e) * (i - t) + 2 * e * (r - i);
    },
    tangentCubicBezier: function (e, t, i, r, n) {
      return (
        -3 * t * (1 - e) * (1 - e) +
        3 * i * (1 - e) * (1 - e) -
        6 * e * i * (1 - e) +
        6 * e * r * (1 - e) -
        3 * e * e * r +
        3 * e * e * n
      );
    },
    tangentSpline: function (e) {
      return (
        6 * e * e -
        6 * e +
        (3 * e * e - 4 * e + 1) +
        (-6 * e * e + 6 * e) +
        (3 * e * e - 2 * e)
      );
    },
    interpolate: function (e, t, i, r, n) {
      var e = 0.5 * (i - e),
        r = 0.5 * (r - t),
        o = n * n;
      return (
        (2 * t - 2 * i + e + r) * n * o +
        (-3 * t + 3 * i - 2 * e - r) * o +
        e * n +
        t
      );
    },
  }),
  (THREE.Curve.create = function (e, t) {
    return (
      (e.prototype = Object.create(THREE.Curve.prototype)),
      (e.prototype.getPoint = t),
      e
    );
  }),
  (THREE.LineCurve3 = THREE.Curve.create(
    function (e, t) {
      (this.v1 = e), (this.v2 = t);
    },
    function (e) {
      var t = new THREE.Vector3();
      return (
        t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
      );
    }
  )),
  (THREE.QuadraticBezierCurve3 = THREE.Curve.create(
    function (e, t, i) {
      (this.v0 = e), (this.v1 = t), (this.v2 = i);
    },
    function (e) {
      var t, i;
      return (
        (t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x)),
        (i = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y)),
        (e = THREE.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z)),
        new THREE.Vector3(t, i, e)
      );
    }
  )),
  (THREE.CubicBezierCurve3 = THREE.Curve.create(
    function (e, t, i, r) {
      (this.v0 = e), (this.v1 = t), (this.v2 = i), (this.v3 = r);
    },
    function (e) {
      var t, i;
      return (
        (t = THREE.Shape.Utils.b3(
          e,
          this.v0.x,
          this.v1.x,
          this.v2.x,
          this.v3.x
        )),
        (i = THREE.Shape.Utils.b3(
          e,
          this.v0.y,
          this.v1.y,
          this.v2.y,
          this.v3.y
        )),
        (e = THREE.Shape.Utils.b3(
          e,
          this.v0.z,
          this.v1.z,
          this.v2.z,
          this.v3.z
        )),
        new THREE.Vector3(t, i, e)
      );
    }
  )),
  (THREE.SplineCurve3 = THREE.Curve.create(
    function (e) {
      this.points = void 0 == e ? [] : e;
    },
    function (e) {
      var t,
        i = new THREE.Vector3(),
        r = [],
        n = this.points,
        e = (n.length - 1) * e;
      (t = Math.floor(e)),
        (e -= t),
        (r[0] = 0 == t ? t : t - 1),
        (r[1] = t),
        (r[2] = t > n.length - 2 ? n.length - 1 : t + 1),
        (r[3] = t > n.length - 3 ? n.length - 1 : t + 2),
        (t = n[r[0]]);
      var o = n[r[1]],
        a = n[r[2]],
        r = n[r[3]];
      return (
        (i.x = THREE.Curve.Utils.interpolate(t.x, o.x, a.x, r.x, e)),
        (i.y = THREE.Curve.Utils.interpolate(t.y, o.y, a.y, r.y, e)),
        (i.z = THREE.Curve.Utils.interpolate(t.z, o.z, a.z, r.z, e)),
        i
      );
    }
  )),
  (THREE.ClosedSplineCurve3 = THREE.Curve.create(
    function (e) {
      this.points = void 0 == e ? [] : e;
    },
    function (e) {
      var t,
        i = new THREE.Vector3(),
        r = [],
        n = this.points;
      return (
        (e = Math.floor((t = (n.length - 0) * e))),
        (t -= e),
        (e += 0 < e ? 0 : (Math.floor(Math.abs(e) / n.length) + 1) * n.length),
        (r[0] = (e - 1) % n.length),
        (r[1] = e % n.length),
        (r[2] = (e + 1) % n.length),
        (r[3] = (e + 2) % n.length),
        (i.x = THREE.Curve.Utils.interpolate(
          n[r[0]].x,
          n[r[1]].x,
          n[r[2]].x,
          n[r[3]].x,
          t
        )),
        (i.y = THREE.Curve.Utils.interpolate(
          n[r[0]].y,
          n[r[1]].y,
          n[r[2]].y,
          n[r[3]].y,
          t
        )),
        (i.z = THREE.Curve.Utils.interpolate(
          n[r[0]].z,
          n[r[1]].z,
          n[r[2]].z,
          n[r[3]].z,
          t
        )),
        i
      );
    }
  )),
  (THREE.CurvePath = function () {
    (this.curves = []), (this.bends = []), (this.autoClose = !1);
  }),
  (THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.CurvePath.prototype.add = function (e) {
    this.curves.push(e);
  }),
  (THREE.CurvePath.prototype.checkConnection = function () {}),
  (THREE.CurvePath.prototype.closePath = function () {
    var e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    e.equals(t) || this.curves.push(new THREE.LineCurve(t, e));
  }),
  (THREE.CurvePath.prototype.getPoint = function (e) {
    for (
      var t = e * this.getLength(), i = this.getCurveLengths(), e = 0;
      e < i.length;

    ) {
      if (i[e] >= t)
        return (
          (t = 1 - (t = i[e] - t) / (e = this.curves[e]).getLength()),
          e.getPointAt(t)
        );
      e++;
    }
    return null;
  }),
  (THREE.CurvePath.prototype.getLength = function () {
    var e = this.getCurveLengths();
    return e[e.length - 1];
  }),
  (THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
      return this.cacheLengths;
    var e,
      t = [],
      i = 0,
      r = this.curves.length;
    for (e = 0; e < r; e++) t.push((i += this.curves[e].getLength()));
    return (this.cacheLengths = t);
  }),
  (THREE.CurvePath.prototype.getBoundingBox = function () {
    var e,
      t,
      i,
      r,
      n,
      o,
      a = this.getPoints();
    (e = t = Number.NEGATIVE_INFINITY), (r = n = Number.POSITIVE_INFINITY);
    var s,
      h,
      l,
      c,
      p = a[0] instanceof THREE.Vector3;
    for (
      c = p ? new THREE.Vector3() : new THREE.Vector2(), h = 0, l = a.length;
      h < l;
      h++
    )
      (s = a[h]).x > e ? (e = s.x) : s.x < r && (r = s.x),
        s.y > t ? (t = s.y) : s.y < n && (n = s.y),
        p && (s.z > i ? (i = s.z) : s.z < o && (o = s.z)),
        c.add(s);
    return (
      (a = { minX: r, minY: n, maxX: e, maxY: t, centroid: c.divideScalar(l) }),
      p && ((a.maxZ = i), (a.minZ = o)),
      a
    );
  }),
  (THREE.CurvePath.prototype.createPointsGeometry = function (e) {
    return (e = this.getPoints(e, !0)), this.createGeometry(e);
  }),
  (THREE.CurvePath.prototype.createSpacedPointsGeometry = function (e) {
    return (e = this.getSpacedPoints(e, !0)), this.createGeometry(e);
  }),
  (THREE.CurvePath.prototype.createGeometry = function (e) {
    for (var t = new THREE.Geometry(), i = 0; i < e.length; i++)
      t.vertices.push(new THREE.Vector3(e[i].x, e[i].y, e[i].z || 0));
    return t;
  }),
  (THREE.CurvePath.prototype.addWrapPath = function (e) {
    this.bends.push(e);
  }),
  (THREE.CurvePath.prototype.getTransformedPoints = function (e, t) {
    var i,
      r,
      n = this.getPoints(e);
    for (t || (t = this.bends), i = 0, r = t.length; i < r; i++)
      n = this.getWrapPoints(n, t[i]);
    return n;
  }),
  (THREE.CurvePath.prototype.getTransformedSpacedPoints = function (e, t) {
    var i,
      r,
      n = this.getSpacedPoints(e);
    for (t || (t = this.bends), i = 0, r = t.length; i < r; i++)
      n = this.getWrapPoints(n, t[i]);
    return n;
  }),
  (THREE.CurvePath.prototype.getWrapPoints = function (e, t) {
    var i,
      r,
      n,
      o,
      a,
      s,
      h = this.getBoundingBox();
    for (i = 0, r = e.length; i < r; i++)
      (o = (n = e[i]).x),
        (a = n.y),
        (s = o / h.maxX),
        (s = t.getUtoTmapping(s, o)),
        (o = t.getPoint(s)),
        (a = t.getNormalVector(s).multiplyScalar(a)),
        (n.x = o.x + a.x),
        (n.y = o.y + a.y);
    return e;
  }),
  (THREE.Gyroscope = function () {
    THREE.Object3D.call(this);
  }),
  (THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Gyroscope.prototype.updateMatrixWorld = function (e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.parent
          ? (this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix
            ),
            this.matrixWorld.decompose(
              this.translationWorld,
              this.rotationWorld,
              this.scaleWorld
            ),
            this.matrix.decompose(
              this.translationObject,
              this.rotationObject,
              this.scaleObject
            ),
            this.matrixWorld.makeFromPositionQuaternionScale(
              this.translationWorld,
              this.rotationObject,
              this.scaleWorld
            ))
          : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (e = !0));
    for (var t = 0, i = this.children.length; t < i; t++)
      this.children[t].updateMatrixWorld(e);
  }),
  (THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.translationObject = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion()),
  (THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion()),
  (THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3()),
  (THREE.Path = function (e) {
    THREE.CurvePath.call(this), (this.actions = []), e && this.fromPoints(e);
  }),
  (THREE.Path.prototype = Object.create(THREE.CurvePath.prototype)),
  (THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse",
  }),
  (THREE.Path.prototype.fromPoints = function (e) {
    this.moveTo(e[0].x, e[0].y);
    for (var t = 1, i = e.length; t < i; t++) this.lineTo(e[t].x, e[t].y);
  }),
  (THREE.Path.prototype.moveTo = function (e, t) {
    var i = Array.prototype.slice.call(arguments);
    this.actions.push({ action: THREE.PathActions.MOVE_TO, args: i });
  }),
  (THREE.Path.prototype.lineTo = function (e, t) {
    var i = Array.prototype.slice.call(arguments),
      r = this.actions[this.actions.length - 1].args,
      r = new THREE.LineCurve(
        new THREE.Vector2(r[r.length - 2], r[r.length - 1]),
        new THREE.Vector2(e, t)
      );
    this.curves.push(r),
      this.actions.push({ action: THREE.PathActions.LINE_TO, args: i });
  }),
  (THREE.Path.prototype.quadraticCurveTo = function (e, t, i, r) {
    var n = Array.prototype.slice.call(arguments),
      o = this.actions[this.actions.length - 1].args,
      o = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(o[o.length - 2], o[o.length - 1]),
        new THREE.Vector2(e, t),
        new THREE.Vector2(i, r)
      );
    this.curves.push(o),
      this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: n,
      });
  }),
  (THREE.Path.prototype.bezierCurveTo = function (e, t, i, r, n, o) {
    var a = Array.prototype.slice.call(arguments),
      s = this.actions[this.actions.length - 1].args,
      s = new THREE.CubicBezierCurve(
        new THREE.Vector2(s[s.length - 2], s[s.length - 1]),
        new THREE.Vector2(e, t),
        new THREE.Vector2(i, r),
        new THREE.Vector2(n, o)
      );
    this.curves.push(s),
      this.actions.push({ action: THREE.PathActions.BEZIER_CURVE_TO, args: a });
  }),
  (THREE.Path.prototype.splineThru = function (e) {
    var t = Array.prototype.slice.call(arguments),
      i = this.actions[this.actions.length - 1].args,
      i = [new THREE.Vector2(i[i.length - 2], i[i.length - 1])];
    Array.prototype.push.apply(i, e),
      (i = new THREE.SplineCurve(i)),
      this.curves.push(i),
      this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: t });
  }),
  (THREE.Path.prototype.arc = function (e, t, i, r, n, o) {
    var a = this.actions[this.actions.length - 1].args;
    this.absarc(e + a[a.length - 2], t + a[a.length - 1], i, r, n, o);
  }),
  (THREE.Path.prototype.absarc = function (e, t, i, r, n, o) {
    this.absellipse(e, t, i, i, r, n, o);
  }),
  (THREE.Path.prototype.ellipse = function (e, t, i, r, n, o, a) {
    var s = this.actions[this.actions.length - 1].args;
    this.absellipse(e + s[s.length - 2], t + s[s.length - 1], i, r, n, o, a);
  }),
  (THREE.Path.prototype.absellipse = function (e, t, i, r, n, o, a) {
    var s = Array.prototype.slice.call(arguments),
      h = new THREE.EllipseCurve(e, t, i, r, n, o, a);
    this.curves.push(h),
      (h = h.getPoint(a ? 1 : 0)),
      s.push(h.x),
      s.push(h.y),
      this.actions.push({ action: THREE.PathActions.ELLIPSE, args: s });
  }),
  (THREE.Path.prototype.getSpacedPoints = function (e) {
    e || (e = 40);
    for (var t = [], i = 0; i < e; i++) t.push(this.getPoint(i / e));
    return t;
  }),
  (THREE.Path.prototype.getPoints = function (e, t) {
    if (this.useSpacedPoints)
      return console.log("tata"), this.getSpacedPoints(e, t);
    var i,
      r,
      n,
      o,
      a,
      s,
      h,
      l,
      c,
      p,
      u,
      E,
      f,
      e = e || 12,
      d = [];
    for (i = 0, r = this.actions.length; i < r; i++)
      switch (((o = (n = this.actions[i]).action), (n = n.args), o)) {
        case THREE.PathActions.MOVE_TO:
        case THREE.PathActions.LINE_TO:
          d.push(new THREE.Vector2(n[0], n[1]));
          break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
          for (
            a = n[2],
              s = n[3],
              c = n[0],
              p = n[1],
              0 < d.length
                ? ((u = (o = d[d.length - 1]).x), (E = o.y))
                : ((u = (o = this.actions[i - 1].args)[o.length - 2]),
                  (E = o[o.length - 1])),
              n = 1;
            n <= e;
            n++
          )
            (f = n / e),
              (o = THREE.Shape.Utils.b2(f, u, c, a)),
              (f = THREE.Shape.Utils.b2(f, E, p, s)),
              d.push(new THREE.Vector2(o, f));
          break;
        case THREE.PathActions.BEZIER_CURVE_TO:
          for (
            a = n[4],
              s = n[5],
              c = n[0],
              p = n[1],
              h = n[2],
              l = n[3],
              0 < d.length
                ? ((u = (o = d[d.length - 1]).x), (E = o.y))
                : ((u = (o = this.actions[i - 1].args)[o.length - 2]),
                  (E = o[o.length - 1])),
              n = 1;
            n <= e;
            n++
          )
            (f = n / e),
              (o = THREE.Shape.Utils.b3(f, u, c, h, a)),
              (f = THREE.Shape.Utils.b3(f, E, p, l, s)),
              d.push(new THREE.Vector2(o, f));
          break;
        case THREE.PathActions.CSPLINE_THRU:
          for (
            o = this.actions[i - 1].args,
              f = [new THREE.Vector2(o[o.length - 2], o[o.length - 1])],
              o = e * n[0].length,
              f = f.concat(n[0]),
              f = new THREE.SplineCurve(f),
              n = 1;
            n <= o;
            n++
          )
            d.push(f.getPointAt(n / o));
          break;
        case THREE.PathActions.ARC:
          for (
            a = n[0],
              s = n[1],
              p = n[2],
              h = n[3],
              o = n[4],
              c = !!n[5],
              u = o - h,
              E = 2 * e,
              n = 1;
            n <= E;
            n++
          )
            (f = n / E),
              c || (f = 1 - f),
              (o = a + p * Math.cos((f = h + f * u))),
              (f = s + p * Math.sin(f)),
              d.push(new THREE.Vector2(o, f));
          break;
        case THREE.PathActions.ELLIPSE:
          for (
            a = n[0],
              s = n[1],
              p = n[2],
              l = n[3],
              h = n[4],
              o = n[5],
              c = !!n[6],
              u = o - h,
              E = 2 * e,
              n = 1;
            n <= E;
            n++
          )
            (f = n / E),
              c || (f = 1 - f),
              (o = a + p * Math.cos((f = h + f * u))),
              (f = s + l * Math.sin(f)),
              d.push(new THREE.Vector2(o, f));
      }
    return (
      1e-10 > Math.abs((i = d[d.length - 1]).x - d[0].x) &&
        1e-10 > Math.abs(i.y - d[0].y) &&
        d.splice(d.length - 1, 1),
      t && d.push(d[0]),
      d
    );
  }),
  (THREE.Path.prototype.toShapes = function () {
    var e,
      t,
      i,
      r,
      n,
      o = [],
      a = new THREE.Path();
    for (t = 0, i = this.actions.length; t < i; t++)
      (n = (r = this.actions[t]).args),
        (r = r.action) == THREE.PathActions.MOVE_TO &&
          0 != a.actions.length &&
          (o.push(a), (a = new THREE.Path())),
        a[r].apply(a, n);
    if ((0 != a.actions.length && o.push(a), 0 == o.length)) return [];
    if (
      ((n = []),
      (t = !THREE.Shape.Utils.isClockWise(o[0].getPoints())),
      1 == o.length)
    )
      return (
        (a = o[0]),
        ((e = new THREE.Shape()).actions = a.actions),
        (e.curves = a.curves),
        n.push(e),
        n
      );
    if (t)
      for (e = new THREE.Shape(), t = 0, i = o.length; t < i; t++)
        (a = o[t]),
          THREE.Shape.Utils.isClockWise(a.getPoints())
            ? ((e.actions = a.actions),
              (e.curves = a.curves),
              n.push(e),
              (e = new THREE.Shape()))
            : e.holes.push(a);
    else {
      for (t = 0, i = o.length; t < i; t++)
        (a = o[t]),
          THREE.Shape.Utils.isClockWise(a.getPoints())
            ? (e && n.push(e),
              ((e = new THREE.Shape()).actions = a.actions),
              (e.curves = a.curves))
            : e.holes.push(a);
      n.push(e);
    }
    return n;
  }),
  (THREE.Shape = function () {
    THREE.Path.apply(this, arguments), (this.holes = []);
  }),
  (THREE.Shape.prototype = Object.create(THREE.Path.prototype)),
  (THREE.Shape.prototype.extrude = function (e) {
    return new THREE.ExtrudeGeometry(this, e);
  }),
  (THREE.Shape.prototype.makeGeometry = function (e) {
    return new THREE.ShapeGeometry(this, e);
  }),
  (THREE.Shape.prototype.getPointsHoles = function (e) {
    var t,
      i = this.holes.length,
      r = [];
    for (t = 0; t < i; t++)
      r[t] = this.holes[t].getTransformedPoints(e, this.bends);
    return r;
  }),
  (THREE.Shape.prototype.getSpacedPointsHoles = function (e) {
    var t,
      i = this.holes.length,
      r = [];
    for (t = 0; t < i; t++)
      r[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
    return r;
  }),
  (THREE.Shape.prototype.extractAllPoints = function (e) {
    return {
      shape: this.getTransformedPoints(e),
      holes: this.getPointsHoles(e),
    };
  }),
  (THREE.Shape.prototype.extractPoints = function (e) {
    return this.useSpacedPoints
      ? this.extractAllSpacedPoints(e)
      : this.extractAllPoints(e);
  }),
  (THREE.Shape.prototype.extractAllSpacedPoints = function (e) {
    return {
      shape: this.getTransformedSpacedPoints(e),
      holes: this.getSpacedPointsHoles(e),
    };
  }),
  (THREE.Shape.Utils = {
    removeHoles: function (e, t) {
      var i,
        r,
        n,
        o,
        a,
        s,
        h,
        l,
        c,
        p,
        u = e.concat(),
        E = u.concat(),
        f = [];
      for (a = 0; a < t.length; a++) {
        for (
          s = t[a],
            Array.prototype.push.apply(E, s),
            r = Number.POSITIVE_INFINITY,
            i = 0;
          i < s.length;
          i++
        )
          for (l = 0, c = s[i], p = []; l < u.length; l++)
            (h = u[l]),
              (h = c.distanceToSquared(h)),
              p.push(h),
              h < r && ((r = h), (n = i), (o = l));
        (i = 0 <= o - 1 ? o - 1 : u.length - 1),
          (r = 0 <= n - 1 ? n - 1 : s.length - 1);
        var d = [s[n], u[o], u[i]];
        l = THREE.FontUtils.Triangulate.area(d);
        var m = [s[n], s[r], u[o]];
        (c = THREE.FontUtils.Triangulate.area(m)),
          (p = o),
          (h = n),
          (n += -1),
          0 > (o += 1) && (o += u.length),
          (o %= u.length),
          0 > n && (n += s.length),
          (n %= s.length),
          (i = 0 <= o - 1 ? o - 1 : u.length - 1),
          (r = 0 <= n - 1 ? n - 1 : s.length - 1),
          (d = [s[n], u[o], u[i]]),
          (d = THREE.FontUtils.Triangulate.area(d)),
          (m = [s[n], s[r], u[o]]),
          l + c > d + (m = THREE.FontUtils.Triangulate.area(m)) &&
            ((o = p),
            (n = h),
            0 > o && (o += u.length),
            (o %= u.length),
            0 > n && (n += s.length),
            (n %= s.length),
            (i = 0 <= o - 1 ? o - 1 : u.length - 1),
            (r = 0 <= n - 1 ? n - 1 : s.length - 1)),
          (l = u.slice(0, o)),
          (c = u.slice(o)),
          (p = s.slice(n)),
          (h = s.slice(0, n)),
          (r = [s[n], s[r], u[o]]),
          f.push([s[n], u[o], u[i]]),
          f.push(r),
          (u = l.concat(p).concat(h).concat(c));
      }
      return { shape: u, isolatedPts: f, allpoints: E };
    },
    triangulateShape: function (e, t) {
      var i,
        r,
        n,
        o,
        a = THREE.Shape.Utils.removeHoles(e, t),
        s = a.allpoints,
        h = a.isolatedPts,
        a = THREE.FontUtils.Triangulate(a.shape, !1),
        l = {};
      for (i = 0, r = s.length; i < r; i++)
        void 0 !== l[(o = s[i].x + ":" + s[i].y)] &&
          console.log("Duplicate point", o),
          (l[o] = i);
      for (i = 0, r = a.length; i < r; i++)
        for (s = 0, n = a[i]; 3 > s; s++)
          void 0 !== (o = l[(o = n[s].x + ":" + n[s].y)]) && (n[s] = o);
      for (i = 0, r = h.length; i < r; i++)
        for (s = 0, n = h[i]; 3 > s; s++)
          void 0 !== (o = l[(o = n[s].x + ":" + n[s].y)]) && (n[s] = o);
      return a.concat(h);
    },
    isClockWise: function (e) {
      return 0 > THREE.FontUtils.Triangulate.area(e);
    },
    b2p0: function (e, t) {
      var i = 1 - e;
      return i * i * t;
    },
    b2p1: function (e, t) {
      return 2 * (1 - e) * e * t;
    },
    b2p2: function (e, t) {
      return e * e * t;
    },
    b2: function (e, t, i, r) {
      return this.b2p0(e, t) + this.b2p1(e, i) + this.b2p2(e, r);
    },
    b3p0: function (e, t) {
      var i = 1 - e;
      return i * i * i * t;
    },
    b3p1: function (e, t) {
      var i = 1 - e;
      return 3 * i * i * e * t;
    },
    b3p2: function (e, t) {
      return 3 * (1 - e) * e * e * t;
    },
    b3p3: function (e, t) {
      return e * e * e * t;
    },
    b3: function (e, t, i, r, n) {
      return (
        this.b3p0(e, t) + this.b3p1(e, i) + this.b3p2(e, r) + this.b3p3(e, n)
      );
    },
  }),
  (THREE.AnimationHandler = (function () {
    var e = [],
      t = {},
      i = {
        update: function (t) {
          for (var i = 0; i < e.length; i++) e[i].update(t);
        },
        addToUpdate: function (t) {
          -1 === e.indexOf(t) && e.push(t);
        },
        removeFromUpdate: function (t) {
          -1 !== (t = e.indexOf(t)) && e.splice(t, 1);
        },
        add: function (e) {
          if (
            (void 0 !== t[e.name] &&
              console.log(
                "THREE.AnimationHandler.add: Warning! " +
                  e.name +
                  " already exists in library. Overwriting."
              ),
            (t[e.name] = e),
            !0 !== e.initialized)
          ) {
            for (var i = 0; i < e.hierarchy.length; i++) {
              for (var r = 0; r < e.hierarchy[i].keys.length; r++)
                if (
                  (0 > e.hierarchy[i].keys[r].time &&
                    (e.hierarchy[i].keys[r].time = 0),
                  void 0 !== e.hierarchy[i].keys[r].rot &&
                    !(e.hierarchy[i].keys[r].rot instanceof THREE.Quaternion))
                ) {
                  var n = e.hierarchy[i].keys[r].rot;
                  e.hierarchy[i].keys[r].rot = new THREE.Quaternion(
                    n[0],
                    n[1],
                    n[2],
                    n[3]
                  );
                }
              if (
                e.hierarchy[i].keys.length &&
                void 0 !== e.hierarchy[i].keys[0].morphTargets
              ) {
                for (r = 0, n = {}; r < e.hierarchy[i].keys.length; r++)
                  for (
                    var o = 0;
                    o < e.hierarchy[i].keys[r].morphTargets.length;
                    o++
                  ) {
                    var a = e.hierarchy[i].keys[r].morphTargets[o];
                    n[a] = -1;
                  }
                for (
                  r = 0, e.hierarchy[i].usedMorphTargets = n;
                  r < e.hierarchy[i].keys.length;
                  r++
                ) {
                  var s = {};
                  for (a in n) {
                    for (
                      o = 0;
                      o < e.hierarchy[i].keys[r].morphTargets.length;
                      o++
                    )
                      if (e.hierarchy[i].keys[r].morphTargets[o] === a) {
                        s[a] = e.hierarchy[i].keys[r].morphTargetsInfluences[o];
                        break;
                      }
                    o === e.hierarchy[i].keys[r].morphTargets.length &&
                      (s[a] = 0);
                  }
                  e.hierarchy[i].keys[r].morphTargetsInfluences = s;
                }
              }
              for (r = 1; r < e.hierarchy[i].keys.length; r++)
                e.hierarchy[i].keys[r].time ===
                  e.hierarchy[i].keys[r - 1].time &&
                  (e.hierarchy[i].keys.splice(r, 1), r--);
              for (r = 0; r < e.hierarchy[i].keys.length; r++)
                e.hierarchy[i].keys[r].index = r;
            }
            for (
              i = 0,
                r = parseInt(e.length * e.fps, 10),
                e.JIT = {},
                e.JIT.hierarchy = [];
              i < e.hierarchy.length;
              i++
            )
              e.JIT.hierarchy.push(Array(r));
            e.initialized = !0;
          }
        },
        get: function (e) {
          if ("string" == typeof e)
            return t[e]
              ? t[e]
              : (console.log(
                  "THREE.AnimationHandler.get: Couldn't find animation " + e
                ),
                null);
        },
        parse: function (e) {
          var t = [];
          if (e instanceof THREE.SkinnedMesh)
            for (var i = 0; i < e.bones.length; i++) t.push(e.bones[i]);
          else r(e, t);
          return t;
        },
      },
      r = function (e, t) {
        t.push(e);
        for (var i = 0; i < e.children.length; i++) r(e.children[i], t);
      };
    return (i.LINEAR = 0), (i.CATMULLROM = 1), (i.CATMULLROM_FORWARD = 2), i;
  })()),
  (THREE.Animation = function (e, t, i) {
    (this.root = e),
      (this.data = THREE.AnimationHandler.get(t)),
      (this.hierarchy = THREE.AnimationHandler.parse(e)),
      (this.currentTime = 0),
      (this.timeScale = 1),
      (this.isPlaying = !1),
      (this.loop = this.isPaused = !0),
      (this.interpolationType =
        void 0 !== i ? i : THREE.AnimationHandler.LINEAR),
      (this.points = []),
      (this.target = new THREE.Vector3());
  }),
  (THREE.Animation.prototype.play = function (e, t) {
    if (!1 === this.isPlaying) {
      (this.isPlaying = !0),
        (this.loop = void 0 === e || e),
        (this.currentTime = void 0 !== t ? t : 0);
      var i,
        r,
        n = this.hierarchy.length;
      for (i = 0; i < n; i++) {
        (r = this.hierarchy[i]),
          this.interpolationType !==
            THREE.AnimationHandler.CATMULLROM_FORWARD && (r.useQuaternion = !0),
          (r.matrixAutoUpdate = !0),
          void 0 === r.animationCache &&
            ((r.animationCache = {}),
            (r.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 }),
            (r.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 }),
            (r.animationCache.originalMatrix =
              r instanceof THREE.Bone ? r.skinMatrix : r.matrix));
        var o = r.animationCache.prevKey;
        (r = r.animationCache.nextKey),
          (o.pos = this.data.hierarchy[i].keys[0]),
          (o.rot = this.data.hierarchy[i].keys[0]),
          (o.scl = this.data.hierarchy[i].keys[0]),
          (r.pos = this.getNextKeyWith("pos", i, 1)),
          (r.rot = this.getNextKeyWith("rot", i, 1)),
          (r.scl = this.getNextKeyWith("scl", i, 1));
      }
      this.update(0);
    }
    (this.isPaused = !1), THREE.AnimationHandler.addToUpdate(this);
  }),
  (THREE.Animation.prototype.pause = function () {
    !0 === this.isPaused
      ? THREE.AnimationHandler.addToUpdate(this)
      : THREE.AnimationHandler.removeFromUpdate(this),
      (this.isPaused = !this.isPaused);
  }),
  (THREE.Animation.prototype.stop = function () {
    (this.isPaused = this.isPlaying = !1),
      THREE.AnimationHandler.removeFromUpdate(this);
  }),
  (THREE.Animation.prototype.update = function (e) {
    if (!1 !== this.isPlaying) {
      var t,
        i,
        r,
        n,
        o,
        a,
        s,
        h,
        l,
        c = ["pos", "rot", "scl"];
      (l = this.currentTime += e * this.timeScale),
        parseInt(
          Math.min(
            (h = this.currentTime %= this.data.length) * this.data.fps,
            this.data.length * this.data.fps
          ),
          10
        );
      for (var p = 0, u = this.hierarchy.length; p < u; p++) {
        s = (e = this.hierarchy[p]).animationCache;
        for (var E = 0; 3 > E; E++) {
          if (((t = c[E]), (o = s.prevKey[t]), (a = s.nextKey[t]).time <= l)) {
            if (h < l) {
              if (this.loop)
                for (
                  o = this.data.hierarchy[p].keys[0],
                    a = this.getNextKeyWith(t, p, 1);
                  a.time < h;

                )
                  (o = a), (a = this.getNextKeyWith(t, p, a.index + 1));
              else {
                this.stop();
                return;
              }
            } else
              do (o = a), (a = this.getNextKeyWith(t, p, a.index + 1));
              while (a.time < h);
            (s.prevKey[t] = o), (s.nextKey[t] = a);
          }
          (e.matrixAutoUpdate = !0),
            (e.matrixWorldNeedsUpdate = !0),
            (i = (h - o.time) / (a.time - o.time)),
            (r = o[t]),
            (n = a[t]),
            (0 > i || 1 < i) &&
              (console.log(
                "THREE.Animation.update: Warning! Scale out of bounds:" +
                  i +
                  " on bone " +
                  p
              ),
              (i = 0 > i ? 0 : 1)),
            "pos" === t
              ? ((t = e.position),
                this.interpolationType === THREE.AnimationHandler.LINEAR)
                ? ((t.x = r[0] + (n[0] - r[0]) * i),
                  (t.y = r[1] + (n[1] - r[1]) * i),
                  (t.z = r[2] + (n[2] - r[2]) * i))
                : (this.interpolationType ===
                    THREE.AnimationHandler.CATMULLROM ||
                    this.interpolationType ===
                      THREE.AnimationHandler.CATMULLROM_FORWARD) &&
                  ((this.points[0] = this.getPrevKeyWith(
                    "pos",
                    p,
                    o.index - 1
                  ).pos),
                  (this.points[1] = r),
                  (this.points[2] = n),
                  (this.points[3] = this.getNextKeyWith(
                    "pos",
                    p,
                    a.index + 1
                  ).pos),
                  (i = 0.33 * i + 0.33),
                  (r = this.interpolateCatmullRom(this.points, i)),
                  (t.x = r[0]),
                  (t.y = r[1]),
                  (t.z = r[2]),
                  this.interpolationType ===
                    THREE.AnimationHandler.CATMULLROM_FORWARD &&
                    ((i = this.interpolateCatmullRom(this.points, 1.01 * i)),
                    this.target.set(i[0], i[1], i[2]),
                    this.target.sub(t),
                    (this.target.y = 0),
                    this.target.normalize(),
                    (i = Math.atan2(this.target.x, this.target.z)),
                    e.rotation.set(0, i, 0)))
              : "rot" === t
              ? THREE.Quaternion.slerp(r, n, e.quaternion, i)
              : "scl" === t &&
                (((t = e.scale).x = r[0] + (n[0] - r[0]) * i),
                (t.y = r[1] + (n[1] - r[1]) * i),
                (t.z = r[2] + (n[2] - r[2]) * i));
        }
      }
    }
  }),
  (THREE.Animation.prototype.interpolateCatmullRom = function (e, t) {
    var i,
      r,
      n,
      o,
      a,
      s,
      h = [],
      l = [];
    return (
      (r = Math.floor((i = (e.length - 1) * t))),
      (i -= r),
      (h[0] = 0 === r ? r : r - 1),
      (h[1] = r),
      (h[2] = r > e.length - 2 ? r : r + 1),
      (h[3] = r > e.length - 3 ? r : r + 2),
      (r = e[h[0]]),
      (o = e[h[1]]),
      (a = e[h[2]]),
      (s = e[h[3]]),
      (h = i * i),
      (n = i * h),
      (l[0] = this.interpolate(r[0], o[0], a[0], s[0], i, h, n)),
      (l[1] = this.interpolate(r[1], o[1], a[1], s[1], i, h, n)),
      (l[2] = this.interpolate(r[2], o[2], a[2], s[2], i, h, n)),
      l
    );
  }),
  (THREE.Animation.prototype.interpolate = function (e, t, i, r, n, o, a) {
    return (
      (e = 0.5 * (i - e)),
      (r = 0.5 * (r - t)),
      (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * o + e * n + t
    );
  }),
  (THREE.Animation.prototype.getNextKeyWith = function (e, t, i) {
    for (
      var r = this.data.hierarchy[t].keys,
        i =
          this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
          this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
            ? i < r.length - 1
              ? i
              : r.length - 1
            : i % r.length;
      i < r.length;
      i++
    )
      if (void 0 !== r[i][e]) return r[i];
    return this.data.hierarchy[t].keys[0];
  }),
  (THREE.Animation.prototype.getPrevKeyWith = function (e, t, i) {
    for (
      var r = this.data.hierarchy[t].keys,
        i =
          this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
          this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
            ? 0 < i
              ? i
              : 0
            : 0 <= i
            ? i
            : i + r.length;
      0 <= i;
      i--
    )
      if (void 0 !== r[i][e]) return r[i];
    return this.data.hierarchy[t].keys[r.length - 1];
  }),
  (THREE.KeyFrameAnimation = function (e, t, i) {
    for (
      this.root = e,
        this.data = THREE.AnimationHandler.get(t),
        this.hierarchy = THREE.AnimationHandler.parse(e),
        this.currentTime = 0,
        this.timeScale = 0.001,
        this.isPlaying = !1,
        this.loop = this.isPaused = !0,
        this.JITCompile = void 0 === i || i,
        e = 0,
        t = this.hierarchy.length;
      e < t;
      e++
    ) {
      var i = this.data.hierarchy[e].sids,
        r = this.hierarchy[e];
      if (this.data.hierarchy[e].keys.length && i) {
        for (var n = 0; n < i.length; n++) {
          var o = i[n],
            a = this.getNextKeyWith(o, e, 0);
          a && a.apply(o);
        }
        (r.matrixAutoUpdate = !1),
          this.data.hierarchy[e].node.updateMatrix(),
          (r.matrixWorldNeedsUpdate = !0);
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.play = function (e, t) {
    if (!this.isPlaying) {
      (this.isPlaying = !0),
        (this.loop = void 0 === e || e),
        (this.currentTime = void 0 !== t ? t : 0),
        (this.startTimeMs = t),
        (this.startTime = 1e7),
        (this.endTime = -this.startTime);
      var i,
        r,
        n,
        o = this.hierarchy.length;
      for (i = 0; i < o; i++)
        (r = this.hierarchy[i]),
          (n = this.data.hierarchy[i]),
          (r.useQuaternion = !0),
          void 0 === n.animationCache &&
            ((n.animationCache = {}),
            (n.animationCache.prevKey = null),
            (n.animationCache.nextKey = null),
            (n.animationCache.originalMatrix =
              r instanceof THREE.Bone ? r.skinMatrix : r.matrix)),
          (r = this.data.hierarchy[i].keys).length &&
            ((n.animationCache.prevKey = r[0]),
            (n.animationCache.nextKey = r[1]),
            (this.startTime = Math.min(r[0].time, this.startTime)),
            (this.endTime = Math.max(r[r.length - 1].time, this.endTime)));
      this.update(0);
    }
    (this.isPaused = !1), THREE.AnimationHandler.addToUpdate(this);
  }),
  (THREE.KeyFrameAnimation.prototype.pause = function () {
    this.isPaused
      ? THREE.AnimationHandler.addToUpdate(this)
      : THREE.AnimationHandler.removeFromUpdate(this),
      (this.isPaused = !this.isPaused);
  }),
  (THREE.KeyFrameAnimation.prototype.stop = function () {
    (this.isPaused = this.isPlaying = !1),
      THREE.AnimationHandler.removeFromUpdate(this);
    for (var e = 0; e < this.data.hierarchy.length; e++) {
      var t = this.hierarchy[e],
        i = this.data.hierarchy[e];
      if (void 0 !== i.animationCache) {
        var r = i.animationCache.originalMatrix;
        t instanceof THREE.Bone
          ? (r.copy(t.skinMatrix), (t.skinMatrix = r))
          : (r.copy(t.matrix), (t.matrix = r)),
          delete i.animationCache;
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.update = function (e) {
    if (this.isPlaying) {
      var t,
        i,
        r,
        n,
        o,
        a,
        s,
        h = this.data.JIT.hierarchy;
      if (
        ((a = this.currentTime += e * this.timeScale),
        (o = this.currentTime %= this.data.length) < this.startTimeMs &&
          (o = this.currentTime = this.startTimeMs + o),
        (n = parseInt(
          Math.min(o * this.data.fps, this.data.length * this.data.fps),
          10
        )),
        (s = o < a) && !this.loop)
      ) {
        for (var e = 0, l = this.hierarchy.length; e < l; e++) {
          var c = this.data.hierarchy[e].keys,
            h = this.data.hierarchy[e].sids;
          if (((r = c.length - 1), (n = this.hierarchy[e]), c.length)) {
            for (c = 0; c < h.length; c++)
              (o = h[c]), (a = this.getPrevKeyWith(o, e, r)) && a.apply(o);
            this.data.hierarchy[e].node.updateMatrix(),
              (n.matrixWorldNeedsUpdate = !0);
          }
        }
        this.stop();
      } else if (!(o < this.startTime)) {
        for (e = 0, l = this.hierarchy.length; e < l; e++) {
          r = this.hierarchy[e];
          var c = (t = this.data.hierarchy[e]).keys,
            p = t.animationCache;
          if (this.JITCompile && void 0 !== h[e][n])
            r instanceof THREE.Bone
              ? ((r.skinMatrix = h[e][n]), (r.matrixWorldNeedsUpdate = !1))
              : ((r.matrix = h[e][n]), (r.matrixWorldNeedsUpdate = !0));
          else if (c.length) {
            if (
              (this.JITCompile &&
                p &&
                (r instanceof THREE.Bone
                  ? (r.skinMatrix = p.originalMatrix)
                  : (r.matrix = p.originalMatrix)),
              (t = p.prevKey),
              (i = p.nextKey),
              t && i)
            ) {
              if (i.time <= a) {
                if (s && this.loop)
                  for (t = c[0], i = c[1]; i.time < o; )
                    i = c[(t = i).index + 1];
                else if (!s)
                  for (var u = c.length - 1; i.time < o && i.index !== u; )
                    i = c[(t = i).index + 1];
                (p.prevKey = t), (p.nextKey = i);
              }
              i.time >= o ? t.interpolate(i, o) : t.interpolate(i, i.time);
            }
            this.data.hierarchy[e].node.updateMatrix(),
              (r.matrixWorldNeedsUpdate = !0);
          }
        }
        if (this.JITCompile && void 0 === h[0][n])
          for (
            this.hierarchy[0].updateMatrixWorld(!0), e = 0;
            e < this.hierarchy.length;
            e++
          )
            h[e][n] =
              this.hierarchy[e] instanceof THREE.Bone
                ? this.hierarchy[e].skinMatrix.clone()
                : this.hierarchy[e].matrix.clone();
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (e, t, i) {
    for (i %= (t = this.data.hierarchy[t].keys).length; i < t.length; i++)
      if (t[i].hasTarget(e)) return t[i];
    return t[0];
  }),
  (THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (e, t, i) {
    for (
      t = this.data.hierarchy[t].keys, i = 0 <= i ? i : i + t.length;
      0 <= i;
      i--
    )
      if (t[i].hasTarget(e)) return t[i];
    return t[t.length - 1];
  }),
  (THREE.CubeCamera = function (e, t, i) {
    THREE.Object3D.call(this);
    var r = new THREE.PerspectiveCamera(90, 1, e, t);
    r.up.set(0, -1, 0), r.lookAt(new THREE.Vector3(1, 0, 0)), this.add(r);
    var n = new THREE.PerspectiveCamera(90, 1, e, t);
    n.up.set(0, -1, 0), n.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(n);
    var o = new THREE.PerspectiveCamera(90, 1, e, t);
    o.up.set(0, 0, 1), o.lookAt(new THREE.Vector3(0, 1, 0)), this.add(o);
    var a = new THREE.PerspectiveCamera(90, 1, e, t);
    a.up.set(0, 0, -1), a.lookAt(new THREE.Vector3(0, -1, 0)), this.add(a);
    var s = new THREE.PerspectiveCamera(90, 1, e, t);
    s.up.set(0, -1, 0), s.lookAt(new THREE.Vector3(0, 0, 1)), this.add(s);
    var h = new THREE.PerspectiveCamera(90, 1, e, t);
    h.up.set(0, -1, 0),
      h.lookAt(new THREE.Vector3(0, 0, -1)),
      this.add(h),
      (this.renderTarget = new THREE.WebGLRenderTargetCube(i, i, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter,
      })),
      (this.updateCubeMap = function (e, t) {
        var i = this.renderTarget,
          l = i.generateMipmaps;
        (i.generateMipmaps = !1),
          (i.activeCubeFace = 0),
          e.render(t, r, i),
          (i.activeCubeFace = 1),
          e.render(t, n, i),
          (i.activeCubeFace = 2),
          e.render(t, o, i),
          (i.activeCubeFace = 3),
          e.render(t, a, i),
          (i.activeCubeFace = 4),
          e.render(t, s, i),
          (i.generateMipmaps = l),
          (i.activeCubeFace = 5),
          e.render(t, h, i);
      });
  }),
  (THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.CombinedCamera = function (e, t, i, r, n, o, a) {
    THREE.Camera.call(this),
      (this.fov = i),
      (this.left = -e / 2),
      (this.right = e / 2),
      (this.top = t / 2),
      (this.bottom = -t / 2),
      (this.cameraO = new THREE.OrthographicCamera(
        -(e / 2),
        e / 2,
        t / 2,
        -(t / 2),
        o,
        a
      )),
      (this.cameraP = new THREE.PerspectiveCamera(i, e / t, r, n)),
      (this.zoom = 1),
      this.toPerspective();
  }),
  (THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.CombinedCamera.prototype.toPerspective = function () {
    (this.near = this.cameraP.near),
      (this.far = this.cameraP.far),
      (this.cameraP.fov = this.fov / this.zoom),
      this.cameraP.updateProjectionMatrix(),
      (this.projectionMatrix = this.cameraP.projectionMatrix),
      (this.inPerspectiveMode = !0),
      (this.inOrthographicMode = !1);
  }),
  (THREE.CombinedCamera.prototype.toOrthographic = function () {
    var e = this.cameraP.aspect,
      t = (this.cameraP.near + this.cameraP.far) / 2,
      t = Math.tan(this.fov / 2) * t,
      e = (2 * t * e) / 2,
      t = t / this.zoom,
      e = e / this.zoom;
    (this.cameraO.left = -e),
      (this.cameraO.right = e),
      (this.cameraO.top = t),
      (this.cameraO.bottom = -t),
      this.cameraO.updateProjectionMatrix(),
      (this.near = this.cameraO.near),
      (this.far = this.cameraO.far),
      (this.projectionMatrix = this.cameraO.projectionMatrix),
      (this.inPerspectiveMode = !1),
      (this.inOrthographicMode = !0);
  }),
  (THREE.CombinedCamera.prototype.setSize = function (e, t) {
    (this.cameraP.aspect = e / t),
      (this.left = -e / 2),
      (this.right = e / 2),
      (this.top = t / 2),
      (this.bottom = -t / 2);
  }),
  (THREE.CombinedCamera.prototype.setFov = function (e) {
    (this.fov = e),
      this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
  }),
  (THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
    this.inPerspectiveMode
      ? this.toPerspective()
      : (this.toPerspective(), this.toOrthographic());
  }),
  (THREE.CombinedCamera.prototype.setLens = function (e, t) {
    void 0 === t && (t = 24);
    var i = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * e)));
    return this.setFov(i), i;
  }),
  (THREE.CombinedCamera.prototype.setZoom = function (e) {
    (this.zoom = e),
      this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
  }),
  (THREE.CombinedCamera.prototype.toFrontView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toBackView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = Math.PI),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toLeftView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = -Math.PI / 2),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toRightView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = Math.PI / 2),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toTopView = function () {
    (this.rotation.x = -Math.PI / 2),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toBottomView = function () {
    (this.rotation.x = Math.PI / 2),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CircleGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this);
    var n,
      e = e || 50,
      i = void 0 !== i ? i : 0,
      r = void 0 !== r ? r : 2 * Math.PI,
      t = void 0 !== t ? Math.max(3, t) : 8,
      o = [];
    n = new THREE.Vector3();
    var a = new THREE.Vector2(0.5, 0.5);
    for (this.vertices.push(n), o.push(a), n = 0; n <= t; n++) {
      var s = new THREE.Vector3(),
        h = i + (n / t) * r;
      (s.x = e * Math.cos(h)),
        (s.y = e * Math.sin(h)),
        this.vertices.push(s),
        o.push(new THREE.Vector2((s.x / e + 1) / 2, (s.y / e + 1) / 2));
    }
    for (n = 1, i = new THREE.Vector3(0, 0, 1); n <= t; n++)
      this.faces.push(new THREE.Face3(n, n + 1, 0, [i, i, i])),
        this.faceVertexUvs[0].push([o[n], o[n + 1], a]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), e));
  }),
  (THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.CubeGeometry = function (e, t, i, r, n, o) {
    function a(e, t, i, r, n, o, a, h) {
      var l,
        c = s.widthSegments,
        p = s.heightSegments,
        u = n / 2,
        E = o / 2,
        f = s.vertices.length;
      ("x" === e && "y" === t) || ("y" === e && "x" === t)
        ? (l = "z")
        : ("x" === e && "z" === t) || ("z" === e && "x" === t)
        ? ((l = "y"), (p = s.depthSegments))
        : (("z" === e && "y" === t) || ("y" === e && "z" === t)) &&
          ((l = "x"), (c = s.depthSegments));
      var d = c + 1,
        m = p + 1,
        g = n / c,
        T = o / p,
        v = new THREE.Vector3();
      for (n = 0, v[l] = 0 < a ? 1 : -1; n < m; n++)
        for (o = 0; o < d; o++) {
          var $ = new THREE.Vector3();
          ($[e] = (o * g - u) * i),
            ($[t] = (n * T - E) * r),
            ($[l] = a),
            s.vertices.push($);
        }
      for (n = 0; n < p; n++)
        for (o = 0; o < c; o++)
          (e = new THREE.Face4(
            o + d * n + f,
            o + d * (n + 1) + f,
            o + 1 + d * (n + 1) + f,
            o + 1 + d * n + f
          )).normal.copy(v),
            e.vertexNormals.push(v.clone(), v.clone(), v.clone(), v.clone()),
            (e.materialIndex = h),
            s.faces.push(e),
            s.faceVertexUvs[0].push([
              new THREE.Vector2(o / c, 1 - n / p),
              new THREE.Vector2(o / c, 1 - (n + 1) / p),
              new THREE.Vector2((o + 1) / c, 1 - (n + 1) / p),
              new THREE.Vector2((o + 1) / c, 1 - n / p),
            ]);
    }
    THREE.Geometry.call(this);
    var s = this;
    (this.width = e),
      (this.height = t),
      (this.depth = i),
      (this.widthSegments = r || 1),
      (this.heightSegments = n || 1),
      (this.depthSegments = o || 1),
      (e = this.width / 2),
      (t = this.height / 2),
      (i = this.depth / 2),
      a("z", "y", -1, -1, this.depth, this.height, e, 0),
      a("z", "y", 1, -1, this.depth, this.height, -e, 1),
      a("x", "z", 1, 1, this.width, this.depth, t, 2),
      a("x", "z", 1, -1, this.width, this.depth, -t, 3),
      a("x", "y", 1, -1, this.width, this.height, i, 4),
      a("x", "y", -1, -1, this.width, this.height, -i, 5),
      this.computeCentroids(),
      this.mergeVertices();
  }),
  (THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.CylinderGeometry = function (e, t, i, r, n, o) {
    THREE.Geometry.call(this),
      (this.radiusTop = e = void 0 !== e ? e : 20),
      (this.radiusBottom = t = void 0 !== t ? t : 20),
      (this.height = i = void 0 !== i ? i : 100),
      (this.radiusSegments = r = r || 8),
      (this.heightSegments = n = n || 1),
      (this.openEnded = o = void 0 !== o && o);
    var a,
      s,
      h = i / 2,
      l = [],
      c = [];
    for (s = 0; s <= n; s++) {
      var p = [],
        u = [],
        E = s / n,
        f = E * (t - e) + e;
      for (a = 0; a <= r; a++) {
        var d = a / r,
          m = new THREE.Vector3();
        (m.x = f * Math.sin(2 * d * Math.PI)),
          (m.y = -E * i + h),
          (m.z = f * Math.cos(2 * d * Math.PI)),
          this.vertices.push(m),
          p.push(this.vertices.length - 1),
          u.push(new THREE.Vector2(d, 1 - E));
      }
      l.push(p), c.push(u);
    }
    for (a = 0, i = (t - e) / i; a < r; a++)
      for (
        0 !== e
          ? ((p = this.vertices[l[0][a]].clone()),
            (u = this.vertices[l[0][a + 1]].clone()))
          : ((p = this.vertices[l[1][a]].clone()),
            (u = this.vertices[l[1][a + 1]].clone())),
          p.setY(Math.sqrt(p.x * p.x + p.z * p.z) * i).normalize(),
          u.setY(Math.sqrt(u.x * u.x + u.z * u.z) * i).normalize(),
          s = 0;
        s < n;
        s++
      ) {
        var E = l[s][a],
          f = l[s + 1][a],
          d = l[s + 1][a + 1],
          m = l[s][a + 1],
          g = p.clone(),
          T = p.clone(),
          v = u.clone(),
          $ = u.clone(),
          y = c[s][a].clone(),
          R = c[s + 1][a].clone(),
          x = c[s + 1][a + 1].clone(),
          H = c[s][a + 1].clone();
        this.faces.push(new THREE.Face4(E, f, d, m, [g, T, v, $])),
          this.faceVertexUvs[0].push([y, R, x, H]);
      }
    if (!1 === o && 0 < e)
      for (this.vertices.push(new THREE.Vector3(0, h, 0)), a = 0; a < r; a++)
        (E = l[0][a]),
          (f = l[0][a + 1]),
          (d = this.vertices.length - 1),
          (g = new THREE.Vector3(0, 1, 0)),
          (T = new THREE.Vector3(0, 1, 0)),
          (v = new THREE.Vector3(0, 1, 0)),
          (y = c[0][a].clone()),
          (R = c[0][a + 1].clone()),
          (x = new THREE.Vector2(R.u, 0)),
          this.faces.push(new THREE.Face3(E, f, d, [g, T, v])),
          this.faceVertexUvs[0].push([y, R, x]);
    if (!1 === o && 0 < t)
      for (this.vertices.push(new THREE.Vector3(0, -h, 0)), a = 0; a < r; a++)
        (E = l[s][a + 1]),
          (f = l[s][a]),
          (d = this.vertices.length - 1),
          (g = new THREE.Vector3(0, -1, 0)),
          (T = new THREE.Vector3(0, -1, 0)),
          (v = new THREE.Vector3(0, -1, 0)),
          (y = c[s][a + 1].clone()),
          (R = c[s][a].clone()),
          (x = new THREE.Vector2(R.u, 1)),
          this.faces.push(new THREE.Face3(E, f, d, [g, T, v])),
          this.faceVertexUvs[0].push([y, R, x]);
    this.computeCentroids(), this.computeFaceNormals();
  }),
  (THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.ExtrudeGeometry = function (e, t) {
    void 0 !== e &&
      (THREE.Geometry.call(this),
      (e = e instanceof Array ? e : [e]),
      (this.shapebb = e[e.length - 1].getBoundingBox()),
      this.addShapeList(e, t),
      this.computeCentroids(),
      this.computeFaceNormals());
  }),
  (THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.ExtrudeGeometry.prototype.addShapeList = function (e, t) {
    for (var i = e.length, r = 0; r < i; r++) this.addShape(e[r], t);
  }),
  (THREE.ExtrudeGeometry.prototype.addShape = function (e, t) {
    function i(e, t, i) {
      return t || console.log("die"), t.clone().multiplyScalar(i).add(e);
    }
    function r(e, t, i) {
      var r = THREE.ExtrudeGeometry.__v1,
        n = THREE.ExtrudeGeometry.__v2,
        o = THREE.ExtrudeGeometry.__v3,
        a = THREE.ExtrudeGeometry.__v4,
        s = THREE.ExtrudeGeometry.__v5,
        h = THREE.ExtrudeGeometry.__v6;
      return (r.set(e.x - t.x, e.y - t.y),
      n.set(e.x - i.x, e.y - i.y),
      (r = r.normalize()),
      (n = n.normalize()),
      o.set(-r.y, r.x),
      a.set(n.y, -n.x),
      s.copy(e).add(o),
      h.copy(e).add(a),
      s.equals(h))
        ? a.clone()
        : (s.copy(t).add(o),
          h.copy(i).add(a),
          (o = r.dot(a)),
          (a = h.sub(s).dot(a)),
          0 === o &&
            (console.log("Either infinite or no solutions!"),
            0 === a
              ? console.log("Its finite solutions.")
              : console.log("Too bad, no solutions.")),
          0 > (a /= o)
            ? ((t = Math.atan2(t.y - e.y, t.x - e.x)) >
                (e = Math.atan2(i.y - e.y, i.x - e.x)) && (e += 2 * Math.PI),
              (e = -Math.cos((i = (t + e) / 2))),
              (i = -Math.sin(i)),
              new THREE.Vector2(e, i))
            : r.multiplyScalar(a).add(s).sub(e).clone());
    }
    function n(i, r) {
      var n, o;
      for (z = i.length; 0 <= --z; ) {
        (n = z), 0 > (o = z - 1) && (o = i.length - 1);
        for (var a = 0, s = T + 2 * d, a = 0; a < s; a++) {
          var h = F * a,
            l = F * (a + 1),
            c = r + n + h,
            h = r + o + h,
            p = r + o + l,
            l = r + n + l,
            u = i,
            E = a,
            f = s,
            m = n,
            g = o,
            c = c + b,
            h = h + b,
            p = p + b,
            l = l + b;
          S.faces.push(new THREE.Face4(c, h, p, l, null, null, R)),
            (c = x.generateSideWallUV(S, e, u, t, c, h, p, l, E, f, m, g)),
            S.faceVertexUvs[0].push(c);
        }
      }
    }
    function o(e, t, i) {
      S.vertices.push(new THREE.Vector3(e, t, i));
    }
    function a(i, r, n, o) {
      (i += b),
        (r += b),
        (n += b),
        S.faces.push(new THREE.Face3(i, r, n, null, null, y)),
        (i = o
          ? x.generateBottomUV(S, e, t, i, r, n)
          : x.generateTopUV(S, e, t, i, r, n)),
        S.faceVertexUvs[0].push(i);
    }
    var s,
      h,
      l,
      c,
      p,
      u = void 0 !== t.amount ? t.amount : 100,
      E = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
      f = void 0 !== t.bevelSize ? t.bevelSize : E - 2,
      d = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
      m = void 0 === t.bevelEnabled || t.bevelEnabled,
      g = void 0 !== t.curveSegments ? t.curveSegments : 12,
      T = void 0 !== t.steps ? t.steps : 1,
      v = t.extrudePath,
      $ = !1,
      y = t.material,
      R = t.extrudeMaterial,
      x =
        void 0 !== t.UVGenerator
          ? t.UVGenerator
          : THREE.ExtrudeGeometry.WorldUVGenerator;
    v &&
      ((s = v.getSpacedPoints(T)),
      ($ = !0),
      (m = !1),
      (h =
        void 0 !== t.frames
          ? t.frames
          : new THREE.TubeGeometry.FrenetFrames(v, T, !1)),
      (l = new THREE.Vector3()),
      (c = new THREE.Vector3()),
      (p = new THREE.Vector3())),
      m || (f = E = d = 0);
    var H,
      _,
      w,
      S = this,
      b = this.vertices.length,
      g = e.extractPoints(g),
      M = g.shape,
      g = g.holes;
    if ((v = !THREE.Shape.Utils.isClockWise(M))) {
      for (M = M.reverse(), _ = 0, w = g.length; _ < w; _++)
        (H = g[_]), THREE.Shape.Utils.isClockWise(H) && (g[_] = H.reverse());
      v = !1;
    }
    var C = THREE.Shape.Utils.triangulateShape(M, g),
      v = M;
    for (_ = 0, w = g.length; _ < w; _++) (H = g[_]), (M = M.concat(H));
    var A,
      L,
      P,
      D,
      F = M.length,
      U = C.length,
      V = [],
      z = 0,
      N = v.length;
    for (A = N - 1, L = z + 1; z < N; z++, A++, L++)
      A === N && (A = 0), L === N && (L = 0), (V[z] = r(v[z], v[A], v[L]));
    var B,
      I = [],
      O = V.concat();
    for (_ = 0, w = g.length; _ < w; _++) {
      for (
        H = g[_], B = [], z = 0, A = (N = H.length) - 1, L = z + 1;
        z < N;
        z++, A++, L++
      )
        A === N && (A = 0), L === N && (L = 0), (B[z] = r(H[z], H[A], H[L]));
      I.push(B), (O = O.concat(B));
    }
    for (A = 0; A < d; A++) {
      for (
        P = E * (1 - (H = A / d)),
          L = f * Math.sin((H * Math.PI) / 2),
          z = 0,
          N = v.length;
        z < N;
        z++
      )
        o((D = i(v[z], V[z], L)).x, D.y, -P);
      for (_ = 0, w = g.length; _ < w; _++)
        for (H = g[_], B = I[_], z = 0, N = H.length; z < N; z++)
          o((D = i(H[z], B[z], L)).x, D.y, -P);
    }
    for (z = 0, L = f; z < F; z++)
      (D = m ? i(M[z], O[z], L) : M[z]),
        $
          ? (c.copy(h.normals[0]).multiplyScalar(D.x),
            l.copy(h.binormals[0]).multiplyScalar(D.y),
            p.copy(s[0]).add(c).add(l),
            o(p.x, p.y, p.z))
          : o(D.x, D.y, 0);
    for (H = 1; H <= T; H++)
      for (z = 0; z < F; z++)
        (D = m ? i(M[z], O[z], L) : M[z]),
          $
            ? (c.copy(h.normals[H]).multiplyScalar(D.x),
              l.copy(h.binormals[H]).multiplyScalar(D.y),
              p.copy(s[H]).add(c).add(l),
              o(p.x, p.y, p.z))
            : o(D.x, D.y, (u / T) * H);
    for (A = d - 1; 0 <= A; A--) {
      for (
        P = E * (1 - (H = A / d)),
          L = f * Math.sin((H * Math.PI) / 2),
          z = 0,
          N = v.length;
        z < N;
        z++
      )
        o((D = i(v[z], V[z], L)).x, D.y, u + P);
      for (_ = 0, w = g.length; _ < w; _++)
        for (H = g[_], B = I[_], z = 0, N = H.length; z < N; z++)
          (D = i(H[z], B[z], L)),
            $ ? o(D.x, D.y + s[T - 1].y, s[T - 1].x + P) : o(D.x, D.y, u + P);
    }
    if (m) {
      for (z = 0, E = 0 * F; z < U; z++)
        a((u = C[z])[2] + E, u[1] + E, u[0] + E, !0);
      for (z = 0, E = F * (T + 2 * d); z < U; z++)
        a((u = C[z])[0] + E, u[1] + E, u[2] + E, !1);
    } else {
      for (z = 0; z < U; z++) a((u = C[z])[2], u[1], u[0], !0);
      for (z = 0; z < U; z++)
        a((u = C[z])[0] + F * T, u[1] + F * T, u[2] + F * T, !1);
    }
    for (n(v, (u = 0)), u += v.length, _ = 0, w = g.length; _ < w; _++)
      n((H = g[_]), u), (u += H.length);
  }),
  (THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (e, t, i, r, n, o) {
      return (
        (t = e.vertices[n].x),
        (n = e.vertices[n].y),
        (i = e.vertices[o].x),
        (o = e.vertices[o].y),
        [
          new THREE.Vector2(e.vertices[r].x, e.vertices[r].y),
          new THREE.Vector2(t, n),
          new THREE.Vector2(i, o),
        ]
      );
    },
    generateBottomUV: function (e, t, i, r, n, o) {
      return this.generateTopUV(e, t, i, r, n, o);
    },
    generateSideWallUV: function (e, t, i, r, n, o, a, s) {
      var t = e.vertices[n].x,
        i = e.vertices[n].y,
        n = e.vertices[n].z,
        r = e.vertices[o].x,
        h = e.vertices[o].y,
        o = e.vertices[o].z,
        l = e.vertices[a].x,
        c = e.vertices[a].y,
        a = e.vertices[a].z,
        p = e.vertices[s].x,
        u = e.vertices[s].y,
        e = e.vertices[s].z;
      return 0.01 > Math.abs(i - h)
        ? [
            new THREE.Vector2(t, 1 - n),
            new THREE.Vector2(r, 1 - o),
            new THREE.Vector2(l, 1 - a),
            new THREE.Vector2(p, 1 - e),
          ]
        : [
            new THREE.Vector2(i, 1 - n),
            new THREE.Vector2(h, 1 - o),
            new THREE.Vector2(c, 1 - a),
            new THREE.Vector2(u, 1 - e),
          ];
    },
  }),
  (THREE.ExtrudeGeometry.__v1 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v2 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v3 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v4 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v5 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v6 = new THREE.Vector2()),
  (THREE.ShapeGeometry = function (e, t) {
    THREE.Geometry.call(this),
      !1 == e instanceof Array && (e = [e]),
      (this.shapebb = e[e.length - 1].getBoundingBox()),
      this.addShapeList(e, t),
      this.computeCentroids(),
      this.computeFaceNormals();
  }),
  (THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.ShapeGeometry.prototype.addShapeList = function (e, t) {
    for (var i = 0, r = e.length; i < r; i++) this.addShape(e[i], t);
    return this;
  }),
  (THREE.ShapeGeometry.prototype.addShape = function (e, t) {
    void 0 === t && (t = {});
    var i,
      r,
      n,
      o = t.material,
      a =
        void 0 === t.UVGenerator
          ? THREE.ExtrudeGeometry.WorldUVGenerator
          : t.UVGenerator,
      s = this.vertices.length,
      h = (i = e.extractPoints(
        void 0 !== t.curveSegments ? t.curveSegments : 12
      )).shape,
      l = i.holes;
    if (!THREE.Shape.Utils.isClockWise(h))
      for (h = h.reverse(), i = 0, r = l.length; i < r; i++)
        (n = l[i]), THREE.Shape.Utils.isClockWise(n) && (l[i] = n.reverse());
    var c = THREE.Shape.Utils.triangulateShape(h, l);
    for (i = 0, r = l.length; i < r; i++) (n = l[i]), (h = h.concat(n));
    for (i = 0, l = h.length, r = c.length; i < l; i++)
      (n = h[i]), this.vertices.push(new THREE.Vector3(n.x, n.y, 0));
    for (i = 0; i < r; i++)
      (h = (l = c[i])[0] + s),
        (n = l[1] + s),
        (l = l[2] + s),
        this.faces.push(new THREE.Face3(h, n, l, null, null, o)),
        this.faceVertexUvs[0].push(a.generateBottomUV(this, e, t, h, n, l));
  }),
  (THREE.LatheGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this);
    for (
      var t = t || 12,
        i = i || 0,
        r = r || 2 * Math.PI,
        n = 1 / (e.length - 1),
        o = 1 / t,
        a = 0,
        s = t;
      a <= s;
      a++
    )
      for (
        var h = i + a * o * r,
          l = Math.cos(h),
          c = Math.sin(h),
          h = 0,
          p = e.length;
        h < p;
        h++
      ) {
        var u = e[h],
          E = new THREE.Vector3();
        (E.x = l * u.x - c * u.y),
          (E.y = c * u.x + l * u.y),
          (E.z = u.z),
          this.vertices.push(E);
      }
    for (i = e.length, a = 0, s = t; a < s; a++)
      for (h = 0, p = e.length - 1; h < p; h++)
        (r = t = h + i * a),
          (c = t + i),
          (l = t + 1 + i),
          this.faces.push(new THREE.Face4(r, c, l, t + 1)),
          (l = a * o),
          (t = h * n),
          (r = l + o),
          (c = t + n),
          this.faceVertexUvs[0].push([
            new THREE.Vector2(l, t),
            new THREE.Vector2(r, t),
            new THREE.Vector2(r, c),
            new THREE.Vector2(l, c),
          ]);
    this.mergeVertices(),
      this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.PlaneGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this),
      (this.width = e),
      (this.height = t),
      (this.widthSegments = i || 1),
      (this.heightSegments = r || 1);
    for (
      var i = e / 2,
        n = t / 2,
        r = this.widthSegments,
        o = this.heightSegments,
        a = r + 1,
        s = o + 1,
        h = this.width / r,
        l = this.height / o,
        c = new THREE.Vector3(0, 0, 1),
        e = 0;
      e < s;
      e++
    )
      for (t = 0; t < a; t++)
        this.vertices.push(new THREE.Vector3(t * h - i, -(e * l - n), 0));
    for (e = 0; e < o; e++)
      for (t = 0; t < r; t++)
        (i = new THREE.Face4(
          t + a * e,
          t + a * (e + 1),
          t + 1 + a * (e + 1),
          t + 1 + a * e
        )).normal.copy(c),
          i.vertexNormals.push(c.clone(), c.clone(), c.clone(), c.clone()),
          this.faces.push(i),
          this.faceVertexUvs[0].push([
            new THREE.Vector2(t / r, 1 - e / o),
            new THREE.Vector2(t / r, 1 - (e + 1) / o),
            new THREE.Vector2((t + 1) / r, 1 - (e + 1) / o),
            new THREE.Vector2((t + 1) / r, 1 - e / o),
          ]);
    this.computeCentroids();
  }),
  (THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.RingGeometry = function (e, t, i, r, n, o) {
    THREE.Geometry.call(this);
    for (
      var e = e || 0,
        t = t || 50,
        n = void 0 !== n ? n : 0,
        o = void 0 !== o ? o : 2 * Math.PI,
        i = void 0 !== i ? Math.max(3, i) : 8,
        r = void 0 !== r ? Math.max(3, r) : 8,
        a = [],
        s = e,
        h = (t - e) / r,
        e = 0;
      e <= r;
      e++
    ) {
      for (t = 0; t <= i; t++) {
        var l = new THREE.Vector3(),
          c = n + (t / i) * o;
        (l.x = s * Math.cos(c)),
          (l.y = s * Math.sin(c)),
          this.vertices.push(l),
          a.push(new THREE.Vector2((l.x / s + 1) / 2, -(l.y / s + 1) / 2 + 1));
      }
      s += h;
    }
    for (e = 0, n = new THREE.Vector3(0, 0, 1); e < r; e++)
      for (t = 0, o = e * i; t <= i; t++) {
        var c = t + o,
          h = c + e,
          l = c + i + e,
          p = c + i + 1 + e;
        this.faces.push(new THREE.Face3(h, l, p, [n, n, n])),
          this.faceVertexUvs[0].push([a[h], a[l], a[p]]),
          (h = c + e),
          (l = c + i + 1 + e),
          (p = c + 1 + e),
          this.faces.push(new THREE.Face3(h, l, p, [n, n, n])),
          this.faceVertexUvs[0].push([a[h], a[l], a[p]]);
      }
    this.computeCentroids(),
      this.computeFaceNormals(),
      (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), s));
  }),
  (THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.SphereGeometry = function (e, t, i, r, n, o, a) {
    THREE.Geometry.call(this),
      (this.radius = e = e || 50),
      (this.widthSegments = t = Math.max(3, Math.floor(t) || 8)),
      (this.heightSegments = i = Math.max(2, Math.floor(i) || 6)),
      (this.phiStart = r = void 0 !== r ? r : 0),
      (this.phiLength = n = void 0 !== n ? n : 2 * Math.PI),
      (this.thetaStart = o = void 0 !== o ? o : 0),
      (this.thetaLength = a = void 0 !== a ? a : Math.PI);
    var s,
      h,
      l = [],
      c = [];
    for (h = 0; h <= i; h++) {
      var p = [],
        u = [];
      for (s = 0; s <= t; s++) {
        var E = s / t,
          f = h / i,
          d = new THREE.Vector3();
        (d.x = -e * Math.cos(r + E * n) * Math.sin(o + f * a)),
          (d.y = e * Math.cos(o + f * a)),
          (d.z = e * Math.sin(r + E * n) * Math.sin(o + f * a)),
          this.vertices.push(d),
          p.push(this.vertices.length - 1),
          u.push(new THREE.Vector2(E, 1 - f));
      }
      l.push(p), c.push(u);
    }
    for (h = 0; h < this.heightSegments; h++)
      for (s = 0; s < this.widthSegments; s++) {
        var t = l[h][s + 1],
          i = l[h][s],
          r = l[h + 1][s],
          n = l[h + 1][s + 1],
          o = this.vertices[t].clone().normalize(),
          a = this.vertices[i].clone().normalize(),
          p = this.vertices[r].clone().normalize(),
          u = this.vertices[n].clone().normalize(),
          E = c[h][s + 1].clone(),
          f = c[h][s].clone(),
          d = c[h + 1][s].clone(),
          m = c[h + 1][s + 1].clone();
        Math.abs(this.vertices[t].y) === this.radius
          ? (this.faces.push(new THREE.Face3(t, r, n, [o, p, u])),
            this.faceVertexUvs[0].push([E, d, m]))
          : Math.abs(this.vertices[r].y) === this.radius
          ? (this.faces.push(new THREE.Face3(t, i, r, [o, a, p])),
            this.faceVertexUvs[0].push([E, f, d]))
          : (this.faces.push(new THREE.Face4(t, i, r, n, [o, a, p, u])),
            this.faceVertexUvs[0].push([E, f, d, m]));
      }
    this.computeCentroids(),
      this.computeFaceNormals(),
      (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), e));
  }),
  (THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TextGeometry = function (e, t) {
    var t = t || {},
      i = THREE.FontUtils.generateShapes(e, t);
    (t.amount = void 0 !== t.height ? t.height : 50),
      void 0 === t.bevelThickness && (t.bevelThickness = 10),
      void 0 === t.bevelSize && (t.bevelSize = 8),
      void 0 === t.bevelEnabled && (t.bevelEnabled = !1),
      THREE.ExtrudeGeometry.call(this, i, t);
  }),
  (THREE.TextGeometry.prototype = Object.create(
    THREE.ExtrudeGeometry.prototype
  )),
  (THREE.TorusGeometry = function (e, t, i, r, n) {
    for (
      THREE.Geometry.call(this),
        this.radius = e || 100,
        this.tube = t || 40,
        this.radialSegments = i || 8,
        this.tubularSegments = r || 6,
        this.arc = n || 2 * Math.PI,
        n = new THREE.Vector3(),
        e = [],
        t = [],
        i = 0;
      i <= this.radialSegments;
      i++
    )
      for (r = 0; r <= this.tubularSegments; r++) {
        var o = (r / this.tubularSegments) * this.arc,
          a = ((2 * i) / this.radialSegments) * Math.PI;
        (n.x = this.radius * Math.cos(o)), (n.y = this.radius * Math.sin(o));
        var s = new THREE.Vector3();
        (s.x = (this.radius + this.tube * Math.cos(a)) * Math.cos(o)),
          (s.y = (this.radius + this.tube * Math.cos(a)) * Math.sin(o)),
          (s.z = this.tube * Math.sin(a)),
          this.vertices.push(s),
          e.push(
            new THREE.Vector2(r / this.tubularSegments, i / this.radialSegments)
          ),
          t.push(s.clone().sub(n).normalize());
      }
    for (i = 1; i <= this.radialSegments; i++)
      for (r = 1; r <= this.tubularSegments; r++) {
        var n = (this.tubularSegments + 1) * i + r - 1,
          o = (this.tubularSegments + 1) * (i - 1) + r - 1,
          a = (this.tubularSegments + 1) * (i - 1) + r,
          s = (this.tubularSegments + 1) * i + r,
          h = new THREE.Face4(n, o, a, s, [t[n], t[o], t[a], t[s]]);
        h.normal.add(t[n]),
          h.normal.add(t[o]),
          h.normal.add(t[a]),
          h.normal.add(t[s]),
          h.normal.normalize(),
          this.faces.push(h),
          this.faceVertexUvs[0].push([
            e[n].clone(),
            e[o].clone(),
            e[a].clone(),
            e[s].clone(),
          ]);
      }
    this.computeCentroids();
  }),
  (THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TorusKnotGeometry = function (e, t, i, r, n, o, a) {
    function s(e, t, i, r, n, o) {
      var a = Math.cos(e);
      return (
        (t = Math.sin(e)),
        (e *= i / r),
        (i = Math.cos(e)),
        (a *= 0.5 * n * (2 + i)),
        (t = 0.5 * n * (2 + i) * t),
        (n = 0.5 * o * n * Math.sin(e)),
        new THREE.Vector3(a, t, n)
      );
    }
    for (
      THREE.Geometry.call(this),
        this.radius = e || 100,
        this.tube = t || 40,
        this.radialSegments = i || 64,
        this.tubularSegments = r || 8,
        this.p = n || 2,
        this.q = o || 3,
        this.heightScale = a || 1,
        this.grid = Array(this.radialSegments),
        i = new THREE.Vector3(),
        r = new THREE.Vector3(),
        n = new THREE.Vector3(),
        e = 0;
      e < this.radialSegments;
      ++e
    )
      for (
        t = 0, this.grid[e] = Array(this.tubularSegments);
        t < this.tubularSegments;
        ++t
      ) {
        var h = 2 * (e / this.radialSegments) * this.p * Math.PI,
          a = 2 * (t / this.tubularSegments) * Math.PI,
          o = s(h, a, this.q, this.p, this.radius, this.heightScale),
          h = s(h + 0.01, a, this.q, this.p, this.radius, this.heightScale);
        i.subVectors(h, o),
          r.addVectors(h, o),
          n.crossVectors(i, r),
          r.crossVectors(n, i),
          n.normalize(),
          r.normalize(),
          (h = -this.tube * Math.cos(a)),
          (a = this.tube * Math.sin(a)),
          (o.x += h * r.x + a * n.x),
          (o.y += h * r.y + a * n.y),
          (o.z += h * r.z + a * n.z),
          (this.grid[e][t] =
            this.vertices.push(new THREE.Vector3(o.x, o.y, o.z)) - 1);
      }
    for (e = 0; e < this.radialSegments; ++e)
      for (t = 0; t < this.tubularSegments; ++t) {
        var n = (e + 1) % this.radialSegments,
          o = (t + 1) % this.tubularSegments,
          i = this.grid[e][t],
          r = this.grid[n][t],
          n = this.grid[n][o],
          o = this.grid[e][o],
          a = new THREE.Vector2(
            e / this.radialSegments,
            t / this.tubularSegments
          ),
          h = new THREE.Vector2(
            (e + 1) / this.radialSegments,
            t / this.tubularSegments
          ),
          l = new THREE.Vector2(
            (e + 1) / this.radialSegments,
            (t + 1) / this.tubularSegments
          ),
          c = new THREE.Vector2(
            e / this.radialSegments,
            (t + 1) / this.tubularSegments
          );
        this.faces.push(new THREE.Face4(i, r, n, o)),
          this.faceVertexUvs[0].push([a, h, l, c]);
      }
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TubeGeometry = function (e, t, i, r, n, o) {
    THREE.Geometry.call(this),
      (this.path = e),
      (this.segments = t || 64),
      (this.radius = i || 1),
      (this.radiusSegments = r || 8),
      (this.closed = n || !1),
      o && (this.debug = new THREE.Object3D()),
      (this.grid = []);
    var a,
      s,
      h,
      l,
      c,
      p,
      u,
      E,
      n = this.segments + 1,
      o = new THREE.Vector3(),
      t = new THREE.TubeGeometry.FrenetFrames(
        this.path,
        this.segments,
        this.closed
      );
    for (
      p = t.tangents,
        u = t.normals,
        E = t.binormals,
        this.tangents = p,
        this.normals = u,
        this.binormals = E,
        t = 0;
      t < n;
      t++
    )
      for (
        this.grid[t] = [],
          r = t / (n - 1),
          c = e.getPointAt(r),
          r = p[t],
          a = u[t],
          s = E[t],
          this.debug &&
            (this.debug.add(new THREE.ArrowHelper(r, c, i, 255)),
            this.debug.add(new THREE.ArrowHelper(a, c, i, 16711680)),
            this.debug.add(new THREE.ArrowHelper(s, c, i, 65280))),
          r = 0;
        r < this.radiusSegments;
        r++
      )
        (h = 2 * (r / this.radiusSegments) * Math.PI),
          (l = -this.radius * Math.cos(h)),
          (h = this.radius * Math.sin(h)),
          o.copy(c),
          (o.x += l * a.x + h * s.x),
          (o.y += l * a.y + h * s.y),
          (o.z += l * a.z + h * s.z),
          (this.grid[t][r] =
            this.vertices.push(new THREE.Vector3(o.x, o.y, o.z)) - 1);
    for (t = 0; t < this.segments; t++)
      for (r = 0; r < this.radiusSegments; r++)
        (n = this.closed ? (t + 1) % this.segments : t + 1),
          (o = (r + 1) % this.radiusSegments),
          (e = this.grid[t][r]),
          (i = this.grid[n][r]),
          (n = this.grid[n][o]),
          (o = this.grid[t][o]),
          (p = new THREE.Vector2(t / this.segments, r / this.radiusSegments)),
          (u = new THREE.Vector2(
            (t + 1) / this.segments,
            r / this.radiusSegments
          )),
          (E = new THREE.Vector2(
            (t + 1) / this.segments,
            (r + 1) / this.radiusSegments
          )),
          (a = new THREE.Vector2(
            t / this.segments,
            (r + 1) / this.radiusSegments
          )),
          this.faces.push(new THREE.Face4(e, i, n, o)),
          this.faceVertexUvs[0].push([p, u, E, a]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TubeGeometry.FrenetFrames = function (e, t, i) {
    new THREE.Vector3();
    var r = new THREE.Vector3();
    new THREE.Vector3();
    var n,
      o,
      a,
      s = [],
      h = [],
      l = [],
      c = new THREE.Vector3(),
      p = new THREE.Matrix4(),
      t = t + 1;
    for (
      n = 0, this.tangents = s, this.normals = h, this.binormals = l;
      n < t;
      n++
    )
      (o = n / (t - 1)), (s[n] = e.getTangentAt(o)), s[n].normalize();
    for (
      h[0] = new THREE.Vector3(),
        l[0] = new THREE.Vector3(),
        e = Number.MAX_VALUE,
        n = Math.abs(s[0].x),
        o = Math.abs(s[0].y),
        a = Math.abs(s[0].z),
        n <= e && ((e = n), r.set(1, 0, 0)),
        o <= e && ((e = o), r.set(0, 1, 0)),
        a <= e && r.set(0, 0, 1),
        c.crossVectors(s[0], r).normalize(),
        h[0].crossVectors(s[0], c),
        l[0].crossVectors(s[0], h[0]),
        n = 1;
      n < t;
      n++
    )
      (h[n] = h[n - 1].clone()),
        (l[n] = l[n - 1].clone()),
        c.crossVectors(s[n - 1], s[n]),
        1e-4 < c.length() &&
          (c.normalize(),
          (r = Math.acos(s[n - 1].dot(s[n]))),
          h[n].applyMatrix4(p.makeRotationAxis(c, r))),
        l[n].crossVectors(s[n], h[n]);
    if (i)
      for (
        r = Math.acos(h[0].dot(h[t - 1])),
          r /= t - 1,
          0 < s[0].dot(c.crossVectors(h[0], h[t - 1])) && (r = -r),
          n = 1;
        n < t;
        n++
      )
        h[n].applyMatrix4(p.makeRotationAxis(s[n], r * n)),
          l[n].crossVectors(s[n], h[n]);
  }),
  (THREE.PolyhedronGeometry = function (e, t, i, r) {
    function n(e) {
      var t = e.normalize().clone();
      t.index = s.vertices.push(t) - 1;
      var i = Math.atan2(e.z, -e.x) / 2 / Math.PI + 0.5,
        e = Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z)) / Math.PI + 0.5;
      return (t.uv = new THREE.Vector2(i, 1 - e)), t;
    }
    function o(e, t, i) {
      var r = new THREE.Face3(e.index, t.index, i.index, [
        e.clone(),
        t.clone(),
        i.clone(),
      ]);
      r.centroid.add(e).add(t).add(i).divideScalar(3),
        r.normal.copy(r.centroid).normalize(),
        s.faces.push(r),
        (r = Math.atan2(r.centroid.z, -r.centroid.x)),
        s.faceVertexUvs[0].push([a(e.uv, e, r), a(t.uv, t, r), a(i.uv, i, r)]);
    }
    function a(e, t, i) {
      return (
        0 > i && 1 === e.x && (e = new THREE.Vector2(e.x - 1, e.y)),
        0 === t.x &&
          0 === t.z &&
          (e = new THREE.Vector2(i / 2 / Math.PI + 0.5, e.y)),
        e.clone()
      );
    }
    THREE.Geometry.call(this);
    for (var i = i || 1, r = r || 0, s = this, h = 0, l = e.length; h < l; h++)
      n(new THREE.Vector3(e[h][0], e[h][1], e[h][2]));
    for (var c = this.vertices, e = [], h = 0, l = t.length; h < l; h++) {
      var p = c[t[h][0]],
        u = c[t[h][1]],
        E = c[t[h][2]];
      e[h] = new THREE.Face3(p.index, u.index, E.index, [
        p.clone(),
        u.clone(),
        E.clone(),
      ]);
    }
    for (h = 0, l = e.length; h < l; h++) {
      (u = e[h]), (t = Math.pow(2, (c = r)));
      for (
        var c = n(s.vertices[u.a]),
          p = n(s.vertices[u.b]),
          f = n(s.vertices[u.c]),
          u = [],
          E = 0;
        E <= t;
        E++
      ) {
        u[E] = [];
        for (
          var d = n(c.clone().lerp(f, E / t)),
            m = n(p.clone().lerp(f, E / t)),
            g = t - E,
            T = 0;
          T <= g;
          T++
        )
          u[E][T] = 0 == T && E == t ? d : n(d.clone().lerp(m, T / g));
      }
      for (E = 0; E < t; E++)
        for (T = 0; T < 2 * (t - E) - 1; T++)
          (c = Math.floor(T / 2)),
            0 == T % 2
              ? o(u[E][c + 1], u[E + 1][c], u[E][c])
              : o(u[E][c + 1], u[E + 1][c + 1], u[E + 1][c]);
    }
    for (h = 0, l = this.faceVertexUvs[0].length; h < l; h++)
      (e = (r = this.faceVertexUvs[0][h])[0].x),
        (p = Math.max(e, Math.max((t = r[1].x), (c = r[2].x)))),
        (u = Math.min(e, Math.min(t, c))),
        0.9 < p &&
          0.1 > u &&
          (0.2 > e && (r[0].x += 1),
          0.2 > t && (r[1].x += 1),
          0.2 > c && (r[2].x += 1));
    for (this.mergeVertices(), h = 0, l = this.vertices.length; h < l; h++)
      this.vertices[h].multiplyScalar(i);
    this.computeCentroids(),
      (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), i));
  }),
  (THREE.PolyhedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.IcosahedronGeometry = function (e, t) {
    (this.radius = e), (this.detail = t);
    var i = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(
      this,
      [
        [-1, i, 0],
        [1, i, 0],
        [-1, -i, 0],
        [1, -i, 0],
        [0, -1, i],
        [0, 1, i],
        [0, -1, -i],
        [0, 1, -i],
        [i, 0, -1],
        [i, 0, 1],
        [-i, 0, -1],
        [-i, 0, 1],
      ],
      [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1],
      ],
      e,
      t
    );
  }),
  (THREE.IcosahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.OctahedronGeometry = function (e, t) {
    THREE.PolyhedronGeometry.call(
      this,
      [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ],
      [
        [0, 2, 4],
        [0, 4, 3],
        [0, 3, 5],
        [0, 5, 2],
        [1, 2, 5],
        [1, 5, 3],
        [1, 3, 4],
        [1, 4, 2],
      ],
      e,
      t
    );
  }),
  (THREE.OctahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.TetrahedronGeometry = function (e, t) {
    THREE.PolyhedronGeometry.call(
      this,
      [
        [1, 1, 1],
        [-1, -1, 1],
        [-1, 1, -1],
        [1, -1, -1],
      ],
      [
        [2, 1, 0],
        [0, 3, 2],
        [1, 3, 0],
        [2, 3, 1],
      ],
      e,
      t
    );
  }),
  (THREE.TetrahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.ParametricGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this);
    var n,
      o,
      a,
      s,
      h,
      l,
      c,
      p,
      u = this.vertices,
      E = this.faces,
      f = this.faceVertexUvs[0],
      r = void 0 !== r && r,
      d = t + 1;
    for (h = 0; h <= i; h++)
      for (l = 0, p = h / i; l <= t; l++) (c = e((c = l / t), p)), u.push(c);
    for (h = 0; h < i; h++)
      for (l = 0; l < t; l++)
        (e = h * d + l),
          (u = h * d + l + 1),
          (p = (h + 1) * d + l),
          (c = (h + 1) * d + l + 1),
          (n = new THREE.Vector2(l / t, h / i)),
          (o = new THREE.Vector2((l + 1) / t, h / i)),
          (a = new THREE.Vector2(l / t, (h + 1) / i)),
          (s = new THREE.Vector2((l + 1) / t, (h + 1) / i)),
          r
            ? (E.push(new THREE.Face3(e, u, p)),
              E.push(new THREE.Face3(u, c, p)),
              f.push([n, o, a]),
              f.push([o, s, a]))
            : (E.push(new THREE.Face4(e, u, c, p)), f.push([n, o, s, a]));
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.ParametricGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.ConvexGeometry = function (e) {
    function t(e) {
      var t = e.length();
      return new THREE.Vector2(e.x / t, e.y / t);
    }
    THREE.Geometry.call(this);
    for (
      var i = [
          [0, 1, 2],
          [0, 2, 1],
        ],
        r = 3;
      r < e.length;
      r++
    ) {
      var n = r,
        o = e[n].clone(),
        a = o.length();
      (o.x += 2e-6 * a * (Math.random() - 0.5)),
        (o.y += 2e-6 * a * (Math.random() - 0.5)),
        (o.z += 2e-6 * a * (Math.random() - 0.5));
      for (var a = [], s = 0; s < i.length; ) {
        var h,
          l = i[s],
          c = o,
          p = e[l[0]];
        h = p;
        var u = e[l[1]],
          E = e[l[2]],
          f = new THREE.Vector3(),
          d = new THREE.Vector3();
        if (
          (f.subVectors(E, u),
          d.subVectors(h, u),
          f.cross(d),
          f.normalize(),
          (p = (h = f).dot(p)),
          h.dot(c) >= p)
        ) {
          for (c = 0; 3 > c; c++) {
            for (u = 0, p = [l[c], l[(c + 1) % 3]], h = !0; u < a.length; u++)
              if (a[u][0] === p[1] && a[u][1] === p[0]) {
                (a[u] = a[a.length - 1]), a.pop(), (h = !1);
                break;
              }
            h && a.push(p);
          }
          (i[s] = i[i.length - 1]), i.pop();
        } else s++;
      }
      for (u = 0; u < a.length; u++) i.push([a[u][0], a[u][1], n]);
    }
    for (r = 0, n = 0, o = Array(e.length); r < i.length; r++)
      for (s = 0, a = i[r]; 3 > s; s++)
        void 0 === o[a[s]] && ((o[a[s]] = n++), this.vertices.push(e[a[s]])),
          (a[s] = o[a[s]]);
    for (r = 0; r < i.length; r++)
      this.faces.push(new THREE.Face3(i[r][0], i[r][1], i[r][2]));
    for (r = 0; r < this.faces.length; r++)
      (a = this.faces[r]),
        this.faceVertexUvs[0].push([
          t(this.vertices[a.a]),
          t(this.vertices[a.b]),
          t(this.vertices[a.c]),
        ]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.AxisHelper = function (e) {
    var e = e || 1,
      t = new THREE.Geometry();
    t.vertices.push(
      new THREE.Vector3(),
      new THREE.Vector3(e, 0, 0),
      new THREE.Vector3(),
      new THREE.Vector3(0, e, 0),
      new THREE.Vector3(),
      new THREE.Vector3(0, 0, e)
    ),
      t.colors.push(
        new THREE.Color(16711680),
        new THREE.Color(16755200),
        new THREE.Color(65280),
        new THREE.Color(11206400),
        new THREE.Color(255),
        new THREE.Color(43775)
      ),
      (e = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors })),
      THREE.Line.call(this, t, e, THREE.LinePieces);
  }),
  (THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype)),
  (THREE.ArrowHelper = function (e, t, i, r) {
    THREE.Object3D.call(this),
      void 0 === r && (r = 16776960),
      void 0 === i && (i = 1),
      (this.position = t),
      (this.useQuaternion = !0),
      (t = new THREE.Geometry()).vertices.push(new THREE.Vector3(0, 0, 0)),
      t.vertices.push(new THREE.Vector3(0, 1, 0)),
      (this.line = new THREE.Line(
        t,
        new THREE.LineBasicMaterial({ color: r })
      )),
      (this.line.matrixAutoUpdate = !1),
      this.add(this.line),
      (t = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1)).applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.875, 0)
      ),
      (this.cone = new THREE.Mesh(
        t,
        new THREE.MeshBasicMaterial({ color: r })
      )),
      (this.cone.matrixAutoUpdate = !1),
      this.add(this.cone),
      this.setDirection(e),
      this.setLength(i);
  }),
  (THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.ArrowHelper.prototype.setDirection = (function () {
    var e,
      t = new THREE.Vector3();
    return function (i) {
      0.999 < i.y
        ? this.quaternion.set(0, 0, 0, 1)
        : -0.999 > i.y
        ? this.quaternion.set(1, 0, 0, 0)
        : (t.set(i.z, 0, -i.x).normalize(),
          (e = Math.acos(i.y)),
          this.quaternion.setFromAxisAngle(t, e));
    };
  })()),
  (THREE.ArrowHelper.prototype.setLength = function (e) {
    this.scale.set(e, e, e);
  }),
  (THREE.ArrowHelper.prototype.setColor = function (e) {
    this.line.material.color.setHex(e), this.cone.material.color.setHex(e);
  }),
  (THREE.BoxHelper = function (e) {
    var e = e || 1,
      t = new THREE.Geometry(),
      e = [
        new THREE.Vector3(e, e, e),
        new THREE.Vector3(-e, e, e),
        new THREE.Vector3(-e, -e, e),
        new THREE.Vector3(e, -e, e),
        new THREE.Vector3(e, e, -e),
        new THREE.Vector3(-e, e, -e),
        new THREE.Vector3(-e, -e, -e),
        new THREE.Vector3(e, -e, -e),
      ];
    t.vertices.push(
      e[0],
      e[1],
      e[1],
      e[2],
      e[2],
      e[3],
      e[3],
      e[0],
      e[4],
      e[5],
      e[5],
      e[6],
      e[6],
      e[7],
      e[7],
      e[4],
      e[0],
      e[4],
      e[1],
      e[5],
      e[2],
      e[6],
      e[3],
      e[7]
    ),
      (this.vertices = e),
      THREE.Line.call(this, t, new THREE.LineBasicMaterial(), THREE.LinePieces);
  }),
  (THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype)),
  (THREE.BoxHelper.prototype.update = function (e) {
    var t = e.geometry;
    null === t.boundingBox && t.computeBoundingBox();
    var i = t.boundingBox.min,
      t = t.boundingBox.max,
      r = this.vertices;
    r[0].set(t.x, t.y, t.z),
      r[1].set(i.x, t.y, t.z),
      r[2].set(i.x, i.y, t.z),
      r[3].set(t.x, i.y, t.z),
      r[4].set(t.x, t.y, i.z),
      r[5].set(i.x, t.y, i.z),
      r[6].set(i.x, i.y, i.z),
      r[7].set(t.x, i.y, i.z),
      this.geometry.computeBoundingSphere(),
      (this.geometry.verticesNeedUpdate = !0),
      (this.matrixAutoUpdate = !1),
      (this.matrixWorld = e.matrixWorld);
  }),
  (THREE.CameraHelper = function (e) {
    function t(e, t, r) {
      i(e, r), i(t, r);
    }
    function i(e, t) {
      r.vertices.push(new THREE.Vector3()),
        r.colors.push(new THREE.Color(t)),
        void 0 === o[e] && (o[e] = []),
        o[e].push(r.vertices.length - 1);
    }
    THREE.Line.call(this);
    var r = new THREE.Geometry(),
      n = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors,
      }),
      o = {};
    t("n1", "n2", 16755200),
      t("n2", "n4", 16755200),
      t("n4", "n3", 16755200),
      t("n3", "n1", 16755200),
      t("f1", "f2", 16755200),
      t("f2", "f4", 16755200),
      t("f4", "f3", 16755200),
      t("f3", "f1", 16755200),
      t("n1", "f1", 16755200),
      t("n2", "f2", 16755200),
      t("n3", "f3", 16755200),
      t("n4", "f4", 16755200),
      t("p", "n1", 16711680),
      t("p", "n2", 16711680),
      t("p", "n3", 16711680),
      t("p", "n4", 16711680),
      t("u1", "u2", 43775),
      t("u2", "u3", 43775),
      t("u3", "u1", 43775),
      t("c", "t", 16777215),
      t("p", "c", 3355443),
      t("cn1", "cn2", 3355443),
      t("cn3", "cn4", 3355443),
      t("cf1", "cf2", 3355443),
      t("cf3", "cf4", 3355443),
      THREE.Line.call(this, r, n, THREE.LinePieces),
      (this.camera = e),
      (this.matrixWorld = e.matrixWorld),
      (this.matrixAutoUpdate = !1),
      (this.pointMap = o),
      this.update();
  }),
  (THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype)),
  (THREE.CameraHelper.prototype.update = (function () {
    var e = new THREE.Vector3(),
      t = new THREE.Camera(),
      i = new THREE.Projector();
    return function () {
      function r(r, o, a, s) {
        if (
          (e.set(o, a, s),
          i.unprojectVector(e, t),
          void 0 !== (r = n.pointMap[r]))
        )
          for (o = 0, a = r.length; o < a; o++)
            n.geometry.vertices[r[o]].copy(e);
      }
      var n = this;
      t.projectionMatrix.copy(this.camera.projectionMatrix),
        r("c", 0, 0, -1),
        r("t", 0, 0, 1),
        r("n1", -1, -1, -1),
        r("n2", 1, -1, -1),
        r("n3", -1, 1, -1),
        r("n4", 1, 1, -1),
        r("f1", -1, -1, 1),
        r("f2", 1, -1, 1),
        r("f3", -1, 1, 1),
        r("f4", 1, 1, 1),
        r("u1", 0.7, 1.1, -1),
        r("u2", -0.7, 1.1, -1),
        r("u3", 0, 2, -1),
        r("cf1", -1, 0, 1),
        r("cf2", 1, 0, 1),
        r("cf3", 0, -1, 1),
        r("cf4", 0, 1, 1),
        r("cn1", -1, 0, -1),
        r("cn2", 1, 0, -1),
        r("cn3", 0, -1, -1),
        r("cn4", 0, 1, -1),
        (this.geometry.verticesNeedUpdate = !0);
    };
  })()),
  (THREE.DirectionalLightHelper = function (e, t) {
    THREE.Object3D.call(this), (this.matrixAutoUpdate = !1), (this.light = e);
    var i = new THREE.SphereGeometry(t, 4, 2),
      r = new THREE.MeshBasicMaterial({ fog: !1, wireframe: !0 });
    r.color.copy(this.light.color).multiplyScalar(this.light.intensity),
      (this.lightSphere = new THREE.Mesh(i, r)),
      (this.lightSphere.matrixWorld = this.light.matrixWorld),
      (this.lightSphere.matrixAutoUpdate = !1),
      this.add(this.lightSphere),
      (i = new THREE.Geometry()).vertices.push(this.light.position),
      i.vertices.push(this.light.target.position),
      i.computeLineDistances(),
      (r = new THREE.LineDashedMaterial({
        dashSize: 4,
        gapSize: 4,
        opacity: 0.75,
        transparent: !0,
        fog: !1,
      })).color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity),
      (this.targetLine = new THREE.Line(i, r)),
      this.add(this.targetLine);
  }),
  (THREE.DirectionalLightHelper.prototype = Object.create(
    THREE.Object3D.prototype
  )),
  (THREE.DirectionalLightHelper.prototype.update = function () {
    this.lightSphere.material.color
      .copy(this.light.color)
      .multiplyScalar(this.light.intensity),
      this.targetLine.geometry.computeLineDistances(),
      (this.targetLine.geometry.verticesNeedUpdate = !0),
      this.targetLine.material.color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity);
  }),
  (THREE.GridHelper = function (e, t) {
    for (
      var i = new THREE.Geometry(),
        r = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors }),
        n = new THREE.Color(4473924),
        o = new THREE.Color(8947848),
        a = -e;
      a <= e;
      a += t
    ) {
      i.vertices.push(new THREE.Vector3(-e, 0, a)),
        i.vertices.push(new THREE.Vector3(e, 0, a)),
        i.vertices.push(new THREE.Vector3(a, 0, -e)),
        i.vertices.push(new THREE.Vector3(a, 0, e));
      var s = 0 === a ? n : o;
      i.colors.push(s, s, s, s);
    }
    THREE.Line.call(this, i, r, THREE.LinePieces);
  }),
  (THREE.GridHelper.prototype = Object.create(THREE.Line.prototype)),
  (THREE.HemisphereLightHelper = function (e, t) {
    THREE.Object3D.call(this), (this.light = e);
    var i = new THREE.SphereGeometry(t, 4, 2);
    i.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    for (var r = 0; 8 > r; r++) i.faces[r].materialIndex = 4 > r ? 0 : 1;
    (r = new THREE.MeshBasicMaterial({ fog: !1, wireframe: !0 })).color
      .copy(e.color)
      .multiplyScalar(e.intensity);
    var n = new THREE.MeshBasicMaterial({ fog: !1, wireframe: !0 });
    n.color.copy(e.groundColor).multiplyScalar(e.intensity),
      (this.lightSphere = new THREE.Mesh(
        i,
        new THREE.MeshFaceMaterial([r, n])
      )),
      (this.lightSphere.position = e.position),
      this.lightSphere.lookAt(new THREE.Vector3()),
      this.add(this.lightSphere);
  }),
  (THREE.HemisphereLightHelper.prototype = Object.create(
    THREE.Object3D.prototype
  )),
  (THREE.HemisphereLightHelper.prototype.update = function () {
    this.lightSphere.lookAt(new THREE.Vector3()),
      this.lightSphere.material.materials[0].color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity),
      this.lightSphere.material.materials[1].color
        .copy(this.light.groundColor)
        .multiplyScalar(this.light.intensity);
  }),
  (THREE.PointLightHelper = function (e, t) {
    THREE.Object3D.call(this), (this.matrixAutoUpdate = !1), (this.light = e);
    var i = new THREE.SphereGeometry(t, 4, 2),
      r = new THREE.MeshBasicMaterial({ fog: !1, wireframe: !0 });
    r.color.copy(this.light.color).multiplyScalar(this.light.intensity),
      (this.lightSphere = new THREE.Mesh(i, r)),
      (this.lightSphere.matrixWorld = this.light.matrixWorld),
      (this.lightSphere.matrixAutoUpdate = !1),
      this.add(this.lightSphere);
  }),
  (THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.PointLightHelper.prototype.update = function () {
    this.lightSphere.material.color
      .copy(this.light.color)
      .multiplyScalar(this.light.intensity);
  }),
  (THREE.SpotLightHelper = function (e, t) {
    THREE.Object3D.call(this), (this.matrixAutoUpdate = !1), (this.light = e);
    var i = new THREE.SphereGeometry(t, 4, 2),
      r = new THREE.MeshBasicMaterial({ fog: !1, wireframe: !0 });
    r.color.copy(this.light.color).multiplyScalar(this.light.intensity),
      (this.lightSphere = new THREE.Mesh(i, r)),
      (this.lightSphere.matrixWorld = this.light.matrixWorld),
      (this.lightSphere.matrixAutoUpdate = !1),
      this.add(this.lightSphere),
      (i = new THREE.CylinderGeometry(1e-4, 1, 1, 8, 1, !0)).applyMatrix(
        new THREE.Matrix4().makeTranslation(0, -0.5, 0)
      ),
      i.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)),
      (r = new THREE.MeshBasicMaterial({
        fog: !1,
        wireframe: !0,
        opacity: 0.3,
        transparent: !0,
      })).color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity),
      (this.lightCone = new THREE.Mesh(i, r)),
      (this.lightCone.position = this.light.position),
      (r = (i = e.distance ? e.distance : 1e4) * Math.tan(e.angle)),
      this.lightCone.scale.set(r, r, i),
      this.lightCone.lookAt(this.light.target.position),
      this.add(this.lightCone);
  }),
  (THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.SpotLightHelper.prototype.update = function () {
    var e = this.light.distance ? this.light.distance : 1e4,
      t = e * Math.tan(this.light.angle);
    this.lightCone.scale.set(t, t, e),
      this.lightCone.lookAt(this.light.target.position),
      this.lightSphere.material.color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity),
      this.lightCone.material.color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity);
  }),
  (THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this), (this.render = function () {});
  }),
  (THREE.ImmediateRenderObject.prototype = Object.create(
    THREE.Object3D.prototype
  )),
  (THREE.LensFlare = function (e, t, i, r, n) {
    THREE.Object3D.call(this),
      (this.lensFlares = []),
      (this.positionScreen = new THREE.Vector3()),
      (this.customUpdateCallback = void 0),
      void 0 !== e && this.add(e, t, i, r, n);
  }),
  (THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.LensFlare.prototype.add = function (e, t, i, r, n, o) {
    void 0 === t && (t = -1),
      void 0 === i && (i = 0),
      void 0 === o && (o = 1),
      void 0 === n && (n = new THREE.Color(16777215)),
      void 0 === r && (r = THREE.NormalBlending),
      (i = Math.min(i, Math.max(0, i))),
      this.lensFlares.push({
        texture: e,
        size: t,
        distance: i,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: o,
        color: n,
        blending: r,
      });
  }),
  (THREE.LensFlare.prototype.updateLensFlares = function () {
    var e,
      t,
      i = this.lensFlares.length,
      r = -(2 * this.positionScreen.x),
      n = -(2 * this.positionScreen.y);
    for (e = 0; e < i; e++)
      ((t = this.lensFlares[e]).x = this.positionScreen.x + r * t.distance),
        (t.y = this.positionScreen.y + n * t.distance),
        (t.wantedRotation = 0.25 * t.x * Math.PI),
        (t.rotation += 0.25 * (t.wantedRotation - t.rotation));
  }),
  (THREE.MorphBlendMesh = function (e, t) {
    THREE.Mesh.call(this, e, t),
      (this.animationsMap = {}),
      (this.animationsList = []);
    var i = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, i - 1, i / 1),
      this.setAnimationWeight("__default", 1);
  }),
  (THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.MorphBlendMesh.prototype.createAnimation = function (e, t, i, r) {
    (t = {
      startFrame: t,
      endFrame: i,
      length: i - t + 1,
      fps: r,
      duration: (i - t) / r,
      lastFrame: 0,
      currentFrame: 0,
      active: !1,
      time: 0,
      direction: 1,
      weight: 1,
      directionBackwards: !1,
      mirroredLoop: !1,
    }),
      (this.animationsMap[e] = t),
      this.animationsList.push(t);
  }),
  (THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (e) {
    for (
      var t,
        i = /([a-z]+)(\d+)/,
        r = {},
        n = this.geometry,
        o = 0,
        a = n.morphTargets.length;
      o < a;
      o++
    ) {
      var s = n.morphTargets[o].name.match(i);
      if (s && 1 < s.length) {
        var h = s[1];
        r[h] || (r[h] = { start: 1 / 0, end: -1 / 0 }),
          o < (s = r[h]).start && (s.start = o),
          o > s.end && (s.end = o),
          t || (t = h);
      }
    }
    for (h in r) (s = r[h]), this.createAnimation(h, s.start, s.end, e);
    this.firstAnimation = t;
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (e) {
    (e = this.animationsMap[e]) &&
      ((e.direction = 1), (e.directionBackwards = !1));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (e) {
    (e = this.animationsMap[e]) &&
      ((e.direction = -1), (e.directionBackwards = !0));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationFPS = function (e, t) {
    var i = this.animationsMap[e];
    i && ((i.fps = t), (i.duration = (i.end - i.start) / i.fps));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDuration = function (e, t) {
    var i = this.animationsMap[e];
    i && ((i.duration = t), (i.fps = (i.end - i.start) / i.duration));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationWeight = function (e, t) {
    var i = this.animationsMap[e];
    i && (i.weight = t);
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationTime = function (e, t) {
    var i = this.animationsMap[e];
    i && (i.time = t);
  }),
  (THREE.MorphBlendMesh.prototype.getAnimationTime = function (e) {
    var t = 0;
    return (e = this.animationsMap[e]) && (t = e.time), t;
  }),
  (THREE.MorphBlendMesh.prototype.getAnimationDuration = function (e) {
    var t = -1;
    return (e = this.animationsMap[e]) && (t = e.duration), t;
  }),
  (THREE.MorphBlendMesh.prototype.playAnimation = function (e) {
    var t = this.animationsMap[e];
    t
      ? ((t.time = 0), (t.active = !0))
      : console.warn("animation[" + e + "] undefined");
  }),
  (THREE.MorphBlendMesh.prototype.stopAnimation = function (e) {
    (e = this.animationsMap[e]) && (e.active = !1);
  }),
  (THREE.MorphBlendMesh.prototype.update = function (e) {
    for (var t = 0, i = this.animationsList.length; t < i; t++) {
      var r = this.animationsList[t];
      if (r.active) {
        var n = r.duration / r.length;
        (r.time += r.direction * e),
          r.mirroredLoop
            ? (r.time > r.duration || 0 > r.time) &&
              ((r.direction *= -1),
              r.time > r.duration &&
                ((r.time = r.duration), (r.directionBackwards = !0)),
              0 > r.time && ((r.time = 0), (r.directionBackwards = !1)))
            : ((r.time %= r.duration), 0 > r.time && (r.time += r.duration));
        var o =
            r.startFrame +
            THREE.Math.clamp(Math.floor(r.time / n), 0, r.length - 1),
          a = r.weight;
        o !== r.currentFrame &&
          ((this.morphTargetInfluences[r.lastFrame] = 0),
          (this.morphTargetInfluences[r.currentFrame] = 1 * a),
          (this.morphTargetInfluences[o] = 0),
          (r.lastFrame = r.currentFrame),
          (r.currentFrame = o)),
          (n = (r.time % n) / n),
          r.directionBackwards && (n = 1 - n),
          (this.morphTargetInfluences[r.currentFrame] = n * a),
          (this.morphTargetInfluences[r.lastFrame] = (1 - n) * a);
      }
    }
  }),
  (THREE.LensFlarePlugin = function () {
    var e, t, i, r, n, o, a, s, h, l, c, p, u;
    function E(t, i) {
      var r = e.createProgram(),
        n = e.createShader(e.FRAGMENT_SHADER),
        o = e.createShader(e.VERTEX_SHADER),
        a = "precision " + i + " float;\n";
      return (
        e.shaderSource(n, a + t.fragmentShader),
        e.shaderSource(o, a + t.vertexShader),
        e.compileShader(n),
        e.compileShader(o),
        e.attachShader(r, n),
        e.attachShader(r, o),
        e.linkProgram(r),
        r
      );
    }
    (this.init = function (f) {
      (e = f.context),
        (t = f),
        (i = f.getPrecision()),
        (r = new Float32Array(16)),
        (n = new Uint16Array(6)),
        (f = 0),
        (r[f++] = -1),
        (r[f++] = -1),
        (r[f++] = 0),
        (r[f++] = 0),
        (r[f++] = 1),
        (r[f++] = -1),
        (r[f++] = 1),
        (r[f++] = 0),
        (r[f++] = 1),
        (r[f++] = 1),
        (r[f++] = 1),
        (r[f++] = 1),
        (r[f++] = -1),
        (r[f++] = 1),
        (r[f++] = 0),
        (r[f++] = 1),
        (f = 0),
        (n[f++] = 0),
        (n[f++] = 1),
        (n[f++] = 2),
        (n[f++] = 0),
        (n[f++] = 2),
        (n[f++] = 3),
        (o = e.createBuffer()),
        (a = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, o),
        e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a),
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, n, e.STATIC_DRAW),
        (s = e.createTexture()),
        (h = e.createTexture()),
        e.bindTexture(e.TEXTURE_2D, s),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGB,
          16,
          16,
          0,
          e.RGB,
          e.UNSIGNED_BYTE,
          null
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        e.bindTexture(e.TEXTURE_2D, h),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA,
          16,
          16,
          0,
          e.RGBA,
          e.UNSIGNED_BYTE,
          null
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        0 >= e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
          ? ((l = !1), (c = E(THREE.ShaderFlares.lensFlare, i)))
          : ((l = !0), (c = E(THREE.ShaderFlares.lensFlareVertexTexture, i))),
        (u = {}),
        ((p = {}).vertex = e.getAttribLocation(c, "position")),
        (p.uv = e.getAttribLocation(c, "uv")),
        (u.renderType = e.getUniformLocation(c, "renderType")),
        (u.map = e.getUniformLocation(c, "map")),
        (u.occlusionMap = e.getUniformLocation(c, "occlusionMap")),
        (u.opacity = e.getUniformLocation(c, "opacity")),
        (u.color = e.getUniformLocation(c, "color")),
        (u.scale = e.getUniformLocation(c, "scale")),
        (u.rotation = e.getUniformLocation(c, "rotation")),
        (u.screenPosition = e.getUniformLocation(c, "screenPosition"));
    }),
      (this.render = function (i, r, n, E) {
        var i = i.__webglFlares,
          f = i.length;
        if (f) {
          var d,
            m,
            g,
            T,
            v,
            $ = new THREE.Vector3(),
            y = E / n,
            R = 0.5 * n,
            x = 0.5 * E,
            H = 16 / E,
            _ = new THREE.Vector2(H * y, H),
            w = new THREE.Vector3(1, 1, 0),
            S = new THREE.Vector2(1, 1),
            b = u,
            H = p;
          for (
            e.useProgram(c),
              e.enableVertexAttribArray(p.vertex),
              e.enableVertexAttribArray(p.uv),
              e.uniform1i(b.occlusionMap, 0),
              e.uniform1i(b.map, 1),
              e.bindBuffer(e.ARRAY_BUFFER, o),
              e.vertexAttribPointer(H.vertex, 2, e.FLOAT, !1, 16, 0),
              e.vertexAttribPointer(H.uv, 2, e.FLOAT, !1, 16, 8),
              e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a),
              e.disable(e.CULL_FACE),
              e.depthMask(!1),
              d = 0;
            d < f;
            d++
          )
            if (
              ((H = 16 / E),
              _.set(H * y, H),
              (T = i[d]),
              $.set(
                T.matrixWorld.elements[12],
                T.matrixWorld.elements[13],
                T.matrixWorld.elements[14]
              ),
              $.applyMatrix4(r.matrixWorldInverse),
              $.applyProjection(r.projectionMatrix),
              w.copy($),
              (S.x = w.x * R + R),
              (S.y = w.y * x + x),
              l || (0 < S.x && S.x < n && 0 < S.y && S.y < E))
            )
              for (
                e.activeTexture(e.TEXTURE1),
                  e.bindTexture(e.TEXTURE_2D, s),
                  e.copyTexImage2D(
                    e.TEXTURE_2D,
                    0,
                    e.RGB,
                    S.x - 8,
                    S.y - 8,
                    16,
                    16,
                    0
                  ),
                  e.uniform1i(b.renderType, 0),
                  e.uniform2f(b.scale, _.x, _.y),
                  e.uniform3f(b.screenPosition, w.x, w.y, w.z),
                  e.disable(e.BLEND),
                  e.enable(e.DEPTH_TEST),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0),
                  e.activeTexture(e.TEXTURE0),
                  e.bindTexture(e.TEXTURE_2D, h),
                  e.copyTexImage2D(
                    e.TEXTURE_2D,
                    0,
                    e.RGBA,
                    S.x - 8,
                    S.y - 8,
                    16,
                    16,
                    0
                  ),
                  e.uniform1i(b.renderType, 1),
                  e.disable(e.DEPTH_TEST),
                  e.activeTexture(e.TEXTURE1),
                  e.bindTexture(e.TEXTURE_2D, s),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0),
                  T.positionScreen.copy(w),
                  T.customUpdateCallback
                    ? T.customUpdateCallback(T)
                    : T.updateLensFlares(),
                  e.uniform1i(b.renderType, 2),
                  e.enable(e.BLEND),
                  m = 0,
                  g = T.lensFlares.length;
                m < g;
                m++
              )
                0.001 < (v = T.lensFlares[m]).opacity &&
                  0.001 < v.scale &&
                  ((w.x = v.x),
                  (w.y = v.y),
                  (w.z = v.z),
                  (H = (v.size * v.scale) / E),
                  (_.x = H * y),
                  (_.y = H),
                  e.uniform3f(b.screenPosition, w.x, w.y, w.z),
                  e.uniform2f(b.scale, _.x, _.y),
                  e.uniform1f(b.rotation, v.rotation),
                  e.uniform1f(b.opacity, v.opacity),
                  e.uniform3f(b.color, v.color.r, v.color.g, v.color.b),
                  t.setBlending(
                    v.blending,
                    v.blendEquation,
                    v.blendSrc,
                    v.blendDst
                  ),
                  t.setTexture(v.texture, 1),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0));
          e.enable(e.CULL_FACE), e.enable(e.DEPTH_TEST), e.depthMask(!0);
        }
      });
  }),
  (THREE.ShadowMapPlugin = function () {
    var e,
      t,
      i,
      r,
      n,
      o,
      a = new THREE.Frustum(),
      s = new THREE.Matrix4(),
      h = new THREE.Vector3(),
      l = new THREE.Vector3(),
      c = new THREE.Vector3();
    (this.init = function (a) {
      (e = a.context), (t = a);
      var a = THREE.ShaderLib.depthRGBA,
        s = THREE.UniformsUtils.clone(a.uniforms);
      (i = new THREE.ShaderMaterial({
        fragmentShader: a.fragmentShader,
        vertexShader: a.vertexShader,
        uniforms: s,
      })),
        (r = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          morphTargets: !0,
        })),
        (n = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          skinning: !0,
        })),
        (o = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          morphTargets: !0,
          skinning: !0,
        })),
        (i._shadowPass = !0),
        (r._shadowPass = !0),
        (n._shadowPass = !0),
        (o._shadowPass = !0);
    }),
      (this.render = function (e, i) {
        t.shadowMapEnabled && t.shadowMapAutoUpdate && this.update(e, i);
      }),
      (this.update = function (p, u) {
        var E,
          f,
          d,
          m,
          g,
          T,
          v,
          $,
          y,
          R,
          x = [];
        for (
          g = 0,
            e.clearColor(1, 1, 1, 1),
            e.disable(e.BLEND),
            e.enable(e.CULL_FACE),
            e.frontFace(e.CCW),
            t.shadowMapCullFace === THREE.CullFaceFront
              ? e.cullFace(e.FRONT)
              : e.cullFace(e.BACK),
            t.setDepthTest(!0),
            f = 0,
            d = p.__lights.length;
          f < d;
          f++
        )
          if ((m = p.__lights[f]).castShadow) {
            if (m instanceof THREE.DirectionalLight && m.shadowCascade)
              for (T = 0; T < m.shadowCascadeCount; T++) {
                if (m.shadowCascadeArray[T]) E = m.shadowCascadeArray[T];
                else {
                  (R = m),
                    ($ = T),
                    ((E = new THREE.DirectionalLight()).isVirtual = !0),
                    (E.onlyShadow = !0),
                    (E.castShadow = !0),
                    (E.shadowCameraNear = R.shadowCameraNear),
                    (E.shadowCameraFar = R.shadowCameraFar),
                    (E.shadowCameraLeft = R.shadowCameraLeft),
                    (E.shadowCameraRight = R.shadowCameraRight),
                    (E.shadowCameraBottom = R.shadowCameraBottom),
                    (E.shadowCameraTop = R.shadowCameraTop),
                    (E.shadowCameraVisible = R.shadowCameraVisible),
                    (E.shadowDarkness = R.shadowDarkness),
                    (E.shadowBias = R.shadowCascadeBias[$]),
                    (E.shadowMapWidth = R.shadowCascadeWidth[$]),
                    (E.shadowMapHeight = R.shadowCascadeHeight[$]),
                    (E.pointsWorld = []),
                    (E.pointsFrustum = []),
                    (y = E.pointsWorld),
                    (v = E.pointsFrustum);
                  for (var H = 0; 8 > H; H++)
                    (y[H] = new THREE.Vector3()), (v[H] = new THREE.Vector3());
                  (y = R.shadowCascadeNearZ[$]),
                    (R = R.shadowCascadeFarZ[$]),
                    v[0].set(-1, -1, y),
                    v[1].set(1, -1, y),
                    v[2].set(-1, 1, y),
                    v[3].set(1, 1, y),
                    v[4].set(-1, -1, R),
                    v[5].set(1, -1, R),
                    v[6].set(-1, 1, R),
                    v[7].set(1, 1, R),
                    (E.originalCamera = u),
                    ((v = new THREE.Gyroscope()).position =
                      m.shadowCascadeOffset),
                    v.add(E),
                    v.add(E.target),
                    u.add(v),
                    (m.shadowCascadeArray[T] = E),
                    console.log("Created virtualLight", E);
                }
                ($ = m),
                  (y = T),
                  (R = $.shadowCascadeArray[y]).position.copy($.position),
                  R.target.position.copy($.target.position),
                  R.lookAt(R.target),
                  (R.shadowCameraVisible = $.shadowCameraVisible),
                  (R.shadowDarkness = $.shadowDarkness),
                  (R.shadowBias = $.shadowCascadeBias[y]),
                  (v = $.shadowCascadeNearZ[y]),
                  ($ = $.shadowCascadeFarZ[y]),
                  ((R = R.pointsFrustum)[0].z = v),
                  (R[1].z = v),
                  (R[2].z = v),
                  (R[3].z = v),
                  (R[4].z = $),
                  (R[5].z = $),
                  (R[6].z = $),
                  (R[7].z = $),
                  (x[g] = E),
                  g++;
              }
            else (x[g] = m), g++;
          }
        for (f = 0, d = x.length; f < d; f++) {
          if (
            ((m = x[f]).shadowMap ||
              ((T = THREE.LinearFilter),
              t.shadowMapType === THREE.PCFSoftShadowMap &&
                (T = THREE.NearestFilter),
              (m.shadowMap = new THREE.WebGLRenderTarget(
                m.shadowMapWidth,
                m.shadowMapHeight,
                { minFilter: T, magFilter: T, format: THREE.RGBAFormat }
              )),
              (m.shadowMapSize = new THREE.Vector2(
                m.shadowMapWidth,
                m.shadowMapHeight
              )),
              (m.shadowMatrix = new THREE.Matrix4())),
            !m.shadowCamera)
          ) {
            if (m instanceof THREE.SpotLight)
              m.shadowCamera = new THREE.PerspectiveCamera(
                m.shadowCameraFov,
                m.shadowMapWidth / m.shadowMapHeight,
                m.shadowCameraNear,
                m.shadowCameraFar
              );
            else if (m instanceof THREE.DirectionalLight)
              m.shadowCamera = new THREE.OrthographicCamera(
                m.shadowCameraLeft,
                m.shadowCameraRight,
                m.shadowCameraTop,
                m.shadowCameraBottom,
                m.shadowCameraNear,
                m.shadowCameraFar
              );
            else {
              console.error("Unsupported light type for shadow");
              continue;
            }
            p.add(m.shadowCamera), !0 === p.autoUpdate && p.updateMatrixWorld();
          }
          if (
            (m.shadowCameraVisible &&
              !m.cameraHelper &&
              ((m.cameraHelper = new THREE.CameraHelper(m.shadowCamera)),
              m.shadowCamera.add(m.cameraHelper)),
            m.isVirtual && E.originalCamera == u)
          ) {
            for (
              T = u,
                g = m.shadowCamera,
                v = m.pointsFrustum,
                R = m.pointsWorld,
                h.set(1 / 0, 1 / 0, 1 / 0),
                l.set(-1 / 0, -1 / 0, -1 / 0),
                $ = 0;
              8 > $;
              $++
            )
              (y = R[$]).copy(v[$]),
                THREE.ShadowMapPlugin.__projector.unprojectVector(y, T),
                y.applyMatrix4(g.matrixWorldInverse),
                y.x < h.x && (h.x = y.x),
                y.x > l.x && (l.x = y.x),
                y.y < h.y && (h.y = y.y),
                y.y > l.y && (l.y = y.y),
                y.z < h.z && (h.z = y.z),
                y.z > l.z && (l.z = y.z);
            (g.left = h.x),
              (g.right = l.x),
              (g.top = l.y),
              (g.bottom = h.y),
              g.updateProjectionMatrix();
          }
          for (
            g = m.shadowMap,
              v = m.shadowMatrix,
              (T = m.shadowCamera).position.getPositionFromMatrix(
                m.matrixWorld
              ),
              c.getPositionFromMatrix(m.target.matrixWorld),
              T.lookAt(c),
              T.updateMatrixWorld(),
              T.matrixWorldInverse.getInverse(T.matrixWorld),
              m.cameraHelper &&
                (m.cameraHelper.visible = m.shadowCameraVisible),
              m.shadowCameraVisible && m.cameraHelper.update(),
              v.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
              v.multiply(T.projectionMatrix),
              v.multiply(T.matrixWorldInverse),
              s.multiplyMatrices(T.projectionMatrix, T.matrixWorldInverse),
              a.setFromMatrix(s),
              t.setRenderTarget(g),
              t.clear(),
              R = p.__webglObjects,
              m = 0,
              g = R.length;
            m < g;
            m++
          )
            (v = ($ = R[m]).object),
              ($.render = !1),
              v.visible &&
                v.castShadow &&
                (!(
                  v instanceof THREE.Mesh || v instanceof THREE.ParticleSystem
                ) ||
                  !v.frustumCulled ||
                  a.intersectsObject(v)) &&
                (v._modelViewMatrix.multiplyMatrices(
                  T.matrixWorldInverse,
                  v.matrixWorld
                ),
                ($.render = !0));
          for (m = 0, g = R.length; m < g; m++)
            ($ = R[m]).render &&
              ((v = $.object),
              ($ = $.buffer),
              (H =
                v.material instanceof THREE.MeshFaceMaterial
                  ? v.material.materials[0]
                  : v.material),
              (y = 0 < v.geometry.morphTargets.length && H.morphTargets),
              (H = v instanceof THREE.SkinnedMesh && H.skinning),
              (y = v.customDepthMaterial
                ? v.customDepthMaterial
                : H
                ? y
                  ? o
                  : n
                : y
                ? r
                : i),
              $ instanceof THREE.BufferGeometry
                ? t.renderBufferDirect(T, p.__lights, null, y, $, v)
                : t.renderBuffer(T, p.__lights, null, y, $, v));
          for (R = p.__webglObjectsImmediate, m = 0, g = R.length; m < g; m++)
            (v = ($ = R[m]).object).visible &&
              v.castShadow &&
              (v._modelViewMatrix.multiplyMatrices(
                T.matrixWorldInverse,
                v.matrixWorld
              ),
              t.renderImmediateObject(T, p.__lights, null, i, v));
        }
        (f = t.getClearColor()),
          (d = t.getClearAlpha()),
          e.clearColor(f.r, f.g, f.b, d),
          e.enable(e.BLEND),
          t.shadowMapCullFace === THREE.CullFaceFront && e.cullFace(e.BACK);
      });
  }),
  (THREE.ShadowMapPlugin.__projector = new THREE.Projector()),
  (THREE.SpritePlugin = function () {
    var e, t, i, r, n, o, a, s, h, l;
    function c(e, t) {
      return e.z !== t.z ? t.z - e.z : t.id - e.id;
    }
    (this.init = function (c) {
      (e = c.context),
        (t = c),
        (i = c.getPrecision()),
        (r = new Float32Array(16)),
        (n = new Uint16Array(6)),
        (c = 0),
        (r[c++] = -1),
        (r[c++] = -1),
        (r[c++] = 0),
        (r[c++] = 0),
        (r[c++] = 1),
        (r[c++] = -1),
        (r[c++] = 1),
        (r[c++] = 0),
        (r[c++] = 1),
        (r[c++] = 1),
        (r[c++] = 1),
        (r[c++] = 1),
        (r[c++] = -1),
        (r[c++] = 1),
        (r[c++] = 0),
        (r[c++] = 1),
        (c = 0),
        (n[c++] = 0),
        (n[c++] = 1),
        (n[c++] = 2),
        (n[c++] = 0),
        (n[c++] = 2),
        (n[c++] = 3),
        (o = e.createBuffer()),
        (a = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, o),
        e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a),
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, n, e.STATIC_DRAW);
      var c = THREE.ShaderSprite.sprite,
        p = e.createProgram(),
        u = e.createShader(e.FRAGMENT_SHADER),
        E = e.createShader(e.VERTEX_SHADER),
        f = "precision " + i + " float;\n";
      e.shaderSource(u, f + c.fragmentShader),
        e.shaderSource(E, f + c.vertexShader),
        e.compileShader(u),
        e.compileShader(E),
        e.attachShader(p, u),
        e.attachShader(p, E),
        e.linkProgram(p),
        (s = p),
        (l = {}),
        ((h = {}).position = e.getAttribLocation(s, "position")),
        (h.uv = e.getAttribLocation(s, "uv")),
        (l.uvOffset = e.getUniformLocation(s, "uvOffset")),
        (l.uvScale = e.getUniformLocation(s, "uvScale")),
        (l.rotation = e.getUniformLocation(s, "rotation")),
        (l.scale = e.getUniformLocation(s, "scale")),
        (l.alignment = e.getUniformLocation(s, "alignment")),
        (l.color = e.getUniformLocation(s, "color")),
        (l.map = e.getUniformLocation(s, "map")),
        (l.opacity = e.getUniformLocation(s, "opacity")),
        (l.useScreenCoordinates = e.getUniformLocation(
          s,
          "useScreenCoordinates"
        )),
        (l.sizeAttenuation = e.getUniformLocation(s, "sizeAttenuation")),
        (l.screenPosition = e.getUniformLocation(s, "screenPosition")),
        (l.modelViewMatrix = e.getUniformLocation(s, "modelViewMatrix")),
        (l.projectionMatrix = e.getUniformLocation(s, "projectionMatrix")),
        (l.fogType = e.getUniformLocation(s, "fogType")),
        (l.fogDensity = e.getUniformLocation(s, "fogDensity")),
        (l.fogNear = e.getUniformLocation(s, "fogNear")),
        (l.fogFar = e.getUniformLocation(s, "fogFar")),
        (l.fogColor = e.getUniformLocation(s, "fogColor")),
        (l.alphaTest = e.getUniformLocation(s, "alphaTest"));
    }),
      (this.render = function (i, r, n, p) {
        var u = i.__webglSprites,
          E = u.length;
        if (E) {
          var f = h,
            d = l,
            m = p / n,
            n = 0.5 * n,
            g = 0.5 * p;
          e.useProgram(s),
            e.enableVertexAttribArray(f.position),
            e.enableVertexAttribArray(f.uv),
            e.disable(e.CULL_FACE),
            e.enable(e.BLEND),
            e.bindBuffer(e.ARRAY_BUFFER, o),
            e.vertexAttribPointer(f.position, 2, e.FLOAT, !1, 16, 0),
            e.vertexAttribPointer(f.uv, 2, e.FLOAT, !1, 16, 8),
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a),
            e.uniformMatrix4fv(
              d.projectionMatrix,
              !1,
              r.projectionMatrix.elements
            ),
            e.activeTexture(e.TEXTURE0),
            e.uniform1i(d.map, 0);
          var T = (f = 0),
            v = i.fog;
          v
            ? (e.uniform3f(d.fogColor, v.color.r, v.color.g, v.color.b),
              v instanceof THREE.Fog
                ? (e.uniform1f(d.fogNear, v.near),
                  e.uniform1f(d.fogFar, v.far),
                  e.uniform1i(d.fogType, 1),
                  (T = f = 1))
                : v instanceof THREE.FogExp2 &&
                  (e.uniform1f(d.fogDensity, v.density),
                  e.uniform1i(d.fogType, 2),
                  (T = f = 2)))
            : (e.uniform1i(d.fogType, 0), (T = f = 0));
          for (var $, y, R = [], v = 0; v < E; v++)
            (y = ($ = u[v]).material),
              $.visible &&
                0 !== y.opacity &&
                (y.useScreenCoordinates
                  ? ($.z = -$.position.z)
                  : ($._modelViewMatrix.multiplyMatrices(
                      r.matrixWorldInverse,
                      $.matrixWorld
                    ),
                    ($.z = -$._modelViewMatrix.elements[14])));
          for (u.sort(c), v = 0; v < E; v++)
            (y = ($ = u[v]).material),
              $.visible &&
                0 !== y.opacity &&
                y.map &&
                y.map.image &&
                y.map.image.width &&
                (e.uniform1f(d.alphaTest, y.alphaTest),
                !0 === y.useScreenCoordinates
                  ? (e.uniform1i(d.useScreenCoordinates, 1),
                    e.uniform3f(
                      d.screenPosition,
                      ($.position.x * t.devicePixelRatio - n) / n,
                      (g - $.position.y * t.devicePixelRatio) / g,
                      Math.max(0, Math.min(1, $.position.z))
                    ),
                    (R[0] = t.devicePixelRatio),
                    (R[1] = t.devicePixelRatio))
                  : (e.uniform1i(d.useScreenCoordinates, 0),
                    e.uniform1i(d.sizeAttenuation, y.sizeAttenuation ? 1 : 0),
                    e.uniformMatrix4fv(
                      d.modelViewMatrix,
                      !1,
                      $._modelViewMatrix.elements
                    ),
                    (R[0] = 1),
                    (R[1] = 1)),
                (r = i.fog && y.fog ? T : 0),
                f !== r && (e.uniform1i(d.fogType, r), (f = r)),
                (r = 1 / (y.scaleByViewport ? p : 1)),
                (R[0] *= r * m * $.scale.x),
                (R[1] *= r * $.scale.y),
                e.uniform2f(d.uvScale, y.uvScale.x, y.uvScale.y),
                e.uniform2f(d.uvOffset, y.uvOffset.x, y.uvOffset.y),
                e.uniform2f(d.alignment, y.alignment.x, y.alignment.y),
                e.uniform1f(d.opacity, y.opacity),
                e.uniform3f(d.color, y.color.r, y.color.g, y.color.b),
                e.uniform1f(d.rotation, $.rotation),
                e.uniform2fv(d.scale, R),
                t.setBlending(
                  y.blending,
                  y.blendEquation,
                  y.blendSrc,
                  y.blendDst
                ),
                t.setDepthTest(y.depthTest),
                t.setDepthWrite(y.depthWrite),
                t.setTexture(y.map, 0),
                e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0));
          e.enable(e.CULL_FACE);
        }
      });
  }),
  (THREE.DepthPassPlugin = function () {
    (this.enabled = !1), (this.renderTarget = null);
    var e,
      t,
      i,
      r,
      n,
      o,
      a = new THREE.Frustum(),
      s = new THREE.Matrix4();
    (this.init = function (a) {
      (e = a.context), (t = a);
      var a = THREE.ShaderLib.depthRGBA,
        s = THREE.UniformsUtils.clone(a.uniforms);
      (i = new THREE.ShaderMaterial({
        fragmentShader: a.fragmentShader,
        vertexShader: a.vertexShader,
        uniforms: s,
      })),
        (r = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          morphTargets: !0,
        })),
        (n = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          skinning: !0,
        })),
        (o = new THREE.ShaderMaterial({
          fragmentShader: a.fragmentShader,
          vertexShader: a.vertexShader,
          uniforms: s,
          morphTargets: !0,
          skinning: !0,
        })),
        (i._shadowPass = !0),
        (r._shadowPass = !0),
        (n._shadowPass = !0),
        (o._shadowPass = !0);
    }),
      (this.render = function (e, t) {
        this.enabled && this.update(e, t);
      }),
      (this.update = function (h, l) {
        var c, p, u, E, f, d, m;
        for (
          e.clearColor(1, 1, 1, 1),
            e.disable(e.BLEND),
            t.setDepthTest(!0),
            !0 === h.autoUpdate && h.updateMatrixWorld(),
            l.matrixWorldInverse.getInverse(l.matrixWorld),
            s.multiplyMatrices(l.projectionMatrix, l.matrixWorldInverse),
            a.setFromMatrix(s),
            t.setRenderTarget(this.renderTarget),
            t.clear(),
            d = h.__webglObjects,
            c = 0,
            p = d.length;
          c < p;
          c++
        )
          (f = (u = d[c]).object),
            (u.render = !1),
            f.visible &&
              (!(
                f instanceof THREE.Mesh || f instanceof THREE.ParticleSystem
              ) ||
                !f.frustumCulled ||
                a.intersectsObject(f)) &&
              (f._modelViewMatrix.multiplyMatrices(
                l.matrixWorldInverse,
                f.matrixWorld
              ),
              (u.render = !0));
        for (c = 0, p = d.length; c < p; c++)
          !(u = d[c]).render ||
            ((f = u.object),
            (u = u.buffer),
            f instanceof THREE.ParticleSystem && !f.customDepthMaterial) ||
            ((m =
              f.material instanceof THREE.MeshFaceMaterial
                ? f.material.materials[0]
                : f.material) && t.setMaterialFaces(f.material),
            (E = 0 < f.geometry.morphTargets.length && m.morphTargets),
            (m = f instanceof THREE.SkinnedMesh && m.skinning),
            (E = f.customDepthMaterial
              ? f.customDepthMaterial
              : m
              ? E
                ? o
                : n
              : E
              ? r
              : i),
            u instanceof THREE.BufferGeometry
              ? t.renderBufferDirect(l, h.__lights, null, E, u, f)
              : t.renderBuffer(l, h.__lights, null, E, u, f));
        for (d = h.__webglObjectsImmediate, c = 0, p = d.length; c < p; c++)
          (f = (u = d[c]).object).visible &&
            (f._modelViewMatrix.multiplyMatrices(
              l.matrixWorldInverse,
              f.matrixWorld
            ),
            t.renderImmediateObject(l, h.__lights, null, i, f));
        (c = t.getClearColor()),
          (p = t.getClearAlpha()),
          e.clearColor(c.r, c.g, c.b, p),
          e.enable(e.BLEND);
      });
  }),
  (THREE.ShaderFlares = {
    lensFlareVertexTexture: {
      vertexShader:
        "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader:
        "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
    },
    lensFlare: {
      vertexShader:
        "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader:
        "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
    },
  }),
  (THREE.ShaderSprite = {
    sprite: {
      vertexShader:
        "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
      fragmentShader:
        "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}",
    },
  });
