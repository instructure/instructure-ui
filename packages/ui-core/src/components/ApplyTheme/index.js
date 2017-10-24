import { Component } from 'react'
import PropTypes from 'prop-types'
import {ThemeContextTypes, makeThemeContext, getThemeContext} from '@instructure/ui-themeable/lib/ThemeContextTypes'
import mergeDeep from '@instructure/ui-utils/lib/mergeDeep'
import warning from '@instructure/ui-utils/lib/warning'
import themeable from '@instructure/ui-themeable'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'

/**
---
category: components/utilities
---
**/
export default class ApplyTheme extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * set theme variables to override the defaults
    */
    theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    children: PropTypes.node,
    /**
    * Prevent overriding this theme via a child ApplyTheme component or theme props
    */
    immutable: PropTypes.bool
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    immutable: false
  };

  static childContextTypes = ThemeContextTypes;

  static contextTypes = ThemeContextTypes;

  static generateTheme = themeable.generateTheme;

  getChildContext () {
    let theme = this.props.theme || {}

    const parentThemeContext = getThemeContext(this.context) || {}

    if (parentThemeContext.immutable && parentThemeContext.theme) {
      warning(
        !this.props.theme,
        '[ApplyTheme] Parent theme is immutable. Cannot apply theme: %O',
        this.props.theme
      )
      theme = parentThemeContext.theme
    } else if (parentThemeContext.theme) {
      theme = mergeDeep(parentThemeContext.theme, theme)
    }

    return makeThemeContext(theme, parentThemeContext.immutable || this.props.immutable)
  }

  render () {
    return ensureSingleChild(this.props.children)
  }
}
