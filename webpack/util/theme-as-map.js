/* eslint no-var: 0 */
'use strict'

var glob = require('glob')
var path = require('path')
var config = require('./config')

require('babel-register')

var themeConfig = require(path.join(config.rootPath, config.theme.config)).default

module.exports = function () {
  return glob.sync(path.join(config.rootPath, config.theme.files))
    .map(processTheme)
}

function processTheme (filepath) {
  return {
    [path.basename(filepath, path.extname(filepath))]: require(filepath).default(themeConfig)
  }
}
