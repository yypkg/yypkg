/**
 * 检测是否在微信浏览器中
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isWechatBrowser () {
  return (/micromessenger/i).test(userAgent)
}

export default isWechatBrowser
