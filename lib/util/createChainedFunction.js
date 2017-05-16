/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * Forked from: https://github.com/react-bootstrap/react-overlays/blob/master/src/utils/createChainedFunction.js
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction (...funcs) {
  return funcs
    .filter((f, i) => {
      if (f == null) {
        return false
      }

      // Only allow the first of identical functions
      const indexes = getAllIndexes(funcs, f)
      return indexes.length === 1 || i === indexes[0]
    })
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.')
      }

      if (acc === null) {
        return f
      }

      return function chainedFunction (...args) {
        acc.apply(this, args)
        f.apply(this, args)
      }
    }, null)
}

export default createChainedFunction

/**
 * Find all indexes for a value in an Array
 *
 * @param {array} arr The Array to search for val
 * @param {*} val The value to find indexes for
 * @return {array} All the indexes of the Array matching val
 */
function getAllIndexes (arr, val) {
  const indexes = []

  arr.forEach((e, i) => {
    if (e === val) {
      indexes.push(i)
    }
  })

  return indexes
}
