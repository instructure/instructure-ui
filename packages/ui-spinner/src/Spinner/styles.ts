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

import type { SpinnerTheme } from '@instructure/shared-types'
import type { SpinnerProps, SpinnerStyle } from './props'

// keyframes have to be outside of 'generateStyle',
// since it is causing problems in style recalculation
const rotate = keyframes`
    to {
      transform: rotate(360deg)
    }`

const morph = keyframes`
    0% {
      stroke-dashoffset: 190%;
    }

    50% {
      stroke-dashoffset: 50%;
      transform: rotate(90deg);
    }

    100% {
      stroke-dashoffset: 190%;
      transform: rotate(360deg);
    }`

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: SpinnerTheme,
  props: SpinnerProps
): SpinnerStyle => {
  const { size, variant } = props

  const spinnerSizes = {
    'x-small': {
      width: componentTheme.xSmallSize,
      height: componentTheme.xSmallSize
    },
    small: {
      width: componentTheme.smallSize,
      height: componentTheme.smallSize
    },
    medium: {
      width: componentTheme.mediumSize,
      height: componentTheme.mediumSize
    },
    large: {
      width: componentTheme.largeSize,
      height: componentTheme.largeSize
    }
  }

  const circleSizes = {
    'x-small': {
      width: componentTheme.xSmallSize,
      height: componentTheme.xSmallSize
    },
    small: {
      width: componentTheme.smallSize,
      height: componentTheme.smallSize
    },
    medium: {
      width: componentTheme.mediumSize,
      height: componentTheme.mediumSize
    },
    large: {
      width: componentTheme.largeSize,
      height: componentTheme.largeSize
    }
  }

  const circleTrackSizes = {
    'x-small': {
      strokeWidth: componentTheme.xSmallBorderWidth
    },
    small: {
      strokeWidth: componentTheme.smallBorderWidth
    },
    medium: {
      strokeWidth: componentTheme.mediumBorderWidth
    },
    large: {
      strokeWidth: componentTheme.largeBorderWidth
    }
  }

  const circleSpinSizes = {
    'x-small': {
      strokeWidth: componentTheme.xSmallBorderWidth,
      strokeDasharray: '3em',
      transformOrigin: `calc(${componentTheme.xSmallSize} / 2) calc(${componentTheme.xSmallSize} / 2)`
    },
    small: {
      strokeWidth: componentTheme.smallBorderWidth,
      strokeDasharray: '6em',
      transformOrigin: `calc(${componentTheme.smallSize} / 2) calc(${componentTheme.smallSize} / 2)`
    },
    medium: {
      strokeWidth: componentTheme.mediumBorderWidth,
      strokeDasharray: '10.5em',
      transformOrigin: `calc(${componentTheme.mediumSize} / 2) calc(${componentTheme.mediumSize} / 2)`
    },
    large: {
      strokeWidth: componentTheme.largeBorderWidth,
      strokeDasharray: '14em',
      transformOrigin: `calc(${componentTheme.largeSize} / 2) calc(${componentTheme.largeSize} / 2)`
    }
  }

  const circleSpinVariant = {
    default: { stroke: componentTheme.color },
    inverse: { stroke: componentTheme.inverseColor }
  }

  return {
    spinner: {
      label: 'spinner',
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...spinnerSizes[size!]
    },
    circle: {
      label: 'spinner__circle',
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      animationName: rotate,
      animationDuration: '2.25s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      ...circleSizes[size!]
    },
    circleTrack: {
      label: 'spinner__circleTrack',
      stroke: componentTheme.trackColor,
      fill: 'none',
      ...circleTrackSizes[size!]
    },
    circleSpin: {
      label: 'spinner__circleSpin',
      fill: 'none',
      strokeLinecap: 'round',
      animationName: morph,
      animationDuration: '1.75s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease',
      ...circleSpinSizes[size!],
      ...circleSpinVariant[variant!]
    }
  }
}

export default generateStyle
