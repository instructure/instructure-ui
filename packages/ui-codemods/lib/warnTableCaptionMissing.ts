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
import {
  findImport,
  findElement,
  findAttribute,
  printWarning
} from './utils/codemodHelpers'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import type { InstUICodemod } from './utils/instUICodemodExecutor'

const TABLE_IMPORT_PATHS = ['@instructure/ui-table', '@instructure/ui']

/**
 * Prints a warning if the `caption` prop is missing from a `<Table />`.
 */
const warnTableCaptionMissing: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(
    warnTableCaptionMissingCodemod,
    file,
    api,
    options
  )
}

const warnTableCaptionMissingCodemod: InstUICodemod = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => {
  let warned = false
  // Find the local name for Table (could be aliased)
  const tableName = findImport(j, root, 'Table', TABLE_IMPORT_PATHS)
  if (!tableName) return false

  // Find all <Table> elements
  const tableElements = findElement(filePath, j, root, tableName)
  tableElements.forEach((path) => {
    // Check if caption attribute exists
    const hasCaption =
      findAttribute(
        filePath,
        j,
        j(path.value.openingElement),
        'caption'
      ).size() > 0
    if (!hasCaption) {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        `<${tableName}> is missing required 'caption' prop.`
      )
      warned = true
    }
  })

  return warned
}

export default warnTableCaptionMissing
export { warnTableCaptionMissingCodemod }
