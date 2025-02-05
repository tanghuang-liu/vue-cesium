define([
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './CylinderGeometryLibrary-dc0b434b',
  './when-4bbc8319',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './combine-83860057',
  './WebGLConstants-1c8239cc'
], function (t, e, i, r, a, n, o, u, s, f, d, c) {
  'use strict'
  var l = new i.Cartesian2()
  function m(t) {
    var e = (t = o.defaultValue(t, o.defaultValue.EMPTY_OBJECT)).length,
      i = t.topRadius,
      r = t.bottomRadius,
      a = o.defaultValue(t.slices, 128),
      n = Math.max(o.defaultValue(t.numberOfVerticalLines, 16), 0)
    ;(this._length = e),
      (this._topRadius = i),
      (this._bottomRadius = r),
      (this._slices = a),
      (this._numberOfVerticalLines = n),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderOutlineGeometry')
  }
  ;(m.packedLength = 6),
    (m.pack = function (t, e, i) {
      return (
        (i = o.defaultValue(i, 0)),
        (e[i++] = t._length),
        (e[i++] = t._topRadius),
        (e[i++] = t._bottomRadius),
        (e[i++] = t._slices),
        (e[i++] = t._numberOfVerticalLines),
        (e[i] = o.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  var b = { length: void 0, topRadius: void 0, bottomRadius: void 0, slices: void 0, numberOfVerticalLines: void 0, offsetAttribute: void 0 }
  return (
    (m.unpack = function (t, e, i) {
      e = o.defaultValue(e, 0)
      var r = t[e++],
        a = t[e++],
        n = t[e++],
        u = t[e++],
        s = t[e++],
        f = t[e]
      return o.defined(i)
        ? ((i._length = r),
          (i._topRadius = a),
          (i._bottomRadius = n),
          (i._slices = u),
          (i._numberOfVerticalLines = s),
          (i._offsetAttribute = -1 === f ? void 0 : f),
          i)
        : ((b.length = r),
          (b.topRadius = a),
          (b.bottomRadius = n),
          (b.slices = u),
          (b.numberOfVerticalLines = s),
          (b.offsetAttribute = -1 === f ? void 0 : f),
          new m(b))
    }),
    (m.createGeometry = function (r) {
      var d = r._length,
        c = r._topRadius,
        m = r._bottomRadius,
        b = r._slices,
        p = r._numberOfVerticalLines
      if (!(d <= 0 || c < 0 || m < 0 || (0 === c && 0 === m))) {
        var y,
          _ = 2 * b,
          h = n.CylinderGeometryLibrary.computePositions(d, c, m, b, !1),
          v = 2 * b
        if (p > 0) {
          var A = Math.min(p, b)
          ;(y = Math.round(b / A)), (v += A)
        }
        var R,
          G = f.IndexDatatype.createTypedArray(_, 2 * v),
          O = 0
        for (R = 0; R < b - 1; R++) (G[O++] = R), (G[O++] = R + 1), (G[O++] = R + b), (G[O++] = R + 1 + b)
        if (((G[O++] = b - 1), (G[O++] = 0), (G[O++] = b + b - 1), (G[O++] = b), p > 0)) for (R = 0; R < b; R += y) (G[O++] = R), (G[O++] = R + b)
        var V = new s.GeometryAttributes()
        ;(V.position = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: h })),
          (l.x = 0.5 * d),
          (l.y = Math.max(m, c))
        var L = new e.BoundingSphere(i.Cartesian3.ZERO, i.Cartesian2.magnitude(l))
        if (o.defined(r._offsetAttribute)) {
          d = h.length
          var g = new Uint8Array(d / 3),
            C = r._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1
          t.arrayFill(g, C),
            (V.applyOffset = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: g }))
        }
        return new u.Geometry({
          attributes: V,
          indices: G,
          primitiveType: u.PrimitiveType.LINES,
          boundingSphere: L,
          offsetAttribute: r._offsetAttribute
        })
      }
    }),
    function (t, e) {
      return o.defined(e) && (t = m.unpack(t, e)), m.createGeometry(t)
    }
  )
})
