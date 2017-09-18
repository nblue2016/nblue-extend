'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var formatString = function formatString(format) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (typeof format !== 'string') return args.join(' ');
  if (args.length === 0) return format;

  var formatValue = function formatValue(char, val) {
    switch (char) {
      case 'd':
        return Number(val);
      case 'j':
        try {
          return JSON.stringify(val);
        } catch (e) {
          return '[Parse failed]';
        }
      case 's':
        return String(val);
      case 'o':
        return Object.keys(val).map(function (key) {
          return key + '=' + val[key];
        }).join('');
      default:
        throw new Error('not supported');
    }
  };

  var alpha = 0,
      lastPos = 0,
      str = '';

  Array.from(format).forEach(function (char, index) {
    // ignore if previous char is %
    if (index > 0 && format[index - 1] === '%') return;

    // process value if next char is d/j/s
    if (char === '%') {
      // append previous chars to outputer
      if (lastPos < index) str += format.slice(lastPos, index);

      if (index < format.length - 1) {
        str += formatValue(format[index + 1], alpha < args.length ? args[alpha] : args[args.length - 1]);

        alpha += 1;
        lastPos = index + 2;
      } else {
        str += '%';
        lastPos = index + 1;
      }
    }
  });

  // append string form the latest % to end
  if (lastPos === 0) str = format;else if (lastPos < format.length) {
    str += format.slice(lastPos);
  }

  return str;
};

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    var newPosition = position || 0;

    return this.substr(newPosition, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();

    var newPosition = position;

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      newPosition = subjectString.length;
    }

    newPosition -= searchString.length;

    var lastIndex = subjectString.indexOf(searchString, newPosition);

    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    var newStart = start;

    if (typeof newStart !== 'number') newStart = 0;

    if (newStart + search.length > this.length) {
      return this.indexOf(search, newStart) !== -1;
    }

    return false;
  };
}

if (!String.prototype.eval) {
  String.prototype.eval = function () {
    var s1 = this.toString();

    return eval(s1);
  };
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function (targetLength, padString) {
    var ctx = this;
    var currentLength = ctx.length;

    var newString = padString;

    if (!newString) newString = ' ';

    if (currentLength >= targetLength) {
      return ctx.substr(0, targetLength);
    }

    var startPart = newString.repeat(targetLength - currentLength).substr(0, targetLength - currentLength);

    return '' + startPart + ctx.toString();
  };
}

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function (targetLength, padString) {
    var ctx = this;
    var currentLength = ctx.length;

    var newString = padString;

    if (!newString) newString = ' ';

    if (currentLength >= targetLength) {
      return ctx.substr(0, targetLength);
    }

    var endPart = newString.repeat(targetLength - currentLength).substr(0, targetLength - currentLength);

    return '' + ctx.toString() + endPart;
  };
}

if (!String.prototype.toDate) {
  String.prototype.toDate = function () {
    return new Date(Date.parse(this.toString()));
  };
}

if (!String.hasOwnProperty('format')) {
  Reflect.defineProperty(String, 'format', {
    value: function value(text) {
      for (var _len2 = arguments.length, items = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        items[_key2 - 1] = arguments[_key2];
      }

      if (items.length === 1 && _typeof(items[0]) === 'object') {
        var dict = items[0];

        var newText = text;

        Object.keys(dict).forEach(function (key) {
          var indexKey = '${';

          indexKey += key;
          indexKey += '}';

          while (newText.indexOf(indexKey) >= 0) {
            newText = newText.replace(indexKey, dict[key]);
          }
        });

        return newText;
      }

      // return util.format(text, ...items)
      return formatString.apply(undefined, [text].concat(items));
    }
  });
}