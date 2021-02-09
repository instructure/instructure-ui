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

import React, { forwardRef, useState } from 'react'
import { decorator } from '@instructure/ui-decorator'
import { isEqual } from 'lodash'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useTextDirectionContext } from '@instructure/ui-i18n'
import { bidirectionalPolyfill } from './styleUtils/polyFill'
import { getComponentThemeOverride, useTheme } from './styleUtils'

/**
 * ---
 * category: utilities/themes
 * ---
 * Decorator which adds a `makeStyles` function and
 * the generated `styles` object to the decorated Component's props.
 *
 * @param {function} generateStyle - The function that returns the component's style object
 * @param {function} generateComponentTheme - The function that returns the component's theme variables object
 * @returns {ReactElement} The decorated WithStyle Component
 *
 * @example
 * class ExampleComponent extends React.Component {
 *
 *  componentDidUpdate() {
 *    this.props.makeStyles()
 *
 * }
 *  componentDidMount() {
 *    this.props.makeStyles()
 * }
 *
 *  render() {
 *    const { propVal1, styles, ...props } = this.props
 *
 *    return (
 *      <Element css={styles.root} >...</Element>
 *    )
 *  }
 * }
 */
const withStyle = decorator(
  (ComposedComponent, generateStyle, generateComponentTheme) => {
    const WithStyle = forwardRef((props, ref) => {
      const theme = useTheme()
      const dir = useTextDirectionContext()
      const componentProps = {
        ...ComposedComponent.defaultProps,
        ...props
      }
      const themeOverride = getComponentThemeOverride(
        theme,
        ComposedComponent.displayName,
        componentProps
      )

      const componentTheme =
        typeof generateComponentTheme === 'function'
          ? generateComponentTheme(theme, themeOverride)
          : {}
      const [styles, setStyles] = useState(
        generateStyle
          ? bidirectionalPolyfill(
              generateStyle(componentTheme, componentProps, {}),
              dir
            )
          : {}
      )

      const makeStyleHandler = (...extraArgs) => {
        const calculatedStyles = bidirectionalPolyfill(
          generateStyle(componentTheme, componentProps, ...extraArgs),
          dir
        )

        if (!isEqual(calculatedStyles, styles)) {
          setStyles(calculatedStyles)
        }
      }

      return (
        <ComposedComponent
          ref={ref}
          makeStyles={makeStyleHandler}
          styles={styles}
          {...props}
        />
      )
    })

    hoistNonReactStatics(WithStyle, ComposedComponent)

    // we have to pass these on, because sometimes we need to
    // access propTypes of the component in other components
    // (mainly in the `omitProps` method)
    WithStyle.propTypes = ComposedComponent.propTypes
    WithStyle.defaultProps = ComposedComponent.defaultProps

    // we are exposing the theme generator for the docs generation
    WithStyle.generateComponentTheme = generateComponentTheme

    // we have to add defaults to makeStyles and styles added by this decorator
    // eslint-disable-next-line no-param-reassign
    ComposedComponent.defaultProps = {
      ...ComposedComponent.defaultProps,
      makeStyles: () => {},
      styles: {}
    }

    if (process.env.NODE_ENV !== 'production') {
      WithStyle.displayName = `WithStyle(${ComposedComponent.displayName})`
    }

    return WithStyle
  }
)

export default withStyle
export { withStyle }
