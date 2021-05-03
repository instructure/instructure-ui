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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const {
    hAlign,
    vAlign,
    rowSpacing,
    colSpacing,
    isLastRow,
    startAt,
    visualDebug
  } = props

  const getGridRowStyle = () => {
    const hAlignVariants = {
      center: { justifyContent: 'center' },
      start: { justifyContent: 'flex-start' },
      end: { justifyContent: 'flex-end' },
      'space-around': { justifyContent: 'space-around' },
      'space-between': { justifyContent: 'space-between' }
    }

    const vAlignVariants = {
      top: { alignItems: 'flex-start' },
      middle: { alignItems: 'center' },
      bottom: { alignItems: 'flex-end' }
    }

    const colSpacingVariants = {
      small: { margin: `0 calc(-1 * ${componentTheme.spacingSmall} / 2)` },
      medium: { margin: `0 calc(-1 * ${componentTheme.spacingMedium} / 2)` },
      large: { margin: `0 calc(-1 * ${componentTheme.spacingLarge} / 2)` },
      none: {}
    }

    const rowSpacingVariants = {
      small: { marginBottom: componentTheme.spacingSmall },
      medium: { marginBottom: componentTheme.spacingMedium },
      large: { marginBottom: componentTheme.spacingLarge },
      none: { marginBottom: 0 }
    }

    return {
      display: 'flex',
      flexFlow: 'row nowrap',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...hAlignVariants[hAlign],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...vAlignVariants[vAlign],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...colSpacingVariants[colSpacing],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...rowSpacingVariants[rowSpacing],
      ...(isLastRow && { marginBottom: 0 })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakpoint' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getStartAtVariants = (breakpoint) =>
    !!startAt && startAt === breakpoint ? { ...getGridRowStyle() } : {}

  return {
    gridRow: {
      label: 'gridRow',
      display: 'block',
      boxSizing: 'border-box',

      ...getStartAtVariants('small'),

      [`@media screen and (${componentTheme.mediumMin})`]: {
        ...getStartAtVariants('medium')
      },
      [`@media screen and (${componentTheme.largeMin})`]: {
        ...getStartAtVariants('large')
      },
      [`@media screen and (${componentTheme.xLargeMin})`]: {
        ...getStartAtVariants('x-large')
      },

      ...(visualDebug && { outline: '0.0625rem dashed blue' })
    }
  }
}

export default generateStyle
