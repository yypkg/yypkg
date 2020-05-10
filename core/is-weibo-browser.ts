/**
 * 检测是否在 Weibo 浏览器中
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isWeiboBrowser: boolean = (/WeiBo/i).test(userAgent)

export default isWeiboBrowser
