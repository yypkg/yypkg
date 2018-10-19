import axios from 'axios'

const URL_REG = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/

const ensureAbsolutePath = (baseURL, url) => {
  return !URL_REG.test(url) && baseURL ? (baseURL[baseURL.length - 1] === '/' && url[0] === '/' ? `${baseURL.substr(0, baseURL.length - 1)}${url}` : `${baseURL}${url}`) : url
}

const Sender = function (key, url, $options, $function, $history) {
  let options = JSON.parse(JSON.stringify($options))

  typeof url === 'object' && (options = Object.assign(options, url))

  let { method, isMock, isRecordHistory, baseURL } = options

  const recorder = isRecordHistory ? {} : void 0
  const isCustomMethod = !axios[method.toLowerCase()]

  !isCustomMethod && (method = method.toLowerCase())

  if (isMock && url.mock) {
    url = url.mock
    options.realURL = url.url && ensureAbsolutePath(baseURL, url.url)
  } else if (url.url) {
    url = url.url
  }

  url = ensureAbsolutePath(baseURL, url)

  options.url = url
  options.key = key

  return (_options_) => {
    const { error: errorHandler, methods: customMethods } = $function

    const interceptorBefore = $function['interceptor:before']
    const interceptorAfter = $function['interceptor:after']

    _options_ && (options = Object.assign(options, _options_))

    if (recorder) {
      recorder.key = key
      recorder.url = url
      recorder.options = JSON.parse(JSON.stringify(options))
      recorder.startTime = (new Date()).getTime()
    }

    return new Promise(async (resolve, reject) => {
      interceptorBefore && await interceptorBefore(options)

      const errorCallback = (error) => {
        if (recorder) {
          recorder.error = JSON.parse(JSON.stringify(error))
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }

        errorHandler && errorHandler(error, options)
      }

      const successCallback = async (response) => {
        interceptorAfter && await interceptorAfter(options, response)

        if (recorder) {
          recorder.response = JSON.parse(JSON.stringify(response))
          recorder.responseTime = (new Date()).getTime()
          recorder.responseSpendTime = recorder.responseTime - recorder.startTime
          $history.unshift(recorder)
        }
      }

      if (!isCustomMethod) {
        (method !== 'jsonp' ? axios(options) : axios.jsonp(options.url)).then(async (response) => {
          await successCallback(response)

          resolve(method !== 'jsonp' ? response.data : response)
        }).catch(error => errorCallback(error))
      } else {
        if (customMethods[method]) {
          try {
            const response = await customMethods[method](options)

            await successCallback(response)

            resolve(response)
          } catch (error) {
            errorCallback(error)
          }
        } else {
          throw new Error(`custom method [${method}] not found`)
        }
      }
    })
  }
}

export default Sender
