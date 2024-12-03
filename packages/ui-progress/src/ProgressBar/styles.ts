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

import type { ProgressBarTheme } from '@instructure/shared-types'
import type { ProgressBarProps, ProgressBarStyle } from './props'

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
  componentTheme: ProgressBarTheme,
  props: ProgressBarProps
): ProgressBarStyle => {
  const {
    valueNow = 0,
    valueMax = 100,
    size,
    color,
    meterColor,
    shouldAnimate
  } = props

  const meterColorClassName =
    typeof meterColor === 'function'
      ? meterColor({ valueNow, valueMax })
      : meterColor

  const currentValue =
    valueNow > valueMax ? valueMax : valueNow < 0 ? 0 : valueNow

  const currentValuePercent = `${(currentValue / valueMax) * 100}%`

  const sizeVariants = {
    'x-small': {
      track: { height: componentTheme.xSmallHeight },
      value: { fontSize: componentTheme.xSmallValueFontSize }
    },
    small: {
      track: { height: componentTheme.smallHeight }, // product design wants = 18px
      value: { fontSize: componentTheme.smallValueFontSize }
    },
    medium: {
      track: { height: componentTheme.mediumHeight },
      value: { fontSize: componentTheme.mediumValueFontSize }
    },
    large: {
      track: { height: componentTheme.largeHeight },
      value: { fontSize: componentTheme.largeValueFontSize }
    }
  }

  const colorVariants = {
    primary: {
      trackLayout: { background: componentTheme.trackColor },
      trackBorder: {
        borderBottomColor: componentTheme.trackBottomBorderColor
      }
    },
    'primary-inverse': {
      trackLayout: { background: componentTheme.trackColorInverse },
      trackBorder: {
        borderBottomColor: componentTheme.trackBottomBorderColorInverse
      }
    }
  }

  const trackBackgroundVariants = {
    primary: {
      brand: { background: componentTheme.meterColorBrand },
      info: { background: componentTheme.meterColorInfo },
      success: { background: componentTheme.meterColorSuccess },
      danger: { background: componentTheme.meterColorDanger },
      warning: { background: componentTheme.meterColorWarning },
      alert: { background: componentTheme.meterColorAlert }
    },
    'primary-inverse': {
      brand: { background: componentTheme.meterColorBrandInverse },
      info: { background: componentTheme.meterColorInfoInverse },
      success: { background: componentTheme.meterColorSuccessInverse },
      danger: { background: componentTheme.meterColorDangerInverse },
      warning: { background: componentTheme.meterColorWarningInverse },
      alert: { background: componentTheme.meterColorAlertInverse }
    }
  }

  return {
    progressBar: {
      label: 'progressBar',
      display: 'flex',
      alignItems: 'center',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      fontSize: componentTheme.fontSize,
      borderRadius: componentTheme.borderRadius
    },

    trackLayout: {
      label: 'progressBar__trackLayout',
      position: 'relative',
      flex: 1,
      borderRadius: 'inherit',

      ...colorVariants[color!].trackLayout
    },

    track: {
      label: 'progressBar__track',
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      borderBottomWidth: componentTheme.trackBottomBorderWidth,
      borderBottomStyle: 'solid',
      background: 'transparent',
      borderRadius: 'inherit',

      ...sizeVariants[size!].track,
      ...colorVariants[color!].trackBorder
    },

    trackValue: {
      label: 'progressBar__trackValue',
      display: 'block',
      boxSizing: 'border-box',
      height: '100%',
      width: currentValuePercent,
      maxWidth: '100%',
      borderRadius: 'inherit',

      ...(shouldAnimate && { transition: 'all 0.5s' }),
      ...(meterColorClassName &&
        trackBackgroundVariants[color!][meterColorClassName])
    },

    value: {
      label: 'progressBar__value',
      lineHeight: 1,
      boxSizing: 'border-box',
      paddingInlineStart: componentTheme.valuePadding,
      flex: '0 0 5.625rem',

      ...sizeVariants[size!].value
    },

    htmlProgress: {
      label: 'progressBar__htmlProgress',
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      zIndex: -1,
      opacity: 0
    }
  }
}

export default generateStyle
