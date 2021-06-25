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
import { fireEvent, eventMap } from './events'

import * as helpers from './helpers'
import * as queries from './queries'
import { bindElementToMethods, GenericFunction } from './bindElementToMethods'
import { bindElementToEvents } from './bindElementToEvents'
import { isElement } from './isElement'

type EventMapTypes = {
  [K in Extract<keyof typeof eventMap, string>]: (
    ...args: any
  ) => Promise<Event>
}

// Cuts off the first element of a Function's parameter, e.g.
// hasClass(elem, className) will be hasClass(className)
// This is needed, because the first parameter in helpers is added via a
// bind() call in bindElementToMethods(). See
// https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
type CutFirstArg<F> = F extends (_: any, ...tail: infer TT) => infer R
  ? (...args: TT) => R
  : never

type QueryTypes = {
  [K in Extract<keyof typeof queries, string>]: typeof queries[K]
}
type HelperTypes = {
  [K in Extract<keyof typeof helpers, string>]: CutFirstArg<typeof helpers[K]>
}

export type QueryOrHelperType = QueryTypes & HelperTypes & EventMapTypes

function bindElementToUtilities<T extends Element | Element[]>(
  element: T,
  customMethods: Record<string, GenericFunction> = {}
): T extends Element[] ? QueryOrHelperType[] : QueryOrHelperType {
  if (!element) {
    return null as any // just seems to happen deep in the recursion
  } else if (Array.isArray(element)) {
    const boundElements = (element as Element[]).map((el) =>
      bindElementToUtilities(el, customMethods)
    )
    return boundElements as any
  } else if (typeof (element as any).getDOMNode === 'function') {
    // eslint-disable-next-line no-param-reassign
    element = (element as any).getDOMNode()
  }
  if (!isElement(element)) {
    throw new Error(
      '[ui-test-queries] could not bind utilities to invalid DOM Element! ' +
        element
    )
  }
  return {
    ...bindElementToMethods(element as Element, queries),
    ...(bindElementToEvents(element as Element, fireEvent) as any), // could not type this :/
    ...bindElementToMethods(element as Element, helpers),
    ...bindElementToMethods(element as Element, customMethods)
  }
}

export { bindElementToUtilities }
