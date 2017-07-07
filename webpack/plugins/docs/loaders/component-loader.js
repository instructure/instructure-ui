const glob = require('glob') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
const loaderUtils = require('loader-utils')

const loader = require.resolve('./docgen-loader')

module.exports = function ComponentLoader () {
  this.cacheable && this.cacheable()

  const { files } = loaderUtils.getOptions(this)

  const components = glob.sync(files)
    .map(processComponent)

  return `
module.hot && module.hot.accept([])
module.exports = [${components.join(',')}]
`
}

function processComponent (filepath) {
  return `
  {
    name: ${JSON.stringify(generateComponentName(filepath))},
    path: ${JSON.stringify(path.relative(process.cwd(), filepath))},
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
