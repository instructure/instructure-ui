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

  var docs = glob.sync(config.docs.files)
    .filter(function (docsPath) {
      return testPatterns(docsPath, config.docs.excludes || [])
    })
    .map(processDocs)

  var lib = config.library.main ? '  lib: ' + requirePath(config.library.main) + ',' : ''

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = {',
    '  documents: [' + docs.join(',') + '],',
    lib,
    '  components: [' + components.join(',') + ']',
    '};'
  ].join('\n')
}

function processComponent (filepath) {
  return '{' + [
    'name: ' + JSON.stringify(path.basename(filepath, path.extname(filepath))),
    'filePath: ' + JSON.stringify(filepath),
    'relativePath: ' + JSON.stringify(path.relative(config.rootPath, filepath)),
    'module: ' + requirePath(filepath) + '.default', // need to use .default to work with ES6 exports
    'doc: ' + requirePath('!!docgen!' + filepath)
  ].join(',') + '}'
}

function processDocs (filepath) {
  return '{' + [
    'filePath: ' + JSON.stringify(filepath),
    'html: ' + requirePath(filepath),
    'name: ' + JSON.stringify(path.basename(filepath, path.extname(filepath)).replace(/^\d+\-/, ''))
  ].join(',') + '}'
}
