/**
 * @file 生成顶部注释
 */

import pkg from '../package.json'

const dateFormat = (time, format = 'YYYY-MM-DD hh:mm:ss') => {
  const date = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (date[ k ]) : (('00' + date[ k ]).substr(('' + date[ k ]).length)))
    }
  }

  return format
}

const time = dateFormat(new Date())
const currentYear = new Date().getFullYear()
const banner = 
`/*!
* yypkg.min.js
*
* Version: ${pkg.version}
* Time: ${time}
* Homepage: ${pkg.homepage}
* (c) 2019-${currentYear} YY.UED
* Released under the MIT License.
*/`

export default banner