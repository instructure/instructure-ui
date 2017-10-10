/**
 * ---
 * category: utilities
 * ---
 */
export default function warning (condition, message, ...args) {
  if (!condition && process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
    console.error.apply(undefined, [`Warning: ${message}`, ...args])
  }
}
