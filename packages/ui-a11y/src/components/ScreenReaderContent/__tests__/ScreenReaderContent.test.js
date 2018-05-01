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

import React from 'react'
import ScreenReaderContent from '../index'

describe('<ScreenReaderContent />', () => {
  const testbed = new Testbed(<ScreenReaderContent />)

  it('should render the specified tag when `as` prop is set', () => {
    const subject = testbed.render({as: 'div'})

    expect(subject.tagName())
      .to.equal('DIV')
  })

  it('accepts props like normal', () => {
    const subject = testbed.render({hidden: 'true'})
    expect(subject.prop('hidden')).to.equal('true')
  })

  it('renders children components', () => {
    const childComponent = React.createElement('span')
    const subject = testbed.render({children: childComponent})
    expect(subject.find('span').length).to.equal(2)
  })

  it('is accessible by screen readers', () => {
    const subject = testbed.render()
    const height = subject.getComputedStyle().getPropertyValue('height')
    const opacity = subject.getComputedStyle().getPropertyValue('opacity')

    expect(height).to.not.equal(0 || undefined) // eslint-disable-line no-undefined
    expect(opacity).to.not.equal(0 || undefined) // eslint-disable-line no-undefined
  })
})
