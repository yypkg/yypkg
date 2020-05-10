/**
 * 裁剪所有空格
 *
 * @param {String} str
 * @return {String}
 */

const trimSpace = (str: string): string => {
  return str.replace(/(^\s+)|(\s+)/g, '')
}

export default trimSpace
