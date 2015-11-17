/* eslint no-var: 0 */
var path = require('path')
var paths = require('../paths')
var pkg = require('../package')
var entry = {}

entry[pkg.name] = path.join(paths.root, pkg.main)

module.exports = require('./util/generate-config')({
  entry: entry
}, { env: 'production', dist: true })
