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

import type { API, FileInfo } from 'jscodeshift'
import { writeWarningsToFile } from './helpers/codemodHelpers'
import formatSource from './utils/formatSource'
import updateV8RenderProp from './utils/updateV8RenderProp'

export default function updateV8Breaking(
  file: FileInfo,
  api: API,
  options?: {
    fileName: string
    wrapperPath: string
    wrapperTag: string
    isDefaultImport: true
  }
) {
  const j = api.jscodeshift
  const root = j(file.source)
  const finalOptions = {
    wrapperPath: '@canvas/react-root',
    wrapperTag: 'Root',
    isDefaultImport: true
  }
  if (options && options.wrapperPath) {
    finalOptions.wrapperPath = options.wrapperPath
  }
  if (options && options.wrapperTag) {
    finalOptions.wrapperTag = options.wrapperTag
  }
  if (options && options.isDefaultImport) {
    finalOptions.isDefaultImport = options.isDefaultImport
  }
  const hasModifications = updateV8RenderProp(j, root, file.path, finalOptions)
  if (options && options.fileName) {
    writeWarningsToFile(options.fileName)
  }
  return hasModifications ? formatSource(root.toSource(), file.path) : null
}
