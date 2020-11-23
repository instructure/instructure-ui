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

import generateComponentTheme from './theme'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {string} props.justifyItems
 * @param  {string} props.direction
 * @param  {string} props.alignItems
 * @param  {string} props.wrap
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const { justifyItems, wrap, wrapItems, direction } = props

  const root = {
    label: 'root',
    fontFamily: componentTheme.fontFamily,
    boxSizing: 'border-box'
  }

  // align-items css prop
  // When flex direction is row, 'center' is the most useful default because it
  // vertically aligns Items. For column direction, though, we want 'stretch'.
  const alignItems =
    props.alignItems ||
    (direction === 'column' || direction === 'column-reverse'
      ? 'stretch'
      : 'center')
  const alignItemsValues = {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
    stretch: 'stretch'
  }
  root['alignItems'] = alignItemsValues[alignItems]

  // justify-content css prop
  const justifyItemsValues = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between'
  }
  root['justifyContent'] = justifyItemsValues[justifyItems]

  // wrap css prop
  const wrapValues = {
    wrap: 'wrap',
    'wrap-reverse': 'wrap-reverse'
  }
  if (wrap !== 'no-wrap') {
    root['flexWrap'] = wrapValues[wrap]
  }
  // deprecated in v8.0.0
  if (wrapItems) {
    root['flexWrap'] = 'wrap'
  }

  // flex-direction css props
  const flexDirectionValues = {
    column: 'column',
    'column-reverse': 'column-reverse',
    row: 'row',
    'row-reverse': 'row-reverse'
  }
  root['flexDirection'] = flexDirectionValues[direction]

  return { root }
}

export default generateStyle
