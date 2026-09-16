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
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { ComponentStyle, StyleObject } from '@instructure/emotion'

type SkeletonLoaderTheme = ReturnType<NewComponentTypes['SkeletonLoader']>

type SkeletonShapeType = 'text' | 'rectangle' | 'circle'
type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type SkeletonLeading = 'heading' | 'text'

type SkeletonShapeOwnProps = {
  /**
   * Set to `false` to force a static shape regardless of the user's motion
   * preference. Use it for snapshot and visual-regression tests, where a
   * running animation makes diffs unstable.
   */
  animate?: boolean

  /**
   * Aspect ratio for `shape="rectangle"` when no `height` is given.
   */
  aspectRatio?: string

  /**
   * Diameter for `shape="circle"`.
   */
  diameter?: string | number

  /**
   * Provides a reference to the underlying HTML element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Fixed height for `shape="rectangle"`. Prefer `aspectRatio` for media, so the
   * box scales with its column. Text height comes from `size`, not from this.
   */
  height?: string | number

  /**
   * Which line-height ramp the replaced text uses. InstUI headings are 1.25 and
   * body text is 1.5; picking the wrong one shifts the layout on swap.
   */
  leading?: SkeletonLeading

  /**
   * How many text rows to draw. The block height is exactly
   * `lines x leading x size`, so it reserves the right space with no measurement.
   */
  lines?: number

  /**
   * Corner radius override for `shape="rectangle"`.
   */
  radius?: string

  /**
   * Which primitive to render. `text` draws one or more bars sized to a line of
   * copy, `rectangle` reserves a media box, `circle` stands in for an avatar.
   */
  shape?: SkeletonShapeType

  /**
   * Step on the type ramp, used only by `shape="text"`. Sets the bar height to
   * the font size of the text being replaced.
   */
  size?: SkeletonSize

  /**
   * Width of the shape. Set it to the real content's width where that is known.
   */
  width?: string | number
}

type SkeletonShapeStyle = ComponentStyle<'skeletonShape'> & {
  /**
   * One entry per rendered row. Empty for single-row text and for the
   * rectangle and circle shapes, which need no children.
   */
  rows: StyleObject[]
}

type SkeletonShapeProps = SkeletonShapeOwnProps &
  OtherHTMLAttributes<SkeletonShapeOwnProps>

const allowedProps: (keyof SkeletonShapeOwnProps)[] = [
  'animate',
  'aspectRatio',
  'diameter',
  'elementRef',
  'height',
  'leading',
  'lines',
  'radius',
  'shape',
  'size',
  'width'
]

export { allowedProps }
export type {
  SkeletonLeading,
  SkeletonLoaderTheme,
  SkeletonShapeOwnProps,
  SkeletonShapeProps,
  SkeletonShapeStyle,
  SkeletonShapeType,
  SkeletonSize
}
