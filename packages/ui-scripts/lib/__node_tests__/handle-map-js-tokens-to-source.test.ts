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
import { handleMapJSTokensToSource } from '../utils/handle-map-js-tokens-to-source.ts'

describe('handleMapJSTokensToSource', () => {
  it('wraps leaf primitive values in { value }', () => {
    const input = { colors: { primary: '#fff', secondary: '#000' } }
    expect(handleMapJSTokensToSource(input)).toEqual({
      colors: {
        primary: { value: '#fff' },
        secondary: { value: '#000' }
      }
    })
  })

  it('preserves nested groups recursively', () => {
    const input = {
      colors: {
        brand: { primary: '#fff', accent: '#0f0' },
        ui: { background: '#000' }
      }
    }
    expect(handleMapJSTokensToSource(input)).toEqual({
      colors: {
        brand: {
          primary: { value: '#fff' },
          accent: { value: '#0f0' }
        },
        ui: {
          background: { value: '#000' }
        }
      }
    })
  })

  it('excludes the "media" top-level key', () => {
    const input = {
      colors: { primary: '#fff' },
      media: { sm: 480 }
    }
    const result = handleMapJSTokensToSource(input)
    expect(result).toEqual({
      colors: { primary: { value: '#fff' } }
    })
    expect(result).not.toHaveProperty('media')
  })

  it('drops top-level non-object values', () => {
    const input = {
      version: '1.0.0',
      colors: { primary: '#fff' }
    }
    expect(handleMapJSTokensToSource(input)).toEqual({
      colors: { primary: { value: '#fff' } }
    })
  })

  it('returns empty object for empty input', () => {
    expect(handleMapJSTokensToSource({})).toEqual({})
  })

  it('keeps an empty group as an empty group', () => {
    expect(handleMapJSTokensToSource({ colors: {} })).toEqual({ colors: {} })
  })

  it('wraps numeric leaf values', () => {
    const input = { spacing: { sm: 8, md: 16 } }
    expect(handleMapJSTokensToSource(input)).toEqual({
      spacing: {
        sm: { value: 8 },
        md: { value: 16 }
      }
    })
  })

  it('treats arrays as leaf values (not as plain objects)', () => {
    const input = { gradients: { warm: ['#f00', '#ff0'] } }
    expect(handleMapJSTokensToSource(input)).toEqual({
      gradients: {
        warm: { value: ['#f00', '#ff0'] }
      }
    })
  })
})
