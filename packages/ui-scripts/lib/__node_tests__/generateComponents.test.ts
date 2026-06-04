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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockInstance } from 'vitest'
import generateComponent, {
  resolveReferences,
  generateComponentType
} from '../build/buildThemes/generateComponents.ts'

describe('resolveReferences', () => {
  it('wraps a plain string leaf in quotes and appends a comma-newline', () => {
    expect(resolveReferences({ color: '#fff' })).toEqual('color: "#fff",\n')
  })

  it('passes numeric values through without quotes', () => {
    expect(resolveReferences({ size: 8 })).toEqual('size: 8,\n')
  })

  it('rewrites a name-ending reference as a dotted path', () => {
    expect(resolveReferences({ primary: '{colors.brand.blue}' })).toEqual(
      'primary: colors.brand.blue,\n'
    )
  })

  it('rewrites a numeric-ending reference using bracket notation', () => {
    expect(resolveReferences({ primary: '{colors.blue.500}' })).toEqual(
      'primary: colors.blue[500],\n'
    )
  })

  it('serializes nested groups with brace-wrapped sub-objects', () => {
    const input = {
      brand: { primary: '#fff' },
      ui: { background: '#000' }
    }
    expect(resolveReferences(input)).toEqual(
      'brand: {primary: "#fff",\n},\nui: {background: "#000",\n}'
    )
  })

  describe('with an empty-string leaf', () => {
    let warnSpy: MockInstance

    beforeEach(() => {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      warnSpy.mockRestore()
    })

    it('defaults to 0 and emits a warning', () => {
      expect(resolveReferences({ width: '' })).toEqual('width: 0,\n')
      expect(warnSpy).toHaveBeenCalledOnce()
    })
  })
})

describe('generateComponentType', () => {
  it('maps a color-typed token to a string TS type', () => {
    const input = { color: { value: '#fff', type: 'color' } }
    expect(generateComponentType(input)).toEqual('{color: string\n}')
  })

  it('maps a number-typed token to a number TS type', () => {
    const input = { count: { value: 3, type: 'number' } }
    expect(generateComponentType(input)).toEqual('{count: number\n}')
  })

  it('maps a boolean-typed token to the true|false literal union', () => {
    const input = { flag: { value: true, type: 'boolean' } }
    expect(generateComponentType(input)).toEqual("{flag: 'true' | 'false'\n}")
  })

  it('maps a fontWeights-typed token to string | number', () => {
    const input = { weight: { value: 600, type: 'fontWeights' } }
    expect(generateComponentType(input)).toEqual('{weight: string | number\n}')
  })

  it('wraps nested groups in brace-wrapped sub-types', () => {
    const input = {
      group: {
        nested: { value: '#fff', type: 'color' }
      }
    }
    expect(generateComponentType(input)).toEqual(
      '{group: {nested: string\n}\n}'
    )
  })

  it('inlines token descriptions as JSDoc comments', () => {
    const input = {
      color: {
        value: '#fff',
        type: 'color',
        description: 'The primary color'
      }
    }
    expect(generateComponentType(input)).toEqual(
      '{/** The primary color */\ncolor: string\n}'
    )
  })

  it('throws on unknown token types', () => {
    const input = { x: { value: 'whatever', type: 'unknownType' } }
    expect(() => generateComponentType(input)).toThrow(/unknown token type/)
  })
})

describe('generateComponent (default export)', () => {
  it('formats and resolves a Tokens-Studio-style input end-to-end', () => {
    const input = {
      color: { value: '#fff', type: 'color' }
    }
    expect(generateComponent(input)).toEqual('color: "#fff",\n')
  })

  it('handles reference values end-to-end', () => {
    const input = {
      primary: { value: '{colors.brand.blue}', type: 'color' }
    }
    expect(generateComponent(input)).toEqual('primary: colors.brand.blue,\n')
  })
})
