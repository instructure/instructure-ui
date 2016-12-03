const { polyfills } = require('../util/loadConfig')
const coreJSBuilder = require('core-js-builder')

module.exports = function () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  coreJSBuilder({ modules: polyfills, umd: false, library: false })
    .then(code => callback(null, code))
    .catch(error => callback(error))
}
