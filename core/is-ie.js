/**
 * 检测当前浏览器是否为IE
 * edge 也属于IE
 *
 * @param {Number} version 版本号
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isIE (version) {
  if (!version) {
    return /msie/i.test(userAgent) || 'ActiveXObject' in window
  }

  if (version >= 11) {
    return 'ActiveXObject' in window
  }

  return new RegExp('msie ' + version).test(userAgent)
}

export default isIE
