"use strict";
!(function () {
  var t = THREE.Texture.prototype.clone;
  (THREE.Texture.prototype.clone = function (e) {
    var r = t.call(this, e);
    return (r.needsUpdate = !0), r;
  }),
    (THREE.Texture.prototype.tile = function (t) {
      (this.wrapS = this.wrapT = THREE.RepeatWrapping), this.repeat.set(t, t);
    });
})();
