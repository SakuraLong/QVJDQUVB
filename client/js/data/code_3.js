!(function (e, r) {
  "object" == typeof exports
    ? (module.exports = exports =
        r(require("./core"), require("./cipher-core")))
    : "function" == typeof define && define.amd
    ? define(["./core", "./cipher-core"], r)
    : r(e.CryptoJS);
})(this, function (e) {
  return e.pad.Pkcs7;
});
