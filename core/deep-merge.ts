 /**
 * 对象深度合并
 *
 * @param {Object} target 对象1
 * @param {Object} source 对象2
 * @return {Object} 合并后的对象
 */

interface Map {
  [key: string]: any
  [index: number]: any
}

function isMergeableObject (val: any): boolean {
  const nonNullObject = val && typeof val === 'object'
  return nonNullObject &&
    Object.prototype.toString.call(val) !== '[object RegExp]' &&
    Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget (val: any) {
  return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary (value: any, optionsArgument?: Map): any {
  const clone = optionsArgument && optionsArgument.clone === true
  return (clone && isMergeableObject(value)) ? deepMerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge (target: any[], source: any[], optionsArgument: Map) {
  const destination = target.slice()
  source.forEach((e, i) => {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument)
    } else if (isMergeableObject(e)) {
      destination[i] = deepMerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}

function mergeObject (target: Map, source: Map, optionsArgument?: Map): Record<string, unknown> {
  const destination: Map = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach((key: string) => {
      destination[key] = cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach((key: string) => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = deepMerge(target[key], source[key], optionsArgument)
    }
  })
  return destination
}

function deepMerge (target: any, source: any, optionsArgument?: Map): any {
  const array = Array.isArray(source)
  const options = optionsArgument || { arrayMerge: defaultArrayMerge }
  const arrayMerge = options.arrayMerge || defaultArrayMerge
  if (array) {
    return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
  } else {
    return mergeObject(target, source, optionsArgument)
  }
}

export default deepMerge
