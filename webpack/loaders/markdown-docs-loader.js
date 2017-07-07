const glob = require('glob') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')

const { files } = require( // eslint-disable-line import/no-dynamic-require
  path.join(process.cwd(), 'themeable.config.js')
)

module.exports = function () {
  this.cacheable && this.cacheable()

  let docs = [
    processDocs(path.join(process.cwd(), 'README.md')),
    processDocs(path.join(process.cwd(), 'CHANGELOG.md'))
  ]

  docs = docs.concat(
    glob.sync(files.docs)
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
  doc: ${requirePath(filepath)},
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
