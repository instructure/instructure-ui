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

import { forwardRef } from 'react'

import { useStyle, useTheme } from '@instructure/emotion'
import { px } from '@instructure/ui-utils'
import { passthroughProps } from '@instructure/ui-react-utils'
import type { Theme } from '@instructure/ui-themes'
import type { LucideIcon } from 'lucide-react'

import type { LucideIconWrapperProps, InstUIIconOwnProps } from './props'
import generateStyle from './styles'

const SEMANTIC_STROKE_WIDTHS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const SEMANTIC_COLORS = [
  'inherit',
  'baseColor',
  'mutedColor',
  'successColor',
  'errorColor',
  'warningColor',
  'infoColor',
  'onColor',
  'inverseColor',
  'disabledBaseColor',
  'disabledOnColor',
  'navigationPrimaryBaseColor',
  'navigationPrimaryHoverColor',
  'navigationPrimaryActiveColor',
  'navigationPrimaryOnColorBaseColor',
  'navigationPrimaryOnColorHoverColor',
  'navigationPrimaryOnColorActiveColor',
  'actionSecondaryBaseColor',
  'actionSecondaryHoverColor',
  'actionSecondaryActiveColor',
  'actionSecondaryDisabledColor',
  'actionStatusBaseColor',
  'actionStatusHoverColor',
  'actionStatusActiveColor',
  'actionStatusDisabledColor',
  'actionAiSecondaryTopGradientBaseColor',
  'actionAiSecondaryTopGradientDisabledColor',
  'actionAiSecondaryBottomGradientBaseColor',
  'actionAiSecondaryBottomGradientDisabledColor',
  'actionAiBaseColor',
  'actionAiHoverColor',
  'actionAiActiveColor',
  'actionAiDisabledColor',
  'actionPrimaryBaseColor',
  'actionPrimaryHoverColor',
  'actionPrimaryActiveColor',
  'actionPrimaryDisabledColor',
  'actionPrimaryOnColorBaseColor',
  'actionPrimaryOnColorHoverColor',
  'actionPrimaryOnColorActiveColor',
  'actionPrimaryOnColorDisabledColor',
  'accentBlueColor',
  'accentGreenColor',
  'accentRedColor',
  'accentOrangeColor',
  'accentGreyColor',
  'accentAshColor',
  'accentPlumColor',
  'accentVioletColor',
  'accentStoneColor',
  'accentSkyColor',
  'accentHoneyColor',
  'accentSeaColor',
  'accentAutoraColor',
  'actionTertiaryBaseColor',
  'actionTertiaryHoverColor',
  'actionTertiaryActiveColor',
  'actionTertiaryDisabledColor',
  'actionSuccessSecondaryBaseColor',
  'actionSuccessSecondaryDisabledColor',
  'actionDestructiveSecondaryBaseColor',
  'actionDestructiveSecondaryDisabledColor'
] as const

/**
 * Wraps a Lucide icon with InstUI theming, RTL support, and semantic sizing.
 * Supports both InstUI semantic props (size="lg", color="baseColor") and
 * native Lucide props (size={24}, color="#ff0000").
 */
export function wrapLucideIcon(Icon: LucideIcon): LucideIcon {
  const WrappedIcon = forwardRef<SVGSVGElement, LucideIconWrapperProps>(
    (props, ref) => {
      const {
        size: instUISize,
        strokeWidth: instUIStrokeWidth,
        color: instUIColor,
        rotate = '0',
        bidirectional = true,
        inline = true,
        title,
        description,
        elementRef,
        themeOverride,
        absoluteStrokeWidth,
        className,
        style,
        ...rest
      } = props

      const theme = useTheme() as Theme
      const iconTheme = theme?.newTheme?.components?.Icon

      // Convert semantic size to pixels for Lucide
      const isSemanticSize = typeof instUISize === 'string'
      const semanticSize = isSemanticSize ? instUISize : undefined
      let numericSize: number | undefined
      if (isSemanticSize && iconTheme) {
        const sizeMap = {
          xs: iconTheme.sizeXs,
          sm: iconTheme.sizeSm,
          md: iconTheme.sizeMd,
          lg: iconTheme.sizeLg,
          xl: iconTheme.sizeXl,
          '2xl': iconTheme.size2xl
        }
        numericSize = px(sizeMap[instUISize as keyof typeof sizeMap])
      } else if (!isSemanticSize) {
        numericSize = instUISize
      }

      // Convert semantic strokeWidth to pixels for Lucide
      const isSemanticStrokeWidth =
        typeof instUIStrokeWidth === 'string' &&
        SEMANTIC_STROKE_WIDTHS.includes(
          instUIStrokeWidth as (typeof SEMANTIC_STROKE_WIDTHS)[number]
        )
      let numericStrokeWidth: number | string | undefined
      if (isSemanticStrokeWidth && iconTheme) {
        const strokeWidthMap = {
          xs: iconTheme.strokeWidthXs,
          sm: iconTheme.strokeWidthSm,
          md: iconTheme.strokeWidthMd,
          lg: iconTheme.strokeWidthLg,
          xl: iconTheme.strokeWidthXl,
          '2xl': iconTheme.strokeWidth2xl
        }
        numericStrokeWidth = px(
          strokeWidthMap[instUIStrokeWidth as keyof typeof strokeWidthMap]
        )
      } else if (!isSemanticStrokeWidth) {
        numericStrokeWidth = instUIStrokeWidth
      }

      // Determine if color is semantic (theme token) or custom CSS
      const isSemanticColor = instUIColor
        ? SEMANTIC_COLORS.includes(
            instUIColor as (typeof SEMANTIC_COLORS)[number]
          )
        : false
      const colorValue = isSemanticColor ? instUIColor : undefined
      const customColor = isSemanticColor ? undefined : instUIColor

      const styles = useStyle({
        componentId: 'Icon' as const,
        generateStyle,
        params: {
          size: semanticSize,
          color: colorValue,
          rotate,
          bidirectional,
          inline,
          themeOverride
        },
        displayName: `LucideIcon(${Icon.displayName || Icon.name})`
      })

      // Merge both ref and elementRef
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
            color={customColor}
            strokeWidth={numericStrokeWidth}
            absoluteStrokeWidth={absoluteStrokeWidth}
            {...accessibilityProps}
            {...passthroughProps(rest)}
          />
        </span>
      )
    }
  )

  WrappedIcon.displayName = `wrapLucideIcon(${Icon.displayName || Icon.name})`

  return WrappedIcon as LucideIcon
}

export type { LucideIconWrapperProps, InstUIIconOwnProps }
export { default as generateStyle } from './styles'
