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

// keyframes have to be outside of 'generateStyle',
// since it is causing problems in style recalculation
const pulseAnimation = keyframes`
  to {
    transform: scale(1);
    opacity: 0.9;
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { type, variant, placement, standalone, pulse } = props

  const top = placement.indexOf('top') > -1
  const bottom = placement.indexOf('bottom') > -1
  const start = placement.indexOf('start') > -1
  const end = placement.indexOf('end') > -1
  const center = placement.indexOf('center') > -1

  const variantVariants = {
    danger: { backgroundColor: componentTheme.colorDanger },
    success: { backgroundColor: componentTheme.colorSuccess },
    primary: { backgroundColor: componentTheme.colorPrimary }
  }

  const pulseBorderVariants = {
    danger: { borderColor: componentTheme.colorDanger },
    success: { borderColor: componentTheme.colorSuccess },
    primary: { borderColor: componentTheme.colorPrimary }
  }

  const countPositions = {
    ...(top && { top: `calc(-1 * ${componentTheme.countOffset})` }),
    ...(bottom && { bottom: `calc(-1 * ${componentTheme.countOffset})` }),
    ...(start && {
      insetInlineStart: `calc(-1 * ${componentTheme.countOffset})`,
      insetInlineEnd: 'auto'
    }),
    ...(end && {
      insetInlineEnd: `calc(-1 * ${componentTheme.countOffset})`,
      insetInlineStart: 'auto'
    }),
    ...(center && {
      ...((end || start) && {
        top: `calc(50% - (${componentTheme.size} / 2))`
      }),
      ...(start && {
        insetInlineStart: 'auto',
        insetInlineEnd: `calc(100% - ${componentTheme.countOffset})`
      }),
      ...(end && {
        insetInlineEnd: 'auto',
        insetInlineStart: `calc(100% - ${componentTheme.countOffset})`
      })
    })
  }

  const notificationPositions = {
    ...(top && { top: componentTheme.notificationOffset }),
    ...(bottom && { bottom: componentTheme.notificationOffset }),
    ...(start && {
      insetInlineStart: componentTheme.notificationOffset,
      insetInlineEnd: 'auto'
    }),
    ...(end && {
      insetInlineEnd: componentTheme.notificationOffset,
      insetInlineStart: 'auto'
    }),
    ...(center && {
      ...((end || start) && {
        top: `calc(50% - (${componentTheme.sizeNotification} / 2))`
      }),
      ...(start && {
        insetInlineStart: `calc(-1 * ${componentTheme.sizeNotification} / 2)`,
        insetInlineEnd: 'auto'
      }),
      ...(end && {
        insetInlineEnd: `calc(-1 * ${componentTheme.sizeNotification} / 2)`,
        insetInlineStart: 'auto'
      })
    })
  }

  const notStandaloneTypeVariant = {
    count: countPositions,
    notification: notificationPositions
  }

  const typeVariant = {
    count: {
      lineHeight: componentTheme.size,
      minWidth: componentTheme.size,
      paddingInlineStart: componentTheme.padding,
      paddingInlineEnd: componentTheme.padding
    },
    notification: {
      width: componentTheme.sizeNotification,
      height: componentTheme.sizeNotification
    }
  }

  return {
    badge: {
      label: 'badge',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      boxSizing: 'border-box',
      pointerEvents: 'none',
      textAlign: 'center',
      color: componentTheme.color,
      fontSize: componentTheme.fontSize,
      whiteSpace: 'nowrap',
      borderRadius: componentTheme.borderRadius,

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...variantVariants[variant],

      ...(pulse && {
        position: 'relative',

        '&::before': {
          content: '""',
          width: 'calc(100% + 0.5rem)',
          height: 'calc(100% + 0.5rem)',
          borderRadius: componentTheme.borderRadius,
          position: 'absolute',
          top: '-0.25rem',
          insetInlineEnd: 'auto',
          insetInlineStart: '-0.25rem',
          boxSizing: 'border-box',
          border: `${componentTheme.pulseBorderThickness} solid`,
          opacity: 0,
          transform: 'scale(0.75)',
          animationName: pulseAnimation,
          animationDuration: '1s',
          animationIterationCount: '4',
          animationDirection: 'alternate',
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...pulseBorderVariants[variant]
        }
      }),

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...typeVariant[type],

      ...(!standalone && {
        position: 'absolute',
        zIndex: componentTheme.notificationZIndex,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...notStandaloneTypeVariant[type]
      })
    },
    wrapper: {
      label: 'badge__wrapper',
      position: 'relative',
      boxSizing: 'border-box',

      svg: { display: 'block' }
    }
  }
}

export default generateStyle
