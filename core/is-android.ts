
/**
 * 检测当前环境是否为 Android
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isAndroid: boolean = /android/i.test(userAgent)

export default isAndroid
