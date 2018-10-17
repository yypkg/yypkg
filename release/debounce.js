"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 函数去抖
 *
 * @param {Function} fn 回调函数
 * @param {number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */
var debounce = function debounce(fn, delay) {
  var last;
  return function () {
    var ctx = this;
    var args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      fn.apply(ctx, args);
    }, delay);
  };
};

var _default = debounce;
exports.default = _default;