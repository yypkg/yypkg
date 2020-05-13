/**
 * JSONP for axios
 */

let count = 0
const jsonp = {
  
  // 对象转URI
  objectToURI (obj: any) {
    if (!obj) return ''
    let key, value
    const data = (function () {
      const results  = []
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

    const prefix = opts.prefix || 'jsonp'

    const id = opts.name || (prefix + (count++))

    const param = opts.param || 'callback'
    const timeout = opts.timeout != null ? opts.timeout : 30000
    const target: any = document.getElementsByTagName('script')[0] || document.head
    let script: any = null
    let timer: any = null

    function cleanup () {
      // if (script.parentNode) script.parentNode.removeChild(script)
      if (script) {
        script.remove()
      }
      (window as any)[id] = null
      if (timer) {
        clearTimeout(timer)
      }
    }

    function cancel () {
      if (window[id]) {
        cleanup()
      }
    }

    if (timeout) {
      timer = setTimeout(function () {
        cleanup()
        if (fn) {
          fn(new Error('请求超时'))
        }
      }, timeout)
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
      const data = jsonp.objectToURI(options.data)
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

export default jsonp.init
