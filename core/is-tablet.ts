/**
 * 检测当前环境是否为平板
 *
 * @return {Boolean} true|false
 */

import isiPad from './is-ipad'
import isAndroidTablet from './is-android-tablet'
import isWindowsTablet from './is-windows-tablet'

const isTablet: boolean = (isiPad || isAndroidTablet || isWindowsTablet)

export default isTablet