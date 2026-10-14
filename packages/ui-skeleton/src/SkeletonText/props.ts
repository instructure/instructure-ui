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

import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type { ComponentStyle, StyleObject } from '@instructure/emotion'

type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type SkeletonLineHeight = 'heading' | 'text'

type SkeletonTextOwnProps = {
  /**
   * Set to `false` to turn off the animation, whatever the user's motion
   * setting. Useful for snapshot and visual regression tests.
   */
  animate?: boolean

  /**
   * Provides a reference to the underlying HTML element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Line height of the text this placeholder replaces: `heading` is 1.25,
   * `text` (body copy) is 1.5. Match it to the real text so the page doesn't
   * jump when the content loads.
   */
  lineHeight?: SkeletonLineHeight

  /**
   * Number of lines to draw. The last line is shorter so it reads as a
   * paragraph.
   */
  lines?: number

  /**
   * Font size of the text this placeholder replaces.
   */
  size?: SkeletonSize

  /**
   * Width of the placeholder. Defaults to the full width of its container.
   */
  width?: string | number
}

type SkeletonTextStyle = ComponentStyle<'skeletonText'> & {
  /** One style per line. Empty when there's only one line. */
  rows: StyleObject[]
}

type SkeletonTextProps = SkeletonTextOwnProps &
  OtherHTMLAttributes<SkeletonTextOwnProps>

const allowedProps: (keyof SkeletonTextOwnProps)[] = [
  'animate',
  'elementRef',
  'lineHeight',
  'lines',
  'size',
  'width'
]

export { allowedProps }
export type {
  SkeletonLineHeight,
  SkeletonSize,
  SkeletonTextOwnProps,
  SkeletonTextProps,
  SkeletonTextStyle
}
