/**
 * 获取中英文双语情景下的浏览器语言
 *
 * @return {String} 中文（含繁体）统一返回 'zh'，其他情况（含获取到未知）统一返回 'en'
 */

import getFirstBrowserLanguage from './get-first-browser-language'

const firstLang: string = getFirstBrowserLanguage()
const getBilingual = (): string => {
  return (/zh/i).test(firstLang) ? 'zh' : 'en'
}

export default getBilingual