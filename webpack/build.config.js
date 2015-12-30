/* eslint no-var: 0 */
'use strict'

var config = require('./util/config')

module.exports = require('./util/generate-config')({
  output: {
    libraryTarget: 'commonjs2',
    path: config.buildPath + '/lib'
  },
  externals: require('./util/externals')
}, process.env.NODE_ENV, process.env.MINIFY)
