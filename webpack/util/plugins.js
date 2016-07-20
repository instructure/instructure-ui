/* eslint no-var: 0 */
'use strict'

var webpack = require('webpack')

module.exports = function (env, minify) {
  var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ]

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
