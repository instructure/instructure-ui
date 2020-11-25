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
import { useTheme } from 'emotion-theming'
import bidirectionalPolyfill from './bidirectionalPolyfill'

/**
 * A hook which wraps emotion’s useTheme hook and applies it to the component specific style configuration
 * @param {string} componentName - Name of the component
 * @param {function} generateStyle - The method that returns the component's style object
 * @param {Object} props - The component's props object
 * @param {Object} state - The component's state object
 * @returns {*} style object
 */
function useStyle(componentName, generateStyle, props, state) {
  const theme = useTheme()

  const componentOverride = theme?.components && theme.components[componentName]

  const style = generateStyle(
    theme,
    { ...componentOverride, ...(props?.themeOverride ?? {}) },
    props,
    state
  )

  return bidirectionalPolyfill(style)
}

export default useStyle
export { useStyle, useTheme }
