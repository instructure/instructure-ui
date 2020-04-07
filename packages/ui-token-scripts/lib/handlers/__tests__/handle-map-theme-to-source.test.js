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

import { expect } from '@instructure/ui-test-utils'
import handleMapThemeToSource from '../handle-map-theme-to-source'

const values = {
  brand: '#333333',
}

const text = {
  textBrand: values.brand,
}

const colors = {
  ...values,
  ...text,
  values,
  text
}

const spacing = {
  medium: '1.5rem'
}

const media = {
  mediumMin: 'min-width: 48rem'
}

const theme = {
  variables: {
    colors,
    spacing,
    media,
    'ic-brand-primary': colors.textBrand
  }
}

describe('handleMapThemeToSource', () => {
  const mappedSource = handleMapThemeToSource(theme)

  it('does not transform root level values', () => {
    expect(mappedSource).to.not.have.property('ic-brand-primary')
  })

  it('transforms root level objects', () => {
    expect(mappedSource.spacing).to.deep.equal({ medium: { value: '1.5rem' }})
  })

  it('transforms nested object values', () => {
    expect(mappedSource.colors).to.deep.include({
      brand: { value: '#333333' }
    })

    expect(mappedSource.colors).to.deep.include({
      textBrand: { value: '#333333' }
    })
  })

  it('does not transform properties of type object in nested objects', () => {
    expect(mappedSource.colors).to.not.have.property('values')
  })

  it('does not transform the "media" convenience variables', () => {
    expect(mappedSource).to.not.have.property('media')
  })
})
