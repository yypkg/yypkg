/**
 * 时间格式化
 *
 * @param {Date} 时间
 * @param {String} 格式模板
 * @return {String}
 *
 * 默认格式化格式 `2018-11-05 17:25:25`
 */

const dateFormat = (time: Date, format = 'YYYY-MM-DD hh:mm:ss'): string => {
  const date: { [key: string]: any } = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (date[ k ]) : (('00' + date[ k ]).substr(('' + date[ k ]).length)))
    }
  }

  return format
}

export default dateFormat