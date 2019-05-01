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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import { View } from '@instructure/ui-layout'

import { Spinner } from '../index'
import SpinnerLocator from '../locator'

describe('<Spinner />', async () => {
  it('should render', async () => {
    await mount(<Spinner title="Loading" size="small" />)
    expect(await SpinnerLocator.find()).to.exist()
  })

  it('should render the title prop text in the SVG element title', async () => {
    await mount(<Spinner title="Loading" size="large" />)
    expect(await SpinnerLocator.find(':contains(Loading)')).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(<Spinner title="Loading" size="small" />)
    const spinner = await SpinnerLocator.find()
    expect(await spinner.accessible()).to.be.true()
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
            const warning = `Warning: [Spinner] prop '${prop}' is not allowed.`
            await mount(<Spinner title="Loading" {...props} />)
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(<Spinner title="Loading" {...props} />)
            expect(consoleError)
              .to.not.be.called()
          })
        }
    })
  })
})
