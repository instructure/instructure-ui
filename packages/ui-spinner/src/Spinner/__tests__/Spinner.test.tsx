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

import { View } from '@instructure/ui-view'

import { Spinner } from '../index'
import { SpinnerLocator } from '../SpinnerLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Spinner />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Spinner renderTitle="Loading" size="small" />)
    expect(await SpinnerLocator.find()).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render the title prop text in the SVG element title', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Spinner renderTitle="Loading" size="large" />)
    expect(await SpinnerLocator.find(':contains(Loading)')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Spinner renderTitle="Loading" size="small" />)
    const spinner = await SpinnerLocator.find()
    expect(await spinner.accessible()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render the contents of a component used in renderTitle', async () => {
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
    const Translation = ({ children }) => (
      <span>I have translated {children}.</span>
    )
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Spinner renderTitle={<Translation>Loading</Translation>} size="small" />
    )
    const spinner = await SpinnerLocator.find()
    expect(
      await SpinnerLocator.find(':contains(I have translated Loading)')
    ).to.exist()
    expect(await spinner.accessible()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'div'
    }

    Object.keys(View.propTypes)
      .filter(
        (prop) =>
          prop !== 'theme' &&
          prop !== 'children' &&
          prop !== 'styles' &&
          prop !== 'makeStyles'
      )
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it(`should NOT allow the '${prop}' prop`, async () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            const consoleError = stub(console, 'error')
            const props = {
              [prop]: 'foo'
            }
            const warning = `Warning: [Spinner] prop '${prop}' is not allowed.`
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            await mount(<Spinner renderTitle="Loading" {...props} />)
            expect(consoleError).to.be.calledWith(warning)
          })
        } else {
          // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it(`should allow the '${prop}' prop`, async () => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const props = { [prop]: allowedProps[prop] }
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            const consoleError = stub(console, 'error')
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            await mount(<Spinner renderTitle="Loading" {...props} />)
            expect(consoleError).to.not.be.called()
          })
        }
      })
  })
})
