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

import generateComponentTheme from './theme'

const getPlacementStyle = (placement, theme) => {
  if (
    ['end-center', 'end-top', 'end-bottom', 'center-end', 'end'].includes(
      placement
    )
  ) {
    return { paddingInlineStart: theme?.arrowSize, paddingInlineEnd: '0' }
  }
  if (
    [
      'start-center',
      'start-top',
      'start-bottom',
      'center-start',
      'start'
    ].includes(placement)
  ) {
    return { paddingInlineEnd: theme?.arrowSize, paddingInlineStart: '0' }
  }
  if (
    ['bottom', 'bottom-end', 'bottom-start', 'bottom-center'].includes(
      placement
    )
  ) {
    return { paddingTop: theme?.arrowSize }
  }
  if (['top', 'top-start', 'top-end', 'top-center'].includes(placement)) {
    return { paddingBottom: theme?.arrowSize }
  }

  return { position: 'absolute', left: '-999em' }
}

const getArrowCorrections = (placement, theme) => {
  if (['top', 'bottom', 'top-center', 'bottom-center'].includes(placement)) {
    return {
      insetInlineStart: '50%'
    }
  }
  if (['top-start', 'bottom-start'].includes(placement)) {
    return {
      insetInlineStart: `calc((${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`,
      insetInlineEnd: 'auto'
    }
  }
  if (['top-end', 'bottom-end'].includes(placement)) {
    return {
      insetInlineStart: `calc(100% - (${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`,
      insetInlineEnd: 'auto'
    }
  }
  if (['start-top', 'end-top'].includes(placement)) {
    return {
      top: `calc((${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`
    }
  }
  if (['start-bottom', 'end-bottom'].includes(placement)) {
    return {
      top: `calc(100% - (${theme?.arrowSize} + ${theme?.arrowBorderWidth}) * 2)`
    }
  }
}

const getArrowPlacementVariant = (placement, background, theme) => {
  const transformedPlacement = mirrorPlacement(placement, '-')
  const isInversed = background === 'inverse'

  if (
    ['end-center', 'end-top', 'end-bottom', 'center-end', 'end'].includes(
      transformedPlacement
    )
  ) {
    return {
      main: {
        top: '50%',
        insetInlineStart: '100%',
        insetInlineEnd: 'auto',
        marginTop: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
        borderInlineEndWidth: '0',
        borderInlineEndColor: 'transparent',
        borderInlineStartColor: isInversed
          ? theme?.arrowBorderColorInverse
          : theme?.arrowBorderColor,
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
  if (
    [
      'start-center',
      'start-top',
      'start-bottom',
      'center-start',
      'start'
    ].includes(transformedPlacement)
  ) {
    return {
      main: {
        top: '50%',
        insetInlineEnd: '100%',
        insetInlineStart: 'auto',
        marginTop: `calc(-1 * (${theme?.arrowSize} + ${theme?.arrowBorderWidth}))`,
        borderInlineStartWidth: '0',
        borderInlineStartColor: 'transparent',
        borderInlineEndColor: isInversed
          ? theme?.arrowBorderColorInverse
          : theme?.arrowBorderColor,
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

  if (
    ['bottom', 'bottom-end', 'bottom-start', 'bottom-center'].includes(
      transformedPlacement
    )
  ) {
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

const generateStyle = (theme, themeOverride, props, extraArgs) => {
  const { placement, background } = props
  const transformedPlacement = placement.replace(' ', '-')

  const componentTheme = generateComponentTheme(theme, themeOverride)
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
    placement,
    background,
    componentTheme
  )

  return {
    contextView: {
      label: 'contextView',
      boxSizing: 'border-box',
      minHeight: `calc(${componentTheme?.arrowSize} * 2)`,
      ...getPlacementStyle(transformedPlacement, componentTheme)
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
      borderColor: arrowBackGroundVariants[background],
      ...arrowPlacementVariant.main,
      ...getArrowCorrections(transformedPlacement, componentTheme),
      '&::after': {
        borderWidth: componentTheme?.arrowSize,
        borderColor: arrowBackGroundVariants[background],
        ...arrowPlacementVariant.__after,
        ...arrowBaseStyles
      }
    }
  }
}

export default generateStyle
