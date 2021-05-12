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

import { expect } from '@instructure/ui-test-utils'
import { getEventFiles } from '../getEventFiles'

describe('getEventFiles', () => {
  const chromeDragEnter = {
    dataTransfer: {
      dropEffect: 'none',
      effectAllowed: 'all',
      files: [],
      items: [
        {
          kind: 'file',
          type: 'image/jpeg'
        }
      ],
      types: ['Files']
    }
  }

  const firefoxDragEnter = {
    dataTransfer: {
      dropEffect: 'move',
      effectAllowed: 'uninitialized',
      files: [],
      items: [
        {
          kind: 'file',
          type: 'application/x-moz-file'
        }
      ],
      types: ['application/x-moz-file', 'Files']
    }
  }

  const safariDragEnter = {
    dataTransfer: {
      dropEffect: 'none',
      effectAllowed: 'all',
      files: [],
      types: []
    }
  }

  it('should return items on chrome dragenter event', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(getEventFiles(chromeDragEnter)).to.be.equal(
      chromeDragEnter.dataTransfer.items
    )
  })

  it('should return items on a firefox dragenter event', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(getEventFiles(firefoxDragEnter)).to.be.equal(
      firefoxDragEnter.dataTransfer.items
    )
  })

  it('should return empty array on a safari dragenter event', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(getEventFiles(safariDragEnter).length).to.be.equal(0)
  })
})
