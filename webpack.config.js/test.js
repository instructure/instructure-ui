/* eslint no-var: 0 */

var _ = require('lodash')
var sharedConfig = require('./shared')('test')

var modulesDirectories = [ 'lib/utils/TestUtils' ].concat(sharedConfig.resolve.modulesDirectories || [])

var config = _.merge({}, sharedConfig, {
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    modulesDirectories: modulesDirectories
  }
})

module.exports = config
