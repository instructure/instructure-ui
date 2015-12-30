/* eslint no-var: 0 */
'use strict'

var merge = require('webpack-merge')
var path = require('path')

var opts = require('../util/config')

module.exports = function (config, env, minify) {
  return merge({
    resolve: {
      root: opts.rootPath,
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
    module: require('./module-loaders')(env),
    plugins: require('./plugins')(env, minify),
    postcss: require('./postcss')(minify)
  }, config, opts.webpack)
}
