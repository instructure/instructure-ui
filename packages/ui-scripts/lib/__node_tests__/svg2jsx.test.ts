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

import { describe, it, expect } from 'vitest'
import { convertSvgAttrName, svg2jsx } from '../icons/svg2jsx.ts'

describe('convertSvgAttrName', () => {
  it('maps xlink:href to xlinkHref', () => {
    expect(convertSvgAttrName('xlink:href')).toEqual('xlinkHref')
  })

  it('maps xml:space to xmlSpace', () => {
    expect(convertSvgAttrName('xml:space')).toEqual('xmlSpace')
  })

  it('maps xml:lang to xmlLang', () => {
    expect(convertSvgAttrName('xml:lang')).toEqual('xmlLang')
  })

  it('preserves data-* attributes unchanged', () => {
    expect(convertSvgAttrName('data-foo')).toEqual('data-foo')
    expect(convertSvgAttrName('data-my-attr')).toEqual('data-my-attr')
  })

  it('preserves aria-* attributes unchanged', () => {
    expect(convertSvgAttrName('aria-label')).toEqual('aria-label')
    expect(convertSvgAttrName('aria-hidden')).toEqual('aria-hidden')
  })

  it('preserves xmlns and xmlns:* attributes unchanged', () => {
    expect(convertSvgAttrName('xmlns')).toEqual('xmlns')
    expect(convertSvgAttrName('xmlns:xlink')).toEqual('xmlns:xlink')
  })

  it('converts kebab-case attributes to camelCase', () => {
    expect(convertSvgAttrName('stroke-width')).toEqual('strokeWidth')
    expect(convertSvgAttrName('stroke-linecap')).toEqual('strokeLinecap')
    expect(convertSvgAttrName('fill-rule')).toEqual('fillRule')
  })

  it('leaves single-word attributes unchanged', () => {
    expect(convertSvgAttrName('fill')).toEqual('fill')
    expect(convertSvgAttrName('width')).toEqual('width')
  })
})

describe('svg2jsx', () => {
  it('returns empty string for empty input', () => {
    expect(svg2jsx('')).toEqual('')
  })

  it('returns empty string for whitespace-only input', () => {
    expect(svg2jsx('   \n  ')).toEqual('')
  })

  it('converts kebab-case attribute names to camelCase', () => {
    const input = '<svg stroke-width="2" fill-rule="evenodd"></svg>'
    expect(svg2jsx(input)).toEqual(
      '<svg strokeWidth="2" fillRule="evenodd"></svg>'
    )
  })

  it('preserves data-* and aria-* attributes', () => {
    const input = '<svg data-icon="check" aria-hidden="true"></svg>'
    expect(svg2jsx(input)).toEqual(
      '<svg data-icon="check" aria-hidden="true"></svg>'
    )
  })

  it('self-closes void/SVG elements that lack a trailing slash', () => {
    const input = '<svg><path d="M0,0"><circle r="5"></svg>'
    expect(svg2jsx(input)).toContain('<path d="M0,0" />')
    expect(svg2jsx(input)).toContain('<circle r="5" />')
  })

  it('normalizes already self-closed tags', () => {
    const input = '<svg><path d="M0,0"/></svg>'
    expect(svg2jsx(input)).toContain('<path d="M0,0" />')
  })

  it('escapes curly braces inside attribute values', () => {
    const input = '<svg style="color:{red}"></svg>'
    expect(svg2jsx(input)).toEqual('<svg style="color:&#123;red&#125;"></svg>')
  })

  it('handles xlink:href via the special-case mapping', () => {
    const input = '<svg><use xlink:href="#foo"></svg>'
    expect(svg2jsx(input)).toContain('<use xlinkHref="#foo" />')
  })
})
