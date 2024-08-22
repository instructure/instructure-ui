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

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { findTabbable } from '../findTabbable'

describe('findTabbable', () => {
  describe('tabbable content', () => {
    it('should find tabbable descendants', () => {
      const { container } = render(
        <div>
          <a href="https://instructure-test">Tabbable</a>
          <div>Not Tabbable</div>
          <div tabIndex={1}>Tabbable</div>
          <input type="text" value="Tabbable" readOnly />
          <div>
            <button>Tabbable</button>
            <button style={{ display: 'none' }}>Not Tabbable</button>
          </div>
        </div>
      )

      const node = container.firstChild as HTMLElement
      expect(findTabbable(node).length).toBe(4)
    })
  })

  describe('tabbable root', () => {
    it('should search the root node when shouldSearchRootNode is set', () => {
      const shouldSearchRootNode = true
      const { container } = render(
        <button>
          <span>hello</span>
        </button>
      )

      const node = container.firstChild as HTMLElement
      expect(findTabbable(node).length).toBe(0)
      expect(findTabbable(node, shouldSearchRootNode).length).toBe(1)
    })
  })

  it('should gracefully handle null', () => {
    expect(findTabbable(null).length).toBe(0)
  })
})
