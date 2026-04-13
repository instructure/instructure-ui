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

/// <reference types="vitest/globals" />
// eslint-disable-next-line no-restricted-imports
import { runInlineTest } from 'jscodeshift/src/testUtils'
import jscodeshift from 'jscodeshift'
import updateInstUIImportVersions from '../updateInstUIImportVersions'

const FILE_PATH = 'test.tsx'

function makeApi(reportFn: (msg: string) => void = () => {}) {
  const j = jscodeshift.withParser('tsx')
  return {
    jscodeshift: j,
    j,
    stats: () => {},
    report: reportFn
  }
}

function makeFileInfo(source: string) {
  return { path: FILE_PATH, source }
}

describe('updateInstUIImportVersions', () => {
  it('rewrites unversioned @instructure import to target version', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(`import { Button } from '@instructure/ui'`),
      `import { Button } from '@instructure/ui/v11_7'`
    )
  })

  it('rewrites versioned import from versionFrom to versionTo', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', versionFrom: 'v11.6' },
      makeFileInfo(`import { Button } from '@instructure/ui/v11_6'`),
      `import { Button } from '@instructure/ui/v11_7'`
    )
  })

  it('returns null when versionFrom does not match', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { Button } from '@instructure/ui/v11_5'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7', versionFrom: 'v11.6' }
    )
    expect(result).toBeNull()
  })

  it('rewrites only imports containing the specified component', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', components: 'Button' },
      makeFileInfo(
        [
          `import { Button } from '@instructure/ui'`,
          `import { Alert } from '@instructure/ui-alerts'`
        ].join('\n')
      ),
      // Only the import that contains 'Button' is rewritten
      [
        `import { Button } from '@instructure/ui/v11_7'`,
        `import { Alert } from '@instructure/ui-alerts'`
      ].join('\n')
    )
  })

  it('returns null when no imports match the specified component', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { Alert } from '@instructure/ui'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7', components: 'Button' }
    )
    expect(result).toBeNull()
  })

  it('returns null for non-@instructure imports', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { something } from 'some-lib'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7' }
    )
    expect(result).toBeNull()
  })

  it('does not rewrite non-component symbols when no --components given', () => {
    // 'withStyle' is not in versionedExports, so it should be skipped
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { withStyle } from '@instructure/ui'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7' }
    )
    expect(result).toBeNull()
  })

  it('splits mixed import: non-component stays at original path, component moves to versioned path', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(`import {canvas, Button} from "@instructure/ui"`),
      // canvas is not in versionedExports, Button is → split into two imports
      // (Prettier normalises to single quotes and adds spaces inside braces)
      `import { canvas } from '@instructure/ui'\nimport { Button } from '@instructure/ui/v11_7'`
    )
  })

  it('does not add semicolons to split imports when usePrettier=false and file has no semis', () => {
    // canvas is not in versionedExports (utility), Button is → triggers a split
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', usePrettier: false },
      makeFileInfo(`import {canvas, Button} from '@instructure/ui'`),
      `import { canvas } from '@instructure/ui'\nimport { Button } from '@instructure/ui/v11_7'`
    )
  })

  it('preserves semicolons in split imports when file uses semis and usePrettier=false', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', usePrettier: false },
      makeFileInfo(`import {canvas, Button} from '@instructure/ui';`),
      `import { canvas } from '@instructure/ui';\nimport { Button } from '@instructure/ui/v11_7';`
    )
  })

  it('moves type specifier to versioned path when its name is a known component', () => {
    // 'type Alert' — inline type modifier, Alert is in versionedExports
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', components: 'Button,Alert' },
      makeFileInfo(`import { Button, type Alert } from '@instructure/ui'`),
      `import { Button, type Alert } from '@instructure/ui/v11_7'`
    )
  })

  it('keeps type-only specifier at original path when name is not in components', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', components: 'Button' },
      makeFileInfo(
        `import { Button, type ButtonProps } from '@instructure/ui'`
      ),
      // ButtonProps not in components list → split
      `import { type ButtonProps } from '@instructure/ui'\nimport { Button } from '@instructure/ui/v11_7'`
    )
  })

  it('leaves default imports and type-only named imports untouched when not in components', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import Service, { type Config } from '@instructure/ui'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7' }
    )
    // Neither 'Service' (default) nor 'Config' (type, not in versionedExports) match
    expect(result).toBeNull()
  })

  it('returns null when versionTo is not provided', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { Button } from '@instructure/ui'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      {}
    )
    expect(result).toBeNull()
  })

  it('diagnose mode reports matching imports', () => {
    const reported: string[] = []
    const api = makeApi((msg: string) => reported.push(msg))

    updateInstUIImportVersions(
      makeFileInfo(`import { Button, Alert } from '@instructure/ui/v11_6'`),
      api as Parameters<typeof updateInstUIImportVersions>[1],
      { diagnose: true }
    )

    expect(reported).toHaveLength(1)
    expect(reported[0]).toContain('Button')
    expect(reported[0]).toContain('Alert')
    expect(reported[0]).toContain('v11_6')
  })

  it('diagnose mode filters by component name', () => {
    const reported: string[] = []
    const api = makeApi((msg: string) => reported.push(msg))

    updateInstUIImportVersions(
      makeFileInfo(`import { Button, Alert } from '@instructure/ui/v11_6'`),
      api as Parameters<typeof updateInstUIImportVersions>[1],
      { diagnose: true, components: 'Button' }
    )

    expect(reported).toHaveLength(1)
    expect(reported[0]).toContain('Button')
    expect(reported[0]).not.toContain('Alert')
  })

  it('diagnose mode shows "oldest" label for unversioned imports', () => {
    const reported: string[] = []
    const api = makeApi((msg: string) => reported.push(msg))

    updateInstUIImportVersions(
      makeFileInfo(`import { Button } from '@instructure/ui'`),
      api as Parameters<typeof updateInstUIImportVersions>[1],
      { diagnose: true }
    )

    expect(reported).toHaveLength(1)
    expect(reported[0]).toContain('oldest')
  })
})
