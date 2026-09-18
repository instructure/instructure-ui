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

import { keyframes } from '@instructure/emotion'

import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'

import type { SkeletonShapeProps, SkeletonShapeStyle } from './props'

type StyleParams = {
  shape: SkeletonShapeProps['shape']
  size: SkeletonShapeProps['size']
  lines: SkeletonShapeProps['lines']
  leading: SkeletonShapeProps['leading']
  width: SkeletonShapeProps['width']
  height: SkeletonShapeProps['height']
  aspectRatio: SkeletonShapeProps['aspectRatio']
  radius: SkeletonShapeProps['radius']
  diameter: SkeletonShapeProps['diameter']
  animate: SkeletonShapeProps['animate']
  /** Resolved text direction. Named apart from the HTML `dir` attribute, which also allows "auto". */
  textDirection: 'ltr' | 'rtl' | 'auto'
}

/** Figma `motion-duration-skeleton`. No token exists for this yet. */
const SWEEP_DURATION_MS = 1500

const SWEEP_DURATION = `${SWEEP_DURATION_MS}ms`

/** Figma `motion-easing-skeleton` — ease-in-out. No token exists for this yet. */
const SWEEP_EASING = 'cubic-bezier(0.42, 0, 0.58, 1)'

/**
 * Gradient width as a multiple of the shape's own width.
 *
 * It has to be wider than the shape, and not by a fixed length. A percentage
 * `background-position` resolves against `container width - image width`, so a
 * gradient sized to exactly `100%` has a zero-width positioning range and
 * cannot be moved at all — the animation runs and nothing happens. At `200%`
 * there is a full shape-width of travel, and because it is proportional the
 * highlight stays the same relative size on a 32px avatar and a 900px bar.
 */
const GRADIENT_SCALE = 2

/**
 * Where the highlight sits, as a fraction of the shape's width, at the points
 * that matter.
 *
 * `ENTER` and `EXIT` are where the lit band — the middle half of the gradient,
 * between the flat shoulders — has cleared the shape entirely, so it renders as
 * uniform base color and the loop's wrap cannot be seen. `REST` is where a
 * shape sits when it is not animating at all.
 */
const HIGHLIGHT_ENTER = -0.5
const HIGHLIGHT_EXIT = 1.5
const HIGHLIGHT_REST = 0.3

/**
 * Converts a highlight position into the `background-position` percentage that
 * puts it there. With the gradient at `GRADIENT_SCALE x` the shape's width, the
 * offset works out to `width x (1 - pct/100)`, so this is that inverted.
 */
const positionFor = (highlight: number) =>
  (1 - highlight) * 100 * (GRADIENT_SCALE - 1)

/**
 * The highlight travels toward the trailing edge, so it rests `HIGHLIGHT_REST`
 * in from whichever edge it entered.
 */
const restHighlight = (isRtl: boolean) =>
  isRtl ? 1 - HIGHLIGHT_REST : HIGHLIGHT_REST

/** Resting `background-position`, used whenever the shape is not animating. */
const restPosition = (isRtl: boolean) =>
  `${positionFor(restHighlight(isRtl))}% 0`

/** Row height as a multiple of font size, matching InstUI's two line-height ramps. */
const LEADING = {
  heading: 1.25,
  text: 1.5
} as const

// Keyframes live at module scope on purpose. Generating them inside
// `generateStyle` creates a new animation name on every render, which breaks
// style recalculation (same reasoning as Spinner v2).
//
// One pass, looped. The wrap from `exit` back to `enter` is invisible because
// the lit band has cleared the shape at both ends and the gradient's flat
// shoulders make its tails identical to the base color — see `shimmerStyles`.
// Without those shoulders the highlight would appear to jump sides on every
// repeat.
const sweepKeyframes = (isRtl: boolean) => {
  const enter = `${positionFor(isRtl ? HIGHLIGHT_EXIT : HIGHLIGHT_ENTER)}% 0`
  const exit = `${positionFor(isRtl ? HIGHLIGHT_ENTER : HIGHLIGHT_EXIT)}% 0`

  return keyframes`
    from { background-position: ${enter}; }
    to   { background-position: ${exit}; }
  `
}

const sweepLtr = sweepKeyframes(false)
const sweepRtl = sweepKeyframes(true)

/**
 * The shimmer fill, shared by every shape.
 *
 * The gradient fades from the base color out to the highlight and back to the
 * base instead of `transparent`. Interpolating toward transparent in sRGB goes
 * through transparent *black*, which shows as a dark halo in the middle of the
 * sweep on some engines.
 */
