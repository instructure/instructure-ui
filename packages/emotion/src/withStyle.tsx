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
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useTextDirectionContext } from '@instructure/ui-i18n'
import { bidirectionalPolyfill } from './styleUtils/bidirectionalPolyfill'
import { getComponentThemeOverride } from './getComponentThemeOverride'
import { useTheme } from './useTheme'
import memoized from './memoize'

const filterProps = <Props extends Record<string, any>>(
  props: Props,
  filterBy?: Array<keyof Props>
) => {
  const filter = new Set(filterBy)

  // these props are always removed
  const blacklist = new Set(['children', 'styles', 'makeStyles', 'className'])

  const object: Partial<Props> = {}

  const hash = Object.entries(props)
    .filter(([key, value]) => {
      // we always have to pass the `themeOverride` prop
      if (key === 'themeOverride') {
        return true
      }

      // remove blacklisted props
      if (blacklist.has(key)) {
        return false
      }

      // if filterBy array is passed, we remove everything not on the list
      if (filter.size && !filter.has(key)) {
        return false
      }

      // also remove empty values, functions, React elements and DOM elements
      if (
        value === null ||
        typeof value === 'undefined' ||
        typeof value === 'function' ||
        typeof value.props !== 'undefined' ||
        value instanceof EventTarget
      ) {
        return false
      }

      object[key as keyof Props] = value

      return true
    })
    .sort()
    .toString()

  return { object, hash }
}

const makeHash = (
  displayName: string,
  propsHash: string,
  extraArgs?: Record<string, any>
) => {
  const extraArgsHash = extraArgs
    ? Object.entries(extraArgs).sort().toString()
    : ''

  return `${displayName}__${propsHash}__${extraArgsHash}`
}

/**
 * ---
 * category: utilities/themes
 * ---
 *
 * A decorator or higher order component that makes a component themeable.
 *
 * It adds a `makeStyles` function and the generated `styles` object to the decorated Component's props.
 *
 * As a HOC:
 *
 * ```js
 * import { withStyle, jsx } from '@instructure/emotion'
 * import generateStyle from './styles'
 * import generateComponentTheme from './theme'
 *
 *
 * export default withStyle(generateStyle, generateComponentTheme)(ExampleComponent)
 * ```
 *
 * Themeable components inject their themed styles into the document
 * when they are mounted.
 *
 * ### Applying themes
 *
 * A themeable component’s theme can be configured via wrapping it in an
 * [EmotionThemeProvider](#EmotionThemeProvider) component, and/or set
 * explicitly via its `themeOverride` prop.
 *
 * EmotionThemeProvider provides a theme object with [global theme variables](#canvas).
 * These variables are mapped to the component's own variables in `theme.js` (see [@instructure/emotion](#emotion) package documentation for more info).
 *
 * With the `themeOverride` prop you can directly set/override the component theme variables declared in theme.js.
 *
 * ```js
 * // ExampleComponent/theme.js
 * const generateComponentTheme = (theme) => {
 *   const { colors } = theme
 *
 *   const componentVariables = {
 *     background: colors?.backgroundMedium,
 *     color: colors?.textDarkest,
 *
 *     hoverColor: colors?.textLightest,
 *     hoverBackground: colors?.backgroundDarkest
 *   }
 *
 *   return componentVariables
 * }
 * export default generateComponentTheme
 * ```
 *
 * ```jsx
 * {// global theme override}
 * <EmotionThemeProvider theme={{
 *   colors: { backgroundMedium: '#888' }
 * }}>
 *  {// component theme override}
 *   <ExampleComponent themeOverride={{ hoverColor: '#eee' }} />
 * </EmotionThemeProvider>
 * ```
 *
 * @module withStyle
 *
 * @param {function} generateStyle - The function that returns the component's style object
 * @param {function} generateComponentTheme - The function that returns the component's theme variables object
 * @param {Array} propsToListen - An Array of the names of props used in the style generator. Used for checking if the styles object needs recalculating and onyle these props are passed to the generator. If `[]` (empty Array) is passed, no props will be passed to the generator. If not provided, all props will be passed and checked.
 * @returns {ReactElement} The decorated WithStyle Component
 */
const withStyle = decorator(
  (
    ComposedComponent: any,
    generateStyle: any,
    generateComponentTheme: any,
    propsToListen?: Array<string>
  ) => {
    const displayName = ComposedComponent.displayName || ComposedComponent.name

    const WithStyle = forwardRef((props, ref) => {
      const theme = useTheme()
      const dir = useTextDirectionContext()
      const componentProps = {
        ...ComposedComponent.defaultProps,
        ...props
      }

      const themeOverride = getComponentThemeOverride(
        theme,
        [displayName, ComposedComponent.componentId],
        componentProps
      )

      const componentTheme =
        typeof generateComponentTheme === 'function'
          ? { ...generateComponentTheme(theme), ...themeOverride }
          : {}

      const initialProps = filterProps(componentProps, propsToListen)

      const initialHash = makeHash(displayName, initialProps.hash)

      const [currentHash, setCurrentHash] = useState(initialHash)

      const [styles, setStyles] = useState(
        memoized(
          initialHash,
          initialProps.object,
          {},
          componentTheme,
          generateStyle,
          bidirectionalPolyfill,
          dir
        )
      )

      // Clear cache if it grows too big.
      // This should be replaced with better cache management later
      // @ts-expect-error TODO: remove comment for more info
      if (memoized.cache.size >= 5000) {
        // @ts-expect-error TODO: remove comment for more info
        memoized?.cache?.clear()
      }

      const makeStyleHandler = (extraArgs: Record<string, any> = {}) => {
        const filteredProps = filterProps(componentProps, propsToListen)

        const newHash = makeHash(displayName, filteredProps.hash, extraArgs)

        if (newHash === currentHash) return

        const calculatedStyles = memoized(
          newHash,
          filteredProps.object,
          extraArgs,
          componentTheme,
          generateStyle,
          bidirectionalPolyfill,
          dir
        )

        setStyles(calculatedStyles)
        setCurrentHash(newHash)
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
    ;(WithStyle as any).generateComponentTheme = generateComponentTheme
    // we have to add defaults to makeStyles and styles added by this decorator
    // eslint-disable-next-line no-param-reassign
    ComposedComponent.defaultProps = {
      ...ComposedComponent.defaultProps,
      makeStyles: () => {},
      styles: {}
    }
    if (process.env.NODE_ENV !== 'production') {
      WithStyle.displayName = `WithStyle(${displayName})`
    }
    return WithStyle
  }
)
export default withStyle
export { withStyle }
