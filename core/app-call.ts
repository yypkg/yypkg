/**
 * 唤起 app
 *
 * @param {string} links.ulink universal link
 * @param {string} links.schema URL Schemes 
 * @param {string} links.fallbackUrl Android 使用的 fallback url
 * @since 2.0.13
 */

import isWechatBrowser from './is-wechat-browser'
import isQQBrowser from './is-qq-browser'
import isWeiboBrowser from './is-weibo-browser'
import isiOS from './is-ios'
import isSafari from './is-safari'

let timer: any = 0

// 打开 url schema
function openSchema (schema: string, fallbackUrl: string) {
  // 原生Safari不支持iframe方式打开schemaUrl
  if (isSafari) {
    window.location.href = schema
  } else {
    const iframe = document.createElement('iframe')
    const body = document.body
    iframe.style.cssText = 'display:none;width=0;height=0'
    
    body.appendChild(iframe)
    iframe.src = schema

    pagehide()

    // 1.5s后如果通过schemaUrl打开不成功，就跳到 fallback 链接
    timer = setTimeout(()=> {
      window.location.href = fallbackUrl
    }, 1500)
  }
}

// 页面隐藏时终止跳转
function pagehide () {
  const visibilitychangeList = ['visibilitychange', 'webkitvisibilitychange']
  visibilitychangeList.forEach(eventName => document.addEventListener(eventName, () => {
    const isHidden = document.hidden || (document as any).webkitHidden
    isHidden && clearTimeout(timer)
  }))
  document.addEventListener('pagehide', () => {
    clearTimeout(timer)
  })
}

// 生成样式
function createStyle () {
  const styleList = document.querySelectorAll('style')
  let hasCreateStyle = false
  styleList.forEach((value) => {
    if (value.innerText.indexOf('.app-call-tips') >= 0) {
      hasCreateStyle = true
    }
  })
  if (hasCreateStyle) return
  const head = document.getElementsByTagName('head')[0] || document.documentElement
  const style = document.createElement('style')
  const styleText = `
  .app-call-tips {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
  }
  .app-call-tips::after {
    content: '';
    position: absolute;
    top: 30px;
    right: 60px;
    width: 300px;
    height: 350px;
    background-image: url(https://iovo-oss.yy.com/upload/1599127295965co-NQNbQK.png);
    background-size: 100% 100%;
  }`
  style.innerHTML = styleText
  head.insertBefore(style, null)
}

function createOpenBrowserTips () {
  createStyle()
  const tipsElement: any = document.querySelector('.app-call-tips')
  if (tipsElement) {
    tipsElement.style.display = 'block'
    return
  }
  const tipsDiv = document.createElement('div')
  tipsDiv.setAttribute('class', 'app-call-tips')
  document.body.appendChild(tipsDiv)

  // 点击关闭提示
  tipsDiv.addEventListener('click', () => {
    tipsDiv.style.display = 'none'
  }, false)
}

function appCall(links: {[key: string]: string}) {
  const { ulink, schema, fallbackUrl } = links
  if (isiOS) {
    // iOS 的 QQ、微博全面禁止 ulink 和 schema，显示外部浏览器打开提示
    if (isQQBrowser || isWeiboBrowser) {
      createOpenBrowserTips()
    } else if (ulink) {
      window.location.href = ulink
    } else {
      openSchema(schema, fallbackUrl)
    }
    return
  }

  // Android 的微信、微博显示外部浏览器打开提示
  if (isWechatBrowser || isWeiboBrowser) {
    createOpenBrowserTips()
  } else {
    openSchema(schema, fallbackUrl || ulink)
  }
}

export default appCall
