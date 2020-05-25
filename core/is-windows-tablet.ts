/**
 * 检测当前环境是否为 windows 平板
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'
import isWindows from './is-windows'
import isWindowsPhone from './is-windows-phone'

const userAgent: string = getUserAgent()
const isWindowsTablet: boolean = isWindows && isWindowsPhone && /touch/i.test(userAgent)

export default isWindowsTablet