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
import { registerThemeGenerator, generateComponentTheme } from './brandUtils'
import StyleManager from './StyleManager'
import shortid from 'shortid'
import getDisplayName from './getDisplayName'

const styleManager = new StyleManager()

/**
 * Mark component as themeable.
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
export default function themeable (generator, styles) {
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
      return (themeContext && themeContext.defaultTheme) ? themeContext.defaultTheme[contextKey] : undefined
    }

    registerThemeGenerator(contextKey, generator)

    class ThemeableComponent extends ComposedComponent {
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

      constructor (props, context) {
        super(props, context)

        this._themeCache = null
        this._stylesCache = null
        this._themeId = displayName + '__' + shortid.generate() // a unique theme id for this instance
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
        if (!deepEqual(nextProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(nextContext), getThemeFromContext(this.context))) {
          this.removeTheme(this.props.theme)
        }

        if (!deepEqual(getDefaultThemeFromContext(nextContext), getDefaultThemeFromContext(this.context))) {
          this.removeTheme(this.props.theme)
          this._stylesCache = null
        }

        if (super.componentWillUpdate) {
          super.componentWillUpdate(nextProps, nextState, nextContext)
        }
      }

      componentDidUpdate (prevProps, prevState, prevContext) {
        if (!deepEqual(prevProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
          this.applyTheme()
        }

        if (!deepEqual(getDefaultThemeFromContext(prevContext), getDefaultThemeFromContext(this.context))) {
          this.updateStyles()
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
          theme = {...theme, ...this.props.theme}
        }

        if (this.defaultTheme) {
          theme = {...this.defaultTheme, ...theme}
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

      get defaultTheme () {
        return getDefaultThemeFromContext(this.context) || generateComponentTheme(contextKey)
      }
    }

    return ThemeableComponent
  }
}
