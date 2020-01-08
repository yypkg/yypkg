/**
 * 动态加载样式表
 *
 * @param {String} url
 * @param {Integer} retry 加载失败时重试的次数，大于等于1的正整数
 * @return {Promise} true为最终加载成功，false为最终加载失败
 */

const fetch = (url, retry, resolve)=> {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  link.onload = ()=> {
    resolve(true)
  }
  link.onerror = link.ontimeout = async ()=> {
    if(retry && typeof retry === 'number' && retry >= 1) {
      fetch(url, retry - 1, resolve)
    } else {
      resolve(false)
    }
  }
  window.document.head.appendChild(link)
}

function loadStyle(url, retry) {
  return new Promise((resolve) => {
    fetch(url, retry, resolve)
  })
}

export default loadStyle