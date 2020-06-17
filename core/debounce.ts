 /**
   * 函数去抖
   * 场景：每完成等待某个时间后去执行某函数，只希望执行一次；如输入实时查询、防止重复提交
   *
   * @param {Function} callback 回调函数
   * @param {number} wait 等待 wait 毫秒之后才执行
   * @param {boolean} immediate 是否立即执行
   * @return {Function} 返回
   */

const debounce = (callback: any, wait: number, immediate?: boolean): any => {
  let timeout: any = null
  return function (this: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) {
        callback.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      callback.apply(context, args)
    }
  }
}

export default debounce
