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

    if (doc.undocumented === true) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[${doc.srcPath}] is undocumented.`)
      }
      return
    }

    if (docs[id]) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[${id}] is a duplicate document ID.`)
      }
    }

    parsed.docs[id] = doc

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
