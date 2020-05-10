/**
 * 检测当前环境是否为 windows
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isWindows: boolean = /win/i.test(userAgent)

export default isWindows