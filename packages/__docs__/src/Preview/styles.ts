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

import type { PreviewProps, PreviewTheme, PreviewStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: PreviewTheme,
  props: PreviewProps
): PreviewStyle => {
  const { fullscreen, frameless } = props

  const previewStyle = {
    boxSizing: 'border-box',
    margin: 0,
    position: 'relative',
    overflow: 'auto',
    padding: componentTheme.padding,
    borderWidth: componentTheme.borderWidth,
    borderStyle: 'solid',
    borderColor: componentTheme.borderColor,
    borderRadius: componentTheme.borderRadius,
    backgroundColor: componentTheme.backgroundColor,
    ...(fullscreen && {
      position: 'fixed',
      width: '100vw',
      height: '100vh'
    }),

    ...(frameless && {
      padding: '0',
      border: 'none',
      margin: '1rem 0 2rem 0'
    })
  }

  const errorStyle = {
    background: componentTheme.backgroundError,
    boxSizing: 'border-box',
    margin: 0,
    display: 'block',
    color: componentTheme.colorError,
    fontFamily: componentTheme.fontFamilyError,
    fontSize: componentTheme.fontSizeError,
    lineHeight: 1.4,

    'pre, code': { color: componentTheme.colorError }
  }

  return {
    preview: {
      label: 'preview',
      ...previewStyle
    },

    previewError: {
      label: 'preview--error',
      ...previewStyle,
      ...errorStyle
    },

    error: {
      label: 'preview__error',
      ...errorStyle
    }
  }
}

export default generateStyle
