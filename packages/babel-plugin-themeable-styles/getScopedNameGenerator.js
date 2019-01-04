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

const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'

const genericNames = require('generic-names')

module.exports = function getScopedNameGenerator (config, componentId, name, filepath, css) { // for css modules class names
  let scopedNamePattern = (ENV === 'production') ? `${componentId}__[local]` : `${componentId}__[folder]__[local]`

  if (config && typeof config.generateScopedName === 'function') {
    scopedNamePattern = config.generateScopedName({ env: ENV }, componentId, name, filepath, css)
  } else if (config && typeof config.generateScopedName === 'string') {
    scopedNamePattern = config.generateScopedName
  }

  const generateScopedName = genericNames(scopedNamePattern, {
    context: process.cwd()
  })

  return generateScopedName(name, filepath)
}
