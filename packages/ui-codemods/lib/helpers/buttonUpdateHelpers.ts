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

import {
  Collection,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSCodeshift,
  Literal
} from 'jscodeshift'

/**
 * Finds all the opening tag elements given in tagName
 */
function findTag(j: JSCodeshift, root: Collection, tagName: string) {
  return root.find(j.JSXOpeningElement, {
    name: {
      type: 'JSXIdentifier',
      name: tagName
    }
  })
}

/**
 * Returns the attribute(s) in the specified tag with the given name and value.
 * e.g. `findAttribute(j, root, "Button", "display", "block")` will return an
 * Attribute object when root looks like: `<p><Button display="block" /></p>`
 */
function findAttribute(
  j: JSCodeshift,
  root: Collection,
  tagName: string,
  attrName: string,
  attrValue: string
) {
  return root
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: tagName
      }
    })
    .find(j.JSXAttribute, {
      name: {
        name: attrName
      },
      value: {
        value: attrValue
      }
    })
}

function findAttribute2(
  j: JSCodeshift,
  root: Collection,
  attrName: string,
  attrValue?: string | string[]
) {
  root
    .find(j.JSXAttribute, {
      name: {
        name: attrName
      }
    })
    .filter((path) => {
      const currentAttrValue = (path.value?.value as Literal).value
      if (typeof attrValue === 'string') {
        if (currentAttrValue === attrValue) {
          return true
        }
      } else if (
        attrValue &&
        typeof currentAttrValue === 'string' &&
        attrValue.includes(currentAttrValue)
      ) {
        return true
      }
      return false
    })
}

/**
 * Figures out if a certain component is imported in a AST tree, e.g.
 * If it's imported and renamed (e.g. `import {Button as BTN} ...`) then it
 * returns the renamed name of the import
 * @param j the JSCodeshift API
 * @param root the collection to check
 * @param name imported name, e.g. Button
 * @param path import path, or part of the path, e.g. @instructure/ui-buttons.
 * @return the name its imported as, undefined if it's not imported
 */
function findImport(
  j: JSCodeshift,
  root: Collection,
  name: string,
  path: string
) {
  let importedName: string | undefined
  root
    .find(j.ImportDeclaration)
    // check for import path
    .filter((astPath) => {
      const importSource = astPath.node.source.value // e.g. "@instructure/ui"
      if (importSource && typeof importSource === 'string') {
        const match = importSource.indexOf(path) > -1
        if (match) {
          return true
        }
      }
      return false
    })
    // check import name
    .forEach((path) => {
      if (path.node.specifiers) {
        path.node.specifiers.forEach((specifier) => {
          if (
            isImportSpecifier(specifier) &&
            specifier.imported.name === name
          ) {
            // is it imported via an alias? e.g. import { A as B } ..
            if (
              specifier.local &&
              specifier.local.name &&
              specifier.local.name != name
            ) {
              importedName = specifier.local.name
            } else {
              importedName = specifier.imported.name
            }
            return
          }
        })
      }
    })
  return importedName
}

/**
 * returns true for code like
 * "import { asd } from ..."
 * @param specifier
 */
function isImportSpecifier(
  specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier
): specifier is ImportSpecifier {
  return specifier.type === 'ImportSpecifier'
}

export { findTag, findAttribute, findImport }
