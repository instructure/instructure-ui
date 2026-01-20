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

import React, { useId, useContext } from 'react'
import { useStyle } from '@instructure/emotion'
import { passthroughProps } from '@instructure/ui-react-utils'
import type { LucideIcon } from 'lucide-react'

import { IconPropsContext } from '../IconPropsProvider'
import type { LucideIconWrapperProps } from './props'
import generateStyle from './styles'

/**
 * Wraps a Lucide icon with InstUI theming, RTL support, and semantic sizing.
 * Only accepts InstUI semantic tokens (size="lg", color="baseColor").
 * Stroke width is automatically derived from size for consistent visual weight.
 * Numeric and custom CSS values are not supported.
 */
export function wrapLucideIcon(
  Icon: LucideIcon
): React.ComponentType<LucideIconWrapperProps> {
  const iconDisplayName = `InstUIIcon_${Icon.displayName}`

  const WrappedIcon = (props: LucideIconWrapperProps) => {
    const {
      size,
      color,
      rotate = '0',
      bidirectional = true,
      inline = true,
      title,
      elementRef,
      themeOverride,
      ...rest
    } = props

    // Get icon props from context (if available)
    const contextProps = useContext(IconPropsContext)

    // Merge props: context props take precedence over direct props
    const finalSize = contextProps?.size ?? size
    const finalColor = contextProps?.color ?? color

    const handleElementRef = (el: SVGSVGElement | null) => {
      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }

    const styles = useStyle({
      componentId: 'Icon',
      generateStyle,
      themeOverride,
      params: {
        size: finalSize,
        color: finalColor,
        rotate,
        bidirectional,
        inline
      },
      displayName: iconDisplayName
    })

    const accessibilityProps: Record<string, string> = {}
    if (title) {
      accessibilityProps['aria-label'] = title
      accessibilityProps['role'] = 'img'
    } else {
      accessibilityProps['aria-hidden'] = 'true'
      accessibilityProps['role'] = 'presentation'
    }

    const gradientId = useId()

    // AI Gradient Implementation:
    // SVG gradients must be defined BEFORE they're referenced. Since Lucide renders
    // icon paths before any children we pass, we inject the gradient in a separate
    // hidden SVG element that comes BEFORE the icon in the DOM. We use
    // gradientUnits="userSpaceOnUse" with coordinates (0,0) to (24,24) matching
    // Lucide's viewBox, ensuring one gradient spans the entire icon space rather
    // than scaling separately for each shape (which causes small elements to lose
    // gradient visibility). The icon then references this gradient via stroke="url(#id)".
    if (styles.gradientColors) {
      // Use viewBox coordinates for gradient (Lucide icons use 0 0 24 24 viewBox)
      const gradientSize = 24

      return (
        <span css={styles.lucideIcon}>
          {/* Hidden SVG to define the gradient - must come before the icon uses it */}
          <svg width={0} height={0} style={{ position: 'absolute' }}>
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2={gradientSize}
                y2={gradientSize}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={styles.gradientColors.top} />
                <stop offset="100%" stopColor={styles.gradientColors.bottom} />
              </linearGradient>
            </defs>
          </svg>
          <Icon
            {...passthroughProps(rest)}
            name={Icon.displayName}
            ref={handleElementRef}
            size={styles.numericSize}
            color={`url(#${gradientId})`}
            strokeWidth={styles.numericStrokeWidth}
            absoluteStrokeWidth={true}
            {...accessibilityProps}
          />
        </span>
      )
    }

    // Normal rendering (non-gradient)
    return (
      <span css={styles.lucideIcon}>
        <Icon
          {...passthroughProps(rest)}
          name={Icon.displayName}
          ref={handleElementRef}
          size={styles.numericSize}
          color={styles.resolvedColor}
          strokeWidth={styles.numericStrokeWidth}
          absoluteStrokeWidth={true}
          {...accessibilityProps}
        />
      </span>
    )
  }

  WrappedIcon.displayName = iconDisplayName

  return WrappedIcon
}
