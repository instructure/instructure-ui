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
import { page } from 'vitest/browser'
import { fireEvent } from '@testing-library/dom'
import { describe, it, expect, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { Card } from '@instructure/ui-card/latest'
import type { CardProps } from '@instructure/ui-card/latest'

// Every theme puts breakpointMd at 20rem and breakpointLg at 40rem, so these
// widths pin a Card to one container-query step each.
const BELOW_MD = '200px'
const BETWEEN = '400px'
const ABOVE_LG = '800px'

// Card renders an outer container-query element wrapping the padded content.
const partsOf = (root: HTMLElement) => {
  const card = root.firstElementChild as HTMLElement
  return { card, content: card.firstElementChild as HTMLElement }
}

const renderCard = async (width: string, props: CardProps = {}) => {
  const { container } = await render(
    <div style={{ width }}>
      <Card {...props}>Card content</Card>
    </div>
  )
  return partsOf(container.firstElementChild as HTMLElement)
}

const paddingOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).paddingTop)

describe('<Card />', () => {
  describe('for a11y', () => {
    it('should be accessible', async () => {
      const { container } = await render(<Card>Card content</Card>)
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('should be accessible with a nested Card inside a base Card', async () => {
      const { container } = await render(
        <Card>
          <Card variant="nested">Nested content</Card>
        </Card>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })
  })

  describe('with the default props', () => {
    it('should render its children', async () => {
      await render(<Card>Card content</Card>)
      await expect.element(page.getByText('Card content')).toBeVisible()
    })

    it('should render the base variant', async () => {
      const { content } = await renderCard(BETWEEN)
      const contentStyle = getComputedStyle(content)
      expect(contentStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(contentStyle.boxShadow).not.toBe('none')
      expect(contentStyle.borderTopStyle).toBe('none')
    })

    it('should fill the width of its container', async () => {
      const { card } = await renderCard(BETWEEN)
      expect(card.getBoundingClientRect().width).toBe(400)
    })

    it('should wrap content that has no break opportunity', async () => {
      const { content } = await renderCard(BELOW_MD)
      expect(getComputedStyle(content).overflowWrap).toBe('anywhere')
    })
  })

  describe('when variant is nested', () => {
    it('should draw a border and no background or shadow', async () => {
      const { content } = await renderCard(BETWEEN, { variant: 'nested' })
      const contentStyle = getComputedStyle(content)
      expect(contentStyle.borderTopWidth).toBe('1px')
      expect(contentStyle.borderTopStyle).toBe('solid')
      expect(contentStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)')
      expect(contentStyle.boxShadow).toBe('none')
    })
  })

  describe('for responsive padding and border radius', () => {
    it('should make the Card its own query container', async () => {
      const { card } = await renderCard(BETWEEN)
      expect(getComputedStyle(card).containerType).toBe('inline-size')
    })

    it('should step padding up as the Card gets wider', async () => {
      const { content: small } = await renderCard(BELOW_MD)
      const { content: medium } = await renderCard(BETWEEN)
      const { content: large } = await renderCard(ABOVE_LG)

      expect(paddingOf(small)).toBeLessThan(paddingOf(medium))
      expect(paddingOf(medium)).toBeLessThan(paddingOf(large))
    })

    it('should take border radius from the token for its step', async () => {
      // the canvas theme flattens every border radius to the same value, so
      // overriding is the only way to tell the steps apart
      const radiusOverride = {
        borderRadiusBaseSm: '2px',
        borderRadiusBaseLg: '30px'
      }
      const { content: small } = await renderCard(BELOW_MD, {
        themeOverride: radiusOverride
      })
      const { content: large } = await renderCard(ABOVE_LG, {
        themeOverride: radiusOverride
      })
      const radiusOf = (element: HTMLElement) =>
        getComputedStyle(element).borderTopLeftRadius

      expect(radiusOf(small)).toBe('2px')
      expect(radiusOf(large)).toBe('30px')
    })

    it('should hold one step across a range of widths rather than scale continuously', async () => {
      const { content: narrow } = await renderCard('120px')
      const { content: wider } = await renderCard('300px')

      expect(paddingOf(narrow)).toBe(paddingOf(wider))
    })

    it('should read its own width, not the viewport width', async () => {
      const { container } = await render(
        <div>
          <div style={{ width: BELOW_MD }} data-testid="narrow">
            <Card>Card content</Card>
          </div>
          <div style={{ width: ABOVE_LG }} data-testid="wide">
            <Card>Card content</Card>
          </div>
        </div>
      )
      const cardIn = (testid: string) =>
        partsOf(
          container.querySelector(`[data-testid="${testid}"]`) as HTMLElement
        ).content

      // both Cards share one viewport, so only their own widths can put them
      // on different steps
      expect(paddingOf(cardIn('narrow'))).toBeLessThan(
        paddingOf(cardIn('wide'))
      )
    })

    it('should scale a nested Card from its own width, not its parent step', async () => {
      const { container } = await render(
        <div>
          <div style={{ width: BELOW_MD }} data-testid="narrow-parent">
            <Card>
              <Card variant="nested">Nested content</Card>
            </Card>
          </div>
          <div style={{ width: ABOVE_LG }} data-testid="wide-parent">
            <Card>
              <Card variant="nested">Nested content</Card>
            </Card>
          </div>
        </div>
      )
      const nestedIn = (testid: string) => {
        const parent = container.querySelector(
          `[data-testid="${testid}"]`
        ) as HTMLElement
        return partsOf(partsOf(parent).content).content
      }

      expect(paddingOf(nestedIn('narrow-parent'))).toBeLessThan(
        paddingOf(nestedIn('wide-parent'))
      )
    })

    it('should move the steps when the breakpoints are overridden', async () => {
      const { content: defaultPadding } = await renderCard(BETWEEN)
      const { content: smallStepPadding } = await renderCard(BETWEEN, {
        themeOverride: { breakpointMd: '50rem' }
      })
      const { content: referenceSmall } = await renderCard(BELOW_MD)

      expect(paddingOf(smallStepPadding)).not.toBe(paddingOf(defaultPadding))
      expect(paddingOf(smallStepPadding)).toBe(paddingOf(referenceSmall))
    })

    it('should scale padding when the padding tokens are overridden', async () => {
      const { content } = await renderCard(BETWEEN, {
        themeOverride: { paddingBaseMd: '3.5rem' }
      })
      expect(paddingOf(content)).toBe(56)
    })
  })

  describe('with other props', () => {
    it('should pass valid HTML attributes to the outermost element', async () => {
      const { card } = await renderCard(BETWEEN, {
        id: 'my-card',
        role: 'group',
        'aria-label': 'Assignments',
        'data-position': 'first'
      } as CardProps)

      expect(card).toHaveAttribute('id', 'my-card')
      expect(card).toHaveAttribute('role', 'group')
      expect(card).toHaveAttribute('aria-label', 'Assignments')
      expect(card).toHaveAttribute('data-position', 'first')
    })

    it('should call event handlers', async () => {
      const onClick = vi.fn()
      const { card } = await renderCard(BETWEEN, { onClick } as CardProps)

      fireEvent.click(card, { button: 0, detail: 1 })

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not leak the variant prop to the DOM', async () => {
      const { card, content } = await renderCard(BETWEEN, {
        variant: 'nested'
      })

      expect(card).not.toHaveAttribute('variant')
      expect(content).not.toHaveAttribute('variant')
    })
  })
})
