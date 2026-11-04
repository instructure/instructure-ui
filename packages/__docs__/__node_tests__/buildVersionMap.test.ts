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

import { describe, it, expect } from 'vitest'
import { isDocIncludedInVersion } from '../buildScripts/utils/buildVersionMap.mts'
import type { VersionMap } from '../buildScripts/DataTypes.mts'

const versionMap: VersionMap = {
  libraryVersions: ['v11_6', 'v11_7'],
  defaultVersion: 'v11_6',
  mapping: {
    v11_6: {
      'ui-avatar': { exportLetter: 'a', componentDirVersions: { Avatar: 'v1' } }
    },
    v11_7: {
      'ui-avatar': {
        exportLetter: 'b',
        componentDirVersions: { Avatar: 'v2' }
      },
      'ui-card': { exportLetter: 'a', componentDirVersions: { Card: 'v1' } }
    }
  }
}

describe('isDocIncludedInVersion', () => {
  it('matches the component version mapped for the library version', () => {
    expect(
      isDocIncludedInVersion(versionMap, 'v11_6', 'v1', 'ui-avatar', 'Avatar')
    ).toBe(true)
    expect(
      isDocIncludedInVersion(versionMap, 'v11_7', 'v1', 'ui-avatar', 'Avatar')
    ).toBe(false)
  })

  it('excludes a package from library versions it is not exported in', () => {
    expect(
      isDocIncludedInVersion(versionMap, 'v11_6', 'v1', 'ui-card', 'Card')
    ).toBe(false)
    expect(
      isDocIncludedInVersion(versionMap, 'v11_7', 'v1', 'ui-card', 'Card')
    ).toBe(true)
  })

  it('includes v1 docs of packages without versioned exports everywhere', () => {
    for (const libVersion of versionMap.libraryVersions) {
      expect(
        isDocIncludedInVersion(
          versionMap,
          libVersion,
          'v1',
          'ui-motion',
          'Transition'
        )
      ).toBe(true)
    }
  })

  it('includes docs that have no component version', () => {
    expect(
      isDocIncludedInVersion(versionMap, 'v11_6', undefined, 'ui-card', 'Card')
    ).toBe(true)
  })
})
