/**
 * 生成随机颜色
 *
 * @return {String}
 */
const randomColor = function () {
  return Math.floor(Math.random() * (2 << 23)).toString(16)
}

export default randomColor
