/* eslint no-var: 0 */
'use strict'

var path = require('path')

module.exports = function componentNameFromPath (filepath) {
  var parts = path.dirname(filepath).split(path.sep)
  return parts[parts.length - 1]
}
