/* eslint no-var: 0 */
'use strict'

var glob = require('glob')
var path = require('path')
var config = require('../util/config')
var testPatterns = require('../util/test-patterns')
var requirePath = require('../util/require-path')

module.exports = function () {
  this.cacheable && this.cacheable()

  var components = glob.sync(config.components.files)
    .filter(function (componentPath) {
      return testPatterns(componentPath, config.components.excludes || [])
    })
    .map(globalizeComponent)

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    components.join('\n')
  ].join('\n')
}

function globalizeComponent (filepath) {
  return 'window.' + path.basename(filepath, path.extname(filepath)) + ' = ' + requirePath(filepath) + '.default;'
}
