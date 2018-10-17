# API

## 简单使用

```js
import API from 'yypkg/api'

const urls = {
  test: 'https://legox.org/mock/a3e67a40-863c-11e7-9085-0ba4558c07dc'
}

const options = {
  method: 'GET'
}

const api = new API(urls, options)

await api.test()
```

## 配置项 `options`

| 参数名 | 描述 | 类型 | 默认值 |
|-|-|-|-|
| method | 请求方式 | String | `'POST'` |
| isMock | 是否调用模拟接口 | Boolean | `false` |
| isRecordHistory | 是否记录请求历史 | Boolean | `false` |
| ..... | 其他 axios 配置项 | [config](https://github.com/axios/axios#request-config) | - |

## 使用局部配置

```js
import API from 'yypkg/api'

const urls = {
  test: {
    url: 'https://legox.org/mock/a3e67a40-863c-11e7-9085-0ba4558c07dc',
    method: 'JSONP'
  }
}

const options = {
  method: 'GET'
}

const api = new API(urls, options)

await api.test() // method: JSONP
```

局部配置项与全局配置项参数一致，但优先级大于全局配置项

## 使用 Mock

```js
import API from 'yypkg/api'

const urls = {
  test: {
    url: 'https://google.com',
    mock: 'https://legox.org/mock/a3e67a40-863c-11e7-9085-0ba4558c07dc'
  }
}

const options = {
  isMock: true
}

const api = new API(urls, options)

await api.test()
```

如果请求接口没有配置 `mock 地址` 则请求真实地址

## 拦截器

```js
import API from 'yypkg/api'

const api = new API({
  test: 'https://legox.org/mock/a3e67a40-863c-11e7-9085-0ba4558c07dc'
})

api.$on('interceptor:before', (options) => {
  console.log('interceptor:before', options)
})

api.$on('interceptor:after', (options, response) => {
  console.log('interceptor:after', response)
})

await api.test()
```

## 错误处理

```js
import API from 'yypkg/api'

const api = new API({
  test: 'https://google.com'
})

api.$on('error', (error) => {
  console.log('error', error)
})

await api.test()
```

## 自定义请求方式

```js
import API from 'yypkg/api'

const api = new API({
  test: 'https://google.com',
  method: 'SDK'
})

api.$method('SDK', (options) => {
  return new Promise(resolve => {
    setTimeout(() => resolve({code: 1}), 2000)
  })
})

await api.test()
```

## 历史记录

```js
import API from 'yypkg/api'

const api = new API({
  test: 'https://google.com'
}, {
  isRecordHistory: true
})

await api.test()

console.log(api.$history)
``
