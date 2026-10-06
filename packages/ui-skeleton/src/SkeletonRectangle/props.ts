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
import type { ComponentStyle } from '@instructure/emotion'

type SkeletonRectangleOwnProps = {
  /**
   * Set to `false` to turn off the animation, whatever the user's motion
   * setting. Useful for snapshot and visual regression tests.
   */
  animate?: boolean

  /**
   * Aspect ratio of the rectangle, e.g. `"16 / 9"`. Used when `height` isn't
   * set, so the rectangle scales with the width of its container.
   */
  aspectRatio?: string

  /**
   * Provides a reference to the underlying HTML element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Fixed height. When set, `aspectRatio` is ignored.
   */
  height?: string | number

  /**
   * Corner radius. Defaults to the theme's image border radius.
   */
  radius?: string

  /**
   * Width of the rectangle. Defaults to the full width of its container.
   */
  width?: string | number
}

type SkeletonRectangleStyle = ComponentStyle<'skeletonRectangle'>

type SkeletonRectangleProps = SkeletonRectangleOwnProps &
  OtherHTMLAttributes<SkeletonRectangleOwnProps>

const allowedProps: (keyof SkeletonRectangleOwnProps)[] = [
  'animate',
  'aspectRatio',
  'elementRef',
  'height',
  'radius',
  'width'
]

export { allowedProps }
export type {
  SkeletonRectangleOwnProps,
  SkeletonRectangleProps,
  SkeletonRectangleStyle
}
