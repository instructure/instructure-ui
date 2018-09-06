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
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'
import Link from '../index'

describe('<Link />', () => {
  const testbed = new Testbed(<Link>Hello World</Link>)

  it('should render the children as text content', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render a button', () => {
    const subject = testbed.render()

    expect(subject.find('button[type="button"]'))
      .to.have.length(1)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('focuses with the focus helper', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true()
    expect(subject.find('button').focused()).to.be.true()
  })

  it('should call the onClick prop when clicked', () => {
    const onClick = testbed.stub()

    const subject = testbed.render({
      onClick
    })

    subject.find('button').simulate('click')

    expect(onClick).to.have.been.called()
  })

  it('should provide a linkRef prop', () => {
    const linkRef = testbed.stub()
    const subject = testbed.render({
      linkRef
    })

    expect(linkRef).to.have.been.calledWith(subject.find('button').unwrap())
  })

  it('should pass down an icon via the icon property', () => {
    const subject = testbed.render({
      icon: IconTrash
    })

    expect(subject.find('IconTrash').length).to.eql(1)
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

      expect(onClick).to.not.have.been.called()
    })
  })

  it('should render designated tag if `as` prop is specified', () => {
    const subject = testbed.render({
      as: 'span',
      onClick: testbed.stub()
    })

    expect(subject.tagName())
      .to.equal('SPAN')

    expect(subject.find('[role="button"]'))
      .to.have.length(1)

    expect(subject.find('[tabIndex="0"]'))
      .to.have.length(1)
  })

  describe('when an href is provided', () => {
    it('should render an anchor element', () => {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.find('a')).to.have.length(1)
    })

    it('should set the href attribute', () => {
      const subject = testbed.render({
        href: 'example.html'
      })

      expect(subject.find('[href="example.html"]'))
        .to.have.length(1)
    })
  })
  describe('when passing down props to View', () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      display: View.defaultProps.display
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: 'foo'
            })
            expect(subject.find(View).first().props()[prop]).to.not.exist()
          })
        } else {
          it(`should pass down the '${prop}' prop and set it to '${allowedProps[prop]}'`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).first().props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })
  })
})
