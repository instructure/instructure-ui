import { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'
import deepEqual from 'deep-equal'
import {
  applyScopedCustomProperties,
  removeScopedCustomProperties,
  getComponentVariables,
  getComponentCss
} from './cssUtils'
import mergeDeep from './mergeDeep'
import StyleManager from './StyleManager'
import ThemeManager from './ThemeManager'
import Brands from '../brands'
import shortid from 'shortid'
import getDisplayName from './getDisplayName'

const styleManager = new StyleManager()
const themeManager = new ThemeManager(Brands, 'canvas')

export const generateTheme = themeManager.generateTheme

/**
 * Mark component as themeable and inject component styles into the document
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
const themeable = function (generator, styles) {
  const cssText = styles._cssText

  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)
    const contextKey = Symbol(displayName)
    const styleId = displayName + '__' + shortid.generate()

    const getThemeFromContext = function (context) {
      const themeContext = getThemeContext(context)
      return (themeContext && themeContext.theme && themeContext.theme[contextKey]) || {}
    }

    const getDefaultThemeFromContext = function (context) {
      const themeContext = getThemeContext(context)
      return (themeContext && themeContext.defaultTheme && themeContext.defaultTheme[contextKey]) || undefined
    }

    themeManager.registerThemeGenerator(contextKey, generator)

    class ThemeableComponent extends ComposedComponent {
      constructor (props, context) {
        super(props, context)

        this._themeCache = null
        this._stylesCache = null
        this._themeId = displayName + '__' + shortid.generate() // a unique theme id for this instance
      }

      static displayName = displayName

      static theme = contextKey

      static contextTypes = {
        ...ComposedComponent.contextTypes,
        ...ThemeContextTypes
      }

      static propTypes = {
        ...ComposedComponent.propTypes,
        theme: PropTypes.object
      }

      static generateTheme = function (brand, vars) {
        return themeManager.generateComponentTheme(contextKey, brand, vars)
      }

      componentDidMount () {
        if (!deepEqual(this.theme, this.defaultTheme)) {
          this.applyTheme()
        }

        this.injectStyles()

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUpdate (nextProps, nextState, nextContext) {
        if (!deepEqual(getDefaultThemeFromContext(nextContext), getDefaultThemeFromContext(this.context))) {
          this.removeTheme(this.theme)
          this._stylesCache = null
        } else if (!deepEqual(nextProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(nextContext), getThemeFromContext(this.context))) {
          this.removeTheme(this.theme)
        }

        if (super.componentWillUpdate) {
          super.componentWillUpdate(nextProps, nextState, nextContext)
        }
      }

      componentDidUpdate (prevProps, prevState, prevContext) {
        if (!deepEqual(getDefaultThemeFromContext(prevContext), getDefaultThemeFromContext(this.context))) {
          this.updateStyles()
          this.applyTheme()
        } else if (!deepEqual(prevProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
          this.applyTheme()
        }

        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState, prevContext)
        }
      }

      componentWillUnmount () {
        this.removeStyles()

        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
      }

      applyTheme () {
        applyScopedCustomProperties(
          ReactDOM.findDOMNode(this),
          getComponentVariables(displayName, this.defaultTheme, this.theme),
          this._themeId,
          cssText
        )
      }

      removeTheme (theme) {
        removeScopedCustomProperties(
          ReactDOM.findDOMNode(this),
          getComponentVariables(displayName, this.defaultTheme, theme),
          this._themeId
        )
        this._themeCache = null
      }

      injectStyles () {
        styleManager.addStyle(this.styles, styleId)
      }

      updateStyles () {
        styleManager.updateStyle(this.styles, styleId)
      }

      removeStyles () {
        styleManager.removeStyle(styleId)
      }

      get theme () {
        if (this._themeCache !== null) {
          return this._themeCache
        }

        let theme = getThemeFromContext(this.context)

        if (this.props.theme) {
          theme = mergeDeep(theme, this.props.theme)
        }

        if (this.defaultTheme) {
          theme = mergeDeep(this.defaultTheme, theme)
        }

        this._themeCache = theme

        return theme
      }

      get styles () {
        if (this._stylesCache !== null) {
          return this._stylesCache
        }

        const styles = getComponentCss(displayName, cssText, this.defaultTheme)

        this._stylesCache = styles

        return styles
      }
      /**
      *  the default theme is what's injected into the style tags
      *  everything else is applied scoped to the root dom node of the component
      *  via css variables or scoped styles (for IE and Edge)
      */
      get defaultTheme () {
        return mergeDeep(ThemeableComponent.generateTheme(), getDefaultThemeFromContext(this.context) || {})
      }
    }

    return ThemeableComponent
  }
}

/**
*  Utility to generate a theme for all themeable components
*/
themeable.generateTheme = themeManager.generateTheme

/**
*  the default theme is what's injected into the style tags
*  everything else is applied scoped to the root dom node of the component
*  via css variables or scoped styles (for IE and Edge)
*
*  Use this to override the built-in default theme & set a global default theme for all themeable components
*/
themeable.defaultTheme = {}

export default themeable
