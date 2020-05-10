/**
 * 获取浏览器供应商的名称
 *
 * @return {String} 浏览器供应商的名称
 */

const getVendor = (): string => (window.navigator.vendor && window.navigator.vendor.toLowerCase()) || ''

export default getVendor
