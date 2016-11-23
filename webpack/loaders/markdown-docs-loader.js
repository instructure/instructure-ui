const glob = require('glob')
const path = require('path')
const { files } = require('../util/loadConfig')
const requirePath = require('../util/requirePath')

module.exports = function () {
  this.cacheable && this.cacheable()

  let docs = [ processDocs(path.join(process.cwd(), 'README.md')) ]

  docs = docs.concat(
    glob.sync(files.docs)
      .map(processDocs)
  )

  return [
    'module.hot && module.hot.accept([])',
    'module.exports = [' + docs.join(',') + '];'
  ].join('\n')
}

function processDocs (filepath) {
  return '{' + [
    'path: ' + JSON.stringify(filepath),
    'doc: ' + requirePath(filepath),
    'name: ' + JSON.stringify(docNameFromPath(filepath))
  ].join(',') + '}'
}

function docNameFromPath (filepath) {
  return path.basename(filepath, path.extname(filepath)).replace(/^\d+\-/, '')
}
