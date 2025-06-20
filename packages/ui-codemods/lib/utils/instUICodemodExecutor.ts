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

import { writeWarningsToFile } from './codemodHelpers'
import formatSource from './formatSource'
import type { API, Collection, FileInfo, JSCodeshift } from 'jscodeshift'

/**
 * @param j JSCodeshift instance
 * @param root the collection to work on. The function should modify this directly
 * @param filePath The path to the file that is being modified
 * @returns `true` if the code was modified
 */
export type InstUICodemod = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => boolean

/**
 * Runs the given codemod/codemods.
 * @param instUICodemods A function or an array of functions that do code
 * modification. If it returns `true` it modified the input collection.
 * @param file The file to process
 * @param api jscodeshift instance
 * @param options
 * @param options.filename if `filename` is specified then emitted warnings are
 * written to this file.
 * @param options.usePrettier if `true` the transformed code will be run through
 * [Prettier](https://prettier.io/). You can customize this through a [Prettier
 * config file](https://prettier.io/docs/configuration.html)
 * @returns the modified file as `string` or `null`
 */
const instUICodemodExecutor = (
  instUICodemods: InstUICodemod[] | InstUICodemod,
  file: FileInfo,
  api: API,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  const j = api.jscodeshift.withParser('tsx')
  const root = j(file.source)
  let hasModifications = false
  if (Array.isArray(instUICodemods)) {
    for (const inst of instUICodemods) {
      const modified = inst(j, root, file.path)
      if (modified) {
        hasModifications = true
      }
    }
  } else {
    hasModifications = instUICodemods(j, root, file.path)
  }

  if (options && options.fileName) {
    writeWarningsToFile(options.fileName)
  }

  if (hasModifications) {
    const shouldUsePrettier = options?.usePrettier !== false
    return shouldUsePrettier
      ? formatSource(root.toSource(), file.path)
      : root.toSource()
  } else {
    return null
  }
}

export default instUICodemodExecutor
