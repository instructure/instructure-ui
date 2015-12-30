/* eslint no-var: 0 */
'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var config = require('./config')

module.exports = function (env, minify) {
  var plugins = []

  if (env === 'production') {
    plugins = [
      new ExtractTextPlugin('[name].css', { allChunks: true })
    ]
  } else if (env === 'build') {
    var cssFilePath = process.argv[2]
    plugins = [
      new ExtractTextPlugin(path.relative(config.buildPath, cssFilePath))
    ]
  }

  if (minify) {
    plugins = plugins.concat(
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        mangle: false
      })
    )
  }

  return plugins
}

