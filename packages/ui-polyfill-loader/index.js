const path = require('path')
const coreJSBuilder = require('core-js-builder')
const loaderUtils = require('loader-utils')
const { loadConfig, POLYFILLRC } = require('@instructure/ui-config')

module.exports = function BabelPolyFillLoader () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const options = loaderUtils.getOptions(this) || loadConfig(POLYFILLRC)

  Promise.resolve().then(() => {
    return coreJSBuilder({
      modules: options || [],
      library: false
    }).then(code => callback(null, code))
  }).catch((error) => {
    callback(error)
  })
}
