const CATEGORY_DELIMITER = '/'

module.exports = function parseDocs (docs, readme, changelog) {
  const parsed = {
    sections: {
      __uncategorized: {
        docs: [],
        sections: [],
        level: 0
      }
    },
    parents: {},
    docs: {}
  }

  docs.forEach((doc) => {
    const { category, id, parent } = doc

    warning((!doc.undocumented), `[${doc.srcPath}] is undocumented.`)
    warning((!docs[id]), `[${id}] is a duplicate document ID.`)

    if (doc.undocumented === true) return

    parsed.docs[id] = {
      ...doc,
      methods: doc.methods ? doc.methods.filter(method => method.docblock !== null) : undefined,
      generateTheme: doc.component && doc.component.generateTheme
    }

    if (parent) {
      parsed.parents[parent] = parsed.parents[parent] || { children: [] }
      parsed.parents[parent].children.push(id)
    }

    if (category) {
      const sections = category.trim().split(CATEGORY_DELIMITER)

      sections.forEach((sectionTitle, index) => {
        const sectionId = sections.slice(0, index + 1).join(CATEGORY_DELIMITER)

        parsed.sections[sectionId] = parsed.sections[sectionId] || {
          docs: [],
          sections: [],
          level: index,
          title: sectionTitle
        }

        if (sections[index + 1]) {
          const childSection = sections.slice(0, index + 2).join(CATEGORY_DELIMITER)
          if (parsed.sections[sectionId].sections.indexOf(childSection) < 0) {
            parsed.sections[sectionId].sections.push(childSection)
          }
        } else {
          parsed.sections[sectionId].docs.push(id)
        }
      })
    } else {
      parsed.sections.__uncategorized.docs.push(id)
    }
  })

  parsed.docs.index = parsed.docs.index || readme
  parsed.docs.CHANGELOG = parsed.docs.CHANGELOG || changelog

  return parsed
}

function warning (condition, message, ...args) {
  if (!condition && process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
    console.warn.apply(undefined, [`Warning: ${message}`, ...args])
  }
}
