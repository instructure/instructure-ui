Testbed.init()

// eslint-disable-next-line import/no-extraneous-dependencies
require('@instructure/ui-themes/lib/canvas')

const testsContext = require.context('./src', true, /\.test\.js$/)
testsContext.keys().forEach(testsContext)
