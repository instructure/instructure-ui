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
import { CondensedButton } from '@instructure/ui-buttons/latest'

describe('<CondensedButton/>', () => {
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

  it('should render children', async () => {
    const children = 'Hello world'

    await render(<CondensedButton>{children}</CondensedButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toMatchTextContent(children)
  })

  it('should provide a focused getter', async () => {
    let componentRef: CondensedButton | undefined

    await render(
      <CondensedButton
        ref={(component: CondensedButton) => {
          componentRef = component
        }}
      >
        Hello
      </CondensedButton>
    )
    const button = page.getByRole('button', { name: 'Hello' }).element()

    button.focus()

    expect(componentRef?.focused).toBe(true)
  })

  it('should provide a focus function', async () => {
    let componentRef: CondensedButton | undefined

    await render(
      <CondensedButton
        ref={(component: CondensedButton) => {
          componentRef = component
        }}
      >
        Hello
      </CondensedButton>
    )
    const button = page.getByRole('button', { name: 'Hello' }).element()

    componentRef?.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should pass the type attribute', async () => {
    await render(<CondensedButton type="submit">Hello</CondensedButton>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = vi.fn()
    await render(
      <CondensedButton elementRef={elementRef}>Hello</CondensedButton>
    )
    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should pass the `as` prop', async () => {
    const { container } = await render(
      <CondensedButton as="li">Hello</CondensedButton>
    )

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toMatchTextContent('Hello')
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` is set to disabled', async () => {
    await render(
      <CondensedButton interaction="disabled">Hello</CondensedButton>
    )

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` is set', async () => {
    await render(<CondensedButton disabled>Hello</CondensedButton>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` is set to readonly', async () => {
    await render(
      <CondensedButton interaction="readonly">Hello</CondensedButton>
    )

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` is set', async () => {
    await render(<CondensedButton readOnly>Hello</CondensedButton>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `href` prop', async () => {
    await render(<CondensedButton href="#">Hello</CondensedButton>)

    const linkButton = page.getByRole('link', { name: 'Hello' }).element()

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
  })

  it('should pass the `renderIcon` prop', async () => {
    await render(<CondensedButton renderIcon={icon}>Hello</CondensedButton>)

    const svgIcon = document.querySelector(iconSelector)
    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()
    await render(<CondensedButton onClick={onClick}>Hello</CondensedButton>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    await userEvent.click(button)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
