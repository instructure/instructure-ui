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

import { describe, it, expect, afterEach, vi } from 'vitest'
import { mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import generateSvgIndex from '../icons/generate-svg-index.ts'

describe('generateSvgIndex', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
  })

  it('writes a single svg/index.js containing one export per glyph', async () => {
    dir = mkdtempSync(join(tmpdir(), 'gen-svg-idx-')) + '/'

    const glyphs = [
      {
        name: 'IconCheck',
        variant: 'Solid' as const,
        glyphName: 'check',
        src: '<svg viewBox="0 0 10 10"><path d="M0,0"/></svg>',
        bidirectional: false
      },
      {
        name: 'IconAdd',
        variant: 'Line' as const,
        glyphName: 'add',
        src: '<svg viewBox="0 0 10 10"><path d="M5,0L5,10"/></svg>',
        bidirectional: false
      }
    ]

    generateSvgIndex(glyphs, dir)

    const indexPath = dir + 'svg/index.js'

    const content = await vi.waitFor(() => {
      const c = readFileSync(indexPath, 'utf-8')
      expect(c).toContain('export const IconCheckSolid')
      expect(c).toContain('export const IconAddLine')
      return c
    })

    const exportLineCount = (content.match(/^export const /gm) || []).length
    expect(exportLineCount).toBe(glyphs.length)

    expect(content).toContain('export const IconCheckSolid = {')
    expect(content).toContain('variant: "Solid"')
    expect(content).toContain('glyphName: "check"')
    expect(content).toContain('<path d="M0,0"/>')

    expect(content).toContain('export const IconAddLine = {')
    expect(content).toContain('variant: "Line"')
    expect(content).toContain('glyphName: "add"')
    expect(content).toContain('<path d="M5,0L5,10"/>')
  })
})
