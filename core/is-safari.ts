/**
 * 检测当前浏览器是否为safari
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'
import getVendor from './get-vendor'

const userAgent: string = getUserAgent()
const vendor: string = getVendor()
const isSafari: boolean = /safari/i.test(userAgent) && /apple computer/i.test(vendor)

export default isSafari