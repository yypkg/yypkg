"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 Android 手机
 *
 * @return {boolean} true|false
 */
function isAndroidPhone() {
  return /android/i.test(_getUserAgent.default) && /mobile/i.test(_getUserAgent.default);
}

var _default = isAndroidPhone;
exports.default = _default;