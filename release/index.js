"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _debounce = _interopRequireDefault(require("./debounce"));

var _throttle = _interopRequireDefault(require("./throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  API: _api.default,
  debounce: _debounce.default,
  throttle: _throttle.default
};
exports.default = _default;