const transformCustomProps = require('../../babel/plugins/util/postcss-themeable-styles')
const transformCssRequire = require('../../babel/plugins/util/transform-css-require')
const postcss = require('postcss')

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const loader = this
  const callback = loader.async()
  const file = loader.resourcePath

  source = this.exec(source, loader.resource) // eslint-disable-line no-param-reassign
  map = (typeof map === 'string') ? JSON.parse(map) : map  // eslint-disable-line no-param-reassign

  const opts = {
    from: file,
    to: file,
    map: {
      inline: false, // inline sourcemaps will break the js templates
      annotation: false,
      prev: (map && map.mappings) ? map : undefined
    }
  }

  Promise.resolve().then(() => {
    return postcss([transformCustomProps])
      .process(source.toString(), opts)
      .then((result) => {
        result.warnings().forEach(function (msg) {
          loader.emitWarning(msg.toString())
        })
        // add extra require here to make webpack watch work in dev and test env
        callback(
          null,
          `module.exports = ${transformCssRequire(source.locals, result.css)}`,
          result.map ? result.map.toJSON() : null
        )
      })
  }).catch((error) => {
    callback(error)
  })
}
