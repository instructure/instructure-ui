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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { Tooltip } from '@instructure/ui-tooltip/latest'

describe('<Tooltip />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    await render(
      <Tooltip renderTip="Hello">
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )
    const tip = page.getByRole('tooltip', { includeHidden: true }).element()

    expect(tip).toBeInTheDocument()
    expect(tip).toMatchTextContent('Hello')
  })

  it('should render children', async () => {
    await render(
      <Tooltip renderTip="Hello">
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    const tip = page.getByRole('tooltip', { includeHidden: true }).element()
    const trigger = page.getByTestId('trigger').element()

    expect(trigger).toBeInTheDocument()
    expect(trigger).toMatchTextContent('Hover or focus me')
    expect(trigger).toHaveAttribute('href', 'example.html')
    expect(tip).toMatchTextContent('Hello')
  })

  it('should have an aria-describedby attribute', async () => {
    await render(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )
    const trigger = page.getByTestId('trigger').element()
    const tooltip = page.getByRole('tooltip', { includeHidden: true }).element()

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('should accept a function for renderTip', async () => {
    await render(
      <Tooltip renderTip={() => 'Hello'}>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const content = page.getByText('Hello').element()

    expect(content).toBeInTheDocument()
  })

  describe('using as', () => {
    it('should render children', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const tip = page.getByRole('tooltip', { includeHidden: true }).element()
      const trigger = page.getByText('Hover or focus me').element()

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('href', 'example.html')
      expect(trigger.tagName).toBe('A')

      expect(tip).toBeInTheDocument()
      expect(tip).toMatchTextContent('Hello')
    })

    it('should have an aria-describedby attribute', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const trigger = page.getByText('Hover or focus me').element()
      const tooltip = page
        .getByRole('tooltip', { includeHidden: true })
        .element()

      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('should pass down the href attribute', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const link = page.getByText('Hover or focus me').element()

      expect(link).toHaveAttribute('href', 'example.html')
    })
  })

  describe('using children', () => {
    it('should call onClick of child', async () => {
      const onClick = vi.fn()

      await render(
        <Tooltip renderTip={<h2>Hello</h2>}>
          <button onClick={onClick}>Hover or focus me</button>
        </Tooltip>
      )

      const button = page.getByText('Hover or focus me')

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Component tests', () => {
    // The real pointer stays wherever an earlier test left it, so it can
    // already sit on the trigger when a test renders and open the tooltip on
    // its own. Every example below renders this spacer so the pointer can be
    // parked away from the trigger first.
    const ParkingSpot = () => (
      <div data-testid="pointerParkingSpot" style={{ height: 200 }} />
    )

    const getTip = (trigger: Element) => {
      const id = trigger.getAttribute('data-position-target')
      return document.querySelector<HTMLElement>(
        `span[data-position-content="${id}"]`
      )!
    }

    it('should render the tip offscreen', async () => {
      await render(
        <div>
          <Tooltip renderTip="Hello">
            <a data-testid="trigger" href="example.html">
              Hover or focus me
            </a>
          </Tooltip>
          <ParkingSpot />
        </div>
      )
      const trigger = page.getByTestId('trigger')
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      const tip = getTip(trigger.element())

      await vi.waitFor(() => {
        expect(tip).toMatchTextContent('Hello')
        expect(getComputedStyle(tip).display).toBe('none')
        expect(getComputedStyle(tip).left).toBe('-159984px')
      })

      await userEvent.hover(trigger)

      await vi.waitFor(() => {
        expect(getComputedStyle(tip).display).toBe('block')
        expect(getComputedStyle(tip).left).toBe('0px')
      })
    })

    it('should show tip by default when defaultIsShowingContent is true', async () => {
      await render(
        <Tooltip renderTip="Hello" defaultIsShowingContent>
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      )
      const tip = getTip(page.getByTestId('trigger').element())

      await vi.waitFor(() => {
        expect(tip).toMatchTextContent('Hello')
        expect(getComputedStyle(tip).display).toBe('block')
        expect(getComputedStyle(tip).left).toBe('0px')
      })
    })

    it('should show tip when isShowingContent is true', async () => {
      await render(
        <Tooltip renderTip={<h2>Hello</h2>} isShowingContent>
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      )
      const tip = getTip(page.getByTestId('trigger').element())

      await vi.waitFor(() => {
        expect(tip).toMatchTextContent('Hello')
        expect(getComputedStyle(tip).display).toBe('block')
        expect(getComputedStyle(tip).left).toBe('0px')
      })
    })

    it('should call onShowContent and on onHideContent', async () => {
      const onShowContent = vi.fn()
      const onHideContent = vi.fn()

      await render(
        <div>
          <button>For dismiss</button>
          <Tooltip
            renderTip={<h2>Hello</h2>}
            onShowContent={onShowContent}
            onHideContent={onHideContent}
          >
            <a data-testid="trigger" href="example.html">
              Hover or focus me
            </a>
          </Tooltip>
          <ParkingSpot />
        </div>
      )
      const trigger = page.getByTestId('trigger')
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      const tip = getTip(trigger.element())

      await userEvent.hover(trigger)

      await expect.element(page.getByText('Hello')).toBeVisible()
      await vi.waitFor(() => {
        expect(onShowContent).toHaveBeenCalledTimes(1)
      })

      await userEvent.hover(page.getByText('For dismiss'))

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
        expect(onHideContent).toHaveBeenCalledTimes(1)
      })
    })

    it('should remain visible when Tooltip is hovered over', async () => {
      await render(
        <div>
          <Tooltip renderTip={<h2>Hello</h2>}>
            <a data-testid="trigger" href="example.html">
              Hover me!
            </a>
          </Tooltip>
          <ParkingSpot />
        </div>
      )
      const trigger = page.getByTestId('trigger')
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      const tip = getTip(trigger.element())

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
      })

      await userEvent.hover(trigger)

      await vi.waitFor(() => {
        expect(tip).toBeVisible()
      })

      await userEvent.hover(page.getByText('Hello'))

      await vi.waitFor(() => {
        expect(tip).toBeVisible()
      })
    })

    it('should close when Esc key is pressed', async () => {
      await render(
        <div>
          <Tooltip renderTip={<h2>Hello</h2>}>
            <a data-testid="trigger" href="example.html">
              Hover me!
            </a>
          </Tooltip>
          <ParkingSpot />
        </div>
      )
      const trigger = page.getByTestId('trigger')
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      const tip = getTip(trigger.element())

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
      })

      trigger.element().focus()

      await vi.waitFor(() => {
        expect(tip).toBeVisible()
      })

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
      })
    })

    it('should close when Esc key is pressed and Tooltip is hovered over', async () => {
      await render(
        <div>
          <Tooltip renderTip={<h2>Hello</h2>}>
            <a data-testid="trigger" href="example.html">
              Hover me!
            </a>
          </Tooltip>
          <ParkingSpot />
        </div>
      )
      const trigger = page.getByTestId('trigger')
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))

      const tip = getTip(trigger.element())

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
      })

      await userEvent.hover(trigger)

      await vi.waitFor(() => {
        expect(tip).toBeVisible()
      })

      await userEvent.hover(page.getByText('Hello'))
      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(tip).not.toBeVisible()
      })
    })
  })
})
