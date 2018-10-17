"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 获取 userAgent
 *
 * @return {string} userAgent
 */
var USER_AGENT = window.navigator.userAgent.toLowerCase() || '';
var _default = USER_AGENT;
exports.default = _default;