/**
 * 获取当前 URL 路径（不带参数）
 *
 * @return {String} 路径
 */
function getUrlPath () {
  return `${window.location.origin}${window.location.pathname}`
}

export default getUrlPath
