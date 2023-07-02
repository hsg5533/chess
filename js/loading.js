"use strict";
var geometries = {},
  textures = {};
!(function () {
  var e, t, o;
  function n() {
    e.position({ of: window, my: "center center", at: "center center" }),
      t.position({ of: e, my: "center bottom", at: "center top-10" }),
      $(o).position({ of: window, my: "center center", at: "center center" }),
      window.addEventListener("resize", n);
  }
  (window.onload = function () {
    var r, i, a, s, d, l, g;
    (a = window.innerWidth * LOADING_BAR_SCALE * 1.8),
      ((o = document.createElement("canvas")).width = a),
      (o.height = a),
      document.body.appendChild(o),
      (s = o.getContext("2d")),
      (o.style.width = a + "px"),
      (o.style.height = Math.round(a / 2) + "px"),
      (o.remove = function () {
        window.cancelAnimationFrame(r), this.parentNode.removeChild(this);
      }),
      (function e() {
        var t, o;
        (function e(t) {
          s.clearRect(0, 0, a, a);
          var o = Math.cos((Date.now() / 1e3) * Math.PI),
            n = a / 2.5;
          function r(e, t, o) {
            return e + (t - e) * o;
          }
          var i,
            d = 0.015 * n,
            l = 70 + 30 * (i = (o + 1) / 2),
            g = s.createRadialGradient(
              a / 2,
              a / 2,
              0,
              a / 2,
              a / 2,
              n - d + o * d
            );
          g.addColorStop(0, "hsla(90," + l + "%,50%,0.5)"),
            g.addColorStop(0.125, "hsla(90," + l + "%,50%,0.3828125)"),
            g.addColorStop(0.25, "hsla(90," + l + "%,50%,0.28125)"),
            g.addColorStop(0.375, "hsla(90," + l + "%,50%,0.1953125)"),
            g.addColorStop(0.5, "hsla(90," + l + "%,50%,0.125)"),
            g.addColorStop(0.75, "hsla(90," + l + "%,50%,0.03125)"),
            g.addColorStop(1, "hsla(90," + l + "%,50%,0.0)"),
            s.rect(0, 0, a, a),
            (s.fillStyle = g),
            s.fill();
        })(
          ((t = Date.now()),
          void 0 === i && (i = t),
          (o = (t - i) / 1e3),
          (i = t),
          o)
        ),
          (r = window.requestAnimationFrame(e));
      })(),
      (d = [
        "Aggregating wood fibers",
        "Generating pieces census report",
        "Testing board resistance",
        "Generating Matrix 8x8",
        "Answering Queen's request",
        "Carving a princess for the knight",
        "Sanding the Bishop",
        "Enrolling Pawns",
        "Generating cheat sheet",
        "Mating the king",
        "Planting virtual trees",
        "Asking Deep Blue for advice",
        "Nominating Bishops",
        "Dubbing Knights",
        "Crowning the King",
        "Waxing chessboard",
        "Evaluating the idea of an hexagonal board, and rejecting it",
        "Gathering extra vertices (just in case)",
        "Trimming edges",
        "Intimidating opponent",
        "Learning the rules",
      ]),
      ((t = $("<div>")
        .attr("id", "tips")
        .css("color", "white")
        .appendTo($("body"))).update = function () {
        var e = this;
        if (d.length > 0) {
          var t = Math.floor(Math.random() * d.length),
            o = d[t];
          d.splice(t, 1), $(this).text(o + "...");
        }
        this.timer = setTimeout(function () {
          e.update();
        }, 5e3);
      }),
      (l = t.remove),
      (t.remove = function () {
        clearTimeout(this.timer), l.call(this);
      }),
      t.update(),
      (e = $("<div>")
        .attr("id", "progressbar")
        .css("width", 100 * LOADING_BAR_SCALE + "%")
        .appendTo($("body"))),
      (g = $("<div>").attr("id", "progress-label").appendTo(e)),
      e.progressbar({
        value: !1,
        change: function () {
          g.text(e.progressbar("value") + "%");
        },
      }),
      e.removeClass("ui-corner-all"),
      e.children().removeClass("ui-corner-all"),
      e.children().removeClass("ui-corner-left"),
      (e.update = function (t) {
        (t = Math.round(100 * t)),
          e.progressbar("value", t),
          e.children().removeClass("ui-corner-right");
      }),
      e.update(0),
      n(),
      (function t() {
        var o = 0,
          n = [
            "./json/knight.json",
            "./json/king.json",
            "./json/queen.json",
            "./json/bishop.json",
            "./json/rook.json",
            "./json/pawn.json",
            "./json/board.json",
            "./json/innerBoard.json",
            "texture/wood-0.jpg",
            "texture/wood-1.jpg",
            "texture/wood_N.jpg",
            "texture/wood_S.jpg",
            "texture/knight-ao.jpg",
            "texture/rook-ao.jpg",
            "texture/king-ao.jpg",
            "texture/bishop-ao.jpg",
            "texture/queen-ao.jpg",
            "texture/pawn-ao.jpg",
            "texture/floor.jpg",
            "texture/floor_N.jpg",
            "texture/floor_S.jpg",
            "texture/fakeShadow.jpg",
          ];
        function r() {
          e.update(o / n.length), o === n.length && setTimeout(onLoaded, 0.1);
        }
        n.forEach(function (e) {
          var t, n;
          switch (e.split(".").pop()) {
            case "json":
              (t = e),
                new THREE.JSONLoader().load(t, function (e) {
                  (geometries[t] = e), o++, r();
                });
              break;
            case "jpg":
              (n = e),
                THREE.ImageUtils.loadTexture(
                  n,
                  THREE.UVMapping(),
                  function (e) {
                    (textures[n] = e), o++, r();
                  }
                );
              break;
            default:
              throw "invalid resource";
          }
        });
      })();
  }),
    (window.removeLoader = function r() {
      e.remove(),
        t.remove(),
        o.remove(),
        window.removeEventListener("resize", n);
    });
})();
