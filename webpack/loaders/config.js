/* eslint no-var: 0 */
'use strict'

var config = require('../util/config')

module.exports = function () {
  this.cacheable && this.cacheable()

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = ' + JSON.stringify(config)
  ].join('\n')
}

