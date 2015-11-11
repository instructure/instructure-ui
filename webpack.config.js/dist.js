/* eslint no-var: 0 */

var path = require('path')
var _ = require('lodash')

var pkg = require('../package')
var baseDir = process.cwd()
var entry = {}

entry[pkg.name] = pkg.main

module.exports = _.merge({}, require('./shared')(), {
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.resolve(baseDir, '__dist__'),
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  }
})
