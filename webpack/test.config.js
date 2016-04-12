/* eslint no-var: 0 */
'use strict'

var path = require('path')
var config = require('./util/config')

module.exports = require('./util/generate-config')({
  cache: true,
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'isparta',
        include: path.join(config.rootPath, 'lib'),
        exclude: config.components.excludes
      }
    ]
  }
})
