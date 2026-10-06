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

import type { SharedTokens } from '@instructure/ui-themes'

import { shimmerStyles } from '../utils/shimmer.js'
import type { SkeletonLoaderTheme } from '../utils/shimmer'
import type { SkeletonRectangleProps, SkeletonRectangleStyle } from './props'

type StyleParams = {
  animate: SkeletonRectangleProps['animate']
  aspectRatio: SkeletonRectangleProps['aspectRatio']
  height: SkeletonRectangleProps['height']
  radius: SkeletonRectangleProps['radius']
  width: SkeletonRectangleProps['width']
  textDirection: 'ltr' | 'rtl' | 'auto'
}

const generateStyle = (
  componentTheme: SkeletonLoaderTheme,
  params: StyleParams,
  // Unused, but `useStyleNew` needs the three-argument signature to infer the
  // component theme type.
  _sharedTokens?: SharedTokens
): SkeletonRectangleStyle => {
  const {
    animate = true,
    aspectRatio = '16 / 9',
    height,
    radius,
    width,
    textDirection
  } = params

  return {
    skeletonRectangle: {
      label: 'skeletonRectangle',
      display: 'block',
      boxSizing: 'border-box',
      width: width ?? '100%',
      ...(height ? { height } : { aspectRatio }),
      borderRadius: radius ?? componentTheme.imageBorderRadius,
      ...shimmerStyles(componentTheme, textDirection === 'rtl', animate)
    }
  }
}

export default generateStyle
export { generateStyle }
export type { StyleParams }
