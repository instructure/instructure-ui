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
import PropTypes from 'prop-types'

import { decorator } from '@instructure/ui-decorator'
import { isEmpty, shallowEqual, deepEqual } from '@instructure/ui-utils'
import { warn } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { StyleSheet } from '@instructure/ui-stylesheet'
import { findDOMNode } from '@instructure/ui-dom-utils'

import { ThemeContext } from './ThemeContext'
import { applyVariablesToNode } from './applyVariablesToNode'
import { getCssText } from './getCssText'
import { setTextDirection } from './setTextDirection'
import { ThemeRegistry } from './ThemeRegistry'
import { toRules } from './transformCss'

const {
  generateComponentTheme,
  generateTheme,
  registerComponentTheme
} = ThemeRegistry

/**
* ---
* category: utilities/themes
* ---
* A decorator or higher order component that makes a component `themeable`.
*
* As a HOC:
*
* ```js
* import themeable from '@instructure/ui-themeable'
* import styles from 'styles.css'
* import theme from 'theme.js'
*
* class Example extends React.Component {
*   render () {
*     return <div className={styles.root}>Hello</div>
*   }
* }
*
* export default themeable(theme, styles)(Example)
* ```
*
* Note: in the above example, the CSS file must be transformed into a JS object
* via [babel](#babel-plugin-themeable-styles) or [webpack](#ui-webpack-config) loader.
*
* Themeable components inject their themed styles into the document when they are mounted.
*
* After the initial mount, a themeable component's theme can be configured explicitly
* via its `theme` prop or passed via React context using the [ApplyTheme](#ApplyTheme) component.
*
* Themeable components register themselves with the [global theme registry](#registry)
* when they are imported into the application, so you will need to be sure to import them
* before you mount your application so that the default themed styles can be generated and injected.
*
* @param {function} theme - A function that generates the component theme variables.
* @param {object} styles - The component styles object.
* @return {function} composes the themeable component.
*/

const emptyObj = {}

const themeable = decorator((ComposedComponent, theme, styles = {}) => {
  const displayName = ComposedComponent.displayName || ComposedComponent.name
  let componentId = `${(styles && styles.componentId) || uid()}`
  if (process.env.NODE_ENV !== 'production') {
    componentId = `${displayName}__${componentId}`
    warn(
      parseInt(React.version) >= 15,
      `[themeable] React 15 or higher is required. You are running React version ${React.version}.`,
    )
  }

  const contextKey = Symbol(componentId)
  const template = (styles && typeof styles.template === 'function') ? styles.template : () => {
    warn(
      false,
      '[themeable] Invalid styles for: %O. Use @instructure/babel-plugin-themeable-styles to transform CSS imports.',
      displayName
    )
    return ''
  }
  registerComponentTheme(contextKey, theme)
  const getContext = function (context) {
    const themeContext = ThemeContext.getThemeContext(context)
    return themeContext || emptyObj
  }
  const getThemeFromContext = function (context) {
    const { theme } = getContext(context)
    if (theme && theme[contextKey]) {
      return {
        ...theme[contextKey]
      }
    } else {
      return emptyObj
    }
  }
  const generateThemeForContextKey = function (themeKey, overrides) {
    return generateComponentTheme(contextKey, themeKey, overrides)
  }
  class ThemeableComponent extends ComposedComponent {
    _themeCache = null
    _instanceId = uid(displayName)

    static componentId = componentId
    static theme = contextKey
    static contextTypes = {
      ...ComposedComponent.contextTypes,
      ...ThemeContext.types
    }
    static propTypes = {
      ...ComposedComponent.propTypes,
      theme: PropTypes.object // eslint-disable-line react/forbid-prop-types
    }
    static generateTheme = generateThemeForContextKey

    componentWillMount () {
      if (!StyleSheet.mounted(componentId)) {
        const defaultTheme = generateThemeForContextKey()
        const cssText = getCssText(template, defaultTheme, componentId)
        StyleSheet.mount(componentId, toRules(cssText))
      }
      if (super.componentWillMount) {
        super.componentWillMount()
      }
    }
    componentDidMount () {
      this.applyTheme()
      setTextDirection()
      if (super.componentDidMount) {
        super.componentDidMount()
      }
    }
    shouldComponentUpdate (nextProps, nextState, nextContext) {
      const themeContextWillChange = !deepEqual(
          ThemeContext.getThemeContext(this.context),
          ThemeContext.getThemeContext(nextContext)
        )
      if (themeContextWillChange) return true
      if (super.shouldComponentUpdate) {
        return super.shouldComponentUpdate(nextProps, nextState, nextContext)
      }
      return (
        !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state, nextState) ||
        !shallowEqual(this.context, nextContext)
      )
    }
    componentWillUpdate (nextProps, nextState, nextContext) {
      if (!deepEqual(nextProps.theme, this.props.theme) ||
        !deepEqual(getThemeFromContext(nextContext), getThemeFromContext(this.context))) {
        this._themeCache = null
      }
      if (super.componentWillUpdate) {
        super.componentWillUpdate(nextProps, nextState, nextContext)
      }
    }
    componentDidUpdate (prevProps, prevState, prevContext) {
      this.applyTheme()
      if (super.componentDidUpdate) {
        super.componentDidUpdate(prevProps, prevState, prevContext)
      }
    }
    applyTheme (DOMNode) {
      if (isEmpty(this.theme)) {
        return
      }
      const defaultTheme = generateThemeForContextKey()
      applyVariablesToNode(
        DOMNode || findDOMNode(this), // eslint-disable-line react/no-find-dom-node
        this.theme,
        defaultTheme,
        componentId,
        template, // for IE 11
        this.scope // for IE 11
      )
    }
    get scope () {
      return `${componentId}__${this._instanceId}`
    }
    get theme () {
      if (this._themeCache !== null) {
        return this._themeCache
      }
      const { immutable } = getContext(this.context)
      let theme = getThemeFromContext(this.context)
      if (this.props.theme && !isEmpty(this.props.theme)) {
        if (!theme) {
          theme = this.props.theme
        } else if (immutable) {
          warn(
            false,
            '[themeable] Parent theme is immutable. Cannot apply theme: %O',
            this.props.theme
          )
        } else {
          theme = isEmpty(theme)
            ? this.props.theme
            : {...theme, ...this.props.theme}
        }
      }
      // pass in the component theme as overrides
      this._themeCache = generateThemeForContextKey(null, theme)
      return this._themeCache
    }
  }
  return ThemeableComponent
})

/**
* Utility to generate a theme for all themeable components that have been registered.
* This theme can be applied using the [ApplyTheme](#ApplyTheme) component.
*
* @param {String} themeKey The theme to use (for global theme variables across components)
* @param {Object} overrides theme variable overrides (usually for dynamic/user defined values)
* @return {Object} A theme config to use with `<ApplyTheme />`
*/
themeable.generateTheme = generateTheme

export default themeable
export { themeable }
