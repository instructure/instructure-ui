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
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import generateLegacyIconsData from '../icons/generate-legacy-icons-data.ts'

describe('generateLegacyIconsData', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  function setupFixtures() {
    dir = mkdtempSync(join(tmpdir(), 'gen-legacy-')) + '/'
    // The function derives its source dir from process.cwd() + '/svg/'.
    // Build that structure in our temp dir and redirect cwd to it.
    mkdirSync(dir + 'svg/Solid', { recursive: true })
    mkdirSync(dir + 'svg/Line', { recursive: true })
    writeFileSync(
      dir + 'svg/Solid/check.svg',
      '<svg><path d="solid-check"/></svg>'
    )
    writeFileSync(
      dir + 'svg/Line/check.svg',
      '<svg><path d="line-check"/></svg>'
    )
    writeFileSync(dir + 'svg/Solid/add.svg', '<svg><path d="solid-add"/></svg>')
    writeFileSync(dir + 'svg/Line/add.svg', '<svg><path d="line-add"/></svg>')
    vi.spyOn(process, 'cwd').mockReturnValue(dir.slice(0, -1))
  }

  it('returns one merged entry per glyphName, not one per variant', () => {
    setupFixtures()
    const result = generateLegacyIconsData()
    expect(result).toHaveLength(2)
  })

  it('merges Line and Solid variants into lineSrc and solidSrc', () => {
    setupFixtures()
    const result = generateLegacyIconsData() as Array<{
      name: string
      glyphName: string
      bidirectional: boolean
      lineSrc?: string
      solidSrc?: string
    }>

    const check = result.find((g) => g.glyphName === 'check')
    expect(check).toBeDefined()
    expect(check?.name).toEqual('IconCheck')
    expect(check?.lineSrc).toEqual('<svg><path d="line-check"/></svg>')
    expect(check?.solidSrc).toEqual('<svg><path d="solid-check"/></svg>')
  })

  it('keeps bidirectional false (the function hardcodes an empty list)', () => {
    setupFixtures()
    const result = generateLegacyIconsData() as Array<{
      bidirectional: boolean
    }>
    for (const entry of result) {
      expect(entry.bidirectional).toBe(false)
    }
  })
})
