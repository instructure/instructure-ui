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

import { useEffect, type ReactNode } from 'react'

import { HydrationContext } from './HydrationContext.js'
import { useIsHydrated } from '../useIsHydrated.js'

/**
 * Attribute set on `document.documentElement` once hydration has committed.
 * Exposed so stylesheets can gate on it without involving React at all:
 *
 * ```css
 * [data-instui-skeleton] { display: block }
 * :root[data-instui-hydrated] [data-instui-skeleton] { display: none }
 * ```
 */
const HYDRATED_ATTRIBUTE = 'data-instui-hydrated'

type HydrationProviderProps = {
  children?: ReactNode
}

/**
 * Reads the hydration state **once per page** and hands it to every descendant
 * through context.
 *
 * Doing it here rather than in each component matters for three reasons:
 *  - class components can consume context but cannot call hooks, so this is what
 *    lets `View` participate without being rewritten
 *  - every consumer flips in the same commit, which is what keeps multiple
 *    skeletons animating in step instead of drifting apart
 *  - it gives us one place to mirror the state onto the DOM for CSS-only consumers
 */
function HydrationProvider({ children }: HydrationProviderProps) {
  const isHydrated = useIsHydrated()

  useEffect(() => {
    // Written straight to the DOM rather than through React. This element is
    // outside the React tree, so the write never participates in reconciliation
    // and cannot cause a hydration mismatch.
    const root = document.documentElement
    root.setAttribute(HYDRATED_ATTRIBUTE, '')
    return () => root.removeAttribute(HYDRATED_ATTRIBUTE)
  }, [])

  return (
    <HydrationContext.Provider value={isHydrated}>
      {children}
    </HydrationContext.Provider>
  )
}

export { HydrationProvider, HYDRATED_ATTRIBUTE }
export type { HydrationProviderProps }
export default HydrationProvider
