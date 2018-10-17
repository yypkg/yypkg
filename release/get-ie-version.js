"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 获取IE版本
 *
 * @return {number} IE版本号，例如 IE6 则返回 6
 */
function getIEVersion() {
  var UA = navigator.userAgent;
  var version = -1;

  if (navigator.appName === 'Microsoft Internet Explorer' && new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})').exec(UA) != null) {
    version = parseFloat(RegExp.$1);
  } else if (navigator.appName === 'Netscape' && new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(UA) != null) {
    // for IE 11
    version = parseFloat(RegExp.$1);
  }

  return version;
}

var _default = getIEVersion;
exports.default = _default;