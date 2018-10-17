"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 检测当前环境是否为iPod
 *
 * @return {boolean} true|false
 */
var userAgent = require('./get-userAgent');

function isiPod() {
  return /ipod/i.test(userAgent);
}

var _default = isiPod;
exports.default = _default;