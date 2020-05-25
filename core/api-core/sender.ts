import pathToRegexp from 'path-to-regexp'

const URL_REG = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/

const RESTfulMethods: string[] = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ]

const ensureAbsolutePath = (baseURL: string, url: string): string => {
  return !URL_REG.test(url) && baseURL ? (baseURL[baseURL.length - 1] === '/' && url[0] === '/' ? `${baseURL.substr(0, baseURL.length - 1)}${url}` : `${baseURL}${url}`) : url
}

const getEngineMethod = (engine: any, method: any): any => (engine[method] || engine[method.toUpperCase()])

const clone = (obj: any): any => JSON.parse(JSON.stringify(obj))

const resolveOptions = (key: string, url: any, options: any): any => {
  const { isMock, baseURL, method } = options

  if (isMock && url.mock) {
    url = url.mock
    options.realURL = url.url && ensureAbsolutePath(baseURL, url.url)
  } else if (url.url) {
    url = url.url
  }

  options.keys && (url = pathToRegexp.compile(url)(options.keys))

  url = ensureAbsolutePath(baseURL, url)

  options.url = url
  options.key = key
  options.method = method.toLowerCase()

  return options
}

// TODO: 解耦 请求体内函数
const Sender = function (key: string, url: unknown, $globalOptions: Record<string, unknown>, $function: any, $history: any[]): any  {
  let namedOptions = clone($globalOptions)

  typeof url === 'object' && (namedOptions = Object.assign(namedOptions, url))

  const { isRecordHistory, RESTful } = namedOptions

  let throttleTimer = false

  const sender: any = function (this: any, data: any, options: any): Promise<any> {
    const cloneByNamedOptions = clone(namedOptions)
    const recorder: any = isRecordHistory ? {} : void 0

    const { error: errorHandler, engine: engines } = $function

    const beforeResolveOptions = $function['interceptor:beforeResolveOptions']
    const beforeRequest = $function['interceptor:beforeRequest']
    const beforeCallbackResponse = $function['interceptor:beforeCallbackResponse']
    const afterCallbackResponse = $function['interceptor:afterCallbackResponse']

    if (beforeResolveOptions) {
      const callbackResult = beforeResolveOptions({ key, url, data, options, namedOptions: cloneByNamedOptions })

      callbackResult && callbackResult.hasOwnProperty('options') && (options = callbackResult.options)
      callbackResult && callbackResult.hasOwnProperty('data') && (data = callbackResult.data)
    }

    options = options || {}
    options.data = data || {}

    // this scope
    if (typeof this === 'object' && this.RESTfulMethod) {
      options.method = this.RESTfulMethod
    }

    options = resolveOptions(key, url, Object.assign({}, namedOptions, options))

    const { engine: engineKey, method } = options

    const engine = engines[engineKey]

    const doRequest = async (resolve: (value: any) => void, reject: (reason: any) => void) => {
      if (options.throttle) {
        if (throttleTimer) {
          return void 0
        } else {
          throttleTimer = true

          setTimeout(() => (throttleTimer = false), options.throttle)
        }
      }

      beforeRequest && await beforeRequest(options)

      if (recorder) {
        recorder.key = key
        recorder.url = url
        recorder.options = clone(options)
        recorder.startTime = (new Date()).getTime()
      }

      const throwError = (error: Error): void => reject(error)

      const errorCallback = (error: any): void => {
        if (recorder) {
          recorder.error = clone(error)
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }
        errorHandler && errorHandler(error, options, throwError)
      }

      const successCallback = async (response: any) => {
        beforeCallbackResponse && await beforeCallbackResponse(options, response)

        if (recorder) {
          recorder.response = clone(response)
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }
      }

      const requestDiffEngines: any = {}

      requestDiffEngines.default = async () => {
        try {
          const response = await (getEngineMethod(engine, method) || engine)(options)

          await successCallback(response)

          resolve(response)

          afterCallbackResponse && afterCallbackResponse(response)
        } catch (error) {
          errorCallback(error)
        }
      }

      requestDiffEngines.axios = () => {
        const defaultSupportMethod = [ 'get', 'delete', 'head', 'options', 'post', 'put', 'patch' ]

        if (method === 'get') {
          options.params = options.data
        }

        (defaultSupportMethod.indexOf(method) >= 0 ? engine(options) : (getEngineMethod(engine, method)(options.url, options.data, options))).then(async (response: any) => {
          await successCallback(response)

          resolve(typeof response.status !== 'undefined' && typeof response.statusText !== 'undefined' && typeof response.headers !== 'undefined' ? response.data : response)

          afterCallbackResponse && afterCallbackResponse(response)
        }).catch((error: Error) => errorCallback(error))
      }

      requestDiffEngines.fetch = async () => {
        try {
          const response = await (getEngineMethod(engine, method) || engine)(options.url, options)

          await successCallback(response)

          resolve(response)

          afterCallbackResponse && afterCallbackResponse(response)
        } catch (error) {
          errorCallback(error)
        }
      }

      if (!engineKey) {
        throw new Error(`custom engine [${engineKey}] not found`)
      }

      await (requestDiffEngines[engineKey] ? requestDiffEngines[engineKey]() : requestDiffEngines['default']())
    }

    return new Promise(doRequest)
  }

  if (!RESTful) {
    return sender
  }

  RESTfulMethods.forEach((method: string) => {
    sender[method] = sender[method.toLowerCase()] = sender.bind({ RESTfulMethod: method })
  })

  sender.options = namedOptions

  return sender
}

export default Sender
