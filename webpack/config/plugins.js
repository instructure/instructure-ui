/* eslint no-var: 0 */
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

module.exports = function (options) {
  options = options || {}
  var plugins = []

  if (options.env === 'test') {
    return []
  } else if (options.env === 'production') {
    plugins = [
      new ExtractTextPlugin('[name].css', { allChunks: true })
    ]
  }

  if (options.minify === true) {
    plugins = plugins.concat(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          except: ['require', 'export', '$super']
        },
        compress: {
          warnings: false,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      })
    )
  }

  return plugins
}

