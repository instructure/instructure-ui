const glob = require('glob')
const path = require('path')
const config = require('../util/config')
const testPatterns = require('../util/test-patterns')
const requirePath = require('../util/require-path')
const componentNameFromPath = require('../util/component-name-from-path')

module.exports = function () {
  this.cacheable && this.cacheable()

  const components = glob.sync(config.components.files)
    .filter(function (componentPath) {
      return testPatterns(componentPath, config.components.excludes || [])
    })
    .map(processComponent)

  return `
if (module.hot) {
  module.hot.accept([])
}
module.exports = {
  components: [${components.join(',')}]
}
`
}

function processComponent (filepath) {
  return `
  {
    name: ${JSON.stringify(componentNameFromPath(filepath))},
    path: ${JSON.stringify(path.relative(config.rootPath, filepath))},
    doc: ${requirePath('!!docgen!' + filepath)},
    component: ${requirePath(filepath)}.default
  }
`
}
