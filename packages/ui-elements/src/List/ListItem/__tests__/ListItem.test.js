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
import { expect, mount, stub, locator } from '@instructure/ui-test-utils'

import { View } from '@instructure/ui-layout'

import { ListItem } from '../index'

const ListItemLocator = locator(ListItem.selector)

describe('<ListItem />', async () => {
  it('should render children', async () => {
    await mount(<ListItem>hello</ListItem>)
    const listItem = await ListItemLocator.find()
    expect(await listItem.find(':contains(hello)')).to.exist()
  })

  it('should not render delimiter by default', async () => {
    await mount(<ListItem delimiter="none">List item</ListItem>)
    const listItem = await ListItemLocator.find()
    expect(await listItem.find('[aria-hidden="true"]', {
      expectEmpty: true
    })).to.not.exist()
  })

  it('should render delimiter', async () => {
    await mount(<ListItem delimiter="slash">List item</ListItem>)
    const listItem = await ListItemLocator.find()
    expect(await listItem.find('[aria-hidden="true"]')).to.exist()
  })

  it('should call elementRef', async () => {
    const elementRef = stub()
    await mount(<ListItem elementRef={elementRef}>List item</ListItem>)
    const listItem = await ListItemLocator.find()
    expect(elementRef).to.have.been.calledWith(listItem.getDOMNode())
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      padding: 'small',
      margin: '0 small',
      elementRef: () => {}
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const warning = `Warning: [ListItem] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }
            await mount(<ListItem {...props}>hello</ListItem>)
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const props = { [prop]: allowedProps[prop] }
            await mount(<ListItem {...props}>hello</ListItem>)
            expect(consoleError).to.not.be.called()
          })
        }
    })
  })
})
