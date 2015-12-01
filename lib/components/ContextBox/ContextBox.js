import React, { Component, PropTypes } from 'react'
import styles from './ContextBox.css'
import classnames from 'classnames'

/**
 * Add small overlays of content to display secondary information.
 *
 * ```jsx_example
 * <ContextBox>Hello World</ContextBox>
 * ```
 */
export default class ContextBox extends Component {
  static propTypes = {
    children:  PropTypes.node.isRequired,
    animate:   PropTypes.bool,
    position:  PropTypes.oneOf(['above', 'below', 'left', 'right']),
    showCaret: PropTypes.bool
  }

// TODO: actual positions should be something like these
// (we should be able to control how the popover is aligned wih the trigger)
// above-center, above-left, above-right
// below-center, below-left, below-right
// left-center, left-top, left-bottom
// right-center, right-top, right-bottom

  static defaultProps = {
    animate: true,
    position: 'above',
    showCaret: true
  }

  render () {
    const {
      position,
      animate,
      children,
      showCaret
    } = this.props

    const classes = {
      [styles.root]:                      true,
      [styles['position--' + position]]:  showCaret,
      [styles['animateTo--' + position]]: animate
    }

    return (
      <div className={classnames(classes)}>
        <div className={styles.content}>
          { children }
        </div>
      </div>
    )
  }
}
