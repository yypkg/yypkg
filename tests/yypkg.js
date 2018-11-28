/*!
 * yypkg.min.js
 * 
 * Version: 1.5.1
 * Time: 2018-11-28 13:12
 * Document: https://github.com/yypkg/yypkg
 * (c) 2018 YY.PKG
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["YYPKG"] = factory();
	else
		root["YYPKG"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/api-core/jsonp.js":
/*!********************************!*\
  !*** ./core/api-core/jsonp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ \"./node_modules/@babel/runtime-corejs2/core-js/promise.js\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"./node_modules/axios/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * JSONP for axios\n */\nvar count = 0;\nvar encode = window.encodeURIComponent;\nvar jsonp = {\n  // 对象转URI\n  objectToURI: function objectToURI(obj) {\n    if (!obj) return '';\n    var data, key, value;\n\n    data = function () {\n      var results;\n      results = [];\n\n      for (key in obj) {\n        value = obj[key];\n        results.push(encode(key) + '=' + encode(value));\n      }\n\n      return results;\n    }();\n\n    return data.join('&');\n  },\n\n  /**\n   * 请求处理\n   *\n   * opts:\n   *  - param {String} qs parameter (`callback`)\n   *  - prefix {String} qs parameter (`jsonp`)\n   *  - name {String} qs parameter (`prefix` + incr)\n   *  - timeout {Number} (`30000`)\n   *\n   * @param {String} url\n   * @param {Object|Function} optional options / callback\n   * @param {Function} optional callback\n   */\n  getRequest: function getRequest(url, opts, fn) {\n    if (typeof opts === 'function') {\n      fn = opts;\n      opts = {};\n    }\n\n    if (!opts) opts = {};\n    var prefix = opts.prefix || 'jsonp';\n    var id = opts.name || prefix + count++;\n    var param = opts.param || 'callback';\n    var timeout = opts.timeout != null ? opts.timeout : 30000;\n    var enc = encodeURIComponent;\n    var target = document.getElementsByTagName('script')[0] || document.head;\n    var script;\n    var timer;\n\n    if (timeout) {\n      timer = setTimeout(function () {\n        cleanup();\n        if (fn) fn(new Error('请求超时'));\n      }, timeout);\n    }\n\n    function cleanup() {\n      if (script.parentNode) script.parentNode.removeChild(script);\n      window[id] = noop;\n      if (timer) clearTimeout(timer);\n    }\n\n    function cancel() {\n      if (window[id]) {\n        cleanup();\n      }\n    }\n\n    window[id] = function (data) {\n      // console.log('jsonp got', data);\n      cleanup();\n      if (fn) fn(null, data);\n    }; // add qs component\n\n\n    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);\n    url = url.replace('?&', '?'); // console.log('jsonp req \"%s\"', url);\n    // create script\n\n    script = document.createElement('script');\n    script.src = url;\n    target.parentNode.insertBefore(script, target);\n    return cancel;\n  },\n  // Promise\n  init: function init(url) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    return new _promise.default(function (resolve, reject) {\n      var data = jsonp.objectToURI(options.data);\n      var params = jsonp.objectToURI(options.params);\n      if (data) params += data;\n      if (params) url += '?' + params;\n      if (!options.timeout) options.timeout = 30000;\n      jsonp.getRequest(url, options, function (err, data) {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n};\n\nfunction noop() {}\n\n_axios.default.jsonp = jsonp.init;\n\n//# sourceURL=webpack://YYPKG/./core/api-core/jsonp.js?");

/***/ }),

/***/ "./core/api-core/sender.js":
/*!*********************************!*\
  !*** ./core/api-core/sender.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _iterator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol/iterator */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js\"));\n\nvar _symbol = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol.js\"));\n\nvar _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/regenerator */ \"./node_modules/@babel/runtime-corejs2/regenerator/index.js\"));\n\nvar _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ \"./node_modules/@babel/runtime-corejs2/core-js/promise.js\"));\n\nvar _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ \"./node_modules/@babel/runtime-corejs2/core-js/object/assign.js\"));\n\nvar _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ \"./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js\"));\n\nvar _pathToRegexp = _interopRequireDefault(__webpack_require__(/*! path-to-regexp */ \"./node_modules/path-to-regexp/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { _promise.default.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new _promise.default(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _typeof(obj) { if (typeof _symbol.default === \"function\" && typeof _iterator.default === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof _symbol.default === \"function\" && obj.constructor === _symbol.default && obj !== _symbol.default.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar URL_REG = /(http|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?/;\n\nvar ensureAbsolutePath = function ensureAbsolutePath(baseURL, url) {\n  return !URL_REG.test(url) && baseURL ? baseURL[baseURL.length - 1] === '/' && url[0] === '/' ? \"\".concat(baseURL.substr(0, baseURL.length - 1)).concat(url) : \"\".concat(baseURL).concat(url) : url;\n};\n\nvar clone = function clone(obj) {\n  return JSON.parse((0, _stringify.default)(obj));\n};\n\nvar resolveOptions = function resolveOptions(key, url, options) {\n  var isMock = options.isMock,\n      baseURL = options.baseURL,\n      method = options.method;\n\n  if (isMock && url.mock) {\n    url = url.mock;\n    options.realURL = url.url && ensureAbsolutePath(baseURL, url.url);\n  } else if (url.url) {\n    url = url.url;\n  }\n\n  options.keys && (url = _pathToRegexp.default.compile(url)(options.keys));\n  url = ensureAbsolutePath(baseURL, url);\n  options.url = url;\n  options.key = key;\n  options.method = method.toLowerCase();\n  return options;\n};\n\nvar Sender = function Sender(key, url, $options, $function, $history) {\n  var options = clone($options);\n  _typeof(url) === 'object' && (options = (0, _assign.default)(options, url));\n  var _options = options,\n      isRecordHistory = _options.isRecordHistory;\n  var recorder = isRecordHistory ? {} : void 0;\n  return function (data, _options_) {\n    var errorHandler = $function.error,\n        engines = $function.engine;\n    var beforeResolveOptions = $function['interceptor:beforeResolveOptions'];\n    var beforeRequest = $function['interceptor:beforeRequest'];\n    var beforeCallbackResponse = $function['interceptor:beforeCallbackResponse'];\n    var afterCallbackResponse = $function['interceptor:afterCallbackResponse'];\n\n    if (beforeResolveOptions) {\n      var callbackResult = beforeResolveOptions(key, url, data, _options_, options);\n      callbackResult.options && (_options_ = callbackResult.options);\n      callbackResult.data && (data = callbackResult.data);\n    }\n\n    _options_ = _options_ || {};\n    _options_.data = data || {};\n    _options_ && (options = (0, _assign.default)(options, _options_));\n    options = resolveOptions(key, url, options);\n    var _options2 = options,\n        engineKey = _options2.engine,\n        method = _options2.method;\n    var engine = engines[engineKey];\n\n    if (recorder) {\n      recorder.key = key;\n      recorder.url = url;\n      recorder.options = clone(options);\n      recorder.startTime = new Date().getTime();\n    }\n\n    return new _promise.default(\n    /*#__PURE__*/\n    function () {\n      var _ref = _asyncToGenerator(\n      /*#__PURE__*/\n      _regenerator.default.mark(function _callee5(resolve, reject) {\n        var errorCallback, successCallback, requestDiffEngines;\n        return _regenerator.default.wrap(function _callee5$(_context5) {\n          while (1) {\n            switch (_context5.prev = _context5.next) {\n              case 0:\n                _context5.t0 = beforeRequest;\n\n                if (!_context5.t0) {\n                  _context5.next = 4;\n                  break;\n                }\n\n                _context5.next = 4;\n                return beforeRequest(options);\n\n              case 4:\n                errorCallback = function errorCallback(error) {\n                  if (recorder) {\n                    recorder.error = clone(error);\n                    recorder.responseTime = new Date().getTime();\n                    recorder.responseSpendTime = recorder.responseTime - recorder.startTime;\n                    $history.unshift(recorder);\n                  }\n\n                  errorHandler && errorHandler(error, options);\n                };\n\n                successCallback =\n                /*#__PURE__*/\n                function () {\n                  var _ref2 = _asyncToGenerator(\n                  /*#__PURE__*/\n                  _regenerator.default.mark(function _callee(response) {\n                    return _regenerator.default.wrap(function _callee$(_context) {\n                      while (1) {\n                        switch (_context.prev = _context.next) {\n                          case 0:\n                            _context.t0 = beforeCallbackResponse;\n\n                            if (!_context.t0) {\n                              _context.next = 4;\n                              break;\n                            }\n\n                            _context.next = 4;\n                            return beforeCallbackResponse(options, response);\n\n                          case 4:\n                            if (recorder) {\n                              recorder.response = clone(response);\n                              recorder.responseTime = new Date().getTime();\n                              recorder.responseSpendTime = recorder.responseTime - recorder.startTime;\n                              $history.unshift(recorder);\n                            }\n\n                          case 5:\n                          case \"end\":\n                            return _context.stop();\n                        }\n                      }\n                    }, _callee, this);\n                  }));\n\n                  return function successCallback(_x3) {\n                    return _ref2.apply(this, arguments);\n                  };\n                }();\n\n                requestDiffEngines = {};\n                requestDiffEngines.default =\n                /*#__PURE__*/\n                _asyncToGenerator(\n                /*#__PURE__*/\n                _regenerator.default.mark(function _callee2() {\n                  var response;\n                  return _regenerator.default.wrap(function _callee2$(_context2) {\n                    while (1) {\n                      switch (_context2.prev = _context2.next) {\n                        case 0:\n                          _context2.prev = 0;\n                          _context2.next = 3;\n                          return engine(options);\n\n                        case 3:\n                          response = _context2.sent;\n                          _context2.next = 6;\n                          return successCallback(response);\n\n                        case 6:\n                          resolve(response);\n                          afterCallbackResponse && afterCallbackResponse(response);\n                          _context2.next = 13;\n                          break;\n\n                        case 10:\n                          _context2.prev = 10;\n                          _context2.t0 = _context2[\"catch\"](0);\n                          errorCallback(_context2.t0);\n\n                        case 13:\n                        case \"end\":\n                          return _context2.stop();\n                      }\n                    }\n                  }, _callee2, this, [[0, 10]]);\n                }));\n\n                requestDiffEngines.axios = function () {\n                  (engine[method] || engine[method.toUpperCase()])(options.url, options).then(\n                  /*#__PURE__*/\n                  function () {\n                    var _ref4 = _asyncToGenerator(\n                    /*#__PURE__*/\n                    _regenerator.default.mark(function _callee3(response) {\n                      return _regenerator.default.wrap(function _callee3$(_context3) {\n                        while (1) {\n                          switch (_context3.prev = _context3.next) {\n                            case 0:\n                              _context3.next = 2;\n                              return successCallback(response);\n\n                            case 2:\n                              resolve(response.status && response.statusText && response.headers ? response.data : response);\n                              afterCallbackResponse && afterCallbackResponse(response);\n\n                            case 4:\n                            case \"end\":\n                              return _context3.stop();\n                          }\n                        }\n                      }, _callee3, this);\n                    }));\n\n                    return function (_x4) {\n                      return _ref4.apply(this, arguments);\n                    };\n                  }()).catch(function (error) {\n                    return errorCallback(error);\n                  });\n                };\n\n                requestDiffEngines.fetch =\n                /*#__PURE__*/\n                _asyncToGenerator(\n                /*#__PURE__*/\n                _regenerator.default.mark(function _callee4() {\n                  var response;\n                  return _regenerator.default.wrap(function _callee4$(_context4) {\n                    while (1) {\n                      switch (_context4.prev = _context4.next) {\n                        case 0:\n                          _context4.prev = 0;\n                          _context4.next = 3;\n                          return engine(options.url, options);\n\n                        case 3:\n                          response = _context4.sent;\n                          _context4.next = 6;\n                          return successCallback(response);\n\n                        case 6:\n                          resolve(response);\n                          afterCallbackResponse && afterCallbackResponse(response);\n                          _context4.next = 13;\n                          break;\n\n                        case 10:\n                          _context4.prev = 10;\n                          _context4.t0 = _context4[\"catch\"](0);\n                          errorCallback(_context4.t0);\n\n                        case 13:\n                        case \"end\":\n                          return _context4.stop();\n                      }\n                    }\n                  }, _callee4, this, [[0, 10]]);\n                }));\n\n                if (engineKey) {\n                  _context5.next = 12;\n                  break;\n                }\n\n                throw new Error(\"custom engine [\".concat(engineKey, \"] not found\"));\n\n              case 12:\n                _context5.next = 14;\n                return requestDiffEngines[engineKey] ? requestDiffEngines[engineKey]() : requestDiffEngines['default']();\n\n              case 14:\n              case \"end\":\n                return _context5.stop();\n            }\n          }\n        }, _callee5, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref.apply(this, arguments);\n      };\n    }());\n  };\n};\n\nvar _default = Sender;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/api-core/sender.js?");

/***/ }),

/***/ "./core/api.js":
/*!*********************!*\
  !*** ./core/api.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _defineProperty = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ \"./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"./node_modules/axios/index.js\"));\n\n__webpack_require__(/*! ./api-core/jsonp */ \"./core/api-core/jsonp.js\");\n\nvar _sender = _interopRequireDefault(__webpack_require__(/*! ./api-core/sender.js */ \"./core/api-core/sender.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; (0, _defineProperty.default)(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar API =\n/*#__PURE__*/\nfunction () {\n  function API(urls, options, $history) {\n    _classCallCheck(this, API);\n\n    this.$options = options;\n    !this.$options.engine && (this.$options.engine = 'axios');\n    !this.$options.method && (this.$options.method = 'POST');\n    !this.$options.isMock && (this.$options.isMock = false);\n    !this.$options.isRecordHistory && (this.$options.isRecordHistory = false);\n    this.$function = {\n      'interceptor:before': void 0,\n      'interceptor:after': void 0,\n      engine: {\n        'axios': _axios.default,\n        'fetch': window.fetch\n      },\n      error: void 0\n    };\n    this.$history = $history || [];\n\n    for (var key in urls) {\n      this[key] = (0, _sender.default)(key, urls[key], this.$options, this.$function, this.$history);\n    }\n  }\n\n  _createClass(API, [{\n    key: \"$method\",\n    value: function $method(key, func) {\n      func(this.$function.engine[key]);\n    }\n  }, {\n    key: \"$engine\",\n    value: function $engine(key, func) {\n      this.$function.engine[key] = func;\n    }\n  }, {\n    key: \"$on\",\n    value: function $on(key, func) {\n      this.$function[key] = func;\n    }\n  }]);\n\n  return API;\n}();\n\nvar _default = API;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/api.js?");

/***/ }),

/***/ "./core/clone.js":
/*!***********************!*\
  !*** ./core/clone.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.cloneJSON = cloneJSON;\nexports.cloneLoop = cloneLoop;\nexports.cloneForce = cloneForce;\nexports.default = void 0;\n\nvar _weakMap = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/weak-map */ \"./node_modules/@babel/runtime-corejs2/core-js/weak-map.js\"));\n\nvar _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ \"./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js\"));\n\nvar _type = _interopRequireDefault(__webpack_require__(/*! ./type */ \"./core/type.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 深拷贝\n *\n * @param {Any} x\n * @return {Any}\n *\n * 参考：https://github.com/jsmini/clone\n */\n// Object.create(null) 的对象，没有hasOwnProperty方法\nfunction hasOwnProp(obj, key) {\n  return Object.prototype.hasOwnProperty.call(obj, key);\n} // 仅对对象和数组进行深拷贝，其他类型，直接返回\n\n\nfunction isClone(x) {\n  var t = (0, _type.default)(x);\n  return t === 'object' || t === 'array';\n} // 递归\n\n\nvar clone = function clone(x) {\n  if (!isClone(x)) return x;\n  var t = (0, _type.default)(x);\n  var res;\n\n  if (t === 'array') {\n    res = [];\n\n    for (var i = 0; i < x.length; i++) {\n      // 避免一层死循环 a.b = a\n      res[i] = x[i] === x ? res : clone(x[i]);\n    }\n  } else if (t === 'object') {\n    res = {};\n\n    for (var key in x) {\n      if (hasOwnProp(x, key)) {\n        // 避免一层死循环 a.b = a\n        res[key] = x[key] === x ? res : clone(x[key]);\n      }\n    }\n  }\n\n  return res;\n}; // 通过JSON深拷贝\n\n\nfunction cloneJSON(x) {\n  var errOrDef = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  if (!isClone(x)) return x;\n\n  try {\n    return JSON.parse((0, _stringify.default)(x));\n  } catch (e) {\n    if (errOrDef === true) {\n      throw e;\n    } else {\n      console.error('cloneJSON error: ' + e.message);\n      return errOrDef;\n    }\n  }\n} // 循环\n\n\nfunction cloneLoop(x) {\n  var t = (0, _type.default)(x);\n  var root = x;\n\n  if (t === 'array') {\n    root = [];\n  } else if (t === 'object') {\n    root = {};\n  } // 循环数组\n\n\n  var loopList = [{\n    parent: root,\n    key: undefined,\n    data: x\n  }];\n\n  while (loopList.length) {\n    // 深度优先\n    var node = loopList.pop();\n    var parent = node.parent;\n    var key = node.key;\n    var data = node.data;\n    var tt = (0, _type.default)(data); // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素\n\n    var res = parent;\n\n    if (typeof key !== 'undefined') {\n      res = parent[key] = tt === 'array' ? [] : {};\n    }\n\n    if (tt === 'array') {\n      for (var i = 0; i < data.length; i++) {\n        // 避免一层死循环 a.b = a\n        if (data[i] === data) {\n          res[i] = res;\n        } else if (isClone(data[i])) {\n          // 下一次循环\n          loopList.push({\n            parent: res,\n            key: i,\n            data: data[i]\n          });\n        } else {\n          res[i] = data[i];\n        }\n      }\n    } else if (tt === 'object') {\n      for (var k in data) {\n        if (hasOwnProp(data, k)) {\n          // 避免一层死循环 a.b = a\n          if (data[k] === data) {\n            res[k] = res;\n          } else if (isClone(data[k])) {\n            // 下一次循环\n            loopList.push({\n              parent: res,\n              key: k,\n              data: data[k]\n            });\n          } else {\n            res[k] = data[k];\n          }\n        }\n      }\n    }\n  }\n\n  return root;\n}\n\nvar UNIQUE_KEY = 'com.yanhaijing.jsmini.clone' + new Date().getTime(); // weakmap：处理对象关联引用\n\nfunction SimpleWeakmap() {\n  this.cacheArray = [];\n}\n\nSimpleWeakmap.prototype.set = function (key, value) {\n  this.cacheArray.push(key);\n  key[UNIQUE_KEY] = value;\n};\n\nSimpleWeakmap.prototype.get = function (key) {\n  return key[UNIQUE_KEY];\n};\n\nSimpleWeakmap.prototype.clear = function () {\n  for (var i = 0; i < this.cacheArray.length; i++) {\n    var key = this.cacheArray[i];\n    delete key[UNIQUE_KEY];\n  }\n\n  this.cacheArray.length = 0;\n};\n\nfunction getWeakMap() {\n  var result;\n\n  if (typeof _weakMap.default !== 'undefined' && (0, _type.default)(_weakMap.default) == 'function') {\n    result = new _weakMap.default();\n\n    if ((0, _type.default)(result) == 'weakmap') {\n      return result;\n    }\n  }\n\n  result = new SimpleWeakmap();\n  return result;\n}\n\nfunction cloneForce(x) {\n  var uniqueData = getWeakMap();\n  var t = (0, _type.default)(x);\n  var root = x;\n\n  if (t === 'array') {\n    root = [];\n  } else if (t === 'object') {\n    root = {};\n  } // 循环数组\n\n\n  var loopList = [{\n    parent: root,\n    key: undefined,\n    data: x\n  }];\n\n  while (loopList.length) {\n    // 深度优先\n    var node = loopList.pop();\n    var parent = node.parent;\n    var key = node.key;\n    var source = node.data;\n    var tt = (0, _type.default)(source); // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素\n\n    var target = parent;\n\n    if (typeof key !== 'undefined') {\n      target = parent[key] = tt === 'array' ? [] : {};\n    } // 复杂数据需要缓存操作\n\n\n    if (isClone(source)) {\n      // 命中缓存，直接返回缓存数据\n      var uniqueTarget = uniqueData.get(source);\n\n      if (uniqueTarget) {\n        parent[key] = uniqueTarget;\n        continue; // 中断本次循环\n      } // 未命中缓存，保存到缓存\n\n\n      uniqueData.set(source, target);\n    }\n\n    if (tt === 'array') {\n      for (var i = 0; i < source.length; i++) {\n        if (isClone(source[i])) {\n          // 下一次循环\n          loopList.push({\n            parent: target,\n            key: i,\n            data: source[i]\n          });\n        } else {\n          target[i] = source[i];\n        }\n      }\n    } else if (tt === 'object') {\n      for (var k in source) {\n        if (hasOwnProp(source, k)) {\n          if (k === UNIQUE_KEY) continue;\n\n          if (isClone(source[k])) {\n            // 下一次循环\n            loopList.push({\n              parent: target,\n              key: k,\n              data: source[k]\n            });\n          } else {\n            target[k] = source[k];\n          }\n        }\n      }\n    }\n  }\n\n  uniqueData.clear && uniqueData.clear();\n  return root;\n}\n\nvar _default = clone;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/clone.js?");

