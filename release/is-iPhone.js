"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 检测当前环境是否为 iPhone
 *
 * @return {boolean} true|false
 */
var userAgent = require('./get-userAgent');

function isiPhone() {
  return /iphone/i.test(userAgent);
}

var _default = isiPhone;
exports.default = _default;