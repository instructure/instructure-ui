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

const fs = require('fs')
const path = require('path')
const parseDoc = require('./utils/parseDoc')
const getPathInfo = require('./utils/getPathInfo')

const DOCS = {}

module.exports = function processFile(fullPath, loaderOptions) {
  const source = fs.readFileSync(fullPath)
  const context = path.dirname(fullPath) || process.cwd() // the directory of the file
  const pathInfo = getPathInfo(
    fullPath,
    loaderOptions.projectRoot,
    loaderOptions.library
  )

  let doc = parseDoc(fullPath, source, (err) => {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      '[docgen-loader]: Error when parsing ',
      this.request
    )
    console.warn(err.toString())
  })
  doc = {
    ...doc,
    ...pathInfo
  }

  doc.id = getDocId(doc, context, fullPath)
  if (!doc.title && doc.id) {
    doc.title = doc.id
  }

  // eslint-disable-next-line no-console
  console.info(`Processed ${doc.id} - ${doc.relativePath}`)

  return doc
}

function getDocId(docData, context, fullPath) {
  const { relativePath, id, describes } = docData
  let docId

  const lowerPath = relativePath.toLowerCase()
  if (id) {
    // exist if it was in the description at the top
    docId = id
  } else if (
    lowerPath.includes('/index.js') ||
    lowerPath.includes('/index.tsx')
  ) {
    docId = path.basename(context) // return its folder name
  } else if (lowerPath.includes('readme.md')) {
    const folder = path.basename(context)
    docId = describes ? folder + '__README' : folder
  } else {
    docId = path.parse(fullPath).name // filename without extension
  }

  if (DOCS[docId] && DOCS[docId] !== docData.relativePath) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `[${docId}] is a duplicate id: ${docData.relativePath}, ${DOCS[docId]}`
    )
  }
  DOCS[docId] = docData.relativePath
  return docId
}