const shimmerStyles = (
  componentTheme: ReturnType<NewComponentTypes['SkeletonLoader']>,
  isRtl: boolean,
  animate: boolean
) => ({
  backgroundColor: componentTheme.backgroundColor,
  backgroundImage: `linear-gradient(90deg, ${componentTheme.backgroundColor} 0%, ${componentTheme.backgroundColor} 25%, ${componentTheme.shimmerColor} 50%, ${componentTheme.backgroundColor} 75%, ${componentTheme.backgroundColor} 100%)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${GRADIENT_SCALE * 100}% 100%`,
  backgroundPosition: restPosition(isRtl),
  ...(animate
    ? {
        // Opt in on `no-preference` rather than opting out on `reduce`: a user
        // agent that reports neither gets the static version, which is the
        // safer default.
        '@media (prefers-reduced-motion: no-preference)': {
          animationName: isRtl ? sweepRtl : sweepLtr,
          animationDuration: SWEEP_DURATION,
          animationTimingFunction: SWEEP_EASING,
          // Runs until the skeleton is replaced. A shimmer that stops while the
          // request is still in flight says the opposite of what it means, so
          // the loop is open-ended and `prefers-reduced-motion` above is the
          // stop mechanism. Both halves of that matter: without the query this
          // would be motion a user cannot turn off.
          animationIterationCount: 'infinite'
        }
      }
    : {})
})

/**
 * Turns a `size` into the geometry for one text row.
 *
 * Figma's rule: the bar is exactly the font size of the text it stands in for,
 * and the leading is carried *inside* each row as equal padding above and
 * below, rather than as a gap between rows. So a row is `leading x font-size`
 * and the padding is half the difference.
 *
 * Everything is expressed in `em` against the shape's own `font-size`, which is
 * what makes the whole ramp derivable from one value with no measurement.
 *
 * Note this derives the padding rather than reading `componentTheme.textPadding*`.
 * Those tokens hard-code `0.125 x font-size`, which is only correct for the
 * 1.25 heading leading; they cannot express `leading="text"` at 1.5.
 */
const textRowMetrics = (leading: keyof typeof LEADING) => {
  const row = `${LEADING[leading]}em`
  return { row, pad: `calc((${row} - 1em) / 2)` }
}

const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SkeletonLoader']>,
  params: StyleParams,
  // Unused, but the three-argument shape is what lets `useStyleNew` infer the
  // component theme instead of widening to the union of every component's tokens.
  _sharedTokens?: SharedTokens
): SkeletonShapeStyle => {
  const {
    shape = 'text',
    size = 'md',
    lines = 1,
    leading = 'heading',
    width,
    height,
    aspectRatio,
    diameter,
    radius,
    animate = true,
    textDirection
  } = params

  const isRtl = textDirection === 'rtl'
  const shimmer = shimmerStyles(componentTheme, isRtl, animate)
  const textHeights: Record<string, string> = {
    xs: componentTheme.textHeightXs,
    sm: componentTheme.textHeightSm,
    md: componentTheme.textHeightMd,
    lg: componentTheme.textHeightLg,
    xl: componentTheme.textHeightXl,
    xxl: componentTheme.textHeightXxl
  }

  if (shape === 'circle') {
    const d = diameter ?? '2rem'
    return {
      skeletonShape: {
        label: 'skeletonShape',
        display: 'inline-block',
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        width: d,
        height: d,
        flex: '0 0 auto',
        borderRadius: componentTheme.avatarBorderRadius,
        ...shimmer
      },
      rows: []
    }
  }

  if (shape === 'rectangle') {
    return {
      skeletonShape: {
        label: 'skeletonShape',
        display: 'block',
        boxSizing: 'border-box',
        width: width ?? '100%',
        ...(height ? { height } : { aspectRatio: aspectRatio ?? '16 / 9' }),
        borderRadius: radius ?? componentTheme.imageBorderRadius,
        ...shimmer
      },
      rows: []
    }
  }

  const { row, pad } = textRowMetrics(leading)
  const fontSize = textHeights[size] ?? componentTheme.textHeightMd

  // A single row needs no children, so it can carry the rounded ends directly.
  if (lines <= 1) {
    return {
      skeletonShape: {
        label: 'skeletonShape',
        display: 'block',
        boxSizing: 'content-box',
        fontSize,
        width: width ?? '100%',
        height: '1em',
        padding: `${pad} 0`,
        backgroundClip: 'content-box',
        borderRadius: componentTheme.textBorderRadius,
        ...shimmer
      },
      rows: []
    }
  }

  // Multiple rows are real child elements rather than one masked node. A
  // `repeating-linear-gradient` mask would render N rows in a single node with
  // no children at all, but a gradient mask cannot round the ends of each bar,
  // so `textBorderRadius` would be lost. The children keep the design intact
  // and are still pure markup — the server emits them, nothing measures them.
  return {
    skeletonShape: {
      label: 'skeletonShape',
      display: 'block',
      boxSizing: 'border-box',
      fontSize,
      width: width ?? '100%',
      height: `calc(${lines} * ${row})`
    },
    rows: Array.from({ length: lines }, (_unused, i) => ({
      label: 'skeletonShape__row',
      display: 'block',
      boxSizing: 'content-box',
      height: '1em',
      padding: `${pad} 0`,
      backgroundClip: 'content-box',
      borderRadius: componentTheme.textBorderRadius,
      width: i === lines - 1 ? '75%' : '100%',
      ...shimmer
    }))
  }
}

export default generateStyle
export type { StyleParams }
export {
  generateStyle,
  generateStyle as generateSkeletonStyles,
  shimmerStyles,
  textRowMetrics,
  restPosition,
  LEADING,
  SWEEP_DURATION,
  SWEEP_DURATION_MS,
  SWEEP_EASING,
  GRADIENT_SCALE,
  HIGHLIGHT_REST
}
