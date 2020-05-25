/**
 * 动态加载样式表
 *
 * @param {String} url
 * @param {Integer} retry 加载失败时重试的次数，大于等于1的正整数
 * @return {Promise} true为最终加载成功，false为最终加载失败
 */

const fetch = (url: string, resolve: (value: any) => void, retry?: number): void => {
  const link: any = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  link.onload = ()=> {
    resolve(true)
  }
  link.onerror = link.ontimeout = ()=> {
    if(retry && typeof retry === 'number' && retry >= 1) {
      fetch(url, resolve, retry - 1)
    } else {
      resolve(false)
    }
  }
  window.document.head.appendChild(link)
}

const loadStyle = (url: string, retry?: number): Promise<boolean> => {
  return new Promise((resolve) => {
    fetch(url, resolve, retry)
  })
}

export default loadStyle
