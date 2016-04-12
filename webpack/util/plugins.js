/* eslint no-var: 0 */
'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var config = require('./config')

module.exports = function (env, minify) {
  var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ]

  if (env === 'production') {
    plugins = plugins.concat(
      new ExtractTextPlugin('[name].css', { allChunks: true })
    )
  } else if (env === 'build') {
    var cssFilePath = process.argv[2]
    plugins = plugins.concat(
      new ExtractTextPlugin(path.relative(config.buildPath, cssFilePath))
    )
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

