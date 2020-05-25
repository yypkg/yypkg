/**
 * 获取 url 中指定参数的值
 *
 * @param {String} name 需要获取的参数名
 * @param {String} url 需要被处理的 url，默认为当前 url
 * @return {String} 对应的参数值
 */

const getUrlParam = (name: string, url: string = window.location.href): string | undefined => {
  const paramReg = new RegExp('[\\?&#]' + name + '=([^&#]+)', 'gi')
  const paramMatch = decodeURIComponent(url).match(paramReg)

  if (paramMatch && paramMatch.length > 0) {
    const paramResult = (paramMatch[paramMatch.length - 1]).split('=')

    if (paramResult && paramResult.length > 1) {
      return paramResult[1]
    }

    return undefined
  }

  return undefined
}

export default getUrlParam