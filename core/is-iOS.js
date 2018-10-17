/**
 * 检测当前环境是否为 iOS
 *
 * @return {boolean} true|false
 */
import isiPhone from './is-iPhone'
import isiPad from './is-iPad'
import isiPod from './is-iPod'

function isiOS () {
  return isiPhone() || isiPad() || isiPod()
}

export default isiOS
