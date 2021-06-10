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

import { getDisplayName } from './getDisplayName'
import { ComponentType, ReactElement, ReactNode } from 'react'

/**
 * ---
 * category: utilities/react
 * ---
 * Check if a React component instance (React element) matches one of the
 * specified types.
 *
 * @module matchComponentTypes
 * @param {ReactElement|any} componentInstance
 * @param {Array} types an array of React components
 * @returns {Boolean} true if the component matches at least one of the types
 */
function matchComponentTypes(
  componentInstance: ReactNode,
  types: string[] | ComponentType[] | ComponentType<any>[] = []
) {
  if (componentInstance && (componentInstance as ReactElement).type) {
    const displayNames = types.map(
      (type: string | ComponentType | ComponentType<any>) =>
        getDisplayName(type)
    )
    return (
      displayNames.indexOf(
        getDisplayName((componentInstance as ReactElement).type)
      ) >= 0
    )
  } else {
    return false
  }
}

export default matchComponentTypes
export { matchComponentTypes }
