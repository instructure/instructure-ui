/* eslint no-var: 0 */
var isFunction = require('lodash/isFunction')

// clear the console before rebundling.
/* eslint-disable no-console */
if (isFunction(console.clear)) {
  console.clear()
}
/* eslint-enable no-console */

// utils
var utilsContext = require.context('./util', true, /\.js$/)
utilsContext.keys().forEach(utilsContext)

// tests
require('tests!')
