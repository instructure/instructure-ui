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

import type { LibraryOptions, ParsedDoc, ProcessedFile } from '../DataTypes.mjs'

const CATEGORY_DELIMITER = '/'

export function getClientProps(docs: ProcessedFile[], library: LibraryOptions) {
  const parsed: ParsedDoc = {
    sections: {
      __uncategorized: {
        docs: [],
        sections: [],
        level: 0
      }
    },
    parents: {},
    descriptions: {},
    docs: {}
  }
  const docIDs: Record<string, string> = {}
  docs
    .filter((doc) => !doc.private)
    .forEach((doc) => {
      const { category, id, parent, describes } = doc
      // warn if the ID already exists with a different path
      if (docIDs[id] && docIDs[id] !== doc.srcPath) {
        warning(
          '"' +
            id +
            '" is a duplicate document ID, ' +
            doc.srcPath +
            ' has the same ID as ' +
            docIDs[id]
        )
      }
      parsed.docs[id] = {
        title: doc.title,
        order: doc.order,
        category: doc.category,
        isWIP: doc.isWIP,
        tags: doc.tags
      }
      docIDs[id] = doc.srcPath
      if (describes) {
        parsed.descriptions[describes] = doc.description
      }

      if (parent) {
        parsed.parents[parent] = parsed.parents[parent] || { children: [] }
        parsed.parents[parent].children.push(id)
      }

      if (category && category !== 'index') {
        const sections = category.trim().split(CATEGORY_DELIMITER)

        sections.forEach((sectionTitle: string, index: number) => {
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

function warning(message: string, ...args: any[]) {
  if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
    console.warn(`Warning: ${message}`, ...args)
  }
}
