/**
 * 检测当前环境是否为 Android 平板
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isAndroidTablet: boolean = /android/i.test(userAgent) && !/mobile/i.test(userAgent)

export default isAndroidTablet
