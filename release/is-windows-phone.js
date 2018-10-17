"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

var _isWindows = _interopRequireDefault(require("./is-windows"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 windows 手机
 *
 * @return {boolean} true|false
 */
function isWindowsPhone() {
  return (0, _isWindows.default)() && /phone/i.test(_getUserAgent.default);
}

var _default = isWindowsPhone;
exports.default = _default;