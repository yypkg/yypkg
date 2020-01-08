/**
 * 动态加载脚本
 *
 * @param {String} url
 * @param {Integer} retry 加载失败时重试的次数，大于等于1的正整数
 * @return {Promise} true为最终加载成功，false为最终加载失败
 */

const fetch = (url, retry, resolve)=> {
  const script = document.createElement('script')
  script.src = url
  script.onload = ()=> {
    resolve(true)
  }
  script.onerror = script.ontimeout = async ()=> {
    if(retry && typeof retry === 'number' && retry >= 1) {
      fetch(url, retry - 1, resolve)
    } else {
      resolve(false)
    }
  }
  window.document.head.appendChild(script)
}

function loadScript(url, retry) {
  return new Promise((resolve) => {
    fetch(url, retry, resolve)
  })
}

export default loadScript