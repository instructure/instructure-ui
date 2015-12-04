/* eslint no-var: 0 */
'use strict'

module.exports = function testPatterns (str, patterns) {
  var matches = 0
  patterns.forEach(function (pattern) {
    if (pattern.test(str)) {
      matches++
    }
  })
  return !matches
}
