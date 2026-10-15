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

import { createContext } from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'

import type { SegmentedControlProps } from './props'

type SegmentedControlContextValue = {
  size: NonNullable<SegmentedControlProps['size']>
  isDisabled: boolean
  selectedValue?: string
  // the single option that sits in the tab order (roving tabindex)
  tabbableValue?: string
  onSelect: (event: SyntheticEvent, value: string) => void
  onKeyDown: (event: KeyboardEvent<Element>) => void
}

const SegmentedControlContext = createContext<SegmentedControlContextValue>({
  size: 'lg',
  isDisabled: false,
  onSelect: () => undefined,
  onKeyDown: () => undefined
})

export default SegmentedControlContext
export { SegmentedControlContext }
export type { SegmentedControlContextValue }
