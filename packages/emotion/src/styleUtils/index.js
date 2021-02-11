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

import React from 'react'
import { useTheme as useEmotionTheme } from 'emotion-theming'
import { canvas } from '@instructure/ui-themes'
import { isEmpty } from '@instructure/ui-utils'

/**
 * ---
 * private: true
 * ---
 * This is a utility function which calculates the correct component theme
 * based on every possible override there is.

 * @param {object} theme - Theme object
 * @param {*} componentName - Name of the component
 * @param {*} props - The component's props object
 * @returns {object} The calculated theme override object
 */
const getComponentThemeOverride = (theme, componentName, props) => {
  const componentOverride =
    theme?.componentOverrides && theme.componentOverrides[componentName]

  return { ...componentOverride, ...(props?.themeOverride ?? {}) }
}

/**
 * A hook that will return the currently applied theme object from the nearest Context.
 * If there is no theme provided to the Context it will return the default `canvas` theme.
 * @returns {object} the theme object
 */
const useTheme = () => {
  let theme = useEmotionTheme()

  if (isEmpty(theme)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `No theme provided for [EmotionThemeProvider], using default <canvas> theme.`
      )
    }

    theme = canvas
  }

  return theme
}

/**
 * A hook which wraps emotion’s useTheme hook and applies it to the component specific style configuration
 * @param {string} componentName - Name of the component
 * @param {function} generateStyle - The function that returns the component's style object
 * @param {object} props - The component's props object
 * @param {object} extraArgs - Any other parameter you might want to supply to the generateStyle function
 * @returns {*} style object
 */
const useStyle = (componentName, generateStyle, props, ...extraArgs) => {
  const theme = useTheme()
  const themeOverride = getComponentThemeOverride(theme, componentName, props)

  return generateStyle(theme, themeOverride, props, ...extraArgs)
}

export { ThemeablePropValues } from './ThemeablePropValues'
export { ThemeablePropTypes } from './ThemeablePropTypes'
export { getComponentThemeOverride, useStyle, useTheme }
