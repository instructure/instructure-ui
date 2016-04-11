const docs = require('component-docs!')

const componentsMap = {}
docs.components.forEach((component) => {
  componentsMap[component.name] = {
    name: component.name,
    doc: component.doc,
    path: component.path
  }
})

export const componentsList = Object.keys(componentsMap)
  .sort()
  .map((name) => {
    return componentsMap[name]
  })

export default componentsMap
