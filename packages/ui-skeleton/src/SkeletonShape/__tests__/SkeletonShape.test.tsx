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
import { runAxeCheck } from '@instructure/ui-axe-check'
import { describe, it, expect } from 'vitest'

import { InstUISettingsProvider } from '@instructure/emotion'
import { canvas, canvasHighContrast } from '@instructure/ui-themes'

import { SkeletonLoader } from '@instructure/ui-skeleton'

/** Every stylesheet Emotion has inserted, concatenated. */
const allCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('')

const shapeIn = (container: HTMLElement) =>
  container.querySelector('[data-skeleton-shape]') as HTMLElement

/**
 * Every CSS rule Emotion generated for this element's own class, including the
 * ones nested in media queries — the shimmer lives inside a
 * `prefers-reduced-motion` block, so stopping at the first `}` would miss it.
 */
const ownRules = (el: HTMLElement) => {
  const cls = el.className.split(' ').find((c) => c.startsWith('css-'))
  if (!cls) return ''
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('')

  const blocks: string[] = []
  let from = 0
  for (;;) {
    const start = css.indexOf(`.${cls}{`, from)
    if (start === -1) break
    const end = css.indexOf('}', start)
    blocks.push(css.slice(start, end))
    from = end + 1
  }
  return blocks.join('')
}

