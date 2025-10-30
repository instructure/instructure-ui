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

import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { ToggleButton } from '../index'

describe('<ToggleButton />', () => {
  const icon = (
    <svg data-title="myIcon" height="1em" width="1em">
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[data-title="myIcon"]'

  it('should render', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = screen.getByRole('button')
    const svgIcon = document.querySelector(iconSelector)
    const tooltip = screen.getByRole('tooltip')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('This is a screen reader label')
    expect(svgIcon).toBeInTheDocument()
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('This is tooltip content')
  })

  it('should set `aria-pressed` to `true` if `status` is `pressed`', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('should set `aria-pressed` to `false` if `status` is `unpressed`', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="unpressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('should render an icon', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        status="pressed"
      />
    )
    const button = screen.getByRole('button')
    const svgIcon = document.querySelector(iconSelector)

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `as` prop', () => {
    const { container } = render(
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

  it('should set the disabled attribute when `interaction` prop is set to disabled', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="disabled"
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` prop is set', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        disabled
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` prop is set to readonly', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        interaction="readonly"
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` prop is set', () => {
    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        readOnly
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()

    render(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="This is tooltip content"
        onClick={onClick}
        status="pressed"
      />
    )
    const button = screen.getByRole('button')

    await userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('margin prop', () => {
    it('should apply margin with theme tokens', () => {
      const { container } = render(
        <div>
          <ToggleButton
            screenReaderLabel="test1"
            renderIcon={icon}
            renderTooltipContent="tooltip"
            status="unpressed"
            margin="medium"
          />
          <ToggleButton
            screenReaderLabel="test2"
            renderIcon={icon}
            renderTooltipContent="tooltip"
            status="unpressed"
            margin="large"
          />
          <ToggleButton
            screenReaderLabel="test3"
            renderIcon={icon}
            renderTooltipContent="tooltip"
            status="unpressed"
            margin="space4"
          />
          <ToggleButton
            screenReaderLabel="test4"
            renderIcon={icon}
            renderTooltipContent="tooltip"
            status="unpressed"
            margin="small medium"
          />
        </div>
      )

      const allButtons = container.querySelectorAll('button')

      const buttonMedium = allButtons[0] as HTMLElement
      const buttonMediumStyle = window.getComputedStyle(buttonMedium)
      const buttonLarge = allButtons[1] as HTMLElement
      const buttonLargeStyle = window.getComputedStyle(buttonLarge)
      const buttonSpace = allButtons[2] as HTMLElement
      const buttonSpaceStyle = window.getComputedStyle(buttonSpace)
      const buttonMixed = allButtons[3] as HTMLElement
      const buttonMixedStyle = window.getComputedStyle(buttonMixed)

      // Note: ToggleButton passes margin to IconButton, which uses View component
      // View only accepts theme tokens, not custom CSS values
      expect(buttonMediumStyle.margin).toBe('1.5rem')
      expect(buttonLargeStyle.margin).toBe('2.25rem')
      expect(buttonSpaceStyle.margin).toBe('0.25rem')
      expect(buttonMixedStyle.margin).toBe('0.75rem 1.5rem')
    })
  })
})
