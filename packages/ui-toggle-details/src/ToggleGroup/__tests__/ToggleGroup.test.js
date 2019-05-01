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
import { expect, mount, spy, wait } from '@instructure/ui-test-utils'

import { ToggleGroup } from '../index'
import ToggleGroupLocator from '../locator'

describe('<ToggleGroup />', () => {
  it('should show its summary and hide its children by default', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()

    expect(toggleGroup.getTextContent()).to.contain('This is the summary section')
    expect(toggleGroup.getTextContent()).not.to.contain('This is the details section')
  })

  it('should render with children showing with the defaultExpanded prop', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        defaultExpanded
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = await ToggleGroupLocator.find()
    const toggle = await toggleGroup.findToggle()

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
    expect(toggleGroup.getTextContent()).to.contain('This is the details section')
  })

  it('should have an aria-controls attribute', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        defaultExpanded
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()
    const toggle = await toggleGroup.findToggle()
    const content = await toggleGroup.findContent()

    expect(toggle.getAttribute('aria-controls')).to.equal(content.getAttribute('id'))
  })

  it('should have an aria-expanded attribute', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()
    const toggle = await toggleGroup.findToggle()

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()
    await toggleGroup.clickToggle()

    const toggle = await toggleGroup.findToggle()

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should call onToggle on click events', async () => {
    const onToggle = spy((e) => {
      e.persist()
    })

    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        expanded={false}
        onToggle={onToggle}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = await ToggleGroupLocator.find()
    await toggleGroup.clickToggle()

    const { args } = onToggle.firstCall

    expect(args[0].type).to.equal('click')
    expect(args[1]).to.equal(true)
  })

  it('should update the toggle screenreader label based on the expanded state', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel={expanded => expanded ? 'Hide content' : 'Show content'}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = await ToggleGroupLocator.find()
    const toggle = await toggleGroup.findToggle()

    expect(toggle.getTextContent()).to.equal('Show content')

    await toggleGroup.clickToggle()

    expect(toggle.getTextContent()).to.equal('Hide content')
  })

  it('should accept custom icons', async () => {
    const Icon = (
      <svg height="50" width="50">
        <title>Icon collapsed</title>
        <circle cx="25" cy="25" r="20" />
      </svg>
    )

    const IconExpanded = (
      <svg height="50" width="50">
        <title>Icon expanded</title>
        <circle cx="25" cy="25" r="20" />
      </svg>
    )

    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        icon={() => Icon}
        iconExpanded={() => IconExpanded}
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()

    let iconTitle

    await wait(async () => {
      iconTitle = await toggleGroup.find('svg > title')
      expect(iconTitle.getTextContent()).to.equal('Icon collapsed')
    })

    await toggleGroup.clickToggle()

    await wait(async () => {
      iconTitle = await toggleGroup.find('svg > title')
      expect(iconTitle.getTextContent()).to.equal('Icon expanded')
    })
  })

  it('should meet a11y standards', async () => {
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()
    expect(await toggleGroup.accessible()).to.be.true()
  })

  it('focuses with the focus helper', async () => {
    let toggleRef = null
    await mount(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        componentRef={(el) => { toggleRef = el }}
      >
        This is the details section
      </ToggleGroup>
    )

    const toggleGroup = await ToggleGroupLocator.find()
    const toggle = await toggleGroup.findToggle()

    expect(toggleRef.focused).to.be.false()
    toggleRef.focus()

    expect(toggleRef.focused).to.be.true()
    expect(toggle.getDOMNode()).to.equal(document.activeElement)
  })
})
