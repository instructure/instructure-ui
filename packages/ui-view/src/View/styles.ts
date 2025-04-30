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
  getShorthandPropValue,
  mirrorShorthandEdges,
  mirrorShorthandCorners
} from '@instructure/emotion'
import { pickProps } from '@instructure/ui-react-utils'

import type {
  OtherHTMLAttributes,
  PartialRecord,
  ViewTheme
} from '@instructure/shared-types'
import type { ViewProps, ViewStyle, BorderColor } from './props'
import { alpha } from '@instructure/ui-color-utils'

const getBorderStyle = ({
  borderRadius,
  borderWidth,
  dir,
  theme
}: {
  theme: ViewTheme
  borderRadius: ViewProps['borderRadius']
  borderWidth: ViewProps['borderWidth']
  dir: ViewProps['dir']
}) => {
  const isRtlDirection = dir === DIRECTION.rtl

  return {
    borderRadius: getShorthandPropValue(
      'View',
      theme,
      isRtlDirection ? mirrorShorthandCorners(borderRadius) : borderRadius,
      'borderRadius'
    ),
    borderWidth: getShorthandPropValue(
      'View',

      theme,
      isRtlDirection ? mirrorShorthandEdges(borderWidth) : borderWidth,
      'borderWidth'
    )
  }
}

