/* eslint no-var: 0 */
'use strict'

var path = require('path')
var config = require('./util/config')

module.exports = function (isDebugMode) {
  return require('./util/generate-config')({
    cache: true,
    devtool: 'inline-source-map',
    module: {
      preLoaders: isDebugMode ? [] : [
        {
          test: /\.js$/,
          loader: 'isparta',
          include: path.join(config.rootPath, 'lib'),
          exclude: config.components.excludes
        }
      ],
      loaders: [
        // https://github.com/webpack/webpack/issues/828
        { test: /semver\.browser\.js/, loaders: ['imports?define=>undefined'] }
      ]
    }
  })
}
