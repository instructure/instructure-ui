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

import type { GridTheme } from '@instructure/shared-types'
import type { GridBreakpoints } from '../GridTypes'
import type { GridColProps, GridColStyle } from './props'

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
  componentTheme: GridTheme,
  props: GridColProps
): GridColStyle => {
  const {
    vAlign,
    textAlign,
    rowSpacing,
    colSpacing,
    isLastRow,
    isLastCol,
    startAt,
    visualDebug
  } = props

  const rowSpacingVariants = {
    small: { marginBottom: componentTheme.spacingSmall },
    medium: { marginBottom: componentTheme.spacingMedium },
    large: { marginBottom: componentTheme.spacingLarge },
    none: { marginBottom: 0 }
  }

  const getStartGridColumnStyle = () => {
    const colSpacingVariants = {
      small: {
        paddingLeft: `calc(${componentTheme.spacingSmall} / 2)`,
        paddingRight: `calc(${componentTheme.spacingSmall} / 2)`
      },
      medium: {
        paddingLeft: `calc(${componentTheme.spacingMedium} / 2)`,
        paddingRight: `calc(${componentTheme.spacingMedium} / 2)`
      },
      large: {
        paddingLeft: `calc(${componentTheme.spacingLarge} / 2)`,
        paddingRight: `calc(${componentTheme.spacingLarge} / 2)`
      },
      none: {}
    }

    const vAlignVariants = {
      top: { alignSelf: 'flex-start' },
      middle: { alignSelf: 'center' },
      bottom: { alignSelf: 'flex-end' }
    }

    const textAlignVariants = {
      start: { textAlign: 'start' },
      end: { textAlign: 'end' },
      center: { textAlign: 'center' },
      inherit: { textAlign: 'inherit' }
    }

    return {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      marginBottom: 0,
      boxSizing: 'border-box',
      ...(colSpacing && colSpacingVariants[colSpacing]),
      ...(vAlign && vAlignVariants[vAlign]),
      ...(textAlign && textAlignVariants[textAlign])
    }
  }

  const enabledBreakpoints = () => {
    const breakpoints: GridBreakpoints[] = [
      'small',
      'medium',
      'large',
      'x-large',
      null
    ]
    return breakpoints.slice(breakpoints.indexOf(startAt!))
  }

  const breakpointIsEnabled = (breakpoint: GridBreakpoints) => {
    return enabledBreakpoints().includes(breakpoint)
  }

  const getColSize = (breakpoint: GridBreakpoints) => {
    let { width } = props

    if (!width) return

    if (width && typeof width === 'object') {
      // @ts-expect-error TODO: type when typing component
      width = width[breakpoint]
    }

    return width
  }

  const getColOffset = (breakpoint: GridBreakpoints) => {
    let { offset } = props

    if (!offset) return

    if (offset && typeof offset === 'object') {
      // @ts-expect-error TODO: type when typing component
      offset = offset[breakpoint]
    }

    return offset
  }

  const getFlexColumnBySize = (size: string | number = '1') => {
    switch (size) {
      case 'auto':
        return { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }
      case 12:
        return { flex: '0 0 100%' }
      default:
        return {
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: `calc(${size} / 12 * 99.999%)`,
          maxWidth: `calc(${size} / 12 * 99.999%)`
        }
    }
  }

  const getColumnOffsetBySize = (size: string | number = '1') => {
    switch (size) {
      case 'auto':
      case 12:
        return {}
      default:
        return {
          marginInlineStart: `calc(${size} / 12 * 99.999%)`,
          marginInlineEnd: 0
        }
    }
  }

  const getStartAtVariants = (breakpoint: GridBreakpoints) =>
    !!startAt && startAt === breakpoint ? { ...getStartGridColumnStyle() } : {}

  const getGridColumnsForBreakpoint = (breakpoint: GridBreakpoints) => {
    const size = getColSize(breakpoint)
    const offset = getColOffset(breakpoint)

    return breakpointIsEnabled(breakpoint)
      ? {
          ...(size && getFlexColumnBySize(size)),
          ...(offset && getColumnOffsetBySize(size))
        }
      : {}
  }

  const getBreakpointStyles = (breakpoint: GridBreakpoints) => ({
    ...getStartAtVariants(breakpoint),
    ...getGridColumnsForBreakpoint(breakpoint)
  })

  return {
    gridCol: {
      label: 'gridCol',
      display: 'block',
      boxSizing: 'border-box',
      textAlign: 'inherit',
      minWidth: '0.0625rem',
      ...(rowSpacing && rowSpacingVariants[rowSpacing]),
      ...(isLastRow && isLastCol && { marginBottom: 0 }),

      ...getBreakpointStyles('small'),

      [`@media screen and (${componentTheme.mediumMin})`]: {
        ...getBreakpointStyles('medium')
      },
      [`@media screen and (${componentTheme.largeMin})`]: {
        ...getBreakpointStyles('large')
      },
      [`@media screen and (${componentTheme.xLargeMin})`]: {
        ...getBreakpointStyles('x-large')
      },

      ...(visualDebug && { outline: '0.0625rem dashed red' })
    }
  }
}

export default generateStyle
