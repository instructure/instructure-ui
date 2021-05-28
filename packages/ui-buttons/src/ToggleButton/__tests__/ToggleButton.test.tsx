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
import { expect, mount, spy, stub, wait } from '@instructure/ui-test-utils'

import { ToggleButton } from '../index'
import { ToggleButtonLocator } from '../ToggleButtonLocator'

describe('<ToggleButton />', async () => {
  const icon = (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; title: string; height: ... Remove this comment to see the full error message
    <svg title="myIcon" height="1em" width="1em">
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )

  it('should render', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const component = ToggleButtonLocator.find()

    expect(component).to.exist()
  })

  it('should fail if `screenReaderLabel` is not provided', async () => {
    const cs = spy(console, 'error')
    const warning =
      'Warning: Failed prop type: The prop `screenReaderLabel` is marked as required in `ToggleButton`'

    await mount(
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'screenReaderLabel' is missing in type '{... Remove this comment to see the full error message
      <ToggleButton
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    expect(cs).to.have.been.calledWithMatch(warning)
  })

  it('should fail if `status` is not provided', async () => {
    const cs = spy(console, 'error')
    const warning =
      'Warning: Failed prop type: The prop `status` is marked as required in `ToggleButton`'

    await mount(
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'status' is missing in type '{ screenRead... Remove this comment to see the full error message
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
      />
    )

    expect(cs).to.have.been.calledWithMatch(warning)
  })

  it('should set `aria-pressed` to `true` if `status` is `pressed`', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )

    const button = await ToggleButtonLocator.find()

    // Due to tooltip, button is not outermost element in the locator
    expect(await button.find('button[aria-pressed="true"]')).to.exist()
  })

  it('should set `aria-pressed` to `false` if `status` is `unpressed`', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="unpressed"
      />
    )

    const button = await ToggleButtonLocator.find()

    // Due to tooltip, button is not outermost element in the locator
    expect(await button.find('button[aria-pressed="false"]')).to.exist()
  })

  it('should display a tooltip', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )

    const button = await ToggleButtonLocator.find()

    await button.focus()
    const tooltip = await button.findTooltipContent()

    await wait(() => {
      expect(tooltip).to.have.text('This is tooltip content')
    })
  })

  it('should display a tooltip without hover/focus when isShowingTooltip is true', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        isShowingTooltip
        status="pressed"
      />
    )

    const button = await ToggleButtonLocator.find()

    const tooltip = await button.findTooltipContent()

    await wait(() => {
      expect(tooltip).to.have.text('This is tooltip content')
    })
  })

  it('should render an icon', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('svg[title="myIcon"]')).to.exist()
  })

  it('should pass the `as` prop', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'ReactElem... Remove this comment to see the full error message
        as="li"
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('li')).to.exist()
  })

  it('should set the disabled attribute when `interaction` prop is set to disabled', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="disabled"
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `disabled` prop is set', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ screenReaderLabel: string; renderIcon: Ele... Remove this comment to see the full error message
        disabled
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `interaction` prop is set to readonly', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="readonly"
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `readOnly` prop is set', async () => {
    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ screenReaderLabel: string; renderIcon: Ele... Remove this comment to see the full error message
        readOnly
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = stub()

    await mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        onClick={onClick}
        status="pressed"
      />
    )
    const button = await ToggleButtonLocator.find()

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
