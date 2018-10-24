/**
 * 检测当前环境是否为 iPad
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'

function isiPad () {
  return /ipad/i.test(userAgent)
}

export default isiPad
