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
import { logError as error } from '@instructure/console'

const getBorderStyle = ({ borderRadius, borderWidth, dir, theme }) => {
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

const getSpacingStyle = ({ margin, padding, dir, theme }) => {
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

const getStyleProps = ({ cursor, style }) => {
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

const verifyUniformValues = (initialValue, input) => {
  if (typeof input !== 'string') return false

  return input
    .trim()
    .split(' ')
    .every((value) => initialValue === value)
}
const getFocusRingRadius = (borderRadius = '') => {
  const baseRadiusStyle = 'focusRing--radius'

  const initialValue = borderRadius.trim().split(' ')[0]

  if (verifyUniformValues(initialValue, borderRadius)) {
    const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

    if (['small', 'medium', 'large'].includes(initialValue))
      return `${baseRadiusStyle}${capitalize(initialValue)}`
    if (['circle', 'pill'].includes(initialValue))
      return `${baseRadiusStyle}Inherit`
  }

  return `${baseRadiusStyle}None`
}

const getFocusOutline = (props) => {
  const {
    position,
    display,
    focusPosition,
    withFocusOutline: shouldDisplayFocusOutline
  } = props

  if (typeof shouldDisplayFocusOutline === 'undefined') {
    return shouldDisplayFocusOutline
  }

  if (shouldDisplayFocusOutline) {
    error(
      display === 'inline' || position === 'relative',
      '[View] the focus outline will only show if the `position` prop is `relative`.'
    )

    error(
      display !== 'inline' || focusPosition === 'inset',
      '[View] when display is set to `inline` the focus outline will only show if `focusPosition` is set to `inset`.'
    )
  }

  return shouldDisplayFocusOutline
}

const withBorder = (props) => {
  const { borderWidth } = props

  return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
}

const getFocusStyles = (props, componentTheme) => {
  const {
    focusColor,
    focusPosition,
    position,
    shouldAnimateFocus,
    borderRadius
  } = props
  const focusOutline = getFocusOutline(props)
  const shouldUseBrowserFocus = typeof focusOutline === 'undefined'

  const focusPositionVariants = {
    offset: {
      top: `calc(${componentTheme.focusOutlineOffset} * -1)`,
      left: `calc(${componentTheme.focusOutlineOffset} * -1)`,
      right: `calc(${componentTheme.focusOutlineOffset} * -1)`,
      bottom: `calc(${componentTheme.focusOutlineOffset}* -1)`
    },
    inset: {
      top: `calc(${componentTheme.focusOutlineInset} * -1)`,
      left: `calc(${componentTheme.focusOutlineInset} * -1)`,
      right: `calc(${componentTheme.focusOutlineInset} * -1)`,
      bottom: `calc(${componentTheme.focusOutlineInset} * -1)`
    }
  }
  const focusColorVariants = {
    info: componentTheme.focusColorInfo,
    inverse: componentTheme.focusColorInverse,
    success: componentTheme.focusColorSuccess,
    danger: componentTheme.focusColorDanger
  }

  if (position === 'relative') {
    const focusRingRadius = getFocusRingRadius(borderRadius)
    const focusRingVariants = {
      'focusRing--radiusInherit': 'inherit',
      'focusRing--radiusNone': 0
    }
    const borderRadiusByOffset = {
      offset: {
        'focusRing--radiusSmall': {
          borderRadius: `calc(${componentTheme.borderRadiusSmall} + (${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth}))`
        },
        'focusRing--radiusMedium': {
          borderRadius: `calc(${componentTheme.borderRadiusMedium} + (${componentTheme.focusOutlineOffset} - ${componentTheme.focusOutlineWidth}))`
        },
        'focusRing--radiusLarge': {
          borderRadius: `calc(${componentTheme.borderRadiusLarge} + (${componentTheme.focusOutlineOffset} -  ${componentTheme.focusOutlineWidth}))`
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
        }
      }
    }

    return {
      '&::before': {
        pointerEvents: 'none',
        content: '""',
        position: 'absolute',
        borderStyle: componentTheme.focusOutlineStyle,
        borderWidth: componentTheme.focusOutlineWidth,
        borderColor:
          focusColorVariants[focusColor] ||
          componentTheme.focusOutlineColorDefault,
        opacity: 0,
        borderRadius: focusRingVariants[focusRingRadius],
        ...borderRadiusByOffset[focusPosition][focusRingRadius],
        ...focusPositionVariants[focusPosition],
        ...(shouldAnimateFocus
          ? {
              transition: 'all 0.2s',
              transform: 'scale(0.95)'
            }
          : {}),
        ...(focusOutline
          ? {
              opacity: 1,
              transform: 'scale(1)'
            }
          : {})
      },
      '&:focus': {
        outline: 'none',
        '&::before': {
          ...(shouldUseBrowserFocus
            ? {
                opacity: 1,
                transform: 'scale(1)'
              }
            : {})
        }
      }
    }
  }

  return {
    '&::before': {
      borderStyle: 'none'
    },
    outlineStyle: 'none',
    outlineColor: focusColorVariants[focusColor],
    ...(focusOutline
      ? {
          outlineWidth: componentTheme.focusOutlineWidth,
          outlineStyle: componentTheme.focusOutlineStyle
        }
      : {}),
    '&:focus': {
      ...(shouldUseBrowserFocus
        ? {
            outlineWidth: componentTheme.focusOutlineWidth,
            outlineStyle: componentTheme.focusOutlineStyle
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
 * @param  {Object} extraArgs
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, extraArgs = {}) => {
  const {
    borderRadius,
    borderWidth,
    margin,
    padding,
    position,
    display,
    focusPosition,
    textAlign,
    borderColor,
    background,
    stacking,
    shadow,
    overflowY,
    overflowX,
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

  const shouldUseFocusStyles =
    position === 'relative' ||
    (display === 'inline' && focusPosition === 'inset')

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
    }
  }
  const textAlignVariants = {
    start: { textAlign: 'start' },
    center: { textAlign: 'center' },
    end: { textAlign: 'end' }
  }
  const borderColorVariants = {
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
    }
  }

  const focusStyles = getFocusStyles(props, componentTheme)

  return {
    view: {
      label: 'view',
      boxSizing: 'border-box',
      fontFamily: componentTheme.fontFamily,
      maxWidth: '100%',
      overflow: 'visible',
      ...displayVariants[display],
      ...backgroundColorVariants[background],
      ...stackingVariants[stacking],
      ...shadowVariants[shadow],
      ...textAlignVariants[textAlign],
      overflowX: overflowX && overflowX !== 'visible' ? overflowX : '',
      overflowY: overflowY && overflowY !== 'visible' ? overflowY : '',
      position: position !== 'static' ? position : '',
      ...(withVisualDebug
        ? {
            outline: `0.0625rem dashed ${componentTheme.debugOutlineColor}`
          }
        : {}),
      ...(withBorder(props)
        ? {
            borderStyle: componentTheme.borderStyle,
            ...borderColorVariants[borderColor]
          }
        : {}),
      ...(shouldUseFocusStyles ? focusStyles : {})
    },
    inlineStyles: {
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
export default generateStyle
