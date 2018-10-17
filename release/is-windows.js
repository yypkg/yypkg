/**
 * 检测当前环境是否为 windows
 *
 * @return {boolean} true|false
 */
import appVersion from './get-appVersion'

function isWindows () {
  return /win/i.test(appVersion)
}

export default isWindows
