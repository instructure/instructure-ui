import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import deepEqual from 'deep-equal'
import shortid from 'shortid'

import getDisplayName from '@instructure/ui-utils/lib/react/getDisplayName'
import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import warning from '@instructure/ui-utils/lib/warning'

import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'

import applyVariablesToNode from './utils/applyVariablesToNode'
import getCssText from './utils/getCssText'

import {
  registerComponentTheme,
  generateComponentTheme,
  generateTheme
} from './registry'

import StyleSheet from './StyleSheet'

const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

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
* via [babel](#babel-plugin-themeable-styles) or [webpack](#ui-presets) loader.
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
export default function themeable (theme, styles) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    const contextKey = Symbol(displayName)
    const componentId = uniqueId(displayName)

    const template = (typeof styles.template === 'function') ? styles.template : () => {
      warning(
        false,
        '[themeable] Invalid styles for: %O',
        displayName
      )
      return ''
    }

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
        this._instanceId = uniqueId(displayName)
      }

      static displayName = displayName
      // For testing purposes
      static componentId = componentId

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
        const cssText = getCssText(styles.template, defaultTheme, componentId)

        StyleSheet.mount(componentId, cssText)

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
          componentId,
          styles.template, // for IE 11
          this._instanceId // for IE 11
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
            warning(
              false,
              '[themeable] Parent theme is immutable. Cannot apply theme: %O',
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
* Utility to generate a theme for all themeable components that have been registered.
* This theme can be applied using the [ApplyTheme](#ApplyTheme) component.
*
* @param {String} themeKey The theme to use (for global theme variables across components)
* @param {Object} overrides theme variable overrides (usually for dynamic/user defined values)
* @return {Object} A theme config to use with `<ApplyTheme />`
*/
themeable.generateTheme = generateTheme

function uniqueId (displayName) {
  const id = shortid.generate()
  return process.env.DEBUG ? `${displayName}__${id}` : id
}
