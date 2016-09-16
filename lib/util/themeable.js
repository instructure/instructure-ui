// inspired by: https://github.com/andreypopp/rethemeable
import { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'
import deepEqual from 'deep-equal'
import { generateThemeVariables, applyComponentTheme } from './themeUtils'
import styleable from './styleable'
import shortid from 'shortid'
import getDisplayName from './getDisplayName'

/**
 * Mark component as themeable.
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
export default function themeable (generator, styles) {
  const _DEFAULT_THEME = generateThemeVariables(generator)
  const _STYLES = styles

  return function (ComposedComponent) {
    const _COMPONENT_NAME = getDisplayName(ComposedComponent)
    const _THEME_KEY = Symbol(_COMPONENT_NAME)

    @styleable(_STYLES, _DEFAULT_THEME)
    class ThemeableComponent extends ComposedComponent {
      static displayName = _COMPONENT_NAME

      static theme = _THEME_KEY

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
        this._themeId = shortid.generate() // a unique theme id for this instance
      }

      componentDidMount () {
        if (!deepEqual(this.theme, _DEFAULT_THEME)) {
          this.applyTheme()
        }

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUpdate (nextProps, nextState, nextContext) {
        if (!deepEqual(nextProps.theme, this.props.theme) ||
            getThemeContext(nextContext) !== getThemeContext(this.context)) {
          this._themeCache = null
        }

        if (super.componentWillUpdate) {
          super.componentWillUpdate(nextProps, nextState, nextContext)
        }
      }

      componentDidUpdate (prevProps, prevState, prevContext) {
        if (!deepEqual(prevProps.theme, this.props.theme) ||
            getThemeContext(prevContext) !== getThemeContext(this.context)) {
          this.applyTheme()
        }

        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState, prevContext)
        }
      }

      applyTheme () {
        applyComponentTheme(
          _COMPONENT_NAME,
          _DEFAULT_THEME,
          this.theme,
          ReactDOM.findDOMNode(this),
          this._themeId,
          _STYLES
        )
      }

      get theme () {
        if (this._themeCache !== null) {
          return this._themeCache
        }

        const themeContext = getThemeContext(this.context)
        let theme = (themeContext && themeContext[_THEME_KEY]) || {}

        if (this.props.theme) {
          theme = {...theme, ...this.props.theme}
        }

        if (_DEFAULT_THEME) {
          theme = {..._DEFAULT_THEME, ...theme}
        }

        this._themeCache = theme

        return theme
      }
    }

    return ThemeableComponent
  }
}
