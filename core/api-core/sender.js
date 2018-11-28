import pathToRegexp from 'path-to-regexp'

const URL_REG = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/

const ensureAbsolutePath = (baseURL, url) => {
  return !URL_REG.test(url) && baseURL ? (baseURL[baseURL.length - 1] === '/' && url[0] === '/' ? `${baseURL.substr(0, baseURL.length - 1)}${url}` : `${baseURL}${url}`) : url
}

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

const Sender = function (key, url, $globalOptions, $function, $history) {
  let globalOptions = clone($globalOptions)

  typeof url === 'object' && (globalOptions = Object.assign(globalOptions, url))

  let { isRecordHistory } = globalOptions

  const recorder = isRecordHistory ? {} : void 0

  return (data, options) => {
    const { error: errorHandler, engine: engines } = $function

    const beforeResolveOptions = $function['interceptor:beforeResolveOptions']
    const beforeRequest = $function['interceptor:beforeRequest']
    const beforeCallbackResponse = $function['interceptor:beforeCallbackResponse']
    const afterCallbackResponse = $function['interceptor:afterCallbackResponse']

    if (beforeResolveOptions) {
      const callbackResult = beforeResolveOptions(key, url, data, options, globalOptions)

      callbackResult.options && (options = callbackResult.options)
      callbackResult.data && (data = callbackResult.data)
    }

    options = options || {}
    options.data = data || {}

    options = resolveOptions(key, url, Object.assign(globalOptions, options))

    const { engine: engineKey, method } = options

    const engine = engines[engineKey]

    if (recorder) {
      recorder.key = key
      recorder.url = url
      recorder.options = clone(options)
      recorder.startTime = (new Date()).getTime()
    }

    return new Promise(async (resolve, reject) => {
      beforeRequest && await beforeRequest(options)

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
          const response = await engine(options)

          await successCallback(response)

          resolve(response)

          afterCallbackResponse && afterCallbackResponse(response)
        } catch (error) {
          errorCallback(error)
        }
      }

      requestDiffEngines.axios = () => {
        (engine[method] || engine[method.toUpperCase()])(options.url, options).then(async (response) => {
          await successCallback(response)

          resolve(response.status && response.statusText && response.headers ? response.data : response)

          afterCallbackResponse && afterCallbackResponse(response)
        }).catch(error => errorCallback(error))
      }

      requestDiffEngines.fetch = async () => {
        try {
          const response = await engine(options.url, options)

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
    })
  }
}

export default Sender
