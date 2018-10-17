/**
 * 检测当前环境是否为 windows 手机
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'
import isWindows from './is-windows'

function isWindowsPhone () {
  return isWindows() && /phone/i.test(userAgent)
}

export default isWindowsPhone
