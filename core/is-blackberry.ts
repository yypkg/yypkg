/**
 * 检测当前环境是否为黑莓
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isBlackberry: boolean = /blackberry/i.test(userAgent) || /BB10/i.test(userAgent)

export default isBlackberry
