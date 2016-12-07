'use strict';

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

// define map method, map array result of promise .then
if (!Promise.prototype.map) {
  Promise.prototype.map = function (callback) {
    return this.then(function (data) {
      return Promise.resolve(Array.isArray(data) ? data.map(callback) : data);
    }, function (err) {
      return Promise.reject(err);
    });
  };
}

// define filter method, filter array result of promise .then
if (!Promise.prototype.filter) {
  Promise.prototype.filter = function (callback) {
    return this.then(function (data) {
      if (Array.isArray(data)) {
        return Promise.resolve(data.filter(callback));
      }

      return Promise.reject(new Error('filter method doesn\'t support'));
    }, function (err) {
      return Promise.reject(err);
    });
  };
}