!(function (r, e) {
  "object" == typeof exports
    ? (module.exports = exports = e(require("./core")))
    : "function" == typeof define && define.amd
    ? define(["./core"], e)
    : e(r.CryptoJS);
})(this, function (r) {
  var c;
  return (
    (c = r.lib.WordArray),
    (r.enc.Base64 = {
      stringify: function (r) {
        var e = r.words,
          t = r.sigBytes,
          a = this._map;
        r.clamp();
        for (var n = [], o = 0; o < t; o += 3)
          for (
            var i =
                (((e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                (((e[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8) |
                ((e[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
              f = 0;
            f < 4 && o + 0.75 * f < t;
            f++
          )
            n.push(a.charAt((i >>> (6 * (3 - f))) & 63));
        var c = a.charAt(64);
        if (c) for (; n.length % 4; ) n.push(c);
        return n.join("");
      },
      parse: function (r) {
        var e = r.length,
          t = this._map;
        if (!(a = this._reverseMap))
          for (var a = (this._reverseMap = []), n = 0; n < t.length; n++)
            a[t.charCodeAt(n)] = n;
        var o = t.charAt(64);
        return (
          !o || (-1 !== (o = r.indexOf(o)) && (e = o)),
          (function (r, e, t) {
            for (var a = [], n = 0, o = 0; o < e; o++) {
              var i, f;
              o % 4 &&
                ((i = t[r.charCodeAt(o - 1)] << ((o % 4) * 2)),
                (f = t[r.charCodeAt(o)] >>> (6 - (o % 4) * 2)),
                (f = i | f),
                (a[n >>> 2] |= f << (24 - (n % 4) * 8)),
                n++);
            }
            return c.create(a, n);
          })(r, e, a)
        );
      },
      _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    }),
    r.enc.Base64
  );
});
