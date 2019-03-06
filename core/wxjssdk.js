/**
 * 微信 JS SDK
 *
 * @param {Object} options 配置选项
 * @return {Promise}
 *
 * 参考：https://github.com/harmankang/Lab62
 */
import loadScript from './load-script'

const WXJSSDK = function (options = {}) {
  return new Promise((resolve, reject) => {
    loadScript('https://res.wx.qq.com/open/js/jweixin-1.2.0.js').then(() => {
      const xhr = new window.XMLHttpRequest()
      const api = options.api ? options.api : `${window.location.protocol === 'http:' ? 'https:' : 'https:'}//api.yoyiapp.com/wx/jssdk/signature`

      xhr.open('POST', api, true)

      xhr.onreadystatechange = function () {
        if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)

          window.wx.config({
            debug: options.debug || false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: options.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage']
          })

          resolve(window.wx)
        } else if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status !== 200) {
          reject(new Error('service error'))
        }
      }

      xhr.send()
    })
  })
}

WXJSSDK.share = function ({ title, desc, link = window.location.href, imgUrl }) {
  WXJSSDK().then(wx => {
    wx.ready(function () {
      wx.onMenuShareTimeline({ title, desc, link, imgUrl })
      wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
    })
  })
}

export default WXJSSDK
