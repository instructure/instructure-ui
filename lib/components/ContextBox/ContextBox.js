import React, { Component } from 'react'
import styles from './ContextBox.css'
import classnames from 'classnames'

class ContextBox extends Component {
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

ContextBox.propTypes = {
  children: React.PropTypes.node.isRequired,
  showCaret: React.PropTypes.bool,
  animate: React.PropTypes.bool,
  position: React.PropTypes.oneOf(['above', 'below', 'left', 'right'])
}

ContextBox.defaultProps = {
  animate: true,
  showCaret: false,
  position: 'top'
}

export default ContextBox
