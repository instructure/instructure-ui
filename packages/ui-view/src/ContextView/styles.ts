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

import { mirrorPlacement } from '@instructure/ui-position'

import type { PlacementPropValues } from '@instructure/ui-position'
import type { ContextViewTheme } from '@instructure/shared-types'
import type { ContextViewProps, ContextViewStyle } from './props'

type PlacementArray = PlacementPropValues[]

const endPlacements: PlacementArray = [
  'end center',
  'end top',
  'end bottom',
  'center end',
  'end'
]
const startPlacements: PlacementArray = [
  'start center',
  'start top',
  'start bottom',
  'center start',
  'start'
]
const bottomPlacements: PlacementArray = [
  'bottom',
  'bottom end',
  'bottom start',
  'bottom center'
]
const topPlacements: PlacementArray = [
  'top',
  'top start',
  'top end',
  'top center'
]

const getPlacementStyle = (
  placement: PlacementPropValues,
  theme: ContextViewTheme
) => {
  if (endPlacements.includes(placement)) {
    return { paddingInlineStart: theme?.arrowSize, paddingInlineEnd: '0' }
  }
  if (startPlacements.includes(placement)) {
    return { paddingInlineEnd: theme?.arrowSize, paddingInlineStart: '0' }
  }
  if (bottomPlacements.includes(placement)) {
    return { paddingTop: theme?.arrowSize }
  }
  if (topPlacements.includes(placement)) {
    return { paddingBottom: theme?.arrowSize }
  }

  return { position: 'absolute', left: '-999em' }
}

const getArrowCorrections = (
  placement: PlacementPropValues,
  theme: ContextViewTheme
) => {
  const center: PlacementArray = [
    'top',
    'bottom',
    'top center',
    'bottom center'
  ]
  const start: PlacementArray = ['top start', 'bottom start']
  const end: PlacementArray = ['top end', 'bottom end']
  const top: PlacementArray = ['start top', 'end top']
  const bottom: PlacementArray = ['start bottom', 'end bottom']

  if (center.includes(placement)) {
    return {
      insetInlineStart: '50%'
    }
  }
  if (start.includes(placement)) {
    return {
      insetInlineStart: `calc((${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`,
      insetInlineEnd: 'auto'
    }
  }
  if (end.includes(placement)) {
    return {
      insetInlineStart: `calc(100% - (${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`,
      insetInlineEnd: 'auto'
    }
  }
  if (top.includes(placement)) {
    return {
      top: `calc((${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`
    }
  }
  if (bottom.includes(placement)) {
    return {
      top: `calc(100% - (${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`
    }
  }

  return {}
}

