import parseUnit from './parseUnit'

/**
 * ---
 * category: utilities
 * ---
 * Converts a unit value time combination (s, ms) to a number representing ms
 *
 * @module ms
 *
 * Example inputs:
 *  - '100s'
 *  - '20ms'
 *
 * @param {String} val
 * @returns {Number} Returns numerical representation of milliseconds
*/
export default function ms (val) {
  if (!val || typeof val === 'number') {
    return val
  }

  const [ num, unit ] = parseUnit(val)

  if (unit === 'ms') {
    return num
  } else if (unit === 's') {
    return num * 1000
  } else {
    return num
  }
}
