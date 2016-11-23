const glob = require('glob')
const path = require('path')
const { generateComponentName, files, paths } = require('../util/loadConfig')
const requirePath = require('../util/requirePath')

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
    path: ${JSON.stringify(path.relative(paths.root, filepath))},
    doc: ${requirePath('!!docgen-loader!' + filepath)},
    component: ${requirePath(filepath)}.default
  }
`
}