/***/ }),

/***/ "./core/compare-version.js":
/*!*********************************!*\
  !*** ./core/compare-version.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _iterator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol/iterator */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js\"));\n\nvar _symbol = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol.js\"));\n\nvar _parseInt2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ \"./node_modules/@babel/runtime-corejs2/core-js/parse-int.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { if (typeof _symbol.default === \"function\" && typeof _iterator.default === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof _symbol.default === \"function\" && obj.constructor === _symbol.default && obj !== _symbol.default.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/*\n * 简单对比版本号\n *\n * @param {String} a, ex: `1.2.0`\n * @param {String} b, ex: `1.1.0`\n *\n * if a > b return 1\n * if a = b return 0\n * if a < b return -1\n */\nvar compareVersion = function compareVersion(a, b) {\n  var i, length;\n\n  if (_typeof(a) + _typeof(b) !== 'stringstring') {\n    return false;\n  }\n\n  a = a.split('.');\n  b = b.split('.');\n  i = 0;\n  length = Math.max(a.length, b.length);\n\n  for (; i < length; i++) {\n    if (a[i] && !b[i] && (0, _parseInt2.default)(a[i]) > 0 || (0, _parseInt2.default)(a[i]) > (0, _parseInt2.default)(b[i])) {\n      return 1;\n    } else if (b[i] && !a[i] && (0, _parseInt2.default)(b[i]) > 0 || (0, _parseInt2.default)(a[i]) < (0, _parseInt2.default)(b[i])) {\n      return -1;\n    }\n  }\n\n  return 0;\n};\n\nvar _default = compareVersion;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/compare-version.js?");

/***/ }),

/***/ "./core/date-format.js":
/*!*****************************!*\
  !*** ./core/date-format.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 时间格式化\n *\n * @param {Date} 时间\n * @param {String} 格式模板\n * @return {String}\n *\n * 默认格式化格式 `2018-11-05 17:25:25`\n */\nvar dateFormat = function dateFormat(time) {\n  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';\n  var date = {\n    'M+': time.getMonth() + 1,\n    'D+': time.getDate(),\n    'h+': time.getHours(),\n    'm+': time.getMinutes(),\n    's+': time.getSeconds()\n  };\n\n  if (/(Y+)/.test(fmt)) {\n    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));\n  }\n\n  for (var k in date) {\n    if (new RegExp('(' + k + ')').test(fmt)) {\n      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));\n    }\n  }\n\n  return fmt;\n};\n\nvar _default = dateFormat;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/date-format.js?");

/***/ }),

/***/ "./core/debounce.js":
/*!**************************!*\
  !*** ./core/debounce.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 函数去抖\n *\n * @param {Function} func 回调函数\n * @param {Number} delay 等待 wait 毫秒之后才执行\n * @return {Function}\n */\nvar debounce = function debounce(func, delay) {\n  var last;\n  return function () {\n    var ctx = this;\n    var args = arguments;\n    clearTimeout(last);\n    last = setTimeout(function () {\n      func.apply(ctx, args);\n    }, delay);\n  };\n};\n\nvar _default = debounce;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/debounce.js?");

/***/ }),

/***/ "./core/get-absolute-url.js":
/*!**********************************!*\
  !*** ./core/get-absolute-url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 根据相对路径获取绝对路径\n *\n * @param {String} url 相对路径\n * @return {String} 绝对路径\n */\nfunction getAbsoluteUrl(url) {\n  var a = document.createElement('a');\n  a.href = url;\n  return a.href;\n}\n\nvar _default = getAbsoluteUrl;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-absolute-url.js?");

/***/ }),

/***/ "./core/get-appVersion.js":
/*!********************************!*\
  !*** ./core/get-appVersion.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 获取 app 版本\n *\n * @return {String} app 版本号\n */\nvar APP_VERSION = window.navigator.appVersion.toLowerCase() || '';\nvar _default = APP_VERSION;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-appVersion.js?");

/***/ }),

/***/ "./core/get-ie-version.js":
/*!********************************!*\
  !*** ./core/get-ie-version.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _parseFloat2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ \"./node_modules/@babel/runtime-corejs2/core-js/parse-float.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 获取IE版本\n *\n * @return {Number} IE版本号，例如 IE6 则返回 6\n */\nfunction getIEVersion() {\n  var UA = navigator.userAgent;\n  var version = -1;\n\n  if (navigator.appName === 'Microsoft Internet Explorer' && new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})').exec(UA) != null) {\n    version = (0, _parseFloat2.default)(RegExp.$1);\n  } else if (navigator.appName === 'Netscape' && new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(UA) != null) {\n    // for IE 11\n    version = (0, _parseFloat2.default)(RegExp.$1);\n  }\n\n  return version;\n}\n\nvar _default = getIEVersion;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-ie-version.js?");

/***/ }),

/***/ "./core/get-url-param.js":
/*!*******************************!*\
  !*** ./core/get-url-param.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 获取 url 中指定参数的值\n *\n * @param {String} name 需要获取的参数名\n * @param {String} url 需要被处理的 url，默认为当前 url\n * @return {String} 对应的参数值\n */\nfunction getUrlParam(name) {\n  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;\n  var paramReg = new RegExp('[\\\\?&#]' + name + '=([^&#]+)', 'gi');\n  var paramMatch = decodeURIComponent(url).match(paramReg);\n\n  if (paramMatch && paramMatch.length > 0) {\n    var paramResult = paramMatch[paramMatch.length - 1].split('=');\n\n    if (paramResult && paramResult.length > 1) {\n      return paramResult[1];\n    }\n\n    return undefined;\n  }\n\n  return undefined;\n}\n\nvar _default = getUrlParam;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-url-param.js?");

/***/ }),

/***/ "./core/get-userAgent.js":
/*!*******************************!*\
  !*** ./core/get-userAgent.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 获取 userAgent\n *\n * @return {String} userAgent\n */\nvar USER_AGENT = window.navigator.userAgent.toLowerCase() || '';\nvar _default = USER_AGENT;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-userAgent.js?");

/***/ }),

/***/ "./core/get-vendor.js":
/*!****************************!*\
  !*** ./core/get-vendor.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 获取 vendor\n *\n * @return {String} vendor\n */\nvar vendor = window.navigator.vendor && window.navigator.vendor.toLowerCase() || '';\nvar _default = vendor;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/get-vendor.js?");

/***/ }),

/***/ "./core/index.js":
/*!***********************!*\
  !*** ./core/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _api = _interopRequireDefault(__webpack_require__(/*! ./api */ \"./core/api.js\"));\n\nvar _debounce = _interopRequireDefault(__webpack_require__(/*! ./debounce */ \"./core/debounce.js\"));\n\nvar _throttle = _interopRequireDefault(__webpack_require__(/*! ./throttle */ \"./core/throttle.js\"));\n\nvar _sleep = _interopRequireDefault(__webpack_require__(/*! ./sleep */ \"./core/sleep.js\"));\n\nvar _getUrlParam = _interopRequireDefault(__webpack_require__(/*! ./get-url-param */ \"./core/get-url-param.js\"));\n\nvar _loadScript = _interopRequireDefault(__webpack_require__(/*! ./load-script */ \"./core/load-script.js\"));\n\nvar _loadStyle = _interopRequireDefault(__webpack_require__(/*! ./load-style */ \"./core/load-style.js\"));\n\nvar _getAbsoluteUrl = _interopRequireDefault(__webpack_require__(/*! ./get-absolute-url */ \"./core/get-absolute-url.js\"));\n\nvar _getAppVersion = _interopRequireDefault(__webpack_require__(/*! ./get-appVersion */ \"./core/get-appVersion.js\"));\n\nvar _getIeVersion = _interopRequireDefault(__webpack_require__(/*! ./get-ie-version */ \"./core/get-ie-version.js\"));\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nvar _getVendor = _interopRequireDefault(__webpack_require__(/*! ./get-vendor */ \"./core/get-vendor.js\"));\n\nvar _isAndroidPhone = _interopRequireDefault(__webpack_require__(/*! ./is-android-phone */ \"./core/is-android-phone.js\"));\n\nvar _isAndroidTablet = _interopRequireDefault(__webpack_require__(/*! ./is-android-tablet */ \"./core/is-android-tablet.js\"));\n\nvar _isAndroid = _interopRequireDefault(__webpack_require__(/*! ./is-android */ \"./core/is-android.js\"));\n\nvar _isBlackberry = _interopRequireDefault(__webpack_require__(/*! ./is-blackberry */ \"./core/is-blackberry.js\"));\n\nvar _isChrome = _interopRequireDefault(__webpack_require__(/*! ./is-chrome */ \"./core/is-chrome.js\"));\n\nvar _isEdge = _interopRequireDefault(__webpack_require__(/*! ./is-edge */ \"./core/is-edge.js\"));\n\nvar _isIe = _interopRequireDefault(__webpack_require__(/*! ./is-ie */ \"./core/is-ie.js\"));\n\nvar _isIOS = _interopRequireDefault(__webpack_require__(/*! ./is-iOS */ \"./core/is-iOS.js\"));\n\nvar _isIPad = _interopRequireDefault(__webpack_require__(/*! ./is-iPad */ \"./core/is-iPad.js\"));\n\nvar _isIPhone = _interopRequireDefault(__webpack_require__(/*! ./is-iPhone */ \"./core/is-iPhone.js\"));\n\nvar _isIPhoneX = _interopRequireDefault(__webpack_require__(/*! ./is-iPhoneX */ \"./core/is-iPhoneX.js\"));\n\nvar _isIPod = _interopRequireDefault(__webpack_require__(/*! ./is-iPod */ \"./core/is-iPod.js\"));\n\nvar _isMobile = _interopRequireDefault(__webpack_require__(/*! ./is-mobile */ \"./core/is-mobile.js\"));\n\nvar _isSafari = _interopRequireDefault(__webpack_require__(/*! ./is-safari */ \"./core/is-safari.js\"));\n\nvar _isTablet = _interopRequireDefault(__webpack_require__(/*! ./is-tablet */ \"./core/is-tablet.js\"));\n\nvar _isWechatBrowser = _interopRequireDefault(__webpack_require__(/*! ./is-wechat-browser */ \"./core/is-wechat-browser.js\"));\n\nvar _isWindowsPhone = _interopRequireDefault(__webpack_require__(/*! ./is-windows-phone */ \"./core/is-windows-phone.js\"));\n\nvar _isWindowsTablet = _interopRequireDefault(__webpack_require__(/*! ./is-windows-tablet */ \"./core/is-windows-tablet.js\"));\n\nvar _isWindows = _interopRequireDefault(__webpack_require__(/*! ./is-windows */ \"./core/is-windows.js\"));\n\nvar _isQqBrowser = _interopRequireDefault(__webpack_require__(/*! ./is-qq-browser */ \"./core/is-qq-browser.js\"));\n\nvar _isWeiboBrowser = _interopRequireDefault(__webpack_require__(/*! ./is-weibo-browser */ \"./core/is-weibo-browser.js\"));\n\nvar _uuid = _interopRequireDefault(__webpack_require__(/*! ./uuid */ \"./core/uuid.js\"));\n\nvar _type = _interopRequireDefault(__webpack_require__(/*! ./type */ \"./core/type.js\"));\n\nvar _clone = _interopRequireDefault(__webpack_require__(/*! ./clone */ \"./core/clone.js\"));\n\nvar _dateFormat = _interopRequireDefault(__webpack_require__(/*! ./date-format */ \"./core/date-format.js\"));\n\nvar _thousandsDot = _interopRequireDefault(__webpack_require__(/*! ./thousands-dot */ \"./core/thousands-dot.js\"));\n\nvar _trimSpace = _interopRequireDefault(__webpack_require__(/*! ./trim-space */ \"./core/trim-space.js\"));\n\nvar _isParentElement = _interopRequireDefault(__webpack_require__(/*! ./is-parent-element */ \"./core/is-parent-element.js\"));\n\nvar _randomColor = _interopRequireDefault(__webpack_require__(/*! ./random-color */ \"./core/random-color.js\"));\n\nvar _compareVersion = _interopRequireDefault(__webpack_require__(/*! ./compare-version */ \"./core/compare-version.js\"));\n\nvar _stringToDomelement = _interopRequireDefault(__webpack_require__(/*! ./string-to-domelement */ \"./core/string-to-domelement.js\"));\n\nvar _padZero = _interopRequireDefault(__webpack_require__(/*! ./pad-zero */ \"./core/pad-zero.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _default = {\n  API: _api.default,\n  debounce: _debounce.default,\n  throttle: _throttle.default,\n  sleep: _sleep.default,\n  getUrlParam: _getUrlParam.default,\n  loadScript: _loadScript.default,\n  loadStyle: _loadStyle.default,\n  getAbsoluteUrl: _getAbsoluteUrl.default,\n  getAppVersion: _getAppVersion.default,\n  getIEVersion: _getIeVersion.default,\n  getUserAgent: _getUserAgent.default,\n  getVendor: _getVendor.default,\n  isAndroidPhone: _isAndroidPhone.default,\n  isAndroidTablet: _isAndroidTablet.default,\n  isAndroid: _isAndroid.default,\n  isBlackberry: _isBlackberry.default,\n  isChrome: _isChrome.default,\n  isEdge: _isEdge.default,\n  isIE: _isIe.default,\n  isiOS: _isIOS.default,\n  isiPad: _isIPad.default,\n  isiPhone: _isIPhone.default,\n  isiPhoneX: _isIPhoneX.default,\n  isiPod: _isIPod.default,\n  isMobile: _isMobile.default,\n  isSafari: _isSafari.default,\n  isTablet: _isTablet.default,\n  isWechatBrowser: _isWechatBrowser.default,\n  isWindowsPhone: _isWindowsPhone.default,\n  isWindowsTablet: _isWindowsTablet.default,\n  isWindows: _isWindows.default,\n  isQQBrowser: _isQqBrowser.default,\n  isWeiboBrowser: _isWeiboBrowser.default,\n  uuid: _uuid.default,\n  type: _type.default,\n  clone: _clone.default,\n  dateFormat: _dateFormat.default,\n  thousandsDot: _thousandsDot.default,\n  trimSpace: _trimSpace.default,\n  isParentElement: _isParentElement.default,\n  randomColor: _randomColor.default,\n  compareVersion: _compareVersion.default,\n  stringToDOMElement: _stringToDomelement.default,\n  padZero: _padZero.default\n};\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/index.js?");

/***/ }),

/***/ "./core/is-android-phone.js":
/*!**********************************!*\
  !*** ./core/is-android-phone.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 Android 手机\n *\n * @return {Boolean} true|false\n */\nfunction isAndroidPhone() {\n  return /android/i.test(_getUserAgent.default) && /mobile/i.test(_getUserAgent.default);\n}\n\nvar _default = isAndroidPhone;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-android-phone.js?");

/***/ }),

