/**
 * 函数节流
 *
 * @param {Function} func 回调函数
 * @param {number} time 每隔多长时间执行一次
 * @return {Function}
 */
const throttle = function (func, time) {
  let context, args, timeout, result
  let previous = 0

  let later = function () {
    previous = new Date()
    timeout = null
    result = func.apply(context, args)
  }

  return function () {
    const now = new Date()
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
