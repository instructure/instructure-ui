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
        'node_modules'
      ]
    },
    resolveLoader: {
      modulesDirectories: [
        path.resolve(__dirname, '../loaders'),
        'node_modules'
      ]
    },
    module: require('./module-loaders')(process.env.NODE_ENV),
    plugins: require('./plugins')(process.env.NODE_ENV, process.env.MINIFY)
  }
  return merge(defaults, overrides, config.webpack)
}
