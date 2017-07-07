const glob = require('glob') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')

const { files } = require( // eslint-disable-line import/no-dynamic-require
  path.join(process.cwd(), 'themeable.config.js')
)

module.exports = function () {
  this.cacheable && this.cacheable()

  const components = glob.sync(files.components)
    .map(processComponent)

  return `
module.hot && module.hot.accept([])
module.exports = {
  components: [${components.join(',')}]
}
`
}

function processComponent (filepath) {
  return `
  {
    name: ${JSON.stringify(generateComponentName(filepath))},
    path: ${JSON.stringify(path.relative(process.cwd(), filepath))},
    doc: ${requirePath(`!!docgen-loader!${filepath}`)},
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
