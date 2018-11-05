/**
 * 动态加载脚本
 *
 * @param {String} url
 * @return {Promise}
 */
const loadScript = function (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = url

    script.onload = resolve
    script.onerror = reject

    window.document.head.appendChild(script)
  })
}

export default loadScript
