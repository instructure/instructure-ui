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
import { runAxeCheck } from '@instructure/ui-axe-check'

import '@testing-library/jest-dom'
import { Card } from '@instructure/ui-card/latest'

// Values come from the generated Card theme tokens, see
// packages/ui-themes/src/themes/newThemeTokens/<theme>/components/card.ts
const BREAKPOINT_MD = '20rem'
const BREAKPOINT_LG = '40rem'

const renderCard = (props = {}) => {
  const { container } = render(<Card {...props}>content</Card>)
  const card = container.querySelector('div')!
  return { card, style: getComputedStyle(card) }
}

describe('<Card />', () => {
  describe('for a11y', () => {
    it('should be accessible', async () => {
      const { container } = render(<Card>content</Card>)
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })
  })

  it('should render children', () => {
    render(<Card>Hello world</Card>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should render a div', () => {
    const { card } = renderCard()
    expect(card.tagName).toBe('DIV')
  })

  it('should pass through arbitrary HTML attributes', () => {
    render(<Card id="my-card">content</Card>)
    expect(document.getElementById('my-card')).toBeInTheDocument()
  })

  it('should not leak component props onto the DOM node', () => {
    const { card } = renderCard({ variant: 'nested', size: 'lg' })
    expect(card).not.toHaveAttribute('variant')
    expect(card).not.toHaveAttribute('size')
  })

  describe('variant', () => {
    it('base should render a background and a box-shadow', () => {
      const { style } = renderCard({ variant: 'base' })
      // an opaque surface colour, not the transparent jsdom default
      expect(style.backgroundColor).not.toBe('')
      expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(style.boxShadow).toContain('rgba')
    })

    it('nested should render a border instead of a background and shadow', () => {
      const { style } = renderCard({ variant: 'nested' })
      // positively assert the border the nested variant *does* apply
      expect(style.borderStyle).toBe('solid')
      expect(style.borderWidth).toBe('1px')
      expect(style.borderColor).not.toBe('')
      // and that it opts out of the base surface treatment
      expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)')
      expect(style.boxShadow).toBe('')
    })

    it('should apply a smaller padding for nested than for base at the same size', () => {
      const base = renderCard({ variant: 'base', size: 'md' })
      const nested = renderCard({ variant: 'nested', size: 'md' })
      expect(base.style.padding).not.toBe(nested.style.padding)
      expect(parseFloat(nested.style.padding)).toBeLessThan(
        parseFloat(base.style.padding)
      )
    })
  })

  describe('size', () => {
    it('sm should cap width at the md breakpoint with no min-width', () => {
      const { style } = renderCard({ size: 'sm' })
      expect(style.maxWidth).toBe(BREAKPOINT_MD)
      expect(style.minWidth).toBe('auto')
    })

    it('md should span the md and lg breakpoints', () => {
      const { style } = renderCard({ size: 'md' })
      expect(style.minWidth).toBe(BREAKPOINT_MD)
      expect(style.maxWidth).toBe(BREAKPOINT_LG)
    })

    it('lg should start at the lg breakpoint with no max-width', () => {
      const { style } = renderCard({ size: 'lg' })
      expect(style.minWidth).toBe(BREAKPOINT_LG)
      expect(style.maxWidth).toBe('none')
    })

    it('should grow padding from sm through lg', () => {
      const sm = parseFloat(renderCard({ size: 'sm' }).style.padding)
      const md = parseFloat(renderCard({ size: 'md' }).style.padding)
      const lg = parseFloat(renderCard({ size: 'lg' }).style.padding)
      expect(sm).toBeLessThan(md)
      expect(md).toBeLessThan(lg)
    })

    // The documented contract is that `nested` uses a smaller radius than
    // `base`. Absolute radii are deliberately not asserted: the legacy Canvas
    // themes flatten every radius token to the same value, so only the
    // relationship between the two variants holds across all four themes.
    it.each(['sm', 'md', 'lg'] as const)(
      'nested should not have a larger border-radius than base at size %s',
      (size) => {
        const base = parseFloat(
          renderCard({ variant: 'base', size }).style.borderRadius
        )
        const nested = parseFloat(
          renderCard({ variant: 'nested', size }).style.borderRadius
        )
        expect(nested).toBeLessThanOrEqual(base)
      }
    )
  })

  describe('defaults', () => {
    it('should default to the base variant at the md size', () => {
      const bare = renderCard()
      const explicit = renderCard({ variant: 'base', size: 'md' })
      expect(bare.style.padding).toBe(explicit.style.padding)
      expect(bare.style.minWidth).toBe(BREAKPOINT_MD)
      expect(bare.style.maxWidth).toBe(BREAKPOINT_LG)
      expect(bare.style.boxShadow).toContain('rgba')
    })
  })
})
