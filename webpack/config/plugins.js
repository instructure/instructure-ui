const DefinePlugin = require('webpack/lib/DefinePlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')

module.exports = function (env, minify, debug) {
  let plugins = [
    new LoaderOptionsPlugin(require('./loaderOptions')(env, debug)),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
        'DEBUG': !!debug
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
      new NoEmitOnErrorsPlugin()
    ])
  } else {
    plugins = plugins.concat([
      new SourceMapDevToolPlugin(),
      new NamedModulesPlugin()
    ])
  }

  return plugins
}
