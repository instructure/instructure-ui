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
 * @param  {string} props.justifyItems
 * @param  {string} props.direction
 * @param  {string} props.alignItems
 * @param  {string} props.wrap
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
// @ts-expect-error ts-migrate(6133) FIXME: 'state' is declared but its value is never read.
const generateStyle = (componentTheme: any, props: any, state: any) => {
  const { justifyItems, wrap, direction, alignItems: alignItemsProp } = props

  // align-items css prop
  // When flex direction is row, 'center' is the most useful default because it
  // vertically aligns Items. For column direction, though, we want 'stretch'.
  const alignItems =
    alignItemsProp ||
    (direction === 'column' || direction === 'column-reverse'
      ? 'stretch'
      : 'center')
  const alignItemsValues = {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
    stretch: 'stretch'
  }

  // justify-content css prop
  const justifyItemsValues = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between'
  }

  // wrap css prop
  const wrapValues = {
    wrap: 'wrap',
    'wrap-reverse': 'wrap-reverse'
  }

  // flex-direction css props
  const flexDirectionValues = {
    column: 'column',
    'column-reverse': 'column-reverse',
    row: 'row',
    'row-reverse': 'row-reverse'
  }

  return {
    flex: {
      label: 'flex',
      fontFamily: componentTheme.fontFamily,
      boxSizing: 'border-box',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      alignItems: alignItemsValues[alignItems],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      justifyContent: justifyItemsValues[justifyItems],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      flexWrap: wrapValues[wrap],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      flexDirection: flexDirectionValues[direction]
    }
  }
}

export default generateStyle