/***/ "./core/is-android-tablet.js":
/*!***********************************!*\
  !*** ./core/is-android-tablet.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 Android 平板\n *\n * @return {Boolean} true|false\n */\nfunction isAndroidTablet() {\n  return /android/i.test(_getUserAgent.default) && !/mobile/i.test(_getUserAgent.default);\n}\n\nvar _default = isAndroidTablet;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-android-tablet.js?");

/***/ }),

/***/ "./core/is-android.js":
/*!****************************!*\
  !*** ./core/is-android.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 Android\n *\n * @return {Boolean} true|false\n */\nfunction isAndroid() {\n  return /android/i.test(_getUserAgent.default);\n}\n\nvar _default = isAndroid;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-android.js?");

/***/ }),

/***/ "./core/is-blackberry.js":
/*!*******************************!*\
  !*** ./core/is-blackberry.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为黑莓\n *\n * @return {Boolean} true|false\n */\nfunction isBlackberry() {\n  return /blackberry/i.test(_getUserAgent.default) || /BB10/i.test(_getUserAgent.default);\n}\n\nvar _default = isBlackberry;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-blackberry.js?");

/***/ }),

/***/ "./core/is-chrome.js":
/*!***************************!*\
  !*** ./core/is-chrome.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nvar _getVendor = _interopRequireDefault(__webpack_require__(/*! ./get-vendor */ \"./core/get-vendor.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前浏览器是否为 Chrome\n *\n * @return {Boolean} true|false\n */\nfunction isChrome() {\n  return /chrome|chromium|gecko/i.test(_getUserAgent.default) && /google inc/.test(_getVendor.default);\n}\n\nvar _default = isChrome;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-chrome.js?");

/***/ }),

/***/ "./core/is-edge.js":
/*!*************************!*\
  !*** ./core/is-edge.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前浏览器是否为 Edge\n *\n * @return {Boolean} true|false\n */\nfunction isEdge() {\n  return /edge/i.test(_getUserAgent.default);\n}\n\nvar _default = isEdge;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-edge.js?");

/***/ }),

/***/ "./core/is-iOS.js":
/*!************************!*\
  !*** ./core/is-iOS.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _isIPhone = _interopRequireDefault(__webpack_require__(/*! ./is-iPhone */ \"./core/is-iPhone.js\"));\n\nvar _isIPad = _interopRequireDefault(__webpack_require__(/*! ./is-iPad */ \"./core/is-iPad.js\"));\n\nvar _isIPod = _interopRequireDefault(__webpack_require__(/*! ./is-iPod */ \"./core/is-iPod.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 iOS\n *\n * @return {Boolean} true|false\n */\nfunction isiOS() {\n  return (0, _isIPhone.default)() || (0, _isIPad.default)() || (0, _isIPod.default)();\n}\n\nvar _default = isiOS;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-iOS.js?");

/***/ }),

/***/ "./core/is-iPad.js":
/*!*************************!*\
  !*** ./core/is-iPad.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 iPad\n *\n * @return {Boolean} true|false\n */\nfunction isiPad() {\n  return /ipad/i.test(_getUserAgent.default);\n}\n\nvar _default = isiPad;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-iPad.js?");

/***/ }),

/***/ "./core/is-iPhone.js":
/*!***************************!*\
  !*** ./core/is-iPhone.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 iPhone\n *\n * @return {Boolean} true|false\n */\nfunction isiPhone() {\n  return /iphone/i.test(_getUserAgent.default);\n}\n\nvar _default = isiPhone;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-iPhone.js?");

/***/ }),

/***/ "./core/is-iPhoneX.js":
/*!****************************!*\
  !*** ./core/is-iPhoneX.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 检测当前环境是否为 iPhoneX / iPhoneXS / iPhoneXS Max / iPhoneXR\n *\n * @return {Boolean} true|false\n */\nvar isiPhone = __webpack_require__(/*! ./is-iPhone */ \"./core/is-iPhone.js\");\n\nfunction isiPhoneX() {\n  var _window$screen = window.screen,\n      width = _window$screen.width,\n      height = _window$screen.height;\n  return isiPhone() && (width === 375 && height === 812 || width === 414 && height === 896);\n}\n\nvar _default = isiPhoneX;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-iPhoneX.js?");

/***/ }),

/***/ "./core/is-iPod.js":
/*!*************************!*\
  !*** ./core/is-iPod.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为iPod\n *\n * @return {Boolean} true|false\n */\nfunction isiPod() {\n  return /ipod/i.test(_getUserAgent.default);\n}\n\nvar _default = isiPod;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-iPod.js?");

/***/ }),

/***/ "./core/is-ie.js":
/*!***********************!*\
  !*** ./core/is-ie.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前浏览器是否为IE\n * edge 也属于IE\n *\n * @param {Number} version 版本号\n * @return {Boolean} true|false\n */\nfunction isIE(version) {\n  if (!version) {\n    return /msie/i.test(_getUserAgent.default) || 'ActiveXObject' in window;\n  }\n\n  if (version >= 11) {\n    return 'ActiveXObject' in window;\n  }\n\n  return new RegExp('msie ' + version).test(_getUserAgent.default);\n}\n\nvar _default = isIE;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-ie.js?");

/***/ }),

/***/ "./core/is-mobile.js":
/*!***************************!*\
  !*** ./core/is-mobile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _isIPhone = _interopRequireDefault(__webpack_require__(/*! ./is-iPhone */ \"./core/is-iPhone.js\"));\n\nvar _isIPod = _interopRequireDefault(__webpack_require__(/*! ./is-iPod */ \"./core/is-iPod.js\"));\n\nvar _isAndroidPhone = _interopRequireDefault(__webpack_require__(/*! ./is-android-phone */ \"./core/is-android-phone.js\"));\n\nvar _isBlackberry = _interopRequireDefault(__webpack_require__(/*! ./is-blackberry */ \"./core/is-blackberry.js\"));\n\nvar _isWindowsPhone = _interopRequireDefault(__webpack_require__(/*! ./is-windows-phone */ \"./core/is-windows-phone.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为移动手机\n *\n * @return {Boolean} true|false\n */\nfunction isMobile() {\n  return (0, _isIPhone.default)() || (0, _isIPod.default)() || (0, _isAndroidPhone.default)() || (0, _isBlackberry.default)() || (0, _isWindowsPhone.default)();\n}\n\nvar _default = isMobile;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-mobile.js?");

/***/ }),

/***/ "./core/is-parent-element.js":
/*!***********************************!*\
  !*** ./core/is-parent-element.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 判断某个 DOM 元素是否为另一元素的父元素\n *\n * @param {DOMElement} parent\n * @param {DOMElement} child\n * @return {Boolean}\n */\nvar isParentElement = function isParentElement(parent, child) {\n  var node = child.parentNode;\n\n  while (node != null) {\n    if (node === parent) {\n      return true;\n    }\n\n    node = node.parentNode;\n  }\n\n  return false;\n};\n\nvar _default = isParentElement;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-parent-element.js?");

/***/ }),

/***/ "./core/is-qq-browser.js":
/*!*******************************!*\
  !*** ./core/is-qq-browser.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测是否在 QQ 浏览器中\n *\n * @return {Boolean} true|false\n */\nfunction isQQBrowser() {\n  return /QQ/i.test(_getUserAgent.default);\n}\n\nvar _default = isQQBrowser;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-qq-browser.js?");

/***/ }),

/***/ "./core/is-safari.js":
/*!***************************!*\
  !*** ./core/is-safari.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nvar _getVendor = _interopRequireDefault(__webpack_require__(/*! ./get-vendor */ \"./core/get-vendor.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前浏览器是否为safari\n *\n * @return {Boolean} true|false\n */\nfunction isSafari() {\n  return /safari/i.test(_getUserAgent.default) && /apple computer/i.test(_getVendor.default);\n}\n\nvar _default = isSafari;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-safari.js?");

/***/ }),

/***/ "./core/is-tablet.js":
/*!***************************!*\
  !*** ./core/is-tablet.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _isIPad = _interopRequireDefault(__webpack_require__(/*! ./is-iPad */ \"./core/is-iPad.js\"));\n\nvar _isAndroidTablet = _interopRequireDefault(__webpack_require__(/*! ./is-android-tablet */ \"./core/is-android-tablet.js\"));\n\nvar _isWindowsTablet = _interopRequireDefault(__webpack_require__(/*! ./is-windows-tablet */ \"./core/is-windows-tablet.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为平板\n *\n * @return {Boolean} true|false\n */\nfunction isTablet() {\n  return (0, _isIPad.default)() || (0, _isAndroidTablet.default)() || (0, _isWindowsTablet.default)();\n}\n\nvar _default = isTablet;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-tablet.js?");

/***/ }),

/***/ "./core/is-wechat-browser.js":
/*!***********************************!*\
  !*** ./core/is-wechat-browser.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测是否在微信浏览器中\n *\n * @return {Boolean} true|false\n */\nfunction isWechatBrowser() {\n  return /micromessenger/i.test(_getUserAgent.default);\n}\n\nvar _default = isWechatBrowser;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-wechat-browser.js?");

/***/ }),

/***/ "./core/is-weibo-browser.js":
/*!**********************************!*\
  !*** ./core/is-weibo-browser.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测是否在 Weibo 浏览器中\n *\n * @return {Boolean} true|false\n */\nfunction isWeiboBrowser() {\n  return /WeiBo/i.test(_getUserAgent.default);\n}\n\nvar _default = isWeiboBrowser;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-weibo-browser.js?");

/***/ }),

/***/ "./core/is-windows-phone.js":
/*!**********************************!*\
  !*** ./core/is-windows-phone.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nvar _isWindows = _interopRequireDefault(__webpack_require__(/*! ./is-windows */ \"./core/is-windows.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 windows 手机\n *\n * @return {Boolean} true|false\n */\nfunction isWindowsPhone() {\n  return (0, _isWindows.default)() && /phone/i.test(_getUserAgent.default);\n}\n\nvar _default = isWindowsPhone;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-windows-phone.js?");

/***/ }),

/***/ "./core/is-windows-tablet.js":
/*!***********************************!*\
  !*** ./core/is-windows-tablet.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getUserAgent = _interopRequireDefault(__webpack_require__(/*! ./get-userAgent */ \"./core/get-userAgent.js\"));\n\nvar _isWindows = _interopRequireDefault(__webpack_require__(/*! ./is-windows */ \"./core/is-windows.js\"));\n\nvar _isWindowsPhone = _interopRequireDefault(__webpack_require__(/*! ./is-windows-phone */ \"./core/is-windows-phone.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 windows 平板\n *\n * @return {Boolean} true|false\n */\nfunction isWindowsTablet() {\n  return (0, _isWindows.default)() && (0, _isWindowsPhone.default)() && /touch/i.test(_getUserAgent.default);\n}\n\nvar _default = isWindowsTablet;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-windows-tablet.js?");

/***/ }),

/***/ "./core/is-windows.js":
/*!****************************!*\
  !*** ./core/is-windows.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _getAppVersion = _interopRequireDefault(__webpack_require__(/*! ./get-appVersion */ \"./core/get-appVersion.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 检测当前环境是否为 windows\n *\n * @return {Boolean} true|false\n */\nfunction isWindows() {\n  return /win/i.test(_getAppVersion.default);\n}\n\nvar _default = isWindows;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/is-windows.js?");

/***/ }),

/***/ "./core/load-script.js":
/*!*****************************!*\
  !*** ./core/load-script.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ \"./node_modules/@babel/runtime-corejs2/core-js/promise.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 动态加载脚本\n *\n * @param {String} url\n * @return {Promise}\n */\nvar loadScript = function loadScript(url) {\n  return new _promise.default(function (resolve, reject) {\n    var script = document.createElement('script');\n    script.src = url;\n    script.onload = resolve;\n    script.onerror = reject;\n    window.document.head.appendChild(script);\n  });\n};\n\nvar _default = loadScript;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/load-script.js?");

/***/ }),

/***/ "./core/load-style.js":
/*!****************************!*\
  !*** ./core/load-style.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ \"./node_modules/@babel/runtime-corejs2/core-js/promise.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 动态加载样式\n *\n * @param {String} url\n * @return {Promise}\n */\nvar loadStyle = function loadStyle(url) {\n  return new _promise.default(function (resolve, reject) {\n    var link = document.createElement('link');\n    link.rel = 'stylesheet';\n    link.type = 'text/css';\n    link.href = url;\n    link.onload = resolve;\n    link.onerror = reject;\n    window.document.head.appendChild(link);\n  });\n};\n\nvar _default = loadStyle;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/load-style.js?");

/***/ }),

/***/ "./core/pad-zero.js":
/*!**************************!*\
  !*** ./core/pad-zero.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 前缀补充零位\n *\n * @param {Number} num\n * @param {Number} n\n * @return {String}\n *\n * ex: padZero(6, '3') // '006'\n */\nfunction padZero(num, n) {\n  var length = num.toString().length;\n\n  while (length < n) {\n    num = '0' + num;\n    length++;\n  }\n\n  return num;\n}\n\nvar _default = padZero;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/pad-zero.js?");

/***/ }),

/***/ "./core/random-color.js":
/*!******************************!*\
  !*** ./core/random-color.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 生成随机颜色\n *\n * @return {String}\n */\nvar randomColor = function randomColor() {\n  return Math.floor(Math.random() * (2 << 23)).toString(16);\n};\n\nvar _default = randomColor;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/random-color.js?");

/***/ }),

/***/ "./core/sleep.js":
/*!***********************!*\
  !*** ./core/sleep.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ \"./node_modules/@babel/runtime-corejs2/core-js/promise.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * 睡眠指定时间\n *\n * @return {Promise}\n */\nvar sleep = function sleep(delay) {\n  return new _promise.default(function (resolve) {\n    return setTimeout(resolve, delay);\n  });\n};\n\nvar _default = sleep;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/sleep.js?");

/***/ }),

/***/ "./core/string-to-domelement.js":
/*!**************************************!*\
  !*** ./core/string-to-domelement.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 原生字符串转为 DOM 元素\n *\n * @param {String}\n * @return {DOMElement}\n */\nvar stringToDOMElement = function stringToDOMElement(string) {\n  var frame = document.createElement('iframe');\n  frame.style.display = 'none';\n  document.body.appendChild(frame);\n  frame.contentDocument.open();\n  frame.contentDocument.write(string);\n  frame.contentDocument.close();\n  var element = frame.contentDocument.body.firstChild;\n  document.body.removeChild(frame);\n  return element;\n};\n\nvar _default = stringToDOMElement;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/string-to-domelement.js?");

/***/ }),

/***/ "./core/thousands-dot.js":
/*!*******************************!*\
  !*** ./core/thousands-dot.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 千分位逗号\n *\n * @param {Number} 数字\n * @return {String}\n *\n * 例如转为 1,234,567,890\n */\nvar thousandsDot = function thousandsDot(number) {\n  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n};\n\nvar _default = thousandsDot;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/thousands-dot.js?");

/***/ }),

/***/ "./core/throttle.js":
/*!**************************!*\
  !*** ./core/throttle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 函数节流\n *\n * @param {Function} func 回调函数\n * @param {Number} time 每隔多长时间执行一次\n * @return {Function}\n */\nvar throttle = function throttle(func, time) {\n  var context, args, timeout, result;\n  var previous = 0;\n\n  var later = function later() {\n    previous = new Date();\n    timeout = null;\n    result = func.apply(context, args);\n  };\n\n  return function () {\n    var now = new Date();\n    var remaining = time - (now - previous);\n    context = this;\n    args = arguments;\n\n    if (remaining <= 0) {\n      clearTimeout(timeout);\n      timeout = null;\n      previous = now;\n      result = func.apply(context, args);\n    } else if (!timeout) {\n      timeout = setTimeout(later, remaining);\n    }\n\n    return result;\n  };\n};\n\nvar _default = throttle;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/throttle.js?");

/***/ }),

/***/ "./core/trim-space.js":
/*!****************************!*\
  !*** ./core/trim-space.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 裁剪所有空格\n *\n * @param {String} str\n * @return {String}\n */\nvar trimSpace = function trimSpace(str) {\n  return str.replace(/(^\\s+)|(\\s+)/g, '');\n};\n\nvar _default = trimSpace;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/trim-space.js?");

/***/ }),

/***/ "./core/type.js":
/*!**********************!*\
  !*** ./core/type.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _iterator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol/iterator */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js\"));\n\nvar _symbol = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol */ \"./node_modules/@babel/runtime-corejs2/core-js/symbol.js\"));\n\nvar _getPrototypeOf = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-prototype-of */ \"./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { if (typeof _symbol.default === \"function\" && typeof _iterator.default === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof _symbol.default === \"function\" && obj.constructor === _symbol.default && obj !== _symbol.default.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/**\n * 类型检测库，弥补typeof的问题\n *\n * @param {Any} x\n * @param {Boolean} strict 是否严格模式\n * @return {String} number / array / function / ...\n *\n * 参考：https://github.com/jsmini/type\n */\nvar toString = Object.prototype.toString;\n\nvar type = function type(x) {\n  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  strict = !!strict; // fix typeof null = object\n\n  if (x === null) {\n    return 'null';\n  }\n\n  var t = _typeof(x); // number string boolean undefined symbol\n\n\n  if (t !== 'object') {\n    return t;\n  }\n\n  var cls;\n  var clsLow;\n\n  try {\n    cls = toString.call(x).slice(8, -1);\n    clsLow = cls.toLowerCase();\n  } catch (e) {\n    // ie下的 activex对象\n    return 'object';\n  }\n\n  if (clsLow !== 'object') {\n    // 区分 String() 和 new String()\n    if (strict && (clsLow === 'number' || clsLow === 'boolean' || clsLow === 'string')) {\n      return cls;\n    }\n\n    return clsLow;\n  }\n\n  if (x.constructor == Object) {\n    return clsLow;\n  } // Object.create(null)\n\n\n  try {\n    // __proto__ 部分早期firefox浏览器\n    if ((0, _getPrototypeOf.default)(x) === null || x.__proto__ === null) {\n      return 'object';\n    }\n  } catch (e) {} // ie下无Object.getPrototypeOf会报错\n  // function A() {}; new A\n\n\n  try {\n    var cname = x.constructor.name;\n\n    if (typeof cname === 'string') {\n      return cname;\n    }\n  } catch (e) {} // 无constructor\n  // function A() {}; A.prototype.constructor = null; new A\n\n\n  return 'unknown';\n};\n\nvar _default = type;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/type.js?");

