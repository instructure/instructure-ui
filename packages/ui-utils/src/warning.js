/**
 * ---
 * category: utilities
 * ---
 * @param {Boolean} condition a condition that we expect to be true
 * @param {String} message a message to display as a console warning in DEV env when condition is false
 */
export default function warning (condition, message, ...args) {
  if (!condition && process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
    console.warn.apply(undefined, [`Warning: ${message}`, ...args])
  }
}
