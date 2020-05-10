/**
 * 根据相对路径获取绝对路径
 *
 * @param {String} url 相对路径
 * @return {String} 绝对路径
 */

const getAbsoluteUrl = (url: string): string => {
  const a = document.createElement('a')
  a.href = url
  return a.href
}

export default getAbsoluteUrl