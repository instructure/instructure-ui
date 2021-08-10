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

import {
  findAllByQuery,
  parseQueryArguments,
  querySelectorAllWithin,
  firstOrNull
} from '@instructure/ui-test-queries'
import { SelectorOptions } from '@instructure/ui-test-queries/src/utils/selectors'
import { QueryArguments } from '@instructure/ui-test-queries/src/utils/parseQueryArguments'
import { QueriesHelpersEventsType } from '@instructure/ui-test-queries/src/utils/bindElementToUtilities'
import { ObjWithCutFirstArg } from '@instructure/ui-test-queries/src/utils/bindElementToMethods'

export function locator<K, T extends Record<string, K>>(
  containerSelector: string,
  customMethods: T = {} as any
) {
  const queryAll = (
    element: Element,
    selector: string | undefined,
    options: SelectorOptions
  ) => {
    return querySelectorAllWithin(containerSelector, element, selector, options)
  }
  queryAll.displayName = containerSelector

  const query = (...args: QueryArguments) => {
    // @ts-expect-error ...args should be refactored for better typing
    return firstOrNull(queryAll(...args))
  }

  const findAll = (...args: QueryArguments) => {
    const { element, selector, options } = parseQueryArguments(...args)
    // this could be typed better. findAllByQuery should be generic, accepting
    // customMethods as a generic param.
    return findAllByQuery(queryAll, element, selector, {
      ...options,
      customMethods: {
        ...customMethods,
        ...options.customMethods
      }
      // Adding here the generic T argument makes TS able to autocomplete custom
      // methods (if they are a compile time constant)
      // Typing this properly would require to make QueryArguments generic,
      // which would introduce a tons of complexity, so a refactor of this
      // library would be preferred.
    }) as Promise<(QueriesHelpersEventsType & ObjWithCutFirstArg<T>)[]>
  }

  const find = async (...args: QueryArguments) => {
    return firstOrNull(await findAll(...args)) as QueriesHelpersEventsType &
      ObjWithCutFirstArg<T>
  }

  const findWithText = (...args: QueryArguments) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return find(element, `:withText("${selector}")`, options)
  }

  const findWithLabel = (...args: QueryArguments) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return find(element, `:withLabel("${selector}")`, options)
  }

  const methods: Record<
    keyof T,
    (...args: QueryArguments) => Promise<K>
  > = {} as any
  Object.keys(customMethods).forEach((methodKey: keyof T) => {
    methods[methodKey] = async (...args: QueryArguments) => {
      const { element, selector, options } = parseQueryArguments(...args)
      const container = await find(element)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return container ? (container[methodKey] as any)(selector, options) : null
    }
  })

  return {
    customMethods,
    selector: containerSelector,
    query,
    queryAll,
    findAll,
    find,
    findWithText,
    findWithLabel,
    ...methods
  }
}
