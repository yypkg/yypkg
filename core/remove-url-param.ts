/**
 * 移除 url 中指定的参数（键值）
 *
 * @param {String} url 需要被处理的 url
 * @param {String} key 需要移除的参数的 name
 * @return {String} 返回移除指定参数后的 url
 */

const removeUrlParam = (url: string, key: string): string => {
  return url
    .replace(new RegExp('[?&]' + key + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + key + '=[^&]*&'), '$1')
}

export default removeUrlParam
