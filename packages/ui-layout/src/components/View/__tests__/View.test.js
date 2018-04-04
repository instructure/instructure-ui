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
import View from '../index'

describe('<View />', () => {
  const testbed = new Testbed(
    <View>
      <h1>Hello!</h1>
    </View>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render children', () => {
    const subject = testbed.render()
    expect(subject.find('h1')).to.have.length(1)
  })

  it('should warn when as=span, display=auto, and margins are set', () => {
    const warning = testbed.spy(console, 'warn')

    testbed.render({
      as: 'span',
      display: 'auto',
      margin: 'small'
    })

    expect(
      warning.lastCall.args[0].includes(
        `element of type 'span' and display 'auto' is inline and will allow for horizontal margins only`
      )
    ).to.be.true
  })

  it('should set ltr by default', () => {
    const subject = testbed.render()
    testbed.tick()
    expect(subject.state('dir')).to.equal('ltr')
  })

  it('should set rtl when text direction is rtl', () => {
    testbed.setTextDirection('rtl')
    const subject = testbed.render()
    testbed.tick()
    expect(subject.state('dir')).to.equal('rtl')
  })

  it('should pass style attributes', () => {
    const subject = testbed.render({
      style: {
        position: 'absolute',
        left: '5px',
        top: '10rem'
      }
    })
    expect(subject.getDOMNode().style['position']).to.equal('absolute')
    expect(subject.getDOMNode().style['left']).to.equal('5px')
    expect(subject.getDOMNode().style['top']).to.equal('10rem')
  })

  it('should pass className', () => {
    const className = 'fooBarBaz'
    const subject = testbed.render({
      className
    })
    expect(subject.getDOMNode().classList.contains(className))
  })

  it('should provide an elementRef', () => {
    const elementRef = testbed.spy()
    const subject = testbed.render({
      elementRef
    })
    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
