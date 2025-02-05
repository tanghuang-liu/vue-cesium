define([
  './AttributeCompression-af389d04',
  './Matrix2-9aa31791',
  './Color-1ab5c5c7',
  './when-4bbc8319',
  './IndexDatatype-b7d979a6',
  './ComponentDatatype-93750d1a',
  './OrientedBoundingBox-4b932f63',
  './createTaskProcessorWorker',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, a, n, r, t, i, o, s, f, d, c, u, h, l, g, p) {
  'use strict'
  var b = new a.Cartesian3(),
    m = new a.Ellipsoid(),
    y = new a.Rectangle(),
    v = { min: void 0, max: void 0, indexBytesPerElement: void 0 }
  function C(e, a, r) {
    var t = a.length,
      i =
        2 +
        t * o.OrientedBoundingBox.packedLength +
        1 +
        (function (e) {
          for (var a = e.length, r = 0, t = 0; t < a; ++t) r += n.Color.packedLength + 3 + e[t].batchIds.length
          return r
        })(r),
      s = new Float64Array(i),
      f = 0
    ;(s[f++] = e), (s[f++] = t)
    for (var d = 0; d < t; ++d) o.OrientedBoundingBox.pack(a[d], s, f), (f += o.OrientedBoundingBox.packedLength)
    var c = r.length
    s[f++] = c
    for (var u = 0; u < c; ++u) {
      var h = r[u]
      n.Color.pack(h.color, s, f), (f += n.Color.packedLength), (s[f++] = h.offset), (s[f++] = h.count)
      var l = h.batchIds,
        g = l.length
      s[f++] = g
      for (var p = 0; p < g; ++p) s[f++] = l[p]
    }
    return s
  }
  var I = new a.Cartesian3(),
    w = new a.Cartesian3(),
    x = new a.Cartesian3(),
    A = new a.Cartesian3(),
    E = new a.Cartesian3(),
    N = new a.Cartographic(),
    T = new a.Rectangle()
  return s(function (s, f) {
    var d
    !(function (e) {
      var n = new Float64Array(e),
        r = 0
      ;(v.indexBytesPerElement = n[r++]),
        (v.min = n[r++]),
        (v.max = n[r++]),
        a.Cartesian3.unpack(n, r, b),
        (r += a.Cartesian3.packedLength),
        a.Ellipsoid.unpack(n, r, m),
        (r += a.Ellipsoid.packedLength),
        a.Rectangle.unpack(n, r, y)
    })(s.packedBuffer),
      (d = 2 === v.indexBytesPerElement ? new Uint16Array(s.indices) : new Uint32Array(s.indices))
    var c,
      u,
      h,
      l = new Uint16Array(s.positions),
      g = new Uint32Array(s.counts),
      p = new Uint32Array(s.indexCounts),
      B = new Uint32Array(s.batchIds),
      k = new Uint32Array(s.batchTableColors),
      L = new Array(g.length),
      O = b,
      U = m,
      P = y,
      F = v.min,
      S = v.max,
      D = s.minimumHeights,
      R = s.maximumHeights
    r.defined(D) && r.defined(R) && ((D = new Float32Array(D)), (R = new Float32Array(R)))
    var M = l.length / 2,
      _ = l.subarray(0, M),
      G = l.subarray(M, 2 * M)
    e.AttributeCompression.zigZagDeltaDecode(_, G)
    var Y = new Float64Array(3 * M)
    for (c = 0; c < M; ++c) {
      var V = _[c],
        H = G[c],
        W = i.CesiumMath.lerp(P.west, P.east, V / 32767),
        z = i.CesiumMath.lerp(P.south, P.north, H / 32767),
        Z = a.Cartographic.fromRadians(W, z, 0, N),
        j = U.cartographicToCartesian(Z, I)
      a.Cartesian3.pack(j, Y, 3 * c)
    }
    var q = g.length,
      J = new Array(q),
      K = new Array(q),
      Q = 0,
      X = 0
    for (c = 0; c < q; ++c) (J[c] = Q), (K[c] = X), (Q += g[c]), (X += p[c])
    var $,
      ee = new Float32Array(3 * M * 2),
      ae = new Uint16Array(2 * M),
      ne = new Uint32Array(K.length),
      re = new Uint32Array(p.length),
      te = [],
      ie = {}
    for (c = 0; c < q; ++c)
      (h = k[c]),
        r.defined(ie[h])
          ? ((ie[h].positionLength += g[c]), (ie[h].indexLength += p[c]), ie[h].batchIds.push(c))
          : (ie[h] = { positionLength: g[c], indexLength: p[c], offset: 0, indexOffset: 0, batchIds: [c] })
    var oe = 0,
      se = 0
    for (h in ie)
      if (ie.hasOwnProperty(h)) {
        ;(($ = ie[h]).offset = oe), ($.indexOffset = se)
        var fe = 2 * $.positionLength,
          de = 2 * $.indexLength + 6 * $.positionLength
        ;(oe += fe), (se += de), ($.indexLength = de)
      }
    var ce = []
    for (h in ie)
      ie.hasOwnProperty(h) &&
        (($ = ie[h]), ce.push({ color: n.Color.fromRgba(parseInt(h)), offset: $.indexOffset, count: $.indexLength, batchIds: $.batchIds }))
    for (c = 0; c < q; ++c) {
      var ue = ($ = ie[(h = k[c])]).offset,
        he = 3 * ue,
        le = ue,
        ge = J[c],
        pe = g[c],
        be = B[c],
        me = F,
        ye = S
      r.defined(D) && r.defined(R) && ((me = D[c]), (ye = R[c]))
      var ve = Number.POSITIVE_INFINITY,
        Ce = Number.NEGATIVE_INFINITY,
        Ie = Number.POSITIVE_INFINITY,
        we = Number.NEGATIVE_INFINITY
      for (u = 0; u < pe; ++u) {
        var xe = a.Cartesian3.unpack(Y, 3 * ge + 3 * u, I)
        U.scaleToGeodeticSurface(xe, xe)
        var Ae = U.cartesianToCartographic(xe, N),
          Ee = Ae.latitude,
          Ne = Ae.longitude
        ;(ve = Math.min(Ee, ve)), (Ce = Math.max(Ee, Ce)), (Ie = Math.min(Ne, Ie)), (we = Math.max(Ne, we))
        var Te = U.geodeticSurfaceNormal(xe, w),
          Be = a.Cartesian3.multiplyByScalar(Te, me, x),
          ke = a.Cartesian3.add(xe, Be, A)
        Be = a.Cartesian3.multiplyByScalar(Te, ye, Be)
        var Le = a.Cartesian3.add(xe, Be, E)
        a.Cartesian3.subtract(Le, O, Le),
          a.Cartesian3.subtract(ke, O, ke),
          a.Cartesian3.pack(Le, ee, he),
          a.Cartesian3.pack(ke, ee, he + 3),
          (ae[le] = be),
          (ae[le + 1] = be),
          (he += 6),
          (le += 2)
      }
      ;((P = T).west = Ie), (P.east = we), (P.south = ve), (P.north = Ce), (L[c] = o.OrientedBoundingBox.fromRectangle(P, F, S, U))
      var Oe = $.indexOffset,
        Ue = K[c],
        Pe = p[c]
      for (ne[c] = Oe, u = 0; u < Pe; u += 3) {
        var Fe = d[Ue + u] - ge,
          Se = d[Ue + u + 1] - ge,
          De = d[Ue + u + 2] - ge
        ;(te[Oe++] = 2 * Fe + ue),
          (te[Oe++] = 2 * Se + ue),
          (te[Oe++] = 2 * De + ue),
          (te[Oe++] = 2 * De + 1 + ue),
          (te[Oe++] = 2 * Se + 1 + ue),
          (te[Oe++] = 2 * Fe + 1 + ue)
      }
      for (u = 0; u < pe; ++u) {
        var Re = u,
          Me = (u + 1) % pe
        ;(te[Oe++] = 2 * Re + 1 + ue),
          (te[Oe++] = 2 * Me + ue),
          (te[Oe++] = 2 * Re + ue),
          (te[Oe++] = 2 * Re + 1 + ue),
          (te[Oe++] = 2 * Me + 1 + ue),
          (te[Oe++] = 2 * Me + ue)
      }
      ;($.offset += 2 * pe), ($.indexOffset = Oe), (re[c] = Oe - ne[c])
    }
    te = t.IndexDatatype.createTypedArray(ee.length / 3, te)
    for (var _e = ce.length, Ge = 0; Ge < _e; ++Ge) {
      for (var Ye = ce[Ge].batchIds, Ve = 0, He = Ye.length, We = 0; We < He; ++We) Ve += re[Ye[We]]
      ce[Ge].count = Ve
    }
    var ze = C(2 === te.BYTES_PER_ELEMENT ? t.IndexDatatype.UNSIGNED_SHORT : t.IndexDatatype.UNSIGNED_INT, L, ce)
    return (
      f.push(ee.buffer, te.buffer, ne.buffer, re.buffer, ae.buffer, ze.buffer),
      { positions: ee.buffer, indices: te.buffer, indexOffsets: ne.buffer, indexCounts: re.buffer, batchIds: ae.buffer, packedBuffer: ze.buffer }
    )
  })
})
