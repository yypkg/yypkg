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
| engine | 请求核心对象 | String | `'axios'`
| method | 请求方式 | String | `'POST'` |
| isMock | 是否调用模拟接口 | Boolean | `false` |
| throttle | 节流时间 | Number | `0` |
| isRecordHistory | 是否记录请求历史 | Boolean | `false` |
| RESTful | 是否开启 RESTful 调用 | Boolean | `false` |
| ..... | 其他 axios 配置项 | [config](https://github.com/axios/axios#request-config) | - |

## 使用局部配置

```js
import API from 'yypkg/api'

const urls = {
  test: {
    url: '//xxx.com/xxx',
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
    url: '//xxx.com/xxx',
    mock: '//yyy.com/yyy'
  }
}

const api = new API(urls, { isMock: true })

await api.test()
```

如果请求接口没有配置 `mock 地址` 则请求真实地址

## 设置请求时配置参数

```js
import API from 'yypkg/api'

const api = new API({
  test: '//xxx.com/xxx'
})

// api.test(data, options)
await api.test({ code: 1 }, { method: 'GET' })
```

## URL 参数

```js
import API from 'yypkg/api'

const api = new API({
  test: 'https://legox.org/mock/:id'
})

await api.test({ code: 1 }, { keys: 'a3e67a40-863c-11e7-9085-0ba4558c07dc' })
```

## RESTful 调用

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx'}, { RESTful: true })

// await api.test.GET()
await api.test.get()
// await api.test.POST()
await api.test.post()
// await api.test.PUT()
await api.test.put()
// await api.test.PATCH()
await api.test.patch()
// await api.test.DELETE()
await api.test.delete()
```

## 拦截器

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx' })

// 生命周期 beforeResolveOptions，处于实例调用入口最前面，在合并 options 之前调用
// 返回 data、options 可改变调用实例时原有传入变量
api.$on('interceptor:beforeResolveOptions', ({ key, url, data, options, namedOptions }) => {
  console.log('interceptor:beforeResolveOptions')

  return { data, options }
})

// 生命周期 beforeRequest，开始请求 engine 之前调用，返回 Promise 可阻塞进程
api.$on('interceptor:beforeRequest', (options) => {
  console.log('interceptor:beforeRequest')
})

// 生命周期 beforeCallbackResponse，回调 response 之前调用，返回 Promise 可阻塞进程
api.$on('interceptor:beforeCallbackResponse', (options, response) => {
  console.log('interceptor:beforeCallbackResponse', response)
})

// 生命周期 afterCallbackResponse，回调 response 之后调用
api.$on('interceptor:afterCallbackResponse', (options, response) => {
  console.log('interceptor:afterCallbackResponse', response)
})

await api.test()
```

## 错误处理

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx' })

api.$on('error', (error) => {
  console.log('error', error)
})

await api.test()
```

## 自定义 Engine

用于自定义请求核心对象，默认为 `axios`，包含 `fetch`

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx' }, { engine: 'SDK' })

api.$engine('SDK', options => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ code: 1 }), 2000)
  })
})

await api.test()
```

## 自定义请求方式

用于丰富扩展指定 engine 的 `method`

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx' }, {
  engine: 'axios',
  method: 'SDK'
})

api.$method('axios', axios => {
  axios.SDK = () => new Promise(resolve => {
    setTimeout(() => resolve({ code: 1 }), 2000)
  })
})

await api.test()
```

## 历史记录

```js
import API from 'yypkg/api'

const api = new API({ test: '//xxx.com/xxx' }, { isRecordHistory: true })

await api.test()

console.log(api.$history)
``
