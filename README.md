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

若你正在使用 [LegoFlow](https://legoflow.com/) 工作流，可配置在 `webpack.include.exnext` 选项 ↓

```yml
webpack:
  include:
    esnext:
      - ./node_modules/yypkg
```

## 许可

[MIT](./LICENSE)
