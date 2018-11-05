/**
 * 检测当前环境是否为移动手机
 *
 * @return {Boolean} true|false
 */
import isiPhone from './is-iPhone'
import isiPod from './is-iPod'
import isAndroidPhone from './is-android-phone'
import isBlackberry from './is-blackberry'
import isWindowsPhone from './is-windows-phone'

function isMobile () {
  return isiPhone() || isiPod() || isAndroidPhone() || isBlackberry() || isWindowsPhone()
}

export default isMobile
