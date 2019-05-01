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

function replace (p, j, config) {
  let hasModifications = false
  const value = p.value.value

  for (let i = 0; i < config.length; i++) {
    const c = config[i]

    // Replace import using a RegExp
    if (c.pattern && c.replace) {
      const regex = new RegExp(c.pattern)

      if (regex.test(value)) {
        j(p).replaceWith(j.literal(value.replace(regex, c.replace)))
        hasModifications = true
      }
    }
    // Replace import using a string literal
    else if (c.oldPath && c.newPath) {
      // Process collection of modules under the path
      if (c.modules) {
        c.modules.forEach((m) => { // eslint-disable-line no-loop-func
          if (value === path.join(c.oldPath, m)) {
            j(p).replaceWith(j.literal(path.join(c.newPath, m)))
            hasModifications = true
          }
        })
      }
      // Replace an absolute module path
      else if (value === c.oldPath) {
        j(p).replaceWith(j.literal(c.newPath))
        hasModifications = true
      }
    }
  }

  return hasModifications
}

/**
 * Find imports
 *
 * Example:
 *  import Modal from 'instructure-ui/lib/Modal'
 */
module.exports = function replaceDeprecatedImports (j, root, config) {
  let hasModifications = false

  // Find imports
  //
  // Rewrite usages of deprecated imports for a Component.
  root
    .find(j.ImportDeclaration)
    .find(j.Literal)
    .paths()
    .forEach((p) => {
      hasModifications = replace(p, j, config) || hasModifications
    })

  // Find require calls
  root
    .find(j.CallExpression)
    .forEach((e) => {
      const name = e.value.callee.name
      const type = e.value.callee.type

      if (type === 'Identifier' && name === 'require') {
        j(e)
          .find(j.Literal)
          .forEach((p) => {
            hasModifications = replace(p, j, config) || hasModifications
          })
      }
    })

  return hasModifications
}
