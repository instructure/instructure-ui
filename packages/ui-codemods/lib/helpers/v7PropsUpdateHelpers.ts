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
  Identifier,
  ImportDeclaration,
  ImportSpecifier,
  JSCodeshift,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXIdentifier,
  JSXMemberExpression,
  JSXSpreadAttribute,
  JSXSpreadChild,
  JSXText,
  Literal,
  MemberExpression
} from 'jscodeshift'
import type { LiteralKind } from 'ast-types/gen/kinds'
import fs from 'fs'

type JSXChild =
  | JSXElement
  | JSXExpressionContainer
  | JSXSpreadChild
  | JSXFragment
  | LiteralKind

type Attribute = {
  name: string
  value?: string | string[]
}

const warningsMap: Record<string, boolean> = {}

/**
 * Finds all the opening tag elements (JSXElement) given in tagName.
 * You can supply an optional withAttributes argument,
 * this will return only tags where the given prop with the given
 * value (or at least one in the array) exists (every attribute needs to exist).
 */
function findElements(
  filePath: string,
  j: JSCodeshift,
  root: Collection,
  tagName: string,
  withAttributes?: Attribute | Attribute[]
) {
  let elements
  if (tagName.includes('.')) {
    const tagNames = tagName.split('.')
    if (tagNames.length > 2) {
      throw new Error(`This script cannot handle tab names with 2 or more "."
      characters. Tag name: ${tagName}`)
    }
    elements = root.find(j.JSXElement, {
      openingElement: {
        // finds all <tagName.name>
        name: {
          type: 'JSXMemberExpression',
          object: {
            name: tagNames[0]
          },
          property: {
            name: tagNames[1]
          }
        }
      }
    })
  } else {
    elements = root.find(j.JSXElement, {
      openingElement: {
        // finds all <tagName>
        name: {
          type: 'JSXIdentifier',
          name: tagName
        }
      }
    })
  }
  elements.find(j.JSXSpreadAttribute).forEach((path) => {
    const line = filePath + '_' + path.value.loc?.start.line
    if (!warningsMap[line]) {
      // prevent displaying the same warning multiple times
      warningsMap[line] = true
      printWarning(
        filePath,
        path.value.loc?.start.line,
        'Spread attribute (`...`) detected. Please double check the ' +
          'result, I cannot see what is inside a spread object. '
      )
    }
  })
  return elements.filter((path) => {
    return checkIfAttributeExist(
      filePath,
      path.value.openingElement.attributes,
      withAttributes
    )
  })
}

function checkIfAttributeExist(
  filePath: string,
  attributes?: (JSXAttribute | JSXSpreadAttribute)[],
  withAttributes?: Attribute | Attribute[] // if array has to match every name
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
        } else if (isLiteral(attr.value)) {
          if (typeof toFind.value === 'string') {
            if (attr.value.value === toFind.value) {
              // name and value match
              numMatches++
            }
          } else if (toFind.value.includes(attr.value.value as string)) {
            // name and one of the values match
            numMatches++
          }
        } else {
          printWarning(
            filePath,
            attr.loc?.start.line,
            'Was looking for a string attribute value, but found ' +
              attr.value?.type
          )
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
 * attributes where these exist (at least one in the array has to exist).
 */
function findAttribute(
  filePath: string,
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
      if (!withAttrValue || withAttrValue.length == 0) {
        // no value(s) given, return everything
        return true
      }
      if (!isLiteral(path.value.value) && withAttrValue) {
        printWarning(
          filePath,
          path.value.loc?.start.line,
          'Attribute whose value is checked has non-literal value,' +
            'please check manually'
        )
        return false
      }
      const currentAttrValue = (path.value.value as Literal).value
      if (typeof withAttrValue === 'string') {
        if (currentAttrValue === withAttrValue) {
          // single value to search for
          return true
        }
      } else if (withAttrValue.includes(currentAttrValue as string)) {
        return true
      }
      return false
    })
}

/**
 * Prunes every non-visible child. This is useful because jscodeshift parses
 * newlines and spaces as children too, for example here:
 * ```
 * <Button>
 *   <aaa/>
 * </Button>
 * ```
 * Button will have 3 children: a JSXText with value `"  \n"`, aaa element, and
 * again a JSXText with `"  \n"`. This function removes the empty text nodes.
 */
function getVisibleChildren(nodes?: JSXChild[]) {
  const result: JSXChild[] = []
  if (!nodes) {
    return result
  }
  for (const child of nodes) {
    if (!isJSXText(child) || child.value.trim().length > 0) {
      result.push(child)
    }
  }
  return result
}

