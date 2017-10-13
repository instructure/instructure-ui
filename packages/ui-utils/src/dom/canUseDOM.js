/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Performs simple test to determine if DOM can be accessed
 * @module
 * @returns {boolean} whether the dom can be used
 */
export default !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
