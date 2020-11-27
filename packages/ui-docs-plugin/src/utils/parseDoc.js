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

const path = require('path')
const getJSDoc = require('./getJSDoc')
const getCodeDoc = require('./getCodeDoc')
const getReactDoc = require('./getReactDoc')
const getFrontMatter = require('./getFrontMatter')

module.exports = function (resourcePath, source, errorHandler) {
  const extension = path.extname(resourcePath)

  let doc = {}

  if (extension === '.md') {
    doc = { description: source }
  } else if (extension === '.js') { // TODO: make the extention(s) here configurable
    doc = getReactDoc(source, errorHandler)

    if (!doc.props) {
      doc = getJSDoc(source, errorHandler)
    }
  } else {
    doc = getCodeDoc(source, errorHandler)
  }

  let frontMatter
  try {
    frontMatter = getFrontMatter(doc.description)
  } catch (e) {
    throw `Failed to parse YAML "${doc.description}" \nexception is \n${e}`
  }

  return {
    ...doc,
    ...frontMatter
  }
}
