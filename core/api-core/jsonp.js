/**
 * JSONP for axios
 */
import axios from 'axios'

let count = 0
let encode = window.encodeURIComponent
let jsonp = {
  // 对象转URI
  objectToURI (obj) {
    if (!obj) return ''
    let data, key, value
    data = (function () {
      let results
      results = []
      for (key in obj) {
        value = obj[key]
        results.push(encode(key) + '=' + encode(value))
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
  getRequest (url, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = {}
    }
    if (!opts) opts = {}

    let prefix = opts.prefix || 'jsonp'

    let id = opts.name || (prefix + (count++))

    let param = opts.param || 'callback'
    let timeout = opts.timeout != null ? opts.timeout : 30000
    let enc = encodeURIComponent
    let target = document.getElementsByTagName('script')[0] || document.head
    let script
    let timer

    if (timeout) {
      timer = setTimeout(function () {
        cleanup()
        if (fn) fn(new Error('请求超时'))
      }, timeout)
    }

    function cleanup () {
      if (script.parentNode) script.parentNode.removeChild(script)
      window[id] = noop
      if (timer) clearTimeout(timer)
    }

    function cancel () {
      if (window[id]) {
        cleanup()
      }
    }

    window[id] = function (data) {
      // console.log('jsonp got', data);
      cleanup()
      if (fn) fn(null, data)
    }

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id)
    url = url.replace('?&', '?')

    // console.log('jsonp req "%s"', url);

    // create script
    script = document.createElement('script')
    script.src = url
    target.parentNode.insertBefore(script, target)

    return cancel
  },

  // Promise
  init (url, data, options = {}) {
    return new Promise((resolve, reject) => {
      data && (options.data = data)

      data = jsonp.objectToURI(options.data)
      let params = jsonp.objectToURI(options.params)

      if (data) params += data
      if (params) url += '?' + params

      if (!options.timeout) options.timeout = 30000
      jsonp.getRequest(url, options, (err, data) => {
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

axios.jsonp = jsonp.init
