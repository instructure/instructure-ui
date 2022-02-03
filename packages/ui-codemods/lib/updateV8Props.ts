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

import { API, FileInfo } from 'jscodeshift'
import formatSource from './utils/formatSource'

/**
 * Renames components theme={} prop to themeOverride={}
 */
export default function updateV8Props(file: FileInfo, api: API) {
  const j = api.jscodeshift
  const root = j(file.source)
  const instUIImports: string[] = []
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const importSource = path.node.source.value
      if (importSource && typeof importSource === 'string') {
        return !!importSource.match(/@instructure\/ui/gm)
      }
      return false
    })
    .forEach((path) => {
      if (path.node.specifiers) {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.local) {
            instUIImports.push(specifier.local.name)
          }
        })
      }
    })
  let isChanged = false
  instUIImports.forEach((instUIImport) => {
    const elems = root
      .find(j.JSXOpeningElement, {
        name: {
          type: 'JSXIdentifier',
          name: instUIImport
        }
      })
      .find(j.JSXIdentifier, {
        name: 'theme'
      })
    elems.replaceWith('themeOverride')
    if (elems.length > 0) {
      isChanged = true
    }
  })
  if (isChanged) {
    return formatSource(root.toSource(), file.path)
  }
  return null
}
