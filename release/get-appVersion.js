"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 获取 app 版本
 *
 * @return {string} app 版本号
 */
var APP_VERSION = window.navigator.appVersion.toLowerCase() || '';
var _default = APP_VERSION;
exports.default = _default;