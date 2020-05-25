/**
 * 强制刷新当前页面，通过在url添加随机参数
 *
 * @return {Null}
 */

import getUrlParam from './get-url-param'

const forceReload = (): void => {
  const searchParamString = window.location.search

  if (searchParamString) {
    const reloadParam = getUrlParam('reload', window.location.href)

    if (reloadParam) {
      window.location.href = window.location.href.replace(/reload=[1-9]\d+/, `reload=${new Date().getTime()}`)
    } else {
      window.location.href = `${window.location.href}&reload=${new Date().getTime()}`
    }
  } else {
    window.location.href = `${window.location.href}?reload=${new Date().getTime()}`
  }
}

export default forceReload