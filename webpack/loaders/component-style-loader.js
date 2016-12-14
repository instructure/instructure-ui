const {
  transformRequire,
  transformCss
} = require('../util/themeableCSSTransform')

module.exports = function (content) {
  this.cacheable && this.cacheable()

  let result = this.exec(content, this.resource)
  let css = result.toString()

  try {
    css = transformCss(css)
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }

  try {
    result = transformRequire(result.locals, css)
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }

  return `
module.hot && module.hot.accept([])
module.exports = ${result}
`
}
