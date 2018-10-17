/**
 * 检测当前环境是否为 iPhone
 *
 * @return {boolean} true|false
 */
const userAgent = require('./get-userAgent')

function isiPhone () {
  return /iphone/i.test(userAgent)
}

export default isiPhone
