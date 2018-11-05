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

import { expect, spy } from '@instructure/ui-test-utils'
import getShorthandPropValue from '../getShorthandPropValue'

const theme = {
  small: '0rem',
  borderXSmall: '0.1rem',
  borderMedium: '0.2rem',
  borderLarge: '0.3rem',
  borderXLarge: '0.4rem',
  marginXSmall: '1.1rem',
  marginMedium: '1.2rem',
  marginLarge: '1.3rem',
  marginXLarge: '1.4rem',
  paddingXSmall: '2.1rem',
  paddingMedium: '2.2rem',
  paddingLarge: '2.3rem',
  paddingXLarge: '2.4rem'
}

const name = 'TestComponent'

describe('getShorthandPropValue', () => {
  it('converts 1 value syntax', () => {
    const value = 'x-small'
    const borderResult = getShorthandPropValue(name, theme, value, 'border')
    const marginResult = getShorthandPropValue(name, theme, value, 'margin')
    const paddingResult = getShorthandPropValue(name, theme, value, 'padding')

    expect(borderResult).to.equal('0.1rem')
    expect(marginResult).to.equal('1.1rem')
    expect(paddingResult).to.equal('2.1rem')
  })

  it('converts 2 value syntax', () => {
    const values = 'large x-large'
    const borderResult = getShorthandPropValue(name, theme, values, 'border')
    const marginResult = getShorthandPropValue(name, theme, values, 'margin')
    const paddingResult = getShorthandPropValue(name, theme, values, 'padding')

    expect(borderResult).to.equal('0.3rem 0.4rem')
    expect(marginResult).to.equal('1.3rem 1.4rem')
    expect(paddingResult).to.equal('2.3rem 2.4rem')
  })

  it('converts 3 value syntax', () => {
    const values = 'medium x-small x-large'
    const borderResult = getShorthandPropValue(name, theme, values, 'border')
    const marginResult = getShorthandPropValue(name, theme, values, 'margin')
    const paddingResult = getShorthandPropValue(name, theme, values, 'padding')

    expect(borderResult).to.equal('0.2rem 0.1rem 0.4rem')
    expect(marginResult).to.equal('1.2rem 1.1rem 1.4rem')
    expect(paddingResult).to.equal('2.2rem 2.1rem 2.4rem')
  })

  it('converts 4 value syntax', () => {
    const values = 'x-large medium x-small large'
    const borderResult = getShorthandPropValue(name, theme, values, 'border')
    const marginResult = getShorthandPropValue(name, theme, values, 'margin')
    const paddingResult = getShorthandPropValue(name, theme, values, 'padding')

    expect(borderResult).to.equal('0.4rem 0.2rem 0.1rem 0.3rem')
    expect(marginResult).to.equal('1.4rem 1.2rem 1.1rem 1.3rem')
    expect(paddingResult).to.equal('2.4rem 2.2rem 2.1rem 2.3rem')
  })

  it('returns 0 for none or 0, and returns auto if auto is supplied', () => {
    const values = '0 none auto large'
    const result = getShorthandPropValue(name, theme, values, 'border')
    expect(result).to.equal('0 0 auto 0.3rem')
  })

  it('warns if the theme value does not exist', () => {
    const warning = spy(console, 'warn')

    const value = 'x-small'
    getShorthandPropValue(name, theme, value, 'borderRadius')
    expect(
      warning.lastCall.args[0].includes(
        `[%s] %s is an invalid %s value.`
      )
    ).to.be.true()
  })
})
