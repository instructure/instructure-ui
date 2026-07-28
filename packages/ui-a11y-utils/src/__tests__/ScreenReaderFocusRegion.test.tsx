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
import { describe, it, expect, vi } from 'vitest'

import { ScreenReaderFocusRegion } from '../ScreenReaderFocusRegion.js'

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

  it('should accept a function for liveRegion', async () => {
    await render(element)

    const ignore = page.getByTestId('ignore').element()
    const content = page.getByTestId('content').element()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content, {
      liveRegion: () => ignore,
      shouldContainFocus: true
    })

    screenReaderFocusRegion.activate()

    await vi.waitFor(() => {
      expect(ignore).not.toHaveAttribute('aria-hidden')
    })
  })

  it("should apply aria-hidden to all children of content's parent nodes unless they are live regions", async () => {
    await render(element)

    const ignore = page.getByTestId('ignore').element()
    const content = page.getByTestId('content').element()
    const children = page.getByTestId('child').elements()

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
    await render(element)

    const content = page.getByTestId('content').element()
    const parents = page.getByTestId('parent').elements()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    parents.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
      expect(node).not.toHaveAttribute('aria-label')
      expect(node).not.toHaveAttribute('role')
    })
  })

  it('should not apply aria-hidden to descendants', async () => {
    await render(element)

    const content = page.getByTestId('content').element()
    const descendants = page.getByTestId('descendant').elements()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    descendants.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
    })
  })

  it('should not apply aria-hidden to dynamically added descendants of content', async () => {
    await render(element)

    const content = page.getByTestId('content').element()
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
    await render(element)

    const content = page.getByTestId('content').element()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    const childNodes = page.getByTestId('child').elements()
    const exception = page.getByTestId('child-initial-hidden').element()

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    childNodes.forEach((node) => {
      expect(node).not.toHaveAttribute('aria-hidden')
    })

    expect(exception).toHaveAttribute('aria-hidden')
  })

  it('should properly restore and unmute parent attributes', async () => {
    await render(element)

    const content = page.getByTestId('content').element()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    const parentNodes = page.getByTestId('parent').elements()
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
    await render(
      <div data-testid="main" role="main" aria-label="test app">
        <div data-testid="live" aria-live="assertive"></div>
        <div data-testid="regular"></div>
        <div data-testid="content"></div>
      </div>
    )

    const content = page.getByTestId('content').element()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    screenReaderFocusRegion.activate()

    const liveRegion = page.getByTestId('live').element()
    const regularRegion = page.getByTestId('regular').element()

    expect(liveRegion).not.toHaveAttribute('aria-hidden')
    expect(regularRegion).toHaveAttribute('aria-hidden')
  })

  describe('Component tests', () => {
    const iframeElement = (
      <div>
        <div data-testid="ignore">
          <iframe
            data-testid="iframe"
            title="unhidden"
            width="100%"
            height="10px"
          />
        </div>
        <iframe
          data-testid="iframe"
          title="hidden"
          width="100%"
          height="10px"
        />
        <div>
          <iframe
            data-testid="iframe"
            title="hidden"
            width="100%"
            height="10px"
          />
          <div data-testid="content">
            <span>
              <iframe
                data-testid="iframe"
                title="unhidden"
                width="100%"
                height="10px"
              />
            </span>
            <div>Hello world</div>
            <button>click me</button>
            <button>or click me</button>
            <iframe
              data-testid="iframe"
              title="unhidden"
              width="100%"
              height="10px"
            />
          </div>
          <div>
            <span>
              <iframe
                data-testid="iframe"
                title="hidden"
                width="100%"
                height="10px"
              />
              <iframe
                data-testid="iframe"
                title="hidden"
                width="100%"
                height="10px"
              />
            </span>
          </div>
          <iframe
            data-testid="iframe"
            title="always-hidden"
            width="100%"
            height="10px"
          />
        </div>
      </div>
    )

    // The `about:blank` documents of freshly mounted iframes aren't there on
    // the first tick, so wait for each body before asserting on it.
    const getIframeBodies = async (container: Element, selector: string) => {
      const iframes = Array.from(
        container.querySelectorAll<HTMLIFrameElement>(selector)
      )

      return Promise.all(
        iframes.map(async (iframe) => {
          await vi.waitFor(() => {
            expect(iframe.contentDocument?.body).toBeTruthy()
          })
          return iframe.contentDocument!.body
        })
      )
    }

    it('should hide the body element of any iframes present on the page', async () => {
      const { container } = await render(iframeElement)

      const content = page.getByTestId('content').element()
      const ignore = page.getByTestId('ignore').element()

      // hide one iframe initially
      for (const body of await getIframeBodies(
        container,
        'iframe[title="always-hidden"]'
      )) {
        body.setAttribute('aria-hidden', 'true')
      }

      // verify no iframe bodies are hidden unless they were hidden initially
      for (const body of await getIframeBodies(
        container,
        'iframe[data-testid="iframe"]:not([title="always-hidden"])'
      )) {
        expect(body).not.toHaveAttribute('aria-hidden')
      }

      const screenReaderFocusRegion = new ScreenReaderFocusRegion(content, {
        liveRegion: ignore,
        shouldContainFocus: true
      })

      screenReaderFocusRegion.activate()

      // once activated, all iframe bodies should be hidden except for iframes that
      // are contained in the defined content element or live region
      for (const body of await getIframeBodies(
        container,
        'iframe[title="hidden"]'
      )) {
        expect(body).toHaveAttribute('aria-hidden', 'true')
      }

      for (const body of await getIframeBodies(
        container,
        'iframe[title="unhidden"]'
      )) {
        expect(body).not.toHaveAttribute('aria-hidden')
      }

      for (const body of await getIframeBodies(
        container,
        'iframe[title="always-hidden"]'
      )) {
        expect(body).toHaveAttribute('aria-hidden', 'true')
      }

      screenReaderFocusRegion.deactivate()
    })

    it('should restore all iframe bodies after deactivate', async () => {
      const { container } = await render(iframeElement)

      const content = page.getByTestId('content').element()
      const ignore = page.getByTestId('ignore').element()

      // hide one iframe initially
      for (const body of await getIframeBodies(
        container,
        'iframe[title="always-hidden"]'
      )) {
        body.setAttribute('aria-hidden', 'true')
      }

      const screenReaderFocusRegion = new ScreenReaderFocusRegion(content, {
        liveRegion: ignore,
        shouldContainFocus: true
      })

      screenReaderFocusRegion.activate()
      screenReaderFocusRegion.deactivate()

      for (const body of await getIframeBodies(
        container,
        'iframe[data-testid="iframe"]:not([title="always-hidden"])'
      )) {
        expect(body).not.toHaveAttribute('aria-hidden')
      }

      for (const body of await getIframeBodies(
        container,
        'iframe[title="always-hidden"]'
      )) {
        expect(body).toHaveAttribute('aria-hidden', 'true')
      }
    })
  })
})
