"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 睡眠指定时间
 *
 * @return {fucntion}
 */
var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
};

var _default = sleep;
exports.default = _default;