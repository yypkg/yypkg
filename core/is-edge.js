/**
 * 检测当前浏览器是否为 Edge
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isEdge () {
  return /edge/i.test(userAgent)
}

export default isEdge
