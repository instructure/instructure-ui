'use strict'

const webpack = require('webpack')

module.exports = function (ciMode) {
  const config = {
    devtool: 'inline-source-map',
    cache: true,
    module: {
      loaders: [
        // https://github.com/webpack/webpack/issues/828
        { test: /semver\.browser\.js/, loaders: ['imports?define=>undefined'] }
      ]
    }
  }

  if (ciMode) {
    config.plugins = [new webpack.NoErrorsPlugin()]
  }

  return require('./util/generate-config')(config)
}
