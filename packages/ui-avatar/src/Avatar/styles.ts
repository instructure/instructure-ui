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
import type { NewComponentTypes } from '@instructure/ui-themes'
import { AvatarProps, AvatarStyle } from './props'

type StyleParams = {
  loaded: boolean
  size: AvatarProps['size']
  color: AvatarProps['color']
  hasInverseColor: AvatarProps['hasInverseColor']
  shape: AvatarProps['shape']
  src: AvatarProps['src']
  showBorder: AvatarProps['showBorder']
  themeOverride: AvatarProps['themeOverride']
}
/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Avatar'],
  params: StyleParams
): AvatarStyle => {
  const { loaded, size, color, hasInverseColor, shape, src, showBorder } =
    params

  // TODO: this is a temporary solution and should be revised on component update
  // NOTE: this is needed due to design changes. The size of the component is calculated from "em" which means it is
  // tied to the fontSize. The font sizes changed for the icons, which meant that the container (component) size would've
  // changed too without additional calculations
  const calcNewScaler = (
    originalFontSize: number,
    newFontSize: number,
    originalScaler: number
  ) => {
    return `${(originalFontSize * originalScaler) / newFontSize}em`
  }

  const sizeStyles = {
    auto: {
      fontSize: 'inherit',
      borderWidth: componentTheme.borderWidthSm,
      width: '2.5em',
      height: '2.5em'
    },
    'xx-small': {
      fontSize: '0.625rem',
      borderWidth: componentTheme.borderWidthSm,
      width: calcNewScaler(0.5, 0.625, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(0.5, 0.625, 2.5)
    },
    'x-small': {
      fontSize: '0.875rem',
      borderWidth: componentTheme.borderWidthSm,
      width: calcNewScaler(0.75, 0.875, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(0.75, 0.875, 2.5)
    },
    small: {
      fontSize: '1.25rem',
      borderWidth: componentTheme.borderWidthSm,
      width: calcNewScaler(1, 1.25, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(1, 1.25, 2.5)
    },
    medium: {
      fontSize: '1.5rem',
      borderWidth: componentTheme.borderWidthMd,
      width: calcNewScaler(1.25, 1.5, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(1.25, 1.5, 2.5)
    },
    large: {
      fontSize: '1.75rem',
      borderWidth: componentTheme.borderWidthMd,
      width: calcNewScaler(1.5, 1.75, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(1.5, 1.75, 2.5)
    },
    'x-large': {
      fontSize: '2rem',
      borderWidth: componentTheme.borderWidthMd,
      width: calcNewScaler(1.75, 2, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(1.75, 2, 2.5)
    },
    'xx-large': {
      fontSize: '2.25rem',
      borderWidth: componentTheme.borderWidthMd,
      width: calcNewScaler(2, 2.25, shape === 'circle' ? 2.5 : 3),
      height: calcNewScaler(2, 2.25, 2.5)
    }
  }

  const initialSizeStyles = {
    auto: {
      fontSize: 'inherit'
    },
    'xx-small': {
      fontSize: '0.5rem'
    },
    'x-small': {
      fontSize: '0.75rem'
    },
    small: {
      fontSize: '1rem'
    },
    medium: {
      fontSize: '1.25rem'
    },
    large: {
      fontSize: '1.5rem'
    },
    'x-large': {
      fontSize: '1.75rem'
    },
    'xx-large': {
      fontSize: '2rem'
    }
  }

  const shapeStyles = {
    circle: {
      position: 'relative',
      borderRadius: '100%',
      overflow: 'hidden'
    },
    rectangle: {
      width: '3em'
    }
  }

  const colorVariants = {
    default: {
      text: componentTheme.accent1TextColor,
      background: componentTheme.accent1BackgroundColor,
      icon: componentTheme.accent1IconColor
    }, // = brand
    shamrock: {
      text: componentTheme.accent2TextColor,
      background: componentTheme.accent2BackgroundColor,
      icon: componentTheme.accent2IconColor
    },
    barney: {
      text: componentTheme.accent3TextColor,
      background: componentTheme.accent3BackgroundColor,
      icon: componentTheme.accent3IconColor
    },
    crimson: {
      text: componentTheme.accent4TextColor,
      background: componentTheme.accent4BackgroundColor,
      icon: componentTheme.accent4IconColor
    },
    fire: {
      text: componentTheme.accent5TextColor,
      background: componentTheme.accent5BackgroundColor,
      icon: componentTheme.accent5IconColor
    },
    licorice: {
      text: componentTheme.accent6TextColor,
      background: componentTheme.accent6BackgroundColor,
      icon: componentTheme.accent6IconColor
    },
    ash: {
      text: componentTheme.accent1TextColor,
      background: componentTheme.accent1BackgroundColor,
      icon: componentTheme.accent1IconColor
    },
    ai: `
        linear-gradient(to bottom,  ${componentTheme.aiTopGradientColor} 0%, ${componentTheme.aiBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom right, ${componentTheme.aiTopGradientColor} 0%, ${componentTheme.aiBottomGradientColor} 100%) border-box`
  }

  const background = () => {
    if (color === 'ai') {
      return {
        background: `
        linear-gradient(to bottom,  ${componentTheme.aiTopGradientColor} 0%, ${componentTheme.aiBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom right, ${componentTheme.aiTopGradientColor} 0%, ${componentTheme.aiBottomGradientColor} 100%) border-box`,
        border: 'solid transparent'
      }
    }
    return hasInverseColor
      ? {
          backgroundColor: colorVariants[color!].background,
          backgroundClip: 'content-box'
        }
      : {
          backgroundColor: componentTheme.backgroundColor,
          backgroundClip: 'content-box'
        }
  }

  const contentColor = () => {
    if (color === 'ai') {
      return componentTheme.aiFontColor
    }
    return hasInverseColor
      ? componentTheme.backgroundColor
      : colorVariants[color!].text
  }

  return {
    avatar: {
      label: 'avatar',
      boxSizing: 'border-box',
      borderStyle: 'solid',
      borderColor: componentTheme.borderColor,
      ...background(),
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      lineHeight: 0,
      textAlign: 'center',
      ...sizeStyles[size!],
      ...shapeStyles[shape!],
      ...(loaded
        ? {
            backgroundImage: `url('${src}')`,
            ...(showBorder !== 'always' && {
              border: 0
            }),
            boxShadow: `inset 0 0 ${componentTheme.boxShadow.blur} 0 ${componentTheme.boxShadow.color}`
          }
        : {
            backgroundImage: undefined,
            ...(hasInverseColor && {
              border: 0,
              padding: sizeStyles[size!].borderWidth,
              backgroundClip: 'border-box'
            })
          }),
      ...(showBorder === 'never' && {
        border: 0
      })
    },
    initials: {
      label: 'avatar__initials',
      color: contentColor(),
      lineHeight: '2.375em',
      fontWeight: componentTheme.fontWeight,
      letterSpacing: '0.0313em',
      ...initialSizeStyles[size!]
    },
    loadImage: {
      label: 'avatar__loadImage',
      display: 'none'
    },
    iconSVG: {
      label: 'avatar__iconSVG',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',

      svg: {
        fill: contentColor(),
        height: '1em',
        width: '1em'
      }
    }
  }
}

export default generateStyle
