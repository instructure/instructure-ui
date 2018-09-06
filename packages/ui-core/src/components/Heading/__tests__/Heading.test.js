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
import View from '@instructure/ui-layout/lib/components/View'
import Heading from '../index'

describe('<Heading />', () => {
  const testbed = new Testbed(<Heading>Hello World</Heading>)

  it('should render as an H2 element', () => {
    const subject = testbed.render()

    expect(subject.tagName())
      .to.equal('H2')
  })

  it('should render the children as text content', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render as a SPAN if level is `reset`', () => {
    const subject = testbed.render({
      level: 'reset'
    })

    expect(subject.tagName())
      .to.equal('SPAN')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should render with the specified tag when `as` prop is set', () => {
    const subject = testbed.render({
      as: 'div'
    })

    expect(subject.tagName())
      .to.equal('DIV')
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'medium large small medium'
    })

    expect(subject.find(View).props().padding).to.not.exist()
  })
})
