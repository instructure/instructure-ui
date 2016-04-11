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
    .map(processComponent)

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = {',
    '  components: [' + components.join(',') + ']',
    '};'
  ].join('\n')
}

function processComponent (filepath) {
  return '{' + [
    'name: ' + JSON.stringify(componentNameFromPath(filepath)),
    'path: ' + JSON.stringify(path.relative(config.rootPath, filepath)),
    'doc: ' + requirePath('!!docgen!' + filepath)
  ].join(',') + '}'
}

function componentNameFromPath (filepath) {
  var parts = path.dirname(filepath).split(path.sep)
  return parts[parts.length - 1]
}
