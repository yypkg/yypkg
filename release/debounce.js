/**
 * 函数去抖
 *
 * @param {Function} fn 回调函数
 * @param {number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */
const debounce = function (fn, delay) {
  let last

  return function () {
    const ctx = this
    const args = arguments

    clearTimeout(last)

    last = setTimeout(function () {
      fn.apply(ctx, args)
    }, delay)
  }
}

export default debounce
