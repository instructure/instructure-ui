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

import { fireEvent, render, screen, act } from '@testing-library/react'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { ToggleDetails } from '../index'

describe('<ToggleDetails />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should hide its content', async () => {
    render(<ToggleDetails summary="Click me">Content</ToggleDetails>)
    const content = screen.queryByText('Content')

    expect(content).not.toBeInTheDocument()
  })

  it('should place the icon after the summary when prop is set', async () => {
    const { container } = render(
      <ToggleDetails iconPosition="end" summary="Click me">
        Content
      </ToggleDetails>
    )
    const summary = container.querySelector(
      '[class$="-toggleDetails__summaryText"]'
    )
    const icon = container.querySelector('[class$="-toggleDetails__icon"]')

    expect(icon?.previousSibling).toBe(summary)
  })

  it('should have an aria-controls attribute', async () => {
    const { container } = render(
      <ToggleDetails summary="Click me">Details</ToggleDetails>
    )

    const toggle = container.querySelector('[class$="-toggleDetails__toggle"]')
    const content = container.querySelector(
      '[class$="-toggleDetails__details"]'
    )

    expect(toggle).toHaveAttribute('aria-controls', content?.id)
  })

  it('should have an aria-expanded attribute', async () => {
    const { container } = render(
      <ToggleDetails summary="Click me">Details</ToggleDetails>
    )
    const toggle = container.querySelector('[class$="-toggleDetails__toggle"]')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('should not have aria attributes when it has no children', async () => {
    render(
      <ToggleDetails summary="Click me" data-testid="td__0"></ToggleDetails>
    )
    const toggle = screen.getByTestId('td__0')

    expect(toggle).not.toHaveAttribute('aria-controls')
    expect(toggle).not.toHaveAttribute('aria-expanded')
  })

  it('should toggle on click events', () => {
    vi.useFakeTimers()
    const { container } = render(
      <ToggleDetails summary="Click me">Details</ToggleDetails>
    )
    const toggle = container.querySelector('[class$="-toggleDetails__toggle"]')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(screen.getByText('Click me'), { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    vi.useRealTimers()
  })

  it('should call onToggle on click events', () => {
    vi.useFakeTimers()
    const onToggle = vi.fn()

    render(
      <ToggleDetails summary="Click me" expanded={false} onToggle={onToggle}>
        Details
      </ToggleDetails>
    )

    fireEvent.click(screen.getByText('Click me'), { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    const args = onToggle.mock.calls[0]

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(args[0].type).toBe('click')
    expect(args[1]).toBe(true)

    vi.useRealTimers()
  })

  it('should call onToggle on click events when it has no children', () => {
    vi.useFakeTimers()
    const onToggle = vi.fn()

    render(
      <ToggleDetails
        summary="Click me"
        expanded={false}
        onToggle={onToggle}
        data-testid="td__1"
      ></ToggleDetails>
    )
    const toggle = screen.getByTestId('td__1')
    fireEvent.click(toggle, { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    const args = onToggle.mock.calls[0]

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(args[0].type).toBe('click')
    expect(args[1]).toBe(true)

    vi.useRealTimers()
  })

  it('should be initialized by defaultExpanded prop', async () => {
    const { container } = render(
      <ToggleDetails summary="Click me" defaultExpanded>
        Content
      </ToggleDetails>
    )
    const toggle = container.querySelector('[class$="-toggleDetails__toggle"]')
    const content = container.querySelector(
      '[class$="-toggleDetails__details"]'
    )

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(content).toHaveTextContent('Content')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <ToggleDetails summary="Click me">Content</ToggleDetails>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('focuses with the focus helper', async () => {
    let toggleRef: any

    const { container } = render(
      <ToggleDetails
        summary="Click me"
        ref={(el) => {
          toggleRef = el
        }}
      >
        Content
      </ToggleDetails>
    )
    const toggle = container.querySelector('[class$="-toggleDetails__toggle"]')

    expect(document.activeElement).not.toBe(toggle)

    toggleRef?.focus()

    expect(document.activeElement).toBe(toggle)
  })
})
