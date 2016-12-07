"use strict";

if (!Map.prototype.toObject) {
  Map.prototype.toObject = function () {
    var obj = {};
    var ctx = this;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ctx.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var val = ctx.get(key);

        if (val instanceof Map) {
          obj[key] = val.toObject();
        }

        obj[key] = val;
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

    return obj;
  };
}

if (!Map.prototype.toJSON) {
  Map.prototype.toJSON = function () {
    return JSON.stringify(this.toObject());
  };
}

if (!Map.prototype.get2) {
  Map.prototype.get2 = function (key, defVal) {
    return this.has(key) ? this.get(key) : defVal;
  };
}

if (!Map.prototype.getArray) {
  Map.prototype.getArray = function (key) {
    if (!this.has(key)) return [];

    var items = this.get(key);

    if (!items) return [];

    return Array.isArray(items) ? items : [items];
  };
}