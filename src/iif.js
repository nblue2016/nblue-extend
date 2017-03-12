module.exports = (express, r1, r2) => {
  const wrap = function (rt) {
    return rt && typeof rt === 'function' ? rt() : rt
  }

  return wrap(express) ? wrap(r1) : wrap(r2)
}
