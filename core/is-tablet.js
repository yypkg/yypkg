
/**
 * 检测当前环境是否为平板
 *
 * @return {Boolean} true|false
 */
import isiPad from './is-iPad'
import isAndroidTablet from './is-android-tablet'
import isWindowsTablet from './is-windows-tablet'

function isTablet () {
  return isiPad() || isAndroidTablet() || isWindowsTablet()
}

export default isTablet
