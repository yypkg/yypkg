/**
 * 检测当前环境是否为mac
 *
 * @return {boolean} true|false
 */
import appVersion from './get-appVersion'

function isMac () {
  return /mac/i.test(appVersion)
}

export default isMac
