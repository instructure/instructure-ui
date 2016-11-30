import React, { Component, PropTypes } from 'react'

import dismissable from '../../../util/dismissable'
import themeable from '../../../util/themeable'

import classnames from 'classnames'

import styles from './styles.css'
import theme from './theme.js'

@dismissable(styles.closeButton)
@themeable(theme, styles)
class TrayContent extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node,

    /**
    * Placment to determine which side the close button should be placed on.
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
  }

  render () {
    return (
      <div
        className={
          classnames({
            [styles[`placement--${this.props.placement}`]]: true
          })
        }
      >
        {this.props.children}
      </div>
    )
  }
}

export default TrayContent
