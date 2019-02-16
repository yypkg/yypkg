# SourceLoader

资源加载器，常用于资源预加载，支持的资源有：css、js、img（jpg、jpeg、png、gif、webp、mbp）、svga

## 使用

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

## 配置项 `options`

| 参数名 | 描述 | 类型 | 默认值 |
|-|-|-|-|
| url | 需要加载的资源url | String 或 Array | `''` |
| retry | 加载失败时的重试次数 | Number | `3` |
| autoStart | 是否在实例化时自动执行start() | Boolean | `false` |

## 方法

| 方法名 | 描述 | 参数 |
|-|-|-|
| start | 开始触发资源加载 | 无 |


## 事件

| 事件名 | 描述 | 参数 |
|-|-|-|
| process | 资源加载过程中 | total：资源总数 <br> count：当前加载资源的索引值 <br> url：当前加载资源的url  |
| complete | 资源加载完毕（无论加载失败还是成功） | total：资源总数  |
| error | 资源加载失败（retry不触发）| url：加载失败的资源url |