describe('<SkeletonLoader.Shape />', () => {
  describe('accessibility', () => {
    it('is hidden from assistive technology', async () => {
      const { container } = await render(<SkeletonLoader.Shape />)
      expect(shapeIn(container)).toHaveAttribute('aria-hidden', 'true')
    })

    it('is not focusable', async () => {
      const { container } = await render(<SkeletonLoader.Shape />)
      expect(shapeIn(container)).not.toHaveAttribute('tabindex')
    })

    it('exposes no text content', async () => {
      const { container } = await render(<SkeletonLoader.Shape lines={3} />)
      expect(shapeIn(container).textContent).toBe('')
    })

    it('meets a11y standards', async () => {
      const { container } = await render(<SkeletonLoader.Shape lines={3} />)
      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  describe('layout', () => {
    // The root is a <span>. Asserting the CSS rules alone would not have caught
    // it rendering at zero height because the element was still display:inline.
    it('occupies real space for every shape', async () => {
      for (const props of [
        { shape: 'text' as const },
        { shape: 'text' as const, lines: 3 },
        { shape: 'rectangle' as const },
        { shape: 'rectangle' as const, height: '6rem' },
        { shape: 'circle' as const, diameter: '3rem' }
      ]) {
        const { container } = await render(
          <div style={{ width: '20rem' }}>
            <SkeletonLoader.Shape {...props} animate={false} />
          </div>
        )
        const box = shapeIn(container).getBoundingClientRect()

        expect(
          box.height,
          `height for ${JSON.stringify(props)}`
        ).toBeGreaterThan(0)
        expect(box.width, `width for ${JSON.stringify(props)}`).toBeGreaterThan(
          0
        )
      }
    })

    it('stacks multi-line rows to the full block height', async () => {
      const { container } = await render(
        <div style={{ width: '20rem' }}>
          <SkeletonLoader.Shape
            shape="text"
            size="md"
            lines={3}
            animate={false}
          />
        </div>
      )
      const shape = shapeIn(container)
      const rows = Array.from(shape.children) as HTMLElement[]
      const total = rows.reduce(
        (sum, r) => sum + r.getBoundingClientRect().height,
        0
      )

      // Rows fill the block exactly: the leading lives inside each row rather
      // than as a gap between them.
      expect(rows).toHaveLength(3)
      expect(total).toBeCloseTo(shape.getBoundingClientRect().height, 0)
    })
  })

  describe('text sizing', () => {
    it('renders a single row with no children', async () => {
      const { container } = await render(<SkeletonLoader.Shape shape="text" />)
      expect(shapeIn(container).children).toHaveLength(0)
    })

    it('renders one child per line for multi-line text', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="text" lines={4} />
      )
      expect(shapeIn(container).children).toHaveLength(4)
    })

    it('reserves exactly lines x row-height at the heading leading', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="text" lines={3} leading="heading" />
      )
      expect(ownRules(shapeIn(container))).toContain('calc(3 * 1.25em)')
    })

    it('reserves the taller block at the body-text leading', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="text" lines={3} leading="text" />
      )
      expect(ownRules(shapeIn(container))).toContain('calc(3 * 1.5em)')
    })

    it('drives the ramp from font-size so the em units resolve', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="text" size="xl" />
      )
      // xl is a literal 2rem in the tokens, on every theme.
      expect(ownRules(shapeIn(container))).toContain('font-size:2rem')
    })
  })

  describe('rectangle', () => {
    it('reserves space with aspect-ratio when no height is given', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="rectangle" />
      )
      expect(ownRules(shapeIn(container))).toContain('aspect-ratio:16/9')
    })

    it('prefers an explicit height over aspect-ratio', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="rectangle" height="10rem" />
      )
      const rules = ownRules(shapeIn(container))
      expect(rules).toContain('height:10rem')
      expect(rules).not.toContain('aspect-ratio')
    })
  })

  describe('circle', () => {
    it('is square at the given diameter', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape shape="circle" diameter="3rem" />
      )
      const rules = ownRules(shapeIn(container))
      expect(rules).toContain('width:3rem')
      expect(rules).toContain('height:3rem')
    })
  })

  describe('motion', () => {
    it('loops for as long as the skeleton is shown', async () => {
      const { container } = await render(<SkeletonLoader.Shape />)
      const rules = ownRules(shapeIn(container))

      expect(rules).toContain('animation-iteration-count:infinite')
      expect(rules).toContain('animation-duration:1500ms')
      expect(rules).not.toContain('animation-fill-mode')
    })

    it('puts the loop behind the reduced-motion query, its only stop', async () => {
      const { container } = await render(<SkeletonLoader.Shape />)
      const el = shapeIn(container)
      const cls = el.className.split(' ').find((c) => c.startsWith('css-'))
      const css = allCss()

      expect(css).toMatch(
        new RegExp(
          `@media \\(prefers-reduced-motion:\\s*no-preference\\)\\{\\.${cls}\\{`
        )
      )

      const staticStart = css.indexOf(`.${cls}{`)
      const staticRules = css.slice(staticStart, css.indexOf('}', staticStart))
      expect(staticRules).not.toContain('animation-name')
    })

    it('pads the gradient so a pass restart cannot be seen', async () => {
      const { container } = await render(<SkeletonLoader.Shape />)
      const rules = ownRules(shapeIn(container))

      const gradient = /linear-gradient\(90deg,([^)]*\)[^)]*)\)/.exec(
        rules
      )?.[0]
      expect(gradient).toBeTruthy()

      const stops =
        gradient!.match(/(rgb\([^)]*\)|#[0-9a-f]{3,8})\s+\d+%/gi) ?? []
      expect(stops).toHaveLength(5)

      // First two and last two stops share a colour: the flat shoulders.
      const colourAt = (i: number) => stops[i].split(/\s+/)[0]
      expect(colourAt(0)).toEqual(colourAt(1))
      expect(colourAt(3)).toEqual(colourAt(4))

      // And the middle stop is the highlight, not the base.
      expect(colourAt(2)).not.toEqual(colourAt(0))
    })

    it('emits no animation at all when animate is false', async () => {
      const { container } = await render(
        <SkeletonLoader.Shape animate={false} />
      )
      expect(ownRules(shapeIn(container))).not.toContain('animation-name')
    })

    it('shows a visible highlight when static, not a flat fill', async () => {
      const staticRules = (el: HTMLElement) => {
        // Only the rules outside the media query. What a reduced-motion user,
        // an animate={false} snapshot, and the settled state all render.
        const cls = el.className.split(' ').find((c) => c.startsWith('css-'))
        const css = allCss()
        const start = css.indexOf(`.${cls}{`)
        return css.slice(start, css.indexOf('}', start))
      }

      for (const props of [{}, { animate: false }]) {
        const { container } = await render(<SkeletonLoader.Shape {...props} />)
        const rules = staticRules(shapeIn(container))

        // The gradient spans the shape, so the highlight sits inside the
        // painted area instead of being parked off the edge.
        expect(rules).toContain('linear-gradient')

        // Wider than the shape, or percentage positions have no travel to
        // resolve against and the sweep silently does nothing.
        expect(rules).toContain('background-size:200% 100%')

        // Parked inside the shape, not off the edge.
        expect(rules).toContain('background-position:70% 0')
      }
    })
  })

  describe('theming', () => {
    it('resolves a different fill per theme', async () => {
      const fillFor = async (
        theme: typeof canvas | typeof canvasHighContrast
      ) => {
        const { container } = await render(
          <InstUISettingsProvider theme={theme}>
            <SkeletonLoader.Shape />
          </InstUISettingsProvider>
        )
        return ownRules(shapeIn(container))
      }

      expect(await fillFor(canvas)).not.toEqual(
        await fillFor(canvasHighContrast)
      )
    })
  })
})
