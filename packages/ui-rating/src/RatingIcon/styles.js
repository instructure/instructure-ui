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
const generateStyle = (componentTheme, props, state) => {
  const { size } = props

  const sizeVariants = {
    small: { fontSize: componentTheme.smallIconFontSize },
    medium: { fontSize: componentTheme.mediumIconFontSize },
    large: { fontSize: componentTheme.largeIconFontSize }
  }
  return {
    ratingIcon: {
      label: 'ratingIcon',
      display: 'inline-block',
      verticalAlign: 'bottom',
      margin: `0 ${componentTheme.iconMargin}`,
      lineHeight: 1,
      '&:first-of-type': {
        marginLeft: 0
      },
      '&:last-of-type': {
        marginRight: 0
      }
    },
    icon: {
      label: 'ratingIcon__icon',
      display: 'inline-block',
      verticalAlign: 'bottom',
      ...sizeVariants[size],
      color: state.filled
        ? componentTheme.iconFilledColor
        : componentTheme.iconEmptyColor
    }
  }
}

export default generateStyle
