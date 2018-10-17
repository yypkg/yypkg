"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 获取 vendor
 *
 * @return {string} vendor
 */
var vendor = window.navigator.vendor && window.navigator.vendor.toLowerCase() || '';
var _default = vendor;
exports.default = _default;