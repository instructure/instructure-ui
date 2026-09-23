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

import { Component, act } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { describe, it, expect, vi } from 'vitest'

import {
  HydrationContext,
  HydrationProvider,
  HYDRATED_ATTRIBUTE,
  useIsHydratedContext
} from '../index.js'

const Hook = () => (
  <span>{useIsHydratedContext() ? 'hydrated' : 'pending'}</span>
)

// Class components can't call hooks. This is the path `View` takes, so it needs
// its own coverage.
class Klass extends Component {
  static contextType = HydrationContext
  declare context: boolean

  render() {
    return <span>{this.context ? 'hydrated' : 'pending'}</span>
  }
}

const hydrate = async (element: React.JSX.Element) => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  const html = renderToString(element)
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  await act(async () => {
    hydrateRoot(container, element)
  })

  const mismatches = errorSpy.mock.calls.filter((args) =>
    /hydrat|did not match|didn't match/i.test(String(args[0]))
  )
  errorSpy.mockRestore()

  return { html, container, mismatches }
}

describe('HydrationContext', () => {
  it('reports pending in the server render', () => {
    const html = renderToString(
      <HydrationProvider>
        <Hook />
      </HydrationProvider>
    )

    expect(html).toContain('pending')
    expect(html).not.toContain('hydrated')
  })

  it('flips to hydrated after hydration, with no mismatch', async () => {
    const { container, mismatches } = await hydrate(
      <HydrationProvider>
        <Hook />
      </HydrationProvider>
    )

    expect(mismatches).toEqual([])
    expect(container.textContent).toBe('hydrated')

    container.remove()
  })

  it('reaches class components through context', async () => {
    const { html, container, mismatches } = await hydrate(
      <HydrationProvider>
        <Klass />
      </HydrationProvider>
    )

    expect(html).toContain('pending')
    expect(mismatches).toEqual([])
    expect(container.textContent).toBe('hydrated')

    container.remove()
  })

  it('still reports pending on the server with no provider mounted', () => {
    expect(renderToString(<Hook />)).toContain('pending')
  })

  it('recovers after hydration even with no provider mounted', async () => {
    const { container, mismatches } = await hydrate(<Hook />)

    expect(mismatches).toEqual([])
    expect(container.textContent).toBe('hydrated')

    container.remove()
  })

  it('mirrors the state onto the document for CSS-only consumers', async () => {
    document.documentElement.removeAttribute(HYDRATED_ATTRIBUTE)
    expect(document.documentElement.hasAttribute(HYDRATED_ATTRIBUTE)).toBe(
      false
    )

    const { container } = await hydrate(
      <HydrationProvider>
        <Hook />
      </HydrationProvider>
    )

    expect(document.documentElement.hasAttribute(HYDRATED_ATTRIBUTE)).toBe(true)

    container.remove()
    document.documentElement.removeAttribute(HYDRATED_ATTRIBUTE)
  })

  it('keeps every consumer in step within one provider', async () => {
    const Many = () => (
      <HydrationProvider>
        <Hook />
        <Hook />
        <Klass />
      </HydrationProvider>
    )

    const html = renderToString(<Many />)
    expect(html.match(/pending/g)).toHaveLength(3)

    const { container, mismatches } = await hydrate(<Many />)

    expect(mismatches).toEqual([])
    expect(container.textContent).toBe('hydratedhydratedhydrated')

    container.remove()
  })
})
