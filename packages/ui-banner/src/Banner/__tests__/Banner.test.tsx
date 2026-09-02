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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { Banner } from '@instructure/ui-banner/latest'

describe('<Banner />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render the header', () => {
    render(<Banner header="Heads up">Body text</Banner>)

    expect(screen.getByText('Heads up')).toBeInTheDocument()
  })

  it('should render children as body content', () => {
    render(<Banner>Your assignments were graded.</Banner>)

    expect(
      screen.getByText('Your assignments were graded.')
    ).toBeInTheDocument()
  })

  it('should render a custom icon when provided', () => {
    render(<Banner icon={<svg data-testid="custom-icon" />}>Body text</Banner>)

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('should render a call-to-action button when ctaText and onCtaClick are provided', () => {
    const onCtaClick = vi.fn()
    render(
      <Banner ctaText="Go" onCtaClick={onCtaClick}>
        Body text
      </Banner>
    )

    const button = screen.getByRole('button', { name: 'Go' })
    expect(button).toBeInTheDocument()

    button.dispatchEvent(
      new MouseEvent('click', { bubbles: true, button: 0, detail: 1 })
    )
    expect(onCtaClick).toHaveBeenCalledTimes(1)
  })

  it('should not render a call-to-action button when onCtaClick is missing', () => {
    render(<Banner ctaText="Go">Body text</Banner>)

    expect(screen.queryByRole('button', { name: 'Go' })).not.toBeInTheDocument()
  })

  it('should render a dismiss button and call onDismiss when clicked', async () => {
    const onDismiss = vi.fn()
    render(
      <Banner
        isDismissible
        onDismiss={onDismiss}
        closeButtonLabel="Close banner"
      >
        Body text
      </Banner>
    )

    const closeButton = screen.getByRole('button', { name: 'Close banner' })
    closeButton.dispatchEvent(
      new MouseEvent('click', { bubbles: true, button: 0, detail: 1 })
    )

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('should not render a dismiss button when onDismiss is missing', () => {
    render(<Banner isDismissible>Body text</Banner>)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should not render a dismiss button when isDismissible is false', () => {
    render(
      <Banner onDismiss={() => {}} closeButtonLabel="Close banner">
        Body text
      </Banner>
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should warn when isDismissible is true without a closeButtonLabel', () => {
    render(
      <Banner isDismissible onDismiss={() => {}}>
        Body text
      </Banner>
    )

    expect(consoleWarningMock.mock.calls.flat()).toContainEqual(
      expect.stringContaining('`closeButtonLabel` should be provided')
    )
  })

  it('should not warn when isDismissible is true with a closeButtonLabel', () => {
    render(
      <Banner isDismissible onDismiss={() => {}} closeButtonLabel="Close">
        Body text
      </Banner>
    )

    expect(consoleWarningMock.mock.calls.flat()).not.toContainEqual(
      expect.stringContaining('`closeButtonLabel` should be provided')
    )
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <Banner
        header="Heads up"
        isDismissible
        onDismiss={() => {}}
        closeButtonLabel="Close banner"
      >
        Body text
      </Banner>
    )

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
