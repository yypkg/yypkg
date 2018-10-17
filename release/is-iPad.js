/**
 * 检测当前环境是否为 iPad
 *
 * @return {boolean} true|false
 */
const userAgent = require('./get-userAgent')

function isiPad () {
  return /ipad/i.test(userAgent)
}

export default isiPad
