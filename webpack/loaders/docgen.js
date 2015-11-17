/* eslint no-var: 0 */
var docgen = require('react-docgen')
var path = require('path')
var paths = require('../../paths')
// based on https://github.com/eisisig/docgen-loader/blob/master/index.js
module.exports = function (source) {
  this.cacheable && this.cacheable()

  var requestPath = path.relative(paths.root, this.request.split('!')[1])
  var value = {}

  /* eslint-disable no-console */
  try {
    value = docgen.parse(source)
    value.path = requestPath
    console.log('generated docs for', requestPath)
  } catch (e) {
    console.log('Error when parsing', requestPath)
    console.log(e.toString())
    console.log()
  }
  /* eslint-enable no-console */

  this.values = [value]
  return [
    'if (module.hot) {',
    ' module.hot.accept([]);',
    '}',
    'module.exports = ' + JSON.stringify(value, undefined, '\t')
  ].join('\n')
}
