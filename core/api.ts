import axios from 'axios'
import jsonp from './api-core/jsonp'
import Sender from './api-core/sender'

class API {
  [key: string]: any
  private $options: any
  private $axios: any
  private $function: any
  private $history: any
  public constructor (urls: any, options: object = {}, $history?: any) {
    this.$options = options

    !this.$options.engine && (this.$options.engine = 'axios')
    !this.$options.method && (this.$options.method = 'POST')
    !this.$options.isMock && (this.$options.isMock = false)
    !this.$options.RESTful && (this.$options.RESTful = false)
    !this.$options.isRecordHistory && (this.$options.isRecordHistory = false)

    this.$axios = axios
    const axiosJsonp = jsonp
    this.$axios.jsonp = axiosJsonp

    this.$function = {
      'interceptor:before': void 0,
      'interceptor:after': void 0,
      engine: {
        'axios': axios,
        'fetch': window.fetch
      },
      error: void 0
    }

    this.$history = $history || []

    for (let key in urls) {
      (this as any)[key] = Sender(key, urls[key], this.$options, this.$function, this.$history)
    }
  }

  public $method (key: string, func: (...options: any) => void) {
    func(this.$function.engine[key])
  }

  public $engine (key: string, func: (...options: any) => void) {
    this.$function.engine[key] = func
  }

  public $on (key: string, func: (...options: any) => void) {
    this.$function[key] = func
  }
}

export default API
