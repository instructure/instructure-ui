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

import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { ScreenReaderFocusRegion } from '../ScreenReaderFocusRegion'

describe('ScreenReaderFocusRegion', () => {
  const element = (
    <div
      data-testid="parent"
      role="main"
      aria-label="test app"
      id="test-parent3"
    >
      <div data-testid="ignore" role="alert">
        <span>test alert</span>
      </div>
      <div data-testid="child">
        <div data-testid="descendant">foo</div>
        <div data-testid="descendant">
          <div data-testid="descendant">bar</div>
        </div>
      </div>
      <div data-testid="parent" aria-hidden="true" id="test-parent2">
        <div data-testid="child"></div>
        <div
          role="dialog"
          aria-label="some content"
          data-testid="parent"
          id="test-parent1"
        >
          <div data-testid="content">
            <div>Hello world</div>
            <button>click me</button>
            <button>or click me</button>
          </div>
          <span data-testid="child">
            <ul data-testid="descendant">
              <li data-testid="descendant">item 1</li>
              <li data-testid="descendant">item 2</li>
              <li data-testid="descendant">item 3</li>
            </ul>
          </span>
        </div>
      </div>
      <div data-testid="child-initial-hidden" aria-hidden="true">
        <div data-testid="descendant">foo</div>
        <div data-testid="descendant">bar</div>
      </div>
    </div>
  )

  it('should accept a function for liveRegion', () => {
    vi.useFakeTimers()

    render(element)

    const ignore = screen.getByTestId('ignore')
    const content = screen.getByTestId('content')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content, {
      liveRegion: () => ignore,
      shouldContainFocus: true
    })

    act(() => {
      screenReaderFocusRegion.activate()
      vi.runAllTimers()
    })

    expect(ignore).not.toHaveAttribute('aria-hidden')

    vi.useRealTimers()
  })

  it("should apply aria-hidden to all children of content's parent nodes unless they are live regions", async () => {
    render(element)

    const ignore = screen.getByTestId('ignore')
    const content = screen.getByTestId('content')
    const children = screen.getAllByTestId('child')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content, {
      liveRegion: ignore,
      shouldContainFocus: true
    })

    screenReaderFocusRegion.activate()

    children.forEach((node) => {
      expect(node).toHaveAttribute('aria-hidden')
    })

    expect(ignore).not.toHaveAttribute('aria-hidden')
  })

  it("should mute designated attributes for content's parent nodes", async () => {
    render(element)

    const content = screen.getByTestId('content')
    const parents = screen.getAllByTestId('parent')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    parents.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
      expect(node).not.toHaveAttribute('aria-label')
      expect(node).not.toHaveAttribute('role')
    })
  })

  it('should not apply aria-hidden to descendants', async () => {
    render(element)

    const content = screen.getByTestId('content')
    const descendants = screen.getAllByTestId('descendant')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    descendants.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
    })
  })

  it('should not apply aria-hidden to dynamically added descendants of content', async () => {
    render(element)

    const content = screen.getByTestId('content')
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    screenReaderFocusRegion.activate()

    const desc = document.createElement('div')
    content.appendChild(desc)

    screenReaderFocusRegion.handleDOMMutation([
      { addedNodes: [desc], removedNodes: [] } as unknown as MutationRecord
    ])

    Array.from(content.childNodes).forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
    })
  })

  it('should remove aria-hidden from children unless they had aria-hidden before', async () => {
    render(element)

    const content = screen.getByTestId('content')
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    const childNodes = screen.getAllByTestId('child')
    const exception = screen.getByTestId('child-initial-hidden')

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    childNodes.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
    })

    expect(exception).toHaveAttribute('aria-hidden')
  })

  it('should properly restore and unmute parent attributes', async () => {
    render(element)

    const content = screen.getByTestId('content')
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    const parentNodes = screen.getAllByTestId('parent')
    const attrsMap: Record<string, Attr[]> = {}

    parentNodes.forEach((node) => {
      attrsMap[node.getAttribute('id')!] = [...node.attributes]
    })

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    parentNodes.forEach((node) => {
      const preNodeAttrs = attrsMap[node.getAttribute('id')!]
      const postNodeAttrs = [...node.attributes]

      // both should have same number of attributes
      expect(preNodeAttrs.length).toEqual(postNodeAttrs.length)

      preNodeAttrs.forEach((preNodeAttribute) => {
        const matchingAttribute = postNodeAttrs.filter(
          (postNodeAttribute) =>
            preNodeAttribute.name === postNodeAttribute.name
        )[0]

        expect(matchingAttribute.value).toEqual(preNodeAttribute.value)
      })
    })
  })

  it('should not apply aria-hidden to elements that have aria-live attributes', async () => {
    render(
      <div data-testid="main" role="main" aria-label="test app">
        <div data-testid="live" aria-live="assertive"></div>
        <div data-testid="regular"></div>
        <div data-testid="content"></div>
      </div>
    )

    const content = screen.getByTestId('content')
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    screenReaderFocusRegion.activate()

    const liveRegion = screen.getByTestId('live')
    const regularRegion = screen.getByTestId('regular')

    expect(liveRegion).not.toHaveAttribute('aria-hidden')
    expect(regularRegion).toHaveAttribute('aria-hidden')
  })
})
