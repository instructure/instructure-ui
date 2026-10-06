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
import type { SkeletonTextProps, SkeletonTextStyle } from './props'

type StyleParams = {
  animate: SkeletonTextProps['animate']
  lineHeight: SkeletonTextProps['lineHeight']
  lines: SkeletonTextProps['lines']
  size: SkeletonTextProps['size']
  width: SkeletonTextProps['width']
  textDirection: 'ltr' | 'rtl' | 'auto'
}

const LINE_HEIGHTS = {
  heading: 1.25,
  text: 1.5
} as const

const generateStyle = (
  componentTheme: SkeletonLoaderTheme,
  params: StyleParams,
  // Unused, but `useStyleNew` needs the three-argument signature to infer the
  // component theme type.
  _sharedTokens?: SharedTokens
): SkeletonTextStyle => {
  const {
    animate = true,
    lineHeight = 'heading',
    lines = 1,
    size = 'md',
    width,
    textDirection
  } = params

  const shimmer = shimmerStyles(
    componentTheme,
    textDirection === 'rtl',
    animate
  )
  const fontSizes = {
    xs: componentTheme.textHeightXs,
    sm: componentTheme.textHeightSm,
    md: componentTheme.textHeightMd,
    lg: componentTheme.textHeightLg,
    xl: componentTheme.textHeightXl,
    xxl: componentTheme.textHeightXxl
  }

  // Each bar is as tall as the font size (1em). The rest of the line height is
  // split into equal padding above and below it, so a line takes up exactly
  // `lineHeight x font-size`, the same as a line of real text.
  const row = `${LINE_HEIGHTS[lineHeight]}em`
  const bar = {
    display: 'block',
    boxSizing: 'content-box',
    height: '1em',
    padding: `calc((${row} - 1em) / 2) 0`,
    backgroundClip: 'content-box',
    borderRadius: componentTheme.textBorderRadius,
    ...shimmer
  } as const

  const block = {
    label: 'skeletonText',
    display: 'block',
    fontSize: fontSizes[size] ?? componentTheme.textHeightMd,
    width: width ?? '100%'
  } as const

  if (lines <= 1) {
    return { skeletonText: { ...block, ...bar }, rows: [] }
  }

  // Each line is its own element so every bar gets rounded ends.
  return {
    skeletonText: {
      ...block,
      boxSizing: 'border-box',
      height: `calc(${lines} * ${row})`
    },
    rows: Array.from({ length: lines }, (_unused, i) => ({
      label: 'skeletonText__row',
      ...bar,
      width: i === lines - 1 ? '75%' : '100%'
    }))
  }
}

export default generateStyle
export { generateStyle }
export type { StyleParams }
