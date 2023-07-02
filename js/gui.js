"use strict";
!(function () {
  var t,
    o,
    e = [];
  function n(t, o, e) {
    var n = $("<li>").appendTo(e);
    return $("<button>").button({ label: t }).width(140).click(o).appendTo(n);
  }
  function a() {
    var t = "newgame",
      o = WHITE,
      e = 0;
    if (0 !== $("#" + t).length) return !1;
    var n = $("<div>")
        .attr("id", t)
        .attr("title", "New Game")
        .appendTo($("body")),
      a = $("<p>").appendTo(n);
    $('<input type="radio" id="white" name="color" checked="checked">')
      .click(function () {
        o = WHITE;
      })
      .appendTo(a),
      $('<label for="white">White</label>').appendTo(a),
      $('<input type="radio" id="black" name="color"/>')
        .click(function () {
          o = BLACK;
        })
        .appendTo(a),
      $('<label for="black">Black</label>').appendTo(a),
      a.buttonset();
    var p = $("<label>").text("AI Strength:"),
      l = $("<select>")
        .css("display", "block")
        .appendTo(p)
        .change(function (t) {
          e = $(t.currentTarget).val();
        });
    $("<p>").append(p).appendTo(n);
    for (var r = 0; r < levels.length; r++)
      $("<option>")
        .val(r)
        .text("level " + (r + 1))
        .appendTo(l);
    n.dialog({
      close: function (t, o) {
        n.remove();
      },
      buttons: {
        Start: function () {
          i(o, e), $(this).remove();
        },
      },
    });
  }
  function i(t, o) {
    void 0 !== levels[o] &&
      ((g_timeout = levels[o].timeout), (g_maxply = levels[o].maxply)),
      EnsureAnalysisStopped(),
      ResetGame(),
      InitializeBackgroundEngine() && g_backgroundEngine.postMessage("go"),
      (g_allMoves = []),
      c(),
      redrawBoard(),
      t === WHITE
        ? ((g_playerWhite = !0),
          (camera.position.x = 0),
          (camera.position.z = 100))
        : ((g_playerWhite = !1),
          SearchAndRedraw(),
          (camera.position.x = 0),
          (camera.position.z = -100));
  }
  function p(t) {
    (g_playerWhite = "white" === $(t.currentTarget).val()), redrawBoard();
  }
  function l() {
    0 !== g_allMoves.length &&
      (null !== g_backgroundEngine &&
        (g_backgroundEngine.terminate(), (g_backgroundEngine = null)),
      UnmakeMove(g_allMoves[g_allMoves.length - 1]),
      g_allMoves.pop(),
      e.pop(),
      e.pop(),
      d(),
      g_playerWhite !== Boolean(g_toMove) &&
        0 !== g_allMoves.length &&
        (UnmakeMove(g_allMoves[g_allMoves.length - 1]), g_allMoves.pop()),
      redrawBoard());
  }
  function r() {
    var t = "loadGame";
    if (0 !== $("#" + t).length) return !1;
    var o = $("<div>")
      .attr("id", t)
      .attr("title", "Load Game")
      .appendTo($("body"));
    $("<input>")
      .attr("type", "file")
      .change(function (t) {
        (function t(o) {
          var n = o.target.files[0];
          if (n) {
            var a = new FileReader();
            (a.onload = function (t) {
              (function t(o) {
                var n,
                  a = parsePGN(o),
                  i = a.fen,
                  p = a.sequence;
                function l(t, o) {
                  (this.flag = t), (this.promo = o);
                }
                ((g_allMoves = []), c(), null !== i)
                  ? ((g_allMoves = []),
                    InitializeFromFen((n = i)),
                    EnsureAnalysisStopped(),
                    InitializeBackgroundEngine(),
                    (g_playerWhite = !!g_toMove),
                    g_backgroundEngine.postMessage("position " + GetFen()),
                    redrawBoard(),
                    a.startColor === BLACK && e.push(".."))
                  : ResetGame(),
                  p.forEach(function (t) {
                    for (
                      var o,
                        e,
                        n = GenerateValidMoves(),
                        a = {
                          P: new l(piecePawn, null),
                          N: new l(pieceKnight, moveflagPromoteKnight),
                          B: new l(pieceBishop, moveflagPromoteBishop),
                          R: new l(pieceRook, moveflagPromoteRook),
                          Q: new l(pieceQueen, moveflagPromoteQueen),
                          K: new l(pieceKing, null),
                        },
                        i = a[t.piece].flag,
                        p = t.color === WHITE ? 8 : 0,
                        r = [],
                        c = (p | i) << 4;
                      0 !== g_pieceList[c];

                    )
                      r.push(new Cell(FormatSquare(g_pieceList[c]))), c++;
                    var d = t.from;
                    if (void 0 !== d)
                      for (o = r.length - 1; o >= 0; o--)
                        1 === d.length
                          ? d.match(/[a-h]/) && r[o].position.charAt(0) !== d
                            ? r.splice(o, 1)
                            : d.match(/[1-8]/) &&
                              r[o].position.charAt(1) !== d &&
                              r.splice(o, 1)
                          : 2 === d.length &&
                            r[o].position !== d &&
                            r.splice(o, 1);
                    var s = new Cell(t.to),
                      u = MakeSquare(s.y, s.x),
                      h = t.promotion ? a[t.promotion.substr(1)].promo : void 0;
                    function f(t) {
                      var a = MakeSquare(t.y, t.x);
                      void 0 !== h
                        ? n[o] === GenerateMove(a, u, moveflagPromotion | h) &&
                          (e = n[o])
                        : (255 & n[o]) == a &&
                          ((n[o] >> 8) & 255) == u &&
                          (e = n[o]);
                    }
                    for (o = 0; o < n.length && (r.forEach(f), !e); o++);
                    if (e) UIPlayMove(e, !1);
                    else throw (console.log(t), "Invalid PGN");
                  }),
                  g_toMove === colorWhite
                    ? ((g_playerWhite = !0),
                      (camera.position.x = 0),
                      (camera.position.z = 100))
                    : ((g_playerWhite = !1),
                      (camera.position.x = 0),
                      (camera.position.z = -100)),
                  EnsureAnalysisStopped(),
                  InitializeBackgroundEngine() &&
                    g_backgroundEngine.postMessage("position " + GetFen()),
                  redrawBoard();
              })(t.target.result);
            }),
              a.readAsText(n);
          } else console.log("Failed to load file");
        })(t),
          o.remove();
      })
      .appendTo(o),
      o.dialog({
        minWidth: 420,
        close: function (t, e) {
          o.remove();
        },
      });
  }
  function c() {
    t.val(""), (e = []);
  }
  function d() {
    t.val(s()), t.scrollTop(t[0].scrollHeight);
  }
  function s() {
    var t = "";
    return (
      e.forEach(function (o, e) {
        e % 2 == 0
          ? ".." === o
            ? (t += e / 2 + 1 + "...")
            : (t += e / 2 + 1 + ". " + o)
          : (t += " " + o + "\r\n");
      }),
      t
    );
  }
  function u() {
    var t = "chessSave.pgn",
      o = document.createElement("a");
    if (void 0 === o.download) {
      var e =
        "data:text/html," +
        encodeURIComponent(
          "<p><a download='" +
            t +
            "' href=\"data:application/json," +
            encodeURIComponent(s()) +
            '">Download link</a></p>'
        );
      window.open(e);
    } else {
      var n = document.body;
      (o.textContent = t),
        (o.href = "data:application/json," + encodeURIComponent(s())),
        (o.download = t),
        n.appendChild(o);
      var a = document.createEvent("MouseEvent");
      a.initMouseEvent(
        "click",
        !0,
        !0,
        window,
        0,
        0,
        0,
        0,
        0,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        o.dispatchEvent(a),
        n.removeChild(o);
    }
  }
  function h(t) {
    var o = $(t.currentTarget).val();
    switch (o) {
      case "Queen":
        promotion = moveflagPromoteQueen;
        break;
      case "Rook":
        promotion = moveflagPromoteRook;
        break;
      case "Bishop":
        promotion = moveflagPromoteBishop;
        break;
      case "Knight":
        promotion = moveflagPromoteKnight;
    }
  }
  (window.initGUI = function o() {
    var e = $("<div>")
      .css("position", "absolute")
      .position({ of: $("body"), my: "left top", at: "left top" })
      .width(150)
      .attr("id", "gui");
    $("<p>").text("menu").appendTo(e);
    var i = $("<div>").appendTo(e),
      p = $("<ul>").appendTo(i);
    n("NewGame", a, p),
      n("Undo", l, p),
      n("Load", r, p),
      n("Save", u, p),
      $("<label>")
        .text("Promotion:")
        .append(
          $("<select>")
            .width(140)
            .append($("<option>").text("Queen"))
            .append($("<option>").text("Rook"))
            .append($("<option>").text("Bishop"))
            .append($("<option>").text("Knight"))
            .change(h)
            .appendTo(i)
        )
        .appendTo(i),
      (t = $("<textarea>")
        .attr("cols", "16")
        .attr("rows", "10")
        .attr("readonly", "readonly")
        .appendTo(i)),
      $("body").append(e),
      e.accordion({ header: "p", collapsible: !0 });
  }),
    (window.initInfo = function t() {
      o = $("<div>")
        .css("position", "absolute")
        .position({ of: $("body"), my: "right top", at: "right top" })
        .attr("id", "info")
        .appendTo($("body"))
        .css("left", "auto")
        .css("right", "0");
    }),
    (window.clearPGN = c),
    (window.addToPGN = function t(o) {
      e.push(GetMoveSAN(o)), d();
    }),
    (window.displayCheck = function t() {
      0 === validMoves.length
        ? o.text(g_inCheck ? "Checkmate" : "Stalemate")
        : g_inCheck
        ? o.text("Check")
        : o.text(""),
        "" !== o.text() ? o.show("highlight", {}, 500) : o.hide();
    }),
    (window.newGame = i);
})();
