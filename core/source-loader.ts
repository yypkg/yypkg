/**
 * 资源加载器（image/css/js/svga）
 *
 * @param {Array} url 资源路径数组
 * @param {Number} retry 加载失败时的重试次数
 * @param {Boolean} autoStart 是否在实例化时自动执行start()
 * @return {Function} SourceLoader
 */

const loadData: any = {}

// 事件定义
const emptyFn = () => 0
const $onEvent: {[key: string]: Function} = {
  process: emptyFn,
  complete: emptyFn,
  error: emptyFn,
}

class SourceLoader {
  private configs: any

  public constructor (argument: any) {
    this.configs = {}
    this.init(argument)
  }

  private init (config: any) {
    // 默认配置
    const defaults = {
      url: [],
      retry: 3,
      autoStart: false,
    }
    this.configs = Object.assign(defaults, config)
    this.configs.autoStart && this.start()
  }

  // 加载器
  private loader (): any {
    const script = (url: string, requestCounts: number)=>{
      const scriptElement = document.createElement('script')
      scriptElement.src = url
      document.getElementsByTagName('head')[ 0 ].appendChild(scriptElement)
      this.loadendEvent(scriptElement, url, 'script', requestCounts)
    }

    const style = (url: string, requestCounts: number)=> {
      const styleElement = document.createElement('link')
      styleElement.type = 'text/css'
      styleElement.rel = 'stylesheet'
      styleElement.href = url
      document.getElementsByTagName('head')[ 0 ].appendChild(styleElement)
      this.loadendEvent(styleElement, url, 'style', requestCounts)
    }

    const image = (url: string, requestCounts: number)=> {
      let img: any = new Image()
      img.src = url
      this.loadendEvent(img, url, 'image', requestCounts)
      img = null
    }

    const svga = (url: string, requestCounts: number)=> {
      let xhr: any = new XMLHttpRequest()
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
  private loadendEvent (node: any, url: string, type: string, requestCounts: number) {
    const error = node.onerror = () => {
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
        onload = this.successHandle()
        return onload
      }
      if ((node.status >= 200 && node.status < 300) || node.status === 304) {
        onload = this.successHandle()
        return onload
      } else {
        error()
      }
    }
  }

  private errorHandle (url: string) {
    console.error(`${url} load fail`)
    $onEvent.error(url)
    ++loadData.count
  }

  private successHandle () {
    ++loadData.count
  }

  public start () {
    const urls = this.configs.url
    let urlsArray: any[] = []
    let tmpCount = 0
    typeof urls === 'string' ? urlsArray.push(urls) : urlsArray = urls
    urlsArray.forEach((item) => {
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

  public $on (type: string, fun: (...options: any) => void) {
    $onEvent[type] = fun
  }
}

export default SourceLoader
