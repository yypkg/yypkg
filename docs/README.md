# 指南

## 介绍

yypkg是一个实用的JavaScript工具函数集合，快速处理各种常见的通用性问题。使用极其简单，支持整体引入和模块化引入。

## 文档

[使用文档](https://yypkg.github.io)

## 安装

```sh
yarn add yypkg

# or

npm i yypkg
```

## 使用

### 简单使用

```js
import { sleep } from 'yypkg'

// 等待1秒
await sleep(1000)
```

### Tree-Shaking

```js
import sleep from 'yypkg/sleep'

// 等待1秒
await sleep(1000)
```

通过该方式引入模块，可大大减少引用体积。


## API 目录

**通用 Common**

- `api` 基于 [axios](https://github.com/axios/axios) 的 API 管理模块， [`👉去使用`](https://yypkg.github.io/api.html)
- `debounce` 函数去抖， [`👉去使用`](https://yypkg.github.io/doc.html#debounce-fn-delay)
- `throttle` 函数节流， [`👉去使用`](https://yypkg.github.io/doc.html#throttle-fn-time)
- `sleep` Promise 版的 setTimeout， [`👉去使用`](https://yypkg.github.io/doc.html#sleep-time)
- `clone` 深拷贝， [`👉去使用`](https://yypkg.github.io/doc.html#clone-x)
- `deepMerge` 深度合并对象， [`👉去使用`](https://yypkg.github.io/doc.html#deepmerge-target-source)
- `type` 准确的类型检测， [`👉去使用`](https://yypkg.github.io/doc.html#type-x-strict)


**路径 URL**

- `getUrlParam` 获取 URL 上参数， [`👉去使用`](https://yypkg.github.io/doc.html#geturlparam-name-url)
- `setUrlParam` 设置/追加 URL 参数， [`👉去使用`](https://yypkg.github.io/doc.html#seturlparam-uri-key-value)
- `removeUrlParam` 移除 URL 上指定参数， [`👉去使用`](https://yypkg.github.io/doc.html#removeurlparam-uri-key)
- `getUrlPath` 获取当前 URL 路径（不带参数），[`👉去使用`](https://yypkg.github.io/doc.html#geturlpath)
- `getAbsoluteUrl` 获取 URL 绝对路径， [`👉去使用`](https://yypkg.github.io/doc.html#getabsoluteurl-url)


**浏览器 Browser**

- `getUserAgent` 获取浏览器用户代理字符串， [`👉去使用`](https://yypkg.github.io/doc.html#getuseragent)
- `getFirstBrowserLanguage` 获取浏览器第一语言， [`👉去使用`](https://yypkg.github.io/doc.html#getfirstbrowserlanguage)
- `getIEVersion` 获取 IE 浏览器版本号， [`👉去使用`](https://yypkg.github.io/doc.html#getieversion)
- `getVendor` 获取浏览器供应商的名称， [`👉去使用`](https://yypkg.github.io/doc.html#getvendor)


**格式化 Format**

- `createUUID` 生成唯一标识码， [`👉去使用`](https://yypkg.github.io/doc.html#createuuid-n)
- `randomColor` 生成随机颜色值， [`👉去使用`](https://yypkg.github.io/doc.html#randomcolor)
- `trimSpace` 字符串裁去空格， [`👉去使用`](https://yypkg.github.io/doc.html#trimspace-str)
- `dateFormat` 简单格式化日期， [`👉去使用`](https://yypkg.github.io/doc.html#dateformat-date-format)
- `thousandsDot` 千分位逗号， [`👉去使用`](https://yypkg.github.io/doc.html#thousandsdot-num)
- `padZero` 前缀补充零位， [`👉去使用`](https://yypkg.github.io/doc.html#padzero-num-digits)
- `numberRange` 设置数值范围并返回结果， [`👉去使用`](https://yypkg.github.io/doc.html#numberrange-num-options)
- `compareVersion` 简单对比版本号， [`👉去使用`](https://yypkg.github.io/doc.html#compareversion-a-b)
- `stringToDOMElement` 原生字符串转为 DOM 元素， [`👉去使用`](https://yypkg.github.io/doc.html#stringtodomelement-string)


**微信 WeChat**

- `wechatSDK` 微信 JS SDK， [`👉去使用`](https://yypkg.github.io/doc.html#wechatsdk-options)
- `wechatResetFontSize` 微信重置字体大小（禁用字体缩放）， [`👉去使用`](https://yypkg.github.io/doc.html#wechatresetfontsize)


**资源 Resources**

- `loadScript` 动态加载 JS 脚本， [`👉去使用`](https://yypkg.github.io/doc.html#loadscript-url-retry)
- `loadStyle` 动态加载 Style 样式， [`👉去使用`](https://yypkg.github.io/doc.html#loadstyle-url-retry)
- `loadStyleText` CSS 文本插入文档 Style 元素， [`👉去使用`](https://yypkg.github.io/doc.html#loadstyletext-csstext)
- `SourceLoader` 资源加载器 ， [`👉去使用`](./source-loader.md)
- `ProgressController` 进度控制器， [`👉去使用`](./progress-controller.md)
- `mocha` Mocha 测试， [`👉去使用`](./mocha.md)


**检测 Detect**

- `isWechatBrowser` 判断是否为微信浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#iswechatbrowser)
- `isQQBrowser` 判断是否为 QQ 浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#isqqbrowser)
- `isWeiboBrowser` 判断是否为微博浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#isweibobrowser)
- `isAndroid` 判断是否为安卓设备， [`👉去使用`](https://yypkg.github.io/doc.html#isandroid)
- `isAndroidPhone` 判断是否为安卓手机， [`👉去使用`](https://yypkg.github.io/doc.html#isandroidphone)
- `isAndroidTablet` 判断是否为安卓平板， [`👉去使用`](https://yypkg.github.io/doc.html#isandroidtablet)
- `isiOS` 判断是否为 iOS 设备， [`👉去使用`](https://yypkg.github.io/doc.html#isios)
- `isiPhone` 判断是否为 iPhone， [`👉去使用`](https://yypkg.github.io/doc.html#isiphone)
- `isiPhoneX` 判断是否为 iPhoneX+， [`👉去使用`](https://yypkg.github.io/doc.html#isiphonex)
- `isiPad` 判断是否为 iPad， [`👉去使用`](https://yypkg.github.io/doc.html#isipad)
- `isiPod` 判断是否为 iPod， [`👉去使用`](https://yypkg.github.io/doc.html#isipod)
- `isBlackberry` 判断是否为黑莓设备， [`👉去使用`](https://yypkg.github.io/doc.html#isblackberry)
- `isMobile` 判断是否为手机设备， [`👉去使用`](https://yypkg.github.io/doc.html#ismobile)
- `isTablet` 判断是否为平板设备， [`👉去使用`](https://yypkg.github.io/doc.html#istablet)
- `isWindowsPhone` 判断是否为 Windows 手机， [`👉去使用`](https://yypkg.github.io/doc.html#iswindowsphone)
- `isWindowsTablet` 判断是否为 Windows 平板， [`👉去使用`](https://yypkg.github.io/doc.html#iswindowstablet)
- `isWindows` 判断是否为 Windows 设备， [`👉去使用`](https://yypkg.github.io/doc.html#iswindows)
- `isChrome`判断是否为 Chrome 浏览器 ， [`👉去使用`](https://yypkg.github.io/doc.html#ischrome)
- `isEdge` 判断是否为 Edge 浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#isedge)
- `isIE` 判断是否为 IE 浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#isie)
- `isSafari` 判断是否为 Safari 浏览器， [`👉去使用`](https://yypkg.github.io/doc.html#issafari)

**交互 UX**

- `scrollToTop` 滑动返回顶部， [`👉去使用`](https://yypkg.github.io/doc.html#scrolltotop)


## 更新日志

[CHANGELOG](https://yypkg.github.io/CHANGELOG.html)


## 许可

[MIT](https://github.com/yypkg/yypkg/blob/master/LICENSE)
