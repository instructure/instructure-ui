/* eslint no-var: 0 */

var path = require('path')
var paths = require('../paths')
var generateConfig = require('./util/generate-config')
var pkg = require('../package.json')

var entry = {}
entry[pkg.name + '.min'] = path.join(paths.root, pkg.main)

module.exports = generateConfig({
  entry: entry
}, {
  env: 'production',
  minify: true,
  dist: true
})
