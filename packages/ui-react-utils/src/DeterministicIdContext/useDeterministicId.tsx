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

import { useId } from 'react'

/**
 * A React hook that provides SSR-safe, hydration-stable ID generation for
 * functional components.
 *
 * This hook is the functional component equivalent of the `withDeterministicId`
 * decorator. It is backed by React's built-in {@link https://react.dev/reference/react/useId `useId`},
 * which produces the same id on the server and the client for a given position
 * in the React tree.
 *
 * The returned function may be called multiple times with distinct
 * `instanceName` values to derive several unique, stable ids from the same
 * component instance (e.g. one for an input and one for its messages).
 *
 * Note: for apps that mount more than one independent React root on the same
 * page (including module federation), pass a distinct `identifierPrefix` to each
 * `createRoot`/`hydrateRoot` call so ids stay unique across roots.
 *
 * Read more about it here: [SSR guide](https://instructure.design/#server-side-rendering)
 *
 * @param componentName - Component name used as a human-readable id prefix.
 * @returns A function that generates stable ids. It accepts an optional
 * `instanceName` used as the prefix for that specific id.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const getId = useDeterministicId('MyComponent')
 *   const id = getId()
 *   const messagesId = getId('MyComponent-messages')
 *   return <div id={id} aria-describedby={messagesId}>Content</div>
 * }
 * ```
 */
function useDeterministicId(
  componentName: string
): (instanceName?: string) => string {
  // React wraps the value of `useId` in delimiters that are not valid in a CSS
  // selector (`:r0:` in React 18, `«r0»` in React 19), which would break any
  // `querySelector('#' + id)` call, so strip them. The `___` separator keeps the
  // historical `ComponentName___token` id shape.
  const base = useId().replace(/[^a-zA-Z0-9-]/g, '')

  return (instanceName?: string) => `${instanceName ?? componentName}___${base}`
}

export default useDeterministicId
export { useDeterministicId }