/**
 * Renames every element (=JSX tag). Modifies the input collection
 */
function renameElements(
  filePath: string,
  root: Collection<JSXElement> | JSXElement['children'],
  currentName: string,
  newName: string
) {
  if (!root) {
    return
  }
  if (Array.isArray(root)) {
    for (const elem of root) {
      if (isJSXElement(elem)) {
        renameElement(elem, currentName, newName)
      } else {
        printWarning(
          filePath,
          elem.loc?.start.line,
          "non element type encountered while renaming '" +
            currentName +
            "' please check."
        )
      }
    }
  } else {
    root.forEach((node) => {
      renameElement(node.node, currentName, newName)
    })
  }
}

function renameElement(node: JSXElement, currentName: string, newName: string) {
  if (isJSXIdentifier(node.openingElement.name)) {
    // Old and new name does not have a "." character
    if (newName.indexOf('.') > -1) {
      throw new Error(
        'Cannot perform a rename that adds a `.` character ' + ' to the name'
      ) // actually possible, but we don't need it.
    }
    const openingElement = node.openingElement.name
    if (openingElement.name === currentName) {
      openingElement.name = newName
      const closingElement = node.closingElement?.name as
        | JSXIdentifier
        | undefined
      if (closingElement) {
        closingElement.name = newName
      }
    }
  } else if (isJSXMemberExpression(node.openingElement.name)) {
    // Old and new name has a "." character
    const newNameArr = newName.split('.')
    if (newNameArr.length !== 2) {
      throw new Error(
        'Cannot perform a rename that removes a `.` character ' +
          ' from the name'
      ) // actually possible, but we don't need it.
    }
    const openingElement = node.openingElement.name
    ;(openingElement.object as JSXIdentifier).name = newNameArr[0]
    ;(openingElement.property as JSXIdentifier).name = newNameArr[1]
    const closingElement = node.closingElement?.name as
      | JSXMemberExpression
      | undefined
    if (closingElement) {
      ;(closingElement.object as JSXIdentifier).name = newNameArr[0]
      ;(closingElement.property as JSXIdentifier).name = newNameArr[1]
    }
  } else {
    throw new Error(
      'Cannot rename ' +
        currentName +
        ' this script cannot ' +
        'handle namespaced names (e.g. `List:Item`'
    )
  }
}

/**
 * Figures out if a certain component is imported in a AST tree.
 * If it's imported and renamed (e.g. `import {Button as BTN} ...`) then it
 * returns the renamed name of the import
 * @param j the JSCodeshift API
 * @param root the collection to check
 * @param name imported name, e.g. Button
 * @param path import path, or paths, e.g. `@instructure/ui-buttons`. Uses
 * `string.indexOf()` to search for matches, so substring matches are returned
 * too.
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
 * Finds every imported component from the given path in the given collection.
 * If an import is renamed it returns the renamed name. If `exactMatch` is true
 * importPath is searched via `string.indexOf()` so it can be a substring
 * For example calling it with "@instructure/ui` on a collection with
 * `exactMatch = true` with this collection:
 * ```
 * import { a } from "@instructure/ui"
 * import { b } from "@instructure/ui-buttons"
 * import { c } from "react"
 * ```
 * returns `["a", "b"]`
 */
function findEveryImport(
  j: JSCodeshift,
  root: Collection,
  importPath: string,
  exactMatch = true
) {
  const imports: string[] = []
  const everyInstUIImport = findImportPath(j, root, importPath, exactMatch)
  everyInstUIImport.forEach((path) => {
    if (path.node.specifiers) {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.local) {
          imports.push(specifier.local.name)
        }
      })
    }
  })
  return imports
}

/**
 * Adds a new import if needed (not imported yet). If its imported it returns
 * the value under it's imported at (e.g. an alias).
 * @param j the JSCodeshift API
 * @param root the collection to check
 * @param name imported name, e.g. Button
 * @param pathToAdd import path, or paths. If it
 * has multiple values it will search them all for this import, if it's not
 * found it will use the first element of the array to add the import.
 * @returns the name under it's imported at
 */
function addImportIfNeeded(
  j: JSCodeshift,
  root: Collection,
  name: string,
  pathToAdd: string | string[]
) {
  // if its imported already return the import name
  const importedName = findImport(j, root, name, pathToAdd)
  if (importedName) {
    return importedName
  }
  const paths: Collection<ImportDeclaration> = findImportPath(
    j,
    root,
    pathToAdd
  )
  if (paths.length == 0) {
    // not imported yet, just add a new line
    const newPath = typeof pathToAdd === 'string' ? pathToAdd : pathToAdd[0]
    root
      .find(j.ImportDeclaration)
      .at(-1)
      .insertAfter(
        j.importDeclaration(
          [j.importSpecifier(j.identifier(name))],
          j.literal(newPath)
        )
      )
  } else {
    paths.nodes()[0].specifiers!.push(j.importSpecifier(j.identifier(name)))
  }
  return name
}

