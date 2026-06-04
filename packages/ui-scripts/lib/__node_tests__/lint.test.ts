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

import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@instructure/command-utils', () => ({
  runCommandSync: vi.fn()
}))

import lint from '../test/lint.ts'
import { runCommandSync } from '@instructure/command-utils'

const runMock = vi.mocked(runCommandSync)

describe('lint handler', () => {
  beforeEach(() => {
    runMock.mockClear()
  })

  it('lints "." when no positional paths are provided', async () => {
    await lint.handler({ _: ['lint'] })
    expect(runMock).toHaveBeenCalledWith('eslint', ['.'])
  })

  it('keeps only .js, .jsx, .ts, .tsx paths', async () => {
    await lint.handler({
      _: ['lint', 'a.ts', 'b.js', 'c.tsx', 'd.jsx', 'e.md', 'f.json']
    })
    const [, paths] = runMock.mock.calls[0]
    expect(paths).toEqual(['a.ts', 'b.js', 'c.tsx', 'd.jsx'])
  })

  it('drops paths with non-JS/TS extensions', async () => {
    await lint.handler({ _: ['lint', 'README.md', 'package.json'] })
    expect(runMock).not.toHaveBeenCalled()
  })

  it('passes --fix to eslint when argv.fix is true', async () => {
    await lint.handler({ _: ['lint', 'a.ts'], fix: true })
    expect(runMock).toHaveBeenCalledWith('eslint', ['a.ts', '--fix'])
  })

  it('does not pass --fix when argv.fix is false', async () => {
    await lint.handler({ _: ['lint', 'a.ts'], fix: false })
    expect(runMock).toHaveBeenCalledWith('eslint', ['a.ts'])
  })

  it('does not pass --fix when argv.fix is undefined', async () => {
    await lint.handler({ _: ['lint', 'a.ts'] })
    expect(runMock).toHaveBeenCalledWith('eslint', ['a.ts'])
  })

  it('appends --fix even when linting the default "." path', async () => {
    await lint.handler({ _: ['lint'], fix: true })
    expect(runMock).toHaveBeenCalledWith('eslint', ['.', '--fix'])
  })
})
