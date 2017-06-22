import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import deepEqual from 'deep-equal'
import shortid from 'shortid'
import warn from './util/warn'
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'
import shallowEqual from './util/shallowEqual'

import getDisplayName from './util/getDisplayName'
import applyVariablesToNode from './util/applyVariablesToNode'
import getCssText from './util/getCssText'

import {
  registerComponentTheme,
  generateComponentTheme,
  generateTheme
} from './registry'

import {
  mount
} from './styles'

/**
 * Mark component as themeable and inject component styles into the document
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
export default function themeable (theme, styles) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    const contextKey = Symbol(displayName)

    registerComponentTheme(contextKey, theme)

    const getThemeFromContext = function (context) {
      const themeContext = getThemeContext(context)
      if (themeContext && themeContext.theme && themeContext.theme[contextKey]) {
        return {
          ...themeContext.theme[contextKey],
          immutable: themeContext.immutable
        }
      } else {
        return {}
      }
    }

    const generateThemeForContextKey = function (themeKey, overrides) {
      return generateComponentTheme(contextKey, themeKey, overrides)
    }

    class ThemeableComponent extends ComposedComponent {
      constructor (props, context) {
        super(props, context)

        this._themeCache = null

        const id = shortid.generate()

        this._themeId = (process.env.DEBUG) ? displayName + '__' + id : id
      }

      static displayName = displayName

      static theme = contextKey

      static contextTypes = {
        ...ComposedComponent.contextTypes,
        ...ThemeContextTypes
      }

      static propTypes = {
        ...ComposedComponent.propTypes,
        theme: PropTypes.object // eslint-disable-line react/forbid-prop-types
      }

      static generateTheme = generateThemeForContextKey

      componentWillMount () {
        const defaultTheme = generateThemeForContextKey()
        const cssText = getCssText(styles, defaultTheme, displayName)

        mount(displayName, cssText)

        if (super.componentWillMount) {
          super.componentWillMount()
        }
      }

      componentDidMount () {
        this.applyTheme()

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      shouldComponentUpdate (nextProps, nextState, nextContext) {
        const themeContextWillChange = !deepEqual(getThemeContext(this.context), getThemeContext(nextContext))
        let shouldUpdate = true

        if (super.shouldComponentUpdate) {
          shouldUpdate = super.shouldComponentUpdate(nextProps, nextState, nextContext)
          return themeContextWillChange || shouldUpdate
        } else {
          return themeContextWillChange ||
            !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context, nextContext)
        }
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
        if (!deepEqual(prevProps.theme, this.props.theme) ||
          !deepEqual(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
          this.applyTheme()
        }

        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState, prevContext)
        }
      }

      applyTheme () {
        const defaultTheme = generateThemeForContextKey()

        applyVariablesToNode(
          ReactDOM.findDOMNode(this), // eslint-disable-line react/no-find-dom-node
          this.theme,
          defaultTheme,
          displayName,
          styles, // for IE 11
          this._themeId // for IE 11
        )
      }

      get theme () {
        if (this._themeCache !== null) {
          return this._themeCache
        }

        let theme = getThemeFromContext(this.context)

        if (this.props.theme) {
          if (!theme) {
            theme = this.props.theme
          } else if (theme.immutable) {
            warn(
              'themeable: Parent theme is immutable. Cannot apply theme: %O',
              this.props.theme
            )
          } else {
            theme = {...theme, ...this.props.theme}
          }
        }

        // pass in the component theme as overrides
        this._themeCache = generateThemeForContextKey(null, theme)

        return this._themeCache
      }
    }

    return ThemeableComponent
  }
}

/**
*  Utility to generate a theme for all themeable components
*/
themeable.generateTheme = generateTheme
