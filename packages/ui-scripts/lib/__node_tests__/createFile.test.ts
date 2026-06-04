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
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import createFile from '../build/buildThemes/createFile.ts'

describe('createFile', () => {
  let dir: string

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true })
  })

  it('writes a file with the license header prepended to the content', async () => {
    dir = mkdtempSync(join(tmpdir(), 'create-file-')) + '/'
    const target = dir + 'output.ts'

    await createFile(target, 'export const x = 1')

    const written = readFileSync(target, 'utf-8')
    expect(written).toContain('The MIT License (MIT)')
    expect(written).toContain('export const x = 1')
    expect(written.indexOf('The MIT License')).toBeLessThan(
      written.indexOf('export const x = 1')
    )
  })

  it('creates missing parent directories', async () => {
    dir = mkdtempSync(join(tmpdir(), 'create-file-')) + '/'
    const target = dir + 'deeply/nested/output.ts'

    await createFile(target, 'hello')

    expect(existsSync(target)).toBe(true)
  })

  it('overwrites an existing file at the same path', async () => {
    dir = mkdtempSync(join(tmpdir(), 'create-file-')) + '/'
    const target = dir + 'output.ts'

    writeFileSync(target, 'old content', 'utf-8')

    await createFile(target, 'new content')

    const written = readFileSync(target, 'utf-8')
    expect(written).toContain('new content')
    expect(written).not.toContain('old content')
  })

  it('does not throw when the target does not already exist', async () => {
    dir = mkdtempSync(join(tmpdir(), 'create-file-')) + '/'
    const target = dir + 'output.ts'

    // The function tries to unlink first — ENOENT must be swallowed
    await expect(createFile(target, 'hello')).resolves.not.toThrow()
  })
})
