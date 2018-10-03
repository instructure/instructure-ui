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
import { mount, expect } from '@instructure/ui-test-utils'
import IconAdmin from '@instructure/ui-icons/lib/Line/IconAdmin'

import NavigationItem from '../index'
import NavigationItemLocator from '../locator'

describe('<NavigationItem />', async () => {
  it('should render', async () => {
    await mount(
      <NavigationItem
        icon={<IconAdmin />}
        label='Admin'
        href='#'
      />
    )
    const navItem = await NavigationItemLocator.find()
    expect(navItem).to.exist()
  })

  it('should have an aria attribute for the tooltip label when the nav is minimized ', async () => {
    await mount(
      <NavigationItem
        icon={<IconAdmin />}
        label="Admin"
        onClick={() => { this.loadSubNav('account') }}
        minimized={true}
      />
    )
    const item = await NavigationItemLocator.find({ focusable: true })
    expect(item.getAttribute('aria-controls')).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(
      <NavigationItem
        icon={<IconAdmin />}
        label="Dashboard"
        href="#"
      />
    )
    const navItem = await NavigationItemLocator.find()
    expect(await navItem.accessible()).to.be.true()
  })
})
