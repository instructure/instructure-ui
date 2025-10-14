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

import { keyframes, mapSpacingToShorthand } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'

import type { SpinnerProps, SpinnerStyle } from './props'

type StyleParams = {
  size: SpinnerProps['size']
  variant: SpinnerProps['variant']
  themeOverride: SpinnerProps['themeOverride']
  margin: SpinnerProps['margin']
}

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
      stroke-dashoffset: 00%;
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
  componentTheme: NewComponentTypes['Spinner'],
  params: StyleParams,
  //TODO type themes properly
  theme: any
): SpinnerStyle => {
  const { size, variant, margin } = params

  const spinnerSizes = {
    'x-small': {
      width: componentTheme.containerSizeXs,
      height: componentTheme.containerSizeXs
    },
    small: {
      width: componentTheme.containerSizeSm,
      height: componentTheme.containerSizeSm
    },
    medium: {
      width: componentTheme.containerSizeMd,
      height: componentTheme.containerSizeMd
    },
    large: {
      width: componentTheme.containerSizeLg,
      height: componentTheme.containerSizeLg
    }
  }

  const circleSizes = {
    'x-small': {
      width: componentTheme.containerSizeXs,
      height: componentTheme.containerSizeXs
    },
    small: {
      width: componentTheme.containerSizeSm,
      height: componentTheme.containerSizeSm
    },
    medium: {
      width: componentTheme.containerSizeMd,
      height: componentTheme.containerSizeMd
    },
    large: {
      width: componentTheme.containerSizeLg,
      height: componentTheme.containerSizeLg
    }
  }

  const circleTrackSizes = {
    'x-small': {
      strokeWidth: componentTheme.strokeWidthXs
    },
    small: {
      strokeWidth: componentTheme.strokeWidthSm
    },
    medium: {
      strokeWidth: componentTheme.strokeWidthMd
    },
    large: {
      strokeWidth: componentTheme.strokeWidthLg
    }
  }

  const radii = {
    'x-small': `calc(50% - ${componentTheme.strokeWidthXs} / 2)`,
    small: `calc(50% - ${componentTheme.strokeWidthSm} / 2)`,
    medium: `calc(50% - ${componentTheme.strokeWidthMd} / 2)`,
    large: `calc(50% - ${componentTheme.strokeWidthLg} / 2)`
  }

  const circleSpinSizes = {
    'x-small': {
      strokeWidth: componentTheme.strokeWidthXs,
      transformOrigin: `calc(${componentTheme.containerSizeXs} / 2) calc(${componentTheme.containerSizeXs} / 2)`
    },
    small: {
      strokeWidth: componentTheme.strokeWidthSm,
      transformOrigin: `calc(${componentTheme.containerSizeSm} / 2) calc(${componentTheme.containerSizeSm} / 2)`
    },
    medium: {
      strokeWidth: componentTheme.strokeWidthMd,
      transformOrigin: `calc(${componentTheme.containerSizeMd} / 2) calc(${componentTheme.containerSizeMd} / 2)`
    },
    large: {
      strokeWidth: componentTheme.strokeWidthLg,
      transformOrigin: `calc(${componentTheme.containerSizeLg} / 2) calc(${componentTheme.containerSizeLg} / 2)` //7em
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
      ...spinnerSizes[size!],
      margin: mapSpacingToShorthand(margin, theme.semantics.spacing)
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
      width: '100%',
      height: '100%',
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
      strokeDasharray: `calc(${radii[size!]} * 2 * 3.14159 * 0.75) 1000px`,
      ...circleSpinSizes[size!],
      ...circleSpinVariant[variant!]
    },
    radius: radii[size!]
  }
}

export default generateStyle
