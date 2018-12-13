import pathToRegexp from 'path-to-regexp'

const URL_REG = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/

const RESTfulMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ]

const ensureAbsolutePath = (baseURL, url) => {
  return !URL_REG.test(url) && baseURL ? (baseURL[baseURL.length - 1] === '/' && url[0] === '/' ? `${baseURL.substr(0, baseURL.length - 1)}${url}` : `${baseURL}${url}`) : url
}

const getEngineMethod = (engine, method) => (engine[method] || engine[method.toUpperCase()])

const clone = obj => JSON.parse(JSON.stringify(obj))

const resolveOptions = (key, url, options) => {
  let { isMock, baseURL, method } = options

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
const Sender = function (key, url, $globalOptions, $function, $history) {
  let namedOptions = clone($globalOptions)

  typeof url === 'object' && (namedOptions = Object.assign(namedOptions, url))

  let { isRecordHistory, RESTful } = namedOptions

  let throttleTimer = false

  const sender = function (data, options) {
    const recorder = isRecordHistory ? {} : void 0

    const { error: errorHandler, engine: engines } = $function

    const beforeResolveOptions = $function['interceptor:beforeResolveOptions']
    const beforeRequest = $function['interceptor:beforeRequest']
    const beforeCallbackResponse = $function['interceptor:beforeCallbackResponse']
    const afterCallbackResponse = $function['interceptor:afterCallbackResponse']

    if (beforeResolveOptions) {
      const callbackResult = beforeResolveOptions({ key, url, data, options, namedOptions })

      callbackResult.hasOwnProperty('options') && (options = callbackResult.options)
      callbackResult.hasOwnProperty('data') && (data = callbackResult.data)
    }

    options = options || {}
    options.data = data || {}

    // this scope
    if (typeof this === 'object' && this.RESTfulMethod) {
      options.method = this.RESTfulMethod
    }

    options = resolveOptions(key, url, Object.assign(namedOptions, options))

    const { engine: engineKey, method } = options

    const engine = engines[engineKey]

    const doRequest = async (resolve, reject) => {
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

      const errorCallback = error => {
        if (recorder) {
          recorder.error = clone(error)
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }

        errorHandler && errorHandler(error, options)
      }

      const successCallback = async (response) => {
        beforeCallbackResponse && await beforeCallbackResponse(options, response)

        if (recorder) {
          recorder.response = clone(response)
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }
      }

      const requestDiffEngines = {}

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

        ;(defaultSupportMethod.indexOf(method) >= 0 ? engine(options) : (getEngineMethod(engine, method)(options.url, options.data, options))).then(async response => {
          await successCallback(response)

          resolve(typeof response.status !== 'undefined' && typeof response.statusText !== 'undefined' && typeof response.headers !== 'undefined' ? response.data : response)

          afterCallbackResponse && afterCallbackResponse(response)
        }).catch(error => errorCallback(error))
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

  RESTfulMethods.forEach(method => {
    sender[method] = sender[method.toLowerCase()] = sender.bind({ RESTfulMethod: method })
  })

  return sender
}

export default Sender
