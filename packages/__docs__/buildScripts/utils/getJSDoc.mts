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

import * as ts from 'typescript'
import type { JsDocResult } from '../DataTypes.mjs'

function extractFunctionInfo(filePath: string) {
  const program = ts.createProgram([filePath], {})
  const sourceFile = program.getSourceFile(filePath)
  if (!sourceFile) {
    throw new Error(`Could not load source file: ${filePath}`)
  }
  const typeChecker = program.getTypeChecker()
  let result: Partial<JsDocResult> | undefined = undefined
  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      // Extract JSDoc comments
      const allTags = ts.getJSDocTags(node)
      // only exported functions with the @module annotation are needed
      let hasModuleAnnotation = false
      for (const tag of allTags) {
        if (tag.tagName.text === 'module') {
          hasModuleAnnotation = true
        }
      }
      if (!hasModuleAnnotation) {
        return
      }
      // Find the @returns tag to get the return type description
      let returnDescription: string | undefined
      for (const tag of allTags) {
        if (tag.comment && (tag.tagName.text === 'returns' || tag.tagName.text === 'return')) {
          returnDescription = typeof tag.comment === 'string'
            ? tag.comment
            : tag.comment.map(comment => comment.text).join(' ')
          break
        }
      }
      // main description
      let description = ''
      const symbol = typeChecker.getSymbolAtLocation(node.name!)
      if (symbol) {
        const docs = symbol.getDocumentationComment(typeChecker)
        description = ts.displayPartsToString(docs)
      }
      // Extract generic type parameters and their constraints
      const genericParameters = node.typeParameters?.map(typeParam => {
        return {
          name: typeParam.name.text,
          defaultValue: typeParam.default?.getText(),
          constraint: ts.getEffectiveConstraintOfTypeParameter(typeParam)?.getText()
        }
      })
      // Extract parameter types
      const parameters = node.parameters.map(param => {
        const paramSymbol = typeChecker.getSymbolAtLocation(param.name)
        return {
          name: param.name.getText(),
          type: typeChecker.typeToString(typeChecker.getTypeAtLocation(param.name)),
          defaultValue: param.initializer?.getText(),
          optional: param.questionToken !== undefined || param.initializer !== undefined,
          description: paramSymbol ? ts.displayPartsToString(paramSymbol.getDocumentationComment(typeChecker)) : undefined
        }
      })
      // Extract return type
      const signature = typeChecker.getSignatureFromDeclaration(node)
      const returnType = signature
        ? typeChecker.typeToString(typeChecker.getReturnTypeOfSignature(signature))
        : 'unknown'
      result = {
        name: node.name?.getText(),
        description: description,
        params: parameters,
        genericParameters: genericParameters,
        returns: {
          description: returnDescription || '',
          type: returnType
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return result
}

export function getJSDoc(filePath: string, _error: (err: Error) => void) {
  return extractFunctionInfo(filePath)
}
