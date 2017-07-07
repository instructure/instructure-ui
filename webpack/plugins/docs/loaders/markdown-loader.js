const glob = require('glob') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
const loaderUtils = require('loader-utils')

module.exports = function MarkdownLoader () {
  this.cacheable && this.cacheable()

  const { files } = loaderUtils.getOptions(this)

  let docs = [
    processDocs(path.join(process.cwd(), 'README.md')),
    processDocs(path.join(process.cwd(), 'CHANGELOG.md'))
  ]

  docs = docs.concat(
    glob.sync(files)
      .map(processDocs)
  )

  return `
module.hot && module.hot.accept([])
module.exports = [${docs.join(',')}]
`
}

function processDocs (filepath) {
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
