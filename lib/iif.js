'use strict';

module.exports = function (express, r1, r2) {
  var wrap = function wrap(rt) {
    return rt && typeof rt === 'function' ? rt() : rt;
  };

  return wrap(express) ? wrap(r1) : wrap(r2);
};