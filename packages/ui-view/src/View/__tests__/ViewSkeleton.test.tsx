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
import { render } from 'vitest-browser-react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { describe, it, expect, vi } from 'vitest'

import { View } from '@instructure/ui-view/latest'
import { InstUISettingsProvider } from '@instructure/emotion'
import { runAxeCheck } from '@instructure/ui-axe-check'

const skeletonIn = (c: HTMLElement) => c.querySelector('[data-skeleton-shape]')

describe('<View /> skeleton loading', () => {
  describe('controlled', () => {
    it('renders a skeleton in place of children', async () => {
      const { container } = await render(
        <View as="div" isLoading height="10rem">
          <p>Real content</p>
        </View>
      )

      expect(skeletonIn(container)).not.toBeNull()
      expect(container.querySelector('p')).toBeNull()
    })

    it('marks itself busy while loading', async () => {
      const { container } = await render(
        <View as="div" isLoading height="10rem" />
      )

      expect(container.querySelector('[aria-busy="true"]')).not.toBeNull()
    })

    it('renders children and no busy state when not loading', async () => {
      const { container } = await render(
        <View as="div" isLoading={false} height="10rem">
          <p>Real content</p>
        </View>
      )

      expect(skeletonIn(container)).toBeNull()
      expect(container.querySelector('p')).toHaveTextContent('Real content')
      expect(container.querySelector('[aria-busy="true"]')).toBeNull()
    })

    it('does not leak the skeleton props onto the DOM', async () => {
      const { container } = await render(
        <View
          as="div"
          isLoading
          skeletonShape="text"
          skeletonLines={2}
          skeletonSize="lg"
        />
      )
      const view = container.firstElementChild as HTMLElement

      for (const attr of [
        'isloading',
        'skeletonshape',
        'skeletonlines',
        'skeletonsize'
      ]) {
        expect(view.hasAttribute(attr)).toBe(false)
      }
    })

    it('renders a text skeleton with one row per line', async () => {
      const { container } = await render(
        <View as="div" isLoading skeletonShape="text" skeletonLines={3} />
      )

      expect(skeletonIn(container)!.children).toHaveLength(3)
    })

    it('meets a11y standards while loading', async () => {
      const { container } = await render(
        <View as="div" isLoading height="10rem" />
      )

      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  describe('isLoading="untilHydrated"', () => {
    const Example = () => (
      <InstUISettingsProvider>
        <View as="div" isLoading="untilHydrated" height="10rem">
          <p>Real content</p>
        </View>
      </InstUISettingsProvider>
    )

    it('renders the skeleton into the server HTML', () => {
      const html = renderToString(<Example />)

      expect(html).toContain('data-skeleton-shape')
      expect(html).toContain('aria-busy="true"')
      expect(html).not.toContain('Real content')
    })

    it('recovers with no provider mounted', async () => {
      const Bare = () => (
        <View as="div" isLoading="untilHydrated" height="10rem">
          <p>Real content</p>
        </View>
      )

      const container = document.createElement('div')
      container.innerHTML = renderToString(<Bare />)
      document.body.appendChild(container)

      await act(async () => {
        hydrateRoot(container, <Bare />)
      })

      expect(container.textContent).toContain('Real content')
      container.remove()
    })

    it('swaps to children after hydration, with no mismatch', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const container = document.createElement('div')
      container.innerHTML = renderToString(<Example />)
      document.body.appendChild(container)

      await act(async () => {
        hydrateRoot(container, <Example />)
      })

      const mismatches = errorSpy.mock.calls.filter((args) =>
        /hydrat|did not match|didn't match/i.test(String(args[0]))
      )
      errorSpy.mockRestore()

      expect(mismatches).toEqual([])
      expect(container.textContent).toContain('Real content')
      expect(skeletonIn(container)).toBeNull()

      container.remove()
    })
  })

  describe('existing behaviour', () => {
    it('renders children when isLoading is never passed', async () => {
      const { container } = await render(
        <View as="div">
          <p>Untouched</p>
        </View>
      )

      expect(container.querySelector('p')).toHaveTextContent('Untouched')
      expect(skeletonIn(container)).toBeNull()
      expect(container.querySelector('[aria-busy="true"]')).toBeNull()
    })

    it('renders children without a provider mounted', () => {
      const html = renderToString(
        <View as="div">
          <p>Untouched</p>
        </View>
      )

      expect(html).toContain('Untouched')
      expect(html).not.toContain('data-skeleton-shape')
    })
  })
})
