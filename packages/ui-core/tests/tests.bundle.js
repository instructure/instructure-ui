// clear the console before rebundling.
/* eslint-disable no-console */
if (typeof console.clear === 'function') {
  console.clear()
}
/* eslint-enable no-console */

/*
  eslint-disable
    import/no-dynamic-require,
    import/no-extraneous-dependencies,
    import/no-webpack-loader-syntax,
    import/no-unresolved
*/
require('@instructure/ui-polyfill-loader!')
require('!!style-loader!css-loader!./tests.css')
/*
  eslint-enable
    import/no-dynamic-require,
    import/no-extraneous-dependencies,
    import/no-webpack-loader-syntax,
    import/no-unresolved
*/

require('../src/themes')

// utils
const utilsContext = require.context('./util', true)
utilsContext.keys().forEach(utilsContext)

// tests
const testsContext = require.context('../src', true, /\.test\.js$/)
testsContext.keys().forEach(testsContext)
