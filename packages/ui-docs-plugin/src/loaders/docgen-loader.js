const loaderUtils = require('loader-utils')
const getDocId = require('../utils/getDocId')
const getDocTitle = require('../utils/getDocTitle')
const getOptions = require('../utils/getOptions')
const parseDoc = require('../utils/parseDoc')
const getPathInfo = require('../utils/getPathInfo')

module.exports = function DocgenLoader (source) {
  this.cacheable && this.cacheable()

  const context = this.context || process.cwd()
  const options = getOptions(loaderUtils.getOptions(this))
  const pathInfo = getPathInfo(this.resourcePath, options, context)

  let doc = parseDoc(this.resourcePath, source, (err) => {
    console.warn('\x1b[33m%s\x1b[0m', '[docgen-loader]: Error when parsing ', this.request)
    console.warn(err.toString())
  })

  doc = {
    ...doc,
    ...pathInfo
  }

  doc.id = getDocId(doc, options, context, (template) => {
    return loaderUtils.interpolateName(this, template, {})
  })

  doc.title = getDocTitle(doc, options, context, (template) => {
    return loaderUtils.interpolateName(this, template, {})
  })

  return `
module.hot && module.hot.accept([])
const doc = ${JSON.stringify(doc)}
${doc.extension === '.js' ? `doc.resource = ${doc.requireStr}` : ''}
module.exports = doc
`
}
