import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'

import styles from './Link.css'
import themeVariables from './theme/Link'
import themeStyles from './theme/Link.css'

/**
  A Link component

  ```jsx_example
    <Link href="http://www.instructure.com">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```
 **/
@themeable(themeVariables, themeStyles)
export default class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  renderButton () {
    return (
      <button type="button" {...this.props} className={styles.root}>
        {this.props.children}
      </button>
    )
  }

  renderLink () {
    return (
      <a {...this.props} className={styles.root}>
        {this.props.children}
      </a>
    )
  }

  render () {
    if (this.props.href && this.props.href !== '#') {
      return this.renderLink()
    } else {
      return this.renderButton()
    }
  }
}
