/* eslint no-var: 0 */
'use strict'

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var result = this.exec(content, this.resource)

  result = Object.assign(
    {},
    result.locals, // css modules class names
    {
      _cssText: result.toString()
    }
  )

  result = [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = ' + JSON.stringify(result)
  ].join('\n')

  return result
}
