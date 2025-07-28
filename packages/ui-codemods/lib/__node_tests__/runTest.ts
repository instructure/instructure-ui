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

import path from 'path'
import fs from 'fs'
// eslint-disable-next-line no-restricted-imports
import { runInlineTest } from 'jscodeshift/src/testUtils'
import { Transform } from 'jscodeshift'

/**
 * A helper function to run codemods. For it work properly some conventions
 * must be kept:
 * - Fixtures must be in the `./__testfixtures__/[codemod name]/` subfolder
 * - Fixtures must be named `XY.input.[ts|tsx|js]` and `XY.output.[ts|tsx|js]`
 * @param codemod The codemod to run
 */
export function runTest(codemod: Transform) {
  const entries = fs.readdirSync(
    `${__dirname}/__testfixtures__/${codemod.name}`,
    { withFileTypes: true }
  )
  let fixturesRun = 0
  entries.forEach((entry) => {
    if (entry.isFile() && entry.name.indexOf('input') > -1) {
      const inputPath = path.join(entry.parentPath, entry.name)
      const expectedName = entry.name.replace('input', 'output')
      // eslint-disable-next-line no-console
      console.log(
        codemod.name + ':',
        'Running fixture',
        entry.name,
        '->',
        expectedName
      )
      const input = fs.readFileSync(inputPath, 'utf8')
      const expected = fs.readFileSync(
        path.join(entry.parentPath, expectedName),
        'utf8'
      )
      // We need to supply inputPath because some codemods use it, e.g. to
      // pick up prettier config or prettier figures out which parser to use
      // based on the file's extension.
      // Also, this is closer to how its used, there is always a correct
      // filename
      runInlineTest(codemod, {}, { path: inputPath, source: input }, expected)
      fixturesRun++
    }
  })
  if (fixturesRun === 0) {
    throw new Error(
      `Test failed for codemod "${codemod.name}": No fixtures found.`
    )
  }
}
