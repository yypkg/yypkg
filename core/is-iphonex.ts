/**
 * 检测当前环境是否为 iPhoneX / iPhoneXS / iPhoneXS Max / iPhoneXR
 *
 * @return {Boolean} true|false
 */

import isiPhone from './is-iphone'

const { width, height } = window.screen
const isiPhoneX: boolean = isiPhone && ((width === 375 && height === 812) || (width === 414 && height === 896))

export default isiPhoneX

