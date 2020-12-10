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

const loaderUtils = require('loader-utils')
const getDocId = require('../utils/getDocId')
const getDocTitle = require('../utils/getDocTitle')
const getOptions = require('../utils/getOptions')
const parseDoc = require('../utils/parseDoc')
const getPathInfo = require('../utils/getPathInfo')

module.exports = function DocgenLoader(source) {
  this.cacheable && this.cacheable()

  const context = this.context || process.cwd()
  const loaderOptions = loaderUtils.getOptions(this) || {}
  const options = getOptions(loaderOptions)
  const pathInfo = getPathInfo(this.resourcePath, options, context)

  let doc = parseDoc(this.resourcePath, source, (err) => {
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

  doc.id = getDocId(doc, options, context, (template) => {
    return loaderUtils.interpolateName(this, template, {})
  })

  doc.title = getDocTitle(doc, options, context, (template) => {
    return loaderUtils.interpolateName(this, template, {})
  })

  return `
module.hot && module.hot.accept([])
const doc = ${JSON.stringify(doc)}
${doc.extension === '.js' ? `doc.resource = ${doc.requireStr}` : ''}
module.exports = doc
`
}