const getSpacingStyle = ({
  margin,
  padding,
  dir,
  theme
}: {
  theme: ViewTheme
  margin: ViewProps['margin']
  padding: ViewProps['padding']
  dir: ViewProps['dir']
}) => {
  const isRtlDirection = dir === DIRECTION.rtl

  return {
    margin: getShorthandPropValue(
      'View',
      theme,
      isRtlDirection ? mirrorShorthandEdges(margin) : margin,
      'margin'
    ),
    padding: getShorthandPropValue(
      'View',
      theme,
      isRtlDirection ? mirrorShorthandEdges(padding) : padding,
      'padding'
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

const verifyUniformValues = (
  initialValue: string,
  input: ViewProps['borderRadius']
) => {
  if (typeof input !== 'string') {
    return false
  }

  return input
    .trim()
    .split(' ')
    .every((value) => initialValue === value)
}

type FocusRingRadius =
  | 'focusRing--radiusInherit'
  | 'focusRing--radiusNone'
  | 'focusRing--radiusSmall'
  | 'focusRing--radiusMedium'
  | 'focusRing--radiusLarge'
  | 'focusRing--radiusCustom'

const getFocusRingRadius = (
  borderRadius: ViewProps['borderRadius'],
  props: ViewProps
) => {
  const baseRadiusStyle = 'focusRing--radius'
  const initialValue = (borderRadius || '').trim().split(' ')[0]
  if (props.focusRingBorderRadius) {
    return `${baseRadiusStyle}Custom`
  }
  if (verifyUniformValues(initialValue, borderRadius)) {
    const capitalize = (str: string) =>
      `${str.charAt(0).toUpperCase()}${str.slice(1)}`

    if (['small', 'medium', 'large'].includes(initialValue))
      return `${baseRadiusStyle}${capitalize(initialValue)}` as FocusRingRadius
    if (['circle', 'pill'].includes(initialValue))
      return `${baseRadiusStyle}Inherit` as FocusRingRadius
  }

  return `${baseRadiusStyle}None` as FocusRingRadius
}

const withBorder = (props: ViewProps) => {
  const { borderWidth } = props
  return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
}

const getFocusStyles = (props: ViewProps, componentTheme: ViewTheme) => {
  const {
    focusColor,
    focusPosition,
    shouldAnimateFocus,
    borderRadius,
    focusRingBorderRadius,
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

  const focusRingRadius = getFocusRingRadius(borderRadius, props)
  const focusRingVariants: PartialRecord<FocusRingRadius, string | 0> = {
    'focusRing--radiusInherit': 'inherit',
    'focusRing--radiusNone': 0
  }
  const borderRadiusByOffset: {
    [k in NonNullable<ViewProps['focusPosition']>]: PartialRecord<
      FocusRingRadius,
      { borderRadius: string }
    >
  } = {
    offset: {
      'focusRing--radiusSmall': {
        borderRadius: `calc(${componentTheme.borderRadiusSmall} + (${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusMedium': {
        borderRadius: `calc(${componentTheme.borderRadiusMedium} + (${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusLarge': {
        borderRadius: `calc(${componentTheme.borderRadiusLarge} + (${componentTheme.focusOutlineOffset} -  ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusCustom': {
        borderRadius: `calc(${focusRingBorderRadius} + (${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth}))`
      }
    },
    inset: {
      'focusRing--radiusSmall': {
        borderRadius: `calc(${componentTheme.borderRadiusSmall} - (${componentTheme.focusOutlineInset} + ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusMedium': {
        borderRadius: `calc(${componentTheme.borderRadiusMedium} - (${componentTheme.focusOutlineInset} + ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusLarge': {
        borderRadius: `calc(${componentTheme.borderRadiusLarge} - (${componentTheme.focusOutlineInset} + ${componentTheme.focusOutlineWidth}))`
      },
      'focusRing--radiusCustom': {
        borderRadius: `calc(${focusRingBorderRadius} - (${componentTheme.focusOutlineOffset} + ${componentTheme.focusOutlineWidth}))`
      }
    }
  }
  return {
    outlineOffset: '-0.8rem', // value when not in focus, its invisible
    outlineColor: alpha(focusColorVariants[focusColor!], 0),
    outlineStyle: componentTheme.focusOutlineStyle,
    outlineWidth: componentTheme.focusOutlineWidth,
    borderRadius: focusRingVariants[focusRingRadius], // inherit or none
    ...borderRadiusByOffset[focusPos][focusRingRadius], // border radius value
    ...(shouldAnimateFocus
      ? {
          transition: 'outline-color 0.2s, outline-offset 0.25s'
        }
      : {}),
    ...(withFocusOutline
      ? {
          ...focusPositionVariants[focusPos],
          outlineColor: focusColorVariants[focusColor!]
        }
      : {}),
    '&:focus': {
      ...(typeof withFocusOutline === 'undefined'
        ? {
            ...focusPositionVariants[focusPos],
            outlineColor: focusColorVariants[focusColor!]
          }
        : {})
    },
    '&:focus-within': {
      ...(focusWithin
        ? {
            ...focusPositionVariants[focusPos],
            outlineColor: focusColorVariants[focusColor!]
          }
        : {})
    }
  }
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ViewTheme,
  props: ViewProps
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
    theme: componentTheme,
    borderRadius,
    borderWidth,
    dir
  })

  const spacingStyle = getSpacingStyle({
    margin,
    padding,
    theme: componentTheme,
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
      borderColor: componentTheme.borderColorAlert
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
      background: componentTheme.backgroundAlert
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
      boxShadow: componentTheme.shadowTopmost
    },
    resting: {
      boxShadow: componentTheme.shadowResting
    },
    above: {
      boxShadow: componentTheme.shadowAbove
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
            //outline: `0.0625rem dashed ${componentTheme.debugOutlineColor}`
            boxShadow: `0 0 0 1px ${componentTheme.debugOutlineColor}`
          }
        : {}),
      ...(withBorder(props)
        ? {
            borderStyle: componentTheme.borderStyle,
            ...(borderColorVariants[borderColor!] || {
              borderColor: borderColor
            })
          }
        : {}),
      ...focusStyles
    },
    inlineStyles: {
      //every '&' symbol will add another class to the rule, so it will be stronger
      //making an accidental override less likely
      '&&&&&&&&&&': {
        ...spacingStyle,
        ...borderStyle,
        ...offsetStyle,
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
