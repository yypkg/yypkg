/**
 * 检测当前环境是否为 iPad
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isiPad: boolean = /ipad/i.test(userAgent)

export default isiPad
