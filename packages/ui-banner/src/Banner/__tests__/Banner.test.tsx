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
import { runAxeCheck } from '@instructure/ui-axe-check'

import { Banner } from '@instructure/ui-banner/latest'

describe('<Banner />', () => {
  it('should render the header and children', async () => {
    const { container } = await render(
      <Banner header="Banner header" dismissible={false}>
        Banner body copy
      </Banner>
    )

    expect(container).toHaveTextContent('Banner header')
    expect(container).toHaveTextContent('Banner body copy')
  })

  it('should render a close button by default and fire onDismiss', async () => {
    const onDismiss = vi.fn()
    await render(<Banner onDismiss={onDismiss}>Banner body copy</Banner>)

    const closeButton = page.getByRole('button')
    await closeButton.click()

    expect(onDismiss).toHaveBeenCalled()
  })

  it('should not render a close button when dismissible is false', async () => {
    const { container } = await render(
      <Banner dismissible={false}>Banner body copy</Banner>
    )

    expect(container.querySelector('button')).toBeNull()
  })

  it('should resolve the close button accessible name to the default label', async () => {
    await render(<Banner onDismiss={() => {}}>Banner body copy</Banner>)

    const closeButton = page.getByRole('button', { name: 'Close banner' })
    await expect.element(closeButton).toBeInTheDocument()
  })

  it('should allow overriding the close button accessible label', async () => {
    await render(
      <Banner closeButtonLabel="Dismiss promo" onDismiss={() => {}}>
        Banner body copy
      </Banner>
    )

    const closeButton = page.getByRole('button', { name: 'Dismiss promo' })
    await expect.element(closeButton).toBeInTheDocument()
  })

  it('should render a decorative icon as aria-hidden', async () => {
    const { container } = await render(
      <Banner
        dismissible={false}
        renderIcon={() => <span data-testid="icon">icon</span>}
      >
        Banner body copy
      </Banner>
    )

    const iconWrapper = container.querySelector(
      '[data-testid="icon"]'
    )?.parentElement

    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render primary and secondary actions', async () => {
    const { container } = await render(
      <Banner
        dismissible={false}
        renderPrimaryAction={() => <button>Primary</button>}
        renderSecondaryAction={() => <button>Secondary</button>}
      >
        Banner body copy
      </Banner>
    )

    expect(container).toHaveTextContent('Primary')
    expect(container).toHaveTextContent('Secondary')
  })

  it('should not render a secondary action without a primary action', async () => {
    const { container } = await render(
      <Banner
        dismissible={false}
        renderSecondaryAction={() => <button>Secondary</button>}
      >
        Banner body copy
      </Banner>
    )

    expect(container).not.toHaveTextContent('Secondary')
  })

  it('should be keyboard operable', async () => {
    const onDismiss = vi.fn()
    await render(<Banner onDismiss={onDismiss}>Banner body copy</Banner>)

    const closeButton = page.getByRole('button').element() as HTMLElement
    closeButton.focus()
    await userEvent.keyboard('{Enter}')

    expect(onDismiss).toHaveBeenCalled()
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Banner
        header="Banner header"
        onDismiss={() => {}}
        renderPrimaryAction={() => <button>Primary</button>}
      >
        Banner body copy
      </Banner>
    )

    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })
})
