/**
 * 检测当前浏览器是否为 Chrome
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'
import getVendor from './get-vendor'

const userAgent: string = getUserAgent()
const vendor: string = getVendor()
const isChrome: boolean = /chrome|chromium|gecko/i.test(userAgent) && /google inc/.test(vendor)

export default isChrome

