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
import { describe, it, expect } from 'vitest'
import { InstUISettingsProvider } from '@instructure/emotion'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { ImageCard } from '@instructure/ui-card/latest'
import type { ImageCardProps } from '@instructure/ui-card/latest'

// Every theme puts breakpointMd at 20rem and breakpointLg at 40rem, so these
// widths pin an ImageCard to one size each.
const BELOW_MD = '200px'
const BETWEEN = '400px'
const ABOVE_LG = '800px'

// a 1x1 transparent gif keeps the tests off the network
const SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// ImageCard renders an outer container-query element, a padded surface inside
// it, and a wrapper around the children inside the surface.
const partsOf = (root: HTMLElement) => {
  const card = root.firstElementChild as HTMLElement
  const container = card.firstElementChild as HTMLElement
  return {
    card,
    container,
    img: container.querySelector('img') as HTMLImageElement,
    heading: container.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement,
    content: container.lastElementChild as HTMLElement
  }
}

const renderImageCard = async (
  width: string,
  props: Partial<ImageCardProps> = {}
) => {
  const { container } = await render(
    <div style={{ width }}>
      <ImageCard title="Card title" src={SRC} alt="Card image" {...props}>
        <span>Card content</span>
      </ImageCard>
    </div>
  )
  return partsOf(container.firstElementChild as HTMLElement)
}

// the canvas theme gives every card title the same font size, so the title
// sizes are overridden to tell the steps apart
const headingSizeOverride = {
  components: {
    Heading: {
      titleCardMini: { fontSize: '10px' },
      titleCardRegular: { fontSize: '20px' },
      titleCardLarge: { fontSize: '30px' }
    }
  }
}

// every step gets a distinct value, because the canvas theme repeats values
// across steps
const spacingOverride = {
  paddingBaseSm: '3px',
  paddingBaseMd: '5px',
  paddingBaseLg: '7px',
  borderRadiusBaseSm: '2px',
  borderRadiusBaseMd: '4px',
  borderRadiusBaseLg: '6px',
  imgBorderRadiusSm: '8px',
  imgBorderRadiusMd: '10px',
  imgBorderRadiusLg: '12px',
  imgTextGapSm: '9px',
  imgTextGapMd: '11px',
  imgTextGapLg: '13px',
  titleContentGapSm: '15px',
  titleContentGapMd: '17px',
  titleContentGapLg: '19px'
}

const paddingOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).paddingTop)

const fontSizeOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).fontSize)

