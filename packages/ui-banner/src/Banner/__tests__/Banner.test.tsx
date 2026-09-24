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

import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Banner } from '@instructure/ui-banner/latest'
import { GiftInstUIIcon } from '@instructure/ui-icons'

describe('<Banner />', () => {
  it('should render the title and children', async () => {
    await render(
      <Banner renderTitle="New feature">Check out the new dashboard.</Banner>
    )
    await expect.element(page.getByText('New feature')).toBeInTheDocument()
    await expect
      .element(page.getByText('Check out the new dashboard.'))
      .toBeInTheDocument()
  })

  it('should render a default icon that is hidden from assistive technology', async () => {
    const { container } = await render(<Banner>Announcement text.</Banner>)
    const icon = container.querySelector('svg[class^="lucide"]')
    expect(icon).toBeInTheDocument()

    const iconContainer = icon?.closest('[aria-hidden]')
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render a custom icon when provided via `renderIcon`', async () => {
    const { container } = await render(
      <Banner renderIcon={<GiftInstUIIcon />}>Announcement text.</Banner>
    )
    const icon = container.querySelector('svg[class^="lucide"]')
    expect(icon).toHaveAttribute('name', 'Gift')
  })

  it('should not render the close button when `renderCloseButtonLabel` is not provided', async () => {
    await render(<Banner>Announcement text.</Banner>)
    const closeButton = page.getByRole('button')
    await expect.element(closeButton).not.toBeInTheDocument()
  })

  it('should render the close button and call `onDismiss` when clicked', async () => {
    const onDismiss = vi.fn()
    await render(
      <Banner renderCloseButtonLabel="Close" onDismiss={onDismiss}>
        Announcement text.
      </Banner>
    )
    const closeButton = page.getByRole('button')
    await expect.element(closeButton).toBeInTheDocument()

    await userEvent.click(closeButton)

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should render `renderActions` content', async () => {
    await render(
      <Banner renderActions={<button>Learn more</button>}>
        Announcement text.
      </Banner>
    )
    await expect
      .element(page.getByRole('button', { name: 'Learn more' }))
      .toBeInTheDocument()
  })

  it('should label the landmark via `renderTitle` when provided', async () => {
    const { container } = await render(
      <Banner renderTitle="New feature">Announcement text.</Banner>
    )
    const section = container.querySelector('section')
    const titleId = section?.getAttribute('aria-labelledby')
    expect(titleId).toBeTruthy()
    expect(document.getElementById(titleId!)).toHaveTextContent('New feature')
  })

  it('should label the landmark via `screenReaderLabel` when there is no title', async () => {
    const { container } = await render(
      <Banner screenReaderLabel="Promotion">Announcement text.</Banner>
    )
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('aria-label', 'Promotion')
  })

  it('should never render live-region attributes', async () => {
    const { container } = await render(
      <Banner renderTitle="New feature">Announcement text.</Banner>
    )
    const section = container.querySelector('section')
    expect(section).not.toHaveAttribute('aria-live')
    expect(section).not.toHaveAttribute('role', 'alert')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Banner
        renderTitle="New feature"
        renderCloseButtonLabel="Close"
        renderActions={<button>Learn more</button>}
      >
        Announcement text.
      </Banner>
    )
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })
})
