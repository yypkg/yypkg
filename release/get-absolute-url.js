"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 根据相对路径获取绝对路径
 * @param {string} url 相对路径
 * @return {string} 绝对路径
 */
function getAbsoluteUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}

var _default = getAbsoluteUrl;
exports.default = _default;