describe('<ImageCard />', () => {
  describe('for a11y', () => {
    it('should be accessible', async () => {
      const { container } = await render(
        <ImageCard title="Card title" src={SRC} alt="Card image">
          Card content
        </ImageCard>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('should expose the image to assistive technology by its alt text', async () => {
      await render(<ImageCard title="Card title" src={SRC} alt="A cat" />)
      await expect
        .element(page.getByRole('img', { name: 'A cat' }))
        .toBeVisible()
    })
  })

  describe('with the default props', () => {
    it('should render the title as a heading', async () => {
      await render(<ImageCard title="Card title" src={SRC} alt="Card image" />)
      await expect
        .element(page.getByRole('heading', { name: 'Card title' }))
        .toBeVisible()
    })

    it('should render its children', async () => {
      const { content } = await renderImageCard(BETWEEN)
      expect(content.textContent).toBe('Card content')
    })

    it('should render without children', async () => {
      const { container } = await render(
        <div>
          <ImageCard title="Card title" src={SRC} alt="Card image" />
        </div>
      )
      const { content } = partsOf(container.firstElementChild as HTMLElement)
      expect(content.textContent).toBe('')
    })

    it('should render the image with the given src', async () => {
      const { img } = await renderImageCard(BETWEEN)
      expect(img.getAttribute('src')).toBe(SRC)
    })

    it('should render the image, then the title, then the children', async () => {
      const { container, img, heading, content } = await renderImageCard(
        BETWEEN
      )

      expect(Array.from(container.children)).toEqual([img, heading, content])
    })

    it('should fill the width of its container', async () => {
      const { card } = await renderImageCard(BETWEEN)
      expect(card.getBoundingClientRect().width).toBe(400)
    })

    it('should draw a background color and a shadow', async () => {
      const { container } = await renderImageCard(BETWEEN)
      const style = getComputedStyle(container)
      expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(style.boxShadow).not.toBe('none')
    })

    it('should wrap content that has no break opportunity', async () => {
      const { container } = await renderImageCard(BELOW_MD)
      expect(getComputedStyle(container).overflowWrap).toBe('anywhere')
    })
  })

  describe('for the image', () => {
    it('should fill the width inside the padding', async () => {
      const { img, container } = await renderImageCard(BETWEEN)
      const style = getComputedStyle(container)

      expect(img.getBoundingClientRect().width).toBe(
        container.getBoundingClientRect().width -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight)
      )
    })

    it('should keep the aspect ratio from the theme', async () => {
      const { img } = await renderImageCard(BETWEEN, {
        themeOverride: { imgAspectRatio: 2 }
      })
      const { width, height } = img.getBoundingClientRect()
      expect(width / height).toBeCloseTo(2, 2)
    })

    it('should set the alt text on the image', async () => {
      const { img } = await renderImageCard(BETWEEN, { alt: 'A cat' })
      expect(img.getAttribute('alt')).toBe('A cat')
    })

    it('should crop the image instead of stretching it', async () => {
      const { img } = await renderImageCard(BETWEEN)
      expect(getComputedStyle(img).objectFit).toBe('cover')
    })
  })

  describe('for responsive spacing', () => {
    it('should step padding up as the card gets wider', async () => {
      const { container: small } = await renderImageCard(BELOW_MD)
      const { container: medium } = await renderImageCard(BETWEEN)
      const { container: large } = await renderImageCard(ABOVE_LG)

      expect(paddingOf(small)).toBeLessThan(paddingOf(medium))
      expect(paddingOf(medium)).toBeLessThan(paddingOf(large))
    })

    it.each([
      [BELOW_MD, '3px', '2px', '8px'],
      [BETWEEN, '5px', '4px', '10px'],
      [ABOVE_LG, '7px', '6px', '12px']
    ])(
      'should take padding and radii from the tokens for a %s wide card',
      async (width, padding, radius, imgRadius) => {
        const { container, img } = await renderImageCard(width, {
          themeOverride: spacingOverride
        })
        const style = getComputedStyle(container)

        expect(style.paddingTop).toBe(padding)
        expect(style.borderTopLeftRadius).toBe(radius)
        expect(getComputedStyle(img).borderTopLeftRadius).toBe(imgRadius)
      }
    )

    it.each([
      [BELOW_MD, '9px', '15px'],
      [BETWEEN, '11px', '17px'],
      [ABOVE_LG, '13px', '19px']
    ])(
      'should take the image and title gaps from the tokens for a %s wide card',
      async (width, imgGap, titleGap) => {
        const { img, content } = await renderImageCard(width, {
          themeOverride: spacingOverride
        })

        expect(getComputedStyle(img).marginBottom).toBe(imgGap)
        expect(getComputedStyle(content).marginTop).toBe(titleGap)
      }
    )

    it('should read its own width, not the viewport width', async () => {
      const { container } = await render(
        <div>
          <div style={{ width: BELOW_MD }} data-testid="narrow">
            <ImageCard title="Narrow" src={SRC} alt="Card image" />
          </div>
          <div style={{ width: ABOVE_LG }} data-testid="wide">
            <ImageCard title="Wide" src={SRC} alt="Card image" />
          </div>
        </div>
      )
      const narrow = partsOf(
        container.querySelector('[data-testid="narrow"]') as HTMLElement
      )
      const wide = partsOf(
        container.querySelector('[data-testid="wide"]') as HTMLElement
      )

      expect(paddingOf(narrow.container)).toBeLessThan(
        paddingOf(wide.container)
      )
    })
  })

  describe('for the title size', () => {
    const renderWithTitleSizes = (width: string) =>
      render(
        <InstUISettingsProvider themeOverride={headingSizeOverride}>
          <div style={{ width }} data-testid="wrapper">
            <ImageCard title="Card title" src={SRC} alt="Card image" />
          </div>
        </InstUISettingsProvider>
      )

    const headingOf = (container: HTMLElement) =>
      container.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement

    it.each([
      [BELOW_MD, 10],
      [BETWEEN, 20],
      [ABOVE_LG, 30]
    ])('should size the title for a %s wide card', async (width, size) => {
      const { container } = await renderWithTitleSizes(width)
      await expect.poll(() => fontSizeOf(headingOf(container))).toBe(size)
    })

    it('should resize the title when the card is resized', async () => {
      const { container } = await renderWithTitleSizes(BELOW_MD)
      const wrapper = container.querySelector(
        '[data-testid="wrapper"]'
      ) as HTMLElement

      await expect.poll(() => fontSizeOf(headingOf(container))).toBe(10)
      wrapper.style.width = ABOVE_LG
      await expect.poll(() => fontSizeOf(headingOf(container))).toBe(30)
      wrapper.style.width = BETWEEN
      await expect.poll(() => fontSizeOf(headingOf(container))).toBe(20)
    })

    it('should switch size at the token breakpoints', async () => {
      const { container } = await render(
        <InstUISettingsProvider themeOverride={headingSizeOverride}>
          <div style={{ width: '250px' }} data-testid="wrapper">
            <ImageCard
              title="Card title"
              src={SRC}
              alt="Card image"
              themeOverride={{ breakpointMd: '10rem', breakpointLg: '12rem' }}
            />
          </div>
        </InstUISettingsProvider>
      )
      await expect.poll(() => fontSizeOf(headingOf(container))).toBe(30)
    })
  })

  describe('for the passthrough props', () => {
    it('should pass through allowed HTML attributes to the outer element', async () => {
      const { card } = await renderImageCard(BETWEEN, {
        'data-testid': 'image-card'
      } as Partial<ImageCardProps>)
      expect(card.getAttribute('data-testid')).toBe('image-card')
    })

    it('should not render the title as an attribute of the outer element', async () => {
      const { card } = await renderImageCard(BETWEEN)
      expect(card.hasAttribute('title')).toBe(false)
    })
  })
})
