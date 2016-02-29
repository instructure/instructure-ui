// inspired by: https://github.com/andreypopp/rethemeable
import React, { PropTypes } from 'react'
import { ThemeContextTypes, getThemeContext } from './ThemeContextTypes'
import applyThemeVariables from './applyThemeVariables'
import themeConfig from '../theme/config'
import shortid from 'shortid'
import ScopedStyle from './ScopedStyle'
import shallowEqual from 'shallowequal'

/**
 * Mark component as themeable.
 *
 * Themeable components have a `theme` attribute which can be configured explicitly
 * via props or passed via context.
 *
 */
export default function themeable (themeVariables, themeStyles) {
  return function (ComposedComponent) {
    const displayName = ComposedComponent.name
    const themeKey = Symbol(displayName)

    return class extends ComposedComponent {

      static displayName = displayName;

      static theme = themeKey;

      static contextTypes = {
        ...ComposedComponent.contextTypes,
        ...ThemeContextTypes
      };

      static propTypes = {
        ...ComposedComponent.propTypes,
        theme: PropTypes.object
      };

      constructor (props, context) {
        super(props, context)
        this._themeCache = null
        this.themeId = 'Theme__' + shortid.generate()
      }

      componentWillUpdate (nextProps, nextState, nextContext) {
        if (!shallowEqual(nextProps.theme, this.props.theme) ||
            getThemeContext(nextContext) !== getThemeContext(this.context)) {
          this._themeCache = null
        }

        if (super.componentWillUpdate) {
          super.componentWillUpdate(nextProps, nextState, nextContext)
        }
      }

      get theme () {
        if (this._themeCache !== null) {
          return this._themeCache
        }

        let { theme } = this.props

        if (!theme) {
          const themeUniverse = getThemeContext(this.context)
          theme = themeUniverse && themeUniverse[themeKey]
        }

        if (themeVariables) {
          const defaults = themeVariables(themeConfig)
          theme = {...defaults, ...theme}
        }

        if (!theme) {
          theme = {}
        }

        this._themeCache = theme

        return theme
      }

      renderTheme () {
        return (
          <ScopedStyle scope={'#' + this.themeId} key={this.themeId}>
            {applyThemeVariables(displayName, this.theme, themeStyles)}
          </ScopedStyle>
        )
      }

      render () {
        const componentTree = super.render()
        const children = [this.renderTheme()].concat(React.Children.toArray(componentTree.props.children))
        const props = {
          id: this.themeId
        }
        return React.cloneElement(componentTree, {...componentTree.props, ...props}, children)
      }
    }
  }
}
