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

import { act } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { describe, it, expect, vi } from 'vitest'

import { InstUISettingsProvider } from '@instructure/emotion'
import { SkeletonLoader } from '@instructure/ui-skeleton'

const hydrationErrorsFrom = (calls: unknown[][]) =>
  calls.filter((args) =>
    /hydrat|did not match|didn't match/i.test(String(args[0]))
  )

const renderAndHydrate = async (element: React.JSX.Element) => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  const html = renderToString(element)
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  await act(async () => {
    hydrateRoot(container, element)
  })

  const mismatches = hydrationErrorsFrom(errorSpy.mock.calls)
  errorSpy.mockRestore()

  return { html, container, mismatches }
}

describe('skeleton SSR', () => {
  describe('<SkeletonLoader.Shape />', () => {
    it('is present in the server HTML, before any JS runs', async () => {
      const html = renderToString(
        <SkeletonLoader.Shape shape="text" lines={3} />
      )

      expect(html).toContain('data-skeleton-shape="text"')
      expect(html).toContain('aria-hidden="true"')
    })

    it('carries an Emotion class the stylesheet can match', async () => {
      const html = renderToString(
        <InstUISettingsProvider>
          <SkeletonLoader.Shape shape="rectangle" />
        </InstUISettingsProvider>
      )

      expect(html).toMatch(/class="[^"]*css-[^"]*skeletonShape/)
      expect(html).not.toContain('<style')
    })

    it('hydrates without a mismatch', async () => {
      const { container, mismatches } = await renderAndHydrate(
        <SkeletonLoader.Shape shape="text" lines={2} />
      )
      container.remove()
      expect(mismatches).toEqual([])
    })
  })

  describe('<SkeletonLoader /> uncontrolled', () => {
    const Example = () => (
      <InstUISettingsProvider>
        <SkeletonLoader
          loadingLabel="Loading courses"
          loadedLabel="Courses loaded"
          skeleton={<SkeletonLoader.Shape shape="text" lines={3} />}
        >
          <p>Real content</p>
        </SkeletonLoader>
      </InstUISettingsProvider>
    )

    it('renders the skeleton on the server, not the content', async () => {
      const html = renderToString(<Example />)

      expect(html).toContain('data-skeleton-shape')
      expect(html).not.toContain('Real content')
      // The live region ships empty so the first real update is a change the
      // screen reader will announce.
      expect(html).toContain('role="status"')
    })

    it('swaps to the content after hydration, with no mismatch', async () => {
      const { container, mismatches } = await renderAndHydrate(<Example />)

      expect(mismatches).toEqual([])
      expect(container.textContent).toContain('Real content')
      expect(container.querySelector('[data-skeleton-shape]')).toBeNull()

      container.remove()
    })
  })

  describe('<SkeletonLoader /> controlled', () => {
    it('honours isLoading on the server regardless of hydration', async () => {
      const html = renderToString(
        <InstUISettingsProvider>
          <SkeletonLoader
            isLoading={false}
            loadingLabel="Loading"
            loadedLabel="Loaded"
            skeleton={<SkeletonLoader.Shape />}
          >
            <p>Already here</p>
          </SkeletonLoader>
        </InstUISettingsProvider>
      )

      expect(html).toContain('Already here')
      expect(html).not.toContain('data-skeleton-shape')
    })

    it('keeps the skeleton up after hydration while still loading', async () => {
      const Example = () => (
        <InstUISettingsProvider>
          <SkeletonLoader
            isLoading
            loadingLabel="Loading"
            loadedLabel="Loaded"
            skeleton={<SkeletonLoader.Shape />}
          >
            <p>Not yet</p>
          </SkeletonLoader>
        </InstUISettingsProvider>
      )

      const { container, mismatches } = await renderAndHydrate(<Example />)

      expect(mismatches).toEqual([])
      expect(container.querySelector('[data-skeleton-shape]')).not.toBeNull()
      expect(container.textContent).not.toContain('Not yet')

      container.remove()
    })
  })

  describe('multiple skeletons', () => {
    it('flips every skeleton in the same commit', async () => {
      const Example = () => (
        <InstUISettingsProvider>
          {[1, 2, 3].map((n) => (
            <SkeletonLoader
              key={n}
              loadingLabel="Loading"
              loadedLabel="Loaded"
              skeleton={<SkeletonLoader.Shape shape="text" />}
            >
              <p>{`Content ${n}`}</p>
            </SkeletonLoader>
          ))}
        </InstUISettingsProvider>
      )

      const html = renderToString(<Example />)
      expect(html.match(/data-skeleton-shape/g)).toHaveLength(3)

      const { container, mismatches } = await renderAndHydrate(<Example />)

      expect(mismatches).toEqual([])
      expect(container.querySelectorAll('[data-skeleton-shape]')).toHaveLength(
        0
      )
      expect(container.textContent).toContain('Content 1')
      expect(container.textContent).toContain('Content 3')

      container.remove()
    })
  })
})
