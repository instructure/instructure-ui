import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ToggleFacade extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    checked: false,
    focused: false,
    size: 'medium'
  }

  renderIcon () {
    if (this.props.checked) {
      return (
        <IconCheckSolid className={styles.iconSVG} />
      )
    } else {
      return (
        <IconXSolid className={styles.iconSVG} />
      )
    }
  }

  render () {
    const {
      size,
      checked,
      disabled,
      focused
    } = this.props

    const classes = {
      [styles.facade]: true,
      [styles.checked]: checked,
      [styles.disabled]: disabled,
      [styles.focused]: focused,
      [styles[size]]: true
    }

    return (
      <span className={styles.root}>
        <span className={classnames(classes)} aria-hidden="true">
          <span className={styles.icon}>
            <span className={styles.iconToggle}>
              {this.renderIcon()}
            </span>
          </span>
        </span>
        <span className={styles.label}>
          {this.props.children}
        </span>
      </span>
    )
  }
}
