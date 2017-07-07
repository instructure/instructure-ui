const path = require('path')

const config = require( // eslint-disable-line import/no-dynamic-require
  path.join(process.cwd(), 'themeable.config.js')
)

module.exports = function () {
  this.cacheable && this.cacheable()
  return `
module.hot && module.hot.accept([])
module.exports = ${JSON.stringify(config)}
`
}
