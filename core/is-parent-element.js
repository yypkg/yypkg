/**
 * 判断某个 DOM 元素是否为另一元素的父元素
 *
 * @param {DOMElement} parent
 * @param {DOMElement} child
 * @return {Boolean}
 */
const isParentElement = (parent, child) => {
  let node = child.parentNode

  while (node != null) {
    if (node === parent) {
      return true
    }

    node = node.parentNode
  }

  return false
}

export default isParentElement
