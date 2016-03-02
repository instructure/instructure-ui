import _ from 'lodash'

const docs = require('component-docs!')

const components = {}
docs.components.forEach((component) => {
  components[component.name] = {
    doc: component.doc,
    path: component.path,
    module: component.module
  }
})

const sortedComponents = Object.keys(docs.lib || components)
  .sort()
  .map((name) => {
    return _.merge({ name: name }, components[name])
  })

export default sortedComponents
