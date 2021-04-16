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
  return {
    app: {
      label: 'app',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex'
    },
    content: {
      label: 'app__content',
      flexShrink: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      width: '100%'
    },
    hamburger: {
      label: 'app__hamburger',
      position: 'fixed',
      zIndex: componentTheme.menuToggleZIndex,
      top: '1.25rem',
      insetInlineStart: '0.75rem'
    },
    inlineNavigation: {
      label: 'app__inlineNavigation',
      overflowY: 'auto',
      overflowX: 'hidden',
      minHeight: '100vh',
      flexShrink: 0,
      borderInlineEndColor: componentTheme.navBorderColor,
      borderInlineEndWidth: componentTheme.navBorderWidth,
      borderInlineEndStyle: 'solid'
    },
    globalStyles: {
      html: {
        height: '100%',
        fontSize: '85%'
      },
      '@media screen and (min-width: 600px)': {
        html: {
          fontSize: '92%'
        }
      },
      '@media screen and (min-width: 900px)': {
        html: {
          fontSize: '100%'
        }
      },
      body: {
        height: '100%',
        overflow: 'hidden',
        margin: 0,
        color: componentTheme.color,
        fontFamily: componentTheme.fontFamily,
        lineHeight: componentTheme.lineHeight,
        fontWeight: componentTheme.fontWeight,
        background: componentTheme.background
      },
      code: {
        fontFamily: componentTheme.fontFamilyMonospace,
        backgroundColor: componentTheme.codeBackground,
        borderRadius: componentTheme.codeBorderRadius,
        padding: '0.125em'
      },
      'code[class^="lang-"]': {
        padding: '0.5em',
        display: 'block'
      },
      'h3 code': {
        margin: '0 0.5em 0 0'
      },
      'table code': {
        background: 'transparent',
        border: 'none'
      },
      blockquote: {
        display: 'block',
        background: componentTheme.background,
        padding: componentTheme.quotePadding,
        margin: componentTheme.quoteMargin,
        borderTop: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`,
        borderBottom: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
      }
    }
  }
}

export default generateStyle
