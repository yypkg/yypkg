/**
 * 检测是否在 QQ 浏览器中
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isQQBrowser () {
  return (/QQ/i).test(userAgent)
}

export default isQQBrowser
