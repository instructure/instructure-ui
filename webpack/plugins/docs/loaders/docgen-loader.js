const docgen = require('react-docgen') // eslint-disable-line import/no-extraneous-dependencies
const matter = require('gray-matter') // eslint-disable-line import/no-extraneous-dependencies

// based on https://github.com/eisisig/docgen-loader/blob/master/index.js
module.exports = function DocGenLoader (source) {
  this.cacheable && this.cacheable()

  let value = {}

  /* eslint-disable no-console */
  try {
    value = docgen.parse(source)
    const valueMatter = matter(value.description)
    value.description = valueMatter.content
    value.data = valueMatter.data
  } catch (e) {
    console.warn('Error when parsing', this.request)
    console.log(e.toString())
  }
  /* eslint-enable no-console */

  return `
  module.hot && module.hot.accept([])
  module.exports = ${JSON.stringify(value, undefined, '\t')}
`
}
