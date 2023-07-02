"use strict";
!(function () {
  function t() {
    (this.position = null),
      (this.index = null),
      (this.x = null),
      (this.y = null);
    var t,
      n,
      s = null;
    if (1 === arguments.length) {
      "string" == typeof arguments[0] && arguments[0].match(/[a-h][1-8]/)
        ? ((this.position = arguments[0]),
          (s =
            ((t = this.position),
            {
              x: t.charCodeAt(0) - 97,
              y: 7 - (parseInt(t.charAt(1), 10) - 1),
            })),
          (this.x = s.x),
          (this.y = s.y),
          (this.index = this.x + this.y * COLS))
        : arguments[0] >= 0 &&
          arguments[0] < ROWS * COLS &&
          ((this.index = arguments[0]),
          (s = ((n = this.index), { x: n % COLS, y: Math.floor(n / COLS) })),
          (this.x = s.x),
          (this.y = s.y),
          (this.position = i(this.x, this.y)));
    } else if (
      2 === arguments.length &&
      (function t() {
        if (2 == arguments.length) {
          var i = arguments[0],
            n = arguments[1];
          return i >= 0 && i < COLS && n >= 0 && n < ROWS;
        }
        return !1;
      })(arguments[0], arguments[1])
    )
      (this.x = arguments[0]),
        (this.y = arguments[1]),
        (this.index = this.x + this.y * COLS),
        (this.position = i(this.x, this.y));
    else throw arguments[0];
  }
  function i(t, i) {
    return String.fromCharCode(t + 97) + (7 - i + 1);
  }
  (t.prototype.toString = function () {
    return this.position;
  }),
    (t.prototype.equals = function () {
      if (1 === arguments.length) {
        var i = arguments[0];
        return i instanceof t
          ? i.position === this.position
          : i === this.position;
      }
      if (2 === arguments.length)
        return this.x === arguments[0] && this.y === arguments[1];
    }),
    (t.prototype.getWorldPosition = function () {
      var t = BOARD_SIZE / ROWS,
        i = (BOARD_SIZE - t) / 2;
      return new THREE.Vector3(this.x * t - i, 0, this.y * t - i);
    }),
    (window.Cell = t);
})();
