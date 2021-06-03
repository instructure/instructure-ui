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

import { findDOMNode } from './findDOMNode'
import React from 'react'

type ClassListApiType = {
  toArray: () => string[]
  contains: (className: string) => boolean
  add: (className: string) => void
  remove: (className: string) => void
}

const apiForEmptyNode: ClassListApiType = {
  toArray: () => [],
  contains: () => false,
  add: () => {},
  remove: () => {}
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Produces a classList object containing functions
 * for both adding and removing classes from an element.
 * Also provides a contains function to query if the
 * element contains a specified class name.
 * @module getClassList
 *
 * @param { Node | Window | React.ReactElement | React.Component | function } element - component or DOM node
 * @return {Object} object containing classList functions 'contains', 'add', and 'remove'
 */
function getClassList(
  element:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((...args: any[]) => any)
) {
  const node = findDOMNode(element)

  if (!node) return apiForEmptyNode

  const classListApi: ClassListApiType = {
    toArray() {
      return [...(node as Element).classList]
    },
    contains: () => false,
    add: () => {},
    remove: () => {}
  }

  classListApi['add'] = (className: string) => {
    return (node as Element).classList.add(className)
  }

  classListApi['remove'] = (className: string) => {
    return (node as Element).classList.remove(className)
  }

  classListApi['contains'] = (className: string) => {
    return (node as Element).classList.contains(className)
  }

  return classListApi
}

export default getClassList
export { getClassList }
