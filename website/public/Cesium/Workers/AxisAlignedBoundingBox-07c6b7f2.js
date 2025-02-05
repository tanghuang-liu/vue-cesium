define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319', './Transforms-d13cc04e'], function (e, n, i, t, a) {
  'use strict'
  function m(e, i, a) {
    ;(this.minimum = n.Cartesian3.clone(t.defaultValue(e, n.Cartesian3.ZERO))),
      (this.maximum = n.Cartesian3.clone(t.defaultValue(i, n.Cartesian3.ZERO))),
      (a = t.defined(a) ? n.Cartesian3.clone(a) : n.Cartesian3.midpoint(this.minimum, this.maximum, new n.Cartesian3())),
      (this.center = a)
  }
  ;(m.fromPoints = function (e, i) {
    if ((t.defined(i) || (i = new m()), !t.defined(e) || 0 === e.length))
      return (
        (i.minimum = n.Cartesian3.clone(n.Cartesian3.ZERO, i.minimum)),
        (i.maximum = n.Cartesian3.clone(n.Cartesian3.ZERO, i.maximum)),
        (i.center = n.Cartesian3.clone(n.Cartesian3.ZERO, i.center)),
        i
      )
    for (var a = e[0].x, r = e[0].y, s = e[0].z, u = e[0].x, c = e[0].y, o = e[0].z, l = e.length, x = 1; x < l; x++) {
      var C = e[x],
        d = C.x,
        f = C.y,
        h = C.z
      ;(a = Math.min(d, a)), (u = Math.max(d, u)), (r = Math.min(f, r)), (c = Math.max(f, c)), (s = Math.min(h, s)), (o = Math.max(h, o))
    }
    var y = i.minimum
    ;(y.x = a), (y.y = r), (y.z = s)
    var p = i.maximum
    return (p.x = u), (p.y = c), (p.z = o), (i.center = n.Cartesian3.midpoint(y, p, i.center)), i
  }),
    (m.clone = function (e, i) {
      if (t.defined(e))
        return t.defined(i)
          ? ((i.minimum = n.Cartesian3.clone(e.minimum, i.minimum)),
            (i.maximum = n.Cartesian3.clone(e.maximum, i.maximum)),
            (i.center = n.Cartesian3.clone(e.center, i.center)),
            i)
          : new m(e.minimum, e.maximum, e.center)
    }),
    (m.equals = function (e, i) {
      return (
        e === i ||
        (t.defined(e) &&
          t.defined(i) &&
          n.Cartesian3.equals(e.center, i.center) &&
          n.Cartesian3.equals(e.minimum, i.minimum) &&
          n.Cartesian3.equals(e.maximum, i.maximum))
      )
    })
  var r = new n.Cartesian3()
  ;(m.intersectPlane = function (e, i) {
    r = n.Cartesian3.subtract(e.maximum, e.minimum, r)
    var t = n.Cartesian3.multiplyByScalar(r, 0.5, r),
      m = i.normal,
      s = t.x * Math.abs(m.x) + t.y * Math.abs(m.y) + t.z * Math.abs(m.z),
      u = n.Cartesian3.dot(e.center, m) + i.distance
    return u - s > 0 ? a.Intersect.INSIDE : u + s < 0 ? a.Intersect.OUTSIDE : a.Intersect.INTERSECTING
  }),
    (m.prototype.clone = function (e) {
      return m.clone(this, e)
    }),
    (m.prototype.intersectPlane = function (e) {
      return m.intersectPlane(this, e)
    }),
    (m.prototype.equals = function (e) {
      return m.equals(this, e)
    }),
    (e.AxisAlignedBoundingBox = m)
})
