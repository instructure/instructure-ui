const docs = require('component-docs-loader!')

const generateTheme = function (component) {
  if (typeof component.generateTheme === 'function') {
    return component.generateTheme()
  }
}

const componentsMap = {}
docs.components.forEach((component) => {
  componentsMap[component.name] = {
    name: component.name,
    doc: component.doc,
    path: component.path,
    theme: generateTheme(component.component)
  }
})

export const componentsList = Object.keys(componentsMap)
  .sort()
  .map((name) => {
    return componentsMap[name]
  })

export default componentsMap
