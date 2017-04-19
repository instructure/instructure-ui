import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class TooltipContent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node
  }

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
