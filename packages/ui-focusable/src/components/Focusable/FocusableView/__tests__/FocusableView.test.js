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
import { expect, mount, spy, within, stub } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/View'
import FocusableView from '../index'

describe('<FocusableView />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <FocusableView>Focus Me!</FocusableView>
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('should provide an element ref', async () => {
    const elementRef = spy()

    const subject = await mount(
      <FocusableView elementRef={elementRef}>Focus Me!</FocusableView>
    )

    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })

  it('it should receive role button by default if onClick is provided and no role is specified', async () => {
    await mount(
      <FocusableView onClick={(e) => {}}>Focus Me!</FocusableView>
    )

    const focusableView = await find('[role="button"]')
    expect(focusableView).to.exist()
  })

  it('it should set a tabindex if onClick is provided and no role is specified', async () => {
    await mount(
      <FocusableView onClick={(e) => {}}>Focus Me!</FocusableView>
    )

    const focusableView = await find('[tabindex="0"]')
    expect(focusableView).to.exist()
  })

  it('it should render presentationally', async () => {
    const subject = await mount(
      <FocusableView as="span">Focus Me!</FocusableView>
    )

    expect(subject.getDOMNode().getAttribute('tabindex')).to.not.exist()
    expect(subject.getDOMNode().getAttribute('role')).to.not.exist()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      as: 'span',
      display: 'auto',
      cursor: 'auto',
      width: '100%',
      elementRef: () => {}
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const warning = `Warning: [FocusableView] prop '${prop}' is not allowed.`
            const consoleError = stub(console, 'error')
            const props = {
              [prop]: 'foo'
            }
            await mount(<FocusableView {...props}>Focus Me!</FocusableView>)
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(<FocusableView {...props}>Focus Me!</FocusableView>)
            expect(consoleError)
              .to.not.be.called()
          })
        }
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <FocusableView>Focus Me!</FocusableView>
    )
    const focusableView = within(subject.getDOMNode())

    expect(await focusableView.accessible()).to.be.true()
  })
})
