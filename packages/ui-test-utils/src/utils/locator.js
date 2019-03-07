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

import { findAllByQuery } from './queries'
import { parseQueryArguments } from './parseQueryArguments'
import { querySelectorAllWithin } from './selectors'
import { firstOrNull } from './firstOrNull'

export function locator (containerSelector, customMethods = {}) {
  const queryAll = (element, selector, options) => {
    return querySelectorAllWithin(containerSelector, element, selector, options)
  }
  queryAll.displayName = containerSelector

  const query = (...args) => {
    return firstOrNull(queryAll(...args))
  }

  const findAll = (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return findAllByQuery(queryAll, element, selector, {
      ...options,
      customMethods: {
        ...customMethods,
        ...options.customMethods
      }
    })
  }

  const find = async (...args) => {
    return firstOrNull(await findAll(...args))
  }

  const findWithText = (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return find(element, `:withText("${selector}")`, options)
  }

  const findWithLabel = (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return find(element, `:withLabel("${selector}")`, options)
  }

  let methods = {}
  Object.keys(customMethods).forEach((methodKey) => {
    methods[methodKey] = async (...args) => {
      const { element, selector, options } = parseQueryArguments(...args)
      const container = await find(element)
      return container ? container[methodKey](selector, options) : null
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
