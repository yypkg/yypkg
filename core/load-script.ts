/**
 * 动态加载脚本
 *
 * @param {String} url
 * @param {Integer} retry 加载失败时重试的次数，大于等于1的正整数
 * @return {Promise} true为最终加载成功，false为最终加载失败
 */

const fetch = (url: string, resolve: (value: any) => void, retry?: number): void => {
  const script: any = document.createElement('script')
  script.src = url
  script.onload = ()=> {
    resolve(true)
  }
  script.onerror = script.ontimeout = ()=> {
    if(retry && typeof retry === 'number' && retry >= 1) {
      fetch(url, resolve, retry - 1)
    } else {
      resolve(false)
    }
  }
  window.document.head.appendChild(script)
}

const loadScript = (url: string, retry?: number): Promise<boolean> => {
  return new Promise((resolve) => {
    fetch(url, resolve, retry)
  })
}

export default loadScript