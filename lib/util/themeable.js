import { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'
import deepEqual from 'deep-equal'
import ThemeableComponentStyles from './ThemeableComponentStyles'
import ThemeManager from './ThemeManager'
import StyleManager from './StyleManager'
import shortid from 'shortid'

import getDisplayName from './getDisplayName'

const styleManager = new StyleManager()
const themeManager = new ThemeManager()

export const generateTheme = themeManager.generateTheme

/**
 * Mark component as themeable and inject component styles into the document
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
const themeable = function (theme, styles) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)
    const contextKey = Symbol(displayName)
    const componentId = displayName + '__' + shortid.generate()

    themeManager.registerThemeGenerator(contextKey, theme)

    const getThemeFromContext = function (context) {
      const themeContext = getThemeContext(context)
      return (themeContext && themeContext.theme && themeContext.theme[contextKey]) || {}
    }

    const getDefaultThemeFromContext = function (context) {
      const themeContext = getThemeContext(context)
      return (themeContext && themeContext.defaultTheme && themeContext.defaultTheme[contextKey]) || {}
    }

    class ThemeableComponent extends ComposedComponent {
      constructor (props, context) {
        super(props, context)

        this._styles = new ThemeableComponentStyles({
          componentName: displayName,
          componentId,
          styles,
          styleManager,
          usePolyfill: !(window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)')),
          scope: displayName + '__' + shortid.generate()
        })

        this._themeCache = null
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

      static generateTheme = function (themeKey, overrides) {
        return themeManager.generateComponentTheme(contextKey, themeKey, overrides)
      }

      componentDidMount () {
        this._styles.init({
          domNode: ReactDOM.findDOMNode(this),
          defaultTheme: this.defaultTheme,
          theme: this.theme
        })

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUpdate (nextProps, nextState, nextContext) {
        if (!deepEqual(getDefaultThemeFromContext(nextContext), getDefaultThemeFromContext(this.context)) ||
          !deepEqual(nextProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(nextContext), getThemeFromContext(this.context))) {
          this._themeCache = null
        }

        if (super.componentWillUpdate) {
          super.componentWillUpdate(nextProps, nextState, nextContext)
        }
      }

      componentDidUpdate (prevProps, prevState, prevContext) {
        if (!deepEqual(getDefaultThemeFromContext(prevContext), getDefaultThemeFromContext(this.context)) ||
          !deepEqual(prevProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
          this._styles.update({
            defaultTheme: this.defaultTheme,
            theme: this.theme
          })
        }

        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState, prevContext)
        }
      }

      componentWillUnmount () {
        this._styles.unmount()

        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
      }

      get theme () {
        if (this._themeCache !== null) {
          return this._themeCache
        }

        let theme = getThemeFromContext(this.context)

        if (this.props.theme) {
          theme = {...theme, ...this.props.theme}
        }

        const defaultTheme = this.defaultTheme

        if (defaultTheme) {
          theme = {...defaultTheme, ...theme}
        }

        this._themeCache = theme

        return theme
      }

      /**
      *  the default theme is what's injected into the style tags
      *  everything else is applied scoped to the root dom node of the component
      *  via css variables or scoped styles (for IE and Edge)
      */
      get defaultTheme () {
        return {
          ...ThemeableComponent.generateTheme(), // built-in default theme
          ...themeable.defaultTheme[contextKey], // overrides set on themeable.defaultTheme
          ...getDefaultThemeFromContext(this.context) // overrides set in context using ApplyTheme
        }
      }
    }

    return ThemeableComponent
  }
}

/**
*  Utility to generate a theme for all themeable components
*/
themeable.generateTheme = themeManager.generateTheme
themeable.getTheme = themeManager.getTheme

/**
*  the default theme is what's injected into the style tags
*  everything else is applied scoped to the root dom node of the component
*  via css variables or scoped styles (for IE and Edge)
*
*  Use this to override the built-in default theme & set a global default theme for all themeable components
*/
themeable.defaultTheme = {}

export default themeable
