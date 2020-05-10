/**
 * 检测是否在 QQ 浏览器中
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isQQBrowser: boolean = (/QQ/i).test(userAgent)

export default isQQBrowser