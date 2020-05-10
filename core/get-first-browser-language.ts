/**
 * 获取浏览器第一语言
 *
 * @return {String} 浏览器第一语言名称，未知返回 'unknown'
 */

const getFirstBrowserLanguage = (): string => {
  const navigator:any = window.navigator
  const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage']
  let i = 0
  let language = 'unknown'

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(navigator.languages)) {
    for (i = 0; i < navigator.languages.length; i++) {
      language = navigator.languages[i]
      if (language && language.length) {
        return language
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = navigator[browserLanguagePropertyKeys[i]]
    if (language && language.length) {
      return language
    }
  }
  return 'unknown'
}

export default getFirstBrowserLanguage