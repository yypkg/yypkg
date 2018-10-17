"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 动态加载脚本
 *
 * @param {string} url
 * @return {promise}
 */
var loadScript = function loadScript(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    window.document.appendChild(script);
  });
};

var _default = loadScript;
exports.default = _default;