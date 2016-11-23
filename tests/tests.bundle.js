'use strict'

require('!!style-loader!css-loader!./tests.css')

// clear the console before rebundling.
/* eslint-disable no-console */
if (typeof console.clear === 'function') {
  console.clear()
}
/* eslint-enable no-console */

// utils
const utilsContext = require.context('./util', true)
utilsContext.keys().forEach(utilsContext)

// tests
const testsContext = require.context('../lib', true, /\.test\.js$/)
testsContext.keys().forEach(testsContext)
