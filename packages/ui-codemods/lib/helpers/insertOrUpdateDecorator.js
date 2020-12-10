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

/**
 * Insert a new @deprecated decorator for a Component,
 * or update the existing one with newly deprecated props
 * if the decorator already exists.
 *
 * Example:
 *  @deprecated('2.1.0', { ... })
 *  @deprecated('3.0.0', { ... })
 *  MyComponent extends React.Component { ... }
 */
module.exports = function insertOrUpdateDecorator(j, root, config) {
  const hasModifications = false

  getClassDeclarations(j, root, config).forEach((path) => {
    const name = path.value.id.name

    // Iterate versions
    Object.keys(config[name]).forEach((v) => {
      // Add @deprecated decorator
      let decorator

      // Find the decorator for this version iteration
      if (path.value.decorators) {
        decorator = path.value.decorators.filter(
          (d) => d.expression.arguments[0].value === v
        )[0]
      }

      // Add the decorator
      if (!decorator) {
        decorator = j.decorator(
          j.callExpression(j.identifier('deprecated'), [
            j.literal(v),
            j.objectExpression([])
          ])
        )

        if (!Array.isArray(path.value.decorators)) {
          path.value.decorators = [] // eslint-disable-line no-param-reassign
        }

        // path.value.decorators.push(decorator)
      }

      // Add deprecated props
      // config[name][v].forEach((p) => {
      //   decorator.expression.arguments[1].properties.push(
      //     j.property(
      //       j.identifier(p.old),
      //       j.literal(p.new)
      //     )
      //   )
      // })

      // console.log(decorator.expression.arguments)
    })
  })

  return hasModifications
}
