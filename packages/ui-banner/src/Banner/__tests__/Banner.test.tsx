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

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Banner } from '@instructure/ui-banner/latest'
import { DiamondInstUIIcon } from '@instructure/ui-icons'

describe('<Banner />', () => {
  let srdiv: HTMLDivElement | null

  beforeEach(async () => {
    srdiv = document.createElement('div')
    srdiv.id = '_bannerLiveRegion'
    srdiv.setAttribute('aria-live', 'assertive')
    document.body.appendChild(srdiv)
  })

  afterEach(async () => {
    srdiv?.parentNode?.removeChild(srdiv)
    srdiv = null
  })

  it('should render', async () => {
    await render(<Banner>Sample banner text.</Banner>)
    const text = page.getByText('Sample banner text.')
    await expect.element(text).toBeInTheDocument()
  })

  it('should render the `title` before the content', async () => {
    const { container } = await render(
      <Banner title="Banner title" transition="none">
        Sample banner text.
      </Banner>
    )

    await expect.element(page.getByText('Banner title')).toBeInTheDocument()
    expect(container).toMatchTextContent('Banner titleSample banner text.')
  })

  it('should render the icon provided as the `renderIcon` prop', async () => {
    const { container } = await render(
      <Banner renderIcon={DiamondInstUIIcon} transition="none">
        Sample banner text.
      </Banner>
    )
    const icon = container.querySelector('svg[class^="lucide"]')

    expect(icon).toHaveAttribute('name', 'Diamond')
  })

  it('should not render an icon when `renderIcon` is not provided', async () => {
    const { container } = await render(
      <Banner transition="none">Sample banner text.</Banner>
    )

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('should not render the Close button when `closeButtonLabel` is not provided', async () => {
    await render(<Banner>Sample banner text.</Banner>)
    const closeButton = page.getByRole('button')

    await expect.element(closeButton).not.toBeInTheDocument()
  })

  it('should call `onDismiss` when the close button is clicked with closeButtonLabel', async () => {
    const onDismiss = vi.fn()
    await render(
      <Banner closeButtonLabel="Close" onDismiss={onDismiss}>
        Sample banner text.
      </Banner>
    )
    const closeButton = page.getByRole('button')

    await userEvent.click(closeButton)

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should call `onDismiss` when Escape is pressed with closeButtonLabel', async () => {
    const onDismiss = vi.fn()
    await render(
      <Banner closeButtonLabel="Close" onDismiss={onDismiss} transition="none">
        Sample banner text.
      </Banner>
    )
    ;(page.getByRole('button').element() as HTMLElement).focus()
    await userEvent.keyboard('{Escape}')

    expect(onDismiss).toHaveBeenCalledTimes(1)
    await expect
      .element(page.getByText('Sample banner text.'))
      .not.toBeInTheDocument()
  })

  it('should not close on Escape without closeButtonLabel', async () => {
    const onDismiss = vi.fn()
    const { container } = await render(
      <Banner onDismiss={onDismiss} transition="none">
        <button>Action</button>
      </Banner>
    )
    ;(page.getByRole('button').element() as HTMLElement).focus()
    await userEvent.keyboard('{Escape}')

    expect(onDismiss).not.toHaveBeenCalled()
    expect(container).toMatchTextContent('Action')
  })

  it('should dismiss itself after `timeout` milliseconds', async () => {
    vi.useFakeTimers()
    try {
      const onDismiss = vi.fn()
      await render(
        <Banner timeout={1000} onDismiss={onDismiss} transition="none">
          Sample banner text.
        </Banner>
      )

      vi.advanceTimersByTime(999)
      expect(onDismiss).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(onDismiss).toHaveBeenCalledTimes(1)
    } finally {
      vi.useRealTimers()
    }
  })

  it('should provide the root element via `elementRef`', async () => {
    const elementRef = vi.fn()
    await render(<Banner elementRef={elementRef}>Sample banner text.</Banner>)

    expect(elementRef).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Banner
        title="Banner title"
        renderIcon={DiamondInstUIIcon}
        closeButtonLabel="Close"
        transition="none"
      >
        Sample banner text.
      </Banner>
    )
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  describe('with `liveRegion`', () => {
    it('should add the title and the text to the live region', async () => {
      const liveRegion = document.getElementById('_bannerLiveRegion')!
      await render(
        <Banner
          title="Banner title"
          transition="none"
          liveRegion={() => liveRegion}
        >
          Sample banner text.
        </Banner>
      )

      await vi.waitFor(() => {
        expect(liveRegion).toMatchTextContent(
          'Banner title Sample banner text.'
        )
      })
    })

    it('should make the live region polite', async () => {
      const liveRegion = document.getElementById('_bannerLiveRegion')!
      await render(
        <Banner transition="none" liveRegion={() => liveRegion}>
          Sample banner text.
        </Banner>
      )

      await vi.waitFor(() => {
        expect(liveRegion).toHaveAttribute('aria-live', 'polite')
      })
      expect(liveRegion).toHaveAttribute('aria-relevant', 'additions text')
      expect(liveRegion).toHaveAttribute('aria-atomic', 'false')
    })

    it('should accept a direct DOM element as liveRegion', async () => {
      const liveRegion = document.getElementById('_bannerLiveRegion')!
      await render(
        <Banner transition="none" liveRegion={liveRegion} isLiveRegionAtomic>
          Sample banner text.
        </Banner>
      )

      await vi.waitFor(() => {
        expect(liveRegion).toMatchTextContent('Sample banner text.')
      })
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
    })

    it('should close when told to, with transition', async () => {
      const liveRegion = document.getElementById('_bannerLiveRegion')!
      const { rerender } = await render(
        <Banner liveRegion={() => liveRegion}>Sample banner text.</Banner>
      )

      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(1)
      })

      await rerender(
        <Banner open={false} liveRegion={() => liveRegion}>
          Sample banner text.
        </Banner>
      )

      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(0)
      })
    })
  })
})
