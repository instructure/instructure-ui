/**
 * ---
 * category: utilities
 * ---
 * Deep merge N objects into a single result object.
 * Merging creates a new object, so that none of the arguments are modified.
 *
 * @param {Object} arguments objects to merge
 * @returns {Object} a new object with items from all arguments
 */
export default function mergeDeep () {
  const args = [...arguments]
  let target = {}

  args.forEach((arg) => {
    target = mergeSourceIntoTarget(target, arg)
  })

  return target
}

function mergeSourceIntoTarget (target, source) {
  if (isObject(source)) {
    const keys = [ ...Object.keys(source), ...Object.getOwnPropertySymbols(source) ]
    const merged = { ...target }

    keys.forEach((key) => {
      if (isObject(target[key]) && isObject(source[key])) {
        merged[key] = mergeSourceIntoTarget(target[key], source[key])
      } else if (isArray(source[key]) && isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...source[key]])]
      } else if (isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...[source[key]]])]
      } else {
        merged[key] = source[key]
      }
    })

    return merged
  } else {
    return {...target}
  }
}

function isObject (item) {
  return (item && (typeof item === 'object' || typeof item === 'function') && !Array.isArray(item))
}

function isArray (item) {
  return (item && Array.isArray(item))
}
