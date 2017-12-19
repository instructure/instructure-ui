const loadConfig = require('../../loadConfig')

const config = loadConfig('mocha')

/* eslint-disable immutable/no-mutation */

// Compile imports with babel
require('babel-register')({
  ignore: function (filename) {
    return filename.endsWith('.config.js') || filename.includes('node_modules')
  }
})

// Set up a fake browser environment
require('jsdom-global')(null, {
  url: 'http://example.com/',
  beforeParse (window) {
    // NOTE: jsdom doesn't have URL.createObjectURL API - stub it here
    Object.assign(window, {
      scroll () {}
    })
  }
})

// Make testing libraries available globally
const Testbed = require('@instructure/ui-testbed')

global.Testbed = Testbed
Testbed.init()

// Set expected default lang
document.documentElement.lang = 'en'
