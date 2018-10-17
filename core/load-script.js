/**
 * 动态加载脚本
 *
 * @param {string} url
 * @return {promise}
 */
const loadScript = function (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = url

    script.onload = resolve
    script.onerror = reject

    window.document.appendChild(script)
  })
}

export default loadScript
