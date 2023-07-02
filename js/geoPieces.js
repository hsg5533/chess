"use strict";
var pieceMaterial = [];
function createPawn(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.6 * e,
    d = new THREE.Mesh(new THREE.SphereGeometry(o, 32, 16), pieceMaterial[i]);
  d.position.y = n + o;
  var y = e,
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 0.7 * o, y, 32, 1),
      pieceMaterial[i]
    );
  p.position.y = n + 2 * o + y / 2;
  var w = 0.2 * e,
    s = new THREE.Mesh(new THREE.SphereGeometry(w, 32, 16), pieceMaterial[i]);
  return (
    (s.position.y = n + 2 * o + y + w / 2),
    a.add(s),
    a.add(p),
    a.add(d),
    a.add(t),
    (a.name = "Pawn"),
    a
  );
}
function createRook(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.4 * e,
    d = 1.6 * e,
    y = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2 * o, o, d, 32, 16),
      pieceMaterial[i]
    );
  y.position.y = n + d / 2;
  var p = 0.5 * e,
    w = 1.5 * o,
    s = new THREE.Mesh(
      new THREE.CylinderGeometry(w, 1.2 * o, p, 32, 1),
      pieceMaterial[i]
    );
  s.position.y = n + d + p / 2;
  for (
    var M = p,
      c = 0.1 * e,
      $ = w,
      _ = w - 0.2 * e,
      l = new THREE.TubeGeometry(
        $ - c,
        $,
        _ - c,
        _,
        M,
        Math.round(32 / 12),
        1,
        0,
        (2 * Math.PI) / 12
      ),
      h = 0;
    h < 6;
    h++
  ) {
    var m = new THREE.Mesh(l, pieceMaterial[i]);
    (m.position.y = n + d + p + M / 2),
      (m.rotation.y = (2 * h * Math.PI) / 6),
      a.add(m);
  }
  return a.add(s), a.add(y), a.add(t), (a.name = "Rook"), a;
}
function createKnight(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.6 * e,
    d = new THREE.Mesh(new THREE.SphereGeometry(o, 32, 16), pieceMaterial[i]),
    y = 1.2 * e,
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0 * o, 0.6 * o, y, 32, 1),
      pieceMaterial[i]
    );
  p.position.y = o + y / 2;
  var w = new THREE.Object3D();
  w.add(p), (w.rotation.z = -Math.PI / 32);
  var s = new THREE.Object3D(),
    M = 0.6 * e,
    c = new THREE.Mesh(new THREE.SphereGeometry(M, 32, 16), pieceMaterial[i]),
    $ = 1 * e,
    _ = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3 * M, 0.8 * M, $, 32, 1),
      pieceMaterial[i]
    );
  (_.rotation.z = Math.PI / 16), (_.position.y = M);
  var l = 0.2 * e;
  (new THREE.Mesh(
    new THREE.SphereGeometry(l, 32, 16),
    pieceMaterial[i]
  ).position.y = M + $ + l / 2),
    s.add(c),
    s.add(_),
    (s.scale.z = 0.5),
    (s.rotation.z = (5 * Math.PI) / 8),
    (s.position.y = o + y);
  var h = new THREE.Object3D();
  return (
    h.add(d),
    h.add(w),
    h.add(s),
    (h.rotation.z = -Math.PI / 32),
    (h.rotation.y = i == whiteMat ? -Math.PI / 2 : Math.PI / 2),
    (h.position.y = n + o),
    a.add(h),
    a.add(t),
    (a.name = "Knight"),
    a
  );
}
function createBishop(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.6 * e,
    d = new THREE.Mesh(new THREE.SphereGeometry(o, 32, 16), pieceMaterial[i]);
  d.position.y = n + o;
  var y = 1.7 * e,
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05 * o, 0.3 * o, y, 32, 1),
      pieceMaterial[i]
    );
  p.position.y = n + 2 * o + y / 2;
  var w = 0.2 * e,
    s = new THREE.Mesh(new THREE.SphereGeometry(w, 32, 16), pieceMaterial[i]);
  return (
    (s.scale.y = 1.5),
    (s.position.y = n + 2 * o + y + w / 2),
    a.add(s),
    a.add(p),
    a.add(d),
    a.add(t),
    (a.name = "Bishop"),
    a
  );
}
function createQueen(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.6 * e,
    d = new THREE.Mesh(new THREE.SphereGeometry(o, 32, 16), pieceMaterial[i]);
  d.position.y = n + o;
  var y = 2.3 * e,
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05 * o, 0.3 * o, y, 32, 1),
      pieceMaterial[i]
    );
  p.position.y = n + 2 * o + y / 2;
  var w = 0.4 * e,
    s = new THREE.Mesh(
      new THREE.CylinderGeometry(w, w, 0.1 * e, 32, 1),
      pieceMaterial[i]
    );
  s.position.y = n + 2 * o + y - 0.1 * e;
  var M = 0.2 * e,
    c = new THREE.Mesh(new THREE.SphereGeometry(M, 32, 16), pieceMaterial[i]);
  return (
    (c.position.y = n + 2 * o + y + M / 2),
    a.add(c),
    a.add(s),
    a.add(p),
    a.add(d),
    a.add(t),
    (a.name = "Queen"),
    a
  );
}
function createKing(e, i) {
  var a = new THREE.Object3D(),
    n = 0.1 * e,
    r = 0.8 * e,
    t = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, n, 32, 1),
      pieceMaterial[i]
    );
  t.position.y = n / 2;
  var o = 0.6 * e,
    d = new THREE.Mesh(new THREE.SphereGeometry(o, 32, 16), pieceMaterial[i]);
  d.position.y = n + o;
  var y = 2.3 * e,
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2 * o, 0.15 * o, y, 32, 1),
      pieceMaterial[i]
    );
  p.position.y = n + 2 * o + y / 2;
  var w = 0.4 * e,
    s = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45 * e, 0.25 * e, w, 32, 1),
      pieceMaterial[i]
    );
  s.position.y = n + 2 * o + y - 0.1 * e;
  var M = new THREE.Object3D(),
    c = 0.2 * e,
    $ = 0.8 * e,
    _ = new THREE.CubeGeometry(c, $, c),
    l = new THREE.Mesh(_, pieceMaterial[i]);
  l.position.y = $ / 2;
  var h = new THREE.Mesh(_, pieceMaterial[i]);
  return (
    (h.rotation.z = Math.PI / 2),
    (h.position.y = $ / 2),
    M.add(l),
    M.add(h),
    (M.position.y = n + 2 * o + y - 0.1 * e + w / 2),
    a.add(M),
    a.add(s),
    a.add(p),
    a.add(d),
    a.add(t),
    (a.name = "King"),
    a
  );
}
(pieceMaterial[BLACK] = new THREE.MeshPhongMaterial({
  color: 1118481,
  specular: 11184810,
  shininess: 30,
  wireframe: WIREFRAME,
})),
  (pieceMaterial[WHITE] = new THREE.MeshPhongMaterial({
    color: 14540253,
    wireframe: WIREFRAME,
  }));
