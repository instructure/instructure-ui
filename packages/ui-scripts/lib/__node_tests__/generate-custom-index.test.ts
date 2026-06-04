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
import generateCustomIndex from '../icons/generate-custom-index.ts'

describe('generateCustomIndex', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  function setupFixtures() {
    dir = mkdtempSync(join(tmpdir(), 'gen-custom-')) + '/'
    mkdirSync(dir + 'svg/Custom', { recursive: true })
    writeFileSync(
      dir + 'svg/Custom/ai-info.svg',
      '<svg viewBox="0 0 24 24"><path d="M0,0" fill="currentColor"/></svg>'
    )
    writeFileSync(
      dir + 'svg/Custom/canvas-logo.svg',
      '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8"/></svg>'
    )
    vi.spyOn(process, 'cwd').mockReturnValue(dir.slice(0, -1))
    vi.spyOn(console, 'log').mockImplementation(() => {})
  }

  it('writes one InstUIIcon export per SVG file', () => {
    setupFixtures()
    generateCustomIndex()
    const content = readFileSync(
      dir + 'src/generated/custom/index.tsx',
      'utf-8'
    )
    const exportCount = (content.match(/^export const /gm) || []).length
    expect(exportCount).toBe(2)
  })

  it('converts kebab-case filenames to PascalCase icon names', () => {
    setupFixtures()
    generateCustomIndex()
    const content = readFileSync(
      dir + 'src/generated/custom/index.tsx',
      'utf-8'
    )
    expect(content).toContain('export const AiInfoInstUIIcon')
    expect(content).toContain('export const CanvasLogoInstUIIcon')
  })

  it('forwards the SVG viewBox to wrapCustomIcon', () => {
    setupFixtures()
    generateCustomIndex()
    const content = readFileSync(
      dir + 'src/generated/custom/index.tsx',
      'utf-8'
    )
    expect(content).toContain(
      "wrapCustomIcon(AiInfoPaths, 'AiInfo', '0 0 24 24')"
    )
    expect(content).toContain(
      "wrapCustomIcon(CanvasLogoPaths, 'CanvasLogo', '0 0 32 32')"
    )
  })

  it('rewrites fill="currentColor" to ={color} so consumers can theme the icon', () => {
    setupFixtures()
    generateCustomIndex()
    const content = readFileSync(
      dir + 'src/generated/custom/index.tsx',
      'utf-8'
    )
    expect(content).toContain('fill={color}')
    expect(content).not.toContain('fill="currentColor"')
  })

  it('throws if the svg/Custom directory does not exist', () => {
    dir = mkdtempSync(join(tmpdir(), 'gen-custom-')) + '/'
    vi.spyOn(process, 'cwd').mockReturnValue(dir.slice(0, -1))
    vi.spyOn(console, 'log').mockImplementation(() => {})
    expect(() => generateCustomIndex()).toThrow(/SVG directory not found/)
  })
})
