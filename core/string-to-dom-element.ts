/**
 * 原生字符串转为 DOM 元素
 *
 * @param {String}
 * @return {DOMElement}
 */

const stringToDOMElement = (string: string): any => {
  const frame: HTMLIFrameElement = document.createElement('iframe')
  frame.style.display = 'none'
  document.body.appendChild(frame)
  const contentDocument = frame.contentDocument
  if (!contentDocument) {
    return null
  }
  contentDocument.open()
  contentDocument.write(string)
  contentDocument.close()
  const element = contentDocument.body.firstChild
  document.body.removeChild(frame)
  return element
}

export default stringToDOMElement
