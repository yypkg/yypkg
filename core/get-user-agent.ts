/**
 * 获取 userAgent
 *
 * @return {String} userAgent
 */

const getUserAgent = (): string => window.navigator.userAgent.toLowerCase() || ''

export default getUserAgent
