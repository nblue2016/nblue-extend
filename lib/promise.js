"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// define done method, it can throw error in promise
if (!Promise.prototype.done) {
  Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch(function (err) {
      // throw new Error to outside
      setTimeout(function () {
        throw err;
      }, 0);
    });
  };
}

// define finally method, it will be executed after then and catch methods
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    return this.then(function (data) {
      return Promise.resolve(callback()).then(function () {
        return data;
      });
    }, function (err) {
      return Promise.resolve(callback()).then(function () {
        throw err;
      });
    });
  };
}

// define spread method, spread array result of promise .then
if (!Promise.prototype.spread) {
  Promise.prototype.spread = function (callback) {
    return this.then(function (data) {
      if (data) {
        return Promise.resolve(Array.isArray(data) ? callback.apply(undefined, _toConsumableArray(data)) : callback(data));
      }

      return Promise.resolve(null);
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define map method, map array result of promise .then
if (!Promise.prototype.map) {
  Promise.prototype.map = function (callback) {
    return this.then(function (data) {
      if (data) {
        return Promise.resolve(Array.isArray(data) ? data.map(callback) : [data].map(callback)[0]);
      }

      return [];
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define each method, fetch every item in result of promise .then
if (!Promise.prototype.each) {
  Promise.prototype.each = function (callback) {
    return this.then(function (data) {
      if (data) {
        var rt = Promise.resolve(Array.isArray(data)) ? data : [data];

        rt.forEach(callback);
      }
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define filter method, filter array result of promise .then
if (!Promise.prototype.filter) {
  Promise.prototype.filter = function (callback) {
    return this.then(function (data) {
      if (data) {
        var rt = Array.isArray(data) ? data.filter(callback) : [data].filter(callback);

        if (!Array.isArray(data) && rt) {
          rt = rt[0];
        }

        return Promise.resolve(rt);
      }

      return [];
    }, function (err) {
      return Promise.reject(err);
    });
  };
}