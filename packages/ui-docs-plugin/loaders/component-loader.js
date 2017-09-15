const globby = require('globby')
const path = require('path')
const loaderUtils = require('loader-utils')

const loader = require.resolve('./docgen-loader')

module.exports = function ComponentLoader () {
  this.cacheable && this.cacheable()

  const { files, library } = loaderUtils.getOptions(this)

  const rootpath = library.root || process.cwd()

  const components = globby.sync(files).map((filepath) => processComponent(filepath, rootpath))

  return `
module.hot && module.hot.accept([])
module.exports = [${components.join(',')}]
`
}

function processComponent (filepath, rootpath) {
  console.log(`[ui-docs-plugin]: ${path.relative(rootpath, filepath)}`) // eslint-disable-line no-console
  return `
  {
    name: ${JSON.stringify(generateComponentName(filepath))},
    path: ${JSON.stringify(path.relative(rootpath, filepath))},
    doc: ${requirePath(`!!${loader}!${filepath}`)},
    component: ${requirePath(filepath)}.default
  }
`
}

function requirePath (filepath) {
  return `require(${JSON.stringify(filepath)})`
}

function generateComponentName (filepath) { // for component names in build output and docs
  const parts = path.dirname(filepath).split(path.sep)
  return parts[parts.length - 1]
}
