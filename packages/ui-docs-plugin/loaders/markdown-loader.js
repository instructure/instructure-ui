const globby = require('globby')
const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function MarkdownLoader () {
  this.cacheable && this.cacheable()

  const { files } = loaderUtils.getOptions(this)
  const docs = globby.sync(files).map(processDocs)

  return `
module.hot && module.hot.accept([])
module.exports = [${docs.join(',')}]
`
}

function processDocs (filepath) {
  console.log(`[ui-docs-plugin]: ${path.relative(process.cwd(), filepath)}`) // eslint-disable-line no-console

  return `
{
  path: ${JSON.stringify(filepath)},
  doc: ${requirePath(`html-loader!markdown-loader!${filepath}`)},
  name: ${JSON.stringify(docNameFromPath(filepath))}
}
`
}

function docNameFromPath (filepath) {
  return path.basename(filepath, path.extname(filepath)).replace(/^\d+\-/, '')
}

function requirePath (filepath) {
  return `require(${JSON.stringify(filepath)})`
}
