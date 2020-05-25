/**
 * 检测当前环境是否为iPod
 *
 * @return {Boolean} true|false
 */

import getUserAgent from './get-user-agent'

const userAgent: string = getUserAgent()
const isiPod: boolean = /ipod/i.test(userAgent)

export default isiPod

