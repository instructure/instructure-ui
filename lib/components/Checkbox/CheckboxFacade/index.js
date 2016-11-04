import React, { Component, PropTypes } from 'react'
import themeable from '../../../util/themeable'
import classnames from 'classnames'

import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class CheckboxFacade extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    checked: false,
    focused: false,
    hovered: false,
    size: 'medium'
  }

  render () {
    const {
      size,
      checked,
      focused,
      hovered
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.checked]: checked,
      [styles.focused]: focused,
      [styles.hovered]: hovered,
      [styles[size]]: true
    }

    return (
      <span className={classnames(classes)}>
        <span className={styles.facade} aria-hidden="true">
          <span className={styles.icon}>
            <IconCheckSolid />
          </span>
        </span>
        <span className={styles.label}>
          {this.props.children}
        </span>
      </span>
    )
  }
}
