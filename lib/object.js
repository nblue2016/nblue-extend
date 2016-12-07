'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var querystring = require('querystring');

if (!Object.hasOwnProperty('values')) {
  Reflect.defineProperty(Object, 'values', {
    value: function value(obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    }
  });
}

if (!Object.hasOwnProperty('entries')) {
  Reflect.defineProperty(Object, 'entries', {
    value: function value(obj) {
      return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
      });
    }
  });
}

if (!Object.hasOwnProperty('is')) {
  Reflect.defineProperty(Object, 'is', {
    value: function value(x1, y1) {
      if (x1 === y1) return x1 !== 0 || 1 / x1 === 1 / y1;

      return false;
    }
  });
}

if (!Object.hasOwnProperty('toMap')) {
  Reflect.defineProperty(Object, 'toMap', {
    value: function value(obj, deep) {
      if (!deep) return new Map(Object.entries(obj));

      var map = new Map();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var val = obj[key];

          map.set(key, (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? Object.toMap(val, true) : val);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return map;
    }
  });
}

if (!Object.hasOwnProperty('toFormData')) {
  Reflect.defineProperty(Object, 'toFormData', {
    value: function value(obj) {
      return querystring.stringify(obj);
    }
  });
}