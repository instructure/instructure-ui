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

import React, { Children } from 'react'
import safeCloneElement from './safeCloneElement'

/**
 * ---
 * category: utilities/react
 * ---
 *
 * Ensure a single child. If it is a child of length 1, return a
 * cloned instance of the child. If it is a child of length > 1,
 * wrap in a span and return the child. Return null if child has
 * no length.
 *
 * @param {ReactElement} child
 * @param {Object} props - props for child
 * @returns {ReactElement} cloned instance for a single child, or children wrapped in a span
 */
export default function ensureSingleChild (child, props = {}) {
  const childCount = Children.count(child)

  if (childCount === 0) {
    return null
  } else if ((typeof child === 'string' && child.length > 0) || childCount > 1) {
    return (
      <span {...props}>
        {child}
      </span>
    )
  } else {
    return safeCloneElement(Array.isArray(child) ? child[0] : child, props)
  }
}
