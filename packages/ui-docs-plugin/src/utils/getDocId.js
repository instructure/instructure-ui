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
