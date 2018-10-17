/**
 * 检测当前浏览器是否为 Chrome
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'
import vendor from './get-vendor'

function isChrome () {
  return /chrome|chromium|gecko/i.test(userAgent) && /google inc/.test(vendor)
}

export default isChrome
