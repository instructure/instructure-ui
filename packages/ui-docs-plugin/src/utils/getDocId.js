const DOCS = {}

module.exports = function getDocId (docData, options, context, interpolate) {
  const id = interpolate(_getDocId(options, docData, context))

  if (Object.keys(DOCS).includes(id) && DOCS[id] !== docData.relativePath) {
    console.warn('\x1b[33m%s\x1b[0m', `[${id}] is a duplicate id!!!!!!!`)
  }

  DOCS[id] = docData.relativePath

  // eslint-disable-next-line no-console
  console.log(`[${id}] ${docData.relativePath}`)

  return id
}

function _getDocId (options, docData, context) {
  const { identifier } = options.document
  const { relativePath, id, describes } = docData

  if (typeof identifier === 'function') {
    return identifier(docData, context)
  } else if (typeof identifier === 'string') {
    return identifier
  } else if (id) {
    return id
  } else if (relativePath.includes('/index.js')) {
    return '[folder]'
  } else if (relativePath.includes('README.md')) {
    return describes ? '[folder]__README' : '[folder]'
  } else {
    return '[name]'
  }
}
