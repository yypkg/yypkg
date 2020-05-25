/**
 * 函数节流
 *
 * @param {Function} func 回调函数
 * @param {Number} time 每隔多长时间执行一次
 * @return {Function}
 */

const throttle = function (func: any, time: number): any {
  let context: any
  let args: any
  let timeout: any
  let result: any
  let previous = 0

  const later = function () {
    previous = new Date().getTime()
    timeout = null
    result = func.apply(context, args)
  }

  return function (this: any) {
    const now = new Date().getTime()
    const remaining = time - (now - previous)

    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments

    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}

export default throttle
