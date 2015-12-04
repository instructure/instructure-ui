import React from 'react'
import _ from 'lodash'

// use webpack loader to load documentation data based on config
const docs = require('docs!')

const documents = {}
docs.documents.map((doc) => {
  const {
    name,
    html
  } = doc
  const title = nameToTitle(name)
  documents[name] = {
    name,
    title,
    html
  }
})

const components = {}
docs.components.forEach((component) => {
  const name = component.module.displayName || component.module.name || component.name
  components[name] = {
    doc: component.doc,
    path: component.relativePath,
    module: component.module
  }
})

const sortedComponents = Object.keys(docs.lib || components)
  .sort()
  .map((name) => {
    return _.merge({ name: name }, components[name])
  })

module.exports = {
  documents: _.reject(documents, isIndex),
  components: sortedComponents,
  index: _.find(documents, isIndex),
  globalize: function () {
    // These need to be globals to render examples
    global.React = React
    sortedComponents.forEach((component) => {
      global[component.name] = component.module
    })
  }
}

function nameToTitle (fileName) {
  return fileName
    .replace(/[\.\/]/g, '')
    .replace(/(\w+)/g, function (match) {
      return match.charAt(0).toUpperCase() + match.slice(1)
    })
    .replace(/[_-]/g, ' ')
}

// TODO: support sub directories and categories for docs
function isIndex (doc) {
  return doc.name === 'index' || doc.name === 'README'
}
