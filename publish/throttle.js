"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _test = _interopRequireDefault(require("./common/test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _test.default)();

var A = function A() {
  _classCallCheck(this, A);
};

function _default(fn, time) {
  var context, args, timeout, result;
  var previous = 0;

  var later = function later() {
    previous = new Date();
    timeout = null;
    result = fn.apply(context, args);
  };

  return function () {
    var now = new Date();
    var remaining = time - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}