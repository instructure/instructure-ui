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

import ListItem from '../index'

describe('<ListItem />', () => {
  const testbed = new Testbed(<ListItem>List item</ListItem>)

  describe('when passing down props to View', () => {
    const allowedProps = {
      padding: 'small',
      margin: 'small',
      as: 'li',
      display: View.defaultProps.display,
      elementRef: () => {}
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

    it(`should not allow overriding the 'as' prop`, () => {
      const subject = testbed.render({
        as: 'div'
      })
      expect(subject.find(View).first().props().as).to.equal('li')
    })
  })
})
