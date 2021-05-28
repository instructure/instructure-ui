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

import { expect, mount, stub, locator, wait } from '@instructure/ui-test-utils'

import { PaginationButton } from '../index'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
const PaginationButtonLocator = locator(PaginationButton.selector)

describe('<PaginationButton />', async () => {
  it('should designate current page', async () => {
    await mount(<PaginationButton current>1</PaginationButton>)
    const button = await PaginationButtonLocator.find(':label(1)')
    expect(button.getAttribute('aria-current')).to.equal('page')
  })

  it('should navigate using button when onClick provided', async () => {
    const onClick = stub()
    await mount(<PaginationButton onClick={onClick}>1</PaginationButton>)
    const button = await PaginationButtonLocator.find(':label(1)')
    await button.click()
    expect(onClick).to.have.been.called()
  })

  it('should disable navigation to current page', async () => {
    const onClick = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <PaginationButton onClick={onClick} current>
        1
      </PaginationButton>
    )
    const button = await PaginationButtonLocator.find(':label(1)')
    await button.click()

    await wait(() => {
      expect(onClick).to.not.have.been.called()
    })
  })

  it('should navigate using link when href provided', async () => {
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <PaginationButton href="https://instructure.design/">1</PaginationButton>
    )
    const button = await PaginationButtonLocator.find(':label(1)')

    await wait(() => {
      expect(button).to.have.attribute('href', 'https://instructure.design/')
    })
  })
})
