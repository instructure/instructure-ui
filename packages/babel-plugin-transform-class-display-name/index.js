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

module.exports = exports.default = function transformClassDisplayName ({types: t}) {
  /**
   * Determine if an AST node is likely a class extending React.Component
   */
  function isReactClass (node) {
    if (!node || !t.isCallExpression(node)) return false

    // not _createClass call
    if (!node.callee || node.callee.name !== '_createClass') return false

    // no call arguments
    const args = node.arguments
    if (!args || args.length !== 2) return false
    if (!t.isIdentifier(args[0])) return false
    if (!t.isArrayExpression(args[1])) return false

    // no render method
    if (!args[1].elements || !args[1].elements.some((el) => {
      return isRenderMethod(el.properties)
    })) return false

    return true
  }

  /**
   * Determine if a property definition is for a render method
   */
  function isRenderMethod (props) {
    return props.some((prop) => {
      return prop.key.name === 'key' && prop.value.value === 'render'
    }) && props.some((prop) => {
      return prop.key.name === 'value' && t.isFunctionExpression(prop.value)
    })
  }

  /**
   * Insert a static displayName for the identifier
   */
  function insertDisplayName (path, id) {
    const assignment = t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier(id),
        t.identifier('displayName')
      ),
      t.stringLiteral(id)
    )
    // Put in the assignment expression and a semicolon
    path.insertAfter([assignment, t.emptyStatement()])
  }

  return {
    visitor: {
      CallExpression (path) {
        const { node } = path

        if (isReactClass(node)) {
          insertDisplayName(path, node.arguments[0].name)
        }
      }
    }
  }
}
