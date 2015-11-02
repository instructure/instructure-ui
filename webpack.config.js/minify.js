/* eslint no-var: 0 */

var path = require('path')
var webpack = require('webpack')

var pkg = require('../package.json')
var baseDir = process.cwd()

var config = require('./dist')

config.devtool = 'source-map'
config.entry = {}
config.entry[pkg.name + '.min'] = path.resolve(baseDir, pkg.main)

config.plugins = config.plugins.concat(
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

config.postcss = config.postcss.concat([
  require('csswring'),
  require('postcss-discard-duplicates')()
])

module.exports = config
