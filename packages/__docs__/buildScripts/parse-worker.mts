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

import { parentPort, workerData } from 'worker_threads'
import { parseSingleFile, projectRoot, library } from './parseSingleFile.mjs'

interface WorkerInput {
  // [originalIndex, absolutePath] pairs; the index lets the parent reassemble
  // results into the exact same order as a serial parse.
  items: [number, string][]
}

const { items } = workerData as WorkerInput

// Each parsed doc is paired with its original index so the parent can restore
// serial order. The whole chunk is sent back as one JSON string (one
// structured-clone, cheap to re-parse) rather than postMessaging each doc
// individually. A `tick` is posted per file so the parent can drive the
// progress bar.
const results: [number, unknown][] = items.map(([index, fullPath]) => {
  const doc = parseSingleFile(fullPath, projectRoot, library) ?? null
  parentPort!.postMessage({ t: 'tick' })
  return [index, doc]
})

parentPort!.postMessage({ t: 'done', data: JSON.stringify(results) })
