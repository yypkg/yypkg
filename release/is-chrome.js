"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

var _getVendor = _interopRequireDefault(require("./get-vendor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前浏览器是否为 Chrome
 *
 * @return {boolean} true|false
 */
function isChrome() {
  return /chrome|chromium|gecko/i.test(_getUserAgent.default) && /google inc/.test(_getVendor.default);
}

var _default = isChrome;
exports.default = _default;