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
import { JSCodeshift, Collection, Transform } from 'jscodeshift'
import { findImport, printWarning } from './utils/codemodHelpers'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import type { InstUICodemod } from './utils/instUICodemodExecutor'

/**
 * Prints a warning if a `CodeEditor` import is found
 */
const warnCodeEditorRemoved: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(warnCodeEditorRemovedCodemod, file, api, options)
}

const warnCodeEditorRemovedCodemod: InstUICodemod = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => {
  const codeEditor = findImport(j, root, 'CodeEditor', [
    '@instructure/ui-code-editor',
    '@instructure/ui'
  ])
  if (!codeEditor) return false
  printWarning(
    filePath,
    0,
    `imports CodeEditor. This is removed in InstUI 11, you must migrate to SourceCodeEditor and remove the instructure/ui-code-editor dependency`
  )
  return true
}

export default warnCodeEditorRemoved
export { warnCodeEditorRemovedCodemod }
