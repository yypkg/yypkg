"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 动态加载样式
 *
 * @param {string} url
 * @return {promise}
 */
var loadStyle = function loadStyle(url) {
  return new Promise(function (resolve, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    window.document.appendChild(link);
  });
};

var _default = loadStyle;
exports.default = _default;