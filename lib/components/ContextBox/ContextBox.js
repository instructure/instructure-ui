import React, { Component, PropTypes } from 'react'
import styles from './ContextBox.css'
import classnames from 'classnames'

export default class ContextBox extends Component {
  static displayName = 'ContextBox'

  static propTypes = {
    children: PropTypes.node.isRequired,
    showCaret: PropTypes.bool,
    animate: PropTypes.bool,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right'])
  }

  static defaultProps = {
    animate: true,
    showCaret: false
  }

  render () {
    const position = this.props.position
    const classes = {
      [styles.root]:                     true,
      [styles['caret--' + position]]:    this.props.showCaret,
      [styles['animate--' + position]]:  this.props.animate
    }

    return (
      <div className={classnames(classes)}>
        <div className={styles.contextBoxContent}>
          { this.props.children }
        </div>
      </div>
    )
  }
}
