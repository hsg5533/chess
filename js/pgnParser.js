"use strict";
!(function () {
  function e(e, r, t, o, c, a, n) {
    (this.piece = e || "P"),
      (this.color = r),
      (this.from = t),
      (this.to = o),
      (this.promotion = c),
      (this.result = a),
      (this.str = n);
  }
  (String.prototype.removeBrackets = function (e, r) {
    for (var t = 0, o = "", c = 0; c < this.length; c++) {
      var a = this.charAt(c);
      if (a === e) {
        t++;
        continue;
      }
      if (a === r) {
        t--;
        continue;
      }
      0 === t && (o += a);
    }
    return o;
  }),
    (window.parsePGN = function r(t) {
      var o = {};
      (o.fen = null), (o.sequence = []), (o.startColor = WHITE);
      var c = WHITE,
        a = t.match(
          /\[FEN *" *([pnbrqkPNBRQK1-8]+(?:\/[pnbrqkPNBRQK1-8]+){7} +([wb]) +(?:[KQ]{1,2}|-) *(?:[kq]{1,2}|-)(?: +(?:(?:[a-h][1-8])|-))? +\d+ +\d+) *" *\]/
        );
      a &&
        ((o.fen = a[1]),
        (c = "w" === a[2] ? WHITE : BLACK),
        (o.startColor = c));
      var n = t
          .removeBrackets("[", "]")
          .removeBrackets("{", "}")
          .removeBrackets("(", ")")
          .replace(/\$\d+/g, "")
          .replace(/\d+\.{1,3}/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/(0-1)$/g, "")
          .replace(/(1-0)$/g, "")
          .replace(/(1\/2-1\/2)$/g, "")
          .replace(/(\*)$/g, "")
          .trim()
          .split(" "),
        s = /^([NBRQK])?([a-h]?[1-8]?)?x?([a-h][1-8])(=[NBRQK])?([+#])?/,
        i = {
          "O-O": { from: ["e8", "e1"], to: ["g8", "g1"] },
          "O-O-O": { from: ["e8", "e1"], to: ["c8", "c1"] },
        };
      return (
        n.forEach(function (r) {
          var t = [];
          (t = r.match(s)) &&
            o.sequence.push(new e(t[1], c, t[2], t[3], t[4], t[5], r)),
            (t = r.match("(O-O(?:-O)?)([+#])?")) &&
              o.sequence.push(
                new e("K", c, i[t[1]].from[c], i[t[1]].to[c], void 0, t[2], r)
              ),
            (c = 1 - c);
        }),
        o
      );
    });
})();
