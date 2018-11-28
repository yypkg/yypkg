/**
 * 检测当前环境是否为 iPhoneX / iPhoneXS / iPhoneXS Max / iPhoneXR
 *
 * @return {Boolean} true|false
 */
const isiPhone = require('./is-iPhone')

function isiPhoneX () {
  const { width, height } = window.screen

  return isiPhone() && ((width === 375 && height === 812) || (width === 414 && height === 896))
}

export default isiPhoneX
