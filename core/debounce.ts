/**
 * 函数去抖
 *
 * @param {Function} func 回调函数
 * @param {Number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */

const debounce = function(fun: Function, delay: number): any {
  let last: any

  return function (this: any) {
    const ctx = this
    const args = arguments

    clearTimeout(last)

    last = setTimeout(function () {
      fun.apply(ctx, args)
    }, delay)
  }
}

export default debounce