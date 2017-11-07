const jsdoc = require('jsdoc-api')

module.exports = function getJSDoc (source, error) {
  let doc = {}

  try {
    const sections = jsdoc.explainSync({ source })
      .filter((section) => {
        return section.undocumented !== true && section.access !== 'private' && section.kind !== 'package'
      })
    const module = sections.filter(section => section.kind === 'module')[0] || sections[0] || {}
    doc = {
      ...module,
      sections: sections
        .filter(section => section.longname !== module.longname)
        .map((section) => {
          const parts = section.longname.split('.')
          const name = section.longname.replace(`${module.longname}.`, '')
          return {
            ...section,
            id: name,
            title: name
          }
        }),
      undocumented: sections.length <= 0
    }
  } catch (err) {
    error(err)
  }

  return doc
}
