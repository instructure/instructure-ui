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

import { CutFirstArg } from './bindElementToUtilities'

export type GenericFunction = (...args: any) => unknown | any

// In an object where keys are functions remove their first argument
export type ObjWithCutFirstArg<T> = {
  [K in keyof T]: CutFirstArg<T[K]>
}

/**
 * Returns a new object that contains all the given methods (the method names
 * are the keys) with their first parameter automatically give the value of `element`,
 * and this parameter removed.
 * @param element This will be used as the first parameter of every method
 * @param methods Object with methods, e.g. {f1: (p1: Element, p2: string) => 4}
 */
export function bindElementToMethods<K extends Record<string, T>, T>(
  element: Element,
  methods: K
) {
  return Object.entries(methods).reduce(
    (bound: ObjWithCutFirstArg<K>, [key, fn]: [keyof K, T]) => {
      if (typeof fn === 'function') {
        bound[key] = fn.bind(null, element) // eslint-disable-line no-param-reassign
        return bound
      } else {
        throw new Error(
          `[ui-test-queries] cannot bind to a non-function of type ${typeof fn} ${key}`
        )
      }
    },
    {} as ObjWithCutFirstArg<K>
  )
}
