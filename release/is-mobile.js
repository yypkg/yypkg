"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isIPhone = _interopRequireDefault(require("./is-iPhone"));

var _isIPod = _interopRequireDefault(require("./is-iPod"));

var _isAndroidPhone = _interopRequireDefault(require("./is-android-phone"));

var _isBlackberry = _interopRequireDefault(require("./is-blackberry"));

var _isWindowsPhone = _interopRequireDefault(require("./is-windows-phone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为移动手机
 *
 * @return {boolean} true|false
 */
function isMobile() {
  return (0, _isIPhone.default)() || (0, _isIPod.default)() || (0, _isAndroidPhone.default)() || (0, _isBlackberry.default)() || (0, _isWindowsPhone.default)();
}

var _default = isMobile;
exports.default = _default;