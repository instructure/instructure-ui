const isObject = function (item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}

const mergeSourceIntoTarget = function (target, source) {
  const merged = Object.assign({}, target)

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(merged, { [key]: source[key] })
        } else {
          merged[key] = mergeDeep(target[key], source[key])
        }
      } else {
        Object.assign(merged, { [key]: source[key] })
      }
    })
  }

  return merged
}

export default function mergeDeep () {
  const args = [...arguments]
  let target = {}

  args.forEach(function (arg) {
    target = mergeSourceIntoTarget(target, arg)
  })

  return target
}
