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

import BreadcrumbLink from '../index'
import BreadcrumbLinkFixture from '../fixture'

describe('<BreadcrumbLink />', async () => {
  it('should render a link when given an href prop', async () => {
    await mount(
      <BreadcrumbLink href="#">Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find({ tag: 'a' })

    expect(link.getAttribute('href')).to.equal('#')
  })

  it('should render as a button and respond to onClick event', async () => {
    const onClick = stub()
    await mount(
      <BreadcrumbLink onClick={onClick}>Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find({ tag: 'button' })

    await link.click()

    expect(onClick).to.have.been.calledOnce()
  })

  it('should not render a link when not given an href prop', async () => {
    await mount(
      <BreadcrumbLink>Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find()
    const tagName = link.getTagName()

    expect(tagName).to.not.equal('button')
    expect(tagName).to.not.equal('a')
  })

  it('should not render a button when not given an onClick prop', async () => {
    await mount(
      <BreadcrumbLink>Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find()
    const tagName = link.getTagName()

    expect(tagName).to.not.equal('button')
    expect(tagName).to.not.equal('a')
  })

  it('should meet a11y standards as a link', async () => {
    await mount(
      <BreadcrumbLink href="#">Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find()

    expect(await link.accessible()).to.be.true()
  })

  it('should meet a11y standards as a span', async () => {
    await mount(
      <BreadcrumbLink>Test</BreadcrumbLink>
    )
    const link = await BreadcrumbLinkFixture.find()

    expect(await link.accessible()).to.be.true()
  })
})
