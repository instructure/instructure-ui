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
const generateStyle = (componentTheme) => {
  return {
    appNav: {
      label: 'appNav',
      fontFamily: componentTheme.fontFamily,
      borderBottom: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
    },
    alignCenter: {
      alignItems: 'center'
    },
    listItemWithMenuTrigger: {
      label: 'appNav__listItemWithMenuTrigger',
      minWidth: '0.0625rem',
      marginInlineStart: componentTheme.horizontalMargin,
      marginInlineEnd: '0',
      flexShrink: 0,
      flexBasis: componentTheme.menuTriggerWidth
    },
    listItem: {
      label: 'appNav__listItem',
      minWidth: '0.0625rem',
      marginInlineStart: componentTheme.horizontalMargin,
      marginInlineEnd: '0',
      flexShrink: 0
    },
    list: {
      label: 'appNav__list',
      boxSizing: 'border-box',
      listStyleType: 'none',
      height: componentTheme.height,
      margin: '0',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0',
      minWidth: '0.0625rem'
    },
    menuTriggerWidth: componentTheme.menuTriggerWidth
  }
}

export default generateStyle
