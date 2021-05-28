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

import { List } from '../index'
import { ListLocator } from '../ListLocator'

describe('<List />', async () => {
  it('should render list items and filter out null/falsy children', async () => {
    await mount(
      <List>
        <List.Item>List item 1</List.Item>
        <List.Item>List item 2</List.Item>
        <List.Item>List item 3</List.Item>
        <List.Item>List item 4</List.Item>
        {null && <List.Item>ignore me 1</List.Item>}
        {false && <List.Item>ignore me 2</List.Item>}
      </List>
    )

    const list = await ListLocator.find()
    const listitems = await list.findAllItems()
    expect(listitems.length).to.equal(4)
  })

  it('should warn when itemSpacing is set when delimiter is set to anything other than none', async () => {
    const consoleError = stub(console, 'error')
    const warning = `Warning: [List] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`
    await mount(
      <List delimiter="dashed" itemSpacing="large">
        <List.Item>List item 1</List.Item>
        <List.Item>List item 2</List.Item>
        <List.Item>List item 3</List.Item>
        <List.Item>List item 4</List.Item>
      </List>
    )

    expect(consoleError).to.be.calledWith(warning)
  })

  it('should render an ordered list', async () => {
    await mount(
      <List as="ol">
        <List.Item>List item 1</List.Item>
        <List.Item>List item 2</List.Item>
        <List.Item>List item 3</List.Item>
        <List.Item>List item 4</List.Item>
      </List>
    )
    const list = await ListLocator.find()
    expect(list.getTagName()).to.equal('ol')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <List>
        <List.Item>List item 1</List.Item>
        <List.Item>List item 2</List.Item>
        <List.Item>List item 3</List.Item>
        <List.Item>List item 4</List.Item>
      </List>
    )

    const list = await ListLocator.find()
    expect(await list.accessible()).to.be.true()
  })
})
