/**
 * 检测当前环境是否为 windows 手机
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'
import isWindows from './is-windows'

const userAgent: string = getUserAgent()
const isWindowsPhone: boolean = isWindows && /phone/i.test(userAgent)

export default isWindowsPhone
