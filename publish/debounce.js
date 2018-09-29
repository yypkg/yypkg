"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _test = _interopRequireDefault(require("./common/test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 函数去抖
 *
 * @param {Function} fn 回调函数
 * @param {number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */
(0, _test.default)();

function _default(fn, delay) {
  var last;
  return function () {
    var ctx = this;
    var args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      fn.apply(ctx, args);
    }, delay);
  };
}