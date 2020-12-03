/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const CATEGORY_DELIMITER = '/'

module.exports = function getClientProps(docs, themes, library) {
  return {
    ...parseDocs(docs, library),
    themes: parseThemes(themes),
    library
  }
}

function parseDocs(docs, library) {
  const parsed = {
    sections: {
      __uncategorized: {
        docs: [],
        sections: [],
        level: 0
      }
    },
    parents: {},
    docs: {},
    descriptions: {}
  }

  docs
    .filter((doc) => !doc.private)
    .forEach((doc) => {
      const { category, id, parent, describes } = doc

      if (doc.undocumented) {
        return
      }

      warning(!parsed.docs[id], `[${id}] is a duplicate document ID.`)

      parsed.docs[id] = {
        ...doc,

        methods: doc.methods
          ? doc.methods.filter((method) => method.docblock !== null)
          : undefined,
        generateTheme: doc.resource && doc.resource.generateTheme
      }

      if (describes) {
        parsed.descriptions[describes] = doc.description
      }

      if (parent) {
        parsed.parents[parent] = parsed.parents[parent] || { children: [] }
        parsed.parents[parent].children.push(id)
      }

      if (category && category !== 'index') {
        const sections = category.trim().split(CATEGORY_DELIMITER)

        sections.forEach((sectionTitle, index) => {
          const sectionId = sections
            .slice(0, index + 1)
            .join(CATEGORY_DELIMITER)

          parsed.sections[sectionId] = parsed.sections[sectionId] || {
            docs: [],
            sections: [],
            level: index,
            title: sectionTitle
          }

          if (sections[index + 1]) {
            const childSection = sections
              .slice(0, index + 2)
              .join(CATEGORY_DELIMITER)
            if (parsed.sections[sectionId].sections.indexOf(childSection) < 0) {
              parsed.sections[sectionId].sections.push(childSection)
            }
          } else {
            parsed.sections[sectionId].docs.push(id)
          }
        })
      } else {
        if (
          !parent &&
          !describes &&
          id !== library.name &&
          id !== 'CHANGELOG'
        ) {
          parsed.sections.__uncategorized.docs.push(id)
        }
      }
    })

  return parsed
}

function warning(condition, message, ...args) {
  if (
    !condition &&
    process.env.NODE_ENV !== 'production' &&
    typeof console !== 'undefined'
  ) {
    console.warn(`Warning: ${message}`, ...args)
  }
}

function parseThemes(themes) {
  const parsed = {}

  themes.forEach((theme) => {
    parsed[theme.resource.key] = theme
  })

  return parsed
}
