/**
 * 千分位逗号
 *
 * @param {Number} 数字
 * @return {String}
 *
 * 例如转为 1,234,567,890
 */
const thousandsDot = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default thousandsDot
