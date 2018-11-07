/*
 * 简单对比版本号
 *
 * @param {String} a, ex: `1.2.0`
 * @param {String} b, ex: `1.1.0`
 *
 * if a > b return 1
 * if a = b return 0
 * if a < b return -1
 */
const compareVersion = function (a, b) {
  let i, length

  if (typeof a + typeof b !== 'stringstring') {
    return false
  }

  a = a.split('.')
  b = b.split('.')
  i = 0
  length = Math.max(a.length, b.length)

  for (; i < length; i++) {
    if (
      (a[ i ] && !b[ i ] && parseInt(a[ i ]) > 0) ||
          (parseInt(a[ i ]) > parseInt(b[ i ]))
    ) {
      return 1
    } else if (
      (b[ i ] && !a[ i ] && parseInt(b[ i ]) > 0) ||
          (parseInt(a[ i ]) < parseInt(b[ i ]))
    ) {
      return -1
    }
  }

  return 0
}

export default compareVersion
