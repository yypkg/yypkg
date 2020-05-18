# API 文档

## 通用 Common

### `API()`

基于 [axios](https://github.com/axios/axios) 的 API 管理模块，[`👉详细文档`](./api.md)

### `debounce(fn, delay)`

函数去抖，将触发频繁的事件合并成一次执行，例如防止 `input` 事件短时间内重复触发

* `@version since 1.0.0`
* `@param {Function} fn 回调函数`
* `@param {Number} time 等待多长时间之后执行，单位毫秒`

```js
import debounce from 'yypkg/debounce'

element.addEventListener('click', debounce(submit, 200), false)
function submit(e) { }
```


### `throttle(fn, time)`

函数节流，设置一个阀值，在阀值内，将触发的事件合并成一次执行；且当到达阀值，必定执行一次事件。常用于 `resize`、`scroll` 等事件

* `@version since 1.0.0`
* `@param {Function} fn 回调函数`
* `@param {Number} time 每隔多长时间执行一次，单位毫秒`

```js
import throttle from 'yypkg/throttle'

document.body.addEventListener('scroll', throttle(scroll, 200), false)
function scroll(e) { }
```


### `sleep(time)`

Promise 版的 setTimeout

* `@version since 1.0.0`
* `@param {Number} time 等待多长时间，单位毫秒`

```js
import sleep from 'yypkg/sleep'

await sleep(500)
```


### `clone(x)`

深拷贝

* `@version since 1.0.0`
* `@param {Any} x 需要拷贝的对象`
* `@return {Any} number / array / function / ...`

```js
import clone from 'yypkg/clone'

clone(x)
```

###  `type(x, strict)`

类型检测，弥补typeof获取类型不准确的问题

* `@version since 1.0.0`
* `@param {Any} x 需要检测的对象`
* `@param {Boolean} strict 是否严格模式`
* `@return {String} number / array / function / ...`

```js
import type from 'yypkg/type'

type(x)
```


## 路径 URL

###  `getUrlParam(name, url)`

获取 URL 上参数

* `@version since 1.0.0`
* `@param {String} name 需要获取的参数名`
* `@param {String} url 需要被处理的 url，默认为当前 url`
* `@return {String} 对应的参数字符串`

```js
import getUrlParam from 'yypkg/get-url-param'

const version = getUrlParam('v')
consle.log(version)
// https://yy.com/?v=666
// => '666'
```

###  `getUrlPath()`

获取当前 URL 路径（不带参数）

* `@version since 1.0.0`
* `@return {String} 当前url`

```js
import getUrlPath from 'yypkg/get-url-path'

const path = getUrlPath()
consle.log(path)
// https://yy.com/music/?v=666
// => 'https://yy.com/'
```

###  `getAbsoluteUrl(url)`

根据相对路径获取绝对路径

* `@version since 1.0.0`
* `@param {String} url 相对路径`
* `@return {String} 当前绝对路径`

```js
import getAbsoluteUrl from 'yypkg/get-absolute-url'

const absUrl = getAbsoluteUrl('/img/logo.png')
consle.log(absUrl)
// https://yy.com/music/index.html
// => 'https://yy.com/img/logo.png'
```


## 浏览器 Browser

###  `getUserAgent()`

获取浏览器用户代理字符串，返回小写

* `@version since 2.0.0`
* `@return {String} 浏览器userAgent`

```js
import getUserAgent from 'yypkg/get-user-agent'

const ua = getUserAgent()
consle.log(ua)
// => 'mozilla/5.0 (macintosh; intel mac os x 10_15_4) applewebkit/537.36 (khtml, like gecko) chrome/81.0.4044.138 safari/537.36'
```

###  `getFirstBrowserLanguage()`

获取浏览器设置的第一语言

* `@version since 1.0.0`
* `@return {String} 浏览器第一语言名称，未知返回 'unknown'`

```js
import getFirstBrowserLanguage from 'yypkg/get-first-browser-language'

const lang = getFirstBrowserLanguage()
consle.log(lang)
// => 'zh'
```

###  `getBilingual()`

获取中英文双语情景下的浏览器语言，跟 `getFirstBrowserLanguage()` 不同的是，该方法返回结果只有两种，中文（含繁体）统一返回 `zh`，其他情况（含获取到未知）统一返回 `en`；

* `@version since 2.0.4`
* `@return {String} 中文（含繁体）统一返回 'zh'，其他情况（含获取到未知）统一返回 'en'`

```js
import getBilingual from 'yypkg/get-bilingual'

const lang = getBilingual()
consle.log(lang)
// => 'zh'
```

###  `getIEVersion()`

获取IE浏览器的版本号

* `@version since 1.0.0`
* `@return {Number} IE浏览器的版本号，获取失败返回 -1`

```js
import getIEVersion from 'yypkg/get-ie-version'

const ie = getIEVersion()
consle.log(ie)
// => 10
```

###  `getVendor()`

获取浏览器供应商的名称

* `@version since 2.0.0`
* `@return {string} 浏览器供应商的名称`

```js
import getVendor from 'yypkg/get-vendor'

const vendor = getVendor()
consle.log(vendor)
// => 'google inc.'
```


## 格式化 Format

###  `createUUID(n)`

生成随机的唯一标识号uuid

* `@version since 2.0.0`
* `@param {Number} n 标识号的位数`
* `@return {String} 唯一标识号`

```js
import createUUID from 'yypkg/create-uuid'

const uid = createUUID(12)
consle.log(uid)
// => 'emXApUrWb4Lk'
```

###  `randomColor()`

生成随机的Hex颜色值

* `@version since 1.0.0`
* `@return {String} Hex颜色值，六位，不带井号`

```js
import randomColor from 'yypkg/random-color'

const color = randomColor()
consle.log(color)
// => 'b79d9c'
```

###  `trimSpace(str)`

字符串裁去空格

* `@version since 1.0.0`
* `@param {String} str 被处理的字符串`
* `@return {String}`

```js
import trimSpace from 'yypkg/trim-space'

const strings = trimSpace('Java Script')
consle.log(strings)
// => 'JavaScript'
```

###  `dateFormat(date, format)`

简易的时间格式化

* `@version since 1.4.0`
* `@param {Date} date 时间`
* `@param {String} format 格式模板`
* `@return {String}`

```js
import dateFormat from 'yypkg/date-format'

const now = new Date()
const dataTime = dateFormat(now, 'YYYY-MM-DD hh:mm:ss')
consle.log(dataTime)
// => '2020-04-22 16:41:38'
```

###  `thousandsDot(num)`

对数字进行千分位逗号的格式化

* `@version since 1.4.1`
* `@param {Number} num 数字`
* `@return {String}`

```js
import thousandsDot from 'yypkg/thousands-dot'

const price = thousandsDot(1234567890)
consle.log(price)
// => '1,234,567,890'
```

###  `padZero(num, digits)`

对数字的前缀补充零位

* `@version since 1.4.1`
* `@param {Number} num 需要处理的数字`
* `@param {Number} digits 位数`
* `@return {String}`

```js
import padZero from 'yypkg/pad-zero'

const count = padZero(6, 3)
consle.log(count)
// => '006'
```

###  `numberRange(num, options)`

设置数值范围并返回结果

* `@version since 1.11.0`
* `@param {Number} num 需要处理的数值`
* `@param {Object} options 配置选项`
* `@return {Number}`

```js
import numberRange from 'yypkg/number-range'

const range = numberRange(6, { min: 7 })
consle.log(range)
// => 7

const range1 = numberRange(20, { min: 5, max: 15 })
consle.log(range1)
// => 15

const range2 = numberRange(10, { min: 15, max: 5 })
consle.log(range2)
// => 10 自动调整区间

const range3 = numberRange(10, { min: 'test', max: 15 })
consle.log(range3)
// => NaN 非法输入
```

###  `compareVersion(a, b)`

简单对比版本号

如 a > b, 返回 1；
如 a = b, 返回 0；
如 a < b, 返回 -1；

* `@version since 1.4.1`
* `@param {String} a 版本号1`
* `@param {String} b 版本号2`
* `@return {Number}`


```js
import compareVersion from 'yypkg/compare-version'

const isUpate = compareVersion('1.2.0', '1.4.5')
consle.log(isUpate)
// => -1
```

###  `stringToDOMElement(string)`

原生字符串转为 DOM 元素

* `@version since 1.4.1`
* `@param {String} string 字符串`
* `@return {DOMElement}`

```js
import stringToDOMElement from 'yypkg/string-to-domelement'

const element = stringToDOMElement('test')
consle.log(element)
// => "test"
```


## 微信 WeChat

###  `wechatSDK(options)`

微信JS SDK

* `@version since 1.11.4`
* `@param {Object} options 配置选项`
* `@return {Promise}`

#### `options` 参数配置

```js
import wechatSDK from 'yypkg/wechat-sdk'

wechatSDK({
  debug: true, // 是否开启微信调试 debug 模式
  signatureApiURL: 'xxx', // 更换 签名服务接口地址，默认为 //api.yoyiapp.com/wx/jssdk/signature
  jsApiList: [], // 微信 API 申请列表，默认为 ['onMenuShareTimeline', 'onMenuShareAppMessage']
})
```

#### `share` 分享方法

```js
import wechatSDK from 'yypkg/wechat-sdk'

wechatSDK.share({
  title: '分享标题',
  desc: '分享描述',
  link: 'xxx', // 默认值为 window.location.href
  imgUrl: '缩略图'
})
```

#### [wx](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115) 实例对象

```js
import wechatSDK from 'yypkg/wechat-sdk'

(async () => {
  const wx = await wechatSDK()

  wx.ready(function () {
    alert('ok')
  })
})
```

#### 内置支持域名

* `*.yy.com`
* `*.yoyiapp.com`


###  `wechatResetFontSize()`

微信禁止缩放网页字体

* `@version since 2.0.0`

```js
import wechatResetFontSize from 'yypkg/reset-wechat-font-size'

wechatResetFontSize()
```


## 资源 Resources

###  `loadScript(url, retry)`

动态加载JavaScript脚本

* `@version since 1.4.1`
* `@param {String} url 脚本的url`
* `@param {Integer} retry 加载失败时重试的次数，大于等于1的正整数`
* `@return {Promise} true 为最终加载成功，false 为最终加载失败`

```js
import loadScript from 'yypkg/load-script'

(async () => {
  const isScriptReady = await loadScript('https://abc.com/js/main.js')
  consle.log(isScriptReady)
  // => true
})
```

###  `loadStyle(url, retry)`

动态加载CSS样式表

* `@version since 1.4.1`
* `@param {String} url CSS样式表的url`
* `@param {Integer} retry 加载失败时重试的次数，大于等于1的正整数`
* `@return {Promise} true 为最终加载成功，false 为最终加载失败`

```js
import loadStyle from 'yypkg/load-style'

(async () => {
  const isStyleReady = await loadStyle('https://abc.com/css/main.css')
  consle.log(isStyleReady)
  // => true
})
```

###  `loadStyleText(cssText)`

动态插入 CSS 文本样式

* `@version since 1.4.1`
* `@param {String} cssText 文本样式`

```js
import loadStyleText from 'yypkg/load-style-text'

const cssText = `
.content {
  font-size: 20px;
}
`
loadStyleText(cssText)
```

###  `sourceLoader(opotions)`

资源加载器，常用于资源预加载，支持的资源有：css、js、img（jpg、jpeg、png、gif、webp、mbp）、svga

* `@version since 1.10.0`

#### 基本使用

```js
import SourceLoader from 'yypkg/source-loader'

const resources = ['./demo.css', './demo.js']
const loader = new SourceLoader({
  url: resources,
  retry: 3,
})
loader.start()
loader.$on('process', (total, count, url) => {
  console.log(total, count, url)
})
loader.$on('complete', (total) => {
  console.log('total', total)
})
loader.$on('error', (url) => {
  console.error('加载失败', url)
})
```

👉 **点击查看** [详细文档](./source-loader.md)


###  `progressController(opotions)`

进度控制器，常用于更灵活控制页面加载的进度百分比，可模拟逼真的web页面加载进度

* `@version since 1.10.0`
* `@param {Number || Array} from 设置进度起始位置`
* `@param {Number || Array} to 设置进度结束位置`
* `@param {Number || Array} increment 每次更新的递增量`
* `@param {Number || Array} rate 更新频率，即多久更新一次，单位ms`
* `@return {Function} ProgressController`

#### 基本使用

```js
import ProgressController from 'yypkg/progress-controller'

// 初始配置
let progress = new ProgressController()

progress.start({
  increment: 1,
  rate: 30,
})

// 设置进度到100%
progress.complete(()=>{
  console.log('加载完毕')
})

// 进度加载事件
progress.$on('process', (currentProgress)=>{
  console.log(`当前进度是${currentProgress}`)
})
```

👉 **点击查看** [详细文档](./progress-controller.md)


###  `forceReload()`

强制刷新页面。背景：在某些浏览器内web缓存比较顽固，用自带的刷新有时也不能按预期生效。故强制在url带上随机参数进行刷新

* `@version since 2.0.0`

```js
import forceReload from 'yypkg/force-reload'

forceReload()
```


###  `mocha`

Mocha 是一个出名的 **测试框架**，对于一些前端 Web 项目，我们可以通过 Mocha 进行基本的 BDD 测试

* `@version since 1.4.0`

```js
import mocha from 'yypkg/mocha'

function add (x, y) {
  return x + y
}

mocha(async function () {
  const { expect } = chai

  describe('加法函数的测试', () => {
    it('1 加 1 应该等于 2', () => {
      expect(add(1, 1)).to.be.equal(2)
    })
  })
})
```

👉 **点击查看** [更多关于 Mocha 的使用](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)


## 检测 Detect

**`is` 开头的检测类都是使用变量调用，返回 `boolean`**

###  `isWechatBrowser`

判断是否为微信浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isWechatBrowser from 'yypkg/is-wechat-browser'

console.log( isWechatBrowser )
// => true
```

###  `isQQBrowser`

判断是否为 QQ 浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isQQBrowser from 'yypkg/is-qq-browser'

console.log( isQQBrowser )
// => true
```

###  `isWeiboBrowser`

判断是否为微博浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isWeiboBrowser from 'yypkg/is-weibo-browser'

console.log( isWeiboBrowser )
// => true
```


###  `isAndroid`

判断是否为 Android 系统

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isAndroid from 'yypkg/is-android'

console.log( isAndroid )
// => true
```

###  `isAndroidPhone`

判断是否为 Android 系统的手机设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isAndroidPhone from 'yypkg/is-android-phone'

console.log( isAndroidPhone )
// => true
```

###  `isAndroidTablet`

判断是否为 Android 系统的平板设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isAndroidTablet from 'yypkg/is-android-tablet'

console.log( isAndroidTablet )
// => false
```

###  `isiOS`

判断是否为 iOS 系统

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isiOS from 'yypkg/is-ios'

console.log( isiOS )
// => true
```

###  `isiPhone`

判断是否 iOS 系统的 iphone 手机设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isiPhone from 'yypkg/is-iphone'

console.log( isiPhone )
// => true
```

###  `isiPhoneX`

判断是否为 iPhoneX

* `@version since 1.1.0`
* `@return {Boolean} true | false`


```js
import isiPhoneX from 'yypkg/is-iphonex'

console.log( isiPhoneX )
// => false
```

###  `isiPad`

判断是否为 iPad

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isiPad from 'yypkg/is-ipad'

console.log( isiPad )
// => false
```

###  `isiPod`

判断是否为 iPod

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isiPod from 'yypkg/is-ipod'

console.log( isiPod )
// => false
```

###  `isBlackberry`

判断是否为黑莓设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isBlackberry from 'yypkg/is-blackberry'

console.log( isBlackberry )
// => false
```

###  `isMobile`

判断是否为移动手机设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isMobile from 'yypkg/is-mobile'

console.log( isMobile )
// => false
```

###  `isTablet`

判断是否为平板设备

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isTablet from 'yypkg/is-tablet'

console.log( isTablet )
// => false
```

###  `isWindowsPhone`

判断是否为 Windows 手机

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isWindowsPhone from 'yypkg/is-windows-phone'

console.log( isWindowsPhone )
// => false
```

###  `isWindowsTablet`

判断是否为 Windows 平板

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isWindowsTablet from 'yypkg/is-windows-phone'

console.log( isWindowsTablet )
// => false
```

###  `isChrome`

判断是否为 Chrome 浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isChrome from 'yypkg/is-chrome'

console.log( isChrome )
// => true
```

###  `isEdge`

判断是否为 Edge 浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isEdge from 'yypkg/is-edge'

console.log( isEdge )
// => true
```

###  `isIE`

判断是否为 IE 浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isIE from 'yypkg/is-ie'

console.log( isIE )
// => true
```

###  `isSafari`

判断是否为 Safari 浏览器

* `@version since 1.0.0`
* `@return {Boolean} true | false`


```js
import isSafari from 'yypkg/is-safari'

console.log( isSafari )
// => true
```


## 交互 UX

###  `scrollToTop`

滑动返回顶部

* `@version since 1.14.0`
* `@param {Number} scrollY 获取顶部的距离，默认值 0`
* `@param {Number} time 动画时长，默认值 200 毫秒`
* `@return {Null}`

```js
import scrollToTop from 'yypkg/scroll-to-top'

scrollToTop()
```
