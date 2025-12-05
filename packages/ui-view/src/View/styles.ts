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

import { DIRECTION } from '@instructure/ui-i18n'
import {
  calcMarginFromShorthand,
  mirrorShorthandEdges,
  mirrorShorthandCorners
} from '@instructure/emotion'
import { pickProps } from '@instructure/ui-react-utils'

import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { ViewProps, ViewStyle, BorderColor } from './props'
import { alpha } from '@instructure/ui-color-utils'
import { elevationTokenToBoxShadow } from '@instructure/ui-themes'

const processBorderRadiusValue = (
  value: string | undefined,
  sharedTokens: SharedTokens
): string => {
  if (!value) return ''

  // Split by spaces to handle CSS shorthand (1-4 values)
  const values = value.split(' ')

  const processedValues = values.map((v) => {
    // Handle special cases
    if (v === 'auto' || v === '0') return v
    if (v === 'none') return '0'
    if (v === 'circle') return '100%'
    if (v === 'pill') return '999em'

    // Handle SharedTokens values
    if (v === 'small') return sharedTokens.radiusSmall
    if (v === 'medium') return sharedTokens.radiusMedium
    if (v === 'large') return sharedTokens.radiusLarge

    // Pass through CSS values (1rem, 12px, etc.)
    return v
  })

  return processedValues.join(' ')
}

const processBorderWidthValue = (
  value: string | undefined,
  sharedTokens: SharedTokens
): string => {
  if (!value) return ''

  // Split by spaces to handle CSS shorthand (1-4 values)
  const values = value.split(' ')

  const processedValues = values.map((v) => {
    // Handle special cases
    if (v === 'auto' || v === '0') return v
    if (v === 'none') return '0'

    // Handle SharedTokens values
    if (v === 'small') return sharedTokens.widthSmall
    if (v === 'medium') return sharedTokens.widthMedium
    if (v === 'large') return sharedTokens.widthLarge

    // Pass through CSS values (1rem, 2px, etc.)
    return v
  })

  return processedValues.join(' ')
}

const getBorderStyle = ({
  borderRadius,
  borderWidth,
  dir,
  sharedTokens
}: {
  sharedTokens: SharedTokens
  borderRadius: ViewProps['borderRadius']
  borderWidth: ViewProps['borderWidth']
  dir: ViewProps['dir']
}) => {
  const isRtlDirection = dir === DIRECTION.rtl
  return {
    borderRadius: processBorderRadiusValue(
      isRtlDirection ? mirrorShorthandCorners(borderRadius) : borderRadius,
      sharedTokens
    ),
    borderWidth: processBorderWidthValue(
      isRtlDirection ? mirrorShorthandEdges(borderWidth) : borderWidth,
      sharedTokens
    )
  }
}

const getSpacingStyle = ({
  margin,
  padding,
  dir,
  sharedTokens
}: {
  sharedTokens: SharedTokens
  margin: ViewProps['margin']
  padding: ViewProps['padding']
  dir: ViewProps['dir']
}) => {
  const isRtlDirection = dir === DIRECTION.rtl

  return {
    // TODO handle the merging on tokens inside the util
    margin: calcMarginFromShorthand(
      isRtlDirection ? mirrorShorthandEdges(margin) : margin,
      {
        ...sharedTokens.spacing,
        ...sharedTokens.legacySpacing
      }
    ),
    padding: calcMarginFromShorthand(
      isRtlDirection ? mirrorShorthandEdges(padding) : padding,
      {
        ...sharedTokens.spacing,
        ...sharedTokens.legacySpacing
      }
    )
  }
}

const getOffsetStyle = ({
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  dir
}: {
  insetBlockStart: ViewProps['insetBlockStart']
  insetBlockEnd: ViewProps['insetBlockEnd']
  insetInlineStart: ViewProps['insetInlineStart']
  insetInlineEnd: ViewProps['insetInlineEnd']
  dir: ViewProps['dir']
}) => {
  const isRtlDirection = dir === DIRECTION.rtl

  const blockStart = {
    top: insetBlockStart,
    insetBlockStart
  }

  const blockEnd = {
    bottom: insetBlockEnd,
    insetBlockEnd
  }

  const horizontalOffsets = {
    left: isRtlDirection ? insetInlineEnd : insetInlineStart,
    right: isRtlDirection ? insetInlineStart : insetInlineEnd
  }

  return {
    ...blockStart,
    ...blockEnd,
    ...horizontalOffsets
  }
}

