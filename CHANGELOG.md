# 1.11.1

## 修复

* `yypkg/wxjssdk` 微信 JSSDK 请求协议问题

# 1.11.0

## 增加

* `yypkg/number-range` 设置数值范围并返回结果
* `yypkg/get-url-path` 获取当前 URL 路径（不带参数）
* `yypkg/wx-reload` 微信里刷新页面

# 1.10.1

## 增加

* `yypkg/wxjssdk` 微信 JSSDK

# 1.9.5

## 增加

* `yypkg/source-loader` 新增资源加载器
* `yypkg/progress-controller` 新增进度控制器

# 1.9.3

## 修复

* `yypkg/api` options 设置默认值
* `yypkg/api` beforeResolveOptions 无回调报错问题

# 1.9.1

## 修复

* `yypkg/api` response statusText 为空

# 1.9.0

## 更新

* `yypkg/api` 增加 `RESTful` 配置项（[详细](./docs/api.md#RESTful-调用)）

# 1.8.0

## 更新

* `yypkg/api` 增加 `throttle` 配置项，可设置节流时间

# 1.7.1

## 更新

* `yypkg/mocha` Mocha 测试 增加【关闭面板】按钮

# 1.7.0

## 增加

* `yypkg/loadStyleText` CSS 文本插入文档 Style 元素
* `yypkg/mocha` Mocha 测试（[详细](./docs/mocha.md)）

# 1.6.9

## 修复

* `yypkg/api` axios engine，POST - options.data 兼容
* `yypkg/api` axios engine，JOSNP - options.data 兼容
* `yypkg/api` history recorder

# 1.6.2

## 更新

* `yypkg/api` 拦截器 `beforeResolveOptions` 参数优化 `namedOptions`

# 1.6.0

## 更新

* `yypkg/api` [使用方法](./docs/api.md)

# 1.5.1

## 修复

* `yypkg/api` JSONP 参数丢失问题

# 1.5.0

## 增加

* `yypkg/trimSpace` 字符串裁去空格
* `yypkg/isParentElement` 判断某个 DOM 元素是否为另一元素的父元素
* `yypkg/randomColor` 随机颜色值
* `yypkg/compareVersion`简单对比版本号
* `yypkg/stringToDOMElement` 原生字符串转为 DOM 元素
* `yypkg/padZero` 前缀补充零位

# 1.4.1

## 修复

* `yypkg/thousandsDot` number 参数无效问题

# 1.4.0

## 增加

* `yypkg/dateFormat` 简单格式化日期
* `yypkg/thousandsDot` 千分位逗号

# 1.3.0

## 增加

* `yypkg/clone` 深拷贝
* `yypkg/type` 准确的类型检测

# 1.2.0

## 增加

* `yypkg/uuid` 生成唯一标识码字符串

# 1.1.0

## 增加

* `yypkg/isiPhoneX` 判断是否 iPhoneX+
