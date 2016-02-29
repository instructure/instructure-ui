module.exports = function (content) {
  this.cacheable && this.cacheable()

  return [
    'if (module.hot) {',
    '  module.hot.accept([]);',
    '}',
    'module.exports = ' + JSON.stringify(this.exec(content, this.resource).toString())
  ].join('\n')
}
