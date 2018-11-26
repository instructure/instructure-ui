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
import { expect, mount, stub, within } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import ProgressBar from '../index'

describe('<ProgressBar />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <ProgressBar
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )
    expect(subject.getDOMNode()).to.exist()
  })

  it('should provide elementRef', async () => {
    const elementRef = stub()
    const subject = await mount(
      <ProgressBar
        label="Loading completion"
        valueNow={40}
        valueMax={60}
        elementRef={elementRef}
      />
    )

    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    const subject = await mount(
      <ProgressBar
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        as="li"
      />
    )

    const progressBar = within(subject.getDOMNode())
    expect(await progressBar.find('li')).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <ProgressBar
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )

    const progressBar = within(subject.getDOMNode())
    expect(await progressBar.accessible({
      ignores: [
        'aria-allowed-role' // TODO: remove this when we fix the role
      ]
    })).to.be.true()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'div'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const props = {
              [prop]: 'foo'
            }
            const warning = `Warning: [ProgressBar] prop '${prop}' is not allowed.`
            await mount(
              <ProgressBar
                label="Loading completion"
                valueNow={40}
                valueMax={60}
                {...props}
              />
            )
            expect(consoleError)
              .to.be.calledWithExactly(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const props = { [prop]: allowedProps[prop] }
            await mount(
              <ProgressBar
                label="Loading completion"
                valueNow={40}
                valueMax={60}
                {...props}
              />
            )
            expect(consoleError).to.not.be.called()
          })
        }
    })
  })
})
