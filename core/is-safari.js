/**
 * 检测当前浏览器是否为safari
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'
import vendor from './get-vendor'

function isSafari () {
  return /safari/i.test(userAgent) && /apple computer/i.test(vendor)
}

export default isSafari
