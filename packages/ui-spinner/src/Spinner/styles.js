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

import generateComponentTheme from './theme'
import { keyframes } from '@instructure/emotion'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, { size, variant }, state) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

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

  const rootSizes = {
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
    root: {
      label: 'root',
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...rootSizes[size]
    },
    circle: {
      label: 'circle',
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      animationName: rotate,
      animationDuration: '2.25s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      ...circleSizes[size]
    },
    circleTrack: {
      label: 'circleTrack',
      stroke: componentTheme.trackColor,
      fill: 'none',
      ...circleTrackSizes[size]
    },
    circleSpin: {
      label: 'circleSpin',
      fill: 'none',
      strokeLinecap: 'round',
      animationName: morph,
      animationDuration: '1.75s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease',
      ...circleSpinSizes[size],
      ...circleSpinVariant[variant]
    }
  }
}
export default generateStyle
