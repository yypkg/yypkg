/**
 * 设置数值范围并返回结果
 *
 * @param {Number} num
 * @param {Object} options 配置选项
 * @return {Number}
 *
 * ex: numberRange(6, { min: 7 }) // 7
 *     numberRange(7, { max: 6 }) // 6
 *     numberRange(10, { min: 5, max: 15 }) // 10
 *     numberRange(0, { min: 5, max: 15 }) // 5
 *     numberRange(20, { min: 5, max: 15 }) // 15
 *     numberRange(10, { min: 15, max: 5 }) // 10 自动调整区间
 *     numberRange(10, { min: 5, max: NaN }) // NaN 非法输入
 *     numberRange(10, { min: 'test', max: 15 }) // NaN 非法输入
 */
function numberRange (num, options) {
  let value = +num
  let min = -Infinity
  let max = Infinity
  if (options) {
    if (options.min !== void 0) {
      min = +options.min
    }
    if (options.max !== void 0) {
      max = +options.max
    }
    if (options.min !== void 0 &&
      options.max !== void 0 &&
      min > max) {
      [min, max] = [max, min]
    }
  }
  return Math.max(min, Math.min(value, max))
}

export default numberRange
