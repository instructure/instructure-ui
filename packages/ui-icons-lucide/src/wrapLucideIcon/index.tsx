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

import { useStyle, useTheme } from '@instructure/emotion'
import { px } from '@instructure/ui-utils'
import { passthroughProps } from '@instructure/ui-react-utils'
import type { Theme } from '@instructure/ui-themes'
import type { LucideIcon } from 'lucide-react'

import type { LucideIconWrapperProps, InstUIIconOwnProps } from './props'
import generateStyle from './styles'

/**
 * Wraps a Lucide icon with InstUI theming, RTL support, and semantic sizing.
 * Supports both InstUI semantic props (size="lg", color="baseColor") and
 * native Lucide props (size={24}, color="#ff0000").
 */
export function wrapLucideIcon(Icon: LucideIcon): LucideIcon {
  const WrappedIcon = (props: LucideIconWrapperProps) => {
    const {
      size,
      strokeWidth,
      color,
      rotate = '0',
      bidirectional = true,
      inline = true,
      title,
      elementRef,
      themeOverride,
      absoluteStrokeWidth,
      className,
      style,
      ...rest
    } = props

    const theme = useTheme() as Theme
    const iconTheme = theme?.newTheme?.components?.Icon

    const handleElementRef = (el: SVGSVGElement | null) => {
      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }

    // Convert semantic size to pixels for Lucide
    let numericSize: number | undefined
    let semanticSize: string | undefined
    if (typeof size === 'string' && iconTheme) {
      // Construct theme property name (e.g., 'xs' -> 'sizeXs')
      const propName = `size${size.charAt(0).toUpperCase()}${size.slice(
        1
      )}` as keyof typeof iconTheme
      if (propName in iconTheme) {
        // Semantic size token from theme
        semanticSize = size
        numericSize = px(iconTheme[propName] as string)
      }
    } else if (typeof size === 'number') {
      numericSize = size
    }

    // Convert semantic strokeWidth to pixels for Lucide
    let numericStrokeWidth: number | string | undefined
    if (typeof strokeWidth === 'string' && iconTheme) {
      // Construct theme property name (e.g., 'xs' -> 'strokeWidthXs')
      const propName = `strokeWidth${strokeWidth
        .charAt(0)
        .toUpperCase()}${strokeWidth.slice(1)}` as keyof typeof iconTheme
      if (propName in iconTheme) {
        // Semantic stroke width token from theme
        numericStrokeWidth = px(iconTheme[propName] as string)
      } else {
        // Not a semantic token, use as-is (custom string value)
        numericStrokeWidth = strokeWidth
      }
    } else {
      // Numeric value (custom stroke width)
      numericStrokeWidth = strokeWidth
    }

    // Determine if color is semantic (theme token) or custom CSS
    let colorValue: string | undefined
    let customColor: string | undefined
    if (color) {
      if (color === 'inherit') {
        colorValue = color
      } else if (
        iconTheme &&
        color in iconTheme &&
        !color.startsWith('size') &&
        !color.startsWith('strokeWidth') &&
        color !== 'dark'
      ) {
        // Semantic color token from theme (exclude size/strokeWidth/dark properties)
        colorValue = color
      } else {
        // Custom CSS color (e.g., "#ff0000", "rgb(255, 0, 0)")
        customColor = color
      }
    }

    const styles = useStyle({
      componentId: 'Icon' as const,
      generateStyle,
      themeOverride,
      params: {
        size: semanticSize as InstUIIconOwnProps['size'],
        color: colorValue,
        rotate,
        bidirectional,
        inline
      },
      displayName: `LucideIcon(${Icon.displayName || Icon.name})`
    })

    const accessibilityProps: Record<string, string | boolean> = {}
    if (title) {
      accessibilityProps['aria-label'] = title
      accessibilityProps['role'] = 'img'
    } else {
      accessibilityProps['aria-hidden'] = 'true'
      accessibilityProps['role'] = 'presentation'
    }

    return (
      <span css={styles?.lucideIcon} className={className} style={style}>
        <Icon
          ref={handleElementRef}
          size={numericSize}
          color={customColor}
          strokeWidth={numericStrokeWidth}
          absoluteStrokeWidth={absoluteStrokeWidth}
          {...accessibilityProps}
          {...passthroughProps(rest)}
        />
      </span>
    )
  }

  WrappedIcon.displayName = `wrapLucideIcon(${Icon.displayName || Icon.name})`

  return WrappedIcon as LucideIcon
}

export type { LucideIconWrapperProps, InstUIIconOwnProps }
export { default as generateStyle } from './styles'
