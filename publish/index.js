"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function get() {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function get() {
    return _throttle.default;
  }
});

var _debounce = _interopRequireDefault(require("./debounce"));

var _throttle = _interopRequireDefault(require("./throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }