/**
 * 检测当前环境是否为黑莓
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'

function isBlackberry () {
  return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent)
}

export default isBlackberry
