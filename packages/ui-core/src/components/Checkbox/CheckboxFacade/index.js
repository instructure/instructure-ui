import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconCheck from '@instructure/ui-icons/lib/Solid/IconCheck'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Checkbox
---
**/
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
            <IconCheck />
          </span>
        </span>
        <span className={styles.label}>
          {this.props.children}
        </span>
      </span>
    )
  }
}
