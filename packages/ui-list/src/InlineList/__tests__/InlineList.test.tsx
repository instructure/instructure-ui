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

import { InlineList } from '../index'
import { InlineListLocator } from '../InlineListLocator'

describe('<InlineList />', async () => {
  it('should render list items and filter out null/falsy children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineList>
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
        {null && <InlineList.Item>ignore me 1</InlineList.Item>}
        {false && <InlineList.Item>ignore me 2</InlineList.Item>}
      </InlineList>
    )

    const list = await InlineListLocator.find()
    const listItems = await list.findAllItems()
    expect(listItems.length).to.equal(4)
  })

  it('should render a delimiter when delimiter="pipe"', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineList delimiter="pipe">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )

    const list = await InlineListLocator.find()
    const delimiters = await list.findAll('[aria-hidden="true"]')
    expect(delimiters.length).to.equal(4)
  })

  it('should warn when itemSpacing is set when delimiter is set to anything other than none', async () => {
    const consoleError = stub(console, 'error')
    const warning = `Warning: [InlineList] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineList delimiter="pipe" itemSpacing="large">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )

    expect(consoleError).to.be.calledWith(warning)
  })

  it('should render an ordered list', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineList as="ol">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )
    const list = await InlineListLocator.find()
    expect(list.getTagName()).to.equal('ol')
  })

  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineList>
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )

    const list = await InlineListLocator.find()
    expect(await list.accessible()).to.be.true()
  })
})
