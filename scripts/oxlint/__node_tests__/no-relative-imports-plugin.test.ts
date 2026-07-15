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

import { describe, expect, it } from 'vitest'
import path from 'node:path'
import plugin, {
  checkImportForRelativePackage,
  findNamedPackage
} from '../no-relative-imports-plugin.mjs'

const FIXTURES = path.join(__dirname, '__testfixtures__', 'no-relative-imports')
const PKG_A_INDEX = path.join(FIXTURES, 'pkg-a', 'src', 'index.ts')

describe('no-relative-imports-plugin', () => {
  describe('findNamedPackage', () => {
    it('walks up from a file to the nearest named package.json', () => {
      const found = findNamedPackage(PKG_A_INDEX)
      expect(found.packageJson?.name).toBe('@fixtures/pkg-a')
    })
  })

  describe('checkImportForRelativePackage (pure rule logic)', () => {
    it('flags a cross-package relative import, with the real error message format', () => {
      const message = checkImportForRelativePackage(
        '../../pkg-b/src/index',
        PKG_A_INDEX
      )
      expect(message).toBe(
        'Relative import from another package is not allowed. ' +
          'Use "@fixtures/pkg-b/index" instead of "../../pkg-b/src/index"'
      )
    })

    it('stays silent on a same-package sibling import', () => {
      const message = checkImportForRelativePackage('./sibling', PKG_A_INDEX)
      expect(message).toBeNull()
    })

    it('stays silent on a non-relative (bare specifier) import', () => {
      const message = checkImportForRelativePackage(
        '@instructure/ui-buttons',
        PKG_A_INDEX
      )
      expect(message).toBeNull()
    })

    it('stays silent when there is no context filename', () => {
      const message = checkImportForRelativePackage('../../pkg-b/src/index', '')
      expect(message).toBeNull()
    })
  })

  describe('the oxlint rule (create/visitor), independent of the oxlint CLI', () => {
    function lintWithVisitor(filename: string, imports: string[]) {
      const reports: unknown[] = []
      const context = {
        filename,
        report: (report: unknown) => reports.push(report)
      }
      const visitor = plugin.rules['no-relative-imports'].create(
        context as never
      )
      for (const source of imports) {
        visitor.ImportDeclaration({ source: { value: source } } as never)
      }
      return reports
    }

    it('reports exactly one violation for a cross-package import, none for a sibling import', () => {
      const reports = lintWithVisitor(PKG_A_INDEX, [
        './sibling',
        '../../pkg-b/src/index'
      ])
      expect(reports).toHaveLength(1)
      expect((reports[0] as { message: string }).message).toMatch(
        /Relative import from another package/
      )
    })

    it('handles CallExpression require() the same way as ImportDeclaration', () => {
      const reports: unknown[] = []
      const context = {
        filename: PKG_A_INDEX,
        report: (report: unknown) => reports.push(report)
      }
      const visitor = plugin.rules['no-relative-imports'].create(
        context as never
      )
      visitor.CallExpression({
        callee: { type: 'Identifier', name: 'require' },
        arguments: [{ type: 'Literal', value: '../../pkg-b/src/index' }]
      } as never)
      expect(reports).toHaveLength(1)
    })
  })
})
