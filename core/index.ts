import API from './api'
import compareVersion from './compare-version'
import dateFormat from './date-format'
import { clone, cloneJSON, cloneLoop, cloneForce } from './clone'
import createUUID from './create-uuid'
import debounce from './debounce'
import forceReload from './force-reload'
import getAbsoluteUrl from './get-absolute-url'
import getFirstBrowserLanguage from './get-first-browser-language'
import getIEVersion from './get-ie-version'
import getUrlParam from './get-url-param'
import getUrlPath from './get-url-path'
import getUserAgent from './get-user-agent'
import getVendor from './get-vendor'
import isAndroidPhone from './is-android-phone'
import isAndroidTablet from './is-android-tablet'
import isAndroid from './is-android'
import isBlackberry from './is-blackberry'
import isChrome from './is-chrome'
import isEdge from './is-edge'
import isiOS from './is-ios'
import isiPad from './is-ipad'
import isiPhone from './is-iphone'
import isiPhoneX from './is-iphonex'
import isiPod from './is-ipod'
import isMobile from './is-mobile'
import isQQBrowser from './is-qq-browser'
import isSafari from './is-safari'
import isTablet from './is-tablet'
import isWechatBrowser from './is-wechat-browser'
import isWeiboBrowser from './is-weibo-browser'
import isWindowsPhone from './is-windows-phone'
import isWindowsTablet from './is-windows-tablet'
import isWindows from './is-windows'
import loadScript from './load-script'
import loadStyleText from './load-style-text'
import loadStyle from './load-style'
import mochaTest from './mocha-test'
import numberRange from './number-range'
import padZero from './pad-zero'
import ProgressController from './progress-controller'
import randomColor from './random-color'
import scrollToTop from './scroll-to-top'
import sleep from './sleep'
import SourceLoader from './source-loader'
import stringToDOMElement from './string-to-dom-element'
import thousandsDot from './thousands-dot'
import throttle from './throttle'
import trimSpace from './trim-space'
import type from './type'
import wechatResetFontSize from './wechat-reset-font-size'
import wechatSDK from './wechat-sdk'

const yypkg = {
  API,
  compareVersion,
  dateFormat,
  clone,
  cloneJSON,
  cloneLoop,
  cloneForce,
  createUUID,
  debounce,
  forceReload,
  getAbsoluteUrl,
  getFirstBrowserLanguage,
  getIEVersion,
  getUrlParam,
  getUrlPath,
  getUserAgent,
  getVendor,
  isAndroidPhone,
  isAndroidTablet,
  isAndroid,
  isBlackberry,
  isChrome,
  isEdge,
  isiOS,
  isiPad,
  isiPhone,
  isiPhoneX,
  isiPod,
  isMobile,
  isQQBrowser,
  isSafari,
  isTablet,
  isWechatBrowser,
  isWeiboBrowser,
  isWindowsPhone,
  isWindowsTablet,
  isWindows,
  loadScript,
  loadStyleText,
  loadStyle,
  mochaTest,
  numberRange,
  padZero,
  ProgressController,
  randomColor,
  scrollToTop,
  sleep,
  SourceLoader,
  stringToDOMElement,
  thousandsDot,
  throttle,
  trimSpace,
  type,
  wechatResetFontSize,
  wechatSDK,
}

export default yypkg

