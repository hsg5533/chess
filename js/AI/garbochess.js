"use strict";
var g_startTime,
  g_nodeCount,
  g_qNodeCount,
  g_searchValid,
  g_toMove,
  g_castleRights,
  g_enPassentSquare,
  g_baseEval,
  g_hashKeyLow,
  g_hashKeyHigh,
  g_inCheck,
  g_hashTable,
  g_killers,
  g_zobristLow,
  g_zobristHigh,
  g_zobristBlackLow,
  g_zobristBlackHigh,
  g_mobUnit,
  g_debug = !1,
  g_timeout = 40,
  g_maxply = 99,
  worker = !1;
try {
  "DedicatedWorkerContext" === self.constructor.name && (worker = !0);
} catch (e) {}
function GetFen() {
  for (var e = "", a = 0; a < 8; a++) {
    0 !== a && (e += "/");
    for (var o = 0, t = 0; t < 8; t++) {
      var i = g_board[((a + 2) << 4) + t + 4];
      if (0 === i) o++;
      else {
        0 !== o && (e += o), (o = 0);
        var r = [" ", "p", "n", "b", "r", "q", "k", " "][7 & i];
        e += (i & colorWhite) != 0 ? r.toUpperCase() : r;
      }
    }
    0 !== o && (e += o);
  }
  return (
    (e += g_toMove == colorWhite ? " w" : " b"),
    (e += " "),
    0 === g_castleRights
      ? (e += "-")
      : ((1 & g_castleRights) != 0 && (e += "K"),
        (2 & g_castleRights) != 0 && (e += "Q"),
        (4 & g_castleRights) != 0 && (e += "k"),
        (8 & g_castleRights) != 0 && (e += "q")),
    (e += " "),
    -1 == g_enPassentSquare
      ? (e += "-")
      : (e += FormatSquare(g_enPassentSquare)),
    e
  );
}
function GetMoveSAN(e, a) {
  var o = 255 & e,
    t = (e >> 8) & 255;
  if (e & moveflagCastleKing) return "O-O";
  if (e & moveflagCastleQueen) return "O-O-O";
  var i = 7 & g_board[o],
    r = ["", "", "N", "B", "R", "Q", "K", ""][i],
    $ = !1,
    g = !0,
    n = !0;
  void 0 === a && (a = GenerateValidMoves());
  for (var s = 0; s < a.length; s++) {
    var h = 255 & a[s],
      l = (a[s] >> 8) & 255;
    h != o &&
      l == t &&
      (7 & g_board[h]) == i &&
      (($ = !0),
      (240 & h) == (240 & o) && (g = !1),
      (15 & h) == (15 & o) && (n = !1));
  }
  return (
    $
      ? n
        ? (r += FormatSquare(o).charAt(0))
        : g
        ? (r += FormatSquare(o).charAt(1))
        : (r += FormatSquare(o))
      : i === piecePawn &&
        (0 !== g_board[t] || e & moveflagEPC) &&
        (r += FormatSquare(o).charAt(0)),
    (0 !== g_board[t] || e & moveflagEPC) && (r += "x"),
    (r += FormatSquare(t)),
    e & moveflagPromotion &&
      (e & moveflagPromoteBishop
        ? (r += "=B")
        : e & moveflagPromoteKnight
        ? (r += "=N")
        : e & moveflagPromoteQueen
        ? (r += "=Q")
        : (r += "=R")),
    MakeMove(e),
    g_inCheck && (r += 0 === GenerateValidMoves().length ? "#" : "+"),
    UnmakeMove(e),
    r
  );
}
function FormatSquare(e) {
  return (
    ["a", "b", "c", "d", "e", "f", "g", "h"][(15 & e) - 4] + (9 - (e >> 4) + 1)
  );
}
function FormatMove(e) {
  var a = FormatSquare(255 & e) + FormatSquare((e >> 8) & 255);
  return (
    e & moveflagPromotion &&
      (e & moveflagPromoteBishop
        ? (a += "b")
        : e & moveflagPromoteKnight
        ? (a += "n")
        : e & moveflagPromoteQueen
        ? (a += "q")
        : (a += "r")),
    a
  );
}
function GetMoveFromString(e) {
  for (var a = GenerateValidMoves(), o = 0; o < a.length; o++)
    if (FormatMove(a[o]) == e) return a[o];
}
function PVFromHash(e, a) {
  if (0 === a) return "";
  if (0 === e) return g_inCheck ? "checkmate" : "stalemate";
  var o = " " + GetMoveSAN(e);
  MakeMove(e);
  var t = g_hashTable[g_hashKeyLow & g_hashMask];
  return (
    void 0 !== t &&
      t.lock === g_hashKeyHigh &&
      void 0 !== t.bestMove &&
      (o += PVFromHash(t.bestMove, a - 1)),
    UnmakeMove(e),
    o
  );
}
debug("worker = " + worker);
var g_globalPly = 0;
function Search(e, a, o) {
  if (
    (debug("start search with maxPly:" + a + " and timeout " + g_timeout),
    0 === GenerateValidMoves().length)
  )
    return debug(g_inCheck ? "Checkmate" : "Stalemate"), !1;
  var t,
    i,
    r = minEval,
    $ = maxEval;
  g_globalPly++, (g_nodeCount = 0), (g_qNodeCount = 0), (g_searchValid = !0);
  var g = 0;
  for (
    i = 1, g_startTime = new Date().getTime();
    i <= a && g_searchValid;
    i++
  ) {
    var n = AlphaBeta(i, 0, r, $);
    if (!g_searchValid) break;
    (t = n) > r && t < $
      ? ((r = t - 500),
        ($ = t + 500),
        r < minEval && (r = minEval),
        $ > maxEval && ($ = maxEval))
      : r != minEval && ((r = minEval), ($ = maxEval), i--),
      void 0 !== g_hashTable[g_hashKeyLow & g_hashMask] &&
        (g = g_hashTable[g_hashKeyLow & g_hashMask].bestMove),
      void 0 !== o && o(g, t, new Date().getTime() - g_startTime, i);
  }
  void 0 !== e && e(g, t, new Date().getTime() - g_startTime, i - 1);
}
var minEval = -2e6,
  maxEval = 2e6,
  minMateBuffer = minEval + 2e3,
  maxMateBuffer = maxEval - 2e3,
  materialTable = [0, 800, 3350, 3450, 5e3, 9750, 6e5],
  pawnAdj = [
    0, 0, 0, 0, 0, 0, 0, 0, -25, 105, 135, 270, 270, 135, 105, -25, -80, 0, 30,
    176, 176, 30, 0, -80, -85, -5, 25, 175, 175, 25, -5, -85, -90, -10, 20, 125,
    125, 20, -10, -90, -95, -15, 15, 75, 75, 15, -15, -95, -100, -20, 10, 70,
    70, 10, -20, -100, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  knightAdj = [
    -200, -100, -50, -50, -50, -50, -100, -200, -100, 0, 0, 0, 0, 0, 0, -100,
    -50, 0, 60, 60, 60, 60, 0, -50, -50, 0, 30, 60, 60, 30, 0, -50, -50, 0, 30,
    60, 60, 30, 0, -50, -50, 0, 30, 30, 30, 30, 0, -50, -100, 0, 0, 0, 0, 0, 0,
    -100, -200, -50, -25, -25, -25, -25, -50, -200,
  ],
  bishopAdj = [
    -50, -50, -25, -10, -10, -25, -50, -50, -50, -25, -10, 0, 0, -10, -25, -50,
    -25, -10, 0, 25, 25, 0, -10, -25, -10, 0, 25, 40, 40, 25, 0, -10, -10, 0,
    25, 40, 40, 25, 0, -10, -25, -10, 0, 25, 25, 0, -10, -25, -50, -25, -10, 0,
    0, -10, -25, -50, -50, -50, -25, -10, -10, -25, -50, -50,
  ],
  rookAdj = [
    -60, -30, -10, 20, 20, -10, -30, -60, 40, 70, 90, 120, 120, 90, 70, 40, -60,
    -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60,
    -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60,
    -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60,
  ],
  kingAdj = [
    50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150,
    50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25,
    150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125,
    -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 150, 250, 75, -25,
    -25, 75, 250, 150,
  ],
  emptyAdj = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pieceSquareAdj = Array(8),
  flipTable = Array(256);
function PawnEval(e) {
  for (var a = (1 | e) << 4, o = g_pieceList[a++]; 0 !== o; )
    o = g_pieceList[a++];
}
function Mobility(e) {
  var a,
    o,
    t,
    i,
    r = 0,
    $ = 8 == e ? 16 : 8,
    g = 8 == e ? g_mobUnit[0] : g_mobUnit[1];
  for (t = -3, i = (2 | e) << 4, a = g_pieceList[i++]; 0 !== a; )
    (t += g[g_board[a + 31]]),
      (t += g[g_board[a + 33]]),
      (t += g[g_board[a + 14]]),
      (t += g[g_board[a - 14]]),
      (t += g[g_board[a - 31]]),
      (t += g[g_board[a - 33]]),
      (t += g[g_board[a + 18]]),
      (t += g[g_board[a - 18]]),
      (a = g_pieceList[i++]);
  for (r += 65 * t, t = -4, i = (3 | e) << 4, a = g_pieceList[i++]; 0 !== a; ) {
    for (o = a - 15; 0 === g_board[o]; ) (o -= 15), t++;
    if (g_board[o] & $ && (t++, !(g_board[o] & piecePawn))) {
      for (o -= 15; 0 === g_board[o]; ) o -= 15;
      t += g[g_board[o]] << 2;
    }
    for (o = a - 17; 0 === g_board[o]; ) (o -= 17), t++;
    if (g_board[o] & $ && (t++, !(g_board[o] & piecePawn))) {
      for (o -= 17; 0 === g_board[o]; ) o -= 17;
      t += g[g_board[o]] << 2;
    }
    for (o = a + 15; 0 === g_board[o]; ) (o += 15), t++;
    if (g_board[o] & $ && (t++, !(g_board[o] & piecePawn))) {
      for (o += 15; 0 === g_board[o]; ) o += 15;
      t += g[g_board[o]] << 2;
    }
    for (o = a + 17; 0 === g_board[o]; ) (o += 17), t++;
    if (g_board[o] & $ && (t++, !(g_board[o] & piecePawn))) {
      for (o += 17; 0 === g_board[o]; ) o += 17;
      t += g[g_board[o]] << 2;
    }
    a = g_pieceList[i++];
  }
  for (r += 44 * t, t = -4, i = (4 | e) << 4, a = g_pieceList[i++]; 0 !== a; ) {
    for (o = a - 1; 0 === g_board[o]; ) o--, t++;
    for (g_board[o] & $ && t++, o = a + 1; 0 === g_board[o]; ) o++, t++;
    for (g_board[o] & $ && t++, o = a + 16; 0 === g_board[o]; ) (o += 16), t++;
    for (g_board[o] & $ && t++, o = a - 16; 0 === g_board[o]; ) (o -= 16), t++;
    g_board[o] & $ && t++, (a = g_pieceList[i++]);
  }
  for (r += 25 * t, t = -2, i = (5 | e) << 4, a = g_pieceList[i++]; 0 !== a; ) {
    for (o = a - 15; 0 === g_board[o]; ) (o -= 15), t++;
    for (g_board[o] & $ && t++, o = a - 17; 0 === g_board[o]; ) (o -= 17), t++;
    for (g_board[o] & $ && t++, o = a + 15; 0 === g_board[o]; ) (o += 15), t++;
    for (g_board[o] & $ && t++, o = a + 17; 0 === g_board[o]; ) (o += 17), t++;
    for (g_board[o] & $ && t++, o = a - 1; 0 === g_board[o]; ) o--, t++;
    for (g_board[o] & $ && t++, o = a + 1; 0 === g_board[o]; ) o++, t++;
    for (g_board[o] & $ && t++, o = a + 16; 0 === g_board[o]; ) (o += 16), t++;
    for (g_board[o] & $ && t++, o = a - 16; 0 === g_board[o]; ) (o -= 16), t++;
    g_board[o] & $ && t++, (a = g_pieceList[i++]);
  }
  return r + 22 * t;
}
function Evaluate() {
  var e = g_baseEval,
    a = 0;
  0 === g_pieceList[pieceQueen << 4] &&
    (a -=
      pieceSquareAdj[pieceKing][g_pieceList[(colorWhite | pieceKing) << 4]]),
    0 === g_pieceList[(colorWhite | pieceQueen) << 4] &&
      (a += pieceSquareAdj[pieceKing][flipTable[g_pieceList[pieceKing << 4]]]),
    g_pieceCount[pieceBishop] >= 2 && (a -= 500),
    g_pieceCount[pieceBishop | colorWhite] >= 2 && (a += 500);
  var o = Mobility(8) - Mobility(0);
  return 0 === g_toMove ? ((e -= o), (e -= a)) : ((e += o), (e += a)), e;
}
function ScoreMove(e) {
  var a,
    o = (e >> 8) & 255,
    t = 7 & g_board[o],
    i = g_board[255 & e];
  return 0 !== t ? (t << 5) - (7 & i) : historyTable[15 & i][o];
}
function QSearch(e, a, o) {
  g_qNodeCount++;
  var t,
    i = g_inCheck ? minEval + 1 : Evaluate();
  if (i >= a) return i;
  i > e && (e = i);
  var r = [],
    $ = [],
    g = g_inCheck;
  if (g)
    for (
      GenerateCaptureMoves(r, null), GenerateAllMoves(r), t = 0;
      t < r.length;
      t++
    )
      $[t] = ScoreMove(r[t]);
  else
    for (GenerateCaptureMoves(r, null), t = 0; t < r.length; t++) {
      var n = 7 & g_board[(r[t] >> 8) & 255],
        s = 7 & g_board[255 & r[t]];
      $[t] = (n << 5) - s;
    }
  for (t = 0; t < r.length; t++) {
    for (var h = t, l = r.length - 1; l > t; l--) $[l] > $[h] && (h = l);
    var v = r[t];
    (r[t] = r[h]), (r[h] = v);
    var _ = $[t];
    if ((($[t] = $[h]), ($[h] = _), (g || See(r[t])) && MakeMove(r[t]))) {
      var c = -QSearch(-a, -e, o - 1);
      if ((UnmakeMove(r[t]), c > i)) {
        if (c >= a) return c;
        c > e && (e = c), (i = c);
      }
    }
  }
  return i;
}
function StoreHash(e, a, o, t, i) {
  e >= maxMateBuffer ? (e += i) : e <= minMateBuffer && (e -= i),
    (g_hashTable[g_hashKeyLow & g_hashMask] = new HashEntry(
      g_hashKeyHigh,
      e,
      a,
      o,
      t
    ));
}
function IsHashMoveValid(e) {
  var a = 255 & e,
    o = (e >> 8) & 255,
    t = g_board[a],
    i = 7 & t;
  if (
    i < piecePawn ||
    i > pieceKing ||
    g_toMove != (8 & t) ||
    (0 !== g_board[o] && g_toMove == (8 & g_board[o]))
  )
    return !1;
  if (i == piecePawn) {
    if (e & moveflagEPC) return !1;
    var r = o - a;
    if ((g_toMove == colorWhite) != r < 0) return !1;
    var $ = 240 & o;
    if (
      ((144 == $ && !g_toMove) || (32 == $ && g_toMove)) !==
      (e & moveflagPromotion)
    )
      return !1;
    if (-16 === r || 16 === r) return 0 === g_board[o];
    if (-15 === r || -17 === r || 15 === r || 17 === r) return 0 !== g_board[o];
    if (-32 === r) {
      if (96 !== $ || 0 !== g_board[o] || 0 !== g_board[a - 16]) return !1;
    } else if (32 != r) return !1;
    else if (80 !== $ || 0 !== g_board[o] || 0 !== g_board[a + 16]) return !1;
    return !0;
  }
  return !(e >> 16) && IsSquareAttackableFrom(o, a);
}
function IsRepDraw() {
  var e = g_moveCount - 1 - g_move50;
  e = e < 0 ? 0 : e;
  for (var a = g_moveCount - 5; a >= e; a -= 2)
    if (g_repMoveStack[a] == g_hashKeyLow) return !0;
  return !1;
}
function MovePicker(e, a, o, t) {
  (this.hashMove = e),
    (this.depth = a),
    (this.killer1 = o),
    (this.killer2 = t),
    (this.moves = []),
    (this.losingCaptures = null),
    (this.moveCount = 0),
    (this.atMove = -1),
    (this.moveScores = null),
    (this.stage = 0),
    (this.nextMove = function () {
      if (++this.atMove == this.moveCount) {
        if (
          (this.stage++,
          1 == this.stage &&
            (void 0 !== this.hashMove &&
              IsHashMoveValid(e) &&
              ((this.moves[0] = e), (this.moveCount = 1)),
            1 != this.moveCount && ((this.hashMove = void 0), this.stage++)),
          2 == this.stage)
        ) {
          for (
            GenerateCaptureMoves(this.moves, null),
              this.moveCount = this.moves.length,
              this.moveScores = Array(this.moveCount),
              a = this.atMove;
            a < this.moveCount;
            a++
          ) {
            var a,
              o = 7 & g_board[(this.moves[a] >> 8) & 255],
              t = 7 & g_board[255 & this.moves[a]];
            this.moveScores[a] = (o << 5) - t;
          }
          this.atMove == this.moveCount && this.stage++;
        }
        if (
          (3 == this.stage &&
            (IsHashMoveValid(this.killer1) && this.killer1 != this.hashMove
              ? ((this.moves[this.moves.length] = this.killer1),
                (this.moveCount = this.moves.length))
              : ((this.killer1 = 0), this.stage++)),
          4 == this.stage &&
            (IsHashMoveValid(this.killer2) && this.killer2 != this.hashMove
              ? ((this.moves[this.moves.length] = this.killer2),
                (this.moveCount = this.moves.length))
              : ((this.killer2 = 0), this.stage++)),
          5 == this.stage)
        ) {
          for (
            GenerateAllMoves(this.moves),
              this.moveCount = this.moves.length,
              a = this.atMove;
            a < this.moveCount;
            a++
          )
            this.moveScores[a] = ScoreMove(this.moves[a]);
          this.atMove === this.moveCount && this.stage++;
        }
        if (6 === this.stage) {
          if (null !== this.losingCaptures) {
            for (a = 0; a < this.losingCaptures.length; a++)
              this.moves[this.moves.length] = this.losingCaptures[a];
            for (a = this.atMove; a < this.moveCount; a++)
              this.moveScores[a] = ScoreMove(this.moves[a]);
            this.moveCount = this.moves.length;
          }
          this.atMove === this.moveCount && this.stage++;
        }
        if (7 === this.stage) return 0;
      }
      for (var i = this.atMove, r = this.atMove + 1; r < this.moveCount; r++)
        this.moveScores[r] > this.moveScores[i] && (i = r);
      if (i != this.atMove) {
        var $ = this.moves[this.atMove];
        (this.moves[this.atMove] = this.moves[i]), (this.moves[i] = $);
        var g = this.moveScores[this.atMove];
        (this.moveScores[this.atMove] = this.moveScores[i]),
          (this.moveScores[i] = g);
      }
      var n = this.moves[this.atMove];
      return (this.stage > 1 && n == this.hashMove) ||
        (this.stage > 3 && n == this.killer1) ||
        (this.stage > 4 && n == this.killer2)
        ? this.nextMove()
        : 2 !== this.stage || See(n)
        ? this.moves[this.atMove]
        : (null === this.losingCaptures && (this.losingCaptures = []),
          (this.losingCaptures[this.losingCaptures.length] = n),
          this.nextMove());
    });
}
function AllCutNode(e, a, o, t) {
  if (e <= 0) return QSearch(o - 1, o, 0);
  if (
    (127 & g_nodeCount) == 127 &&
    new Date().getTime() - g_startTime > g_timeout
  )
    return (g_searchValid = !1), o - 1;
  if ((g_nodeCount++, IsRepDraw())) return 0;
  if (minEval + a >= o) return o;
  if (maxEval - (a + 1) < o) return o - 1;
  var i,
    r = null,
    $ = g_hashTable[g_hashKeyLow & g_hashMask];
  if (
    void 0 !== $ &&
    $.lock === g_hashKeyHigh &&
    ((r = $.bestMove), $.hashDepth >= e)
  ) {
    var g = $.value;
    if (
      (g >= maxMateBuffer ? (g -= a) : g <= minMateBuffer && (g += a),
      $.flags === hashflagExact ||
        ($.flags === hashflagAlpha && g < o) ||
        ($.flags === hashflagBeta && g >= o))
    )
      return g;
  }
  if (!g_inCheck && t && o > minMateBuffer && o < maxMateBuffer) {
    if (void 0 === r && e < 4) {
      var n = 2500 + 200 * e;
      if (g_baseEval < o - n) {
        var s = o - n,
          h = QSearch(s - 1, s, 0);
        if (h < s) return h;
      }
    }
    if (
      e > 1 &&
      g_baseEval >= o - (e >= 4 ? 2500 : 0) &&
      (0 !== g_pieceCount[pieceBishop | g_toMove] ||
        0 !== g_pieceCount[pieceKnight | g_toMove] ||
        0 !== g_pieceCount[pieceRook | g_toMove] ||
        0 !== g_pieceCount[pieceQueen | g_toMove])
    ) {
      var l = 3 + (e >= 5 ? 1 : e / 4);
      if (
        (g_baseEval - o > 1500 && l++,
        (g_toMove = 8 - g_toMove),
        (g_baseEval = -g_baseEval),
        (g_hashKeyLow ^= g_zobristBlackLow),
        (g_hashKeyHigh ^= g_zobristBlackHigh),
        (i = -AllCutNode(e - l, a + 1, -(o - 1), !1)),
        (g_hashKeyLow ^= g_zobristBlackLow),
        (g_hashKeyHigh ^= g_zobristBlackHigh),
        (g_toMove = 8 - g_toMove),
        (g_baseEval = -g_baseEval),
        i >= o)
      )
        return o;
    }
  }
  for (
    var v = !1,
      _ = minEval - 1,
      c = new MovePicker(r, a, g_killers[a][0], g_killers[a][1]);
    ;

  ) {
    var d = c.nextMove();
    if (0 === d) break;
    var b = e - 1;
    if (MakeMove(d)) {
      i = null;
      var f = !0;
      if (g_inCheck) b++;
      else {
        var u = b - (c.atMove > 14 ? 2 : 1);
        5 == c.stage &&
          c.atMove > 5 &&
          e >= 3 &&
          (f = (i = -AllCutNode(u, a + 1, -(o - 1), !0)) >= o);
      }
      if (
        (f && (i = -AllCutNode(b, a + 1, -(o - 1), !0)),
        (v = !0),
        UnmakeMove(d),
        !g_searchValid)
      )
        return o - 1;
      if (i > _) {
        if (i >= o) {
          var p = (d >> 8) & 255;
          if (0 === g_board[p]) {
            var m = 15 & g_board[255 & d];
            (historyTable[m][p] += e * e),
              historyTable[m][p] > 32767 && (historyTable[m][p] >>= 1),
              g_killers[a][0] != d &&
                ((g_killers[a][1] = g_killers[a][0]), (g_killers[a][0] = d));
          }
          return StoreHash(i, hashflagBeta, e, d, a), i;
        }
        (_ = i), (r = d);
      }
    }
  }
  return v
    ? (StoreHash(_, hashflagAlpha, e, r, a), _)
    : g_inCheck
    ? minEval + a
    : 0;
}
function AlphaBeta(e, a, o, t) {
  if (e <= 0) return QSearch(o, t, 0);
  if ((g_nodeCount++, a > 0 && IsRepDraw())) return 0;
  var i = o;
  if (
    (o = o < minEval + a ? o : minEval + a) >=
    (t = t > maxEval - (a + 1) ? t : maxEval - (a + 1))
  )
    return o;
  var r = null,
    $ = hashflagAlpha,
    g = g_hashTable[g_hashKeyLow & g_hashMask];
  void 0 !== g && g.lock === g_hashKeyHigh && (r = g.bestMove);
  for (
    var n = g_inCheck,
      s = !1,
      h = minEval,
      l = new MovePicker(r, a, g_killers[a][0], g_killers[a][1]);
    ;

  ) {
    var v,
      _ = l.nextMove();
    if (0 === _) break;
    var c = e - 1;
    if (MakeMove(_)) {
      if (
        (g_inCheck && c++,
        s
          ? (v = -AllCutNode(c, a + 1, -o, !0)) > o &&
            (v = -AlphaBeta(c, a + 1, -t, -o))
          : (v = -AlphaBeta(c, a + 1, -t, -o)),
        (s = !0),
        UnmakeMove(_),
        !g_searchValid)
      )
        return o;
      if (v > h) {
        if (v >= t) {
          var d = (_ >> 8) & 255;
          if (0 === g_board[d]) {
            var b = 15 & g_board[255 & _];
            (historyTable[b][d] += e * e),
              historyTable[b][d] > 32767 && (historyTable[b][d] >>= 1),
              g_killers[a][0] !== _ &&
                ((g_killers[a][1] = g_killers[a][0]), (g_killers[a][0] = _));
          }
          return StoreHash(v, hashflagBeta, e, _, a), v;
        }
        v > i && (($ = hashflagExact), (o = v)), (h = v), (r = _);
      }
    }
  }
  return s ? (StoreHash(h, $, e, r, a), h) : n ? minEval + a : 0;
}
var colorBlack = 16,
  colorWhite = 8,
  pieceEmpty = 0,
  piecePawn = 1,
  pieceKnight = 2,
  pieceBishop = 3,
  pieceRook = 4,
  pieceQueen = 5,
  pieceKing = 6,
  g_vectorDelta = Array(256),
  g_bishopDeltas = [-15, -17, 15, 17],
  g_knightDeltas = [31, 33, 14, -14, -31, -33, 18, -18],
  g_rookDeltas = [-1, 1, -16, 16],
  g_queenDeltas = [-1, 1, -15, 15, -17, 17, -16, 16],
  g_castleRightsMask = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 15, 15, 15, 3, 15, 15, 11, 0, 0, 0, 0,
    0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15,
    15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15,
    15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0,
    0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15,
    15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 13, 15, 15, 15, 12, 15, 15, 14,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  moveflagEPC = 131072,
  moveflagCastleKing = 262144,
  moveflagCastleQueen = 524288,
  moveflagPromotion = 1048576,
  moveflagPromoteRook = 0,
  moveflagPromoteKnight = 2097152,
  moveflagPromoteQueen = 4194304,
  moveflagPromoteBishop = 8388608;
function MT() {
  var e = [0, 2567483615];
  (this.mt = Array(624)),
    (this.mti = 625),
    (this.setSeed = function () {
      var e,
        a,
        o,
        t = arguments;
      if (1 === t.length) {
        if (t[0].constructor === Number) {
          for (e = 1, this.mt[0] = t[0]; e < 624; ++e)
            (a = this.mt[e - 1] ^ (this.mt[e - 1] >>> 30)),
              (this.mt[e] =
                ((1812433253 * ((4294901760 & a) >>> 16)) << 16) +
                1812433253 * (65535 & a) +
                e);
          this.mti = 624;
          return;
        }
        this.setSeed(19650218);
        var i = t[0].length,
          r = 0;
        for (e = 1, o = 624 > i ? 624 : i; 0 !== o; --o)
          (a = this.mt[e - 1] ^ (this.mt[e - 1] >>> 30)),
            (this.mt[e] =
              (this.mt[e] ^
                (((1664525 * ((4294901760 & a) >>> 16)) << 16) +
                  1664525 * (65535 & a))) +
              t[0][r] +
              r),
            ++e >= 624 && ((this.mt[0] = this.mt[623]), (e = 1)),
            ++r >= i && (r = 0);
        for (o = 623; 0 !== o; --o)
          (a = this.mt[e - 1] ^ (this.mt[e - 1] >>> 30)),
            (this.mt[e] =
              (this.mt[e] ^
                (((1566083941 * ((4294901760 & a) >>> 16)) << 16) +
                  1566083941 * (65535 & a))) -
              e),
            ++e >= 624 && ((this.mt[0] = this.mt[623]), (e = 1));
        this.mt[0] = 2147483648;
        return;
      }
      var $ = [];
      for (e = 0; e < t.length; ++e) $.push(t[e]);
      this.setSeed($);
    }),
    this.setSeed(464384013),
    (this.next = function (a) {
      if (this.mti >= 624) {
        var o,
          t = 0;
        for (o = 0; o < 227; ++o)
          (t = (2147483648 & this.mt[o]) | (2147483647 & this.mt[o + 1])),
            (this.mt[o] = this.mt[o + 397] ^ (t >>> 1) ^ e[1 & t]);
        for (o = 227; o < 623; ++o)
          (t = (2147483648 & this.mt[o]) | (2147483647 & this.mt[o + 1])),
            (this.mt[o] = this.mt[o + -227] ^ (t >>> 1) ^ e[1 & t]);
        (t = (2147483648 & this.mt[623]) | (2147483647 & this.mt[0])),
          (this.mt[623] = this.mt[396] ^ (t >>> 1) ^ e[1 & t]),
          (this.mti = 0);
      }
      var i = this.mt[this.mti++];
      return (
        (i ^= i >>> 11),
        (i ^= (i << 7) & 2636928640),
        (i ^= (i << 15) & 4022730752),
        ((i ^= i >>> 18) >>> (32 - a)) & 4294967295
      );
    });
}
var g_board = Array(256),
  g_moveCount = 0,
  g_moveUndoStack = [],
  g_move50 = 0,
  g_repMoveStack = [],
  g_hashSize = 4194304,
  g_hashMask = g_hashSize - 1,
  historyTable = Array(32),
  hashflagAlpha = 1,
  hashflagBeta = 2,
  hashflagExact = 3;
function HashEntry(e, a, o, t, i, r) {
  (this.lock = e),
    (this.value = a),
    (this.flags = o),
    (this.hashDepth = t),
    (this.bestMove = i);
}
function MakeSquare(e, a) {
  return ((e + 2) << 4) | (a + 4);
}
function MakeTable(e) {
  for (var a = Array(256), o = 0; o < 256; o++) a[o] = 0;
  for (var t = 0; t < 8; t++)
    for (var i = 0; i < 8; i++) a[MakeSquare(t, i)] = e[8 * t + i];
  return a;
}
function ResetGame(e) {
  for (a = 0, g_killers = Array(128); a < 128; a++) g_killers[a] = [0, 0];
  for (a = 0, g_hashTable = Array(g_hashSize); a < 32; a++)
    for (o = 0, historyTable[a] = Array(256); o < 256; o++)
      historyTable[a][o] = 0;
  var a,
    o,
    t,
    i,
    r,
    $ = new MT(464384013);
  for (
    a = 0, g_zobristLow = Array(256), g_zobristHigh = Array(256);
    a < 256;
    a++
  )
    for (
      o = 0, g_zobristLow[a] = Array(16), g_zobristHigh[a] = Array(16);
      o < 16;
      o++
    )
      (g_zobristLow[a][o] = $.next(32)), (g_zobristHigh[a][o] = $.next(32));
  for (
    t = 0, g_zobristBlackLow = $.next(32), g_zobristBlackHigh = $.next(32);
    t < 8;
    t++
  )
    for (i = 0; i < 8; i++)
      flipTable[(r = MakeSquare(t, i))] = MakeSquare(7 - t, i);
  (pieceSquareAdj[piecePawn] = MakeTable(pawnAdj)),
    (pieceSquareAdj[pieceKnight] = MakeTable(knightAdj)),
    (pieceSquareAdj[pieceBishop] = MakeTable(bishopAdj)),
    (pieceSquareAdj[pieceRook] = MakeTable(rookAdj)),
    (pieceSquareAdj[pieceQueen] = MakeTable(emptyAdj)),
    (pieceSquareAdj[pieceKing] = MakeTable(kingAdj));
  var g = [
    [],
    [],
    g_knightDeltas,
    g_bishopDeltas,
    g_rookDeltas,
    g_queenDeltas,
    g_queenDeltas,
  ];
  for (a = 0; a < 256; a++)
    (g_vectorDelta[a] = {}),
      (g_vectorDelta[a].delta = 0),
      (g_vectorDelta[a].pieceMask = [, ,]),
      (g_vectorDelta[a].pieceMask[0] = 0),
      (g_vectorDelta[a].pieceMask[1] = 0);
  for (t = 0; t < 128; t += 16)
    for (i = 0; i < 8; i++) {
      var n = (r = t | i) - (r - 17) + 128;
      for (
        g_vectorDelta[n].pieceMask[colorWhite >> 3] |= 1 << piecePawn,
          n = r - (r - 15) + 128,
          g_vectorDelta[n].pieceMask[colorWhite >> 3] |= 1 << piecePawn,
          n = r - (r + 17) + 128,
          g_vectorDelta[n].pieceMask[0] |= 1 << piecePawn,
          n = r - (r + 15) + 128,
          g_vectorDelta[n].pieceMask[0] |= 1 << piecePawn,
          a = pieceKnight;
        a <= pieceKing;
        a++
      )
        for (var s = 0; s < g[a].length; s++)
          for (var h = r + g[a][s]; !(136 & h); ) {
            (n = r - h + 128),
              (g_vectorDelta[n].pieceMask[colorWhite >> 3] |= 1 << a),
              (g_vectorDelta[n].pieceMask[0] |= 1 << a);
            var l = -1;
            if (
              (r < h && (l = 1),
              (240 & r) == (240 & h)
                ? (g_vectorDelta[n].delta = 1 * l)
                : (15 & r) == (15 & h)
                ? (g_vectorDelta[n].delta = 16 * l)
                : r % 15 == h % 15
                ? (g_vectorDelta[n].delta = 15 * l)
                : r % 17 == h % 17 && (g_vectorDelta[n].delta = 17 * l),
              a == pieceKnight)
            ) {
              g_vectorDelta[n].delta = g[a][s];
              break;
            }
            if (a == pieceKing) break;
            h += g[a][s];
          }
    }
  InitializeEval(),
    InitializeFromFen(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
}
function InitializeEval() {
  g_mobUnit = [, ,];
  for (var e = 0; e < 2; e++) {
    g_mobUnit[e] = [];
    var a = 0 === e ? 16 : 8,
      o = 0 === e ? 8 : 16;
    (g_mobUnit[e][0] = 1),
      (g_mobUnit[e][128] = 0),
      (g_mobUnit[e][a | piecePawn] = 1),
      (g_mobUnit[e][a | pieceBishop] = 2),
      (g_mobUnit[e][a | pieceKnight] = 2),
      (g_mobUnit[e][a | pieceRook] = 4),
      (g_mobUnit[e][a | pieceQueen] = 6),
      (g_mobUnit[e][a | pieceKing] = 6),
      (g_mobUnit[e][o | piecePawn] = 0),
      (g_mobUnit[e][o | pieceBishop] = 0),
      (g_mobUnit[e][o | pieceKnight] = 0),
      (g_mobUnit[e][o | pieceRook] = 0),
      (g_mobUnit[e][o | pieceQueen] = 0),
      (g_mobUnit[e][o | pieceKing] = 0);
  }
}
function SetHash() {
  var e = {};
  (e.hashKeyLow = 0), (e.hashKeyHigh = 0);
  for (var a = 0; a < 256; a++) {
    var o = g_board[a];
    24 & o &&
      ((e.hashKeyLow ^= g_zobristLow[a][15 & o]),
      (e.hashKeyHigh ^= g_zobristHigh[a][15 & o]));
  }
  return (
    g_toMove ||
      ((e.hashKeyLow ^= g_zobristBlackLow),
      (e.hashKeyHigh ^= g_zobristBlackHigh)),
    e
  );
}
function InitializeFromFen(e) {
  var a,
    o = 0,
    t = 0,
    i = e.split(" ");
  for (a = 0; a < 256; a++) g_board[a] = 128;
  var r = i[0];
  for (a = 0; a < r.length; a++) {
    var $ = r.charAt(a);
    if ("/" == $) o++, (t = 0);
    else if ($ >= "0" && $ <= "9")
      for (var g = 0; g < parseInt($, 10); g++)
        (g_board[MakeSquare(o, t)] = 0), t++;
    else {
      var n = $ >= "a" && $ <= "z",
        s = n ? colorBlack : colorWhite;
      switch ((n || ($ = r.toLowerCase().charAt(a)), $)) {
        case "p":
          s |= piecePawn;
          break;
        case "b":
          s |= pieceBishop;
          break;
        case "n":
          s |= pieceKnight;
          break;
        case "r":
          s |= pieceRook;
          break;
        case "q":
          s |= pieceQueen;
          break;
        case "k":
          s |= pieceKing;
      }
      (g_board[MakeSquare(o, t)] = s), t++;
    }
  }
  InitializePieceList();
  var h = 8 - (g_toMove = "w" == i[1].charAt(0) ? colorWhite : 0);
  if (((g_castleRights = 0), -1 != i[2].indexOf("K"))) {
    if (
      g_board[MakeSquare(7, 4)] != (pieceKing | colorWhite) ||
      g_board[MakeSquare(7, 7)] != (pieceRook | colorWhite)
    )
      return "Invalid FEN: White kingside castling not allowed";
    g_castleRights |= 1;
  }
  if (-1 != i[2].indexOf("Q")) {
    if (
      g_board[MakeSquare(7, 4)] != (pieceKing | colorWhite) ||
      g_board[MakeSquare(7, 0)] != (pieceRook | colorWhite)
    )
      return "Invalid FEN: White queenside castling not allowed";
    g_castleRights |= 2;
  }
  if (-1 != i[2].indexOf("k")) {
    if (
      g_board[MakeSquare(0, 4)] != (pieceKing | colorBlack) ||
      g_board[MakeSquare(0, 7)] != (pieceRook | colorBlack)
    )
      return "Invalid FEN: Black kingside castling not allowed";
    g_castleRights |= 4;
  }
  if (-1 != i[2].indexOf("q")) {
    if (
      g_board[MakeSquare(0, 4)] != (pieceKing | colorBlack) ||
      g_board[MakeSquare(0, 0)] != (pieceRook | colorBlack)
    )
      return "Invalid FEN: Black queenside castling not allowed";
    g_castleRights |= 8;
  }
  (g_enPassentSquare = -1),
    -1 == i[3].indexOf("-") &&
      ((t = i[3].charAt(0).charCodeAt() - "a".charCodeAt()),
      (g_enPassentSquare = MakeSquare(
        (o = 8 - (i[3].charAt(1).charCodeAt() - "0".charCodeAt())),
        t
      )));
  var l = SetHash();
  for (
    a = 0,
      g_hashKeyLow = l.hashKeyLow,
      g_hashKeyHigh = l.hashKeyHigh,
      g_baseEval = 0;
    a < 256;
    a++
  )
    g_board[a] & colorWhite
      ? ((g_baseEval += pieceSquareAdj[7 & g_board[a]][a]),
        (g_baseEval += materialTable[7 & g_board[a]]))
      : g_board[a] & colorBlack &&
        ((g_baseEval -= pieceSquareAdj[7 & g_board[a]][flipTable[a]]),
        (g_baseEval -= materialTable[7 & g_board[a]]));
  return (g_toMove || (g_baseEval = -g_baseEval),
  (g_move50 = 0),
  (g_inCheck = IsSquareAttackable(g_pieceList[(g_toMove | pieceKing) << 4], h)),
  IsSquareAttackable(g_pieceList[(h | pieceKing) << 4], g_toMove))
    ? "Invalid FEN: Can capture king"
    : 0 === GenerateValidMoves().length
    ? g_inCheck
      ? "Checkmate"
      : "Stalemate"
    : "";
}
var g_pieceIndex = Array(256),
  g_pieceList = Array(256),
  g_pieceCount = Array(16);
function InitializePieceList() {
  var e;
  for (e = 0; e < 16; e++) {
    g_pieceCount[e] = 0;
    for (var a = 0; a < 16; a++) g_pieceList[(e << 4) | a] = 0;
  }
  for (e = 0; e < 256; e++)
    if (((g_pieceIndex[e] = 0), g_board[e] & (colorWhite | colorBlack))) {
      var o = 15 & g_board[e];
      (g_pieceList[(o << 4) | g_pieceCount[o]] = e),
        (g_pieceIndex[e] = g_pieceCount[o]),
        g_pieceCount[o]++;
    }
}
function MakeMove(e) {
  var a,
    o,
    t = g_toMove >> 3,
    i = 8 - g_toMove,
    r = 16711680 & e,
    $ = (e >> 8) & 255,
    g = 255 & e,
    n = g_board[$],
    s = g_board[g],
    h = $;
  if (
    (r & moveflagEPC &&
      ((n = g_board[(h = t ? $ + 16 : $ - 16)]), (g_board[h] = pieceEmpty)),
    (g_moveUndoStack[g_moveCount] = new UndoHistory(
      g_enPassentSquare,
      g_castleRights,
      g_inCheck,
      g_baseEval,
      g_hashKeyLow,
      g_hashKeyHigh,
      g_move50,
      n
    )),
    g_moveCount++,
    (g_enPassentSquare = -1),
    r)
  ) {
    if (r & moveflagCastleKing) {
      if (IsSquareAttackable(g + 1, i) || IsSquareAttackable(g + 2, i))
        return g_moveCount--, !1;
      (a = g_board[$ + 1]),
        (g_hashKeyLow ^= g_zobristLow[$ + 1][15 & a]),
        (g_hashKeyHigh ^= g_zobristHigh[$ + 1][15 & a]),
        (g_hashKeyLow ^= g_zobristLow[$ - 1][15 & a]),
        (g_hashKeyHigh ^= g_zobristHigh[$ - 1][15 & a]),
        (g_board[$ - 1] = a),
        (g_board[$ + 1] = pieceEmpty),
        (g_baseEval -=
          pieceSquareAdj[7 & a][0 === t ? flipTable[$ + 1] : $ + 1]),
        (g_baseEval +=
          pieceSquareAdj[7 & a][0 === t ? flipTable[$ - 1] : $ - 1]),
        (o = g_pieceIndex[$ + 1]),
        (g_pieceIndex[$ - 1] = o),
        (g_pieceList[((15 & a) << 4) | o] = $ - 1);
    } else if (r & moveflagCastleQueen) {
      if (IsSquareAttackable(g - 1, i) || IsSquareAttackable(g - 2, i))
        return g_moveCount--, !1;
      (a = g_board[$ - 2]),
        (g_hashKeyLow ^= g_zobristLow[$ - 2][15 & a]),
        (g_hashKeyHigh ^= g_zobristHigh[$ - 2][15 & a]),
        (g_hashKeyLow ^= g_zobristLow[$ + 1][15 & a]),
        (g_hashKeyHigh ^= g_zobristHigh[$ + 1][15 & a]),
        (g_board[$ + 1] = a),
        (g_board[$ - 2] = pieceEmpty),
        (g_baseEval -=
          pieceSquareAdj[7 & a][0 === t ? flipTable[$ - 2] : $ - 2]),
        (g_baseEval +=
          pieceSquareAdj[7 & a][0 === t ? flipTable[$ + 1] : $ + 1]),
        (o = g_pieceIndex[$ - 2]),
        (g_pieceIndex[$ + 1] = o),
        (g_pieceList[((15 & a) << 4) | o] = $ + 1);
    }
  }
  if ((7 & n) > 0) {
    var l = 15 & n;
    g_pieceCount[l]--;
    var v = g_pieceList[(l << 4) | g_pieceCount[l]];
    (g_pieceIndex[v] = g_pieceIndex[h]),
      (g_pieceList[(l << 4) | g_pieceIndex[v]] = v),
      (g_pieceList[(l << 4) | g_pieceCount[l]] = 0),
      (g_baseEval += materialTable[7 & n]),
      (g_baseEval += pieceSquareAdj[7 & n][t ? flipTable[h] : h]),
      (g_hashKeyLow ^= g_zobristLow[h][l]),
      (g_hashKeyHigh ^= g_zobristHigh[h][l]),
      (g_move50 = 0);
  } else if ((7 & s) == piecePawn) {
    var _ = $ - g;
    _ < 0 && (_ = -_),
      _ > 16 && (g_enPassentSquare = t ? $ + 16 : $ - 16),
      (g_move50 = 0);
  }
  if (
    ((g_hashKeyLow ^= g_zobristLow[g][15 & s]),
    (g_hashKeyHigh ^= g_zobristHigh[g][15 & s]),
    (g_hashKeyLow ^= g_zobristLow[$][15 & s]),
    (g_hashKeyHigh ^= g_zobristHigh[$][15 & s]),
    (g_hashKeyLow ^= g_zobristBlackLow),
    (g_hashKeyHigh ^= g_zobristBlackHigh),
    (g_castleRights &= g_castleRightsMask[g] & g_castleRightsMask[$]),
    (g_baseEval -= pieceSquareAdj[7 & s][0 === t ? flipTable[g] : g]),
    (g_pieceIndex[$] = g_pieceIndex[g]),
    (g_pieceList[((15 & s) << 4) | g_pieceIndex[$]] = $),
    r & moveflagPromotion)
  ) {
    var c = -8 & s;
    r & moveflagPromoteKnight
      ? (c |= pieceKnight)
      : r & moveflagPromoteQueen
      ? (c |= pieceQueen)
      : r & moveflagPromoteBishop
      ? (c |= pieceBishop)
      : (c |= pieceRook),
      (g_hashKeyLow ^= g_zobristLow[$][15 & s]),
      (g_hashKeyHigh ^= g_zobristHigh[$][15 & s]),
      (g_board[$] = c),
      (g_hashKeyLow ^= g_zobristLow[$][15 & c]),
      (g_hashKeyHigh ^= g_zobristHigh[$][15 & c]),
      (g_baseEval += pieceSquareAdj[7 & c][0 === t ? flipTable[$] : $]),
      (g_baseEval -= materialTable[piecePawn]),
      (g_baseEval += materialTable[7 & c]);
    var d = 15 & s,
      b = 15 & c;
    g_pieceCount[d]--;
    var f = g_pieceList[(d << 4) | g_pieceCount[d]];
    (g_pieceIndex[f] = g_pieceIndex[$]),
      (g_pieceList[(d << 4) | g_pieceIndex[f]] = f),
      (g_pieceList[(d << 4) | g_pieceCount[d]] = 0),
      (g_pieceIndex[$] = g_pieceCount[b]),
      (g_pieceList[(b << 4) | g_pieceIndex[$]] = $),
      g_pieceCount[b]++;
  } else
    (g_board[$] = g_board[g]),
      (g_baseEval += pieceSquareAdj[7 & s][0 === t ? flipTable[$] : $]);
  if (
    ((g_board[g] = pieceEmpty),
    (g_toMove = i),
    (g_baseEval = -g_baseEval),
    (7 & s) == pieceKing || g_inCheck)
  ) {
    if (IsSquareAttackable(g_pieceList[(pieceKing | (8 - g_toMove)) << 4], i))
      return UnmakeMove(e), !1;
  } else {
    var u = g_pieceList[(pieceKing | (8 - g_toMove)) << 4];
    if (ExposesCheck(g, u) || (h != $ && ExposesCheck(h, u)))
      return UnmakeMove(e), !1;
  }
  if (((g_inCheck = !1), r <= moveflagEPC)) {
    var p = g_pieceList[(pieceKing | g_toMove) << 4];
    (g_inCheck = IsSquareAttackableFrom(p, $)) ||
      (g_inCheck = ExposesCheck(g, p)) ||
      h == $ ||
      (g_inCheck = ExposesCheck(h, p));
  } else
    g_inCheck = IsSquareAttackable(
      g_pieceList[(pieceKing | g_toMove) << 4],
      8 - g_toMove
    );
  return (g_repMoveStack[g_moveCount - 1] = g_hashKeyLow), g_move50++, !0;
}
function UnmakeMove(e) {
  (g_toMove = 8 - g_toMove),
    (g_baseEval = -g_baseEval),
    (g_enPassentSquare = g_moveUndoStack[--g_moveCount].ep),
    (g_castleRights = g_moveUndoStack[g_moveCount].castleRights),
    (g_inCheck = g_moveUndoStack[g_moveCount].inCheck),
    (g_baseEval = g_moveUndoStack[g_moveCount].baseEval),
    (g_hashKeyLow = g_moveUndoStack[g_moveCount].hashKeyLow),
    (g_hashKeyHigh = g_moveUndoStack[g_moveCount].hashKeyHigh),
    (g_move50 = g_moveUndoStack[g_moveCount].move50);
  var a,
    o,
    t = 16711680 & e,
    i = g_moveUndoStack[g_moveCount].captured,
    r = (e >> 8) & 255,
    $ = 255 & e,
    g = g_board[r];
  if (
    (t &&
      (t & moveflagCastleKing
        ? ((a = g_board[r - 1]),
          (g_board[r + 1] = a),
          (g_board[r - 1] = pieceEmpty),
          (o = g_pieceIndex[r - 1]),
          (g_pieceIndex[r + 1] = o),
          (g_pieceList[((15 & a) << 4) | o] = r + 1))
        : t & moveflagCastleQueen &&
          ((a = g_board[r + 1]),
          (g_board[r - 2] = a),
          (g_board[r + 1] = pieceEmpty),
          (o = g_pieceIndex[r + 1]),
          (g_pieceIndex[r - 2] = o),
          (g_pieceList[((15 & a) << 4) | o] = r - 2))),
    t & moveflagPromotion)
  ) {
    (g = (-8 & g_board[r]) | piecePawn), (g_board[$] = g);
    var n = 15 & g_board[$],
      s = 15 & g_board[r];
    g_pieceCount[s]--;
    var h = g_pieceList[(s << 4) | g_pieceCount[s]];
    (g_pieceIndex[h] = g_pieceIndex[r]),
      (g_pieceList[(s << 4) | g_pieceIndex[h]] = h),
      (g_pieceList[(s << 4) | g_pieceCount[s]] = 0),
      (g_pieceIndex[r] = g_pieceCount[n]),
      (g_pieceList[(n << 4) | g_pieceIndex[r]] = r),
      g_pieceCount[n]++;
  } else g_board[$] = g_board[r];
  var l = r;
  if (
    (t & moveflagEPC &&
      ((l = g_toMove == colorWhite ? r + 16 : r - 16),
      (g_board[r] = pieceEmpty)),
    (g_board[l] = i),
    (g_pieceIndex[$] = g_pieceIndex[r]),
    (g_pieceList[((15 & g) << 4) | g_pieceIndex[$]] = $),
    i)
  ) {
    var v = 15 & i;
    (g_pieceIndex[l] = g_pieceCount[v]),
      (g_pieceList[(v << 4) | g_pieceCount[v]] = l),
      g_pieceCount[v]++;
  }
}
function ExposesCheck(e, a) {
  var o = a - e + 128;
  if ((g_vectorDelta[o].pieceMask[0] & (1 << pieceQueen)) != 0) {
    for (var t = g_vectorDelta[o].delta, i = a + t; 0 === g_board[i]; ) i += t;
    var r = g_board[i];
    return (
      (r & (24 ^ g_board[a]) & 24) != 0 &&
      (g_vectorDelta[i - a + 128].pieceMask[(r >> 3) & 1] & (1 << (7 & r))) != 0
    );
  }
  return !1;
}
function IsSquareOnPieceLine(e, a) {
  var o = g_board[a];
  return !!(
    g_vectorDelta[a - e + 128].pieceMask[(o >> 3) & 1] &
    (1 << (7 & o))
  );
}
function IsSquareAttackableFrom(e, a) {
  var o = a - e + 128,
    t = g_board[a];
  if (g_vectorDelta[o].pieceMask[(t >> 3) & 1] & (1 << (7 & t))) {
    var i = g_vectorDelta[o].delta;
    do if ((a += i) == e) return !0;
    while (0 === g_board[a]);
  }
  return !1;
}
function IsSquareAttackable(e, a) {
  var o = a ? -16 : 16,
    t = (a ? colorWhite : colorBlack) | 1;
  if (g_board[e - (o - 1)] == t || g_board[e - (o + 1)] == t) return !0;
  for (var i = 2; i <= 6; i++)
    for (var r = (a | i) << 4, $ = g_pieceList[r]; 0 !== $; ) {
      if (IsSquareAttackableFrom(e, $)) return !0;
      $ = g_pieceList[++r];
    }
  return !1;
}
function GenerateMove(e, a) {
  return e | (a << 8);
}
function GenerateMove(e, a, o) {
  return e | (a << 8) | o;
}
function GenerateValidMoves() {
  var e = [],
    a = [];
  GenerateCaptureMoves(a, null), GenerateAllMoves(a);
  for (var o = a.length - 1; o >= 0; o--)
    MakeMove(a[o]) && ((e[e.length] = a[o]), UnmakeMove(a[o]));
  return e;
}
function GenerateAllMoves(e) {
  var a, o, t;
  for (t = (1 | g_toMove) << 4, a = g_pieceList[t++]; 0 !== a; )
    GeneratePawnMoves(e, a), (a = g_pieceList[t++]);
  for (t = (2 | g_toMove) << 4, a = g_pieceList[t++]; 0 !== a; )
    0 === g_board[(o = a + 31)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a + 33)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a + 14)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a - 14)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a - 31)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a - 33)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a + 18)] && (e[e.length] = GenerateMove(a, o)),
      0 === g_board[(o = a - 18)] && (e[e.length] = GenerateMove(a, o)),
      (a = g_pieceList[t++]);
  for (t = (3 | g_toMove) << 4, a = g_pieceList[t++]; 0 !== a; ) {
    for (o = a - 15; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 15);
    for (o = a - 17; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 17);
    for (o = a + 15; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 15);
    for (o = a + 17; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 17);
    a = g_pieceList[t++];
  }
  for (t = (4 | g_toMove) << 4, a = g_pieceList[t++]; 0 !== a; ) {
    for (o = a - 1; 0 === g_board[o]; ) (e[e.length] = GenerateMove(a, o)), o--;
    for (o = a + 1; 0 === g_board[o]; ) (e[e.length] = GenerateMove(a, o)), o++;
    for (o = a + 16; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 16);
    for (o = a - 16; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 16);
    a = g_pieceList[t++];
  }
  for (t = (5 | g_toMove) << 4, a = g_pieceList[t++]; 0 !== a; ) {
    for (o = a - 15; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 15);
    for (o = a - 17; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 17);
    for (o = a + 15; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 15);
    for (o = a + 17; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 17);
    for (o = a - 1; 0 === g_board[o]; ) (e[e.length] = GenerateMove(a, o)), o--;
    for (o = a + 1; 0 === g_board[o]; ) (e[e.length] = GenerateMove(a, o)), o++;
    for (o = a + 16; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o += 16);
    for (o = a - 16; 0 === g_board[o]; )
      (e[e.length] = GenerateMove(a, o)), (o -= 16);
    a = g_pieceList[t++];
  }
  if (
    (0 === g_board[(o = (a = g_pieceList[(t = (6 | g_toMove) << 4)]) - 15)] &&
      (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a - 17)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a + 15)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a + 17)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a - 1)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a + 1)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a - 16)] && (e[e.length] = GenerateMove(a, o)),
    0 === g_board[(o = a + 16)] && (e[e.length] = GenerateMove(a, o)),
    !g_inCheck)
  ) {
    var i = g_castleRights;
    g_toMove || (i >>= 2),
      1 & i &&
        g_board[a + 1] == pieceEmpty &&
        g_board[a + 2] == pieceEmpty &&
        (e[e.length] = GenerateMove(a, a + 2, moveflagCastleKing)),
      2 & i &&
        g_board[a - 1] == pieceEmpty &&
        g_board[a - 2] == pieceEmpty &&
        g_board[a - 3] == pieceEmpty &&
        (e[e.length] = GenerateMove(a, a - 2, moveflagCastleQueen));
  }
}
function GenerateCaptureMoves(e, a) {
  var o,
    t,
    i,
    r = 8 == g_toMove ? -16 : 16,
    $ = 8 == g_toMove ? 16 : 8;
  for (i = (1 | g_toMove) << 4, o = g_pieceList[i++]; 0 !== o; )
    g_board[(t = o + r - 1)] & $ && MovePawnTo(e, o, t),
      g_board[(t = o + r + 1)] & $ && MovePawnTo(e, o, t),
      (o = g_pieceList[i++]);
  if (-1 !== g_enPassentSquare) {
    r = g_toMove === colorWhite ? -16 : 16;
    var g = g_toMove | piecePawn;
    (15 & g_board[(o = g_enPassentSquare - (r + 1))]) === g &&
      (e[e.length] = GenerateMove(o, g_enPassentSquare, moveflagEPC)),
      (15 & g_board[(o = g_enPassentSquare - (r - 1))]) === g &&
        (e[e.length] = GenerateMove(o, g_enPassentSquare, moveflagEPC));
  }
  for (i = (2 | g_toMove) << 4, o = g_pieceList[i++]; 0 !== o; )
    g_board[(t = o + 31)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o + 33)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o + 14)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o - 14)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o - 31)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o - 33)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o + 18)] & $ && (e[e.length] = GenerateMove(o, t)),
      g_board[(t = o - 18)] & $ && (e[e.length] = GenerateMove(o, t)),
      (o = g_pieceList[i++]);
  for (i = (3 | g_toMove) << 4, o = g_pieceList[i++]; 0 !== o; ) {
    t = o;
    do t -= 15;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t -= 17;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 15;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 17;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)),
      (o = g_pieceList[i++]);
  }
  for (i = (4 | g_toMove) << 4, o = g_pieceList[i++]; 0 !== o; ) {
    t = o;
    do t--;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t++;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t -= 16;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 16;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)),
      (o = g_pieceList[i++]);
  }
  for (i = (5 | g_toMove) << 4, o = g_pieceList[i++]; 0 !== o; ) {
    t = o;
    do t -= 15;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t -= 17;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 15;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 17;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t--;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t++;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t -= 16;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)), (t = o);
    do t += 16;
    while (0 === g_board[t]);
    g_board[t] & $ && (e[e.length] = GenerateMove(o, t)),
      (o = g_pieceList[i++]);
  }
  g_board[(t = (o = g_pieceList[(i = (6 | g_toMove) << 4)]) - 15)] & $ &&
    (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o - 17)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o + 15)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o + 17)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o - 1)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o + 1)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o - 16)] & $ && (e[e.length] = GenerateMove(o, t)),
    g_board[(t = o + 16)] & $ && (e[e.length] = GenerateMove(o, t));
}
function MovePawnTo(e, a, o) {
  var t = 240 & o;
  144 == t || 32 == t
    ? ((e[e.length] = GenerateMove(
        a,
        o,
        moveflagPromotion | moveflagPromoteQueen
      )),
      (e[e.length] = GenerateMove(
        a,
        o,
        moveflagPromotion | moveflagPromoteKnight
      )),
      (e[e.length] = GenerateMove(
        a,
        o,
        moveflagPromotion | moveflagPromoteBishop
      )),
      (e[e.length] = GenerateMove(a, o, moveflagPromotion)))
    : (e[e.length] = GenerateMove(a, o, 0));
}
function GeneratePawnMoves(e, a) {
  var o = g_board[a] & colorWhite,
    t = o === colorWhite ? -16 : 16,
    i = a + t;
  0 === g_board[i] &&
    (MovePawnTo(e, a, i, pieceEmpty),
    (((240 & a) == 48 && o !== colorWhite) ||
      ((240 & a) == 128 && o === colorWhite)) &&
      0 === g_board[(i += t)] &&
      (e[e.length] = GenerateMove(a, i)));
}
function UndoHistory(e, a, o, t, i, r, $, g) {
  (this.ep = e),
    (this.castleRights = a),
    (this.inCheck = o),
    (this.baseEval = t),
    (this.hashKeyLow = i),
    (this.hashKeyHigh = r),
    (this.move50 = $),
    (this.captured = g);
}
var g_seeValues = [0, 1, 3, 3, 5, 9, 900, 0, 0, 1, 3, 3, 5, 9, 900, 0];
function See(e) {
  var a,
    o,
    t,
    i = 255 & e,
    r = (e >> 8) & 255,
    $ = g_board[i],
    g = g_seeValues[15 & $],
    n = g_seeValues[15 & g_board[r]];
  if (g <= n || e >> 16) return !0;
  var s = $ & colorWhite ? colorWhite : 0,
    h = 8 - s,
    l = $ & colorWhite ? -16 : 16;
  if (
    (15 & g_board[r + l + 1]) == (piecePawn | h) ||
    (15 & g_board[r + l - 1]) == (piecePawn | h)
  )
    return !1;
  var v = [],
    _ = g - n;
  if (
    (SeeAddKnightAttacks(r, h, v),
    0 !== v.length && _ > g_seeValues[pieceKnight])
  )
    return !1;
  for (g_board[i] = 0, a = pieceBishop; a <= pieceQueen; a++)
    if (SeeAddSliderAttacks(r, h, v, a) && _ > g_seeValues[a])
      return (g_board[i] = $), !1;
  if (
    (15 & g_board[r - l + 1]) == (piecePawn | s) ||
    (15 & g_board[r - l - 1]) == (piecePawn | s)
  )
    return (g_board[i] = $), !0;
  SeeAddSliderAttacks(r, h, v, pieceKing);
  var c = [];
  for (SeeAddKnightAttacks(r, s, c), a = pieceBishop; a <= pieceKing; a++)
    SeeAddSliderAttacks(r, s, c, a);
  g_board[i] = $;
  for (var d = n - g; ; ) {
    var b = 1e3,
      f = -1;
    for (t = 0; t < v.length; t++)
      0 !== v[t] &&
        (o = g_seeValues[7 & g_board[v[t]]]) < b &&
        ((b = o), (f = t));
    if (-1 == f) return !0;
    if ((d += b) < 0) return !1;
    var u = v[f];
    for (
      v[f] = 0, SeeAddXrayAttack(r, u, s, c, v), b = 1e3, f = -1, t = 0;
      t < c.length;
      t++
    )
      0 !== c[t] &&
        (o = g_seeValues[7 & g_board[c[t]]]) < b &&
        ((b = o), (f = t));
    if (-1 == f) return !1;
    if ((d -= b) >= 0) return !0;
    (u = c[f]), (c[f] = 0), SeeAddXrayAttack(r, u, s, c, v);
  }
}
function SeeAddXrayAttack(e, a, o, t, i) {
  var r = -g_vectorDelta[a - e + 128].delta;
  if (0 !== r) {
    for (a += r; 0 === g_board[a]; ) a += r;
    24 & g_board[a] &&
      IsSquareOnPieceLine(e, a) &&
      ((8 & g_board[a]) == o ? (t[t.length] = a) : (i[i.length] = a));
  }
}
function SeeAddKnightAttacks(e, a, o) {
  for (var t = (a | pieceKnight) << 4, i = g_pieceList[t++]; 0 !== i; )
    IsSquareOnPieceLine(e, i) && (o[o.length] = i), (i = g_pieceList[t++]);
}
function SeeAddSliderAttacks(e, a, o, t) {
  for (var i = (a | t) << 4, r = g_pieceList[i++], $ = !1; 0 !== r; )
    IsSquareAttackableFrom(e, r) && ((o[o.length] = r), ($ = !0)),
      (r = g_pieceList[i++]);
  return $;
}
function BuildPVMessage(e, a, o, t) {
  var i = g_nodeCount + g_qNodeCount;
  return (
    "Ply:" +
    t +
    " Score:" +
    a +
    " Nodes:" +
    i +
    " NPS:" +
    ((i / (o / 1e3)) | 0) +
    " " +
    PVFromHash(e, 15)
  );
}
function FinishPlyCallback(e, a, o, t) {
  postMessage("pv " + BuildPVMessage(e, a, o, t));
}
function FinishMoveLocalTesting(e, a, o, t) {
  void 0 !== e && (MakeMove(e), postMessage(FormatMove(e)));
}
var needsReset = !0;
function debug(e) {
  g_debug && (worker ? postMessage("console: " + e) : console.log(e));
}
self.onmessage = function (e) {
  if (
    ("go" != e.data && !needsReset) ||
    (ResetGame(), (needsReset = !1), "go" != e.data)
  ) {
    if ("position" == e.data.match("^position")) {
      ResetGame();
      var a = InitializeFromFen(e.data.substr(9, e.data.length - 9));
      0 !== a.length && postMessage("message " + a);
    } else if ("search" == e.data.match("^search")) {
      var o = e.data.substr(7, e.data.length - 7).split(",");
      (g_timeout = parseInt(o[0], 10)),
        Search(
          FinishMoveLocalTesting,
          (g_maxply = parseInt(o[1], 10)),
          FinishPlyCallback
        );
    } else
      "analyze" == e.data
        ? ((g_timeout = 99999999999), Search(null, g_maxply, FinishPlyCallback))
        : MakeMove(GetMoveFromString(e.data));
  }
};
