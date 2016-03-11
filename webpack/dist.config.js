/* eslint no-var: 0 */
'use strict'

var options = require('./util/config')
var entry = {}
var entryName = options.library.packageName

if (process.env.MINIFY) {
  entryName = entryName + '.min'
}

entry[entryName] = options.library.main

var config = require('./util/generate-config')({
  entry: entry,
  output: {
    path: options.distPath,
    filename: '[name].js',
    library: options.library.name,
    libraryTarget: 'umd'
  },
  externals: require('./util/externals')
}, 'production', process.env.MINIFY)

module.exports = config
