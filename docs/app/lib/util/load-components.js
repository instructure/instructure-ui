const docs = require('component-docs-loader!')

const componentsMap = {}
docs.components.forEach((component) => {
  componentsMap[component.name] = {
    name: component.name,
    doc: component.doc,
    path: component.path,
    generateTheme: component.component.generateTheme || function () {}
  }
})

export const componentsList = Object.keys(componentsMap)
  .sort()
  .map((name) => {
    return componentsMap[name]
  })

export default componentsMap
