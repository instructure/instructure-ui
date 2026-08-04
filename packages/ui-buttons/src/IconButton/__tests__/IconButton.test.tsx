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
import { IconButton } from '@instructure/ui-buttons/latest'

describe('<IconButton/>', () => {
  const icon = (
    <svg
      data-title="myIcon"
      height="1em"
      width="1em"
      style={{ fill: 'currentcolor' }}
    >
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[data-title="myIcon"]'

  it('should render an icon when provided as the `children` prop', async () => {
    await render(
      <IconButton screenReaderLabel="some action">{icon}</IconButton>
    )

    const svgIcon = document.querySelector(iconSelector)
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
    expect(button).toHaveTextContent('some action')
  })

  it('should render an icon when provided as the `renderIcon` prop', async () => {
    await render(
      <IconButton screenReaderLabel="some action" renderIcon={icon} />
    )
    const svgIcon = document.querySelector(iconSelector)
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should provide a focused getter', async () => {
    let componentRef: IconButton | undefined

    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        ref={(component: IconButton) => {
          componentRef = component
        }}
      />
    )
    const button = page.getByRole('button').element()

    button.focus()

    expect(componentRef?.focused).toBe(true)
  })

  it('should provide a focus function', async () => {
    let componentRef: IconButton | undefined

    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        ref={(component: IconButton) => {
          componentRef = component
        }}
      />
    )
    const button = page.getByRole('button').element()

    componentRef?.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should pass the `href` prop', async () => {
    await render(
      <IconButton screenReaderLabel="some action" renderIcon={icon} href="#" />
    )
    const linkButton = page.getByRole('link').element()

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
  })

  it('should pass the `type` prop', async () => {
    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        type="reset"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'reset')
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = vi.fn()
    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        elementRef={elementRef}
      />
    )
    const button = page.getByRole('button').element()

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should pass the `as` prop', async () => {
    const { container } = await render(
      <IconButton screenReaderLabel="some action" renderIcon={icon} as="li" />
    )
    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('some action')
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` is set to disabled', async () => {
    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="disabled"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` is set', async () => {
    await render(
      <IconButton screenReaderLabel="some action" renderIcon={icon} disabled />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` is set to readonly', async () => {
    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="readonly"
      />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` is set', async () => {
    await render(
      <IconButton screenReaderLabel="some action" renderIcon={icon} readOnly />
    )
    const button = page.getByRole('button').element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()

    await render(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        onClick={onClick}
      />
    )
    const button = page.getByRole('button').element()

    await userEvent.click(button)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
