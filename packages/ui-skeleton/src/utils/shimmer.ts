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
import type { NewComponentTypes } from '@instructure/ui-themes'

type SkeletonLoaderTheme = ReturnType<NewComponentTypes['SkeletonLoader']>

/**
 * The gradient is twice as wide as the shape. A percentage
 * `background-position` can't move a background that is exactly as wide as
 * its element, so it needs the extra width to slide across.
 */
const GRADIENT_SCALE = 2

/**
 * Highlight positions, as a fraction of the shape's width. At `ENTER` and
 * `EXIT` the highlight is fully outside the shape, so the jump from the end of
 * one loop to the start of the next isn't visible. `REST` is where it sits when
 * the shape isn't animating.
 */
const HIGHLIGHT_ENTER = -0.5
const HIGHLIGHT_EXIT = 1.5
const HIGHLIGHT_REST = 0.3

/** Converts a highlight position into a `background-position` percentage. */
const positionFor = (highlight: number) =>
  `${(1 - highlight) * 100 * (GRADIENT_SCALE - 1)}% 0`

// Defined once at module scope. Creating keyframes inside a style function
// generates a new animation name on every render (same as Spinner v2).
const sweep = (isRtl: boolean) => keyframes`
  from { background-position: ${positionFor(
    isRtl ? HIGHLIGHT_EXIT : HIGHLIGHT_ENTER
  )}; }
  to   { background-position: ${positionFor(
    isRtl ? HIGHLIGHT_ENTER : HIGHLIGHT_EXIT
  )}; }
`
const sweepLtr = sweep(false)
const sweepRtl = sweep(true)

/**
 * The fill shared by every shape: a base color with a highlight that sweeps
 * across it. The gradient fades back to the base color rather than to
 * `transparent`, which would show a dark band in some browsers.
 */
const shimmerStyles = (
  componentTheme: SkeletonLoaderTheme,
  isRtl: boolean,
  animate: boolean
) => {
  const base = componentTheme.backgroundColor
  const highlight = componentTheme.shimmerColor

  return {
    backgroundColor: base,
    backgroundImage: `linear-gradient(90deg, ${base} 0%, ${base} 25%, ${highlight} 50%, ${base} 75%, ${base} 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${GRADIENT_SCALE * 100}% 100%`,
    backgroundPosition: positionFor(
      isRtl ? 1 - HIGHLIGHT_REST : HIGHLIGHT_REST
    ),
    ...(animate
      ? {
          // The animation loops until the skeleton is removed, so it only runs
          // when the user hasn't asked for reduced motion (WCAG 2.2.2).
          '@media (prefers-reduced-motion: no-preference)': {
            animationName: isRtl ? sweepRtl : sweepLtr,
            animationDuration: componentTheme.duration,
            animationTimingFunction: `cubic-bezier(${componentTheme.bezier})`,
            animationIterationCount: 'infinite'
          }
        }
      : {})
  }
}

export { shimmerStyles }
export type { SkeletonLoaderTheme }
