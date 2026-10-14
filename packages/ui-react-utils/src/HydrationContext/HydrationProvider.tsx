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

import type { ReactNode } from 'react'

import { HydrationContext } from './HydrationContext.js'
import { useIsHydrated } from '../useIsHydrated.js'

type HydrationProviderProps = {
  children?: ReactNode
}

/**
 * ---
 * category: utilities/SSR
 * ---
 * Shares whether the page has hydrated with every component below it, so they
 * all switch from their server output at the same time. Class components read
 * it with `HydrationGate`.
 *
 * `InstUISettingsProvider` already includes it, so you usually don't need to
 * add it yourself.
 */
function HydrationProvider({ children }: HydrationProviderProps) {
  const isHydrated = useIsHydrated()

  return (
    <HydrationContext.Provider value={isHydrated}>
      {children}
    </HydrationContext.Provider>
  )
}

export { HydrationProvider }
export type { HydrationProviderProps }
export default HydrationProvider
