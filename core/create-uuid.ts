/**
 * 生成唯一标识号
 *
 * @param {Number} length 长度
 * @return {String} uuid
 *
 * 参考：https://github.com/harmankang/Lab62
 */

const createUUID = (length= 6): string => {
  const delegate = {
    b62char: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    b62string: ''
  }
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * (62))
    delegate.b62string += delegate.b62char[index]
  }
  return delegate.b62string
}

export default createUUID

