/**
 * 微信 JS SDK
 *
 * @param {Object} options 配置选项
 * @return {Promise}
 *
 */
import loadScript from './load-script'

const requestSignature = url => {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest()
    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)

        if (data.signature && data.nonceStr) {
          resolve(data)
        } else {
          reject(new Error('service signature error'))
        }
      } else if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status !== 200) {
        reject(new Error('service error'))
      }
    }

    xhr.send()
  })
}

const WXJSSDK = function (options = {}) {
  return new Promise((resolve, reject) => {
    loadScript('//res.wx.qq.com/open/js/jweixin-1.4.0.js').then(() => {
      const successReturn = data => {
        window.wx.config({
          debug: options.debug || false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: options.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })

        resolve(window.wx)
      }

      const failReturn = error => {
        reject(error)
      }

      if (!options.signatureApiURL) {
        const url1 = !options.isFIMO ? '//server.yoyiapp.com/wxjssdk/' : '//server.yoyiapp.com/fimo-wxjssdk/'
        const url2 = !options.isFIMO ? '//server-test.yoyiapp.com/wxjssdk/' : '//server-test.yoyiapp.com/fimo-wxjssdk/'

        const URL1 = `${window.location.protocol === 'http:' ? 'http:' : 'https:'}${url1}`
        const URL2 = `${window.location.protocol === 'http:' ? 'http:' : 'https:'}${url2}`

        requestSignature(URL1).then(successReturn).catch(() => {
          requestSignature(URL2).then(successReturn).catch(failReturn)
        })
      } else {
        requestSignature(options.signatureApiURL).then(successReturn).catch(failReturn)
      }
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

WXJSSDK.FIMOShare = function ({ title, desc, link = window.location.href, imgUrl }) {
  WXJSSDK({ isFIMO: true }).then(wx => {
    wx.ready(function () {
      wx.onMenuShareTimeline({ title, desc, link, imgUrl })
      wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
    })
  })
}

export default WXJSSDK
