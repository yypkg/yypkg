/**
 * 前缀补充零位
 *
 * @param {Number} num
 * @param {Number} n
 * @return {String}
 *
 * ex: padZero(6, 3) // '006'
 */

const padZero = (num: number, n: number): string => {
  let padNumber: any = num
  let length = padNumber.toString().length

  while (length < n) {
    padNumber = '0' + padNumber
    length++
  }

  return padNumber
}

export default padZero
