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
import { isEmpty, shallowEqual, deepEqual, hash } from '@instructure/ui-utils'
import { warn } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { findDOMNode } from '@instructure/ui-dom-utils'

import { ThemeContext } from './ThemeContext'
import { applyVariablesToNode } from './applyVariablesToNode'
import { setTextDirection } from './setTextDirection'

import {
  generateComponentTheme,
  generateTheme,
  registerComponentTheme,
  mountComponentStyles
} from './ThemeRegistry'

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
* @param {function} adapter - A function for mapping deprecated theme vars to updated values.
* @return {function} composes the themeable component.
*/

const emptyObj = {}

/*
 * Note: there are consumers (like canvas-lms and other edu org repos) that are
 * consuming this file directly from "/src" (as opposed to "/es" or "/lib" like normal)
 * because they need this file to not have the babel "class" transform ran against it
 * (aka they need it to use real es6 `class`es, since you can't extend real es6
 * class from es5 transpiled code)
 *
 * Which means that for the time being, we can't use any other es6/7/8 features in
 * here that aren't supported by "last 2 edge versions" since we can't rely on babel
 * to transpile them for those apps.
 *
 * So, that means don't use "static" class properties (like `static PropTypes = {...}`),
 * or object spread (like "{...foo, ..bar}")" in this file until instUI 7 is released.
 * Once we release instUI 7, the plan is to stop transpiling the "/es" dir for ie11
 * so once we do that, this caveat no longer applies.
 */

const themeable = decorator((ComposedComponent, theme, styles = {}, adapter) => {
  const displayName = ComposedComponent.displayName || ComposedComponent.name

  let componentId = `${(styles && styles.componentId) || hash(ComposedComponent, 8)}`

  if (process.env.NODE_ENV !== 'production') {
    componentId = `${displayName}__${componentId}`
    warn(
      parseInt(React.version) >= 15,
      `[themeable] React 15 or higher is required. You are running React version ${React.version}.`,
    )
  }

  const contextKey = Symbol(componentId)

  let template = () => {}

  if (styles && styles.template) {
    template = (typeof styles.template === 'function') ? styles.template : () => {
      warn(
        false,
        '[themeable] Invalid styles for: %O. Use @instructure/babel-plugin-themeable-styles to transform CSS imports.',
        displayName
      )
      return ''
    }
  }

  registerComponentTheme(contextKey, theme)
  const getContext = function (context) {
    const themeContext = ThemeContext.getThemeContext(context)
    return themeContext || emptyObj
  }
  const getThemeFromContext = function (context) {
    const { theme } = getContext(context)
    if (theme && theme[contextKey]) {
      return Object.assign({},  theme[contextKey])
    } else {
      return emptyObj
    }
  }
  const generateThemeForContextKey = function (themeKey, overrides) {
    return generateComponentTheme(contextKey, themeKey, overrides)
  }
  class ThemeableComponent extends ComposedComponent {
    constructor() {
      const res = super(...arguments)
      this._themeCache = null
      this._instanceId = uid(displayName)

      const defaultTheme = generateThemeForContextKey()
      mountComponentStyles(template, defaultTheme, componentId)

      return res
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
    componentDidUpdate (prevProps, prevState, prevContext) {
      if (!deepEqual(prevProps.theme, this.props.theme) ||
        !deepEqual(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
        this._themeCache = null
      }

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
            : Object.assign({}, theme, this.props.theme)
        }
      }

      // If adapter is provided, pass any overrides
      if (typeof adapter === 'function') {
        theme = adapter({ theme, displayName })
      }

      // pass in the component theme as overrides
      this._themeCache = generateThemeForContextKey(null, theme)
      return this._themeCache
    }
  }

  ThemeableComponent.componentId = componentId
  ThemeableComponent.theme = contextKey
  ThemeableComponent.contextTypes = Object.assign(
    {},
    ComposedComponent.contextTypes,
    ThemeContext.types
  )
  ThemeableComponent.propTypes = Object.assign(
    {},
    ComposedComponent.propTypes,
    { theme: PropTypes.object } // eslint-disable-line react/forbid-prop-types
  )
  ThemeableComponent.generateTheme = generateThemeForContextKey

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
