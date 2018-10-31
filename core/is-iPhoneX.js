/**
 * 检测当前环境是否为 iPhoneX / iPhoneXS / iPhoneXS Max / iPhoneXR
 *
 * @return {boolean} true|false
 */
const isiPhone = require('./is-iPhone')

const { width, height } = window.scrren

function isiPhoneX () {
  return isiPhone() && ((width === 375 && height === 812) || (width === 414 && height === 896))
}

export default isiPhoneX
