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
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { SkeletonLoader } from '@instructure/ui-skeleton'

const statusIn = (c: HTMLElement) => c.querySelector('[role="status"]')
const alertIn = (c: HTMLElement) => c.querySelector('[role="alert"]')
const busyIn = (c: HTMLElement) => c.querySelector('[aria-busy="true"]')

const labels = {
  loadingLabel: 'Loading courses',
  loadedLabel: '24 courses'
}

describe('<SkeletonLoader />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('announcements', () => {
    it('stays silent for sub-second loads', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        />
      )

      await vi.advanceTimersByTimeAsync(399)

      // A load that resolves this fast should never be announced at all.
      expect(statusIn(container)).toHaveTextContent('')
    })

    it('announces once the load is slow enough to be worth mentioning', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        />
      )

      await vi.advanceTimersByTimeAsync(400)

      expect(statusIn(container)).toHaveTextContent('Loading courses')
    })

    it('announces the result when loading finishes', async () => {
      const { container, rerender } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>Course list</p>
        </SkeletonLoader>
      )

      await rerender(
        <SkeletonLoader
          {...labels}
          isLoading={false}
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>Course list</p>
        </SkeletonLoader>
      )
      await vi.advanceTimersByTimeAsync(0)

      expect(statusIn(container)).toHaveTextContent('24 courses')
    })

    it('ships the live region empty so the first update is a real change', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        />
      )

      // Present from first paint, but with no text yet.
      expect(statusIn(container)).toBeInTheDocument()
      expect(statusIn(container)).toHaveTextContent('')
    })
  })

  describe('errors', () => {
    it('interrupts with role="alert" and drops the polite status', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isError
          errorLabel="Couldn't load courses. Retry"
          skeleton={<SkeletonLoader.Shape />}
        />
      )
      await vi.advanceTimersByTimeAsync(500)

      expect(alertIn(container)).toHaveTextContent(
        "Couldn't load courses. Retry"
      )
      expect(statusIn(container)).toHaveTextContent('')
    })
  })

  describe('failure', () => {
    it('drops the skeleton even if isLoading was left true', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          isError
          errorLabel="Couldn't load courses."
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>Course list</p>
        </SkeletonLoader>
      )

      // A failed region is never also loading: a shimmering skeleton inside an
      // aria-busy container would claim the work is still going while the alert
      // says it stopped.
      expect(container.querySelector('[data-skeleton-shape]')).toBeNull()
      expect(busyIn(container)).toBeNull()
      expect(alertIn(container)).toHaveTextContent("Couldn't load courses.")
    })

    it('renders the error children in place of the skeleton', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading={false}
          isError
          errorLabel="Couldn't load courses."
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>We could not load your courses.</p>
        </SkeletonLoader>
      )

      expect(container.querySelector('p')).toHaveTextContent(
        'We could not load your courses.'
      )
    })

    it('recovers on retry', async () => {
      const { container, rerender } = await render(
        <SkeletonLoader
          {...labels}
          isLoading={false}
          isError
          errorLabel="Couldn't load courses."
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>error</p>
        </SkeletonLoader>
      )

      await rerender(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>error</p>
        </SkeletonLoader>
      )
      await vi.advanceTimersByTimeAsync(400)

      expect(alertIn(container)).toBeNull()
      expect(busyIn(container)).toBeInTheDocument()
      expect(statusIn(container)).toHaveTextContent('Loading courses')
    })
  })

  describe('busy state', () => {
    it('marks the region busy while loading', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>Course list</p>
        </SkeletonLoader>
      )

      expect(busyIn(container)).toBeInTheDocument()
    })

    it('clears busy once loaded', async () => {
      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading={false}
          skeleton={<SkeletonLoader.Shape />}
        >
          <p>Course list</p>
        </SkeletonLoader>
      )

      expect(busyIn(container)).toBeNull()
      // Scoped to the content region: the container also holds the sr-only
      // live region, which carries the loaded label.
      expect(container.querySelector('p')).toHaveTextContent('Course list')
    })
  })

  describe('a11y', () => {
    it('meets a11y standards while loading', async () => {
      vi.useRealTimers()

      const { container } = await render(
        <SkeletonLoader
          {...labels}
          isLoading
          skeleton={<SkeletonLoader.Shape shape="text" lines={3} />}
        />
      )

      expect(await runAxeCheck(container)).toBe(true)
    })
  })
})
