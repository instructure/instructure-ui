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

import ToggleDetails from '../index'
import styles from '../styles.css'

const TOGGLE = 'button'
const CONTENT = '[id]'

describe('<ToggleDetails />', () => {
  const testbed = new Testbed(
    <ToggleDetails summary="Click me">Content</ToggleDetails>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('should hide its content', () => {
    const subject = testbed.render()

    expect(subject.text()).not.to.contain('Content')
  })

  it('should place the icon after the summary when prop is set', () => {
    const subject = testbed.render({
      iconPosition: 'end',
      summary: <span>Click me</span>
    })
    const summary = subject.find(`.${styles.summary}`)
    expect(summary.childAt(1).hasClass(styles.icon)).to.be.true()
  })

  it('should have an aria-controls attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)
    const content = subject.find(CONTENT)

    expect(toggle.getAttribute('aria-controls')).to
      .equal(content.getAttribute('id'))
  })

  it('should have an aria-expanded attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    toggle.simulate('click')

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should call onToggle on click events', () => {
    const onToggle = testbed.stub()
    const subject = testbed.render({ expanded: false, onToggle })

    subject.find(TOGGLE).simulate('click')

    expect(onToggle.firstCall.args[0].type).to.equal('click')
    expect(onToggle.firstCall.args[1]).to.eql(true)
  })

  it('should be initialized by defaultExpanded prop', () => {
    const subject = testbed.render({ defaultExpanded: true })
    const toggle = subject.find(TOGGLE)

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
    expect(subject.text()).to.contain('Content')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })

  it('focuses with the focus helper', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true()
  })
})
