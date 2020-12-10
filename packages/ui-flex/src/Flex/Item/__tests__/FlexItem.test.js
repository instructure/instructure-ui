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

import { expect, mount, within, wait, stub } from '@instructure/ui-test-utils'
import { Item } from '../index'

describe('<Item />', async () => {
  it('should render children', async () => {
    const subject = await mount(<Item>Flex item 1</Item>)
    const item = within(subject.getDOMNode())
    expect(item.find(':contains(Flex item 1)')).to.exist()
  })

  it('should support an elementRef prop', async () => {
    const elementRef = stub()
    const subject = await mount(
      <Item elementRef={elementRef}>Flex item 2</Item>
    )

    await wait(() => {
      expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<Item>Flex item 3</Item>)

    const item = within(subject.getDOMNode())

    expect(await item.accessible()).to.be.true()
  })
})
