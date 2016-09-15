/* eslint no-var: 0 */
'use strict'

var path = require('path')
var glob = require('glob')
var config = require('./util/config')
var componentNameFromPath = require('./util/component-name-from-path')

var entry = {}
var libEntry = config.library.packageName

if (process.env.MINIFY) {
  libEntry = libEntry + '.min'
}

entry[libEntry] = [ path.join(config.rootPath, config.library.main) ]

glob.sync(config.components.files)
  .map(function (filepath) {
    var name = componentNameFromPath(filepath)
    if (process.env.MINIFY) {
      name = name + '.min'
    }
    entry[name] = [ path.join(config.rootPath, filepath) ]
  })

module.exports = require('./util/generate-config')({
  entry: entry,
  output: {
    path: config.distPath,
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  externals: require('./util/externals')
})
