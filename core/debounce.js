/**
 * 函数去抖
 *
 * @param {Function} func 回调函数
 * @param {Number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */
const debounce = function (func, delay) {
  let last

  return function () {
    const ctx = this
    const args = arguments

    clearTimeout(last)

    last = setTimeout(function () {
      func.apply(ctx, args)
    }, delay)
  }
}

export default debounce
