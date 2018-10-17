/**
 * 检测当前环境是否为 linux
 *
 * @return {boolean} true|false
 */
import appVersion from './get-appVersion'

function isLinux () {
  return /linux/i.test(appVersion)
}

export default isLinux
