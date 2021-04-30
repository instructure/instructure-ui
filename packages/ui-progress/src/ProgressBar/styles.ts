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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { valueNow, valueMax, size, color, meterColor } = props

  const meterColorClassName =
    typeof meterColor === 'function'
      ? meterColor({ valueNow, valueMax })
      : meterColor

  const sizeVariants = {
    'x-small': {
      track: { height: componentTheme.xSmallHeight },
      value: { fontSize: componentTheme.xSmallValueFontSize }
    },
    small: {
      track: { height: '1.125rem' }, // product design wants = 18px
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
      info: { background: componentTheme.meterColorSuccessInverse },
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
      fontSize: componentTheme.fontSize
    },

    trackLayout: {
      label: 'progressBar__trackLayout',
      position: 'relative',
      flex: 1,

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colorVariants[color].trackLayout
    },

    trackBorder: {
      label: 'progressBar__trackBorder',
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      borderBottomWidth: componentTheme.trackBottomBorderWidth,
      borderBottomStyle: 'solid',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colorVariants[color].trackBorder
    },

    track: {
      label: 'progressBar__track',
      '&[value]': {
        display: 'block',
        position: 'relative',
        boxSizing: 'border-box',
        appearance: 'none',
        background: 'transparent',
        width: '100%',
        border: 'none',

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...sizeVariants[size].track,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...colorVariants[color].track,

        '&::-webkit-progress-bar': { background: 'transparent' },

        '&::-webkit-progress-value': {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...trackBackgroundVariants[color][meterColorClassName]
        },
        '&::-moz-progress-bar': {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...trackBackgroundVariants[color][meterColorClassName]
        },
        '&::-ms-fill': {
          border: 'none',
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...trackBackgroundVariants[color][meterColorClassName]
        }
      }
    },

    value: {
      label: 'progressBar__value',
      lineHeight: 1,
      boxSizing: 'border-box',
      paddingInlineStart: componentTheme.valuePadding,
      flex: '0 0 5.625rem',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].value
    }
  }
}

export default generateStyle
