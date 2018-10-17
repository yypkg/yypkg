"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

var _getVendor = _interopRequireDefault(require("./get-vendor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前浏览器是否为safari
 *
 * @return {boolean} true|false
 */
function isSafari() {
  return /safari/i.test(_getUserAgent.default) && /apple computer/i.test(_getVendor.default);
}

var _default = isSafari;
exports.default = _default;