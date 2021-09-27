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

import type { AvatarTheme } from '@instructure/shared-types'
import type { AvatarProps, AvatarState, AvatarStyle } from './props'

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
  componentTheme: AvatarTheme,
  props: AvatarProps,
  state: AvatarState
): AvatarStyle => {
  const { size, color, shape, src } = props
  const { loaded } = state

  const sizeStyles = {
    auto: {
      fontSize: 'inherit',
      borderWidth: componentTheme.borderWidthSmall
    },
    'xx-small': {
      fontSize: '0.5rem',
      borderWidth: componentTheme.borderWidthSmall
    },
    'x-small': {
      fontSize: '0.75rem',
      borderWidth: componentTheme.borderWidthSmall
    },
    small: {
      fontSize: '1rem',
      borderWidth: componentTheme.borderWidthSmall
    },
    medium: {
      fontSize: '1.25rem',
      borderWidth: componentTheme.borderWidthMedium
    },
    large: {
      fontSize: '1.5rem',
      borderWidth: componentTheme.borderWidthMedium
    },
    'x-large': {
      fontSize: '1.75rem',
      borderWidth: componentTheme.borderWidthMedium
    },
    'xx-large': {
      fontSize: '2rem',
      borderWidth: componentTheme.borderWidthMedium
    }
  }

  const variantStyles = {
    circle: {
      width: '2.5em',
      position: 'relative',
      borderRadius: '100%',
      overflow: 'hidden'
    },
    rectangle: {
      width: '3em'
    }
  }

  const initialsColor = {
    default: componentTheme.color, // = brand
    shamrock: componentTheme.colorShamrock,
    barney: componentTheme.colorBarney,
    crimson: componentTheme.colorCrimson,
    fire: componentTheme.colorFire,
    licorice: componentTheme.colorLicorice,
    ash: componentTheme.colorAsh
  }

  return {
    avatar: {
      label: 'avatar',
      height: '2.5em',
      boxSizing: 'border-box',
      backgroundColor: componentTheme.background,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundClip: 'content-box',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      lineHeight: 0,
      textAlign: 'center',
      ...sizeStyles[size],
      ...variantStyles[shape],
      ...(loaded
        ? {
            backgroundImage: `url('${src}')`,
            border: 0,
            boxShadow: `inset 0 0 ${componentTheme.boxShadowBlur} 0 ${componentTheme.boxShadowColor}`
          }
        : {
            backgroundImage: undefined,
            borderStyle: 'solid',
            borderColor: componentTheme.borderColor
          })
    },
    initials: {
      label: 'avatar__initials',
      color: initialsColor[color],
      lineHeight: '2.375em',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      letterSpacing: '0.0313em'
    },
    loadImage: {
      label: 'avatar__loadImage',
      display: 'none'
    }
  }
}

export default generateStyle
