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
import { expect, mount, within } from '@instructure/ui-test-utils'
import { AccessibleContent } from '../index'

xdescribe('<AccessibleContent />', async () => {
  it('should render screen reader content', async () => {
    const subject = await mount(
      <AccessibleContent alt="Screen Reader Content">
        Presentational Content
      </AccessibleContent>
    )
    const content = within(subject.getDOMNode())
    const alt = await content.find(':withText(Screen Reader Content)')

    expect(alt).to.not.be.visible()
  })

  it('should render a presentational content', async () => {
    const subject = await mount(
      <AccessibleContent alt="Screen Reader Content">
        Presentational Content
      </AccessibleContent>
    )
    const content = within(subject.getDOMNode())
    const presentational = await content.findWithText('Presentational Content')

    expect(presentational).to.be.visible()
    expect(presentational).to.have.attribute('aria-hidden')
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    const subject = await mount(<AccessibleContent as="div" />)
    const accessibleContent = within(subject.getDOMNode())

    expect(accessibleContent).to.have.tagName('div')
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <AccessibleContent alt="Screenreader test">
        Not screenreader text
      </AccessibleContent>
    )

    const accessibleContent = within(subject.getDOMNode())

    expect(await accessibleContent.accessible()).to.be.true()
  })
})
