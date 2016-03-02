import _ from 'lodash'

// use webpack loader to load documentation data based on config
const docs = require('markdown-docs!')

const documents = {}
docs.map((doc) => {
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

export default {
  documents: _.reject(documents, isIndex),
  index: _.find(documents, isIndex)
}
