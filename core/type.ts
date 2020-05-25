/**
 * 类型检测库，弥补typeof的问题
 *
 * @param {Any} x
 * @param {Boolean} strict 是否严格模式
 * @return {String} number / array / function / ...
 *
 * 参考：https://github.com/jsmini/type
 */

const type = (x: any, strict?: boolean): any => {
  strict = !!strict

  // fix typeof null = object
  if (x === null) {
    return 'null'
  }

  const t = typeof x

  // number string boolean undefined symbol
  if (t !== 'object') {
    return t
  }

  let cls
  let clsLow
  try {
    cls = Object.prototype.toString.call(x).slice(8, -1)
    clsLow = cls.toLowerCase()
  } catch (e) {
    // ie下的 activex对象
    return 'object'
  }

  if (clsLow !== 'object') {
    // 区分 String() 和 new String()
    if (strict && (clsLow === 'number' || clsLow === 'boolean' || clsLow === 'string')) {
      return cls
    }
    return clsLow
  }

  if (x.constructor == Object) {
    return clsLow
  }

  // Object.create(null)
  try {
    // __proto__ 部分早期firefox浏览器
    if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
      return 'object'
    }
  } catch (e) {
    // ie下无Object.getPrototypeOf会报错
  }

  // function A() {}; new A
  try {
    const cname = x.constructor.name

    if (typeof cname === 'string') {
      return cname
    }
  } catch (e) {
    // 无constructor
  }

  // function A() {}; A.prototype.constructor = null; new A
  return 'unknown'
}

export default type