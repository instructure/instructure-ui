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

import { ReactNode } from 'react'

import type { TruncateTextTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type CleanDataOptions = {
  /**
   * Add ellipsis after words or after any character. Default is 'character'
   */
  truncate?: 'character' | 'word'
  /**
   * A string to use as the ellipsis
   */
  ellipsis?: string
  /**
   * Characters to ignore at truncated end of string. Default is ' ', '.', ','
   */
  ignore?: string[]
}

type TruncateTextCommonProps = {
  /**
   * Number of lines to allow before truncating. `auto` will fit to parent.
   * Default is 1.
   */
  maxLines?: 'auto' | number
  /**
   * Where to place the ellipsis within the string. Default is 'end'
   */
  position?: 'end' | 'middle'
  /**
   * Force truncation of invisible elements (hack; will be removed in favor
   * of a better fix)
   */
  shouldTruncateWhenInvisible?: boolean
} & CleanDataOptions

type TruncateTextOwnProps = {
  /**
   * The content to be truncated.
   */
  children: React.ReactNode
  /**
   * Debounce delay in milliseconds
   */
  debounce?: number
  /**
   * Callback when truncated text has changed
   */
  onUpdate?: (isTruncated: boolean, truncatedText?: string) => void
} & TruncateTextCommonProps

type PropKeys = keyof TruncateTextOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TruncateTextProps = TruncateTextOwnProps &
  WithStyleProps<TruncateTextTheme, TruncateTextStyle>

type TruncateTextStyle = ComponentStyle<
  'truncateText' | 'auto' | 'spacer' | 'lineHeight'
>

type TruncateTextState = {
  isTruncated: boolean
  needsSecondRender: boolean
  truncatedElement?: ReactNode
  truncatedText?: string
}
const allowedProps: AllowedPropKeys = [
  'children',
  'maxLines',
  'position',
  'truncate',
  'ellipsis',
  'ignore',
  'debounce',
  'onUpdate',
  'shouldTruncateWhenInvisible'
]

export type {
  CleanDataOptions,
  TruncateTextCommonProps,
  TruncateTextProps,
  TruncateTextState,
  TruncateTextStyle
}
export { allowedProps }
