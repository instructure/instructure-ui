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
import {
  ArrowFunction,
  FunctionDeclaration,
  FunctionExpression, JSDoc,
  JSDocTag, NamedDeclaration,
  TypeChecker,
  VariableDeclaration
} from 'typescript'
import fs from 'fs'

/**
 * Only exported variables whose docs contains "@module" will be included
 */
const moduleTag = 'module'

/**
 * Returns the part after the JSDoc tag, e.g. for
 * "@param abc def" it returns "abc def"
 */
function jsDocTagCommentToString(tag: JSDocTag | JSDoc) {
  return tag.comment ?
    typeof tag.comment == 'string' ?
      tag.comment :
      tag.comment.map(comment => comment.text).join(' ') :
    ''
}

/**
 * Find the `@returns` tag to get the return description
 */
function extractReturnDescription(node: ts.Node) {
  const allTags = ts.getJSDocTags(node)
  for (const tag of allTags) {
    if (ts.isJSDocReturnTag(tag)) {
      return jsDocTagCommentToString(tag)
    }
  }
  return undefined
}

function extractFunctionData(node: FunctionDeclaration | FunctionExpression | ArrowFunction,
                             typeChecker: TypeChecker): JsDocResult | undefined {
  // main description
  let description = ''
  // arrow function's name is the parent name, e.g. const asd = () => 4
  const symbol = typeChecker.getSymbolAtLocation(node.name || (node.parent as VariableDeclaration).name)
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
  const parameters: JsDocResult['params'] = node.parameters.map(param => {
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
  const returnsType = signature
    ? typeChecker.typeToString(typeChecker.getReturnTypeOfSignature(signature))
    : 'unknown'
  const returnsDesc = extractReturnDescription(node)
  return {
    // arrow function's name is the parents name
    name: node.name ? node.name.getText() : (node.parent as NamedDeclaration).name?.getText(),
    description: description,
    ...(parameters.length > 0 && {params: parameters}),
    ...((genericParameters && genericParameters.length > 0) && {genericParameters: genericParameters}),
    ...((returnsDesc || returnsType) && {
      returns: {
        description: returnsDesc,
        type: returnsType
      }
    })
  }
}

function parseNode(node: ts.Node, typeChecker: TypeChecker): JsDocResult | undefined {
  // Only exported functions with the @module annotation are needed
  // TODO we also have a private prop in the YML, do we need both?
  const allTags = ts.getJSDocTags(node)
  let hasModuleAnnotation = false
  let moduleName: string | undefined = undefined
  for (const tag of allTags) {
    if (!ts.isJSDoc(tag) && tag.tagName.text === moduleTag) {
      hasModuleAnnotation = true
      moduleName = jsDocTagCommentToString(tag)
    }
  }
  if (!hasModuleAnnotation) {
    return
  }

  let result: JsDocResult | undefined = undefined
  if (ts.isVariableStatement(node)) { // e.g. const x = function(){}, y = 5
    for (const d of node.declarationList.declarations) {
      if (d.initializer) {
        if (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer)) {
          result = extractFunctionData(d.initializer, typeChecker)
        }
      }
    }
  }
  // e.g. function focusable(el: Element)
  if (ts.isFunctionDeclaration(node)) {
    result = extractFunctionData(node, typeChecker)
  }
  // if it's not a function, then try to parse types from the JSDoc comment
  else if (!result) {
    let description = ''
    const params: JsDocResult['params'] = []
    const docs = ts.getJSDocCommentsAndTags(node)
    for (const doc of docs) {
      description = jsDocTagCommentToString(doc)
      if (ts.isJSDoc(doc)) {
        if (doc.tags) {
          for (const tag of doc.tags) {
            if (ts.isJSDocParameterTag(tag)) {
              params.push({
                name: tag.name.getText(),
                // Remove curly braces
                type: tag.typeExpression?.getText().replace(/^{|}$/g, ''),
                description: jsDocTagCommentToString(tag)
              })
            }
          }
        }
      }
    }
    const nodeName = moduleName || (node as NamedDeclaration)?.name?.getText()
    const returnsDesc = extractReturnDescription(node)
    const returnsType = ts.getJSDocReturnType(node)?.getText()
    result = {
      name: nodeName,
      description: description,
      ...(params.length > 0 && {params: params}),
      //genericParameters: todo,
      ...((returnsDesc || returnsType) && {
        returns: {
          description: returnsDesc,
          type: returnsType
        }
      })
    }
  }
  return result
}

export function getJSDoc(filePath: string, _error: (err: Error) => void): JsDocResult | undefined {

  function visit(node: ts.Node) {
    // export declaration (e.g. export {abd, def})
    if (ts.isExportDeclaration(node) &&
               node.exportClause &&
               ts.isNamedExports(node.exportClause)) {
      for (const e of node.exportClause.elements) {
        // TODO while this node can have the JSDoc comments, its types are at its
        // original location. This is not parsed currently
        const symbol = typeChecker.getSymbolAtLocation(e.name)
        if (symbol) {
          const originalSymbol = typeChecker.getAliasedSymbol(symbol)
          // will fail if the jsdoc is here, needs to be stitched together
          if (originalSymbol.valueDeclaration) {
            const res = parseNode(originalSymbol.valueDeclaration, typeChecker)
            if (res) {
              result?.push(res)
            }
          }
        }
      }
    }
    // direct export, e.g. export function(...)
    else if ((ts.isFunctionDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isVariableStatement(node) ||
      ts.isEnumDeclaration(node)) &&
      node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const res = parseNode(node, typeChecker)
      if (res) {
        result?.push(res)
      }
    }
  }
  // bail quickly if it does not have the module annotation
  const content = fs.readFileSync(filePath, 'utf-8')
  if (!content.includes( '@' + moduleTag)) {
    return undefined
  }

  const program = ts.createProgram([filePath], {})
  const typeChecker = program.getTypeChecker()
  const result: JsDocResult[] = []
  const sourceFile = program.getSourceFile(filePath)
  ts.forEachChild(sourceFile!, visit)
  return result.pop() // TODO users of this cannot handle more than 1 export/file :(
}
