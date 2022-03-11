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
  JSCodeshift,
  JSXElement,
  JSXExpressionContainer
} from 'jscodeshift'
import {
  addImportIfNeeded,
  findImport,
  isCallExpression,
  isIdentifier,
  isJSXElement,
  isLiteral,
  isMemberExpression,
  isSpreadElement,
  printWarning
} from '../helpers/codemodHelpers'

export type UpdateV8RenderPropOptions = {
  wrapperPath: string
  wrapperTag: string
  isDefaultImport: boolean
}

/**
 * Updates ReactDOM.render calls with a given wrapper, for example:
 * ReactDOM.render(<div />) -> ReactDOM.render(<Root><div /></Root>)
 */
export default function updateV8RenderProp(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  options: UpdateV8RenderPropOptions
) {
  const reactDOMImport = findImport(j, root, 'ReactDOM', 'react-dom')
  if (!reactDOMImport) {
    return false
  }
  let hasModifications = false
  root.find(j.CallExpression).forEach((path) => {
    const astNode = path.value.callee
    if (
      isMemberExpression(astNode) &&
      isIdentifier(astNode.object) &&
      astNode.object.name === 'ReactDOM' &&
      isIdentifier(astNode.property) &&
      astNode.property.name === 'render'
    ) {
      hasModifications = true
      // add import
      addImportIfNeeded(j, root, options.wrapperTag, options.wrapperPath, true)
      // wrap in <Root>
      const args = path.value.arguments
      if (args.length === 0) {
        printWarning(
          filePath,
          path.value.loc?.start.line,
          'ReactDOM.render() seems to have 0 arguments, please check'
        )
        return
      }
      const firstArg = args[0]
      if (isSpreadElement(firstArg)) {
        printWarning(
          filePath,
          path.value.loc?.start.line,
          'ReactDOM.render()-s first argument is spread element, please update manually.'
        )
        return
      } else {
        let argToAdd: JSXElement[] | JSXExpressionContainer[]
        if (isJSXElement(firstArg)) {
          argToAdd = [firstArg]
        } else if (
          isLiteral(firstArg) ||
          isIdentifier(firstArg) ||
          isCallExpression(firstArg)
        ) {
          argToAdd = [j.jsxExpressionContainer(firstArg)]
        } else {
          printWarning(
            filePath,
            path.value.loc?.start.line,
            'ReactDOM.render()-s first argument is some strange type, please update manually.'
          )
          return
        }
        args[0] = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier(options.wrapperTag)),
          j.jsxClosingElement(j.jsxIdentifier(options.wrapperTag)),
          argToAdd
        )
      }
    }
  })
  return hasModifications
}
