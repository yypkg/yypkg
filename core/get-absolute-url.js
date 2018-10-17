/**
 * 根据相对路径获取绝对路径
 *
 * @param {string} url 相对路径
 * @return {string} 绝对路径
 */
function getAbsoluteUrl (url) {
  const a = document.createElement('a')

  a.href = url

  return a.href
}

export default getAbsoluteUrl
