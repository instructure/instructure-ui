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
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Pill } from '@instructure/ui-pill/latest'
import { IconEyeLine } from '@instructure/ui-icons'

describe('<Pill />', () => {
  it('should render', async () => {
    const { container } = await render(<Pill>Overdue</Pill>)
    const pill = container.querySelector('div[class$="-pill"]')

    expect(pill).toBeInTheDocument()
    expect(pill).toHaveTextContent('Overdue')
  })

  it('should display text', async () => {
    const { container } = await render(<Pill>Overdue</Pill>)

    expect(container).toHaveTextContent('Overdue')
  })

  it('should display status text', async () => {
    const { container } = await render(
      <Pill statusLabel="Statuslabel">Overdue</Pill>
    )

    expect(container).toHaveTextContent('Statuslabel:')
    expect(container).toHaveTextContent('Overdue')
  })

  it('should render icon text', async () => {
    const { container } = await render(
      <Pill
        statusLabel="Statuslabel"
        renderIcon={<IconEyeLine color="auto" title="Love" />}
      >
        Overdue
      </Pill>
    )

    const svg = container.querySelector('svg')

    expect(container).toHaveTextContent('Statuslabel:')
    expect(container).toHaveTextContent('Overdue')
    expect(svg).toHaveAttribute('name', 'IconEye')
  })

  it('should be accessible', async () => {
    const { container } = await render(<Pill>Overdue</Pill>)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('Component tests', () => {
    // the real cursor stays where the previous test left it, which can keep a
    // Tooltip open: park it off-component before each test
    beforeEach(async () => {
      const parkingSpot = document.createElement('div')
      parkingSpot.style.cssText =
        'position:fixed;right:0;bottom:0;width:20px;height:20px'
      document.body.appendChild(parkingSpot)
      await userEvent.hover(parkingSpot)
      parkingSpot.remove()
    })

    it('should render without a Tooltip when text does not overflow max-width', async () => {
      await render(<Pill>hello</Pill>)

      await page.getByText('hello').hover()

      expect(document.querySelector('span[role="tooltip"]')).toBeNull()
    })

    it('should render a Tooltip when text overflows max-width', async () => {
      const text =
        'some really super incredibly long text that will force overflow'
      await render(<Pill>{text}</Pill>)
      const trigger = document.querySelector<HTMLElement>(
        'span[data-popover-trigger="true"]'
      )!
      const tooltip = () =>
        document.querySelector<HTMLElement>('span[role="tooltip"]')!

      expect(trigger).toHaveTextContent(text)
      expect(tooltip()).not.toBeVisible()

      await userEvent.hover(trigger)

      await vi.waitFor(() => {
        expect(tooltip()).toBeVisible()
      })
      expect(tooltip()).toHaveTextContent(text)
    })
  })
})
