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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { ToggleButton } from '@instructure/ui-buttons/latest'

describe('<ToggleButton />', () => {
  const icon = (
    <svg data-title="myIcon" height="1em" width="1em">
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[data-title="myIcon"]'

  it('should render', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()
    const svgIcon = document.querySelector(iconSelector)
    const tooltip = page.getByRole('tooltip').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('This is a screen reader label')
    expect(svgIcon).toBeInTheDocument()
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('This is tooltip content')
  })

  it('should set `aria-pressed` to `true` if `status` is `pressed`', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('should set `aria-pressed` to `false` if `status` is `unpressed`', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="unpressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('should render an icon', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()
    const svgIcon = document.querySelector(iconSelector)

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `as` prop', async () => {
    const { container } = await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        as="li"
        status="pressed"
      />
    )
    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` prop is set to disabled', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="disabled"
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` prop is set', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        disabled
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` prop is set to readonly', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="readonly"
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` prop is set', async () => {
    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        readOnly
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()

    await render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        onClick={onClick}
        status="pressed"
      />
    )
    const button = page.getByRole('button').element()

    await userEvent.click(button)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
