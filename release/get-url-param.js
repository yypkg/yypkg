/**
 * 获取 url 中指定参数的值
 * @param {string} name 需要获取的参数名
 * @param {string} url 需要被处理的 url，默认为当前 url
 * @return {string} 对应的参数值
 */
function getUrlParam (name, url) {
  const paramReg = new RegExp('[\\?&#]' + name + '=([^&#]+)', 'gi')
  const paramMatch = decodeURIComponent(url || window.location.href).match(paramReg)

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
