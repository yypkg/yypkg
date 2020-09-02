# 更新日志

## v2.0.12

### 修复

* 修复 `wechatSDK` 的 `openTagList` 默认参数

## v2.0.10

### 优化

* 优化 `wechatSDK`，支持 `openTagList` 参数，默认为 `['wx-open-launch-app', 'wx-open-launch-weapp']`

## v2.0.9

### 优化

* 优化 `deepMerge` ts 声明

## v2.0.8

### 新增

* 新增 `Tween` 线性运动函数

### 优化

* 优化 `SourceLoader`、 `ProgressController` 源码

## v2.0.7

### 新增

* 新增 `removeUrlParam()` 方法移除url的参数


## v2.0.6

### 新增

* 新增 `setUrlParam()` 方法设置/新增url的参数

### 优化

* `debounce()`方法增加参数指定是否立即执行


## v2.0.5

### 新增

* 新增 `deepMerge()` 方法合并对象，支持深度合并
* 添加 typescript-eslint 检测

### 改变

* `wechatSDK` 移除 `yoyi` 域名签名服务，默认使用 `fimo` 签名

## v2.0.4

### 新增

* 新增 `getBilingual()` 方法获取双语情景下的语言

## v2.0.3

### 修复

* 修复部分ES6方法的支持

### 优化

* 代码通过 ESLint 检测
* 优化 TS 类型声明

## v2.0.2

### 修复

* 支持 `noImplicitThis` 为 true

## v2.0.0

### 改变

* 升级支持 TypeScript
* 规范化文件名和函数名

## v1.14.0

### 新增

* `fcsdk` 兼容 FIMO SDK 注入时机问题

## v1.13.0

### 新增

* 回到顶部 `scrollToTop`

## v1.12.6

### 修复

* API 新版本 axios get 请求参数失效问题

## v1.12.5

### 更新

* load-style 与 load-script 模块更新，新增失败后重试的功能

## v1.12.4

### 更新

* 微信分享 sdk 脚本版本升级

## v1.12.3

### 修复

* 微信分享 sdk 脚本不固定协议

## v1.12.2

### 新增

* FIMO 服务号主体的微信 JSSDK 签名服务

## v1.11.4

### 改变

* 微信 JSSDK 签名服务域名

## v1.11.3

### 改变

* API 拦截器 `interceptor:beforeResolveOptions` 独立局部 `namedOptions`
* API 实例 Sender 保留 `options` 配置

## v1.11.2

### 修复

* `yypkg/is-iPhoneX` 调用问题

## v1.11.1

### 修复

* `yypkg/wxjssdk` 微信 JSSDK 请求协议问题

## v1.11.0

### 增加

* `yypkg/number-range` 设置数值范围并返回结果
* `yypkg/get-url-path` 获取当前 URL 路径（不带参数）
* `yypkg/wx-reload` 微信里刷新页面

## v1.10.1

### 增加

* `yypkg/wxjssdk` 微信 JSSDK

## v1.9.5

### 增加

* `yypkg/source-loader` 新增资源加载器
* `yypkg/progress-controller` 新增进度控制器

## v1.9.3

### 修复

* `yypkg/api` options 设置默认值
* `yypkg/api` beforeResolveOptions 无回调报错问题

## v1.9.1

### 修复

* `yypkg/api` response statusText 为空

## v1.9.0

### 更新

* `yypkg/api` 增加 `RESTful` 配置项（[详细](./docs/api.md#RESTful-调用)）

## v1.8.0

### 更新

* `yypkg/api` 增加 `throttle` 配置项，可设置节流时间

## v1.7.1

### 更新

* `yypkg/mocha` Mocha 测试 增加【关闭面板】按钮

## v1.7.0

### 增加

* `yypkg/loadStyleText` CSS 文本插入文档 Style 元素
* `yypkg/mocha` Mocha 测试（[详细](./docs/mocha.md)）

## v1.6.9

### 修复

* `yypkg/api` axios engine，POST - options.data 兼容
* `yypkg/api` axios engine，JOSNP - options.data 兼容
* `yypkg/api` history recorder

## v1.6.2

### 更新

* `yypkg/api` 拦截器 `beforeResolveOptions` 参数优化 `namedOptions`

## v1.6.0

### 更新

* `yypkg/api` [使用方法](./docs/api.md)

## v1.5.1

### 修复

* `yypkg/api` JSONP 参数丢失问题

## v1.5.0

### 增加

* `yypkg/trimSpace` 字符串裁去空格
* `yypkg/isParentElement` 判断某个 DOM 元素是否为另一元素的父元素
* `yypkg/randomColor` 随机颜色值
* `yypkg/compareVersion`简单对比版本号
* `yypkg/stringToDOMElement` 原生字符串转为 DOM 元素
* `yypkg/padZero` 前缀补充零位

## v1.4.1

### 修复

* `yypkg/thousandsDot` number 参数无效问题

## v1.4.0

### 增加

* `yypkg/dateFormat` 简单格式化日期
* `yypkg/thousandsDot` 千分位逗号

## v1.3.0

### 增加

* `yypkg/clone` 深拷贝
* `yypkg/type` 准确的类型检测

## v1.2.0

### 增加

* `yypkg/uuid` 生成唯一标识码字符串

## v1.1.0

### 增加

* `yypkg/isiPhoneX` 判断是否 iPhoneX+
