module.exports = function () {
  this.cacheable && this.cacheable()

  return [
    'module.hot && module.hot.accept([])',
    'module.exports = ' + JSON.stringify(require('../util/loadConfig'))
  ].join('\n')
}
