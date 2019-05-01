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
import { expect, find, mount, stub } from '@instructure/ui-test-utils'

import { Tab } from '../index'

describe('<Tab />', async () => {
  it('should render children', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
    )

    const tab = await find('[role="tab"]')

    expect(tab.getTextContent()).to.equal('Tab Label')
  })

  it('should have appropriate role attribute', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
    )
    expect(await find('[role="tab"]')).to.exist()
  })

  it('should have appropriate aria attributes', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
    )

    const tab = await find('[role="tab"]')

    expect(tab.getAttribute('aria-selected')).to.not.exist()
    expect(tab.getAttribute('aria-disabled')).to.not.exist()
  })

  it('should set the aria-selected attribute', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" selected>Tab Label</Tab>
    )
    expect(await find('[role="tab"][aria-selected="true"]')).to.exist()
  })

  it('should set the aria-disabled attribute', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" disabled>Tab Label</Tab>
    )
    expect(await find('[role="tab"][aria-disabled="true"]')).to.exist()
  })

  it('should set the tabindex to 0 when selected', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" selected>Tab Label</Tab>
    )
    expect(await find('[role="tab"][tabindex="0"]')).to.exist()
  })

  it('should set the tabindex to -1 when not selected', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
    )
    expect(await find('[role="tab"][tabindex="-1"]')).to.exist()
  })

  it('should remove the tabindex attribute when disabled', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" disabled>Tab Label</Tab>
    )

    const tab = await find('[role="tab"]')

    expect(tab.getAttribute('tabindex')).to.not.exist()
  })

  it('should call onClick when clicked', async () => {
    const onClick = stub()
    const index = 2

    await mount(
      <Tab id="foo" index={index} controls="foo-panel" onClick={onClick}>Tab Label</Tab>
    )

    const tab = await find('[role="tab"]')
    await tab.click()

    expect(onClick).to.have.been.called()
    expect(onClick.args[0][0]).to.equal(index)
  })

  it('should NOT call onClick when clicked and tab is disabled', async () => {
    const onClick = stub()

    await mount(
      <Tab id="foo" index={0} controls="foo-panel" onClick={onClick} disabled>
        Tab Label
      </Tab>
    )
    const tab = await find('[role="tab"]')
    await tab.click()

    expect(onClick).to.not.have.been.called()
  })

  it('should call onKeyDown when keys are pressed', async () => {
    const onKeyDown = stub()
    const index = 2

    await mount(
      <Tab id="foo" index={index} controls="foo-panel" onKeyDown={onKeyDown}>
        Tab Label
      </Tab>
    )

    const tab = await find('[role="tab"]')
    await tab.keyDown('enter')

    expect(onKeyDown).to.have.been.called()
    expect(onKeyDown.args[0][0]).to.equal(index)
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', async () => {
    const onKeyDown = stub()

    await mount(
      <Tab id="foo" index={0} controls="foo-panel" onKeyDown={onKeyDown} disabled>
        Tab Label
      </Tab>
    )
    const tab = await find('[role="tab"]')

    let error = false
    try {
      await tab.keyDown('enter')
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
    expect(onKeyDown).to.not.have.been.called()
  })

  it('should focus itself when focus is set and it is selected', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" selected focus>
        Tab Label
      </Tab>
    )
    const tab = await find('[role="tab"]')

    expect(tab.focused()).to.be.true()
  })

  it('should not focus itself when it is not selected', async () => {
    await mount(
      <Tab id="foo" index={0} controls="foo-panel" selected={false} focus>
        Tab Label
      </Tab>
    )
    const tab = await find('[role="tab"]')

    expect(tab.focused()).to.be.false()
  })
})
