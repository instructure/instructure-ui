function nameToTitle (fileName) {
  return fileName
    .replace(/[\.\/]/g, '')
    .replace(/(\w+)/g, (match) => {
      return match.charAt(0).toUpperCase() + match.slice(1)
    })
    .replace(/[_-]/g, ' ')
}

export default function parseComponents (docs) {
  const documentsMap = {}
  const documentsList = docs.map((doc) => {
    const name = (doc.name === 'README') ? 'index' : doc.name
    const html = doc.doc
    const title = nameToTitle(name)

    documentsMap[name] = {
      name,
      title,
      html
    }

    return documentsMap[name]
  })

  return { documentsMap, documentsList }
}
