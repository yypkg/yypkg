
/**
 * 检测当前环境是否为 Android
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'

function isAndroid () {
  return /android/i.test(userAgent)
}

export default isAndroid
