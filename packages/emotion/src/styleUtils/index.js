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
import React, { forwardRef } from 'react'
import { useTheme as useEmotionTheme } from 'emotion-theming'
import { canvas } from '@instructure/ui-themes'
import { isEmpty } from '@instructure/ui-utils'
import { decorator } from '@instructure/ui-decorator'
import { partial } from 'lodash'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * This is an utility function which calulates the correct component theme based on every possible override there is.
 *
 * It will return a partially applied version of the `generateStyle` function, meaning the `theme`,
 * `componentOverride` and the component's `props` are already 'baked in' so on the consumer side
 * you don't have to provide them, only an optional 4th `options` parameter which will be passed to the `generateStyle`
 * function as the last parameter.
 * @param {object} theme - Theme object
 * @param {*} componentName - Name of the component
 * @param {*} generateStyle - The function that returns the component's style object
 * @param {*} props - The component's props object
 * @returns {function} The partially applied function which will call the `generateStyle` function
 */
const makeStyles = (theme, componentName, generateStyle, props) => {
  const componentOverride = theme?.components && theme.components[componentName]

  return partial(
    generateStyle,
    theme,
    { ...componentOverride, ...(props?.themeOverride ?? {}) },
    props
  )
}

/**
 * A hook that will return the currently applied theme object from the nearest Context.
 * If there is no theme provided to the Context it will return the default `canvas` theme.
 * @returns {object} the theme object
 */
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
 * @param {function} generateStyle - The function that returns the component's style object
 * @param {object} props - The component's props object
 * @param {object} rest - Any other parameter you might want to supply to the generateStyle function
 * @returns {*} style object
 */
const useStyle = (componentName, generateStyle, props, ...rest) => {
  const theme = useTheme()

  return makeStyles(theme, componentName, generateStyle, props)(...rest)
}

/**
 * Decorator which adds a `makeStyles` function to the decorated Component's props.
 * @param {function} generateStyle - The function that returns the component's style object
 * @returns {ReactElement} The decorated WithStyle Component
 *
 * @example
 * class ExampleComponent extends React.Component {
 *
 *  render() {
 *    const { propVal1,...props } = this.props
 *    const styles = props.makeStyles()
 *
 *    return (
 *      <Element css={styles.root} >...</Element>
 *    )
 *  }
 * }
 */
const withStyle = decorator((ComposedComponent, generateStyle) => {
  const WithStyle = forwardRef((props, ref) => {
    const theme = useTheme()

    return (
      <ComposedComponent
        ref={ref}
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

  hoistNonReactStatics(WithStyle, ComposedComponent)
  WithStyle.displayName = `WithStyle(${ComposedComponent.displayName})`

  return WithStyle
})
export { useStyle, useTheme, withStyle }