/***/ }),

/***/ "./core/uuid.js":
/*!**********************!*\
  !*** ./core/uuid.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * 生成唯一标识号\n *\n * @param {Number} length 长度\n * @return {String} uuid\n *\n * 参考：https://github.com/harmankang/Lab62\n */\nvar uuid = function uuid() {\n  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;\n  var delegate = {\n    b62char: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',\n    b62string: ''\n  };\n\n  for (var i = 0; i < length; i++) {\n    var index = Math.floor(Math.random() * 62);\n    delegate.b62string += delegate.b62char[index];\n  }\n\n  return delegate.b62string;\n};\n\nvar _default = uuid;\nexports.default = _default;\n\n//# sourceURL=webpack://YYPKG/./core/uuid.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ \"./node_modules/core-js/library/fn/json/stringify.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ \"./node_modules/core-js/library/fn/object/assign.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/object/assign.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ \"./node_modules/core-js/library/fn/object/define-property.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ \"./node_modules/core-js/library/fn/object/get-prototype-of.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-float.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/parse-float */ \"./node_modules/core-js/library/fn/parse-float.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/parse-float.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/parse-int */ \"./node_modules/core-js/library/fn/parse-int.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/parse-int.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/promise.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/promise */ \"./node_modules/core-js/library/fn/promise.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/promise.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ \"./node_modules/core-js/library/fn/symbol/index.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/symbol.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ \"./node_modules/core-js/library/fn/symbol/iterator.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/weak-map.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/weak-map.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! core-js/library/fn/weak-map */ \"./node_modules/core-js/library/fn/weak-map.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/core-js/weak-map.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/regenerator/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/regenerator/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! regenerator-runtime */ \"./node_modules/regenerator-runtime/runtime-module.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/@babel/runtime-corejs2/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\n\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\n\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\n\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\n\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nvar btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false; // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n\n    if (\"development\" !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n\n      request.onprogress = function handleProgress() {};\n\n      request.ontimeout = function handleTimeout() {};\n    } // HTTP basic authentication\n\n\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true); // Set the request timeout in MS\n\n    request.timeout = config.timeout; // Listen for ready state\n\n    request[loadEvent] = function handleLoad() {\n      if (!request || request.readyState !== 4 && !xDomain) {\n        return;\n      } // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n\n\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      } // Prepare the response\n\n\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n      settle(resolve, reject, response); // Clean up request\n\n      request = null;\n    }; // Handle low level network errors\n\n\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request)); // Clean up request\n\n      request = null;\n    }; // Handle timeout\n\n\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request)); // Clean up request\n\n      request = null;\n    }; // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n\n\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\"); // Add xsrf header\n\n\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    } // Add headers to the request\n\n\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    } // Add withCredentials to request if needed\n\n\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    } // Add responseType to request if needed\n\n\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    } // Handle progress if needed\n\n\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    } // Not all browsers support upload events\n\n\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel); // Clean up request\n\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    } // Send the request\n\n\n    request.send(requestData);\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\n\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\n\n\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance\n\n  utils.extend(instance, Axios.prototype, context); // Copy context to instance\n\n  utils.extend(instance, context);\n  return instance;\n} // Create the default instance to be exported\n\n\nvar axios = createInstance(defaults); // Expose Axios class to allow class inheritance\n\naxios.Axios = Axios; // Factory for creating new instances\n\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n}; // Expose Cancel & CancelToken\n\n\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\"); // Expose all/spread\n\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\n\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\nmodule.exports = axios; // Allow use of default import syntax in TypeScript\n\nmodule.exports.default = axios;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\n\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\nmodule.exports = Cancel;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\n\n\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\n\n\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\n\n\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\n\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\n\n\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\n\n\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {\n    method: 'get'\n  }, this.defaults, config);\n  config.method = config.method.toLowerCase(); // Hook up interceptors middleware\n\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n}; // Provide aliases for supported request methods\n\n\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\nmodule.exports = Axios;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\n\n\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\n\n\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\n\n\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\n\n\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\n\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\n\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\n\n\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\n\n\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config); // Support baseURL config\n\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  } // Ensure headers exist\n\n\n  config.headers = config.headers || {}; // Transform request data\n\n  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers\n\n  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});\n  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {\n    delete config.headers[method];\n  });\n  var adapter = config.adapter || defaults.adapter;\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config); // Transform response data\n\n    response.data = transformData(response.data, response.headers, config.transformResponse);\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config); // Transform response data\n\n      if (reason && reason.response) {\n        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\n\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\n\n\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus; // Note: status is not exposed by XDomainRequest\n\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));\n  }\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\n\n\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n  return data;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n\n    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {\n      return data;\n    }\n\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n\n    return data;\n  }],\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) {\n        /* Ignore */\n      }\n    }\n\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n  maxContentLength: -1,\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\nmodule.exports = defaults;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n\n    return fn.apply(thisArg, args);\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\n\nE.prototype = new Error();\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n\n  for ( // initialize result and counter\n  var block, charCode, idx = 0, map = chars; // if the next str index does not exist:\n  //   change the mapping table to \"=\"\n  //   check if d has no fractional digits\n  str.charAt(idx | 0) || (map = '=', idx % 1); // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n\n    block = block << 8 | charCode;\n  }\n\n  return output;\n}\n\nmodule.exports = btoa;\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');\n}\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\n\n\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\n\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '') : baseURL;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie\nfunction standardBrowserEnv() {\n  return {\n    write: function write(name, value, expires, path, domain, secure) {\n      var cookie = [];\n      cookie.push(name + '=' + encodeURIComponent(value));\n\n      if (utils.isNumber(expires)) {\n        cookie.push('expires=' + new Date(expires).toGMTString());\n      }\n\n      if (utils.isString(path)) {\n        cookie.push('path=' + path);\n      }\n\n      if (utils.isString(domain)) {\n        cookie.push('domain=' + domain);\n      }\n\n      if (secure === true) {\n        cookie.push('secure');\n      }\n\n      document.cookie = cookie.join('; ');\n    },\n    read: function read(name) {\n      var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n      return match ? decodeURIComponent(match[3]) : null;\n    },\n    remove: function remove(name) {\n      this.write(name, '', Date.now() - 86400000);\n    }\n  };\n}() : // Non standard browser env (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return {\n    write: function write() {},\n    read: function read() {\n      return null;\n    },\n    remove: function remove() {}\n  };\n}();\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\n\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test\n// whether the request URL is of the same origin as current location.\nfunction standardBrowserEnv() {\n  var msie = /(msie|trident)/i.test(navigator.userAgent);\n  var urlParsingNode = document.createElement('a');\n  var originURL;\n  /**\n  * Parse a URL to discover it's components\n  *\n  * @param {String} url The URL to be parsed\n  * @returns {Object}\n  */\n\n  function resolveURL(url) {\n    var href = url;\n\n    if (msie) {\n      // IE needs attribute set twice to normalize properties\n      urlParsingNode.setAttribute('href', href);\n      href = urlParsingNode.href;\n    }\n\n    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n\n    return {\n      href: urlParsingNode.href,\n      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n      host: urlParsingNode.host,\n      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n      hostname: urlParsingNode.hostname,\n      port: urlParsingNode.port,\n      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname\n    };\n  }\n\n  originURL = resolveURL(window.location.href);\n  /**\n  * Determine if a URL shares the same origin as the current location\n  *\n  * @param {String} requestURL The URL to test\n  * @returns {boolean} True if URL shares the same origin, otherwise false\n  */\n\n  return function isURLSameOrigin(requestURL) {\n    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;\n    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;\n  };\n}() : // Non standard browser envs (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return function isURLSameOrigin() {\n    return true;\n  };\n}();\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\"); // Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\n\n\nvar ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\n\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) {\n    return parsed;\n  }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n  return parsed;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\n\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n/*global toString:true*/\n// utils is a library of generic helper functions non-specific to axios\n\n\nvar toString = Object.prototype.toString;\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\n\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\n\n\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\n\n\nfunction isFormData(val) {\n  return typeof FormData !== 'undefined' && val instanceof FormData;\n}\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\n\n\nfunction isArrayBufferView(val) {\n  var result;\n\n  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = val && val.buffer && val.buffer instanceof ArrayBuffer;\n  }\n\n  return result;\n}\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\n\n\nfunction isString(val) {\n  return typeof val === 'string';\n}\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\n\n\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\n\n\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\n\n\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\n\n\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\n\n\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\n\n\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\n\n\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\n\n\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\n\n\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\n\n\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\n\n\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n\n  return typeof window !== 'undefined' && typeof document !== 'undefined';\n}\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\n\n\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  } // Force an array if not already something iterable\n\n\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\n\n\nfunction merge()\n/* obj1, obj2, obj3, ... */\n{\n  var result = {};\n\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n\n  return result;\n}\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\n\n\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/json/stringify.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/fn/json/stringify.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar $JSON = core.JSON || (core.JSON = {\n  stringify: JSON.stringify\n});\n\nmodule.exports = function stringify(it) {\n  // eslint-disable-line no-unused-vars\n  return $JSON.stringify.apply($JSON, arguments);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/json/stringify.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.assign */ \"./node_modules/core-js/library/modules/es6.object.assign.js\");\n\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object.assign;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/object/assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.define-property */ \"./node_modules/core-js/library/modules/es6.object.define-property.js\");\n\nvar $Object = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object;\n\nmodule.exports = function defineProperty(it, key, desc) {\n  return $Object.defineProperty(it, key, desc);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ \"./node_modules/core-js/library/modules/es6.object.get-prototype-of.js\");\n\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object.getPrototypeOf;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/parse-float.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/parse-float.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../modules/es6.parse-float */ \"./node_modules/core-js/library/modules/es6.parse-float.js\");\n\nmodule.exports = __webpack_require__(/*! ../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").parseFloat;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/parse-float.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/parse-int.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/fn/parse-int.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../modules/es6.parse-int */ \"./node_modules/core-js/library/modules/es6.parse-int.js\");\n\nmodule.exports = __webpack_require__(/*! ../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").parseInt;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/parse-int.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/library/fn/promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../modules/es6.object.to-string */ \"./node_modules/core-js/library/modules/es6.object.to-string.js\");\n\n__webpack_require__(/*! ../modules/es6.string.iterator */ \"./node_modules/core-js/library/modules/es6.string.iterator.js\");\n\n__webpack_require__(/*! ../modules/web.dom.iterable */ \"./node_modules/core-js/library/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! ../modules/es6.promise */ \"./node_modules/core-js/library/modules/es6.promise.js\");\n\n__webpack_require__(/*! ../modules/es7.promise.finally */ \"./node_modules/core-js/library/modules/es7.promise.finally.js\");\n\n__webpack_require__(/*! ../modules/es7.promise.try */ \"./node_modules/core-js/library/modules/es7.promise.try.js\");\n\nmodule.exports = __webpack_require__(/*! ../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Promise;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/promise.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.symbol */ \"./node_modules/core-js/library/modules/es6.symbol.js\");\n\n__webpack_require__(/*! ../../modules/es6.object.to-string */ \"./node_modules/core-js/library/modules/es6.object.to-string.js\");\n\n__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ \"./node_modules/core-js/library/modules/es7.symbol.async-iterator.js\");\n\n__webpack_require__(/*! ../../modules/es7.symbol.observable */ \"./node_modules/core-js/library/modules/es7.symbol.observable.js\");\n\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Symbol;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.string.iterator */ \"./node_modules/core-js/library/modules/es6.string.iterator.js\");\n\n__webpack_require__(/*! ../../modules/web.dom.iterable */ \"./node_modules/core-js/library/modules/web.dom.iterable.js\");\n\nmodule.exports = __webpack_require__(/*! ../../modules/_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\").f('iterator');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/weak-map.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/library/fn/weak-map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../modules/es6.object.to-string */ \"./node_modules/core-js/library/modules/es6.object.to-string.js\");\n\n__webpack_require__(/*! ../modules/web.dom.iterable */ \"./node_modules/core-js/library/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! ../modules/es6.weak-map */ \"./node_modules/core-js/library/modules/es6.weak-map.js\");\n\n__webpack_require__(/*! ../modules/es7.weak-map.of */ \"./node_modules/core-js/library/modules/es7.weak-map.of.js\");\n\n__webpack_require__(/*! ../modules/es7.weak-map.from */ \"./node_modules/core-js/library/modules/es7.weak-map.from.js\");\n\nmodule.exports = __webpack_require__(/*! ../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").WeakMap;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/fn/weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_a-function.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n  /* empty */\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-instance.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it, Constructor, name, forbiddenField) {\n  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {\n    throw TypeError(name + ': incorrect invocation!');\n  }\n\n  return it;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_an-instance.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// false -> Array#indexOf\n// true  -> Array#includes\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/library/modules/_to-length.js\");\n\nvar toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ \"./node_modules/core-js/library/modules/_to-absolute-index.js\");\n\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value; // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++]; // eslint-disable-next-line no-self-compare\n\n      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not\n    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    }\n    return !IS_INCLUDES && -1;\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-methods.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-methods.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 0 -> Array#forEach\n// 1 -> Array#map\n// 2 -> Array#filter\n// 3 -> Array#some\n// 4 -> Array#every\n// 5 -> Array#find\n// 6 -> Array#findIndex\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/library/modules/_iobject.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/library/modules/_to-length.js\");\n\nvar asc = __webpack_require__(/*! ./_array-species-create */ \"./node_modules/core-js/library/modules/_array-species-create.js\");\n\nmodule.exports = function (TYPE, $create) {\n  var IS_MAP = TYPE == 1;\n  var IS_FILTER = TYPE == 2;\n  var IS_SOME = TYPE == 3;\n  var IS_EVERY = TYPE == 4;\n  var IS_FIND_INDEX = TYPE == 6;\n  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;\n  var create = $create || asc;\n  return function ($this, callbackfn, that) {\n    var O = toObject($this);\n    var self = IObject(O);\n    var f = ctx(callbackfn, that, 3);\n    var length = toLength(self.length);\n    var index = 0;\n    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;\n    var val, res;\n\n    for (; length > index; index++) if (NO_HOLES || index in self) {\n      val = self[index];\n      res = f(val, index, O);\n\n      if (TYPE) {\n        if (IS_MAP) result[index] = res; // map\n        else if (res) switch (TYPE) {\n            case 3:\n              return true;\n            // some\n\n            case 5:\n              return val;\n            // find\n\n            case 6:\n              return index;\n            // findIndex\n\n            case 2:\n              result.push(val);\n            // filter\n          } else if (IS_EVERY) return false; // every\n      }\n    }\n\n    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_array-methods.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-species-constructor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-species-constructor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/library/modules/_is-array.js\");\n\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('species');\n\nmodule.exports = function (original) {\n  var C;\n\n  if (isArray(original)) {\n    C = original.constructor; // cross-realm fallback\n\n    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;\n\n    if (isObject(C)) {\n      C = C[SPECIES];\n      if (C === null) C = undefined;\n    }\n  }\n\n  return C === undefined ? Array : C;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_array-species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-species-create.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-species-create.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 9.4.2.3 ArraySpeciesCreate(originalArray, length)\nvar speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ \"./node_modules/core-js/library/modules/_array-species-constructor.js\");\n\nmodule.exports = function (original, length) {\n  return new (speciesConstructor(original))(length);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_array-species-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// getting tag from 19.1.3.6 Object.prototype.toString()\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\");\n\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag'); // ES3 wrong here\n\n\nvar ARG = cof(function () {\n  return arguments;\n}()) == 'Arguments'; // fallback for IE11 Script Access Denied error\n\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (e) {\n    /* empty */\n  }\n};\n\nmodule.exports = function (it) {\n  var O, T, B;\n  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case\n  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case\n  : ARG ? cof(O) // ES3 arguments fallback\n  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_classof.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_cof.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_collection-weak.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_collection-weak.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar redefineAll = __webpack_require__(/*! ./_redefine-all */ \"./node_modules/core-js/library/modules/_redefine-all.js\");\n\nvar getWeak = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/library/modules/_meta.js\").getWeak;\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar anInstance = __webpack_require__(/*! ./_an-instance */ \"./node_modules/core-js/library/modules/_an-instance.js\");\n\nvar forOf = __webpack_require__(/*! ./_for-of */ \"./node_modules/core-js/library/modules/_for-of.js\");\n\nvar createArrayMethod = __webpack_require__(/*! ./_array-methods */ \"./node_modules/core-js/library/modules/_array-methods.js\");\n\nvar $has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar validate = __webpack_require__(/*! ./_validate-collection */ \"./node_modules/core-js/library/modules/_validate-collection.js\");\n\nvar arrayFind = createArrayMethod(5);\nvar arrayFindIndex = createArrayMethod(6);\nvar id = 0; // fallback for uncaught frozen keys\n\nvar uncaughtFrozenStore = function (that) {\n  return that._l || (that._l = new UncaughtFrozenStore());\n};\n\nvar UncaughtFrozenStore = function () {\n  this.a = [];\n};\n\nvar findUncaughtFrozen = function (store, key) {\n  return arrayFind(store.a, function (it) {\n    return it[0] === key;\n  });\n};\n\nUncaughtFrozenStore.prototype = {\n  get: function (key) {\n    var entry = findUncaughtFrozen(this, key);\n    if (entry) return entry[1];\n  },\n  has: function (key) {\n    return !!findUncaughtFrozen(this, key);\n  },\n  set: function (key, value) {\n    var entry = findUncaughtFrozen(this, key);\n    if (entry) entry[1] = value;else this.a.push([key, value]);\n  },\n  'delete': function (key) {\n    var index = arrayFindIndex(this.a, function (it) {\n      return it[0] === key;\n    });\n    if (~index) this.a.splice(index, 1);\n    return !!~index;\n  }\n};\nmodule.exports = {\n  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {\n    var C = wrapper(function (that, iterable) {\n      anInstance(that, C, NAME, '_i');\n      that._t = NAME; // collection type\n\n      that._i = id++; // collection id\n\n      that._l = undefined; // leak store for uncaught frozen objects\n\n      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);\n    });\n    redefineAll(C.prototype, {\n      // 23.3.3.2 WeakMap.prototype.delete(key)\n      // 23.4.3.3 WeakSet.prototype.delete(value)\n      'delete': function (key) {\n        if (!isObject(key)) return false;\n        var data = getWeak(key);\n        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);\n        return data && $has(data, this._i) && delete data[this._i];\n      },\n      // 23.3.3.4 WeakMap.prototype.has(key)\n      // 23.4.3.4 WeakSet.prototype.has(value)\n      has: function has(key) {\n        if (!isObject(key)) return false;\n        var data = getWeak(key);\n        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);\n        return data && $has(data, this._i);\n      }\n    });\n    return C;\n  },\n  def: function (that, key, value) {\n    var data = getWeak(anObject(key), true);\n    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;\n    return that;\n  },\n  ufstore: uncaughtFrozenStore\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_collection-weak.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_collection.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_collection.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar meta = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/library/modules/_meta.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\nvar redefineAll = __webpack_require__(/*! ./_redefine-all */ \"./node_modules/core-js/library/modules/_redefine-all.js\");\n\nvar forOf = __webpack_require__(/*! ./_for-of */ \"./node_modules/core-js/library/modules/_for-of.js\");\n\nvar anInstance = __webpack_require__(/*! ./_an-instance */ \"./node_modules/core-js/library/modules/_an-instance.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\n\nvar dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\n\nvar each = __webpack_require__(/*! ./_array-methods */ \"./node_modules/core-js/library/modules/_array-methods.js\")(0);\n\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\");\n\nmodule.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {\n  var Base = global[NAME];\n  var C = Base;\n  var ADDER = IS_MAP ? 'set' : 'add';\n  var proto = C && C.prototype;\n  var O = {};\n\n  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {\n    new C().entries().next();\n  }))) {\n    // create collection constructor\n    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);\n    redefineAll(C.prototype, methods);\n    meta.NEED = true;\n  } else {\n    C = wrapper(function (target, iterable) {\n      anInstance(target, C, NAME, '_c');\n      target._c = new Base();\n      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);\n    });\n    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {\n      var IS_ADDER = KEY == 'add' || KEY == 'set';\n      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {\n        anInstance(this, C, KEY);\n        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;\n\n        var result = this._c[KEY](a === 0 ? 0 : a, b);\n\n        return IS_ADDER ? this : result;\n      });\n    });\n    IS_WEAK || dP(C.prototype, 'size', {\n      get: function () {\n        return this._c.size;\n      }\n    });\n  }\n\n  setToStringTag(C, NAME);\n  O[NAME] = C;\n  $export($export.G + $export.W + $export.F, O);\n  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);\n  return C;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_collection.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = {\n  version: '2.5.7'\n};\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_core.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\n\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n\n  switch (length) {\n    case 1:\n      return function (a) {\n        return fn.call(that, a);\n      };\n\n    case 2:\n      return function (a, b) {\n        return fn.call(that, a, b);\n      };\n\n    case 3:\n      return function (a, b, c) {\n        return fn.call(that, a, b, c);\n      };\n  }\n\n  return function ()\n  /* ...args */\n  {\n    return fn.apply(that, arguments);\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_ctx.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.2.1 RequireObjectCoercible(argument)\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on  \" + it);\n  return it;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_defined.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', {\n    get: function () {\n      return 7;\n    }\n  }).a != 7;\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").document; // typeof document.createElement is 'object' in old IE\n\n\nvar is = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_dom-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE 8- don't enum bug keys\nmodule.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// all enumerable object keys, includes symbols\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\n\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\");\n\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\n\nmodule.exports = function (it) {\n  var result = getKeys(it);\n  var getSymbols = gOPS.f;\n\n  if (getSymbols) {\n    var symbols = getSymbols(it);\n    var isEnum = pIE.f;\n    var i = 0;\n    var key;\n\n    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_enum-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var IS_WRAP = type & $export.W;\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE];\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];\n  var key, own, out;\n  if (IS_GLOBAL) source = name;\n\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    if (own && has(exports, key)) continue; // export native or passed\n\n    out = own ? target[key] : source[key]; // prevent global pollution for namespaces\n\n    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context\n    : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library\n    : IS_WRAP && target[key] == out ? function (C) {\n      var F = function (a, b, c) {\n        if (this instanceof C) {\n          switch (arguments.length) {\n            case 0:\n              return new C();\n\n            case 1:\n              return new C(a);\n\n            case 2:\n              return new C(a, b);\n          }\n\n          return new C(a, b, c);\n        }\n\n        return C.apply(this, arguments);\n      };\n\n      F[PROTOTYPE] = C[PROTOTYPE];\n      return F; // make static versions for prototype methods\n    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%\n\n    if (IS_PROTO) {\n      (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%\n\n      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);\n    }\n  }\n}; // type bitmap\n\n\n$export.F = 1; // forced\n\n$export.G = 2; // global\n\n$export.S = 4; // static\n\n$export.P = 8; // proto\n\n$export.B = 16; // bind\n\n$export.W = 32; // wrap\n\n$export.U = 64; // safe\n\n$export.R = 128; // real proto method for `library`\n\nmodule.exports = $export;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_export.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_fails.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_for-of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar call = __webpack_require__(/*! ./_iter-call */ \"./node_modules/core-js/library/modules/_iter-call.js\");\n\nvar isArrayIter = __webpack_require__(/*! ./_is-array-iter */ \"./node_modules/core-js/library/modules/_is-array-iter.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/library/modules/_to-length.js\");\n\nvar getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ \"./node_modules/core-js/library/modules/core.get-iterator-method.js\");\n\nvar BREAK = {};\nvar RETURN = {};\n\nvar exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {\n  var iterFn = ITERATOR ? function () {\n    return iterable;\n  } : getIterFn(iterable);\n  var f = ctx(fn, that, entries ? 2 : 1);\n  var index = 0;\n  var length, step, iterator, result;\n  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator\n\n  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {\n    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);\n    if (result === BREAK || result === RETURN) return result;\n  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {\n    result = call(iterator, f, step.value, entries);\n    if (result === BREAK || result === RETURN) return result;\n  }\n};\n\nexports.BREAK = BREAK;\nexports.RETURN = RETURN;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_for-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func\n: Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_global.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\n\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_has.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_hide.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").document;\n\nmodule.exports = document && document.documentElement;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_html.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\")('div'), 'a', {\n    get: function () {\n      return 7;\n    }\n  }).a != 7;\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_invoke.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_invoke.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// fast apply, http://jsperf.lnkit.com/fast-apply/5\nmodule.exports = function (fn, args, that) {\n  var un = that === undefined;\n\n  switch (args.length) {\n    case 0:\n      return un ? fn() : fn.call(that);\n\n    case 1:\n      return un ? fn(args[0]) : fn.call(that, args[0]);\n\n    case 2:\n      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);\n\n    case 3:\n      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);\n\n    case 4:\n      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);\n  }\n\n  return fn.apply(that, args);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_invoke.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\"); // eslint-disable-next-line no-prototype-builtins\n\n\nmodule.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {\n  return cof(it) == 'String' ? it.split('') : Object(it);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// check on default Array iterator\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\n\nvar ArrayProto = Array.prototype;\n\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_is-array-iter.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.2 IsArray(argument)\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\");\n\nmodule.exports = Array.isArray || function isArray(arg) {\n  return cof(arg) == 'Array';\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_is-array.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// call something on iterator step with safe closing on error\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nmodule.exports = function (iterator, fn, value, entries) {\n  try {\n    return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)\n  } catch (e) {\n    var ret = iterator['return'];\n    if (ret !== undefined) anObject(ret.call(iterator));\n    throw e;\n  }\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iter-call.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/library/modules/_object-create.js\");\n\nvar descriptor = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\n\nvar IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\n\n__webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\")(IteratorPrototype, __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator'), function () {\n  return this;\n});\n\nmodule.exports = function (Constructor, NAME, next) {\n  Constructor.prototype = create(IteratorPrototype, {\n    next: descriptor(1, next)\n  });\n  setToStringTag(Constructor, NAME + ' Iterator');\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iter-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/library/modules/_redefine.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\n\nvar $iterCreate = __webpack_require__(/*! ./_iter-create */ \"./node_modules/core-js/library/modules/_iter-create.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\n\nvar getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/library/modules/_object-gpo.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\n\nvar BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`\n\nvar FF_ITERATOR = '@@iterator';\nvar KEYS = 'keys';\nvar VALUES = 'values';\n\nvar returnThis = function () {\n  return this;\n};\n\nmodule.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {\n  $iterCreate(Constructor, NAME, next);\n\n  var getMethod = function (kind) {\n    if (!BUGGY && kind in proto) return proto[kind];\n\n    switch (kind) {\n      case KEYS:\n        return function keys() {\n          return new Constructor(this, kind);\n        };\n\n      case VALUES:\n        return function values() {\n          return new Constructor(this, kind);\n        };\n    }\n\n    return function entries() {\n      return new Constructor(this, kind);\n    };\n  };\n\n  var TAG = NAME + ' Iterator';\n  var DEF_VALUES = DEFAULT == VALUES;\n  var VALUES_BUG = false;\n  var proto = Base.prototype;\n  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];\n  var $default = $native || getMethod(DEFAULT);\n  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;\n  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;\n  var methods, key, IteratorPrototype; // Fix native\n\n  if ($anyNative) {\n    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));\n\n    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {\n      // Set @@toStringTag to native iterators\n      setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines\n\n      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);\n    }\n  } // fix Array#{values, @@iterator}.name in V8 / FF\n\n\n  if (DEF_VALUES && $native && $native.name !== VALUES) {\n    VALUES_BUG = true;\n\n    $default = function values() {\n      return $native.call(this);\n    };\n  } // Define iterator\n\n\n  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {\n    hide(proto, ITERATOR, $default);\n  } // Plug for library\n\n\n  Iterators[NAME] = $default;\n  Iterators[TAG] = returnThis;\n\n  if (DEFAULT) {\n    methods = {\n      values: DEF_VALUES ? $default : getMethod(VALUES),\n      keys: IS_SET ? $default : getMethod(KEYS),\n      entries: $entries\n    };\n    if (FORCED) for (key in methods) {\n      if (!(key in proto)) redefine(proto, key, methods[key]);\n    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);\n  }\n\n  return methods;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iter-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\n\nvar SAFE_CLOSING = false;\n\ntry {\n  var riter = [7][ITERATOR]();\n\n  riter['return'] = function () {\n    SAFE_CLOSING = true;\n  }; // eslint-disable-next-line no-throw-literal\n\n\n  Array.from(riter, function () {\n    throw 2;\n  });\n} catch (e) {\n  /* empty */\n}\n\nmodule.exports = function (exec, skipClosing) {\n  if (!skipClosing && !SAFE_CLOSING) return false;\n  var safe = false;\n\n  try {\n    var arr = [7];\n    var iter = arr[ITERATOR]();\n\n    iter.next = function () {\n      return {\n        done: safe = true\n      };\n    };\n\n    arr[ITERATOR] = function () {\n      return iter;\n    };\n\n    exec(arr);\n  } catch (e) {\n    /* empty */\n  }\n\n  return safe;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iter-detect.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (done, value) {\n  return {\n    value: value,\n    done: !!done\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iter-step.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = true;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_library.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var META = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\")('meta');\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar setDesc = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\n\nvar id = 0;\n\nvar isExtensible = Object.isExtensible || function () {\n  return true;\n};\n\nvar FREEZE = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return isExtensible(Object.preventExtensions({}));\n});\n\nvar setMeta = function (it) {\n  setDesc(it, META, {\n    value: {\n      i: 'O' + ++id,\n      // object ID\n      w: {} // weak collections IDs\n\n    }\n  });\n};\n\nvar fastKey = function (it, create) {\n  // return primitive with prefix\n  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;\n\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return 'F'; // not necessary to add metadata\n\n    if (!create) return 'E'; // add missing metadata\n\n    setMeta(it); // return object ID\n  }\n\n  return it[META].i;\n};\n\nvar getWeak = function (it, create) {\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return true; // not necessary to add metadata\n\n    if (!create) return false; // add missing metadata\n\n    setMeta(it); // return hash weak collections IDs\n  }\n\n  return it[META].w;\n}; // add metadata on freeze-family methods calling\n\n\nvar onFreeze = function (it) {\n  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);\n  return it;\n};\n\nvar meta = module.exports = {\n  KEY: META,\n  NEED: false,\n  fastKey: fastKey,\n  getWeak: getWeak,\n  onFreeze: onFreeze\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_meta.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_microtask.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_microtask.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar macrotask = __webpack_require__(/*! ./_task */ \"./node_modules/core-js/library/modules/_task.js\").set;\n\nvar Observer = global.MutationObserver || global.WebKitMutationObserver;\nvar process = global.process;\nvar Promise = global.Promise;\nvar isNode = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\")(process) == 'process';\n\nmodule.exports = function () {\n  var head, last, notify;\n\n  var flush = function () {\n    var parent, fn;\n    if (isNode && (parent = process.domain)) parent.exit();\n\n    while (head) {\n      fn = head.fn;\n      head = head.next;\n\n      try {\n        fn();\n      } catch (e) {\n        if (head) notify();else last = undefined;\n        throw e;\n      }\n    }\n\n    last = undefined;\n    if (parent) parent.enter();\n  }; // Node.js\n\n\n  if (isNode) {\n    notify = function () {\n      process.nextTick(flush);\n    }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339\n\n  } else if (Observer && !(global.navigator && global.navigator.standalone)) {\n    var toggle = true;\n    var node = document.createTextNode('');\n    new Observer(flush).observe(node, {\n      characterData: true\n    }); // eslint-disable-line no-new\n\n    notify = function () {\n      node.data = toggle = !toggle;\n    }; // environments with maybe non-completely correct, but existent Promise\n\n  } else if (Promise && Promise.resolve) {\n    // Promise.resolve without an argument throws an error in LG WebOS 2\n    var promise = Promise.resolve(undefined);\n\n    notify = function () {\n      promise.then(flush);\n    }; // for other environments - macrotask based on:\n    // - setImmediate\n    // - MessageChannel\n    // - window.postMessag\n    // - onreadystatechange\n    // - setTimeout\n\n  } else {\n    notify = function () {\n      // strange IE + webpack dev server bug - use .call(global)\n      macrotask.call(global, flush);\n    };\n  }\n\n  return function (fn) {\n    var task = {\n      fn: fn,\n      next: undefined\n    };\n    if (last) last.next = task;\n\n    if (!head) {\n      head = task;\n      notify();\n    }\n\n    last = task;\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_microtask.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_new-promise-capability.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // 25.4.1.5 NewPromiseCapability(C)\n\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\n\nfunction PromiseCapability(C) {\n  var resolve, reject;\n  this.promise = new C(function ($$resolve, $$reject) {\n    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');\n    resolve = $$resolve;\n    reject = $$reject;\n  });\n  this.resolve = aFunction(resolve);\n  this.reject = aFunction(reject);\n}\n\nmodule.exports.f = function (C) {\n  return new PromiseCapability(C);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_new-promise-capability.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // 19.1.2.1 Object.assign(target, source, ...)\n\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\n\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\");\n\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\n\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/library/modules/_iobject.js\");\n\nvar $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)\n\nmodule.exports = !$assign || __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  var A = {};\n  var B = {}; // eslint-disable-next-line no-undef\n\n  var S = Symbol();\n  var K = 'abcdefghijklmnopqrst';\n  A[S] = 7;\n  K.split('').forEach(function (k) {\n    B[k] = k;\n  });\n  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;\n}) ? function assign(target, source) {\n  // eslint-disable-line no-unused-vars\n  var T = toObject(target);\n  var aLen = arguments.length;\n  var index = 1;\n  var getSymbols = gOPS.f;\n  var isEnum = pIE.f;\n\n  while (aLen > index) {\n    var S = IObject(arguments[index++]);\n    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);\n    var length = keys.length;\n    var j = 0;\n    var key;\n\n    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];\n  }\n\n  return T;\n} : $assign;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar dPs = __webpack_require__(/*! ./_object-dps */ \"./node_modules/core-js/library/modules/_object-dps.js\");\n\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\");\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\n\nvar Empty = function () {\n  /* empty */\n};\n\nvar PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype\n\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = __webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\")('iframe');\n\n  var i = enumBugKeys.length;\n  var lt = '<';\n  var gt = '>';\n  var iframeDocument;\n  iframe.style.display = 'none';\n\n  __webpack_require__(/*! ./_html */ \"./node_modules/core-js/library/modules/_html.js\").appendChild(iframe);\n\n  iframe.src = 'javascript:'; // eslint-disable-line no-script-url\n  // createDict = iframe.contentWindow.Object;\n  // html.removeChild(iframe);\n\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n\n  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];\n\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null; // add \"__proto__\" for Object.getPrototypeOf polyfill\n\n    result[IE_PROTO] = O;\n  } else result = createDict();\n\n  return Properties === undefined ? result : dPs(result, Properties);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/library/modules/_ie8-dom-define.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\n\nvar dP = Object.defineProperty;\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) {\n    /* empty */\n  }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-dp.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = getKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var P;\n\n  while (length > i) dP.f(O, P = keys[i++], Properties[P]);\n\n  return O;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-dps.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/library/modules/_ie8-dom-define.js\");\n\nvar gOPD = Object.getOwnPropertyDescriptor;\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? gOPD : function getOwnPropertyDescriptor(O, P) {\n  O = toIObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return gOPD(O, P);\n  } catch (e) {\n    /* empty */\n  }\n  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-gopd.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\nvar gOPN = __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/library/modules/_object-gopn.js\").f;\n\nvar toString = {}.toString;\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return gOPN(it);\n  } catch (e) {\n    return windowNames.slice();\n  }\n};\n\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-gopn-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/library/modules/_object-keys-internal.js\");\n\nvar hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\").concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return $keys(O, hiddenKeys);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-gopn.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-gops.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\n\nvar ObjectProto = Object.prototype;\n\nmodule.exports = Object.getPrototypeOf || function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  }\n\n  return O instanceof Object ? ObjectProto : null;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-gpo.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\nvar arrayIndexOf = __webpack_require__(/*! ./_array-includes */ \"./node_modules/core-js/library/modules/_array-includes.js\")(false);\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\n\nmodule.exports = function (object, names) {\n  var O = toIObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n\n  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys\n\n\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/library/modules/_object-keys-internal.js\");\n\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\");\n\nmodule.exports = Object.keys || function keys(O) {\n  return $keys(O, enumBugKeys);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = {}.propertyIsEnumerable;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-pie.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// most Object methods by ES6 should accept primitives\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\n\nmodule.exports = function (KEY, exec) {\n  var fn = (core.Object || {})[KEY] || Object[KEY];\n  var exp = {};\n  exp[KEY] = exec(fn);\n  $export($export.S + $export.F * fails(function () {\n    fn(1);\n  }), 'Object', exp);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_object-sap.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_parse-float.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_parse-float.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $parseFloat = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").parseFloat;\n\nvar $trim = __webpack_require__(/*! ./_string-trim */ \"./node_modules/core-js/library/modules/_string-trim.js\").trim;\n\nmodule.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ \"./node_modules/core-js/library/modules/_string-ws.js\") + '-0') !== -Infinity ? function parseFloat(str) {\n  var string = $trim(String(str), 3);\n  var result = $parseFloat(string);\n  return result === 0 && string.charAt(0) == '-' ? -0 : result;\n} : $parseFloat;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_parse-float.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_parse-int.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_parse-int.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $parseInt = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").parseInt;\n\nvar $trim = __webpack_require__(/*! ./_string-trim */ \"./node_modules/core-js/library/modules/_string-trim.js\").trim;\n\nvar ws = __webpack_require__(/*! ./_string-ws */ \"./node_modules/core-js/library/modules/_string-ws.js\");\n\nvar hex = /^[-+]?0[xX]/;\nmodule.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {\n  var string = $trim(String(str), 3);\n  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));\n} : $parseInt;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_parse-int.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_perform.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_perform.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return {\n      e: false,\n      v: exec()\n    };\n  } catch (e) {\n    return {\n      e: true,\n      v: e\n    };\n  }\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_perform.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_promise-resolve.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_promise-resolve.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ \"./node_modules/core-js/library/modules/_new-promise-capability.js\");\n\nmodule.exports = function (C, x) {\n  anObject(C);\n  if (isObject(x) && x.constructor === C) return x;\n  var promiseCapability = newPromiseCapability.f(C);\n  var resolve = promiseCapability.resolve;\n  resolve(x);\n  return promiseCapability.promise;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_promise-resolve.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_property-desc.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine-all.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\nmodule.exports = function (target, src, safe) {\n  for (var key in src) {\n    if (safe && target[key]) target[key] = src[key];else hide(target, key, src[key]);\n  }\n\n  return target;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_redefine-all.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-collection-from.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-collection-from.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // https://tc39.github.io/proposal-setmap-offrom/\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\n\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar forOf = __webpack_require__(/*! ./_for-of */ \"./node_modules/core-js/library/modules/_for-of.js\");\n\nmodule.exports = function (COLLECTION) {\n  $export($export.S, COLLECTION, {\n    from: function from(source\n    /* , mapFn, thisArg */\n    ) {\n      var mapFn = arguments[1];\n      var mapping, A, n, cb;\n      aFunction(this);\n      mapping = mapFn !== undefined;\n      if (mapping) aFunction(mapFn);\n      if (source == undefined) return new this();\n      A = [];\n\n      if (mapping) {\n        n = 0;\n        cb = ctx(mapFn, arguments[2], 2);\n        forOf(source, false, function (nextItem) {\n          A.push(cb(nextItem, n++));\n        });\n      } else {\n        forOf(source, false, A.push, A);\n      }\n\n      return new this(A);\n    }\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_set-collection-from.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-collection-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-collection-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // https://tc39.github.io/proposal-setmap-offrom/\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nmodule.exports = function (COLLECTION) {\n  $export($export.S, COLLECTION, {\n    of: function of() {\n      var length = arguments.length;\n      var A = new Array(length);\n\n      while (length--) A[length] = arguments[length];\n\n      return new this(A);\n    }\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_set-collection-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-species.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\n\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\");\n\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('species');\n\nmodule.exports = function (KEY) {\n  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];\n  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {\n    configurable: true,\n    get: function () {\n      return this;\n    }\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_set-species.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var def = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag');\n\nmodule.exports = function (it, tag, stat) {\n  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {\n    configurable: true,\n    value: tag\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\")('keys');\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\n\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || (global[SHARED] = {});\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: core.version,\n  mode: __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\") ? 'pure' : 'global',\n  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_shared.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_species-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_species-constructor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.3.20 SpeciesConstructor(O, defaultConstructor)\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\n\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('species');\n\nmodule.exports = function (O, D) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\"); // true  -> String#at\n// false -> String#codePointAt\n\n\nmodule.exports = function (TO_STRING) {\n  return function (that, pos) {\n    var s = String(defined(that));\n    var i = toInteger(pos);\n    var l = s.length;\n    var a, b;\n    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;\n    a = s.charCodeAt(i);\n    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;\n  };\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_string-at.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-trim.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-trim.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\n\nvar spaces = __webpack_require__(/*! ./_string-ws */ \"./node_modules/core-js/library/modules/_string-ws.js\");\n\nvar space = '[' + spaces + ']';\nvar non = '\\u200b\\u0085';\nvar ltrim = RegExp('^' + space + space + '*');\nvar rtrim = RegExp(space + space + '*$');\n\nvar exporter = function (KEY, exec, ALIAS) {\n  var exp = {};\n  var FORCE = fails(function () {\n    return !!spaces[KEY]() || non[KEY]() != non;\n  });\n  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];\n  if (ALIAS) exp[ALIAS] = fn;\n  $export($export.P + $export.F * FORCE, 'String', exp);\n}; // 1 -> String#trimLeft\n// 2 -> String#trimRight\n// 3 -> String#trim\n\n\nvar trim = exporter.trim = function (string, TYPE) {\n  string = String(defined(string));\n  if (TYPE & 1) string = string.replace(ltrim, '');\n  if (TYPE & 2) string = string.replace(rtrim, '');\n  return string;\n};\n\nmodule.exports = exporter;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_string-trim.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-ws.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-ws.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = '\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003' + '\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF';\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_string-ws.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_task.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_task.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar invoke = __webpack_require__(/*! ./_invoke */ \"./node_modules/core-js/library/modules/_invoke.js\");\n\nvar html = __webpack_require__(/*! ./_html */ \"./node_modules/core-js/library/modules/_html.js\");\n\nvar cel = __webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar process = global.process;\nvar setTask = global.setImmediate;\nvar clearTask = global.clearImmediate;\nvar MessageChannel = global.MessageChannel;\nvar Dispatch = global.Dispatch;\nvar counter = 0;\nvar queue = {};\nvar ONREADYSTATECHANGE = 'onreadystatechange';\nvar defer, channel, port;\n\nvar run = function () {\n  var id = +this; // eslint-disable-next-line no-prototype-builtins\n\n  if (queue.hasOwnProperty(id)) {\n    var fn = queue[id];\n    delete queue[id];\n    fn();\n  }\n};\n\nvar listener = function (event) {\n  run.call(event.data);\n}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:\n\n\nif (!setTask || !clearTask) {\n  setTask = function setImmediate(fn) {\n    var args = [];\n    var i = 1;\n\n    while (arguments.length > i) args.push(arguments[i++]);\n\n    queue[++counter] = function () {\n      // eslint-disable-next-line no-new-func\n      invoke(typeof fn == 'function' ? fn : Function(fn), args);\n    };\n\n    defer(counter);\n    return counter;\n  };\n\n  clearTask = function clearImmediate(id) {\n    delete queue[id];\n  }; // Node.js 0.8-\n\n\n  if (__webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\")(process) == 'process') {\n    defer = function (id) {\n      process.nextTick(ctx(run, id, 1));\n    }; // Sphere (JS game engine) Dispatch API\n\n  } else if (Dispatch && Dispatch.now) {\n    defer = function (id) {\n      Dispatch.now(ctx(run, id, 1));\n    }; // Browsers with MessageChannel, includes WebWorkers\n\n  } else if (MessageChannel) {\n    channel = new MessageChannel();\n    port = channel.port2;\n    channel.port1.onmessage = listener;\n    defer = ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers\n    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'\n  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {\n    defer = function (id) {\n      global.postMessage(id + '', '*');\n    };\n\n    global.addEventListener('message', listener, false); // IE8-\n  } else if (ONREADYSTATECHANGE in cel('script')) {\n    defer = function (id) {\n      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {\n        html.removeChild(this);\n        run.call(id);\n      };\n    }; // Rest old browsers\n\n  } else {\n    defer = function (id) {\n      setTimeout(ctx(run, id, 1), 0);\n    };\n  }\n}\n\nmodule.exports = {\n  set: setTask,\n  clear: clearTask\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_task.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\nmodule.exports = function (index, length) {\n  index = toInteger(index);\n  return index < 0 ? max(index + length, 0) : min(index, length);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.1.4 ToInteger\nvar ceil = Math.ceil;\nvar floor = Math.floor;\n\nmodule.exports = function (it) {\n  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// to indexed object, toObject with fallback for non-array-like ES3 strings\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/library/modules/_iobject.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\n\nmodule.exports = function (it) {\n  return IObject(defined(it));\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.15 ToLength\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\n\nvar min = Math.min;\n\nmodule.exports = function (it) {\n  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.13 ToObject(argument)\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\n\nmodule.exports = function (it) {\n  return Object(defined(it));\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\"); // instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\n\n\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar px = Math.random();\n\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_uid.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_user-agent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar navigator = global.navigator;\nmodule.exports = navigator && navigator.userAgent || '';\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_validate-collection.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_validate-collection.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nmodule.exports = function (it, TYPE) {\n  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');\n  return it;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_validate-collection.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\");\n\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\");\n\nvar defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\n\nmodule.exports = function (name) {\n  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});\n  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {\n    value: wksExt.f(name)\n  });\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_wks-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.f = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\");\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_wks-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\")('wks');\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\n\nvar Symbol = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").Symbol;\n\nvar USE_SYMBOL = typeof Symbol == 'function';\n\nvar $exports = module.exports = function (name) {\n  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n$exports.store = store;\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/_wks.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/library/modules/_classof.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\n\nmodule.exports = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\").getIteratorMethod = function (it) {\n  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/core.get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/library/modules/_add-to-unscopables.js\");\n\nvar step = __webpack_require__(/*! ./_iter-step */ \"./node_modules/core-js/library/modules/_iter-step.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\"); // 22.1.3.4 Array.prototype.entries()\n// 22.1.3.13 Array.prototype.keys()\n// 22.1.3.29 Array.prototype.values()\n// 22.1.3.30 Array.prototype[@@iterator]()\n\n\nmodule.exports = __webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/library/modules/_iter-define.js\")(Array, 'Array', function (iterated, kind) {\n  this._t = toIObject(iterated); // target\n\n  this._i = 0; // next index\n\n  this._k = kind; // kind\n  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var kind = this._k;\n  var index = this._i++;\n\n  if (!O || index >= O.length) {\n    this._t = undefined;\n    return step(1);\n  }\n\n  if (kind == 'keys') return step(0, index);\n  if (kind == 'values') return step(0, O[index]);\n  return step(0, [index, O[index]]);\n}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)\n\nIterators.Arguments = Iterators.Array;\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.3.1 Object.assign(target, source)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\n$export($export.S + $export.F, 'Object', {\n  assign: __webpack_require__(/*! ./_object-assign */ \"./node_modules/core-js/library/modules/_object-assign.js\")\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.object.assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\"); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)\n\n\n$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\"), 'Object', {\n  defineProperty: __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.object.define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 Object.getPrototypeOf(O)\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\n\nvar $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/library/modules/_object-gpo.js\");\n\n__webpack_require__(/*! ./_object-sap */ \"./node_modules/core-js/library/modules/_object-sap.js\")('getPrototypeOf', function () {\n  return function getPrototypeOf(it) {\n    return $getPrototypeOf(toObject(it));\n  };\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.object.get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.parse-float.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.parse-float.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar $parseFloat = __webpack_require__(/*! ./_parse-float */ \"./node_modules/core-js/library/modules/_parse-float.js\"); // 18.2.4 parseFloat(string)\n\n\n$export($export.G + $export.F * (parseFloat != $parseFloat), {\n  parseFloat: $parseFloat\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.parse-float.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.parse-int.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.parse-int.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar $parseInt = __webpack_require__(/*! ./_parse-int */ \"./node_modules/core-js/library/modules/_parse-int.js\"); // 18.2.5 parseInt(string, radix)\n\n\n$export($export.G + $export.F * (parseInt != $parseInt), {\n  parseInt: $parseInt\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.parse-int.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.promise.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.promise.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\n\nvar classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/library/modules/_classof.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\n\nvar anInstance = __webpack_require__(/*! ./_an-instance */ \"./node_modules/core-js/library/modules/_an-instance.js\");\n\nvar forOf = __webpack_require__(/*! ./_for-of */ \"./node_modules/core-js/library/modules/_for-of.js\");\n\nvar speciesConstructor = __webpack_require__(/*! ./_species-constructor */ \"./node_modules/core-js/library/modules/_species-constructor.js\");\n\nvar task = __webpack_require__(/*! ./_task */ \"./node_modules/core-js/library/modules/_task.js\").set;\n\nvar microtask = __webpack_require__(/*! ./_microtask */ \"./node_modules/core-js/library/modules/_microtask.js\")();\n\nvar newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ \"./node_modules/core-js/library/modules/_new-promise-capability.js\");\n\nvar perform = __webpack_require__(/*! ./_perform */ \"./node_modules/core-js/library/modules/_perform.js\");\n\nvar userAgent = __webpack_require__(/*! ./_user-agent */ \"./node_modules/core-js/library/modules/_user-agent.js\");\n\nvar promiseResolve = __webpack_require__(/*! ./_promise-resolve */ \"./node_modules/core-js/library/modules/_promise-resolve.js\");\n\nvar PROMISE = 'Promise';\nvar TypeError = global.TypeError;\nvar process = global.process;\nvar versions = process && process.versions;\nvar v8 = versions && versions.v8 || '';\nvar $Promise = global[PROMISE];\nvar isNode = classof(process) == 'process';\n\nvar empty = function () {\n  /* empty */\n};\n\nvar Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;\nvar newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;\nvar USE_NATIVE = !!function () {\n  try {\n    // correct subclassing with @@species support\n    var promise = $Promise.resolve(1);\n\n    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('species')] = function (exec) {\n      exec(empty, empty);\n    }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test\n\n\n    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables\n    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565\n    // we can't detect it synchronously, so just check versions\n    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;\n  } catch (e) {\n    /* empty */\n  }\n}(); // helpers\n\nvar isThenable = function (it) {\n  var then;\n  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;\n};\n\nvar notify = function (promise, isReject) {\n  if (promise._n) return;\n  promise._n = true;\n  var chain = promise._c;\n  microtask(function () {\n    var value = promise._v;\n    var ok = promise._s == 1;\n    var i = 0;\n\n    var run = function (reaction) {\n      var handler = ok ? reaction.ok : reaction.fail;\n      var resolve = reaction.resolve;\n      var reject = reaction.reject;\n      var domain = reaction.domain;\n      var result, then, exited;\n\n      try {\n        if (handler) {\n          if (!ok) {\n            if (promise._h == 2) onHandleUnhandled(promise);\n            promise._h = 1;\n          }\n\n          if (handler === true) result = value;else {\n            if (domain) domain.enter();\n            result = handler(value); // may throw\n\n            if (domain) {\n              domain.exit();\n              exited = true;\n            }\n          }\n\n          if (result === reaction.promise) {\n            reject(TypeError('Promise-chain cycle'));\n          } else if (then = isThenable(result)) {\n            then.call(result, resolve, reject);\n          } else resolve(result);\n        } else reject(value);\n      } catch (e) {\n        if (domain && !exited) domain.exit();\n        reject(e);\n      }\n    };\n\n    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach\n\n\n    promise._c = [];\n    promise._n = false;\n    if (isReject && !promise._h) onUnhandled(promise);\n  });\n};\n\nvar onUnhandled = function (promise) {\n  task.call(global, function () {\n    var value = promise._v;\n    var unhandled = isUnhandled(promise);\n    var result, handler, console;\n\n    if (unhandled) {\n      result = perform(function () {\n        if (isNode) {\n          process.emit('unhandledRejection', value, promise);\n        } else if (handler = global.onunhandledrejection) {\n          handler({\n            promise: promise,\n            reason: value\n          });\n        } else if ((console = global.console) && console.error) {\n          console.error('Unhandled promise rejection', value);\n        }\n      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should\n\n      promise._h = isNode || isUnhandled(promise) ? 2 : 1;\n    }\n\n    promise._a = undefined;\n    if (unhandled && result.e) throw result.v;\n  });\n};\n\nvar isUnhandled = function (promise) {\n  return promise._h !== 1 && (promise._a || promise._c).length === 0;\n};\n\nvar onHandleUnhandled = function (promise) {\n  task.call(global, function () {\n    var handler;\n\n    if (isNode) {\n      process.emit('rejectionHandled', promise);\n    } else if (handler = global.onrejectionhandled) {\n      handler({\n        promise: promise,\n        reason: promise._v\n      });\n    }\n  });\n};\n\nvar $reject = function (value) {\n  var promise = this;\n  if (promise._d) return;\n  promise._d = true;\n  promise = promise._w || promise; // unwrap\n\n  promise._v = value;\n  promise._s = 2;\n  if (!promise._a) promise._a = promise._c.slice();\n  notify(promise, true);\n};\n\nvar $resolve = function (value) {\n  var promise = this;\n  var then;\n  if (promise._d) return;\n  promise._d = true;\n  promise = promise._w || promise; // unwrap\n\n  try {\n    if (promise === value) throw TypeError(\"Promise can't be resolved itself\");\n\n    if (then = isThenable(value)) {\n      microtask(function () {\n        var wrapper = {\n          _w: promise,\n          _d: false\n        }; // wrap\n\n        try {\n          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));\n        } catch (e) {\n          $reject.call(wrapper, e);\n        }\n      });\n    } else {\n      promise._v = value;\n      promise._s = 1;\n      notify(promise, false);\n    }\n  } catch (e) {\n    $reject.call({\n      _w: promise,\n      _d: false\n    }, e); // wrap\n  }\n}; // constructor polyfill\n\n\nif (!USE_NATIVE) {\n  // 25.4.3.1 Promise(executor)\n  $Promise = function Promise(executor) {\n    anInstance(this, $Promise, PROMISE, '_h');\n    aFunction(executor);\n    Internal.call(this);\n\n    try {\n      executor(ctx($resolve, this, 1), ctx($reject, this, 1));\n    } catch (err) {\n      $reject.call(this, err);\n    }\n  }; // eslint-disable-next-line no-unused-vars\n\n\n  Internal = function Promise(executor) {\n    this._c = []; // <- awaiting reactions\n\n    this._a = undefined; // <- checked in isUnhandled reactions\n\n    this._s = 0; // <- state\n\n    this._d = false; // <- done\n\n    this._v = undefined; // <- value\n\n    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled\n\n    this._n = false; // <- notify\n  };\n\n  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ \"./node_modules/core-js/library/modules/_redefine-all.js\")($Promise.prototype, {\n    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)\n    then: function then(onFulfilled, onRejected) {\n      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));\n      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;\n      reaction.fail = typeof onRejected == 'function' && onRejected;\n      reaction.domain = isNode ? process.domain : undefined;\n\n      this._c.push(reaction);\n\n      if (this._a) this._a.push(reaction);\n      if (this._s) notify(this, false);\n      return reaction.promise;\n    },\n    // 25.4.5.1 Promise.prototype.catch(onRejected)\n    'catch': function (onRejected) {\n      return this.then(undefined, onRejected);\n    }\n  });\n\n  OwnPromiseCapability = function () {\n    var promise = new Internal();\n    this.promise = promise;\n    this.resolve = ctx($resolve, promise, 1);\n    this.reject = ctx($reject, promise, 1);\n  };\n\n  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {\n    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, {\n  Promise: $Promise\n});\n\n__webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\")($Promise, PROMISE);\n\n__webpack_require__(/*! ./_set-species */ \"./node_modules/core-js/library/modules/_set-species.js\")(PROMISE);\n\nWrapper = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\")[PROMISE]; // statics\n\n$export($export.S + $export.F * !USE_NATIVE, PROMISE, {\n  // 25.4.4.5 Promise.reject(r)\n  reject: function reject(r) {\n    var capability = newPromiseCapability(this);\n    var $$reject = capability.reject;\n    $$reject(r);\n    return capability.promise;\n  }\n});\n$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {\n  // 25.4.4.6 Promise.resolve(x)\n  resolve: function resolve(x) {\n    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);\n  }\n});\n$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ \"./node_modules/core-js/library/modules/_iter-detect.js\")(function (iter) {\n  $Promise.all(iter)['catch'](empty);\n})), PROMISE, {\n  // 25.4.4.1 Promise.all(iterable)\n  all: function all(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var values = [];\n      var index = 0;\n      var remaining = 1;\n      forOf(iterable, false, function (promise) {\n        var $index = index++;\n        var alreadyCalled = false;\n        values.push(undefined);\n        remaining++;\n        C.resolve(promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[$index] = value;\n          --remaining || resolve(values);\n        }, reject);\n      });\n      --remaining || resolve(values);\n    });\n    if (result.e) reject(result.v);\n    return capability.promise;\n  },\n  // 25.4.4.4 Promise.race(iterable)\n  race: function race(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var reject = capability.reject;\n    var result = perform(function () {\n      forOf(iterable, false, function (promise) {\n        C.resolve(promise).then(capability.resolve, reject);\n      });\n    });\n    if (result.e) reject(result.v);\n    return capability.promise;\n  }\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.promise.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar $at = __webpack_require__(/*! ./_string-at */ \"./node_modules/core-js/library/modules/_string-at.js\")(true); // 21.1.3.27 String.prototype[@@iterator]()\n\n\n__webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/library/modules/_iter-define.js\")(String, 'String', function (iterated) {\n  this._t = String(iterated); // target\n\n  this._i = 0; // next index\n  // 21.1.5.2.1 %StringIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var index = this._i;\n  var point;\n  if (index >= O.length) return {\n    value: undefined,\n    done: true\n  };\n  point = $at(O, index);\n  this._i += point.length;\n  return {\n    value: point,\n    done: false\n  };\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.string.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // ECMAScript 6 symbols shim\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\n\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/library/modules/_redefine.js\");\n\nvar META = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/library/modules/_meta.js\").KEY;\n\nvar $fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\n\nvar shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\n\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\");\n\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\");\n\nvar wksDefine = __webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\");\n\nvar enumKeys = __webpack_require__(/*! ./_enum-keys */ \"./node_modules/core-js/library/modules/_enum-keys.js\");\n\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/library/modules/_is-array.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\n\nvar _create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/library/modules/_object-create.js\");\n\nvar gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ \"./node_modules/core-js/library/modules/_object-gopn-ext.js\");\n\nvar $GOPD = __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/library/modules/_object-gopd.js\");\n\nvar $DP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\n\nvar $keys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\n\nvar gOPD = $GOPD.f;\nvar dP = $DP.f;\nvar gOPN = gOPNExt.f;\nvar $Symbol = global.Symbol;\nvar $JSON = global.JSON;\n\nvar _stringify = $JSON && $JSON.stringify;\n\nvar PROTOTYPE = 'prototype';\nvar HIDDEN = wks('_hidden');\nvar TO_PRIMITIVE = wks('toPrimitive');\nvar isEnum = {}.propertyIsEnumerable;\nvar SymbolRegistry = shared('symbol-registry');\nvar AllSymbols = shared('symbols');\nvar OPSymbols = shared('op-symbols');\nvar ObjectProto = Object[PROTOTYPE];\nvar USE_NATIVE = typeof $Symbol == 'function';\nvar QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\n\nvar setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\n\nvar setSymbolDesc = DESCRIPTORS && $fails(function () {\n  return _create(dP({}, 'a', {\n    get: function () {\n      return dP(this, 'a', {\n        value: 7\n      }).a;\n    }\n  })).a != 7;\n}) ? function (it, key, D) {\n  var protoDesc = gOPD(ObjectProto, key);\n  if (protoDesc) delete ObjectProto[key];\n  dP(it, key, D);\n  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);\n} : dP;\n\nvar wrap = function (tag) {\n  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);\n\n  sym._k = tag;\n  return sym;\n};\n\nvar isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  return it instanceof $Symbol;\n};\n\nvar $defineProperty = function defineProperty(it, key, D) {\n  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);\n  anObject(it);\n  key = toPrimitive(key, true);\n  anObject(D);\n\n  if (has(AllSymbols, key)) {\n    if (!D.enumerable) {\n      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));\n      it[HIDDEN][key] = true;\n    } else {\n      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;\n      D = _create(D, {\n        enumerable: createDesc(0, false)\n      });\n    }\n\n    return setSymbolDesc(it, key, D);\n  }\n\n  return dP(it, key, D);\n};\n\nvar $defineProperties = function defineProperties(it, P) {\n  anObject(it);\n  var keys = enumKeys(P = toIObject(P));\n  var i = 0;\n  var l = keys.length;\n  var key;\n\n  while (l > i) $defineProperty(it, key = keys[i++], P[key]);\n\n  return it;\n};\n\nvar $create = function create(it, P) {\n  return P === undefined ? _create(it) : $defineProperties(_create(it), P);\n};\n\nvar $propertyIsEnumerable = function propertyIsEnumerable(key) {\n  var E = isEnum.call(this, key = toPrimitive(key, true));\n  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;\n  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;\n};\n\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {\n  it = toIObject(it);\n  key = toPrimitive(key, true);\n  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;\n  var D = gOPD(it, key);\n  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;\n  return D;\n};\n\nvar $getOwnPropertyNames = function getOwnPropertyNames(it) {\n  var names = gOPN(toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n\n  while (names.length > i) {\n    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);\n  }\n\n  return result;\n};\n\nvar $getOwnPropertySymbols = function getOwnPropertySymbols(it) {\n  var IS_OP = it === ObjectProto;\n  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n\n  while (names.length > i) {\n    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);\n  }\n\n  return result;\n}; // 19.4.1.1 Symbol([description])\n\n\nif (!USE_NATIVE) {\n  $Symbol = function Symbol() {\n    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');\n    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);\n\n    var $set = function (value) {\n      if (this === ObjectProto) $set.call(OPSymbols, value);\n      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;\n      setSymbolDesc(this, tag, createDesc(1, value));\n    };\n\n    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {\n      configurable: true,\n      set: $set\n    });\n    return wrap(tag);\n  };\n\n  redefine($Symbol[PROTOTYPE], 'toString', function toString() {\n    return this._k;\n  });\n  $GOPD.f = $getOwnPropertyDescriptor;\n  $DP.f = $defineProperty;\n  __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/library/modules/_object-gopn.js\").f = gOPNExt.f = $getOwnPropertyNames;\n  __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\").f = $propertyIsEnumerable;\n  __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\").f = $getOwnPropertySymbols;\n\n  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\")) {\n    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);\n  }\n\n  wksExt.f = function (name) {\n    return wrap(wks(name));\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, {\n  Symbol: $Symbol\n});\n\nfor (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14\n'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) wks(es6Symbols[j++]);\n\nfor (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);\n\n$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {\n  // 19.4.2.1 Symbol.for(key)\n  'for': function (key) {\n    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);\n  },\n  // 19.4.2.5 Symbol.keyFor(sym)\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');\n\n    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;\n  },\n  useSetter: function () {\n    setter = true;\n  },\n  useSimple: function () {\n    setter = false;\n  }\n});\n$export($export.S + $export.F * !USE_NATIVE, 'Object', {\n  // 19.1.2.2 Object.create(O [, Properties])\n  create: $create,\n  // 19.1.2.4 Object.defineProperty(O, P, Attributes)\n  defineProperty: $defineProperty,\n  // 19.1.2.3 Object.defineProperties(O, Properties)\n  defineProperties: $defineProperties,\n  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,\n  // 19.1.2.7 Object.getOwnPropertyNames(O)\n  getOwnPropertyNames: $getOwnPropertyNames,\n  // 19.1.2.8 Object.getOwnPropertySymbols(O)\n  getOwnPropertySymbols: $getOwnPropertySymbols\n}); // 24.3.2 JSON.stringify(value [, replacer [, space]])\n\n$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {\n  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}\n  // WebKit converts symbol values to JSON as null\n  // V8 throws on boxed symbols\n\n  return _stringify([S]) != '[null]' || _stringify({\n    a: S\n  }) != '{}' || _stringify(Object(S)) != '{}';\n})), 'JSON', {\n  stringify: function stringify(it) {\n    var args = [it];\n    var i = 1;\n    var replacer, $replacer;\n\n    while (arguments.length > i) args.push(arguments[i++]);\n\n    $replacer = replacer = args[1];\n    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n\n    if (!isArray(replacer)) replacer = function (key, value) {\n      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);\n      if (!isSymbol(value)) return value;\n    };\n    args[1] = replacer;\n    return _stringify.apply($JSON, args);\n  }\n}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)\n\n$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]\n\nsetToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]\n\nsetToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]\n\nsetToStringTag(global.JSON, 'JSON', true);\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.weak-map.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.weak-map.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar each = __webpack_require__(/*! ./_array-methods */ \"./node_modules/core-js/library/modules/_array-methods.js\")(0);\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/library/modules/_redefine.js\");\n\nvar meta = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/library/modules/_meta.js\");\n\nvar assign = __webpack_require__(/*! ./_object-assign */ \"./node_modules/core-js/library/modules/_object-assign.js\");\n\nvar weak = __webpack_require__(/*! ./_collection-weak */ \"./node_modules/core-js/library/modules/_collection-weak.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\n\nvar validate = __webpack_require__(/*! ./_validate-collection */ \"./node_modules/core-js/library/modules/_validate-collection.js\");\n\nvar WEAK_MAP = 'WeakMap';\nvar getWeak = meta.getWeak;\nvar isExtensible = Object.isExtensible;\nvar uncaughtFrozenStore = weak.ufstore;\nvar tmp = {};\nvar InternalMap;\n\nvar wrapper = function (get) {\n  return function WeakMap() {\n    return get(this, arguments.length > 0 ? arguments[0] : undefined);\n  };\n};\n\nvar methods = {\n  // 23.3.3.3 WeakMap.prototype.get(key)\n  get: function get(key) {\n    if (isObject(key)) {\n      var data = getWeak(key);\n      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);\n      return data ? data[this._i] : undefined;\n    }\n  },\n  // 23.3.3.5 WeakMap.prototype.set(key, value)\n  set: function set(key, value) {\n    return weak.def(validate(this, WEAK_MAP), key, value);\n  }\n}; // 23.3 WeakMap Objects\n\nvar $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ \"./node_modules/core-js/library/modules/_collection.js\")(WEAK_MAP, wrapper, methods, weak, true, true); // IE11 WeakMap frozen keys fix\n\n\nif (fails(function () {\n  return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;\n})) {\n  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);\n  assign(InternalMap.prototype, methods);\n  meta.NEED = true;\n  each(['delete', 'has', 'get', 'set'], function (key) {\n    var proto = $WeakMap.prototype;\n    var method = proto[key];\n    redefine(proto, key, function (a, b) {\n      // store frozen objects on internal weakmap shim\n      if (isObject(a) && !isExtensible(a)) {\n        if (!this._f) this._f = new InternalMap();\n\n        var result = this._f[key](a, b);\n\n        return key == 'set' ? this : result; // store all the rest on native weakmap\n      }\n\n      return method.call(this, a, b);\n    });\n  });\n}\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es6.weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.finally.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// https://github.com/tc39/proposal-promise-finally\n\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar speciesConstructor = __webpack_require__(/*! ./_species-constructor */ \"./node_modules/core-js/library/modules/_species-constructor.js\");\n\nvar promiseResolve = __webpack_require__(/*! ./_promise-resolve */ \"./node_modules/core-js/library/modules/_promise-resolve.js\");\n\n$export($export.P + $export.R, 'Promise', {\n  'finally': function (onFinally) {\n    var C = speciesConstructor(this, core.Promise || global.Promise);\n    var isFunction = typeof onFinally == 'function';\n    return this.then(isFunction ? function (x) {\n      return promiseResolve(C, onFinally()).then(function () {\n        return x;\n      });\n    } : onFinally, isFunction ? function (e) {\n      return promiseResolve(C, onFinally()).then(function () {\n        throw e;\n      });\n    } : onFinally);\n  }\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.promise.finally.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.try.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // https://github.com/tc39/proposal-promise-try\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\nvar newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ \"./node_modules/core-js/library/modules/_new-promise-capability.js\");\n\nvar perform = __webpack_require__(/*! ./_perform */ \"./node_modules/core-js/library/modules/_perform.js\");\n\n$export($export.S, 'Promise', {\n  'try': function (callbackfn) {\n    var promiseCapability = newPromiseCapability.f(this);\n    var result = perform(callbackfn);\n    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);\n    return promiseCapability.promise;\n  }\n});\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.promise.try.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\")('asyncIterator');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.symbol.async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\")('observable');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.symbol.observable.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.weak-map.from.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.weak-map.from.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from\n__webpack_require__(/*! ./_set-collection-from */ \"./node_modules/core-js/library/modules/_set-collection-from.js\")('WeakMap');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.weak-map.from.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.weak-map.of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.weak-map.of.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of\n__webpack_require__(/*! ./_set-collection-of */ \"./node_modules/core-js/library/modules/_set-collection-of.js\")('WeakMap');\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/es7.weak-map.of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./es6.array.iterator */ \"./node_modules/core-js/library/modules/es6.array.iterator.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\n\nvar TO_STRING_TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag');\n\nvar DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' + 'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' + 'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' + 'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' + 'TextTrackList,TouchList').split(',');\n\nfor (var i = 0; i < DOMIterables.length; i++) {\n  var NAME = DOMIterables[i];\n  var Collection = global[NAME];\n  var proto = Collection && Collection.prototype;\n  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);\n  Iterators[NAME] = Iterators.Array;\n}\n\n//# sourceURL=webpack://YYPKG/./node_modules/core-js/library/modules/web.dom.iterable.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);\n};\n\nfunction isBuffer(obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);\n} // For Node v0.10 support. Remove this eventually.\n\n\nfunction isSlowBuffer(obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));\n}\n\n//# sourceURL=webpack://YYPKG/./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Expose `pathToRegexp`.\n */\nmodule.exports = pathToRegexp;\nmodule.exports.parse = parse;\nmodule.exports.compile = compile;\nmodule.exports.tokensToFunction = tokensToFunction;\nmodule.exports.tokensToRegExp = tokensToRegExp;\n/**\n * Default configs.\n */\n\nvar DEFAULT_DELIMITER = '/';\nvar DEFAULT_DELIMITERS = './';\n/**\n * The main path matching regexp utility.\n *\n * @type {RegExp}\n */\n\nvar PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.\n// This allows the user to escape special characters that won't transform.\n'(\\\\\\\\.)', // Match Express-style parameters and un-named parameters with a prefix\n// and optional suffixes. Matches appear as:\n//\n// \":test(\\\\d+)?\" => [\"test\", \"\\d+\", undefined, \"?\"]\n// \"(\\\\d+)\"  => [undefined, undefined, \"\\d+\", undefined]\n'(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?'].join('|'), 'g');\n/**\n * Parse a string for the raw tokens.\n *\n * @param  {string}  str\n * @param  {Object=} options\n * @return {!Array}\n */\n\nfunction parse(str, options) {\n  var tokens = [];\n  var key = 0;\n  var index = 0;\n  var path = '';\n  var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;\n  var delimiters = options && options.delimiters || DEFAULT_DELIMITERS;\n  var pathEscaped = false;\n  var res;\n\n  while ((res = PATH_REGEXP.exec(str)) !== null) {\n    var m = res[0];\n    var escaped = res[1];\n    var offset = res.index;\n    path += str.slice(index, offset);\n    index = offset + m.length; // Ignore already escaped sequences.\n\n    if (escaped) {\n      path += escaped[1];\n      pathEscaped = true;\n      continue;\n    }\n\n    var prev = '';\n    var next = str[index];\n    var name = res[2];\n    var capture = res[3];\n    var group = res[4];\n    var modifier = res[5];\n\n    if (!pathEscaped && path.length) {\n      var k = path.length - 1;\n\n      if (delimiters.indexOf(path[k]) > -1) {\n        prev = path[k];\n        path = path.slice(0, k);\n      }\n    } // Push the current path onto the tokens.\n\n\n    if (path) {\n      tokens.push(path);\n      path = '';\n      pathEscaped = false;\n    }\n\n    var partial = prev !== '' && next !== undefined && next !== prev;\n    var repeat = modifier === '+' || modifier === '*';\n    var optional = modifier === '?' || modifier === '*';\n    var delimiter = prev || defaultDelimiter;\n    var pattern = capture || group;\n    tokens.push({\n      name: name || key++,\n      prefix: prev,\n      delimiter: delimiter,\n      optional: optional,\n      repeat: repeat,\n      partial: partial,\n      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'\n    });\n  } // Push any remaining characters.\n\n\n  if (path || index < str.length) {\n    tokens.push(path + str.substr(index));\n  }\n\n  return tokens;\n}\n/**\n * Compile a string to a template function for the path.\n *\n * @param  {string}             str\n * @param  {Object=}            options\n * @return {!function(Object=, Object=)}\n */\n\n\nfunction compile(str, options) {\n  return tokensToFunction(parse(str, options));\n}\n/**\n * Expose a method for transforming tokens into the path function.\n */\n\n\nfunction tokensToFunction(tokens) {\n  // Compile all the tokens into regexps.\n  var matches = new Array(tokens.length); // Compile all the patterns before compilation.\n\n  for (var i = 0; i < tokens.length; i++) {\n    if (typeof tokens[i] === 'object') {\n      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');\n    }\n  }\n\n  return function (data, options) {\n    var path = '';\n    var encode = options && options.encode || encodeURIComponent;\n\n    for (var i = 0; i < tokens.length; i++) {\n      var token = tokens[i];\n\n      if (typeof token === 'string') {\n        path += token;\n        continue;\n      }\n\n      var value = data ? data[token.name] : undefined;\n      var segment;\n\n      if (Array.isArray(value)) {\n        if (!token.repeat) {\n          throw new TypeError('Expected \"' + token.name + '\" to not repeat, but got array');\n        }\n\n        if (value.length === 0) {\n          if (token.optional) continue;\n          throw new TypeError('Expected \"' + token.name + '\" to not be empty');\n        }\n\n        for (var j = 0; j < value.length; j++) {\n          segment = encode(value[j], token);\n\n          if (!matches[i].test(segment)) {\n            throw new TypeError('Expected all \"' + token.name + '\" to match \"' + token.pattern + '\"');\n          }\n\n          path += (j === 0 ? token.prefix : token.delimiter) + segment;\n        }\n\n        continue;\n      }\n\n      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n        segment = encode(String(value), token);\n\n        if (!matches[i].test(segment)) {\n          throw new TypeError('Expected \"' + token.name + '\" to match \"' + token.pattern + '\", but got \"' + segment + '\"');\n        }\n\n        path += token.prefix + segment;\n        continue;\n      }\n\n      if (token.optional) {\n        // Prepend partial segment prefixes.\n        if (token.partial) path += token.prefix;\n        continue;\n      }\n\n      throw new TypeError('Expected \"' + token.name + '\" to be ' + (token.repeat ? 'an array' : 'a string'));\n    }\n\n    return path;\n  };\n}\n/**\n * Escape a regular expression string.\n *\n * @param  {string} str\n * @return {string}\n */\n\n\nfunction escapeString(str) {\n  return str.replace(/([.+*?=^!:${}()[\\]|/\\\\])/g, '\\\\$1');\n}\n/**\n * Escape the capturing group by escaping special characters and meaning.\n *\n * @param  {string} group\n * @return {string}\n */\n\n\nfunction escapeGroup(group) {\n  return group.replace(/([=!:$/()])/g, '\\\\$1');\n}\n/**\n * Get the flags for a regexp from the options.\n *\n * @param  {Object} options\n * @return {string}\n */\n\n\nfunction flags(options) {\n  return options && options.sensitive ? '' : 'i';\n}\n/**\n * Pull out keys from a regexp.\n *\n * @param  {!RegExp} path\n * @param  {Array=}  keys\n * @return {!RegExp}\n */\n\n\nfunction regexpToRegexp(path, keys) {\n  if (!keys) return path; // Use a negative lookahead to match only capturing groups.\n\n  var groups = path.source.match(/\\((?!\\?)/g);\n\n  if (groups) {\n    for (var i = 0; i < groups.length; i++) {\n      keys.push({\n        name: i,\n        prefix: null,\n        delimiter: null,\n        optional: false,\n        repeat: false,\n        partial: false,\n        pattern: null\n      });\n    }\n  }\n\n  return path;\n}\n/**\n * Transform an array into a regexp.\n *\n * @param  {!Array}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\n\n\nfunction arrayToRegexp(path, keys, options) {\n  var parts = [];\n\n  for (var i = 0; i < path.length; i++) {\n    parts.push(pathToRegexp(path[i], keys, options).source);\n  }\n\n  return new RegExp('(?:' + parts.join('|') + ')', flags(options));\n}\n/**\n * Create a path regexp from string input.\n *\n * @param  {string}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\n\n\nfunction stringToRegexp(path, keys, options) {\n  return tokensToRegExp(parse(path, options), keys, options);\n}\n/**\n * Expose a function for taking tokens and returning a RegExp.\n *\n * @param  {!Array}  tokens\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\n\n\nfunction tokensToRegExp(tokens, keys, options) {\n  options = options || {};\n  var strict = options.strict;\n  var start = options.start !== false;\n  var end = options.end !== false;\n  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);\n  var delimiters = options.delimiters || DEFAULT_DELIMITERS;\n  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');\n  var route = start ? '^' : '';\n  var isEndDelimited = tokens.length === 0; // Iterate over the tokens and create our regexp string.\n\n  for (var i = 0; i < tokens.length; i++) {\n    var token = tokens[i];\n\n    if (typeof token === 'string') {\n      route += escapeString(token);\n      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;\n    } else {\n      var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*' : token.pattern;\n      if (keys) keys.push(token);\n\n      if (token.optional) {\n        if (token.partial) {\n          route += escapeString(token.prefix) + '(' + capture + ')?';\n        } else {\n          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';\n        }\n      } else {\n        route += escapeString(token.prefix) + '(' + capture + ')';\n      }\n    }\n  }\n\n  if (end) {\n    if (!strict) route += '(?:' + delimiter + ')?';\n    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';\n  } else {\n    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';\n    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';\n  }\n\n  return new RegExp(route, flags(options));\n}\n/**\n * Normalize the given path string, returning a regular expression.\n *\n * An empty array can be passed in for the keys, which will hold the\n * placeholder key descriptions. For example, using `/user/:id`, `keys` will\n * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.\n *\n * @param  {(string|RegExp|Array)} path\n * @param  {Array=}                keys\n * @param  {Object=}               options\n * @return {!RegExp}\n */\n\n\nfunction pathToRegexp(path, keys, options) {\n  if (path instanceof RegExp) {\n    return regexpToRegexp(path, keys);\n  }\n\n  if (Array.isArray(path)) {\n    return arrayToRegexp(\n    /** @type {!Array} */\n    path, keys, options);\n  }\n\n  return stringToRegexp(\n  /** @type {string} */\n  path, keys, options);\n}\n\n//# sourceURL=webpack://YYPKG/./node_modules/path-to-regexp/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {}; // cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n  throw new Error('setTimeout has not been defined');\n}\n\nfunction defaultClearTimeout() {\n  throw new Error('clearTimeout has not been defined');\n}\n\n(function () {\n  try {\n    if (typeof setTimeout === 'function') {\n      cachedSetTimeout = setTimeout;\n    } else {\n      cachedSetTimeout = defaultSetTimout;\n    }\n  } catch (e) {\n    cachedSetTimeout = defaultSetTimout;\n  }\n\n  try {\n    if (typeof clearTimeout === 'function') {\n      cachedClearTimeout = clearTimeout;\n    } else {\n      cachedClearTimeout = defaultClearTimeout;\n    }\n  } catch (e) {\n    cachedClearTimeout = defaultClearTimeout;\n  }\n})();\n\nfunction runTimeout(fun) {\n  if (cachedSetTimeout === setTimeout) {\n    //normal enviroments in sane situations\n    return setTimeout(fun, 0);\n  } // if setTimeout wasn't available but was latter defined\n\n\n  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n    cachedSetTimeout = setTimeout;\n    return setTimeout(fun, 0);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedSetTimeout(fun, 0);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n      return cachedSetTimeout.call(null, fun, 0);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n      return cachedSetTimeout.call(this, fun, 0);\n    }\n  }\n}\n\nfunction runClearTimeout(marker) {\n  if (cachedClearTimeout === clearTimeout) {\n    //normal enviroments in sane situations\n    return clearTimeout(marker);\n  } // if clearTimeout wasn't available but was latter defined\n\n\n  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n    cachedClearTimeout = clearTimeout;\n    return clearTimeout(marker);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedClearTimeout(marker);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n      return cachedClearTimeout.call(null, marker);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n      // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n      return cachedClearTimeout.call(this, marker);\n    }\n  }\n}\n\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n  if (!draining || !currentQueue) {\n    return;\n  }\n\n  draining = false;\n\n  if (currentQueue.length) {\n    queue = currentQueue.concat(queue);\n  } else {\n    queueIndex = -1;\n  }\n\n  if (queue.length) {\n    drainQueue();\n  }\n}\n\nfunction drainQueue() {\n  if (draining) {\n    return;\n  }\n\n  var timeout = runTimeout(cleanUpNextTick);\n  draining = true;\n  var len = queue.length;\n\n  while (len) {\n    currentQueue = queue;\n    queue = [];\n\n    while (++queueIndex < len) {\n      if (currentQueue) {\n        currentQueue[queueIndex].run();\n      }\n    }\n\n    queueIndex = -1;\n    len = queue.length;\n  }\n\n  currentQueue = null;\n  draining = false;\n  runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n  var args = new Array(arguments.length - 1);\n\n  if (arguments.length > 1) {\n    for (var i = 1; i < arguments.length; i++) {\n      args[i - 1] = arguments[i];\n    }\n  }\n\n  queue.push(new Item(fun, args));\n\n  if (queue.length === 1 && !draining) {\n    runTimeout(drainQueue);\n  }\n}; // v8 likes predictible objects\n\n\nfunction Item(fun, array) {\n  this.fun = fun;\n  this.array = array;\n}\n\nItem.prototype.run = function () {\n  this.fun.apply(null, this.array);\n};\n\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\n\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) {\n  return [];\n};\n\nprocess.binding = function (name) {\n  throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () {\n  return '/';\n};\n\nprocess.chdir = function (dir) {\n  throw new Error('process.chdir is not supported');\n};\n\nprocess.umask = function () {\n  return 0;\n};\n\n//# sourceURL=webpack://YYPKG/./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n// This method of obtaining a reference to the global object needs to be\n// kept identical to the way it is obtained in runtime.js\nvar g = function () {\n  return this || typeof self === \"object\" && self;\n}() || Function(\"return this\")(); // Use `getOwnPropertyNames` because not all browsers support calling\n// `hasOwnProperty` on the global `self` object in a worker. See #183.\n\n\nvar hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf(\"regeneratorRuntime\") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.\n\nvar oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.\n\ng.regeneratorRuntime = undefined;\nmodule.exports = __webpack_require__(/*! ./runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\nif (hadRuntime) {\n  // Restore the original runtime.\n  g.regeneratorRuntime = oldRuntime;\n} else {\n  // Remove the global property added by runtime.js.\n  try {\n    delete g.regeneratorRuntime;\n  } catch (e) {\n    g.regeneratorRuntime = undefined;\n  }\n}\n\n//# sourceURL=webpack://YYPKG/./node_modules/regenerator-runtime/runtime-module.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n!function (global) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var undefined; // More compressible than void 0.\n\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n  var inModule = typeof module === \"object\";\n  var runtime = global.regeneratorRuntime;\n\n  if (runtime) {\n    if (inModule) {\n      // If regeneratorRuntime is defined globally and we're in a module,\n      // make the exports object identical to regeneratorRuntime.\n      module.exports = runtime;\n    } // Don't bother evaluating the rest of this file if the runtime was\n    // already defined globally.\n\n\n    return;\n  } // Define the runtime globally (as expected by generated code) as either\n  // module.exports (if we're in a module) or a new, empty object.\n\n\n  runtime = global.regeneratorRuntime = inModule ? module.exports : {};\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n\n    generator._invoke = makeInvokeMethod(innerFn, self, context);\n    return generator;\n  }\n\n  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n\n  function tryCatch(fn, obj, arg) {\n    try {\n      return {\n        type: \"normal\",\n        arg: fn.call(obj, arg)\n      };\n    } catch (err) {\n      return {\n        type: \"throw\",\n        arg: err\n      };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\"; // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n\n  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n\n  function Generator() {}\n\n  function GeneratorFunction() {}\n\n  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n\n\n  var IteratorPrototype = {};\n\n  IteratorPrototype[iteratorSymbol] = function () {\n    return this;\n  };\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n\n  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;\n  GeneratorFunctionPrototype.constructor = GeneratorFunction;\n  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = \"GeneratorFunction\"; // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function (method) {\n      prototype[method] = function (arg) {\n        return this._invoke(method, arg);\n      };\n    });\n  }\n\n  runtime.isGeneratorFunction = function (genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can\n    // do is to check its .name property.\n    (ctor.displayName || ctor.name) === \"GeneratorFunction\" : false;\n  };\n\n  runtime.mark = function (genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n\n      if (!(toStringTagSymbol in genFun)) {\n        genFun[toStringTagSymbol] = \"GeneratorFunction\";\n      }\n    }\n\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  }; // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n\n\n  runtime.awrap = function (arg) {\n    return {\n      __await: arg\n    };\n  };\n\n  function AsyncIterator(generator) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n\n        if (value && typeof value === \"object\" && hasOwn.call(value, \"__await\")) {\n          return Promise.resolve(value.__await).then(function (value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function (err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return Promise.resolve(value).then(function (unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function (error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new Promise(function (resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise = // If enqueue has been called before, then we want to wait until\n      // all previous Promises have been resolved before calling invoke,\n      // so that results are always delivered in the correct order. If\n      // enqueue has not been called before, then it is important to\n      // call invoke immediately, without waiting on a callback to fire,\n      // so that the async generator function has the opportunity to do\n      // any necessary setup in a predictable way. This predictability\n      // is why the Promise constructor synchronously invokes its\n      // executor callback, and why async functions synchronously\n      // execute code before the first await. Since we implement simple\n      // async functions in terms of async generators, it is especially\n      // important to get this right, even though it requires care.\n      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later\n      // invocations of the iterator.\n      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n    } // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n\n\n    this._invoke = enqueue;\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n\n  AsyncIterator.prototype[asyncIteratorSymbol] = function () {\n    return this;\n  };\n\n  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n\n  runtime.async = function (innerFn, outerFn, self, tryLocsList) {\n    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));\n    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.\n    : iter.next().then(function (result) {\n      return result.done ? result.value : iter.next();\n    });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        } // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n\n\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n        var record = tryCatch(innerFn, self, context);\n\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done ? GenStateCompleted : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted; // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  } // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n\n\n  function maybeInvokeDelegate(delegate, context) {\n    var method = delegate.iterator[context.method];\n\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method always terminates the yield* loop.\n      context.delegate = null;\n\n      if (context.method === \"throw\") {\n        if (delegate.iterator.return) {\n          // If the delegate iterator has a return method, give it a\n          // chance to clean up.\n          context.method = \"return\";\n          context.arg = undefined;\n          maybeInvokeDelegate(delegate, context);\n\n          if (context.method === \"throw\") {\n            // If maybeInvokeDelegate(context) changed context.method from\n            // \"return\" to \"throw\", let that override the TypeError below.\n            return ContinueSentinel;\n          }\n        }\n\n        context.method = \"throw\";\n        context.arg = new TypeError(\"The iterator does not provide a 'throw' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (!info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).\n\n      context.next = delegate.nextLoc; // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    } // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n\n\n    context.delegate = null;\n    return ContinueSentinel;\n  } // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n\n\n  defineIteratorMethods(Gp);\n  Gp[toStringTagSymbol] = \"Generator\"; // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n\n  Gp[iteratorSymbol] = function () {\n    return this;\n  };\n\n  Gp.toString = function () {\n    return \"[object Generator]\";\n  };\n\n  function pushTryEntry(locs) {\n    var entry = {\n      tryLoc: locs[0]\n    };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{\n      tryLoc: \"root\"\n    }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  runtime.keys = function (object) {\n    var keys = [];\n\n    for (var key in object) {\n      keys.push(key);\n    }\n\n    keys.reverse(); // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      } // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n\n\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1,\n            next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n          return next;\n        };\n\n        return next.next = next;\n      }\n    } // Return an iterator with no values.\n\n\n    return {\n      next: doneResult\n    };\n  }\n\n  runtime.values = values;\n\n  function doneResult() {\n    return {\n      value: undefined,\n      done: true\n    };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n    reset: function (skipTempReset) {\n      this.prev = 0;\n      this.next = 0; // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n      this.method = \"next\";\n      this.arg = undefined;\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n    stop: function () {\n      this.done = true;\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n    dispatchException: function (exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !!caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n    abrupt: function (type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n\n        if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry && (type === \"break\" || type === \"continue\") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n    complete: function (record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" || record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n    finish: function (finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n    \"catch\": function (tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n\n          return thrown;\n        }\n      } // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n\n\n      throw new Error(\"illegal catch attempt\");\n    },\n    delegateYield: function (iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n}( // In sloppy mode, unbound `this` refers to the global object, fallback to\n// Function constructor if we're in global strict mode. That is sadly a form\n// of indirect eval which violates Content Security Policy.\nfunction () {\n  return this || typeof self === \"object\" && self;\n}() || Function(\"return this\")());\n\n//# sourceURL=webpack://YYPKG/./node_modules/regenerator-runtime/runtime.js?");

/***/ })

/******/ })["default"];
});