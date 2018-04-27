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
import IconX from '@instructure/ui-icons/lib/Solid/IconX'
import Tag from '../index'
import styles from '../styles.css'

describe('<Tag />', () => {
  const testbed = new Testbed(<Tag text="Summer" />)

  it('should display text', () => {
    const tag = testbed.render()
    const textSpan = tag.find(`span.${styles.text}`)
    expect(textSpan.text()).to.equal('Summer')
  })

  it('should render as a button and respond to onClick event', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick})
    tag.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should render a close icon when it is dismissible and clickable', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick, dismissible: true})
    const svg = tag.find(IconX)
    expect(svg.length).to.equal(1)
  })

describe('when passing down props to View', () => {
    const allowedProps = {
      margin: 'small',
      as: 'span'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: 'foo'
            })
            expect(subject.find(View).props()[prop]).to.not.exist
          })
        } else {
          it(`should allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })
    it(`should set the 'as' prop to 'div'`, () => {
      const subject = testbed.render({
        as: 'div'
      })

      expect(subject.instance().props.as).to.equal('div')
    })
    it(`should set the 'margin' prop to 'large'`, () => {
      const subject = testbed.render({
        margin: 'large'
      })
      expect(subject.instance().props.margin).to.equal('large')
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
