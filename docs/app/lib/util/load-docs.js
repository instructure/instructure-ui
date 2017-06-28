// eslint-disable-next-line import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved
const docs = require('markdown-docs-loader!')

const documentsMap = {}

export const documentsList = docs.map((doc) => {
  const name = (doc.name === 'README') ? 'index' : doc.name
  const html = doc.doc
  const title = nameToTitle(name)

  documentsMap[name] = {
    name,
    title,
    html
  }

  return {
    name,
    title,
    html
  }
})

function nameToTitle (fileName) {
  return fileName
    .replace(/[\.\/]/g, '')
    .replace(/(\w+)/g, (match) => {
      return match.charAt(0).toUpperCase() + match.slice(1)
    })
    .replace(/[_-]/g, ' ')
}

export default documentsMap
