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
import LayoutContent from '../index'
import styles from '../styles.css'

describe('<LayoutContent />', () => {
  const testbed = new Testbed(
    <LayoutContent label="LayoutContentTest">Hello World</LayoutContent>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should should not have a transition class if transition is set to false', (done) => {
    const subject = testbed.render({
      transition: false
    })

    expect(subject.hasClass(styles['transition'])).to.be.false

    subject.setProps({ transition: true }, () => {
      expect(subject.hasClass(styles['transition'])).to.be.true
      done()
    })
  })

  it('should should call the content ref', () => {
    const contentRef = testbed.spy()
    const subject = testbed.render({
      contentRef
    })

    expect(contentRef).to.have.been.calledWith(subject.ref('_content').node)
  })
})
