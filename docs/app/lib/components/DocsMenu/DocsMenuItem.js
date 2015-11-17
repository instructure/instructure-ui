import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import styles from './DocsMenuItem.css'

export default class DocsMenuItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    children: PropTypes.node,
    label: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    name: PropTypes.string
  }

  render () {
    const menuLabel = <div className={styles.label}>{this.props.label}</div>
    const classes = classnames({
      [styles.root]:   true,
      [styles.active]: this.props.isActive
    })
    return (
      <a {...this.props} className={classes}>
        {this.props.name}
        {this.props.label && menuLabel}
        {this.props.children}
      </a>
    )
  }
}
