module.exports = function getDocTitle (docData, options, context, interpolate) {
  return interpolate(_getDocTitle(options, docData, context))
}

function _getDocTitle (options, docData, context) {
  const { title } = options.document

  if (typeof title === 'function') {
    return title(docData, context)
  } else if (typeof title === 'string') {
    return title
  } else if (docData.title) {
    return docData.title
  } else if (docData.id) {
    return docData.id
  }
}
