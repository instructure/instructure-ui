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

import type { FormMessage } from '@instructure/ui-form-field'
import type { Spacing } from '@instructure/emotion'

export type FileDropProps = {
  id?: string
  renderLabel: ((...args: any[]) => any) | React.ReactNode
  accept?: string | string[]
  messages?: FormMessage[]
  onClick?: (...args: any[]) => any
  onDrop?: (...args: any[]) => any
  onDropAccepted?: (...args: any[]) => any
  onDropRejected?: (...args: any[]) => any
  onDragEnter?: (...args: any[]) => any
  onDragOver?: (...args: any[]) => any
  onDragLeave?: (...args: any[]) => any
  shouldEnablePreview?: boolean
  shouldAllowMultiple?: boolean
  shouldAllowRepeats?: boolean
  maxSize?: number
  minSize?: number
  interaction?: 'enabled' | 'disabled' | 'readonly'
  display?: 'block' | 'inline-block'
  height?: string | number
  width?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  margin?: Spacing
  makeStyles?: (...args: any[]) => any
  styles?: any
}

export type FileDropState = {
  isDragAccepted: boolean
  isDragRejected: boolean
  isFocused: boolean
  isFileBrowserDisplayed: boolean
}

export type FileDropStyleProps = {
  functionallyDisabled: boolean
  visuallyDisabled: boolean
  dragRejected: boolean
  dragAccepted: boolean
}
