import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ThemeContextTypes, makeThemeContext, getThemeContext} from '../../themeable/ThemeContextTypes'
import mergeDeep from '../../themeable/util/mergeDeep'
import themeable from '../../themeable'

/**
---
category: utilities
---
  The `<ApplyTheme/>` component provides a way to override the default
  theme properties for all `@themeable` child components.

  Note that `<ApplyTheme/>` components can be nested and that
  theme properties will fall back to the parent theme or the defaults when they are not set.

  ```jsx_example
  <ApplyTheme theme={{
      [Link.theme]: { color: 'green' }
    }}>
    <div>
      <p>
        <Link>I should be Green</Link>
      </p>
      <p>
        <ApplyTheme theme={{
            [Link.theme]: { color: 'red' }
          }}>
          <Link>I should be Red</Link>
        </ApplyTheme>
      </p>
      <p>
        <Link theme={{ color: 'purple' }}>I should be Purple</Link>
      </p>
    </div>
  </ApplyTheme>
  ```

  You can set user defined variables at runtime using the `ApplyTheme.generateTheme` helper
  to override a 'registered' theme and passing in the variables as the second argument.

  ```jsx_example
  <ApplyTheme theme={ApplyTheme.generateTheme('canvas', {
        'ic-brand-primary': '#008EE2',
        'ic-brand-button--primary-bgd': '#008EE2',
        'ic-brand-button--primary-text': '#FFFFFF',
        'ic-link-color': 'red'
      }
    )}>
    <div>
      <Link href="example.html">I should be red</Link>
      <br />
      <Link href="example.html" theme={Link.generateTheme('canvas', {
          'ic-link-color': 'green'
        }
      )}>I should be green</Link>
    </div>
  </ApplyTheme>
  ```
**/
export default class ApplyTheme extends Component {
  static propTypes = {
    /**
    * set theme variables to override the defaults
    */
    theme: PropTypes.object,
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    children: PropTypes.node
  }

  static childContextTypes = ThemeContextTypes

  static contextTypes = ThemeContextTypes

  static generateTheme = themeable.generateTheme

  getChildContext () {
    let theme = this.props.theme || {}
    const parentThemeContext = getThemeContext(this.context)

    if (parentThemeContext && parentThemeContext.theme) {
      theme = mergeDeep(parentThemeContext.theme, theme)
    }

    return makeThemeContext(theme)
  }

  render () {
    return React.Children.only(this.props.children)
  }
}
