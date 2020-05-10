/**
 * JSONP for axios
 */

let count: number = 0
let jsonp: any = {
  
  // 对象转URI
  objectToURI (obj: any) {
    if (!obj) return ''
    let data, key, value
    data = (function () {
      let results
      results = []
      for (key in obj) {
        value = obj[key]
        results.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
      }
      return results
    })()
    return data.join('&')
  },

  /**
   * 请求处理
   *
   * opts:
   *  - param {String} qs parameter (`callback`)
   *  - prefix {String} qs parameter (`jsonp`)
   *  - name {String} qs parameter (`prefix` + incr)
   *  - timeout {Number} (`30000`)
   *
   * @param {String} url
   * @param {Object|Function} optional options / callback
   * @param {Function} optional callback
   */
  getRequest (url: string, opts: any, fn: any) {
    if (typeof opts === 'function') {
      fn = opts
      opts = {}
    }
    if (!opts) {
      opts = {}
    }

    let prefix = opts.prefix || 'jsonp'

    let id = opts.name || (prefix + (count++))

    let param = opts.param || 'callback'
    let timeout = opts.timeout != null ? opts.timeout : 30000
    let target: any = document.getElementsByTagName('script')[0] || document.head
    let script: any
    let timer: any

    if (timeout) {
      timer = setTimeout(function () {
        cleanup()
        if (fn) {
          fn(new Error('请求超时'))
        }
      }, timeout)
    }

    function cleanup () {
      // if (script.parentNode) script.parentNode.removeChild(script)
      if (script) {
        script.remove()
      }
      (window as any)[id] = noop
      if (timer) {
        clearTimeout(timer)
      }
    }

    function cancel () {
      if (window[id]) {
        cleanup()
      }
    }

    (window as any)[id] = function (data: any) {
      // console.log('jsonp got', data);
      cleanup()
      if (fn) {
        fn(null, data)
      }
    }

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id)
    url = url.replace('?&', '?')

    // console.log('jsonp req "%s"', url);

    // create script
    script = document.createElement('script')
    script.src = url
    target.parentNode.insertBefore(script, target)

    return cancel
  },

  // Promise
  init (url: string, options: any = {}) {
    return new Promise((resolve, reject) => {
      let data = jsonp.objectToURI(options.data)
      let params = jsonp.objectToURI(options.params)

      if (data) {
        params += `&${data}`
      }
      if (params) {
        url += '?' + params
      }

      if (!options.timeout) {
        options.timeout = 30000
      }

      jsonp.getRequest(url, options, (err: Error, data: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

function noop () {}

export default jsonp.init
