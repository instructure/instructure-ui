/* eslint no-var: 0 */
var merge = require('webpack-merge')
var paths = require('../../paths')
var path = require('path')
var pkg = require('../../package')

module.exports = function (config, options) {
  options = options || {
    dist: false,
    minify: false,
    env: 'development'
  }

  var alias = {}
  alias[pkg.name] = path.join(paths.root, pkg.main)

  var defaults = {
    resolve: {
      root: paths.root,
      modulesDirectories: [
        'lib/components',
        'node_modules',
        '.'
      ],
      alias: alias
    },
    resolveLoader: {
      root: paths.root,
      modulesDirectories: [
        'webpack/loaders',
        'node_modules',
        '.'
      ]
    },
    module: require('../config/module')(options),
    plugins: require('../config/plugins')(options),
    postcss: require('../config/postcss')(options)
  }

  if (options.dist === true) {
    defaults = merge(defaults, {
      devtool: 'source-map',
      output: {
        path: paths.distBuild,
        filename: '[name].js',
        library: pkg.name,
        libraryTarget: 'umd'
      },
      externals: {
        'react': 'React',
        'react-dom': 'React',
        'react/addons': 'React'
      }
    })
  }

  return merge(defaults, config)
}
