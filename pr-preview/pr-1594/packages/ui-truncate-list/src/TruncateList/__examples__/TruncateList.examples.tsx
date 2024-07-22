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

import type { StoryConfig } from '@instructure/ui-test-utils'

import type { TruncateListProps } from '../props'

export default {
  propValues: {
    visibleItemsCount: [undefined, 6],
    renderHiddenItemMenu: [
      undefined,
      (hiddenChildren) => (
        <button style={{ width: '100%' }}>
          Hidden: {hiddenChildren.length}
        </button>
      )
    ] as TruncateListProps['renderHiddenItemMenu'][],
    itemSpacing: [undefined, '1em'],
    fixMenuTriggerWidth: [undefined, '200px']
  },
  getComponentProps: () => {
    return {
      children: Array.from(Array(10)).map((_item, idx) => (
        <div key={idx}>Item {idx + 1}</div>
      ))
    }
  },
  filter: (props) => {
    if (props.itemSpacing && props.fixMenuTriggerWidth) {
      return true
    }

    if (!props.visibleItemsCount && props.renderHiddenItemMenu) {
      return true
    }

    return false
  }
} as StoryConfig<TruncateListProps>
