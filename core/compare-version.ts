/**
 * 简单对比版本号
 *
 * @param {String} a, ex: `1.2.0`
 * @param {String} b, ex: `1.1.0`
 *
 * if a > b return 1
 * if a = b return 0
 * if a < b return -1
 */

const compareVersion = (a: string, b: string): number | boolean => {
  if (typeof a + typeof b !== 'stringstring') {
    return false
  }
  const v1 = a.split('.')
  const v2 = b.split('.')
  const length = Math.max(v1.length, v2.length)
  let i = 0
  for (; i < length; i++) {
    if (
      (v1[ i ] && !v2[ i ] && parseInt(v1[ i ]) > 0) ||
        (parseInt(v1[ i ]) > parseInt(v2[ i ]))
    ) {
      return 1
    } else if (
      (v2[ i ] && !v1[ i ] && parseInt(v2[ i ]) > 0) ||
        (parseInt(v1[ i ]) < parseInt(v2[ i ]))
    ) {
      return -1
    }
  }

  return 0
}

export default compareVersion