/**
 * Finds all lines that import from `importPath`. For example with the
 * following root:
 * ```
 * import { a } from "@instructure/ui"
 * import { b } from "@instructure/ui-buttons"
 * import { c } from "react"
 * ```
 * `findImportPath(j, root, "@instructure/ui-buttons")`
 * will return line 2.
 * If exactMatch is `false` It uses `string.indexOf()` to find results, so
 * it returns substring matches too.
 */
function findImportPath(
  j: JSCodeshift,
  root: Collection,
  importPath: string | string[],
  exactMatch = true
) {
  const matcher = exactMatch
    ? (a: string, b: string) => a === b
    : (a: string, b: string) => a.indexOf(b) > -1
  return (
    root
      .find(j.ImportDeclaration)
      // check for import path
      .filter((astPath) => {
        const importSource = astPath.node.source.value // e.g. "@instructure/ui"
        if (importSource && typeof importSource === 'string') {
          if (typeof importPath === 'string') {
            if (matcher(importSource, importPath)) {
              return true
            }
          } else {
            for (const anImport of importPath) {
              if (matcher(importSource, anImport)) {
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
 * Removes all children from the specified element and makes it
 * self-closing.
 */
function removeAllChildren(element: JSXElement) {
  const elem = element
  if (elem.children) {
    while (elem.children.length > 0) {
      elem.children.pop()
    }
    elem.openingElement.selfClosing = true
    elem.closingElement = undefined
  }
}

// type checkers
type astElem = { type: string }
function isImportSpecifier(elem?: astElem | null): elem is ImportSpecifier {
  return elem !== null && elem !== undefined && elem.type === 'ImportSpecifier'
}

function isLiteral(elem?: astElem | null): elem is Literal {
  return elem !== null && elem !== undefined && elem.type === 'Literal'
}

function isIdentifier(elem?: astElem | null): elem is Identifier {
  return elem !== null && elem !== undefined && elem.type === 'Identifier'
}

function isMemberExpression(elem?: astElem | null): elem is MemberExpression {
  return elem !== null && elem !== undefined && elem.type == 'MemberExpression'
}

function isJSXAttribue(elem?: astElem | null): elem is JSXAttribute {
  return elem !== null && elem !== undefined && elem.type === 'JSXAttribute'
}

function isJSXElement(elem?: astElem | null): elem is JSXElement {
  return elem !== null && elem !== undefined && elem.type == 'JSXElement'
}

function isJSXText(elem?: astElem | null): elem is JSXText {
  return elem !== null && elem !== undefined && elem.type == 'JSXText'
}

function isJSXIdentifier(elem?: astElem | null): elem is JSXIdentifier {
  return elem !== null && elem !== undefined && elem.type == 'JSXIdentifier'
}

// Name of a tag that looks like "List.Item"
function isJSXMemberExpression(
  elem?: astElem | null
): elem is JSXMemberExpression {
  return (
    elem !== null && elem !== undefined && elem.type == 'JSXMemberExpression'
  )
}

function isJSXExpressionContainer(
  elem?: astElem | null
): elem is JSXExpressionContainer {
  return (
    elem !== null && elem !== undefined && elem.type == 'JSXExpressionContainer'
  )
}

const warnings: string[] = []
function printWarning(
  filePath: string,
  line: number | undefined,
  message: string
) {
  const warning = filePath + ': ' + line + ': ' + message
  warnings.push(warning)
  console.warn(warning)
}

function writeWarningsToFile(fileName: string) {
  if (warnings.length > 0) {
    const sorted = warnings.sort()
    fs.writeFileSync(fileName, sorted.join('\n') + '\n', {
      encoding: 'utf-8',
      flag: 'a'
    })
    warnings.length = 0
  }
}

export {
  findElements,
  findAttribute,
  findImport,
  findEveryImport,
  addImportIfNeeded,
  renameElements,
  getVisibleChildren,
  removeAllChildren,
  printWarning,
  writeWarningsToFile,
  // type checkers
  isIdentifier,
  isImportSpecifier,
  isMemberExpression,
  isJSXAttribue,
  isJSXElement,
  isJSXText,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXExpressionContainer,
  isLiteral
}
