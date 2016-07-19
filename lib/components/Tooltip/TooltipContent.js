import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import classnames from 'classnames'

import styles from './TooltipContent.css'
import themeVariables from './theme/TooltipContent'
import themeStyles from './theme/TooltipContent.css'

@themeable(themeVariables, themeStyles)
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
