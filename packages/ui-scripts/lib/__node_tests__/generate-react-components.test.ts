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
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import generateReactComponents from '../icons/generate-react-components.ts'

describe('generateReactComponents', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
  })

  it('writes one .tsx per glyph plus an index.ts', async () => {
    dir = mkdtempSync(join(tmpdir(), 'gen-react-')) + '/'

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

    generateReactComponents(glyphs, dir)

    await vi.waitFor(() => {
      const found = readdirSync(dir).sort()
      expect(found).toEqual([
        'IconAddLine.tsx',
        'IconCheckSolid.tsx',
        'index.ts'
      ])
    })

    const checkComponent = readFileSync(dir + 'IconCheckSolid.tsx', 'utf-8')
    expect(checkComponent).toContain('class IconCheckSolid extends Component')
    expect(checkComponent).toContain('viewBox="0 0 10 10"')

    const indexFile = readFileSync(dir + 'index.ts', 'utf-8')

    const exportLineCount = (indexFile.match(/^export \{/gm) || []).length
    expect(exportLineCount).toBe(glyphs.length)

    expect(indexFile).toContain(
      "export { IconCheckSolid } from './IconCheckSolid'"
    )
    expect(indexFile).toContain("export { IconAddLine } from './IconAddLine'")
  })
})
