'use strict';

var DayShortNames = {
  $$0: 'Sun',
  $$1: 'Mon',
  $$2: 'Tue',
  $$3: 'Wed',
  $$4: 'Thr',
  $$5: 'Fri',
  $$6: 'Sat'
};

var DayNames = {
  $$$0: 'Sunday',
  $$$1: 'Monday',
  $$$2: 'Tuesday',
  $$$3: 'Wednesday',
  $$$4: 'Thursday',
  $$$5: 'Friday',
  $$$6: 'Saturday'
};

var MonthShortNames = {
  __10: 'Oct',
  __11: 'Nov',
  __12: 'Dec',
  __1: 'Jan',
  __2: 'Feb',
  __3: 'Mar',
  __4: 'Apr',
  __5: 'May',
  __6: 'Jun',
  __7: 'Jul',
  __8: 'Aug',
  __9: 'Sep'
};

var MonthNames = {
  ___10: 'October',
  ___11: 'November',
  ___12: 'December',
  ___1: 'January',
  ___2: 'February',
  ___3: 'March',
  ___4: 'April',
  ___5: 'May',
  ___6: 'June',
  ___7: 'July',
  ___8: 'August',
  ___9: 'September'
};

var createDict = function createDict(ctx) {
  var dict = {
    dddd: '$$$$$$' + ctx.getDay(),
    ddd: '$$$$' + ctx.getDay(),
    dd: ctx.getDate().toString().padStart(2, '0'),
    d: ctx.getDate(),
    MMMM: '___' + (ctx.getMonth() + 1),
    MMM: '__' + (ctx.getMonth() + 1),
    MM: (ctx.getMonth() + 1).toString().padStart(2, '0'),
    M: (ctx.getMonth() + 1).toString(),
    yyyy: ctx.getFullYear(),
    yyy: ctx.getFullYear(),
    yy: ctx.getFullYear().toString().substr(2, 2),
    HH: ctx.getHours().toString().padStart(2, '0'),
    H: ctx.getHours(),
    hh: (ctx.getHours() % 12 || 12).toString().padStart(2, '0'),
    h: (ctx.getHours() % 12 || 12).toString(),
    mm: ctx.getMinutes().toString().padStart(2, '0'),
    m: ctx.getMinutes(),
    ss: ctx.getSeconds().toString().padStart(2, '0'),
    s: ctx.getSeconds(),
    L: function () {
      var m = ctx.getMilliseconds();

      if (m > 99) m = Math.round(m / 10);

      return m.toString().padStart(3, '0');
    }(),
    l: ctx.getMilliseconds().toString().padStart(3, '0'),
    S: ctx.getMilliseconds(),
    TT: ctx.getHours() < 12 ? 'AM' : 'PM',
    tt: ctx.getHours() < 12 ? 'am' : 'pm',
    z: ctx.toUTCString().match(/[A-Z]+$/)
  };

  return dict;
};

if (!Date.hasOwnProperty('isLeapYear')) {
  Reflect.defineProperty(Date, 'isLeapYear', {
    value: function value(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
  });
}

if (!Date.hasOwnProperty('getDaysInMonth')) {
  Reflect.defineProperty(Date, 'getDaysInMonth', {
    value: function value(year, month) {
      return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
  });
}

if (!Date.hasOwnProperty('parseDate')) {
  Reflect.defineProperty(Date, 'parseDate', {
    value: function value(text) {
      return new Date(Date.parse(text));
    }
  });
}

if (!Date.prototype.format) {
  Date.prototype.format = function (format, options) {
    var ctx = this;
    var dict = createDict(ctx);

    var newFormat = format,
        newOptions = options;

    if (!newOptions) {
      newOptions = {};
      newOptions.supportName = false;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(dict)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _key4 = _step.value;

        if (new RegExp('(' + _key4 + ')').test(newFormat)) {
          newFormat = newFormat.replace(RegExp.$1, dict[_key4]);
        }
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

    if (newOptions.supportName) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(DayNames)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (newFormat.indexOf(key) >= 0) {
            newFormat = newFormat.replace(key, DayNames[key]);
          }
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.keys(DayShortNames)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _key = _step3.value;

          if (newFormat.indexOf(_key) >= 0) {
            newFormat = newFormat.replace(_key, DayShortNames[_key]);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.keys(MonthNames)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _key2 = _step4.value;

          if (newFormat.indexOf(_key2) >= 0) {
            newFormat = newFormat.replace(_key2, MonthNames[_key2]);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = Object.keys(MonthShortNames)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _key3 = _step5.value;

          if (newFormat.indexOf(_key3) >= 0) {
            newFormat = newFormat.replace(_key3, MonthShortNames[_key3]);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }

    return newFormat;
  };
}

if (!Date.prototype.addSeconds) {
  Date.prototype.addSeconds = function (seconds) {
    var value = this.valueOf();

    return new Date(value + seconds * 1000);
  };
}

if (!Date.prototype.addMinutes) {
  Date.prototype.addMinutes = function (minutes) {
    return this.addSeconds(minutes * 60);
  };
}

if (!Date.prototype.addHours) {
  Date.prototype.addHours = function (hours) {
    return this.addMinutes(hours * 60);
  };
}

if (!Date.prototype.addDays) {
  Date.prototype.addDays = function (minutes) {
    return this.addHours(minutes * 24);
  };
}

if (!Date.prototype.addMonths) {
  Date.prototype.addMonths = function (months) {
    var days = this.getDate();

    this.setDate(1);
    this.setMonth(this.getMonth() + months);

    this.setDate(Math.min(days, this.getDaysInMonth()));

    return this;
  };
}

if (!Date.prototype.addYears) {
  Date.prototype.addYears = function (years) {
    var curYears = this.getYears();

    this.setYear(curYears + years);

    return this;
  };
}

if (!Date.prototype.add) {
  Date.prototype.add = function (value, flag) {
    switch (flag) {
      case 's':
      case 'second':
        return this.addSeconds(value);
      case 'm':
      case 'minute':
        return this.addMinutes(value);
      case 'h':
      case 'hours':
        return this.addHours(value);
      case 'd':
      case 'day':
        return this.addDays(value);
      case 'M':
      case 'month':
        return this.addMonths(value);
      case 'y':
      case 'yyyy':
      case 'year':
        return this.addYears(value);
      default:
        throw new Error('doesn\'t support flag: ' + flag);
    }
  };
}

if (!Date.prototype.isLeapYear) {
  Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
  };
}

if (!Date.prototype.getDaysInMonth) {
  Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
  };
}