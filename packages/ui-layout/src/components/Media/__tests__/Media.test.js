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
import View from '../../View'
import Media from '../index'

describe('<Media />', () => {
  // eslint-disable-next-line max-len
  const image = <img alt="" src="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw==" />


  const testbed = new Testbed(
    <Media
      title="Hello World"
      description="Test Image"
    >
      {image}
    </Media>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [ ]
    })
  })

  describe('when passing down props to View', () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'figure',
      display: 'auto'
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
          it(`should allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).first().props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })

    it(`should pass 'figure' for the 'as' prop`, () => {
      const subject = testbed.render({
        as: 'foo'
      })
      expect(subject.find(View).first().props().as).to.equal('figure')
    })
  })
})
