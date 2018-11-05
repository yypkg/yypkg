/**
 * 时间格式化
 *
 * @param {Date} 时间
 * @param {String} 格式模板
 * @return {String}
 *
 * 默认格式化格式 `2018-11-05 17:25:25`
 */

const dateFormat = function (time, fmt = 'YYYY-MM-DD hh:mm:ss') {
  const date = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }

  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in date) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (date[ k ]) : (('00' + date[ k ]).substr(('' + date[ k ]).length)))
    }
  }

  return fmt
}

export default dateFormat
