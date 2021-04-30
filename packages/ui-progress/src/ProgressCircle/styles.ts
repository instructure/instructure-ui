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
  const { size, color, meterColor, valueNow, valueMax } = props
  const { shouldAnimateOnMount } = state

  const getMeterColorClassName =
    typeof meterColor === 'function'
      ? meterColor({ valueNow, valueMax })
      : meterColor

  const getCircumference = () => {
    const camelSize = size === 'x-small' ? 'xSmall' : size
    // get the circumference of the meter circle
    return parseFloat(componentTheme[`${camelSize}Circumference`])
  }

  const getRadii = () => {
    const camelSize = size === 'x-small' ? 'xSmall' : size
    return {
      radius: componentTheme[`${camelSize}Radius`],
      borderOffsetRadius: componentTheme[`${camelSize}BorderOffset`]
    }
  }

  const getDashOffset = () => {
    // send the stroke-dashoffset to the meter circle, checking
    // to make sure current value doesn't exceed max value
    if (valueNow < valueMax) {
      const circumference = getCircumference()
      // figure out how much offset to give the stroke to show the % complete
      return circumference - (valueNow / valueMax) * circumference
    } else {
      return 0
    }
  }

  /*
     Using !important on the meter shouldAnimateOnMount versions
     to guarantee that the bars will start showing 0 if the
     animateOnMount prop is set
  */
  const sizeVariants = {
    'x-small': {
      progressCircle: {
        width: componentTheme.xSmallSize,
        height: componentTheme.xSmallSize
      },
      circle: {
        width: componentTheme.xSmallSize,
        height: componentTheme.xSmallSize
      },
      value: {
        padding: '0.5rem'
      },
      border: {
        transformOrigin: `${componentTheme.xSmallTransform} ${componentTheme.xSmallTransform}`
      },
      track: {
        transformOrigin: `${componentTheme.xSmallTransform} ${componentTheme.xSmallTransform}`,
        strokeWidth: componentTheme.xSmallStrokeWidth
      },
      meter: {
        strokeWidth: componentTheme.xSmallStrokeWidth,
        strokeDasharray: componentTheme.xSmallCircumference,
        ...(shouldAnimateOnMount && {
          strokeDashoffset: `${componentTheme.xSmallCircumference} !important`
        })
      }
    },
    small: {
      progressCircle: {
        width: componentTheme.smallSize,
        height: componentTheme.smallSize
      },

      circle: {
        width: componentTheme.smallSize,
        height: componentTheme.smallSize
      },
      border: {
        transformOrigin: `${componentTheme.smallTransform} ${componentTheme.smallTransform}`
      },
      track: {
        transformOrigin: `${componentTheme.smallTransform} ${componentTheme.smallTransform}`,
        strokeWidth: componentTheme.smallStrokeWidth
      },
      meter: {
        strokeWidth: componentTheme.smallStrokeWidth,
        strokeDasharray: componentTheme.smallCircumference,
        ...(shouldAnimateOnMount && {
          strokeDashoffset: `${componentTheme.smallCircumference} !important`
        })
      }
    },
    medium: {
      progressCircle: {
        width: componentTheme.mediumSize,
        height: componentTheme.mediumSize
      },
      circle: {
        width: componentTheme.mediumSize,
        height: componentTheme.mediumSize
      },
      border: {
        transformOrigin: `${componentTheme.mediumTransform} ${componentTheme.mediumTransform}`
      },
      track: {
        transformOrigin: `${componentTheme.mediumTransform} ${componentTheme.mediumTransform}`,
        strokeWidth: componentTheme.mediumStrokeWidth
      },
      meter: {
        strokeWidth: componentTheme.mediumStrokeWidth,
        strokeDasharray: componentTheme.mediumCircumference,
        ...(shouldAnimateOnMount && {
          strokeDashoffset: `${componentTheme.mediumCircumference} !important`
        })
      }
    },
    large: {
      progressCircle: {
        width: componentTheme.largeSize,
        height: componentTheme.largeSize
      },
      circle: {
        width: componentTheme.largeSize,
        height: componentTheme.largeSize
      },
      border: {
        transformOrigin: `${componentTheme.largeTransform} ${componentTheme.largeTransform}`
      },
      track: {
        transformOrigin: `${componentTheme.largeTransform} ${componentTheme.largeTransform}`,
        strokeWidth: componentTheme.largeStrokeWidth
      },
      meter: {
        strokeWidth: componentTheme.largeStrokeWidth,
        strokeDasharray: componentTheme.largeCircumference,
        ...(shouldAnimateOnMount && {
          strokeDashoffset: `${componentTheme.largeCircumference} !important`
        })
      }
    }
  }

  const colorVariants = {
    primary: {
      track: { stroke: componentTheme.trackColor },
      value: { color: componentTheme.color },
      border: { stroke: componentTheme.trackBorderColor }
    },
    'primary-inverse': {
      track: { stroke: componentTheme.trackColorInverse },
      value: { color: componentTheme.colorInverse },
      border: { stroke: componentTheme.trackBorderColorInverse }
    }
  }

  const meterColorVariants = {
    primary: {
      brand: { stroke: componentTheme.meterColorBrand },
      info: { stroke: componentTheme.meterColorInfo },
      warning: { stroke: componentTheme.meterColorWarning },
      danger: { stroke: componentTheme.meterColorDanger },
      alert: { stroke: componentTheme.meterColorAlert },
      success: { stroke: componentTheme.meterColorSuccess }
    },
    'primary-inverse': {
      brand: { stroke: componentTheme.meterColorBrandInverse },
      info: { stroke: componentTheme.meterColorInfoInverse },
      warning: { stroke: componentTheme.meterColorWarningInverse },
      danger: { stroke: componentTheme.meterColorDangerInverse },
      alert: { stroke: componentTheme.meterColorAlertInverse },
      success: { stroke: componentTheme.meterColorSuccessInverse }
    }
  }

  return {
    progressCircle: {
      label: 'progressCircle',
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      overflow: 'hidden',

      /*
        Seems like a good idea to reset font-size because
        the SVG uses ems and might inherit a container's
        font-size
      */
      fontSize: '1rem',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].progressCircle
    },

    center: {
      label: 'progressCircle__center',
      transition: 'all 0.5s',
      transitionDelay: '1s',
      display: 'block',
      position: 'absolute',
      transform: 'translate3d(0, 0, 0)',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].center,
      ...(shouldAnimateOnMount && {
        opacity: 0,
        transform: 'translate3d(0, 10%, 0)'
      })
    },

    value: {
      label: 'progressCircle__value',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      textAlign: 'center',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      width: '100%',
      height: '100%',
      lineHeight: 1,

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].value,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colorVariants[color].value
    },

    circle: {
      label: 'progressCircle__circle',
      transform: 'rotate(-90deg)',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].circle
    },

    track: {
      label: 'progressCircle__track',
      fill: 'none',
      opacity: 1,
      transition: 'all 0.5s',
      transitionDelay: '0.2s',
      transform: 'translate3d(0, 0, 0)',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].track,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colorVariants[color].track,
      ...(shouldAnimateOnMount && {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      })
    },

    border: {
      label: 'progressCircle__border',
      fill: 'none',
      opacity: 1,
      transition: 'all 0.5s',
      transform: 'translate3d(0, 0, 0) scale(1)',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].border,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colorVariants[color].border,
      ...(shouldAnimateOnMount && {
        opacity: 0,
        transform: 'translate3d(0, 0, 0) scale(0.75)'
      })
    },

    meter: {
      label: 'progressCircle__meter',
      fill: 'none',
      transition: 'stroke-dashoffset 1s',
      transform: 'translate3d(0, 0, 0)',

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size].meter,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...meterColorVariants[color][getMeterColorClassName],
      ...(shouldAnimateOnMount && {
        opacity: 0
      })
    },

    radii: getRadii(),
    dashOffset: getDashOffset()
  }
}

export default generateStyle
