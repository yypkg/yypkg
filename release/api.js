"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./api-core/jsonp");

var _Sender = _interopRequireDefault(require("./api-core/Sender.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API =
/*#__PURE__*/
function () {
  function API(urls, options) {
    _classCallCheck(this, API);

    this.$options = options;
    !this.$options.method && (this.$options.method = 'POST');
    !this.$options.isMock && (this.$options.isMock = false);
    !this.$options.isRecordHistory && (this.$options.isRecordHistory = false);
    this.$function = {
      'interceptor:before': void 0,
      'interceptor:after': void 0,
      methods: {},
      error: void 0
    };
    this.$history = [];

    for (var key in urls) {
      this[key] = (0, _Sender.default)(key, urls[key], this.$options, this.$function, this.$history);
    }
  }

  _createClass(API, [{
    key: "$method",
    value: function $method(key, func) {
      this.$function.methods[key] = func;
    }
  }, {
    key: "$on",
    value: function $on(key, func) {
      this.$function[key] = func;
    }
  }]);

  return API;
}();

var _default = API;
exports.default = _default;