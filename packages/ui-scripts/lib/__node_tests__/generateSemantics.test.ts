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
import generateSemantics, {
  resolveReferences,
  resolveTypeReferences,
  mergeSemanticSets,
  generateSemanticsType
} from '../build/buildThemes/generateSemantics.ts'

describe('resolveReferences', () => {
  it('quotes plain string leaf values', () => {
    expect(resolveReferences({ color: '#fff' })).toEqual('"color": "#fff",\n')
  })

  it('passes numeric values through without quotes', () => {
    expect(resolveReferences({ size: 8 })).toEqual('"size": 8,\n')
  })

  it('rewrites a name-ending reference as primitives.<path>', () => {
    expect(resolveReferences({ primary: '{colors.brand.blue}' })).toEqual(
      '"primary": primitives.colors.brand.blue,\n'
    )
  })

  it('rewrites a numeric-ending reference using bracket notation', () => {
    expect(resolveReferences({ primary: '{colors.blue.500}' })).toEqual(
      '"primary": primitives.colors.blue[500],\n'
    )
  })

  it('serializes nested groups with brace-wrapped sub-objects', () => {
    const input = {
      brand: { primary: '#fff' },
      ui: { background: '#000' }
    }
    expect(resolveReferences(input)).toEqual(
      '"brand": {"primary": "#fff",\n},\n"ui": {"background": "#000",\n}'
    )
  })
})

describe('resolveTypeReferences', () => {
  it('produces "string, " for string leaves', () => {
    expect(resolveTypeReferences({ color: '#fff' })).toEqual(
      '"color": string, '
    )
  })

  it('produces "number, " for numeric leaves', () => {
    expect(resolveTypeReferences({ size: 8 })).toEqual('"size": number, ')
  })

  it('rewrites a reference as Primitives[indexed]', () => {
    expect(resolveTypeReferences({ primary: '{colors.brand.blue}' })).toEqual(
      "\"primary\": Primitives['colors']['brand']['blue'], "
    )
  })

  it('wraps nested groups in brace-wrapped sub-types', () => {
    const input = {
      group: { nested: '#fff' }
    }
    expect(resolveTypeReferences(input)).toEqual(
      '"group": {"nested": string, }'
    )
  })
})

describe('mergeSemanticSets', () => {
  it('returns an empty object for an empty list', () => {
    expect(mergeSemanticSets([])).toEqual({})
  })

  it('returns the same shape for a single-set input', () => {
    const set = { colors: { primary: '#fff' } }
    expect(mergeSemanticSets([set])).toEqual(set)
  })

  it('deep-merges two semantic sets', () => {
    const a = { colors: { primary: '#fff' } }
    const b = { colors: { secondary: '#000' } }
    expect(mergeSemanticSets([a, b])).toEqual({
      colors: { primary: '#fff', secondary: '#000' }
    })
  })

  it('lets later sets override earlier ones for the same key', () => {
    const a = { colors: { primary: '#fff' } }
    const b = { colors: { primary: '#000' } }
    expect(mergeSemanticSets([a, b])).toEqual({
      colors: { primary: '#000' }
    })
  })
})

describe('generateSemanticsType', () => {
  it('wraps the inner type string in braces', () => {
    const input = {
      colors: { primary: { value: '#fff', type: 'color' } }
    }
    expect(generateSemanticsType(input)).toEqual(
      '{"colors": {"primary": string, }}'
    )
  })
})

describe('generateSemantics (default export)', () => {
  it('flattens Tokens-Studio leaves and resolves to a quoted output', () => {
    const input = {
      color: { value: '#fff', type: 'color' }
    }
    expect(generateSemantics(input)).toEqual('"color": "#fff",\n')
  })

  it('resolves reference values to primitives.<path>', () => {
    const input = {
      primary: { value: '{colors.brand.blue}', type: 'color' }
    }
    expect(generateSemantics(input)).toEqual(
      '"primary": primitives.colors.brand.blue,\n'
    )
  })
})
