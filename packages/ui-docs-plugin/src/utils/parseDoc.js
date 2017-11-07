const path = require('path')
const getJSDoc = require('./getJSDoc')
const getCodeDoc = require('./getCodeDoc')
const getReactDoc = require('./getReactDoc')
const getFrontMatter = require('./getFrontMatter')

module.exports = function (resourcePath, source, errorHandler) {
  const extension = path.extname(resourcePath)

  let doc = {}

  if (extension === '.md') {
    doc = { description: source }
  } else if (extension === '.js') { // TODO: make the extention(s) here configurable
    doc = getReactDoc(source, errorHandler)

    if (!doc.props) {
      doc = getJSDoc(source, errorHandler)
    }
  } else {
    doc = getCodeDoc(source, errorHandler)
  }

  return {
    ...doc,
    ...getFrontMatter(doc.description)
  }
}
