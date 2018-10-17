"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测是否在微信浏览器中
 *
 * @return {boolean} true|false
 */
function isWechatBrowser() {
  return /micromessenger/i.test(_getUserAgent.default);
}

var _default = isWechatBrowser;
exports.default = _default;