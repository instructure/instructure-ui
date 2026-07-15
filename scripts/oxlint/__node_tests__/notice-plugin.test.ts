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
import plugin, {
  COPYRIGHT_NOTICE,
  hasNoticeHeader,
  insertNoticeHeader
} from '../notice-plugin.mjs'

const CLEAN_SOURCE = 'export const x = 1\n'

describe('notice-plugin', () => {
  describe('hasNoticeHeader (pure rule logic)', () => {
    it('is false for a file missing the header', () => {
      expect(hasNoticeHeader(CLEAN_SOURCE)).toBe(false)
    })

    it('is true for a file that already has the real header', () => {
      expect(hasNoticeHeader(COPYRIGHT_NOTICE + '\n' + CLEAN_SOURCE)).toBe(true)
    })

    it('is false for a header that merely resembles the real one (wrong text)', () => {
      expect(
        hasNoticeHeader('/* Copyright someone else */\n' + CLEAN_SOURCE)
      ).toBe(false)
    })
  })

  describe('insertNoticeHeader (fixer logic)', () => {
    it('prepends the exact real MIT header text', () => {
      const fixed = insertNoticeHeader(CLEAN_SOURCE)
      expect(fixed).toBe(COPYRIGHT_NOTICE + '\n' + CLEAN_SOURCE)
      expect(fixed).toContain('The MIT License (MIT)')
      expect(fixed).toContain('Copyright (c) 2015 - present Instructure, Inc.')
    })

    it('the fix is idempotent: applying it only when missing never duplicates the header', () => {
      const applyFixIfNeeded = (text: string) =>
        hasNoticeHeader(text) ? text : insertNoticeHeader(text)

      const once = applyFixIfNeeded(CLEAN_SOURCE)
      const twice = applyFixIfNeeded(once)

      expect(twice).toBe(once)
      expect(once.match(/The MIT License \(MIT\)/g)).toHaveLength(1)
    })
  })

  describe('the oxlint rule (create/visitor), independent of the oxlint CLI', () => {
    function lint(sourceText: string) {
      const reports: Array<{
        message: string
        fix?: (fixer: unknown) => unknown
      }> = []
      const context = {
        sourceCode: { getText: () => sourceText },
        report: (report: {
          message: string
          fix?: (fixer: unknown) => unknown
        }) => reports.push(report)
      }
      const visitor = plugin.rules.notice.create(context as never)
      visitor.Program({} as never)
      return reports
    }

    it('reports a missing header and the fix inserts the exact real header', () => {
      const reports = lint(CLEAN_SOURCE)
      expect(reports).toHaveLength(1)

      const fixer = {
        insertTextBefore: (_node: unknown, text: string) => ({ text })
      }
      const fixResult = reports[0].fix?.(fixer) as { text: string } | undefined
      expect(fixResult?.text).toBe(COPYRIGHT_NOTICE + '\n')
    })

    it('stays silent when the header is already present', () => {
      const reports = lint(COPYRIGHT_NOTICE + '\n' + CLEAN_SOURCE)
      expect(reports).toHaveLength(0)
    })

    it('declares meta.fixable so oxlint accepts its fixer', () => {
      expect(plugin.rules.notice.meta?.fixable).toBe('code')
    })
  })
})
