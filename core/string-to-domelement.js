/**
 * 原生字符串转为 DOM 元素
 *
 * @param {String}
 * @return {DOMElement}
 */
const stringToDOMElement = function (string) {
  const frame = document.createElement('iframe')

  frame.style.display = 'none'

  document.body.appendChild(frame)

  frame.contentDocument.open()
  frame.contentDocument.write(string)
  frame.contentDocument.close()

  const element = frame.contentDocument.body.firstChild

  document.body.removeChild(frame)

  return element
}

export default stringToDOMElement
