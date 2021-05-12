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
import { IconAdminLine } from '@instructure/ui-icons'

import { NavigationItem } from '../index'

import { NavigationItemLocator } from '../NavigationItemLocator'

describe('<NavigationItem />', async () => {
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <NavigationItem icon={<IconAdminLine />} label="Admin" href="#" />
    )
    const navItem = await NavigationItemLocator.find()
    expect(navItem).to.exist()
  })

  it('should show a tooltip when the nav is minimized ', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClick = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: 100 }}>
        <NavigationItem
          icon={<IconAdminLine />}
          label="Admin"
          onClick={onClick}
          minimized={true}
        />
      </div>
    )
    const item = await NavigationItemLocator.find()
    const button = await item.find('button')
    await button.focus()
    const tooltip = await item.findTooltipContent()
    expect(tooltip).to.exist()
  })

  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <NavigationItem icon={<IconAdminLine />} label="Dashboard" href="#" />
    )
    const navItem = await NavigationItemLocator.find()
    expect(await navItem.accessible()).to.be.true()
  })
})
