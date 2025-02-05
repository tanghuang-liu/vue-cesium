define(['exports', './when-4bbc8319'], function (t, e) {
  'use strict'
  function n(t) {
    var e
    ;(this.name = 'DeveloperError'), (this.message = t)
    try {
      throw new Error()
    } catch (t) {
      e = t.stack
    }
    this.stack = e
  }
  e.defined(Object.create) && ((n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n)),
    (n.prototype.toString = function () {
      var t = this.name + ': ' + this.message
      return e.defined(this.stack) && (t += '\n' + this.stack.toString()), t
    }),
    (n.throwInstantiationError = function () {
      throw new n('This function defines an interface and should not be called directly.')
    })
  var r = {}
  function o(t, e, n) {
    return 'Expected ' + n + ' to be typeof ' + e + ', actual typeof was ' + t
  }
  function a(t) {
    var e
    ;(this.name = 'RuntimeError'), (this.message = t)
    try {
      throw new Error()
    } catch (t) {
      e = t.stack
    }
    this.stack = e
  }
  ;(r.typeOf = {}),
    (r.defined = function (t, r) {
      if (!e.defined(r))
        throw new n(
          (function (t) {
            return t + ' is required, actual value was undefined'
          })(t)
        )
    }),
    (r.typeOf.func = function (t, e) {
      if ('function' != typeof e) throw new n(o(typeof e, 'function', t))
    }),
    (r.typeOf.string = function (t, e) {
      if ('string' != typeof e) throw new n(o(typeof e, 'string', t))
    }),
    (r.typeOf.number = function (t, e) {
      if ('number' != typeof e) throw new n(o(typeof e, 'number', t))
    }),
    (r.typeOf.number.lessThan = function (t, e, o) {
      if ((r.typeOf.number(t, e), e >= o)) throw new n('Expected ' + t + ' to be less than ' + o + ', actual value was ' + e)
    }),
    (r.typeOf.number.lessThanOrEquals = function (t, e, o) {
      if ((r.typeOf.number(t, e), e > o)) throw new n('Expected ' + t + ' to be less than or equal to ' + o + ', actual value was ' + e)
    }),
    (r.typeOf.number.greaterThan = function (t, e, o) {
      if ((r.typeOf.number(t, e), e <= o)) throw new n('Expected ' + t + ' to be greater than ' + o + ', actual value was ' + e)
    }),
    (r.typeOf.number.greaterThanOrEquals = function (t, e, o) {
      if ((r.typeOf.number(t, e), e < o)) throw new n('Expected ' + t + ' to be greater than or equal to ' + o + ', actual value was ' + e)
    }),
    (r.typeOf.object = function (t, e) {
      if ('object' != typeof e) throw new n(o(typeof e, 'object', t))
    }),
    (r.typeOf.bool = function (t, e) {
      if ('boolean' != typeof e) throw new n(o(typeof e, 'boolean', t))
    }),
    (r.typeOf.bigint = function (t, e) {
      if ('bigint' != typeof e) throw new n(o(typeof e, 'bigint', t))
    }),
    (r.typeOf.number.equals = function (t, e, o, a) {
      if ((r.typeOf.number(t, o), r.typeOf.number(e, a), o !== a))
        throw new n(t + ' must be equal to ' + e + ', the actual values are ' + o + ' and ' + a)
    }),
    e.defined(Object.create) && ((a.prototype = Object.create(Error.prototype)), (a.prototype.constructor = a)),
    (a.prototype.toString = function () {
      var t = this.name + ': ' + this.message
      return e.defined(this.stack) && (t += '\n' + this.stack.toString()), t
    }),
    (t.Check = r),
    (t.DeveloperError = n),
    (t.RuntimeError = a)
})
