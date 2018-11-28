import axios from 'axios'
import './api-core/jsonp'
import Sender from './api-core/sender.js'

class API {
  constructor (urls, options, $history) {
    this.$options = options

    !this.$options.engine && (this.$options.engine = 'fetch')
    !this.$options.method && (this.$options.method = 'POST')
    !this.$options.isMock && (this.$options.isMock = false)
    !this.$options.isRecordHistory && (this.$options.isRecordHistory = false)

    this.$function = {
      'interceptor:before': void 0,
      'interceptor:after': void 0,
      methods: {},
      engine: {
        'fetch': window.fetch,
        'axios': axios
      },
      error: void 0
    }

    this.$history = $history || []

    for (let key in urls) {
      this[key] = Sender(key, urls[key], this.$options, this.$function, this.$history)
    }
  }

  $method (key, func) {
    this.$function.methods[key] = func(this.$function.engine)
  }

  $engine (key, func) {
    this.$function.engine[key] = func
  }

  $on (key, func) {
    this.$function[key] = func
  }
}

export default API
