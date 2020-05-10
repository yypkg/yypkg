/**
 * 检测当前环境是否为移动手机
 *
 * @return {Boolean} true|false
 */

import isiPhone from './is-iphone'
import isiPod from './is-ipod'
import isAndroidPhone from './is-android-phone'
import isBlackberry from './is-blackberry'
import isWindowsPhone from './is-windows-phone'

const isMobile: boolean = (isiPhone || isiPod || isAndroidPhone || isBlackberry || isWindowsPhone)

export default isMobile
