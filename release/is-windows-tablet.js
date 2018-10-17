/**
 * 检测当前环境是否为 windows 平板
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'
import isWindows from './is-windows'
import isWindowsPhone from './is-windows-phone'

function isWindowsTablet () {
  return isWindows() && isWindowsPhone() && /touch/i.test(userAgent)
}

export default isWindowsTablet
