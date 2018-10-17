"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 函数节流
 *
 * @param {Function} fn 回调函数
 * @param {number} time 每隔多长时间执行一次
 * @return {Function}
 */
var throttle = function throttle(fn, time) {
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
};

var _default = throttle;
exports.default = _default;