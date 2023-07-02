var g_uiBoard,
  g_backgroundEngine,
  g_startOffset = null,
  g_selectedPiece = null,
  moveNumber = 1,
  g_allMoves = [],
  g_playerWhite = !0,
  g_changingFen = !1,
  g_analyzing = !1,
  g_cellSize = 45;
function UINewGame() {
  (moveNumber = 1),
    (document.getElementById("PgnTextBox").value = ""),
    EnsureAnalysisStopped(),
    ResetGame(),
    InitializeBackgroundEngine() && g_backgroundEngine.postMessage("go"),
    (g_allMoves = []),
    RedrawBoard(),
    g_playerWhite || SearchAndRedraw();
}
function EnsureAnalysisStopped() {
  g_analyzing &&
    null != g_backgroundEngine &&
    (g_backgroundEngine.terminate(), (g_backgroundEngine = null));
}
function UIAnalyzeToggle() {
  InitializeBackgroundEngine()
    ? (g_analyzing
        ? EnsureAnalysisStopped()
        : g_backgroundEngine.postMessage("analyze"),
      (g_analyzing = !g_analyzing),
      (document.getElementById("AnalysisToggleLink").innerText = g_analyzing
        ? "Analysis: On"
        : "Analysis: Off"))
    : alert(
        "Your browser must support web workers for analysis - (chrome4, ff4, safari)"
      );
}
function UIChangeFEN() {
  if (!g_changingFen) {
    var e = InitializeFromFen(document.getElementById("FenTextBox").value);
    if (0 != e.length) {
      UpdatePVDisplay(e);
      return;
    }
    UpdatePVDisplay(""),
      (g_allMoves = []),
      EnsureAnalysisStopped(),
      InitializeBackgroundEngine(),
      (g_playerWhite = !!g_toMove),
      g_backgroundEngine.postMessage("position " + GetFen()),
      RedrawBoard();
  }
}
function UIChangeStartPlayer() {
  (g_playerWhite = !g_playerWhite), RedrawBoard();
}
function UpdatePgnTextBox(e) {
  var n = document.getElementById("PgnTextBox");
  0 != g_toMove && ((n.value += moveNumber + ". "), moveNumber++),
    (n.value += GetMoveSAN(e) + " ");
}
function UIChangeTimePerMove() {
  g_timeout = parseInt(document.getElementById("TimePerMove").value, 10);
}
function FinishMove(e, n, a, l) {
  null != e ? UIPlayMove(e, BuildPVMessage(e, n, a, l)) : alert("Checkmate!");
}
function UIPlayMove(e, n) {
  UpdatePgnTextBox(e),
    (g_allMoves[g_allMoves.length] = e),
    MakeMove(e),
    UpdatePVDisplay(n),
    UpdateFromMove(e);
}
function UIUndoMove() {
  0 != g_allMoves.length &&
    (null != g_backgroundEngine &&
      (g_backgroundEngine.terminate(), (g_backgroundEngine = null)),
    UnmakeMove(g_allMoves[g_allMoves.length - 1]),
    g_allMoves.pop(),
    !!g_toMove !== g_playerWhite &&
      0 !== g_allMoves.length &&
      (UnmakeMove(g_allMoves[g_allMoves.length - 1]), g_allMoves.pop()),
    RedrawBoard());
}
function UpdatePVDisplay(e) {
  if (null != e) {
    var n = document.getElementById("output");
    null != n.firstChild && n.removeChild(n.firstChild),
      n.appendChild(document.createTextNode(e));
  }
}
function SearchAndRedraw() {
  if (g_analyzing) {
    EnsureAnalysisStopped(),
      InitializeBackgroundEngine(),
      g_backgroundEngine.postMessage("position " + GetFen()),
      g_backgroundEngine.postMessage("analyze");
    return;
  }
  InitializeBackgroundEngine()
    ? g_backgroundEngine.postMessage("search " + g_timeout)
    : Search(FinishMove, 99, null);
}
var g_backgroundEngineValid = !0;
function InitializeBackgroundEngine() {
  if (!g_backgroundEngineValid) return !1;
  if (null == g_backgroundEngine) {
    g_backgroundEngineValid = !0;
    try {
      ((g_backgroundEngine = new Worker("js/garbochess.js")).onmessage =
        function (e) {
          "pv" == e.data.match("^pv")
            ? UpdatePVDisplay(e.data.substr(3, e.data.length - 3))
            : "message" == e.data.match("^message")
            ? (EnsureAnalysisStopped(),
              UpdatePVDisplay(e.data.substr(8, e.data.length - 8)))
            : UIPlayMove(GetMoveFromString(e.data), null);
        }),
        (g_backgroundEngine.error = function (e) {
          alert("Error from background worker:" + e.message);
        }),
        g_backgroundEngine.postMessage("position " + GetFen());
    } catch (e) {
      g_backgroundEngineValid = !1;
    }
  }
  return g_backgroundEngineValid;
}
function UpdateFromMove(e) {
  var n = (15 & e) - 4,
    a = ((e >> 4) & 15) - 2,
    l = ((e >> 8) & 15) - 4,
    g = ((e >> 12) & 15) - 2;
  if (
    (g_playerWhite || ((a = 7 - a), (g = 7 - g), (n = 7 - n), (l = 7 - l)),
    e & moveflagCastleKing ||
      e & moveflagCastleQueen ||
      e & moveflagEPC ||
      e & moveflagPromotion)
  )
    RedrawPieces();
  else {
    var t = g_uiBoard[8 * a + n];
    $(g_uiBoard[8 * g + l])
      .empty()
      .append($(t).children());
  }
}
function RedrawPieces() {
  for (y = 0; y < 8; ++y)
    for (x = 0; x < 8; ++x) {
      var e = g_uiBoard[8 * y + x],
        n = g_playerWhite ? y : 7 - y,
        a = g_board[(n + 2) * 16 + (g_playerWhite ? x : 7 - x) + 4],
        l = null;
      switch (7 & a) {
        case piecePawn:
          l = "pawn";
          break;
        case pieceKnight:
          l = "knight";
          break;
        case pieceBishop:
          l = "bishop";
          break;
        case pieceRook:
          l = "rook";
          break;
        case pieceQueen:
          l = "queen";
          break;
        case pieceKing:
          l = "king";
      }
      if (
        (null != l && ((l += "_"), (l += 8 & a ? "white" : "black")), null != l)
      ) {
        var g = document.createElement("div");
        $(g).addClass("sprite-" + l),
          (g.style.backgroundImage = "url('img/sprites.png')"),
          (g.width = g_cellSize),
          (g.height = g_cellSize);
        var t = document.createElement("div");
        t.appendChild(g),
          $(t).draggable({
            start: function (e, n) {
              if (null !== g_selectedPiece) return g_selectedPiece == this;
              g_selectedPiece = this;
              var a = $(this).closest("table").offset();
              g_startOffset = { left: e.pageX - a.left, top: e.pageY - a.top };
            },
          }),
          $(t).mousedown(function (e) {
            if (null === g_selectedPiece) {
              var n = $(this).closest("table").offset();
              (g_startOffset = {
                left: e.pageX - n.left,
                top: e.pageY - n.top,
              }),
                e.stopPropagation(),
                (g_selectedPiece = this),
                (g_selectedPiece.style.backgroundImage =
                  "url('img/transpBlue50.png')");
            } else g_selectedPiece === this && ((g_selectedPiece.style.backgroundImage = null), (g_selectedPiece = null));
          }),
          $(e).empty().append(t);
      } else $(e).empty();
    }
}
function RedrawBoard() {
  var e = $("#board")[0],
    n = document.createElement("table");
  (n.cellPadding = "0px"),
    (n.cellSpacing = "0px"),
    $(n).addClass("no-highlight");
  var a = document.createElement("tbody");
  g_uiBoard = [];
  var l = function (e, a) {
    var l = e.pageX - $(n).offset().left,
      g = e.pageY - $(n).offset().top;
    (l = Math.floor(l / g_cellSize)), (g = Math.floor(g / g_cellSize));
    var t = Math.floor(g_startOffset.left / g_cellSize),
      i = Math.floor(g_startOffset.top / g_cellSize);
    g_playerWhite || ((i = 7 - i), (g = 7 - g), (t = 7 - t), (l = 7 - l));
    for (var o = GenerateValidMoves(), r = null, s = 0; s < o.length; s++)
      (255 & o[s]) == MakeSquare(i, t) &&
        ((o[s] >> 8) & 255) == MakeSquare(g, l) &&
        (r = o[s]);
    if (
      (g_playerWhite || ((i = 7 - i), (g = 7 - g), (t = 7 - t), (l = 7 - l)),
      (g_selectedPiece.style.left = 0),
      (g_selectedPiece.style.top = 0),
      !(t == l && i == g) && null != r)
    ) {
      UpdatePgnTextBox(r),
        InitializeBackgroundEngine() &&
          g_backgroundEngine.postMessage(FormatMove(r)),
        (g_allMoves[g_allMoves.length] = r),
        MakeMove(r),
        UpdateFromMove(r);
      var d = GetFen();
      (document.getElementById("FenTextBox").value = d),
        setTimeout("SearchAndRedraw()", 0);
    }
    (g_selectedPiece.style.backgroundImage = null), (g_selectedPiece = null);
  };
  for (y = 0; y < 8; ++y) {
    var g = document.createElement("tr");
    for (x = 0; x < 8; ++x) {
      var t = document.createElement("td");
      (t.style.width = g_cellSize + "px"),
        (t.style.height = g_cellSize + "px"),
        (t.style.backgroundColor = (y ^ x) & 1 ? "#D18947" : "#FFCE9E"),
        g.appendChild(t),
        (g_uiBoard[8 * y + x] = t);
    }
    a.appendChild(g);
  }
  n.appendChild(a),
    $("body").droppable({ drop: l }),
    $(n).mousedown(function (e) {
      null !== g_selectedPiece && l(e);
    }),
    RedrawPieces(),
    $(e).empty(),
    e.appendChild(n),
    (g_changingFen = !0),
    (document.getElementById("FenTextBox").value = GetFen()),
    (g_changingFen = !1);
}
