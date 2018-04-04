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
import Container from '@instructure/ui-container/lib/components/Container'
import IconA11y from '@instructure/ui-icons/lib/Line/IconA11y'
import Billboard from '../index'

describe('<Billboard />', () => {
  const testbed = new Testbed(<Billboard />)

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render a heading with the correct tag', () => {
    const subject = testbed.render({
      heading: 'Test heading',
      headingAs: 'h2'
    })
    const headline = subject.find('h2')
    expect(headline.findText('Test heading').length).to.equal(1)
  })

  it('should use medium icon size if size is small', () => {
    const subject = testbed.render({
      size: 'small',
      hero: function (size) { // eslint-disable-line react/display-name
        return <IconA11y size={size} />
      }
    })
    expect(subject.find(IconA11y).props().size).to.equal('medium')
  })

  it('should use large icon size if size is medium', () => {
    const subject = testbed.render({
      size: 'medium',
      hero: function (size) { // eslint-disable-line react/display-name
        return <IconA11y size={size} />
      }
    })
    expect(subject.find(IconA11y).props().size).to.equal('large')
  })

  it('should use x-large icon size if size is large', () => {
    const subject = testbed.render({
      size: 'large',
      hero: function (size) { // eslint-disable-line react/display-name
        return <IconA11y size={size} />
      }
    })
    expect(subject.find(IconA11y).props().size).to.equal('x-large')
  })

  it('renders as a link if it has an href prop', () => {
    const subject = testbed.render({
      href: 'example.html',
      disabled: true
    })
    expect(subject.find('a')).to.have.length(1)
  })

  it('renders as a button and responds to onClick event', () => {
    const onClick = testbed.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'large medium small large'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  describe('when disabled', () => {
    it('should apply aria-disabled', () => {
      const subject = testbed.render({
        href: 'example.html',
        disabled: true
      })
      expect(subject.find('a[aria-disabled]')).to.have.length(1)
    })

    it('should not be clickable', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.find('button').simulate('click')

      expect(onClick).to.not.have.been.called
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
