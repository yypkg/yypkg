/**
 * 检测当前环境是否为 Android 手机
 *
 * @return {boolean} true|false
 */
import userAgent from './get-userAgent'

function isAndroidPhone () {
  return /android/i.test(userAgent) && /mobile/i.test(userAgent)
}

export default isAndroidPhone
