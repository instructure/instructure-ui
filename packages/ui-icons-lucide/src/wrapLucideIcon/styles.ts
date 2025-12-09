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

import { px } from '@instructure/ui-utils'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { LucideIconWrapperProps, LucideIconStyle } from './props'

type StyleParams = {
  size?: LucideIconWrapperProps['size']
  strokeWidth?: LucideIconWrapperProps['strokeWidth']
  color?: LucideIconWrapperProps['color']
  rotate?: LucideIconWrapperProps['rotate']
  bidirectional?: LucideIconWrapperProps['bidirectional']
  inline?: LucideIconWrapperProps['inline']
  themeOverride?: LucideIconWrapperProps['themeOverride']
}

/**
 * Convert semantic size token to numeric pixels for Lucide
 */
const convertSemanticSize = (
  size: LucideIconWrapperProps['size'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (typeof size === 'string') {
    const propName = `size${size.charAt(0).toUpperCase()}${size.slice(
      1
    )}` as keyof typeof componentTheme
    if (propName in componentTheme) {
      return px(componentTheme[propName])
    }
  } else if (typeof size === 'number') {
    return size
  }
  return undefined
}

/**
 * Convert semantic stroke width token to numeric value for Lucide
 */
const convertSemanticStrokeWidth = (
  strokeWidth: LucideIconWrapperProps['strokeWidth'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (typeof strokeWidth === 'string') {
    const propName = `strokeWidth${strokeWidth
      .charAt(0)
      .toUpperCase()}${strokeWidth.slice(1)}` as keyof typeof componentTheme
    if (propName in componentTheme) {
      return px(componentTheme[propName])
    }
    return strokeWidth
  }
  return strokeWidth
}

/**
 * Determine color values: semantic (for CSS) vs custom (for Lucide)
 */
const determineColorValues = (
  color: LucideIconWrapperProps['color'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (!color) {
    return {}
  }

  if (color === 'inherit') {
    return { colorValue: color }
  }

  if (
    color in componentTheme &&
    !color.startsWith('size') &&
    !color.startsWith('strokeWidth')
  ) {
    return { colorValue: color }
  }

  return { customColor: color }
}

const generateStyle = (
  componentTheme: NewComponentTypes['Icon'],
  params: StyleParams
): LucideIconStyle => {
  const {
    size,
    strokeWidth,
    color,
    rotate = '0',
    bidirectional = true,
    inline = true
  } = params

  const numericSize = convertSemanticSize(size, componentTheme)
  const numericStrokeWidth = convertSemanticStrokeWidth(
    strokeWidth,
    componentTheme
  )
  const { colorValue, customColor } = determineColorValues(
    color,
    componentTheme
  )

  let colorStyle
  if (colorValue) {
    if (colorValue === 'inherit') {
      colorStyle = { color: 'inherit' }
    } else if (colorValue in componentTheme) {
      colorStyle = {
        color: componentTheme[colorValue as keyof typeof componentTheme]
      }
    }
  } else if (customColor) {
    colorStyle = { color: customColor }
  }

  const rotateVariants = {
    '0': {},
    '90': { transform: 'rotate(90deg)' },
    '180': { transform: 'rotate(180deg)' },
    '270': { transform: 'rotate(270deg)' }
  }

  const bidirectionalRotateVariants = {
    '0': { transform: 'scaleX(-1)' },
    '90': { transform: 'scaleX(-1) rotate(90deg)' },
    '180': { transform: 'scaleX(-1) rotate(180deg)' },
    '270': { transform: 'scaleX(-1) rotate(270deg)' }
  }

  return {
    lucideIcon: {
      label: 'lucideIcon',
      display: inline ? 'inline-block' : 'block',
      verticalAlign: 'middle',
      lineHeight: 0,
      fontSize: 0,
      ...colorStyle,
      ...rotateVariants[rotate],
      ...(bidirectional && {
        '[dir="rtl"] &': bidirectionalRotateVariants[rotate]
      })
    },
    numericSize,
    numericStrokeWidth,
    customColor
  }
}

export default generateStyle
