"use strict";
var camera,
  g_backgroundEngine,
  validMoves = null,
  g_allMoves = [],
  promotion = moveflagPromoteQueen,
  g_playerWhite = !1,
  levels = [
    { timeout: 0, maxply: 1 },
    { timeout: 12, maxply: 20 },
    { timeout: 25, maxply: 40 },
    { timeout: 50, maxply: 60 },
    { timeout: 100, maxply: 80 },
    { timeout: 200, maxply: 100 },
    { timeout: 400, maxply: 120 },
    { timeout: 800, maxply: 140 },
    { timeout: 1600, maxply: 160 },
    { timeout: 3200, maxply: 180 },
  ];
!(function () {
  var e,
    n,
    a,
    t,
    o,
    i = new THREE.Clock(),
    l = !0,
    r = [],
    $ = null,
    s = null;
  function c() {
    n.domElement;
    var e = window.innerWidth,
      a = window.innerHeight;
    n.setSize(e, a), (camera.aspect = e / a), camera.updateProjectionMatrix();
  }
  function u(e, n) {
    addToPGN(e), (g_allMoves[g_allMoves.length] = e), MakeMove(e), n || v();
  }
  function d() {
    g_backgroundEngine &&
      (g_backgroundEngine.terminate(), (g_backgroundEngine = null));
  }
  function g() {
    p()
      ? g_backgroundEngine.postMessage("search " + g_timeout + "," + g_maxply)
      : Search(m, g_maxply, null);
  }
  function m(e, n, a, t) {
    null !== e && u(e, !1);
  }
  function p() {
    if (!l) return !1;
    if (!g_backgroundEngine) {
      l = !0;
      try {
        ((g_backgroundEngine = new Worker("js/AI/garbochess.js")).onmessage =
          function (e) {
            "pv" == e.data.match("^pv") ||
              ("message" == e.data.match("^message")
                ? d()
                : "console: " == e.data.match("^console: ")
                ? console.log(e.data.substr(9))
                : u(GetMoveFromString(e.data), !1));
          }),
          (g_backgroundEngine.error = function (e) {
            alert("Error from background worker:" + e.message);
          }),
          g_backgroundEngine.postMessage("position " + GetFen());
      } catch (e) {
        l = !1;
      }
    }
    return l;
  }
  function v() {
    var n, a;
    (validMoves = GenerateValidMoves()),
      r.forEach(function (a) {
        e.remove(a), (n = new Cell(a.cell));
      }),
      (function e() {
        r = [];
        for (var n = 0; n < ROWS; n++)
          for (var a = 0; a < COLS; a++) {
            var t = g_board[MakeSquare(n, a)],
              o = t & colorWhite ? WHITE : BLACK,
              i = null;
            switch (7 & t) {
              case piecePawn:
                i = "pawn";
                break;
              case pieceKnight:
                i = "knight";
                break;
              case pieceBishop:
                i = "bishop";
                break;
              case pieceRook:
                i = "rook";
                break;
              case pieceQueen:
                i = "queen";
                break;
              case pieceKing:
                i = "king";
            }
            null !== i && (r[a + n * COLS] = createPiece(i, o));
          }
      })(),
      r.forEach(function (n, t) {
        (a = new Cell(t)),
          (n.position = a.getWorldPosition()),
          (n.cell = t),
          e.add(n);
      }),
      displayCheck();
  }
  function h(e) {
    var n,
      a,
      t = null,
      o = null,
      i = [];
    for (var l in r)
      ({}.hasOwnProperty.call(r, l) &&
        ((a = r[l]),
        (t = e.intersectObject(a.children[0], !0)).length > 0 &&
          ((n = t[0]),
          ((g_playerWhite && n.object.parent.color === WHITE) ||
            (!g_playerWhite && n.object.parent.color === BLACK)) &&
            i.push(n))));
    return (i.forEach(function (e) {
      (null === o || o.distance > e.distance) && (o = e);
    }),
    o)
      ? o.object.parent
      : null;
  }
  function f(e) {
    var n = e.intersectObject(o, !0);
    return n.length > 0 ? n[0].object : null;
  }
  function b(e) {
    var a = 1 | window.devicePixelRatio,
      o = n.domElement,
      i = o.getBoundingClientRect(),
      l = e.clientX * a - i.left,
      r = e.clientY * a - i.top,
      $ = new THREE.Vector3(2 * (l / o.width) - 1, 1 - 2 * (r / o.height));
    return t.pickingRay($.clone(), camera);
  }
  function _(e) {
    var a = n.domElement,
      t = b(e),
      o = h(t),
      i = f(t);
    if (
      ((a.style.cursor = "default"),
      null !== o && (a.style.cursor = "pointer"),
      null !== s && (s.material = s.baseMaterial),
      null !== $ && null !== i)
    ) {
      for (
        var l = new Cell($.cell), r = new Cell(i.name), c = null, u = 0;
        u < validMoves.length;
        u++
      )
        if (
          (255 & validMoves[u]) == MakeSquare(l.y, l.x) &&
          ((validMoves[u] >> 8) & 255) == MakeSquare(r.y, r.x)
        ) {
          c = validMoves[u];
          break;
        }
      null !== i &&
        null !== c &&
        (((s = i).baseMaterial = s.material),
        (s.material = validCellMaterial[s.color]),
        (a.style.cursor = "pointer"));
    }
  }
  function x(e) {
    n.domElement;
    var a = b(e),
      t = h(a),
      o = f(a);
    null !== $ &&
      null !== o &&
      (function e(n, a) {
        if (void 0 === n.cell || void 0 === a.name) return !1;
        var t = new Cell(n.cell),
          o = new Cell(a.name),
          i = MakeSquare(t.y, t.x),
          l = MakeSquare(o.y, o.x),
          r = null,
          $ = !1,
          s = g_board[i];
        (7 & s) === piecePawn &&
          ((1 === t.y && g_playerWhite) || (6 === t.y && !g_playerWhite)) &&
          ((8 & s && g_playerWhite) || (!(8 & s) && !g_playerWhite)) &&
          ($ = !0);
        for (var c = 0; c < validMoves.length; c++)
          if ($) {
            if (
              validMoves[c] ===
              GenerateMove(i, l, moveflagPromotion | promotion)
            ) {
              r = validMoves[c];
              break;
            }
          } else if (
            (255 & validMoves[c]) == i &&
            ((validMoves[c] >> 8) & 255) == l
          ) {
            r = validMoves[c];
            break;
          }
        return (
          (t.x !== o.x || t.y !== o.y) &&
          null !== r &&
          (p() && g_backgroundEngine.postMessage(FormatMove(r)),
          u(r, !1),
          setTimeout(g, 0),
          !0)
        );
      })($, o) &&
      (($ = null), (t = null), (o = null)),
      null !== $ && ($.children[0].material = $.baseMaterial),
      null !== ($ = t) &&
        (($.baseMaterial = $.children[0].material),
        ($.children[0].material = selectedMaterial[$.color]));
  }
  (g_timeout = 1600),
    (g_maxply = 49),
    (window.SearchAndRedraw = g),
    (window.onLoaded = function l() {
      var r, $, s, u, d, g;
      removeLoader(),
        (r = window.innerWidth),
        ($ = window.innerHeight),
        ((n = new THREE.WebGLRenderer({ antialias: !0 })).gammaInput = !0),
        (n.gammaOutput = !0),
        n.setSize(r, $),
        SHADOW &&
          ((n.shadowMapEnabled = !0),
          (n.shadowMapType = THREE.PCFSoftShadowMap),
          (n.shadowMapCascade = !0)),
        n.setClearColor(0, 1),
        document.body.appendChild(n.domElement),
        (camera = new THREE.PerspectiveCamera(45, r / $, 1, 4e4)),
        ((a = new THREE.OrbitAndPanControls(
          camera,
          n.domElement
        )).minPolarAngle = 0),
        (a.maxPolarAngle = (80 * Math.PI) / 180),
        (a.minDistance = 10),
        (a.maxDistance = 200),
        (a.userZoomSpeed = 1),
        camera.position.set(0, 100, 100),
        (s = new THREE.SpotLight(16777215, 1)).position.set(0, 300, 0),
        (s.angle = Math.PI / 2),
        (s.exponent = 50),
        s.target.position.set(0, 0, 0),
        SHADOW &&
          ((s.castShadow = !0),
          (s.shadowDarkness = 0.5),
          (s.shadowBias = -0.001)),
        (u = new THREE.PointLight(16772829, 0.2)).position.set(0, 0, 100),
        (d = new THREE.PointLight(16772829, 0.2)).position.set(0, 0, -100),
        initPieceFactory(),
        initCellFactory(),
        (o = createChessBoard(BOARD_SIZE)),
        ((g = createFloor(FLOOR_SIZE, BOARD_SIZE)).position.y = o.height),
        (e = new THREE.Scene()).add(g),
        e.add(s),
        e.add(u),
        e.add(d),
        e.add(o),
        (e.fog = new THREE.FogExp2(0, 0.001)),
        e.add(new THREE.AmbientLight(3342336)),
        (t = new THREE.Projector()),
        initGUI(),
        initInfo(),
        createValidCellMaterial(),
        createSelectedMaterial(),
        document.addEventListener("mousedown", x, !1),
        document.addEventListener("mousemove", _, !1),
        window.addEventListener("resize", c, !1),
        DEBUG && ((window.scene = e), (window.renderer = n)),
        newGame(WHITE),
        (function t() {
          var o;
          window.requestAnimationFrame(t),
            (o = i.getDelta()),
            a.update(o),
            n.render(e, camera);
        })();
    }),
    (window.redrawBoard = v),
    (window.EnsureAnalysisStopped = d),
    (window.InitializeBackgroundEngine = p),
    (window.UIPlayMove = u);
})();
