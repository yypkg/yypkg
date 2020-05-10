# 指南

## 介绍

yypkg是一个实用的JavaScript工具函数集合，快速处理各种常见的通用性问题。使用极其简单，支持整体引入和模块化引入。


**Common**

- `api` 基于 [axios](https://github.com/axios/axios) 的 API 管理模块 [`使用`](./docs/api.md)
- `debounce` 函数去抖 [`使用`](#debounce)
- `throttle` 函数节流 [`使用`](#throttle)
- `sleep` Promise 版的 setTimeout [`使用`](#sleep)
- `clone` 深拷贝 [`使用`](#clone)
- `type` 准确的类型检测 [`使用`](#type)


**URL**

- `getUrlParam` 获取 URL 上参数 [`使用`](#getUrlParam)
- `getUrlPath` 获取当前 URL 路径（不带参数）[`使用`](#getUrlPath)
- `getAbsoluteUrl` 获取 URL 绝对路径 [`使用`](#getAbsoluteUrl)


**Browser**

- `getFirstBrowserLanguage` 获取浏览器第一语言 [`使用`](#getFirstBrowserLanguage)
- `getIEVersion` 获取 IE 浏览器版本号 [`使用`](#getIEVersion)


**Format**

- `uuid` 生成唯一标识码 [`使用`](#uuid)
- `randomColor` 生成随机颜色值 [`使用`](#randomColor)
- `trimSpace` 字符串裁去空格 [`使用`](#trimSpace)
- `dateFormat` 简单格式化日期 [`使用`](#dateFormat)
- `thousandsDot` 千分位逗号 [`使用`](#thousandsDot)
- `padZero` 前缀补充零位 [`使用`](#padZero)
- `numberRange` 设置数值范围并返回结果 [`使用`](#numberRange)
- `compareVersion` 简单对比版本号 [`使用`](#compareVersion)
- `stringToDOMElement` 原生字符串转为 DOM 元素 [`使用`](#stringToDOMElement)


**WeChat**

- `wxjssdk` 微信 JSSDK [`使用`](#wxjssdk)
- `WXReload` 微信里刷新页面 [`使用`](#WXReload)


**Resources**

- `loadScript` 动态加载 JS 脚本 [`使用`](#loadScript)
- `loadStyle` 动态加载 Style 样式 [`使用`](#loadStyle)
- `insertStyleText` CSS 文本插入文档 Style 元素 [`使用`](#insertStyleText)
- `sourceLoader` 资源加载器  [`使用`](./docs/source-loader.md)
- `progressController` 进度控制器 [`使用`](./docs/progress-controller.md)
- `mocha` Mocha 测试 [`使用`](./docs/mocha.md)


**Detect**

- `isWechatBrowser` 判断是否为微信浏览器 [`使用`](#isWechatBrowser)
- `isQQBrowser` 判断是否为 QQ 浏览器 [`使用`](#isQQBrowser)
- `isWeiboBrowser` 判断是否为微博浏览器 [`使用`](#isWeiboBrowser)
- `isAndroid` 判断是否为安卓设备 [`使用`](#isAndroid)
- `isAndroidPhone` 判断是否为安卓手机 [`使用`](#isAndroidPhone)
- `isAndroidTablet` 判断是否为安卓平板 [`使用`](#isAndroidTablet)
- `isiOS` 判断是否为 iOS 设备 [`使用`](#isiOS)
- `isiPhone` 判断是否为 iPhone [`使用`](#isiPhone)
- `isiPhoneX` 判断是否为 iPhoneX+ [`使用`](#isiPhoneX)
- `isiPad` 判断是否为 iPad [`使用`](#isiPad)
- `isiPod` 判断是否为 iPod [`使用`](#isiPod)
- `isBlackberry` 判断是否为黑莓设备 [`使用`](#isBlackberry)
- `isMobile` 判断是否为手机设备 [`使用`](#isMobile)
- `isTablet` 判断是否为平板设备 [`使用`](#isTablet)
- `isWindowsPhone` 判断是否为 Windows 手机 [`使用`](#isWindowsPhone)
- `isWindowsTablet` 判断是否为 Windows 平板 [`使用`](#isWindowsTablet)
- `isWindows` 判断是否为 Windows 设备 [`使用`](#isWindows)
- `isChrome`判断是否为 Chrome 浏览器  [`使用`](#isChrome)
- `isEdge` 判断是否为 Edge 浏览器 [`使用`](#isEdge)
- `isIE` 判断是否为 IE 浏览器 [`使用`](#isIE)
- `isSafari` 判断是否为 Safari 浏览器 [`使用`](#isSafari)
- `isParentElement` 判断某个 DOM 元素是否为另一元素的父元素 [`使用`](#isParentElement)


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


::: warning
注意：需要把安装后的 `node_modules/yypkg` 包含在工作流 Babel 编译 include 范围内。
:::


## 更新日志

[CHANGELOG](./CHANGELOG.md)


## 许可

[MIT](./LICENSE)
