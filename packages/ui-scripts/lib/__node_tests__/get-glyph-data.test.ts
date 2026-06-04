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

import { describe, it, expect, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import getGlyphData from '../icons/get-glyph-data.ts'

describe('getGlyphData', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
  })

  // Set up two icons in both Solid and Line variants, plus a stray
  // non-svg file we expect the function to ignore.
  function setupFixtures() {
    dir = mkdtempSync(join(tmpdir(), 'get-glyph-')) + '/'
    mkdirSync(dir + 'Solid')
    mkdirSync(dir + 'Line')
    writeFileSync(dir + 'Solid/check.svg', '<svg><path d="solid-check"/></svg>')
    writeFileSync(dir + 'Line/check.svg', '<svg><path d="line-check"/></svg>')
    writeFileSync(dir + 'Solid/add.svg', '<svg><path d="solid-add"/></svg>')
    writeFileSync(dir + 'Line/add.svg', '<svg><path d="line-add"/></svg>')
    writeFileSync(dir + 'Solid/README.txt', 'not an svg, must be ignored')
  }

  it('returns one entry per icon × variant', () => {
    setupFixtures()
    const result = getGlyphData(dir, [], 'Icon')
    expect(result).toHaveLength(4) // 2 icons × 2 variants
  })

  it('ignores non-svg files in the variant directories', () => {
    setupFixtures()
    const result = getGlyphData(dir, [], 'Icon')
    expect(result.every((g) => !g.src.includes('not an svg'))).toBe(true)
  })

  it('applies the prefix to each component name', () => {
    setupFixtures()
    const result = getGlyphData(dir, [], 'MyIcon')
    for (const glyph of result) {
      expect(glyph.name.startsWith('MyIcon')).toBe(true)
    }
    expect(result.map((g) => g.name).sort()).toEqual([
      'MyIconAdd',
      'MyIconAdd',
      'MyIconCheck',
      'MyIconCheck'
    ])
  })

  it('flags glyphs as bidirectional only when listed', () => {
    setupFixtures()
    const result = getGlyphData(dir, ['check'], 'Icon')

    const check = result.find(
      (g) => g.glyphName === 'check' && g.variant === 'Solid'
    )
    const add = result.find(
      (g) => g.glyphName === 'add' && g.variant === 'Solid'
    )

    expect(check?.bidirectional).toBe(true)
    expect(add?.bidirectional).toBe(false)
  })

  it('reads the full SVG source content into the src field', () => {
    setupFixtures()
    const result = getGlyphData(dir, [], 'Icon')

    expect(result).toContainEqual({
      name: 'IconCheck',
      glyphName: 'check',
      variant: 'Solid',
      src: '<svg><path d="solid-check"/></svg>',
      bidirectional: false
    })
    expect(result).toContainEqual({
      name: 'IconAdd',
      glyphName: 'add',
      variant: 'Line',
      src: '<svg><path d="line-add"/></svg>',
      bidirectional: false
    })
  })
})
