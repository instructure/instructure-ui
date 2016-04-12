/* eslint no-var: 0 */
'use strict'

var merge = require('webpack-merge')
var path = require('path')

var config = require('../util/config')

module.exports = function (overrides) {
  var defaults = {
    resolve: {
      root: config.rootPath,
      modulesDirectories: [
        path.resolve(__dirname, '../../node_modules'),
        'node_modules'
      ]
    },
    resolveLoader: {
      modulesDirectories: [
        path.resolve(__dirname, '../loaders'),
        path.resolve(__dirname, '../../node_modules'),
        'node_modules'
      ]
    },
    module: require('./module-loaders')(process.env.NODE_ENV),
    plugins: require('./plugins')(process.env.NODE_ENV, process.env.MINIFY),
    postcss: require('./postcss')(process.env.NODE_ENV)
  }
  return merge(defaults, overrides, config.webpack)
}
