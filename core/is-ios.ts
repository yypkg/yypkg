/**
 * 检测当前环境是否为 iOS
 *
 * @return {Boolean} true|false
 */

import isiPhone from './is-iphone'
import isiPad from './is-ipad'
import isiPod from './is-ipod'

const isiOS: boolean = (isiPhone || isiPad || isiPod)

export default isiOS