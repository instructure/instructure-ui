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

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const {
  resolveComponentVersions,
  _clearCache
} = require('../resolveComponentVersions.cjs')

/**
 * Build a throwaway repo tree that mirrors the real versioned-exports layout:
 *
 *  - ui-buttons: clean v1/v2 split (a.ts -> v1 = v11.6, b.ts -> v2 = v11.7)
 *  - ui-form-field: mixed — b.ts re-exports most components from v2 but `utils`
 *    from v1 (utils has no v2), and FormFieldLabel exists only in a.ts (v1).
 *  - ui-scripts: no versioned/lettered exports at all.
 */
let repoRoot: string

function write(rel: string, content: string) {
  const abs = path.join(repoRoot, rel)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, content)
}

function pkgJson(pkg: string, exportsMap: Record<string, unknown>) {
  write(
    `packages/${pkg}/package.json`,
    JSON.stringify(
      { name: `@instructure/${pkg}`, version: '11.7.0', exports: exportsMap },
      null,
      2
    )
  )
}

function exportEntry(letter: string) {
  return {
    src: `./src/exports/${letter}.ts`,
    types: `./types/exports/${letter}.d.ts`,
    import: `./es/exports/${letter}.js`,
    require: `./lib/exports/${letter}.js`,
    default: `./es/exports/${letter}.js`
  }
}

beforeAll(() => {
  repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'instui-cv-'))

  // ui-buttons — a.ts = all v1, b.ts = all v2
  write(
    'packages/ui-buttons/src/exports/a.ts',
    `export { Button } from '../Button/v1/index.js'\nexport { IconButton } from '../IconButton/v1/index.js'\n`
  )
  write(
    'packages/ui-buttons/src/exports/b.ts',
    `export { Button } from '../Button/v2/index.js'\nexport { IconButton } from '../IconButton/v2/index.js'\n`
  )
  pkgJson('ui-buttons', {
    '.': exportEntry('a'),
    './v11_6': exportEntry('a'),
    './v11_7': exportEntry('b'),
    './latest': exportEntry('b')
  })

  // ui-form-field — mixed versions inside a single lettered file
  write(
    'packages/ui-form-field/src/exports/a.ts',
    `export { FormField } from '../FormField/v1/index.js'\n` +
      `export { FormFieldLabel } from '../FormFieldLabel/v1/index.js'\n` +
      `export * from '../utils/v1'\n`
  )
  write(
    'packages/ui-form-field/src/exports/b.ts',
    `export { FormField } from '../FormField/v2/index.js'\n` +
      `export * from '../utils/v1'\n`
  )
  pkgJson('ui-form-field', {
    '.': exportEntry('a'),
    './v11_6': exportEntry('a'),
    './v11_7': exportEntry('b'),
    './latest': exportEntry('b')
  })

  // ui-scripts — not part of the versioned system
  write(
    'packages/ui-scripts/package.json',
    JSON.stringify({ name: '@instructure/ui-scripts' })
  )

  _clearCache()
})

afterAll(() => {
  fs.rmSync(repoRoot, { recursive: true, force: true })
})

describe('resolveComponentVersions', () => {
  const resolve = (files: string[]) =>
    resolveComponentVersions(files, { repoRoot })

  it('maps a latest-version (v2) file to the latest published key', () => {
    expect(resolve(['packages/ui-buttons/src/Button/v2/index.tsx'])).toEqual([
      'v11.7'
    ])
  })

  it('maps a frozen-version (v1) file to the frozen published key', () => {
    expect(resolve(['packages/ui-buttons/src/Button/v1/props.ts'])).toEqual([
      'v11.6'
    ])
  })

  it('maps a shared folder re-exported by multiple letters to every version', () => {
    // utils/v1 is imported by both a.ts (v11.6) and b.ts (v11.7)
    expect(
      resolve(['packages/ui-form-field/src/utils/v1/makeStyles.ts'])
    ).toEqual(['v11.6', 'v11.7'])
  })

  it('maps a component present only in the frozen letter to just that version', () => {
    expect(
      resolve(['packages/ui-form-field/src/FormFieldLabel/v1/index.tsx'])
    ).toEqual(['v11.6'])
  })

  it('unions versions across multiple changed files and de-dupes', () => {
    expect(
      resolve([
        'packages/ui-buttons/src/Button/v2/index.tsx',
        'packages/ui-form-field/src/FormFieldLabel/v1/index.tsx',
        'packages/ui-form-field/src/utils/v1/makeStyles.ts'
      ])
    ).toEqual(['v11.6', 'v11.7'])
  })

  it('returns nothing for files outside a versioned component folder', () => {
    expect(
      resolve([
        'packages/ui-scripts/lib/commands/bump.ts',
        'packages/ui-buttons/src/exports/b.ts',
        'packages/ui-buttons/src/theme.ts',
        'scripts/component-versions/resolveComponentVersions.cjs'
      ])
    ).toEqual([])
  })

  it('ignores an unknown/non-existent package gracefully', () => {
    expect(
      resolve(['packages/ui-does-not-exist/src/Foo/v2/index.tsx'])
    ).toEqual([])
  })

  it('handles an empty / undefined file list', () => {
    expect(resolve([])).toEqual([])
    expect(
      resolveComponentVersions(undefined as unknown as string[], { repoRoot })
    ).toEqual([])
  })

  it('accepts backslash (Windows) separators', () => {
    expect(
      resolve(['packages\\ui-buttons\\src\\Button\\v2\\index.tsx'])
    ).toEqual(['v11.7'])
  })
})
