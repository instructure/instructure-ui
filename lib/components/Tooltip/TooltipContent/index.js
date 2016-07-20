import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styleable from '../../../util/styleable'

import styles from './styles.css'

@styleable(styles)
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
      <div id={this.props.id} role="tooltip" className={classnames(classes)}>
        {this.props.children}
      </div>
    )
  }
}
