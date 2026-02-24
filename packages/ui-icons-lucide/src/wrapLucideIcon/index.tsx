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

import React, { forwardRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useStyle, useTheme } from '@instructure/emotion'
import { px } from '@instructure/ui-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type {
  LucideIconWrapperProps,
  InstUIIconProps,
  LucideIconTheme
} from './props'

/**
 * Wraps a Lucide icon component with InstUI theming and RTL support.
 *
 * This HOC transforms a Lucide icon into an InstUI-compatible component with:
 * - Semantic sizing (x-small through x-large)
 * - Theme-aware colors (primary, secondary, success, error, etc.)
 * - Automatic RTL flipping (bidirectional by default)
 * - Rotation support (0°, 90°, 180°, 270°)
 * - Accessibility features (title, description)
 * - Full Lucide props compatibility
 * - Themeable via InstUI emotion system with useStyle hook
 *
 * @param Icon - The Lucide icon component to wrap
 * @returns A themed, RTL-aware icon component
 *
 * @example
 * Basic usage (automatic in generated index.ts):
 * ```tsx
 * import { ArrowLeft } from 'lucide-react'
 * import { wrapLucideIcon } from './wrapLucideIcon'
 *
 * const IconArrowLeft = wrapLucideIcon(ArrowLeft)
 * ```
 *
 * @example
 * InstUI-style props:
 * ```tsx
 * import { ArrowLeft } from '@instructure/ui-icons-lucide'
 *
 * <ArrowLeft
 *   size="large"
 *   color="primary"
 *   rotate="90"
 *   title="Navigate left"
 * />
 * ```
 *
 * @example
 * Lucide-style props (still supported):
 * ```tsx
 * <ArrowLeft
 *   size={24}
 *   strokeWidth={2}
 *   color="#ff0000"
 * />
 * ```
 *
 * @example
 * Disable RTL flipping:
 * ```tsx
 * <ArrowLeft bidirectional={false} />
 * ```
 *
 * @example
 * With accessibility:
 * ```tsx
 * <ArrowLeft
 *   title="Previous page"
 *   description="Navigate to the previous page in the sequence"
 * />
 * ```
 */
export function wrapLucideIcon(Icon: LucideIcon): LucideIcon {
  const WrappedIcon = forwardRef<SVGSVGElement, LucideIconWrapperProps>(
    (props, ref) => {
      const {
        // Extract InstUI props
        size: instUISize,
        color: instUIColor,
        rotate = '0',
        bidirectional = true,
        inline = true,
        title,
        description,
        elementRef,
        themeOverride,

        // Lucide native props
        strokeWidth,
        absoluteStrokeWidth,
        className,
        style,

        ...rest
      } = props

      // Get theme to convert semantic sizes to pixels
      const theme = useTheme()
      const componentTheme = generateComponentTheme(theme as any)

      // Determine if using InstUI semantic size or Lucide numeric size
      const isSemanticSize = typeof instUISize === 'string'
      const semanticSize = isSemanticSize ? instUISize : undefined

      // Convert semantic size to pixels for Lucide, or use numeric size directly
      // Lucide doesn't inherit fontSize, so we need explicit pixel values
      let numericSize: number | undefined
      if (isSemanticSize) {
        const sizeMap = {
          'x-small': componentTheme.sizeXSmall,
          small: componentTheme.sizeSmall,
          medium: componentTheme.sizeMedium,
          large: componentTheme.sizeLarge,
          'x-large': componentTheme.sizeXLarge
        }
        const themeSizeValue = sizeMap[instUISize as keyof typeof sizeMap]
        // Use InstUI's px utility to convert rem/em to pixels
        numericSize = px(themeSizeValue)
      } else {
        numericSize = instUISize
      }

      // Determine if using InstUI semantic color or custom color
      const semanticColors = [
        'inherit',
        'primary',
        'secondary',
        'primary-inverse',
        'secondary-inverse',
        'success',
        'error',
        'warning',
        'alert',
        'brand'
      ]
      const isSemanticColor = instUIColor
        ? semanticColors.includes(instUIColor)
        : false
      const colorValue = isSemanticColor ? instUIColor : undefined
      const customColor = isSemanticColor ? undefined : instUIColor

      // Using useStyle hook for functional component theming
      const styles = useStyle({
        generateStyle,
        generateComponentTheme,
        params: {
          size: semanticSize,
          color: colorValue,
          rotate,
          bidirectional,
          inline,
          themeOverride
        },
        componentId: 'LucideIcon',
        displayName: `LucideIcon(${Icon.displayName || Icon.name})`
      })

      // Merge refs (both ref and elementRef)
      const iconRef = (node: SVGSVGElement | null) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref && 'current' in ref) {
            // eslint-disable-next-line no-param-reassign
            ref.current = node
          }
        }
        if (elementRef) {
          if (typeof elementRef === 'function') {
            elementRef(node)
          } else if (
            elementRef &&
            typeof elementRef === 'object' &&
            'current' in elementRef
          ) {
            ;(
              elementRef as React.MutableRefObject<SVGSVGElement | null>
            ).current = node
          }
        }
      }

      // Build accessibility props
      const accessibilityProps: Record<string, any> = {}
      if (title) {
        accessibilityProps['aria-label'] = description
          ? `${title}: ${description}`
          : title
        accessibilityProps['role'] = 'img'
      } else {
        accessibilityProps['aria-hidden'] = 'true'
        accessibilityProps['role'] = 'presentation'
      }

      return (
        <span css={styles?.lucideIcon} className={className} style={style}>
          <Icon
            ref={iconRef}
            size={numericSize}
            color={customColor || 'currentColor'}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth={absoluteStrokeWidth}
            {...accessibilityProps}
            {...rest}
          />
        </span>
      )
    }
  )

  WrappedIcon.displayName = `wrapLucideIcon(${Icon.displayName || Icon.name})`

  return WrappedIcon as LucideIcon
}

export type { LucideIconWrapperProps, InstUIIconProps, LucideIconTheme }
export { default as generateComponentTheme } from './theme'
export { default as generateStyle } from './styles'
