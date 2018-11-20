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

import { expect, mount } from '@instructure/ui-test-utils'
import Breadcrumb, { BreadcrumbLink } from '../index'
import BreadcrumbLocator from '../locator'

describe('<Breadcrumb />', async () => {
  it('should render the label as an aria-label attribute', async () => {
    await mount(
      <Breadcrumb label="Settings">
        <BreadcrumbLink>Account</BreadcrumbLink>
      </Breadcrumb>
    )
    const breadcrumb = await BreadcrumbLocator.find()
    const label = await breadcrumb.find(':label(Settings)')

    expect(label.getAttribute('aria-label')).to.equal('Settings')
  })

  it('should render an icon as a separator', async () => {
    await mount(
      <Breadcrumb label="Settings">
        <BreadcrumbLink href="#">Account</BreadcrumbLink>
        <BreadcrumbLink>Settings</BreadcrumbLink>
      </Breadcrumb>
    )
    const breadcrumb = await BreadcrumbLocator.find()
    const icon = await breadcrumb.find('svg')

    expect(icon.getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Breadcrumb label="Settings">
        <BreadcrumbLink href="#">Account</BreadcrumbLink>
        <BreadcrumbLink>Settings</BreadcrumbLink>
      </Breadcrumb>
    )
    const breadcrumb = await BreadcrumbLocator.find()
    expect(await breadcrumb.accessible()).to.be.true()
  })
})
