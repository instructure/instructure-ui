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

import { CondensedButton } from '../index'

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

  it('should render children', () => {
    const children = 'Hello world'

    render(<CondensedButton>{children}</CondensedButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(children)
  })

  it('should provide a focused getter', () => {
    let componentRef: CondensedButton | undefined

    render(
      <CondensedButton
        ref={(component: CondensedButton) => {
          componentRef = component
        }}
      >
        Hello
      </CondensedButton>
    )
    const button = screen.getByRole('button', { name: 'Hello' })

    button.focus()

    expect(componentRef?.focused).toBe(true)
  })

  it('should provide a focus function', () => {
    let componentRef: CondensedButton | undefined

    render(
      <CondensedButton
        ref={(component: CondensedButton) => {
          componentRef = component
        }}
      >
        Hello
      </CondensedButton>
    )
    const button = screen.getByRole('button', { name: 'Hello' })

    componentRef?.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should pass the type attribute', () => {
    render(<CondensedButton type="submit">Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = vi.fn()
    render(<CondensedButton elementRef={elementRef}>Hello</CondensedButton>)
    const button = screen.getByRole('button', { name: 'Hello' })

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should pass the `as` prop', () => {
    const { container } = render(
      <CondensedButton as="li">Hello</CondensedButton>
    )

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello')
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` is set to disabled', () => {
    render(<CondensedButton interaction="disabled">Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` is set', () => {
    render(<CondensedButton disabled>Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` is set to readonly', () => {
    render(<CondensedButton interaction="readonly">Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` is set', () => {
    render(<CondensedButton readOnly>Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `href` prop', () => {
    render(<CondensedButton href="#">Hello</CondensedButton>)

    const linkButton = screen.getByRole('link', { name: 'Hello' })

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
  })

  it('should pass the `renderIcon` prop', async () => {
    render(<CondensedButton renderIcon={icon}>Hello</CondensedButton>)

    const svgIcon = document.querySelector(iconSelector)
    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()
    render(<CondensedButton onClick={onClick}>Hello</CondensedButton>)

    const button = screen.getByRole('button', { name: 'Hello' })

    await userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
