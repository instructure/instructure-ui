import React, { Component, PropTypes } from 'react'
import { ThemeContextTypes, makeThemeContext, getThemeContext } from '../../util/ThemeContextTypes'

/**
  The ApplyTheme component provides a way to set theme properties for all `@themeable` child components.
  Theme properties will fall back to defaults when they are not set. Note that ApplyTheme components can be nested.

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
        <Link theme={{ color: 'blue' }}>I should be Blue</Link>
      </p>
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
    * set theme variables and inject them into the document as the default styles
    */
    defaultTheme: PropTypes.object,
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    children: PropTypes.node
  }

  static childContextTypes = {
    ...ThemeContextTypes
  }

  static contextTypes = {
    ...ThemeContextTypes
  }

  getChildContext () {
    const { theme, defaultTheme } = this.props
    const parentThemeContext = getThemeContext(this.context)

    if (parentThemeContext) {
      return makeThemeContext(
        {...parentThemeContext.defaultTheme, ...defaultTheme},
        {...parentThemeContext.theme, ...theme}
      )
    } else {
      return makeThemeContext(defaultTheme, theme)
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}
