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

// Load instui canvas theme
require('@instructure/ui-themes/lib/canvas')

// Make testing libraries available globally

const chai = require('chai')
const sinon = require('sinon')

chai.should()
global.chai = chai
global.expect = chai.expect
global.sinon = sinon

const Testbed = require('@instructure/ui-testbed')

global.Testbed = Testbed
Testbed.init()

// Set expected default lang
document.documentElement.lang = 'en'
