/**
 * ---
 * category: utilities
 * ---
 * Capitalize the first letter in a string
 * @param {String} str
 */
export default function capitalizeFirstLetter (str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str
}
