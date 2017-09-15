const path = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('@instructure/ui-presets/karma')({
  bundle: './tests.bundle.js',
  coverageThreshold: {
    global: {
      lines: 91
    },
    each: {
      lines: 50
    }
  },
  coverageDirectory: path.join(__dirname, '../../coverage/ui-core')
})
