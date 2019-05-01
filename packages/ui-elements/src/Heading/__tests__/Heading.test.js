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

import { Heading } from '../index'
import HeadingLocator from '../locator'

describe('<Heading />', () => {
  it('should render as an H2 element', async () => {
    await mount(<Heading>Hello World</Heading>)
    expect(await HeadingLocator.find('h2')).to.exist()
  })

  it('should render the children as text content', async () => {
    await mount(<Heading>Hello World</Heading>)
    expect(await HeadingLocator.find(':contains(Hello World)')).to.exist()
  })

  it('should render as a SPAN if level is `reset`', async () => {
    await mount(<Heading level="reset">Hello World</Heading>)
    const heading = await HeadingLocator.find()
    expect(heading.getTagName()).to.equal('span')
  })

  it('should meet a11y standards', async () => {
    await mount(<Heading>Hello World</Heading>)
    const heading = await HeadingLocator.find()
    expect(await heading.accessible()).to.be.true()
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    await mount(<Heading as="div">Hello World</Heading>)
    const heading = await HeadingLocator.find()
    expect(heading.getTagName()).to.equal('div')
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
            const consoleError = stub(console,'error')
            const warning = `Warning: [Heading] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }
            await mount(<Heading {...props}>Hello World</Heading>)
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console,'error')
            await mount(<Heading {...props}>Hello World</Heading>)
            expect(consoleError)
              .to.not.be.called()
          })
        }
    })
  })
})
