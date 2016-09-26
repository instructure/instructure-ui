/* eslint no-var: 0 */
'use strict'

module.exports = function () {
  return require('./util/generate-config')({
    cache: true,
    devtool: 'inline-source-map',
    module: {
      loaders: [
        // https://github.com/webpack/webpack/issues/828
        { test: /semver\.browser\.js/, loaders: ['imports?define=>undefined'] }
      ]
    }
  })
}
