"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isIPhone = _interopRequireDefault(require("./is-iPhone"));

var _isIPad = _interopRequireDefault(require("./is-iPad"));

var _isIPod = _interopRequireDefault(require("./is-iPod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前环境是否为 iOS
 *
 * @return {boolean} true|false
 */
function isiOS() {
  return (0, _isIPhone.default)() || (0, _isIPad.default)() || (0, _isIPod.default)();
}

var _default = isiOS;
exports.default = _default;