/**
 * 微信 JS SDK
 *
 * @param {Object} options 配置选项
 * @return {Promise}
 *
 */
import loadScript from './load-script'

const requestSignature = (url: string): Promise<unknown> => {
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

const wechatSDK = (options: any = {}): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    loadScript('//res.wx.qq.com/open/js/jweixin-1.6.0.js', 3).then(() => {
      const successReturn = (data: any) => {
        window.wx.config({
          debug: options.debug || false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: options.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage'],
          openTagList: options.openTagList || ['wx-open-launch-app, wx-open-launch-weapp']
        })

        resolve(window.wx)
      }

      const failReturn = (error: any) => {
        reject(error)
      }

      // 默认使用 fimo 的微信签名
      if (!options.signatureApiURL) {
        const url1 = '//server.yoyiapp.com/fimo-wxjssdk/'
        const url2 = '//server-test.yoyiapp.com/fimo-wxjssdk/'

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

wechatSDK.share = ({ title = '', desc = '', link = window.location.href, imgUrl = '' }): void => {
  wechatSDK().then((wx: any) => {
    wx.ready(function () {
      wx.onMenuShareTimeline({ title, desc, link, imgUrl })
      wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
    })
  })
}

export default wechatSDK
