/**
 * 检测当前环境是否为iPod
 *
 * @return {Boolean} true|false
 */
import userAgent from './get-userAgent'

function isiPod () {
  return /ipod/i.test(userAgent)
}

export default isiPod
