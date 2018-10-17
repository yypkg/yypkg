"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getUserAgent = _interopRequireDefault(require("./get-userAgent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检测当前浏览器是否为 Edge
 *
 * @return {boolean} true|false
 */
function isEdge() {
  return /edge/i.test(_getUserAgent.default);
}

var _default = isEdge;
exports.default = _default;