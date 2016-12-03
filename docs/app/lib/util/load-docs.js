// use webpack loader to load documentation data based on config
const docs = require('markdown-docs-loader!')

const documentsMap = {}
docs.forEach((doc) => {
  const name = (doc.name === 'README') ? 'index' : doc.name
  const html = doc.doc
  const title = nameToTitle(name)

  doc.name = name
  doc.title = title
  doc.html = html

  documentsMap[name] = {
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

export const documentsList = docs
export default documentsMap
