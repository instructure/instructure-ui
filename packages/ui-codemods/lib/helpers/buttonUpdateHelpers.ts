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
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSCodeshift,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXIdentifier,
  JSXSpreadAttribute,
  Literal
} from 'jscodeshift'
import type { LiteralKind } from 'ast-types/gen/kinds'

/**
 * Finds all the opening tag elements (JSXElement) given in tagName.
 * You can supply an optional withAttributes argument,
 * this will return only tags where the given prop with the given
 * values (or one in the array) exists (everything needs to exist).
 */
function findElements(
  j: JSCodeshift,
  root: Collection,
  tagName: string,
  withAttributes?: Attribute | Attribute[]
) {
  return root
    .find(j.JSXElement, {
      openingElement: {
        // finds all <tagName>
        name: {
          type: 'JSXIdentifier',
          name: tagName
        }
      }
    })
    .filter((path) => {
      return checkIfAttributeExist(
        path.value.openingElement.attributes,
        withAttributes
      )
    })
}

/**
 * Finds all the opening tag elements (JSXOpeningElement) given in tagName.
 * You can supply optional withAttrName and withAttrValue props,
 * this will return only tags where these props exist.
 */
function findOpeningTags(
  j: JSCodeshift,
  root: Collection,
  tagName: string,
  withAttributes?: Attribute | Attribute[]
) {
  return root
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: tagName
      }
    })
    .filter((path) => {
      return checkIfAttributeExist(path.value.attributes, withAttributes)
    })
}

type Attribute = {
  name: string
  value?: string | string[]
}

function checkIfAttributeExist(
  attributes?: (JSXAttribute | JSXSpreadAttribute)[],
  withAttributes?: Attribute | Attribute[] // if array has to match all
) {
  if (
    !withAttributes ||
    (Array.isArray(withAttributes) && withAttributes.length === 0)
  ) {
    // no attribute name is given, treat this as a match
    return true
  }
  if (!attributes) {
    // attribute name is given, but element has no attributes
    return false
  }
  const attribsToFind = Array.isArray(withAttributes)
    ? withAttributes
    : [withAttributes]
  let numMatches = 0
  for (const attr of attributes) {
    for (const toFind of attribsToFind) {
      if (isJSXAttribue(attr) && attr.name.name === toFind.name) {
        if (!toFind.value) {
          // attribute name matches, no values specified
          numMatches++
        } else if (isLiteral(attr.value) && attr.value.value) {
          if (typeof toFind.value === 'string') {
            if (attr.value.value === toFind.value) {
              // name and value match
              numMatches++
            }
          } else if (toFind.value.includes(attr.value.value as string)) {
            // name and one of the values match
            numMatches++
          }
        }
      }
    }
  }
  if (numMatches === attribsToFind.length) {
    return true
  }
  return false
}

/**
 * Returns all attributes from the given collection with the given attribute
 * name. Optionally you can supply attribute value(s), this will return only
 * attributes where these exist.
 */
function findAttribute(
  j: JSCodeshift,
  root: Collection,
  withAttrName: string,
  withAttrValue?: string | string[]
) {
  return root
    .find(j.JSXAttribute, {
      name: {
        name: withAttrName
      }
    })
    .filter((path) => {
      if (!withAttrName) {
        // no attribute name given, return every result
        return true
      }
      if (!withAttrValue) {
        // no value(s) given, just check name match
        if (withAttrName == path.value.name.name) {
          return true
        }
        return false
      }
      const currentAttrValue = path.value.value
        ? (path.value.value as Literal).value
        : undefined
      if (typeof withAttrValue === 'string') {
        if (currentAttrValue === withAttrValue) {
          // single value to search for
          return true
        }
      } else if (withAttrName.includes(currentAttrValue as string)) {
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
 * @param path import path, or paths, e.g. @instructure/ui-buttons.
 * @return the name its imported as, undefined if it's not imported
 */
function findImport(
  j: JSCodeshift,
  root: Collection,
  name: string,
  path: string | string[]
) {
  let importedName: string | undefined
  const importPaths = findImportPath(j, root, path)
  // check import name
  importPaths.forEach((path) => {
    if (path.node.specifiers) {
      path.node.specifiers.forEach((specifier) => {
        if (isImportSpecifier(specifier) && specifier.imported.name === name) {
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
 * Adds a new import to an existing import, e.g.
 * addImport(j, root, "@instructure/ui-buttons", "NewButton") will change
 * import { Button } from '@instructure/ui-buttons'
 * to
 * import { Button, NewButton } from '@instructure/ui-buttons'
 */
function addImport(
  j: JSCodeshift,
  root: Collection,
  importPath: string,
  importToAdd: string
) {
  const paths: Collection<ImportDeclaration> = findImportPath(
    j,
    root,
    importPath
  )
  if (paths.length != 1) {
    throw new Error(
      'Found multiple/no paths for ' +
        importPath +
        ' cannot decide where to add the new import'
    )
  }
  paths.forEach((path) => {
    path.value.specifiers!.push(j.importSpecifier(j.identifier(importToAdd)))
  })
}

/**
 * Renames every element (=JSX tag). Modifies the input collection
 */
function renameElements(
  root: Collection<JSXElement>,
  currentName: string,
  newName: string
) {
  root.forEach((node) => {
    const openingElement = node.node.openingElement.name as JSXIdentifier
    if (openingElement.name === currentName) {
      openingElement.name = newName
      const closingElement = node.node.closingElement?.name as
        | JSXIdentifier
        | undefined
      if (closingElement) {
        closingElement.name = newName
      }
    }
  })
}

/**
 * Finds all lines that import from importPath, e.g.
 * `import {Button} from "@instructure/ui"
 */
function findImportPath(
  j: JSCodeshift,
  root: Collection,
  importPath: string | string[]
) {
  return (
    root
      .find(j.ImportDeclaration)
      // check for import path
      .filter((astPath) => {
        const importSource = astPath.node.source.value // e.g. "@instructure/ui"
        if (importSource && typeof importSource === 'string') {
          if (typeof importPath === 'string') {
            if (importSource.indexOf(importPath) > -1) {
              return true
            }
          } else {
            for (const anImport of importPath) {
              if (importSource.indexOf(anImport) > -1) {
                return true
              }
            }
          }
        }
        return false
      })
  )
}

/**
 * returns true for code like
 * "import { asd } from ..."
 */
function isImportSpecifier(
  specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier
): specifier is ImportSpecifier {
  return specifier.type === 'ImportSpecifier'
}

function isJSXAttribue(
  attr: JSXAttribute | JSXSpreadAttribute
): attr is JSXAttribute {
  return attr.type === 'JSXAttribute'
}

function isLiteral(
  attr:
    | LiteralKind
    | JSXExpressionContainer
    | JSXElement
    | JSXFragment
    | null
    | undefined
): attr is Literal {
  return (
    attr !== undefined &&
    attr !== null &&
    typeof attr === 'object' &&
    attr.type === 'Literal'
  )
}

export {
  findElements,
  findAttribute,
  findImport,
  findOpeningTags,
  addImport,
  renameElements,
  isJSXAttribue
}
