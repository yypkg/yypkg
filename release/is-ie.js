"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前浏览器是否为IE
 * edge 也属于IE
 *
 * @param {number} version 版本号
 * @return {boolean} true|false
 */
function isIE(version) {
  if (!version) {
    return /msie/i.test(_getUserAgent.default) || 'ActiveXObject' in window;
  }

  if (version >= 11) {
    return 'ActiveXObject' in window;
  }

  return new RegExp('msie ' + version).test(_getUserAgent.default);
}

var _default = isIE;
exports.default = _default;