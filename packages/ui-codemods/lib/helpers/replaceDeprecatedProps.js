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

const findDeprecatedProp = require('../utils/findDeprecatedProp')
const createLiteral = require('../utils/createLiteral')

/**
  * Find JSX attributes (props)
  *
  * Example:
  *  <MyComponent [name] />
  */
module.exports = function replaceDeprecatedProps (j, root, config) {
  let hasModifications = false

  // Find JSX Elements
  //
  // Rewrite usages of deprecated props for a Component.
  root
    .find(j.JSXOpeningElement)
    .forEach((el) => {
      const name = el.value.name.name

      // Make sure we're working with a Component that we need to modify
      if (config[name]) {
        j(el)
          .find(j.JSXAttribute)
          .forEach((attr) => {
            // Find identifiers
            j(attr)
              .find(j.JSXIdentifier)
              .forEach((i) => {
                const prop = i.value.name
                const match = findDeprecatedProp(config, name, prop)

                if (match) {
                  hasModifications = true

                  if (!match.new) {
                    // If config sets the new name to null, the prop has been
                    // removed. Remove the prop and value.
                    j(attr).remove()
                  } else {
                    // Update the prop name if the config specifies a new name
                    const newPropName = j.jsxIdentifier(match.new)
                    j(i).replaceWith(newPropName)

                    // If replacement values are specified, replace the value
                    if (match.values && match.values.length > 0) {
                      const expressionContainers = j(attr).find(j.JSXExpressionContainer)
                      const literals = j(attr).find(j.Literal)

                      if (expressionContainers && expressionContainers.length > 0) {
                        // This means the value is contained in a jsx expression container. For example,
                        // in the following jsx, `<div prop={someValue} />` we are looking at `{someValue}`
                        expressionContainers.forEach((expressionContainer) => {
                          const { type } = expressionContainer.value.expression
                          // Verify that the expression container contains a literal
                          if (type === 'Literal') {
                            replaceValue({ j, literals, match, attr, expressionContainer })
                          }
                        })
                      } else if (literals && literals.length > 0) {
                        // If the value isn't in a jsx expression container, but we have a literal, that
                        // means that the user is passing a string value. For example, in the following
                        // jsx, `<div prop="someValue" />` we are looking at `"someValue"`
                        replaceValue({ j, literals, match, attr })
                      } else {
                        // If we don't have a jsx expression container or a string literal, that means that
                        // we have just the attribute. For example, in the following jsx, `<div prop />`
                        // we are looking at `prop`. Modify it so that it is a standard bool expression
                        // and then execute replace like the others
                        j(attr).replaceWith(j.jsxAttribute(
                          newPropName,
                          j.booleanLiteral(true)
                        ))
                        // Look for literals again after update
                        replaceValue({ j, literals: j(attr).find(j.Literal), match, attr })
                      }
                    }
                  }
                }
              })
          })
      }
    })

  return hasModifications
}

const replaceValue = ({ j, literals, match, attr, expressionContainer } = {}) => {
  literals.forEach((literalValue) => {
    const currentValue = literalValue.value.value

    // Find an old value provided that matches the existing value
    const valueUpdate = match.values.find(entry => entry.old === currentValue)

    if (valueUpdate) {
      const newValue = valueUpdate.new

      if (typeof newValue === 'undefined') {
        j(attr).remove()
      } else {
        const replacement = createLiteral(j, newValue)

        if (replacement) {
          // Replace the entire expression container if present. If not, just replace the literal
          j(expressionContainer || literalValue).replaceWith(replacement)
        }
      }
    }
  })
}
