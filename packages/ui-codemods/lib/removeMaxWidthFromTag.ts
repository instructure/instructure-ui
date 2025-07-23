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

import { Collection, JSCodeshift, Transform } from 'jscodeshift'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import { findElement, findImport, printWarning } from './utils/codemodHelpers'
import { isJSXAttribute } from './utils/codemodTypeCheckers'
import { namedTypes } from 'ast-types'

/**
 * removes the maxWidth style variable from Tag.
 */
const removeMaxWidthFromTag: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(removeMaxWidth, file, api, options)
}

const removeMaxWidth = (j: JSCodeshift, root: Collection, filePath: string) => {
  let hasModifications = false
  // Find all imports of Tag component from @instructure/ui-tag or @instructure/ui
  const tagImport = findImport(j, root, 'Tag', [
    '@instructure/ui-tag',
    '@instructure/ui'
  ])

  if (tagImport) {
    // Find all Tag elements in the file that have themeOverride prop
    const found = findElement(filePath, j, root, tagImport, {
      name: 'themeOverride'
    })

    if (found.length > 0) {
      found.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.value.openingElement.attributes =
          item.value.openingElement.attributes?.filter((attr) => {
            // Only process themeOverride attributes
            if (isJSXAttribute(attr) && attr.name.name === 'themeOverride') {
              // Case 0: Handle dynamic themeOverrides (function calls or variables)
              // Example: themeOverride={getTheme()} or themeOverride={theme}
              if (
                attr.value?.type === 'JSXExpressionContainer' &&
                (attr.value.expression?.type === 'CallExpression' ||
                  attr.value.expression?.type === 'Identifier')
              ) {
                const line = attr.loc?.start.line
                printWarning(
                  filePath,
                  line,
                  'maxWidth could not be migrated automatically (dynamic usage detected). Manually check for maxWidth in theme overrides.'
                )
                return true // Keep the attribute
              }

              // Case 1: Handle conditional (ternary) expressions
              // Example: themeOverride={condition ? {maxWidth: '10px'} : {}}
              if (
                attr.value?.type === 'JSXExpressionContainer' &&
                attr.value.expression?.type === 'ConditionalExpression'
              ) {
                const line = attr.loc?.start.line
                printWarning(
                  filePath,
                  line,
                  'maxWidth could not be migrated automatically (used in a conditional). Manually check for maxWidth in this expression.'
                )
                return true // Keep the original ternary expression
              }

              // Case 2: Handle function-based themeOverride (arrow functions)
              if (
                attr.value?.type === 'JSXExpressionContainer' &&
                attr.value.expression?.type === 'ArrowFunctionExpression'
              ) {
                const func = attr.value.expression
                let themeObj: namedTypes.ObjectExpression | null = null
                const line = attr.loc?.start.line

                // Subcase 2a: Handle concise arrow function (implicit return)
                // Example: themeOverride={() => ({ maxWidth: '10px' })}
                if (func.body?.type === 'ObjectExpression') {
                  themeObj = func.body
                }
                // Subcase 2b: Handle block with return statement
                // Example: themeOverride={() => { return { maxWidth: '10px' } }}
                else if (
                  func.body?.type === 'BlockStatement' &&
                  func.body.body.length === 1 &&
                  func.body.body[0].type === 'ReturnStatement' &&
                  func.body.body[0].argument?.type === 'ObjectExpression'
                ) {
                  themeObj = func.body.body[0].argument
                }

                if (themeObj) {
                  const properties = themeObj.properties
                  // Check for spread operator in theme object
                  // Example: themeOverride={() => ({ ...someOverrides })}
                  const hasSpread = properties.some(
                    (prop) => prop.type === 'SpreadElement'
                  )

                  // Find maxWidth property if it exists
                  const maxWidthProp = properties.find(
                    (prop) =>
                      prop.type === 'ObjectProperty' &&
                      prop.key.type === 'Identifier' &&
                      prop.key.name === 'maxWidth'
                  )

                  // Get all other properties except maxWidth
                  const otherProps = properties.filter(
                    (prop) =>
                      !(
                        prop.type === 'ObjectProperty' &&
                        prop.key.type === 'Identifier' &&
                        prop.key.name === 'maxWidth'
                      )
                  )

                  // Print warning if spread exists without explicit maxWidth
                  if (hasSpread && !maxWidthProp) {
                    printWarning(
                      filePath,
                      line,
                      'maxWidth could not be migrated automatically (spread operator usage). Manually check for hidden maxWidth references.'
                    )
                  }

                  // Case 2a: Only maxWidth exists → Remove entire themeOverride
                  if (maxWidthProp && otherProps.length === 0) {
                    hasModifications = true
                    return false
                  }
                  // Case 2b: maxWidth + other props → Remove maxWidth, keep others
                  else if (maxWidthProp && otherProps.length > 0) {
                    hasModifications = true
                    themeObj.properties = otherProps
                  }
                }
              }
              // Case 3: Handle object literal themeOverride
              // Example: themeOverride={{ maxWidth: '10px' }}
              else if (
                attr.value?.type === 'JSXExpressionContainer' &&
                attr.value.expression?.type === 'ObjectExpression'
              ) {
                const properties = attr.value.expression.properties
                // Check for spread operator
                const hasSpread = properties.some(
                  (prop) => prop.type === 'SpreadElement'
                )

                // Find maxWidth property
                const maxWidthProp = properties.find(
                  (prop) =>
                    prop.type === 'ObjectProperty' &&
                    prop.key.type === 'Identifier' &&
                    prop.key.name === 'maxWidth'
                )

                // Get all other properties except maxWidth
                const otherProps = properties.filter(
                  (prop) =>
                    !(
                      prop.type === 'ObjectProperty' &&
                      prop.key.type === 'Identifier' &&
                      prop.key.name === 'maxWidth'
                    )
                )

                const line = attr.loc?.start.line
                // Print warning for spread without explicit maxWidth
                if (hasSpread && !maxWidthProp) {
                  printWarning(
                    filePath,
                    line,
                    'maxWidth could not be migrated automatically (spread operator usage). Manually check for hidden maxWidth references.'
                  )
                }

                // Case 3a: Only maxWidth exists → Remove entire themeOverride
                if (maxWidthProp && otherProps.length === 0) {
                  hasModifications = true
                  return false
                }
                // Case 3b: maxWidth + other props → Remove maxWidth, keep others
                else if (maxWidthProp && otherProps.length > 0) {
                  hasModifications = true
                  // eslint-disable-next-line no-param-reassign
                  attr.value.expression.properties = otherProps
                }
              }
            }
            return true // Keep other attributes that aren't themeOverride
          })
      })
    }
  }

  // Part 2: Handle InstUISettingsProvider theme overrides (Cases 4-6)
  const instUISettingsProviderImport = findImport(
    j,
    root,
    'InstUISettingsProvider',
    ['@instructure/ui', '@instructure/emotion']
  )

  if (instUISettingsProviderImport) {
    root.findJSXElements('InstUISettingsProvider').forEach((provider) => {
      let themeBecameEmpty = false

      provider.node.openingElement.attributes?.forEach((attr) => {
        if (isJSXAttribute(attr) && attr.name.name === 'theme') {
          // Case 4: Handle static theme object
          if (
            attr.value?.type === 'JSXExpressionContainer' &&
            attr.value.expression?.type === 'ObjectExpression'
          ) {
            const themeObj = attr.value.expression
            processThemeObject(themeObj)
          }
          // Case 5: Handle arrow function with return statement
          else if (
            attr.value?.type === 'JSXExpressionContainer' &&
            attr.value.expression?.type === 'ArrowFunctionExpression' &&
            attr.value.expression.body?.type === 'BlockStatement' &&
            attr.value.expression.body.body.length === 1 &&
            attr.value.expression.body.body[0].type === 'ReturnStatement' &&
            attr.value.expression.body.body[0].argument?.type ===
              'ObjectExpression'
          ) {
            const themeObj = attr.value.expression.body.body[0].argument
            processThemeObject(themeObj)
          }
          // Case 6: Handle concise arrow function (implicit return)
          else if (
            attr.value?.type === 'JSXExpressionContainer' &&
            attr.value.expression?.type === 'ArrowFunctionExpression' &&
            attr.value.expression.body?.type === 'ObjectExpression'
          ) {
            const themeObj = attr.value.expression.body
            processThemeObject(themeObj)
          }
        }
      })

      function processThemeObject(themeObj: namedTypes.ObjectExpression) {
        // Find componentOverrides in theme object
        const componentOverrides = themeObj.properties.find(
          (p) =>
            p.type === 'ObjectProperty' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'componentOverrides'
        )

        if (
          componentOverrides &&
          'value' in componentOverrides &&
          componentOverrides.value?.type === 'ObjectExpression'
        ) {
          // Find Tag overrides in componentOverrides
          const tagOverrides = componentOverrides.value.properties.find(
            (p) =>
              p.type === 'ObjectProperty' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'Tag'
          )

          if (
            tagOverrides &&
            'value' in tagOverrides &&
            tagOverrides.value?.type === 'ObjectExpression'
          ) {
            const originalProperties = tagOverrides.value.properties
            // Remove maxWidth from Tag overrides
            const newProperties = originalProperties.filter(
              (p) =>
                !(
                  p.type === 'ObjectProperty' &&
                  p.key.type === 'Identifier' &&
                  p.key.name === 'maxWidth'
                )
            )

            if (newProperties.length !== originalProperties.length) {
              tagOverrides.value.properties = newProperties
              hasModifications = true
            }

            // If Tag overrides became empty, remove the Tag override object
            if (tagOverrides.value.properties.length === 0) {
              componentOverrides.value.properties =
                componentOverrides.value.properties.filter(
                  (p) => p !== tagOverrides
                )
            }
          }

          // If componentOverrides became empty, remove it from theme
          if (componentOverrides.value.properties.length === 0) {
            // eslint-disable-next-line no-param-reassign
            themeObj.properties = themeObj.properties.filter(
              (p) => p !== componentOverrides
            )
          }
        }

        // If theme became completely empty, mark provider for removal
        if (themeObj.properties.length === 0) {
          themeBecameEmpty = true
        }
      }

      // Remove the provider if its theme became empty
      // Example: <InstUISettingsProvider theme={{}}> becomes just its children
      if (themeBecameEmpty) {
        const children = provider.node.children || []
        j(provider).replaceWith(children)
        hasModifications = true
      }
    })
  }
  return hasModifications
}

export default removeMaxWidthFromTag
export { removeMaxWidth }
