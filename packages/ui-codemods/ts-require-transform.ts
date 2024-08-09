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

import { transformSync } from 'esbuild'
import { addHook } from 'pirates'
import { extname } from 'path'

/**
 * This function is called as a hook by pirates when a `require` call is made. It transforms typescript code to
 * javascript during the dynamic import process. It is a necessary workaround because vitest does not support
 * importing typescript files with `require`.
 * @param code code to transform
 * @param filename file name of the code
 */
function transformCode(code: string, filename: string): string {
  const ext = extname(filename).slice(1)

  const result = transformSync(code, {
    loader: ext as 'ts' | 'tsx',
    target: 'es2019',
    format: 'cjs',
    sourcefile: filename
  })

  return result.code
}

addHook(transformCode, {
  exts: ['.ts', '.tsx'],
  ignoreNodeModules: true
})
