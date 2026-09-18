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

import { useSyncExternalStore } from 'react'

// The value never changes for the lifetime of the store, so there is nothing
// to subscribe to. React still requires a subscribe function, so this returns
// an unsubscribe that does nothing.
const noopSubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/**
 * ---
 * category: utilities/react
 * ---
 * Returns `false` on the server **and during the hydrating client render**, then
 * `true` from the moment hydration commits.
 *
 * This is the only correct way to branch on hydration. A `typeof document !==
 * 'undefined'` check does not work: `document` is already defined while
 * `hydrateRoot` is running, so the server would render one tree and the first
 * client render another. React treats that as a hydration mismatch and throws
 * away the server HTML for that subtree.
 *
 * `useSyncExternalStore` avoids the mismatch by construction — React is
 * required to use `getServerSnapshot` for the hydrating render and
 * `getSnapshot` only afterwards.
 *
 * Prefer `useIsHydratedContext` from `HydrationContext` inside InstUI, so the
 * whole page flips in a single commit instead of once per component.
 *
 * @returns {boolean} `false` until hydration has committed, `true` after
 */
const useIsHydrated = (): boolean =>
  useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot)

export default useIsHydrated
export { useIsHydrated }
