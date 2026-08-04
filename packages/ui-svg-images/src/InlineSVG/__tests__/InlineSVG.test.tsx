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
import { describe, it, expect } from 'vitest'
import { InlineSVG } from '../index.js'

const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

describe('<InlineSVG />', () => {
  it('should render', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  it('should have role "presentation" when no title is provided', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('role', 'presentation')
  })

  it('should have role "img" when a title is provided', async () => {
    const { container } = await render(
      <InlineSVG src={SVG_SRC} title="testIconTitle" />
    )
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('role', 'img')
  })

  it('should add a group with a role "presentation', async () => {
    const { container } = await render(
      <InlineSVG src={SVG_SRC} title="testIconTitle" />
    )
    const group = container.querySelector('g')

    expect(group).toHaveAttribute('role', 'presentation')
  })

  it('should not render title when no title prop is provided', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const title = container.querySelector('title')

    expect(title).not.toBeInTheDocument()
  })

  it('should render title when title prop is provided', async () => {
    const { container } = await render(
      <InlineSVG src={SVG_SRC} title="Test Title" />
    )
    const title = container.querySelector('title')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
  })

  it('should not render description when no description prop is provided', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const description = container.querySelector('desc')

    expect(description).not.toBeInTheDocument()
  })

  it('should render description when description prop is provided', async () => {
    const { container } = await render(
      <InlineSVG src={SVG_SRC} description="testIconDesc" />
    )
    const description = container.querySelector('desc')

    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('testIconDesc')
  })

  it('should produce null for "labelledBy" when no title or desc are provided', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).not.toHaveAttribute('aria-labelledby')
  })

  it('should properly join ids when both title and desc attributes are provided', async () => {
    const { container } = await render(
      <InlineSVG
        src={SVG_SRC}
        title="testIconTitle"
        description="testIconDescription"
      />
    )
    const svg = container.querySelector('svg')!
    const ids = svg.getAttribute('aria-labelledby')!.split(' ')

    expect(ids.length).toBe(2)
  })

  it('should set focusable to false by default', async () => {
    const { container } = await render(<InlineSVG src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('focusable', 'false')
  })

  it('should allow focusable to be overridden', async () => {
    const { container } = await render(
      <InlineSVG src={SVG_SRC} focusable={true} />
    )
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('focusable', 'true')
  })

  it('should correctly parse hyphenated attributes like stroke-width', async () => {
    const svgWithHyphenatedAttrs = `<svg stroke-width="2" stroke-linecap="round"><path d="M12 2l3 6"/></svg>`
    const { container } = await render(
      <InlineSVG src={svgWithHyphenatedAttrs} />
    )
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('stroke-width', '2')
    expect(svg).toHaveAttribute('stroke-linecap', 'round')
  })

  it('should correctly parse unquoted attribute values (non-standard format)', async () => {
    const svgWithUnquotedAttrs = `<svg stroke=currentColor stroke-width=2><circle cx=12 cy=12 r=10/></svg>`
    const { container } = await render(<InlineSVG src={svgWithUnquotedAttrs} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('stroke-width', '2')
  })

  describe('sanitization', () => {
    it('strips <script> tags from src', async () => {
      const malicious = `<svg><script>window.__pwn=1</script><circle/></svg>`
      const { container } = await render(<InlineSVG src={malicious} />)
      const group = container.querySelector('g[role="presentation"]')
      expect(group?.innerHTML).not.toContain('<script')
      expect(group?.querySelector('circle')).toBeInTheDocument()
    })

    it('strips on* event-handler attributes from inner SVG content', async () => {
      const malicious = `<svg><circle onload="window.__pwn=1" cx="10"/></svg>`
      const { container } = await render(<InlineSVG src={malicious} />)
      const group = container.querySelector('g[role="presentation"]')
      expect(group?.innerHTML.toLowerCase()).not.toContain('onload')
    })

    it('strips javascript: schemes from xlink:href', async () => {
      const malicious = `<svg><use xlink:href="javascript:alert(1)"/></svg>`
      const { container } = await render(<InlineSVG src={malicious} />)
      const group = container.querySelector('g[role="presentation"]')
      expect(group?.innerHTML.toLowerCase()).not.toContain('javascript:')
    })

    it('strips on* attributes from the outer <svg> element', async () => {
      const malicious = `<svg onload="window.__pwn=1"><circle/></svg>`
      const { container } = await render(<InlineSVG src={malicious} />)
      const svg = container.querySelector('svg')
      expect(svg).not.toHaveAttribute('onload')
    })

    it('preserves the SVG when src is benign', async () => {
      const benign = `<svg viewBox="0 0 24 24"><path d="M0 0L10 10"/></svg>`
      const { container } = await render(<InlineSVG src={benign} />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
      expect(svg?.querySelector('path')).toHaveAttribute('d', 'M0 0L10 10')
    })
  })
})
