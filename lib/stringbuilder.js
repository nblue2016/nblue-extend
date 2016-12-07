'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringBuilder = function () {
  function StringBuilder() {
    _classCallCheck(this, StringBuilder);

    this._buffer = [];
  }

  _createClass(StringBuilder, [{
    key: '_append',
    value: function _append(ary, str) {
      for (var i = 0; i < str.length; i += 1) {
        ary.push(str[i]);
      }
    }
  }, {
    key: 'append',
    value: function append(str) {
      if (!str) {
        throw new Error('null of str');
      }

      this._append(this._buffer, str);
    }
  }, {
    key: 'appendLine',
    value: function appendLine(line) {
      this.append(line + '\r\n');
    }
  }, {
    key: 'appendFormat',
    value: function appendFormat(format) {
      for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        items[_key - 1] = arguments[_key];
      }

      this.append(String.format.apply(String, [format].concat(items)));
    }
  }, {
    key: 'insert',
    value: function insert(index, str) {
      if (index < 0 || index >= this.length) {
        throw new Error('the index out of range');
      }
      if (!str) {
        throw new Error('null of str');
      }

      if (index === 0) {
        var newBuffer = [];

        this._append(newBuffer, str);
        this._buffer = newBuffer.concat(this._buffer);

        newBuffer = null;
      } else if (index === this.length - 1) {
        this._append(this._buffer, str);
      } else {
        var buffer1 = null,
            buffer2 = null;

        buffer1 = this._buffer.slice(0, index + 1);
        buffer2 = this._buffer.slice(index + 1, this.length);

        this._append(buffer1, str);
        this._buffer = buffer1.concat(buffer2);

        buffer1 = null;
        buffer2 = null;
      }
    }
  }, {
    key: 'insertFormat',
    value: function insertFormat(index, format) {
      for (var _len2 = arguments.length, items = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        items[_key2 - 2] = arguments[_key2];
      }

      this.insert(index, String.format.apply(String, [format].concat(items)));
    }
  }, {
    key: 'remove',
    value: function remove(index, length) {
      if (index < 0 || index >= this.length) {
        throw new Error('the index out of range');
      }

      if (length < 0 || index + length > this.length) {
        throw new Error('invalid range of length');
      }

      this._buffer.splice(index, length);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this._buffer.join('');
    }
  }, {
    key: 'length',
    get: function get() {
      return this._buffer.length;
    }
  }]);

  return StringBuilder;
}();

if (!global.StringBuilder) {
  global.StringBuilder = StringBuilder;
}

module.exports = StringBuilder;