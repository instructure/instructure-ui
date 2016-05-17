/**
 * Check if value `one` is inside or equal to the `_of` value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
export default function isOneOf (one, _of) {
  if (Array.isArray(_of)) {
    return _of.indexOf(one) >= 0
  }
  return one === _of
}
