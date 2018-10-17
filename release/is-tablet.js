"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isIPad = _interopRequireDefault(require("./is-iPad"));

var _isAndroidTablet = _interopRequireDefault(require("./is-android-tablet"));

var _isWindowsTablet = _interopRequireDefault(require("./is-windows-tablet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为平板
 *
 * @return {boolean} true|false
 */
function isTablet() {
  return (0, _isIPad.default)() || (0, _isAndroidTablet.default)() || (0, _isWindowsTablet.default)();
}

var _default = isTablet;
exports.default = _default;