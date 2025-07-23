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
import jscodeshift, { Transform } from 'jscodeshift'
import { vi } from 'vitest'

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
    // TODO path error solved by npm i on master
  ) as Array<fs.Dirent & { path: string }>

  let fixturesRun = 0
  entries.forEach((entry) => {
    if (entry.isFile() && entry.name.includes('input')) {
      const isWarningTest = entry.name.includes('.warning.input')
      const inputPath = path.join(entry.path, entry.name)
      const input = fs.readFileSync(inputPath, 'utf8')
      const expectedName = entry.name.replace('input', 'output')
      const expectedPath = path.join(entry.path, expectedName)
      const expected = fs.readFileSync(expectedPath, 'utf8')

      // eslint-disable-next-line no-console
      console.log(
        codemod.name + ':',
        'Running fixture',
        entry.name,
        '->',
        expectedName
      )

      if (isWarningTest) {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })

        try {
          const j = jscodeshift.withParser('tsx')
          const fileInfo = { path: inputPath, source: input }
          const api = { jscodeshift: j, j: j, stats: () => { }, report: () => { } }
          const options = {}

          // Run codemod withouth comparison
          codemod(fileInfo, api, options)

          const expectedWarningContent = fs
            .readFileSync(expectedPath, 'utf8')
            .trim()
            .replace(/'/g, '"')

          let expectedWarnings: string[]

          try {
            expectedWarnings = JSON.parse(expectedWarningContent)
            if (!Array.isArray(expectedWarnings)) throw new Error()
          } catch {
            throw new Error(
              `Expected JSON array of warning strings in warning.output file like: ["warn1", "warn2"] in file: ${expectedPath}`
            )
          }

          // Verify each expected warning exists as many times as expected
          const actualWarnings = warnSpy.mock.calls.map(
            (call) => call[0] as string
          )

          expect(warnSpy).toHaveBeenCalledTimes(expectedWarnings.length)

          expectedWarnings.forEach((expected) => {
            const expectedCount = expectedWarnings.filter(
              (e) => e === expected
            ).length

            const actualCount = actualWarnings.filter((w) =>
              w.includes(expected)
            ).length

            expect(actualCount).toBe(expectedCount)
          })
        } finally {
          warnSpy.mockRestore()
        }
      } else {
        runInlineTest(codemod, {}, { path: inputPath, source: input }, expected)
      }
      fixturesRun++
    }
  })
  if (fixturesRun === 0) {
    throw new Error(
      `Test failed for codemod "${codemod.name}": No fixtures found.`
    )
  }
}
