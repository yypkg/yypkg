/**
 * 函数节流
 *
 * @param {Function} func 回调函数
 * @param {Number} time 每隔多长时间执行一次
 * @return {Function}
 */

const throttle = function (func: Function, time: number): Function {
  let context: any
  let args: any
  let timeout: any
  let result: any
  let previous: number = 0

  let later = function () {
    previous = new Date().getTime()
    timeout = null
    result = func.apply(context, args)
  }

  return function () {
    const now = new Date().getTime()
    const remaining = time - (now - previous)

    context = this
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
