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
import { expect, mount, spy } from '@instructure/ui-test-utils'

import { ToggleDetails } from '../index'
import { ToggleDetailsLocator } from '../ToggleDetailsLocator'

describe('<ToggleDetails />', async () => {
  it('should hide its content', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<ToggleDetails summary="Click me">Content</ToggleDetails>)

    expect(
      await ToggleDetailsLocator.find(':contains(Content)', {
        expectEmpty: true
      })
    ).to.not.exist()
  })

  it('should place the icon after the summary when prop is set', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ToggleDetails iconPosition="end" summary="Click me">
        Content
      </ToggleDetails>
    )

    const toggleDetails = await ToggleDetailsLocator.find()

    const summary = await toggleDetails.find(':contains(Click me)')

    expect(summary.getDOMNode().previousSibling).to.not.exist()
  })

  it('should have an aria-controls attribute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<ToggleDetails summary="Click me">Details</ToggleDetails>)

    const toggleDetails = await ToggleDetailsLocator.find()
    const toggle = await toggleDetails.findToggle()
    const content = await toggleDetails.findContent({ visible: false })

    expect(toggle.getAttribute('aria-controls')).to.equal(
      content.getAttribute('id')
    )
  })

  it('should have an aria-expanded attribute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<ToggleDetails summary="Click me">Details</ToggleDetails>)

    const toggleDetails = await ToggleDetailsLocator.find()
    const toggle = await toggleDetails.findToggle()

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<ToggleDetails summary="Click me">Details</ToggleDetails>)

    const toggleDetails = await ToggleDetailsLocator.find()
    const toggle = await toggleDetails.findToggle()
    await toggleDetails.clickToggle()

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should call onToggle on click events', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const onToggle = spy((e) => {
      e.persist()
    })

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ToggleDetails summary="Click me" expanded={false} onToggle={onToggle}>
        Details
      </ToggleDetails>
    )

    const toggleDetails = await ToggleDetailsLocator.find()
    await toggleDetails.clickToggle()

    const { args } = onToggle.firstCall

    expect(args[0].type).to.equal('click')
    expect(args[1]).to.be.true()
  })

  it('should be initialized by defaultExpanded prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ToggleDetails summary="Click me" defaultExpanded>
        Content
      </ToggleDetails>
    )

    const toggleDetails = await ToggleDetailsLocator.find()

    const toggle = await toggleDetails.findToggle()
    const content = await toggleDetails.findContent()

    expect(toggle.getAttribute('aria-expanded')).to.exist()
    expect(content.getTextContent()).to.equal('Content')
  })

  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<ToggleDetails summary="Click me">Content</ToggleDetails>)
    const toggleDetails = await ToggleDetailsLocator.find()
    expect(await toggleDetails.accessible()).to.be.true()
  })

  it('focuses with the focus helper', async () => {
    let toggleRef = null

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ToggleDetails
        summary="Click me"
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        componentRef={(el) => {
          toggleRef = el
        }}
      >
        Content
      </ToggleDetails>
    )

    const toggleDetails = await ToggleDetailsLocator.find()
    const toggle = await toggleDetails.findToggle()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(toggleRef.focused).to.be.false()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    toggleRef.focus()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(toggleRef.focused).to.be.true()
    expect(toggle.getDOMNode()).to.equal(document.activeElement)
  })
})
