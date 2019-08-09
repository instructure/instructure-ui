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
import { mount, expect, stub } from '@instructure/ui-test-utils'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { Item } from '../index'

import ItemLocator from '../locator'

const icon = (
  <svg height="24" width="24">
    <title>Some icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

describe('<AppNav.Item />', async () => {
  it('should render label text', async () => {
    await mount(
      <Item
        renderLabel="Some label"
        href='#'
      />
    )
    const item = await ItemLocator.find()
    expect(await item.find(':contains(Some label)')).to.exist()
  })

  it('should render an icon/image/etc.', async () => {
    await mount(
      <Item
        renderIcon={icon}
        renderLabel={<ScreenReaderContent>Some label</ScreenReaderContent>}
        href='#'
      />
    )
    const item = await ItemLocator.find()
    const renderedIcon = await item.find('svg:title(Some icon)')

    expect(renderedIcon).to.exist()
  })

  it('should render content after the label text to accommodate badges, etc.', async () => {
    await mount(
      <Item
        renderLabel="Some label"
        href='#'
        renderAfter={<strong>I am rendered after!</strong>}
      />
    )
    const item = await ItemLocator.find()
    expect(await item.find('strong:contains(I am rendered after!)')).to.exist()
  })

  it('should respond to an onClick event', async () => {
    const onClick = stub()
    await mount(
      <Item
        renderLabel="Some label"
        onClick={onClick}
      />
    )
    const item = await ItemLocator.find()

    const button = await item.find('button')
    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })

  it('should output a console error if icon is used with non-screenreader label text', async () => {
    const consoleError = stub(console, 'error')
    const warning = 'Warning: [AppNav] If an icon is used, the label text should be wrapped in <ScreenReaderContent />.'
    await mount(
      <Item
        renderIcon={icon}
        renderLabel="Some label"
        onClick={() => 'clicked'}
      />
    )
    expect(consoleError).to.be.calledWith(warning)
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Item
        renderIcon={icon}
        renderLabel={<ScreenReaderContent>Some label</ScreenReaderContent>}
        onClick={() => 'clicked'}
      />
    )
    const item = await ItemLocator.find()
    expect(await item.accessible()).to.be.true()
  })
})
