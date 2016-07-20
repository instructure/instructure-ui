/* eslint no-var: 0 */
'use strict'

var flat = require('flat')

module.exports = function transformCssVariables (obj) {
  return flat(obj, { delimiter: '-' })
}
