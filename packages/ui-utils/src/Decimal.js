import Decimal from 'decimal.js/decimal'

/**
 * ---
 * category: utilities
 * ---
 * A wrapper for [decimal.js-light](https://www.npmjs.com/package/decimal.js-light)
 *
 * @module Decimal
 */
Decimal.set({
  precision: 100,
  toExpPos: 100
})

export default Decimal
