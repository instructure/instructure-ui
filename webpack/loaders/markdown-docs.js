/* eslint no-var: 0 */
'use strict'

var glob = require('glob')
var path = require('path')
var config = require('../util/config')
var testPatterns = require('../util/test-patterns')
var requirePath = require('../util/require-path')

module.exports = function () {
  this.cacheable && this.cacheable()

  var docs = glob.sync(config.docs.files)
    .filter(function (docsPath) {
      return testPatterns(docsPath, config.docs.excludes || [])
    })
    .map(processDocs)

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = [' + docs.join(',') + '];'
  ].join('\n')
}

function processDocs (filepath) {
  return '{' + [
    'filePath: ' + JSON.stringify(filepath),
    'html: ' + requirePath(filepath),
    'name: ' + JSON.stringify(path.basename(filepath, path.extname(filepath)).replace(/^\d+\-/, ''))
  ].join(',') + '}'
}
