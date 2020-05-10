/**
 * 检测当前环境是否为 iPhone
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isiPhone: boolean = /iphone/i.test(userAgent)

export default isiPhone