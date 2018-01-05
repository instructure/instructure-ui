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

const getClassDeclarations = require('../utils/getClassDeclarations')
const findDeprecatedProp = require('../utils/findDeprecatedProp')

/**
  * Find and replace property members
  *
  * Example:
  *  this.props[name]
  *  props[name]
  */
module.exports = function replacePropertyMembers (j, root, config) {
  let hasModifications = false

  getClassDeclarations(j, root, config)
    .forEach(path => {
      const name = path.value.id.name

      j(path)
        .find(j.MemberExpression)
        .forEach((me) => {
          const prop = me.value.property.name
          const match = findDeprecatedProp(config, name, prop)

          if (match) {
            // Find the object (should be `this.props` or `props`)
            if (me.value.object.name === 'props' ||
                me.value.object.property.name === 'props') {
              // Find the actual identifier
              j(me)
                .find(j.Identifier)
                .forEach((i) => {
                  if (i.value.name === prop) {
                    hasModifications = true
                    j(i).replaceWith(j.identifier(match.new))
                  }
                })
            }
          }
        })
    })


  return hasModifications
}
