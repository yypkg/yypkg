/**
 * 检测是否在 Weibo 浏览器中
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isWeiboBrowser () {
  return (/WeiBo/i).test(userAgent)
}

export default isWeiboBrowser
