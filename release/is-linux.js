"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAppVersion = _interopRequireDefault(require("./get-appVersion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 linux
 *
 * @return {boolean} true|false
 */
function isLinux() {
  return /linux/i.test(_getAppVersion.default);
}

var _default = isLinux;
exports.default = _default;