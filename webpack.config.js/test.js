/* eslint no-var: 0 */

var _ = require('lodash')

module.exports = _.extend({
  cache: true,
  devtool: 'inline-source-map'
}, require('./shared'))
