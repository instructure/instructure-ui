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
import type { LucideIconWrapperProps, LucideIconStyle } from './props'

type StyleParams = {
  size?: LucideIconWrapperProps['size']
  color?: LucideIconWrapperProps['color']
  rotate?: LucideIconWrapperProps['rotate']
  bidirectional?: LucideIconWrapperProps['bidirectional']
  inline?: LucideIconWrapperProps['inline']
  themeOverride?: LucideIconWrapperProps['themeOverride']
}

const generateStyle = (
  componentTheme: NewComponentTypes['Icon'],
  params: StyleParams
): LucideIconStyle => {
  const { color, rotate = '0', bidirectional = true, inline = true } = params

  /**
   * Determine color value from theme or custom CSS
   */
  let colorStyle: { color: string } | undefined

  if (color) {
    if (color === 'inherit') {
      colorStyle = { color: 'inherit' }
    } else if (color in componentTheme) {
      /**
       * Direct theme property access
       */
      colorStyle = {
        color: componentTheme[color as keyof typeof componentTheme] as string
      }
    } else {
      /**
       * Custom CSS color (e.g., "#ff0000", "rgb(255, 0, 0)")
       */
      colorStyle = { color }
    }
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
    }
  }
}

export default generateStyle
