/* eslint no-var: 0 */
'use strict'

var options = require('./util/config')
var entry = {}
var entryName = options.library.name

if (process.env.MINIFY) {
  entryName = entryName + '.min'
}

entry[entryName] = options.library.main

module.exports = require('./util/generate-config')({
  entry: entry,
  devtool: 'source-map',
  output: {
    path: options.distPath,
    filename: '[name].js',
    library: options.libraryName,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react/addons': 'React'
  }
}, 'production', process.env.MINIFY)
