/* eslint no-var: 0 */
'use strict'

var glob = require('glob')
var config = require('../util/config')
var testPatterns = require('../util/test-patterns')
var requirePath = require('../util/require-path')

module.exports = function () {
  this.cacheable && this.cacheable()

  var tests = glob.sync(config.tests.files)
    .filter(function (testPath) {
      return testPatterns(testPath, config.tests.excludes || [])
    })
    .map(requirePath)

  return tests.join('\n')
}
