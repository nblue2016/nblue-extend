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
  Promise.prototype.finally = function (promise) {
    return this.then(function (data) {
      return Promise.resolve(promise()).then(function () {
        return data;
      });
    }, function (err) {
      return Promise.resolve(promise()).then(function () {
        throw err;
      });
    });
  };
}

// define spread method, flattened to the formal parameters of
// the fulfillment handler.
if (!Promise.prototype.spread) {
  Promise.prototype.spread = function (func) {
    return this.then(function (data) {
      if (!data) return Promise.resolve(null);

      return Promise.resolve(Array.isArray(data) ? func.apply(undefined, _toConsumableArray(data)) : func(data));
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define tap method, pass the result to next promise function
if (!Promise.prototype.tap) {
  Promise.prototype.tap = function (func) {
    return this.then(function (data) {
      return Promise.resolve(func(data)).then(function () {
        return data;
      });
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define tap method, pass the result to next promise function
if (!Promise.prototype.nodeify) {
  Promise.prototype.nodeify = function (callback) {
    if (callback) {
      return this.then(function (data) {
        return callback(null, data);
      }, function (err) {
        return callback(err);
      });
    }

    return this.then(function (data) {
      return data;
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define map method, map array result of promise .then
if (!Promise.prototype.map) {
  Promise.prototype.map = function (func) {
    return this.then(function (data) {
      if (data) {
        return Promise.resolve(Array.isArray(data) ? data.map(func) : [data].map(func)[0]);
      }

      return [];
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define each method, fetch every item in result of promise .then
if (!Promise.prototype.each) {
  Promise.prototype.each = function (func) {
    return this.then(function (data) {
      if (data) {
        // resolve result
        var rt = Promise.resolve(Array.isArray(data)) ? data : [data];

        // call forEach function for array
        if (rt) rt.forEach(func);
      }
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define filter method, filter array result of promise .then
if (!Promise.prototype.filter) {
  Promise.prototype.filter = function (func) {
    return this.then(function (data) {
      // return empty array if there is no data
      if (!data) return [];

      // call filter function for array
      var rt = (Array.isArray(data) ? data : [data]).filter(func);

      // resolve result
      return Promise.resolve(!Array.isArray(data) && rt ? rt[0] : rt);
    }, function (err) {
      return Promise.reject(err);
    });
  };
}