/**
 * 微信刷新页面（不带缓存）
 *
 * @return {Null}
 */
import getUrlParam from './get-url-param'

function WXReload () {
  const searchParamString = window.location.search

  if (searchParamString) {
    const wxreloadParam = getUrlParam('wxreload', window.location.href)

    if (wxreloadParam) {
      window.location.href = window.location.href.replace(/wxreload=[1-9]\d+/, `wxreload=${new Date().getTime()}`)
    } else {
      window.location.href = `${window.location.href}&wxreload=${new Date().getTime()}`
    }
  } else {
    window.location.href = `${window.location.href}?wxreload=${new Date().getTime()}`
  }
}

export default WXReload
