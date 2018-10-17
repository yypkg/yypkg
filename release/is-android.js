"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 检测当前环境是否为 Android
 *
 * @return {boolean} true|false
 */
var userAgent = require('./get-userAgent');

function isAndroid() {
  return /android/i.test(userAgent);
}

var _default = isAndroid;
exports.default = _default;