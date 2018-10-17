"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAppVersion = _interopRequireDefault(require("./get-appVersion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 windows
 *
 * @return {boolean} true|false
 */
function isWindows() {
  return /win/i.test(_getAppVersion.default);
}

var _default = isWindows;
exports.default = _default;