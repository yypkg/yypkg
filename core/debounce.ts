/**
 * 函数去抖
 *
 * @param {Function} fun 回调函数
 * @param {Number} delay 等待 wait 毫秒之后才执行
 * @return {Function}
 */

const debounce = (fun: Function, delay: number): any => {
  let last: any
  return function (this: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ctx = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    clearTimeout(last)

    last = setTimeout(function () {
      fun.apply(ctx, args)
    }, delay)
  }
}

export default debounce