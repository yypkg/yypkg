/**
 * 检测是否在微信浏览器中
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isWechatBrowser: boolean = (/micromessenger/i).test(userAgent)

export default isWechatBrowser
