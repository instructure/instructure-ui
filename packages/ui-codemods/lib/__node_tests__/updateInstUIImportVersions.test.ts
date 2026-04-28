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
    // Includes component names that are in versionedExports but come from other packages —
    // the codemod must check the package, not just the import name.
    const cases = [
      `import { something } from 'some-lib'`,
      `import { Button } from 'react-bootstrap'`,
      `import { Button } from '@mui/material'`,
      `import { Alert } from 'antd'`
    ]
    for (const source of cases) {
      const result = updateInstUIImportVersions(
        makeFileInfo(source),
        makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
        { versionTo: 'v11.7' }
      )
      expect(result, source).toBeNull()
    }
  })

  it('does not rewrite non-versioned components', () => {
    // 'withStyleNew' is not in versionedExports, so it should be skipped
    const result = updateInstUIImportVersions(
      makeFileInfo(`import { withStyleNew } from '@instructure/ui'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7' }
    )
    expect(result).toBeNull()
  })

  it('does not split mixed @instructure/ui import: moves all specifiers to versioned path', () => {
    // @instructure/ui version files re-export everything including non-component
    // symbols (e.g. canvas), so splitting is unnecessary — rewrite the whole import.
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(`import {canvas, Button} from "@instructure/ui"`),
      `import { canvas, Button } from '@instructure/ui/v11_7'`
    )
  })

  it('splits mixed import from an individual @instructure package: non-component stays, component moves', () => {
    // TestComponent is not in versionedExports, Button is → triggers a split
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(
        `import {TestComponent, Button} from "@instructure/ui-button"`
      ),
      // TestComponent is not in versionedExports, Button is → split
      `import { TestComponent } from '@instructure/ui-button'\nimport { Button } from '@instructure/ui-button/v11_7'`
    )
  })

  it('does not add semicolons to split imports when usePrettier=false and file has no semis', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', usePrettier: false },
      makeFileInfo(
        `import {TestComponent, Button} from '@instructure/ui-button'`
      ),
      `import { TestComponent } from '@instructure/ui-button'\nimport { Button } from '@instructure/ui-button/v11_7'`
    )
  })

  it('preserves semicolons in split imports when file uses semis and usePrettier=false', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', usePrettier: false },
      makeFileInfo(
        `import {TestComponent, Button} from '@instructure/ui-button';`
      ),
      `import { TestComponent } from '@instructure/ui-button';\nimport { Button } from '@instructure/ui-button/v11_7';`
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

  it('moves all specifiers to versioned path when source is @instructure/ui, even with --components filter', () => {
    // ButtonProps is not in the components filter, but @instructure/ui
    // version files re-export everything — no split, whole import moves.
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7', components: 'Button' },
      makeFileInfo(
        `import { Button, type ButtonProps } from '@instructure/ui'`
      ),
      `import { Button, type ButtonProps } from '@instructure/ui/v11_7'`
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

  it('rewrites all matching imports in a file with 10+ @instructure imports', () => {
    const input = [
      `import React from 'react'`,
      `import { Alert } from '@instructure/ui'`,
      `import { Avatar } from '@instructure/ui'`,
      `import { Badge } from '@instructure/ui'`,
      `import { Button } from '@instructure/ui'`,
      `import { Checkbox } from '@instructure/ui'`,
      `import { Flex, FlexItem } from '@instructure/ui'`,
      `import { Heading } from '@instructure/ui'`,
      `import { Modal, ModalBody, ModalFooter } from '@instructure/ui'`,
      `import { Select } from '@instructure/ui'`,
      `import { Spinner } from '@instructure/ui'`,
      `import { Text } from '@instructure/ui'`,
      `import { TextInput } from '@instructure/ui'`,
      `import type { SomeType } from 'some-lib'`
    ].join('\n')

    const expected = [
      `import React from 'react'`,
      `import { Alert } from '@instructure/ui/v11_7'`,
      `import { Avatar } from '@instructure/ui/v11_7'`,
      `import { Badge } from '@instructure/ui/v11_7'`,
      `import { Button } from '@instructure/ui/v11_7'`,
      `import { Checkbox } from '@instructure/ui/v11_7'`,
      `import { Flex, FlexItem } from '@instructure/ui/v11_7'`,
      `import { Heading } from '@instructure/ui/v11_7'`,
      `import { Modal, ModalBody, ModalFooter } from '@instructure/ui/v11_7'`,
      `import { Select } from '@instructure/ui/v11_7'`,
      `import { Spinner } from '@instructure/ui/v11_7'`,
      `import { Text } from '@instructure/ui/v11_7'`,
      `import { TextInput } from '@instructure/ui/v11_7'`,
      `import type { SomeType } from 'some-lib'`
    ].join('\n')

    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(input),
      expected
    )
  })

  it('rewrites named imports from individual @instructure packages', () => {
    runInlineTest(
      updateInstUIImportVersions,
      { versionTo: 'v11.7' },
      makeFileInfo(
        [
          `import { Button } from '@instructure/ui-button'`,
          `import { Alert } from '@instructure/ui-alerts'`,
          `import { Spinner } from '@instructure/ui-spinner'`
        ].join('\n')
      ),
      [
        `import { Button } from '@instructure/ui-button/v11_7'`,
        `import { Alert } from '@instructure/ui-alerts/v11_7'`,
        `import { Spinner } from '@instructure/ui-spinner/v11_7'`
      ].join('\n')
    )
  })

  it('does not rewrite default imports from @instructure packages', () => {
    const result = updateInstUIImportVersions(
      makeFileInfo(`import Button from '@instructure/ui-button'`),
      makeApi() as Parameters<typeof updateInstUIImportVersions>[1],
      { versionTo: 'v11.7' }
    )
    expect(result).toBeNull()
  })
})
