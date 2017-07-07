const path = require('path')
const coreJSBuilder = require('core-js-builder') // eslint-disable-line import/no-extraneous-dependencies

const options = require( // eslint-disable-line import/no-dynamic-require
  path.join(process.cwd(), 'babel-polyfill.json')
)

module.exports = function () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  Promise.resolve().then(() => {
    return coreJSBuilder(options)
      .then(code => callback(null, code))
  }).catch((error) => {
    callback(error)
  })
}
