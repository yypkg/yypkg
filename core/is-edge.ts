/**
 * 检测当前浏览器是否为 Edge
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isEdge: boolean = /edge/i.test(userAgent)

export default isEdge
