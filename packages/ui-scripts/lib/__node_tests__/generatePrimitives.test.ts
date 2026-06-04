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
import {
  generatePrimitives,
  generateType
} from '../build/buildThemes/generatePrimitives.ts'

describe('generatePrimitives', () => {
  it('flattens a single leaf token to its value', () => {
    const input = { primary: { value: '#fff', type: 'color' } }
    expect(generatePrimitives(input)).toEqual({ primary: '#fff' })
  })

  it('parses numeric-looking values into numbers', () => {
    const input = { sm: { value: '8', type: 'dimension' } }
    expect(generatePrimitives(input)).toEqual({ sm: 8 })
  })

  it('recurses into nested groups', () => {
    const input = {
      colors: {
        brand: {
          primary: { value: '#fff', type: 'color' },
          accent: { value: '#0f0', type: 'color' }
        }
      }
    }
    expect(generatePrimitives(input)).toEqual({
      colors: {
        brand: {
          primary: '#fff',
          accent: '#0f0'
        }
      }
    })
  })

  it('returns an empty object for empty input', () => {
    expect(generatePrimitives({})).toEqual({})
  })

  it('handles a mix of string and numeric tokens', () => {
    const input = {
      colors: { primary: { value: '#fff', type: 'color' } },
      spacing: { sm: { value: '4', type: 'dimension' } }
    }
    expect(generatePrimitives(input)).toEqual({
      colors: { primary: '#fff' },
      spacing: { sm: 4 }
    })
  })
})

describe('generateType', () => {
  it('produces a string TS type for a string leaf token', () => {
    expect(generateType({ primary: '#fff' })).toEqual('{primary: string, }')
  })

  it('produces a number TS type for numeric-looking values', () => {
    expect(generateType({ sm: '8' })).toEqual('{sm: number, }')
  })

  it('wraps nested groups in nested braces', () => {
    expect(generateType({ colors: { primary: '#fff' } })).toEqual(
      '{colors: {primary: string, }}'
    )
  })

  it('serializes multiple sibling keys', () => {
    expect(generateType({ primary: '#fff', accent: '#0f0' })).toEqual(
      '{primary: string, accent: string, }'
    )
  })
})
