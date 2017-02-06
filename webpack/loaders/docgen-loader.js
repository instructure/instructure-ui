const docgen = require('react-docgen')
const matter = require('gray-matter')

// based on https://github.com/eisisig/docgen-loader/blob/master/index.js
module.exports = function (source) {
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
