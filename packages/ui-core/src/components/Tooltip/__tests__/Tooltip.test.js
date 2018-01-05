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
import Tooltip from '../index'
import Heading from '../../Heading'
import Link from '../../Link'

describe('<Tooltip />', () => {
  describe('using as', () => {
    const testbed = new Testbed(
      <Tooltip tip={<Heading>Hello</Heading>} placement="end" as={Link} href="example.html">
        Hover or focus me
      </Tooltip>
    )

    it('should render', () => {
      const subject = testbed.render()

      expect(subject).to.be.present
    })

    it('should render the children', () => {
      const subject = testbed.render()

      expect(subject.find('a').length).to.be.equal(1)
    })

    it('should have an aria-describedby attribute', () => {
      const subject = testbed.render()
      const attr = subject.find('a').getAttribute('aria-describedby')

      expect(attr).to.exist
    })

    it('should have an aria-controls attribute', () => {
      const subject = testbed.render()
      const attr = subject.find('a').getAttribute('aria-controls')

      expect(attr).to.exist
    })

    it('should pass down the href attribute', () => {
      const subject = testbed.render()
      const attr = subject.find('a').getAttribute('href')

      expect(attr).to.equal('example.html')
    })

    describe('for a11y', () => {
      it('should meet standards', (done) => {
        const subject = testbed.render()

        subject.should.be.accessible(done, {
          ignores: [
            'color-contrast' // brand color doesn't meet 4.5:1 contrast req
          ]
        })
      })
    })
  })

  describe('using children', () => {
    const testbed = new Testbed(
      <Tooltip tip={<Heading>Hello</Heading>} children={<span />} /> // eslint-disable-line react/no-children-prop
    )

    it('should call onClick of child', () => {
      const onClick = testbed.spy()
      const subject = testbed.render({
        children: (
          <button onClick={onClick}>
            Hover or focus me
          </button>
        )
      })

      subject.find('button').click()

      onClick.should.have.been.calledOnce
    })
  })
})
