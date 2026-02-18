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
import type { IconNode } from 'lucide-react'

import { IconPropsContext } from '../IconPropsProvider'
import type { InstUIIconProps } from '../props'
import generateStyle from '../styles'

/**
 * Unified wrapper for custom icons (both stroke and filled) rendered from iconNode.
 *
 * strokeWidth is always applied to the SVG root with absolute sizing (equivalent to
 * Lucide's absoluteStrokeWidth=true). Since SVG strokeWidth only affects elements
 * that have an explicit stroke attribute, fill-only paths are unaffected — no
 * isFilled flag is needed.
 *
 * @param iconNode  Flat array of [tagName, attributes] tuples from the build script.
 * @param iconName  Used as displayName (e.g. 'AiInfo').
 * @param viewBox   SVG viewBox string. Defaults to '0 0 24 24'.
 */
export function wrapCustomIcon(
  iconNode: IconNode,
  iconName: string,
  viewBox: string = '0 0 24 24'
): React.ComponentType<InstUIIconProps> {
  const iconDisplayName = `InstUIIcon_${iconName}`

  // For the AI gradient, coordinates span the viewBox width
  const viewBoxWidth = parseFloat(viewBox.split(' ')[2]) || 24

  const renderPaths = (gradientId?: string) =>
    iconNode.map(([tagName, attrs], index) => {
      if (!gradientId) {
        return React.createElement(tagName, { key: index, ...attrs })
      }
      const elementProps: Record<string, unknown> = { key: index }
      for (const [k, v] of Object.entries(attrs)) {
        elementProps[k] =
          (k === 'fill' || k === 'stroke') && v === 'currentColor'
            ? `url(#${gradientId})`
            : v
      }
      return React.createElement(tagName, elementProps)
    })

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

    // fill="none" on the SVG root mirrors the Figma export convention where stroke
    // icon source files set fill="none" on the <svg> element so child paths inherit
    // it. Without this, paths that have no explicit fill get SVG's default fill="black".
    // Filled icon paths override this via their explicit fill="currentColor" attribute.
    const svgProps = {
      ...passthroughProps(rest),
      ref: handleElementRef,
      viewBox,
      width: styles.numericSize,
      height: styles.numericSize,
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      ...accessibilityProps
    }

    // Convert CSS-px token to SVG user units for proportional visual weight at all sizes.
    const strokeWidthProp =
      styles.numericStrokeWidth && styles.numericSize
        ? {
            strokeWidth:
              +styles.numericStrokeWidth / (styles.numericSize / viewBoxWidth)
          }
        : {}

    if (styles.gradientColors) {
      return (
        <span css={styles.icon}>
          {/* Gradient defs must be defined before being referenced */}
          <svg width={0} height={0} style={{ position: 'absolute' }}>
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2={viewBoxWidth}
                y2={viewBoxWidth}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={styles.gradientColors.top} />
                <stop offset="100%" stopColor={styles.gradientColors.bottom} />
              </linearGradient>
            </defs>
          </svg>
          <svg {...svgProps} {...strokeWidthProp}>
            {renderPaths(gradientId)}
          </svg>
        </span>
      )
    }

    return (
      <span css={styles.icon}>
        <svg
          {...svgProps}
          {...strokeWidthProp}
          style={{ color: styles.resolvedColor }}
        >
          {renderPaths()}
        </svg>
      </span>
    )
  }

  WrappedIcon.displayName = iconDisplayName

  return WrappedIcon
}
