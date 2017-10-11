import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Tooltip
---
**/
@themeable(theme, styles)
export default class TooltipContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'small'
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: this.props.size
    }
    return (
      <span id={this.props.id} className={classnames(classes)} role="tooltip">
        {this.props.children}
      </span>
    )
  }
}
