import React, { Component, PropTypes } from 'react'
import {ThemeContextTypes, makeThemeContext, getThemeContext} from '../../util/ThemeContextTypes'
import mergeThemes from '../../util/mergeThemes'

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
        <Link theme={{ color: 'purple' }}>I should be Purple</Link>
      </p>
    </div>
  </ApplyTheme>
  ```

  The ApplyTheme component can also be used with the `generateTheme` helper.
  This helper allows you to use Canvas brand config along with ApplyTheme. You can
  pass in the user defined variables as the second argument.

  ```jsx_example
  <ApplyTheme theme={themeable.generateTheme('canvas', {
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
class ApplyTheme extends Component {
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

  getChildContext () {
    let theme = this.props.theme || {}
    const parentThemeContext = getThemeContext(this.context)
    const defaultTheme =
      (parentThemeContext && parentThemeContext.defaultTheme) ||
      theme

    if (parentThemeContext && parentThemeContext.theme) {
      theme = mergeThemes(parentThemeContext.theme, theme)
    }

    return makeThemeContext(
      defaultTheme,
      theme
    )
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

export default ApplyTheme
