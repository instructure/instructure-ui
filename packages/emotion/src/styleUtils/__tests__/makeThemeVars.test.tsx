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

import { expect } from 'vitest'
import { makeThemeVars } from '../makeThemeVars'

describe('makeThemeVars', () => {
  it('given a list of variables, should append a prefix and camel case each key', () => {
    const vars = {
      xSmall: 'foo',
      medium: 'bar',
      xxLarge: 'baz'
    }

    const result = makeThemeVars('margin', vars)
    // @ts-expect-error we expect it to throw error
    expect(result['xSmall']).toBeUndefined()
    // @ts-expect-error we expect it to throw error
    expect(result['medium']).toBeUndefined()
    // @ts-expect-error we expect it to throw error
    expect(result['xxLarge']).toBeUndefined()

    expect(result['marginXSmall']).toEqual('foo')
    expect(result['marginMedium']).toEqual('bar')
    expect(result['marginXxLarge']).toEqual('baz')
  })
})
