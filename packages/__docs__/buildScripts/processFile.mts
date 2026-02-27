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
import { parseDoc } from './utils/parseDoc.mjs'
import { getPathInfo } from './utils/getPathInfo.mjs'
import type { LibraryOptions, ProcessedFile } from './DataTypes.mjs'

export function processFile(
  fullPath: string,
  projectRoot: string,
  library: LibraryOptions
): ProcessedFile | undefined {
  // eslint-disable-next-line no-console
  console.info(`Processing ${fullPath}`)
  const source = fs.readFileSync(fullPath)
  const dirName = path.dirname(fullPath) || process.cwd()
  const pathInfo = getPathInfo(fullPath, projectRoot, library)

  const doc = parseDoc(fullPath, source, (err: Error) => {
    console.warn('Error when parsing ', fullPath, ":\n", err.stack)
  })
  if (!doc) {
    return
  }
  const docData: ProcessedFile = { ...doc, ...pathInfo } as ProcessedFile
  let docId: string
  const lowerPath = docData.relativePath.toLowerCase()
  if (docData.id) {
    // exist if it was in the YAML description at the top
    docId = docData.id
  } else if (lowerPath.includes(path.sep + 'index.tsx')) {
    docId = docData.displayName ?? path.basename(path.dirname(fullPath))
  } else if (lowerPath.includes('readme.md')) {
    const folder = path.basename(dirName)
    docId = docData.describes ? folder + '__README' : folder
  } else {
    docId = path.parse(fullPath).name // filename without extension
  }
  docData.id = docId
  if (!docData.title) {
    docData.title = docData.id
  }

  // Extract component version from the file path (e.g. /v1/ or /v2/)
  const pathSegments = fullPath.split(path.sep)
  const versionSegment = pathSegments.find((seg) => /^v\d+$/.test(seg))
  if (versionSegment) {
    docData.componentVersion = versionSegment
  }

  return docData
}
