'use strict';

if (!Array.hasOwnProperty('range')) {
  Reflect.defineProperty(Array, 'range', {
    value: function value(start, end, step) {
      if (!start && start !== 0) throw new Error('invaild argument of start');
      if (!end && end !== 0) throw new Error('invaild argument of end');
      if (end < start) throw new Error('end must greater than start');

      var ary = [];
      var sp = step ? step : 1;

      for (var i = start; i <= end; i += sp) {
        ary.push(i);
      }

      return ary;
    }
  });
}

if (!Array.prototype.toObject) {
  Array.prototype.toObject = function (keys) {
    var _this = this;

    if (keys === null) throw new Error('invaild keys');
    if (!Array.isArray(keys)) throw new Error('the keys is not an array');

    // const length = this.length > keys.length ? keys.length : this.length
    return keys.reduce(function (obj, key, index) {
      if (index < _this.length) {
        obj[key] = _this[index];
      }

      return obj;
    }, {});
  };
}