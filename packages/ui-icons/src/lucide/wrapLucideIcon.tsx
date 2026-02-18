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
import type { InstUIIconProps } from '../props'
import generateStyle from '../styles'

/**
 * Wraps a stroke-based icon with InstUI theming, RTL support, and semantic sizing.
 * Only accepts InstUI semantic tokens (size="lg", color="baseColor").
 * Stroke width is automatically derived from size for consistent visual weight.
 * Numeric and custom CSS values are not supported.
 */
export function wrapLucideIcon(
  Icon: LucideIcon
): React.ComponentType<InstUIIconProps> {
  const iconDisplayName = `InstUIIcon_${Icon.displayName}`

  const WrappedIcon = (props: InstUIIconProps) => {
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

    const contextProps = useContext(IconPropsContext)
    const finalSize = contextProps?.size ?? size
    const finalColor = contextProps?.color ?? color

    const handleElementRef = (el: SVGSVGElement | null) => {
      if (typeof elementRef === 'function') elementRef(el)
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

    const accessibilityProps: Record<string, string> = title
      ? { 'aria-label': title, role: 'img' }
      : { 'aria-hidden': 'true', role: 'presentation' }

    const gradientId = useId()

    // SVG gradients must be defined before they're referenced. Since Lucide renders
    // its paths internally, we inject the gradient in a separate hidden SVG that comes
    // before the icon in the DOM. gradientUnits="userSpaceOnUse" ensures one gradient
    // spans the full 24x24 icon space rather than scaling independently per shape.
    if (styles.gradientColors) {
      return (
        <span css={styles.icon}>
          <svg width={0} height={0} style={{ position: 'absolute' }}>
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2={24}
                y2={24}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={styles.gradientColors.top} />
                <stop offset="100%" stopColor={styles.gradientColors.bottom} />
              </linearGradient>
            </defs>
          </svg>
          <Icon
            {...passthroughProps(rest)}
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

    return (
      <span css={styles.icon}>
        <Icon
          {...passthroughProps(rest)}
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
