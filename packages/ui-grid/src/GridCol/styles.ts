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

import { GridTheme } from '@instructure/shared-types'

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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme: GridTheme, props) => {
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
      }
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
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colSpacingVariants[colSpacing],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...vAlignVariants[vAlign],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...textAlignVariants[textAlign]
    }
  }

  const enabledBreakpoints = () => {
    const breakpoints = ['small', 'medium', 'large', 'x-large', null]
    return breakpoints.slice(breakpoints.indexOf(startAt))
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const breakpointIsEnabled = (breakpoint) => {
    return enabledBreakpoints().includes(breakpoint)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getColSize = (breakpoint) => {
    let { width } = props

    if (!width) return

    if (width && typeof width === 'object') {
      width = width[breakpoint]
    }

    return width
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getColOffset = (breakpoint) => {
    let { offset } = props

    if (!offset) return

    if (offset && typeof offset === 'object') {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getStartAtVariants = (breakpoint) =>
    !!startAt && startAt === breakpoint ? { ...getStartGridColumnStyle() } : {}

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getGridColumnsForBreakpoint = (breakpoint) => {
    const size = getColSize(breakpoint)
    const offset = getColOffset(breakpoint)

    return breakpointIsEnabled(breakpoint)
      ? {
          ...(size && getFlexColumnBySize(size)),
          ...(offset && getColumnOffsetBySize(size))
        }
      : {}
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getBreakpointStyles = (breakpoint) => ({
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
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...rowSpacingVariants[rowSpacing],
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
