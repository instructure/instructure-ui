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

import { MenuItem } from '../index'
import { MenuItemLocator } from '../MenuItemLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<MenuItem />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem>Hello</MenuItem>)
    const item = await MenuItemLocator.find(':label(Hello)')
    expect(item).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render as a link when an href is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem href="example.html">Hello</MenuItem>)

    const item = await MenuItemLocator.find(':label(Hello)')
    const link = await item.find('a[href="example.html"]')

    expect(link).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render as a link when a to is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem to="/example">Hello</MenuItem>)

    const item = await MenuItemLocator.find(':label(Hello)')
    const link = await item.find('a[to="/example"]')

    expect(link).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onSelect after click', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onSelect = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem onSelect={onSelect} value="foo">
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':contains(Hello)')

    await item.click()

    expect(onSelect).to.have.been.calledOnce()
    expect(onSelect.args[0][1]).to.equal('foo')
    expect(onSelect.args[0][2]).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onClick after click', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClick = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem onClick={onClick} value="foo">
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    await item.click()

    expect(onClick).to.have.been.calledOnce()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onSelect after SPACE key is pressed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onSelect = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem onSelect={onSelect} value="foo">
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    await item.keyUp('space')

    expect(onSelect.getCall(0).args[1]).to.equal('foo')
    expect(onSelect.getCall(0).args[2]).to.equal(true)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onSelect after ENTER key is pressed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onSelect = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem onSelect={onSelect} value="foo">
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    await item.keyDown('enter')

    expect(onSelect).to.have.been.calledOnce()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not be able to select when the disabled prop is set', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onSelect = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem onSelect={onSelect} disabled>
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    await item.click(null, { clickable: false })
    await item.keyUp('enter')
    await item.keyUp('space')

    expect(onSelect).to.not.have.been.called()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the tabIndex attribute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem>Hello</MenuItem>)

    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('tabIndex')).to.equal('-1')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the aria-controls attribute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem controls="testId">Hello</MenuItem>)

    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('aria-controls')).to.equal('testId')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the aria-disabled attribute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem disabled>Hello</MenuItem>)

    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('aria-disabled')).to.equal('true')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the aria-checked attribute when defaultSelected prop is true', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem type="checkbox" defaultSelected>
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('aria-checked')).to.equal('true')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the aria-checked attribute when selected prop is true', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onSelect = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MenuItem type="checkbox" selected onSelect={onSelect}>
        Hello
      </MenuItem>
    )

    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('aria-checked')).to.equal('true')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should default to the "menuitem" role', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem>Hello</MenuItem>)
    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('role')).to.equal('menuitem')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the role to "menuitemcheckbox" when the type is "checkbox"', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem type="checkbox">Hello</MenuItem>)
    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('role')).to.equal('menuitemcheckbox')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the role to "menuitemradio" when the type is "radio"', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<MenuItem type="radio">Hello</MenuItem>)
    const item = await MenuItemLocator.find(':label(Hello)')

    expect(item.getAttribute('role')).to.equal('menuitemradio')
  })
})
