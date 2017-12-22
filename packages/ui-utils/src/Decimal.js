import Decimal from 'decimal.js/decimal'

// Decimal configuration
Decimal.set({
  /**
  * The maximum number of significant digits of the result of an operation.
  */
  precision: 100,
  /**
  * The positive exponent value at and above which toString returns scientific notation.
  */
  toExpPos: 100
})

/**
 * ---
 * category: utilities
 * ---
 * A wrapper for [decimal.js-light](https://www.npmjs.com/package/decimal.js-light)
 */
export default Decimal
