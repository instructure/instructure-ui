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
import { decorator } from '@instructure/ui-decorator'
import { partial } from 'lodash'

const makeStyles = (theme, componentName, generateStyle, props) => {
  const componentOverride = theme?.components && theme.components[componentName]

  return partial(
    generateStyle,
    theme,
    { ...componentOverride, ...(props?.themeOverride ?? {}) },
    props
  )
}

const useTheme = () => {
  let theme = useEmotionTheme()

  if (isEmpty(theme)) {
    console.warn(
      `No theme provided for [EmotionThemeProvider], using default <canvas> theme.`
    )
    theme = canvas
  }

  return theme
}

/**
 * A hook which wraps emotion’s useTheme hook and applies it to the component specific style configuration
 * @param {string} componentName - Name of the component
 * @param {func} generateStyle -
 * @param {Object} props - The component's props object
 * @param {Object} state - The component's state object
 * @returns {*} style object
 */
const useStyle = (componentName, generateStyle, props, state) => {
  const theme = useTheme()

  return makeStyles(theme, componentName, generateStyle, props)(state)
}

// eslint-disable-next-line react/display-name
const withStyle = decorator((ComposedComponent, generateStyle) => (props) => {
  const theme = useTheme()

  return (
    <ComposedComponent
      makeStyles={makeStyles(
        theme,
        ComposedComponent.displayName,
        generateStyle,
        {
          ...ComposedComponent.defaultProps,
          ...props
        }
      )}
      {...props}
    />
  )
})

export { useStyle, useTheme, withStyle, makeStyles }
