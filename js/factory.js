"use strict";
var geometries = {},
  textures = {};
function initPieceFactory() {
  for (var e = [], r = 0; r < 2; r++)
    (e[r] = textures["texture/wood-" + r + ".jpg"].clone()), e[r].tile(4);
  var t = textures["texture/wood_N.jpg"].clone();
  t.tile(4);
  var a = textures["texture/wood_S.jpg"].clone();
  a.tile(4),
    (window.createPiece = function r(o, n) {
      var s = (BOARD_SIZE / COLS) * PIECE_SIZE,
        l = new THREE.Object3D(),
        c = new THREE.MeshPhongMaterial({
          color: 16777215,
          specular: 11184810,
          shininess: 60,
          map: e[n],
          normalMap: t,
          specularMap: a,
          wireframe: WIREFRAME,
        });
      c.normalScale.set(0.3, 0.3);
      var i = geometries["./json/" + o + ".json"],
        u = textures["texture/" + o + "-ao.jpg"];
      (u.format = THREE.LuminanceFormat), (c.lightMap = u);
      var $ = new THREE.Mesh(i, c);
      SHADOW && (($.castShadow = !0), ($.receiveShadow = !0)),
        $.scale.set(s, s, s),
        ($.rotation.y += n == WHITE ? -Math.PI / 2 : Math.PI / 2);
      var p = $.clone();
      return (
        (p.scale.y *= -1),
        (p.material = p.material.clone()),
        (p.material.side = THREE.BackSide),
        l.add($),
        l.add(p),
        (l.name = o),
        (l.color = n),
        l
      );
    });
}
function initCellFactory() {
  var e,
    r = [],
    t = textures["texture/wood_N.jpg"].clone();
  t.tile(2);
  var a = textures["texture/wood_S.jpg"].clone();
  a.tile(2);
  for (var o = 0; o < 2; o++)
    (e = textures["texture/wood-" + o + ".jpg"].clone()).tile(2),
      (r[o] = new THREE.MeshPhongMaterial({
        color: 16777215,
        specular: [11184810, 4473924][o],
        shininess: 30,
        wireframe: WIREFRAME,
        transparent: !0,
        map: e,
        specularMap: a,
        normalMap: t,
        opacity: 0.5,
      }));
  window.createCell = function e(t, a) {
    for (
      var o = new THREE.PlaneGeometry(t, t),
        n = Math.random(),
        s = Math.random(),
        l = o.faceVertexUvs[0][0],
        c = 0;
      c < l.length;
      c++
    )
      (l[c].x += n), (l[c].y += s);
    var i = new THREE.Mesh(o, r[a]);
    return (
      SHADOW && (i.receiveShadow = !0),
      (i.rotation.x = -Math.PI / 2),
      (i.color = a),
      i
    );
  };
}
function createChessBoard(e) {
  for (
    var r, t, a = new THREE.Object3D(), o = e / COLS, n = 0;
    n < ROWS * COLS;
    n++
  ) {
    var s = Math.floor(n / COLS);
    (t = new Cell(n)),
      ((r = createCell(o, 1 - ((n + s) % 2))).position = t.getWorldPosition()),
      (r.name = t.position),
      a.add(r);
  }
  var l = new THREE.Mesh(
    geometries["./json/innerBoard.json"],
    new THREE.MeshBasicMaterial({ color: 7880210 })
  );
  l.scale.set(e, e, e);
  var c = textures["texture/wood-0.jpg"].clone(),
    i = textures["texture/wood_S.jpg"].clone(),
    u = textures["texture/wood_N.jpg"].clone();
  c.tile(6), i.tile(6), u.tile(6);
  var $ = geometries["./json/board.json"];
  $.computeBoundingBox();
  var p = new THREE.Mesh(
    $,
    new THREE.MeshPhongMaterial({
      color: 16777215,
      map: c,
      specular: 16777215,
      specularMap: i,
      normalMap: u,
      shininess: 60,
      normalScale: new THREE.Vector2(0.2, 0.2),
    })
  );
  return (
    p.scale.set(e, 0.62 * e, e),
    (a.height = $.boundingBox.min.y * p.scale.y),
    SHADOW && ((p.receiveShadow = !0), (p.castShadow = !0)),
    a.add(l),
    a.add(p),
    (a.name = "chessboard"),
    a
  );
}
function createFloor(e, r) {
  var t = (30 * e) / 1e3,
    a = new THREE.MeshPhongMaterial({
      color: 16777215,
      wireframe: WIREFRAME,
      specular: 11184810,
      shininess: 30,
    }),
    o = textures["texture/floor.jpg"],
    n = textures["texture/floor_S.jpg"],
    s = textures["texture/floor_N.jpg"],
    l = textures["texture/fakeShadow.jpg"];
  o.tile(t),
    n.tile(t),
    s.tile(t),
    (l.format = THREE.RGBFormat),
    (a.map = o),
    (a.normalMap = s),
    a.normalScale.set(0.6, 0.6),
    (a.specularMap = n),
    (a.lightMap = l);
  var c = r / 2,
    i = e / 2,
    u = new THREE.Geometry();
  u.vertices.push(new THREE.Vector3(-i, 0, -i)),
    u.vertices.push(new THREE.Vector3(i, 0, -i)),
    u.vertices.push(new THREE.Vector3(i, 0, i)),
    u.vertices.push(new THREE.Vector3(-i, 0, i)),
    u.vertices.push(new THREE.Vector3(-c, 0, -c)),
    u.vertices.push(new THREE.Vector3(c, 0, -c)),
    u.vertices.push(new THREE.Vector3(c, 0, c)),
    u.vertices.push(new THREE.Vector3(-c, 0, c)),
    (u.faceVertexUvs[0] = []),
    (u.faceVertexUvs[1] = []);
  var $ = new THREE.Vector3(0, 1, 0);
  [
    [0, 4, 5, 1],
    [1, 5, 6, 2],
    [2, 6, 7, 3],
    [3, 7, 4, 0],
  ].forEach(function (r) {
    var t,
      a,
      o = [],
      n = [];
    r.forEach(function (r, s) {
      o.push(
        new THREE.Vector2((u.vertices[r].x + i) / e, (u.vertices[r].z + i) / e)
      ),
        (t = r < 4 ? 80 : 0),
        (a = s < 2 ? 0 : 1),
        n.push(new THREE.Vector2(t, a));
    });
    var s = new THREE.Face4(r[0], r[1], r[2], r[3]);
    s.normal.copy($),
      s.vertexNormals.push($.clone(), $.clone(), $.clone(), $.clone()),
      u.faces.push(s),
      u.faceVertexUvs[0].push(o),
      u.faceVertexUvs[1].push(n);
  }),
    u.computeCentroids();
  var p = new THREE.Mesh(u, a);
  return SHADOW && (p.receiveShadow = !0), (p.name = "floor"), p;
}
var validCellMaterial = null;
function createValidCellMaterial() {
  validCellMaterial = [];
  var e,
    r = textures["texture/wood_N.jpg"].clone();
  r.tile(2);
  var t = textures["texture/wood_S.jpg"].clone();
  t.tile(2);
  for (var a = 0; a < 2; a++)
    (e = textures["texture/wood-1.jpg"].clone()).tile(2),
      (validCellMaterial[a] = new THREE.MeshPhongMaterial({
        color: 65280,
        specular: 10066329,
        shininess: 60,
        wireframe: WIREFRAME,
        map: e,
        specularMap: t,
        normalMap: r,
      }));
}
var selectedMaterial = null;
function createSelectedMaterial() {
  selectedMaterial = [];
  var e,
    r = textures["texture/wood_N.jpg"].clone();
  r.tile(4);
  var t = textures["texture/wood_S.jpg"].clone();
  t.tile(4);
  for (var a = 0; a < 2; a++)
    (e = textures["texture/wood-1.jpg"].clone()).tile(4),
      (selectedMaterial[a] = new THREE.MeshPhongMaterial({
        color: 65280,
        emissive: 39168,
        specular: 10066329,
        shininess: 60,
        wireframe: WIREFRAME,
        transparent: !1,
        map: e,
        specularMap: t,
        normalMap: r,
      })),
      selectedMaterial[a].normalScale.set(0.3, 0.3);
}
