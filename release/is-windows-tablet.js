"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

var _isWindows = _interopRequireDefault(require("./is-windows"));

var _isWindowsPhone = _interopRequireDefault(require("./is-windows-phone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 windows 平板
 *
 * @return {boolean} true|false
 */
function isWindowsTablet() {
  return (0, _isWindows.default)() && (0, _isWindowsPhone.default)() && /touch/i.test(_getUserAgent.default);
}

var _default = isWindowsTablet;
exports.default = _default;