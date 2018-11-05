/**
 * 检测当前环境是否为 Android 平板
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isAndroidTablet () {
  return /android/i.test(userAgent) && !/mobile/i.test(userAgent)
}

export default isAndroidTablet
