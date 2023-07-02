THREE.OrbitAndPanControls = function (t, e) {
  (this.addEventListener = THREE.EventDispatcher.prototype.addEventListener),
    (this.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener),
    (this.removeEventListener =
      THREE.EventDispatcher.prototype.removeEventListener),
    (this.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent),
    (this.enabled = !0),
    (this.object = t),
    (this.domElement = void 0 !== e ? e : document),
    (this.target = new THREE.Vector3()),
    (this.userZoom = !0),
    (this.userZoomSpeed = 1),
    (this.userRotate = !0),
    (this.userRotateSpeed = 1),
    (this.autoRotate = !1),
    (this.autoRotateSpeed = 2),
    (this.minPolarAngle = 0),
    (this.maxPolarAngle = Math.PI),
    (this.minDistance = 0),
    (this.maxDistance = 1 / 0);
  var n = this,
    o = new THREE.Vector2(),
    i = new THREE.Vector2(),
    s = new THREE.Vector2(),
    a = new THREE.Vector2(),
    r = new THREE.Vector2(),
    c = new THREE.Vector2(),
    d = new THREE.Vector2(),
    l = new THREE.Vector2(),
    h = new THREE.Vector2(),
    u = 0,
    m = 0,
    p = 1,
    v = new THREE.Vector3(),
    $ = new THREE.Vector3(),
    E = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_DOLLY: 4,
      TOUCH_PAN: 5,
    },
    f = E.NONE,
    L = { type: "change" };
  function _() {
    return ((2 * Math.PI) / 60 / 60) * n.autoRotateSpeed;
  }
  function b() {
    return Math.pow(0.95, n.userZoomSpeed);
  }
  function y(t) {
    if (!1 !== n.enabled) {
      if ((t.preventDefault(), f === E.ROTATE))
        i.set(t.clientX, t.clientY),
          s.subVectors(i, o),
          n.rotateLeft(
            ((2 * Math.PI * s.x) / n.domElement.width) * n.userRotateSpeed
          ),
          n.rotateUp(
            ((Math.PI * s.y) / n.domElement.height) * n.userRotateSpeed
          ),
          o.copy(i);
      else if (f === E.PAN) {
        r.set(t.clientX, t.clientY), c.subVectors(r, a);
        var e = n.object.position.clone().sub(n.target).length();
        void 0 !== n.object.fov &&
          (e *= Math.tan(((n.object.fov / 2) * Math.PI) / 180)),
          n.panLeft((2 * c.x * e) / n.domElement.height),
          n.panUp((2 * c.y * e) / n.domElement.height),
          a.copy(r);
      } else
        f === E.DOLLY &&
          (l.set(t.clientX, t.clientY),
          h.subVectors(l, d),
          h.y > 0 ? n.dollyIn() : n.dollyOut(),
          d.copy(l));
    }
  }
  function w() {
    !1 !== n.enabled &&
      n.userRotate &&
      (document.removeEventListener("mousemove", y, !1),
      document.removeEventListener("mouseup", w, !1),
      (f = E.NONE));
  }
  function O(t) {
    if (!1 !== n.enabled && n.userZoom) {
      var e = 0;
      t.wheelDelta ? (e = t.wheelDelta) : t.detail && (e = -t.detail),
        e > 0 ? n.dollyOut() : n.dollyIn();
    }
  }
  (this.rotateLeft = function (t) {
    void 0 === t && (t = _()), (m -= t);
  }),
    (this.rotateUp = function (t) {
      void 0 === t && (t = _()), (u -= t);
    }),
    (this.panLeft = function (t) {
      var e = new THREE.Vector3(),
        n = this.object.matrix.elements;
      e.set(n[0], n[1], n[2]), e.multiplyScalar(-t), v.add(e);
    }),
    (this.panUp = function (t) {
      var e = new THREE.Vector3(),
        n = this.object.matrix.elements;
      e.set(n[4], n[5], n[6]), e.multiplyScalar(t), v.add(e);
    }),
    (this.dollyIn = function (t) {
      void 0 === t && (t = b()), (p /= t);
    }),
    (this.dollyOut = function (t) {
      void 0 === t && (t = b()), (p *= t);
    }),
    (this.update = function () {
      var t = this.object.position,
        e = t.clone().sub(this.target),
        n = Math.atan2(e.x, e.z),
        o = Math.atan2(Math.sqrt(e.x * e.x + e.z * e.z), e.y);
      this.autoRotate && this.rotateLeft(_()),
        (n += m),
        (o += u),
        (o = Math.max(
          1e-6,
          Math.min(
            Math.PI - 1e-6,
            (o = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, o)))
          )
        ));
      var i = e.length() * p;
      (i = Math.max(this.minDistance, Math.min(this.maxDistance, i))),
        this.target.add(v),
        (e.x = i * Math.sin(o) * Math.sin(n)),
        (e.y = i * Math.cos(o)),
        (e.z = i * Math.sin(o) * Math.cos(n)),
        t.copy(this.target).add(e),
        this.object.lookAt(this.target),
        (m = 0),
        (u = 0),
        (p = 1),
        v.set(0, 0, 0),
        $.distanceTo(this.object.position) > 0 &&
          (this.dispatchEvent(L), $.copy(this.object.position));
    }),
    this.domElement.addEventListener(
      "contextmenu",
      function (t) {
        t.preventDefault();
      },
      !1
    ),
    this.domElement.addEventListener(
      "mousedown",
      function t(e) {
        !1 !== n.enabled &&
          n.userRotate &&
          (e.preventDefault(),
          0 === e.button
            ? ((f = E.ROTATE), o.set(e.clientX, e.clientY))
            : 2 === e.button && ((f = E.DOLLY), d.set(e.clientX, e.clientY)),
          document.addEventListener("mousemove", y, !1),
          document.addEventListener("mouseup", w, !1));
      },
      !1
    ),
    this.domElement.addEventListener("mousewheel", O, !1),
    this.domElement.addEventListener("DOMMouseScroll", O, !1),
    this.domElement.addEventListener(
      "touchstart",
      function t(e) {
        if (!1 === n.enabled) return;
      },
      !1
    ),
    this.domElement.addEventListener(
      "touchend",
      function t(e) {
        !1 !== n.enabled && (f = E.NONE);
      },
      !1
    ),
    this.domElement.addEventListener(
      "touchmove",
      function t(e) {
        !1 !== n.enabled && (e.preventDefault(), e.stopPropagation());
      },
      !1
    );
};
