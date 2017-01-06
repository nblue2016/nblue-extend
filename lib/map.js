'use strict';

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

        obj[key] = val instanceof Map ? val.toObject() : val;
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

if (!Map.prototype.select) {
  Map.prototype.select = function (path) {
    var items = path.split('/');
    var that = this;

    var parent = that,
        result = null;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        result = parent.has(key) ? parent.get(key) : null;
        if (result === null) break;

        parent = result;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
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