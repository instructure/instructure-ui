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
/* eslint-disable no-param-reassign */
import { Collection, JSCodeshift, Transform } from 'jscodeshift'
import instUICodemodExecutor from './utils/instUICodemodExecutor'

/**
 * renames the `getComputedStyle` utility function to `getCSSStyleDeclaration`
 */
const renameGetComputedStyleToGetCSSStyleDeclaration: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(renameGetComputedStyle, file, api, options)
}

const renameGetComputedStyle = (j: JSCodeshift, root: Collection) => {
  let hasModifications = false
  const localNamesToRename = new Set<string>()
  const namespaceImports = new Set<string>()

  // Step 1: Process imports
  processImports(j, root, localNamesToRename, namespaceImports, () => {
    hasModifications = true
  })

  // Step 2: Rename direct usage
  if (localNamesToRename.size > 0) {
    hasModifications =
      renameDirectUsage(j, root, localNamesToRename) || hasModifications
  }

  // Step 3: Rename namespace usage (e.g. import * as DOMUtils from '@instructure/ui-dom-utils')
  if (namespaceImports.size > 0) {
    hasModifications =
      renameNamespaceUsage(j, root, namespaceImports) || hasModifications
  }

  // NEW Step 4: Handle destructured usage
  if (namespaceImports.size > 0) {
    hasModifications =
      renameDestructuredUsage(j, root, namespaceImports) || hasModifications
  }

  return hasModifications
}

function processImports(
  j: JSCodeshift,
  root: Collection,
  localNamesToRename: Set<string>,
  namespaceImports: Set<string>,
  onModification: () => void
) {
  root.find(j.ImportDeclaration).forEach(({ node }) => {
    if (
      typeof node.source.value === 'string' &&
      node.source.value.includes('@instructure/ui-dom-utils')
    ) {
      node.specifiers?.forEach((specifier) => {
        // Handle named imports
        if (
          j.ImportSpecifier.check(specifier) &&
          specifier.imported.name === 'getComputedStyle'
        ) {
          specifier.imported.name = 'getCSSStyleDeclaration'
          onModification()

          if (specifier?.local?.name === 'getComputedStyle') {
            localNamesToRename.add(specifier.local.name)
          }
        }
        // Handle namespace imports (e.g. import * as DOMUtils from '@instructure/ui-dom-utils')
        else if (j.ImportNamespaceSpecifier.check(specifier)) {
          const local = specifier.local
          if (local && typeof local.name === 'string') {
            namespaceImports.add(local.name)
          }
        }
      })
    }
  })
}

function renameDirectUsage(
  j: JSCodeshift,
  root: Collection,
  localNamesToRename: Set<string>
): boolean {
  let hasModifications = false

  localNamesToRename.forEach((localName) => {
    root.find(j.Identifier, { name: localName }).forEach((path) => {
      const parent = path.parent.node

      // Skip if part of a member expression (e.g. `obj.getComputedStyle`)
      if (
        j.MemberExpression.check(parent) &&
        parent.property === path.node &&
        !parent.computed
      ) {
        return
      }

      // Skip if it's the local name in a variable declaration (e.g. const getComputedStyle = someFunction())
      if (j.VariableDeclarator.check(parent) && parent.id === path.node) {
        return
      }

      // Check if there's a shadowing declaration in the current or parent scope
      let currentScope = path.scope
      let isShadowed = false

      while (currentScope) {
        const bindings = currentScope.getBindings()
        if (bindings[localName] && bindings[localName].length > 0) {
          for (const binding of bindings[localName]) {
            const bindingNode = binding.parent.node as { start: number }
            const pathNode = path.node as unknown as { start: number }

            if (
              (j.VariableDeclarator.check(bindingNode) ||
                j.FunctionDeclaration.check(bindingNode)) &&
              bindingNode.start < pathNode.start
            ) {
              isShadowed = true
              break
            }
          }
          if (isShadowed) break
        }
        currentScope = currentScope.parent
      }

      if (isShadowed) {
        return
      }

      path.node.name = 'getCSSStyleDeclaration'
      hasModifications = true
    })
  })

  return hasModifications
}

function renameNamespaceUsage(
  j: JSCodeshift,
  root: Collection,
  namespaceImports: Set<string>
): boolean {
  let hasModifications = false

  namespaceImports.forEach((namespace) => {
    root
      .find(j.MemberExpression, {
        object: { type: 'Identifier', name: namespace },
        property: { type: 'Identifier', name: 'getComputedStyle' },
        computed: false
      })
      .forEach((path) => {
        if (j.Identifier.check(path.node.property)) {
          path.node.property.name = 'getCSSStyleDeclaration'
          hasModifications = true
        }
      })
  })

  return hasModifications
}

function renameDestructuredUsage(
  j: JSCodeshift,
  root: Collection,
  namespaceImports: Set<string>
): boolean {
  let hasModifications = false

  namespaceImports.forEach((namespace) => {
    root
      .find(j.VariableDeclarator, {
        init: { type: 'Identifier', name: namespace },
        id: { type: 'ObjectPattern' }
      })
      .forEach((path) => {
        if (path.node.id.type !== 'ObjectPattern') {
          return
        }
        const props = path.node.id.properties
        props.forEach((prop: any) => {
          const isProperty =
            j.Property.check(prop) ||
            prop.type === 'ObjectProperty' ||
            (typeof prop.type === 'string' && prop.type.includes('Property'))
          if (!isProperty) {
            return
          }
          const key = prop.key
          const value = prop.value

          if (
            key &&
            key.type === 'Identifier' &&
            key.name === 'getComputedStyle'
          ) {
            prop.key = j.identifier('getCSSStyleDeclaration')

            if (prop.shorthand) {
              prop.key = j.identifier('getCSSStyleDeclaration')
              prop.value = j.identifier('getCSSStyleDeclaration')
              prop.shorthand = true
            } else if (value && value.type === 'Identifier') {
              value.name = 'getCSSStyleDeclaration'

              if (key.name === value.name) {
                prop.shorthand = true
              }
            }
            hasModifications = true
          }
        })
      })
  })
  return hasModifications
}

export default renameGetComputedStyleToGetCSSStyleDeclaration
export { renameGetComputedStyle }
