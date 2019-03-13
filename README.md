# YY.PKG

常用工具库集合，包括

- [x] 基于 [axios](https://github.com/axios/axios) 的 API 管理模块（[详细](./docs/api.md)）
- [x] 去抖 `debounce`（[详细](./core/debounce.js)）
- [x] 节流 `throttle`（[详细](./core/throttle.js)）
- [x] `sleep`（[详细](./core/sleep.js)）
- [x] 获取 URL 上参数 `getUrlParam`（[详细](./core/get-url-param.js)）
- [x] 动态加载 JS 脚本 `loadScript`（[详细](./core/load-script.js)）
- [x] 动态加载 Style 样式 `loadStyle`（[详细](./core/load-style.js)）
- [x] 获取 URL 绝对路径 `getAbsoluteUrl`
- [x] 获取 navigator appVersion `getAppVersion`
- [x] 获取 IE 浏览器版本号 `getIEVersion`
- [x] 获取 navigator userAgent `getUserAgent`
- [x] 获取 navigator vendor `getVendor`
- [x] 判断是否安卓手机 `isAndroidPhone`
- [x] 判断是否安卓平板 `isAndroidTablet`
- [x] 判断是否安卓设备 `isAndroid`
- [x] 判断是否黑莓设备 `isBlackberry`
- [x] 判断是否 Chrome 浏览器 `isChrome`
- [x] 判断是否 Edge 浏览器 `isEdge`
- [x] 判断是否 IE 浏览器 `isIE`（[详细](./core/is-ie.js)）
- [x] 判断是否 iOS 设备 `isiOS`
- [x] 判断是否 iPad `isiPad`
- [x] 判断是否 iPhone `isiPhone`
- [x] 判断是否 iPhoneX+ `isiPhoneX`（[详细](./core/is-iPhoneX.js)）
- [x] 判断是否 iPod `isiPod`
- [x] 判断是否手机设备 `isMobile`
- [x] 判断是否平板设备 `isTablet`
- [x] 判断是否 Safari 浏览器 `isSafari`
- [x] 判断是否 Windows 手机 `isWindowsPhone`
- [x] 判断是否 Windows 平板 `isWindowsTablet`
- [x] 判断是否 Windows 设备 `isWindows`
- [x] 判断是否微信浏览器 `isWechatBrowser`
- [x] 判断是否 QQ 浏览器 `isQQBrowser`
- [x] 判断是否微博浏览器 `isWeiboBrowser`
- [x] 生成唯一标识码 `uuid`
- [x] 深拷贝 `clone`（[详细](./core/clone.js)）
- [x] 准确的类型检测 `type`（[详细](./core/type.js)）
- [x] 简单格式化日期 `dateFormat`（[详细](./core/date-format.js)）
- [x] 千分位逗号 `thousandsDot`（[详细](./core/thousands-dot.js)）
- [x] 字符串裁去空格 `trimSpace`
- [x] 判断某个 DOM 元素是否为另一元素的父元素 `isParentElement`（[详细](./core/is-parent-element.js)）
- [x] 随机颜色值 `randomColor`
- [x] 简单对比版本号 `compareVersion`（[详细](./core/compare-version.js)）
- [x] 原生字符串转为 DOM 元素 `stringToDOMElement`（[详细](./core/string-to-domelement.js)）
- [x] 前缀补充零位 `padZero`（[详细](./core/pad-zero.js)）
- [x] CSS 文本插入文档 Style 元素 `loadStyleText`
- [x] Mocha 测试 `mocha` （[详细](./docs/mocha.md)）
- [x] 资源加载器 `source-loader` （[详细](./docs/source-loader.md)）
- [x] 进度控制器 `progress-controller` （[详细](./docs/progress-controller.md)）
- [x] 微信 JSSDK `wxjssdk` （[详细](./docs/wx-jssdk.md)）
- [x] 设置数值范围并返回结果 `numberRange` （[详细](./core/number-range.js)）

## 更新日志

[CHANGELOG](./CHANGELOG.md)

## 安装

```sh
npm i yypkg

# or

yarn add yypkg
```

## 使用

### 简单使用

```js
import { sleep } from 'yypkg'
```

### Tree-Shaking

```js
import sleep from 'yypkg/sleep'
```

通过该方式引入模块，可大大减少引用体积。

但注意，需要把安装后的 `node_modules/yypkg` 包含在工作流 Babel 编译 include 范围内。

## 发布版本

```sh
npm run release
```

## 许可

[MIT](./LICENSE)
