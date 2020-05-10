/**
 * 微信禁止缩放网页字体
 */

// for Android
function resetFontSize () {
  // 设置网页字体为默认大小
  window.setTimeout(() => {
    window.WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
  }, 0)
  // 重写设置网页字体大小的事件
  window.WeixinJSBridge.on('menu:setfont', () => {
    window.WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
  })
}

const wechatResetFontSize = (): void => {
  if (typeof window.WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', (e) => {
      resetFontSize()
    })
  } else {
    resetFontSize()
  }

  // for iOS
  const rootElement = document.querySelector('html, body') as HTMLElement
  if (rootElement) {
    rootElement.style.cssText = `
      -webkit-text-size-adjust: 100% !important;
      text-size-adjust: 100% !important;
    `
  }
}

export default wechatResetFontSize
