!(function (e, r) {
  "object" == typeof exports
    ? (module.exports = exports =
        r(require("./core"), require("./sha1"), require("./hmac")))
    : "function" == typeof define && define.amd
    ? define(["./core", "./sha1", "./hmac"], r)
    : r(e.CryptoJS);
})(this, function (e) {
  var r, t, i, m, o, x, n;
  return (
    (t = (r = e).lib),
    (i = t.Base),
    (m = t.WordArray),
    (o = r.algo),
    (t = o.SHA1),
    (x = o.HMAC),
    (n = o.PBKDF2 =
      i.extend({
        cfg: i.extend({ keySize: 4, hasher: t, iterations: 1 }),
        init: function (e) {
          this.cfg = this.cfg.extend(e);
        },
        compute: function (e, r) {
          for (
            var t = this.cfg,
              i = x.create(t.hasher, e),
              o = m.create(),
              n = m.create([1]),
              a = o.words,
              c = n.words,
              s = t.keySize,
              f = t.iterations;
            a.length < s;

          ) {
            var u = i.update(r).finalize(n);
            i.reset();
            for (var d = u.words, h = d.length, p = u, g = 1; g < f; g++) {
              (p = i.finalize(p)), i.reset();
              for (var l = p.words, y = 0; y < h; y++) d[y] ^= l[y];
            }
            o.concat(u), c[0]++;
          }
          return (o.sigBytes = 4 * s), o;
        },
      })),
    (r.PBKDF2 = function (e, r, t) {
      return n.create(t).compute(e, r);
    }),
    e.PBKDF2
  );
});
