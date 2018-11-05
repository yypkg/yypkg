/**
 * 动态加载样式
 *
 * @param {String} url
 * @return {Promise}
 */
const loadStyle = function (url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'

    link.href = url

    link.onload = resolve
    link.onerror = reject

    window.document.head.appendChild(link)
  })
}

export default loadStyle
