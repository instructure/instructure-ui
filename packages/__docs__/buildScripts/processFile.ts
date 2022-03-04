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

import fs from 'fs'
import path from 'path'
import { parseDoc } from './utils/parseDoc'
import { getPathInfo } from './utils/getPathInfo'
import type { LibraryOptions } from './build-docs'

const DOCS: Record<string, string> = {}

export type ProcessedFile = ReturnType<typeof parseDoc> &
  ReturnType<typeof getPathInfo> & { id: string; title: string }

export function processFile(
  fullPath: string,
  projectRoot: string,
  library: LibraryOptions
) {
  const source = fs.readFileSync(fullPath) as unknown as string
  const context = path.dirname(fullPath) || process.cwd() // the directory of the file
  const pathInfo = getPathInfo(fullPath, projectRoot, library)

  const doc = parseDoc(fullPath, source, (err: Error) => {
    console.warn('Error when parsing ', fullPath, err.toString())
  })
  const mergedDoc = {
    ...doc,
    ...pathInfo
  } as ProcessedFile
  mergedDoc.id = getDocId(mergedDoc, context, fullPath)
  if (!mergedDoc.title) {
    mergedDoc.title = mergedDoc.id
  }
  // eslint-disable-next-line no-console
  console.info(`Processed ${mergedDoc.id} - ${mergedDoc.relativePath}`)
  return mergedDoc
}

function getDocId(docData: ProcessedFile, context: string, fullPath: string) {
  const { relativePath, id, describes } = docData
  let docId: string
  const lowerPath = relativePath.toLowerCase()
  if (id) {
    // exist if it was in the description at the top
    docId = id
  } else if (
    lowerPath.includes('/index.js') ||
    lowerPath.includes('/index.tsx')
  ) {
    docId = path.basename(context) // return its folder name
  } else if (lowerPath.includes('readme.md')) {
    const folder = path.basename(context)
    docId = describes ? folder + '__README' : folder
  } else {
    docId = path.parse(fullPath).name // filename without extension
  }
  if (DOCS[docId] && DOCS[docId] !== docData.relativePath) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `[${docId}] is a duplicate id: ${docData.relativePath}, ${DOCS[docId]}`
    )
  }

  DOCS[docId] = docData.relativePath
  return docId
}
