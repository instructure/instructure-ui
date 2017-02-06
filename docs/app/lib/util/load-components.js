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

const categorizedComponents = {}
Object.keys(componentsMap).forEach((name) => {
  let category = componentsMap[name].doc.data.category || 'Elements'
  category = category.charAt(0).toUpperCase() + category.slice(1)
  if (categorizedComponents[category] === undefined) {
    categorizedComponents[category] = []
  }
  categorizedComponents[category].push(componentsMap[name])
})

export {categorizedComponents}
export default componentsMap
