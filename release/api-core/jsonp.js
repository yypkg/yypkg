"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * JSONP for axios
 */
var count = 0;
var encode = window.encodeURIComponent;
var jsonp = {
  // 对象转URI
  objectToURI: function objectToURI(obj) {
    if (!obj) return '';
    var data, key, value;

    data = function () {
      var results;
      results = [];

      for (key in obj) {
        value = obj[key];
        results.push(encode(key) + '=' + encode(value));
      }

      return results;
    }();

    return data.join('&');
  },

  /**
   * 请求处理
   *
   * opts:
   *  - param {String} qs parameter (`callback`)
   *  - prefix {String} qs parameter (`jsonp`)
   *  - name {String} qs parameter (`prefix` + incr)
   *  - timeout {Number} (`30000`)
   *
   * @param {String} url
   * @param {Object|Function} optional options / callback
   * @param {Function} optional callback
   */
  getRequest: function getRequest(url, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts;
      opts = {};
    }

    if (!opts) opts = {};
    var prefix = opts.prefix || 'jsonp';
    var id = opts.name || prefix + count++;
    var param = opts.param || 'callback';
    var timeout = opts.timeout != null ? opts.timeout : 30000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;

    if (timeout) {
      timer = setTimeout(function () {
        cleanup();
        if (fn) fn(new Error('请求超时'));
      }, timeout);
    }

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }

    function cancel() {
      if (window[id]) {
        cleanup();
      }
    }

    window[id] = function (data) {
      // console.log('jsonp got', data);
      cleanup();
      if (fn) fn(null, data);
    }; // add qs component


    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?'); // console.log('jsonp req "%s"', url);
    // create script

    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);
    return cancel;
  },
  // Promise
  init: function init(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      var data = jsonp.objectToURI(options.data);
      var params = jsonp.objectToURI(options.params);
      if (data) params += data;
      if (params) url += '?' + params;
      if (!options.timeout) options.timeout = 30000;
      jsonp.getRequest(url, options, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};

function noop() {}

_axios.default.jsonp = jsonp.init;