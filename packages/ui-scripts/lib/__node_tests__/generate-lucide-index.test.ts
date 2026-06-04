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
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import generateLucideIndex from '../icons/generate-lucide-index.ts'

describe('generateLucideIndex', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  function setupFixtures(customIcons: string[] = []) {
    dir = mkdtempSync(join(tmpdir(), 'gen-lucide-')) + '/'
    mkdirSync(dir + 'svg/Custom', { recursive: true })
    for (const name of customIcons) {
      writeFileSync(dir + `svg/Custom/${name}.svg`, '<svg/>')
    }
    vi.spyOn(process, 'cwd').mockReturnValue(dir.slice(0, -1))
    vi.spyOn(console, 'log').mockImplementation(() => {})
  }

  it('writes a wrapped export for each Lucide icon', () => {
    setupFixtures()
    generateLucideIndex()
    const content = readFileSync(dir + 'src/generated/lucide/index.ts', 'utf-8')
    const exportCount = (content.match(/^export const /gm) || []).length
    expect(exportCount).toBeGreaterThan(0)
    // Every exported icon should follow the wrapLucideIcon pattern
    expect(content).toMatch(
      /export const \w+InstUIIcon = wrapLucideIcon\(Lucide\.\w+\)/
    )
  })

  it('excludes Lucide icons that are shadowed by a Custom SVG of the same name', () => {
    // svg/Custom/check.svg → PascalCase "Check" — Lucide also has a Check icon
    setupFixtures(['check'])
    generateLucideIndex()
    const content = readFileSync(dir + 'src/generated/lucide/index.ts', 'utf-8')
    // Should NOT export the shadowed Lucide icon
    expect(content).not.toContain('export const CheckInstUIIcon')
  })

  it('imports the wrap helper and re-exports under InstUIIcon-suffixed names', () => {
    setupFixtures()
    generateLucideIndex()
    const content = readFileSync(dir + 'src/generated/lucide/index.ts', 'utf-8')
    expect(content).toContain(
      "import { wrapLucideIcon } from '../../lucide/wrapLucideIcon'"
    )
    expect(content).toContain("import * as Lucide from 'lucide-react'")
  })
})
