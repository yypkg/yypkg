# ProgressController

进度控制器，更灵活可控的进度百分比控制，模拟逼真的web资源加载进度

## 使用

```js
import ProgressController from 'yypkg/progress-controller'

// 初始配置
let config = {
  from: 0,
  to: 100,
  increment: 1,
  rate: 100,
}
let stepOption = {
  step1: {
    progress: 85,
    rate: [100, 120], // 在100-120ms之间随机更新频率
  },
  step2: {
    progress: 92,
    rate: [800, 1200],
  }
}
let progress = new ProgressController(config)

// 进度阶段1
progress.go(stepOption.step1, ()=>{

  // 进度阶段2
  progress.add(stepOption.step2)
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

## 配置项

| 参数名 | 描述 | 类型 | 默认值 |
|-|-|-|-|
| `from` | 设置进度起始位置 | Number 或 Array，数组时表示区间内随机某个值 | 0 |
| `to` | 设置进度结束位置 | Number 或 Array，数组时表示区间内随机某个值 | 100 |
| `increment` | 每次更新的递增量 | Number 或 Array，数组时表示区间内随机某个值 | 1 |
| `rate` | 更新频率，即多久更新一次，单位ms | Number 或 Array，数组时表示区间内随机某个值 | 100 |


## 方法

| 方法名 | 描述 | 参数 |
|-|-|-|
| `go` | 设置进度去到某个值 | `option`:Object <br> `option.progress`: 进度值，Number 或 Array  <br> `option.increment`: 递增量，Number 或 Array  <br> `option.rate`: 频率，Number 或 Array  <br> `callback`: 回调函数，返回当前进度值 |
| `add` | 在当前时刻基础上增加进度去到某个值 | `option`:Object <br> `option.progress`: 进度值，Number 或 Array  <br> `option.increment`: 递增量，Number 或 Array  <br> `option.rate`: 频率，Number 或 Array  <br> `callback`: 回调函数，返回当前进度值  |
| `complete` | 设置进去去到100%，也可用`go`或`add`实现 | `callback`: 回调函数，返回当前进度值 |
| `reset` | 重置进度 | `callback`: 回调函数，返回当前进度值 |
| `destroy` | 销毁进度对象 | `callback`: 回调函数 |
| `$on` | 事件监听方法 | `eventName`: 事件名称，String，见下表 <br> `callback`: 回调函数 |


## 事件

事件用`$on`方法调用，`callback`回调函数返回当前进度值

| 事件名 | 描述 | 回调函数参数 |
|-|-|-|
| process | 进度进行过程中 | `currentProgress`：当前进度值 |
| complete | 进度完成到100% | `currentProgress`：当前进度值 |
| beforeDestroy | 销毁之前| `currentProgress`：当前进度值 |
| destroyed | 销毁之后| 无|

