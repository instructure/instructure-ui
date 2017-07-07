// eslint-disable-next-line import/no-extraneous-dependencies
const loaderUtils = require('loader-utils')

module.exports = function GlobalsLoader () {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const initGlobals = require.resolve('../client/dist/globals.js')

  return `
    // Activate hot module replacement
    module.hot && module.hot.accept()

    const initGlobals = require('${initGlobals}').default
    const library = ${JSON.stringify(options.library)}

    initGlobals(global[library.name])
    initGlobals(${processGlobalOptions(options.globals)})
  `
}

function requirePath (filepath) {
  return `require(${JSON.stringify(filepath)})`
}

function processGlobalOptions (options) {
  const globals = Object.keys(options).map((name) => {
    const value = requirePath(options[name])
    return `${name}: ${value}.default || ${value}` // handle es6 modules
  })
  return `{ ${globals.join(',\n')} }`
}
