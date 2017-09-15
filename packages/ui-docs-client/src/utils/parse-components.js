export default function parseComponents (components) {
  const componentsMap = {}
  const categorizedComponents = {}

  components.forEach((component) => {
    let category = component.doc.data.category || 'Elements'
    category = category.charAt(0).toUpperCase() + category.slice(1)
    const fullName = `${component.name}`

    const componentInfo = {
      fullName,
      name: component.name,
      doc: component.doc,
      path: component.path,
      generateTheme: component.component.generateTheme || function () {}
    }

    if (categorizedComponents[category] === undefined) {
      categorizedComponents[category] = []
    }
    categorizedComponents[category].push(componentInfo)
    componentsMap[fullName] = componentInfo
  })

  return {componentsMap, categorizedComponents}
}
