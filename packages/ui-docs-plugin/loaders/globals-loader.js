const loaderUtils = require('loader-utils')

module.exports = function GlobalsLoader () {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const initGlobals = require.resolve('@instructure/ui-docs-client')
  const pkgMain = options.library.packageMain

  return `
    // Activate hot module replacement
    module.hot && module.hot.accept()

    const initGlobals = require('!!${initGlobals}').initGlobals
    const library = ${JSON.stringify(options.library)}

    initGlobals({ React: ${requirePath('react')}, ReactDOM: ${requirePath('react-dom')} })
    initGlobals(${requirePath(options.library.packageName)})
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
