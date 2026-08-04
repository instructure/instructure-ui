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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import measureText from '../v2/utils/measureText.js'

const baseStyle = {
  fontSize: '16px',
  fontFamily: 'Arial',
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 'normal'
}

const getNodes = (root: Element) =>
  Array.from(root.childNodes).filter(
    (node) =>
      node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE
  )

describe('measureText', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => {
        return {
          font: '',
          measureText: vi.fn((text: string) => {
            return { width: text.length * 10 }
          })
        } as unknown as CanvasRenderingContext2D
      }
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should calculate the width of a single text node correctly', () => {
    const node = document.createElement('div')
    Object.assign(node.style, baseStyle)
    node.textContent = 'Hello'

    const width = measureText([node])

    expect(width).toBe(50) // 5 characters * 10 (mocked width per character)
  })

  it('should return zero for empty nodes', () => {
    const node = document.createElement('div')
    Object.assign(node.style, baseStyle)
    node.textContent = ''

    const width = measureText([node])

    expect(width).toBe(0)
  })

  it('should calculate text width correctly', async () => {
    await render(
      <div data-testid="stage" style={baseStyle}>
        Lorem ipsum <span style={baseStyle}>DOLOR SIT AMET.</span>
      </div>
    )
    const stage = page.getByTestId('stage').element()
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    expect(width).toBe(270)
  })

  it('should account for different nodes', async () => {
    const { rerender } = await render(
      <div data-testid="stage" style={baseStyle}>
        Lorem ipsum <span style={baseStyle}>DOLOR SIT AMET.</span>
      </div>
    )
    const stage = page.getByTestId('stage').element()
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    // Set child
    await rerender(
      <div data-testid="stage" style={baseStyle}>
        Lorem ipsum DOLOR SIT AMET.
      </div>
    )
    const stage2 = page.getByTestId('stage').element()
    const nodes2 = getNodes(stage2)

    const width2 = measureText(nodes2, stage2)

    expect(width).toEqual(width2)
  })

  it('should call measureText on a properly configured canvas 2d context', async () => {
    const mockedStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontFamily: 'Arial'
    }

    await render(
      <div data-testid="stage" style={mockedStyle}>
        Lorem ipsum
      </div>
    )
    const stage = page.getByTestId('stage').element()
    const nodes = getNodes(stage)

    measureText(nodes, stage)

    // The width calculation depends on the modified canvas context
    const getContextSpy = HTMLCanvasElement.prototype.getContext as any
    const context = getContextSpy.mock.results[0].value

    expect(context.measureText).toHaveBeenCalledTimes(1)
    expect(context.font).toBe('bold italic 20px Arial')
  })

  it('should account for letter spacing styles', async () => {
    const { rerender } = await render(
      <div data-testid="stage" style={baseStyle}>
        Lorem ipsum
      </div>
    )
    const stage = page.getByTestId('stage').element()
    const nodes = getNodes(stage)
    const width = measureText(nodes, stage)

    expect(width).toBe(110) // default mocked width (text.length * 10)

    // Set letterSpacing
    await rerender(
      <div data-testid="stage2" style={{ ...baseStyle, letterSpacing: '5px' }}>
        Lorem ipsum
      </div>
    )
    const stage2 = page.getByTestId('stage2').element()
    const nodes2 = getNodes(stage2)
    const width2 = measureText(nodes2, stage2)

    expect(width2).toBe(165) // default mocked width + letterOffset (text.length * letterSpacing)
  })
})
