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
  display: AvatarProps['display']
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
  const { loaded, size, color, hasInverseColor, shape, showBorder, display } =
    params

  const sizeStyles = {
    'xx-small': {
      fontSize: componentTheme.fontSize2xs,
      borderWidth: componentTheme.borderWidthSm,
      width: componentTheme.size2xs,
      height: componentTheme.size2xs
    },
    'x-small': {
      fontSize: componentTheme.fontSizeXs,
      borderWidth: componentTheme.borderWidthSm,
      width: componentTheme.sizeXs,
      height: componentTheme.sizeXs
    },
    small: {
      fontSize: componentTheme.fontSizeSm,
      borderWidth: componentTheme.borderWidthSm,
      width: componentTheme.sizeSm,
      height: componentTheme.sizeSm
    },
    medium: {
      fontSize: componentTheme.fontSizeMd,
      borderWidth: componentTheme.borderWidthMd,
      width: componentTheme.sizeMd,
      height: componentTheme.sizeMd
    },
    large: {
      fontSize: componentTheme.fontSizeLg,
      borderWidth: componentTheme.borderWidthMd,
      width: componentTheme.sizeLg,
      height: componentTheme.sizeLg
    },
    'x-large': {
      fontSize: componentTheme.fontSizeXl,
      borderWidth: componentTheme.borderWidthMd,
      width: componentTheme.sizeXl,
      height: componentTheme.sizeXl
    },
    'xx-large': {
      fontSize: componentTheme.fontSize2xl,
      borderWidth: componentTheme.borderWidthMd,
      width: componentTheme.size2xl,
      height: componentTheme.size2xl
    }
  }

  const colorVariants = {
    accent1: {
      text: componentTheme.accent1TextColor,
      background: componentTheme.accent1BackgroundColor,
      icon: componentTheme.accent1IconColor
    },
    accent2: {
      text: componentTheme.accent2TextColor,
      background: componentTheme.accent2BackgroundColor,
      icon: componentTheme.accent2IconColor
    },
    accent3: {
      text: componentTheme.accent3TextColor,
      background: componentTheme.accent3BackgroundColor,
      icon: componentTheme.accent3IconColor
    },
    accent4: {
      text: componentTheme.accent4TextColor,
      background: componentTheme.accent4BackgroundColor,
      icon: componentTheme.accent4IconColor
    },
    accent5: {
      text: componentTheme.accent5TextColor,
      background: componentTheme.accent5BackgroundColor,
      icon: componentTheme.accent5IconColor
    },
    accent6: {
      text: componentTheme.accent6TextColor,
      background: componentTheme.accent6BackgroundColor,
      icon: componentTheme.accent6IconColor
    },
    ai: {
      text: componentTheme.textOnColor,
      background: `linear-gradient(135deg, ${componentTheme.aiTopGradientColor} 0%, ${componentTheme.aiBottomGradientColor} 100%)`,
      icon: componentTheme.textOnColor
    }
  }

  const getBorder = () => {
    if (showBorder === 'never') {
      return 'none'
    }
    if (showBorder === 'always') {
      return 'solid'
    }
    //if none of the above, so auto
    if (hasInverseColor || color === 'ai') {
      return 'none'
    }
    return 'solid'
  }

  return {
    avatar: {
      label: 'avatar',
      boxSizing: 'border-box',
      border: getBorder(),
      borderRadius: shape === 'circle' ? '50%' : 0,
      ...sizeStyles[size!],
      background:
        hasInverseColor || color === 'ai'
          ? colorVariants[color!].background
          : componentTheme.backgroundColor,
      display: display === 'inline' ? 'inline-flex' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: hasInverseColor
        ? componentTheme.textOnColor
        : colorVariants[color!].text,
      borderColor: componentTheme.borderColor,
      fontWeight: componentTheme.fontWeight,
      overflow: 'hidden'
    },
    image: {
      label: 'avatar__image',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      ...(loaded ? {} : { display: 'none' })
    }
  }
}

export default generateStyle
