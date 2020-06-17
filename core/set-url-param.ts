/**
 * 设置/追加 URL 参数
 *
 * @param {String} uri 需要被处理的 url
 * @param {String} key 需要设置或添加的参数的 key
 * @param {String} value 需要设置或添加的参数的 value
 * @return {String} 返回被处理后的新的 url
 */

const setURIParam = (uri: string, key: string, value: string): string => {
  return uri
    .replace(new RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'), '&' + key + '=' + encodeURIComponent(value))
    .replace(/^([^?&]+)&/, '$1?')
}

export default setURIParam