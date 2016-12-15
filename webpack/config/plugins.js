const DefinePlugin = require('webpack/lib/DefinePlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin')

module.exports = function (env, minify, debug) {
  let plugins = [
    new LoaderOptionsPlugin(require('./loaderOptions')(env, debug)),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ]

  if (minify) {
    plugins = plugins.concat([
      new UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      })
    ])
  }

  if (!debug || env === 'production') {
    plugins = plugins.concat([
      new NoErrorsPlugin()
    ])
  } else {
    plugins = plugins.concat([
      new SourceMapDevToolPlugin()
    ])
  }

  return plugins
}
