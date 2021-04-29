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

import { BreadcrumbLink } from '../index'
import { BreadcrumbLinkLocator } from '../BreadcrumbLinkLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<BreadcrumbLink />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a anchor tag when given an href prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink href="#">Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()
    const anchor = await link.find('a')

    expect(anchor.getAttribute('href')).to.equal('#')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render as a button and respond to onClick event', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClick = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink onClick={onClick}>Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()
    const button = await link.find('button')

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should allow to prop to pass through', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink to="/example">Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()
    expect(link.getAttribute('to')).to.equal('/example')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not render a link when not given an href prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink>Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()
    const tagName = link.getTagName()

    expect(tagName).to.not.equal('button')
    expect(tagName).to.not.equal('a')
    expect(tagName).to.equal('span')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not render a button when not given an onClick prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink>Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()
    const tagName = link.getTagName()

    expect(tagName).to.not.equal('button')
    expect(tagName).to.not.equal('a')
    expect(tagName).to.equal('span')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards as a link', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink href="#">Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()

    expect(await link.accessible()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards as a span', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<BreadcrumbLink>Test</BreadcrumbLink>)
    const link = await BreadcrumbLinkLocator.find()

    expect(await link.accessible()).to.be.true()
  })
})
