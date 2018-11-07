/**
 * 前缀补充零位
 *
 * @param {Number} num
 * @param {Number} n
 * @return {String}
 *
 * ex: padZero(6, '3') // '006'
 */
function padZero (num, n) {
  let length = num.toString().length

  while (length < n) {
    num = '0' + num
    length++
  }

  return num
}

export default padZero
