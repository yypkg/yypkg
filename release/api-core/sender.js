"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var URL_REG = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;

var Sender = function Sender(key, url, $options, $function, $history) {
  var options = JSON.parse(JSON.stringify($options));
  _typeof(url) === 'object' && (options = Object.assign(options, url));
  var _options = options,
      method = _options.method,
      isMock = _options.isMock,
      isRecordHistory = _options.isRecordHistory,
      baseURL = _options.baseURL;
  var recorder = isRecordHistory ? {} : void 0;
  var isCustomMethod = !_axios.default[method.toLowerCase()];
  !isCustomMethod && (method = method.toLowerCase());

  if (isMock && url.mock) {
    url = url.mock;
  } else if (url.real) {
    url = url.real;
  }

  url = !URL_REG.test(url) && baseURL ? "".concat(baseURL).concat(url) : url;
  options.url = url;
  options.key = key;
  return function (data) {
    if (recorder) {
      recorder.key = key;
      recorder.url = url;
      recorder.startTime = new Date().getTime();
    }

    var errorHandler = $function.error,
        customMethods = $function.methods;
    var interceptorBefore = $function['interceptor:before'];
    var interceptorAfter = $function['interceptor:after'];
    data && (options.data = data);
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(resolve, reject) {
        var errorCallback, successCallback, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = interceptorBefore;

                if (!_context3.t0) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return interceptorBefore(options);

              case 4:
                errorCallback = function errorCallback(error) {
                  if (recorder) {
                    recorder.error = JSON.parse(JSON.stringify(error));
                    recorder.responseTime = new Date().getTime();
                    recorder.responseSpendTime = recorder.responseTime - recorder.startTime;
                    $history.unshift(recorder);
                  }

                  errorHandler && errorHandler(error);
                };

                successCallback =
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(response) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.t0 = interceptorAfter;

                            if (!_context.t0) {
                              _context.next = 4;
                              break;
                            }

                            _context.next = 4;
                            return interceptorAfter(options, response);

                          case 4:
                            if (recorder) {
                              recorder.response = JSON.parse(JSON.stringify(response));
                              recorder.responseTime = new Date().getTime();
                              recorder.responseSpendTime = recorder.responseTime - recorder.startTime;
                              $history.unshift(recorder);
                            }

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function successCallback(_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                if (isCustomMethod) {
                  _context3.next = 10;
                  break;
                }

                (method !== 'jsonp' ? (0, _axios.default)(options) : _axios.default.jsonp(options.url)).then(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(response) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return successCallback(response);

                          case 2:
                            resolve(method !== 'jsonp' ? response.data : response);

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }()).catch(function (error) {
                  return errorCallback(error);
                });
                _context3.next = 26;
                break;

              case 10:
                if (!customMethods[method]) {
                  _context3.next = 25;
                  break;
                }

                _context3.prev = 11;
                _context3.next = 14;
                return customMethods[method](options);

              case 14:
                response = _context3.sent;
                _context3.next = 17;
                return successCallback(response);

              case 17:
                resolve(response);
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t1 = _context3["catch"](11);
                errorCallback(_context3.t1);

              case 23:
                _context3.next = 26;
                break;

              case 25:
                throw new Error("custom method [".concat(method, "] not found"));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[11, 20]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
};

var _default = Sender;
exports.default = _default;