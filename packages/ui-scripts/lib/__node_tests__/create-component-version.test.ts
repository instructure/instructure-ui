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
import { fuzzyMatch } from '../commands/create-component-version.ts'

const components = [
  { label: '', dir: '', pkg: 'ui-buttons', name: 'Button', versions: ['v1'] },
  { label: '', dir: '', pkg: 'ui-text', name: 'Text', versions: ['v1'] },
  { label: '', dir: '', pkg: 'ui-tabs', name: 'Tabs', versions: ['v1', 'v2'] },
  {
    label: '',
    dir: '',
    pkg: 'ui-buttons',
    name: 'IconButton',
    versions: ['v1']
  }
]

describe('fuzzyMatch', () => {
  it('matches when the query is a substring of pkg or name', () => {
    expect(
      fuzzyMatch(components, 'button')
        .map((c) => c.name)
        .sort()
    ).toEqual(['Button', 'IconButton'])
  })

  it('matches characters in order even when they are not contiguous', () => {
    const matches = fuzzyMatch(components, 'utt').map((c) => c.name)
    expect(matches).toContain('Button')
  })

  it('is case-insensitive', () => {
    expect(
      fuzzyMatch(components, 'BUTTON')
        .map((c) => c.name)
        .sort()
    ).toEqual(['Button', 'IconButton'])
  })

  it('returns an empty array when no component matches', () => {
    expect(fuzzyMatch(components, 'xyz')).toEqual([])
  })

  it('returns every component for an empty query string', () => {
    expect(fuzzyMatch(components, '')).toHaveLength(components.length)
  })

  it('considers both pkg and name when scoring (ordered chars)', () => {
    const matches = fuzzyMatch(components, 'tabt').map((c) => c.name)
    expect(matches).toContain('Tabs')
  })
})
