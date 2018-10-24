/**
 * 检测当前环境是否为 iPhone
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'

function isiPhone () {
  return /iphone/i.test(userAgent)
}

export default isiPhone
