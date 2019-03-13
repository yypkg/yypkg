/**
 * 资源加载器（image/css/js/svga）
 *
 * @param {Array} url 资源路径数组
 * @param {Number} retry 加载失败时的重试次数
 * @param {Boolean} autoStart 是否在实例化时自动执行start()
 * @return {Function} SourceLoader
 */

let loadData = {}

// 事件定义
let $onEvent = {
  process: () => {},
  complete: () => {},
  error: () => {},
}

let SourceLoader = class SourceLoader {

  constructor (argument) {
    this.init(argument)
  }

  init (config) {
    // 默认配置
    let defaults = {
      url: [],
      retry: 3,
      autoStart: false,
    }
    this.configs = Object.assign(defaults, config)
    this.configs.autoStart && this.start()
  }

  // 加载器
  loader () {
    const script = (url, requestCounts)=>{
      const scriptElement = document.createElement('script')
      scriptElement.src = url
      document.getElementsByTagName('head')[ 0 ].appendChild(scriptElement)
      this.loadendEvent(scriptElement, url, 'script', requestCounts)
    }

    const style = (url, requestCounts)=> {
      const styleElement = document.createElement('link')
      styleElement.type = 'text/css'
      styleElement.rel = 'stylesheet'
      styleElement.href = url
      document.getElementsByTagName('head')[ 0 ].appendChild(styleElement)
      this.loadendEvent(styleElement, url, 'style', requestCounts)
    }

    const image = (url, requestCounts)=> {
      let img = new Image()
      img.src = url
      this.loadendEvent(img, url, 'image', requestCounts)
      img = null
    }

    const svga = (url, requestCounts)=> {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.send()
      this.loadendEvent(xhr, url, 'svga', requestCounts)
      xhr = null
    }

    return {
      script,
      style,
      image,
      svga,
    }
  }

  /**
   * loadend事件处理
   *
   * @param {object} node 节点对象
   * @param {String} url 当前加载的资源url
   * @param {String} type 资源类型 "script||style||image||svga"
   * @param {Number} requestCounts 当前请求的次数
   * @return {Funtion} 事件处理函数
   */
  loadendEvent (node, url, type, requestCounts) {
    let error = node.onerror = node.ontimeout = () => {
      // 加载失败则重试
      if (requestCounts <= this.configs.retry) {
        requestCounts++
        this.loader()[type](url, requestCounts)
      } else {
        return this.errorHandle(url)
      }
    }
    node.onload = () => {
      let onload = null
      if (type !== 'svga') {
        onload = this.successHandle(url)
        return onload
      }
      if ((node.status >= 200 && node.status < 300) || node.status === 304) {
        onload = this.successHandle(url)
        return onload
      } else {
        error()
      }
    }
  }

  errorHandle (url) {
    console.error(`${url} load fail`)
    $onEvent.error(url)
    ++loadData.count
  }

  successHandle (url) {
    ++loadData.count
  }

  start () {
    const urls = this.configs.url
    let urlsArray = []
    let tmpCount = 0
    typeof urls === 'string' ? urlsArray.push(urls) : urlsArray = urls
    urlsArray.forEach((item, index) => {
      let extName = item.split('.').pop().toLowerCase()
      if (extName.indexOf('?') > -1) {
        extName = extName.split('?')[0].toLowerCase()
      }
      let loaderName = ''
      switch (extName) {
        case 'css':
          loaderName = 'style'
          break

        case 'js':
          loaderName = 'script'
          break

        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'mbp':
          loaderName = 'image'
          break

        case 'svga':
          loaderName = 'svga'
          break
      }
      this.loader()[loaderName](item, 0)
    })

    // 通过监听loadData.count判断加载状态
    Object.defineProperty(loadData, 'count', {
      configurable: true,
      get () {
        return tmpCount
      },
      set (value) {
        tmpCount = value
        if (tmpCount === urlsArray.length) {
          $onEvent.complete(tmpCount)
        }
        else {
          $onEvent.process(urlsArray.length, tmpCount, urlsArray[tmpCount])
        }
      }
    })
  }

  $on (type, fun) {
    $onEvent[type] = fun
  }
}

export default SourceLoader