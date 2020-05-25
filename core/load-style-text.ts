/**
 * 动态插入 CSS 文本样式
 *
 * @param {String} CSS 文本样式
 * @return {Null}
 */

const loadStyleText = (cssText: string): void => {
  const style = document.createElement('style')
  style.type = 'text/css'
  const head = document.head || document.getElementsByTagName('head')[0]
  style.appendChild(document.createTextNode(cssText))
  head.appendChild(style)
}

export default loadStyleText
