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

import type { TagTheme } from '@instructure/shared-types'
import type { TagProps, TagStyle } from './props'

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
const generateStyle = (componentTheme: TagTheme, props: TagProps): TagStyle => {
  const { variant, size, dismissible, onClick, disabled } = props

  const isButton = !!onClick

  const sizeVariants = {
    small: {
      tag: {
        padding: componentTheme.paddingSmall,
        fontSize: componentTheme.fontSizeSmall
      },
      text: {
        lineHeight: `calc(${componentTheme.heightSmall} - (${componentTheme.defaultBorderWidth} * 2))`
      },
      icon: { fontSize: '0.75rem' }
    },
    medium: {
      tag: {
        padding: componentTheme.padding,
        fontSize: `calc(${componentTheme.fontSizeMedium} - 0.0625rem)`
      },
      text: {
        lineHeight: `calc(${componentTheme.heightMedium} - (${componentTheme.defaultBorderWidth} * 2))`
      },
      icon: { fontSize: '0.75rem' }
    },
    large: {
      tag: {
        padding: componentTheme.padding,
        fontSize: `calc(${componentTheme.fontSizeLarge} - 0.0625rem)`
      },
      text: {
        lineHeight: `calc(${componentTheme.heightLarge} - (${componentTheme.defaultBorderWidth} * 2))`
      },
      icon: { fontSize: '0.875rem' }
    }
  }

  const buttonVariant = isButton
    ? {
        tag: {
          touchAction: 'manipulation',
          outline: 'none',
          position: 'relative',
          overflow: 'visible',
          transition: `background-color ${componentTheme.transitionTiming}`,
          ...(!dismissible && { cursor: 'pointer' }),

          '&:focus': {
            '&::before': {
              opacity: 1,
              transform: 'scale(1)'
            }
          },

          ...(disabled && {
            cursor: 'not-allowed',
            pointerEvents: 'none',
            opacity: 0.5
          })
        },
        tagBefore: {
          content: '""',
          boxSizing: 'border-box',
          border: `${componentTheme.focusOutlineWidth} ${componentTheme.focusOutlineStyle} ${componentTheme.focusOutlineColor}`,
          position: 'absolute',
          top: '-0.3125rem',
          bottom: '-0.3125rem',
          left: '-0.3125rem',
          right: '-0.3125rem',
          opacity: 0,
          transform: 'scale(0.9)',
          transition: `all ${componentTheme.transitionTiming}`,
          pointerEvents: 'none'
        }
      }
    : {}

  const tagVariantVariants = {
    default: {
      tag: {
        backgroundColor: componentTheme.defaultBackground,
        border: `${componentTheme.defaultBorderWidth} ${componentTheme.defaultBorderStyle} ${componentTheme.defaultBorderColor}`,
        borderRadius: componentTheme.defaultBorderRadius,
        color: componentTheme.defaultColor,
        ...(isButton && {
          '&:hover': { backgroundColor: componentTheme.defaultBackgroundHover }
        })
      },
      tagBefore: {
        ...(isButton && {
          borderRadius: componentTheme.defaultBorderRadius
        })
      }
    },
    inline: {
      tag: {
        backgroundColor: componentTheme.inlineBackground,
        border: `${componentTheme.inlineBorderWidth} ${componentTheme.inlineBorderStyle} ${componentTheme.inlineBorderColor}`,
        borderRadius: componentTheme.inlineBorderRadius,
        color: componentTheme.inlineColor,
        cursor: 'text',
        margin: '0 0.1875rem 0.1875rem',
        ...(isButton && {
          '&:hover': { backgroundColor: componentTheme.inlineBackgroundHover }
        })
      },
      tagBefore: {
        ...(isButton && {
          borderRadius: `calc(${componentTheme.inlineBorderRadius} * 1.5)`
        })
      }
    }
  }

  const iconVariantVariants = {
    default: {
      ...(dismissible && {
        color: componentTheme.defaultIconColor,

        '[class$="-tag"]:hover > &': {
          color: componentTheme.defaultIconHoverColor
        }
      })
    },
    inline: {
      ...(dismissible && {
        backgroundColor: componentTheme.inlineIconColor,
        borderRadius: '50%',
        color: componentTheme.inlineBackground,
        fontSize: '0.75rem',
        padding: '0.25rem',
        position: 'absolute',
        insetInlineEnd: 0,
        insetInlineStart: 'auto',
        top: 0,
        transform: 'translate(40%, -40%)',

        '[class$="-tag"]:hover > &': {
          backgroundColor: componentTheme.inlineIconHoverColor
        },

        '[dir="rtl"] &': { transform: 'translate(-40%, -40%)' }
      })
    }
  }

  return {
    tag: {
      label: 'tag',
      boxSizing: 'border-box',
      fontFamily: componentTheme.fontFamily,
      display: 'inline-flex',
      alignItems: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      userSelect: 'none',
      ...sizeVariants[size!].tag,
      ...buttonVariant.tag,
      ...tagVariantVariants[variant!].tag,

      '&::before': {
        ...buttonVariant.tagBefore,
        ...tagVariantVariants[variant!].tagBefore
      }
    },
    text: {
      label: 'tag__text',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: componentTheme.maxWidth,
      ...sizeVariants[size!].text
    },
    icon: {
      label: 'tag__icon',
      marginInlineStart: componentTheme.iconMargin,
      marginInlineEnd: 0,
      transform: 'translateY(0.0625rem)',
      transition: `all ${componentTheme.transitionTiming}`,
      cursor: 'pointer',
      ...sizeVariants[size!].icon,
      ...iconVariantVariants[variant!]
    }
  }
}

export default generateStyle
