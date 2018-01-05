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
import SVGIcon from '../index'
import styles from '../styles.css'

describe('<SVGIcon />', () => {
  const testbed = new Testbed(<SVGIcon />)

  it('should render', () => {
    const subject = testbed.render({
      src: `<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`
    })

    expect(subject.containsMatchingElement(<path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" />))
  })

  it('should set rotate to 0 by default', () => {
    const subject = testbed.render()

    expect(subject.props().rotate).to.equal('0')
  })

  it('should allow rotate prop to be overridden', () => {
    const subject = testbed.render({
      rotate: '90'
    })

    expect(subject.props().rotate).to.equal('90')
  })

  it('should set custom width and height properly', () => {
    const subject = testbed.render({
      width: '2.75em',
      height: '3.8em'
    })

    expect(subject.props().width).to.equal('2.75em')
    expect(subject.props().height).to.equal('3.8em')
  })

  it('should set size', () => {
    const subject = testbed.render({
      size: 'large'
    })

    expect(subject.hasClass(styles['size--large'])).to.be.true
  })

  it('should prioritize deprecated width and height over size', () => {
    const subject = testbed.render({
      size: 'x-small',
      width: '200px',
      height: '200px'
    })

    const width = subject.getComputedStyle().getPropertyValue('width')
    expect(width).to.equal('200px')
    const height = subject.getComputedStyle().getPropertyValue('height')
    expect(height).to.equal('200px')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */
      ]
    })
  })
})
