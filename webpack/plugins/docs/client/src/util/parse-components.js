export default function parseComponents (components) {
  const componentsMap = {}
  components.forEach((component) => {
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

  return {componentsMap, categorizedComponents}
}
