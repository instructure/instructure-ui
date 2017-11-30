/**
 * ---
 * category: utilities
 * ---
 * Determines if one numerical value (a) is within a designated range (diff) of another (b)
 *
 * @module within
 *
 * @param {number} a
 * @param {number} b
 * @param {number} [diff=1]
 * @returns {Boolean} Returns true if a is within the diff range of b
*/

export default function within (a, b, diff = 1) {
  return a + diff >= b && b >= a - diff
}
