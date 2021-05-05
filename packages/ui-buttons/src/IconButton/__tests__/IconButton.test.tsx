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
import { mount, expect, stub, wait, spy } from '@instructure/ui-test-utils'

import { IconButton } from '../index'
import { IconButtonLocator } from '../IconButtonLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<IconButton/>', async () => {
  const icon = (
    <svg
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; title: string; height: ... Remove this comment to see the full error message
      title="myIcon"
      height="1em"
      width="1em"
      style={{ fill: 'currentcolor' }}
    >
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[title="myIcon"]'

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render an icon when provided as the `children` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<IconButton screenReaderLabel="some action">{icon}</IconButton>)
    const button = await IconButtonLocator.find()
    expect(await button.find(iconSelector)).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render an icon when provided as the `renderIcon` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton screenReaderLabel="some action" renderIcon={icon} />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find(iconSelector)).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should fail if `screenReaderLabel` is not provided', async () => {
    const cs = spy(console, 'error')
    const warning =
      'Warning: Failed prop type: The prop `screenReaderLabel` is marked as required in `IconButton`'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<IconButton renderIcon={icon} />)

    expect(cs).to.have.been.calledWithMatch(warning)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide a focused getter', async () => {
    let componentRef = null

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        componentRef={(component) => {
          componentRef = component
        }}
      />
    )
    const button = await IconButtonLocator.find()

    await button.focus()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(componentRef.focused).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide a focus function', async () => {
    let componentRef = null

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        componentRef={(component) => {
          componentRef = component
        }}
      />
    )
    const button = await IconButtonLocator.find()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    componentRef.focus()

    await wait(() => {
      expect(button.focused()).to.be.true()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should pass the `href` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton screenReaderLabel="some action" renderIcon={icon} href="#" />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('a[href="#"]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should pass the `type` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        type="reset"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[type="reset"]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should pass the `elementRef` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const elementRef = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        elementRef={elementRef}
      />
    )
    const button = await IconButtonLocator.find()
    expect(elementRef).to.have.been.calledWith(button.getDOMNode())
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should pass the `as` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <IconButton screenReaderLabel="some action" renderIcon={icon} as="li" />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('li')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the disabled attribute when `interaction` is set to disabled', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="disabled"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the disabled attribute when `disabled` is set', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <IconButton screenReaderLabel="some action" renderIcon={icon} disabled />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the disabled attribute when `interaction` is set to readonly', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="readonly"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set the disabled attribute when `readOnly` is set', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <IconButton screenReaderLabel="some action" renderIcon={icon} readOnly />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should pass the `onClick` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClick = stub()

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        onClick={onClick}
      />
    )
    const button = await IconButtonLocator.find()

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
