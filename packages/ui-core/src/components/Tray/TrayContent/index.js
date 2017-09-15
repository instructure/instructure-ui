import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class TrayContent extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node,

    /**
    * Placment to determine where the `<Tray />` should display in the viewport
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
    children: null,
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
          [this.props.className]: this.props.className // eslint-disable-line react/prop-types
        })}
      >
        {this.props.children}
      </span>
    )
  }
}

export default TrayContent
