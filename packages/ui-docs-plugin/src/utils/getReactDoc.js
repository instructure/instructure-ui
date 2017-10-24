const reactDocgen = require('react-docgen')

const ERROR_MISSING_DEFINITION = 'No suitable component definition found.'

module.exports = function getReactDoc (source, error) {
  let doc = {}

  try {
    doc = reactDocgen.parse(source)
  } catch (err) {
    if (err.message !== ERROR_MISSING_DEFINITION) {
      error(err)
    }
  }

  return doc
}
