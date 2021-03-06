import axios from 'axios'
import jsonp from './api-core/jsonp'
import Sender from './api-core/sender'

class API {
  [key: string]: any
  private $options: any
  private $axios: any
  private $function: any
  private $history: any
  public constructor (urls: Record<string, unknown>, options: Record<string, unknown> = {}, $history?: any[]) {
    this.$options = options

    !this.$options.engine && (this.$options.engine = 'axios')
    !this.$options.method && (this.$options.method = 'POST')
    !this.$options.isMock && (this.$options.isMock = false)
    !this.$options.RESTful && (this.$options.RESTful = false)
    !this.$options.isRecordHistory && (this.$options.isRecordHistory = false)

    this.$axios = axios
    const axiosJsonp = jsonp
    this.$axios.jsonp = axiosJsonp
    const fetchEngine = (typeof window !== 'undefined') ? window.fetch : {}
    this.$function = {
      'interceptor:before': void 0,
      'interceptor:after': void 0,
      engine: {
        'axios': axios,
        'fetch': fetchEngine
      },
      error: void 0
    }

    this.$history = $history || []

    for (const key in urls) {
      (this as any)[key] = Sender(key, urls[key], this.$options, this.$function, this.$history)
    }
  }

  public $method (key: string, func: (...options: any) => void): void {
    func(this.$function.engine[key])
  }

  public $engine (key: string, func: (...options: any) => void): void {
    this.$function.engine[key] = func
  }

  public $on (key: string, func: (...options: any) => void): void {
    this.$function[key] = func
  }
}

export default API
