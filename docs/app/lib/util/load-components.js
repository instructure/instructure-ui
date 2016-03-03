const docs = require('component-docs!')

const componentsMap = {}
docs.components.forEach((component) => {
  componentsMap[component.name] = {
    doc: component.doc,
    path: component.path,
    module: component.module
  }
})

export const componentsList = Object.keys(docs.lib || componentsMap)
  .sort()
  .map((name) => {
    const component = componentsMap[name]
    component.name = component.name || name // fallback to the name from the lib if the name is undefined
    return component
  })

export default componentsMap
