/**
 * ---
 * category: utilities
 * ---
 * Converts a CSS unit value combination into an array of type [ value, unit ]
 *
 * @module parseUnit
 *
 * Example inputs:
 *  - '100px'
 *  - '20rem'
 *  - '10vh'
 *  - '400vmin'
 *
 * @param {string} str
 * @returns {Array} Returns array of shape [ value, unit ]
*/

export default function parseUnit (str) {
  const value = `${str}`
  return [
    parseFloat(value, 10),
    value.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
  ]
}
