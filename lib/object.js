'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
    case 'string':
      return v;
    case 'number':
      return isFinite(v) ? '' + v : '';
    case 'boolean':
      return v ? 'true' : 'false';
    default:
      return '';
  }
};

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
    value: function value(obj, separate, equal, options) {
      var sep = separate || '&';
      var eq = equal || '=';

      var encode = escape;

      if (options && typeof options.encodeURIComponent === 'function') {
        encode = options.encodeURIComponent;
      }

      if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        var keys = Object.keys(obj);
        var len = keys.length;
        var flast = len - 1;

        var fields = '';

        for (var i = 0; i < len; i += 1) {
          var k = keys[i];
          var ks = encode(stringifyPrimitive(k)) + eq;

          var v = obj[k];

          if (Array.isArray(v)) {
            var vlen = v.length;
            var vlast = vlen - 1;

            for (var j = 0; j < vlen; j += 1) {
              fields += ks + encode(stringifyPrimitive(v[j]));

              fields += j < vlast ? sep : 0;
            }

            if (vlen && i < flast) fields += sep;
          } else {
            fields += ks + encode(stringifyPrimitive(v));
            if (i < flast) {
              fields += sep;
            }
          }
        }

        return fields;
      }

      return '';
    }
  });
}

if (!Object.prototype.toMap) {
  Object.prototype.toMap = function () {
    return Object.toMap(this);
  };
}