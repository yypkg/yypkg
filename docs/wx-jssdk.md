# 微信 JSSDK

## 获取 `wx` 实例

关于 [wx](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115) 实例

```js
import WXJSSDK from 'yypkg/wxjssdk'

(async () => {
  const wx = await WXJSSDK()

  wx.ready(function () {
    alert('ok')
  })
})
```

### 参数

```js
WXJSSDK({
  debug: true, // 是否开启微信调试 debug 模式
  signatureApiURL: 'xxx', // 更换 签名服务接口地址，默认为 //api.yoyiapp.com/wx/jssdk/signature
  jsApiList: [], // 微信 API 申请列表，默认为 ['onMenuShareTimeline', 'onMenuShareAppMessage']
})
```

## 简易分享

```js
import WXJSSDK from 'yypkg/wxjssdk'

WXJSSDK.share({
  title: '分享标题',
  desc: '分享描述',
  link: 'xxx', // 默认值为 window.location.href
  imgUrl: '缩略图'
})
```

## 支持域名

* `*.yy.com`
* `*.yoyiapp.com`