const getStyleProps = ({
  cursor,
  style
}: ViewProps & OtherHTMLAttributes<ViewProps>) => {
  const whitelisted = pickProps(style || {}, {}, [
    // Position/calculateElementPosition:
    'top',
    'left',
    'position',
    'display',
    'transform',
    'overflow',
    'minWidth',
    'minHeight',
    // Img:
    'filter',
    // Flex.Item:
    'flexBasis',
    // Avatar:
    'backgroundImage',
    // Popover:
    'pointerEvents'
  ])

  if (cursor) {
    whitelisted.cursor = cursor
  }

  return whitelisted
}

const withBorder = (props: ViewProps) => {
  const { borderWidth } = props
  return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
}

const getFocusStyles = (
  props: ViewProps,
  componentTheme: NewComponentTypes['View']
) => {
  const {
    focusColor,
    focusPosition,
    shouldAnimateFocus,
    withFocusOutline,
    focusWithin
  } = props

  const focusPos =
    focusPosition == 'offset' || focusPosition == 'inset'
      ? focusPosition
      : 'offset'
  const focusPositionVariants = {
    offset: {
      outlineOffset: `calc(${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth})`
    },
    inset: {
      outlineOffset: `calc(${componentTheme.focusOutlineInset} - ${componentTheme.focusOutlineWidth})`
    }
  }
  const focusColorVariants = {
    info: componentTheme.focusColorInfo,
    inverse: componentTheme.focusColorInverse,
    success: componentTheme.focusColorSuccess,
    danger: componentTheme.focusColorDanger
  }
  const visibleFocusStyle = {
    ...focusPositionVariants[focusPos],
    outlineColor: focusColorVariants[focusColor!]
  }
  const outlineStyle = {
    outlineOffset: '-0.8rem', // value when not in focus, its invisible
    outlineColor: alpha(focusColorVariants[focusColor!], 0),
    outlineStyle: componentTheme.focusOutlineStyle,
    outlineWidth: componentTheme.focusOutlineWidth,
    ...(withFocusOutline && visibleFocusStyle)
  }
  return {
    ...(shouldAnimateFocus && {
      transition: 'outline-color 0.2s, outline-offset 0.25s'
    }),
    ...outlineStyle,
    '&:hover, &:active': {
      // apply the same style so it's not overridden by some global style
      ...outlineStyle
    },
    ...(typeof withFocusOutline === 'undefined' && {
      // user focuses the element
      '&:focus': visibleFocusStyle
    }),
    ...(focusWithin && {
      '&:focus-within': visibleFocusStyle
    })
  }
}

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['View'],
  props: ViewProps,
  sharedTokens: SharedTokens
): ViewStyle => {
  const {
    borderRadius,
    borderWidth,
    margin,
    padding,
    position,
    display,
    textAlign,
    borderColor,
    background,
    stacking,
    shadow,
    overflowY,
    overflowX,
    overscrollBehavior,
    insetBlockEnd,
    insetBlockStart,
    insetInlineEnd,
    insetInlineStart,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    withVisualDebug,
    dir
  } = props
  const borderStyle = getBorderStyle({
    sharedTokens,
    borderRadius,
    borderWidth,
    dir
  })
  const spacingStyle = getSpacingStyle({
    margin,
    padding,
    sharedTokens,
    dir
  })

  const offsetStyle = getOffsetStyle({
    dir,
    insetBlockEnd,
    insetBlockStart,
    insetInlineEnd,
    insetInlineStart
  })

  const displayVariants = {
    inline: {
      label: 'view--inline',
      display: 'inline'
    },
    block: {
      label: 'view--block',
      display: 'block'
    },
    'inline-block': {
      label: 'view--inlineBlock',
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    flex: {
      label: 'view--flex',
      display: 'flex'
    },
    'inline-flex': {
      label: 'view--inlineFlex',
      display: 'inline-flex',
      verticalAlign: 'middle'
    },
    auto: {}
  }

  const textAlignVariants = {
    start: { textAlign: 'start' },
    center: { textAlign: 'center' },
    end: { textAlign: 'end' }
  }

  const borderColorVariants: Record<BorderColor, { borderColor: string }> = {
    transparent: {
      borderColor: componentTheme.borderColorTransparent
    },
    primary: {
      borderColor: componentTheme.borderColorPrimary
    },
    secondary: {
      borderColor: componentTheme.borderColorSecondary
    },
    brand: {
      borderColor: componentTheme.borderColorBrand
    },
    info: {
      borderColor: componentTheme.borderColorInfo
    },
    success: {
      borderColor: componentTheme.borderColorSuccess
    },
    warning: {
      borderColor: componentTheme.borderColorWarning
    },
    alert: {
      borderColor: componentTheme.borderColorInfo
    },
    danger: {
      borderColor: componentTheme.borderColorDanger
    }
  }

  const backgroundColorVariants = {
    transparent: {
      color: componentTheme.color,
      background: 'none'
    },
    primary: {
      color: componentTheme.color,
      background: componentTheme.backgroundPrimary
    },
    secondary: {
      color: componentTheme.color,
      background: componentTheme.backgroundSecondary
    },
    ['primary-inverse']: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundPrimaryInverse
    },
    brand: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundBrand
    },
    info: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundInfo
    },
    alert: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundInfo
    },
    success: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundSuccess
    },
    danger: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundDanger
    },
    warning: {
      color: componentTheme.colorPrimaryInverse,
      background: componentTheme.backgroundWarning
    }
  }

  const stackingVariants = {
    topmost: {
      zIndex: componentTheme.stackingTopmost
    },
    above: {
      zIndex: componentTheme.stackingAbove
    },
    resting: {},
    below: {
      zIndex: componentTheme.stackingBelow
    },
    deepest: {
      zIndex: componentTheme.stackingDeepest
    }
  }

  const shadowVariants = {
    topmost: {
      boxShadow: elevationTokenToBoxShadow(sharedTokens.boxShadow.elevation4)
    },
    resting: {
      boxShadow: elevationTokenToBoxShadow(sharedTokens.boxShadow.elevation1)
    },
    above: {
      boxShadow: elevationTokenToBoxShadow(sharedTokens.boxShadow.elevation2)
    },
    none: {}
  }

  const focusStyles = getFocusStyles(props, componentTheme)
  return {
    view: {
      label: 'view',
      boxSizing: 'border-box',
      fontFamily: componentTheme.fontFamily,
      maxWidth: '100%',
      overflow: 'visible',
      ...displayVariants[display!],
      ...(background && backgroundColorVariants[background]),
      ...(stacking && stackingVariants[stacking]),
      ...(shadow && shadowVariants[shadow]),
      ...(textAlign && textAlignVariants[textAlign]),
      overflowX: overflowX && overflowX !== 'visible' ? overflowX : '',
      overflowY: overflowY && overflowY !== 'visible' ? overflowY : '',
      position: position !== 'static' ? position : '',
      overscrollBehavior: overscrollBehavior ? overscrollBehavior : 'auto',
      ...(withVisualDebug
        ? {
            boxShadow: `0 0 0 1px ${componentTheme.debugOutlineColor}`
          }
        : {}),
      ...(withBorder(props)
        ? {
            borderStyle: 'solid',
            ...(borderColorVariants[borderColor!] || {
              borderColor: borderColor
            })
          }
        : {}),
      ...borderStyle
    },
    inlineStyles: {
      //every '&' symbol will add another class to the rule, so it will be stronger
      //making an accidental override less likely
      '&&&&&&&&&&': {
        ...spacingStyle,
        ...offsetStyle,
        ...focusStyles,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        ...getStyleProps(props)
      }
    }
  }
}
export default generateStyle