const getArrowPlacementVariant = (
  placement: PlacementPropValues,
  background: ContextViewProps['background'],
  theme: ContextViewTheme,
  props: ContextViewProps
) => {
  const transformedPlacement = mirrorPlacement(placement, ' ')
  const isInversed = background === 'inverse'
  const { borderColor } = props

  if (endPlacements.includes(transformedPlacement)) {
    return {
      main: {
        top: '50%',
        insetInlineStart: '100%',
        insetInlineEnd: 'auto',
        marginTop: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
        borderInlineEndWidth: '0',
        borderInlineEndColor: 'transparent',
        borderInlineStartColor:
          borderColor ||
          (isInversed
            ? theme?.arrowBorderColorInverse
            : theme?.arrowBorderColor),
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderInlineStartWidth: theme?.arrowSize
      },

      __after: {
        insetInlineEnd: theme?.arrowBorderWidth,
        insetInlineStart: 'auto',
        marginTop: `calc(-1 * ${theme?.arrowSize})`,
        borderInlineEndWidth: '0',
        borderInlineEndColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderInlineStartWidth: theme?.arrowSize,
        borderInlineStartColor: isInversed
          ? theme?.arrowBackgroundColorInverse
          : theme?.arrowBackgroundColor
      }
    }
  }

  if (startPlacements.includes(transformedPlacement)) {
    return {
      main: {
        top: '50%',
        insetInlineEnd: '100%',
        insetInlineStart: 'auto',
        marginTop: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
        borderInlineStartWidth: '0',
        borderInlineStartColor: 'transparent',
        borderInlineEndColor:
          borderColor ||
          (isInversed
            ? theme?.arrowBorderColorInverse
            : theme?.arrowBorderColor),
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderInlineEndWidth: theme?.arrowSize
      },
      __after: {
        insetInlineStart: theme?.arrowBorderWidth,
        insetInlineEnd: 'auto',
        marginTop: `calc(-1 * ${theme?.arrowSize})`,
        borderInlineStartWidth: '0',
        borderInlineStartColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderInlineEndWidth: theme?.arrowSize,
        borderInlineEndColor: isInversed
          ? theme?.arrowBackgroundColorInverse
          : theme?.arrowBackgroundColor
      }
    }
  }

  if (bottomPlacements.includes(transformedPlacement)) {
    return {
      main: {
        top: '100%',
        marginInlineStart: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
        marginInlineEnd: '0',
        borderBottomWidth: '0',
        borderBottomColor: 'transparent',
        borderInlineStartColor: 'transparent',
        borderInlineEndColor: 'transparent'
      },
      __after: {
        bottom: theme?.arrowBorderWidth,
        marginInlineStart: `calc(-1 * ${theme?.arrowSize})`,
        marginInlineEnd: '0',
        borderBottomWidth: '0',
        borderBottomColor: 'transparent',
        borderInlineStartColor: 'transparent',
        borderInlineEndColor: 'transparent',
        borderTopColor: isInversed
          ? theme?.arrowBackgroundColorInverse
          : theme?.arrowBackgroundColor
      }
    }
  }

  return {
    main: {
      bottom: '100%',
      marginInlineStart: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
      marginInlineEnd: '0',
      borderTopWidth: '0',
      borderTopColor: 'transparent',
      borderInlineStartColor: 'transparent',
      borderInlineEndColor: 'transparent'
    },
    __after: {
      top: theme?.arrowBorderWidth,
      marginInlineStart: `calc(-1 * ${theme?.arrowSize})`,
      marginInlineEnd: '0',
      borderTopWidth: '0',
      borderTopColor: 'transparent',
      borderInlineStartColor: 'transparent',
      borderInlineEndColor: 'transparent',
      borderBottomColor: isInversed
        ? theme?.arrowBackgroundColorInverse
        : theme?.arrowBackgroundColor
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
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ContextViewTheme,
  props: ContextViewProps
): ContextViewStyle => {
  const { placement, background, borderColor } = props

  const arrowBaseStyles = {
    content: '""',
    height: '0',
    width: '0',
    position: 'absolute',
    display: 'block',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    borderStyle: 'solid'
  }

  const arrowBackGroundVariants = {
    default: componentTheme?.arrowBorderColor,
    inverse: componentTheme?.arrowBorderColorInverse
  }

  const arrowPlacementVariant = getArrowPlacementVariant(
    placement!,
    background,
    componentTheme,
    props
  )

  return {
    contextView: {
      label: 'contextView',
      boxSizing: 'border-box',
      minHeight: `calc(${componentTheme?.arrowSize} * 2)`,
      ...getPlacementStyle(placement!, componentTheme)
    },
    contextView__content: {
      label: 'contextView__content',
      position: 'relative'
    },
    contextView__arrow: {
      label: 'contextView__arrow',
      ...arrowBaseStyles,
      display: 'block',
      borderWidth: `calc(${componentTheme?.arrowSize} + ${componentTheme?.arrowBorderWidth})`,
      borderColor:
        borderColor ||
        arrowBackGroundVariants[background!],
      ...arrowPlacementVariant.main,
      ...getArrowCorrections(placement!, componentTheme),
      '&::after': {
        borderWidth: componentTheme?.arrowSize,
        borderColor: arrowBackGroundVariants[background!],
        ...arrowPlacementVariant.__after,
        ...arrowBaseStyles
      }
    },
    arrowSize: componentTheme.arrowSize,
    arrowBorderWidth: componentTheme.arrowBorderWidth
  }
}

export default generateStyle
