import React, { Component, PropTypes } from 'react'

import dismissable from '../../../util/dismissable'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

@dismissable(styles.closeButton)
@themeable(theme, styles)
class TrayContent extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node
  }

  render () {
    return (
      <div className={styles.content}>
        {this.props.children}
      </div>
    )
  }
}

export default TrayContent
