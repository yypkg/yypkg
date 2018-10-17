"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为黑莓
 *
 * @return {boolean} true|false
 */
function isBlackberry() {
  return /blackberry/i.test(_getUserAgent.default) || /BB10/i.test(_getUserAgent.default);
}

var _default = isBlackberry;
exports.default = _default;