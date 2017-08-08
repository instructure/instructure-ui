import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '../../../themeable'
import { omitProps, pickProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class TrayContent extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node, // eslint-disable-line react/require-default-props
    /**
    * Placment to determine which side the close button should be placed on.
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),
    /*
     * The size of the `<Tray />`
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
    /**
     *
     * Should the `<Tray />` have a box shadow
     */
    shadow: PropTypes.bool,
    /**
     *
     * Should the `<Tray />` have a border
     */
    border: PropTypes.bool
  }

  static defaultProps = {
    placement: 'start',
    size: 'small',
    shadow: true,
    border: false
  }

  render () {
    return (
      <span
        {...omitProps(this.props, TrayContent.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles.border]: this.props.border,
          [styles.shadow]: this.props.shadow,
          [styles[this.props.size]]: true,
          [styles[`placement--${this.props.placement}`]]: true,
          [this.props.className]: this.props.className
        })}
      >
        {this.props.children}
      </span>
    )
  }
}

export default TrayContent
